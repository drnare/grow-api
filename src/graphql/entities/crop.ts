import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Harvest, Plant } from '.';

@Entity({ name: 'crops' })
@ObjectType()
export class Crop extends BaseEntity {
  @PrimaryColumn()
  @Field()
  id!: string;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field({ nullable: true })
  notes?: string;

  @Column()
  @Field()
  plantId!: number;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @OneToOne(() => Plant, plant => plant.id, { eager: true })
  @JoinColumn({ name: 'plantId' })
  @Field(() => Plant)
  plant!: Plant;

  @OneToMany(() => Harvest, harvest => harvest.crop, { eager: true })
  @Field(() => [Harvest], { nullable: true })
  harvests?: Harvest[];
};
