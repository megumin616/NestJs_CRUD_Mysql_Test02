import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>
  ) {}
  //1) constructor เหมือนกับการบอกว่า "ก่อนที่เราจะเริ่มทำงาน เราต้องมีเครื่องมือก่อน"
  //2) @InjectRepository(Post) คือการบอกให้ NestJS ไปเอา "เครื่องมือ" ที่ใช้จัดการข้อมูลโพสต์จากฐานข้อมูลมาให้
  //3) เครื่องมือนี้เราตั้งชื่อว่า postRepository มันคือเครื่องมือที่เอาไว้เข้าถึงและจัดการข้อมูลในตารางโพสต์ เช่น ถ้าจะสร้างโพสต์ใหม่หรือลบโพสต์ ก็จะใช้เครื่องมือนี้
  //4) พอเรามี postRepository ใน constructor เราก็สามารถใช้มันในส่วนต่าง ๆ ของคลาสนี้เพื่อทำงานกับข้อมูลจริงในฐานข้อมูลได้
  //สรุปง่าย ๆ ก็คือ constructor นี้เป็นเหมือนขั้นตอนเตรียมเครื่องมือให้พร้อมสำหรับการทำงานกับข้อมูลโพสต์


  //ลองคิดง่าย ๆ ว่าโค้ดส่วนนี้เป็นเหมือนขั้นตอนในการรับข้อมูลโพสต์ใหม่และนำไปบันทึกในฐานข้อมูล
  async create(createPostDto: CreatePostDto) {  //1) เรารับข้อมูลโพสต์ใหม่จาก createPostDto (เช่น ชื่อเรื่อง และเนื้อหาโพสต์)
    const post = await this.postRepository.create(createPostDto);
    //2) จากนั้นเราใช้ this.postRepository.create(createPostDto) เพื่อ "สร้าง" โพสต์ในระบบ (แต่ยังไม่ได้บันทึกลงฐานข้อมูล)
    const savePost = await this.postRepository.insert(post);
    //3) หลังจากนั้น เราใช้ this.postRepository.insert(post) เพื่อบันทึกโพสต์ที่เราสร้างไว้ในฐานข้อมูล
    return savePost;
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({id});
    //ถ้าเราใช้ findOneBy(id) โดยตรง TypeORM จะไม่รู้ว่าค่าที่เราส่งไปคือค่าที่ต้องการค้นหาตามฟิลด์ไหน (เช่น id, title, หรือฟิลด์อื่น)
    //แต่สามารถกำหมดแบบไหนก็ได้ระหว่าง {id} , {id: id}
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    // ค้นหาโพสต์ที่ต้องการอัปเดตตาม id
    const post = await this.postRepository.findOneBy({ id });
  
    // ตรวจสอบว่าโพสต์มีอยู่ในฐานข้อมูลหรือไม่
    if (!post) {
      throw new Error(`Post with id ${id} not found`); // ถ้าไม่พบโพสต์ ให้โยนข้อผิดพลาด
    }
  
    // อัปเดตข้อมูลโพสต์ด้วยข้อมูลใหม่จาก updatePostDto
    Object.assign(post, updatePostDto);
    //1) Object.assign() เป็นฟังก์ชันใน JavaScript ที่ใช้สำหรับรวม (merge) อ็อบเจ็กต์สองอันหรือมากกว่าเข้าด้วยกัน
    //2) ในที่นี้ เรามีสองอ็อบเจ็กต์:  post: อ็อบเจ็กต์ที่มีข้อมูลโพสต์เดิม (ก่อนการอัปเดต), updatePostDto: อ็อบเจ็กต์ที่มีข้อมูลใหม่ที่เราต้องการอัปเดต
    //3) Object.assign(post, updatePostDto) จะคัดลอกคุณสมบัติทั้งหมดจาก updatePostDto มายัง post
    //4) ถ้ามีคุณสมบัติใดใน updatePostDto ที่มีชื่อเดียวกับ post (เช่น title, body ฯลฯ) ค่าจาก updatePostDto จะทับค่าจาก post
    //5) 
  
    // บันทึกโพสต์ที่อัปเดตลงในฐานข้อมูล
    return this.postRepository.save(post); // คืนค่าโพสต์ที่อัปเดต
  }
  

  async remove(id: number) {
    // ค้นหาโพสต์ที่ต้องการลบตาม id
    const post = await this.postRepository.findOneBy({ id });
  
    // ตรวจสอบว่าโพสต์มีอยู่ในฐานข้อมูลหรือไม่
    if (!post) {
      throw new Error(`Post with id ${id} not found`); // ถ้าไม่พบโพสต์ ให้โยนข้อผิดพลาด
    }
  
    // ลบโพสต์จากฐานข้อมูล
    await this.postRepository.delete(id); // ใช้ delete เพื่อทำการลบโพสต์
    //ใช้ค่าโดยตรง .delete(id) ถ้าส่ง id (ซึ่งเป็นค่าของโพสต์ที่ต้องการลบ) มันจะเข้าใจว่าคุณต้องการลบรายการที่มี id ตรงกับค่าที่ส่งไป
    //ใช้วัตถุ .delete({id}) ถ้าคุณส่งอ็อบเจ็กต์เช่น { id } มันจะมองหาข้อมูลที่ตรงกับคุณสมบัติในอ็อบเจ็กต์นั้น เช่น {title: title}
  
    // คืนค่าข้อความยืนยันว่าลบโพสต์สำเร็จ
    return `Post with id ${id} has been removed successfully`; 
  }
  
}
