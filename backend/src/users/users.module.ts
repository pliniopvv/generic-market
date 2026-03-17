import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/db/database.provider';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
