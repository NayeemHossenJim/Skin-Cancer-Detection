// DOM Elements
const fileInput = document.getElementById('fileInput');
const uploadArea = document.getElementById('uploadArea');
const processingOverlay = document.getElementById('processingOverlay');
const resultsSection = document.getElementById('resultsSection');
const resultImage = document.getElementById('resultImage');
const totalObjects = document.getElementById('totalObjects');
const detectionsList = document.getElementById('detectionsList');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeAnimations();
});

// Event Listeners
function initializeEventListeners() {
    // File input change
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop functionality
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    uploadArea.addEventListener('click', () => fileInput.click());
    
    // Navigation smooth scrolling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Keyboard accessibility
    document.addEventListener('keydown', handleKeyDown);
}

// File handling functions
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        validateAndProcessFile(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        validateAndProcessFile(files[0]);
    }
}

// File validation and processing
function validateAndProcessFile(file) {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        showNotification('Please select a valid image file (JPG, PNG, GIF, WebP)', 'error');
        return;
    }
    
    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
        showNotification('File size must be less than 10MB', 'error');
        return;
    }
    
    processImage(file);
}

// Image processing
async function processImage(file) {
    try {
        showProcessing(true);
        
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/detect/', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        displayResults(result);
        
    } catch (error) {
        console.error('Error processing image:', error);
        showNotification('Error processing image. Please try again.', 'error');
    } finally {
        showProcessing(false);
    }
}

// Display results
function displayResults(result) {
    // Show results section with animation
    resultsSection.style.display = 'block';
    setTimeout(() => {
        resultsSection.style.opacity = '1';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    
    // Display processed image
    resultImage.src = result.image;
    resultImage.onload = () => {
        resultImage.style.opacity = '1';
    };
    
    // Update total objects count with animation
    animateNumber(totalObjects, result.total_objects);
    
    // Display detections list
    displayDetectionsList(result.detections);
    
    // Show success notification
    showNotification(`Successfully detected ${result.total_objects} objects!`, 'success');
}

// Display detections list
function displayDetectionsList(detections) {
    detectionsList.innerHTML = '';
    
    detections.forEach((detection, index) => {
        const detectionItem = createDetectionItem(detection, index);
        detectionsList.appendChild(detectionItem);
        
        // Animate item appearance
        setTimeout(() => {
            detectionItem.style.opacity = '1';
            detectionItem.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Create detection item element
function createDetectionItem(detection, index) {
    const item = document.createElement('div');
    item.className = 'detection-item';
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.3s ease';
    
    const confidence = Math.round(detection.confidence * 100);
    const [x1, y1, x2, y2] = detection.box.map(coord => Math.round(coord));
    
    item.innerHTML = `
        <div class="detection-header">
            <span class="detection-class">${detection.class}</span>
            <span class="detection-confidence">${confidence}%</span>
        </div>
        <div class="detection-coordinates">
            Box: (${x1}, ${y1}) to (${x2}, ${y2})
        </div>
    `;
    
    return item;
}

// UI Helper functions
function showProcessing(show) {
    if (show) {
        processingOverlay.style.display = 'flex';
        uploadArea.style.pointerEvents = 'none';
    } else {
        processingOverlay.style.display = 'none';
        uploadArea.style.pointerEvents = 'auto';
    }
}

function animateNumber(element, targetNumber) {
    const duration = 1000;
    const start = parseInt(element.textContent) || 0;
    const increment = (targetNumber - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
            current = targetNumber;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'error' ? 'rgba(255, 107, 107, 0.9)' : 'rgba(40, 167, 69, 0.9)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Navigation and scrolling
function handleNavigation(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        event.target.classList.add('active');
    }
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

// Utility functions
function resetDetection() {
    // Reset file input
    fileInput.value = '';
    
    // Hide results section
    resultsSection.style.opacity = '0';
    setTimeout(() => {
        resultsSection.style.display = 'none';
    }, 300);
    
    // Scroll back to upload section
    document.querySelector('.upload-section').scrollIntoView({ behavior: 'smooth' });
    
    showNotification('Ready for new detection!', 'info');
}

function downloadImage() {
    const link = document.createElement('a');
    link.download = 'detection_result.jpg';
    link.href = resultImage.src;
    link.click();
    
    showNotification('Image downloaded successfully!', 'success');
}

// Keyboard accessibility
function handleKeyDown(event) {
    if (event.key === 'Escape') {
        if (resultsSection.style.display === 'block') {
            resetDetection();
        }
    }
    
    if (event.key === 'Enter' && event.target === uploadArea) {
        fileInput.click();
    }
}

// Initialize animations
function initializeAnimations() {
    // Parallax effect for background circles
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        document.querySelectorAll('.circle').forEach((circle, index) => {
            const speed = (index + 1) * 0.1;
            circle.style.transform = `translateY(${parallax * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add resize listener for responsive handling
window.addEventListener('resize', debounce(() => {
    // Handle any responsive adjustments here
    console.log('Window resized');
}, 250));

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}