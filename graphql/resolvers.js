// src/graphql/index.js
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const authMiddleware = require("../middlewares/auth");

const setupGraphQL = async (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const user = authMiddleware(req); // Extract user from JWT
      return { user };
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
};

module.exports = setupGraphQL;
