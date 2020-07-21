import merge from 'lodash.merge';
import { userResolvers } from './User';
import { jobsResolvers } from './Jobs';

export const resolvers = merge(userResolvers, jobsResolvers);
