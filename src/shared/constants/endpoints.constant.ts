export const ENDPOINTS = {
  auth: {
    login: "/auth/signin",
    register: "/auth/signup",
  },
  users: {
    profile: "/user/profile",
    update: "/user/update",
  },
  transactions: {
    all: (accountId: number) => `/transactions?accountId=${accountId}`,
    create: "/transactions",
    getById: (id: number) => `/transactions/${id}`,
    splitTransaction: `/transactions/add-child-transaction`,
    update: (id: number) => `/transactions/${id}`,
  },
  accounts: {
    all: `/accounts`,
    create: `/accounts`,
    setDefault: (accountId: number) => `/accounts/${accountId}/set-default`,
    getDefault: `/accounts/get-default`,
    getById: (accountId: number) => `/accounts/${accountId}`,
  },
};
