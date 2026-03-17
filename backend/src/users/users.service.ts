import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  save(user: User) {
    return this.repository.save(user);
  }

  find() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({ id } as any);
  }

  findUsername(username: string) {
    return this.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne();

    // findBy({ where: { username } } as any);
  }

  delete(id: number) {
    return this.repository.delete({ where: { id } } as any);
  }
}
