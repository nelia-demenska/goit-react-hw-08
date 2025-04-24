import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './auth/slice';
import contactsReducer from './contacts/slice';
import filterReducer from './filters/slice';
import storage from 'redux-persist/lib/storage'; 


const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
    auth: persistedAuthReducer,
    contacts: contactsReducer,
    filter: filterReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck: {
        ignoredActions: [
            'persist/PERSIST',
            'persist/REHYDRATE',
            'persist/PAUSE',
            'persist/FLUSH',
            'persist/PURGE',
            'persist/REGISTER',
        ],
        },
    }),
});

export const persistor = persistStore(store);