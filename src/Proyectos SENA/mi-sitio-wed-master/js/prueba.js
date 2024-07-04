var ratingGroup = document.getElementById('half-stars-example');
var ratingInputs = ratingGroup.querySelectorAll('input[type="radio"]');
var ratingLabels = ratingGroup.querySelectorAll('.rating__label');
var result = document.querySelector("#current-rating");

let selectedRating = 2.5;

ratingInputs.forEach((input) => {
    input.addEventListener('change', (event) => {
        selectedRating = parseFloat(event.target.value);
        updateRatingDisplay();
    });
});

ratingLabels.forEach((label) => {
    label.addEventListener('mouseover', (event) => {
        var labelValue = parseFloat(event.target.getAttribute('for').split('-')[1]);
        updateRatingDisplay(labelValue);
    });

    label.addEventListener('mouseout', () => {
        updateRatingDisplay();
    });
});

function updateRatingDisplay(ratingValue = selectedRating) {
    var ratingDisplay = document.getElementById('rating-display');
    if (!ratingDisplay) {
        ratingDisplay = document.createElement('p');
        ratingDisplay.id = 'rating-display';
        ratingGroup.parentNode.appendChild(ratingDisplay);
    }
    result.textContent = ratingValue;
}
