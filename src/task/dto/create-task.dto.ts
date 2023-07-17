import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  description: string;

  @IsString()
  status: string;

  @IsString()
  title: string;
}
