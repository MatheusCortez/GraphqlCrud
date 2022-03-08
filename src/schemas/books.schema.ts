import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;
ObjectType();
@Schema()
export class Book {
  @Prop()
  @Field(() => ID)
  id: string;
  @Prop()
  @Field()
  titulo: string;
  @Prop()
  @Field()
  autor: string;
  @Prop()
  @Field()
  genero: string;
  @Prop()
  @Field()
  user: string;
  @Prop()
  @Field()
  anoDeLancamento: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
