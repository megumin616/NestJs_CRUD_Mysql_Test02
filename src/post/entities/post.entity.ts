import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() //1) @Entity คำสั่งนี้บอก TypeORM ว่าสิ่งนี้เป็น entity ซึ่งจะถูกแปลงเป็นตารางในฐานข้อมูล
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    subtitle: string;

    @Column()
    body: string;

    @Column()
    price: number;
}
//การใช้ entity ทำให้การทำงานกับฐานข้อมูลง่ายขึ้น เพราะเราสามารถใช้ class ในการจัดการข้อมูลแทนการเขียนคำสั่ง SQL ตรง ๆ