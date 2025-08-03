// src/components/Auth/OtpVerify.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { API } from '../../config/api';

export default function OtpVerify() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser, setToken, setIsLoading, isLoading } = useAuth();
  const email = localStorage.getItem('otp_email');

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      setIsLoading(true);
    const res = await axios.post(import.meta.env.VITE_API_AUTH_VERIFY_OTP, { email, otp });
      const { token, user } = res.data;
      localStorage.setItem('school_platform_user', JSON.stringify(user));
      localStorage.setItem('school_platform_token', token);
      setUser(user);
      setToken(token);
      localStorage.removeItem('otp_email');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.msg || 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    return <div className="p-4 text-red-600">No email found. Please login again.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-xl font-bold mb-4 text-center">Verify OTP</h2>
        <form onSubmit={handleOtpVerify} className="space-y-6">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            required
          />
          {error && <div className="bg-red-100 text-red-700 p-2 rounded-md">{error}</div>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
}
