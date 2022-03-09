import { uuid } from 'uuidv4';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/schemas/books.schema';
import { BookDocument } from './../schemas/books.schema';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  create(createBookInput: CreateBookInput, user) {
    const { userId } = user;
    const { titulo, anoDeLancamento, genero, autor } = createBookInput;
    const book: Book = {
      _id: uuid(),
      titulo,
      autor,
      anoDeLancamento,
      genero,
      user: userId,
    };
    return this.bookModel.create(book);
  }

  async findAll(user) {
    const { userId } = user;
    const books = await this.bookModel.find({ user: userId });
    if (books.length < 1)
      throw new BadRequestException('Nenhum livro Encontrado');
    return books;
  }
  async findByTitutlo(titulo, user) {
    const { userId } = user;
    const books = await this.bookModel.find({ user: userId, titulo });
    if (books.length === 0)
      throw new BadRequestException('Nenhum livro Encontrado');

    return books;
  }
  async findOne(id: string, user) {
    const { userId } = user;
    const bookFound = await this.bookModel.findOne({
      user: userId,
      id,
    });

    if (!bookFound) throw new BadRequestException('Nenhum livro Encontrado');
    return bookFound;
  }
  async update(updateBookInput: UpdateBookInput, user) {
    const { userId } = user;
    const { titulo, id, genero, anoDeLancamento } = updateBookInput;
    const bookFound = await this.bookModel.findOne({ _id: id, user: userId });
    if (!bookFound) throw new BadRequestException('Livro não cadastrado');

    return this.bookModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        titulo,
        genero,
        anoDeLancamento,
      },
      {
        new: true,
      },
    );
  }
}
