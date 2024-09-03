import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1725357748818 implements MigrationInterface {
    name = 'InitDb1725357748818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" integer NOT NULL, "userId" integer NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, CONSTRAINT "PK_852036802b135c3f93089c85137" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
