import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Content extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    content: string;
 
    @Column()
    author: string;

  }