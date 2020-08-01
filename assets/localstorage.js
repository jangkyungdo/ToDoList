//필요한 요소를 가져와 변수에 저장한다.
const name = document.querySelector(".write__name");
const greeting = document.querySelector(".greeting");
const formName = document.querySelector(".todolist__write--name");

// 값이 아니라 변수를 사용하기위해
const USER_LOCALSTORAGE = "currentUser";
const SHOWING_CLASSNAME = "showing";

document.addEventListener("DOMContentLoaded", () => {
  readLocalStorage();

  greeting.addEventListener("dblclick", () => {
    localStorage.removeItem(USER_LOCALSTORAGE);
    name.value = "";
    name.classList.add(SHOWING_CLASSNAME);
    greeting.classList.remove(SHOWING_CLASSNAME);
  });

  // 로컬저장소에 유저이름을 저장하는 함수
  function saveName(text) {
    localStorage.setItem(USER_LOCALSTORAGE, text);
  }

  // user name craete함수
  function askName() {
    name.classList.add(SHOWING_CLASSNAME);
    formName.addEventListener("submit", (e) => {
      e.preventDefault();
      const currentValue = name.value;
      craeteGreeting(currentValue);
      saveName(currentValue); // 이름을 저장하기 위한 함수 호출
    });
  }

  //로컬저장소에서 유저를 받아올때 showing class 추가및 삭제
  function craeteGreeting(text) {
    name.classList.remove(SHOWING_CLASSNAME);
    greeting.classList.add(SHOWING_CLASSNAME);
    greeting.innerHTML = `안녕하세요. ${text}님`;
  }

  // 로컬저장소에 유저유무 확인
  function readLocalStorage() {
    const currentUser = localStorage.getItem(USER_LOCALSTORAGE);
    if (currentUser === null) {
      // 로컬저장소에 유저가 없을때
      askName();
    } else {
      // 로컬저장소에 유저가 있을때
      craeteGreeting(currentUser);
    }
  }
});
