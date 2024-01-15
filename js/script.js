window.addEventListener('DOMContentLoaded', () => {
	const body = document.querySelector('body');
	const header = document.querySelector('.header');
	const headerScrollChange = () => {
		const headerContainer = document.querySelector('.header__container');

		// Функція для оновлення класу _active
		function updateHeaderClass() {
			const scrollPosition = window.scrollY || window.pageYOffset;
			const offset = 60;

			if (scrollPosition > offset) {
				headerContainer.classList.add('_active');
				header.classList.add('_active');
			} else {
				headerContainer.classList.remove('_active');
				header.classList.remove('_active');
			}
		}

		// Викликати функцію при завантаженні сторінки та при скролі
		updateHeaderClass();
		window.addEventListener('scroll', updateHeaderClass);
	};
	headerScrollChange();

	const mouseOverCard = () => {
		$('.projects__card').on('mousemove', function (e) {
			const cardOffset = $(this).offset();
			const cardWidth = $(this).outerWidth();
			const cardHeight = $(this).outerHeight();

			const icon = $(this).find('.projects__circle-icon');
			const iconWidth = icon.outerWidth();
			const iconHeight = icon.outerHeight();

			const mouseX = e.pageX - cardOffset.left - cardWidth / 2 + iconWidth / 2;
			const mouseY = e.pageY - cardOffset.top - cardHeight / 2 + iconHeight / 2;

			gsap.to(icon, { x: mouseX, y: mouseY, duration: 0.3 });
		});

		$('.projects__card').on('mouseleave', function () {
			const icon = $(this).find('.projects__circle-icon');
			gsap.to(icon, { x: 40.5, y: 38.5, opacity: 0, duration: 0.3 });
		});

		$('.projects__card').on('mouseenter', function () {
			const icon = $(this).find('.projects__circle-icon');
			gsap.to(icon, { opacity: 1, duration: 0.3 });
		});
	};
	mouseOverCard();
	// jquery functions ************************************************************

	// jquery functions end*************************************************************
	// animation ************************************************************
	const fadeUpAnimation = () => {
		const fadeInUpElements = document.querySelectorAll('.fadeInUp');

		function isInViewport(element) {
			const rect = element.getBoundingClientRect();
			return (
				rect.top >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
			);
		}

		function handleScroll() {
			fadeInUpElements.forEach(function (element) {
				if (isInViewport(element)) {
					element.classList.add('fadeInUp');
				}
			});
		}

		// Initial check on page load
		handleScroll();

		// Check when the user scrolls
		window.addEventListener('scroll', handleScroll);
	};
	fadeUpAnimation();

	// animation end ************************************************************

	// POPUP*************************************************************
	const popupFunction = (
		popupSelector,
		popupContentSelector,
		popupCloseSelector,
		questBtnSelector,
	) => {
		const popup = document.querySelector(popupSelector);
		const popupContent = popup.querySelector(popupContentSelector);
		const closePopup = popup.querySelector(popupCloseSelector);

		const btns = document.querySelectorAll(questBtnSelector);

		btns.forEach(function (btn) {
			btn.onclick = function () {
				popup.classList.toggle('_active');
				gsap.to(popup, {
					onComplete: function () {
						popupContent.classList.add('_active');
					},
				});
			};
		});

		closePopup.onclick = function () {
			popup.classList.toggle('_active');
			popupContent.classList.remove('_active');
		};
	};

	popupFunction('#question-popup', '.popup-content', '.popup-close', '#questBtn');
	popupFunction('#popupBrief', '.popup-content', '.popup-close', '#popupBriefButton');

	//   POPUP end*************************************************************

	const burgerFunction = () => {
		// burger menu ************************************************************
		const burgerTxtMenu = document.getElementById('burgerTextOpen');
		const burgerTxtClose = document.getElementById('burgerTextClose');
		const menu = document.getElementById('mainMenu');
		const btnBurger = document.getElementById('burgerMenu');
		const btnBurgerClose = document.querySelector('.top-menu__close');

		const headerContacts = document.querySelector('.header__container_contacts');
		const headerContainerMenu = document.querySelector('.header__container_menu');
		const headerLogo = document.querySelector('.header__logo');

		if (window.innerWidth > 968) {
			btnBurger.onclick = function () {
				body.classList.toggle('_lock');
				menu.classList.toggle('_active');
				btnBurger.classList.toggle('_active');
				burgerTxtMenu.classList.toggle('_active');
				burgerTxtClose.classList.toggle('_active');
				if (innerWidth > 1200) {
					headerContacts.classList.toggle('_active');
					headerContainerMenu.classList.toggle('_active');
				}
				headerLogo.classList.toggle('_active');
				// change logo 	*************************************************************

				if (headerLogo.classList.contains('_active')) {
					headerLogo.src = './img/logo_white.svg';
				} else {
					headerLogo.src = './img/logo.svg';
				}
				// change logo end***********************************************************
			};
		}
		if (window.innerWidth <= 968) {
			btnBurger.onclick = function () {
				menu.classList.toggle('_active');
				body.classList.toggle('_lock');
			};
			btnBurgerClose.onclick = function () {
				body.classList.toggle('_lock');
				menu.classList.toggle('_active');
			};
		}
		// burger menu end ************************************************************
	};
	burgerFunction();
	// =========================================================================================== //

	// sublist menu ************************************************************
	const subMenuDesctopFunction = () => {
		const sublistMenuPortfolioBtn = document.querySelector('#menu-sublist-portfolio-btn');
		const sublistMenuPortfolio = document.querySelector('#menu-sublist-portfolio');
		const sublistArrowClose = document.querySelectorAll('#sublist-arrow-close');
		// sublist menu services
		const sublistMenuServices = document.querySelector('#menu-sublist-services');
		const sublistMenuServicesBtn = document.querySelector('#menu-sublist-services-btn');
		if (window.innerWidth > 968) {
			sublistMenuPortfolioBtn.onclick = function () {
				sublistMenuPortfolio.classList.toggle('_active');
			};
			sublistMenuServicesBtn.onclick = function () {
				sublistMenuServices.classList.toggle('_active');
			};

			sublistArrowClose.forEach(function (close) {
				close.onclick = function () {
					sublistMenuPortfolio.classList.remove('_active');
					sublistMenuServices.classList.remove('_active');
				};
			});
		}
	};
	subMenuDesctopFunction();

	// sublist menu close ************************************************************
	// accordion ************************************************************
	let activeAccordion = null;

	function closeAccordion() {
		if (activeAccordion) {
			activeAccordion.classList.remove('active');
			const panel = activeAccordion.nextElementSibling;
			panel.style.maxHeight = null;
			const checkbox = activeAccordion.querySelector('input[type="radio"]');
			activeAccordion = null;
		}
	}

	function accordion(accordionBtn, accordionPanel) {
		const accordions = document.querySelectorAll(accordionBtn);

		accordions.forEach(accordion => {
			accordion.addEventListener('click', function (e) {
				e.preventDefault();
				const panel = this.nextElementSibling; // Get the sibling (accordion content) element
				const isActive = this.classList.contains('active');

				closeAccordion(); // Close the currently active accordion (if any)

				if (!isActive) {
					this.classList.add('active');
					panel.classList.add('active');
					panel.style.maxHeight = panel.scrollHeight + 'px';
					activeAccordion = this; // Set the current accordion as the active one
				}
			});
		});
	}

	accordion('#spoller1Title', '#spoller1Body');
	accordion('#spoller2Title', '#spoller2Body');
	// accrodion end ************************************************************
	// gsap animations
	const gsapAnimate = () => {
		const heroSupnumber = new SplitType('#heroSupnumber', { charsClass: 'char' });
		const heroNumber = new SplitType('#heroNumber', { charsClass: 'char' });
		const heroTitle = new SplitType('.hero__title', { charsClass: 'char' });
		const heroBtnChars = new SplitType('.hero__btn', { charsClass: 'char' });

		gsap.from(heroSupnumber.chars, {
			opacity: 0,
			y: -20,
			duration: 0.2,
			stagger: 0.05,
		});
		gsap.from(heroNumber.chars, {
			opacity: 0,
			y: -100,
			duration: 1,
			stagger: 0.5,
		});

		// Create a new timeline
		const timeline = gsap.timeline();

		// Add the 'from' part of the animation to the timeline
		timeline.from(heroTitle.chars, {
			opacity: 0,
			x: 10,
			duration: 1,
			stagger: 0.08,
		});
		timeline.to(heroTitle.chars, {
			opacity: 1,
			x: 0,
			duration: 1,
			stagger: 0.08,
		});

		timeline.from(heroBtnChars.chars, {
			opacity: 0,
			x: 10,
			duration: 1,
			stagger: 0.08,
		});
		timeline.to(
			heroBtnChars.chars,
			{
				opacity: 1,
				x: 0,
				duration: 1,
				stagger: 0.08,
			},
			0,
		);
	};
	gsapAnimate();

	// gsap animations end
	const pageCircle = document.querySelector('.pageCircle');
	const animatePageCircle = () => {
		console.log(pageCircle);

		document.addEventListener('mousemove', e => {
			const mouseX = e.clientX - pageCircle.clientWidth / 2;
			const mouseY = e.clientY - pageCircle.clientHeight / 2;

			// Застосування нових координат до transform
			pageCircle.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

			document.addEventListener('mouseleave', () => {
				gsap.to(pageCircle, {
					opacity: 0,
					scale: 0.8,
					duration: 1,
				});
			});
			document.addEventListener('mouseenter', () => {
				gsap.to(pageCircle, {
					opacity: 1,
					scale: 1,
					duration: 1,
				});
			});
		});
	};
	animatePageCircle();

	const circleButtonAnimate = () => {
		$('.circle__wrapper').on('mousemove', function (e) {
			const wrapper = $(this);
			const parent = wrapper.parent();

			const mouseX = e.pageX - parent.offset().left;
			const mouseY = e.pageY - parent.offset().top;

			const wrapperWidth = wrapper.outerWidth();
			const wrapperHeight = wrapper.outerHeight();

			const maxX = parent.width() - wrapperWidth;
			const maxY = parent.height() - wrapperHeight;

			const posX = Math.min(Math.max(0, mouseX - wrapperWidth / 2), maxX);
			const posY = Math.min(Math.max(0, mouseY - wrapperHeight / 2), maxY);

			gsap.to(wrapper, { x: posX, y: posY, duration: 1 });
		});
	};
	circleButtonAnimate();

	//ANIMATION ON SCROLL
	function isInViewport(element, offset = 100) {
		const rect = element.getBoundingClientRect();
		return (
			rect.top >= -offset &&
			rect.left >= 0 &&
			rect.bottom - offset <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	// Function to handle scroll events
	function handleScroll() {
		const elements = document.querySelectorAll('[data-animate-on-scroll]');
		elements.forEach(element => {
			const offset = parseInt(element.getAttribute('data-offset')) || 100;
			if (isInViewport(element, offset)) {
				element.classList.add('animate');
			}
		});
	}

	window.addEventListener('scroll', handleScroll);
	handleScroll(); // Initial check on page load
});
