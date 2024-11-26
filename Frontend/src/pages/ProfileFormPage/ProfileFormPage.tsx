import React, { useEffect, useState } from 'react'
import { Profile, ProfileFormData } from '../../types/profile.types'
import { CoverLetter } from '../../types/cover-letter.types';
import { Faq } from '../../types/faq.types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteCoverLetterThunk, deleteFaqThunk, getProfileFormDataThunk, ProfileFormDispatch, ProfileFormRootState, profileFormStore, saveProfileFormDataThunk } from './profile-form-page.state';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaCopy, FaCheck, FaArrowLeft } from 'react-icons/fa';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog';
import { FaCircleNotch, FaCirclePlus, FaFloppyDisk } from 'react-icons/fa6';
import { getAuthUser } from '../../utilities/auth';


const ProfileFormPage = () => {
    return <Provider store={profileFormStore}>
        <ProfileFormContent />
    </Provider>
}



/**
 * Profile Form Content
 * @returns 
 */
const ProfileFormContent = () => {
    /**************************************************
     * Hookes & Others
     */
    const authUser = getAuthUser();
    const location = useLocation();
    const navigate = useNavigate();
    const profileId: Profile['_id'] = (new URLSearchParams(location.search)).get('profileId') || '';

    const { profileFormData: profileFormDetail, isLoading } = useSelector((state: ProfileFormRootState) => state.profile_form_state);
    const dispatch: ProfileFormDispatch = useDispatch();

    const emptyProfileFormData: ProfileFormData = { userId: authUser?._id, profile: {}, coverLetters: [], faqs: [] };
    const [profileFormData, setProfileFormData] = useState<ProfileFormData>(emptyProfileFormData);
    const [profileErrors, setProfileErrors] = useState<Profile>({});
    const [isCoverLettersShown, setIsCoverLettersShown] = useState<boolean>(true);
    const [coverLetterCopiedIndex, setCoverLetterCopiedIndex] = useState<number | null>(null);
    const [coverLetterDeleteIndex, setCoverLetterDeleteIndex] = useState<number | null>(null);
    const [faqDeleteIndex, setFaqDeleteIndex] = useState<number | null>(null);
    const [bottomFormType, setBottomFormType] = useState<'cover-letters' | 'faqs'>('cover-letters');

    if (profileId) {
        useEffect(() => { dispatch(getProfileFormDataThunk(profileId)) }, [dispatch, profileId])
    }
    useEffect(() => {
        if (profileId && profileFormDetail) {
            setProfileFormData({ ...emptyProfileFormData, ...profileFormDetail })
        }
    }, [profileFormDetail]);



    /**************************************************
    * Functions
    */
    function goBack() {
        navigate(-1);
    }
    function handleProfileInputChange({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) {
        const profile = { ...profileFormData.profile || {} };
        if (name == 'name' || name == 'stack' || name == 'type') { // keyof Profile)[]
            profile[name] = value;
        }
        setProfileFormData({ ...profileFormData, profile });
        setProfileErrors(prevData => { return { ...prevData, [name]: '' } });
    }

    function handleCoverLetterDescriptionChange(value: string, index: number) {
        const coverLetters = [...profileFormData.coverLetters || []];
        coverLetters[index] = { ...coverLetters[index], description: value };
        setProfileFormData({ ...profileFormData, coverLetters });
    }

    function handleFaqInputChange({ target: { name, value } }: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, index: number) {
        const faqs = [...profileFormData.faqs || []];
        if (name == 'question' || name == 'answer') {
            faqs[index] = { ...faqs[index], [name]: value };
        }
        setProfileFormData({ ...profileFormData, faqs });
    }

    function addCoverLetter() {
        const emptyCoverLetter: CoverLetter = { profileId: profileFormData.profile._id, description: '' };
        const coverLetters = profileFormData.coverLetters ? [...profileFormData.coverLetters, emptyCoverLetter] : [emptyCoverLetter];
        setProfileFormData({ ...profileFormData, coverLetters });
    }

    function addFaq() {
        const emptyFaq: Faq = { profileId: profileFormData.profile._id, question: '', answer: '' };
        const faqs = profileFormData.faqs ? [...profileFormData.faqs, emptyFaq] : [emptyFaq];
        setProfileFormData({ ...profileFormData, faqs });
    }

    async function copyCoverLetter(index: number) {
        const coverLetter = profileFormData.coverLetters[index];
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = coverLetter.description || '';
        const textContent = tempDiv.textContent || tempDiv.innerText;
        await navigator.clipboard.writeText(textContent);
        setCoverLetterCopiedIndex(index);
        setTimeout(() => setCoverLetterCopiedIndex(null), 1000);
    }

    async function deleteCoverLetter() {
        if (coverLetterDeleteIndex != null) {
            const coverLetter = profileFormData.coverLetters[coverLetterDeleteIndex];
            if (coverLetter._id) {
                await dispatch(deleteCoverLetterThunk(coverLetter._id));
            } else {
                const coverLetters = profileFormData.coverLetters.filter((_, i) => i != coverLetterDeleteIndex);
                setProfileFormData({ ...profileFormData, coverLetters });
            };
            setCoverLetterDeleteIndex(null);

            //? Added this to update ck editors
            setIsCoverLettersShown(false);
            setTimeout(() => { setIsCoverLettersShown(true) }, 50);
        }
    }

    async function deleteFaq() {
        if (faqDeleteIndex != null) {
            const faq = profileFormData.faqs[faqDeleteIndex];
            if (faq._id) {
                await dispatch(deleteFaqThunk(faq._id));
            } else {
                const faqs = profileFormData.faqs.filter((_, i) => i != faqDeleteIndex);
                setProfileFormData({ ...profileFormData, faqs });
            };
            setFaqDeleteIndex(null);
        }
    }

    function validateForm() {
        const profileErrors: Profile = {};
        const { name, type, stack } = profileFormData.profile;
        if (!name || !name.trim()) {
            profileErrors['name'] = 'Name is required';
        }
        if (!type || !type.trim()) {
            profileErrors['type'] = 'Type is required';
        }
        if (!stack || !stack.trim()) {
            profileErrors['stack'] = 'Stack is required';
        }
        setProfileErrors(profileErrors);
        return !Object.keys(profileErrors).length;
    }

    async function saveProfileFormData() {
        if (validateForm()) {
            await dispatch(saveProfileFormDataThunk(profileFormData));
            goBack();
        }
    }



    /**************************************************
    * Template
    */
    return (
        <>

            {/* Header */}
            <div className='w-full flex items-center justify-between'>
                <div className='flex flex-row gap-2'>
                    <button className='border-2 rounded-full p-2 bg-white' onClick={() => goBack()}>
                        <FaArrowLeft />
                    </button>
                    <div className='text-3xl font-bold'>Profile Form</div>
                </div>
                <div>
                    {isLoading && <FaCircleNotch className='spinner-icon' size={50} />}
                </div>
                <div className='' style={{ position: 'fixed', zIndex: 9999, right: '30px', bottom: '30px' }}>
                    <button onClick={saveProfileFormData}
                        className="shadow px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 flex gap-2 items-center">
                        <FaFloppyDisk size={20} />
                        <span>Save Profile</span>
                    </button>
                </div>
            </div>


            {/* Profile */}
            <div className='grid gap-5 grid-cols-1 mt-5'>

                <div className='p-3 bg-white border rounded'>
                    <div className='w-full flex items-center justify-between border-b pb-2 mb-5'>
                        <div className='text-lg font-semibold'>Profile</div>
                        <div></div>
                    </div>
                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
                        <div>
                            <div className='text-gray-600 font-medium text-sm mb-1'>Name</div>
                            <input type="text" placeholder='John Doe' name='name' value={profileFormData.profile?.name || ''} onChange={handleProfileInputChange}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
                            {profileErrors.name && <div className='text-red-500 text-sm mt-1'>{profileErrors.name}</div>}
                        </div>
                        <div>
                            <div className='text-gray-600 font-medium text-sm mb-1'>Type</div>
                            <input type="text" placeholder='Developer' name='type' value={profileFormData.profile?.type || ''} onChange={handleProfileInputChange}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
                            {profileErrors.type && <div className='text-red-500 text-sm mt-1'>{profileErrors.type}</div>}
                        </div>
                        <div>
                            <div className='text-gray-600 font-medium text-sm mb-1'>Stack</div>
                            <input type="text" placeholder='MERN' name='stack' value={profileFormData.profile?.stack || ''} onChange={handleProfileInputChange}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
                            {profileErrors.stack && <div className='text-red-500 text-sm mt-1'>{profileErrors.stack}</div>}
                        </div>
                    </div>
                </div>


                <hr className='my-3 border-2' />


                <div>
                    <div className='w-full grid grid-cols-2 bg-white'>
                        <div className={`cursor-pointer text-center border text-xl font-semibold p-3 ${bottomFormType == 'cover-letters' && 'bg-gray-500 text-white'}`}
                            onClick={() => { setBottomFormType('cover-letters')}}>
                            Cover Letters
                        </div>
                        <div className={`cursor-pointer text-center border text-xl font-semibold p-3 ${bottomFormType == 'faqs' && 'bg-gray-500 text-white'}`}
                            onClick={() => { setBottomFormType('faqs')}}>
                            FAQs
                        </div>
                    </div>



                    {/* Cover Letters */}
                    {bottomFormType == 'cover-letters' && (
                        <div className='p-3 bg-white border rounded'>
                            <div className='w-full flex items-center justify-end border-b pb-2 mb-5'>
                                <button onClick={addCoverLetter} className="px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-700">
                                    <div className='flex flex-row items-center gap-2'>
                                        <FaCirclePlus />
                                        <span>Add Cover Letter</span>
                                    </div>
                                </button>
                            </div>

                            {
                                (profileFormData.coverLetters?.length && isCoverLettersShown) ?
                                    (
                                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {
                                                profileFormData.coverLetters.map((coverLetter, cInd) => {
                                                    return <div key={cInd}>
                                                        <div className='w-full'>
                                                            <div className='flex items-center justify-end mb-2'>
                                                                <div>
                                                                    <button className={`text-white p-1 rounded mx-1 ${coverLetterCopiedIndex == cInd ? 'bg-green-500' : 'bg-blue-500'}`} onClick={() => copyCoverLetter(cInd)}>
                                                                        {coverLetterCopiedIndex == cInd ? <FaCheck /> : <FaCopy />}
                                                                    </button>
                                                                    <button className='bg-red-500 text-white p-1 rounded mx-1' onClick={() => setCoverLetterDeleteIndex(cInd)}>
                                                                        <FaTrash />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            {/* <input type="text" placeholder='I am a MERN stack developer.' name='description' value={item.description || ''} onChange={(e) => { handleCoverLetterDescriptionChange(e.target.value, cInd) }}
                                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' /> */}
                                                            <CKEditor editor={ClassicEditor} data={coverLetter.description || ''}
                                                                onChange={(_, editor) => handleCoverLetterDescriptionChange(editor.getData(), cInd)} />
                                                        </div>
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
                    )
                    }


                    {/* FAQs */}

                    {bottomFormType == 'faqs' && (
                        <div className='p-3 bg-white border rounded'>
                            <div className='w-full flex items-center justify-end border-b pb-2 mb-5'>
                                <button onClick={addFaq} className="px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-700">
                                    <div className='flex flex-row items-center gap-2'>
                                        <FaCirclePlus />
                                        <span>Add FAQ</span>
                                    </div>
                                </button>
                            </div>


                            {

                                profileFormData.faqs?.length ? (
                                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                                        {
                                            profileFormData.faqs.map((faq, fInd) => {
                                                return <div key={fInd} className='border-b pb-2 mb-3'>
                                                    <div className='flex flex-col gap-1'>
                                                        <div className='w-full'>
                                                            <div className='w-full flex items-center justify-between'>
                                                                <div className='text-gray-600 font-medium text-sm mb-1'>Question</div>
                                                                <button className='bg-red-500 text-white px-2 rounded mb-2' onClick={() => setFaqDeleteIndex(fInd)}>X</button>
                                                            </div>
                                                            <input type="text" placeholder='What is your experience?' name='question' value={faq.question || ''} onChange={(e) => { handleFaqInputChange(e, fInd) }}
                                                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
                                                        </div>
                                                        <div className='w-full'>
                                                            <div className='text-gray-600 font-medium text-sm mb-1'>Answer</div>
                                                            <textarea rows={3} placeholder='I have 1 year of experience in full stack development.' name='answer' value={faq.answer || ''} onChange={(e) => { handleFaqInputChange(e, fInd) }}
                                                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
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
                    )}
                </div>


            </div>


            {/* FAQ delete Confimation dialog */}
            {(faqDeleteIndex != null) &&
                <ConfirmationDialog title='Delete FAQ' onConfirm={deleteFaq} onClose={() => setFaqDeleteIndex(null)}>
                    <div>Are you sure want to delete <b>FAQ</b>?</div>
                </ConfirmationDialog>
            }


            {/* Cover Letter delete Confimation dialog */}
            {(coverLetterDeleteIndex != null) &&
                <ConfirmationDialog title='Delete Cover Letter' onConfirm={deleteCoverLetter} onClose={() => setCoverLetterDeleteIndex(null)}>
                    <div>Are you sure want to delete <b>Cover Letter</b>?</div>
                </ConfirmationDialog>
            }
        </>
    )
}

export default ProfileFormPage