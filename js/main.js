
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. 轮播图逻辑 (纯原生) ---
    const slidesContainer = document.querySelector('.carousel-slides');
    if (slidesContainer) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const dotsContainer = document.querySelector('.carousel-dots');
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        let autoPlayTimer;

        // 生成指示点
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');
            dot.onclick = () => goToSlide(idx);
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.dot');

        function updateCarousel() {
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }

        function goToSlide(index) {
            currentIndex = index;
            if (currentIndex < 0) currentIndex = totalSlides - 1;
            if (currentIndex >= totalSlides) currentIndex = 0;
            updateCarousel();
        }

        function nextSlide() { goToSlide(currentIndex + 1); }
        function prevSlide() { goToSlide(currentIndex - 1); }

        // 按钮事件
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });

        // 自动播放
        function startTimer() {
            autoPlayTimer = setInterval(nextSlide, 4000); // 4秒切换
        }
        function resetTimer() {
            clearInterval(autoPlayTimer);
            startTimer();
        }
        
        // 鼠标悬停暂停
        const container = document.querySelector('.carousel-container');
        container.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
        container.addEventListener('mouseleave', startTimer);

        startTimer();
    }

    // --- 2. 导航栏滚动阴影效果 ---
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        } else {
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
        }
    });

    // --- 3. 页面淡入效果 (简单的加载动画) ---
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

});

// --- 4. 甜点页 Tab 切换 (全局函数) ---
function switchTab(tabName) {
    // 隐藏所有内容
    const contents = document.querySelectorAll('.menu-content');
    contents.forEach(el => el.classList.remove('active'));
    
    // 取消所有按钮激活
    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    
    // 激活目标
    document.getElementById(tabName).classList.add('active');
    // 这里简单的通过遍历找到点击的按钮加active不太容易，直接在HTML onclick里处理或如下
    // 实际生产中建议用事件委托，这里简化处理：
    event.target.classList.add('active');
}

// --- 5. 表单提交逻辑 ---
function submitForm(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    alert(`收到！${name} 同学，预约已提交。\n我们会把确认信息发送到你的邮箱。\n记得周六带上好心情来参加！`);
    e.target.reset();
    return false;
}
