import React, { useState } from 'react';
import { Link } from 'react-router';

const More = () => {
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactForm(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!contactForm.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!contactForm.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!contactForm.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!contactForm.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setShowSuccess(true);
            setContactForm({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setTimeout(() => setShowSuccess(false), 5000);
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">More Information</h1>
                <p className="text-lg text-gray-600">
                    Find everything you need to know about ToyTopia, from contact information to helpful resources.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4">Contact Us</h2>
                        
                        {showSuccess && (
                            <div className="alert alert-success mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h3 className="font-bold">Message Sent!</h3>
                                    <div className="text-xs">We'll get back to you soon.</div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={contactForm.name}
                                    onChange={handleChange}
                                    className={`input input-bordered ${formErrors.name ? 'input-error' : ''}`}
                                    placeholder="Enter your full name"
                                />
                                {formErrors.name && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{formErrors.name}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email Address</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={contactForm.email}
                                    onChange={handleChange}
                                    className={`input input-bordered ${formErrors.email ? 'input-error' : ''}`}
                                    placeholder="Enter your email"
                                />
                                {formErrors.email && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{formErrors.email}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Subject</span>
                                </label>
                                <select
                                    name="subject"
                                    value={contactForm.subject}
                                    onChange={handleChange}
                                    className={`select select-bordered ${formErrors.subject ? 'select-error' : ''}`}
                                >
                                    <option value="">Select a subject</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="product">Product Question</option>
                                    <option value="order">Order Support</option>
                                    <option value="feedback">Feedback</option>
                                    <option value="partnership">Partnership</option>
                                </select>
                                {formErrors.subject && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{formErrors.subject}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={contactForm.message}
                                    onChange={handleChange}
                                    className={`textarea textarea-bordered ${formErrors.message ? 'textarea-error' : ''}`}
                                    placeholder="Tell us how we can help you..."
                                    rows="4"
                                />
                                {formErrors.message && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{formErrors.message}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Information Cards */}
                <div className="space-y-6">
                    {/* Quick Links */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h3 className="card-title text-xl mb-4">Quick Links</h3>
                            <div className="space-y-2">
                                <Link to="/popular-toys" className="btn btn-outline btn-sm w-full justify-start">
                                    🌟 Popular Toys
                                </Link>
                                <Link to="/about" className="btn btn-outline btn-sm w-full justify-start">
                                    ℹ️ About Us
                                </Link>
                                <Link to="/" className="btn btn-outline btn-sm w-full justify-start">
                                    🏠 Home
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h3 className="card-title text-xl mb-4">Get in Touch</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-primary text-xl">📧</span>
                                    <div>
                                        <p className="font-semibold">Email</p>
                                        <p className="text-sm text-gray-600">support@toytopia.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-primary text-xl">📞</span>
                                    <div>
                                        <p className="font-semibold">Phone</p>
                                        <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-primary text-xl">📍</span>
                                    <div>
                                        <p className="font-semibold">Address</p>
                                        <p className="text-sm text-gray-600">123 Toy Street, Play City, PC 12345</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-primary text-xl">🕒</span>
                                    <div>
                                        <p className="font-semibold">Hours</p>
                                        <p className="text-sm text-gray-600">Mon-Fri: 9AM-6PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h3 className="card-title text-xl mb-4">Frequently Asked Questions</h3>
                            <div className="space-y-3">
                                <div className="collapse collapse-arrow bg-base-200">
                                    <input type="radio" name="faq-accordion" />
                                    <div className="collapse-title text-sm font-medium">
                                        How do I place an order?
                                    </div>
                                    <div className="collapse-content">
                                        <p className="text-xs text-gray-600">
                                            Simply browse our toys, click "Add to Cart", and proceed to checkout. 
                                            You'll need to create an account first.
                                        </p>
                                    </div>
                                </div>
                                <div className="collapse collapse-arrow bg-base-200">
                                    <input type="radio" name="faq-accordion" />
                                    <div className="collapse-title text-sm font-medium">
                                        What is your return policy?
                                    </div>
                                    <div className="collapse-content">
                                        <p className="text-xs text-gray-600">
                                            We offer a 30-day return policy for unused items in original packaging.
                                        </p>
                                    </div>
                                </div>
                                <div className="collapse collapse-arrow bg-base-200">
                                    <input type="radio" name="faq-accordion" />
                                    <div className="collapse-title text-sm font-medium">
                                        Do you offer free shipping?
                                    </div>
                                    <div className="collapse-content">
                                        <p className="text-xs text-gray-600">
                                            Yes! Free shipping on orders over $50 within the continental US.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default More;
