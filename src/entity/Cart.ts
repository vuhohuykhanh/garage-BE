import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User, Status, CartDescription } from './index';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

	@Column({type: 'timestamp'})
  createTime: Date;

	@Column({type: 'timestamp'})
	totalPrice: Date;

	@Column({type: 'timestamp', nullable: true})
	timeToDone: Date;

	// many to one
	@ManyToOne(() => Status, (status) => status.carts)
	status: Status;

	// many to one
	@ManyToOne(() => User, (user) => user.carts)
	customer: User;

	// many to one
	//@ManyToOne(() => User, (user) => user.carts)
	//approvalEmployee: User;

		// Cart Description

	@OneToMany(
		() => CartDescription,
		(cartDescription) => cartDescription.cart
	)
	cartDescriptions: CartDescription[];
}
