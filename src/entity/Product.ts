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

  @Column({default: () => "0"})
  quantity: number;

  @Column({default: () => "0"})
  price: string;

	@Column('timestamp without time zone', {name: 'detele_at', nullable: true})
	deleteAt: Date | null;

  @ManyToOne(() => ProductType, (productType) => productType.products)
  productType: ProductType;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.products, {
    nullable: true,
  })
  manufacturer: Manufacturer;

  @ManyToOne(() => AccessoryType, (accessoryType) => accessoryType.products, {
    nullable: true,
  })
  accessoryType: AccessoryType;

  @ManyToOne(() => ServiceType, (serviceType) => serviceType.products, {
    nullable: true,
  })
  serviceType: ServiceType;

  //Sale description
  @OneToMany(
    () => SaleDescription,
    (saleDescription) => saleDescription.product, {
			nullable: true,
		}
  )
  saleDescriptions: SaleDescription[];

  // Cart Description
  @OneToMany(
    () => CartDescription,
    (cartDescription) => cartDescription.product, {
			nullable: true
		}
  )
  cartDescriptions: CartDescription[];

  //Product Description
  @OneToMany(
    () => ProductDescription,
    (productDescription) => productDescription.product, {
			nullable: true,
		}
  )
  productDescriptions: ProductDescription[];

  // Comment
  @OneToMany(() => Comment, (comment) => comment.product, {nullable: true})
  comments: Comment[];
}
