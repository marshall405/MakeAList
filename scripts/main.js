// Get current Date and display
let displayDate = document.getElementById('displayDate');
let d = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
displayDate.innerHTML = `${days[d.getDay()]} - ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;



// Add item to list
let input = document.getElementById('itemInput');
input.addEventListener('keydown', (e) => {
	if(e.key === 'Enter'){
		if(input.value.length > 0){
			addItem(input.value);
			input.value = '';
		}
	}
});

function addItem(item) {

	// add item to list
	let list = document.querySelector('#itemList ul');
	let listItem = document.createElement('li');
	list.appendChild(listItem);
	listItem.innerHTML = item;


	// add X to list item 
	let del = document.querySelector('#deleteItem ul');
	let x = document.createElement('li');
	del.appendChild(x);
	x.innerHTML = 'remove';
	x.addEventListener('click', function () {
		del.removeChild(x);
		list.removeChild(listItem);
		check.removeChild(checkLi);
	});

	// add checkbox to list item
	let check = document.querySelector('#checkbox ul');
	let checkLi = document.createElement('li');
	let checkbox = document.createElement('input');
	checkbox.type ="checkbox";
	check.appendChild(checkLi);
	checkLi.appendChild(checkbox);
}

// 	Delete Selected Items

{
	let button = document.getElementById('button');
	button.addEventListener('click', function () {
		let list = document.querySelector('#itemList ul');
		let listItems = document.querySelectorAll('#itemList ul li');
		let del = document.querySelector('#deleteItem ul');
		let delItems = document.querySelectorAll('#deleteItem ul li');
		let check = document.querySelector('#checkbox ul');
		let checkLi = document.querySelectorAll('#checkbox ul li');
		let checked = document.querySelectorAll('#checkbox ul li input');
		checked.forEach(function(item, index) {
			if(item.checked == true) {
				del.removeChild(delItems[index]);
				list.removeChild(listItems[index]);
				check.removeChild(checkLi[index]);
			} else {
				alert('Please select atleast 1 item to be remove!');
			}
		});
	});
}