import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum Method {
  PIX,
  CARD,
  SLIP,
}

@Entity()
export class Checkout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Products: Product[];

  @Column()
  token_payment: string;

  @Column()
  method: Method;
}
