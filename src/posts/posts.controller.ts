import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createPostDto } from './dto/create-post.dto';
import { editPostDto } from './dto/edit-post.dto';
import { FindOneParamsDto } from 'src/common/dto/find-one-params.dto';
import { LoggedInGuard } from 'src/auth/guard/logged-in.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserEntity } from 'src/entities/users.entity';

@ApiTags('POST')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: '게시물 불러오기 - 10개씩' })
  @ApiResponse({ status: 200, description: 'success' })
  @Get()
  getPosts() {}

  @ApiOperation({ summary: '특정 게시물 불러오기' })
  @ApiResponse({ status: 200, description: 'success' })
  @Get(':postId')
  getPost(@Param('postId', ParseIntPipe) postId: FindOneParamsDto) {}

  @ApiOperation({ summary: '게시물 작성' })
  @ApiResponse({ status: 201, description: 'success' })
  @UseGuards(LoggedInGuard)
  @Post()
  createPost(@User() user: UserEntity, @Body() body: createPostDto) {}

  @ApiOperation({ summary: '게시물 수정' })
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(LoggedInGuard)
  @Put(':postId')
  editPost(
    @User() user: UserEntity,
    @Param('postId', ParseIntPipe) postId: FindOneParamsDto,
    @Body() body: editPostDto,
  ) {}

  @ApiOperation({ summary: '게시물 삭제' })
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(LoggedInGuard)
  @Delete(':postId')
  deletePost(
    @User() user: UserEntity,
    @Param('postId', ParseIntPipe) postId: FindOneParamsDto,
  ) {}
}
