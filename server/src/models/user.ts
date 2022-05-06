/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { pre, prop, getModelForClass } from '@typegoose/typegoose';
import argon2 from 'argon2';

// eslint-disable-next-line no-use-before-define
@pre<User>('save', async (next) => {
  // @ts-ignore: Object is possibly 'null'.
  if (this.isModified('password') || this.isNew) {
    // @ts-ignore: Object is possibly 'null'.
    const hash = await argon2.hash(this.password);
    // @ts-ignore: Object is possibly 'null'.
    this.password = hash;
    return next();
  }
})
export class User {
  @prop({ required: true, unique: true })
  public username!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: false })
  public password!: string;

  @prop({ required: false })
  public googleId!: string;

  // eslint-disable-next-line space-before-function-paren
  public async comparePassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
