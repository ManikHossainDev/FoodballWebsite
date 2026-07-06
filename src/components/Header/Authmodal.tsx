/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button, Input, Checkbox, message } from "antd";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "signin" | "signup";
}

type View = "signin" | "signup" | "role" | "forgot" | "verify" | "reset";
type VerifyPurpose = "signup" | "forgot";

const roles = [
  { value: "player", title: "Football Player", description: "Upload videos & get coaching" },
  { value: "coach", title: "Scout/ Coach", description: "Review videos & mentor players" },
  { value: "consultant", title: "Scout/ Consultant", description: "Mentor clubs/academies" },
  { value: "club", title: "Scout/ Club", description: "Scout & recruit players" },
];

const OTP_LENGTH = 6;

const AuthModal = ({ isOpen, onClose, initialTab = "signin" }: AuthModalProps) => {
  const [view, setView] = useState<View>(initialTab);
  const [verifyPurpose, setVerifyPurpose] = useState<VerifyPurpose>("signup");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [forgotEmail, setForgotEmail] = useState("");

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resendTimer, setResendTimer] = useState(0);

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (isOpen) setView(initialTab);
  }, [isOpen, initialTab]);

  const resetAllFields = () => {
    setEmail("");
    setPassword("");
    setSignupData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
    setForgotEmail("");
    setOtp(Array(OTP_LENGTH).fill(""));
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleClose = useCallback(() => {
    resetAllFields();
    setView(initialTab);
    onClose();
  }, [initialTab, onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const startVerify = (purpose: VerifyPurpose) => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setVerifyPurpose(purpose);
    setResendTimer(30);
    setView("verify");
  };

  const handleSignUpFormSubmit = () => {
    const { fullName, email, password, confirmPassword } = signupData;
    if (!fullName || !email || !password || !confirmPassword) {
      message.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    setView("role");
  };

  const handleRoleSelection = (selectedRole: string) => {
    setSignupData((prev) => ({ ...prev, role: selectedRole }));
  };

  const handleRoleSubmit = () => {
    if (!signupData.role) {
      message.error("Please select a role first");
      return;
    }
    loading_start();

    console.log("1st API Triggered (On Sign Up Button Click):", signupData);

    setTimeout(() => {
      setLoading(false);
      message.success("Registration info saved. Verification code sent to your email!");
      startVerify("signup");
    }, 1000);
  };

  const loading_start = () => setLoading(true);

  const handleVerifySubmit = () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      message.error("Please enter the full code");
      return;
    }
    loading_start();

    console.log("2nd API Triggered:", { email: signupData.email, code });

    setTimeout(() => {
      setLoading(false);
      if (verifyPurpose === "signup") {
        message.success("Email verified successfully! Please sign in to your account.");
        setView("signin"); 
      } else {
        setView("reset"); 
      }
    }, 1000);
  };

  const handleSignIn = () => {
    if (!email || !password) {
      message.error("Email and password are required");
      return;
    }
    loading_start();
    console.log("Sign in", { email, password });
    setTimeout(() => {
      setLoading(false);
      handleClose();
    }, 600);
  };

  const handleForgotSubmit = () => {
    if (!forgotEmail) {
      message.error("Please enter your email");
      return;
    }
    loading_start();
    console.log("Forgot password for", { forgotEmail });
    setTimeout(() => {
      setLoading(false);
      message.success("Verification code sent to your email");
      startVerify("forgot");
    }, 600);
  };

  const handleResetSubmit = () => {
    if (!newPassword || !confirmNewPassword) {
      message.error("Please fill in both fields");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      message.error("Passwords do not match");
      return;
    }
    loading_start();
    console.log("Reset password", { newPassword });
    setTimeout(() => {
      setLoading(false);
      message.success("Password reset successful, please sign in");
      resetAllFields();
      setView("signin");
    }, 600);
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    message.success("Verification code resent");
    setOtp(Array(OTP_LENGTH).fill(""));
    setResendTimer(30);
  };

  if (!isOpen) return null;

  const heading: Record<View, { title: string; subtitle: string }> = {
    signin: { title: "Sign in to Football Connect", subtitle: "Enter your credentials to access your account" },
    signup: { title: "Create Your Account", subtitle: "Step 1: Enter your credentials to create your account" },
    role: { title: "Choose Your Role", subtitle: "Step 2: Select how you want to use FootballConnect" },
    verify: { title: "Verify Your Email", subtitle: `Step 3: Enter the ${OTP_LENGTH}-digit code sent to your email` },
    forgot: { title: "Forgot Password", subtitle: "Enter your email to receive a verification code" },
    reset: { title: "Reset Password", subtitle: "Enter your new password" },
  };

  return (
    <aside className="fixed top-20 right-3 w-[300px] md:w-[400px] backdrop-blur-sm bg-[#C6C6C6] rounded-md shadow-lg z-50 overflow-y-auto max-h-[calc(100vh-100px)] p-[15px] transition-all duration-500 ease-in-out">
      {/* ✕ Button updated with high z-index and explicit click action */}
      <button 
        type="button"
        onClick={handleClose} 
        className="absolute top-4 right-4 z-50 text-white hover:text-gray-200 font-bold bg-transparent border-none cursor-pointer p-1 pointer-events-auto"
        aria-label="Close modal"
      >
        ✕
      </button>

      <div className="mb-6 relative z-10">
        <h2 className="text-lg font-semibold text-white mb-1" style={{
                textShadow:
                  "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
                animation: "bounceInRotate 1s ease-out 0.4s both",
              }}>{heading[view].title}</h2>
        <p className="text-[10px] md:text-sm text-white/90">{heading[view].subtitle}</p>
      </div>

      {view === "signin" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-2">Email</label>
            <Input placeholder="your@email.com" size="large" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-md" />
          </div>
          <div>
            <label className="block text-sm text-white mb-2">Password</label>
            <Input.Password placeholder="Enter your password" size="large" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md" />
          </div>
          <div className="text-left">
            <button type="button" className="text-sm text-red-500 hover:text-red-600 bg-transparent border-none cursor-pointer p-0" onClick={() => { setForgotEmail(email); setView("forgot"); }}>
              Forgot password?
            </button>
          </div>
          <Button type="primary" size="large" block loading={loading} onClick={handleSignIn} className="rounded-md font-medium" style={{ backgroundColor: "#ef4444", borderColor: "#ef4444", height: "44px" }}>
            Sign In
          </Button>
          <div className="text-center text-sm mt-4">
            <span className="text-white">Don&apos;t have an account? </span>
            <button type="button" className="text-red-500 hover:text-red-600 font-medium bg-transparent border-none cursor-pointer p-0" onClick={() => setView("signup")}>
              Sign Up
            </button>
          </div>
        </div>
      )}

      {view === "signup" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-2">Full Name</label>
            <Input placeholder="Enter your name" size="large" value={signupData.fullName} onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })} className="rounded-md" />
          </div>
          <div>
            <label className="block text-sm text-white mb-2">Email</label>
            <Input placeholder="your@email.com" size="large" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} className="rounded-md" />
          </div>
          <div>
            <label className="block text-sm text-white mb-2">Password</label>
            <Input.Password placeholder="Enter your password" size="large" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} className="rounded-md" />
          </div>
          <div>
            <label className="block text-sm text-white mb-2">Confirm Password</label>
            <Input.Password placeholder="Enter your password again" size="large" value={signupData.confirmPassword} onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })} className="rounded-md" />
          </div>
          <Button type="primary" size="large" block onClick={handleSignUpFormSubmit} className="rounded-md font-medium mt-6" style={{ backgroundColor: "#ef4444", borderColor: "#ef4444", height: "44px" }}>
            Continue
          </Button>
          <div className="text-center text-sm mt-4">
            <span className="text-white">Already have an account? </span>
            <button type="button" className="text-red-500 hover:text-red-600 font-medium bg-transparent border-none cursor-pointer p-0" onClick={() => setView("signin")}>
              Sign In
            </button>
          </div>
        </div>
      )}

      {view === "role" && (
        <div className="space-y-4">
          {roles.map((role) => (
            <div key={role.value} onClick={() => handleRoleSelection(role.value)} className="w-full text-left flex space-x-5 cursor-pointer hover:bg-[#00000040] transition-colors duration-300 rounded-md" style={{ color: "white", padding: "10px", fontSize: "16px" }}>
              <div className="w-8 h-8 bg-white px-2 rounded-md flex items-center justify-center">
                <Checkbox checked={signupData.role === role.value} disabled />
              </div>
              <div className="text-xs md:text-base">
                <h1 className="font-bold" >{role.title}</h1>
                <p className="text-[#0f1016] text-xs">{role.description}</p>
              </div>
            </div>
          ))}
          
          <div className="flex space-x-2 mt-6">
            <button type="button" onClick={() => setView("signup")} className="py-2 px-4 rounded-md text-white border border-white transition-all duration-300 hover:bg-[#00000050]">
              Back
            </button>
            <Button type="primary" size="large" block loading={loading} onClick={handleRoleSubmit} className="rounded-md font-medium" style={{ backgroundColor: "#ef4444", borderColor: "#ef4444", height: "44px" }}>
              Sign Up
            </Button>
          </div>
        </div>
      )}

      {view === "verify" && (
        <div className="space-y-4">
          <div className="flex justify-between gap-2">
            {otp.map((digit, i) => (
              <input key={i} ref={(el) => { otpRefs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)} className="w-10 h-12 text-center text-lg rounded-md border border-gray-400 text-black focus:border-red-500 focus:outline-none" />
            ))}
          </div>
          <Button type="primary" size="large" block loading={loading} onClick={handleVerifySubmit} className="rounded-md font-medium" style={{ backgroundColor: "#ef4444", borderColor: "#ef4444", height: "44px" }}>
            Verify
          </Button>
          <div className="text-center text-sm mt-4">
            {resendTimer > 0 ? <span className="text-white">Resend code in {resendTimer}s</span> : <button type="button" className="text-red-500 hover:text-red-600 font-medium bg-transparent border-none cursor-pointer p-0" onClick={handleResendOtp}>Resend Code</button>}
          </div>
          <div className="text-center text-sm">
            <button type="button" className="text-white/80 hover:text-white bg-transparent border-none cursor-pointer p-0" onClick={() => setView(verifyPurpose === "signup" ? "role" : "forgot")}>
              Back
            </button>
          </div>
        </div>
      )}

      {view === "forgot" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-2">Email</label>
            <Input placeholder="your@email.com" size="large" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} className="rounded-md" />
          </div>
          <Button type="primary" size="large" block loading={loading} onClick={handleForgotSubmit} className="rounded-md font-medium" style={{ backgroundColor: "#ef4444", borderColor: "#ef4444", height: "44px" }}>
            Send Code
          </Button>
          <div className="text-center text-sm mt-4">
            <button type="button" className="text-red-500 hover:text-red-600 font-medium bg-transparent border-none cursor-pointer p-0" onClick={() => setView("signin")}>
              Back to Sign In
            </button>
          </div>
        </div>
      )}

      {view === "reset" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-2">New Password</label>
            <Input.Password placeholder="Enter new password" size="large" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="rounded-md" />
          </div>
          <div>
            <label className="block text-sm text-white mb-2">Confirm New Password</label>
            <Input.Password placeholder="Confirm new password" size="large" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="rounded-md" />
          </div>
          <Button type="primary" size="large" block loading={loading} onClick={handleResetSubmit} className="rounded-md font-medium" style={{ backgroundColor: "#ef4444", borderColor: "#ef4444", height: "44px" }}>
            Reset Password
          </Button>
        </div>
      )}
    </aside>
  );
};

export default AuthModal;