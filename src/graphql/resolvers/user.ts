import bcrypt from 'bcrypt';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { v4 as uuid } from 'uuid';
import { User } from '../entities';
import { AppContext, UserLoginInput, UserRegisterInput } from '../types';

@Resolver(User)
export class UserResolver {
  @Authorized()
  @Query(() => User)
  async me(@Ctx() ctx: AppContext): Promise<User | undefined> {
    const { id } = await ctx.request.jwtVerify();
    return User.findOne({ id });
  }

  @Mutation(() => User, { nullable: true })
  async login(@Ctx() ctx: AppContext, @Arg('input') { email, password }: UserLoginInput): Promise<User | null> {
    const user = await User.findOne({
      email
    });

    if (!user) {
      console.log('No user');
      return null;
    }

    if (!bcrypt.compareSync(password, user?.password || '')) {
      console.log('Passwords do not match');
      return null;
    }

    await user.save();

    const cookie = await ctx.reply.jwtSign({
      id: user.id,
      name: user.name
    });

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    ctx.reply.setCookie('token', cookie, { httpOnly: true, expires, sameSite: 'strict' });
    return user;
  }

  @Mutation(() => User, { nullable: true })
  async register(@Ctx() ctx: AppContext, @Arg('input') { email, password, passwordConfirm }: UserRegisterInput): Promise<User | null> {
    if (passwordConfirm !== password) {
      console.log('Passes don\'t match');
      return null;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('email already in use');
      return null;
    }

    const user = User.create({
      id: uuid(),
      name: '',
      email,
      password: await bcrypt.hash(password, 12),
      lastlogin: new Date().toISOString()
    });
    await user.save();

    const cookie = await ctx.reply.jwtSign({
      id: user.id,
      name: user.name
    });

    ctx.reply.setCookie('token', cookie);

    return user;
  }
};
