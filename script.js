// script.js

// Utility to generate a random hex color
function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// Function to animate the dice image and update the target color input
function animateDice(button, targetInputId) {
    const img = button.querySelector('img');
    let currentDice = 1;
    const interval = setInterval(() => {
        currentDice = (currentDice % 6) + 1;
        img.src = `images/dice-${currentDice}.png`;
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        // Final dice face to simulate stopping the roll
        currentDice = Math.floor(Math.random() * 6) + 1;
        img.src = `images/dice-${currentDice}.png`;
        // Set the corresponding input to a random color
        const newColor = getRandomColor();
        document.getElementById(targetInputId).value = newColor;
        console.log(`Updated ${targetInputId} to ${newColor}`);
        updatePreview(); // Update preview if implemented
    }, 1000);
}

// Attach event listeners to all randomise buttons
document.querySelectorAll('.randomise-btn').forEach(button => {
    button.addEventListener('click', () => {
        const target = button.dataset.target;
        if (target === 'all') {
            // Randomise all color inputs in the colours section
            document.querySelectorAll('#colours input[type="color"]').forEach(input => {
                const btn = input.nextElementSibling;
                if (btn && btn.classList.contains('randomise-btn')) {
                    animateDice(btn, input.id);
                } else {
                    input.value = getRandomColor();
                }
            });
        } else {
            animateDice(button, target);
        }
    });
});

// Listen to changes on all inputs and select elements
document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('change', () => {
        console.log(`Updated ${element.id} to ${element.value}`);
        updatePreview(); // Call a function to update the live preview if implemented
    });
});

// Function to update a live preview (stub for now)
// You can extend this function to apply the updated styles to your preview element.
function updatePreview() {
    // For example, you might update a preview container like this:
    // const preview = document.getElementById('preview');
    // preview.style.backgroundColor = document.getElementById('background-colour').value;
    // ... and so on for other properties.
    console.log('Preview updated.');
}

// Helper to handle element-specific styling toggle.
// When the checkbox is unchecked, copy global values over to the element-specific inputs.
function handleElementSpecificToggle(checkboxId, globalMapping) {
    const checkbox = document.getElementById(checkboxId);
    checkbox.addEventListener('change', () => {
        const isEnabled = checkbox.checked;
        if (!isEnabled) {
            for (const [localId, globalId] of Object.entries(globalMapping)) {
                const localInput = document.getElementById(localId);
                const globalInput = document.getElementById(globalId);
                if (localInput && globalInput) {
                    localInput.value = globalInput.value;
                    console.log(`Copied ${globalId} value to ${localId}`);
                }
            }
            updatePreview(); // Update the preview if needed
            console.log(`Element-specific styles disabled for ${checkboxId}`);
        }
    });
}

// Set up element-specific toggle handlers for each group

// Button styling: if custom button styles are disabled, copy values from general/global colours.
handleElementSpecificToggle('custom-button-styles', {
    'button-colour': 'primary-colour',
    'button-text-colour': 'text-colour',
    'button-hover-colour': 'secondary-colour',
    'button-hover-text-colour': 'text-colour'
});

// Input styling: if custom input styles are disabled, copy values from general/global colours.
handleElementSpecificToggle('custom-input-styles', {
    'input-colour': 'primary-colour',
    'input-text-colour': 'text-colour',
    'input-border-colour': 'border-colour-global'
});

// Textarea styling: if custom textarea styles are disabled, copy values from general/global colours.
handleElementSpecificToggle('custom-textarea-styles', {
    'textarea-colour': 'primary-colour',
    'textarea-text-colour': 'text-colour',
    'textarea-border-colour': 'border-colour-global'
});

// Link styling: if custom link styles are disabled, copy values from general/global colours.
handleElementSpecificToggle('custom-link-styles', {
    'link-colour': 'primary-colour',
    'link-hover-colour': 'secondary-colour'
});

// Image styling: if custom image styles are disabled, copy border-radius from global border radius.
// Note: For image width and height there isn't a global equivalent, so they can remain untouched.
handleElementSpecificToggle('custom-image-styles', {
    'image-border-radius': 'border-radius'
});
