import mongoose from 'mongoose';
import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import { typeDefs, resolvers } from '../../index';

const ADD_FAVOURITE = gql`
  mutation {
    addFavourite(id: "123") {
      title
      favourite
    }
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    _id: '123',
    title: 'Upwork Test Job',
    link: 'https://upwork.com/job/test',
    favourite: false,
  }),
});

const { mutate } = createTestClient(server);

test('Sets favourite-property of selected job as true', async () => {
  const res = await mutate({ mutation: ADD_FAVOURITE });

  expect(res).toBe({
    _id: '123',
    title: 'Upwork Test Job',
    link: 'https://upwork.com/job/test',
    favourite: true,
  });
});
