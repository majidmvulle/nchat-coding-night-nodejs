import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../../db';
import {Room} from "./Room";
import {User} from "./User";

export class UserRoom extends Model {
}

UserRoom.init({
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  roomId: {
    type: new DataTypes.STRING(100),
    primaryKey: true,
  }
}, {
  sequelize,
  tableName: 'user_room',
});


