import React from 'react';
import { FaEnvelope } from 'react-icons/fa'; // HIGHLIGHT: Import FaEnvelope from react-icons

const EmailButton = () => {
  return (
    // HIGHLIGHT: Replaced button with a styled <a> tag using mailto:
    <a
      href="mailto:skrabbi.019@gmail.com"
      className="text-lg font-semibold flex items-center gap-2 text-white hover:text-[#53EAFD] transition-colors duration-300"
    >
      <FaEnvelope className="text-[#53EAFD]" /> {/* HIGHLIGHT: Changed text-blue-400 to text-[#53EAFD] to match portfolio colors */}
      skrabbi.019@gmail.com
    </a>
  );
};

export default EmailButton;
