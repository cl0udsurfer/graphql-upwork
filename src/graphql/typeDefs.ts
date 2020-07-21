import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Job {
    title: String
    link: String
  }

  type Query {
    userId: String!
    jobs(url: String!): [Job]
  }
`;
