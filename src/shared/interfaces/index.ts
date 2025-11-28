export interface Mapper<TDomain, TPersist> {
  toDomain(entity: TPersist): Promise<TDomain>;
  toPersist(entity: TDomain): Promise<TPersist>;
}
