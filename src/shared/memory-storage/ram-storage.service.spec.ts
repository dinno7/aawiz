import { Test, TestingModule } from '@nestjs/testing';
import { RamStorageService } from './ram-storage.service';

describe('RamStorageService', () => {
  let service: RamStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RamStorageService],
    }).compile();

    service = module.get<RamStorageService>(RamStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert and get a value', async () => {
    await service.insert('key1', 'value1');
    const result = await service.get('key1');
    expect(result).toBe('value1');
  });

  it('should validate a key-value pair', async () => {
    await service.insert('key1', 'value1');
    const isValid = await service.validate('key1', 'value1');
    expect(isValid).toBe(true);

    const isInvalid = await service.validate('key1', 'wrongValue');
    expect(isInvalid).toBe(false);
  });

  it('should remove a key', async () => {
    await service.insert('key1', 'value1');
    const result = await service.get('key1');
    expect(result).toBe('value1');

    const removalResult = await service.remove('key1');
    expect(removalResult).toBe(1);

    const getResult = await service.get('key1');
    expect(getResult).toBeNull();
  });
});
