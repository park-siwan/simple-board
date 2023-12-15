import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1702626949090 implements MigrationInterface {
    name = 'Migration1702626949090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "passwrod" TO "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "password" TO "passwrod"`);
    }

}
