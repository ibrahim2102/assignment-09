import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams, Link } from 'react-router';

const PetsNews = () => {
    const { id } = useParams();
    const data = useLoaderData();
    const [selectedToy, setSelectedToy] = useState(null);

    // Try Now form state
    const [tryNowForm, setTryNowForm] = useState({
        name: '',
        email: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (id) {
            const filteredData = data.find(item => item.toyId == id);
            setSelectedToy(filteredData);
        } else {
            setSelectedToy(null); // Show all cards when no ID
        }
    }, [id, data]);

    // Handle Try Now form input changes
    const handleTryNowChange = (e) => {
        const { name, value } = e.target;
        setTryNowForm(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validate Try Now form
    const validateTryNowForm = () => {
        const newErrors = {};

        if (!tryNowForm.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!tryNowForm.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(tryNowForm.email)) {
            newErrors.email = 'Email is invalid';
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Try Now form submission
    const handleTryNowSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateTryNowForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Simulate form submission delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            setShowSuccess(true);
            
            // Reset form
            setTryNowForm({
                name: '',
                email: ''
            });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
            
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // If no ID is provided, show all cards
    if (!id) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">All Pet Toys</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data.map(toy => (
                        <div key={toy.toyId} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                            <figure>
                                <img 
                                    src={toy.pictureURL} 
                                    alt={toy.toyName}
                                    className="w-full h-48 object-cover"
                                />
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
                                    <span className="text-sm text-gray-600">
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
            </div>
        );
    }

    // If ID is provided but no toy found
    if (!selectedToy) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    // Show specific toy details
    return (
         <div className="w-full px-2 sm:px-4 lg:px-6">
             
             
           

            {/* Main Product Card */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-3 sm:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        {/* Product Image */}
                        <div className="aspect-square order-1 lg:order-1">
                            <img 
                                src={selectedToy.pictureURL} 
                                alt={selectedToy.toyName}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                        
                        {/* Product Details */}
                        <div className="space-y-3 sm:space-y-4 order-2 lg:order-2">
                            <h1 className="card-title text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
                                {selectedToy.toyName}
                            </h1>
                            
                            <div className="flex items-center gap-2">
                                <div className="rating rating-sm">
                                    {[...Array(5)].map((_, i) => (
                                        <input 
                                            key={i}
                                            type="radio" 
                                            name="rating" 
                                            className={`mask mask-star-2 ${i < Math.floor(selectedToy.rating) ? 'bg-yellow-400' : 'bg-gray-300'}`}
                                            disabled
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    {selectedToy.rating}/5.0
                                </span>
                            </div>
                            
                            <div className="text-xl sm:text-2xl font-bold text-green-600">
                                ${selectedToy.price}
                            </div>
                            
                            <div className="badge badge-secondary">
                                {selectedToy.subCategory}
                            </div>
                            
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                {selectedToy.description}
                            </p>
                            
                            <div className="divider"></div>
                            
                            {/* Seller Information */}
                            <div className="space-y-2">
                                <h3 className="font-semibold text-base sm:text-lg">Seller Information</h3>
                                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                                    <p className="text-sm sm:text-base">
                                        <span className="font-medium">Seller:</span> {selectedToy.sellerName}
                                    </p>
                                    <p className="text-sm sm:text-base">
                                        <span className="font-medium">Email:</span> {selectedToy.sellerEmail}
                                    </p>
                                    <p className="text-sm sm:text-base">
                                        <span className="font-medium">Available:</span> {selectedToy.availableQuantity} units
                                    </p>
                                </div>
                            </div>

                            {/* Try Now Form */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Try This Toy Now!</h3>
                                <div className="bg-gradient-to-r from-primary to-secondary text-primary-content p-4 rounded-lg">
                                    <p className="text-sm mb-4 opacity-90">
                                        Want to try this toy before buying? Fill out the form below and we'll arrange a free trial for you!
                                    </p>
                                    
                                    <form onSubmit={handleTryNowSubmit} className="space-y-3">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-primary-content text-sm">Your Name</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={tryNowForm.name}
                                                onChange={handleTryNowChange}
                                                className={`input input-bordered input-sm bg-white text-gray-900 ${formErrors.name ? 'input-error' : ''}`}
                                                placeholder="Enter your full name"
                                            />
                                            {formErrors.name && (
                                                <label className="label">
                                                    <span className="label-text-alt text-error text-xs">{formErrors.name}</span>
                                                </label>
                                            )}
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-primary-content text-sm">Email Address</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={tryNowForm.email}
                                                onChange={handleTryNowChange}
                                                className={`input input-bordered input-sm bg-white text-gray-900 ${formErrors.email ? 'input-error' : ''}`}
                                                placeholder="Enter your email"
                                            />
                                            {formErrors.email && (
                                                <label className="label">
                                                    <span className="label-text-alt text-error text-xs">{formErrors.email}</span>
                                                </label>
                                            )}
                                        </div>

                                        <div className="form-control">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={`btn btn-accent btn-sm text-white ${isSubmitting ? 'loading' : ''}`}
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Try Now'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Success Message */}
                            {showSuccess && (
                                <div className="alert alert-success">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-bold">Success!</h3>
                                        <div className="text-xs">Thank you for your interest! We'll contact you soon about your free trial for {selectedToy.toyName}.</div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Action Buttons */}
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">
                                    Add to Cart
                                </button>
                                <button className="btn btn-outline">
                                    Contact Seller
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Related Products Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Related Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data
                        .filter(toy => toy.toyId !== parseInt(id) && toy.subCategory === selectedToy.subCategory)
                        .slice(0, 3)
                        .map(toy => (
                            <div key={toy.toyId} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                                <figure>
                                    <img 
                                        src={toy.pictureURL} 
                                        alt={toy.toyName}
                                        className="w-full h-48 object-cover"
                                    />
                                </figure>
                                <div className="card-body">
                                    <h3 className="card-title text-lg">{toy.toyName}</h3>
                                    <p className="text-primary font-bold">${toy.price}</p>
                                    <div className="card-actions justify-end">
                                        <Link 
                                            to={`/pets-news/${toy.toyId}`}
                                            className="btn btn-sm btn-outline"
                                        >
                                            View More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default PetsNews;