import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import logger from "../../shared/Logger";

const router = Router();

router.post('/join', async (req: Request, res: Response) => {

    const code = req.body.code;
    const username = req.body.username;

    try {
        return res.status(OK).json({'code': code,  "username": username});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

export default router;
