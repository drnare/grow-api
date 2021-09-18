import { FastifyReply, FastifyRequest } from 'fastify';

export interface AppContext {
  reply: FastifyReply;
  request: FastifyRequest;
};
