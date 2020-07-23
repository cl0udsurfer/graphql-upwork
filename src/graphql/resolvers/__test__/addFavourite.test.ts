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

const db = mongoose.connection.collection('jobs');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    db,
  }),
});

const { mutate } = createTestClient(server);

test('Sets favourite-property of selected job as true', async () => {
  await db.insertOne({
    _id: '123',
    title: 'Upwork Test Job',
    link: 'https://upwork.com/job/test',
    favourite: false,
  });

  await mutate({ mutation: ADD_FAVOURITE });

  const favObject = await db.findOne({});

  console.log(favObject);

  expect(favObject).toBe({
    _id: '123',
    title: 'Upwork Test Job',
    link: 'https://upwork.com/job/test',
    favourite: true,
  });
});
