const postService = require('../services/post.service');

const postController = {
    // 1. 게시글 등록
    async createPost(req, res) {
        try {
            const { groupId } = req.params;
            const {
                nickname, title, content, postPassword, groupPassword,
                imageUrl, tags, location, moment, isPublic
            } = req.body;
            const postData = {
                nickname, title, content, postPassword, groupPassword,
                imageUrl, tags, location,
                moment: moment ? new Date(moment).toISOString() : null, // 날짜 변환
                isPublic
            };
            const post = await postService.createPost(groupId, postData);
            res.status(200).json(post);
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "잘못된 요청입니다." });
        }
    },

    // 2. 게시글 목록 조회
    async getPosts(req, res) {
        try {
            const { groupId } = req.params;
            const { page, pageSize, sortBy, keyword, isPublic } = req.query;

            const result = await postService.getPosts(
                parseInt(groupId) || 1,
                parseInt(page) || 1,
                parseInt(pageSize) || 10,
                sortBy,
                keyword,
                isPublic
            );
            res.status(200).json({
                currentPage: result.currentPage,
                totalPages: result.totalPages,
                totalItemCount: result.totalItemCount,
                data: result.data,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "서버 오류가 발생했습니다" });
        }
    },

    // 3. 게시글 수정
    async updatePost(req, res) {
        try {
            const { postId } = req.params;
            const {
                nickname, title, content, postPassword,
                imageUrl, tags, location, moment, isPublic
            } = req.body;

            if (!nickname || !title || !content || !postPassword || !imageUrl ||
                !tags || !location || !moment || isPublic === undefined) {
                return res.status(400).json({ message: "잘못된 요청입니다" });
            }

            const post = await postService.getPostById(postId);
            if (!post) {
                return res.status(404).json({ message: "존재하지 않습니다" });
            }
            if (post.postPassword !== postPassword) {
                return res.status(403).json({ message: "비밀번호가 틀렸습니다" });
            }

            const updateData = {
                nickname, title, content, postPassword,
                imageUrl, tags, location, moment, isPublic
            };

            const updatedPost = await postService.updatePost(postId, updateData);
            res.json({
                id: updatedPost.id, groupId: updatedPost.groupId, nickname: updatedPost.nickname,
                title: updatedPost.title, content: updatedPost.content, imageUrl: updatedPost.imageUrl,
                tags: updatedPost.tags, location: updatedPost.location,
                moment: updatedPost.moment ? new Date(updatedPost.moment).toISOString().split("T")[0] : null,
                isPublic: updatedPost.isPublic, likeCount: updatedPost.likeCount,
                commentCount: updatedPost.commentCount, createdAt: updatedPost.createdAt.toISOString()
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "서버 오류가 발생했습니다" });
        }
    },

    // 4. 게시글 삭제
    async deletePost(req, res) {
        try {
            const { postId } = req.params;
            const { postPassword } = req.body;

            if (!postPassword) {
                return res.status(400).json({ message: "잘못된 요청입니다" });
            }
            const post = await postService.getPostById(postId);
            if (!post) {
                return res.status(404).json({ message: "존재하지 않습니다" });
            }
            const isDeleted = await postService.deletePost(postId, postPassword);
            if (!isDeleted) {
                return res.status(403).json({ message: "비밀번호가 틀렸습니다" });
            }

            res.status(200).json({ message: "게시글 삭제 성공" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "서버 오류가 발생했습니다" });
        }
    },

    // 5. 게시글 상세 정보 조회
    async getPostById(req, res) {
        try {
            const { postId } = req.params;
            const post = await postService.getPostById(postId);

            if (!post) {
                return res.status(400).json({ error: "잘못된 요청입니다" });
            }
            res.json(post);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "서버 오류가 발생했습니다." });
        }
    },

    // 6. 게시글 조회 권한 확인
    async verifyPostPassword(req, res) {
        try {
            const { postId } = req.params;
            const postPassword = req.body.password;
            if (!postPassword) {
                return res.status(401).json({ message: "비밀번호가 틀렸습니다" });
            }

            const result = await postService.verifyPostPassword(postId, postPassword);

            return res.status(result.status).json({ message: result.message });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "서버 오류가 발생했습니다." });
        }
    },

    // 7. 게시글 공감하기
    async likePost(req, res) {
        try {
            const { postId } = req.params;
            const result = await postService.likePost(postId);
            const post = await postService.getPostById(postId);
            if (!post) {
                return res.status(404).json({ message: "존재하지 않습니다" });
            }
            return res.status(result.status).json({ message: result.message });
        } catch (error) {
            console.error("Like Post Error:", error);
            res.status(500).json({ message: "서버 오류가 발생했습니다." });
        }
    },

    // 8. 게시글 공개 여부 확인
    async checkPostPublic(req, res) {
        try {
            const { postId } = req.params;
            const post = await postService.checkPostPublic(postId);
            if (!post) {
                return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
            }
            res.json(post);
        } catch (error) {
            res.status(500).json({ message: "서버 오류가 발생했습니다." });
        }
    }
};

module.exports = postController;
