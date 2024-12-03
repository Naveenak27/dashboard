import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers, addUser, updateUser, deleteUser } from './employeeApi';

const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

export const fetchUsersAsync = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetchUsers();
  return response.data;
});

export const addUserAsync = createAsyncThunk('users/addUser', async (user) => {
  const response = await addUser(user);
  return response.data;
});

export const updateUserAsync = createAsyncThunk('users/updateUser', async (user) => {
  const response = await updateUser(user.id, user); // Pass both ID and updated data
  return response.data;
});
export const deleteUserAsync = createAsyncThunk('users/deleteUser', async (id) => {
  await deleteUser(id);
  return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.key === action.payload.key);
        if (index >= 0) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.key !== action.payload);
      });
  },
});

export default usersSlice.reducer;
