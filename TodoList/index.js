const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

// 1. Beim Start: Daten aus dem LocalStorage laden
const savedTodos = JSON.parse(localStorage.getItem('todos'));

if (savedTodos) {
    savedTodos.forEach(todo => addTodo(todo));
}

// 2. Event Listener für das Abschicken des Formulars
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Verhindert das Neuladen der Seite
    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;

    // Wenn ein gespeichertes Objekt übergeben wurde, nutzen wir dessen Text
    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement('li');

        // Falls das geladene Todo bereits "completed" war
        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }

        todoEl.innerText = todoText;

        // Links-Klick: Erledigt umschalten
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS(); // Speichern nach Änderung
        });

        // Rechts-Klick: Löschen
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault(); // Standard-Menü blockieren
            todoEl.remove();
            updateLS(); // Speichern nach Änderung
        });

        // Element zur Liste hinzufügen
        todosUL.appendChild(todoEl);

        // Input-Feld leeren
        input.value = '';

        // LocalStorage aktualisieren
        updateLS();
    }
}

// 3. Funktion zum Speichern aller Todos im LocalStorage
function updateLS() {
    const todosEl = document.querySelectorAll('li');
    const todosArray = [];

    todosEl.forEach(todoEl => {
        todosArray.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });

    // Array als JSON-Text speichern
    localStorage.setItem('todos', JSON.stringify(todosArray));
}