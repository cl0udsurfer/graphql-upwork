import { Request } from 'express';
import { IResolvers } from 'apollo-server-express';
import { Upwork } from '../../../lib/api';
import { Job, Database } from '../../../lib/types';
import { JobsArgs } from './types';

export const jobsResolvers: IResolvers = {
  Query: {
    jobs: async (
      _root: undefined,
      { url }: JobsArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Job> => {
      return Upwork.fetchJobs(url);
    },
  },
};
