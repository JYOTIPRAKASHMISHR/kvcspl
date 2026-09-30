import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Globe2,
  Zap,
  Loader2,
} from "lucide-react";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, provider, database } from "../firebase";
import { ref, set } from "firebase/database";

import logo from "../assets/logo.png";
import googleLogo from "../assets/google.png";
import "../styles/login.css";

// --------------------------------------------------
// SUB-COMPONENTS
// --------------------------------------------------

/** Animated background mesh and ambient floating orbs */
const BackgroundOrbs = () => (
  <div className="login-background" aria-hidden="true">
    <div className="login-grid" />
    <motion.div
      className="orb orb-one"
      animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="orb orb-two"
      animate={{ x: [0, -70, 0], y: [0, 70, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="orb orb-three"
      animate={{ y: [0, -40, 0], rotate: [0, 180, 360] }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

/** Top branding header */
const BrandHeader = () => (
  <motion.header
    className="login-brand"
    initial={{ y: -30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.7 }}
  >
    <img src={logo} alt="KVCSPL Logo" className="brand-logo" />
    <div className="brand-title">
      <strong>KVCSPL</strong>
      <span>Kumudvasan Consultancy & Services Pvt. Ltd.</span>
    </div>
  </motion.header>
);

/** Left-side promotional hero area */
const LeftHeroSection = () => {
  const featureList = [
    {
      icon: <ShieldCheck size={20} />,
      title: "Secure Workspace",
      desc: "Your account and project information stays protected.",
    },
    {
      icon: <Zap size={20} />,
      title: "Fast Collaboration",
      desc: "Connect with our team and manage your projects efficiently.",
    },
    {
      icon: <Globe2 size={20} />,
      title: "Business Solutions",
      desc: "Technology, HR, compliance, and business support under one ecosystem.",
    },
  ];

  return (
    <motion.section
      className="login-left"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="left-content">
        <motion.div
          className="premium-badge"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Sparkles size={15} />
          <span>Digital Business Solutions</span>
        </motion.div>

        <h1 className="hero-heading">
          Build. <span>Transform.</span> <br /> Grow.
        </h1>

        <p className="login-description">
          Access your KVCSPL workspace and manage your digital projects, consulting
          services, and business collaboration from one centralized platform.
        </p>

        <div className="login-features">
          {featureList.map((item, idx) => (
            <motion.div
              key={idx}
              className="login-feature"
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="feature-icon">{item.icon}</div>
              <div>
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="floating-card"
          animate={{
            y: [0, -12, 0],
            rotateX: [0, 2, 0],
            rotateY: [0, -3, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="floating-card-icon">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <strong>KVCSPL Workspace</strong>
            <span>Secure • Connected • Professional</span>
          </div>
          <div className="floating-status" />
        </motion.div>
      </div>
    </motion.section>
  );
};

// --------------------------------------------------
// MAIN LOGIN COMPONENT
// --------------------------------------------------

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Load saved email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setForm((prev) => ({ ...prev, email: savedEmail }));
      setRemember(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  // Handle Email/Password Login
  const handleLogin = async (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    setError("Please enter your email and password.");
    return;
  }

  setError("");
  setLoading(true);

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      form.email.trim(),
      form.password
    );

    const user = userCredential.user;

    console.log("Login successful:", user.uid);

    if (remember) {
      localStorage.setItem("rememberEmail", form.email.trim());
    } else {
      localStorage.removeItem("rememberEmail");
    }

    navigate("/dashboard");
  } catch (error) {
    console.error("Login error:", error);

    switch (error.code) {
      case "auth/invalid-credential":
        setError("Invalid email or password.");
        break;

      case "auth/user-not-found":
        setError("No account found with this email.");
        break;

      case "auth/wrong-password":
        setError("Incorrect password.");
        break;

      case "auth/invalid-email":
        setError("Please enter a valid email address.");
        break;

      case "auth/too-many-requests":
        setError("Too many login attempts. Please try again later.");
        break;

      default:
        setError("Login failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  // Handle Google OAuth Login
  const handleGoogleLogin = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Sync user profile to Firebase Realtime Database
      await set(ref(database, `users/${user.uid}`), {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        provider: "google",
        updatedAt: Date.now(),
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Google Login Error:", err);
      setError(
        err?.message?.includes("popup")
          ? "Google sign-in popup was closed before completing."
          : "Google login failed. Please try again."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <motion.main
      className="login-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <BackgroundOrbs />
      <BrandHeader />

      <div className="login-wrapper">
        <LeftHeroSection />

        {/* Right Section: Form Container */}
        <motion.section
          className="login-right"
          initial={{ x: 80, opacity: 0, scale: 0.96 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="login-card"
            whileHover={{ rotateX: 1, rotateY: -1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="card-glow" />

            <header className="login-card-header">
              <div className="mini-logo">
                <img src={logo} alt="KVCSPL Small Logo" />
              </div>
              <div>
                <span className="welcome-small">WELCOME BACK</span>
                <h2>
                  Sign in to your <span>workspace</span>
                </h2>
                <p>Continue where you left off.</p>
              </div>
            </header>

            {error && (
              <motion.div
                className="login-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} noValidate>
              {/* Email */}
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <Mail size={19} className="input-icon" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="input-group">
                <div className="password-label">
                  <label htmlFor="password">Password</label>
                  <button
                    type="button"
                    className="forgot-btn"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="input-wrapper">
                  <Lock size={19} className="input-icon" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="login-options">
                <label className="remember-option">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span className="custom-checkbox">{remember ? "✓" : ""}</span>
                  <span>Remember me</span>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="login-btn"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <Loader2 size={19} className="spinner" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={19} />
                  </>
                )}
              </motion.button>
            </form>

            <div className="login-divider">
              <span>OR CONTINUE WITH</span>
            </div>

            {/* Google OAuth Button */}
            <motion.button
              type="button"
              onClick={handleGoogleLogin}
              className="google-btn"
              disabled={googleLoading}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src={googleLogo} alt="Google" />
              <span>
                {googleLoading ? "Connecting..." : "Continue with Google"}
              </span>
            </motion.button>

            {/* Registration Link */}
            <div className="register-text">
              <span>Don't have an account?</span>
              <button type="button" onClick={() => navigate("/register")}>
                Create account <ArrowRight size={15} />
              </button>
            </div>

            <footer className="security-note">
              <ShieldCheck size={15} />
              <span>Protected account • Secure authentication</span>
            </footer>
          </motion.div>
        </motion.section>
      </div>

      <footer className="login-bottom">
        © {new Date().getFullYear()} Kumudvasan Consultancy & Services Pvt. Ltd.
        <span>•</span> Professional Technology & Business Solutions
      </footer>
    </motion.main>
  );
};

export default Login;