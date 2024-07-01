import React from 'react';
import './Footer.css';

const Footer =() => {
    return(
        <footer>
        <div className="footer-content">
          <div className="left">
            <p>BizSync</p>
            <ul className="footer-links">
              <li><a href="#"><p>&copy;</p></a></li>
              <li><a href="#bizsync2024">BizSync 2024</a></li>
              <li><a href="#privacy-policy">Privacy Policy</a></li>
              <li><a href="#cookies-policy">Cookies Policy</a></li>
              <li><a href="#terms-of-use">Terms of Use</a></li>
            </ul>
          </div>
          <div className="right">
         <a href="#facebook" className="social-icon">
        <img src={require('./Instagram.jpg')} alt="Instagram" />
        </a>
        <a href="#twitter" className="social-icon">
        <img src={require('./Twitter.jpg')} alt="Twitter" />
        </a>
        <a href="#instagram" className="social-icon">
        <img src={require('./Email.jpg')} alt="Email" />
        </a>
        </div>

        </div>
      </footer>
    )
}

export default Footer;
