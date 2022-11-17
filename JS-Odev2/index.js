let todoListItems = ["3 Litre Su İç", "Ödevleri Yap", "EN az 3 Saat Kodlama Yap", "Yemek Yap", "50 Sayfa Kitap Oku"]

const todoListDom = document.querySelector("#toDoList");
const addButton = document.querySelector("#addButton");
let inputValue = document.querySelector("#inputValue");


function showItems() {
  localStorage.setItem('todoListItems', JSON.stringify(todoListItems));
  todoListItems.forEach(todo => newElement(todo))
}
window.onload = showItems;

// if (toastTrigger) {
//   toastTrigger.addEventListener('click', () => {
//     const toast = new bootstrap.Toast(toastLiveExample)
//     toast.show()
//   })
// }



function createElement(param) {
  const li = document.createElement("li");
  li.classList.add("list-group-item");
  const todonode = document.createTextNode(param);
  li.append(todonode);

  const deleteNode = document.createElement("button")
  deleteNode.classList.add("btn-close", "float-end")
  li.append(deleteNode)

  deleteNode.addEventListener("click", () => {
    const elemIndex = todoListItems.findIndex(_param => _param == param)
    todoListItems.splice(elemIndex, 1)
    localStorage.setItem("todoListItems", JSON.stringify(todoListItems))
    li.remove()
  })
  li.addEventListener("click", function () {
    if (li.classList.contains("bg-info")) {
      li.classList.remove("bg-info", "line")
    } else {
      li.classList.add("bg-info", "line")
    }
  })

  return li
}

const toastLiveFail = document.querySelector('#liveToastFail')
const toastLiveSuccess = document.querySelector('#liveToastSuccess')


function newElement(newItem = "") {

  if (newItem != "") {
    console.log(inputValue.value);
    inputValue.value = newItem
  }

  //  // Default bir liste gönderilmeyecekse
  // if (localStorage.getItem("todoListItems") == null) {
  //   localStorage.setItem("todoListItems", '[]');
  // }
  const regex = /^\s*$/

  if (inputValue.value == "" || regex.test(inputValue.value)) {
    const toast = new bootstrap.Toast(toastLiveFail)
    inputValue.value = ""
    return toast.show()
  }
  inputValue.value = inputValue.value.replace(/\s+/g, " ")

  let oldList = JSON.parse(localStorage.getItem('todoListItems'))
  console.log(oldList);

  todoListDom.append(createElement(inputValue.value))
  if (newItem == "") {
    const toast = new bootstrap.Toast(toastLiveSuccess)
    toast.show()
    oldList.push(inputValue.value)
  }

  localStorage.setItem('todoListItems', JSON.stringify(oldList));
  inputValue.value = ""

}
// Burada addEventListener ile newElement fonksiyonunu çalıştıramuyoruz. O durumda fonksiyon parametre bekliyor ve boş parametre gönderildiği için yanlış çalışıyor