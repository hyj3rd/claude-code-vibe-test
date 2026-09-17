// 메모리 상태 (localStorage에 자동 저장/복원됨)
let todos = [];
let nextId = 1;
let currentFilter = "all"; // "all" | "active" | "completed"

const STORAGE_KEY = "todo-app-todos";

// localStorage에서 저장된 할 일 목록을 불러와 상태에 반영
function loadTodos() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    todos = JSON.parse(raw);
  } catch (e) {
    todos = [];
  }

  // 기존 항목과 id가 겹치지 않도록 nextId를 최댓값 + 1로 재계산
  nextId = todos.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}

// 현재 상태를 localStorage에 저장
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 앱 초기화 진입점: 저장된 데이터 복원, DOM 참조와 이벤트 리스너 등록
function initApp() {
  loadTodos();

  const input = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-btn");
  const listEl = document.getElementById("todo-list");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const clearCompletedBtn = document.getElementById("clear-completed-btn");

  addBtn.addEventListener("click", () => addTodo(input));

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTodo(input);
    }
  });

  // 항목마다 리스너를 붙이지 않고 목록 컨테이너에서 위임 처리
  listEl.addEventListener("click", (event) => {
    const target = event.target;
    const id = Number(target.dataset.id);

    if (target.classList.contains("todo-checkbox")) {
      toggleTodo(id);
    } else if (target.classList.contains("todo-delete")) {
      deleteTodo(id);
    }
  });

  // 필터 버튼 클릭 시 현재 필터를 바꾸고 활성 표시를 갱신
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      render();
    });
  });

  clearCompletedBtn.addEventListener("click", clearCompleted);

  render();
}

// 입력값을 검증한 뒤 새 할 일을 목록에 추가
function addTodo(input) {
  const text = input.value.trim();

  if (!text) {
    alert("할 일을 입력하세요");
    return;
  }

  const isDuplicate = todos.some((t) => t.text === text);
  if (isDuplicate) {
    alert("이미 등록된 할 일입니다");
    return;
  }

  todos.push({ id: nextId++, text, completed: false });
  input.value = "";
  render();
}

// 지정한 id의 완료 상태를 반전
function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    render();
  }
}

// 지정한 id의 할 일을 목록에서 제거
function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  render();
}

// 완료된 항목을 모두 목록에서 제거
function clearCompleted() {
  todos = todos.filter((t) => !t.completed);
  render();
}

// 현재 필터에 맞는 항목만 반환
function getFilteredTodos() {
  if (currentFilter === "active") {
    return todos.filter((t) => !t.completed);
  }
  if (currentFilter === "completed") {
    return todos.filter((t) => t.completed);
  }
  return todos;
}

// 현재 todos 상태를 기준으로 목록 DOM을 다시 그리고, 저장 및 개수 표시를 갱신
function render() {
  saveTodos();

  const listEl = document.getElementById("todo-list");
  const countEl = document.getElementById("todo-count");
  listEl.innerHTML = "";

  const completedCount = todos.filter((t) => t.completed).length;
  countEl.textContent = `전체 ${todos.length}개, 완료 ${completedCount}개`;

  getFilteredTodos().forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");

    // 완료 여부 토글용 체크박스
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = todo.completed;
    checkbox.dataset.id = todo.id;

    // 할 일 텍스트
    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    // 항목 삭제 버튼
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "todo-delete";
    deleteBtn.textContent = "✕";
    deleteBtn.dataset.id = todo.id;

    li.append(checkbox, text, deleteBtn);
    listEl.appendChild(li);
  });
}

initApp();
