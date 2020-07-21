import { MongoClient } from 'mongodb';
import { Database, Job } from '../lib/types';

const url = `${process.env.MONGO_URI}`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db('graphql-upwork');

  console.log('DB Connected');

  return {
    jobs: db.collection<Job>('jobs'),
  };
};
