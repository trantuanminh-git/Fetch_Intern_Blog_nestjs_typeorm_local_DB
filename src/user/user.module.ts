import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from '../profile/user.profile';
import { RoleModule } from 'src/role/role.module';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule, AbilityModule],
  controllers: [UserController],
  providers: [UserService, UserProfile],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
