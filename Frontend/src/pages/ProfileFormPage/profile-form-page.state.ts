import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfileDetailApi, saveProfileDetailApi } from "../../apis/profile.apis";
import { Profile, ProfileDetail } from "../../types/profile.types";


const getProfileDetailThunk = createAsyncThunk<ProfileDetail, Profile['_id']>("profile/get-detail", getProfileDetailApi);
const saveProfileDetailThunk = createAsyncThunk<ProfileDetail, ProfileDetail>("profile/save-detail", saveProfileDetailApi);

const profileFormSlice = createSlice({
    name: 'profile_form_state',
    initialState: { profileDetail: {} },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProfileDetailThunk.fulfilled, (state, action) => {
                console.log(action.payload);
                state.profileDetail = action.payload;
            })
            .addCase(saveProfileDetailThunk.fulfilled, (state, action) => {
                console.log(action.payload);
                state.profileDetail = action.payload;
            })
    }
});

const profileFormReducer = profileFormSlice.reducer;
const profileFormStore = configureStore({ reducer: { profile_form_state: profileFormReducer } });

export type ProfileFormRootState = ReturnType<typeof profileFormStore.getState>;
export type ProfileFormDispatch = typeof profileFormStore.dispatch;

export {
    getProfileDetailThunk,
    saveProfileDetailThunk,
    profileFormStore,
};