// Curs 3 - Tema: generator de tabel
// Citește numărul de linii și coloane dintr-un formular și generează un
// tabel HTML cu dimensiunile cerute la apăsarea butonului Submit.

const form = document.getElementById("table-form");
const rowsInput = document.getElementById("rows");
const colsInput = document.getElementById("cols");
const output = document.getElementById("table-output");
const status = document.getElementById("status");
const resetBtn = document.getElementById("reset-btn");

const MAX_ROWS = 50;
const MAX_COLS = 20;

function showError(message) {
    status.textContent = message;
    status.classList.add("error");
}

function showInfo(message) {
    status.textContent = message;
    status.classList.remove("error");
}

function clearOutput() {
    output.innerHTML = "";
    status.textContent = "";
    status.classList.remove("error");
}

function buildTable(rows, cols) {
    const table = document.createElement("table");
    table.className = "generated";

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    for (let c = 1; c <= cols; c++) {
        const th = document.createElement("th");
        th.textContent = "Col " + c;
        headRow.appendChild(th);
    }
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    for (let r = 1; r <= rows; r++) {
        const tr = document.createElement("tr");
        for (let c = 1; c <= cols; c++) {
            const td = document.createElement("td");
            td.textContent = `R${r}-C${c}`;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    return table;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const rows = parseInt(rowsInput.value, 10);
    const cols = parseInt(colsInput.value, 10);

    if (!Number.isInteger(rows) || rows < 1 || rows > MAX_ROWS) {
        showError(`Numărul de linii trebuie să fie un întreg între 1 și ${MAX_ROWS}.`);
        output.innerHTML = "";
        return;
    }
    if (!Number.isInteger(cols) || cols < 1 || cols > MAX_COLS) {
        showError(`Numărul de coloane trebuie să fie un întreg între 1 și ${MAX_COLS}.`);
        output.innerHTML = "";
        return;
    }

    output.innerHTML = "";
    output.appendChild(buildTable(rows, cols));
    showInfo(`Tabel generat: ${rows} linii × ${cols} coloane (${rows * cols} celule).`);
});

resetBtn.addEventListener("click", clearOutput);
