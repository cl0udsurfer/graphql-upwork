import { Collection } from 'mongodb';

export interface Job {
  id: string;
  title: string;
  link: string;
  favourite: boolean;
}

export interface Database {
  jobs: Collection<Job>;
}
