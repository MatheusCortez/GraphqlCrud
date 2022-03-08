import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateBookInput {
  @IsNotEmpty({
    message: 'Titulo  é um campo obrigatorio',
  })
  @IsString({ message: ' ' })
  @MinLength(3, { message: 'Titulo deve ser maior que 3 caracteres' })
  @Field()
  titulo: string;
  @IsNotEmpty({
    message: 'Autor  é um campo obrigatorio',
  })
  @IsString({ message: ' ' })
  @MinLength(3, { message: 'Valor minimo de 3 caracteres' })
  @MaxLength(50, { message: 'Valor maximo de até 50 caracteres' })
  @Field()
  autor: string;
  @IsNotEmpty({
    message: 'genero é um campo obrigatorio',
  })
  @MinLength(3, { message: 'Valor minimo de 3 caracteres' })
  @Field()
  genero: string;
  @IsNotEmpty({
    message: 'Ano de Lancamento  é um campo obrigatorio',
  })
  @Field()
  @IsString({ message: '' })
  anoDeLancamento: string;
}
