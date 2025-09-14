// Example: A vintage-style alert button
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("button");
  btn.textContent = "Click for a surprise!";
  btn.style = "margin:20px auto;display:block;padding:10px 20px;background:#8b5e3c;color:white;border:none;border-radius:6px;cursor:pointer;";
  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    alert("Greetings from the past ✨ Welcome to your vintage project site!");
  });
});
