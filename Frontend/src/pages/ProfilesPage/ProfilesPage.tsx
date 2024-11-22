import React from 'react'

const ProfilesPage = () => {
    return (
        <>
            <div className='text-3xl font-bold'>Profiles</div>
            <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5'>
                {
                    [1, 2, 3].map((num1) => {
                        return <div key={num1} className='shadow border p-2'>

                            <div className='w-full grid grid-cols-3 gap-x-1 gap-y-2'>
                                <div className='col-span-1 text-gray-600 font-medium text-md'>Name:</div>
                                <div className='col-span-2 font-semibold text-lg'>12 Name</div>
                                <div className='col-span-1 text-gray-600 font-medium text-md'>Type:</div>
                                <div className='col-span-2 font-semibold text-lg'>12 Type</div>
                                <div className='col-span-1 text-gray-600 font-medium text-md'>Stack:</div>
                                <div className='col-span-2 font-semibold text-lg'>12 Stack</div>
                            </div>

                            <hr className='my-3 border-2' />

                            <div className="w-full grid grid-cols-2 gap-1">
                                {
                                    [1, 2].map(num2 => {
                                        return <div key={num2} className='border'>
                                            This is cover letter
                                        </div>
                                    })
                                }
                            </div>

                            <hr className='my-3 border-2' />

                            <div className="w-full">
                                {
                                    [1, 2].map(num3 => {
                                        return <div key={num3} className='border-b pb-2 mb-1'>
                                            <div className='text-gray-600 font-medium text-sm mb-1'>This is question</div>
                                            <div className='font-medium text-sm'>This is answer</div>
                                        </div>
                                    })
                                }
                            </div>

                        </div>
                    })
                }
            </div>
        </>
    )
}

export default ProfilesPage