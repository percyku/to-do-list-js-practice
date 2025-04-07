//
let data = [
  //   { item: "item1", checked: "", idx: 0 },
  //   { item: "item2", checked: "checked", idx: 1 },
  //   { item: "item3", checked: "", idx: 2 },
  //   { item: "item4", checked: "", idx: 3 },
];
let page = 0;
const inputTxt = document.querySelector(".input_txt");
const inputBtn = document.querySelector(".btn_add");
const tab = document.querySelector(".tab");
const list = document.querySelector(".list");
const deleteAll = document.querySelector(".deleteAll");
const itemCount = document.querySelector(".itemCount");

let inputFlag = true;
inputTxt.addEventListener("keydown", (e) => {
  if (inputFlag && e.key === "Enter") {
    e.preventDefault();
    if (inputTxt.value.trim() === "") {
      alert("Please input your items");
      return;
    }

    additem(inputTxt.value);
    renderHtml();
  }
});

inputTxt.addEventListener("compositionstart", (e) => {
  //   console.log("compositionstart");
  inputFlag = false;
});

inputTxt.addEventListener("compositionend", (e) => {
  //   console.log("compositionend");
  inputFlag = true;
});

inputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputTxt.value.trim() === "") {
    alert("Please input your items");
    return;
  }
  additem(inputTxt.value);
  renderHtml();
});

function additem(item) {
  let obj = {
    item: item,
    checked: "",
    idx: new Date().getTime(),
  };

  data.push(obj);
  inputTxt.value = "";
}

tab.addEventListener("click", (e) => {
  if (e.target.nodeName === "LI") {
    e.target.setAttribute("class", "active");
    if (e.target.innerText === "全部") {
      page = 0;
      e.target.nextElementSibling.setAttribute("class", "");
      e.target.nextElementSibling.nextElementSibling.setAttribute("class", "");
    } else if (e.target.innerText === "待完成") {
      page = 1;
      e.target.previousElementSibling.setAttribute("class", "");
      e.target.nextElementSibling.setAttribute("class", "");
    } else if (e.target.innerText === "已完成") {
      page = 2;
      e.target.previousElementSibling.setAttribute("class", "");
      e.target.previousElementSibling.previousElementSibling.setAttribute(
        "class",
        ""
      );
    }
    renderHtml();
  }
});

list.addEventListener("click", (e) => {
  if (e.target.nodeName === "A") {
    data = data.filter(
      (item) => item.idx !== parseInt(e.target.getAttribute("data_idx"))
    );
  } else if (e.target.nodeName === "INPUT") {
    console.log(e.target.checked);
    let idx = data.findIndex(
      (item) => item.idx === parseInt(e.target.getAttribute("data_idx"))
    );
    data[idx].checked = e.target.checked ? "checked" : "";
  }

  renderHtml();
});

deleteAll.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.nodeName === "A") {
    data = data.filter((item) => item.checked !== "checked");
  }
  renderHtml();
});

function renderHtml() {
  let str = "";
  let count = 0;
  let tmpData = [];
  if (page === 0) {
    tmpData = data;
  } else if (page === 1) {
    tmpData = data.filter((item) => item.checked === "");
  } else if (page === 2) {
    tmpData = data.filter((item) => item.checked !== "");
  }

  tmpData.forEach((item, idx) => {
    if (item.checked === "") {
      count++;
    }
    str += ` <li>
                      <label class="checkbox" for="">
                        <input type="checkbox" data_idx="${item.idx}" ${item.checked}/>
                        <span>${item.item}</span>
                      </label>
                      <a href="#" class="delete" data_idx="${item.idx}"></a>
                    </li>`;
  });

  itemCount.innerHTML = ` ${count} 個待完成項目`;
  list.innerHTML = str;
}

renderHtml();
