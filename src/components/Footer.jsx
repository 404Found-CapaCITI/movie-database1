import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-logo">4🧡4 Found</h2>

        <div className="footer-socials">
          <a href="https://github.com/404Found-CapaCITI" target="_blank" rel="noopener noreferrer">
            <FaGithub className="footer-icon" />
          </a>
        </div>

        <p className="footer-text">© 2025 404 Found. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;