import { MigrationInterface, QueryRunner } from 'typeorm';

//Migration for creating the database
export class CreateDatabase1723154611424 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE DATABASE task-management`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP DATABASE task-management`);
  }
}
