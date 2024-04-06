


// Load saved shoes from local storage on page load
window.onload = function() {
    var savedShoes = JSON.parse(localStorage.getItem('shoes')) || [];
    savedShoes.forEach(function(shoe) {
        createShoeElement(shoe.imageSrc, shoe.description);
    });
};

// Function to add extra photo and description
function addExtraPhoto() {
    var photoInput = document.getElementById('photoInput');
    var descriptionInput = document.getElementById('descriptionInput');
    
    if (photoInput.files.length === 0) {
        alert('Please select a photo.');
        return;
    }
    
    var imageFile = photoInput.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var imageSrc = event.target.result;
        var description = descriptionInput.value;

        // Create shoe element
        createShoeElement(imageSrc, description);

        // Save shoe data to local storage
        saveShoeToLocal(imageSrc, description);

        // Clear input fields
        photoInput.value = '';
        descriptionInput.value = '';
    };

    reader.readAsDataURL(imageFile);
}

// Function to create a new shoe element
function createShoeElement(imageSrc, description) {
    var newShoe = document.createElement('div');
    newShoe.className = 'shoe';

    var img = document.createElement('img');
    img.src = imageSrc;
    img.alt = 'Shoe';
    newShoe.appendChild(img);

    var shoeInfo = document.createElement('div');
    shoeInfo.className = 'shoe-info';

    var h3 = document.createElement('h3');
    h3.textContent = 'Shoe';
    shoeInfo.appendChild(h3);

    var p = document.createElement('p');
    p.textContent = description;
    shoeInfo.appendChild(p);
    

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    
    deleteButton.onclick = function() {
        deleteShoe(newShoe);
    };
    shoeInfo.appendChild(deleteButton);

    newShoe.appendChild(shoeInfo);

    document.getElementById('shoeContainer').appendChild(newShoe);
}

// Function to delete a shoe element
function deleteShoe(shoeElement) {
    shoeElement.parentNode.removeChild(shoeElement);

    // Remove shoe data from local storage
    removeShoeFromLocal(shoeElement.querySelector('img').src);
}

// Function to save shoe data to local storage
function saveShoeToLocal(imageSrc, description) {
    var savedShoes = JSON.parse(localStorage.getItem('shoes')) || [];
    savedShoes.push({ imageSrc: imageSrc, description: description });
    localStorage.setItem('shoes', JSON.stringify(savedShoes));
}

// Function to remove shoe data from local storage
function removeShoeFromLocal(imageSrc) {
    var savedShoes = JSON.parse(localStorage.getItem('shoes')) || [];
    var updatedShoes = savedShoes.filter(function(shoe) {
        return shoe.imageSrc !== imageSrc;
    });
    localStorage.setItem('shoes', JSON.stringify(updatedShoes));
}
