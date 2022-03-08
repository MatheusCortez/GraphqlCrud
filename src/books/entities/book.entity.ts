import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(() => ID)
  id: string;
  @Field()
  titulo: string;
  @Field()
  autor: string;
  @Field()
  user: string;
  @Field()
  genero: string;
  @Field()
  anoDeLancamento: string;
}
