import { Module, DynamicModule } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { NEO4J_CONFIG, NEO4J_CONNECTION } from './neo4j.constants';
import { Neo4jConfig } from './interfaces/neo4j-config.interface';
import {
  createDatabaseConnection,
} from './utils/neo4j.utils';

@Module({})
export class Neo4jModule {
  static forRootAsync(neo4jConfig: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      global: true,
      providers: [
        {
          provide: NEO4J_CONFIG,
          useValue: neo4jConfig
        },
        {
          provide: NEO4J_CONNECTION,
          inject: [NEO4J_CONFIG],
          useFactory: async (config: Neo4jConfig) =>
            await createDatabaseConnection(config),
        },
        Neo4jService,
      ],
      exports: [Neo4jService, NEO4J_CONNECTION],
    };
  }
}
