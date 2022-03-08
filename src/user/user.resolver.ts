import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User])
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Query(() => User)
  async findOne(@Args('id', { type: () => ID }) id: string) {
    const userFound = await this.userService.findOne(id);
    return userFound;
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const { id } = updateUserInput;
    const updatedUser = await this.userService.update(id, updateUserInput);
    console.log(updatedUser);
    return updatedUser;
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.userService.remove(id);
  }
}
