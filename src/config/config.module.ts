import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import appConfig from './app.config';
import databaseConfig from './database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from 'src/database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import cacheConfig from './cache.config';
import { CacheConfigType } from './config.type';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [appConfig, databaseConfig, cacheConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
      dataSourceFactory: async (
        options: DataSourceOptions,
      ): Promise<DataSource> => {
        return new DataSource(options).initialize();
      },
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [NestConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const cacheConfig = configService.get<CacheConfigType>('cache');
        return {
          ttl: cacheConfig.ttl,
          max: cacheConfig.max,
        };
      },
    }),
  ],
  providers: [],
  exports: [NestConfigModule, TypeOrmModule, CacheModule],
})
export class ConfigModule {}
