import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProfileApi, getAllProfileDetailsApi, getAllProfilesApi } from "../../apis/profile.apis";
import { Profile, ProfileDetail } from "../../types/profile.types";

const deleteProfileThunk = createAsyncThunk<boolean, Profile['_id']>('profile/delete', deleteProfileApi);
const getAllProfileDetailsThunk = createAsyncThunk<ProfileDetail[]>('profile/get-all', getAllProfileDetailsApi);

const profilesSlice = createSlice({
    name: 'profiles_page_state',
    initialState: { profileDetails: [] as ProfileDetail[] },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllProfileDetailsThunk.fulfilled, (state: any, action) => {
            state.profileDetails = action.payload;
        })
        builder.addCase(deleteProfileThunk.fulfilled, (state: any, action) => {
            state.profileDetails = state.profileDetails.filter((x: ProfileDetail) => x.profile._id != action.meta.arg);
        })
    }
});

const profilesReducer = profilesSlice.reducer;
const profilesStore = configureStore({ reducer: { profiles_page_state: profilesReducer } });

export type ProfilesRootState = ReturnType<typeof profilesStore.getState>;
export type ProfilesDispatch = typeof profilesStore.dispatch;

export { getAllProfileDetailsThunk, deleteProfileThunk, profilesStore };