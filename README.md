<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://kamilmysliwiec.com/public/nest-logo.png#1" alt="Nest Logo" />   </a>
  <a href="https://neo4j.com" target="_blank"><img src="https://dist.neo4j.com/wp-content/uploads/20140926224303/neo4j_logo-facebook.png" width="300"></a>
</p>

# Neo4j Module

> Neo4j integration for Nest Application

## Description

This module provides [Neo4j](https://www.neo4j.com) integration for [Nest](http://nestjs.com/).

## Installation

```bash
$ npm install --save neo4j-module
```

or

```bash
$ yarn add neo4j-module
```

## Quick Start

We need to register our neo4j module in our root module which is AppModule in our case and call the forRootAsync method with the configuration object.


```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from 'neo4j-module';

@Module({
  imports: [
    Neo4jModule.forRootAsync({
      scheme: 'bolt',
      host: 'localhost',
      port: '7687',
      username: 'neo4j',
      password: 'ne04j',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Querying Neo4j

The `Neo4jService` is `@Injectable`, so it can be passed into any constructor. And for querying
you have to be familiar with the [cyper-query-builder](https://jamesfer.me/cypher-query-builder/index.html) module.

Note that you have to inject the **Neo4jService** using the **@Inject()** decorator

```typescript
import { HttpException, 
Inject } from '@nestjs/common';
import { Neo4jService } from 'neo4j-module';

@Controller('todos')
export class AppController {
  constructor(
    @Inject(Neo4jService) private readonly neo4jModule: Neo4jService,
  ) {}

  @Get('')
  async getTodos() {
    const query = this.neo4jModule.initQuery();

    try {
      const result = await query.matchNode('todo', 'Todo').return('todo').run();

      if (result && result.length > 0) {
        const todos = result.map((todo) => {
          const todoData = todo.get('todo').properties;

          return new Todo(todoData);
        });

        return todos;
      }
    } catch (err) {
      throw new HttpException("Can't get Todos", 500);
    }
  }
}
```

## Keywrods

- nestjs
- neo4j
- cypher
- query-builder
- connection
- nosql database

## License

  Nest is [MIT licensed](LICENSE).