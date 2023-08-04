import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { prisma } from "../../prisma/db";
import { schema } from "../../backend/schema";
import { Context } from "../../backend/resolvers";

const apolloServer = new ApolloServer<Context>({
  schema
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, prisma }),
});
