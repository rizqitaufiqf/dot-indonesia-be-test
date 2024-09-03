import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import databaseConfig from './database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from 'src/database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [appConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
      dataSourceFactory: async (
        options: DataSourceOptions,
      ): Promise<DataSource> => {
        return new DataSource(options).initialize();
      },
    }),
  ],
  providers: [],
  exports: [NestConfigModule, TypeOrmModule],
})
export class ConfigModule {}
