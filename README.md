## 백엔드 컨벤션
---

### 📂아키텍쳐 및 폴더구조
---
📦 jogakzip-backend  
┣ 📂 jogakzip  
┃ ┣ 📂 http  
┃ ┃ ┣ 📄 groups.http # 그룹 관련 API 테스트 파일  
┃ ┃ ┣ 📄 posts.http # 게시글 관련 API 테스트 파일  
┃ ┃ ┣ 📄 comments.http # 댓글 관련 API 테스트 파일  
┃ ┃ ┗ 📄 image.http # 이미지 관련 API 테스트 파일  
┃ ┣ 📂 node_modules # Node.js 의존성 패키지 (자동 생성)  
┃ ┣ 📂 prisma  
┃ ┃ ┣ 📂 migrations # 데이터베이스 스키마 변경 이력  
┃ ┃ ┗ 📄 schema.prisma # 데이터베이스 모델 정의 (Prisma 사용)  
┃ ┣ 📂 data  
┃ ┃ ┗ 📄 postgresql_dump.sql # PostgreSQL 초기화용 SQL 덤프 파일  
┃ ┣ 📄 .env # 환경 변수 파일 (DB URL, JWT 키 등)  
┃ ┣ 📄 app.js # Express 애플리케이션 엔트리포인트  
┃ ┣ 📄 package.json # 프로젝트 의존성 및 스크립트 정의  
┃ ┗ 📄 package-lock.json # 의존성 버전 잠금 파일

### 예외처리
---



### 깃허브 컨벤션
---
깃 사용 규칙들에 대해 정리해주세요
ex. 브랜치 작성법, 이슈 생성 및 관리 등


### 코드 컨벤션
#### Naming
모든 변수, 코드, 클래스 등은 camelCase를 기준으로 이름을 지음
클래스나 인터페이스는 대문자로 시작함 (ex. class UserController {})상수는 _와 대문자로 표현 (ex. const MAX_LIMIT = 100;)
메서드 이름은 동사나 전치사로 시작해야 하며, 소문자를 이용한 카멜케이스 적용 (ex. readBook(), toString())
❗️임시변수 제외 한 글자 이름 금지(ex. i, j, k)이며, 의도와 용도를 알 수 있게 작성

#### Code style
들여쓰기(Indentation)은 4 스페이스(=1 tab), 들여쓰기 depth는 2까지 가능하며, 초과할 경우 메서드를 분리해 가독성을 향상시킴

따옴표: 'single quotes'를 권장하며, JSON은 "" 사용
메서드와 메서드 사이에는 빈 줄이 반드시 삽입되어야 함
공백의 경우, 연산자 앞뒤 공백 유지 (const sum = a + b;)줄 길이는 99자 제한

## 백엔드 기술스택
### 1. 언어 및 실행 환경
- JavaScript (ES6+)
- Node.js (v16 이상)

### 2. 프레임워크
- Express.js (v4.x)

### 3. API 설계
- RESTful API
- JSON 형식의 데이터 교환

### 4. 데이터베이스
- PostgreSQL (v14.x 이상)

### 5. 버전 관리 및 협업
- Git & GitHub

### 6. 보안 및 인증
- JWT (JSON Web Token)
- CORS 설정

### 7. 배포 및 운영 (추후 추가)
- CI/CD
- 서버 및 클라우드
- 컨테이너
