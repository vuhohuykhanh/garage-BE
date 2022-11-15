import { Entity, PrimaryColumn, JoinColumn, Column, ManyToOne } from 'typeorm';
import { Product, DescriptionType } from './index';

@Entity()
export class ProductDescription {
  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => Product, (product) => product.productDescriptions)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @PrimaryColumn()
  descriptionTypeId: number;

  @ManyToOne(() => DescriptionType, (descriptionType) => descriptionType.productDescriptions)
  @JoinColumn({ name: 'descriptionTypeId' })
  descriptionType: DescriptionType;

  @Column()
  content: string;
}
