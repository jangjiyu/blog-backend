import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SignupByEmailDto } from './dto/signup-email.dto';
import { EditProfileDto } from './dto/edit-profile.dto';
import { EditPasswordDto } from './dto/edit-password.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { LoggedInGuard } from 'src/auth/guard/logged-in.guard';
import { NotLoggedInGuard } from 'src/auth/guard/not-logged-in.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserEntity } from 'src/entities/users.entity';
import { LoginByEmailDto } from './dto/login.dto';

@ApiTags('USER')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: '회원정보 불러오기' })
  @ApiCookieAuth('connect.sid')
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(LoggedInGuard)
  @Get()
  getUser(@User() user: UserEntity) {
    return user;
  }

  @ApiOperation({ summary: '회원가입 - 이메일' })
  @ApiResponse({ status: 201, description: 'success' })
  @UseGuards(NotLoggedInGuard)
  @Post('signup/email')
  signupByEmail(@Body() body: SignupByEmailDto) {
    // TODO: 프로필 사진 있을 시 등록
    return this.usersService.signupByEmail(body);
  }

  @ApiOperation({ summary: '로그인 - 이메일' })
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(LocalAuthGuard)
  @Post('login/email')
  loginByEmail(
    @User() user: UserEntity,
    @Session() session,
    @Body() body: LoginByEmailDto,
  ) {
    return { ...user, sessionId: session.id };
  }

  @ApiOperation({ summary: '프로필 변경 - username' })
  @ApiCookieAuth('connect.sid')
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(LoggedInGuard)
  @Put('profile')
  editProfile(@User() user: UserEntity, @Body() body: EditProfileDto) {
    return this.usersService.editProfile(user, body);
  }

  @ApiOperation({ summary: '비밀번호 변경' })
  @ApiCookieAuth('connect.sid')
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(LoggedInGuard)
  @Put('password')
  editPassword(@User() user: UserEntity, @Body() body: EditPasswordDto) {
    return this.usersService.editPassword(user.id, body);
  }

  @ApiOperation({ summary: '프로필 사진 변경' })
  @ApiCookieAuth('connect.sid')
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(LoggedInGuard)
  @Put('profile-img')
  editProfileImg(@User() user: UserEntity) {}

  @ApiOperation({ summary: '로그아웃' })
  @ApiCookieAuth('connect.sid')
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(LoggedInGuard) // 로그인 한 사람만 로그아웃 가능
  @Get('logout')
  logout(@Req() req, @Res() res) {
    req.session.destroy();
    res.clearCookie('connect.sid', { httpOnly: true });

    return res.send({ message: 'ok' });
  }

  @ApiOperation({ summary: '회원탈퇴' })
  @ApiCookieAuth('connect.sid')
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(LoggedInGuard)
  @Delete()
  deleteAccount(@User() user: UserEntity, @Body() body: DeleteAccountDto) {}
}
