const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

// 1️⃣ 댓글 등록 (POST /api/posts/:postId/comments)
router.post('/posts/:postId/comments', commentController.createComment);

// 2️⃣ 댓글 목록 조회 (GET /api/posts/:postId/comments)
router.get('/posts/:postId/comments', commentController.getComments);

// 3️⃣ 댓글 수정 (PUT /api/comments/:commentId)
router.put('/comments/:commentId', commentController.updateComment);

// 4️⃣ 댓글 삭제 (DELETE /api/comments/:commentId)
router.delete('/comments/:commentId', commentController.deleteComment);

module.exports = router;
