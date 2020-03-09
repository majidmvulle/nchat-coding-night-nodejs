import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import logger from "../../shared/Logger";
import {User} from "../../db/models/User";
import {Room} from "../../db/models/Room";
import {sequelize} from "../../db";
import moment from "moment";
import {QueryTypes} from "sequelize";

const router = Router();

//create room
router.post('',async (req: Request, res: Response) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await getUser(username, password);
        let room = await Room.create({name: name,  code: Room.generateCode(), ownerId: user!.id},
            {include: [
                    {model: User, as: 'owner'},
                    {model: User, as: 'usersJoined'}
                ]});
        room = await room.save();

        await joinRoom(user.id,  room.id);

        room = await room.reload();

        const _room = room.toJSON();

        // @ts-ignore
        delete _room.owner.password;

        // @ts-ignore
        _room.usersJoined = _room.usersJoined.map((_item: any) => {
            delete _item.password;
            return _item;
        });

        return res.status(OK).json(_room);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

router.get('/:code', async (req: Request, res: Response) => {
    const code = req.params.code;

    try {
        const room = await Room.findOne({
            include: [
                {model: User, as: 'owner'},
                {model: User, as: 'usersJoined'}
            ],
            where: {
                code: code
            }});

        if (!room){
            throw Error('Room not found');
        }

        const _room = room.toJSON();

        // @ts-ignore
        delete _room.owner.password;

        // @ts-ignore
        _room.usersJoined = _room.usersJoined.map((_item: any) => {
            delete _item.password;
            return _item;
        });

        return res.status(OK).json(_room);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});


router.post('/:code/join', async (req: Request, res: Response) => {
    const code = req.params.code;
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await getUser(username, password);
        let room = await Room.findOne({
            include: [{model: User, as: 'owner'}, {model: User,  as: 'usersJoined'}],
            where: {
                code: code
            }});

        if (!room){
            throw Error('Room not found');
        }

        await joinRoom(user.id,  room.id);

        room = await room.reload();

        let _room = room.toJSON();

        // @ts-ignore
        delete _room.owner.password;

        // @ts-ignore
        _room.usersJoined = _room.usersJoined.map((_item: any) => {
            delete _item.password;
            return _item;
        });

        return res.status(OK).json(_room);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

async function  getUser(username: string, password: string): Promise<User>{
    let user = await User.findOne({
        where: {
            username: username
        }
    });

    if (user){
        if (!user!.isPasswordValid(password)){
            throw new Error('Invalid password');
        }
    }else{
        user = await User.create({username: username, password: User.generateHash(password)});
    }
    return user;
}

async function joinRoom(userId: number, roomId: number) {
    try{
        await sequelize.query(`INSERT INTO user_room 
                                    (userId,roomId,createdAt,updatedAt) 
                                    VALUES(${userId}, ${roomId},'${moment().format('YYYY-MM-DD HH:mm')}', '${moment().format('YYYY-MM-DD HH:mm')}')
                                     `,
            {type: QueryTypes.INSERT});
    }catch (e) {
        //ignore
    }
}

export default router;
