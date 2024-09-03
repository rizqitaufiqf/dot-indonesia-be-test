import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: number;
  @Column()
  id: number;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  body: string;
}
