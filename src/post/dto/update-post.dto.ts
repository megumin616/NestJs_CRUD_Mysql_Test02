import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
//PartialType(CreatePostDto) ทำหน้าที่สร้าง class ใหม่ที่เหมือนกับ CreatePostDto 
//แต่ทุกฟิลด์จะเป็น optional (ไม่จำเป็นต้องส่งข้อมูลทั้งหมด)