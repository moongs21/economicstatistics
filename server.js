const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS 설정
app.use(cors());

// 정적 파일 제공 (index.html)
app.use(express.static(path.join(__dirname)));

// World Bank API 프록시 엔드포인트
app.get('/api/worldbank-api', async (req, res) => {
    try {
        // 쿼리 파라미터 추출
        const { indicator, country, startYear, endYear } = req.query;

        // 필수 파라미터 검증
        if (!indicator || !country || !startYear || !endYear) {
            return res.status(400).json({
                error: 'Missing required parameters: indicator, country, startYear, endYear'
            });
        }

        // World Bank 지표 매핑
        const indicatorMap = {
            'NGDP_RPCH': 'NY.GDP.MKTP.KD.ZG',      // GDP 성장률 (연간 %)
            'PCPIPCH': 'FP.CPI.TOTL.ZG',          // 인플레이션율 (연간 %)
            'LUR': 'SL.UEM.TOTL.ZS',              // 실업률 (%)
            'NGDPD': 'NY.GDP.MKTP.CD',            // GDP (현재 가격, USD)
            'GDP_PCAP': 'NY.GDP.PCAP.CD',         // 1인당 GDP (현재 가격, USD)
            'BCA': 'BN.CAB.XOKA.GD.ZS'            // 경상수지 (GDP 대비 %)
        };

        // 국가 코드 매핑
        const countryMap = {
            'US': 'USA',
            'CN': 'CHN',
            'JP': 'JPN',
            'DE': 'DEU',
            'GB': 'GBR',
            'FR': 'FRA',
            'KR': 'KOR',
            'IN': 'IND',
            'BR': 'BRA',
            'RU': 'RUS',
            'CZ': 'CZE',  // 체코
            'SK': 'SVK'   // 슬로바키아
        };

        const wbIndicator = indicatorMap[indicator] || indicator;
        const wbCountry = countryMap[country] || country;

        // World Bank API URL 구성
        const wbApiUrl = `https://api.worldbank.org/v2/country/${wbCountry}/indicator/${wbIndicator}?format=json&date=${startYear}:${endYear}`;

        console.log('World Bank API 호출:', wbApiUrl);
        console.log('파라미터:', { indicator, country, startYear, endYear, wbIndicator, wbCountry });

        // World Bank API 호출
        const url = new URL(wbApiUrl);
        const options = {
            hostname: url.hostname,
            path: url.pathname + url.search,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'World-Bank-Economic-Dashboard/1.0'
            },
            timeout: 30000  // 30초 타임아웃
        };

        const req = https.request(options, (apiRes) => {
            console.log('World Bank API 응답 상태:', apiRes.statusCode, apiRes.statusMessage);

            let data = '';

            apiRes.on('data', (chunk) => {
                data += chunk;
            });

            apiRes.on('end', () => {
                try {
                    if (apiRes.statusCode !== 200) {
                        console.error('World Bank API 오류 응답:', data.substring(0, 500));
                        return res.status(500).json({
                            error: 'World Bank API error',
                            message: `HTTP ${apiRes.statusCode}: ${apiRes.statusMessage}`,
                            details: data.substring(0, 200)
                        });
                    }

                    // World Bank API는 배열 형태로 반환: [metadata, data]
                    const jsonData = JSON.parse(data);
                    
                    if (!Array.isArray(jsonData) || jsonData.length < 2) {
                        throw new Error('Invalid World Bank API response format');
                    }

                    // 데이터 추출 및 변환
                    const metadata = jsonData[0];
                    const dataArray = jsonData[1] || [];

                    // World Bank 형식을 우리 형식으로 변환
                    const transformedData = {
                        values: {}
                    };

                    dataArray.forEach(item => {
                        if (item.date && item.value !== null) {
                            const year = parseInt(item.date);
                            transformedData.values[year] = item.value;
                        }
                    });

                    console.log('World Bank API 데이터 수신 성공:', Object.keys(transformedData.values).length, '개 데이터 포인트');

                    return res.json(transformedData);
                } catch (parseError) {
                    console.error('JSON 파싱 오류:', parseError);
                    return res.status(500).json({
                        error: 'Failed to parse World Bank API response',
                        message: parseError.message,
                        rawData: data.substring(0, 500)
                    });
                }
            });
        });

        req.on('error', (error) => {
            console.error('World Bank API 요청 오류:', error);
            return res.status(500).json({
                error: 'Failed to fetch data from World Bank API',
                message: error.message,
                code: error.code
            });
        });

        req.on('timeout', () => {
            console.error('World Bank API 요청 시간 초과');
            req.destroy();
            return res.status(500).json({
                error: 'World Bank API request timeout',
                message: 'Request took longer than 30 seconds'
            });
        });

        req.end();

    } catch (error) {
        console.error('World Bank API Proxy Error:', error);
        return res.status(500).json({
            error: 'Failed to fetch data from World Bank API',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// 루트 경로에서 index.html 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`http://localhost:${PORT} 에서 접속하세요.`);
});

