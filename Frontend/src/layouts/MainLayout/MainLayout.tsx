import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <>
            <div className='bg-gray-700 text-white h-10 flex items-center justify-center'>
                <div>Main Layout</div>
            </div>
            <div className='m-1'>
                <Outlet />
            </div>
        </>
    )
}

export default MainLayout