import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]) //ทำให้โมดูลสามารถเข้าถึง entity ที่เฉพาะเจาะจงเพื่อทำงานกับฐานข้อมูลในระดับโมดูลนั้น ๆ
    //การใช้ forFeature([Post]) จะทำให้เราสามารถใช้ Post entity กับ PostService หรือ PostController 
    //เพื่อทำงาน CRUD กับตาราง Post ในฐานข้อมูลได้ครับ
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
