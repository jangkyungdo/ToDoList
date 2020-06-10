const addList = document.querySelector("#add-btn");
const delAllEle = document.querySelector("#allDel-btn");
const delLastEle = document.querySelector("#lastdel-btn");
const delSelected = document.querySelector("#delete-btn");
const contents = document.querySelector(".todo-write");
const todoWrap = document.querySelector("#list-body");

// 추가1
addList.addEventListener("click", () => {
  addElement();
  updateComplate();
});

// 추가2
contents.addEventListener("keypress", () => {
  if (event.which === 13 || event.keyCode === 13) {
    addElement();
    updateComplate();
  }
});

// 전체 삭제
delAllEle.addEventListener("click", () => {
  while (todoWrap.firstChild) {
    //     //  list에 첫번째 자식이 있을경우 반복 동작
    todoWrap.removeChild(todoWrap.firstChild);
    //     // list에 첫번째 자식을 삭제
  }

  // if (todoWrap.children.length === 0) {
  //   console.log(todoWrap.children);
  //   alert("삭제할 항목이 없습니다.");
  // }

  updateComplate();
});

// 마지막 항목 삭제
delLastEle.addEventListener("click", () => {
  const toDoList = document.querySelectorAll("#list-body > tr");
  if (toDoList.length > 0) {
    let lastToDo = toDoList.length - 1;
    todoWrap.removeChild(toDoList[lastToDo]);
  } else {
    // alert("삭제할 항목이 없습니다.");
    return;
  }
  updateComplate();
});

// 선택 삭제
delSelected.addEventListener("click", () => {
  const checkBox = document.querySelectorAll(".check-box");
  checkBox.forEach((check) => {
    if (check.checked) {
      todoWrap.removeChild(check.parentNode.parentNode);
      //  parentNode, 즉 todoWrap(tbody) 밑에 있는 자식 tr을 삭제
    }
  });

  if (!todoWrap.firstChild) {
    // alert("삭제할 항목이 없습니다.");
  }
  updateComplate();
});

// todo update상태
todoWrap.addEventListener("click", updateComplate);

// todo update 함수
function updateComplate() {
  const completeCount = document.querySelector("#complete-todo-count");
  const inCompleteCount = document.querySelector("#incomplete-todo-count");
  const toDoList = document.querySelectorAll("#list-body > tr");
  const allCount = document.querySelector("#all-todo-count");
  const target = event.target.dataset.value;

  allCount.innerHTML = toDoList.length;
  inCompleteCount.innerHTML = toDoList.length;

  if (target == null) {
    return;
  }
  if (target === "check") {
    event.target.classList.toggle("check");
    const checkCount = document.querySelectorAll(".check");
    completeCount.innerHTML = checkCount.length;
    inCompleteCount.innerHTML = toDoList.length - checkCount.length;
  }
}
// createElement 함수
function addElement() {
  if (!contents.value) {
    alert("항목을 입력해주세요.");
    return;
  }

  let tr = document.createElement("tr");
  tr.innerHTML = `
  <td><input type='checkbox' class='check-box' data-value="check"></td>
  <td>${contents.value}</td>`;

  todoWrap.appendChild(tr);

  contents.value = "";
  // 입력하는 todo값 초기화
}

// 시계 함수
const date = document.querySelector(".date");

setInterval(() => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  date.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}, 1000);
