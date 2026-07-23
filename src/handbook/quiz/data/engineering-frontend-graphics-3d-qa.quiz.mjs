// 프론트엔드 그래픽·3D·WebGL Q&A(engineering-frontend-graphics-3d-qa) 본문에서 도출한 4지선다 퀴즈.
// 정답은 본문 답변으로 뒷받침되는 것, 오답은 도메인상 그럴듯하지만 틀린 것이다.
// 자동 도출이라 사람 검수 대상이다.

const quiz = {
  id: "engineering-frontend-graphics-3d-quiz",
  title: "프론트엔드 그래픽·3D·WebGL 퀴즈",
  sourceQaId: "engineering-frontend-graphics-3d-qa",
  questions: [
    {
      id: "q1",
      question: "SVG, Canvas, WebGL 중 표현 도구를 고르는 기준으로 옳은 것은?",
      choices: [
        "DOM 접근성과 벡터 선명도가 중요하면 SVG, 많은 픽셀/도형을 직접 그리면 Canvas, 3D/GPU 대량 렌더링이면 WebGL",
        "최신 브라우저에서 지원되는 기술을 항상 우선해 WebGL을 기본값으로 둔다",
        "번들 크기가 가장 작은 도구를 기준으로 삼아 SVG를 무조건 고른다",
        "디자이너가 넘긴 시안 포맷에 맞춰 자동으로 결정한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 DOM 접근성과 벡터 선명도가 중요하면 SVG, 많은 픽셀/도형을 직접 그리면 Canvas, 3D/GPU 대량 렌더링이면 WebGL을 고른다고 한다. 유행으로 고르면 접근성·성능·hit testing·유지보수 비용이 맞지 않는다.",
    },
    {
      id: "q2",
      question: "SVG가 느려지는 기준으로 본문이 제시한 것은?",
      choices: [
        "SVG 파일 크기가 100KB를 넘을 때",
        "DOM node가 수천 개로 늘거나 path/filter/clipPath가 많아져 style recalculation과 paint가 frame budget을 넘을 때",
        "애니메이션이 하나라도 포함될 때",
        "gradient나 색상 정의가 많아질 때",
      ],
      answerIndex: 1,
      explanation:
        "본문은 DOM node가 수천 개로 늘거나 path/filter/clipPath가 많아져 style recalculation과 paint가 frame budget을 넘으면 느려진다고 한다. 그 시점부터 Canvas나 WebGL batch 렌더링을 검토한다.",
    },
    {
      id: "q3",
      question: "Canvas 접근성을 보완하는 방법으로 옳은 것은?",
      choices: [
        "canvas에 alt 속성을 추가하면 screen reader가 내용을 읽는다",
        "고대비 색상만 사용하면 접근성 요건이 충족된다",
        "DOM fallback, aria description, keyboard control, offscreen data table로 같은 정보를 제공한다",
        "canvas 위에 투명한 이미지 태그를 겹쳐 두면 된다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 canvas 자체가 의미 구조가 부족하므로 DOM fallback, aria description, keyboard control, offscreen data table을 제공하라고 한다. 시각 결과만 그리면 screen reader와 keyboard 사용자는 정보를 얻거나 조작할 수 없다.",
    },
    {
      id: "q4",
      question: "Three.js 검은 화면(blank canvas)을 디버그할 때 본문이 권한 확인 방법은?",
      choices: [
        "브라우저 캐시를 비우고 새로고침을 반복한다",
        "canvas의 배경색 CSS를 흰색으로 강제한다",
        "GPU 드라이버를 최신 버전으로 업데이트한다",
        "Playwright에서 canvas pixel이 모두 같은 색인지 nonblank check를 하고 renderer.info로 draw call이 실제 발생하는지 본다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 asset load, renderer, camera, mesh, material·light, render loop 순서로 좁히고, Playwright에서 nonblank check와 renderer.info로 draw call 발생 여부를 확인한다고 한다.",
    },
    {
      id: "q5",
      question: "WebGL context loss에 대한 대응으로 본문이 요구하는 것은?",
      choices: [
        "contextlost/contextrestored 이벤트를 처리하고 resource 재생성, 사용자 메시지, fallback을 준비한다",
        "context loss가 나면 페이지 전체를 자동 새로고침한다",
        "GPU 메모리를 미리 두 배로 할당해 loss를 방지한다",
        "context loss는 브라우저가 복구하므로 별도 처리가 필요 없다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 contextlost/contextrestored 이벤트를 처리하고 resource 재생성, 사용자 메시지, fallback을 준비하라고 한다. GPU 메모리 부족이나 브라우저 정책으로 context가 사라지면 장면이 영구 blank가 될 수 있다.",
    },
    {
      id: "q6",
      question: "WebGL context가 복구되었을 때 texture, buffer, shader program은 어떻게 처리해야 하나?",
      choices: [
        "브라우저가 자동 복원하므로 그대로 재사용한다",
        "유효하지 않다고 보고 재생성하며, asset cache는 원본 Blob/ImageBitmap/URL을 보관한다",
        "GPU에 그대로 남아 있으므로 참조만 다시 연결한다",
        "context loss 전 상태로 즉시 되돌아가므로 아무 조치도 필요 없다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 context가 복구되면 GPU에 있던 texture, buffer, render target, shader program은 유효하지 않다고 보고 재생성해야 한다고 한다. asset cache는 원본을 보관하고 GPU upload는 restored 이벤트 뒤에 다시 구축한다.",
    },
    {
      id: "q7",
      question: "이미지 파일 용량과 GPU texture memory의 관계로 옳은 것은?",
      choices: [
        "같다. 파일 용량이 그대로 GPU memory 사용량이 된다",
        "GPU memory가 항상 파일 용량보다 작다",
        "다르다. JPEG 500KB라도 GPU에 올라가면 보통 width x height x 4 bytes에 mipmap 비용까지 든다",
        "압축 포맷이면 GPU에서도 압축된 크기 그대로 유지된다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 JPEG 500KB라도 GPU에 올라가면 보통 width x height x 4 bytes에 mipmap 비용까지 먹는다고 한다. 4096px texture는 화면에 작게 보여도 GPU memory와 upload time을 크게 쓰므로 표시 크기에 맞춰 리사이즈해야 한다.",
    },
    {
      id: "q8",
      question: "draw call에 대한 설명으로 옳은 것은?",
      choices: [
        "mesh 하나당 정확히 하나씩 발생하는 고정 값이다",
        "GPU memory 사용량을 측정하는 단위다",
        "화면에 그려지는 픽셀 수를 세는 단위다",
        "GPU에 그리기 명령을 보내는 단위로, 너무 많으면 CPU-GPU submission 비용이 커진다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 draw call이 GPU에 그리기 명령을 보내는 단위이며 너무 많으면 CPU-GPU submission 비용이 커진다고 한다. mesh가 하나라도 material pass가 여러 개면 draw call이 늘고, 많아도 instancing/batching으로 줄일 수 있다.",
    },
    {
      id: "q9",
      question: "instancing이 효과적인 경우로 본문이 든 것은?",
      choices: [
        "같은 geometry와 material을 쓰는 marker, particle, 반복 오브젝트가 많을 때",
        "각 객체가 서로 다른 material이나 skeleton을 가질 때",
        "화면에 오브젝트가 한두 개만 있을 때",
        "매 프레임 geometry 자체가 바뀔 때",
      ],
      answerIndex: 0,
      explanation:
        "본문은 같은 geometry와 material을 쓰는 marker, particle, 반복 오브젝트가 많을 때 instancing이 효과적이라고 한다. 각 객체가 서로 다른 material이나 skeleton을 가지면 이득이 줄어든다.",
    },
    {
      id: "q10",
      question: "GLB와 GLTF의 차이로 옳은 것은?",
      choices: [
        "GLB는 텍스트 포맷이라 diff가 쉽고, GLTF는 binary라 배포가 단순하다",
        "GLB는 단일 binary로 묶어 배포·cache가 단순하고, GLTF는 JSON과 외부 파일로 나뉘어 개별 texture 교체가 쉽지만 request 수가 늘어난다",
        "GLB는 애니메이션을 지원하지 않고 GLTF만 지원한다",
        "둘은 확장자만 다를 뿐 내부 구조가 완전히 동일하다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 GLB가 geometry·material·texture 참조를 단일 binary로 묶어 배포와 cache 관리가 단순하고, GLTF는 JSON과 외부 bin/texture 파일로 나뉘어 개별 교체가 쉽지만 request 수와 경로 관리가 늘어난다고 한다.",
    },
    {
      id: "q11",
      question: "3D scene loading에서 progress 표시가 부정확해지는 이유로 본문이 든 것은?",
      choices: [
        "브라우저가 progress 이벤트를 지원하지 않기 때문",
        "asset 크기를 서버가 알려주지 않기 때문",
        "압축 해제, GPU upload, shader compile은 네트워크 progress만으로 설명되지 않기 때문",
        "progress 계산이 항상 GPU에서 이뤄지기 때문",
      ],
      answerIndex: 2,
      explanation:
        "본문은 압축 해제, GPU upload, shader compile이 네트워크 progress만으로 설명되지 않는다고 한다. 퍼센트를 과장하지 말고 단계형 상태로 보여주거나 preview 이미지를 먼저 표시하라고 한다.",
    },
    {
      id: "q12",
      question: "raycasting hit test에서 transparent mesh에 대한 본문 설명으로 옳은 것은?",
      choices: [
        "opacity가 0이면 raycaster가 자동으로 무시한다",
        "transparent mesh는 절대 hit되지 않는다",
        "transparent mesh는 DPR을 반영하지 않으면 hit되지 않는다",
        "기본 raycaster는 material opacity와 별개로 geometry와 교차하면 hit할 수 있어 layer, raycast override, hit priority를 명시해야 한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 기본 raycaster가 material opacity와 별개로 geometry와 교차하면 hit할 수 있다고 한다. 보이지 않는 helper나 transparent plane이 선택을 가로채지 않게 layer, raycast override, hit priority를 명시해야 한다.",
    },
    {
      id: "q13",
      question: "Canvas CSS 크기와 drawing buffer 크기가 다른 이유로 옳은 것은?",
      choices: [
        "CSS 크기는 화면 배치, drawing buffer 크기는 실제 픽셀 해상도이며 DPR을 반영하되 과도한 해상도는 성능 비용을 낸다",
        "CSS 크기가 항상 drawing buffer보다 커야 선명해진다",
        "drawing buffer는 브라우저가 고정하므로 조정할 수 없다",
        "둘은 같아야 정상이며 다르면 버그다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 CSS 크기가 화면 배치, drawing buffer 크기가 실제 픽셀 해상도라고 한다. CSS만 키우면 흐릿하고 DPR을 무제한 적용하면 GPU 메모리와 fill rate가 과해진다.",
    },
    {
      id: "q14",
      question: "고DPR 기기에서 WebGL의 DPR 처리로 본문이 권한 것은?",
      choices: [
        "DPR 3-4를 그대로 적용해 최대 선명도를 확보한다",
        "DPR을 2 이하로 cap하는 등 GPU memory와 fill rate를 지키는 제한이 필요하다",
        "DPR을 항상 1로 고정해 성능만 우선한다",
        "DPR은 CSS에서만 처리하고 renderer는 무시한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 WebGL에서 DPR을 2 이하로 cap하는 등 GPU memory와 fill rate를 지키는 제한이 필요하다고 한다. DPR 3-4를 그대로 쓰면 render target과 postprocessing texture가 급증한다.",
    },
    {
      id: "q15",
      question: "worker에서 DOM 접근에 대한 본문 설명으로 옳은 것은?",
      choices: [
        "worker에서도 document.querySelector로 DOM에 접근할 수 있다",
        "OffscreenCanvas를 쓰면 worker가 DOM 전체에 접근한다",
        "worker는 DOM layout, CSSOM, document query를 직접 다루지 못하므로 필요한 값은 main thread에서 메시지로 넘긴다",
        "worker는 CSSOM만 접근 가능하고 DOM은 불가능하다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 worker가 DOM layout, CSSOM, document query를 직접 다루지 못한다고 한다. 필요한 size, theme, input event는 main thread에서 메시지로 넘기고 worker는 drawing이나 계산만 담당한다.",
    },
    {
      id: "q16",
      question: "canvas tainting이 발생하는 조건과 결과로 옳은 것은?",
      choices: [
        "canvas 크기가 GPU 한도를 넘으면 tainted 된다",
        "canvas에 애니메이션이 많으면 tainted 된다",
        "같은 origin 이미지를 그려도 항상 tainted 된다",
        "CORS 허용 없이 cross-origin image나 video를 그리면 tainted 되어 toDataURL, getImageData, export가 막힌다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 CORS 허용 없이 cross-origin image나 video를 canvas/WebGL texture로 그리면 tainted 되어 toDataURL, getImageData, export가 막힌다고 한다. export 기능이 있으면 CORS header와 crossOrigin 설정을 fixture로 검증한다.",
    },
    {
      id: "q17",
      question: "그래픽 fallback을 준비해야 하는 상황으로 본문이 든 것은?",
      choices: [
        "WebGL unsupported, context loss, reduced motion, low power mode에서 정적 이미지·SVG·표·2D canvas로 대체",
        "GPU가 최신이면 fallback은 불필요하다",
        "fallback은 데스크톱 브라우저에서만 필요하다",
        "fallback은 애니메이션 효과만 대체하면 충분하다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 WebGL unsupported, context loss, reduced motion, low power mode에서 정적 이미지·SVG·표·2D canvas로 대체한다고 한다. fallback 없이 핵심 정보를 3D에만 담으면 일부 사용자는 기능을 쓸 수 없다.",
    },
    {
      id: "q18",
      question: "모바일 GPU에서 shader precision qualifier에 대한 본문 설명으로 옳은 것은?",
      choices: [
        "모바일은 highp를 지원하지 않아 항상 lowp를 써야 한다",
        "mediump 정밀도가 부족해 banding, z 오류, 계산 불안정이 생길 수 있어 필요한 값은 highp 지원을 확인한다",
        "precision qualifier는 데스크톱에서만 의미가 있다",
        "precision은 성능에만 영향을 주고 품질과는 무관하다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 모바일 GPU에서 mediump 정밀도가 부족해 banding, z 오류, 계산 불안정이 생길 수 있다고 한다. fragment shader에서 필요한 값은 highp 지원을 확인하고 성능과 품질을 device matrix에서 비교한다.",
    },
    {
      id: "q19",
      question: "React unmount 후 Three.js resource를 dispose하지 않으면 생기는 문제는?",
      choices: [
        "다음 렌더가 검은 화면으로 나온다",
        "CPU 사용량만 늘고 GPU memory는 자동 회수된다",
        "scene 전환마다 GPU memory가 증가하며, scene에서 제거하는 것만으로는 GPU buffer와 texture가 해제되지 않는다",
        "context loss가 즉시 발생한다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 unmount 후 dispose하지 않으면 scene 전환마다 GPU memory가 증가한다고 한다. scene에서 제거하는 것만으로 GPU buffer와 texture가 해제되지 않으므로 geometry, material, texture, render target 등에 dispose()를 호출한다.",
    },
    {
      id: "q20",
      question: "매 프레임 React state를 업데이트하면 생기는 문제로 본문이 든 것은?",
      choices: [
        "React가 프레임을 자동으로 건너뛰어 애니메이션이 끊긴다",
        "GPU memory가 프레임마다 누수된다",
        "hydration mismatch가 발생한다",
        "렌더링 비용과 input latency가 커지므로, 자주 변하는 frame state는 refs나 external store로 관리한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 매 프레임 React state를 업데이트하면 렌더링 비용과 input latency가 커진다고 한다. useFrame에서 매 프레임 set하지 말고 refs나 external store를 쓰며 dispose와 invalidate 정책을 확인한다.",
    },
    {
      id: "q21",
      question: "animation loop(RAF)를 멈추거나 demand-driven으로 바꿔야 하는 상황은?",
      choices: [
        "정적 장면, hidden tab, offscreen canvas, reduced motion에서 배터리와 CPU 낭비를 줄일 때",
        "GPU가 고사양일 때만 멈춘다",
        "애니메이션이 복잡할수록 무조건 계속 돌려야 한다",
        "RAF는 브라우저가 항상 최적화하므로 멈출 필요가 없다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 정적 장면, hidden tab, offscreen canvas, reduced motion에서 demand-driven render나 pause를 고려한다고 한다. 항상 requestAnimationFrame을 돌리면 배터리와 CPU를 낭비한다.",
    },
    {
      id: "q22",
      question: "데이터 시각화에서 색상으로만 정보를 전달하면 안 되는 이유는?",
      choices: [
        "색상은 브라우저마다 다르게 렌더링되기 때문",
        "색각 다양성과 접근성 때문이며, pattern, label, shape, text를 함께 써야 한다",
        "색상 채우기가 GPU fill rate를 크게 쓰기 때문",
        "WCAG는 색상 사용 자체를 금지하기 때문",
      ],
      answerIndex: 1,
      explanation:
        "본문은 색각 다양성과 접근성을 고려해 pattern, label, shape, text를 함께 써야 한다고 한다. WCAG contrast만으로는 빨강/초록 같은 색상 차이에만 의존한 category 구분이 여전히 실패할 수 있다.",
    },
    {
      id: "q23",
      question: "데이터 시각화에서 missing data 처리로 옳은 것은?",
      choices: [
        "0으로 채워 연속성을 유지한다",
        "missing data는 축에서 완전히 제외해 표시하지 않는다",
        "0으로 채우지 말고 결측·미수집·적용 불가를 구분하며, 선은 끊거나 pattern으로 표시한다",
        "평균값으로 보간해 채운다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 0으로 채우지 말고 결측, 미수집, 적용 불가를 구분하라고 한다. 선은 끊거나 pattern으로 표시하고 tooltip과 legend에 이유를 적어 실제 값 0과 데이터 부재를 혼동하지 않게 한다.",
    },
    {
      id: "q24",
      question: "그래픽 export에서 폰트를 포함하는 방법으로 본문이 든 것은?",
      choices: [
        "font-family만 지정하면 어느 환경에서든 동일하게 표시된다",
        "폰트는 CDN 링크만 넣으면 export에 자동 포함된다",
        "export는 항상 시스템 기본 폰트만 써야 한다",
        "SVG export는 path 변환·subset embed·시스템 fallback 정책을 정하고, PNG export는 font load 완료 후 렌더링한다",
      ],
      answerIndex: 3,
      explanation:
        "본문은 SVG export가 font-family만 적으면 다른 환경에서 바뀔 수 있어 path 변환, subset embed, 시스템 fallback 정책을 정한다고 한다. PNG export는 font load 완료 후 렌더링하고 pixel diff로 확인한다.",
    },
    {
      id: "q25",
      question: "그래픽 픽셀 테스트가 flaky할 때 본문이 권한 접근은?",
      choices: [
        "nonblank 영역, 주요 색상 histogram, bounding box 위치, threshold diff처럼 목적에 맞는 신호를 쓰고 deterministic seed와 고정 camera를 둔다",
        "전체 pixel exact match를 강제해 어떤 차이도 허용하지 않는다",
        "픽셀 테스트를 제거하고 DOM assertion만 쓴다",
        "GPU를 소프트웨어 렌더러로 고정하면 모든 flaky가 사라진다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 GPU·font·anti-aliasing 차이 때문에 전체 pixel exact match가 흔들릴 수 있다고 한다. nonblank 영역, 색상 histogram, bounding box, threshold diff처럼 목적에 맞는 신호를 쓰고 deterministic seed와 고정 camera를 둔다.",
    },
    {
      id: "q26",
      question: "Three.js에서 PBR material이 거의 검게 보일 때 본문이 든 원인은?",
      choices: [
        "draw call이 0일 때만 검게 보인다",
        "light나 environment map이 없을 때이며, 임시로 MeshBasicMaterial을 적용해 geometry와 camera를 확인한다",
        "PBR material은 항상 검게 렌더링된다",
        "texture 용량이 크면 자동으로 검게 표시된다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 PBR material이 light나 environment map이 없으면 거의 검게 보일 수 있다고 한다. 임시로 MeshBasicMaterial을 적용해 geometry와 camera를 확인한 뒤 light intensity, color space, tone mapping, HDRI load를 본다.",
    },
    {
      id: "q27",
      question: "지도/공간 UI에서 접근성 대체를 위해 본문이 권한 것은?",
      choices: [
        "지도 tile 해상도를 높여 screen reader가 읽게 한다",
        "모든 marker를 DOM으로 찍어 접근성을 확보한다",
        "장소명, 거리, 상태, 필터 결과를 리스트나 표로 제공해 tile/WebGL layer가 실패해도 같은 장소를 찾고 선택하게 한다",
        "지도는 시각 정보라 접근성 대체가 불필요하다",
      ],
      answerIndex: 2,
      explanation:
        "본문은 장소명, 거리, 상태, 필터 결과를 리스트나 표로 제공하라고 한다. 지도 tile이나 WebGL layer가 실패해도 keyboard와 screen reader 사용자가 같은 장소를 찾고 선택할 수 있어야 한다.",
    },
    {
      id: "q28",
      question: "그래픽 PR 리뷰에서 막아야 할 위험으로 본문이 열거한 것은?",
      choices: [
        "코드 스타일 위반, 커밋 메시지 형식, 변수명 규칙",
        "번들 minify 여부, 소스맵 포함 여부, 주석 밀도",
        "CSS 벤더 프리픽스 누락, 이미지 확장자 통일",
        "fallback 없음, asset budget 없음, dispose 누락, context loss 미대응, 접근성 대체 없음, canvas blank 검증 없음",
      ],
      answerIndex: 3,
      explanation:
        "본문은 fallback 없음, asset budget 없음, dispose 누락, context loss 미대응, 접근성 대체 없음, canvas blank 검증 없음을 막아야 한다고 한다. 이 항목들은 나중에 고치기 어렵고 사용자 환경별 장애로 바로 이어진다.",
    },
    {
      id: "q29",
      question: "그래픽 성능 예산(FPS)에 대한 본문 설명으로 옳은 것은?",
      choices: [
        "정적 탐색이나 비핵심 preview는 30fps도 수용되지만 drag·drawing·camera control은 더 높은 frame rate가 필요하다",
        "모든 3D 장면은 항상 60fps를 넘겨야 한다",
        "FPS는 데모 장비 기준으로만 잡으면 충분하다",
        "frame rate는 input latency와 무관하게 정한다",
      ],
      answerIndex: 0,
      explanation:
        "본문은 정적 탐색이나 비핵심 3D preview는 30fps도 수용될 수 있지만 drag, drawing, camera control처럼 입력과 붙은 상호작용은 더 높은 frame rate가 필요하다고 한다. 목표는 device tier별로 frame time과 input latency를 같이 정한다.",
    },
    {
      id: "q30",
      question: "그래픽 기능에 progressive enhancement를 적용하는 방식으로 옳은 것은?",
      choices: [
        "먼저 WebGL로 구현하고 실패하면 기능 전체를 비활성화한다",
        "핵심 정보는 HTML/SVG/정적 이미지로 제공하고 지원 환경에서 Canvas/WebGL 상호작용을 강화한다",
        "저사양 기기는 접속을 차단해 고급 렌더링만 유지한다",
        "모든 사용자에게 동일한 고급 렌더링을 강제한다",
      ],
      answerIndex: 1,
      explanation:
        "본문은 핵심 정보를 HTML/SVG/정적 이미지로 제공하고 지원 환경에서 Canvas/WebGL 상호작용을 강화한다고 한다. 고급 렌더링이 실패하면 핵심 기능까지 사라지는 구조는 제품 기능으로 보기 어렵다.",
    },
  ],
};

export default quiz;
