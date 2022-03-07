import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Address } from 'src/schemas/user.schema';

@ObjectType()
export class User {
  @Field(() => Int)
  id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field(() => Address)
  address?: Address;
}
