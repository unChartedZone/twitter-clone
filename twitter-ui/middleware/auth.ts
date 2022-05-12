import { Middleware } from '@nuxt/types';

// Check if user is authenticated on load for every route, if they don't have
// aut state, make a request to refresh their credentials.
const authMiddleware: Middleware = async ({
  store,
  $axios,
  redirect,
  route,
}) => {
  const guestRouteNames = ['index', 'login'];

  // If they are authenticated already, then we don't need to refresh their auth
  // state
  if (!store.state.auth.accessToken && !store.state.auth.user) {
    try {
      const response = await $axios.post('/refresh_token');
      const { user, access_token: accessToken } = response.data;

      store.commit('auth/setUser', { user, accessToken });
    } catch (e) {
      store.commit('auth/setUser');
    }
  }

  if (
    guestRouteNames.includes(route.name!) &&
    store.state.auth.isAuthenticated
  ) {
    return redirect('/home');
  }

  if (
    !store.state.auth.user &&
    !store.state.auth.accessToken &&
    !guestRouteNames.includes(route.name!)
  ) {
    return redirect('/login');
  }
};

export default authMiddleware;
