import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [formError, setFormError] = useState('');

  // Simple email regex for validation
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    // Email validation
    if (!email.trim()) {
      setErrorEmail('Vui lòng nhập email.');
      valid = false;
    } else if (!validateEmail(email)) {
      setErrorEmail('Email không hợp lệ.');
      valid = false;
    } else {
      setErrorEmail('');
    }

    // Password validation
    if (!password.trim()) {
      setErrorPassword('Vui lòng nhập mật khẩu.');
      valid = false;
    } else if (password.length < 6) {
      setErrorPassword('Mật khẩu phải có ít nhất 6 ký tự.');
      valid = false;
    } else {
      setErrorPassword('');
    }

    if (!valid) {
      setFormError('');
      return;
    }

    setFormError('');
    // Xử lý đăng nhập
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-50 px-2">
      {/* Container - Responsive width */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-8">
        
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
          Đăng Nhập
        </h2>

        {/* Error message */}
        {formError && (
          <div className="mb-4 text-red-500 text-xs text-center">{formError}</div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
              // Không dùng required
            />
            {errorEmail && (
              <div className="mt-1 text-xs text-red-500">{errorEmail}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
              // Không dùng required, minLength
            />
            {errorPassword && (
              <div className="mt-1 text-xs text-red-500">{errorPassword}</div>
            )}
          </div>

          {/* Forgot password */}
          <div className="flex justify-end pt-1">
            <a
              href="#"
              className="text-xs text-yellow-500 font-medium hover:underline transition-all"
            >
              Quên mật khẩu?
            </a>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold py-2 rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-400 transition-all text-sm"
          >
            Đăng Nhập
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-2 text-xs text-gray-400">Hoặc</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Social login */}
        <div className="space-y-3">
          <button className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-lg bg-white hover:bg-yellow-50 transition-all shadow-sm text-xs">
            <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 text-gray-700" />
            <span className="font-medium text-gray-700">
              Đăng nhập với Google
            </span>
          </button>

          <button className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-lg bg-white hover:bg-yellow-50 transition-all shadow-sm text-xs">
            <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5 text-gray-700" />
            <span className="font-medium text-gray-700">
              Đăng nhập với LinkedIn
            </span>
          </button>
        </div>

        {/* Register link */}
        <p className="text-center text-xs mt-8 text-gray-600">
          Chưa có tài khoản?{" "}
          <a
            href="/dang-ky"
            className="text-yellow-500 font-semibold hover:underline transition-all"
          >
            Đăng Ký
          </a>
        </p>
      </div>
    </div>
  );
}