window.addEventListener('load', function(){
    const wrapper = document.querySelector('.wrapper');
    const sections = [...document.querySelectorAll('.section')];
    const themeButton = document.querySelector('li.themes-button button');
    const navButtons = [...document.querySelectorAll('button a')].filter(i => i.getAttribute('nav-button') !== null);
    const menuItems = document.querySelectorAll('.side-menu ul li');
    const sideMenu = document.querySelector('.side-menu');
    const menuButton = document.querySelector('.side-menu-button');
    const overlay = document.querySelector('.side-menu .overlay');
    const documentTitle = document.title.substr(document.title.indexOf('>')+1);
    const form = document.getElementById('form');
    const submitButton = document.getElementById('submit');
    const formStatus = document.getElementById('formStatus');
    const label = document.querySelectorAll('label');
    const formFields = [...form.elements].filter(i => i.required);
    let isNewState = true;
    let activeIndex;
    let activeTimeout;

    const init = () => {
        initEvents();
        const initialPage = window.location.hash === '' ?  '#home' : window.location.hash;
        setTimeout(() => switchSection(sections.indexOf(document.querySelector(initialPage))), 50);
    }

    const initEvents = () => {
        wrapper.addEventListener('scroll', handleScroll);
        navButtons.forEach(i =>  i.addEventListener('click', handleNavClick));
        menuItems.forEach(i =>  i.addEventListener('click', handleMenuItemClick));
        formFields.forEach(i => {
            i.addEventListener('blur', handleBlur)
            i.addEventListener('focus', handleFocus)
        });
        submitButton.addEventListener('click', handleSubmit);
        themeButton.addEventListener('click', handleThemeClick);
        menuButton.addEventListener('click', handleMenuClick);
        overlay.addEventListener('click', handleMenuClick);
        window.addEventListener('popstate', handlePopState);
    }

    const success = () => {
        form.reset();
        submitButton.style = 'display: none';
        formStatus.innerHTML = 'Thanks!';
    }

    const error = () => {
        formStatus.innerHTML = 'Oops! Please try again later.';
    }

    const handleFocus = (e) => {
        e.target.parentElement.classList.remove('error');
        [...label].filter(i => i.getAttribute('for')===e.target.name)[0].classList.add('active');
    }

    const handleBlur = (e) => {
        if (e.target.value==="")
            [...label].filter(i => i.getAttribute('for')===e.target.name)[0].classList.remove('active');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(form);
        if (isValidated()) sendMail(form.method, form.action, data, success, error);
    }

    const isValidated = () => {
        let validated = true;
        formFields.forEach((i) => {
            if (i.value === '') {
                i.parentElement.classList.add('error');
                validated = false;
            }
        })
        return validated;
    }
    
    const sendMail = (method, url, data, success, error) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                success(xhr.response, xhr.responseType);
            } else {
                error(xhr.status, xhr.response, xhr.responseType);
            }
        };
        xhr.send(data);
    }

    const handleMenuClick = (e) => {
        sideMenu.classList.contains('active') ? sideMenu.classList.remove('active') :  sideMenu.classList.add('active');
    }

    const handleMenuItemClick = (e) => {
        e.preventDefault();
        gotoSection(document.querySelector(e.target.getAttribute('href')));
        handleMenuClick();
    }

    const handleThemeClick = (e) => {
        document.body.classList.contains('dark') ? document.body.classList.remove('dark') :  document.body.classList.add('dark');
    }

    const handleNavClick = (e) => {
        e.preventDefault();
        gotoSection(document.querySelector(e.target.getAttribute('href')));
    }

    const handlePopState = (e) => {
        isNewState = false;
        setTimeout(() => gotoSection(document.querySelector('#'+history.state.section)), 50);
    }

    const gotoSection = (section) => {
        if (window.innerWidth > 768) {
            section.scrollIntoView({behavior: "smooth"});
        } else {
            section.scrollIntoView();
        }
    }

    const handleScroll = (e) => {
        switchSection(getSectionIndex());
    }

    const getSectionIndex = () => {
        let _activeIndex = 0;
        sections.forEach((section, index) => {
            if (wrapper.scrollLeft >= section.offsetWidth * index - window.innerWidth/2 && 
                wrapper.scrollLeft < section.offsetWidth * (index + 1)) {
                _activeIndex = index;
            }
        });
        return _activeIndex;
    }

    const switchSection = (index) => { 
        if (activeIndex===index) return;
        activeIndex = index;
        sections.forEach((section, i) => {
            menuItems[i].classList.remove('active');
            section.classList.remove('active');
            i < index && section.classList.add('reverted');
        });

        const activateSection = (index, sections, menuItems) => {
            sections[index].classList.add('active');
            menuItems[index].classList.add('active');
            setTopContent(index);
            setState(sections[index].id);
            sections.forEach((section, i) => i >= index && section.classList.remove('reverted'));
        }
    
        clearTimeout(activeTimeout);
        activeTimeout = setTimeout(() => activateSection(index, sections, menuItems), 300);
    }

    const setTopContent = (index) => {
        if (sections[index].querySelector('.content')) sections[index].querySelector('.content').scrollTop = 0;
    }

    const setState = (section) => {
        const title = `Davi Garms > ${section.substr(0,1).toUpperCase()+section.substr(1)} | ${documentTitle}`;
        if (history.state && document.title !== history.state.title) document.title = title;
        if (isNewState && window.history && window.history.pushState) history.pushState({section, title }, title, '#' + section);
        isNewState = true;
    }   

    init();
});

