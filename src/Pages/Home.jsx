import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/kidsdata.json');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    return (
        <div className="w-full px-2 sm:px-4 lg:px-6">
            {/* Header */}
            <div className="text-center mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Welcome to ToyTopia</h1>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-4">
                    All Pet Toys ({data.length})
                </h2>
            </div>
            
            {/* Login Prompt for Non-Authenticated Users */}
            {!currentUser && (
                <div className="alert alert-info mb-4 sm:mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-4 h-4 sm:w-6 sm:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div className="flex-1">
                        <h3 className="font-bold text-sm sm:text-base">Login Required!</h3>
                        <div className="text-xs sm:text-sm">Please login to view detailed toy information and make purchases.</div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Link to="/login" className="btn btn-primary btn-xs sm:btn-sm">Login</Link>
                        <Link to="/auth" className="btn btn-outline btn-xs sm:btn-sm">Register</Link>
                    </div>
                </div>
            )}

            {/* Toys Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {data.map(toy => (
                    <div key={toy.toyId} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                        <figure className="h-32 sm:h-40 lg:h-48">
                            <img 
                                src={toy.pictureURL} 
                                alt={toy.toyName}
                                className="w-full h-full object-cover"
                            />
                        </figure>
                        <div className="card-body p-3 sm:p-4">
                            <h2 className="card-title text-sm sm:text-base lg:text-lg line-clamp-2">{toy.toyName}</h2>
                            
                            <div className="flex items-center gap-1 sm:gap-2 mb-2">
                                <div className="rating rating-xs sm:rating-sm">
                                    {[...Array(5)].map((_, i) => (
                                        <input 
                                            key={i}
                                            type="radio" 
                                            name={`rating-${toy.toyId}`}
                                            className={`mask mask-star-2 ${i < Math.floor(toy.rating) ? 'bg-yellow-400' : 'bg-gray-300'}`}
                                            disabled
                                        />
                                    ))}
                                </div>
                                <span className="text-xs sm:text-sm text-gray-600">
                                    {toy.rating}/5.0
                                </span>
                            </div>
                            
                            <p className="text-primary font-bold text-lg sm:text-xl">
                                ${toy.price}
                            </p>
                            
                            <div className="badge badge-secondary badge-sm sm:badge-md mb-2">
                                {toy.subCategory}
                            </div>
                            
                            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                                {toy.description}
                            </p>
                            
                            <div className="card-actions justify-end mt-2 sm:mt-4">
                                <Link 
                                    to={`/pets-news/${toy.toyId}`}
                                    className="btn btn-primary btn-xs sm:btn-sm"
                                >
                                    View More
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;