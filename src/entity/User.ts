import { Entity, PrimaryColumn, Column, OneToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account, Cart } from './index';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

	@Column({unique: true})
	idCardNumber: string;

  @Column()
  name: string;

  @Column({nullable: true})
  address: string | null;

  @Column({type: 'timestamp', nullable: true})
  dob: Date | null;

	@Column({type: 'bytea', nullable: true})
  avatar: Uint8Array | null;

	@Column({nullable: true})
  email: string | null;

	@Column({nullable: true})
  phoneNumber: string | null;

	@Column('timestamp without time zone', {name: 'detele_at', nullable: true})
	deleteAt: Date | null;

	@OneToOne(() => Account, (account) => account.user)
	account: Account;

	@OneToMany(() => Cart, (cart) => cart.customer)
  carts: Cart[];
}