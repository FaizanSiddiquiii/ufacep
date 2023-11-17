// --------toggle icon navbar----------

let menuIcon = document.querySelector('#menu-icon')
let navbar = document.querySelector('.navbar')

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-x')
    navbar.classList.toggle('active')
}

// typedjs
const typed = new Typed('.multiple-text', {
    strings: ['AI Image Magic Unleashed', 'AI Images, Infinite Possibilities', 'AI Image Revolution'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})

ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.homecontent, .heading', { origin: 'left' });
ScrollReveal().reveal('.home-img, .services-container, .project-content, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.homecontent h1, .about-img, .contact p', { origin: 'left' });
ScrollReveal().reveal('.homecontent p, .about-content, .legene', { origin: 'right' });
