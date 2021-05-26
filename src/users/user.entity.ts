import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import * as bcrypt from 'bcryptjs';
  
  @Entity()
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nama: string;
 
    @Column()
    username: string;

    @Column()
    password: string;
  
    @Column()
    @CreateDateColumn()
    registered: Date;

    @Column()
    isAdmin: boolean;

    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 8);
    }
  
    async validatePassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }
  }