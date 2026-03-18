import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/db/database.provider';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
