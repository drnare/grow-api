import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Crop } from '.';

@Entity({ name: 'harvests' })
@ObjectType()
export class Harvest extends BaseEntity {
  @PrimaryColumn()
  @Field()
  id!: string;

  @Column()
  @Field({ nullable: true })
  notes?: string;

  @Column()
  @Field()
  cropId!: string;

  @Column()
  @Field()
  quantity!: number;

  @CreateDateColumn()
  @Field()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @ManyToOne(() => Crop, crop => crop.id)
  crop?: Crop;
};
