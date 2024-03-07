// elementos del DOM
const form = document.getElementById("formRegister");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const tableBody = document.getElementById("tableBody");

let data = JSON.parse(localStorage.getItem("formData")) || [];

form.addEventListener("submit", (event) => {
	event.preventDefault("");

	const name = nameInput.value;
	const email = emailInput.value;

	if (name && email) {
		// creamos un objeto con el nombre y el correo
		const newData = { name, email };
		// push() => es una funcion para agregar un nuevo elemento al final de un array y devuelve la nueva longitud del array
		data.push(newData);

		saveDataToLocalStorage();
		renderTable();
		form.reset();
	} else {
		alert("Los campos son obligatorios");
	}
});

function saveDataToLocalStorage() {
	// setItem() => es la manera de guardar un elemento dentro de el LocalStorage
	localStorage.setItem("formData", JSON.stringify(data));
	// Este recibe 2 parametros
	// 1. El nombre
	// 2. El valor
}

function renderTable() {
	tableBody.innerHTML = "";

	data.forEach((item, index) => {
		const row = document.createElement("tr");
		const nameCell = document.createElement("td");
		const emailCell = document.createElement("td");
		const actionCell = document.createElement("td");
		const editButton = document.createElement("button");
		const deleteButton = document.createElement("button");

		console.log(index);
		nameCell.textContent = item.name;
		emailCell.textContent = item.email;
		editButton.textContent = "Edit";
		deleteButton.textContent = "Delete";

		editButton.classList.add("button", "button--secondary");
		deleteButton.classList.add("button", "button--tertiary");

		editButton.addEventListener("click", () => {
			editData(index);
		});
		deleteButton.addEventListener("click", () => {
			deleteData(index);
		});

		actionCell.appendChild(editButton);
		actionCell.appendChild(deleteButton);

		row.appendChild(nameCell);
		row.appendChild(emailCell);
		row.appendChild(actionCell);

		tableBody.appendChild(row);
	});
}

function editData(index) {
	const item = data[index];
	nameInput.value = item.name;
	emailInput.value = item.email;
	data.splice(index, 1);

	saveDataToLocalStorage();
	renderTable();
}

function deleteData(index) {
	data.splice(index, 1);
	saveDataToLocalStorage();
	renderTable();
}

renderTable();
