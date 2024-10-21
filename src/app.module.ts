import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({ //ทำให้ TypeORM รู้ว่าเรากำลังเชื่อมต่อกับฐานข้อมูลใดและใช้การตั้งค่าใดในการเชื่อมต่อกับฐานข้อมูลนั้น
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs_crud02',
      entities: [Post], //ที่เก็บข้อมูลของ entity (คือ class ที่ใช้แทนตารางในฐานข้อมูล) เมื่อเราเขียน entity ต่าง ๆ เราจะเพิ่ม class นั้น ๆ ใน array นี้
      synchronize: true, //มันจะสร้างตารางหรืออัปเดตตารางในฐานข้อมูลตาม entity ที่เรากำหนด
    }),
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
