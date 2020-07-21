import Parser from 'rss-parser';
// import { Job } from '../types';

const parser = new Parser();

export const Upwork = {
  fetchJobs: async (url: string): Promise<any> => {
    try {
      const feed = await parser.parseURL(url);

      if (!feed.items) return 'Error';

      const jobs = await feed.items.map((item) => ({
        title: item.title,
        link: item.link,
      }));

      return jobs;
    } catch (err) {
      console.log(err);
    }
  },
};
