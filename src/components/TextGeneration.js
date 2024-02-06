// TextGeneration.js

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './TextGeneration.css'; // Import your CSS file

const TextGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [pageBackground, setPageBackground] = useState(null); // Default background null
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [fileInputRef, setFileInputRef] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Default background color is white
  const [profileVisible, setProfileVisible] = useState(false);
  

  const handleGenerateText = async () => {
    try {
      const response = await axios.post('http://localhost:8000/generate-text', { prompt });
      const generatedText = response.data.generatedText;

      // Update chat history with user prompt and generated text
      setChatHistory([...chatHistory, { role: 'user', text: prompt }, { role: 'assistant', text: generatedText }]);
    } catch (error) {
      console.error('Error generating text:', error);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Use FileReader to display the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
      setPageBackground(`url(${reader.result})`);
    };
    reader.readAsDataURL(file);
  };

  const handleLogin = async () => {
    try {
      // Implement authentication logic here (e.g., check credentials with a backend server)
      // For simplicity, I'll setLoggedIn to true if email and password are non-empty
      if (email && password) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleCreateAccount = async () => {
    try {
      // Implement account creation logic here
      // For simplicity, I'll setLoggedIn to true if email and password are non-empty
      if (email && password) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error('Error during account creation:', error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      // Implement logic to send an email with login credentials to the entered email
      console.log('Sending email with login credentials to:', forgotPasswordEmail);
    } catch (error) {
      console.error('Error during forgot password:', error);
    }
  };

  const handleToggleSidebar = () => {
    setProfileVisible(!profileVisible);
  };

  return (
    <div className="text-generation-container" style={{ backgroundImage: pageBackground, backgroundColor }}>
      {!isLoggedIn ? (
        <div className="login-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <p onClick={() => setNewAccount(true)}>Don't have an account? Create one here.</p>
          {newAccount && (
            <>
              <button onClick={handleCreateAccount}>Create Account</button>
              <p onClick={() => setNewAccount(false)}>Already have an account? Login here.</p>
            </>
          )}
          <div className="forgot-password">
            <span onClick={() => setForgotPasswordEmail(email)}>Forgot your password?</span>
            {forgotPasswordEmail && (
              <div className="forgot-password-email">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                />
                <button onClick={handleForgotPassword}>Send Email</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="chat-container">
          <div className={`chat-history ${showHistory ? 'active' : ''}`}>
            {chatHistory.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
          <div className="user-input">
            <textarea
              className="text-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your prompt here"
            />
            <button className="generate-button" onClick={handleGenerateText}>
              Generate Text
            </button>
          </div>
        </div>
      )}
      <div className={`sidebar ${profileVisible ? 'visible' : ''}`}>
        {isLoggedIn && (
          <>
            <button className="history-toggle" onClick={() => setShowHistory(!showHistory)}>
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
            <div className="prompt-suggestions">
              <h3>Prompt Suggestions:</h3>
              <ul>
                <li>Describe a scenario for a short story.</li>
                <li>Ask for advice on a topic.</li>
                <li>Compose a poem about nature.</li>
                {/* Add more prompt suggestions as needed */}
              </ul>
            </div>
            <div className="settings">
              <h3>Settings</h3>
              <label>
                Background Color:
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                />
              </label>
              <label>
                Upload Background Image:
                <input
                  type="file"
                  accept="image/*"
                  ref={setFileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <button onClick={handleImageUpload}>Upload Image</button>
              </label>
            </div>
          </>
        )}
      </div>
      <div className="toggle-sidebar" onClick={handleToggleSidebar}>
        {profileVisible ? 'Close Sidebar' : 'Open Sidebar'}
      </div>
    </div>
  );
};

export default TextGeneration;
