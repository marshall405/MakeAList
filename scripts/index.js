// version 3

let totalItems = 0; // keep track of all items added to list
{	// Get current Date and display
	let displayDate = document.getElementById('displayDate');
	let d = new Date();
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	displayDate.innerHTML = `${days[d.getDay()]} - ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

{	// Add item to list
	let input = document.getElementById('itemInput');
	input.focus();
	input.addEventListener('keydown', (e) => {
		if(e.key === 'Enter'){
			if(input.value.length > 0){
				addItem(input.value);
				input.value = '';
				totalItems += 1;
			}
		}
	});
}

{	// add box shadow to fixed header after scoll begins
	let fixedHeader = document.getElementById('fixedHeader');
	document.addEventListener('scroll', function() {
		if(window.pageYOffset < 2){
			fixedHeader.style.boxShadow = 'none';
		} else {
			fixedHeader.style.boxShadow = '0px 2px 2px rgba(255, 255, 255, .5)';
		}
	});
}
{	// Build premade list
	for(let i = 0; i < 16; i++) {
		buildList();
	}
}
function buildList() {
	// Template 
	/*<div class="flex-container">
			<input type="checkbox" id="item1"> 
			<label for="item1"> asdfasefawefhlkjashf </label>
			<p> remove </p>
		</div>

	*/
	// Get mainContent Div to append elements
	let mainContent 	 = document.getElementById('mainContent');
	let mainContentArray = document.querySelectorAll('#mainContent div');
	// Create new elements
	let newDiv		= createElement('div');
	let newCheckBox = createElement('input');
	let newLabel 	= createElement('label');
	let newP		= createElement('p');

	newDiv.setAttribute('class', 'flex-container');
	newCheckBox.setAttribute('id', mainContentArray.length);
	newLabel.setAttribute('for', mainContentArray.length);
	newCheckBox.type = 'checkbox';
	newCheckBox.disabled = true;

	mainContent.append(newDiv);
	newDiv.append(newCheckBox);
	newDiv.append(newLabel);
	newDiv.append(newP);
}

function addItem(item) {
	if(totalItems >= 16) {
		buildList();
	}
	let mainContentArray = document.querySelectorAll('#mainContent div');
	mainContentArray[totalItems].children[1].innerHTML = item;
	mainContentArray[totalItems].children[2].onclick = function() {
		let mainContent = document.getElementById('mainContent');
		mainContent.removeChild(this.parentNode);
		totalItems--;
		checkPreBuiltList();
	}
	mainContentArray[totalItems].children[2].innerHTML = 'remove';
	mainContentArray[totalItems].children[0].disabled = false;
	mainContentArray[totalItems].children[1].setAttribute('class', 'addHover');
	mainContentArray[totalItems].children[2].setAttribute('class', 'addHover');


	// scroll down as you add more items

	let scrollToNum = totalItems * 4;
	window.scrollTo(0, scrollToNum);
}
function createElement(element) {
	return document.createElement(element);
}



{	// 	Select All Items and Delete Selected Items
	let selectAllItems 			= document.getElementById('selectAllButton');
	let deleteSelectedItems 	= document.getElementById('deleteSelectedButton');

	// Select All Items Button
	let selected = false;
	selectAllItems.onclick = function() {
		if(totalItems > 0){
			let listOfItems = document.querySelectorAll('#mainContent div input');
			if(!selected) {
				listOfItems.forEach(function(item, index){
					if(index < totalItems){
						item.checked = true;
					}
				});
				selectAllItems.innerHTML = 'Unselect All Items';
				selected = true;
			} else {
				listOfItems.forEach(function(item){
					item.checked = false;
				});
				selectAllItems.innerHTML = 'Select All Items';
				selected = false;
			}
		}
	}	

	// Delete Selected Items Button
	deleteSelectedItems.onclick = function() {
		if(totalItems > 0){
			let listOfItems = document.querySelectorAll('#mainContent div input');
			let mainContentArray = document.querySelectorAll('#mainContent div');
			let mainContent = document.getElementById('mainContent');
			listOfItems.forEach(function(item, index) {
				if(item.checked == true){
					mainContent.removeChild(mainContentArray[index]);
					totalItems--;
				}
			});
			selectAllItems.innerHTML = 'Select All Items';
			selected = false;
			checkPreBuiltList();
			/*
			if(document.querySelectorAll('#mainContent div').length < 16){
				for(var i = document.querySelectorAll('#mainContent div').length; i < 16; i++){
					buildList();
				}
			}*/
		} else {
			alert('You gotta select an item to delete first!');
		}
	}
}
function checkPreBuiltList() {
	if(document.querySelectorAll('#mainContent div').length < 16){
		for(var i = document.querySelectorAll('#mainContent div').length; i < 16; i++){
			buildList();
		}
	}
}





