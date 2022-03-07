import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Address {
  @Prop()
  @Field({ nullable: true })
  code: string;
  @Prop()
  @Field({ nullable: true })
  state: string;
  @Prop()
  @Field({ nullable: true })
  city: string;
  @Prop()
  @Field({ nullable: true })
  district: string;
  @Prop()
  @Field({ nullable: true })
  address: string;
}

export type UserDocument = User & Document;

@ObjectType()
@Schema()
export class User {
  @Prop()
  @Field(() => ID)
  id: string;
  @Prop()
  @Field()
  name: string;
  @Prop()
  @Field()
  email: string;
  @Prop()
  @Field()
  password: string;
  @Prop({ type: Address })
  @Field(() => Address)
  address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);
