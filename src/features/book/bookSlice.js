import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { act } from "react";

export const createBook = createAsyncThunk(
  "book/createBook",
  async (book, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "Books"), book);
      return { id: docRef.id, ...book };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getAllData = createAsyncThunk(
  "book/getAllData",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "Books"));
      const newList = [];
      querySnapshot.forEach((doc) => {
        newList.push({ id: doc.id, ...doc.data() });
      });
      return newList;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "Books", id));
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateBook = createAsyncThunk(
  "book/updateBook",
  async (book, { rejectWithValue }) => {
    try {
      const { id, ...data } = book;
      await updateDoc(doc(db, "Books", id), data);
      return book;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBook.fulfilled, (state, action) => {
      state.books.push(action.payload);
    });
    builder.addCase(getAllData.fulfilled, (state, action) => {
      state.books = action.payload;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.books = state.books.filter((book) => book.id != action.payload);
    });
    builder.addCase(updateBook.fulfilled, (state, action) => {
      const book = action.payload;
      state.books = state.books.map((val) => {
        if (val.id == book.id) {
          return book;
        }
        return val;
      });
    });
  },
});

export default bookSlice.reducer;
