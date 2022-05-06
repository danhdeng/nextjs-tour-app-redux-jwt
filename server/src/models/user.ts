/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { pre, prop, getModelForClass } from '@typegoose/typegoose';
import argon2 from 'argon2';

// eslint-disable-next-line no-use-before-define
@pre<User>('save', async (next) => {
  if (this.isModified('password') || this.isNew) {
    const hash = await argon2.hash(this.password);
    this.password = hash;
    return next();
  }
})
export class User {
  @prop({ required: true, unique: true })
  public username!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
