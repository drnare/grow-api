import fastifyPlugin from 'fastify-plugin';
import fastifyJwt from 'fastify-jwt';
import { FastifyReply, FastifyRequest } from 'fastify';

export const jwt = () => fastifyPlugin(async function(fastify) {
  fastify.register(fastifyJwt, {
    secret: process.env.API_JWT_SECRET || '',
    cookie: {
      cookieName: 'token',
      signed: false
    }
  });

  fastify.decorate('authenticate', async function(request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});
