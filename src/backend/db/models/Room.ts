import BelongsTo, {
  Model,
  DataTypes,
  BelongsToManyAddAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToGetAssociationMixin
} from 'sequelize';
import { Association, HasManyCreateAssociationMixin } from 'sequelize';
import {sequelize} from '../../db';
import {User} from "./User";
import {UserRoom} from "./UserRoom";

export class Room extends Model {
  public id!: number;
  public name!: string;
  public code!: string;
  public ownerId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public createRoomOwned!: HasManyCreateAssociationMixin<Room>;
  public setOwner!: BelongsToSetAssociationMixin<User,number>;
  public getOwner!: BelongsToGetAssociationMixin<User>;
  public addUserJoined!: BelongsToManyAddAssociationMixin<User, User['id']>;

  public readonly owner?: User;
  public readonly usersJoined?: User[];

  public static associations: {
    owner: Association<User, Room>;
    usersJoined: Association<User, Room>;
  };

  public static generateCode()
  {
    return Math.random().toString(36).substring(6);
  }
}

Room.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  code: {
    type: new DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'room',
});
