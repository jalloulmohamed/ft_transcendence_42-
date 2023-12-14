import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ConversationTypes, CreateConversationParams } from '../utils/types'
import { createConversation, deleteConversation, findConversationUsers, getConversation, getConversationMessage } from '../utils/api';

export interface ConversationsState {
  conversations: ConversationTypes[];
  status: 'success' | 'failed' | 'idle' | 'loading';
  error: string | null;
}

const initialState: ConversationsState = {
  conversations: [],
  status: 'idle',
  error : null,
};

// for create the conversation

export const createConversationThunk = createAsyncThunk('conversations/create', async(display_name : string , { rejectWithValue })=>{
  try {

    const response = await createConversation(display_name);
    
 
    if (!response.data.success)
    {
      throw new Error(response.data.error);
    }
    return response;
  } catch (err: any) {
    if (err.response && err.response.data) 
    {
      return rejectWithValue(err.response.data); // Return the entire error object
    } else {
      throw new Error("create conversation failed with an unknown error");
    }
}

})

export const fetchConversationThunk = createAsyncThunk('conversations/fetch', async () => {
  const response = await getConversation();
  return response.data; // Assuming your API response has a 'data' property

});



export const fetchConversationUserThunk = createAsyncThunk('conversation/fetch',async(display_name : string) =>{
  const response = await findConversationUsers(display_name);
  return response;

})


export const fetchDeleteConversation = createAsyncThunk('deleteConversation/fetch', async(conversationId : string)=>{
  const response = await deleteConversation(conversationId);
  return response;
})
export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state) =>{

    }
   
  },

  extraReducers: (builder) => {
    builder
    .addCase(fetchConversationThunk.pending, (state, action) => {
       state.status = 'loading';
    }).addCase(fetchConversationThunk.fulfilled, (state, action) =>{
      state.status = 'success';
      state.conversations = action.payload;
    }).addCase(fetchConversationThunk.rejected, (state, action) =>{
      state.status = 'failed';
    })
    .addCase(createConversationThunk.pending, (state, action) =>{
        state.status = 'loading';
    }).addCase(createConversationThunk.fulfilled, (state, action) =>{
        state.status = 'success';
    }).addCase(createConversationThunk.rejected, (state, action) =>{
        state.status = 'failed';
    })
    
    .addCase(fetchConversationUserThunk.pending, (state, action) =>{
        state.status = 'loading';
    }).addCase(fetchConversationUserThunk.fulfilled, (state, action) =>{
        state.status = 'success';
    }).addCase(fetchConversationUserThunk.rejected, (state, action) =>{
        state.status = 'failed';
    }).addCase(fetchDeleteConversation.pending, (state, action) =>{
      state.status = 'loading';
    }).addCase(fetchDeleteConversation.fulfilled, (state, action) =>{
      state.status = 'success';
    }).addCase(fetchDeleteConversation.rejected, (state, action) =>{
      state.status = 'failed';
    });
  }
})

// Action creators are generated for each case reducer function
export const { addConversation} =
  conversationsSlice.actions;

export default conversationsSlice.reducer;