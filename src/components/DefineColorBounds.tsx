/** @format */
"use client";

import React from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

type DefineColorBoundsProps = {
    isVisible: boolean;
    messages: [string, string][];
    handleSendMessage: (e?: React.FormEvent) => void;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    messagesEndRef: React.RefObject<HTMLDivElement>;
    isLoading: boolean;
    startRecording: () => void;
    stopRecording: () => void;
    isRecording: boolean;
};

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

export default function DefineColorBounds({
    isVisible,
    messages,
    handleSendMessage,
    inputValue,
    setInputValue,
    messagesEndRef,
    isLoading,
    startRecording,
    stopRecording,
    isRecording,
}: DefineColorBoundsProps) {
    return (
        <>
            {/* main */}
            {isVisible && (
                <main
                    className={`flex flex-col mt-40 items-center text-center justify-center gap-4 transition-all duration-200 ${messages.length === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                        }`}
                >
                    <div className="h-10 w-10 bg-white p-1 rounded-full">
                        <img src="/assets/chatgpt-log.svg" alt="" />
                    </div>
                    <p className="text-2xl font-semibold">This is the Define Color Bounds Section</p>
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
                                <div className="flex items-start justify-end">
                                    <div className="p-2 bg-[#1f1f1f] rounded-xl max-w-[70%] ml-2">
                                        {text}
                                    </div>
                                    <img src="/assets/user-icon.svg" alt="User" className="h-8 w-8 ml-2 bg-white rounded-full p-1" />
                                </div>
                            ) : (
                                <div className="flex items-start">
                                    <img src="/assets/chatgpt-log.svg" alt="ChatGPT" className="h-8 w-8 mr-2 bg-white rounded-full p-1 mt-2" />
                                    <div className="p-2 rounded-xl mr-auto">
                                        {text}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start">
                            <img src="/assets/chatgpt-log.svg" alt="ChatGPT" className="h-8 w-8 mr-2 bg-white rounded-full p-1 mt-2" />
                            <div className="p-2 rounded-xl mr-auto">
                                <div className="loader"></div>
                            </div>
                        </div>
                    )}
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
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className={`text-black hover:opacity-80 bg-slate-500 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${isLoading ? 'bg-slate-600' : ''}`}
                        disabled={isLoading || isRecording}
                    >
                        <FaPaperPlane />
                    </button>
                    <button
                        type="button"
                        onMouseDown={startRecording}
                        onMouseUp={stopRecording}
                        onTouchStart={startRecording}
                        onTouchEnd={stopRecording}
                        className={`text-black hover:opacity-80 bg-slate-500 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${isLoading ? 'bg-slate-600' : ''}`}
                        disabled={isLoading}
                    >
                        <FaMicrophone />
                    </button>
                </form>
            </section>
        </>
    );
}

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