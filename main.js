// Select cursor div and save to variable
const cursor = document.querySelector('.cursor');

// Add event listener to the window for mouse movement
 /* Mouse position on screen will be interpolated to a respective coordinate on the page. The position dynamically updates on every mouse movement. */
// Cursor div will be displayed at updated mouse coordinate

window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
    cursor.setAttribute('data-fromTop', (cursor.offsetTop - scrollY));
});

// Add another event listener on window for scroll events. 
/* The event listener will listen for scroll movement, then again interpolate the position into a coordinate point and dynamically update (cursor div) position respectively to the given scroll point. */ 
/* This will ensure the custom cursor follows the original cursor when the user scrolls the page up or down (given the x and y coordinates are not changing). */

window.addEventListener('scroll', () => {
    const fromTop = parseInt(cursor.getAttribute('data-fromTop'));
    cursor.style.top = scrollY + fromTop + 'px';
});

// Add another event listener to window for click events.
/* Event listener will run a function that adds the 'click' class to the .cursor div - enabling the 'click' animation.
The click animation should trigger every time the user clicks the mouse, not just on the first click.  */

window.addEventListener('click', () => {
    if (cursor.classList.contains('click')){
        cursor.classList.remove('click');
        /* Trigger a DOM Reflow to continually add the animation class on every click. 
        Upon clicking, if the 'click' class is active, it will first be removed and then added again - essentially the functionality will be the same as if the animation were running for the first time, making the animation repeatable. */
        void cursor.offsetWidth;
        // Activate animation by adding the click class
        cursor.classList.add('click');
    } else {
        cursor.classList.add('click');
    }
});

// Begin code for user ability to choose different cursor style

// Select all buttons and save to a variable
const allButtons = document.querySelectorAll('button');

/* Select the body and save to a variable so we can later alter body cursor style */
const body = document.querySelector('body');

// Loop through allButtons to add event listener on each button
/* If the 'cursor' class is present, it will be removed when 'Original Cursor' button is pressed. If the 'cursor' class is not present when the 'Custom Cursor' button is pressed, the class will be added. */ 

allButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.innerText === 'Original Cursor'){
            if (cursor.classList.contains('cursor')){
                cursor.classList.remove('cursor');
                body.style.cursor = 'default';
            }
        } else if (e.target.innerText === 'Custom Cursor'){
            if (!cursor.classList.contains('cursor')){
                cursor.classList.add('cursor');
                body.style.cursor = 'none';
            }
        }
    });
    /* Add mouse enter event listener to add cursor-pointer functionality when 'cursor' class is not present */
    button.addEventListener('mouseenter', (e) => {
        if (cursor.classList.contains('cursor')){
            button.style.cursor = 'none';
        } else if (!cursor.classList.contains('cursor')){
            button.style.cursor = 'pointer';
        }
    });
});