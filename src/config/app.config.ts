import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Environment } from 'src/utils/enums/environtment.enum';
import { AppConfigType } from './config.type';
import validateConfig from 'src/utils/validate-config';
import { registerAs } from '@nestjs/config';

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;

  @IsString()
  @IsOptional()
  APP_NAME: string;

  @IsString()
  @IsOptional()
  API_PREFIX: string;
}

export default registerAs<AppConfigType>('app', (): AppConfigType => {
  const env: NodeJS.ProcessEnv = process.env;
  validateConfig(env, EnvironmentVariablesValidator);

  return {
    nodeEnv: env.NODE_ENV || 'development',
    name: env.APP_NAME || 'app',
    port: env.APP_PORT ? parseInt(env.APP_PORT, 10) : 3000,
    apiPrefix: env.API_PREFIX || 'api',
  };
});
