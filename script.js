var ekleButonu = document.getElementById("ekle");
var temizleButonu = document.getElementById("temizle");
var inputText1 = document.getElementById("text1");
var textarea1 = document.getElementById("textarea");
var inputText2 = document.getElementById("text2");
var yapılacak = document.getElementById("yapılacaklar");



//////////////////////////////////notları oluşturmak için fonksiyon başlangıç///////////////////////////////////////////////////////////
let notesCount = 0; //her nota eşşiz bir id vermek için kullanılır. 

ekleButonu.addEventListener("click", function () {

    notesCount++;

  if (inputText1.value == "") {
    alert("başlık giriniz");
  } else {
    var paragrafdiv = document.createElement("div");
    var titles = document.createElement("div");
    var descriptions = document.createElement("div");
    var tarih = document.createElement("div");
    tarih.classList.add("tarih");
    paragrafdiv.classList.add("card");
    titles.classList.add("title");
    descriptions.classList.add("description");
    paragrafdiv.appendChild(tarih);
    paragrafdiv.appendChild(titles);
    paragrafdiv.appendChild(descriptions);

    paragrafdiv.id = 'note' + notesCount;
    

  // Not için seçenek butonu oluştur
  var optionButton = document.createElement('button');
  optionButton.className = 'option-button';
  optionButton.textContent = '. . .';
  optionButton.onmousedown = noteMenu;
  paragrafdiv.appendChild(optionButton);
  // not için seçenek butonu bitiş

    
  yapılacak.appendChild(paragrafdiv);

    paragrafdiv.setAttribute("draggable", "true");

    tarih.innerHTML = inputText2.value;
    titles.innerHTML =
      '<b>' +
      inputText1.value +
      '</b>' ;
    descriptions.innerHTML = textarea1.value;
  
    inputText1.value = "";
    inputText2.value = "";
    textarea1.value = "";
    inputText1.focus();


    temizleButonu.addEventListener("click", function () {
    paragrafdiv.remove();
    });
  }





  let cards = document.querySelectorAll('.card');
  let lists = document.querySelectorAll('.list');
  let divsil = document.getElementById("divsil");


 cards.forEach((card)=>{
    registerEventsOnCard(card);
 });

   lists.forEach((list)=>{
    list.addEventListener('dragover', (e)=>{
        e.preventDefault();
        var draggingCard = document.querySelector('.dragging');
        var cardAfterDraggingCard = getCardAfterDraggingCard(list, e.clientY);
        if(cardAfterDraggingCard){
            
                cardAfterDraggingCard.parentNode.insertBefore(draggingCard, cardAfterDraggingCard);
                
        } else{
            list.appendChild(draggingCard);
            
        }
        
    });
   });

  function getCardAfterDraggingCard(list, yDraggingCard){

    var listCards = [...list.querySelectorAll('.card:not(.dragging)')];

    return listCards.reduce((closestCard, nextCard)=>{
        var nextCardRect = nextCard.getBoundingClientRect();
        var offset = yDraggingCard - nextCardRect.top - nextCardRect.height /2;

        if(offset < 0 && offset > closestCard.offset){
            return {offset, element: nextCard}
        } else{
            return closestCard;
        }
    
    }, {offset: Number.NEGATIVE_INFINITY}).element;

   }

  function registerEventsOnCard(card){
    card.addEventListener('dragstart', (e)=>{
        card.classList.add('dragging');
        // divsil.style.display = "block";
    });


    card.addEventListener('dragend', (e)=>{
        card.classList.remove('dragging');
        // divsil.style.display = "none";
    });
   }


});
//////////////////////////////////notları oluşturmak için fonksiyon bitiş///////////////////////////////////////////////////////////









/////////////////////////////////////////enter için eventlistener kısmı başlangıç/////////////////////////////////////////////////////////
inputText2.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("ekle").click();
    }
  });

  inputText1.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("ekle").click();
    }
  });

  textarea1.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("ekle").click();
    }
  });
//////////////////////////////////////////enter için eventlistener kısmı bitiş////////////////////////////////////////////////////////////




//////////////////////////////////çöp kutusu başlangıç///////////////////////////////////
// let cöpKutusu = document.getElementById("cöp");
// let divSil = document.getElementById("divsil");

function myFunction() {
    var x = document.getElementById("divsil");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
//////////////////////////////////çöp kutusu bitiş///////////////////////////////////////





///////////////////////////// option kısmı başlangıç////////////////////////////////////////////////////////////////////////////////////////


//mause option menüsü dışında bir yeri tıkladığında option menüsünü kapatmak için yazılan fonksiyonun adı
document.onmousedown = clearMenus;


//noteMenu creates the note options menu.
function noteMenu() {

    let noteMenu = document.createElement('div'); 
    noteMenu.className = "note-menu";
    // console.log('option button pressed');

    let menus = document.getElementsByClassName('note-menu'); // Get all menus
    let thisNoteHasMenu = (this.parentNode.getElementsByClassName('note-menu').length != 0); //Whether this particular note has an active menu

    for (let i = 0; i < menus.length; i++) {
        menus[i].remove();
    }

   
    
    let colors = [ // Nine different note colors
        'lightgoldenrodyellow',
        'lightpink',
        'lightgreen',
        'transparent',
        'lightcoral',
        'lightskyblue',
        'lightsalmon',
        'plum',
        'lightseagreen'
        
    ];

    // Create nine different color buttons
    colors.forEach(color => {
        let colorOption = document.createElement('button');
        colorOption.className = "color-option";
        colorOption.style.backgroundColor = color;
        colorOption.onmousedown = setColor;
        colorOption.ontouchstart = setColor;
        noteMenu.appendChild(colorOption);
    });

    // Create a delete button
    let deleteButton = document.createElement('div');
    deleteButton.className = 'delete-note';
    deleteButton.onmousedown = (() => {setTimeout(deleteNote.bind(deleteButton), 155);}); //Add a delay to let user see button press
    let deleteText = document.createElement('p');
    deleteText.textContent = 'Delete';
    deleteText.className = 'delete-text';
    deleteButton.appendChild(deleteText);
    let deleteIcon = document.createElement('img');
    deleteIcon.src = 'images/delete-24px-red.svg';
    deleteIcon.className = 'delete-icon';
    deleteButton.appendChild(deleteIcon);
    noteMenu.appendChild(deleteButton);

    this.parentNode.appendChild(noteMenu); // Add the menu to the note
}




//setColor sets the color of a note to the color of the button pressed.
function setColor() {
    // console.log('color button pressed');

    let note = this.parentNode.parentNode;
    let newColor = this.style.backgroundColor;
    
    note.style.backgroundColor = newColor;

}






// açılan menü dışında nereye dokunursan menüyü temizleyen fonksiyon
function clearMenus(event) {
    // console.log('Clear menus');
    // console.log('ClientX: ' + event.clientX);
    // console.log('ClientY: ' + event.clientY);

    let noteMenus = document.getElementsByClassName('note-menu'); // Get all menus
    
    for (let i = 0; i < noteMenus.length; i++){ // Loop through the menus
        let rect = noteMenus[i].getBoundingClientRect(); // Get the bounding rectangle to know the position
        
        // If the mouse is not above the menu, then remove it
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
            
            noteMenus[i].remove();
        }
    }
}





//deleteNote deletes a note whose delete button was pressed
function deleteNote() {
    let thisNote = this.parentNode.parentNode;

    let notes = document.getElementsByClassName('note');
    let oldRects = new Map(); // Initialize an array for the old note positions
    
    // Collect all the current note positions
    for (let i = 0; i < notes.length; i++) {
        let rect = notes[i].getBoundingClientRect();
        oldRects.set(notes[i].id, rect);
    }

    thisNote.remove();

}
/////////////////////////////////////////////option kısmı bitiş///////////////////////////////////////////////////////////////////////////////