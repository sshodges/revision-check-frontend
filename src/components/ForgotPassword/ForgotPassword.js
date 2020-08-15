import React, { useState } from 'react';
import { connect } from 'react-redux';
// Actions
import {
  sendForgotPasswordCode,
  resetPassword,
} from '../../actions/authActions';
// Other Components
import { Stage2 } from './components/Stage2/Stage2';
import { Stage1 } from './components/Stage1/Stage1';
import { Redirect } from 'react-router-dom';
import ErrorMessage from '../Dashboard/components/layout/ErrorMessage';

const ForgotPassword = ({ sendForgotPasswordCode, resetPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [error, setError] = useState('');
  const [stage, setStage] = useState(1);
  const [loading, setLoading] = useState(false);

  const sendCode = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await sendForgotPasswordCode(email).catch((err) => {
      setError(err.message);
    });
    if (res) setStage(2);
    setLoading(false);
  };

  const sendResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);

    const payload = {
      email,
      password,
      verifyCode,
    };

    setLoading();

    const res = await resetPassword(payload).catch((err) => {
      setError(err.message);
    });
    if (res) {
      setStage(3);
    }

    setLoading(false);
  };

  return (
    <div>
      {stage === 1 && (
        <Stage1 setEmail={setEmail} sendCode={sendCode} loading={loading} />
      )}
      {stage === 2 && (
        <Stage2
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          setVerifyCode={setVerifyCode}
          sendResetPassword={sendResetPassword}
          loading={loading}
        />
      )}
      {stage === 3 && <Redirect to='/login' />}
      {error && (
        <ErrorMessage message={error} clearError={() => setError('')} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  sendForgotPasswordCode,
  resetPassword,
})(ForgotPassword);
