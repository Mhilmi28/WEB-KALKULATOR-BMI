/**
 * BMI Calculator API
 * Berisi logika perhitungan dan kategori BMI
 */

class BMICalculator {
    /**
     * Menghitung BMI berdasarkan berat dan tinggi
     * @param {number} weight - Berat badan dalam kg
     * @param {number} height - Tinggi badan dalam cm
     * @returns {number} Nilai BMI
     */
    static calculateBMI(weight, height) {
        // Validasi input
        if (!weight || !height || weight <= 0 || height <= 0) {
            throw new Error('Berat dan tinggi harus berupa angka positif');
        }

        // Konversi tinggi dari cm ke meter
        const heightInMeters = height / 100;
        
        // Formula BMI: berat (kg) / (tinggi (m))^2
        const bmi = weight / (heightInMeters * heightInMeters);
        
        // Return BMI dengan 1 desimal
        return Math.round(bmi * 10) / 10;
    }

    /**
     * Mendapatkan kategori BMI
     * @param {number} bmi - Nilai BMI
     * @returns {Object} Object berisi kategori dan kelas CSS
     */
    static getCategory(bmi) {
        if (bmi < 18.5) {
            return {
                category: 'Kekurangan Berat Badan',
                class: 'underweight',
                description: 'BMI Anda menunjukkan berat badan kurang. Disarankan untuk meningkatkan asupan nutrisi dan berkonsultasi dengan ahli gizi.'
            };
        } else if (bmi >= 18.5 && bmi < 25) {
            return {
                category: 'Normal',
                class: 'normal',
                description: 'BMI Anda dalam kategori normal. Pertahankan pola makan sehat dan olahraga teratur untuk menjaga kesehatan.'
            };
        } else if (bmi >= 25 && bmi < 30) {
            return {
                category: 'Kelebihan Berat Badan',
                class: 'overweight',
                description: 'BMI Anda menunjukkan kelebihan berat badan. Disarankan untuk mengatur pola makan dan meningkatkan aktivitas fisik.'
            };
        } else {
            return {
                category: 'Obesitas',
                class: 'obese',
                description: 'BMI Anda menunjukkan obesitas. Sangat disarankan untuk berkonsultasi dengan dokter atau ahli gizi untuk program penurunan berat badan yang sehat.'
            };
        }
    }

    /**
     * Validasi input form
     * @param {number} weight - Berat badan
     * @param {number} height - Tinggi badan
     * @returns {Object} Object berisi status validasi dan pesan error
     */
    static validateInput(weight, height) {
        const errors = [];

        if (!weight || isNaN(weight)) {
            errors.push('Berat badan harus diisi dengan angka');
        } else if (weight <= 0) {
            errors.push('Berat badan harus lebih dari 0');
        } else if (weight > 500) {
            errors.push('Berat badan tidak valid (maksimal 500 kg)');
        }

        if (!height || isNaN(height)) {
            errors.push('Tinggi badan harus diisi dengan angka');
        } else if (height <= 0) {
            errors.push('Tinggi badan harus lebih dari 0');
        } else if (height > 300) {
            errors.push('Tinggi badan tidak valid (maksimal 300 cm)');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Mendapatkan rekomendasi berdasarkan BMI
     * @param {number} bmi - Nilai BMI
     * @returns {Array} Array berisi rekomendasi
     */
    static getRecommendations(bmi) {
        const recommendations = [];

        if (bmi < 18.5) {
            recommendations.push('Tingkatkan asupan kalori dengan makanan bergizi');
            recommendations.push('Konsumsi protein lebih banyak');
            recommendations.push('Pertimbangkan konsultasi dengan ahli gizi');
        } else if (bmi >= 18.5 && bmi < 25) {
            recommendations.push('Pertahankan pola makan seimbang');
            recommendations.push('Lakukan olahraga teratur 3-5 kali seminggu');
            recommendations.push('Jaga pola tidur yang cukup');
        } else if (bmi >= 25 && bmi < 30) {
            recommendations.push('Kurangi asupan kalori secara bertahap');
            recommendations.push('Tingkatkan aktivitas fisik');
            recommendations.push('Batasi makanan tinggi gula dan lemak');
        } else {
            recommendations.push('Konsultasi dengan dokter atau ahli gizi');
            recommendations.push('Buat program penurunan berat badan terstruktur');
            recommendations.push('Lakukan pemeriksaan kesehatan rutin');
        }

        return recommendations;
    }

    /**
     * Mendapatkan berat ideal berdasarkan tinggi
     * @param {number} height - Tinggi badan dalam cm
     * @returns {Object} Range berat ideal
     */
    static getIdealWeight(height) {
        const heightInMeters = height / 100;
        
        // BMI 18.5 untuk batas bawah, BMI 24.9 untuk batas atas
        const minWeight = 18.5 * (heightInMeters * heightInMeters);
        const maxWeight = 24.9 * (heightInMeters * heightInMeters);

        return {
            min: Math.round(minWeight * 10) / 10,
            max: Math.round(maxWeight * 10) / 10
        };
    }
}

// Export untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BMICalculator;
}
