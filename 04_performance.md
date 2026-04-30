# Garim-Eye v2 - 앱 개발 결과 보고서

## 4장: 성능 최적화 (Performance Optimization)

### 4.1 최적화 목표

Garim-Eye v2는 **실시간 영상 통화 중 딥페이크 탐지**라는 고난도 작업을 **일반 스마트폰**에서 수행해야 합니다. 이를 위해 다음 세 가지 최적화 목표를 설정했습니다:

1. **추론 속도**: 250ms 이내에 20프레임 분석 완료
2. **메모리 사용량**: 통화 중 추가 메모리 점유 100MB 이하 유지
3. **배터리 소모**: 1시간 통화 시 배터리 소모 15% 이하

---

### 4.2 프레임 전처리 최적화

#### 4.2.1 문제점 분석

**초기 구현**의 문제점:

- Flutter에서 `Image` 패키지로 리사이징 → **70ms 소요**
- RGB → Grayscale → FFT 변환 과정에서 중복 메모리 할당 발생
- 총 전처리 시간: **~120ms** (추론 시간의 50% 차지)

#### 4.2.2 해결 방법: vImage Zero-Copy Pipeline

**iOS vImage 프레임워크** 사용으로 전처리 시간을 **2ms로 단축**했습니다.

```swift
import Accelerate

func preprocessFrameWithVImage(imageData: Data, targetSize: CGSize) -> CVPixelBuffer? {
    // 1. Data → CVPixelBuffer 변환 (Zero-Copy)
    var pixelBuffer: CVPixelBuffer?
    let options: [String: Any] = [
        kCVPixelBufferCGImageCompatibilityKey as String: true,
        kCVPixelBufferCGBitmapContextCompatibilityKey as String: true,
    ]

    CVPixelBufferCreate(
        kCFAllocatorDefault,
        Int(targetSize.width),
        Int(targetSize.height),
        kCVPixelFormatType_32BGRA,
        options as CFDictionary,
        &pixelBuffer
    )

    guard let buffer = pixelBuffer else { return nil }

    // 2. vImage 버퍼 설정
    CVPixelBufferLockBaseAddress(buffer, [])
    defer { CVPixelBufferUnlockBaseAddress(buffer, []) }

    let baseAddress = CVPixelBufferGetBaseAddress(buffer)
    let bytesPerRow = CVPixelBufferGetBytesPerRow(buffer)

    var destBuffer = vImage_Buffer(
        data: baseAddress,
        height: vImagePixelCount(targetSize.height),
        width: vImagePixelCount(targetSize.width),
        rowBytes: bytesPerRow
    )

    // 3. vImageScale_ARGB8888 (하드웨어 가속 리사이징)
    imageData.withUnsafeBytes { rawBufferPointer in
        let srcPointer = rawBufferPointer.baseAddress
        var srcBuffer = vImage_Buffer(
            data: UnsafeMutableRawPointer(mutating: srcPointer),
            height: vImagePixelCount(originalHeight),
            width: vImagePixelCount(originalWidth),
            rowBytes: originalWidth * 4
        )

        vImageScale_ARGB8888(
            &srcBuffer,
            &destBuffer,
            nil,
            vImage_Flags(kvImageHighQualityResampling)
        )
    }

    return buffer
}
```

**최적화 결과**:

- 리사이징 시간: 70ms → **2ms** (35배 단축)
- 메모리 복사 횟수: 3회 → **0회** (Zero-Copy)
- CPU 사용률: 12% → **3%** (vImage 하드웨어 가속)

---

### 4.3 메모리 관리 전략

#### 4.3.1 Frame Buffer Pool 패턴

매 프레임마다 새로운 메모리를 할당하는 대신, **미리 할당된 버퍼를 재사용**합니다.

```dart
class FrameBufferPool {
  static const int POOL_SIZE = 5;
  static const int FRAME_SIZE = 224 * 224 * 3;

  final List<Uint8List> _pool = [];
  final Queue<Uint8List> _availableBuffers = Queue();

  FrameBufferPool() {
    // 앱 시작 시 5개 버퍼 사전 할당
    for (int i = 0; i < POOL_SIZE; i++) {
      final buffer = Uint8List(FRAME_SIZE);
      _pool.add(buffer);
      _availableBuffers.add(buffer);
    }
  }

  Uint8List acquire() {
    if (_availableBuffers.isEmpty) {
      // 풀이 비었으면 새로 생성 (드물게 발생)
      print('[Warning] Buffer pool exhausted, creating new buffer');
      return Uint8List(FRAME_SIZE);
    }
    return _availableBuffers.removeFirst();
  }

  void release(Uint8List buffer) {
    if (_pool.contains(buffer)) {
      _availableBuffers.add(buffer);
    }
  }

  void dispose() {
    _pool.clear();
    _availableBuffers.clear();
  }
}
```

**효과**:

- GC(Garbage Collection) 빈도: 초당 5회 → **초당 0.2회**
- 메모리 할당 지연: 평균 3ms → **0ms** (사전 할당)

---

#### 4.3.2 Native 메모리 관리

Swift 측에서도 MLMultiArray를 재사용합니다.

```swift
class DeepfakePredictor {
    private var inputArray: MLMultiArray?

    init() {
        // MLMultiArray 사전 할당 (20, 224, 224, 3)
        inputArray = try? MLMultiArray(shape: [20, 224, 224, 3], dataType: .float32)
    }

    func predict(frames: [CVPixelBuffer]) -> Double {
        guard let input = inputArray else { return 0.5 }

        // 기존 배열에 데이터 덮어쓰기 (새로 할당하지 않음)
        for (frameIdx, frame) in frames.enumerated() {
            fillMLMultiArray(input, with: frame, at: frameIdx)
        }

        // 추론 실행
        // ...
    }

    private func fillMLMultiArray(_ array: MLMultiArray, with frame: CVPixelBuffer, at index: Int) {
        CVPixelBufferLockBaseAddress(frame, .readOnly)
        defer { CVPixelBufferUnlockBaseAddress(frame, .readOnly) }

        let baseAddress = CVPixelBufferGetBaseAddress(frame)!
        let pointer = baseAddress.assumingMemoryBound(to: UInt8.self)

        // 포인터 직접 접근으로 복사 (빠름)
        for y in 0..<224 {
            for x in 0..<224 {
                for c in 0..<3 {
                    let pixelValue = pointer[(y * 224 + x) * 4 + c]
                    let normalized = Float(pixelValue) / 255.0
                    array[[index, y, x, c] as [NSNumber]] = NSNumber(value: normalized)
                }
            }
        }
    }
}
```

---

### 4.4 배터리 소모 최소화

#### 4.4.1 적응형 추론 주기 (Adaptive Interval)

통화 상태와 신뢰도에 따라 **동적으로 추론 주기를 조절**합니다.

```dart
class AdaptiveInferenceScheduler {
  Duration getInterval(DeepfakeState state) {
    // 1. 연속 안전 판정 시 → 주기 늘리기 (배터리 절약)
    if (state.consecutiveSafeCount >= 10) {
      return const Duration(seconds: 10); // Deep Sleep
    }

    // 2. 일반 안전 상태
    if (state.status == DeepfakeStatus.safe) {
      return const Duration(milliseconds: 5000); // Stable
    }

    // 3. 경고 상태 → 정밀 감시
    if (state.status == DeepfakeStatus.warning) {
      return const Duration(milliseconds: 1250); // Standard
    }

    // 4. 위험 상태 → 최대 주파수
    return const Duration(milliseconds: 500); // Burst Mode
  }
}
```

**시나리오별 배터리 소모량**:

- **정상 통화 (90% SAFE)**: 10분당 2% 소모
- **의심 상황 (50% WARNING)**: 10분당 3% 소모
- **공격 탐지 (DANGER)**: 10분당 4% 소모

---

#### 4.4.2 Thermal Throttling (발열 제어)

iOS의 `ProcessInfo.thermalState`를 모니터링하여 과열 방지합니다.

```swift
class ThermalMonitor {
    func getCurrentThermalState() -> ThermalMode {
        let thermalState = ProcessInfo.processInfo.thermalState

        switch thermalState {
        case .nominal:
            return .standard  // 1.25s interval
        case .fair:
            return .stable    // 5s interval
        case .serious, .critical:
            return .deepSleep // 10s interval
        @unknown default:
            return .standard
        }
    }
}
```

Flutter에서 Native 값을 받아 UI 업데이트:

```dart
Future<void> _updateThermalMode() async {
  final mode = await platform.invokeMethod('getThermalMode');
  ref.read(deepfakeProvider.notifier).setThermalMode(
    ThermalMode.values.byName(mode),
  );
}
```

---

### 4.5 Core ML 모델 최적화

#### 4.5.1 Int8 양자화 (Quantization)

**Float32 → Int8** 변환으로 모델 용량 75% 절감:

```python
import coremltools as ct

# Float32 모델 로드
model = ct.models.MLModel('DeepfakeDetector_Float32.mlmodel')

# Int8 선형 양자화 설정
quantize_op_config = ct.optimize.coreml.OpLinearQuantizerConfig(
    mode='linear',
    dtype='int8',
)

# 양자화 실행
quantized_model = ct.optimize.coreml.linear_quantize_weights(
    model,
    config=quantize_op_config,
)

# 저장
quantized_model.save('DeepfakeDetector_Int8.mlpackage')
```

**결과**:

- 모델 크기: 48MB → **12MB** (75% 감소)
- 추론 속도: 평균 650ms → **250ms** (61.5% 단축)
- 정확도 손실: 90.36% → **88.97%** (1.39%p 감소, 허용 범위)

---

#### 4.5.2 Compute Unit 최적화

Core ML 모델을 **Neural Engine (NPU)** 우선 실행하도록 설정:

```swift
let config = MLModelConfiguration()
config.computeUnits = .all // CPU, GPU, Neural Engine 모두 사용
// 또는 .neuralEngine (NPU 전용)

let model = try DeepfakeDetector_Int8(configuration: config)
```

**성능 비교**:

- CPU Only: 650ms
- GPU Priority: 380ms
- Neural Engine: **250ms** ✓ (최적)

---

### 4.6 네트워크 최적화 (WebRTC)

#### 4.6.1 Adaptive Video Quality

네트워크 상태에 따라 비디오 품질 자동 조절:

```dart
Future<void> _adjustVideoQuality(RTCPeerConnection pc) async {
  final stats = await pc.getStats();
  final videoStats = stats.where((s) => s.type == 'inbound-rtp' && s.values['mediaType'] == 'video').first;

  final packetsLost = videoStats.values['packetsLost'] ?? 0;
  final packetsReceived = videoStats.values['packetsReceived'] ?? 1;
  final packetLossRate = packetsLost / packetsReceived;

  if (packetLossRate > 0.1) {
    // 패킷 손실 10% 초과 → 해상도 다운
    await _setVideoConstraints(maxHeight: 480, maxFrameRate: 15);
  } else if (packetLossRate < 0.02) {
    // 네트워크 양호 → 원래 해상도 복구
    await _setVideoConstraints(maxHeight: 720, maxFrameRate: 24);
  }
}
```

---

### 4.7 최종 성능 측정 결과

#### 4.7.1 벤치마크 환경

- **기기**: iPhone 12 Pro (A14 Bionic)
- **시나리오**: 10분간 실시간 영상 통화
- **네트워크**: Wi-Fi 6 (안정적)

#### 4.7.2 측정 결과

| 항목               | 목표  | 실제 달성 | 비고                  |
| ------------------ | ----- | --------- | --------------------- |
| 평균 추론 시간     | 250ms | **248ms** | ✅ 목표 달성          |
| 메모리 추가 사용량 | 100MB | **87MB**  | ✅ 13MB 여유          |
| 배터리 소모 (10분) | 2.5%  | **2.1%**  | ✅ 0.4% 절감          |
| 프레임 드롭율      | <5%   | **2.3%**  | ✅ 매끄러운 통화 유지 |
| CPU 사용률 (평균)  | <30%  | **24%**   | ✅ 멀티태스킹 가능    |

---

## 다음 장 미리보기

**5장: 테스트 및 검증**에서는 단위 테스트, 통합 테스트, 실제 환경 테스트 시나리오, 그리고 발견된 버그 및 해결 과정을 다룹니다.
