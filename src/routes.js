export const routes = [
  {
    path: '/',
    component: 'register-login',
    action: async () => {
      await import('./modules/auth-page/register-login');
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
  {
    path: 'auth',
    component: 'register-login',
    action: async () => {
      await import('./modules/auth-page/register-login');
    },
  },
];
