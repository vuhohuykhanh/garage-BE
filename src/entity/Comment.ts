import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Account, Product } from './index';

@Entity()
export class Comment {
  @PrimaryColumn()
  accountId: number;

  @ManyToOne(() => Account, (account) => account.comments)
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => Product, (product) => product.comments)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  content: string;

  @Column({ type: 'timestamp' })
  time: Date;
}
