export const routes = [
  {
    path: '/',
    component: 'news-feed',
    action: async () => {
      await import('./modules/news-feed/news-feed');
    },
  },
  {
    path: 'newsfeed',
    component: 'news-feed',
    action: async () => {
      await import('./modules/news-feed/news-feed');
    },
  },
  {
    path: 'timeline',
    component: 'user-timeline',
    action: async () => {
      await import('./modules/timeline/user-timeline');
    },
  },
];
