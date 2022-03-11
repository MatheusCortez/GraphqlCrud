import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './../schemas/user.schema';
import { ApicepService } from '../services/apicep/apicep.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private apiCepService: ApicepService,
  ) {}
  async create(createUserInput: CreateUserInput) {
    const { name, cep, email, password } = createUserInput;
    const userFound = await this.findByEmail(email);

    if (!!userFound) throw new BadRequestException('Email já cadastrado ');

    const apiCepResponse = await this.apiCepService.search(cep);
    const address = apiCepResponse
      ? {
          code: apiCepResponse.code,
          state: apiCepResponse.state,
          city: apiCepResponse.city,
          district: apiCepResponse.district,
          address: apiCepResponse.address,
        }
      : null;
    const passwordhash = await bcrypt.hash(password, 12);
    const user: User = {
      _id: uuid(),
      name,
      email,
      password: passwordhash,
      address,
    };

    return this.userModel.create(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) throw new NotFoundException('Nenhum usuário encontrado');
    return user;
  }
  async findByEmail(email: string) {
    const userEmailFound = await this.userModel.findOne({ email: email });
    return userEmailFound;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const userFound = await this.findOne(id);
    if (!userFound) throw new NotFoundException('Nenhum usuário encontrado');
    const { name, cep } = updateUserInput;
    const apiCepResponse = await this.apiCepService.search(cep);
    const address = apiCepResponse
      ? {
          code: apiCepResponse.code,
          state: apiCepResponse.state,
          city: apiCepResponse.city,
          district: apiCepResponse.district,
          address: apiCepResponse.address,
        }
      : null;

    return this.userModel.findOneAndUpdate(
      {
        id: id,
      },
      {
        name,
        cep,
        address,
      },
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    const userFound = await this.findOne(id);
    if (!userFound) throw new NotFoundException('Nenhum usuário encontrado');

    return this.userModel.deleteOne({
      id: id,
    });
  }
}
