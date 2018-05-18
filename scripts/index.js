// version 4
{	
	window.onresize = resizeDetection;
	let nameListContainer = document.getElementById('nameListContainer');
	function resizeDetection() {
		let screenHeight = window.innerHeight;
		nameListContainer.style.height = screenHeight + 'px';
	}
	let nameInput = document.querySelector('#nameListContainer input');
	nameInput.addEventListener('keydown', (e) => {
		if(e.key === 'Enter'){
			let container = document.getElementById('container');
			let h1 = document.querySelector('#header h1');
			h1.innerHTML = nameInput.value;
			container.style.display = "block";
			container.style.opacity = 1;
			nameListContainer.style.display = 'none';

		}
	})
	resizeDetection();

}

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
			fixedHeader.style.borderBottom = 'none';
		} else {
			fixedHeader.style.borderBottom = '1px solid rgba(255, 255, 255, .5)';
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
			<label for="item1"> apples... </label>
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
		updateList();
	}
	
	mainContentArray[totalItems].children[0].disabled = false;
	mainContentArray[totalItems].children[1].setAttribute('class', 'addHover');
	mainContentArray[totalItems].children[2].setAttribute('class', 'addHover');
	mainContentArray[totalItems].children[2].innerHTML = 'remove';

	updateList();
	scrollDown();
	// scroll down as you add more items

	
}

function updateList() {
	let mainContent = document.querySelectorAll('#mainContent div');
	let mainContentArray = Array.from(mainContent);
	mainContentArray.forEach(function(item, index){
		item.children[0].setAttribute('id', index);
		item.children[1].setAttribute('for', index);
	});
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
			scrollDown();
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


function scrollDown(){
	// min screen height 150
	// div height 40
	if(totalItems < 1) {
		window.scrollTo(0, 0);
		return;
	}
	let h = window.innerHeight;
	let scrollToNum = ((totalItems - 1) * 41);
	if(h > (212 + scrollToNum)){
		// do nothing
	} else {
		window.scrollTo(0, scrollToNum);
	}
}
