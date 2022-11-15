import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import {
  AccessoryType,
  CartDescription,
  Comment,
  Manufacturer,
  ProductDescription,
  ProductType,
  SaleDescription,
  ServiceType,
} from './index';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'bytea' })
  image: Uint8Array;

  @Column()
  quantity: number;

  @Column()
  price: string;

  @ManyToOne(() => ProductType, (productType) => productType.products)
  productType: ProductType;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.products, {
    nullable: true,
  })
  manufacturer: string;

  @ManyToOne(() => AccessoryType, (accessory) => accessory.products, {
    nullable: true,
  })
  accessoryType: string;

  @ManyToOne(() => ServiceType, (accessory) => accessory.products, {
    nullable: true,
  })
  serviceType: string;

  //Sale description
  @OneToMany(
    () => SaleDescription,
    (saleDescription) => saleDescription.product
  )
  saleDescriptions: SaleDescription[];

  // Cart Description
  @OneToMany(
    () => CartDescription,
    (cartDescription) => cartDescription.product
  )
  cartDescriptions: CartDescription[];

  //Product Description
  @OneToMany(
    () => ProductDescription,
    (productDescription) => productDescription.product
  )
  productDescriptions: ProductDescription[];

  // Comment
  @OneToMany(() => Comment, (comment) => comment.product)
  comments: Comment[];
}
