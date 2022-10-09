import { Module, DynamicModule } from '@nestjs/common';
import { QueryRepository } from './neo4j.service';
import { NEO4J_CONFIG, NEO4J_CONNECTION } from './neo4j.constants';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Neo4jConfig } from './interfaces/neo4j-config.interface';
import { createDatabaseConnection, createDatabaseConfig } from './utils/neo4j.utils';

@Module({
  providers: [QueryRepository],
  exports: [QueryRepository],
})
export class Neo4jModule {
  static forRootAsync(customConfig?: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      imports: [ConfigModule],
      global: true,
      providers: [
        {
          provide: NEO4J_CONFIG,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) =>
            customConfig || createDatabaseConfig(configService), 
        },
        {
          provide: NEO4J_CONNECTION,
          inject: [NEO4J_CONFIG],
          useFactory: async (config: Neo4jConfig) => await createDatabaseConnection(config),
        }
      ],
      exports: [NEO4J_CONNECTION],
    };
  }
}
