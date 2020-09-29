import React, { useState } from "react";
import firebase, { storage } from "../firebase";

const Clientform = () => {
  const [client, setClient] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const { name, company, email, phone, message } = client;
  //image upload
  const [image, setImage] = useState();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const onChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setError("");
        setImage(file);
      } else {
        setError("Please select an image to upload");
      }
    }
  };

  const handleSaveImage = () => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          setError(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              setProgress(0);
            });
        }
      );
    } else {
      setError("Error please choose an image to upload");
    }
  };

  async function sendMail(e) {
    // e.preventDefault();
    const url = "//localhost:3001/send";
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: name,
        company: company,
        email: email,
        phone: phone,
        message: message,
      }),
    });
    const json = await res.json();
    console.log(json);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    sendMail();
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
        handleSaveImage();
      })
      .finally(() => {
        setClient({
          name: "",
          company: "",
          email: "",
          phone: "",
          message: "",
        });
      });
      
     console.log("firebase submitted"); 
    }
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
              <i className="fa fa-road"></i> 6318 Arlington Road
            </li>
            <li>
              <i className="fa fa-phone"></i> (904) 638-2918
            </li>
            <li>
              <i className="fa fa-envelope"></i> test@acme.test
            </li>
          </ul>
        </div>
        <div className="contact">
          <h3>New Client Entry Form</h3>
          <div className="alert">
            Your contact has been saved and email generated
          </div>
          <form onSubmit={sendMail, onSubmit} id="contactForm">
            <p>
              <label>Image Upload</label>
              <div style={{ height: "10px" }}>
                {progress > 0 ? <progress value={progress} max="100" /> : ""}
                <p style={{ color: "red" }}>{error}</p>
              </div>
              <input type="file" accept="image/*" capture="camera" onChange={handleImageChange} />
            </p>
            <br></br>
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
                rows="4"
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
