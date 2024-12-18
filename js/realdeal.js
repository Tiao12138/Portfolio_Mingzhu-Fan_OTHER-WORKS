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
        applyImageClickListeners();
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
    background.style.opacity = '0';
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
      loadContent(contentUrl3); 
      boxlayout();
    }
  }

  function applyImageClickListeners() {
    const images = document.querySelectorAll('.cover');
    const defaultContent = document.querySelector('.contentsec');
    const contentSections = document.querySelectorAll('[id^="contentsec"]');

    images.forEach(image => {
      image.addEventListener('click', () => {
        if (defaultContent) {
          defaultContent.classList.add('hidden');
        }

        contentSections.forEach(section => section.classList.add('hidden'));

        const imageInfo = image.getAttribute('image-info');
        const contentToShow = document.getElementById(`contentsec${imageInfo.slice(1)}`);
        if (contentToShow) {
          contentToShow.classList.remove('hidden');
        }

        const backButton = contentToShow.querySelector('img[id^="back"]');
            if (backButton) {
                backButton.addEventListener('click', () => {
                    defaultContent.classList.remove('hidden');
                    contentToShow.classList.add('hidden');
                }, { once: true }); 
            }
        });
    });
  }

  let currentBgTimeout; 
  let isBgChanging = false; 
  let bgTimeout;

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

  function boxlayout (){
    const row = document.querySelector('.row');
    const boxes = row.children;
    if (boxes.length === 1) {
      row.style.justifyContent = 'flex-start'; // Align single box to the left
    } else {
      row.style.justifyContent = 'flex-start'; // For two or more boxes, this remains aligned
    }
  }


  function applyP3ClickListeners() {
    document.querySelectorAll('.otherwork').forEach(text => {
      text.addEventListener('click', function () {
        const background = document.querySelector('.background');
        background.style.opacity = '0';
        const contentP3 = this.getAttribute('p3-content');
        loadContentP3(contentP3); 
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

  const row = document.querySelector('.row');
  const boxes = row.children;

  if (boxes.length === 1) {
    row.style.justifyContent = 'flex-start'; 
  } else {
    row.style.justifyContent = 'flex-start'; 
  }

  
  applyImageClickListeners();
  applyP3ClickListeners();
  applyhoverbgeffect();
});
