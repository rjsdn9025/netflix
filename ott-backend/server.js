const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// 미들웨어 설정
app.use(bodyParser.json());
app.use(cors());

// MySQL 데이터베이스 연결 설정
// DB내용 알맞게 수정하기
const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'misungkang69',
  database: 'ott_service'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// JWT 인증 미들웨어
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    
    req.user = decoded;  // 인증된 사용자 정보
    next();
  });
};

// 인증된 사용자만 영화 데이터를 조회할 수 있음
app.get('/movies', authenticate, (req, res) => {
  const sql = 'SELECT * FROM movies';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// 서버 시작
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

