import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserRoles1688691089939 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_roles',
        columns: [
          { name: 'role_id', type: 'uuid' },
          { name: 'user_id', type: 'uuid' },
        ],
        foreignKeys: [
          {
            columnNames: ['role_id'],
            referencedColumnNames: ['role_id'],
            referencedTableName: 'roles',
            name: 'fk_roles_user',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['user_id'],
            referencedTableName: 'users',
            name: 'fk_users_roles',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_roles');
  }
}
