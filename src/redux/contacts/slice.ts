import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";
import { logOut } from "../auth/operations";
import toast from "react-hot-toast";
import { ContactType } from "../../common-types";

interface ContactState {
  items: ContactType[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  items: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<ContactType[]>) => {
          state.items = action.payload;
        }
      )
      .addCase(
        addContact.fulfilled,
        (state, action: PayloadAction<ContactType | undefined>) => {
          if (action.payload) {
            state.items.push(action.payload);
            toast.success("Contact is added successfully!");
          }
        }
      )
      .addCase(
        deleteContact.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          const index = state.items.findIndex(
            (contact) => contact.id === action.payload.id
          );
          state.items.splice(index, 1);
          toast.success("Contact is delete successfully!");
        }
      )
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending
        ),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected
        ),
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(
            "Something went wrong. Please try again. Error: " + action.payload
          );
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          addContact.fulfilled,
          deleteContact.fulfilled,
          logOut.fulfilled
        ),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      );
  },
});

export const contactsReducer = slice.reducer;
