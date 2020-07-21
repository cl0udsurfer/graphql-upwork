import { ObjectId, Collection } from 'mongodb';

export interface Job {
  title: string;
}

export interface Database {
  jobs: Collection<Job>;
}
