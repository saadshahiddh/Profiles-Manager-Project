import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfileDetailApi, saveProfileDetailApi } from "../../apis/profile.apis";
import { Profile, ProfileDetail } from "../../types/profile.types";
import { deleteCoverLetterApi } from "../../apis/cover-letter.apis";
import { CoverLetter } from "../../types/cover-letter.types";
import { Faq } from "../../types/faq.types";
import { deleteFaqApi } from "../../apis/faq.apis";


const getProfileDetailThunk = createAsyncThunk<ProfileDetail, Profile['_id']>("profile/get-detail", getProfileDetailApi);
const saveProfileDetailThunk = createAsyncThunk<ProfileDetail, ProfileDetail>("profile/save-detail", saveProfileDetailApi);
const deleteCoverLetterThunk = createAsyncThunk<boolean, CoverLetter['_id']>("cover-letter/delete", deleteCoverLetterApi);
const deleteFaqThunk = createAsyncThunk<boolean, Faq['_id']>("faq/delete", deleteFaqApi);

const profileFormSlice = createSlice({
    name: 'profile_form_state',
    initialState: { profileDetail: {} as ProfileDetail },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProfileDetailThunk.fulfilled, (state, action) => {
                state.profileDetail = action.payload;
            })
            .addCase(saveProfileDetailThunk.fulfilled, (state, action) => {
                state.profileDetail = action.payload;
            })
            .addCase(deleteCoverLetterThunk.fulfilled, (state: any, action) => {
                state.profileDetail.coverLetters = (state.profileDetail.coverLetters || []).filter((x: any) => x._id != action.meta.arg);
            })
            .addCase(deleteFaqThunk.fulfilled, (state: any, action) => {
                state.profileDetail.faqs = (state.profileDetail.faqs || []).filter((x: any) => x._id != action.meta.arg);
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
    deleteCoverLetterThunk,
    profileFormStore,
    deleteFaqThunk,
};