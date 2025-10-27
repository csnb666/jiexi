document.addEventListener('DOMContentLoaded', function() {
    const videoUrlInput = document.getElementById('video-url');
    const apiSelect = document.getElementById('api-select');
    const parseButton = document.getElementById('parse-button');
    const videoFrame = document.getElementById('video-frame');
    const placeholder = document.getElementById('placeholder');
    const loading = document.getElementById('loading');
    const resultStatus = document.querySelector('.result-status');
    const resultContainer = document.getElementById('result-container');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const closeFullscreenBtn = document.getElementById('close-fullscreen');
    
    // 解析按钮点击事件
    parseButton.addEventListener('click', function() {
        const videoUrl = videoUrlInput.value.trim();
        
        if (!videoUrl) {
            alert('请输入视频链接！');
            return;
        }
        
        // 验证URL格式
        if (!isValidUrl(videoUrl)) {
            alert('请输入有效的视频链接！');
            return;
        }
        
        const apiUrl = apiSelect.value + encodeURIComponent(videoUrl);
        
        // 显示加载状态
        placeholder.style.display = 'none';
        loading.style.display = 'flex';
        videoFrame.style.display = 'none';
        
        // 设置iframe源
        setTimeout(() => {
            videoFrame.src = apiUrl;
            videoFrame.onload = function() {
                loading.style.display = 'none';
                videoFrame.style.display = 'block';
            };
            
            // 超时处理
            setTimeout(() => {
                if (loading.style.display !== 'none') {
                    loading.style.display = 'none';
                    placeholder.style.display = 'flex';
                    alert('解析超时，请尝试其他解析通道或检查链接是否正确');
                }
            }, 10000); // 10秒超时
        }, 500);
    });
    
    // 全屏功能
    fullscreenBtn.addEventListener('click', function() {
        if (videoFrame.style.display === 'block') {
            resultContainer.classList.add('fullscreen');
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i> 退出全屏';
        } else {
            alert('请先解析视频！');
        }
    });
    
    closeFullscreenBtn.addEventListener('click', function() {
        resultContainer.classList.remove('fullscreen');
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> 全屏';
    });
    
    // 按ESC键退出全屏
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && resultContainer.classList.contains('fullscreen')) {
            resultContainer.classList.remove('fullscreen');
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> 全屏';
        }
    });
    
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
});