function easeOutExpo(t) {
    // Adjusted for a more delayed ending
    return t === 1 ? 1 : 1 - Math.pow(2, -7 * t);
}

function countUpAnimationWithDynamicSuffix(element, start, end, duration) {
    const range = end - start;
    let startTime;
    const isInteger = Number.isInteger(end);

    function animate(now) {
        if (!startTime) startTime = now;
        const timeElapsed = Math.min(now - startTime, duration);
        let progress = timeElapsed / duration;

        // Apply the easing function
        const easedProgress = easeOutExpo(progress);

        // Calculate current value
        let current = start + range * easedProgress;

        // If nearing the end of the animation, ensure it doesn't exceed the target
        if (timeElapsed >= duration) {
            current = end;
        }

        // Update the element's content
        if (isInteger) {
            element.textContent = Math.round(current) + element.dataset.suffix;
        } else {
            element.textContent = parseFloat(current.toFixed(1)) + element.dataset.suffix;
        }

        // Continue the animation or finalize it
        if (timeElapsed < duration) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = end + element.dataset.suffix; // Ensure the exact final value
        }
    }

    requestAnimationFrame(animate);
}

function startAnimationForElement(element) {
    const match = element.textContent.match(/([0-9]+\.?[0-9]*)([a-zA-Z]*)/);
    if (match) {
        const startNumber = 0;
        const endNumber = parseFloat(match[1]);
        const suffix = match[2];
        element.dataset.suffix = suffix;

        countUpAnimationWithDynamicSuffix(element, startNumber, endNumber, 2000); // Duration of 2 seconds
    }
}

// Intersection Observer to start the animation when the element comes into view
let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startAnimationForElement(entry.target);
            observer.unobserve(entry.target); // Stop observing the element after animation starts
        }
    });
}, { threshold: 0.5 }); // Adjust threshold as needed

document.addEventListener('DOMContentLoaded', () => {
    const counterElements = document.querySelectorAll('.cell-number');
    counterElements.forEach(el => {
        observer.observe(el); // Observe each counter element
    });
});
