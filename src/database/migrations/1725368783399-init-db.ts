import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1725368783399 implements MigrationInterface {
    name = 'InitDb1725368783399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" integer NOT NULL, "userId" integer NOT NULL, "title" character varying NOT NULL, "completed" boolean NOT NULL, CONSTRAINT "PK_17b57427465caa8ca57e2741db2" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "todo"`);
    }

}
