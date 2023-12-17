import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { hash, compare } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto) {
    const { username, name, password } = data;
    const encryptPassword = await this.encryptPassword(password);
    return this.userRepository.save({
      username,
      name,
      password: encryptPassword,
    });
  }

  async getUser() {
    const qb = this.userRepository.createQueryBuilder('User');
    qb.addSelect((subQuery) => {
      return subQuery
        .subQuery()
        .select('COUNT(Board.id)', 'boardCount')
        .from(Board, 'Board')
        .where('Board.userId = User.id');
    }, 'User_boardCount');

    return qb.getMany();
  }
  async login(data: LoginUserDto) {
    const { username, password } = data;
    const user = await this.userRepository.findOneBy({
      username,
    });
    if (!user) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    const match = await compare(password, user.password);
    if (!match)
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    return user;
  }

  async encryptPassword(password: string) {
    const DEFAULT_SALT = 11;
    return hash(password, DEFAULT_SALT);
  }
}
