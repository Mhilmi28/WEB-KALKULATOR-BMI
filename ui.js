/**
 * UI Handler
 * Mengelola interaksi dan tampilan UI
 */

class UIHandler {
    constructor() {
        this.resultContainer = document.getElementById('result');
        this.bmiValueElement = document.getElementById('bmiValue');
        this.categoryValueElement = document.getElementById('categoryValue');
        this.bmiDescriptionElement = document.getElementById('bmiDescription');
    }

    /**
     * Menampilkan hasil perhitungan BMI
     * @param {number} bmi - Nilai BMI
     * @param {Object} category - Object kategori BMI
     */
    showResult(bmi, category) {
        // Set nilai BMI
        this.bmiValueElement.textContent = bmi;

        // Set kategori
        this.categoryValueElement.textContent = category.category;
        this.categoryValueElement.className = `category-value ${category.class}`;

        // Set deskripsi
        this.bmiDescriptionElement.textContent = category.description;

        // Tampilkan container hasil dengan animasi
        this.resultContainer.classList.remove('hidden');
        
        // Scroll ke hasil
        this.resultContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }

    /**
     * Menyembunyikan hasil
     */
    hideResult() {
        this.resultContainer.classList.add('hidden');
    }

    /**
     * Menampilkan pesan error
     * @param {Array} errors - Array pesan error
     */
    showErrors(errors) {
        const errorMessage = errors.join('\n');
        alert(errorMessage);
    }

    /**
     * Mereset form
     * @param {HTMLFormElement} form - Form element
     */
    resetForm(form) {
        form.reset();
        this.hideResult();
        
        // Focus ke input pertama
        const firstInput = form.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    }

    /**
     * Menampilkan loading state pada button
     * @param {HTMLButtonElement} button - Button element
     * @param {boolean} isLoading - Status loading
     */
    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.dataset.originalText = button.textContent;
            button.textContent = 'Menghitung...';
        } else {
            button.disabled = false;
            button.textContent = button.dataset.originalText || 'Hitung BMI';
        }
    }

    /**
     * Highlight input yang error
     * @param {HTMLInputElement} input - Input element
     * @param {boolean} hasError - Status error
     */
    highlightInput(input, hasError) {
        if (hasError) {
            input.style.borderColor = '#DC3545';
            input.style.backgroundColor = '#FFE5E5';
        } else {
            input.style.borderColor = '';
            input.style.backgroundColor = '';
        }
    }

    /**
     * Menampilkan tooltip
     * @param {HTMLElement} element - Element target
     * @param {string} message - Pesan tooltip
     */
    showTooltip(element, message) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = message;
        tooltip.style.cssText = `
            position: absolute;
            background-color: #333;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 0.9rem;
            z-index: 1000;
            white-space: nowrap;
        `;

        element.style.position = 'relative';
        element.appendChild(tooltip);

        // Remove tooltip after 3 seconds
        setTimeout(() => {
            tooltip.remove();
        }, 3000);
    }

    /**
     * Menampilkan informasi berat ideal
     * @param {Object} idealWeight - Range berat ideal
     */
    showIdealWeight(idealWeight) {
        const idealWeightText = `Berat ideal Anda: ${idealWeight.min} - ${idealWeight.max} kg`;
        
        // Tambahkan info di deskripsi
        const currentDescription = this.bmiDescriptionElement.textContent;
        this.bmiDescriptionElement.textContent = 
            `${currentDescription}\n\n${idealWeightText}`;
    }

    /**
     * Format number dengan pemisah ribuan
     * @param {number} num - Angka yang akan diformat
     * @returns {string} Angka terformat
     */
    formatNumber(num) {
        return num.toLocaleString('id-ID', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        });
    }

    /**
     * Animasi counter untuk nilai BMI
     * @param {number} targetValue - Nilai target
     * @param {number} duration - Durasi animasi (ms)
     */
    animateCounter(targetValue, duration = 1000) {
        const startValue = 0;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (targetValue - startValue) * easeOut;
            
            this.bmiValueElement.textContent = currentValue.toFixed(1);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    /**
     * Menambahkan efek shake pada element
     * @param {HTMLElement} element - Element target
     */
    shakeElement(element) {
        element.style.animation = 'shake 0.5s';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
}

// Style untuk animasi shake
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .tooltip {
        animation: fadeIn 0.3s ease;
    }
`;
document.head.appendChild(shakeStyle);
