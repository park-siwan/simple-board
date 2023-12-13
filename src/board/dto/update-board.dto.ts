import { MaxLength, MinLength, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateBoardDto {
  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  contents?: string;
}
