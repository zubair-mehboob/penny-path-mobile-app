export const ENDPOINTS = {
  auth: {
    login: "/auth/signin",
    register: "/auth/signup",
  },
  users: {
    profile: "/user/profile",
    update: "/user/update",
  },
  expenses: {
    all: (accountId: number) => `/expenses?accountId=${accountId}`,
    create: "/posts",
  },
  accounts: {
    all: "/accounts",
  },
};
