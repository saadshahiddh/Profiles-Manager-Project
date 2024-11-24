import { Link } from "react-router-dom"

const HomePage = () => {

    /**************************************************
     * Template
     */
    return (
        <>
            <div className="m-5">
                <div className="text-xl font-semibold mb-5 text-center">HomePage</div>
                <div>Pages</div>
                <ul>
                    <li><Link to={'/'} className="cursor-pointer text-blue-500">/</Link></li>
                    <li><Link to={'/home'} className="cursor-pointer text-blue-500">Home</Link></li>
                    <li><Link to={'/login'} className="cursor-pointer text-blue-500">Login</Link></li>
                    <li><Link to={'/sample'} className="cursor-pointer text-blue-500">Sample</Link></li>
                    <li><Link to={'/profiles'} className="cursor-pointer text-blue-500">Profiles</Link></li>
                    <li><Link to={'/profile-form'} className="cursor-pointer text-blue-500">Profile Form</Link></li>
                </ul>
            </div>
        </>
    )
}

export default HomePage