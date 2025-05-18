import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducers } from './slices';

const STORAGE_KEY = 'ADMIN_STORAGE';

export const store = configureStore({
    reducer: combineReducers(reducers),
    preloadedState: JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'),
    devTools: true
});

store.subscribe(() =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export * from './slices';
