import { userService } from '../services/userService.js';
import { statusCode } from '../utils/statusCode.js';

const userController = {
    register: async (req, res, next) => {
        console.log('userController에 있는 register의 req.file: ', req.file);
        try {
            const newUser = req.body;
            console.log('userController newUser: ', newUser);
            const createUser = await userService.createUser({ newUser });
            statusCode.setResponseCode201(res);
            return res.send(createUser.message);
        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const loginUser = await userService.getUser({ email, password });

            statusCode.setResponseCode200(res);

            return res.send({ message: loginUser.message, token: loginUser.token, userId: loginUser.userId });
        } catch (error) {
            next(error);
        }
    },
    isLogin: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const checkUser = await userService.loginCheck({ userId });

            statusCode.setResponseCode200(res);
            return res.send({
                message: checkUser.message,
                userId: checkUser.userId,
                email: checkUser.email,
                nickname: checkUser.nickname,
            });
        } catch (error) {
            next(error);
        }
    },
    getUserInfo: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await userService.getUserById({ userId });

            statusCode.setResponseCode200(res);
            return res.send(user);
        } catch (error) {
            next(error);
        }
    },
    getRandomUsersInfo: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const users = await userService.getRandomUsers(userId);

            statusCode.setResponseCode200(res);
            return res.send(users);
        } catch (error) {
            next(error);
        }
    },
    getCurrentUserInfo: async (req, res, next) => {
        try {
            const { userId } = req.currentUserId;
            const user = await userService.getUserById({ userId });

            statusCode.setResponseCode200(res);
            return res.send(user);
        } catch (error) {
            next(error);
        }
    },
    getCurrentUserPosts: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const posts = await userService.getMyPosts({ userId });

            statusCode.setResponseCode200(res);
            return res.send(posts);
        } catch (error) {
            next(error);
        }
    },
    getCurrentUserParticipants: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const participants = await userService.getMyParticipants({ userId });

            statusCode.setResponseCode200(res);
            return res.send(participants);
        } catch (error) {
            next(error);
        }
    },
    imagePost: async (req, res, next) => {
        console.log('유저 컨트롤러의 req.file', req.file);
        console.log('유저 컨트롤러의 req.body', req.body);
        try {
            const userId = req.currentUserId;

            if (!req.file) {
                console.log('No file received');
                return res.status(400).send('No file received');
            }

            const imageURL = req.file.location;
            const image = await userService.imageSave(userId, imageURL);

            statusCode.setResponseCode201(res);
            return res.send(image);
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const userId = req.currentUserId;

            const updateUserInfo = req.body;

            const updatedUser = await userService.updateUser({ userId, updateUserInfo });

            statusCode.setResponseCode200(res);
            return res.send(updatedUser);
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const userId = req.currentUserId;

            const deletedUser = await userService.deleteUser({ userId });

            statusCode.setResponseCode200(res);
            return res.send(deletedUser.message);
        } catch (error) {
            next(error);
        }
    },
};

export { userController };
