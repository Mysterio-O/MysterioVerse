import React from 'react';
import { motion } from 'motion/react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import profile from '../../assets/profile.jpg'
import postMessage from '../../privateHooks/postMessage';
import Swal from 'sweetalert2';

const ContactMe = () => {

    const handleMessage = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const subject = form.subject.value;
        const details = form.details.value;
        // console.log(name, email, subject, details);

        let messageObject = {};

        if (name && email && subject && details) {
            messageObject = {
                sender_Name: name,
                sender_Email: email,
                subject,
                message: details
            }
        }

        if (messageObject) {
            postMessage(messageObject)
                .then(data => {
                    if (data?.status === 200 || data?.statusText === 'ok') {
                        Swal.fire({
                            title: 'Message Sent.',
                            text: 'You have successfully sent the message to Mysterio! Please wait, he will contact you soon.',
                            icon: 'success',
                            background: '#000',
                            color: '#fff',
                            iconColor: '#22c55e',
                            timer: 4000,
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            customClass: {
                                popup: 'rounded-xl shadow-lg',
                                title: 'text-white font-semibold',
                                htmlContainer: 'text-gray-300 text-sm',
                            }
                        });
                        form.reset();
                    }
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({
                        title: 'Something went wrong!',
                        text: 'Failed to send the message. Try again.',
                        icon: 'error',
                        background: '#000',
                        color: '#fff',
                        iconColor: '#ef4444',
                        timer: 3000,
                        toast: true,
                        position: 'top',
                        showConfirmButton: false,
                        customClass: {
                            popup: 'rounded-xl shadow-lg',
                            title: 'text-white font-semibold',
                            htmlContainer: 'text-gray-300 text-sm',
                        }
                    });

                })
        }

    }

    return (
        <section id="contact" className="min-h-screen bg-black text-white py-20 px-6 md:px-20 overflow-x-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-14">
                {/* LEFT SECTION */}
                <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, x: -50, y: -50 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h3 className="text-lg text-gray-400 mb-2">Contact Me</h3>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        LET'S TALK ABOUT <br /> YOUR PROJECT
                    </h2>
                    <p className="text-gray-400 mb-10 max-w-lg">
                        Let’s embark on a creative journey together by shaping a visual narrative of your brand in the crowded digital space.
                    </p>

                    {/* Contact Methods */}
                    <div className="space-y-4">
                        <motion.a
                            href='tel:880 1601111011'
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="flex items-center space-x-4 bg-gradient-to-r from-gray-900 to-black p-4 rounded-full w-fit shadow-md cursor-pointer">
                            <img
                                src={profile}
                                alt="avatar"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-sm text-gray-400">BOOK A CALL</p>
                                <p className="font-semibold text-lg flex items-center gap-2">
                                    <FaPhoneAlt className="text-green-500" />
                                    +880 1601111011
                                </p>
                            </div>
                        </motion.a>

                        <motion.a
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            href='mailto:skrabbi.019@gmail.com'
                            className="flex items-center space-x-4 bg-gradient-to-r from-gray-900 to-black p-4 rounded-full w-fit shadow-md">
                            <div className="bg-white p-2 rounded-full">
                                <FaEnvelope className="text-black text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">PREFER EMAIL COMMUNICATION</p>
                                <p className="font-semibold text-lg">hello@example.com</p>
                            </div>
                        </motion.a>
                    </div>
                </motion.div>

                {/* RIGHT SECTION */}
                <motion.form
                    onSubmit={handleMessage}
                    className="flex-1 bg-[#111] p-6 rounded-2xl shadow-xl space-y-5"
                    initial={{ opacity: 0, x: 50, y: 50 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <input
                        required
                        type="text"
                        name='name'
                        placeholder="Your Name"
                        className="w-full bg-black border border-gray-700 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    <input
                        required
                        type="email"
                        name='email'
                        placeholder="Your Email"
                        className="w-full bg-black border border-gray-700 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    <input
                        required
                        type="text"
                        name='subject'
                        placeholder="Subject"
                        className="w-full bg-black border border-gray-700 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    <textarea
                        required
                        rows="5"
                        name='details'
                        placeholder="Message in brief..."
                        className="w-full bg-black border border-gray-700 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-white text-black py-2 px-6 rounded-full font-semibold hover:bg-gray-200 transition"
                    >
                        SEND MESSAGE
                    </button>
                </motion.form>
            </div>
        </section>
    );
};

export default ContactMe;
