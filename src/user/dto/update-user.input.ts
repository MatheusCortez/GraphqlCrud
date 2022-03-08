import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  id: string;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  cep?: string;
}
