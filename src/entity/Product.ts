import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
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

  @Column({ type: 'bytea', nullable: true })
  image: Uint8Array;

  @Column({ default: () => '0' })
  quantity: number;

  @Column({ default: () => '0' })
  price: string;

  @Column('timestamp without time zone', { name: 'delete_at', nullable: true })
  deleteAt: string | null;

  @ManyToOne(() => ProductType, (productType) => productType.products)
  productType: ProductType;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.products, {
    nullable: true,
  })
  manufacturer: Manufacturer | null;

  @ManyToOne(() => AccessoryType, (accessoryType) => accessoryType.products, {
    nullable: true,
  })
  accessoryType: AccessoryType | null;

  @ManyToOne(() => ServiceType, (serviceType) => serviceType.products, {
    nullable: true,
  })
  serviceType: ServiceType | null;

  //Sale description
  @OneToMany(
    () => SaleDescription,
    (saleDescription) => saleDescription.product,
    {
      nullable: true,
    }
  )
  saleDescriptions: SaleDescription[] | null;

  // Cart Description
  @OneToMany(
    () => CartDescription,
    (cartDescription) => cartDescription.product,
    {
      nullable: true,
    }
  )
  cartDescriptions: CartDescription[] | null;

  //Product Description
  @OneToMany(
    () => ProductDescription,
    (productDescription) => productDescription.product,
    {
      nullable: true,
    }
  )
  productDescriptions: ProductDescription[] | null;

  // Comment
  @OneToMany(() => Comment, (comment) => comment.product, { nullable: true })
  comments: Comment[] | null;
}
