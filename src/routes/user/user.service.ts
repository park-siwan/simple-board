import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto) {
    return this.userRepository.save(data);
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
}
