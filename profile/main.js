const avatar = document.getElementById("avatar");

avatar.addEventListener("click", () => {
  avatar.classList.remove("bounce");
  void avatar.offsetWidth;
  avatar.classList.add("bounce");
});
