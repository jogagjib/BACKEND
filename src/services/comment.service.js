const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CommentService {
  // 1️⃣ 댓글 등록
  async createComment(data) {
    return await prisma.comment.create({ data });
  }

  // 2️⃣ 특정 게시글의 모든 댓글 조회
  async getComments(postId) {
    return await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        nickname: true,
        content: true,
        createdAt: true
      }
    });
  }

  // 3️⃣ 댓글 수정 (비밀번호 검증 포함)
  async updateComment(id, nickname, content, password) {
    const comment = await prisma.comment.findUnique({ where: { id } });

    if (!comment) {
      return null; // 댓글이 존재하지 않음
    }

    if (comment.password !== password) {
      return false; // 비밀번호 불일치
    }

    return await prisma.comment.update({
      where: { id },
      data: { nickname, content }
    });
  }

  // 4️⃣ 댓글 삭제 (비밀번호 검증 포함)
  async deleteComment(id, password) {
    const comment = await prisma.comment.findUnique({ where: { id } });

    if (!comment) {
      return null; // 댓글이 존재하지 않음
    }

    if (comment.password !== password) {
      return false; // 비밀번호 불일치
    }

    await prisma.comment.delete({ where: { id } });
    return true;
  }
}

module.exports = new CommentService();
