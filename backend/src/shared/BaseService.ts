import { Repository, FindOneOptions } from 'typeorm';
import Entity from './Entity';

export class BaseService<T extends Entity> {
  constructor(protected readonly repository: Repository<T>) {}

  create(model: T) {
    return this.repository.save(model);
  }

  async findAll(size: number, page: number) {
    if (size && page) {
      const [data, total] = await this.repository.findAndCount({
        skip: (page - 1) * size,
        take: size,
      });
      return {
        data,
        total,
        page,
        size,
        totalPages: Math.ceil(total / size),
      };
    } else return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id } as any);
  }

  update(id: number, model: T) {
    model.id = id;
    return this.repository.save(model);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
