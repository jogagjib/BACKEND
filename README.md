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
┃ ┃ ┣ 📂 migrations # 데이터베이스 버전관리 패키지  
┃ ┃ ┗ 📄 schema.prisma # 데이터베이스 모델 정의  
┃ ┣ 📂 data  
┃ ┃ ┗ 📄 postgresql_dump.sql # PostgreSQL 초기화용 SQL 덤프 파일 (초기 데이터 설정 시 사용)  
┃ ┣ 📂 src  
┃ ┃ ┣ 📂 routes # 라우트 패키지  
┃ ┃ ┃ ┣ 📄 group.routes.js  
┃ ┃ ┃ ┣ 📄 post.routes.js  
┃ ┃ ┃ ┣ 📄 comment.routes.js  
┃ ┃ ┃ ┗ 📄 image.routes.js  
┃ ┃ ┣ 📂 controllers # 컨트롤러 패키지  
┃ ┃ ┃ ┣ 📄 group.controller.js  
┃ ┃ ┃ ┣ 📄 post.controller.js  
┃ ┃ ┃ ┣ 📄 comment.controller.js  
┃ ┃ ┃ ┗ 📄 image.controller.js  
┃ ┃ ┣ 📂 services # 서비스 패키지  
┃ ┃ ┃ ┣ 📄 group.service.js  
┃ ┃ ┃ ┣ 📄 post.service.js  
┃ ┃ ┃ ┣ 📄 comment.service.js  
┃ ┃ ┃ ┗ 📄 image.service.js  
┃ ┃ ┣ 📂 middlewares # 공통 미들웨어 패키지  
┃ ┃ ┃ ┣ 📄 auth.middleware.js # 인증 미들웨어 파일  
┃ ┃ ┃ ┣ 📄 error.middleware.js # 에러 미들웨어 파일  
┃ ┃ ┃ ┗ 📄 validate.middleware.js # 위반 미들웨어 파일  
┃ ┃ ┗ 📄 app.js  # Express 애플리케이션 엔트리포인트  
┃ ┣ 📄 .env # 환경 변수 파일 (DB URL, JWT 키 등)  
┃ ┣ 📄 package.json # 프로젝트 의존성 및 스크립트 정의  
┗ ┗ 📄 package-lock.json # 의존성 버전 잠금 파일  

### 예외처리
---
✅ 최종 요약
동기 코드: try-catch 사용
비동기 코드: .catch() 또는 try-catch 블록 활용
전역 예외 처리: uncaughtException, unhandledRejection
커스텀 에러 클래스로 오류 구분
에러 메시지 및 로깅 시스템 활용
---
1️⃣ try-catch 블록 활용 (동기 코드)
동기적인 코드에서 오류가 발생할 수 있는 구문은 반드시 try-catch로 감싸는 것이 좋음
try {
  const data = fs.readFileSync('./file.txt', 'utf-8');
  console.log(data);
} catch (error) {
  console.error('파일 읽기 오류:', error.message);
}
 
 ✅ 컨벤션
오류 객체(error)의 message 속성을 로깅
필요한 경우 커스텀 에러 메시지를 포함

 
2️⃣ 프로미스 기반 코드에서 .catch 사용
프로미스를 사용할 때는 반드시 .catch를 통해 에러 처리
someAsyncFunction()
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error('비동기 처리 중 오류:', error.message);
  });

✅ 컨벤션
.then() 체인 마지막에 .catch()를 항상 명시
에러 메시지를 로깅


3️⃣ async/await와 try-catch 사용 (비동기 코드)
async/await 문법에서는 반드시 try-catch로 오류 처리
 async function fetchData() {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log(response.data);
  } catch (error) {
    console.error('데이터 요청 실패:', error.message);
  }
}
✅ 컨벤션
모든 await 구문은 반드시 try-catch 블록으로 감쌈
에러 로깅 시 적절한 메시지를 포함


4️⃣ 전역 예외 처리 (Uncaught Exception)
예상치 못한 오류를 처리하기 위해 process.on을 설정
process.on('uncaughtException', (error) => {
  console.error('예상치 못한 오류 발생:', error.message);
  process.exit(1); // 필요한 경우 프로세스 종료
});
✅ 컨벤션
process.exit(1)로 애플리케이션을 종료함
로그 저장 시스템과 연계하는 것이 좋음


5️⃣ Promise Rejection 핸들러
unhandledRejection 이벤트 처리
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Promise Rejection:', reason);
});
✅ 컨벤션
process.exit() 호출 여부는 서비스 환경에 맞게 결정


6️⃣ 커스텀 에러 클래스를 사용한 에러 핸들링
오류의 종류에 따라 커스텀 에러 클래스 정의
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validateInput(input) {
  if (!input) {
    throw new ValidationError('입력 값이 필요합니다.');
  }
}
✅ 컨벤션
오류 구분이 필요한 경우 커스텀 에러 클래스를 도입
오류 이름(this.name)을 명확히 설정


7️⃣ 에러 메시지 관리
에러 메시지는 상수 또는 설정 파일에서 관리
const ERROR_MESSAGES = {
  MISSING_PARAMETER: '필수 파라미터가 누락되었습니다.',
  INVALID_USER: '잘못된 사용자입니다.',
};


8️⃣ 로깅 시스템 통합
winston 또는 pino와 같은 로깅 라이브러리를 활용해 에러 로그 관리
const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log' })
  ],
});

logger.error('에러 메시지');



### 깃허브 컨벤션
---
## Commit Message Guideline

| commit type | contents |
| --- | --- |
| feat | 기능(새로운 기능) |
| fix | 버그 및 오류 수정 |
| build | build 관련 수정 |
| chore | 기타 변경사항 |
| design | UI 디자인 수정 |
| rename | 파일, 폴더명 혹은 디렉토리 위치 수정 |
| remove | 파일 삭제 |
| style | drawable, theme, color 수정 |
| refactor | 코드 개선 |
| docs | 문서(readme) 작성 |
| test | 테스트 코드 추가 |
| release | 버전 릴리즈 |
- 온점은 찍지 않는다.
- 현재 시제로 작성한다.(-ed, -ing 금지)

```markdown
feat: add MainActivity
design: 한글도 가능
```


### 코드 컨벤션
---
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
---
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
