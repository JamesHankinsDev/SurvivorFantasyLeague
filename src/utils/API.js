export const getAPIURI = () => {
  const currentUri = window.location.href;

  console.log(
    !currentUri.includes('localhost')
      ? `http://localhost:5000`
      : `https://survivorfantasyserver.onrender.com`
  );

  return !currentUri.includes('localhost')
    ? `http://localhost:5000`
    : `https://survivorfantasyserver.onrender.com`;
};
