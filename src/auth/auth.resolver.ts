import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthType)
  async login(@Args('data') data: AuthInput): Promise<AuthType> {
    const response = await this.authService.validateUser(data);
    return { user: response.user, token: response.token };
  }
}
