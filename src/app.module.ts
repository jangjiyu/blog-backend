import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/db/typeorm.config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/env/database.config';
import appConfig from './config/env/app.config';
import authConfig from './config/env/auth.config';
// import { validationSchema } from './config/env/validation-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig, authConfig],
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env',
      isGlobal: true,
      // validationOptions: validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
