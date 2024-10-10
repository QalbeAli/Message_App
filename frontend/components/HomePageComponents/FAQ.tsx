"use client"
import React, { useState } from 'react';

const FAQItem = ({ question, answer, isActive, onToggle }: {
    question: string;
    answer: string;
    isActive: boolean;
    onToggle: () => void;
}) => {
    return (
        <div className="relative">
            <div className="absolute -inset-1">
                <div className="w-full h-full mx-auto opacity-30 blur-lg filter" style={{ background: 'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)' }}></div>
            </div>
            <div className="relative overflow-hidden bg-[#1B263B] border border-gray-200 rounded-xl">
                <h3>
                    <button
                        onClick={onToggle}
                        aria-expanded={isActive}
                        className="flex items-center justify-between w-full px-6 py-5 text-xl font-bold text-left text-gray-100 sm:p-8 font-pj"
                    >
                        <span>{question}</span>
                        <span className="ml-4">
                            {isActive ? (
                                <svg className="w-6 h-6 text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            )}
                        </span>
                    </button>
                </h3>
                {isActive && (
                    <div className="px-6 text-gray-100 pb-6 sm:px-8 sm:pb-8">
                        {answer}
                    </div>
                )}
            </div>
        </div>
    );
};

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqItems = [
        {
            question: 'How is this UI Kit different from others in the market?',
            answer: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
        },
        {
            question: 'How long do you provide support?',
            answer: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
        },
        {
            question: 'Do I need any experience to work with Rareblocks?',
            answer: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
        },
        {
            question: 'What kind of files are included?',
            answer: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
        }
    ];

    const toggleIndex = (index: number) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <section className="py-12  sm:py-16 lg:py-20">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl font-pj">Frequently Asked Questions</h2>
                    <p className="max-w-lg mx-auto mt-6 text-base text-gray-100 font-pj">
                        With lots of unique blocks, you can easily build a page without coding. Build your next landing page.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto mt-8 sm:mt-14 space-y-4">
                    {faqItems.map((item, index) => (
                        <FAQItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            isActive={activeIndex === index}
                            onToggle={() => toggleIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
