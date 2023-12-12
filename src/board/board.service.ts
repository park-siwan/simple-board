import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  private boards = [
    {
      id: 1,
      title: 'hello world1',
      content: 'Content 1',
    },
    {
      id: 2,
      title: 'hello world2',
      content: 'Content 2',
    },
    {
      id: 3,
      title: 'hello world3',
      content: 'Content 3',
    },
  ];
  findAll() {
    return this.boards;
  }

  find(id: number) {
    return this.boards.find((v) => v.id === Number(id));
  }

  create(data) {
    const newBoard = { id: this.getNextId(), ...data };
    this.boards.push(newBoard);
    return newBoard;
  }

  update(id: number, data) {
    const index = this.getBoardIndex(id);
    if (index > -1) {
      this.boards[index] = { id: this.boards[index].id, ...data };
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
