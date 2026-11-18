const button = document.getElementById("hello-btn");
const message = document.getElementById("greeting-message");

button.addEventListener("click", function() {
  if (message .textContent === "") {
    message.textContent = "Thanks for visiting my page!";
  } else {
    message.textContent = "";
  }
});
