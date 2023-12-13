import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  private boards = [
    {
      id: 1,
      name: 'hello world1',
      contents: 'Content 1',
    },
    {
      id: 2,
      name: 'hello world2',
      contents: 'Content 2',
    },
    {
      id: 3,
      name: 'hello world3',
      contents: 'Content 3',
    },
  ];
  findAll() {
    return this.boards;
  }

  find(id: number) {
    return this.boards.find((v) => v.id === id);
  }

  create(data: CreateBoardDto) {
    const newBoard = { id: this.getNextId(), ...data };
    this.boards.push(newBoard);
    return newBoard;
  }

  update(id: number, data: UpdateBoardDto) {
    const index = this.getBoardIndex(id);
    if (index > -1) {
      this.boards[index] = { ...this.boards[index], ...data };
      return this.boards[index];
    }
    return null;
  }

  delete(id: number) {
    const index = this.getBoardIndex(id);
    if (index > -1) {
      const deleteBoard = this.boards[index];
      this.boards.splice(index, 1);
      return deleteBoard;
    }
    return null;
  }

  getBoardIndex(id: number) {
    return this.boards.findIndex((v) => v.id === Number(id));
  }

  getNextId() {
    return this.boards.sort((a, b) => b.id - a.id)[0].id + 1;
  }
}
