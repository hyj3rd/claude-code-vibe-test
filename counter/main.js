// 현재 카운트 값
let count = 0;

const countEl = document.getElementById("count");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const resetBtn = document.getElementById("reset");

// 화면에 표시되는 숫자를 현재 count 값으로 갱신하고, 양수/음수/0에 따라 색상 클래스를 적용
function render() {
  countEl.textContent = count;

  countEl.classList.remove("positive", "negative");
  if (count > 0) {
    countEl.classList.add("positive");
  } else if (count < 0) {
    countEl.classList.add("negative");
  }
}

increaseBtn.addEventListener("click", () => {
  count += 1;
  render();
});

decreaseBtn.addEventListener("click", () => {
  count -= 1;
  render();
});

resetBtn.addEventListener("click", () => {
  count = 0;
  render();
});
