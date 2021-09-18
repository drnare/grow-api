import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Crop } from '.';

@Entity({ name: 'plants' })
@ObjectType()
export class Plant extends BaseEntity {
  @PrimaryColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  group!: string;

  @OneToOne(() => Crop, crop => crop.plant)
  @Field(() => Plant, { nullable: true })
  crop?: Crop;
};
