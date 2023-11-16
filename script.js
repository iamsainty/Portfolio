document.addEventListener('DOMContentLoaded', function () {
    // Advanced Features and Functionalities

    // 1. Dynamic Typewriter Effect
    const typewriter = (text, element, delay = 100) => {
        let i = 0;
        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, delay);
            }
        };
        type();
    };

    // 2. Lazy Loading for Images
    const images = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        observer.observe(img);
    });

    // 3. Form Submission Handling
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        const submissionAlert = document.getElementById('form-submission-alert');

        try {
            const response = await fetch('https://api.example.com/submit', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                submissionAlert.innerHTML = `<p>Thank you for your submission, ${formData.get('name')}!</p>`;
                submissionAlert.style.display = 'block';
            } else {
                throw new Error('Submission failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            submissionAlert.innerHTML = '<p>Submission failed. Please try again later.</p>';
            submissionAlert.style.display = 'block';
        }
    });

    // 4. Responsive Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    // 5. Smooth Scrolling
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    const navLinksList = document.querySelectorAll('.nav-links a');
    navLinksList.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });

    // 6. Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');
    });

    // 7. Interactive Skills Section
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseover', function () {
            this.classList.add('active');
        });

        item.addEventListener('mouseout', function () {
            this.classList.remove('active');
        });
    });

    // 8. Project Filtering
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filterValue = this.getAttribute('data-filter');

            projectItems.forEach(item => {
                item.style.display = 'none';

                if (item.getAttribute('data-category') === filterValue || filterValue === 'all') {
                    item.style.display = 'block';
                }
            });
        });
    });

    // 9. API Integration for Dynamic Data
    const fetchData = async () => {
        try {
            const response = await fetch('https://api.example.com/data');
            const data = await response.json();
            console.log(data);
            // Use the data to update your portfolio dynamically
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();

    // 10. Custom Scrollbar
    const customScrollbar = document.getElementById('custom-scrollbar');
    customScrollbar.addEventListener('scroll', function () {
        console.log('Scrolled!');
    });

    // 11. Mobile Touch Swipe
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function (event) {
        touchStartX = event.touches[0].clientX;
    });

    document.addEventListener('touchend', function (event) {
        touchEndX = event.changedTouches[0].clientX;
        handleSwipe();
    });

    const handleSwipe = () => {
        const swipeDistance = touchEndX - touchStartX;
        if (swipeDistance > 50) {
            console.log('Swiped right!');
        } else if (swipeDistance < -50) {
            console.log('Swiped left!');
        }
    };

    // ... (Your additional advanced features) ...

});
