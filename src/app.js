require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 처리

// 라우트 등록
const groupRoutes = require('./routes/group.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');

app.use('/api/groups', groupRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);

app.get('/', (req, res) => {
  res.send('Jogakzip Backend is running...');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
