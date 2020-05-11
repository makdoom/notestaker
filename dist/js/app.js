// Initialization

const blur = document.getElementById("blur");
const popup = document.getElementById("popup");
const addBtn = document.querySelector(".add");
const noteTitle = document.querySelector(".title");
const note = document.querySelector(".note");
const errorMessage = document.querySelector(".error");
const notesBody = document.querySelector(".notes");
const msg = document.querySelector(".msg");

// Functions
toggle = (e) => {
  blur.classList.add("active");
  popup.classList.add("active");
};
addBtn.addEventListener("click", () => {
  if (noteTitle.value !== "" && note.value !== "") {
    const data = {
      title: noteTitle.value,
      note: note.value,
    };

    // show notes in DOM
    showNotes(data);

    // save notes in localStorage
    localStorage.setItem("Notes", notesBody.innerHTML);

    blur.classList.remove("active");
    popup.classList.remove("active");
  } else {
    errorMessage.innerHTML = "Please fill all the required fields !! ";
  }
});

// checking for notes in localStorage
let saved = localStorage.getItem("Notes");
if (saved) {
  notesBody.innerHTML = saved;
} else {
  msg.innerHTML = ` There's Nothing to Show, Please Use "Add Note" Button to Add Notes !!!`;
}

showNotes = (data) => {
  notesBody.insertAdjacentHTML(
    "beforeend",
    `<div class="note-card" >
            <div class="note-title">${data.title}</div>
            <div class="note-desc">
                ${data.note}
            </div>
            <button id="${Math.floor(
              Math.random() * 1000
            )}" onclick="deleteNote(this)" class="remove-btn">Delete</button>
        </div>`
  );

  noteTitle.value = "";
  note.value = "";
  msg.innerHTML = "";
  errorMessage.innerHTML = "";
};

function deleteNote(data) {
  console.log(typeof JSON.parse(localStorage.getItem("Notes")));
}
