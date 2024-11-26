import { useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { deleteProfileThunk, getAllProfileDetailsThunk, ProfilesDispatch, ProfilesRootState, profilesStore } from './profiles-page.state'
import { Profile, ProfileDetail } from '../../types/profile.types'
import { FaTrash, FaCircleNotch, FaPenToSquare } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog'
import { formatDateToMediumDate } from '../../utilities/tool'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ProfileFaqs from './Components/ProfileFaqs/ProfileFaqs'
import ProfileCoverLetters from './Components/ProfileCoverLetters/ProfileCoverLetters'


const ProfilesPage = () => {
    return (
        <Provider store={profilesStore}>
            <ProfilesContent />
        </Provider>
    )
}



/**
 * Profiles Content
 * @returns 
 */
const ProfilesContent = () => {


    /**************************************************
     * Hookes & Others
     */
    const navigate = useNavigate();

    const { profileDetails, isLoading } = useSelector((state: ProfilesRootState) => state.profiles_page_state);
    const dispatch: ProfilesDispatch = useDispatch();

    const [selectedProfileIdId, setSelectedProfileIdId] = useState<Profile['_id']>('');
    const [profileDetailsList, setProfileDetailsList] = useState<ProfileDetail[]>([]);

    const [isFaqsShown, setIsFaqsShown] = useState<boolean>(false);
    const [isCoverLettersShown, setIsCoverLettersShown] = useState<boolean>(false);
    const [isDeleteModalShown, setIsDeleteModalShown] = useState<boolean>(false);

    useEffect(() => { dispatch(getAllProfileDetailsThunk()) }, [dispatch]);
    useEffect(() => {
        if (profileDetails) {
            setProfileDetailsList(profileDetails);
        }
    }, [profileDetails]);



    /**************************************************
     * Functions
     */
    function addProfile() {
        navigate('/profile-form');
    }

    function editProfile(_id: Profile['_id']) {
        navigate(`/profile-form?profileId=${_id}`);
    }

    function deleteProfile(_id: Profile['_id']) {
        setIsDeleteModalShown(true);
        setSelectedProfileIdId(_id);
    }

    async function onDeleteProfile() {
        await dispatch(deleteProfileThunk(selectedProfileIdId));
        setIsDeleteModalShown(false);
    }

    function showCoverLetters(_id: Profile['_id']) {
        setSelectedProfileIdId(_id);
        setIsCoverLettersShown(true);
    }

    function showFaqs(_id: Profile['_id']) {
        setSelectedProfileIdId(_id);
        setIsFaqsShown(true);
    }



    /**************************************************
     * Template
     */
    return <>
        <div className='w-full flex items-center justify-between'>
            <div className='text-3xl font-bold text-gray-800'>Profiles</div>
            <button onClick={addProfile} className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700">
                Add
            </button>
        </div>


        {isLoading && (<div className='flex items-center justify-center py-10'><FaCircleNotch className='spinner-icon' size={50} /></div>)}

        {!isLoading &&
            (
                profileDetailsList.length ? (

                    <div className='grid gap-5 grid-cols-1 lg:grid-cols-2 mt-5'>

                        {/**
                        * Profiles Listing
                        */}
                        {
                            profileDetailsList.map(({ _id, name, stack, type, updatedAt, faqs, coverLetters }, pInd) => {
                                return <div key={pInd} className='shadow border bg-white rounded-lg flex flex-col'>


                                    {/* Profile */}
                                    <div className='flex flex-col flex-shrink w-full p-4'>
                                        <div className='flex flex-row justify-between'>
                                            <div className='flex-grow text-2xl font-bold text-gray-900'>{name}</div>

                                            {/* Buttons */}
                                            <div>
                                                <button className='bg-blue-500 text-white p-1 rounded mx-1' onClick={() => editProfile(_id)}>
                                                    <FaPenToSquare />
                                                </button>
                                                <button className='bg-red-500 text-white p-1 rounded mx-1' onClick={() => deleteProfile(_id)}>
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='text-gray-700 text-lg mt-1'>
                                            <span className='font-semibold'>{type}</span>
                                            <span>&nbsp; — &nbsp;</span>
                                            <span className='font-medium'>{stack}</span>
                                        </div>
                                        <div className='text-gray-500 font-medium text-sm mt-3'>(Updated: {formatDateToMediumDate(updatedAt)})</div>
                                    </div>


                                    {/* Cover Letters */}
                                    <div className="flex flex-col flex-grow bg-gray-100 px-4 py-2 border-t-2">
                                        {
                                            coverLetters?.length ?
                                                (
                                                    <>
                                                        <div className='text-gray-700 text-center text-lg font-semibold mb-2'>Cover Letters</div>
                                                        <div className={`w-full grid grid-cols-1 ${coverLetters.length > 1 && 'sm:grid-cols-2'} gap-1`}>
                                                            {
                                                                coverLetters.map((coverLetter, cInd) => {
                                                                    return <div key={cInd} className='border rounded ck-editor-readonly-div'>
                                                                        <CKEditor editor={ClassicEditor} data={coverLetter.description!.length > 140 ? coverLetter.description?.slice(0, coverLetter.description!.lastIndexOf(' ', 140)) + '...' : coverLetter?.description}
                                                                            config={{ toolbar: [] }} onReady={(editor) => { editor.enableReadOnlyMode('my-feature-id') }} />
                                                                    </div>
                                                                })
                                                            }
                                                        </div>

                                                        <div className='text-center text-sm mt-2 font-semibold cursor-pointer text-blue-500 hover:underline' onClick={() => showCoverLetters(_id)}>View Detail</div>
                                                    </>
                                                ) : (
                                                    <div className='flex flex-grow items-center justify-center text-center text-sm font-medium text-gray-500'>No Cover Letters!</div>
                                                )
                                        }
                                    </div>



                                    {/* FAQs */}
                                    <div className="flex flex-col flex-grow w-full border-t-2 bg-gray-100 px-4 py-2">
                                        {
                                            faqs?.length ? (
                                                <>
                                                    <div className='text-gray-700 text-center text-lg font-semibold mb-2'>FAQs</div>
                                                    {
                                                        faqs.map((faq, fInd) => {
                                                            return <div key={fInd} className='border pb-2 mb-1 bg-white p-2 rounded'>
                                                                <div className='text-gray-600 font-medium text-sm mb-1'>
                                                                    {faq.question}
                                                                </div>
                                                                <div className='text-gray-800 font-medium text-sm'>
                                                                    {faq.answer!.length > 80 ? faq.answer?.slice(0, faq.answer!.lastIndexOf(' ', 80)) + '...' : faq?.answer}
                                                                </div>
                                                            </div>
                                                        })
                                                    }
                                                    <div className='text-center text-sm mt-2 font-semibold cursor-pointer text-blue-500 hover:underline' onClick={() => showFaqs(_id)}>View Detail</div>
                                                </>
                                            ) : (
                                                <div className='flex flex-grow items-center justify-center text-center text-sm font-medium text-gray-500'>No FAQs!</div>
                                            )
                                        }
                                    </div>

                                </div>
                            })
                        }

                    </div>

                ) : (

                    /**
                     * No Profiles
                     */
                    <div className='w-full text-center text-gray-600 text-sm'>
                        No Profiles found!
                    </div>
                )
            )
        }



        {/* Confimation dialog */}
        {isDeleteModalShown &&
            <ConfirmationDialog title='Delete Profile' onConfirm={onDeleteProfile} onClose={() => setSelectedProfileIdId('')}>
                <div>Are you sure want to delete <b>Profile</b>?</div>
            </ConfirmationDialog>
        }


        {/* Cover Letters dialog */}
        {isCoverLettersShown && <ProfileCoverLetters profileId={selectedProfileIdId} onCloseModal={() => { setIsCoverLettersShown(false) }} />}

        {/* FAQs dialog */}
        {isFaqsShown && <ProfileFaqs profileId={selectedProfileIdId} onCloseModal={() => { setIsFaqsShown(false) }} />}

    </>
}

export default ProfilesPage