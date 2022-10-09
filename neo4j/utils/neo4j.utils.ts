import { ConfigService } from '@nestjs/config';
import { Connection } from 'cypher-query-builder';
import { Driver } from 'neo4j-driver';
import { Neo4jConfig } from '../interfaces/neo4j-config.interface';

/**
 * Create Database config provider
 */
export const createDatabaseConfig = (
  configService: ConfigService,
): Neo4jConfig => ({
  scheme: configService.get('DATABASE_SCHEME'),
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_DBNAME'),
});

/**
 * Create Database connection provider
 */
export const createDatabaseConnection = async (config: Neo4jConfig) => {
  try {
    const { scheme, host, port, username, password } =
      config;
      const url = `${scheme}://${host}${port ? ":" + port : ""}`;

    // Create a new driver instance
    const connection = new Connection(url, {
      username,
      password,
    }) as ConnectionWithDriver;

    // Verify that the connection is valid
    // await connection.driver.verifyConnectivity();

    return connection;
  } catch (err) {
    throw new ConnectionError(err);
  }
}

export type ConnectionWithDriver = Connection & {
  driver: Driver;
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
