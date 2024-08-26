document.addEventListener("DOMContentLoaded", () => {
  const signInLink = document.getElementById("signIn");
  const loginFormContainer = document.getElementById("loginFormContainer");
  const loggedInOptions = document.getElementById("loggedInOptions");
  const userNameSpan = document.getElementById("userName");
  const userMenu = document.getElementById("userMenu");
  const loginForm = document.getElementById("loginForm");
  const loginStatus = document.getElementById("loginStatus");
  const membershipTitle = document.getElementById("membershipTitle");
  const guestOptions = document.getElementById("guestOptions");

  loginFormContainer.style.display = "none";

  signInLink.addEventListener("click", (event) => {
    event.preventDefault();
    loginFormContainer.style.display =
      loginFormContainer.style.display === "none" ? "block" : "none";
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "kiran" && password === "kiran@123") {
      loginFormContainer.style.display = "none";
      guestOptions.style.display = "none";
      loggedInOptions.style.display = "block";
      userNameSpan.textContent = `Welcome, ${username}!`;
      userMenu.style.display = "block";
      membershipTitle.style.display="none"
      loginStatus.textContent = "Logged in successfully!";
    } else {
      loginStatus.textContent = "Invalid username or password.";
    }
  });

  document.getElementById("logout").addEventListener("click", (event) => {
    event.preventDefault();
    loggedInOptions.style.display = "none";
    guestOptions.style.display = "block";
    loginFormContainer.style.display = "none";
    loginStatus.textContent = "Logged out.";
    membershipTitle.style.display="block"
  });

  document.getElementById("userName").addEventListener("mouseover", () => {
    userMenu.style.display = "block";
  });

  document.getElementById("userMenu").addEventListener("mouseleave", () => {
    userMenu.style.display = "none";
  });

  document.getElementById("userName").addEventListener("click", () => {
    userMenu.style.display =
      userMenu.style.display === "block" ? "none" : "block";
  });
});
