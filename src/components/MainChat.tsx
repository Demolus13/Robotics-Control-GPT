/** @format */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaMicrophone, FaPaperPlane } from "react-icons/fa";

const models = ["ChatGPT 3.5", "ChatGPT 4.0", "ChatGPT 4.5"];

const cardData = [
    {
        heading: "Customer Loyalty Program",
        description: "Earn points for every purchase "
    },
    {
        heading: "Marketing Strategies for Sunglasses (Gen Z)",
        description: "Collaborate with influencers, "
    },
    {
        heading: "Madagascar Wildlife Exploration on a Budget",
        description: "Visit national parks, opt for budget tours."
    },
    {
        heading: "Explaining Superconductors",
        description: "Materials that conduct electricity loss of energy."
    }
];

export default function MainChat() {
    const [selectedModel, setSelectedModel] = useState(models[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownWidth, setDropdownWidth] = useState(0);
    const [messages, setMessages] = useState<[string, string][]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (buttonRef.current) {
            setDropdownWidth(buttonRef.current.offsetWidth);
        }
    }, [dropdownOpen]);

    useEffect(() => {
        if (messages.length > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 200); // Match the duration of the transition

            return () => clearTimeout(timer);
        } else {
            setIsVisible(true);
        }
    }, [messages]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleModelChange = (model: string) => {
        setSelectedModel(model);
        setDropdownOpen(false);
    };

    const handleSendMessage = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (inputValue.trim()) {
            setMessages([...messages, ["user", inputValue]]);
            setInputValue("");

            setTimeout(() => {
                setMessages((prevMessages) => [...prevMessages, ["chatbot", "I'm sorry, I'm just a demo. I don't have the ability to respond to messages yet. Please try again later."]]);
            }, 500);
        }
    };

    return (
        <div className="flex flex-col justify-between gap-3 pb-5 p-4" style={{ height: '100vh' }}>
            {/* nav */}
            <div className="relative">
                <button
                    ref={buttonRef}
                    className="text-s font-bold flex items-center gap-2 rounded-xl p-2 hover:bg-slate-800 transition-all w-fit"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <p>{selectedModel}</p>
                    <FaChevronDown className="text-xs text-gray-500" />
                </button>
                {dropdownOpen && (
                    <div
                        className="absolute shadow-lg rounded-xl"
                        style={{ width: dropdownWidth }}
                    >
                        {models.map((model) => (
                            <button
                                key={model}
                                className="text-s font-bold flex items-center gap-2 rounded-xl p-2 hover:bg-slate-800 transition-all w-full"
                                onClick={() => handleModelChange(model)}
                            >
                                {model}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* main */}
            {isVisible && (
                <main
                    className={`flex flex-col mt-40 items-center text-center justify-center gap-4 transition-all duration-200 ${messages.length === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                        }`}
                >
                    <div className="h-10 w-10 bg-white p-1 rounded-full">
                        <img src="/assets/chatgpt-log.svg" alt="" />
                    </div>
                    <p className="text-2xl font-semibold">How can I help you today?</p>
                </main>
            )}

            <section className={`max-w-3xl mx-auto flex flex-col w-[42.5rem] justify-end  ${isVisible ? '' : 'gap-4'} `} style={{ height: "calc(100vh - 100px)" }}>
                {/* card */}
                {isVisible && (
                    <div className={`grid grid-cols-2 gap-3 transition-opacity duration-200 ${messages.length === 0 ? 'opacity-100' : 'opacity-0'}`}>
                        {cardData.map((d, i) => (
                            <Card key={i} description={d.description} heading={d.heading} />
                        ))}
                    </div>
                )}
                {/* bottom section */}
                <div className={`flex flex-col gap-4 p-4 pb-0 rounded-xl transition-all duration-500 ease-out ${isVisible ? 'translate-y-10 opacity-0' : 'opacity-100'} overflow-y-auto`}>
                    {messages.map(([sender, text], index) => (
                        <div key={index}>
                            {sender === "user" ? (
                                <div className="flex items-center justify-end">
                                    <div className="p-2 bg-[#1f1f1f] rounded-xl max-w-[70%] ml-2">
                                        {text}
                                    </div>
                                    <img src="/assets/user-icon.svg" alt="User" className="h-8 w-8 ml-2 bg-white rounded-full p-1" />
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <img src="/assets/chatgpt-log.svg" alt="ChatGPT" className="h-8 w-8 mr-2 bg-white rounded-full p-1" />
                                    <div className="p-2 rounded-xl mr-auto">
                                        {text}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Searchbar */}
                <form onSubmit={handleSendMessage} className="flex gap-2 z-10">
                    <input
                        type="text"
                        placeholder="Message ChatGPT..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full h-12 bg-[#1f1f1f] dark:bg-[#1f1f1f] rounded-xl px-4"
                    />
                    <button
                        type="submit"
                        className="text-black hover:opacity-80 bg-slate-500 w-12 h-12 rounded-xl flex items-center justify-center"
                    >
                        <FaPaperPlane />
                    </button>
                    <button className="text-black hover:opacity-80 bg-slate-500 w-12 h-12 rounded-xl flex items-center justify-center">
                        <FaMicrophone />
                    </button>
                </form>
            </section>
        </div>
    );
};

type CardProp = {
    heading: string;
    description: string;
};

function Card(props: CardProp) {
    return (
        <button className="w-full hover:bg-slate-800 bg-[#1b1b1b] dark:bg-[#1b1b1b] transition-all flex flex-col gap-1 p-3 text-sm font-semibold rounded-xl">
            <h2>{props.heading}</h2>
            <p className="text-gray-500">{props.description}</p>
        </button>
    );
}