let listState = [];

const STATE_KEY = "movie-list";

function loadState() {
  const storedState = localStorage.getItem(STATE_KEY);
  if (storedState !== null) {
    return JSON.parse(storedState);
  }
  return [];
}

function saveState(list) {
  localStorage.setItem(STATE_KEY, JSON.stringify(list));
}

function initList() {
  listState = loadState();
  const ul = document.getElementById("list");
  for (const item of listState) {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = item.image;
    li.appendChild(img);

    const text = document.createElement("span");
    text.innerText = item.text;
    li.appendChild(text);

    const deleteButton = document.createElement("span");
    deleteButton.classList.add("delete");
    deleteButton.onclick = deleteItem;
    li.appendChild(deleteButton);

    li.classList.add("item");
    ul.appendChild(li);
  }
}

function addItem() {
  const ul = document.getElementById("list");
  const input = document.getElementById("input");
  const imageInput = document.getElementById("image-input");
  const text = input.value;
  const file = imageInput.files[0];

  if (text === "" || !file) {
    alert("Please enter a movie name and select an image");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    const image = reader.result;

    const newItem = document.createElement("li");

    const img = document.createElement("img");
    img.src = image;
    newItem.appendChild(img);

    const textSpan = document.createElement("span");
    textSpan.innerText = text;
    newItem.appendChild(textSpan);

    const deleteButton = document.createElement("span");
    deleteButton.classList.add("delete");
    deleteButton.onclick = deleteItem;
    newItem.appendChild(deleteButton);

    listState.push({
      text,
      image,
    });
    saveState(listState);

    input.value = "";
    imageInput.value = "";
    ul.appendChild(newItem);
  };
  reader.readAsDataURL(file);
}

function deleteItem(e) {
  const item = this.parentNode;
  const parent = item.parentNode;
  const idx = Array.from(parent.childNodes).indexOf(item);
  listState = listState.filter((_, i) => i !== idx);
  parent.removeChild(item);
  saveState(listState);
  e.stopPropagation();
}

document.addEventListener("DOMContentLoaded", (event) => {
  initList();

  const addButton = document.getElementById("add-button");
  addButton.addEventListener("click", addItem);

  const form = document.getElementById("input-wrapper");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
});
