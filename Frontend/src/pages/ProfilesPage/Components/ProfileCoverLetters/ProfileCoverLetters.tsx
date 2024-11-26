import { useEffect, useState } from 'react'
import { Profile } from '../../../../types/profile.types'
import { CoverLetter } from '../../../../types/cover-letter.types';
import { getCoverLettersByProfile } from '../../../../apis/cover-letter.apis';
import Modal from '../../../../components/Modal/Modal';
import { FaCheck, FaCopy } from 'react-icons/fa6';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface ProfileCoverLettersProps { profileId: Profile['_id']; onCloseModal: () => void; };

const ProfileCoverLetters = ({ profileId, onCloseModal }: ProfileCoverLettersProps) => {
    const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
    const [coverLetterCopiedIndex, setCoverLetterCopiedIndex] = useState<number | null>(null);

    useEffect(() => { onComponentLoad() }, [])

    async function onComponentLoad() {
        const coverLetters = await getCoverLettersByProfile(profileId);
        setCoverLetters(coverLetters);
    }

    async function copyCoverLetter(index: number) {
        const coverLetter = coverLetters[index];
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = coverLetter.description || '';
        const textContent = tempDiv.textContent || tempDiv.innerText;
        await navigator.clipboard.writeText(textContent);
        setCoverLetterCopiedIndex(index);
        setTimeout(() => setCoverLetterCopiedIndex(null), 1000);
    }

    return (
        <>
            <Modal title='Profile Cover Letters' onClose={onCloseModal}>
                <div className="w-full">
                    {
                        coverLetters?.length ? (
                            <>
                                {
                                    coverLetters.map((coverLetter, ind) => {
                                        return <div key={ind} className='border rounded mb-5'>
                                            <div className='flex justify-end p-3'>
                                                <button className={`text-white p-1 rounded mx-1 ${coverLetterCopiedIndex == ind ? 'bg-green-500' : 'bg-blue-500'}`}
                                                    onClick={() => copyCoverLetter(ind)}>
                                                    {coverLetterCopiedIndex == ind ? <FaCheck /> : <FaCopy />}
                                                </button>
                                            </div>
                                            <div className='ck-editor-readonly-div'>
                                                <CKEditor editor={ClassicEditor} data={coverLetter?.description}
                                                    config={{ toolbar: [] }} onReady={(editor) => { editor.enableReadOnlyMode('my-feature-id') }} />
                                            </div>
                                        </div>
                                    })
                                }
                            </>
                        ) : (
                            <div className='text-center text-sm text-gray-500'>No Cover Letters!</div>
                        )
                    }
                </div>
            </Modal>
        </>
    )
}

export default ProfileCoverLetters