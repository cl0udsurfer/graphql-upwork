import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { Upwork, SendGrid } from '../../../lib/api';
import { Job, Database } from '../../../lib/types';
import { JobsArgs, JobArgs } from './types';

export const jobsResolvers: IResolvers = {
  Query: {
    job: async (
      _root: undefined,
      { id }: JobArgs,
      { db }: { db: Database }
    ): Promise<any> => {
      try {
        const job = await db.jobs.findOne({ _id: new ObjectId(id) });
        console.log(job);
        return job;
      } catch (error) {
        console.log(error);
      }
    },
    jobs: async (
      _root: undefined,
      {},
      { db }: { db: Database }
    ): Promise<any> => {
      try {
        const cursor = await db.jobs.find();

        const data = cursor.toArray();

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    favourites: async (
      _root: undefined,
      {},
      { db }: { db: Database }
    ): Promise<any> => {
      try {
        const cursor = await db.jobs.find({ favourite: true });

        const data = cursor.toArray();

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    saveJobs: async (
      _root: undefined,
      { url }: JobsArgs,
      { db }: { db: Database }
    ): Promise<any> => {
      try {
        const jobs = await Upwork.fetchJobs(url);

        await db.jobs.deleteMany({});

        for (const job of jobs) {
          await db.jobs.insertOne({
            favourite: false,
            ...job,
          });
        }
        console.log('Success');
        return jobs;
      } catch (error) {
        console.log(error);
      }
    },

    deleteJob: async (
      _root: undefined,
      { id }: JobArgs,
      { db }: { db: Database }
    ): Promise<any> => {
      try {
        const job = await db.jobs.findOne({ _id: new ObjectId(id) });

        await db.jobs.deleteOne({ _id: new ObjectId(id) });

        return job;
      } catch (error) {
        console.log(error);
      }
    },

    addFavourite: async (
      _root: undefined,
      { id }: JobArgs,
      { db }: { db: Database }
    ): Promise<any> => {
      try {
        const job = await db.jobs.findOne({ _id: new ObjectId(id) });

        if (!job) {
          console.log('No valid job');
        }

        const newJob = await db.jobs.findOneAndUpdate(
          { ...job },
          { $set: { favourite: true } }
        );

        /* await SendGrid.sendMail(
          'fromEmail@gmail.com',
          'toEmail@gmail.com',
          JSON.stringify(job?.title)
        );
        */

        return newJob;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
