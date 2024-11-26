import React, { useEffect, useState } from 'react'
import { Profile } from '../../../types/profile.types'
import { Faq } from '../../../types/faq.types';
import { getFaqsByProfile } from '../../../apis/faq.apis';
import Modal from '../../../components/Modal/Modal';
import { FaCheck, FaCopy } from 'react-icons/fa6';

interface ProfileFaqsProps { profileId: Profile['_id']; onCloseModal: () => void; };

const ProfileFaqs = ({ profileId, onCloseModal }: ProfileFaqsProps) => {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [faqCopiedIndex, setFaqCopiedIndex] = useState<number | null>(null);

    useEffect(() => { onComponentLoad() }, [])

    async function onComponentLoad() {
        const faqs = await getFaqsByProfile(profileId);
        setFaqs(faqs);
    }

    async function copyFaq(index: number) {
        const faq = faqs[index];
        const contentToCopy = `${faq.question}\n\n${faq.answer}`;
        await navigator.clipboard.writeText(contentToCopy);
        setFaqCopiedIndex(index);
        setTimeout(() => setFaqCopiedIndex(null), 1000);
    }

    return (
        <>
            <Modal onClose={onCloseModal}>
                <div className="w-full">
                    {
                        faqs?.length ? (
                            <>
                                {
                                    faqs.map((faq, fInd) => {
                                        return <div key={fInd} className='border-b pb-2 mb-3'>
                                            <div className='w-full flex flex-row'>
                                                <div className='flex-grow text-gray-600 font-medium mb-1'>
                                                    {faq.question}
                                                </div>
                                                <div className='flex-shrink pl-1'>
                                                    <button className={`text-white p-1 rounded mx-1 ${faqCopiedIndex == fInd ? 'bg-green-500' : 'bg-blue-500'}`}
                                                        onClick={() => copyFaq(fInd)}>
                                                        {faqCopiedIndex == fInd ? <FaCheck /> : <FaCopy />}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='font-medium'>
                                                {faq.answer}
                                            </div>
                                        </div>
                                    })
                                }
                            </>
                        ) : (
                            <div className='text-center text-sm text-gray-500'>No FAQs!</div>
                        )
                    }
                </div>
            </Modal>
        </>
    )
}

export default ProfileFaqs