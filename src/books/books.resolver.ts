import { GqlAuthGuard } from '../auth/guards/gql.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorator/user.decorator';

@Resolver(() => Book)
@UseGuards(GqlAuthGuard)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Book)
  createBook(
    @Args('createBookInput') createBookInput: CreateBookInput,
    @CurrentUser() user,
  ) {
    return this.booksService.create(createBookInput, user);
  }

  @Query(() => [Book])
  findAllBooks(@CurrentUser() user) {
    return this.booksService.findAll(user);
  }
  @Query(() => [Book])
  findAllBooksByTitulo(
    @Args('titulo', { type: () => String }) titulo: string,
    @CurrentUser() user,
  ) {
    return this.booksService.findByTitutlo(titulo, user);
  }

  @Query(() => Book)
  findOneBook(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user,
  ) {
    return this.booksService.findOne(id, user);
  }

  @Mutation(() => Book)
  updateBook(
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
    @CurrentUser() user,
  ) {
    return this.booksService.update(updateBookInput, user);
  }

  @Mutation(() => Book)
  removeBook(@Args('id', { type: () => Int }) id: number) {
    //  return this.booksService.remove(id);
  }
}
