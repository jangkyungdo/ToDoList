let TodoApp = {
  todos: [],

  start() {
    let inputElement = document.querySelector("input[name=todo]");
    // inputElement.addEventListener('click,keypress', 똑같은함수만들기)   
    inputElement.addEventListener("keypress", this.onCreateTodo.bind(this));
    // this. TodoApp을 가르킨다.
    // bind(this)로 원본객체(TodoApp)에 연결하여 원본객체의 손실 막는다.
    // bind(this) 함수를 사용하지않으면 원본객체(ToDoApp)가 손실된다.
    // 한마디로 ToDoApp객체에 있는 onCreateTodo메소드(와 안에 요소까지)를 찾지못한다.
  },

  updateStatusBar() {
    let todoLists = document.querySelectorAll(".todo__list > li");
    let allTodoCount = document.getElementById("all-todo-count");
    
    allTodoCount.textContent = todoLists.length;
  },

  on

  onCreateTodo(event) {
    console.log(event.which);
    // 각 키보드에 해당하는 고유번호를 알수있다.
    if (event.which === 13 || event.keyCode === 13) {
      // 13번은 Enter, 모든 브라우저에서 사용할려면 which, keycode둘다 사용
      let todoList = document.querySelector(".todo__list");
      let todoContainer = document.createElement("li");
      let todoItem = document.createElement("div");
      let todoStatus = document.createElement("input");
      let todoLabel = document.createElement("label");
      let deleteBtn = document.createElement("button");

      todoContainer.classList.add("todo__item");

      todoContainer.appendChild(todoItem);

      todoItem.appendChild(todoStatus);
      todoItem.appendChild(todoLabel);
      todoItem.appendChild(deleteBtn);

      todoItem.classList.add("checkbox");

      todoStatus.setAttribute("id", "checkbox");
      todoStatus.setAttribute("type", "checkbox");

      todoLabel.setAttribute("for", "checkbox");
      todoLabel.textContent = event.target.value;
      // innerHTML보다 성능이 좋고 차이점있음, mdn
      deleteBtn.classList.add("delete-btn");
      deleteBtn.textContent = "X";

      todoList.appendChild(todoContainer);

      deleteBtn.addEventListener("click", this.onDeleteTodo.bind(this));

      this.updateStatusBar();
      // li가 추가 될때마다 update되도록 함수 호출
    }
  },

  onDeleteTodo(event) {
    event.target.parentElement.parentElement.remove();
    //   bind()없을 경우 deleteBtn을 클릭해도 원본객체를 모르기때문에
    //   parentElement에는 onCreateTodo로 만든 요소가 들어있지않고 다른값이 들어있게 된다.
    this.updateStatusBar();
    // li가 삭제 될때마다 update되도록 함수 호출
  },
};

document.addEventListener("DOMContentLoaded", TodoApp.start());
