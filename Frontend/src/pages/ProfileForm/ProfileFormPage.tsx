import React, { useEffect, useState } from 'react'
import { ProfileDetail } from '../../types/profile.types'
import { CoverLetter } from '../../types/cover-letter.types';
import { Faq } from '../../types/faq.types';

const ProfileFormPage = () => {
    const [profileData, setProfileData] = useState<ProfileDetail>({});
    const [profileErrors, setProfileErrors] = useState<ProfileDetail>({});

    function addCoverLetter() {
        const emptyCoverLetter: CoverLetter = { profileId: profileData._id };
        const coverLetters = profileData.coverLetters ? [...profileData.coverLetters, emptyCoverLetter] : [emptyCoverLetter];
        setProfileData({ ...profileData, coverLetters });
    }

    function addFaq() {
        const emptyFaq: Faq = { profileId: profileData._id };
        const faqs = profileData.faqs ? [...profileData.faqs, emptyFaq] : [emptyFaq];
        setProfileData({ ...profileData, faqs });
    }

    function handleProfileInputChange({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) {
        setProfileData({ ...profileData, [name]: value });
    }

    function handleCoverLetterInputChange({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>, index: number) {
        const coverLetters = [...profileData.coverLetters || []];
        coverLetters[index][(name as keyof CoverLetter)] = value;
        setProfileData({ ...profileData, coverLetters });

    }
    function handleFaqInputChange({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>, index: number) {
        const faqs = [...profileData.faqs || []];
        if (name == 'question' || name == 'answer') {
            faqs[index][name] = value;
        }
        setProfileData({ ...profileData, faqs });
    }

    function saveProfileData() {
        console.log(profileData);
    }

    return (
        <>
            <div className='w-full flex items-center justify-between'>
                <div className='text-3xl font-bold'>Profile Form</div>
                <button onClick={saveProfileData} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700">
                    Save
                </button>
            </div>
            <div className='grid gap-5 grid-cols-1 mt-5'>
                <div className='shadow border p-2'>

                    <div className='w-full grid grid-cols-2 gap-3'>
                        <div>
                            <div className='text-gray-600 font-medium text-sm mb-1'>Name</div>
                            <input type="text" placeholder='John Doe' name='name' value={profileData.name || ''} onChange={handleProfileInputChange}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
                            {profileErrors.name && <div className='text-red-500 text-sm mt-1'>{profileErrors.name}</div>}
                        </div>
                        <div>
                            <div className='text-gray-600 font-medium text-sm mb-1'>Type</div>
                            <input type="text" placeholder='Professional' name='type' value={profileData.type || ''} onChange={handleProfileInputChange}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
                            {profileErrors.type && <div className='text-red-500 text-sm mt-1'>{profileErrors.type}</div>}
                        </div>
                        <div>
                            <div className='text-gray-600 font-medium text-sm mb-1'>Stack</div>
                            <input type="text" placeholder='MERN' name='stack' value={profileData.stack || ''} onChange={handleProfileInputChange}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
                            {profileErrors.stack && <div className='text-red-500 text-sm mt-1'>{profileErrors.stack}</div>}
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
                                            profileData.coverLetters.map((item, ind) => {
                                                return <div key={ind}>
                                                    <div className='text-gray-600 font-medium text-sm mb-1'>Description</div>
                                                    <input type="text" placeholder='John Doe' name='description' value={(profileData.coverLetters && profileData.coverLetters[ind].description) || ''} onChange={(e) => { handleCoverLetterInputChange(e, ind) }}
                                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
                                                    {(profileErrors.coverLetters && profileErrors.coverLetters[ind].description) && <div className='text-red-500 text-sm mt-1'>{profileErrors.coverLetters[ind].description}</div>}
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
                                        profileData.faqs.map((item, ind) => {
                                            return <div key={ind} className='border-b grid grid-cols-4 gap-1 pb-2 mb-3'>
                                                <div className='col-span-1'>
                                                    <div className='text-gray-600 font-medium text-sm mb-1'>Question</div>
                                                    <input type="text" placeholder='John Doe' name='question' value={(profileData.faqs && profileData.faqs[ind].question) || ''} onChange={(e) => { handleFaqInputChange(e, ind) }}
                                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
                                                    {(profileErrors.faqs && profileErrors.faqs[ind].question) && <div className='text-red-500 text-sm mt-1'>{profileErrors.faqs[ind].question}</div>}
                                                </div>
                                                <div className='col-span-3'>
                                                    <div className='text-gray-600 font-medium text-sm mb-1'>Answer</div>
                                                    <input type="text" placeholder='John Doe' name='answer' value={(profileData.faqs && profileData.faqs[ind].answer) || ''} onChange={(e) => { handleFaqInputChange(e, ind) }}
                                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
                                                    {(profileErrors.faqs && profileErrors.faqs[ind].answer) && <div className='text-red-500 text-sm mt-1'>{profileErrors.faqs[ind].answer}</div>}
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
        </>
    )
}

export default ProfileFormPage