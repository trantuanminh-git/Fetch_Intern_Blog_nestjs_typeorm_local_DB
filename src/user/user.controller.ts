import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ReadUserInfoDto } from './dto/read-user-info.dto';
import { PoliciesGuard } from 'src/ability/abilities.guard';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import {
  AbilityFactory,
  Action,
} from 'src/ability/ability.factory/ability.factory';
import { Role } from 'src/role/entities/role.entity';
import { ForbiddenError } from '@casl/ability';
import { AtGuard } from 'src/common/guards/at.guard';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private caslAbilityFactory: AbilityFactory,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReadUserInfoDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<ReadUserInfoDto[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReadUserInfoDto[]> {
    return this.userService.findOne(+id);
  }

  @UseGuards(AtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetCurrentUserId() curUserId: number,
  ): Promise<UpdateUserDto> {
    // const currentUser: User = {
    //   id: 4000,
    //   email: 'email2@gmail.com',
    //   username: 'minhtran2',
    //   biography: 'mybio2',
    //   role: new Role('blogger'),
    //   password: 'abc',
    //   refreshToken: 'abc',
    //   blogs: [],
    // };

    return this.userService.update(+id, updateUserDto, curUserId);

    // ============================================================
    // return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckAbilities({ action: Action.Delete, subject: User })
  remove(@Param('id') id: string): Promise<User[]> {
    return this.userService.remove(+id);
  }
}
