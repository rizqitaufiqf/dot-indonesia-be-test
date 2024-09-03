export type AppConfigType = {
  nodeEnv: string;
  port: number;
  name: string;
  apiPrefix: string;
};

export type DatabaseConfigType = {
  url?: string;
  type?: string;
  host?: string;
  port?: number;
  password?: string;
  name?: string;
  username?: string;
  synchronize?: boolean;
  maxConnections: number;
  sslEnabled?: boolean;
  rejectUnauthorized?: boolean;
  ca?: string;
  key?: string;
  cert?: string;
};

export type CacheConfigType = {
  ttl: number;
  max: number;
};

export type AllConfigType = {
  app: AppConfigType;
  database: DatabaseConfigType;
};
