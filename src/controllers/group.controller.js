const { json } = require('express');
const groupService = require('../services/group.service'); // 서비스 로직 가져오기

class GroupController {
  // 1️⃣ 그룹 생성 (POST /groups)
  async createGroup(req, res) {
    try {
      const group = await groupService.createGroup(req.body); // 서비스 계층에서 그룹 생성
      res.status(201).json(group); // 생성된 그룹을 응답으로 반환
    } catch (error) {
      res.status(500).json({ error: '그룹 생성 실패' }); // 오류 발생 시 500 응답
    }
  }

  // 2️⃣ 특정 그룹 조회 (GET /groups/:id)
  async getGroup(req, res) {
    try {
      const groupId = parseInt(req.params.id); // URL에서 그룹 ID 가져오기
      
      // 요청 유효성 검사 (숫자가 아닌 경우)
      if (isNaN(groupId)) {
        return res.status(400).json({ message: "잘못된 요청입니다" });
      }

      // 서비스에서 그룹 조회
      const group = await groupService.getGroup(groupId);

      // 그룹이 존재하지 않는 경우
      if (!group) {
        return res.status(404).json({ message: "존재하지 않습니다" });
      }
      // 그룹 데이터를 응답으로 반환
      res.json(group);
    } catch (error) {
      // 오류 발생 시 500 응답
      res.status(500).json({ error: '데이터 조회 실패' });
    }
  }

  // 3️⃣ 그룹 정보 수정 (PUT /groups/:id)
  async updateGroup(req, res) {
    try {
      const groupId = parseInt(req.params.id); // URL에서 그룹 ID 가져오기
      const { name, password, imageUrl, isPublic, description } = req.body;
      
      // 요청 형식 검증
      if (!name || typeof isPublic !== "boolean") {
        return res.status(400).json({ message: "잘못된 요청입니다" });
      }

      // 그룹 존재 여부 확인
      const group = await groupService.getGroup(groupId);
      if (!group) {
        return res.status(404).json({ message: "존재하지 않습니다" });
      }

      // 비밀번호 검증 (비공개 그룹인 경우만)
      if (!group.isPublic && group.password !== password) {
        return res.status(403).json({ message: "비밀번호가 틀렸습니다" });
      }

      // 그룹 업데이트 실행
      const updatedGroup = await groupService.updateGroup(groupId, {
        name,
        imageUrl,
        isPublic,
        description
      });

      // 응답 데이터 포맷 지정 (Prisma 모델 기반)
      res.json(updatedGroup);
    } catch (error) {
      res.status(500).json({ error: '그룹 수정 실패' });
    }
  }

  // 4️⃣ 그룹 삭제 (DELETE /groups/:id)
  async deleteGroup(req, res) {
    try {
      const groupId = parseInt(req.params.id);
      const { password } = req.body;

      // 요청 유효성 검사 (숫자가 아닌 경우 또는 비밀번호가 없는 경우)
      if (isNaN(groupId) || !password) {
        return res.status(400).json({ message: "잘못된 요청입니다" });
      }

      // 그룹 조회
      const group = await groupService.getGroup(groupId);

      // 그룹이 존재하지 않는 경우
      if (!group) {
        return res.status(404).json({ message: "존재하지 않습니다" });
      }

      // 비밀번호 검증
      if (group.password !== password) {
        return res.status(403).json({ message: "비밀번호가 틀렸습니다" });
      }

      // 그룹 삭제 실행
      await groupService.deleteGroup(groupId);

      res.json({ message: "그룹 삭제 성공" });

    } catch (error) {
      res.status(500).json({ error: '그룹 삭제 실패' });
    }
  }

  // 5️⃣ groupService.비밀번호 검증 (POST /groups/:id/verify-password)
  async verifyPassword(req, res) {
    try {
      const groupId = parseInt(req.params.id);
      const { password } = req.body;

      // 요청 유효성 검사 (숫자가 아닌 경우 또는 비밀번호가 없는 경우)
      if (isNaN(groupId) || !password) {
        return res.status(400).json({ message: "잘못된 요청입니다" });
      }

      // 그룹 조회
      const group = await groupService.getGroup(groupId);

      // 그룹이 존재하지 않는 경우
      if (!group) {
        return res.status(404).json({ message: "존재하지 않습니다" });
      }

      // 비밀번호 검증
      const isValid = group.password === password;
      if (!isValid) {
        return res.status(401).json({ message: "비밀번호가 틀렸습니다" });
      }


      res.json({ message: "비밀번호가 확인되었습니다" });

    } catch (error) {
      res.status(500).json({ error: '비밀번호 검증 실패' });
    }
  }

  // 6️⃣ 그룹 공개 여부 확인 (GET /groups/:id/is-public)
  async checkPublicStatus(req, res) {
    try {
      const groupId = parseInt(req.params.id);

      // 요청 유효성 검사 (숫자가 아닌 경우)
      if (isNaN(groupId)) {
        return res.status(400).json({ message: "잘못된 요청입니다" });
      }

      // 그룹 조회
      const group = await groupService.getGroup(groupId);

      // 그룹이 존재하지 않는 경우
      if (!group) {
        return res.status(404).json({ message: "존재하지 않습니다" });
      }

      // 공개 여부 반환
      res.json({
        id: group.id,
        isPublic: group.isPublic
      });
    }
    catch (error) {
      res.status(500).json({ error: '공개 상태 확인 실패' });
    }     
  }

  // 7️⃣ 그룹 목록 조회 (GET /groups)
  async getGroups(req, res) {
    try {
      const groups = await groupService.getGroups(); // 서비스 계층에서 그룹 목록 조회
      res.json(groups); // 그룹 목록 반환
    } catch (error) {
      res.status(500).json({ error: '그룹 목록 조회 실패' });
    }
  }

  // 8️⃣ 그룹 공감하기 (POST /groups/:id/like)
  async likeGroup(req, res) {
    try {
      const groupId = parseInt(req.params.id);
      const updatedGroup = await groupService.likeGroup(groupId);

      if (!updatedGroup) {
        return res.status(404).json({ message: '존재하지 않습니다' });
      }

      res.json({ message: '그룹 공감하기 성공' });
    } catch (error) {
      res.status(500).json({ error: '그룹 공감하기 실패' });
    }
  }
}





// 컨트롤러 인스턴스 생성 및 내보내기
module.exports = new GroupController();
