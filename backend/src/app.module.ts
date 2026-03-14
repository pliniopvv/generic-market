import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from './db/database.provider';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forRoot(dataSourceConfig as any)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
