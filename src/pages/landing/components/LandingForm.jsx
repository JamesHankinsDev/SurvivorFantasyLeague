import { useEffect, useState } from 'react';
import useResetPassword from '../../../hooks/Authentication/useResetPassword';

export const LandingForm = ({
  formTitle,
  formBody,
  formCTA,
  handleFormSubmit,
  setCredentials,
}) => {
  const [email, setEmail] = useState('');
  const [fantasyTribe, setFantasyTribe] = useState('');
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  useEffect(() => {
    if (formCTA !== 'Login') {
      setShowPasswordReset(false);
    }
  }, [formCTA]);

  const {
    handleResetPassword: resetPasswordHandler,
    loading: resetLoading,
    success: resetSuccess,
  } = useResetPassword();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPasswordHandler({
        username: fantasyTribe,
        email,
      });
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <>
      {' '}
      {showPasswordReset ? (
        resetLoading ? (
          <h1>Creating password reset email...</h1>
        ) : (
          <form
            onSubmit={handleResetPassword}
            className={'flex flex-col items-center text-center'}
          >
            <h1 className={'text-2xl font-bold'}>{'Reset your password'}</h1>
            <h2
              className={'py-5 text-lg font-bold'}
            >{`Enter your Email here, and we'll send you a reset link!`}</h2>
            <div className={'form'}>
              <input
                className={'input'}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className={'input-border'}></span>
            </div>
            <div className={'form'}>
              <input
                className={'input'}
                type="text"
                placeholder="Fantasy Tribe Name"
                onChange={(e) => setFantasyTribe(e.target.value)}
              />
              <span className={'input-border'}></span>
            </div>
            <button className={'mt-5 boton-elegante'} type="submit">
              Send reset link
            </button>
            {formCTA === 'Login' ? (
              <span
                className={
                  'p-5 hover:cursor-pointer text-slate-300 hover:text-slate-200'
                }
                onClick={() => setShowPasswordReset(!showPasswordReset)}
              >
                Oh wait! I remember!
              </span>
            ) : (
              <></>
            )}
          </form>
        )
      ) : (
        <>
          <form
            className={'flex flex-col items-center text-center'}
            onSubmit={handleFormSubmit}
          >
            <h1 className={'text-2xl font-bold'}>{formTitle}</h1>
            <h2 className={'py-5 text-lg font-bold'}>{formBody}</h2>
            <div className={'form'}>
              <input
                className={'input'}
                type="text"
                placeholder="Fantasy Tribe Name"
                onChange={(e) =>
                  setCredentials((pv) => ({
                    ...pv,
                    username: e.target.value,
                  }))
                }
              />
              <span className={'input-border'}></span>
            </div>
            <div className={'form'}>
              <input
                className={'mt-5 input'}
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setCredentials((pv) => ({
                    ...pv,
                    password: e.target.value,
                  }))
                }
              />
              <span className={'input-border'}></span>
            </div>
            <button className={'mt-5 boton-elegante'} type="submit">
              {formCTA}
            </button>
          </form>
          {formCTA === 'Login' ? (
            <span
              className={
                'p-5 hover:cursor-pointer text-slate-300 hover:text-slate-200'
              }
              onClick={() => setShowPasswordReset(!showPasswordReset)}
            >
              Forgot your password?
            </span>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};
