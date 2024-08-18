import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class AddSampleData1723685037551 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = 'Password1';
    const password2 = 'Password2';
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedPassword2 = await bcrypt.hash(password2, salt);

    const user1Result = await queryRunner.query(
      `INSERT INTO "user" (username, password) VALUES ('Test1', '${hashedPassword}') RETURNING id;`,
    );
    const user1Id = user1Result[0].id;

    const user2Result = await queryRunner.query(
      `INSERT INTO "user" (username, password) VALUES ('Test2', '${hashedPassword2}') RETURNING id;`,
    );
    const user2Id = user2Result[0].id;

    await queryRunner.query(`
      INSERT INTO "task" (title, description, status, "userId")
      VALUES ('Task 1', 'Description for Task 1', 'OPEN', '${user1Id}'),
             ('Task 2', 'Description for Task 2', 'IN_PROGRESS', '${user1Id}'),
             ('Task 3', 'Description for Task 3', 'DONE', '${user1Id}'),
             ('Task 4', 'Description for Task 4', 'OPEN', '${user2Id}'),
             ('Task 5', 'Description for Task 5', 'IN_PROGRESS', '${user2Id}'),
             ('Task 6', 'Description for Task 6', 'DONE', '${user2Id}');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
