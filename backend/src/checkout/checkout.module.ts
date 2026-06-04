import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/db/database.provider';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature(entities), ProductModule],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule { }
