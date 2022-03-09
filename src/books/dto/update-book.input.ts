import { CreateBookInput } from './create-book.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput {
  @Field()
  id: string;
  @Field({ nullable: true })
  titulo?: string;
  @Field({ nullable: true })
  autor?: string;
  @Field({ nullable: true })
  genero?: string;
  @Field({ nullable: true })
  anoDeLancamento?: string;
}
