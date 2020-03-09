import bcrypt from 'bcrypt-nodejs';
import {Room} from "./Room";
import {sequelize} from '../../db';
import {BelongsToManyAddAssociationMixin, Association, Model, DataTypes} from "sequelize";
import {UserRoom} from "./UserRoom";

export class User extends Model {
  public id!: number;
  public username!: string;

  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static generateHash(password: string): string
  {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  public isPasswordValid(password: string): boolean
  {
    return bcrypt.compareSync(password, this.password)
  }

  public addRoomsJoined!: BelongsToManyAddAssociationMixin<Room, number>;

  public readonly roomsJoined?: Room[];

  public static associations: {
    roomsJoined: Association<User, Room>;
  };
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: new DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: new DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'user',
});

User.hasMany(Room, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'roomsOwned'
});

User.belongsToMany(Room, {through: UserRoom, as: 'roomsJoined'});
Room.belongsTo(User, { targetKey: 'id', foreignKey: 'ownerId', as: 'owner'});
Room.belongsToMany(User, {through: UserRoom, as: 'usersJoined'});
