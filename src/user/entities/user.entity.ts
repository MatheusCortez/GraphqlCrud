import { ObjectType, Field, Int, ID, HideField } from '@nestjs/graphql';
import { Address } from '../../schemas/user.schema';

@ObjectType()
export class User {
  constructor(User?: Partial<User>) {
    this._id = User._id;
    this.name = User.name;
    this.email = User.email;
    this.address = User.address;
  }
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
