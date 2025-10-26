import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const PopularToys = () => {
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

    // Sort toys by rating to get popular ones
    const popularToys = data
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">🌟 Popular Toys</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover our most loved and highly-rated toys that kids absolutely adore! 
                    These are the toys that have received the highest ratings from our customers.
                </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="stat bg-primary text-primary-content rounded-lg">
                    <div className="stat-figure text-primary-content">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <div className="stat-title text-primary-content">Total Toys</div>
                    <div className="stat-value text-primary-content">{data.length}</div>
                    <div className="stat-desc text-primary-content">Amazing collection</div>
                </div>

                <div className="stat bg-secondary text-secondary-content rounded-lg">
                    <div className="stat-figure text-secondary-content">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </div>
                    <div className="stat-title text-secondary-content">Average Rating</div>
                    <div className="stat-value text-secondary-content">
                        {(data.reduce((sum, toy) => sum + toy.rating, 0) / data.length).toFixed(1)}
                    </div>
                    <div className="stat-desc text-secondary-content">Out of 5 stars</div>
                </div>

                <div className="stat bg-accent text-accent-content rounded-lg">
                    <div className="stat-figure text-accent-content">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                        </svg>
                    </div>
                    <div className="stat-title text-accent-content">Categories</div>
                    <div className="stat-value text-accent-content">
                        {new Set(data.map(toy => toy.subCategory)).size}
                    </div>
                    <div className="stat-desc text-accent-content">Different types</div>
                </div>
            </div>

            {/* Popular Toys Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {popularToys.map((toy, index) => (
                    <div key={toy.toyId} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                        <figure className="relative">
                            <img 
                                src={toy.pictureURL} 
                                alt={toy.toyName}
                                className="w-full h-48 object-cover"
                            />
                            {/* Popular Badge */}
                            <div className="absolute top-2 left-2 badge badge-primary">
                                #{index + 1} Popular
                            </div>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-lg">{toy.toyName}</h2>
                            
                            <div className="flex items-center gap-2 mb-2">
                                <div className="rating rating-sm">
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
                                <span className="text-sm text-gray-600 font-semibold">
                                    {toy.rating}/5.0
                                </span>
                            </div>
                            
                            <p className="text-primary font-bold text-xl">
                                ${toy.price}
                            </p>
                            
                            <div className="badge badge-secondary mb-2">
                                {toy.subCategory}
                            </div>
                            
                            <p className="text-gray-600 text-sm line-clamp-2">
                                {toy.description}
                            </p>
                            
                            <div className="card-actions justify-end mt-4">
                                <Link 
                                    to={`/pets-news/${toy.toyId}`}
                                    className="btn btn-primary btn-sm"
                                >
                                    View More
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Back to Home */}
            <div className="text-center mt-8">
                <Link to="/" className="btn btn-outline">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
};

export default PopularToys;
