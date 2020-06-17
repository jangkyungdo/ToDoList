const addList = document.querySelector("#todolist__add--button");
const allDelete = document.querySelector("#allDel-btn");
const selectDelete = document.querySelector("#delete-btn");
const contents = document.querySelector(".write__todo");
const todoListWrap = document.querySelector("#todolist__contents");
// const delLatEle = document.querySelector("#lastdel-btn");

let todos = [];
const LOCALSTORAGE_TODOS = "todos";

document.addEventListener("DOMContentLoaded", () => {
  readLocalStorage();

  // 추가 btn
  addList.addEventListener("click", () => {
    if (!contents.value) {
      alert("항목을 입력해주세요.");
      return;
    }
    addElement(contents.value);
  });

  // 추가 Enter keypress
  contents.addEventListener("keypress", () => {
    if (event.which === 13 || event.keyCode === 13) {
      if (!contents.value) {
        alert("항목을 입력해주세요.");
        return;
      }
      addElement(contents.value);
    }
  });

  // 전체 삭제 btn
  allDelete.addEventListener("click", () => {
    while (todoListWrap.firstChild) {
      //     //  list에 첫번째 자식이 있을경우 반복 동작
      todoListWrap.removeChild(todoListWrap.firstChild);
      //     // list에 첫번째 자식을 삭제
    }
    localStorage.removeItem(LOCALSTORAGE_TODOS);

    // if (todoListWrap.children.length === 0) {
    //   alert("삭제할 항목이 없습니다.");
    // }

    updateComplate();
  });

  // 마지막 항목 삭제
  // delLastEle.addEventListener("click", () => {
  //   const toDoList = document.querySelectorAll("#list-body > tr");
  //   if (toDoList.length > 0) {
  //     let lastToDo = toDoList.length - 1;
  //     todoListWrap.removeChild(toDoList[lastToDo]);
  //   } else {
  //     // alert("삭제할 항목이 없습니다.");
  //     return;
  //   }
  //   updateComplate();
  // });

  // 선택 삭제 btn
  selectDelete.addEventListener("click", () => {
    const checkBox = document.querySelectorAll(".check-box");
    [...checkBox].forEach((check) => {
      if (check.checked) {
        todoListWrap.removeChild(check.parentNode.parentNode);
        //  parentNode, 즉 tr을 삭제
        let cleanToDos = todos.filter(function (todo) {
          return todo.id !== parseInt(check.parentNode.parentNode.id);
          //
        });
        todos = cleanToDos;
        saveLocalStorage();
      }
    });
    updateComplate();
  });

  // todo update 함수
  function updateComplate() {
    const completeCount = document.querySelector("#complete-todo-count");
    const inCompleteCount = document.querySelector("#incomplete-todo-count");
    const allCount = document.querySelector("#all-todo-count");

    const toDoList = document.querySelectorAll("#todolist__contents > tr");
    const checkCount = document.querySelectorAll(".check");

    allCount.innerHTML = toDoList.length;
    completeCount.innerHTML = checkCount.length;
    inCompleteCount.innerHTML = toDoList.length - checkCount.length;
  }

  // createElement 함수
  function addElement(text) {
    const tr = document.createElement("tr");
    const newId = todos.length + 1;

    tr.id = newId;

    todoListWrap.appendChild(tr);
    tr.innerHTML = `
  <td><input type='checkbox' class='check-box' data-value="check"></td>
  <td>${text}</td>
  <td><button type="button" class="delete">X</button></td>`;

    const checkBox = document.querySelectorAll(".check-box");
    [...checkBox].forEach((item) => {
      item.addEventListener("click", toggle);
    });

    const todoDelete = document.querySelectorAll(".delete");
    [...todoDelete].forEach((item) => {
      item.addEventListener("click", deleteElement);
    });

    const todoObject = {
      text: text,
      id: newId,
    };
    todos.push(todoObject);
    saveLocalStorage();
    updateComplate();

    contents.value = "";
    // 입력하는 todo값 초기화
  }

  // delete button 함수
  function deleteElement() {
    const deleteBtn = this.parentNode.parentNode;
    todoListWrap.removeChild(deleteBtn);
    let cleanToDos = todos.filter(function (todo) {
      return todo.id !== parseInt(deleteBtn.id);
      //
    });
    todos = cleanToDos;
    saveLocalStorage();
    updateComplate();
  }

  // check class toggle 함수
  function toggle() {
    this.classList.toggle("check");
    updateComplate();
  }

  // 로컬저장소에 todos 저장 함수
  function saveLocalStorage() {
    localStorage.setItem(LOCALSTORAGE_TODOS, JSON.stringify(todos));
  }

  // 로컬저장소에 todos 읽어들이는 함수
  function readLocalStorage() {
    const readToDos = localStorage.getItem(LOCALSTORAGE_TODOS);

    if (readToDos !== null) {
      // 로컬저장소에 값이 있다면 읽어서 화면에 출력
      const parsedToDos = JSON.parse(readToDos); // 문자열을 객체로 변환
      [...parsedToDos].forEach((toDo) => {
        //parsedToDos안에 있는 각각을 toDo라고한다.
        addElement(toDo.text); //parsedToDos안에 있는 각각에 대해서 paintToDo라는 함수 호출, text는 todoObject 속성 text이다.
      });
    }
  }

  // 시계 함수

  setInterval(() => {
    const date = document.querySelector(".date");
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    date.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  }, 1000);
});
