import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import groupsSlice from './slices/groupsSlice';
import uiSlice from './slices/uiSlice';
import { authApi } from './api/authApi';
import { groupsApi } from './api/groupsApi';
import { usersApi } from './api/usersApi';
import { resourcesApi } from './api/resourcesApi';
import { notificationsApi } from './api/notificationsApi';
import { sessionsApi } from './api/sessionsApi';

const store = configureStore({
  reducer: {
    auth: authSlice,
    groups: groupsSlice,
    ui: uiSlice,
    [authApi.reducerPath]: authApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [resourcesApi.reducerPath]: resourcesApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    [sessionsApi.reducerPath]: sessionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat([
      authApi.middleware,
      groupsApi.middleware,
      usersApi.middleware,
      resourcesApi.middleware,
      notificationsApi.middleware,
      sessionsApi.middleware,
    ]),
});

export default store;
