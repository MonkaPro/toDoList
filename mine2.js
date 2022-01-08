let $todoInput; // wpisuje treść zadania
let $alertInfo; //info o barku zadan / albo koniecznośc dodania
let $addBtn; //przycisk dodaj
let $ulList; //lista zadan
let $newTask; 
let $popup; //pobrany popup
let $popupInfo; //alert w popupie, kiedy doda sie pusty tekst
let $editTodo; // edytowany todo
let $popupInput; // tekst wpisywny w inpuya w popupie
let $addPopupBtn; // przycisk zatwierdz w popupie
let $closeTodoBtn; // przycisk zamykania popupa
let $idNumber = 0;
let $allTasks;

const main = () =>{
    prepareDOMElements();
    prepareDOMEvents();

};
//pobieramy elementy
const prepareDOMElements = ()=> {
    $todoInput = document.querySelector('.todoInput');
     $alertInfo= document.querySelector('.alertInfo');
     $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');

    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $editTodo = document.querySelector('.editTodo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');
    

};



//nadaje nasłuchiwania
const prepareDOMEvents = ()=> {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', eneterCheck);
};
// dodajemy nowy element do listy

const addNewTask =  () =>{
    if($todoInput.value !== ''){
        $idNumber++;
        $newTask = document.createElement('li')
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);
        const createDiv = document.createElement('div')

        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete');
        createDiv.appendChild(completeBtn);
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        
        const completeP = document.createElement('p');
        createDiv.appendChild(completeP);
        createDiv.style.display = 'flex';
        completeP.innerHTML = $todoInput.value;

        $newTask.appendChild(createDiv);
        $todoInput.value ='';
        $alertInfo.innerText ='';
        createTooLsArea();
    }else {
        $alertInfo.innerText = 'Wpisz treść zadania!';

    }
} ;
const eneterCheck = () => { 
  if(event.keyCode === 13){
     addNewTask();
    }
};
//tworzymy przycisk edycji usuwania i gotoe
const createTooLsArea = () =>{
    const toolsPanel= document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerHTML = '<i class="fas fa-pencil-alt">';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML= '<i class="far fa-trash-alt">';
    
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
       
};
// zarzadzania kliknieciami w przyciski
const checkClick = (e) =>{
    if(e.target.closest('button').classList.contains('complete'))
    {
       e.target.closest('li').classList.toggle('completed');
       e.target.closest('button ').classList.toggle('completed');
    } else if (e.target.closest('button').className === 'edit'){
        editTask(e);
    } else if (e.target.closest('button').className === 'delete'){
        deleteTask(e);
    }
        
}   
//edycja zadania   
const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo= document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;
    $popup.style.display = 'flex';
};
//sprawdzamy czy popap jest pusty i zminiemy tresc zadania
const changeTodo = ( ) =>{
    if ($popupInput.value !== ''){
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none'
        $popupInfo.innerText = '';
        
    }else {
        $popupInfo.innerText = 'Musisz podać treść!';
    }
};

// zamykanie popapa
const closePopup = () => {
        $popup.style.display = 'none'
        $popupInfo.innerText = '';
};
//usuwanie zadania
const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();
    $popup.style.display = 'none'
    if($allTasks.lenght === 0){
    $alertInfo.innerText = 'Brak zadań na liscie!';
    

    }; 

}

 document.addEventListener('DOMContentLoaded', main);