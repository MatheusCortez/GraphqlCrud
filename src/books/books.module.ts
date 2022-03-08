import { BookSchema, Book } from './../schemas/books.schema';
import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  exports: [BooksService],
  providers: [BooksResolver, BooksService],
})
export class BooksModule {}
