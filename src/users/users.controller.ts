import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupEmailDto } from './dto/signup-email.dto';
import { editProfileDto } from './dto/edit-profile.dto';
import { deleteAccountDto } from './dto/delete-account.dto';

@ApiTags('USER')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: '유저 개인정보 불러오기' })
  @ApiResponse({ status: 200, description: 'success' })
  @Get()
  getUser() {}

  @ApiOperation({ summary: '회원가입 - 이메일' })
  @ApiResponse({ status: 201, description: 'success' })
  @Post('signup/email')
  signupEmail(@Body() body: SignupEmailDto) {}

  @ApiOperation({ summary: '로그인 - 이메일' })
  @ApiResponse({ status: 200, description: 'success' })
  @Post('login/email')
  loginEmail() {}

  @ApiOperation({ summary: '프로필 변경 - username, password' })
  @ApiResponse({ status: 200, description: 'success' })
  @Put('profile/:userId')
  editProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: editProfileDto,
  ) {}

  @ApiOperation({ summary: '프로필 사진 변경' })
  @ApiResponse({ status: 200, description: 'success' })
  @Put('profile-img/:userId')
  editProfileImg(@Param('userId', ParseIntPipe) userId: number) {}

  @ApiOperation({ summary: '회원탈퇴' })
  @ApiResponse({ status: 200, description: 'success' })
  @Delete(':userId')
  deleteAccount(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: deleteAccountDto,
  ) {}
}
