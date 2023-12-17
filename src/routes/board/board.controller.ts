import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiTags } from '@nestjs/swagger';

import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserInfo } from 'src/decorators/user-info.decorator';

@Controller('board')
@ApiTags('Board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.find(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@UserInfo() userInfo, @Body('contents') contents: string) {
    if (!userInfo) throw new UnauthorizedException();

    return this.boardService.create({
      userId: userInfo.id,
      contents,
    });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) data: UpdateBoardDto,
  ) {
    return this.boardService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.delete(id);
  }
}
