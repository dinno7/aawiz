import { Module } from '@nestjs/common';
import { RamStorageService } from './ram-storage.service';
import { MemoryStorage } from './memory-storage';

@Module({
  providers: [
    {
      provide: MemoryStorage,
      useClass: RamStorageService,
    },
  ],
  exports: [MemoryStorage],
})
export class MemoryStorageModule {}
