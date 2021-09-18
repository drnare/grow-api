import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { v4 as uuid } from 'uuid';
import { Crop, Plant } from '../entities';
import { AppContext, AddCropInput } from '../types';

@Resolver(Crop)
export class CropResolver {
  @Authorized()
  @Query(() => [Crop])
  async crops(): Promise<Crop[]> {
    return Crop.find();
  }

  @Authorized()
  @Mutation(() => Crop)
  async addCrop(@Arg('input') input: AddCropInput): Promise<Crop | null> {
    const crop = Crop.create({
      id: uuid(),
      ...input,
    });

    return await crop.save();
  }
};
