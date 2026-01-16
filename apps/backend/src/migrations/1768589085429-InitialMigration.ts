import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1768589085429 implements MigrationInterface {
  name = 'InitialMigration1768589085429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "geometry"`);
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "geometry" geometry(Geometry,4326)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "geometry"`);
    await queryRunner.query(`ALTER TABLE "properties" ADD "geometry" text`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
