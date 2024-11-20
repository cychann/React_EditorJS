# Custom Editor Project

Editor.js 기반의 커스텀 에디터 프로젝트입니다.
제목 섹션과 본문 에디터를 통해 다양한 스타일링과 블록 편집 기능을 제공합니다.

## 🚀 주요 기능

### 제목 섹션
- 제목/소제목 편집
- 제목 폰트 및 색상 설정
- 커버 이미지 설정 및 관리
- 텍스트 정렬 기능
- 커버 색상 커스터마이징

### 본문 에디터
- **Block Tool**
  - 텍스트 블록 (본문, 제목, 인용구)
  - 미디어 (이미지, 비디오)
  - 파일 업로드
  - 이모지
  - 구분선
  - 장소
  - 정렬

- **Inline Tool**
  - 텍스트 블록 간의 전환 (본문, 제목, 인용구)
  - 링크
  - 다양한 폰트 지원
  - 텍스트 서식(굵게, 밑줄, 취소선)
  - 텍스트 색상 및 배경색 설정

## 🛠 기술 스택

- React
- TypeScript
- Styled-components
- Zustand (상태 관리)
- Vite
- Editor.js 라이브러리

## 📁 프로젝트 구조
```
src/
├── assets/
│   └── data/          # 정적 데이터 파일
├── components/
│   ├── Common/        # 공통 컴포넌트
│   ├── Editor/        # 에디터 관련 컴포넌트
│   ├── TextTooltip/   # 텍스트 툴팁 컴포넌트
│   └── Title/         # 제목 섹션 컴포넌트
├── constants/         # 상수 정의
├── hooks/            # 커스텀 훅
├── store/            # Zustand 스토어
├── styles/           # 전역 스타일 및 테마
├── types/            # TypeScript 타입 정의
│   ├── api/          # API 관련 타입
│   ├── common/       # 공통 타입
│   ├── components/   # 컴포넌트 관련 타입
│   └── store/        # 스토어 관련 타입
└── utils/            # 유틸리티 함수
```

## 🔧 TODO
- 이미지 및 파일 업로드
- 작성 중인 데이터 자동 저장
- 다크 모드

## 📜사용법
### 설치
```bash
npm install
```
### 개발 서버 실행
```bash
npm run dev
```

### 빌드 및 프리뷰
```bash
# production용 빌드
npm run build

# 빌드된 결과물 preview
npm run server
```

### 환경 변수 설정
```bash
# .env 파일 생성
VITE_KAKAO_REST_API_KEY=your_kakao_api_key
```
