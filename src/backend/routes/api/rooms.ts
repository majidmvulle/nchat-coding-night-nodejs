import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import logger from "../../shared/Logger";
import {User} from "../../db/models/User";
import {Room} from "../../db/models/Room";
import {UserRoom} from "../../db/models/UserRoom";
import {sequelize} from "../../db";
import moment from "moment";
import {QueryTypes} from "sequelize";

const router = Router();

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
        room.usersJoined?.push(user);
        room = await room.save();

        const _room = room.toJSON();

        return res.status(OK).json(_room);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

router.get('/:id/:code', async (req: Request, res: Response) => {
    const id = req.params.id;
    const code = req.params.code;

    try {
        const room = await Room.findOne({
            include: [
                {model: User, as: 'owner'},
                {model: User, as: 'usersJoined'}
            ],
            where: {
                id: id,
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


router.post('/:id/:code/join', async (req: Request, res: Response) => {
    const id = req.params.id;
    const code = req.params.code;
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await getUser(username, password);
        let room = await Room.findOne({
            include: [{model: User, as: 'owner'}, {model: User,  as: 'usersJoined'}],
            where: {
                id: id,
                code: code
            }});

        if (!room){
            throw Error('Room not found');
        }

        try{
        await sequelize.query(`INSERT INTO user_room 
                                    (userId,roomId,createdAt,updatedAt) 
                                    VALUES(${user.id}, ${room.id},'${moment().format('YYYY-MM-DD HH:mm')}', '${moment().format('YYYY-MM-DD HH:mm')}')
                                     `,
            {type: QueryTypes.INSERT});
        room = await room.reload();
        }catch (e) {
            //ignore
        }

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

export default router;
