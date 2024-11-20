/** @format */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import MainSection from "@/components/MainSection"
import CalibrationWorkspace from "@/components/CalibrationWorkspace";
import DefineColorBounds from "@/components/DefineColorBounds";

declare global {
    interface Window {
      webkitSpeechRecognition: any;
    }
  }

const models = ["ChatGPT 3.5", "ChatGPT 4.0", "ChatGPT 4.5"];

type MainChatProps = {
    currentSection: string;
}

export default function MainChat({ currentSection }: MainChatProps) {
    const [selectedModel, setSelectedModel] = useState(models[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownWidth, setDropdownWidth] = useState(0);
    const [messages, setMessages] = useState<[string, string][]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

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
            setIsLoading(true);

            setTimeout(() => {
                setMessages((prevMessages) => [...prevMessages, ["chatbot", "I'm sorry, I'm just a demo. I don't have the ability to respond to messages yet. Please try again later."]]);
                setIsLoading(false);
            }, 500);
        }
    };

    const startRecording = () => {
        setIsRecording(true);
        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        const prevValue = inputValue;

        recognitionRef.current.onresult = (event: any) => {
            const { transcript } = event.results[event.results.length - 1][0];
            setInputValue(prevValue + " " + transcript);
        };

        recognitionRef.current.start();
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsRecording(false);
        }
    };

    const renderSection = () => {
        switch (currentSection) {
            case "":
                return (
                    <MainSection
                        isVisible={isVisible}
                        messages={messages}
                        handleSendMessage={handleSendMessage}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        messagesEndRef={messagesEndRef}
                        isLoading={isLoading}
                        startRecording={startRecording}
                        stopRecording={stopRecording}
                        isRecording={isRecording}
                    />
                );
            case "calibration-workspace":
                return (
                    <CalibrationWorkspace
                        isVisible={isVisible}
                        messages={messages}
                        handleSendMessage={handleSendMessage}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        messagesEndRef={messagesEndRef}
                        isLoading={isLoading}
                        startRecording={startRecording}
                        stopRecording={stopRecording}
                        isRecording={isRecording}
                    />
                );
            case "define-color-bounds":
                return (
                    <DefineColorBounds
                        isVisible={isVisible}
                        messages={messages}
                        handleSendMessage={handleSendMessage}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        messagesEndRef={messagesEndRef}
                        isLoading={isLoading}
                        startRecording={startRecording}
                        stopRecording={stopRecording}
                        isRecording={isRecording}
                    />
                );
            default:
                return null;
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

            {renderSection()}
        </div>
    );
};
