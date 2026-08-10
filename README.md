# playgogames.com

플레이고게임즈 공식 홈페이지. [Eleventy](https://www.11ty.dev/) 정적 사이트이며, `main` 브랜치에 push하면 GitHub Actions가 빌드해서 GitHub Pages로 배포합니다.
(포스메이게임즈 홈페이지와 동일한 구조입니다.)

## 로컬에서 보기

```bash
npm install
npm start        # http://localhost:8080
```

## 배포

```bash
git add -A && git commit -m "수정" && git push
```

push하면 끝. 1~2분 뒤 반영됩니다.

## 게임 추가 · 수정

`src/_data/games.json` 만 고치면 홈 아이콘과 팝업이 전부 따라옵니다.

```json
{
  "slug": "newgame",                      // 팝업 id 및 이미지 파일명에 쓰입니다
  "title": "게임 이름",
  "titleEn": "English Title",
  "tagline": "한 줄 소개",
  "desc": ["첫 번째 줄.", "두 번째 줄."],   // 배열 한 칸이 한 문단
  "art": "/assets/images/games/newgame.webp",
  "icon": "/assets/images/games/newgame-icon.webp",
  "stores": {
    "appstore": "https://apps.apple.com/us/app/id...",
    "googleplay": "https://play.google.com/store/apps/details?id=..."
  }
}
```

`appstore` 나 `googleplay` 중 없는 건 통째로 빼면 버튼도 안 나옵니다.

## 이미지

| 경로 | 용도 | 권장 크기 |
| --- | --- | --- |
| `src/assets/images/common/logo.png` | 로고 (홈 상단 대문) | 가로형, 폭 1200 이상 |
| `src/assets/images/common/favicon.png` | 파비콘 | 512 × 512 |
| `src/assets/images/common/apple-touch-icon.png` | iOS 홈화면 아이콘 | 180 × 180 |
| `src/assets/images/common/og-image.jpg` | 카톡·SNS 공유 썸네일 | 1200 × 630 |
| `src/assets/images/games/<slug>-icon.webp` | 홈 게임 아이콘 | 512 × 512 |
| `src/assets/images/games/<slug>.webp` | 게임 배너 | 1024 × 500 |

## 커스텀 도메인

`src/CNAME.disabled` 에 `www.playgogames.com` 이 들어 있습니다.
**DNS(메일플러그)를 GitHub으로 돌린 뒤에** `src/CNAME` 으로 이름을 바꿔 커밋하세요.
DNS보다 먼저 켜면 `playgogames.github.io` 접속이 아직 연결 안 된 도메인으로 리다이렉트됩니다.

## 원본 아트

`image/` 폴더에 게임 원본 이미지(PNG)를 보관합니다.
웹에 올리는 파일은 용량을 줄이려고 WebP로 변환해서 `src/assets/images/games/` 에 넣습니다.

```bash
# PNG → WebP 변환 예시 (Python + Pillow)
python3 -c "from PIL import Image; Image.open('image/xx.png').save('src/assets/images/games/xx.webp', quality=88, method=6)"
```

TTM 아이콘은 배경(`ttm_512_back.png`)과 타일(`ttm_512_tile.png`)이 분리되어 있어
알파 합성 후 `tripletilemaster-icon.webp` 로 저장했습니다.
