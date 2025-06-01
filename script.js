  document.addEventListener('DOMContentLoaded', function () {
            // --- Navbar Toggle y Comportamiento (Sin cambios) ---
            const menuToggle = document.getElementById('menu-toggle');
            const navLinks = document.getElementById('nav-links');
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
            });
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                });
            });

            const sections = document.querySelectorAll('main section[id]');
            function navHighlighter() {
                let scrollY = window.pageYOffset;
                let currentActive = '';
                sections.forEach(current => {
                    const sectionHeight = current.offsetHeight;
                    const sectionTop = current.offsetTop - 150;
                    let sectionId = current.getAttribute('id');
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                       currentActive = sectionId;
                    }
                });
                navLinks.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href').substring(1) === currentActive) {
                        link.classList.add('active');
                    }
                });
                // Si no hay sección activa (ej. al inicio o final del scroll), activar 'Inicio' si está en el hero
                if (!currentActive && scrollY < sections[0].offsetTop) {
                     document.querySelector('.nav-links a[href="#hero"]').classList.add('active');
                }
            }
            window.addEventListener('scroll', navHighlighter);
            navHighlighter();

            const siteHeader = document.querySelector('.site-header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    siteHeader.classList.add('scrolled');
                } else {
                    siteHeader.classList.remove('scrolled');
                }
            });

            // --- Efecto scroll para elementos (Sin cambios) ---
            const scrollElements = document.querySelectorAll('.scroll-effect, .feature-item, .product-card');
            const elementInView = (el, percentageScroll = 100) => {
                const elementTop = el.getBoundingClientRect().top;
                return ( elementTop <= (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100) );
            };
            const displayScrollElement = (element) => { element.classList.add('visible'); };
            const handleScrollAnimation = () => {
                scrollElements.forEach((el) => { if (elementInView(el, 80)) { displayScrollElement(el); } });
            }
            window.addEventListener('scroll', handleScrollAnimation);
            handleScrollAnimation();

            // --- Carousel automático de Galería de Imágenes (Sin cambios en lógica, solo variables) ---
            const imageCarouselSlide = document.getElementById('carousel-slide');
            if (imageCarouselSlide) { // Verificar que el elemento exista
                const imageCarouselImages = imageCarouselSlide.querySelectorAll('img');
                if (imageCarouselImages.length > 0) {
                    const numOriginalImages = imageCarouselImages.length;
                    let imageWidth = imageCarouselImages[0].clientWidth;
                    let currentImageIndex = 0;
                    const imageSpeed = 3500; // Velocidad ligeramente diferente para distinción

                    imageCarouselImages.forEach(img => { imageCarouselSlide.appendChild(img.cloneNode(true)); });
                    
                    function updateImageCarouselWidth() {
                        let firstImage = imageCarouselSlide.querySelector('img');
                        if (firstImage) { imageWidth = firstImage.getBoundingClientRect().width; }
                        imageCarouselSlide.style.width = (numOriginalImages * 2 * imageWidth) + 'px';
                    }
                    updateImageCarouselWidth();
                    window.addEventListener('resize', updateImageCarouselWidth);

                    function advanceImageCarousel() {
                        currentImageIndex++;
                        imageCarouselSlide.style.transition = 'transform 0.7s ease-in-out';
                        imageCarouselSlide.style.transform = `translateX(-${currentImageIndex *3* imageWidth}px)`;
                        if (currentImageIndex >= numOriginalImages) {
                            setTimeout(() => {
                                imageCarouselSlide.style.transition = 'none';
                                currentImageIndex = 0;
                                imageCarouselSlide.style.transform = `translateX(0px)`;
                            }, 700);
                        }
                    }
                    setInterval(advanceImageCarousel, imageSpeed);
                }
            }

            // --- NUEVO: Carousel automático de Testimonios ---
            const testimonialCarouselSlide = document.getElementById('testimonial-carousel-slide');
            if (testimonialCarouselSlide) { // Verificar que el elemento exista
                const testimonialCards = testimonialCarouselSlide.querySelectorAll('.testimonial-card');
                if (testimonialCards.length > 0) {
                    const numOriginalTestimonials = testimonialCards.length;
                    let cardWidth = testimonialCards[0].offsetWidth + (parseFloat(getComputedStyle(testimonialCards[0]).marginLeft) * 2) ; // Incluye margen
                    let currentTestimonialIndex = 0;
                    const testimonialSpeed = 3000;

                    testimonialCards.forEach(card => { testimonialCarouselSlide.appendChild(card.cloneNode(true)); });
                    
                    function updateTestimonialCarouselWidth() {
                        let firstCard = testimonialCarouselSlide.querySelector('.testimonial-card');
                        if (firstCard) { cardWidth = firstCard.offsetWidth + (parseFloat(getComputedStyle(firstCard).marginLeft) * 2); } // Recalcular con margen
                        testimonialCarouselSlide.style.width = (numOriginalTestimonials * 2 * cardWidth) + 'px';
                    }
                    updateTestimonialCarouselWidth();
                    window.addEventListener('resize', updateTestimonialCarouselWidth);

                    function advanceTestimonialCarousel() {
                        currentTestimonialIndex++;
                        testimonialCarouselSlide.style.transition = 'transform 0.7s ease-in-out';
                        testimonialCarouselSlide.style.transform = `translateX(-${currentTestimonialIndex * 3 *cardWidth}px)`;

                        if (currentTestimonialIndex >= numOriginalTestimonials) {
                            setTimeout(() => {
                                testimonialCarouselSlide.style.transition = 'none';
                                currentTestimonialIndex = 0;
                                testimonialCarouselSlide.style.transform = `translateX(0px)`;
                            }, 700); 
                        }
                    }
                    setInterval(advanceTestimonialCarousel, testimonialSpeed);
                }
            }

            // --- Copyright año actual (Sin cambios) ---
            document.getElementById('currentYear').textContent = new Date().getFullYear();
        });