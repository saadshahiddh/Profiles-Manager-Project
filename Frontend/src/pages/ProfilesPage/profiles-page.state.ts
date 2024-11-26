import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProfileApi, getProfileDetailsByUserApi } from "../../apis/profile.apis";
import { Profile, ProfileDetail } from "../../types/profile.types";



/**************************************************
 * APIs
 */
const deleteProfileThunk = createAsyncThunk<boolean, Profile['_id']>('profile/delete', deleteProfileApi);
const getAllProfileDetailsThunk = createAsyncThunk<ProfileDetail[]>('profile/get-details-by-user', getProfileDetailsByUserApi);



/**************************************************
 * Slice
 */
const profilesSlice = createSlice({
    name: 'profiles_page_state',
    initialState: {
        profileDetails: [] as ProfileDetail[],
        isLoading: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllProfileDetailsThunk.pending, (state: any) => {
            state.isLoading = true;
        })
        builder.addCase(getAllProfileDetailsThunk.fulfilled, (state: any, action) => {
            state.profileDetails = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getAllProfileDetailsThunk.rejected, (state: any) => {
            state.isLoading = true;
        })
        builder.addCase(deleteProfileThunk.fulfilled, (state: any, action) => {
            state.profileDetails = state.profileDetails.filter((x: ProfileDetail) => x._id != action.meta.arg);
        })
    }
});



/**************************************************
 * Others
 */
const profilesReducer = profilesSlice.reducer;
const profilesStore = configureStore({ reducer: { profiles_page_state: profilesReducer } });

export type ProfilesRootState = ReturnType<typeof profilesStore.getState>;
export type ProfilesDispatch = typeof profilesStore.dispatch;

export { getAllProfileDetailsThunk, deleteProfileThunk, profilesStore };