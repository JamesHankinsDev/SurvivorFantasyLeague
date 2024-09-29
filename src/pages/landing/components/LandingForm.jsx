export const LandingForm = ({
  formTitle,
  formBody,
  formCTA,
  handleFormSubmit,
  setCredentials,
}) => (
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
);
