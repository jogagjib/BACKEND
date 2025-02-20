const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const postService = {
    async createPost(groupId, postData) {
        // Group 모델에 password 가져오기
        const group = await prisma.group.findUnique({
            where: { id: parseInt(groupId) },
            select: { password: true }
        });
        if (!group) {
            throw new Error("그룹이 존재하지 않습니다.");
        }
        // 비밀번호 검증 (비공개 그룹일 경우만 체크)
        if (group.password && group.password !== postData.groupPassword) {
            throw new Error("그룹 비밀번호가 올바르지 않습니다.");
        }

        // 게시글 생성
        return await prisma.post.create({
            data: {
                groupId: parseInt(groupId),
                nickname: postData.nickname,
                title: postData.title,
                content: postData.content,
                postPassword: postData.postPassword,
                imageUrl: postData.imageUrl,
                tags: postData.tags ?? [], // undefined 방지
                location: postData.location,
                moment: postData.moment ? new Date(postData.moment).toISOString() : null,
                isPublic: postData.isPublic || false
            }
        });
    },

    async getPosts(groupId, page = 1, pageSize = 10, sortBy = "latest", keyword, isPublic) {
        const whereCondition = {
            groupId: parseInt(groupId),
            isPublic: isPublic !== undefined ? Boolean(isPublic) : true,
        };

        // 검색어 필터 적용
        if (keyword) {
            whereCondition.OR = [
                { title: { contains: keyword, mode: "insensitive" } },
                { content: { contains: keyword, mode: "insensitive" } },
            ];
        }

        // 전체 게시글 개수 조회
        const totalItemCount = await prisma.post.count({ where: whereCondition });

        // 페이지네이션 적용
        const posts = await prisma.post.findMany({
            where: whereCondition,
            orderBy: { id: "asc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: { group: { select: { password: true } } }, // ✅ 그룹 비밀번호 포함
        });

        // 총 페이지 수 계산
        const totalPages = Math.ceil(totalItemCount / pageSize);

        return {
            currentPage: page,
            totalPages: totalPages,
            totalItemCount: totalItemCount,
            data: posts.map(post => ({
                id: post.id,
                nickname: post.nickname,
                title: post.title,
                imageUrl: post.imageUrl,
                tags: post.tags,
                location: post.location,
                moment: post.moment,
                isPublic: post.isPublic,
                likeCount: post.likeCount,
                commentCount: post.commentCount,
                createdAt: post.createdAt,
            })),
        };
    },

    async updatePost(postId, updateData) {
        return await prisma.post.update({
            where: { id: parseInt(postId) },
            data: updateData
        });
    },

    async deletePost(postId, postPassword) {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(postId) },
            select: { postPassword: true }
        });
        if (!post) {
            return false; // 게시글이 존재하지 않음
        }
        if (post.postPassword !== postPassword) {
            return false; // 비밀번호가 일치하지 않음
        }
    
        await prisma.post.delete({
            where: { id: parseInt(postId) }
        });
    
        return true;
    },
    

    async getPostById(postId) {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(postId) },
            select: {
                id: true,
                groupId: true,
                nickname: true,
                title: true,
                content: true,
                postPassword: true,
                imageUrl: true,
                tags: true,
                location: true,
                moment: true,
                isPublic: true,
                likeCount: true,
                commentCount: true,
                createdAt: true
            }
        });

        if (!post) {
            return null;
        }

        return post;
    },

    async verifyPostPassword(postId, postPassword) {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(postId) },
            select: { postPassword: true }
        });
    
        if (!post) {
            return { status: 404, message: "게시글을 찾을 수 없습니다." };
        }
    
        if (!post.postPassword || !postPassword) {
            return { status: 401, message: "비밀번호가 틀렸습니다" };
        }
    
        if (String(post.postPassword).trim() !== String(postPassword).trim()) {
            return { status: 401, message: "비밀번호가 틀렸습니다" };
        }
    
        return { status: 200, message: "비밀번호가 확인되었습니다" };
    },

    async likePost(postId) {
        // 게시글 존재 여부 확인
        const post = await prisma.post.findUnique({
        where: { id: parseInt(postId) }
        });
        if (!post) {
            return { status: 404, message: "존재하지 않습니다" };
        }
        // 좋아요 증가 처리
        await prisma.post.update({
            where: { id: parseInt(postId) },
            data: { likeCount: { increment: 1 } }
        });
        return { status: 200, message: "게시글 공감하기 성공" };
    },

    async checkPostPublic(postId) {
        const numericPostId = parseInt(postId); // 문자열을 숫자로
        if (isNaN(numericPostId)) {
            throw new Error("Invalid postId"); // 숫자가 아닌 경우 에러 발생
    }
        const post = await prisma.post.findUnique({
            where: { id: parseInt(postId) },
            select: { id:true, isPublic: true }
        });
        return post;
    }
};

module.exports = postService;
