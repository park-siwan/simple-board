import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength, IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty({
    description: '이름',
    required: true,
    example: '홍길동',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '이름',
    required: true,
    example: '홍길동',
  })
  contents: string;
}