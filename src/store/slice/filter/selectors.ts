import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'store';

const selectSelf = (state: RootStateType) => state.filter;

export const filters = createSelector(selectSelf, (state) => state.filters);

export const statuses = createSelector(selectSelf, (state) => state.status);

export const isAssignToMe = createSelector(selectSelf, (state) => !!state.filters.assigned_to_me);
