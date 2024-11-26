import { Outlet, useNavigate } from 'react-router-dom'
import { getAuthUser, onLogoutUser } from '../../utilities/auth'
import { FaRightFromBracket } from 'react-icons/fa6'

const MainLayout = () => {
    const navigate = useNavigate();
    const authUser = getAuthUser();

    function logoutUser() {
        navigate('/logged-out-redirect');
        onLogoutUser();
    }

    return (

        /**************************************************
        * Template
        */
        <>
            <div className='bg-gray-700 text-white py-3 px-6 flex items-center justify-between'>
                <div className='text-lg font-semibold'>Profiles Manager</div>
                <div className='text-sm text-gray-300'>({authUser?.name})</div>
                <div className='text-white hover:text-gray-200 cursor-pointer' onClick={logoutUser}>
                    <FaRightFromBracket />
                </div>
            </div>
            <div className='p-5 bg-gray-50'>
                <Outlet />
            </div>
        </>
    )
}

export default MainLayout