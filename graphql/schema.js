// src/graphql/schema.js
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Resume {
    id: ID!
    user: User!
    name: String!
    email: String!
    phone: String
    skills: [String]
    fileUrl: String!
    status: String!
  }

  type Query {
    getUserResumes: [Resume]
    getResumeById(id: ID!): Resume
  }

  type Mutation {
    uploadResume(name: String!, email: String!, phone: String, fileUrl: String!): Resume
    deleteResume(id: ID!): String
  }
`;

module.exports = typeDefs;
