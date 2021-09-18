import { IsInt, isInt, IsUUID, Length } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class AddHarvestInput {
  @Field()
  @Length(1, 4000)
  notes?: string;

  @Field(() => Int)
  @IsInt()
  quantity!: number;

  @Field()
  @IsUUID('4')
  cropId!: string;
};
