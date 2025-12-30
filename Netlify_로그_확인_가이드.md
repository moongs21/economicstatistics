# Netlify Functions 로그 확인 가이드

## 🔍 현재 문제: 500 Internal Server Error

브라우저 콘솔에서 500 오류가 발생하고 있습니다. 이는 Netlify Function 내부에서 오류가 발생했다는 의미입니다.

## 📋 Netlify Functions 로그 확인 방법

### 1단계: Netlify 대시보드 접속
1. https://app.netlify.com 접속
2. 로그인

### 2단계: 사이트 선택
1. 배포한 사이트 클릭
2. 왼쪽 메뉴에서 **"Functions"** 클릭

### 3단계: 함수 로그 확인
1. `imf-api` 함수 찾기
2. 함수 클릭
3. **"Logs"** 탭 클릭
4. 최근 실행 로그 확인

### 4단계: 로그에서 확인할 내용

다음과 같은 로그 메시지들을 찾아보세요:

- ✅ **정상**: `IMF API 호출 시작: ...`
- ❌ **오류**: `IMF API Proxy Error: ...`
- ❌ **오류**: `fetch 오류: ...`
- ❌ **오류**: `Error stack: ...`

## 🔧 일반적인 오류와 해결 방법

### 오류 1: "fetch is not defined"
**원인**: Node.js 버전이 낮아서 fetch를 지원하지 않음
**해결**: `netlify.toml`에서 Node.js 18 이상 사용 확인

### 오류 2: "IMF API 호출 시간 초과"
**원인**: IMF API가 응답하지 않음
**해결**: 
- IMF API URL이 올바른지 확인
- 다른 지표나 국가로 테스트

### 오류 3: "IMF API error: 404"
**원인**: IMF API 엔드포인트가 잘못됨
**해결**: IMF API 문서 확인

### 오류 4: 네트워크 오류
**원인**: Netlify Functions에서 외부 API 호출 제한
**해결**: 
- `imf-api-alt.js` 사용 (Node.js https 모듈 사용)
- 또는 다른 프록시 서비스 사용

## 🛠️ 대안 함수 사용하기

만약 `fetch`가 작동하지 않는다면, `imf-api-alt.js`를 사용할 수 있습니다:

1. `index.html`에서 함수 경로 변경:
   ```javascript
   const functionUrl = `/.netlify/functions/imf-api-alt?...`;
   ```

2. GitHub에 푸시하고 재배포

## 📝 로그 확인 후 할 일

로그에서 확인한 오류 메시지를 알려주시면:
- 더 정확한 해결책을 제시할 수 있습니다
- 코드를 수정하여 문제를 해결할 수 있습니다

## 🆘 빠른 확인 체크리스트

- [ ] Netlify 대시보드에서 Functions 탭 확인
- [ ] `imf-api` 함수가 있는지 확인
- [ ] Functions → Logs에서 오류 메시지 확인
- [ ] 오류 메시지를 복사하여 공유

로그를 확인한 후 오류 메시지를 알려주시면 정확한 해결책을 제시하겠습니다!



