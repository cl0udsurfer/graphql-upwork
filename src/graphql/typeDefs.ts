import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Job {
    _id: String!
    title: String!
    link: String!
    favourite: Boolean!
  }

  type Query {
    userId: String!
    job(id: String!): Job!
    jobs: [Job]
    favourites: [Job]
  }

  type Mutation {
    saveJobs(url: String!): [Job]
    deleteJob(id: String!): Job
    addFavourite(id: String!): Job
  }
`;
