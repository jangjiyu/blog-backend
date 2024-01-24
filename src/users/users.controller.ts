import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupByEmailDto } from './dto/signup-email.dto';
import { editProfileDto } from './dto/edit-profile.dto';
import { deleteAccountDto } from './dto/delete-account.dto';
import { FindOneParamsDto } from 'src/common/dto/find-one-params.dto';
import { LoggedInGuard } from 'src/auth/guard/logged-in.guard';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { NotLoggedInGuard } from 'src/auth/guard/not-logged-in.guard';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('USER')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: '회원정보 불러오기' })
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(new LoggedInGuard())
  @Get()
  getUser() {
    return 'hi';
  }

  @ApiOperation({ summary: '회원가입 - 이메일' })
  @ApiResponse({ status: 201, description: 'success' })
  @UseGuards(new NotLoggedInGuard())
  @Post('signup/email')
  async signupByEmail(@Body() body: SignupByEmailDto) {
    await this.usersService.signupByEmail(body);
  }

  @ApiOperation({ summary: '로그인 - 이메일' })
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(new LocalAuthGuard())
  @Post('login/email')
  loginByEmail(@User() user, @Session() session) {
    return { user, sessionId: session.id };
  }

  @ApiOperation({ summary: '프로필 변경 - username, password' })
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(new LoggedInGuard())
  @Put('profile/:userId')
  editProfile(
    @Param('userId', ParseIntPipe) userId: FindOneParamsDto,
    @Body() body: editProfileDto,
  ) {}

  @ApiOperation({ summary: '프로필 사진 변경' })
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(new LoggedInGuard())
  @Put('profile-img/:userId')
  editProfileImg(@Param('userId', ParseIntPipe) userId: FindOneParamsDto) {}

  @ApiOperation({ summary: '로그아웃' })
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(new LoggedInGuard()) // 로그인 한 사람만 로그아웃 가능
  @Post('logout')
  logout() {}

  @ApiOperation({ summary: '회원탈퇴' })
  @ApiResponse({ status: 200, description: 'success' })
  @Delete(':userId')
  deleteAccount(
    @Param('userId', ParseIntPipe) userId: FindOneParamsDto,
    @Body() body: deleteAccountDto,
  ) {}
}
