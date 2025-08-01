import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { FaExpandAlt, FaCompressAlt } from "react-icons/fa";

const AIBubble = () => {

    const chatBoxRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState('');
    const [fullScreen, setFullScreen] = useState(false);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);
    console.log(input);


    const handleSend = async () => {

        if (input.trim() === '') return;

        const userMessage = { role: 'user', content: input };
        setMessages([...messages, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await axios.post('http://localhost:3000/ask-ai-assistant', {
                message: input
            });
            const data = await res.data;
            console.log('data from AI:', data);
            if (data.response) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
                setIsLoading(false);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I could not process your request.' }]);
                setIsLoading(false);
            }
        }
        catch (error) {
            console.log('Error fetching AI response:', error);
        }

    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };




    return (
        <>
            {/* Circular AI Button with Icon */}
            <AnimatePresence>
                {
                    !isOpen && <motion.div
                        className="fixed bottom-6 right-6 bg-[#111111] w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-lg z-50 group"
                        onClick={() => setIsOpen(!isOpen)}
                        initial={{ scale: 0.75, rotate: -180, y: -200 }}
                        animate={{ scale: 1, rotate: 0, y: 0 }}
                        exit={{ scale: 0.75, rotate: 90, y: -200 }}
                        whileHover={{ scale: 1.1, backgroundColor: '#0A0A0A' }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChatBubbleLeftRightIcon className="w-8 h-8 text-[#FFFFFF]" />
                        <p className={`absolute bottom-5 right-15 bg-[#111111] text-[#FFFFFF] text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ${isOpen ? 'opacity-0' : ''}`}>
                            Ask Friday
                        </p>
                    </motion.div>
                }
            </AnimatePresence>

            {/* Conversational Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        layout
                        transition={{ duration: 0.3 }}
                        className={`fixed ${fullScreen
                            ? 'inset-0 w-full h-full'
                            : 'bottom-24 right-6 w-80 md:w-96 h-[28rem]'
                            } bg-[#0A0A0A] rounded-lg shadow-xl z-50 overflow-hidden flex flex-col`}
                    >
                        {/* Modal Header */}
                        <div className="bg-[#111111] p-4 flex justify-between items-center">
                            <h2 className="text-[#FFFFFF] text-lg font-semibold">Ask Friday</h2>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-[#FFFFFF] text-3xl hover:text-gray-300 cursor-pointer"
                                >
                                    ×
                                </button>
                                <span
                                    onClick={() => setFullScreen(!fullScreen)}
                                    className="text-[#FFFFFF] cursor-pointer"
                                >
                                    {fullScreen ? <FaCompressAlt className="w-5 h-5" /> : <FaExpandAlt className="w-5 h-5" />}
                                </span>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div
                            ref={chatBoxRef}
                            className={`flex-1 overflow-y-auto p-4 bg-[#0A0A0A] text-[#FFFFFF] ${fullScreen ? 'h-[calc(100vh-8rem)]' : 'h-64'} transition-all duration-300`}
                        >
                            <AnimatePresence>
                                {messages.length === 0 ? (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="text-gray-400 text-sm text-center"
                                    >
                                        Ask me about Mysterio or anything else!
                                    </motion.p>
                                ) : (
                                    messages.map((msg, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                                        >
                                            <span
                                                className={`inline-block p-2 rounded-lg ${msg.role === 'user'
                                                    ? 'bg-[#111111] text-[#FFFFFF]'
                                                    : 'bg-gray-700 text-[#FFFFFF]'
                                                    } max-w-[80%] text-sm`}
                                            >
                                                {msg.role === 'user' ? 'You: ' : 'Friday: '}
                                                {msg.content}
                                            </span>
                                        </motion.div>
                                    ))
                                )}
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-gray-400 text-sm"
                                    >
                                        Typing...
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-gray-700">
                            <div className="flex gap-2">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your question..."
                                    className="flex-1 p-2 bg-[#111111] text-[#FFFFFF] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] resize-none text-sm"
                                    rows="2"
                                />
                                <motion.button
                                    onClick={handleSend}
                                    disabled={isLoading || !input}
                                    whileHover={{ backgroundColor: '#111111' }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-4 py-2 bg-[#0A0A0A] text-[#FFFFFF] rounded-md ${isLoading || input === '' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                                        }`}
                                >
                                    Send
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIBubble;