import { statusCode } from '../utils/statusCode.js';
import { participantService } from '../services/participantService.js';
const participantController = {
    participatePost: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;

            const participant = await participantService.participatePost({ userId, postId });

            statusCode.setResponseCode201(res);
            res.send(participant.message);
        } catch (error) {
            next(error);
        }
    },
    participateCancel: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;

            const participant = await participantService.participateCancel({ userId, postId });

            statusCode.setResponseCode201(res);
            res.send(participant.message);
        } catch (error) {
            next(error);
        }
    },
    getParticipants: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;

            const participants = await participantService.getParticipants({ userId, postId });

            statusCode.setResponseCode200(res);
            res.send({ message: participants.message, participantsList: participants.participants });
        } catch (error) {
            next(error);
        }
    },
};
export { participantController };
