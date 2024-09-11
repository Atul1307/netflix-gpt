export const checkValidData = (userName, email, password) => {
  const isEmailValid = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isUserNameValid = /^[a-zA-Z0-9]+$/.test(userName);

  if (userName !== null && !isUserNameValid)
    return 'Please enter a valid user name';
  if (!isEmailValid) return 'Please enter valid Email ID';
  if (!isPasswordValid) return 'Please enter valid Password';

  return null;
};
