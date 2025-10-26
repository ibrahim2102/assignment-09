import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const Authentication = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [firebaseError, setFirebaseError] = useState('');

    const { signup, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear errors when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        if (firebaseError) {
            setFirebaseError('');
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setFirebaseError('');
        
        try {
            await signup(formData.email, formData.password, formData.firstName, formData.lastName);
            alert('Registration successful! Welcome to ToyTopia!');
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
            
            // Handle different Firebase error codes
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setFirebaseError('This email is already registered. Please use a different email.');
                    break;
                case 'auth/weak-password':
                    setFirebaseError('Password is too weak. Please choose a stronger password.');
                    break;
                case 'auth/invalid-email':
                    setFirebaseError('Invalid email address.');
                    break;
                default:
                    setFirebaseError('Registration failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setFirebaseError('');
        
        try {
            await signInWithGoogle();
            alert('Registration successful! Welcome to ToyTopia!');
            navigate('/');
        } catch (error) {
            console.error('Google Sign-In error:', error);
            
            // Handle different Firebase error codes
            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    setFirebaseError('Sign-in popup was closed. Please try again.');
                    break;
                case 'auth/popup-blocked':
                    setFirebaseError('Popup was blocked by your browser. Please allow popups and try again.');
                    break;
                case 'auth/cancelled-popup-request':
                    setFirebaseError('Sign-in was cancelled. Please try again.');
                    break;
                default:
                    setFirebaseError('Google Sign-In failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-8 sm:py-12 px-2 sm:px-4 lg:px-8">
            <div className="max-w-md w-full space-y-6 sm:space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-extrabold text-gray-900">
                        Join ToyTopia
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-gray-600">
                        Create your account to start shopping for amazing toys
                    </p>
                </div>

                {/* Firebase Error Display */}
                {firebaseError && (
                    <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs sm:text-sm">{firebaseError}</span>
                    </div>
                )}

                {/* Google Sign-In Button */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body p-4 sm:p-6">
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="btn btn-outline w-full mb-4 text-xs sm:text-sm"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            {isLoading ? 'Signing in...' : 'Continue with Google'}
                        </button>

                        <div className="divider text-xs sm:text-sm">OR</div>

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            {/* Name Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xs sm:text-sm">First Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={`input input-bordered input-sm sm:input-md ${errors.firstName ? 'input-error' : ''}`}
                                    />
                                    {errors.firstName && (
                                        <label className="label">
                                            <span className="label-text-alt text-error text-xs">{errors.firstName}</span>
                                        </label>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xs sm:text-sm">Last Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={`input input-bordered input-sm sm:input-md ${errors.lastName ? 'input-error' : ''}`}
                                    />
                                    {errors.lastName && (
                                        <label className="label">
                                            <span className="label-text-alt text-error text-xs">{errors.lastName}</span>
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xs sm:text-sm">Email Address</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`input input-bordered input-sm sm:input-md ${errors.email ? 'input-error' : ''}`}
                                />
                                {errors.email && (
                                    <label className="label">
                                        <span className="label-text-alt text-error text-xs">{errors.email}</span>
                                    </label>
                                )}
                            </div>

                            {/* Password Fields */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xs sm:text-sm">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`input input-bordered input-sm sm:input-md ${errors.password ? 'input-error' : ''}`}
                                />
                                {errors.password && (
                                    <label className="label">
                                        <span className="label-text-alt text-error text-xs">{errors.password}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xs sm:text-sm">Confirm Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`input input-bordered input-sm sm:input-md ${errors.confirmPassword ? 'input-error' : ''}`}
                                />
                                {errors.confirmPassword && (
                                    <label className="label">
                                        <span className="label-text-alt text-error text-xs">{errors.confirmPassword}</span>
                                    </label>
                                )}
                            </div>

                            {/* Terms and Conditions */}
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className="checkbox checkbox-primary checkbox-sm sm:checkbox-md"
                                    />
                                    <span className="label-text ml-2 text-xs sm:text-sm">
                                        I agree to the{' '}
                                        <a href="#" className="link link-primary">Terms and Conditions</a>
                                        {' '}and{' '}
                                        <a href="#" className="link link-primary">Privacy Policy</a>
                                    </span>
                                </label>
                                {errors.agreeToTerms && (
                                    <label className="label">
                                        <span className="label-text-alt text-error text-xs">{errors.agreeToTerms}</span>
                                    </label>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                                >
                                    {isLoading ? 'Creating Account...' : 'Create Account'}
                                </button>
                            </div>
                        </form>

                        {/* Login Link */}
                        <div className="divider text-xs sm:text-sm">OR</div>
                        <div className="text-center">
                            <p className="text-xs sm:text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="link link-primary">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center">
                    <Link to="/" className="btn btn-ghost">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Authentication;