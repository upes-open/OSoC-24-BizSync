import React from 'react';
import './ContactUs.css';
import emailIcon from './email.png';
import phoneIcon from './phone.png';
import locationIcon from './location.png';
import facebookIcon from './facebook.png';
import instagramIcon from './instagram.png';
import businessIcon from './business.png';
import sendIcon from './send.png';

function ContactUs() {
  return (
    <div className="page">
      <div className="contact--heading">
        <h2>Contact Us</h2>
        <p>Have some big idea or brand to develop and need help?</p>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="body">
        <div className="contact--information">
          <h3 style={{marginLeft : '20px'}} >Contact Information</h3>
          <p style={{marginLeft : '20px'}}>
            Have some questions on how does it work? Please reach out to us, we
            are here to help you.
          </p>

          <div className="email" style={{marginLeft : '20px'}} >
            <img
              src={emailIcon}
              alt="email"
              style={{ width: '30px', height: '30px' }}
            />
            <p>admin@inspirationapp.org</p>
          </div>

          <div className="phone" style={{marginLeft : '20px'}} >
            <img
              src={phoneIcon}
              alt="phone"
              style={{ width: '30px', height: '30px' }}
            />
            <p>+91 7338146217</p>
          </div>

          <div className="location" style={{marginLeft : '20px'}}>
            <img
              src={locationIcon}
              alt="location"
              style={{ width: '30px', height: '30px' }}
            />
            <p>Bangalore, Karnataka</p>
          </div>
            <br />
            <br />
          <div className="foot-icons">
            <img src={facebookIcon} alt="" style={{ cursor: 'pointer' }} />
            <img src={instagramIcon} alt="" style={{ cursor: 'pointer' }} />
            <img src={businessIcon} alt="" style={{ cursor: 'pointer' }} />
          </div>
        </div>

        <div className="form">
          <div className="grid--container">
            <input
              type="text"
              id="FirstName"
              placeholder="First Name"
              className="grid-item"
            />
            <input
              type="text"
              id="LastName"
              placeholder="Last Name"
              className="grid-item"
            />
            <input
              type="number"
              id="PhoneNo"
              placeholder="Phone No."
              className="grid-item"
            />
            <input
              type="email"
              id="Email"
              placeholder="Email"
              className="grid-item"
            />
          </div>
          <br />
          <br />
          <input
            type="text"
            id="Query"
            placeholder="Brief Your Questions"
            className="query"

          />
          <br />
          <br />

          <h4 style= {{marginLeft : '25px'}}>Select Category</h4>

          <input
            type="radio"
            id="technology"
            name="category"
            value="technology"
            style= {{marginLeft : '25px'}}
          />
          <label htmlFor="technology">Technology</label>

          <input
            type="radio"
            id="spirituality"
            name="category"
            value="spirituality"
            style= {{marginLeft : '25px'}}
          />
          <label htmlFor="spirituality">Spirituality</label>

          <input
            type="radio"
            id="health_and_fitness"
            name="category"
            value="health_and_fitness"
            style= {{marginLeft : '25px'}}
          />
          <label htmlFor="health_and_fitness">Health and Fitness</label>

          <input
            type="radio"
            id="business"
            name="category"
            value="business"
            style= {{marginLeft : '25px'}}
          />
          <label htmlFor="business">Business</label>

          <input
            type="radio"
            id="juniors"
            name="category"
            value="juniors"
            style= {{marginLeft : '25px'}}
          />
          <label htmlFor="juniors">Juniors</label>



          <br />
          <br />
          <br />
          <button className="send--button">
            <img src={sendIcon} alt="" />
            Send message
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
