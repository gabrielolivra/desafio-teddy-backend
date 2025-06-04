import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnsCreateUpdateAndDelete1748994731066 implements MigrationInterface {
    name = 'AddColumnsCreateUpdateAndDelete1748994731066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shortener" DROP CONSTRAINT "UQ_4ca84f0556df6f9e4ab804205ce"`);
        await queryRunner.query(`ALTER TABLE "shortener" DROP COLUMN "shortCode"`);
        await queryRunner.query(`ALTER TABLE "shortener" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "shortener" ADD "short_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shortener" ADD CONSTRAINT "UQ_1a30273706e2f686270734d76dc" UNIQUE ("short_code")`);
        await queryRunner.query(`ALTER TABLE "shortener" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shortener" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shortener" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "shortener" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "shortener" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "shortener" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "shortener" DROP CONSTRAINT "UQ_1a30273706e2f686270734d76dc"`);
        await queryRunner.query(`ALTER TABLE "shortener" DROP COLUMN "short_code"`);
        await queryRunner.query(`ALTER TABLE "shortener" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shortener" ADD "shortCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shortener" ADD CONSTRAINT "UQ_4ca84f0556df6f9e4ab804205ce" UNIQUE ("shortCode")`);
    }

}
