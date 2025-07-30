import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Match } from '../validators/match.validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Họ và tên không được để trống' })
  fullName: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @MinLength(6, { message: 'Xác nhận mật khẩu phải có ít nhất 6 ký tự' })
  @Match('password', { message: 'Mật khẩu và xác nhận mật khẩu không khớp' })
  confirmPassword: string;
}
