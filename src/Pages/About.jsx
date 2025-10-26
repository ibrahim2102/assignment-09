import React from 'react';
import { Link } from 'react-router';

const About = () => {
    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Hero Section */}
            <div className="hero min-h-[400px] bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg mb-8">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold mb-4">About ToyTopia</h1>
                        <p className="text-xl mb-6">
                            Where imagination meets reality, and every toy tells a story of joy and wonder.
                        </p>
                        <Link to="/" className="btn btn-accent">Explore Our Toys</Link>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        At ToyTopia, we believe that every child deserves access to high-quality, 
                        educational, and fun toys that spark creativity and imagination. Our mission 
                        is to provide families with carefully curated toys that not only entertain 
                        but also contribute to a child's development.
                    </p>
                    <p className="text-lg text-gray-700">
                        We're committed to making playtime meaningful, safe, and accessible for 
                        children of all ages and backgrounds.
                    </p>
                </div>
                <div className="bg-base-200 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold mb-4">Why Choose ToyTopia?</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <span className="text-primary text-xl">✓</span>
                            <span>Quality guaranteed toys</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-primary text-xl">✓</span>
                            <span>Educational value focus</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-primary text-xl">✓</span>
                            <span>Safe and non-toxic materials</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-primary text-xl">✓</span>
                            <span>Age-appropriate selections</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-primary text-xl">✓</span>
                            <span>Expert recommendations</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Team Section */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body text-center">
                            <div className="avatar placeholder mx-auto mb-4">
                                <div className="bg-primary text-primary-content rounded-full w-20">
                                    <span className="text-2xl">👨‍💼</span>
                                </div>
                            </div>
                            <h3 className="card-title justify-center">Alex Johnson</h3>
                            <p className="text-primary font-semibold">CEO & Founder</p>
                            <p className="text-sm text-gray-600">
                                Passionate about child development and creating meaningful play experiences.
                            </p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body text-center">
                            <div className="avatar placeholder mx-auto mb-4">
                                <div className="bg-secondary text-secondary-content rounded-full w-20">
                                    <span className="text-2xl">👩‍🎓</span>
                                </div>
                            </div>
                            <h3 className="card-title justify-center">Sarah Chen</h3>
                            <p className="text-primary font-semibold">Child Development Expert</p>
                            <p className="text-sm text-gray-600">
                                Educational psychologist specializing in play-based learning.
                            </p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body text-center">
                            <div className="avatar placeholder mx-auto mb-4">
                                <div className="bg-accent text-accent-content rounded-full w-20">
                                    <span className="text-2xl">👨‍🔬</span>
                                </div>
                            </div>
                            <h3 className="card-title justify-center">Mike Rodriguez</h3>
                            <p className="text-primary font-semibold">Safety Specialist</p>
                            <p className="text-sm text-gray-600">
                                Ensures all toys meet the highest safety and quality standards.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-base-200 p-8 rounded-lg mb-8">
                <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-4xl mb-3">🎯</div>
                        <h3 className="font-bold mb-2">Quality</h3>
                        <p className="text-sm text-gray-600">
                            We only offer toys that meet our strict quality standards.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-3">🛡️</div>
                        <h3 className="font-bold mb-2">Safety</h3>
                        <p className="text-sm text-gray-600">
                            Child safety is our top priority in every product we offer.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-3">💡</div>
                        <h3 className="font-bold mb-2">Innovation</h3>
                        <p className="text-sm text-gray-600">
                            We constantly seek new and innovative toys for children.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-3">❤️</div>
                        <h3 className="font-bold mb-2">Care</h3>
                        <p className="text-sm text-gray-600">
                            We care deeply about children's happiness and development.
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                <p className="text-lg text-gray-600 mb-6">
                    Have questions about our toys or need recommendations? We'd love to hear from you!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/more" className="btn btn-primary">Contact Us</Link>
                    <Link to="/popular-toys" className="btn btn-outline">View Popular Toys</Link>
                </div>
            </div>
        </div>
    );
};

export default About;
