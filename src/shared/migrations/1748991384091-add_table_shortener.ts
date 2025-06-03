import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableShortener1748991384091 implements MigrationInterface {
    name = 'AddTableShortener1748991384091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shortener" ("id" SERIAL NOT NULL, "shortCode" character varying NOT NULL, "original" character varying NOT NULL, "clicks" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_4ca84f0556df6f9e4ab804205ce" UNIQUE ("shortCode"), CONSTRAINT "PK_30a822966eb2be3ccb9fcd4173b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shortener" ADD CONSTRAINT "FK_366b2ce304583d92ece27a511ea" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shortener" DROP CONSTRAINT "FK_366b2ce304583d92ece27a511ea"`);
        await queryRunner.query(`DROP TABLE "shortener"`);
    }

}
