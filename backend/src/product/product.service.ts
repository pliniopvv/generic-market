import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  create(model: Product) {
    return this.repository.save(model);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
    } as FindOneOptions<Product>);
  }

  update(id: number, model: Product) {
    model.id = id;
    return this.repository.save(model);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
