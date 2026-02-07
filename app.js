/**
 * Main Application Controller
 * Menghubungkan UI dan API
 */

class BMIApp {
    constructor() {
        this.ui = new UIHandler();
        this.init();
    }

    /**
     * Inisialisasi aplikasi
     */
    init() {
        this.setupEventListeners();
        this.setupFormValidation();
        console.log('BMI Calculator initialized successfully');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        const form = document.getElementById('bmiForm');
        const resetBtn = document.getElementById('resetBtn');
        const weightInput = document.getElementById('weight');
        const heightInput = document.getElementById('height');

        // Submit form
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCalculate();
        });

        // Reset button
        resetBtn.addEventListener('click', () => {
            this.handleReset();
        });

        // Real-time validation
        weightInput.addEventListener('input', () => {
            this.validateField(weightInput);
        });

        heightInput.addEventListener('input', () => {
            this.validateField(heightInput);
        });

        // Enter key navigation
        weightInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                heightInput.focus();
            }
        });
    }

    /**
     * Setup form validation
     */
    setupFormValidation() {
        const inputs = document.querySelectorAll('input[type="number"]');
        
        inputs.forEach(input => {
            // Prevent negative values
            input.addEventListener('keydown', (e) => {
                if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                    e.preventDefault();
                }
            });

            // Format on blur
            input.addEventListener('blur', () => {
                if (input.value) {
                    input.value = parseFloat(input.value).toFixed(1);
                }
            });
        });
    }

    /**
     * Validasi individual field
     * @param {HTMLInputElement} input - Input element
     */
    validateField(input) {
        const value = parseFloat(input.value);
        let isValid = true;

        if (isNaN(value) || value <= 0) {
            isValid = false;
        }

        if (input.id === 'weight' && value > 500) {
            isValid = false;
        }

        if (input.id === 'height' && value > 300) {
            isValid = false;
        }

        this.ui.highlightInput(input, !isValid);
        return isValid;
    }

    /**
     * Handle calculate button click
     */
    handleCalculate() {
        try {
            // Ambil nilai input
            const weightInput = document.getElementById('weight');
            const heightInput = document.getElementById('height');
            const weight = parseFloat(weightInput.value);
            const height = parseFloat(heightInput.value);

            // Validasi input
            const validation = BMICalculator.validateInput(weight, height);
            
            if (!validation.isValid) {
                this.ui.showErrors(validation.errors);
                
                // Highlight input yang error
                if (isNaN(weight) || weight <= 0 || weight > 500) {
                    this.ui.highlightInput(weightInput, true);
                    this.ui.shakeElement(weightInput);
                }
                if (isNaN(height) || height <= 0 || height > 300) {
                    this.ui.highlightInput(heightInput, true);
                    this.ui.shakeElement(heightInput);
                }
                
                return;
            }

            // Clear highlight
            this.ui.highlightInput(weightInput, false);
            this.ui.highlightInput(heightInput, false);

            // Hitung BMI
            const bmi = BMICalculator.calculateBMI(weight, height);
            const category = BMICalculator.getCategory(bmi);
            const idealWeight = BMICalculator.getIdealWeight(height);

            // Tampilkan hasil dengan animasi
            this.ui.showResult(bmi, category);
            this.ui.animateCounter(bmi);
            
            // Tambahkan informasi berat ideal
            setTimeout(() => {
                this.ui.showIdealWeight(idealWeight);
            }, 500);

            // Log untuk debugging
            console.log({
                weight,
                height,
                bmi,
                category: category.category,
                idealWeight
            });

            // Simpan ke localStorage untuk history (optional)
            this.saveToHistory({
                date: new Date().toISOString(),
                weight,
                height,
                bmi,
                category: category.category
            });

        } catch (error) {
            console.error('Error calculating BMI:', error);
            this.ui.showErrors(['Terjadi kesalahan dalam perhitungan. Silakan coba lagi.']);
        }
    }

    /**
     * Handle reset button click
     */
    handleReset() {
        const form = document.getElementById('bmiForm');
        this.ui.resetForm(form);
        
        // Clear any highlights
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            this.ui.highlightInput(input, false);
        });

        console.log('Form reset');
    }

    /**
     * Simpan history ke localStorage
     * @param {Object} data - Data perhitungan
     */
    saveToHistory(data) {
        try {
            let history = JSON.parse(localStorage.getItem('bmiHistory') || '[]');
            
            // Batasi history maksimal 10 item
            if (history.length >= 10) {
                history.shift();
            }
            
            history.push(data);
            localStorage.setItem('bmiHistory', JSON.stringify(history));
            
            console.log('Saved to history:', data);
        } catch (error) {
            console.error('Error saving to history:', error);
        }
    }

    /**
     * Ambil history dari localStorage
     * @returns {Array} Array history
     */
    getHistory() {
        try {
            return JSON.parse(localStorage.getItem('bmiHistory') || '[]');
        } catch (error) {
            console.error('Error getting history:', error);
            return [];
        }
    }

    /**
     * Clear history
     */
    clearHistory() {
        try {
            localStorage.removeItem('bmiHistory');
            console.log('History cleared');
        } catch (error) {
            console.error('Error clearing history:', error);
        }
    }
}

// Inisialisasi aplikasi ketika DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    window.bmiApp = new BMIApp();
});

// Service Worker Registration (optional - untuk PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}
