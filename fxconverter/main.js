// 화면 요소 참조
const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from-currency");
const toSelect = document.getElementById("to-currency");
const convertBtn = document.getElementById("convert-btn");
const swapBtn = document.getElementById("swap-btn");
const resultEl = document.getElementById("result");

// exchangerate-api를 호출해 금액을 변환
async function convert() {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  // 입력값 검증
  if (isNaN(amount) || amount < 0) {
    resultEl.textContent = "금액을 올바르게 입력해주세요.";
    return;
  }

  convertBtn.disabled = true;
  resultEl.textContent = "변환 중...";

  try {
    // From 통화를 기준으로 최신 환율 조회
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    if (!response.ok) {
      throw new Error("환율 정보를 가져오지 못했습니다.");
    }

    const data = await response.json();
    const rate = data.rates[to];

    if (!rate) {
      throw new Error("지원하지 않는 통화입니다.");
    }

    // 환율을 곱해 변환 금액 계산 후 표시
    const converted = amount * rate;
    resultEl.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
  } catch (error) {
    resultEl.textContent = error.message || "오류가 발생했습니다.";
  } finally {
    convertBtn.disabled = false;
  }
}

// 변환 버튼 클릭 시 변환 실행
convertBtn.addEventListener("click", convert);

// From/To 통화를 서로 바꾸고, 금액이 입력되어 있으면 바로 변환
swapBtn.addEventListener("click", () => {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;

  if (amountInput.value !== "") {
    convert();
  }
});
