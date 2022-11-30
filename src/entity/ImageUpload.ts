import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { ProductDescription, User } from './index';

@Entity()
export class ImageUpload {
  @PrimaryGeneratedColumn()
  id: number;

	@Column()
  filename: string;

	@Column()
	filepath: string;

	@Column()
	mimetype: string;

	@Column({type: 'bigint'})
	size : string;

	//User
  @OneToOne(() => User, (user) => user.avatar, {cascade: true})
  user: User;
}
