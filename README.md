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
┃ ┃ ┣ 📂 migrations # 스키마 파일과 데이터베이스 간의 차이를 기록 (데이터베이스 버전관리 파일)  
┃ ┃ ┗ 📄 schema.prisma # 데이터베이스 모델 정의  
┃ ┣ 📂 data  
┃ ┃ ┗ 📄 postgresql_dump.sql # PostgreSQL 초기화용 SQL 덤프 파일 (초기 데이터 설정 시 사용) 
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
---
코드 스타일에 대해 작성해주세요
ex. Naming 규칙들 작성 

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
