// ========================================
// BUBBLE BLISS LANDING PAGE FUNCTIONALITY
// ========================================

// Video management
const videoSources = [
    'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4'
];

let currentVideoIndex = 0;
let isVideoPlaying = true;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupVideoControls();
    setupScrollAnimations();
});

function initializePage() {
    // Add entrance animation to elements
    const elements = document.querySelectorAll('.video-card, .model-container, .feature');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

function setupVideoControls() {
    const heroVideo = document.getElementById('hero-video');
    const toggleBtn = document.getElementById('video-toggle');
    
    // Handle video loading errors
    heroVideo.addEventListener('error', function() {
        console.log('Video failed to load, showing fallback');
        document.querySelector('.video-fallback').style.display = 'block';
        heroVideo.style.display = 'none';
    });
}

function toggleVideo() {
    const heroVideo = document.getElementById('hero-video');
    const toggleBtn = document.getElementById('video-toggle');
    
    if (isVideoPlaying) {
        heroVideo.pause();
        toggleBtn.textContent = '▶️';
        isVideoPlaying = false;
    } else {
        heroVideo.play();
        toggleBtn.textContent = '⏸️';
        isVideoPlaying = true;
    }
}

function nextVideo() {
    const heroVideo = document.getElementById('hero-video');
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    
    // Add transition effect
    heroVideo.style.opacity = '0.5';
    
    setTimeout(() => {
        heroVideo.src = videoSources[currentVideoIndex];
        heroVideo.style.opacity = '1';
    }, 300);
}

function setupScrollAnimations() {
    // Parallax effect for video sections
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const videoCards = document.querySelectorAll('.video-card video');
        
        videoCards.forEach((video, index) => {
            const rate = scrolled * -0.5;
            video.style.transform = `translateY(${rate}px)`;
        });
    });
}

// ========================================
// PAGE TRANSITION SYSTEM
// ========================================

function enterSite() {
    showPageTransition();
    
    // Simulate loading time and transition to main site
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

function showPageTransition() {
    const overlay = document.getElementById('page-transition-overlay');
    overlay.classList.add('active');
    
    // Add some dynamic loading effects
    const leaves = document.querySelectorAll('.leaf');
    leaves.forEach((leaf, index) => {
        setTimeout(() => {
            leaf.style.transform = 'scale(1.2)';
            setTimeout(() => {
                leaf.style.transform = 'scale(1)';
            }, 200);
        }, index * 200);
    });
}

// ========================================
// 3D MODEL INTEGRATION HELPERS
// ========================================

/*
// CUSTOM 3D MODEL INSERTION POINT
// Replace the CSS animation with a real 3D model

function initialize3DModel() {
    // Example with Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(400, 400);
    document.querySelector('.model-container').appendChild(renderer.domElement);
    
    // Load your 3D model here
    const loader = new THREE.GLTFLoader();
    loader.load('path/to/your/bubble-tea-cup.glb', function(gltf) {
        scene.add(gltf.scene);
        animate();
    });
    
    function animate() {
        requestAnimationFrame(animate);
        // Add rotation
        if (scene.children[0]) {
            scene.children[0].rotation.y += 0.01;
        }
        renderer.render(scene, camera);
    }
}

// Example with Model Viewer Web Component
function initializeModelViewer() {
    const modelViewer = document.createElement('model-viewer');
    modelViewer.src = 'path/to/your/bubble-tea-cup.glb';
    modelViewer.alt = '3D Bubble Tea Cup';
    modelViewer.autoRotate = true;
    modelViewer.cameraControls = true;
    modelViewer.environmentImage = 'neutral';
    modelViewer.shadowIntensity = 1;
    
    document.querySelector('.model-container').appendChild(modelViewer);
}
*/

// ========================================
// UTILITY FUNCTIONS
// ========================================

function preloadVideos() {
    // Preload video sources for smoother transitions
    videoSources.forEach(src => {
        const video = document.createElement('video');
        video.src = src;
        video.preload = 'metadata';
    });
}

function handleVideoError(video) {
    // Fallback for failed video loads
    video.style.display = 'none';
    const fallback = video.nextElementSibling;
    if (fallback && fallback.classList.contains('video-fallback')) {
        fallback.style.display = 'block';
    }
}

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

// Lazy load videos when they come into view
function setupLazyVideoLoading() {
    const videos = document.querySelectorAll('video[data-src]');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.src = video.dataset.src;
                video.removeAttribute('data-src');
                videoObserver.unobserve(video);
            }
        });
    });
    
    videos.forEach(video => videoObserver.observe(video));
}

// Pause videos when not in view to save bandwidth
function setupVideoViewportControl() {
    const videos = document.querySelectorAll('.video-card video');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });
    
    videos.forEach(video => observer.observe(video));
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    preloadVideos();
    setupLazyVideoLoading();
    setupVideoViewportControl();
});

console.log('🌿 Bubble Bliss Landing Page Loaded Successfully!');