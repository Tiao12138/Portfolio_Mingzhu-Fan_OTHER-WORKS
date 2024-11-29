document.addEventListener("DOMContentLoaded", function () {
  const navContainer = document.getElementById('nav-container');
  const navItems = document.querySelectorAll(".link");

  loadContent('p3.html');  

  navItems.forEach(item => {
    item.addEventListener("click", function () {
      const contentNav = this.getAttribute('nav-content');

      let contentUrl = '';
      switch (contentNav) {
        case 'p3': contentUrl = 'p3.html'; break;
        default: contentUrl = 'p3.html';
      }
      loadContent(contentUrl); 
    });
  });
  
  function loadContent(contentUrl) {
    const background = document.querySelector('.background');
    background.classList.add('loading');
    fetch(contentUrl)
      .then(response => response.text())
      .then(data => {
        background.classList.remove('loading'); 
        navContainer.innerHTML = data;  
        applyHoverTextListeners();      
        applyP3ClickListeners();
        applyhoverbgeffect();
  
        const backToTopButton = document.getElementById("backToTop");
        if (backToTopButton) {
          window.onscroll = function () {
            if (document.documentElement.scrollTop > 200) {
              backToTopButton.style.display = "block";
            } else {
              backToTopButton.style.display = "none";
            }
          };
  
          backToTopButton.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
          });
        }
      })
      .catch(error => console.error('Error loading content:', error));
  }   

  function loadContentP3(contentP3) {
    const background = document.querySelector('.background');
    background.style.transition = 'none';
    background.style.opacity = '0';
    background.style.backgroundImage = '';

    if (bgTimeout) clearTimeout(bgTimeout);

    let contentUrl3 = '';
    switch (contentP3) {
      case 'p3-1': contentUrl3 = 'p3-1.html'; break;
      case 'p3-2': contentUrl3 = 'p3-2.html'; break;
      case 'p3-3': contentUrl3 = 'p3-3.html'; break;
      case 'p3-4': contentUrl3 = 'p3-4.html'; break;
      default: contentUrl3 = 'p3.html';
    }
    if (contentUrl3) {
      const background = document.querySelector('.background');
      background.style.opacity = '0';
      loadContent(contentUrl3); 
    }
  }

  function applyhoverbgeffect() {
    const works = document.querySelectorAll('.otherwork');
    works.forEach(work => {
      work.addEventListener('mouseover', () => {
        if (work.dataset.bg) showbg(work); 
      });
      work.addEventListener('mouseout', () => {
        if (work.dataset.bg) hidebg(); 
      });
    });
  }

  let currentBgTimeout; 
  let isBgChanging = false; 

  function showbg(work) {
    const bgImage = work.getAttribute('data-bg');
    const background = document.querySelector('.background');

    if (currentBgTimeout) clearTimeout(currentBgTimeout);
    if (isBgChanging) {
      background.style.transition = 'none'; 
      background.style.opacity = '0'; 
    }

    background.style.backgroundImage = `url(${bgImage})`;

    isBgChanging = true; 
    currentBgTimeout = setTimeout(() => {
      background.style.transition = 'opacity 0.7s ease 0.3s'; 
      background.style.opacity = '0.4'; 
      isBgChanging = false; 
    }, 50); 
  }

  function hidebg() {
    const background = document.querySelector('.background');

    if (currentBgTimeout) clearTimeout(currentBgTimeout);
    if (isBgChanging) {
      background.style.transition = 'none'; 
    }

    background.style.opacity = '0';
    setTimeout(() => {
      if (background.style.opacity === '0') {
        background.style.backgroundImage = ''; 
      }
    }, 300); 
  }


  function applyhoverbgeffect() {
    const works = document.querySelectorAll('.otherwork');
    works.forEach(work => {
      work.addEventListener('mouseover', () => {
        if (work.dataset.bg) showbg(work); // 显示背景
      });
      work.addEventListener('mouseout', () => {
        if (work.dataset.bg) hidebg(); // 隐藏背景
      });
    });
  }


  function applyhoverbgeffect() {
    const works = document.querySelectorAll('.otherwork');
    works.forEach(work => {
      work.addEventListener('mouseover', () => {
        if (work.dataset.bg) showbg(work); 
      });
      work.addEventListener('mouseout', () => {
        if (work.dataset.bg) hidebg(); 
      });
    });
  }
  
  function showText(img) {
    const hoverText = img.parentElement.querySelector('.hovertext');
    const hoverTextDisplay = document.getElementById('hover-text-display');
    if (hoverText && hoverTextDisplay) {
      hoverTextDisplay.textContent = hoverText.textContent; 
      hoverTextDisplay.classList.add('show'); 
    }
  }
  
  function hideText() {
    const hoverTextDisplay = document.getElementById('hover-text-display');
    if (hoverTextDisplay) {
      hoverTextDisplay.classList.remove('show'); // Hide the text smoothly
    }
  }

  applyHoverTextListeners();
  applyP3ClickListeners();
  applyhoverbgeffect();
});
