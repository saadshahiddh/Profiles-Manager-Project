import { Outlet } from 'react-router-dom'


const MainLayout = () => {
    return (

        /**************************************************
        * Template
        */
        <>
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <div className='shadow border min-w-96 bg-white rounded p-10'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default MainLayout