import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { v4 as uuid } from 'uuid';
import { Crop, Harvest } from '../entities';
import { AddHarvestInput } from '../types';

@Resolver(Harvest)
export class HarvestResolver {
  @Authorized()
  @Query(() => [Harvest])
  async harvests(@Arg('cropId') cropId: string): Promise<Harvest[]> {
    return Harvest.find({ cropId });
  }

  @Authorized()
  @Mutation(() => Harvest)
  async addHarvest(@Arg('input') input: AddHarvestInput): Promise<Harvest | null> {
    const harvest = Harvest.create({
      id: uuid(),
      ...input,
    });

    return await harvest.save();
  }
};
