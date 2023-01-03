import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User, Status, CartDescription } from './index';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: string;

  @Column({name: "totalprice", default: () => '0' })
  totalPrice: number;

  @Column({ type: 'timestamp without time zone', nullable: true })
  timeToDone: string | null;

	@Column({ type: 'timestamp without time zone', nullable: true })
  returnDate: string | null;

  // many to one
  @ManyToOne(() => Status, (status) => status.carts)
  status: Status;

  // many to one
  @ManyToOne(() => User, (user) => user.carts)
  customer: User;

  @Column('timestamp without time zone', { name: 'delete_at', nullable: true })
  deleteAt: string | null;

  // many to one
  @ManyToOne(() => User, (user) => user.cartsApproved, { nullable: true })
  approvalEmployee: User | null;

  // Cart Description
  @OneToMany(() => CartDescription, (cartDescription) => cartDescription.cart, {
    nullable: true,
  })
  cartDescriptions: CartDescription[] | null;
}
