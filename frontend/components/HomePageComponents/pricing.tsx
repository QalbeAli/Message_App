"use client"
import React, { useState } from 'react';
import { Check, Zap, Sparkles, Loader2 } from 'lucide-react';
import { createCheckoutSession } from '@/services/api';

interface Plan {
    name: string;
    description: string;
    price: string;
    pricingId: string;
    features: string[];
    popular?: boolean;
}

interface PricingCardProps {
    plan: Plan;
    isPopular: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, isPopular }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleGetStarted = async () => {
        setIsLoading(true);
        try {
            await createCheckoutSession(plan.pricingId);
        } catch (error) {
            console.error('Error creating checkout session:', error);
            // Handle error (e.g., show an error message to the user)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`relative flex flex-col overflow-hidden rounded-lg transition-all duration-300 ${isPopular
            ? 'bg-gradient-to-br from-pink-300 via-pink-400 to-cyan-900 shadow-xl shadow-blue-500/20 scale-105'
            : 'bg-gray-800 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02]'
            }`}>
            {isPopular && (
                <div className="absolute top-0 right-0 -mt-2 -mr-2">
                    <div className="flex items-center justify-center w-16 h-16 rotate-45 bg-gradient-to-r from-blue-500 to-cyan-400">
                        <Sparkles className="w-6 h-6 text-white -rotate-45" />
                    </div>
                </div>
            )}
            <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-300">{plan.description}</p>
                <div className="flex items-baseline mt-4">
                    <span className="text-5xl font-extrabold text-white">${plan.price}</span>
                    <span className="ml-1 text-xl text-gray-300">/month</span>
                </div>
            </div>
            <div className="flex-1 px-6 pt-6 pb-8 bg-gray-900 backdrop-filter backdrop-blur-sm bg-opacity-70">
                <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                            <Check className="w-5 h-5 text-cyan-400 shrink-0" />
                            <span className="ml-3 text-base text-gray-300">{feature}</span>
                        </li>
                    ))}
                </ul>
                <button
                    className={`mt-8 block w-full px-4 py-3 font-semibold text-center text-white rounded-lg transition-all duration-300 ${isPopular
                        ? 'bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-blue-600 hover:to-pink-500'
                        : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                    onClick={handleGetStarted}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                        </span>
                    ) : (
                        'Get started'
                    )}
                </button>
            </div>
        </div>
    );
};

const ZVideoAIPricing: React.FC = () => {
    const [isYearly, setIsYearly] = useState<boolean>(false);

    const monthlyPlans: Plan[] = [
        {
            name: "Hobby",
            description: "Ideal for beginners",
            price: "29",
            pricingId: 'price_1Q88e7Fjf2f8MQEYOsVv10zZ',
            features: ["Advanced editing suite", "1080p video quality", "No watermark"]
        },
        {
            name: "Plus",
            description: "Ideal for serious content creators",
            price: "29",
            pricingId: 'price_1Q88e7Fjf2f8MQEYOsVv10zZ',
            popular: true,
            features: ["1001 credits/ month", "Advanced editing suite", "1080p video quality", "No watermark", "Priority email & chat support", "Trend analysis tools"]
        },
        {
            name: "Premium",
            description: "For power users and teams",
            price: "99",
            pricingId: 'price_1Q89ylFjf2f8MQEYsFcohfUd',
            features: ["3000 credits /month", "Premium editing features", "4K video quality", "Custom branding", "24/7 priority support", "Advanced analytics", "API access"]
        }
    ];

    const yearlyPlans: Plan[] = [
        {
            name: "Hobby",
            description: "Ideal for beginners",
            price: "9.99",
            pricingId: 'price_1Q8BHbFjf2f8MQEY2e0y1wKY',
            features: ["Advanced editing suite", "1080p video quality", "No watermark"]
        },
        {
            name: "Plus",
            description: "Ideal for serious content creators",
            price: "9.99",
            pricingId: 'price_1Q8BHbFjf2f8MQEY2e0y1wKY',
            popular: true,
            features: ["1001 credits/ month", "Advanced editing suite", "1080p video quality", "No watermark", "Priority email & chat support", "Trend analysis tools"]
        },
        {
            name: "Premium",
            description: "For power users and teams",
            price: "79",
            pricingId: 'price_1Q8A85Fjf2f8MQEYOj9A1CdJ',
            features: ["3000 credits /month", "Premium editing features", "4K video quality", "Custom branding", "24/7 priority support", "Advanced analytics", "API access"]
        }
    ];

    const activePlans = isYearly ? yearlyPlans : monthlyPlans;

    return (
        <section className="py-20 bg-black">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
                        Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-300">Content Creation</span>
                    </h2>
                    <p className="mt-4 text-xl text-gray-300 lg:mt-6">
                        Choose the plan that amplifies your creativity and takes your videos viral.
                    </p>
                </div>

                <div className="flex items-center justify-center mt-12">
                    <div className="p-1 bg-gray-700 rounded-full">
                        <button
                            className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isYearly ? 'bg-transparent text-gray-300' : 'bg-gradient-to-r from-pink-500 to-cyan-400 text-white'}`}
                            onClick={() => setIsYearly(false)}
                        >
                            Monthly
                        </button>
                        <button
                            className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isYearly ? 'bg-gradient-to-r from-pink-500 to-cyan-400 text-white' : 'bg-transparent text-gray-300'}`}
                            onClick={() => setIsYearly(true)}
                        >
                            Yearly <span className="ml-1 text-xs font-bold text-cyan-300">(Save 20%)</span>
                        </button>
                    </div>
                </div>

                <div className="grid max-w-md grid-cols-1 gap-8 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
                    {activePlans.map((plan, index) => (
                        <PricingCard key={index} plan={plan} isPopular={plan.popular || false} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ZVideoAIPricing;