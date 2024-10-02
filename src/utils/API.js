export const getAPIURI = () => {
  const currentUri = window.location.href;

  return currentUri.includes('localhost')
    ? `http://localhost:5000`
    : `https://survivorfantasyserver.onrender.com`;
};
