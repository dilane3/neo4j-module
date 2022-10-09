import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Connection } from 'cypher-query-builder';
import { NEO4J_CONNECTION } from './neo4j.constants';

@Injectable()
export class QueryRepository implements OnApplicationShutdown {
  constructor(
    @Inject(NEO4J_CONNECTION)
    private readonly connection: Connection,
  ) {}

  /**
   * Close the connection to the database when the application is shut down
   */
  onApplicationShutdown() {
    this.connection.close();
  }

  /**
   * Create a new connection to the database
   * @returns
   */
  initQuery() {
    return this.connection.query();
  }
}
