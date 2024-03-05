function burgerToggle(){
    let burger = document.getElementById("burger");
    let nav = document.getElementById("nav");
    burger.classList.toggle("clicked");
    nav.classList.toggle("opened");
}

//OUTSIDE CLICK

document.addEventListener('click', function(event) {

    // Check if the navigation is open
    if (nav.classList.contains("opened")) {
        // Check if the click is outside the nav and burger
        if (!nav.contains(event.target) && !burger.contains(event.target)) {
            // Close the nav
            nav.classList.remove("opened");
            burger.classList.remove("clicked");
        }
    }
});