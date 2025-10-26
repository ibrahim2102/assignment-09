import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router';

const Profile = () => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
                    <Link to="/login" className="btn btn-primary">Login</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex items-center gap-6 mb-6">
                            <div className="avatar">
                                <div className="w-24 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                    <span className="text-3xl font-bold">
                                        {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">{currentUser.displayName || 'User'}</h1>
                                <p className="text-gray-600">{currentUser.email}</p>
                                <div className="badge badge-primary mt-2">Verified User</div>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Account Information</h2>
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-medium">Email:</span>
                                        <span className="ml-2">{currentUser.email}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">User ID:</span>
                                        <span className="ml-2 text-sm text-gray-500">{currentUser.uid}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Account Created:</span>
                                        <span className="ml-2">
                                            {currentUser.metadata?.creationTime ? 
                                                new Date(currentUser.metadata.creationTime).toLocaleDateString() : 
                                                'Unknown'
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Quick Actions</h2>
                                <div className="space-y-2">
                                    <Link to="/" className="btn btn-outline w-full">
                                        Browse Toys
                                    </Link>
                                    <button className="btn btn-outline w-full">
                                        Order History
                                    </button>
                                    <button className="btn btn-outline w-full">
                                        Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="text-center">
                            <Link to="/" className="btn btn-primary">
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    
};

export default Profile;
