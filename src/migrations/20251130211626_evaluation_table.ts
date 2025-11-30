import { Migration } from '@mikro-orm/migrations';

export class Migration20251130211626_evaluation_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "evaluations" ("id" uuid not null, "title" varchar(255) not null, "score" integer not null, "evaluator_id" uuid not null, "evaluated_id" uuid not null, "note" varchar(2048) not null, "status" text check ("status" in ('pending', 'approved', 'rejected', 'archived')) not null default 'pending', "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "evaluations_pkey" primary key ("id"));`);
    this.addSql(`create index "evaluations_title_index" on "evaluations" ("title");`);
    this.addSql(`create index "evaluations_evaluator_id_index" on "evaluations" ("evaluator_id");`);
    this.addSql(`create index "evaluations_evaluated_id_index" on "evaluations" ("evaluated_id");`);
    this.addSql(`create index "evaluations_status_index" on "evaluations" ("status");`);
    this.addSql(`create index "evaluations_created_at_status_index" on "evaluations" ("created_at", "status");`);

    this.addSql(`alter table "evaluations" add constraint "evaluations_evaluator_id_foreign" foreign key ("evaluator_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "evaluations" add constraint "evaluations_evaluated_id_foreign" foreign key ("evaluated_id") references "users" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "evaluations" cascade;`);
  }

}
