import { MemoryStorageKey, MemoryStorageValue } from './types';

export abstract class MemoryStorage {
  abstract insert<
    TKey extends MemoryStorageKey = MemoryStorageKey,
    TValue extends MemoryStorageValue = MemoryStorageValue,
  >(key: TKey, value: TValue): Promise<boolean>;

  abstract validate<
    TKey extends MemoryStorageKey = MemoryStorageKey,
    TValue extends MemoryStorageValue = MemoryStorageValue,
  >(key: TKey, value: TValue): Promise<boolean>;

  abstract remove<TKey extends MemoryStorageKey = MemoryStorageKey>(
    key: TKey,
  ): Promise<number>;

  abstract get<TKey extends MemoryStorageKey = MemoryStorageKey>(
    key: TKey,
  ): Promise<string | null>;
}
