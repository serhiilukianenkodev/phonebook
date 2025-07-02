import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ContactType } from "../../common-types";

axios.defaults.baseURL = "https://connections-api.goit.global/";

// GET @ /contacts
export const fetchContacts = createAsyncThunk<
  ContactType[],
  void,
  { rejectValue: string }
>("contacts/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get<ContactType[]>("/contacts");
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return thunkAPI.rejectWithValue(e.message);
    }
    return thunkAPI.rejectWithValue("Unknown error occurred");
  }
});

// POST @ /contacts

interface AddContactPayload {
  name: string;
  number: string;
}
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact: AddContactPayload, thunkAPI) => {
    try {
      const response = await axios.post<ContactType>("/contacts", contact);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);

// DELETE @ /contacts/:id
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId: string, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);
