import {
  Entity,
  PrimaryKey,
  Property,
  Index,
  ManyToOne,
  Enum,
  type Ref,
  t,
} from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { EvaluationStatus } from 'src/modules/evaluations/domain/enums';
import { MikroORMUser } from 'src/modules/users/infrastructure/persistence/mikroorm';

@Entity({ tableName: 'evaluations' })
@Index({ properties: ['createdAt', 'status'] })
export class MikroORMEvaluation {
  constructor(inp: Partial<MikroORMEvaluation>) {
    Object.assign(this, inp);
  }

  @PrimaryKey({ type: t.uuid })
  id = randomUUID();

  @Property({ length: 255 })
  @Index()
  title: string;

  @Property({ columnType: 'integer' })
  score: number;

  @ManyToOne(() => MikroORMUser, { type: t.uuid, nullable: false, ref: true })
  @Index()
  evaluator: Ref<MikroORMUser>;

  @ManyToOne(() => MikroORMUser, { type: t.uuid, nullable: false, ref: true })
  @Index()
  evaluated: Ref<MikroORMUser>;

  @Property({ length: 2048, nullable: true })
  note?: string;

  @Enum(() => EvaluationStatus)
  @Index()
  status: EvaluationStatus = EvaluationStatus.PENDING;

  @Property()
  createdAt: Date;

  @Property({
    onUpdate: () => new Date(),
  })
  updatedAt: Date;
}
