// Initialization

const blur = document.getElementById("blur");
const popup = document.getElementById("popup");
const addBtn = document.querySelector(".add");
const noteTitle = document.querySelector(".title");
const note = document.querySelector(".note");
const errorMessage = document.querySelector(".error");

// Functions
toggle = () => {
  blur.classList.add("active");
  popup.classList.add("active");

  addBtn.addEventListener("click", () => {
    if (noteTitle.value !== "" && note.value !== "") {
      let addTitle = noteTitle.value;
      let addNote = note.value;

      // notesElement item in localStorage
      let notes = localStorage.getItem("note");
      if (notes === null) {
        notesObj = [];
      } else {
        notesObj = JSON.parse(notes);
      }

      notesObj.push(addNote);
      localStorage.setItem(addTitle, JSON.stringify(notesObj));
      noteTitle.value = "";
      note.value = "";
      console.log(notesObj);
      showNotes();
      blur.classList.remove("active");
      popup.classList.remove("active");
    } else {
      errorMessage.innerHTML = "Please fill all the required fields !! ";
    }
  });
};

showNotes = () => {
  let notes = localStorage.getItem("note");
  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  console.log(notes);
};
