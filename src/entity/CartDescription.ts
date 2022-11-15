import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Cart, CartType, Product } from './index';

@Entity()
export class CartDescription {
  @PrimaryColumn()
  cartId: number;

  @ManyToOne(() => Cart, (cart) => cart.cartDescriptions)
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.cartDescriptions)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  quantity: number;

  @Column({ type: 'timestamp' })
  usageTime: Date;

  @ManyToOne(() => CartType, (cartType) => cartType.cartDescriptions)
  cartType: CartType;
}
