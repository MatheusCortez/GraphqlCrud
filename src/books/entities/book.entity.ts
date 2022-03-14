import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Book {
  constructor(Book?: Partial<Book>) {
    this._id = Book._id;
    this.titulo = Book.titulo;
    this.autor = Book.autor;
    this.user = Book.user;
    this.genero = Book.genero;
    this.anoDeLancamento = Book.anoDeLancamento;
  }
  @Field(() => ID)
  _id: string;
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
