import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter, selectPhoneFilter } from '../filters/selectors';

export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;


export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter, selectPhoneFilter],
    (contacts, nameFilter, phoneFilter) => {
    return contacts.filter(contact => {
        const nameMatch =
        nameFilter === '' || contact?.name?.toLowerCase().includes(nameFilter.toLowerCase());
        const phoneMatch =
        phoneFilter === '' || contact?.number?.toLowerCase().includes(phoneFilter.toLowerCase());
        return nameMatch && phoneMatch;
    });
    }
);