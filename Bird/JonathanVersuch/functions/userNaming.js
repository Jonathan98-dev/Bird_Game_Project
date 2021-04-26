export const userNaming = () => {
  let user = window.prompt("Enter your name: ");
  if (user === "") {
    user = "User";
  }
  return user;
};
