// Shopping List

// Global const
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

function addItem(e) {
	e.preventDefault();

	const newItem = itemInput.value;

	// Validation
	if (newItem === "") {
		alert("Please add an item.");
		return;
	}

	const li = document.createElement("li");
	li.appendChild(document.createTextNode(newItem));

	const button = createButton("remove-item btn-link text-red");
	li.appendChild(button);

	// Add li to DOM
	itemList.appendChild(li);

	resetUI();

	itemInput.value = "";
}

function createButton(classes) {
	const button = document.createElement("button");
	button.className = classes;
	const icon = createIcon("fa-solid fa-xmark");

	button.appendChild(icon);

	return button;
}

function createIcon(classes) {
	const icon = document.createElement("i");
	icon.className = classes;

	return icon;
}

function filterItems(e) {
	const items = itemList.querySelectorAll("li");
	const text = e.target.value.toLowerCase();

	items.forEach((item) => {
		const itemName = item.firstChild.textContent.toLowerCase();

		if (itemName.indexOf(text) != -1) {
			item.style.display = "flex";
		} else {
			item.style.display = "none";
		}
	});
}

function removeItem(e) {
	if (e.target.parentElement.classList.contains("remove-item")) {
		if (confirm("Are you sure?")) {
			e.target.parentElement.parentElement.remove();
			resetUI();
		}
	}
}

function clearItems(e) {
	while (itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	}
	resetUI();
}

function resetUI() {
	const items = itemList.querySelectorAll("li");

	if (items.length === 0) {
		itemFilter.style.display = "none";
		clearButton.style.display = "none";
	} else {
		itemFilter.style.display = "block";
		clearButton.style.display = "block";
	}
}

// Listeners
itemForm.addEventListener("submit", addItem);
itemFilter.addEventListener("input", filterItems);
itemList.addEventListener("click", removeItem);
clearButton.addEventListener("click", clearItems);

resetUI();
