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
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createPostDto } from './dto/create-post.dto';
import { editPostDto } from './dto/edit-post.dto';

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
  getPost(@Param('postId', ParseIntPipe) postId: number) {}

  @ApiOperation({ summary: '게시물 작성' })
  @ApiResponse({ status: 201, description: 'success' })
  @Post()
  createPost(@Body() body: createPostDto) {}

  @ApiOperation({ summary: '게시물 수정' })
  @ApiResponse({ status: 200, description: 'success' })
  @Put(':postId')
  editPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() body: editPostDto,
  ) {}

  @ApiOperation({ summary: '게시물 삭제' })
  @ApiResponse({ status: 200, description: 'success' })
  @Delete(':postId')
  deletePost(@Param('postId', ParseIntPipe) postId: number) {}
}
