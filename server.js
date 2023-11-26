// server.js 파일

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// 데이터베이스 대신 간단하게 메모리에 저장하기 위한 배열 사용
let rankingData = [];

// Body parser middleware
app.use(bodyParser.json());

// 랭킹 조회 API 엔드포인트
app.get('/ranking', (req, res) => {
  // 랭킹 데이터를 반환
  res.json(rankingData);
});

// 점수 추가 API 엔드포인트
app.post('/ranking/add', (req, res) => {
  const { username, score } = req.body;

  // 새로운 점수를 랭킹 데이터에 추가
  rankingData.push({ username, score });

  // 랭킹 데이터를 점수 순으로 정렬
  rankingData.sort((a, b) => b.score - a.score);

  // 상위 10개의 랭킹 데이터만 유지
  rankingData = rankingData.slice(0, 10);

  // 성공적으로 추가되었음을 응답
  res.status(200).send('Score added to ranking');
});

// 서버 시작
app.listen(port, () => {
  console.log(`http://localhost:${port}/ranking`);
});
