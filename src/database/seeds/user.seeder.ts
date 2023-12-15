import { User } from '../../entity/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
export default class UserSeeder implements Seeder {
  track?: boolean;
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    //factoryManager에 대한 규칙을 설정해서 Fake Data 생성하는 것도 가능하다.
    const repository = dataSource.getRepository(User); //데이터 매퍼 패턴
    await repository.insert([
      {
        username: 'fastcampus',
        name: 'hong gildong',
        password: 'fastcampus1234',
      },
    ]);
  }
}
