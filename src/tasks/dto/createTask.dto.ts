import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Trạng thái không được để trống' })
  status: string;

  @IsString()
  @IsNotEmpty({ message: 'Nội dung không được để trống' })
  content: string;

  @IsOptional()
  @IsDateString()
  timeStart?: string;

  @IsOptional()
  @IsDateString()
  timeFinish?: string;

  @IsOptional()
  taskParentId?: number;
}
