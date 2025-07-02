import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";
import { RootState } from "../store";
import { ContactType } from "../../common-types";

export const selectContacts = (state: RootState) => state.contacts.items;
export const selectLoading = (state: RootState) => state.contacts.loading;
export const selectError = (state: RootState) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) =>
    contacts.filter((contact: ContactType) => {
      return (
        contact.name
          .toLocaleLowerCase()
          .includes(filter.trim().toLocaleLowerCase()) ||
        contact.number.includes(filter.trim())
      );
    })
);
