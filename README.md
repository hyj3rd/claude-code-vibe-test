# claude-code-vibe-test

빌드 도구, 패키지 매니저, 프레임워크, 테스트 스위트 없이 순수 HTML/CSS/JS로 만든 정적 웹 페이지 모음입니다. 각 최상위 디렉터리는 독립적인 하나의 페이지(`index.html`, `style.css`, 필요 시 `main.js`)이며, 디렉터리 간에 공유하는 코드나 빌드 과정은 없습니다.

## 실행 방법

설치/빌드/린트/테스트 명령이 따로 없습니다. 각 디렉터리의 `index.html`을 브라우저로 직접 열면 됩니다.

## 구성

- [`hello-world/`](hello-world) — 최소한의 HTML/CSS 예제 페이지
- [`profile/`](profile) — 이모지 아바타와 클릭 인터랙션이 있는 자기소개 카드 페이지
- [`counter/`](counter) — 카운터 페이지
- [`to-do/`](to-do) — 할 일 목록 페이지
- [`fxconverter/`](fxconverter) — 환율 변환기 페이지
- [`snake/`](snake) — 스네이크 게임. 난이도 선택(쉬움/보통/어려움/매우 어려움), 일시정지, 50점마다 오르는 레벨 시스템(레벨업마다 속도 10ms 증가)을 포함

## 새 페이지 추가 규칙

새 디렉터리를 만들고 그 안에 `index.html`, `style.css`, (상호작용이 필요할 때만) `main.js`를 둡니다. 빌드 단계나 디렉터리 간 import는 추가하지 않습니다.
