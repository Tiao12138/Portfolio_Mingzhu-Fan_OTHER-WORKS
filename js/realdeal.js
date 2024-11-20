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
      loadContent(contentUrl);  // Load the selected content
    });
  });
  
  // Function to load content into navContainer
  function loadContent(contentUrl) {
    fetch(contentUrl)
      .then(response => response.text())
      .then(data => {
        navContainer.innerHTML = data;  
        applyHoverTextListeners();      
        applyP3ClickListeners();
        applyhoverbgeffct();
  
        // Add scroll functionality and click listener for back-to-top button after content loads
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

  // const otherWorks = document.querySelectorAll('.otherwork');
  //     console.log(otherWorks);
  //     const background = document.querySelector('.background');
  
  //     otherWorks.forEach(work => {
  //       work.addEventListener('mouseenter', () => {
  //         const bgImage = work.getAttribute('data-bg');
  //         console.log('data-bg valid');
  //         background.style.backgroundImage = `url(${bgImage})`;
  //         background.style.opacity = '0.6';
  //       });
  
  //       work.addEventListener('mouseleave', () => {
  //         background.style.opacity = '0';
  //       });
  //     });

  function applyhoverbgeffct(){
    document.querySelectorAll('.otherwork').forEach(work=>{
      work.addEventListener('mouseover', () => showbg(work));
      work.addEventListener('mouseout', () => hidebg(work));
    })
  }

  function showbg(work) {
    const bgImage = work.getAttribute('data-bg');
    const background = document.querySelector('.background');
    background.style.backgroundImage = `url(${bgImage})`; 
    background.style.opacity = '0.4';   
  }
  
  function hidebg(work) {
    const bgImage = work.getAttribute('data-bg');
    const background = document.querySelector('.background');
    background.style.opacity = '0';
  }


  function applyP3ClickListeners() {
    document.querySelectorAll('.otherwork').forEach(text => {
      text.addEventListener('click', function () {
        const contentP3 = this.getAttribute('p3-content');
        loadContentP3(contentP3); 
      });
    });
  }

  function loadContentP3(contentP3) {
    let contentUrl3 = '';
    switch (contentP3) {
      case 'p3-1': contentUrl3 = 'p3-1.html'; break;
      case 'p3-2': contentUrl3 = 'p3-2.html'; break;
      case 'p3-3': contentUrl3 = 'p3-3.html'; break;
      default: contentUrl3 = 'p3.html';
    }
    if (contentUrl3) {
      loadContent(contentUrl3); 
    }
  }

  function applyHoverTextListeners() {
    const images = document.querySelectorAll('.cover');
    images.forEach(img => {
      img.addEventListener('mouseover', () => showText(img));
      img.addEventListener('mouseout', () => hideText(img));
    });
  }
  
  function showText(img) {
    const hoverText = img.parentElement.querySelector('.hovertext');
    const hoverTextDisplay = document.getElementById('hover-text-display');
    if (hoverText && hoverTextDisplay) {
      hoverTextDisplay.textContent = hoverText.textContent; // Update the dedicated container
      hoverTextDisplay.classList.add('show'); // Show the text smoothly
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
  applyhoverbgeffct();
});
