import { User, UserType } from '../../types/index.js';
import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/index.js';
import { Types } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({required: true, trim: true, default: ''})
  public name: string;

  @prop({required: true, trim: true, unique: true})
  public email: string;

  @prop({required: false, trim: true, default: 'https://15.design.htmlacademy.pro/static/avatar/7.jpg'})
  public avatarUrl: string;

  @prop({required: true, trim: true})
  public password: string;

  @prop({required: true, enum: UserType})
  public type: UserType;

  @prop({type: Types.ObjectId, default: [],})
  public favoriteOffers: Types.Array<Types.ObjectId>;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}
export const UserModel = getModelForClass(UserEntity);
