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
      const background = document.querySelector('.background');
      background.style.opacity = '0';
      loadContent(contentUrl3); 
    }
  }


  let currentBgTimeout; 
  let isBgChanging = false; 

function showbg(work) {
  const bgImage = work.getAttribute('data-bg');
  const background = document.querySelector('.background');

  if (currentBgTimeout) clearTimeout(currentBgTimeout);
  if (isBgChanging) {
    background.style.transition = 'none'; // 立即停止过渡
    background.style.opacity = '0'; // 直接隐藏当前背景
  }

  // 设置新的背景图像并立即加载
  background.style.backgroundImage = `url(${bgImage})`;

  isBgChanging = true; // 标记正在过渡
  currentBgTimeout = setTimeout(() => {
    background.style.transition = 'opacity 0.7s ease 0.3s'; // 重新启用过渡
    background.style.opacity = '0.4'; // 渐显
    isBgChanging = false; // 过渡完成
  }, 50); // 减少延时以更快响应
}

function hidebg() {
  const background = document.querySelector('.background');

  // 如果正在过渡，立即停止
  if (currentBgTimeout) clearTimeout(currentBgTimeout);
  if (isBgChanging) {
    background.style.transition = 'none'; // 立即停止过渡
  }

  // 开始隐藏背景
  background.style.opacity = '0'; // 立即隐藏
  setTimeout(() => {
    if (background.style.opacity === '0') {
      background.style.backgroundImage = ''; // 清空背景图像
    }
  }, 300); // 延迟清除背景图像，防止闪烁
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
        if (work.dataset.bg) showbg(work); // 显示背景
      });
      work.addEventListener('mouseout', () => {
        if (work.dataset.bg) hidebg(); // 隐藏背景
      });
    });
  }
  

  applyP3ClickListeners();
  applyhoverbgeffect();
});
