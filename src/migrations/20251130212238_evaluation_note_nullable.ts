import { Migration } from '@mikro-orm/migrations';

export class Migration20251130212238_evaluation_note_nullable extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "evaluations" alter column "note" type varchar(2048) using ("note"::varchar(2048));`);
    this.addSql(`alter table "evaluations" alter column "note" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "evaluations" alter column "note" type varchar(2048) using ("note"::varchar(2048));`);
    this.addSql(`alter table "evaluations" alter column "note" set not null;`);
  }

}
