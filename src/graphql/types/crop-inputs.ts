import { IsInt, Length } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class AddCropInput {
  @Field()
  @Length(1, 50)
  name!: string;

  @Field({ nullable: true })
  @Length(1, 4000)
  notes?: string;

  @Field(() => Int)
  @IsInt()
  plantId!: number;
};
