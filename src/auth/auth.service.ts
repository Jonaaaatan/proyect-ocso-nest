import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository <User>
  ){}
  registerUser(CreateUserDto: CreateUserDto){
    CreateUserDto.userPassword = bcrypt.hashSync(CreateUserDto.userPassword, 5)
    return this.userRepository.save(CreateUserDto)
  }

  async loginUser(CreateUserDto: CreateUserDto){
    const user = await this.userRepository.findOne({
      where: {
        userEmail: CreateUserDto.userEmail
      }
    })
    
    if(!user) throw new NotFoundException();
    const match = await bcrypt.compare(CreateUserDto.userPassword, user.userPassword)
    if (!match) throw new UnauthorizedException("No estas autorizado");
    return;
  }

}
