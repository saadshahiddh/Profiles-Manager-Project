import React, { useEffect, useState } from 'react'
import { Profile, ProfileDetail } from '../../types/profile.types'
import { CoverLetter } from '../../types/cover-letter.types';
import { Faq } from '../../types/faq.types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteCoverLetterThunk, deleteFaqThunk, getProfileDetailThunk, ProfileFormDispatch, ProfileFormRootState, profileFormStore, saveProfileDetailThunk } from './profile-form-page.state';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaCopy, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa6';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog';


const ProfileFormPage = () => {
    return <Provider store={profileFormStore}>
        <ProfileFormContent />
    </Provider>
}


const ProfileFormContent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const profileId: Profile['_id'] = (new URLSearchParams(location.search)).get('profileId') || '';

    const { profileDetail } = useSelector((state: ProfileFormRootState) => state.profile_form_state);
    const dispatch: ProfileFormDispatch = useDispatch();

    const emptyProfileDetail: ProfileDetail = { profile: {}, coverLetters: [], faqs: [] };
    const [profileData, setProfileData] = useState<ProfileDetail>(emptyProfileDetail);
    const [profileErrors, setProfileErrors] = useState<ProfileDetail>(emptyProfileDetail);
    const [coverLetterCopiedIndex, setCoverLetterCopiedIndex] = useState<number | null>(null);

    const [coverLetterDeleteIndex, setCoverLetterDeleteIndex] = useState<number | null>(null);
    const [faqDeleteIndex, setFaqDeleteIndex] = useState<number | null>(null);

    if (profileId) {
        useEffect(() => { dispatch(getProfileDetailThunk(profileId)) }, [dispatch, profileId])
    }
    useEffect(() => {
        if (profileId && profileDetail) {
            setProfileData({ ...emptyProfileDetail, ...profileDetail })
        }
    }, [profileDetail]);

    function handleProfileInputChange({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) {
        const profile = { ...profileData.profile || {} };
        if (name == 'name' || name == 'stack' || name == 'type') { // keyof Profile)[]
            profile[name] = value;
        }
        setProfileData({ ...profileData, profile });
    }

    function handleCoverLetterInputChange(value: string, index: number) {
        const coverLetters = [...profileData.coverLetters || []];
        coverLetters[index] = { ...coverLetters[index], description: value };
        setProfileData({ ...profileData, coverLetters });
    }

    function handleFaqInputChange({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>, index: number) {
        const faqs = [...profileData.faqs || []];
        if (name == 'question' || name == 'answer') {
            faqs[index] = { ...faqs[index], [name]: value };
        }
        setProfileData({ ...profileData, faqs });
    }

    function addCoverLetter() {
        const emptyCoverLetter: CoverLetter = { profileId: profileData.profile._id, description: '' };
        const coverLetters = profileData.coverLetters ? [...profileData.coverLetters, emptyCoverLetter] : [emptyCoverLetter];
        setProfileData({ ...profileData, coverLetters });
    }


    function addFaq() {
        const emptyFaq: Faq = { profileId: profileData.profile._id, question: '', answer: '' };
        const faqs = profileData.faqs ? [...profileData.faqs, emptyFaq] : [emptyFaq];
        setProfileData({ ...profileData, faqs });
    }

    async function copyCoverLetter(index: number) {
        const coverLetter = profileData.coverLetters[index];
        navigator.clipboard.writeText(coverLetter.description || '');
        setCoverLetterCopiedIndex(index);
        setTimeout(() => setCoverLetterCopiedIndex(null), 1000);
    }

    async function deleteCoverLetter() {
        if (coverLetterDeleteIndex != null) {
            const coverLetter = profileData.coverLetters[coverLetterDeleteIndex];
            if (coverLetter._id) {
                await dispatch(deleteCoverLetterThunk(coverLetter._id));
            } else {
                const coverLetters = profileData.coverLetters.filter((_, i) => i != coverLetterDeleteIndex);
                setProfileData({ ...profileData, coverLetters });
            };
            setCoverLetterDeleteIndex(null);
        }
    }

    async function deleteFaq() {
        if (faqDeleteIndex != null) {
            const faq = profileData.faqs[faqDeleteIndex];
            if (faq._id) {
                await dispatch(deleteFaqThunk(faq._id));
            } else {
                const faqs = profileData.faqs.filter((_, i) => i != faqDeleteIndex);
                setProfileData({ ...profileData, faqs });
            };
            setFaqDeleteIndex(null);
        }
    }

    async function saveProfileData() {
        await dispatch(saveProfileDetailThunk(profileData));
        navigate('/profiles');
    }

    return (
        <>
            <div className='w-full flex items-center justify-between'>
                <div className='flex flex-row gap-2'>
                    <button className='border-2 rounded-full p-2' onClick={() => navigate(-1)}>
                        <FaArrowLeft />
                    </button>
                    <div className='text-3xl font-bold'>Profile Form</div>
                </div>
                <button onClick={saveProfileData} className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700">
                    Save
                </button>
            </div>
            <div className='grid gap-5 grid-cols-1 mt-5'>
                <div className='shadow border p-2'>

                    <div className='w-full grid grid-cols-2 gap-3'>
                        <div>
                            <div className='text-gray-600 font-medium text-sm mb-1'>Name</div>
                            <input type="text" placeholder='John Doe' name='name' value={profileData.profile?.name || ''} onChange={handleProfileInputChange}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
                            {profileErrors.profile.name && <div className='text-red-500 text-sm mt-1'>{profileErrors.profile.name}</div>}
                        </div>
                        <div>
                            <div className='text-gray-600 font-medium text-sm mb-1'>Type</div>
                            <input type="text" placeholder='Professional' name='type' value={profileData.profile?.type || ''} onChange={handleProfileInputChange}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
                            {profileErrors.profile.type && <div className='text-red-500 text-sm mt-1'>{profileErrors.profile.type}</div>}
                        </div>
                        <div>
                            <div className='text-gray-600 font-medium text-sm mb-1'>Stack</div>
                            <input type="text" placeholder='MERN' name='stack' value={profileData.profile?.stack || ''} onChange={handleProfileInputChange}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
                            {profileErrors.profile.stack && <div className='text-red-500 text-sm mt-1'>{profileErrors.profile.stack}</div>}
                        </div>
                    </div>

                    <hr className='my-3 border-2' />

                    <div className="w-full">
                        <div className='w-full flex items-center justify-between border-b pb-2 mb-2'>
                            <div className='text-lg font-semibold'>Cover Letters</div>
                            <button onClick={addCoverLetter} className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                                Add
                            </button>
                        </div>

                        {
                            profileData.coverLetters?.length ?
                                (
                                    <div className="w-full grid grid-cols-2 gap-1">
                                        {
                                            profileData.coverLetters.map((item, cInd) => {
                                                return <div key={cInd}>
                                                    <div className='w-full flex items-center justify-between'>
                                                        <div className='text-gray-600 font-medium text-sm mb-1'>Description</div>
                                                        <div>
                                                            <button className={`text-white p-1 rounded mx-1 ${coverLetterCopiedIndex == cInd ? 'bg-blue-500' : 'bg-gray-500'}`} onClick={() => copyCoverLetter(cInd)}>
                                                                {coverLetterCopiedIndex == cInd ? <FaCheck /> : <FaCopy />}
                                                            </button>
                                                            <button className='bg-red-500 text-white p-1 rounded mx-1' onClick={() => setCoverLetterDeleteIndex(cInd)}>
                                                                <FaTrash />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <input type="text" placeholder='John Doe' name='description' value={(profileData.coverLetters && profileData.coverLetters[cInd].description) || ''} onChange={(e) => { handleCoverLetterInputChange(e.target.value, cInd) }}
                                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
                                                    {/* <CKEditor
                                                        editor={ClassicEditor}
                                                        data={(profileData.coverLetters && profileData.coverLetters[cInd]?.description) || ''}
                                                        onChange={(e, editor) => handleCoverLetterInputChange(editor.getData(), cInd)}
                                                    /> */}
                                                    {(profileErrors.coverLetters && profileErrors.coverLetters[cInd]?.description) && <div className='text-red-500 text-sm mt-1'>{profileErrors.coverLetters[cInd].description}</div>}
                                                </div>
                                            })
                                        }
                                    </div>
                                ) :
                                (
                                    <div className='w-full text-center text-gray-600 text-sm'>
                                        No Cover Letters found!
                                    </div>
                                )
                        }

                    </div>


                    <hr className='my-3 border-2' />


                    <div className="w-full">
                        <div className='w-full flex items-center justify-between border-b pb-2 mb-2'>
                            <div className='text-lg font-semibold'>FAQs</div>
                            <button onClick={addFaq} className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                                Add
                            </button>
                        </div>


                        {

                            profileData.faqs?.length ? (
                                <div className="w-full">
                                    {
                                        profileData.faqs.map((item, fInd) => {
                                            return <div key={fInd} className='border-b pb-2 mb-3'>
                                                <div className='w-full flex items-center justify-between'>
                                                    <div></div>
                                                    <button className='bg-red-500 text-white px-2 rounded' onClick={() => setFaqDeleteIndex(fInd)}>X</button>
                                                </div>
                                                <div className='grid grid-cols-4 gap-1'>
                                                    <div className='col-span-1'>
                                                        <div className='text-gray-600 font-medium text-sm mb-1'>Question</div>
                                                        <input type="text" placeholder='John Doe' name='question' value={(profileData.faqs && profileData.faqs[fInd].question) || ''} onChange={(e) => { handleFaqInputChange(e, fInd) }}
                                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
                                                        {(profileErrors.faqs && profileErrors.faqs[fInd]?.question) && <div className='text-red-500 text-sm mt-1'>{profileErrors.faqs[fInd].question}</div>}
                                                    </div>
                                                    <div className='col-span-3'>
                                                        <div className='text-gray-600 font-medium text-sm mb-1'>Answer</div>
                                                        <input type="text" placeholder='John Doe' name='answer' value={(profileData.faqs && profileData.faqs[fInd].answer) || ''} onChange={(e) => { handleFaqInputChange(e, fInd) }}
                                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
                                                        {(profileErrors.faqs && profileErrors.faqs[fInd]?.answer) && <div className='text-red-500 text-sm mt-1'>{profileErrors.faqs[fInd].answer}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            ) :
                                (
                                    <div className='w-full text-center text-gray-600 text-sm'>
                                        No FAQs found!
                                    </div>
                                )

                        }

                    </div>

                </div>

            </div>

            {(faqDeleteIndex != null) &&
                <ConfirmationDialog title='Delete FAQ' onConfirm={deleteFaq} onClose={() => setFaqDeleteIndex(null)}>
                    <div>Are you sure want to delete <b>FAQ</b>?</div>
                </ConfirmationDialog>
            }

            {(coverLetterDeleteIndex != null) &&
                <ConfirmationDialog title='Delete Cover Letter' onConfirm={deleteCoverLetter} onClose={() => setCoverLetterDeleteIndex(null)}>
                    <div>Are you sure want to delete <b>Cover Letter</b>?</div>
                </ConfirmationDialog>
            }
        </>
    )
}

export default ProfileFormPage