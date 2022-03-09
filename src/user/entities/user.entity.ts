import { ObjectType, Field, Int, ID, HideField } from '@nestjs/graphql';
import { Address } from 'src/schemas/user.schema';

@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @HideField()
  password: string;
  @Field(() => Address)
  address?: Address;
}
