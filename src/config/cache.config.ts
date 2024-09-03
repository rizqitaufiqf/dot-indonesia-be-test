import { IsInt, IsOptional, Min } from 'class-validator';
import { CacheConfigType } from './config.type';
import validateConfig from 'src/utils/validate-config';
import { registerAs } from '@nestjs/config';

class EnvironmentVariablesValidator {
  @IsInt()
  @Min(0)
  @IsOptional()
  CACHE_TTL: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  CACHE_MAX: number;
}

export default registerAs<CacheConfigType>('cache', (): CacheConfigType => {
  const env: NodeJS.ProcessEnv = process.env;
  validateConfig(env, EnvironmentVariablesValidator);

  return {
    ttl: env.CACHE_TTL ? parseInt(env.CACHE_TTL, 10) : 600,
    max: env.CACHE_MAX ? parseInt(env.CACHE_MAX, 10) : 100,
  };
});
