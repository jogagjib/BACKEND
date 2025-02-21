const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group.controller'); // 컨트롤러 가져오기

// 1️⃣ 그룹 생성 (POST /groups)
router.post('/', groupController.createGroup);

// 2️⃣ 특정 그룹 조회 (GET /groups/:id)
router.get('/:id', groupController.getGroup);

// 3️⃣ 그룹 정보 수정 (PUT /groups/:id)
router.put('/:id', groupController.updateGroup);

// 4️⃣ 그룹 삭제 (DELETE /groups/:id)
router.delete('/:id', groupController.deleteGroup);

// 5️⃣ 비밀번호 검증 (POST /groups/:id/verify-password)
router.post('/:id/verify-password', groupController.verifyPassword);

// 6️⃣ 그룹 공개 여부 확인 (GET /groups/:id/is-public)
router.get('/:id/is-public', groupController.checkPublicStatus);

// 7️⃣ 그룹 목록 조회 (GET /groups)
router.get('/', groupController.getGroups);

// 8️⃣ 그룹 공감하기 (POST /groups/:id/like)
router.post('/:id/like', groupController.likeGroup);

module.exports = router;
