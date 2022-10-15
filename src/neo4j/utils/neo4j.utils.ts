import { Connection } from 'cypher-query-builder';
import { Neo4jConfig } from '../interfaces/neo4j-config.interface';

/**
 * Create Database connection provider
 */
export const createDatabaseConnection = async (config: Neo4jConfig) => {
  try {
    const { scheme, host, port, username, password, database } = config;
    const url = `${scheme}://${host}${port ? ':' + port : ''}`;

    // Create a new driver instance
    const connection = new Connection(url, {
      username,
      password,
    });

    return connection;
  } catch (err) {
    throw new ConnectionError(err);
  }
};

export class ConnectionError extends Error {
  public details: string;

  constructor(oldError: Error) {
    super();

    this.message = 'Could not connect to Neo4j';
    this.name = 'Connection Error';
    this.stack = oldError.stack;
    this.details = oldError.message;
  }
}
