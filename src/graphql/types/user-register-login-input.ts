import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UserLoginInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(6, 255)
  password!: string;

  @Field()
  remember!: boolean;
};

@InputType()
export class UserRegisterInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(6, 255)
  password!: string;

  @Field()
  @Length(6, 255)
  passwordConfirm!: string;
};
