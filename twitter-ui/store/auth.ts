import { MutationTree } from 'vuex';

interface UserPayload {
  user?: any;
  accessToken?: string;
}

export const state = () => ({
  user: null,
  accessToken: '',
  isAuthenticated: false,
});

export type RootState = ReturnType<typeof state>;

export const mutations: MutationTree<RootState> = {
  setUser(state, payload?: UserPayload) {
    if (!payload) {
      state.user = null;
      state.accessToken = '';
      return;
    }

    state.user = payload.user;
    state.accessToken = payload.accessToken!;
    state.isAuthenticated = true;
  },
};
