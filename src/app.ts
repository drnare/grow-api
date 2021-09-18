import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-fastify';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import fastify, { FastifyInstance } from 'fastify';
import cookie from 'fastify-cookie';
import cors from 'fastify-cors';
import fastifyJwt from 'fastify-jwt';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { authChecker } from './graphql/helpers';
import { HarvestResolver, CropResolver, UserResolver, PlantResolver } from './graphql/resolvers';

const schema = async() => await buildSchema({
  resolvers: [UserResolver, HarvestResolver, CropResolver, PlantResolver],
  emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  authChecker
});

createConnection({
  type: 'better-sqlite3',
  database: process.env.API_DB_PATH || '',
  entities: [path.resolve(__dirname, './graphql/entities/*.ts')],
  logger: 'advanced-console',
  logging: 'all'
  // logging: process.env.NODE_ENV === 'development' ? 'all' : false
});

const fastifyAppClosePlugin = (app: FastifyInstance) => {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
        }
      };
    }
  };
};

export const App = async() => {
  const app = fastify();

  app
    // .register(cors, {
    //   origin: 'http://localhost:8080',
    //   credentials: true
    // })
    .register(cookie)
    .register(fastifyJwt, {
      secret: process.env.API_JWT_SECRET || '',
      cookie: {
        cookieName: 'token',
        signed: false
      }
    });

  const server = new ApolloServer({
    schema: await schema(),
    context: async({ request, reply }) => ({
      reply,
      request
    }),
    plugins: [
      fastifyAppClosePlugin(app),
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
      ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  });
  await server.start();
  app.register(server.createHandler({
    cors: {
      origin: 'http://localhost:8080',
      credentials: true
    }
  }));
  await app.listen(4000);
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};
