import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { ApicepService } from '../services/apicep/apicep.service';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import userMock from './test/mocks/users.mock';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { uuid } from 'uuidv4';

describe('UserService', () => {
  let userService: UserService;
  const mockModel = {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
  };
  const mockApiService = {
    search: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockModel,
        },
        {
          provide: ApicepService,
          useValue: mockApiService,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    mockModel.create.mockReset();
    mockModel.find.mockReset();
    mockModel.findOne.mockReset();
    mockModel.findOneAndUpdate.mockReset();
    mockModel.deleteOne.mockReset();
  });
  const uuidMock = jest.fn().mockImplementation(() => {
    return '591b6e82-c353-4c14-8546-42cccabcf18c';
  });
  jest.mock('uuid', () => {
    return uuidMock;
  });

  describe('Smoke Tests', () => {
    it('should be a defined', () => {
      expect(userService).toBeDefined();
      expect(mockApiService).toBeDefined();
      expect(mockModel).toBeDefined();
    });
  });
  describe('Create User', () => {
    describe('when a user is successfully created', () => {
      it('Should an user creating sucess', async () => {
        const createInputUser = userMock.giveMeValidCreateInput();
        const user = userMock.giveMeOneValidUser();
        mockModel.findOne.mockReturnValue(null);
        mockApiService.search.mockReturnValue({
          code: '03607060',
          state: 'SP',
          city: 'São Paulo',
          district: 'Vila São Geraldo',
          address: 'Rua Guacari',
        });
        mockModel.create.mockReturnValue(user);
        await mockApiService.search();
        await userService.create(createInputUser);
        // passo 1 -- mockar uuid,591b6e82-c353-4c14-8546-42cccabcf18c
        // passo 2 -- mockar a implementacao this.userModel create
        // verificar chamada do this.model create
      });
      it('should a method model create is called one time', async () => {
        const createInputUser = userMock.giveMeValidCreateInput();
        const user = userMock.giveMeOneValidUser();
        mockModel.findOne.mockReturnValue(null);
        mockApiService.search.mockReturnValue({
          code: '03607060',
          state: 'SP',
          city: 'São Paulo',
          district: 'Vila São Geraldo',
          address: 'Rua Guacari',
        });
        mockModel.create.mockReturnValue(user);
        await mockApiService.search();
        await userService.create(createInputUser);

        expect(mockModel.create).toBeCalledTimes(1);
      });
      it('should an creating user with address null', async () => {
        const createInputUser = userMock.giveMeValidCreateInput();
        const userWithAddressNull = {
          _id: '591b6e82-c353-4c14-8546-42cccabcf18c',
          name: 'Matheus Cortez',
          email: 'matheus.cortez@live.com',
          password: '1234',
          address: null,
        };
        mockModel.findOne.mockReturnValue(null);
        mockApiService.search.mockReturnValue(null);
        mockModel.create.mockReturnValue(userWithAddressNull);
        await mockApiService.search();
        const createdUser = await userService.create(createInputUser);

        expect(createdUser.address).toBeNull();
      });
    });
    describe('When creating an user email already exist', () => {
      it('Should a bad request exception', async () => {
        const createInputUser = userMock.giveMeValidCreateInput();
        const user = userMock.giveMeOneValidUser();
        mockModel.findOne.mockReturnValue(user);
        expect(userService.create(createInputUser)).rejects.toBeInstanceOf(
          BadRequestException,
        );
      });
    });
  });

  describe('Find All Users', () => {
    describe('when  fetching the user list', () => {
      it('Should a list users', async () => {
        const usersMock = userMock.giveMeValidUsers();
        mockModel.find.mockReturnValue(usersMock);
        const users = await userService.findAll();
        expect(users).toEqual(usersMock);
      });
    });
  });
  describe('Find User by Id', () => {
    describe(' When  search for an existing user', () => {
      it('should return a user ', async () => {
        const user = userMock.giveMeOneValidUser();
        mockModel.findOne.mockReturnValue(user);
        const userFound = await userService.findOne(
          '591b6e82-c353-4c14-8546-42cccabcf18c',
        );
        expect(userFound).toEqual(user);
      });
      it('should called FindOne  method one time', async () => {
        const user = userMock.giveMeOneValidUser();
        mockModel.findOne.mockReturnValue(user);
        await userService.findOne('591b6e82-c353-4c14-8546-42cccabcf18c');
        expect(mockModel.findOne).toBeCalledTimes(1);
      });
    });
    describe('When search a inexist user', () => {
      it('Should a http exception', async () => {
        mockModel.findOne.mockReturnValue(null);
        expect(
          userService.findOne('591b6e82-c353-4c14-8546-42cccabcf18c'),
        ).rejects.toBeInstanceOf(NotFoundException);
      });
    });
  });

  describe('Updated User', () => {
    describe('When user existing', () => {
      it('should return updated user', async () => {
        const updateUserMock = {
          _id: ' 591b6e82-c353-4c14-8546-42cccabcf18c',
          name: 'Matheus Cortez',
          email: 'matheus.cortez@live.com',
          password: '1234',
          address: {
            code: '05089001',
            state: 'SP',
            city: 'São Paulo',
            district: 'Vila Leopoldina',
            address: 'Rua Guaipa',
          },
        };
        const updateInput = userMock.giveMeValidUpdateInput();
        const user = userMock.giveMeOneValidUser();
        mockModel.findOne.mockReturnValue(user);
        mockModel.findOneAndUpdate.mockResolvedValue(updateUserMock);
        mockApiService.search.mockReturnValue({
          code: '05089001',
          state: 'SP',
          city: 'São Paulo',
          district: 'Vila Leopoldina',
          address: 'Rua Guaipa',
        });
        const address = mockApiService.search();
        const updatedUser = await userService.update(
          '591b6e82-c353-4c14-8546-42cccabcf18c',
          updateInput,
        );
        expect(updatedUser).toEqual(updateUserMock);
      });
      it('should a call the method FindOneAndUpdat in Model ', async () => {
        const updateUserMock = {
          _id: ' 591b6e82-c353-4c14-8546-42cccabcf18c',
          name: 'Matheus Cortez',
          email: 'matheus.cortez@live.com',
          password: '1234',
          address: {
            code: '05089001',
            state: 'SP',
            city: 'São Paulo',
            district: 'Vila Leopoldina',
            address: 'Rua Guaipa',
          },
        };
        const updateInput = userMock.giveMeValidUpdateInput();
        const user = userMock.giveMeOneValidUser();
        mockModel.findOne.mockReturnValue(user);
        mockModel.findOneAndUpdate.mockResolvedValue(updateUserMock);
        mockApiService.search.mockReturnValue({
          code: '05089001',
          state: 'SP',
          city: 'São Paulo',
          district: 'Vila Leopoldina',
          address: 'Rua Guaipa',
        });
        const address = mockApiService.search();
        const updatedUser = await userService.update(
          '591b6e82-c353-4c14-8546-42cccabcf18c',
          updateInput,
        );
        expect(mockModel.findOneAndUpdate).toBeCalledTimes(1);
      });
      describe('When address is null', () => {
        it('should ', async () => {
          const updateUserMock = {
            _id: ' 591b6e82-c353-4c14-8546-42cccabcf18c',
            name: 'Matheus Cortez',
            email: 'matheus.cortez@live.com',
            password: '1234',
            address: null,
          };
          const updateInput = userMock.giveMeValidUpdateInput();
          const user = userMock.giveMeOneValidUser();
          mockModel.findOne.mockReturnValue(user);
          mockModel.findOneAndUpdate.mockResolvedValue(updateUserMock);
          mockApiService.search.mockReturnValue(null);
          await mockApiService.search();
          const updatedUser = await userService.update(
            '591b6e82-c353-4c14-8546-42cccabcf18c',
            updateInput,
          );
          expect(updatedUser).toEqual(updateUserMock);
        });
      });
    });
    describe.skip('When user not exist', () => {
      it('should a exception HTTP', async () => {
        mockModel.findOne.mockResolvedValue(null);

        await mockModel.findOne();
        const updateInput = userMock.giveMeValidUpdateInput();
        await expect(
          userService.update(
            '591b6e82-c353-4c14-8546-42cccabcf18c',
            updateInput,
          ),
        ).rejects.toBeInstanceOf(NotFoundException);
      });
    });
  });

  describe('Delete a user', () => {
    describe('When user not exist', () => {
      it.skip('should a exception HTTP', async () => {
        mockModel.findOne.mockReturnValue(null);
        const result = async () =>
          await userService.remove('591b6e82-c353-4c14-8546-42cccabcf18c');

        expect(result).rejects.toThrow(
          new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: 'Nenhum usuário encontrado',
            },
            HttpStatus.NOT_FOUND,
          ),
        );
      });
    });

    describe('When user exists', () => {
      it('should a return deleted user', async () => {
        const userFound = userMock.giveMeOneValidUser();
        mockModel.findOne.mockReturnValue(userFound);
        mockModel.deleteOne.mockReturnValue(true);

        await userService.remove('591b6e82-c353-4c14-8546-42cccabcf18c');
      });
    });
  });
});
