import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

import booksMock from './tests/mocks/books.mocks';
describe('BooksService', () => {
  const booksList: Book[] = [
    new Book({
      _id: '55419226-3fc6-41be-a9b5-99a3dc3ed030',
      titulo: 'Jantar Secreto',
      autor: 'Rafael Montes',
      user: ' 591b6e82-c353-4c14-8546-42cccabcf18c',
      genero: 'Ficção',
      anoDeLancamento: '2016',
    }),
    new Book({
      _id: 'fa9a0a41-5806-4d8c-b366-6efc634be215',
      titulo: 'Suicidas',
      autor: 'Rafael Montes',
      user: '5894d107-313a-4972-823e-512d5541f70c',
      genero: 'Ficção',
      anoDeLancamento: '2016',
    }),
    new Book({
      _id: '6504858d-da3d-4cb3-bdc1-660a1527ca38',
      titulo: 'Neuromancer',
      autor: 'Wilson Gibason',
      user: 'c1489c3d-fc6f-4b33-9e49-322b99101436',
      genero: 'SciFi',
      anoDeLancamento: '1986',
    }),
  ];

  const createBookInputMock: CreateBookInput = {
    titulo: 'Dias Perfeitos',
    autor: 'Rafael Montes',
    genero: 'Ficção',
    anoDeLancamento: '2014',
  };

  const bookUpdateInput: UpdateBookInput = {
    id: '55419226-3fc6-41be-a9b5-99a3dc3ed030',
    titulo: 'Neuromancer',
    autor: 'Wilson Gibson',
    genero: 'SciFi',
    anoDeLancamento: '1986',
  };

  const mockModel = {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
  };
  let bookService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    bookService = module.get<BooksService>(BooksService);
    mockModel.create.mockReset();
    mockModel.find.mockReset();
    mockModel.findOne.mockReset();
    mockModel.findByIdAndUpdate.mockReset();
    mockModel.deleteOne.mockReset();
  });
  const uuidMock = jest.fn().mockImplementation(() => {
    return '591b6e82-c353-4c14-8546-42cccabcf18c';
  });
  jest.mock('uuid', () => {
    return uuidMock;
  });

  describe('Smoke Tests', () => {
    it('should be defined', () => {
      expect(bookService).toBeDefined();
      expect(mockModel).toBeDefined();
    });
  });

  describe('Create Book', () => {
    describe('When the book is created sucessfully', () => {
      it('should a return created book', async () => {
        const createBookInput = createBookInputMock;
        const userId = uuidMock();
        const book = booksList[0];
        mockModel.create.mockReturnValue(book);
        const bookcreated = bookService.create(createBookInput, userId);
        expect(bookcreated).not.toBeNull();
      });
      it('should be a called create method in model', async () => {
        const createBookInput = createBookInputMock;
        const userId = uuidMock();
        const book = booksList[0];
        mockModel.create.mockReturnValue(book);
        bookService.create(createBookInput, userId);

        expect(mockModel.create).toBeCalledTimes(1);
      });
    });
  });

  describe('Find All Books', () => {
    describe('When the list is empty', () => {
      it.skip('Should return a bad Request Exception', async () => {
        const userId = uuidMock();
        mockModel.find.mockReturnValue(null);

        expect(await bookService.findAll(userId)).rejects.toBeInstanceOf(
          BadRequestException,
        );
      });
    });
    describe('When the return is sucess', () => {
      it('should return a  list books', async () => {
        const userId = uuidMock();
        const books = booksList;
        mockModel.find.mockReturnValue(books);
        const booksResponse = await bookService.findAll(userId);
        expect(booksResponse).toBe(books);
      });
    });
  });

  describe(' Find book by titulo', () => {
    describe('When is book existing', () => {
      it('Should return a book or books with the searched title', async () => {
        const user = uuidMock();
        const bookFoundMock = booksList[0];
        mockModel.find.mockReturnValue(bookFoundMock);
        const bookFound = await bookService.findByTitulo(
          user,
          'Jantar Secreto',
        );
        expect(bookFound).toEqual(bookFoundMock);
      });
      it('Should be a called find method in model', async () => {
        const user = uuidMock();
        const bookFoundMock = booksList[0];
        mockModel.find.mockReturnValue(bookFoundMock);
        const bookFound = await bookService.findAll(user);
        expect(bookFound).toEqual(bookFoundMock);
      });
    });
    describe('When this book not exist', () => {
      it('should return a badRequest exception', async () => {
        const user = uuidMock();
        mockModel.find.mockReturnValue(null);
        expect(
          bookService.findByTitulo(user, 'O Vilarejo'),
        ).rejects.toBeInstanceOf(BadRequestException);
      });
    });
  });
  describe('FInd book by id', () => {
    describe(' When  search for an existing book ', () => {
      it('Should return a book', async () => {
        const userId = uuidMock();
        const bookMock = booksList[0];
        const id = bookMock._id;
        mockModel.findOne.mockReturnValue(bookMock);

        const searchBook = await bookService.findOne(id, userId);
        expect(searchBook).toEqual(bookMock);
      });
    });
    describe('When search for an not exist book', () => {
      it.skip('Should return a BadRequest Exception', async () => {
        const userId = uuidMock();
        const id = uuidMock();
        mockModel.findOne.mockReturnValue(null);
        expect(await bookService.findOne(id, userId)).rejects.toBe(
          BadRequestException,
        );
      });
    });
  });

  describe('update a book', () => {
    describe('When book existing', () => {
      it('should return updated book', async () => {
        const updateBookMock = {
          _id: ' 6504858d-da3d-4cb3-bdc1-660a1527ca38',
          titulo: 'Neuromancer',
          autor: 'Wilson Gibson',
          user: 'c1489c3d-fc6f-4b33-9e49-322b99101436',
          genero: 'SciFi',
          anoDeLancamento: '1986',
        };
        const updateInput = bookUpdateInput;
        const book = booksList[2];
        const userId = uuidMock();
        mockModel.findOne.mockReturnValue(book);
        mockModel.findByIdAndUpdate.mockReturnValue(updateBookMock);
        const updatedBook = await bookService.update(updateInput, userId);
        expect(updatedBook).toEqual(updateBookMock);
      });
    });
  });

  describe('Delete a book', () => {
    describe('When user books', () => {
      it('should a return deleted user', async () => {
        const userId = uuidMock();
        const bookFound = booksList[0];
        const id = bookFound._id;
        mockModel.findOne.mockReturnValue(bookFound);
        mockModel.deleteOne.mockReturnValue(true);

        await bookService.remove(userId, id);
      });
    });
  });
});
