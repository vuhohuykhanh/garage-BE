import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User, Role, Comment } from './index';

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column()
  purchaseCount: number;

  // account - role
  @ManyToOne(() => Role, (role) => role.accounts)
  role: Role;

	//@Column()
	//userId: string;

  // account - user
  @OneToOne(() => User, (user) => user.account, {cascade: true})
  @JoinColumn()
  user: User;

  // comment
  @OneToMany(() => Comment, (comment) => comment.account)
  comments: Comment[];

	comparePassword = (password: string) => {
		return bcrypt.compareSync(password, this.password)
	}

	setPassword = (password: string) => {
		return (this.password = bcrypt.hashSync(password, 10))
	}

	generateJWT = () => {
		console.log(this.username, this.password)
		return jwt.sign({
			username: this.username,
			password: this.password,
		}, "GarageLink")
	}
}
