import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/user.entity';
//import { EXPIRES_IN, JWT_KEY } from "./constants/jwt.constants";

@Module({
  imports: ([TypeOrmModule.forFeature([User])]),
  //JwtModule.register({}),
  //global: true,
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
