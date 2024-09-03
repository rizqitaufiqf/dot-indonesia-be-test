import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo')
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: number;

  @Column()
  id: number;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  completed: boolean;
}
