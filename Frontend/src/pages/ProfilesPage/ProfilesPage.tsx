import React, { useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { deleteProfileThunk, getAllProfileDetailsThunk, ProfilesDispatch, ProfilesRootState, profilesStore } from './profiles-page.state'
import { Profile, ProfileDetail } from '../../types/profile.types'
import { FaTrash } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog'

const ProfilesPage = () => {
    return (
        <Provider store={profilesStore}>
            <ProfilesContent />
        </Provider>
    )
}

const ProfilesContent = () => {
    const navigate = useNavigate();

    const { profileDetails } = useSelector((state: ProfilesRootState) => state.profiles_page_state);
    const dispatch: ProfilesDispatch = useDispatch();

    const [profileDeleteId, setProfileDeleteId] = useState<Profile['_id']>('');
    const [profileDetailsList, setProfileDetailsList] = useState<ProfileDetail[]>([]);

    useEffect(() => { dispatch(getAllProfileDetailsThunk()) }, [dispatch]);
    useEffect(() => {
        if (profileDetails) {
            setProfileDetailsList(profileDetails);
        }
    }, [profileDetails]);

    function addProfile() {
        navigate('/profile-form');
    }
    function editProfile(_id: Profile['_id']) {
        navigate(`/profile-form?profileId=${_id}`);
    }
    function deleteProfile(_id: Profile['_id']) {
        setProfileDeleteId(_id);
    }
    async function onDeleteProfile() {
        await dispatch(deleteProfileThunk(profileDeleteId));
        setProfileDeleteId('');
    }

    return <>
        <div className='w-full flex items-center justify-between'>
            <div className='text-3xl font-bold'>Profiles</div>
            <button onClick={addProfile} className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700">
                Add
            </button>
        </div>
        <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5'>
            {
                profileDetailsList.length ? (
                    profileDetailsList.map(({ profile, faqs, coverLetters }, pInd) => {
                        return <div key={pInd} className='shadow border p-2'>

                            <div className='w-full flex items-center justify-end'>
                                <div>
                                    <button className='bg-blue-500 text-white p-1 rounded mx-1' onClick={() => editProfile(profile._id)}>
                                        <FaPencil />
                                    </button>
                                    <button className='bg-red-500 text-white p-1 rounded mx-1' onClick={() => deleteProfile(profile._id)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>

                            <div className='w-full grid grid-cols-3 gap-x-1 gap-y-2'>
                                <div className='col-span-1 text-gray-600 font-medium text-md'>Name:</div>
                                <div className='col-span-2 font-semibold text-lg'>{profile.name}</div>
                                <div className='col-span-1 text-gray-600 font-medium text-md'>Type:</div>
                                <div className='col-span-2 font-semibold text-lg'>{profile.type}</div>
                                <div className='col-span-1 text-gray-600 font-medium text-md'>Stack:</div>
                                <div className='col-span-2 font-semibold text-lg'>{profile.stack}</div>
                            </div>

                            <hr className='my-3 border-2' />

                            <div className="w-full grid grid-cols-2 gap-1">
                                {
                                    coverLetters.map((coverLetter, cInd) => {
                                        return <div key={cInd} className='border' dangerouslySetInnerHTML={{ __html: coverLetter.description || '' }}>
                                        </div>
                                    })
                                }
                            </div>

                            <hr className='my-3 border-2' />

                            <div className="w-full">
                                {
                                    faqs.map((faq, fInd) => {
                                        return <div key={fInd} className='border-b pb-2 mb-1'>
                                            <div className='text-gray-600 font-medium text-sm mb-1'>
                                                {faq.question}
                                            </div>
                                            <div className='font-medium text-sm'>
                                                {faq.answer}
                                            </div>
                                        </div>
                                    })
                                }
                            </div>

                        </div>
                    })
                ) : (
                    <div className='w-full text-center text-gray-600 text-sm'>
                        No Profiles found!
                    </div>
                )
            }
        </div>

        {/* Extras */}
        {profileDeleteId &&
            <ConfirmationDialog title='Delete Profile' onConfirm={onDeleteProfile} onClose={() => setProfileDeleteId('')}>
                <div>Are you sure want to delete <b>Profile</b>?</div>
            </ConfirmationDialog>
        }
    </>
}

export default ProfilesPage