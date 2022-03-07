import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty({
    message: 'Nome é um campo obrigatorio',
  })
  @Field()
  name: string;
  @IsNotEmpty({ message: 'Email é um campo obrigatorio' })
  @IsEmail({}, { message: 'Email inserido invalido' })
  @Field()
  email: string;
  @IsNotEmpty({ message: 'Password é um campo obrigatorio' })
  @Field()
  password: string;
  @IsNotEmpty({
    message: 'CEP é um campo obrigatorio',
  })
  @Field({ nullable: true })
  cep: string;
}
