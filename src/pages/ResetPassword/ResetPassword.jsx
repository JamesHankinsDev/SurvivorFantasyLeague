import axios from 'axios';
import { useState } from 'react';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === '' || newPassword !== confirmPassword) {
      setMessage(
        'Your Password must be at least 1 character long and must match'
      );
    } else {
      const token = window.location.pathname.split('/')[2];
      try {
        const response = await axios.post(
          'http://localhost:5000/api/auth/reset-password',
          { token, newPassword }
        );
        if ((response.data.message = 'Password reset successfully')) {
          window.location.replace(window.location.origin);
        }
      } catch (err) {
        console.error({ err });
      }
    }
  };

  return (
    <div
      className={
        'h-screen w-screen bg-slate-400 flex flex-col justify-center items-center'
      }
    >
      <div
        className={
          'bg-slate-300 flex flex-col justify-center items-center p-5 rounded'
        }
      >
        <h1 className={'text-xl font-bold'}>Reset Your Password</h1>
        {message}
        <form onSubmit={handleSubmit} className={'flex flex-col p-5'}>
          <input
            className={
              'p-2 m-2 rounded focus:bg-slate-400 hover:bg-slate-900 text-slate-900 bg-slate-900 border-2 border-slate-900'
            }
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            className={
              'p-2 m-2 rounded focus:bg-slate-400 hover:bg-slate-900 text-slate-900 bg-slate-900 border-2 border-slate-900'
            }
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className={
              'p-2 m-2 bg-slate-900 text-slate-200 rounded hover:bg-slate-800'
            }
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
