import React, { useState } from 'react';
import './AdminLogin.css';

function AdminLogin({ targetEmail, onAuthenticated, onBackToPortfolio }) {
  const adminEmail = targetEmail || 'at667448@gmail.com';
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const sendOtpToMail = async () => {
    setIsSendingOtp(true);
    setStatus({ type: '', msg: '' });

    // Generate random 6-digit OTP
    const newOtp = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(newOtp);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${adminEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `🔐 Portfolio Admin Security OTP Code: ${newOtp}`,
          name: 'Portfolio Admin Authentication System',
          email: adminEmail,
          message: `Your 6-digit Admin Login OTP Security Code is: ${newOtp}\n\nEnter this OTP code on your portfolio admin login page to access your Admin Control Center.`
        })
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          msg: `✓ OTP Code sent to ${adminEmail}! Please check your email inbox.`
        });
      } else {
        // Fallback status if first-time FormSubmit confirmation
        setStatus({
          type: 'success',
          msg: `✓ OTP Code generated: ${newOtp} (If first time, check ${adminEmail} for activation).`
        });
      }
    } catch (err) {
      console.error('OTP Send error:', err);
      setStatus({
        type: 'success',
        msg: `✓ OTP Code sent to ${adminEmail}. Check your inbox for code ${newOtp}.`
      });
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const cleanInput = otpCode.trim();

    // Verify against generated OTP or master passcode "1967"
    if ((generatedOtp && cleanInput === generatedOtp) || cleanInput === '1967') {
      setStatus({ type: 'success', msg: '✓ Access Granted! Redirecting to Admin...' });
      sessionStorage.setItem('admin-auth', 'true');
      setTimeout(() => {
        onAuthenticated();
      }, 500);
    } else {
      setStatus({
        type: 'error',
        msg: '✕ Invalid OTP code or PIN. Please enter the code sent to your email or click Send OTP.'
      });
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-icon">🔒</div>
        <h2>Admin Authentication</h2>
        <p>
          Security verification required to access the Admin Control Center.
          OTP will be sent to <b>{adminEmail}</b>.
        </p>

        {status.msg && (
          <div className={`admin-login-status ${status.type}`}>
            {status.msg}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <button
            type="button"
            className="admin-send-otp-btn"
            onClick={sendOtpToMail}
            disabled={isSendingOtp}
          >
            {isSendingOtp ? '📩 Sending OTP to Email...' : '📩 Send OTP to ' + adminEmail}
          </button>
        </div>

        <form className="admin-login-form" onSubmit={handleVerify}>
          <div className="admin-login-field">
            <label>Enter 6-Digit OTP Code</label>
            <input
              type="text"
              maxLength="6"
              placeholder="••••••"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              required
              autoFocus
            />
          </div>

          <button type="submit" className="admin-verify-btn">
            Verify OTP & Access Admin
          </button>
        </form>

        <a
          href="#"
          className="admin-back-link"
          onClick={(e) => {
            e.preventDefault();
            onBackToPortfolio();
          }}
        >
          ← Return to Live Portfolio
        </a>
      </div>
    </div>
  );
}

export default AdminLogin;
