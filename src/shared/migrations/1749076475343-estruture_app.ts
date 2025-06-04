import { MigrationInterface, QueryRunner } from 'typeorm';

export class EstrutureApp1749076475343 implements MigrationInterface {
  name = 'EstrutureApp1749076475343';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "shortener" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "short_code" character varying, "original" character varying, "clicks" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" uuid, CONSTRAINT "UQ_1a30273706e2f686270734d76dc" UNIQUE ("short_code"), CONSTRAINT "PK_30a822966eb2be3ccb9fcd4173b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "shortener" ADD CONSTRAINT "FK_366b2ce304583d92ece27a511ea" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shortener" DROP CONSTRAINT "FK_366b2ce304583d92ece27a511ea"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "shortener"`);
  }
}
