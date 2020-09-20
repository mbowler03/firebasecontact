import React, { useState } from "react";
import "./style.css";
import firebase from "./firebase";

const Clientform = () => {
  const [client, setClient] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

const {
    name,
    company,
    email,
    phone, 
    message
} = client;

  const onChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    firebase
      .firestore()
      .collection("clients")
      .add({
        name: name,
        company: company,
        email: email,
        phone: phone,
        message: message,
      })
      .then(() => {
        setClient({
            name: "",
            company: "",
            email: "",
            phone: "",
            message: ""
        });
      });
  };

  return (
    <div className="container">
      <h1 className="brand">
        <span>Spinspire</span> Client Contact
      </h1>
      <div className="wrapper">
        <div className="company-info">
          <h3>Spinspire Client Contact</h3>
          <ul>
            <li>
              <i className="fa fa-road"></i> 123 Main Street
            </li>
            <li>
              <i className="fa fa-phone"></i> (555) 555-5555
            </li>
            <li>
              <i className="fa fa-envelope"></i> test@acme.test
            </li>
          </ul>
        </div>
        <div className="contact">
          <h3>Join Our Mailing List</h3>
          <div className="alert">Your message has been sent</div>
          <form onSubmit={onSubmit} id="contactForm">
            <p>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={name}
                id="name"
                onChange={onChange}
                required
              />
            </p>
            <p>
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={company}
                id="company"
                onChange={onChange}
              />
            </p>
            <p>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                id="email"
                onChange={onChange}
                required
              />
            </p>
            <p>
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={phone}
                id="phone"
                onChange={onChange}
              />
            </p>
            <p className="full">
              <label>Message</label>
              <textarea
                name="message"
                rows="5"
                value={message}
                id="message"
                onChange={onChange}
              ></textarea>
            </p>
            <p className="full">
              <button type="submit">Submit</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Clientform;
