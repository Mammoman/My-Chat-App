import { auth, provider } from "../../config/firebase.js";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import Cookies from 'universal-cookie';
import { Home01Icon } from "hugeicons-react";
import '../../styles/auth/Auth.css'

const cookies = new Cookies();

export const Auth = (props) => {
    const { setIsAuth } = props;

    // State for email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false); // State to toggle between sign up and sign in

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch (err) {
            console.error("Google Sign-In Error:", err);
            alert("Failed to sign in with Google. Please try again.");
        }
    };

    const handleEmailPasswordSignIn = async (e) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                // Sign up with email and password
                const result = await createUserWithEmailAndPassword(auth, email, password);
                cookies.set("auth-token", result.user.refreshToken);
            } else {
                // Sign in with email and password
                const result = await signInWithEmailAndPassword(auth, email, password);
                cookies.set("auth-token", result.user.refreshToken);
            }
            setIsAuth(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container" id="container">
            <div className={`form-container ${isSignUp ? "sign-up-container" : "sign-in-container"}`}>
                <form onSubmit={handleEmailPasswordSignIn}>
                    <h1>{isSignUp ? "Create Account" : "Sign in"}</h1>
                    <div className="social-container">
                    <Home01Icon size={32}  className="social" onClick={handleGoogleSignIn}/>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>{isSignUp ? "or use your email for registration" : "or use your account"}</span>
                    {isSignUp && <input type="text" placeholder="Name" required />}
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
                    {isSignUp ? (
                        <button type="submit">Sign Up</button>
                    ) : (
                        <>
                            <a href="#">Forgot your password?</a>
                            <button type="submit">Sign In</button>
                        </>
                    )}
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" onClick={() => setIsSignUp(false)}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" onClick={() => setIsSignUp(true)}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

