const commentService = require('../services/comment.service');

class CommentController {
  // 1️⃣ 댓글 등록 (POST /api/posts/:postId/comments)
  async createComment(req, res) {
    try {
      const postId = parseInt(req.params.postId);
      const { nickname, content, password } = req.body;

      // 요청 유효성 검사
      if (isNaN(postId) || !nickname || !content || !password) {
        return res.status(400).json({ message: "잘못된 요청입니다" });
      }

      // 댓글 생성
      const newComment = await commentService.createComment({
        postId,
        nickname,
        content,
        password
      });

      // 응답 데이터 포맷 지정 (API 문서 기준)
      res.status(201).json({
        id: newComment.id,
        nickname: newComment.nickname,
        content: newComment.content,
        createdAt: newComment.createdAt
      });

    } catch (error) {
      res.status(500).json({ error: '댓글 등록 실패' });
    }
  }
  // 2️⃣ 댓글 목록 조회 (GET /api/posts/:postId/comments)
  async getComments(req, res) {
    try {
      const postId = parseInt(req.params.postId);

      // 요청 유효성 검사
      if (isNaN(postId)) {
        return res.status(400).json({ message: "잘못된 요청입니다" });
      }

      // 댓글 목록 조회
      const comments = await commentService.getComments(postId);

      // 응답 데이터 포맷 지정
      res.json(comments);

    } catch (error) {
      res.status(500).json({ error: '댓글 목록 조회 실패' });
    }
  }

  // 3️⃣ 댓글 수정 (PUT /api/comments/:commentId)
  async updateComment(req, res) {
    try {
      const commentId = parseInt(req.params.commentId);
      const { nickname, content, password } = req.body;

      // 요청 유효성 검사
      if (isNaN(commentId) || !nickname || !content || !password) {
        return res.status(400).json({ message: "잘못된 요청입니다" });
      }

      // 댓글 수정 서비스 호출
      const updatedComment = await commentService.updateComment(commentId, nickname, content, password);

      if (updatedComment === null) {
        return res.status(404).json({ message: "존재하지 않습니다" });
      }

      if (updatedComment === false) {
        return res.status(403).json({ message: "비밀번호가 틀렸습니다" });
      }

      // 응답 데이터 포맷 지정
      res.json({
        id: updatedComment.id,
        nickname: updatedComment.nickname,
        content: updatedComment.content,
        createdAt: updatedComment.createdAt
      });

    } catch (error) {
      res.status(500).json({ error: '댓글 수정 실패' });
    }
  }

  // 4️⃣ 댓글 삭제 (DELETE /api/comments/:commentId)
  async deleteComment(req, res) {
    try {
      const commentId = parseInt(req.params.commentId);
      const { password } = req.body;

      // 요청 유효성 검사
      if (isNaN(commentId) || !password) {
        return res.status(400).json({ message: "잘못된 요청입니다" });
      }

      // 댓글 삭제 서비스 호출
      const isDeleted = await commentService.deleteComment(commentId, password);

      if (isDeleted === null) {
        return res.status(404).json({ message: "존재하지 않습니다" });
      }

      if (isDeleted === false) {
        return res.status(403).json({ message: "비밀번호가 틀렸습니다" });
      }

      res.json({ message: "댓글 삭제 성공" });

    } catch (error) {
      res.status(500).json({ error: '댓글 삭제 실패' });
    }
  }
}

module.exports = new CommentController();
