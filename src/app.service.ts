import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';

// export interface User {
//   username: string;
//   isActive: boolean;
// }

@Injectable()
export class AppService {
//Dimisalkan data dari db
  private users: CreateUserDto[] = [
    {email: 'f@gmail.com', username: 'fateer', isActive: false},
    {email: 'a@gmail.com', username: 'achmed', isActive: true}
  ];

  getHello(): string {
    return 'Hello World!';
  }

  findUserStatus(userStatus: boolean): CreateUserDto[]{
    return this.users.filter((user) => user.isActive == userStatus);
  }
  findByName(username: string): CreateUserDto[]{
    return this.users.filter((user) => user.username == username);
  }

  saveNewUser(entity: CreateUserDto): CreateUserDto {
    this.users.push(entity);
    return entity;
  }
}
