import { IResolvers } from 'apollo-server-express';

export const userResolvers: IResolvers = {
  Query: {
    userId: (): string => {
      return 'User ID';
    },
  },
};
