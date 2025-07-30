import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { generateRandomString } from 'src/helper/generate';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const { email, password, confirmPassword, fullName } = dto;
    if (password !== confirmPassword) {
      throw new Error('Mật khẩu và xác nhận mật khẩu không khớp');
    }
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) throw new Error('Email đã tồn tại');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        token: generateRandomString(12),
      },
    });

    return { message: 'Đăng ký thành công', user };
  }
}
