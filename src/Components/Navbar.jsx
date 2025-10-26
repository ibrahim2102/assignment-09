import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isLoggingOut) return;
        
        setIsLoggingOut(true);
        
        try {
            console.log('Starting logout...');
            await logout();
            console.log('Logout successful');
            alert('You have been logged out successfully!');
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            alert('Logout failed. Please try again.');
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="navbar bg-base-100 shadow-sm relative z-50">
            {/* Mobile Menu */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[60] mt-3 w-52 p-2 shadow">
                        <li><NavLink to='/' className="text-sm">Home</NavLink></li>
                        <li><NavLink to='/popular-toys' className="text-sm">Popular Toys</NavLink></li>
                        <li><NavLink to='/about' className="text-sm">About</NavLink></li>
                        <li><NavLink to='/more' className="text-sm">More</NavLink></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-sm sm:text-base lg:text-xl">ToyTopia</a>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to='/' className="text-sm lg:text-base">Home</NavLink></li>
                    <li><NavLink to='/popular-toys' className="text-sm lg:text-base">Popular Toys</NavLink></li>
                    <li><NavLink to='/about' className="text-sm lg:text-base">About</NavLink></li>
                    <li><NavLink to='/more' className="text-sm lg:text-base">More</NavLink></li>
                </ul>
            </div>

            {/* User Section */}
            <div className="navbar-end">
                {currentUser ? (
                    // User is logged in
                    <div className="flex items-center gap-2 lg:gap-3">
                        <div className="avatar placeholder">
                            <div className="bg-primary text-primary-content rounded-full w-8 lg:w-10">
                                <span className="text-xs">
                                    {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
                                </span>
                            </div>
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost text-xs sm:text-sm">
                                <span className="hidden sm:inline">
                                    {currentUser.displayName || currentUser.email}
                                </span>
                                <span className="sm:hidden">Menu</span>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[60] mt-3 w-52 p-2 shadow">
                                <li><NavLink to="/my-profile" className="text-sm">Profile</NavLink></li>
                                <li><a className="text-sm">Settings</a></li>
                                <li>
                                    <button 
                                        onClick={handleLogout} 
                                        disabled={isLoggingOut}
                                        className={`w-full text-left text-sm ${isLoggingOut ? 'opacity-50' : ''}`}
                                    >
                                        {isLoggingOut ? 'Logging out...' : 'Logout'}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    // User is not logged in
                    <div className="flex items-center gap-2 lg:gap-3">
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-8 lg:w-10">
                                <span className="text-xs">👤</span>
                            </div>
                        </div>
                        <NavLink to="/auth" className="btn btn-primary btn-sm lg:btn-md text-xs lg:text-sm">
                            <span className="hidden sm:inline">Register</span>
                            <span className="sm:hidden">Reg</span>
                        </NavLink>
                        <NavLink to="/login" className="btn btn-outline btn-sm lg:btn-md text-xs lg:text-sm">
                            <span className="hidden sm:inline">Login</span>
                            <span className="sm:hidden">Log</span>
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;