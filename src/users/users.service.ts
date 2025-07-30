import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { generateRandomString } from 'src/helper/generate';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    // Việc kiểm tra mật khẩu trùng khớp đã được DTO validator xử lý
    const { email, password, fullName } = dto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) throw new ConflictException('Email đã tồn tại');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        token: generateRandomString(12),
      },
    });

    // Không bao giờ trả về password đã hash trong response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;

    return { message: 'Đăng ký thành công', user: result };
  }
}
