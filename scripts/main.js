// Get current Date and display
let displayDate = document.getElementById('displayDate');
let d = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
displayDate.innerHTML = `${days[d.getDay()]} - ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

// build empty list



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
	let listItems = document.querySelectorAll('#itemList ul li');
	let scrollToNum = listItems.length * 38;
	window.scrollTo(0, scrollToNum);
	
	listItem.addEventListener('click', function () {
		
		let indexOfItem = Array.from(listItems).indexOf(this);

		
		let checked = document.querySelectorAll('#checkbox ul li input');
		if(checked[indexOfItem].checked == false){
			checked[indexOfItem].checked = true;
		} else {
			checked[indexOfItem].checked = false;
		}
	});


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
	let selectAllButton = document.getElementById('selectAllButton');
	let selected = false;
	button.addEventListener('click', function () {
		let list = document.querySelector('#itemList ul');
		let listItems = document.querySelectorAll('#itemList ul li');
		let del = document.querySelector('#deleteItem ul');
		let delItems = document.querySelectorAll('#deleteItem ul li');
		let check = document.querySelector('#checkbox ul');
		let checkLi = document.querySelectorAll('#checkbox ul li');
		let checked = document.querySelectorAll('#checkbox ul li input');
		let counter = 0;
		checked.forEach(function(item, index) {
			if(item.checked == true) {
				counter += 1;
				del.removeChild(delItems[index]);
				list.removeChild(listItems[index]);
				check.removeChild(checkLi[index]);
			}
		});
		if(counter < 1) {
			alert('Please select an item to delete');
		}
		selectAllButton.innerHTML = 'Select All Items';
		selected = false;
	});

// Select All Button


	selectAllButton.addEventListener('click', function () {
		let checkbox = document.querySelectorAll('#checkbox ul li input');
		if(checkbox.length > 0){
			if(!selected){
				checkbox.forEach(function(item) {
					item.checked = true;
				});
				selectAllButton.innerHTML = 'Unselect All Items';
				selected = true;
			} else {
				checkbox.forEach(function(item) {
					item.checked = false;
				});
				selectAllButton.innerHTML = 'Select All Items';
				selected = false;
			}
		}
	});
}


// add box shadow to fixed header after scoll begins
{

	let fixedHeader = document.getElementById('mainContent');
	
	document.addEventListener('scroll', function() {
		if(window.pageYOffset < 2){
			fixedHeader.style.boxShadow = 'none';
		} else {
			fixedHeader.style.boxShadow = '0px 1px 5px black';
		}

	});


}
