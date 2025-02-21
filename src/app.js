require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 처리

const fs = require('fs');
const path = require('path');

// 서버 시작 시 'uploads' 폴더가 없으면 생성
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 라우트 등록
const groupRoutes = require('./routes/group.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const imageRoutes = require('./routes/image.routes');

app.use('/api/groups', groupRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);

app.use('/uploads', express.static('uploads')); // 정적 파일 제공
app.use('/api/image', imageRoutes);

app.get('/', (req, res) => {
  res.send('Jogakzip Backend is running...');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
