import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [firebaseError, setFirebaseError] = useState('');

    const { login, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the page user was trying to access before login
    const from = location.state?.from?.pathname || '/';

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

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
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
            await login(formData.email, formData.password);
            alert('Login successful! Welcome back to ToyTopia!');
            
            // Redirect to the page user was trying to access, or home
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login error:', error);
            
            // Handle different Firebase error codes
            switch (error.code) {
                case 'auth/user-not-found':
                    setFirebaseError('No account found with this email address.');
                    break;
                case 'auth/wrong-password':
                    setFirebaseError('Incorrect password. Please try again.');
                    break;
                case 'auth/invalid-email':
                    setFirebaseError('Invalid email address.');
                    break;
                case 'auth/too-many-requests':
                    setFirebaseError('Too many failed attempts. Please try again later.');
                    break;
                default:
                    setFirebaseError('Login failed. Please check your credentials.');
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
            alert('Login successful! Welcome back to ToyTopia!');
            navigate(from, { replace: true });
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
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to your ToyTopia account
                    </p>
                    {from !== '/' && (
                        <p className="mt-2 text-sm text-blue-600">
                            Please login to access the requested page
                        </p>
                    )}
                </div>

                {/* Firebase Error Display */}
                {firebaseError && (
                    <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{firebaseError}</span>
                    </div>
                )}

                {/* Login Form */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        {/* Google Sign-In Button */}
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="btn btn-outline w-full mb-4"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            {isLoading ? 'Signing in...' : 'Continue with Google'}
                        </button>

                        <div className="divider">OR</div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email Address</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                                />
                                {errors.email && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.email}</span>
                                    </label>
                                )}
                            </div>

                            {/* Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
                                />
                                {errors.password && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.password}</span>
                                    </label>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="form-control">
                                <div className="flex justify-between items-center">
                                    <label className="label cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="rememberMe"
                                            checked={formData.rememberMe}
                                            onChange={handleChange}
                                            className="checkbox checkbox-primary checkbox-sm"
                                        />
                                        <span className="label-text ml-2">Remember me</span>
                                    </label>
                                    <a href="#" className="link link-primary text-sm">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                                >
                                    {isLoading ? 'Signing in...' : 'Sign In'}
                                </button>
                            </div>
                        </form>

                        {/* Register Link */}
                        <div className="divider">OR</div>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/auth" className="link link-primary">
                                    Create one here
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

export default Login;
