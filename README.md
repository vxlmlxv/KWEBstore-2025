# KWEBstore 2025

KWEB 스터디를 위한 React + TypeScript 기반 실습용 온라인 쇼핑몰입니다.

## 🛠 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Form Management**: React Hook Form + Zod
- **API**: DummyJSON Products API

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Header.tsx      # 헤더 (검색, 카테고리, 다크모드)
│   ├── Footer.tsx      # 푸터
│   ├── Layout.tsx      # 레이아웃 래퍼
│   ├── ProductCard.tsx # 상품 카드
│   ├── Modal.tsx       # 모달 컴포넌트
│   ├── Skeleton.tsx    # 로딩 스켈레톤
│   └── SortButtons.tsx # 정렬 버튼
├── pages/              # 페이지 컴포넌트
│   ├── HomePage.tsx    # 홈페이지
│   ├── ProductDetailPage.tsx # 상품 상세
│   ├── CartPage.tsx    # 장바구니
│   ├── OrderPage.tsx   # 주문서
│   ├── SearchPage.tsx  # 검색 결과
│   └── CategoryPage.tsx # 카테고리
├── hooks/              # 커스텀 훅
│   ├── useCart.ts      # 장바구니 관리
│   ├── useDarkMode.ts  # 다크모드
│   └── useInfiniteScroll.ts # 무한 스크롤
├── services/           # API 서비스
│   └── api.ts         # DummyJSON API 호출
├── types/              # TypeScript 타입 정의
│   └── index.ts       # 공통 타입
├── utils/              # 유틸리티 함수
│   └── index.ts       # 헬퍼 함수들
└── schemas/            # 폼 검증 스키마
    └── orderForm.ts   # 주문서 폼 스키마
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

1. 의존성 설치

```bash
npm install
```

2. 개발 서버 실행

```bash
npm run dev
```

3. 브라우저에서 http://localhost:5173 열기

### 빌드

```bash
npm run build
```

## 🌟 주요 기능

### ✅ 필수 구현 사항

- [x] **기본 레이아웃 & 라우팅**

  - 헤더/푸터가 모든 페이지에 표시
  - 6개 주요 화면 구현 (홈, 카테고리, 검색, 상품상세, 장바구니, 주문서)
  - React Router를 이용한 클라이언트 사이드 라우팅

- [x] **장바구니 기능**

  - 상품 추가/삭제/수량 조절
  - 선택적 주문 (개별 선택, 전체 선택)
  - 헤더에 장바구니 아이템 수 표시
  - 총 주문금액 계산

- [x] **폼 검증**

  - React Hook Form + Zod를 이용한 강력한 폼 검증
  - 실시간 유효성 검사 및 에러 메시지 표시
  - 이름, 전화번호, 이메일, 배송지, 결제수단 검증

- [x] **반응형 디자인**

  - 모바일/데스크톱 모두 지원
  - 상품 목록: 데스크톱 4열, 모바일 1열 레이아웃
  - Tailwind CSS를 이용한 반응형 구현

- [x] **로컬스토리지 저장**

  - 장바구니 데이터 영구 저장
  - 다크모드 설정 저장
  - 새로고침 시에도 데이터 유지

- [x] **검색 기능**

  - DummyJSON Search API 연동
  - URL 쿼리스트링에 검색어 반영
  - 검색 결과 없음 처리

- [x] **정렬 기능**

  - 이름순, 가격순 정렬 지원
  - URL 쿼리스트링에 정렬 기준 반영
  - 카테고리 및 검색 결과에서 모두 사용 가능

- [x] **스켈레톤 UI**

  - 로딩 중 스켈레톤 UI 표시
  - 사용자 경험 향상

- [x] **무한 스크롤**

  - 홈페이지에서 8개씩 점진적 로딩
  - 스크롤 하단 도달 시 자동 로드

- [x] **애니메이션**

  - Framer Motion을 이용한 부드러운 애니메이션
  - 히어로 섹션 스크롤 애니메이션
  - 모달 등장/사라짐 애니메이션

- [x] **다크모드 지원**

  - 헤더 버튼으로 라이트/다크 모드 전환
  - 시스템 설정 감지
  - 설정값 로컬스토리지 저장

- [x] **외부 폰트 사용**
  - Pretendard 웹폰트 적용
  - 모든 텍스트에 일관된 폰트 사용

## 🎨 디자인 특징

- **색상 시스템**: Blue 계열 프라이머리 컬러
- **타이포그래피**: Pretendard 폰트 패밀리
- **컴포넌트**: 모던한 카드 기반 디자인
- **반응형**: Mobile-first 접근 방식
- **다크모드**: 완전한 다크/라이트 테마 지원

## 🔧 기술적 특징

- **TypeScript**: 강타입 시스템으로 런타임 에러 방지
- **커스텀 훅**: 로직 재사용성과 관심사 분리
- **Compound Components**: 유연하고 재사용 가능한 컴포넌트 설계
- **최적화**: React.memo, useMemo, useCallback 등을 이용한 성능 최적화
- **에러 처리**: 적절한 에러 바운더리와 폴백 UI

## 📱 지원 브라우저

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

This project is licensed under the MIT License.

## 📞 문의

KWEB 스터디 관련 문의사항이 있으시면 언제든 연락주세요.
