// Initialization
const blur = document.getElementById("blur");
const popup = document.getElementById("popup");
const addBtn = document.querySelector(".add");
const noteTitle = document.querySelector(".title");
const note = document.querySelector(".note");
const notesBody = document.querySelector(".notes");
const noteMsg = document.querySelector(".msg");
const errorMessage = document.querySelector(".error");
const searchText = document.querySelector("#search-text");

showNotes();
// Functions
toggle = (e) => {
  blur.classList.add("active");
  popup.classList.add("active");
};

addBtn.addEventListener("click", () => {
  if (noteTitle.value !== "" && note.value !== "") {
    // Getting notes from localStorage
    let notes = localStorage.getItem("notes");

    // Object of each note
    const data = {
      title: noteTitle.value,
      desc: note.value,
    };

    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }

    notesObj.push(data);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    noteTitle.value = "";
    note.value = "";
    errorMessage.innerHTML = "";
    showNotes();

    blur.classList.remove("active");
    popup.classList.remove("active");
  } else {
    errorMessage.innerHTML = "Please fill all the required fields !! ";
  }
});

function showNotes() {
  noteMsg.innerHTML = "";

  // Getting notes from localStorage
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  // Note Template
  let html = "";
  notesObj.forEach((element, index) => {
    html += `
              <div class="note-card" >
                <div class="note-title"><h3>${element.title}</h3></div>
                <div class="note-desc"><p>${element.desc}</p></div>
                <button onclick="deleteNote(${index})" class="remove-btn">Delete</button>
              </div>
           `;
  });
  if (notesObj.length != 0) {
    notesBody.innerHTML = html;
  } else {
    noteMsg.innerHTML = ` There is Nothing to Show, Please Use "Add Notes" Button to add notes`;
  }
}

// Function to delete a Note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
  location.reload();
}

// search event listener
searchText.addEventListener("input", () => {
  let inputVal = searchText.value;
  // console.log(inputVal);
  let noteCards = document.querySelector(".notes");
  Array.from(noteCards.children).forEach((element) => {
    let cardTitle = element.querySelector(".note-title").firstChild.textContent;
    let cardText = element.querySelector(".note-desc").firstChild.textContent;
    // checking wheather input is in the card or not
    if (cardTitle.includes(inputVal) || cardText.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }

    // console.log(Array.from(noteCards.children));
    // console.log(cardTitle, cardText);
  });
});
