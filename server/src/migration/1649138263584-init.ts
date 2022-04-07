import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class init1649138263584 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let usersTable = new Table({
            name: 'Users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'tokenVersion',
                    type: 'int',
                    default: 0
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255'
                },
                {
                    name: 'firstName',
                    type: 'varchar',
                    length: '255'
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP(6)',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP(6)',
                },
            ],
        });
        queryRunner.createTable(usersTable);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('Users', true);
    }

}
