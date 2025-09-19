import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { FaExpandAlt, FaCompressAlt, FaCopy, FaCheck } from "react-icons/fa";
import { MdAutorenew } from "react-icons/md";
import { cn } from '../../lib/utils';
import ReactMarkDown from 'react-markdown';
import remarkGfm from 'remark-gfm';



const MarkdownRenderer = ({ children }) => {
    return (
        <ReactMarkDown
            remarkPlugins={[remarkGfm]}
            components={{
                a: ({ node, ...props }) => (
                    <a
                        {...props}
                        target="_blank"
                        rel='noopener noreferrer'
                        className='text-blue-400 underline hover:text-blue-300 font-medium break-words'
                        style={{ wordBreak: 'break-word' }}
                    />
                ),
                p: ({ node, ...props }) => <p className='mb-2 leading-relaxed' {...props} />,
                strong: ({ node, ...props }) => <strong className='font-bold text-white' {...props} />,
            }}
        >
            {children}
        </ReactMarkDown>
    )
};



const AIBubble = () => {
    const chatBoxRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState('');
    const [fullScreen, setFullScreen] = useState(false);
    const [copiedMessageId, setCopiedMessageId] = useState(null);

    const [isClearing, setIsClearing] = useState(false);

    const addAiResWithTyping = (content) => {
        let index = 0;
        const newMessage = { role: "assistant", content: "" };
        setMessages(prev => [...prev, newMessage]);

        const interval = setInterval(() => {
            index++;
            setMessages(prev => {
                const temp = [...prev];
                temp[temp.length - 1].content = content.slice(0, index);
                return temp;
            });

            if (index === content.length) {
                clearInterval(interval);
            }

        }, 10);

    }


    const CopyButton = ({ text, messageId }) => {
        const handleCopy = async () => {
            try {
                await navigator.clipboard.writeText(text);
                setCopiedMessageId(messageId);
                setTimeout(() => setCopiedMessageId(null), 1500); // Reset after 1.5s
            } catch (err) {
                console.error("Failed to copy: ", err);
                alert("Failed to copy text. Please try again.");
            }
        };

        return (
            <button
                onClick={handleCopy}
                className="absolute -bottom-2 -right-2 p-1 rounded hover:bg-gray-600 transition text-gray-300 hover:text-white"
                title="Copy to clipboard"
            >
                {copiedMessageId === messageId ? (
                    <FaCheck size={14} className="text-green-400" />
                ) : (
                    <FaCopy size={14} />
                )}
            </button>
        );
    };



    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { role: 'user', content: input };
        setMessages([...messages, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/ask-ai-assistant`, {
                message: input
            });
            const data = await res.data;
            if (data.response) {
                // setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
                addAiResWithTyping(data.response);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I could not process your request.' }]);
            }
        } catch (error) {
            console.log('Error fetching AI response:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleClearChat = () => {
        if (messages.length === 0) return;
        setIsClearing(true);
    }

    useEffect(() => {
        if (isClearing && messages.length > 0) {
            const timer = setTimeout(() => {
                setMessages([]);
                setIsClearing(false);
            }, 300);

            return () => clearTimeout(timer);

        }
    }, [isClearing, messages]);

    console.log(isLoading,input,);

    return (
        <>
            {/* Floating AI Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        className="fixed bottom-6 right-6 z-50"
                        initial={{ scale: 0.75, rotate: -180, y: -200 }}
                        animate={{ scale: 1, rotate: 0, y: 0 }}
                        exit={{ scale: 0.75, rotate: 90, y: -200 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.button
                            onClick={() => setIsOpen(true)}
                            className="relative group flex items-center justify-center w-14 h-14 rounded-full shadow-xl overflow-hidden"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {/* 🔹 Black grid background */}
                            <div
                                className={cn(
                                    "absolute inset-0 bg-[#0A0A0A]",
                                    "[background-size:40px_40px]",
                                    "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
                                )}
                            />
                            {/* 🔹 Radial fade on top of grid */}
                            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>

                            {/* Icon */}
                            <ChatBubbleLeftRightIcon className="w-7 h-7 text-white relative z-10" />

                            {/* Tooltip */}
                            <p className="absolute -top-10 bg-[#111111] text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                Ask Friday
                            </p>
                        </motion.button>
                    </motion.div>
                )}
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
                        className={`fixed ${fullScreen ? 'inset-0 w-full h-full' : 'bottom-24 right-6 w-80 md:w-96 h-[28rem]'} rounded-lg shadow-xl z-50 overflow-hidden flex flex-col`}
                    >
                        {/* 🔹 Black grid background */}
                        <div
                            className={cn(
                                "absolute inset-0 bg-[#0A0A0A]",
                                "[background-size:40px_40px]",
                                "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
                            )}
                        />
                        {/* 🔹 Radial fade */}
                        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>

                        {/* Modal Header */}
                        <div className="bg-[#111111] p-4 flex justify-between items-center relative z-10">
                            <h2 className="text-white text-lg font-semibold">Friday</h2>
                            <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
                                <button
                                    title="Start new chat"
                                    onClick={handleClearChat}
                                    className="text-white text-3xl hover:text-gray-300 cursor-pointer"
                                >
                                    <MdAutorenew size={25} />
                                </button>
                                <button
                                    title='Close Chat'
                                    onClick={() => setIsOpen(false)}
                                    className="text-white text-3xl hover:text-gray-300 cursor-pointer"
                                >
                                    ×
                                </button>
                                <span
                                    title={`${fullScreen ? 'Minimize Chat' : 'Maximize Chat'}`}
                                    onClick={() => setFullScreen(!fullScreen)}
                                    className="text-white cursor-pointer"
                                >
                                    {fullScreen ? <FaCompressAlt className="w-5 h-5" /> : <FaExpandAlt className="w-5 h-5" />}
                                </span>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div
                            ref={chatBoxRef}
                            className={`flex-1 overflow-y-auto p-4 text-white relative z-10 ${fullScreen ? 'h-[calc(100vh-8rem)]' : 'h-64'} transition-all duration-300 ${messages.length === 0 ? 'flex items-center justify-center' : ''}`}
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
                                            exit={isClearing ? {opacity:0,y:-10} : {opacity:0}}
                                            className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                                        >
                                            <span
                                                className={`relative inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-[#111111] text-white' : 'bg-gray-700 text-white'} max-w-[80%] text-sm`}
                                            >
                                                {msg.role === 'user' ? 'You: ' : 'Friday: '}
                                                <MarkdownRenderer>{msg.content}</MarkdownRenderer>
                                                <CopyButton text={msg.content} messageId={index} />
                                            </span>
                                        </motion.div>
                                    ))
                                )}
                                {isLoading && (
                                    <div className="flex items-start mb-3">
                                        <div className="bg-gray-700 p-2 rounded-lg max-w-[80%]">
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-gray-700 relative z-10">
                            <div className="flex gap-2">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your question..."
                                    className="flex-1 p-2 bg-[#111111] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white resize-none text-sm"
                                    rows="2"
                                    disabled={isClearing || isLoading }
                                />
                                <motion.button
                                    onClick={handleSend}
                                    disabled={isLoading || !input || isClearing}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-4 py-2 bg-[#0A0A0A] text-white rounded-md ${isLoading || input === '' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
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
