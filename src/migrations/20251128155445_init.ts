import { Migration } from '@mikro-orm/migrations';

export class Migration20251128155445_init extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "users" ("id" UUID not null, "name" varchar(255) not null, "email" varchar(255) not null, "roles" text[] not null default '{user}', "password" varchar(255) not null, "password_updated_at" timestamptz null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "users_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "users" add constraint "users_email_unique" unique ("email");`,
    );
  }
}
