import { Injectable } from '@nestjs/common';
import { MemoryStorage } from './memory-storage';
import { MemoryStorageKey, MemoryStorageValue } from './types';

@Injectable()
export class RamStorageService implements MemoryStorage {
  #storage = new Map<
    MemoryStorageKey,
    MemoryStorageValue | MemoryStorageValue[]
  >();

  async insert<
    TKey extends MemoryStorageKey = MemoryStorageKey,
    TValue extends MemoryStorageValue = MemoryStorageValue,
  >(key: TKey, value: TValue): Promise<boolean> {
    this.#storage.set(key, value);
    return this.validate(key, value);
  }

  async validate<
    TKey extends MemoryStorageKey = MemoryStorageKey,
    TValue extends MemoryStorageValue = MemoryStorageValue,
  >(key: TKey, value: TValue): Promise<boolean> {
    const storedValue = this.#storage.get(key);
    return Promise.resolve(storedValue === value);
  }

  async remove<TKey extends MemoryStorageKey = MemoryStorageKey>(
    key: TKey,
  ): Promise<number> {
    const exists = this.#storage.delete(key);
    return Promise.resolve(exists ? 1 : 0);
  }

  async get<TKey extends MemoryStorageKey = MemoryStorageKey>(
    key: TKey,
  ): Promise<string | null> {
    const value = this.#storage.get(key);
    return Promise.resolve(value !== undefined ? String(value) : null);
  }
}
