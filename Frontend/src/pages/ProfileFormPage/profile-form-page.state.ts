import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfileFormDataApi, saveProfileFormDataApi } from "../../apis/profile.apis";
import { Profile, ProfileFormData } from "../../types/profile.types";
import { deleteCoverLetterApi } from "../../apis/cover-letter.apis";
import { CoverLetter } from "../../types/cover-letter.types";
import { Faq } from "../../types/faq.types";
import { deleteFaqApi } from "../../apis/faq.apis";



/**************************************************
 * APIs
 */
const getProfileFormDataThunk = createAsyncThunk<ProfileFormData, Profile['_id']>("profile/get-form-data", getProfileFormDataApi);
const saveProfileFormDataThunk = createAsyncThunk<ProfileFormData, ProfileFormData>("profile/save-form-data", saveProfileFormDataApi);
const deleteCoverLetterThunk = createAsyncThunk<boolean, CoverLetter['_id']>("cover-letter/delete", deleteCoverLetterApi);
const deleteFaqThunk = createAsyncThunk<boolean, Faq['_id']>("faq/delete", deleteFaqApi);



/**************************************************
 * Slice
 */
const profileFormSlice = createSlice({
    name: 'profile_form_state',
    initialState: { profileFormData: {} as ProfileFormData },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProfileFormDataThunk.fulfilled, (state, action) => {
                state.profileFormData = action.payload;
            })
            .addCase(saveProfileFormDataThunk.fulfilled, (state, action) => {
                state.profileFormData = action.payload;
            })
            .addCase(deleteCoverLetterThunk.fulfilled, (state: any, action) => {
                state.profileFormData.coverLetters = (state.profileFormData.coverLetters || []).filter((x: any) => x._id != action.meta.arg);
            })
            .addCase(deleteFaqThunk.fulfilled, (state: any, action) => {
                state.profileFormData.faqs = (state.profileFormData.faqs || []).filter((x: any) => x._id != action.meta.arg);
            })
    }
});



/**************************************************
 * Others
 */
const profileFormReducer = profileFormSlice.reducer;
const profileFormStore = configureStore({ reducer: { profile_form_state: profileFormReducer } });

export type ProfileFormRootState = ReturnType<typeof profileFormStore.getState>;
export type ProfileFormDispatch = typeof profileFormStore.dispatch;

export {
    getProfileFormDataThunk,
    saveProfileFormDataThunk,
    deleteCoverLetterThunk,
    profileFormStore,
    deleteFaqThunk,
};