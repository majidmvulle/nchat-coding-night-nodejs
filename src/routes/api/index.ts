import { Router } from 'express';
import RoomRouter from './rooms';

const router = Router();

router.use('/rooms', RoomRouter);

export default router;
