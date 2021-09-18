import { Authorized, Query, Resolver } from 'type-graphql';
import { Plant } from '../entities';

@Resolver(Plant)
export class PlantResolver {
  @Authorized()
  @Query(() => [Plant])
  async plants(): Promise<Plant[]> {
    return Plant.find({ order: { name: 'ASC' } });
  }
};
