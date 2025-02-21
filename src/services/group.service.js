const { PrismaClient } = require('@prisma/client'); // PrismaClient 불러오기
const prisma = new PrismaClient();

class GroupService { // 그룹 서비스 클래스

  async createGroup(data) { // 그룹 생성
    // 이미지 URL이 존재하는 경우, 해당 URL이 Image 테이블에 있는지 확인
    if (data.imageUrl) {
      const imageExists = await prisma.image.findUnique({
        where: { url: data.imageUrl }
      });
      if (!imageExists) {
        throw new Error("이미지 URL이 존재하지 않습니다.");
      }
    }
    return await prisma.group.create({ data });
  }

  async getGroup(id) { // 그룹 조회
    return await prisma.group.findUnique({
      where: { id },
      include: { image: true }
    });
  }

  async updateGroup(id, data) { // 그룹 수정
    // 이미지 URL이 변경될 경우, Image 테이블에서 존재하는지 확인
    if (data.imageUrl) {
      const imageExists = await prisma.image.findUnique({
        where: { url: data.imageUrl }
      });
      if (!imageExists) {
        throw new Error("이미지 URL이 존재하지 않습니다.");
      }
    }
    return await prisma.group.update({
      where: { id }, data
    });
  }

  async deleteGroup(id) { // 그룹 삭제
    return await prisma.group.delete({ where: { id } });
  }

  async verifyPassword(id, password) { // 비밀번호 검증
    const group = await prisma.group.findUnique({ where: { id } });
    return group && group.password === password;
  }

  async isPublic(id) { // 공개 상태 확인인
    const group = await prisma.group.findUnique({ where: { id } });
    return group?.isPublic || false;
  }

  async getGroups() { // 그룹 목록 조회 (전체 그룹 가져오기)
    return await prisma.group.findMany({
      include: { image: true }
    }); // 이미지 정보를 포함한 모든 그룹 데이터 조회
  }

  async likeGroup(id) { // 그룹 공감하기 (likeCount 증가)
    const group = await prisma.group.findUnique({ where: { id } });
    if (!group) return null;

    return await prisma.group.update({
      where: { id },
      data: { likeCount: group.likeCount + 1 },
    });
  }
}

module.exports = new GroupService();
