import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { randomUUID } from 'node:crypto';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: randomUUID(),
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findUserById(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const user = this.findUserById(id);
    const index = this.users.findIndex((user) => user.id === id);
    const updateUser = { ...user, ...updateUserDto };
    this.users[index] = updateUser;

    return updateUser;
  }

  delete(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('Usuário não encontrado');
    }
    this.users.splice(index, 1);
  }
}
