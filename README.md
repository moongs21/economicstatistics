# 세계 경제 통계 대시보드

World Bank API를 활용하여 각국의 주요 경제 통계를 도표와 그래프로 시각화하는 웹 애플리케이션입니다.

## 🌟 주요 기능

- **다양한 국가 선택**: 미국, 중국, 일본, 독일, 영국, 프랑스, 한국, 인도, 브라질, 러시아 등
- **주요 경제 지표**: 
  - GDP 성장률 (연간 %)
  - 인플레이션율 (연간 %)
  - 실업률 (%)
  - GDP (현재 가격, USD)
  - 경상수지 (GDP 대비 %)
- **시각화**: 선 그래프와 막대 그래프로 데이터 비교
- **기간 선택**: 원하는 연도 범위 선택 가능

## 🚀 사용 방법

1. 국가를 선택합니다
2. 경제 지표를 선택합니다
3. 시작 연도와 종료 연도를 설정합니다
4. "데이터 불러오기" 버튼을 클릭합니다

## 📦 기술 스택

- **HTML5**: 웹 페이지 구조
- **CSS3**: 스타일링 및 반응형 디자인
- **JavaScript**: 데이터 처리 및 API 호출
- **Chart.js**: 그래프 시각화 라이브러리
- **Node.js + Express**: 서버 사이드 API 프록시로 CORS 문제 해결
- **World Bank API**: 경제 통계 데이터 소스 (무료 공개 API)
- **Render**: 웹 서버 호스팅 플랫폼

## 🌐 배포

이 프로젝트는 Render를 통해 배포할 수 있습니다.

### GitHub에 업로드

```bash
# Git 저장소 초기화
git init

# 파일 추가
git add .

# 커밋
git commit -m "Initial commit: 경제 통계 대시보드"

# GitHub 저장소 연결 (your-username과 your-repo-name을 실제 값으로 변경)
git remote add origin https://github.com/your-username/your-repo-name.git

# 푸시
git branch -M main
git push -u origin main
```

### Render 배포

1. [Render](https://render.com/)에 로그인합니다
2. "New +" 버튼을 클릭하고 "Web Service"를 선택합니다
3. GitHub 저장소를 연결하고 선택합니다
4. 배포 설정:
   - **Name**: economic-statistics-dashboard (또는 원하는 이름)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. "Create Web Service"를 클릭합니다

**중요**: 이 프로젝트는 Express 서버를 사용하여 CORS 문제를 해결합니다. 
- `server.js` 파일이 Express 서버로 작동하며 `/api/worldbank-api` 엔드포인트를 제공합니다
- 서버가 World Bank API를 프록시하여 CORS 문제를 해결합니다
- World Bank API는 무료 공개 API이므로 추가 인증 없이 바로 작동합니다

## ⚠️ 주의사항

- **CORS 문제 해결**: Express 서버를 사용하여 서버 사이드에서 World Bank API를 호출하므로 CORS 문제가 해결되었습니다
- **Express 서버**: `server.js` 파일이 Express 서버로 작동하며 API 프록시 역할을 합니다
- **World Bank API**: 무료 공개 API로 접근 제한이 없습니다
- **로컬 테스트**: 로컬에서 테스트하려면 `npm install` 후 `npm start` 명령어를 실행하세요

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 🔗 참고 자료

- [World Bank API](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392)
- [Chart.js 문서](https://www.chartjs.org/docs/)
- [Express.js 문서](https://expressjs.com/)
- [Render 문서](https://render.com/docs)

## 🛠️ 로컬 개발

로컬에서 서버를 실행하려면:

```bash
# 의존성 설치
npm install

# 서버 실행
npm start
```

이렇게 하면 `http://localhost:3000`에서 사이트와 API를 함께 테스트할 수 있습니다.

