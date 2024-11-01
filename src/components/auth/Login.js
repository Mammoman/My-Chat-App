{/*import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import React, { useState } from 'react';
import { FaGoogle, FaLinkedinIn, FaFacebook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth/Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/chat'); // Redirect to chat page on successful login
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-credential':
          setError('Invalid email or password');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        default:
          setError('An error occurred. Please try again.');
      }
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/chat'); // Redirect to chat page on successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
      navigate('/chat'); // Redirect to chat page on successful login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <div className="social-container">
              <FaFacebook className="socials" />
              <FaGoogle className="socials" onClick={handleGoogleSignIn} />
              <FaLinkedinIn className="socials" />
            </div>
            <span className='text4'>or use your email for registration</span>
            <input 
              type="text" 
              placeholder="Name" 
              className='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={login} name='login_form'>
            <h1>Sign in</h1>
            <div className="social-container">
              <FaFacebook className="socials" />
              <FaGoogle className="socials" onClick={handleGoogleSignIn} />
              <FaLinkedinIn className="socials" />
            </div>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
            {error && <p>{error}</p>}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={toggleSignUp}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Weirdo!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" id="signUp" onClick={toggleSignUp}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
