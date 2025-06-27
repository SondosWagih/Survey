const allWords = [
    'فيل', 'قيثارة', 'قوس قزح', 'دراجة', 'جبل',
    'حاسوب', 'شطيرة', 'فراشة', 'منارة', 'سجادة',
    'تلسكوب', 'تنين', 'مظلة', 'بركان', 'كريستالة',
    'محيط', 'هرم', 'غابة', 'مركبة فضائية', 'قلعة',
    'ساحر', 'كنز', 'زرافة', 'ببغاء', 'شلال',
    'لوحة مفاتيح', 'دفتر ملاحظات', 'عباد الشمس', 'رعد', 'مدفأة',
    'بطريق', 'تلسكوب', 'كنغر', 'هامبرغر', 'كمان',
    'رائد فضاء', 'كب كيك', 'إعصار', 'فزاعة', 'ألعاب نارية',
    'ندفة ثلج', 'مصعد', 'حوت', 'بالون', 'قطار',
    'كاميرا', 'كوكب', 'ميكروسكوب', 'موزة', 'سُلَّم',

    // 100 كلمة جديدة
    'بيانو', 'حمار وحشي', 'كوخ جليدي', 'ديناصور', 'روبوت',
    'ترامبولين', 'صبار', 'مغناطيس', 'نمر', 'سفاري',
    'مرآة', 'مرساة', 'بطارية', 'فرشاة رسم', 'ملعقة',
    'مصباح يدوي', 'مكنسة', 'فانوس', 'حقيبة سفر', 'شمعة',
    'فطر', 'جبل جليدي', 'جندول', 'عربة يدوية', 'هليكوبتر',
    'ساكسفون', 'بيجامة', 'عقد', 'عشاء', 'نظارات سباحة',
    'سحابة', 'فلامنغو', 'فظّ (ولرس)', 'قلم رصاص', 'ممحاة',
    'طابعة', 'وحش', 'حظيرة', 'مفتاح ربط', 'باب',
    'مغرفة', 'حذاء رياضي', 'صابون', 'مرتبة', 'خوخة',
    'سحلية', 'كوكيز', 'سحابة', 'كرسي', 'زجاجة',
    'فرشاة أسنان', 'أحفورة', 'لوحة فنية', 'مسطرة', 'سحابة',
    'حوض استحمام', 'طائرة ورقية', 'نفق', 'كأس جائزة', 'قفاز',
    'دعسوقة', 'يرقة', 'خيمة', 'وسادة', 'قطعة دجاج مقلي',
    'سماعة طبيب', 'دبابة', 'باروكة', 'سلحفاة', 'مصاص دماء',
    'قلم تلوين', 'فقاعة', 'سيرك', 'وادي ضيق', 'قنفذ',
    'حبل', 'سلة', 'جبنة', 'راكون', 'دراجة',
    'مهد', 'هيكل عظمي', 'فشار', 'شاحنة إطفاء', 'ليمونة',
    'خنفساء', 'صفارة', 'شوكة', 'كرة أرضية', 'ممحاة مطاطية',
    'محمصة خبز', 'مثلث', 'هوكي', 'رخام', 'كابوس'
];

let currentPhase = 0;
let userResponses = [];
let mathAnswers = [];
let selectedWordSet = [];
let startTime;
let isEmailJSReady = false;

function calculateResults() {
    // Collect responses
    userResponses = [];
    for (let i = 0; i < 15; i++) {
        const input = document.getElementById(`recall${i}`);
        const value = input ? input.value.trim().toUpperCase() : '';
        userResponses.push(value);
    }
    
    const primacy = [0, 1, 2, 3, 4];
    const middle = [5, 6, 7, 8, 9];
    const recency = [10, 11, 12, 13, 14];
    
    let primacyCorrect = 0, middleCorrect = 0, recencyCorrect = 0;
    let primacyResults = [], middleResults = [], recencyResults = [];
    
    // Check primacy (beginning)
    primacy.forEach(pos => {
        const correct = userResponses.some(response => isSimilar(response, selectedWordSet[pos]));
        if (correct) primacyCorrect++;
        primacyResults.push({
            word: selectedWordSet[pos],
            correct: correct
        });
    });
    
    // Check middle
    middle.forEach(pos => {
        const correct = userResponses.some(response => isSimilar(response, selectedWordSet[pos]));
        if (correct) middleCorrect++;
        middleResults.push({
            word: selectedWordSet[pos],
            correct: correct
        });
    });
    
    // Check recency (end)
    recency.forEach(pos => {
        const correct = userResponses.some(response => isSimilar(response, selectedWordSet[pos]));
        if (correct) recencyCorrect++;
        recencyResults.push({
            word: selectedWordSet[pos],
            correct: correct
        });
    });
    
    return {
        primacyCorrect,
        middleCorrect,
        recencyCorrect,
        primacyResults,
        middleResults,
        recencyResults,
        totalCorrect: primacyCorrect + middleCorrect + recencyCorrect
    };
}

function normalizeWord(word) {
    // إزالة المسافات والعلامات
    return word.replace(/[^A-Z]/g, '');
}

// ثم تعديل دالة isSimilar لاستخدامها:
function isSimilar(word1, word2) {
    word1 = normalizeWord(word1);
    word2 = normalizeWord(word2);
    // ... باقي الدالة كما هي
}

function getRandomWords(count) {
    if (count > allWords.length) {
        console.error("Requested more words than available");
        return allWords.slice(0, count);
    }
    
    const shuffled = [...allWords];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}

// Initialize EmailJS
function initEmailJS() {
    try {
        emailjs.init("K57qkoHgLS4bkO4p8");
        isEmailJSReady = true;
        console.log("EmailJS initialized successfully");
    } catch (error) {
        console.error("Failed to initialize EmailJS:", error);
        isEmailJSReady = false;
    }
}

// Load EmailJS and initialize
function loadEmailJS() {
    return new Promise((resolve, reject) => {
        if (window.emailjs) {
            initEmailJS();
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3.2.0/dist/email.min.js';
        script.onload = () => {
            initEmailJS();
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Check consent
function checkConsent() {
    const consentCheckbox = document.getElementById('consentCheckbox');
    const consentButton = document.getElementById('consentButton');
    
    if (!consentCheckbox) {
        console.error("Consent checkbox not found");
        return;
    }
    
    if (consentCheckbox.checked) {
        currentPhase = 1;
        showPhase('instructionsPhase');
    } else {
        alert('يجب الموافقة على الشروط قبل المتابعة');
    }
}

// Update progress bar
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        const progress = (currentPhase / 5) * 100;
        progressFill.style.width = progress + '%';
    }
}

// Show specific phase
function showPhase(phaseId) {
    // Hide all phases
    document.querySelectorAll('.phase').forEach(p => {
        p.classList.remove('active');
        p.classList.add('hidden');
    });
    
    // Show target phase
    const phase = document.getElementById(phaseId);
    if (phase) {
        phase.classList.remove('hidden');
        phase.classList.add('active');
    } else {
        console.error(`Phase ${phaseId} غير موجودة`);
    }
    
    updateProgress();
}

// Start survey
function startSurvey() {
    if (currentPhase === 1) {
        currentPhase = 2;
        showPhase('demographicsPhase');
    }
}

function validateForm() {
    const age = document.getElementById('age').value;
    const education = document.getElementById('education').value;
    
    if (!age || !education) {
        alert('يرجى ملء جميع الحقول');
        return false;
    }
    
    if (age < 10 || age > 100) {
        alert('يرجى إدخال عمر صحيح بين 10 و100');
        return false;
    }
    
    return true;
}

// Validate demographic information
function validateDemographics() {
    const age = document.getElementById('age')?.value;
    const education = document.getElementById('education')?.value;
    
    if (!age || !education) {
        alert('يرجى ملء جميع المعلومات الشخصية');
        return false;
    }
    
    if (age < 10 || age > 100) {
        alert('يرجى إدخال عمر صحيح بين 10 و100');
        return false;
    }
    
    return true;
}

// Show word list
function showWordList() {
    if (!validateForm()) {
        return;
    }
    
    selectedWordSet = getRandomWords(15);

    currentPhase = 3;
    showPhase('learningPhase');
    
    const wordListEl = document.getElementById('wordList');
    if (wordListEl) {
        wordListEl.innerHTML = '';
        selectedWordSet.forEach((word, index) => {
            const wordEl = document.createElement('div');
            wordEl.className = 'word';
            wordEl.textContent = word;
            wordEl.style.animationDelay = `${index * 0.1}s`;
            wordListEl.appendChild(wordEl);
        });
    }

    // Start countdown
    startCountdown();
}

// Start countdown timer
function startCountdown() {
    let timeLeft = 30;
    const timerEl = document.getElementById('timer');
    
    if (!timerEl) {
        console.error("Timer element not found");
        return;
    }
    
    timerEl.textContent = timeLeft;
    
    const countdown = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            showDistraction();
        }
    }, 1000);
}

// Show distraction phase
function showDistraction() {
    currentPhase = 4;
    showPhase('distractionPhase');
    
    const mathEl = document.getElementById('mathProblems');
    if (!mathEl) {
        console.error("Math problems element not found");
        return;
    }
    
    mathEl.innerHTML = '';
    mathAnswers = [];
    
    // Generate 5 simple math problems
    for (let i = 0; i < 5; i++) {
        const a = Math.floor(Math.random() * 50) + 10;
        const b = Math.floor(Math.random() * 30) + 5;
        const operation = Math.random() > 0.5 ? '+' : '-';
        const answer = operation === '+' ? a + b : a - b;
        
        const problemDiv = document.createElement('div');
        problemDiv.className = 'math-problem';
        problemDiv.innerHTML = `
            <label>${a} ${operation} ${b} = 
                <input type="number" id="math${i}" class="math-input" style="width: 80px; margin-left: 10px;" required>
            </label>
        `;
        mathEl.appendChild(problemDiv);
        mathAnswers.push(answer);
    }
    
    // Show continue button after 15 seconds
    setTimeout(() => {
        const continueBtn = document.getElementById('continueBtn');
        if (continueBtn) {
            continueBtn.style.display = 'inline-block';
        }
    }, 15000);
}

// Start recall phase
function startRecall() {
    currentPhase = 5;
    showPhase('recallPhase');
    
    const inputsEl = document.getElementById('recallInputs');
    if (!inputsEl) {
        console.error("Recall inputs element not found");
        return;
    }
    
    inputsEl.innerHTML = '';
    
    for (let i = 0; i < 15; i++) {
        const recallInput = document.createElement('div');
        recallInput.className = 'recall-input';
        recallInput.setAttribute('data-number', i + 1);
        
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `recall${i}`;
        input.className = 'recall-word-input';
        input.placeholder = `كلمة  ${i + 1}`;
        input.maxLength = 50;
        
        recallInput.appendChild(input);
        inputsEl.appendChild(recallInput);
    }
}

// Calculate results
function calculateResults() {
    // Collect responses
    userResponses = [];
    for (let i = 0; i < 15; i++) {
        const input = document.getElementById(`recall${i}`);
        const value = input ? input.value.trim().toUpperCase() : '';
        userResponses.push(value);
    }
    
    const primacy = [0, 1, 2, 3, 4]; // First 5 positions
    const middle = [5, 6, 7, 8, 9]; // Middle 5 positions
    const recency = [10, 11, 12, 13, 14]; // Last 5 positions
    
    let primacyCorrect = 0, middleCorrect = 0, recencyCorrect = 0;
    let primacyResults = [], middleResults = [], recencyResults = [];
    
    // Check primacy (beginning)
    primacy.forEach(pos => {
        const correct = userResponses.includes(selectedWordSet[pos]);
        if (correct) primacyCorrect++;
        primacyResults.push({
            word: selectedWordSet[pos],
            correct: correct
        });
    });
    
    // Check middle
    middle.forEach(pos => {
        const correct = userResponses.includes(selectedWordSet[pos]);
        if (correct) middleCorrect++;
        middleResults.push({
            word: selectedWordSet[pos],
            correct: correct
        });
    });
    
    // Check recency (end)
    recency.forEach(pos => {
        const correct = userResponses.includes(selectedWordSet[pos]);
        if (correct) recencyCorrect++;
        recencyResults.push({
            word: selectedWordSet[pos],
            correct: correct
        });
    });
    
    return {
        primacyCorrect,
        middleCorrect,
        recencyCorrect,
        primacyResults,
        middleResults,
        recencyResults,
        totalCorrect: primacyCorrect + middleCorrect + recencyCorrect
    };
}

function showResults() {
    currentPhase = 6;
    showPhase('resultsPhase');
    
    // Do not display any results to the user
    const resultsEl = document.getElementById('results');
    if (resultsEl) {
        resultsEl.innerHTML = `
            <div style="text-align: center; margin-bottom: 30px;">
                <p style="font-size: 1.2em; margin-bottom: 20px;">
                شكراً لك على إكمال التجربة. اضغط على الزر أدناه لإرسال نتائجك.
                </p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin-bottom: 25px;">
                    <h3 style="color: #2c5282;">معلومة مهمة</h3>
                    <p>
                        جميع البيانات التي تقدمها ستبقى مجهولة الهوية، وستُستخدم فقط لأغراض البحث العلمي.
                    </p>
                </div>
            </div>
        `;
    }
}


// Reset survey
function resetSurvey() {
    currentPhase = 0;
    userResponses = [];
    mathAnswers = [];
    selectedWordSet = [];
    
    // Reset form fields
    const fields = ['name', 'education'];
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) element.value = '';
    });
    
    // Reset consent checkbox
    const consentCheckbox = document.getElementById('consentCheckbox');
    const consentButton = document.getElementById('consentButton');
    if (consentCheckbox) {
        consentCheckbox.checked = false;
    }
    if (consentButton) {
        consentButton.disabled = true;
    }
    
    // Show consent phase
    showPhase('consentPhase');
}

function shareResults() {
    if (!validateDemographics()) {
        alert('يرجى إكمال المعلومات الديموغرافية قبل إرسال نتائجك.');
        return;
    }

    if (!isEmailJSReady) {
        alert('خدمة البريد الإلكتروني غير متاحة حالياً. يرجى المحاولة لاحقاً.');
        return;
    }
    
    // Show loading overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('show');
    }
    
    // Calculate results
    const results = calculateResults();
    const age = document.getElementById('age').value;
    const education = document.getElementById('education').value;
    const totalScore = results.totalCorrect;
    const percentageScore = (results.totalCorrect / 15 * 100).toFixed(1) + '%';
    const effectStrength = ((parseFloat((results.primacyCorrect / 5 * 100).toFixed(1)) +
                             parseFloat((results.recencyCorrect / 5 * 100).toFixed(1))) / 2 -
                             parseFloat((results.middleCorrect / 5 * 100).toFixed(1))).toFixed(1);

    // Send email with full analysis
    emailjs.send("service_teucnvy", "template_2luekhd", {
        age: age,
        education: education,
        totalScore: totalScore,
        percentageScore: percentageScore,
        effectStrength: effectStrength,
        wordList: selectedWordSet.join(', '),
        userResponses: userResponses.filter(r => r).join(', '),
        analysis: generateFullAnalysis(results)
    })
    .then(function(response) {
        // Show thank you message after sending
        const resultsEl = document.getElementById('results');
        if (resultsEl) {
            resultsEl.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <h3 style="color: #28a745;">تم إرسال النتائج بنجاح!</h3>
                    <p>شكراً جزيلاً لمشاركتك في هذا البحث العلمي.</p>
                    <p>سيتم استخدام بياناتك بشكل مجهول ولأغراض البحث فقط.</p>
                </div>
            `;
        }
        
        if (loadingOverlay) {
            loadingOverlay.classList.remove('show');
        }
    })
    .catch(function(error) {
        alert("حدث خطأ أثناء إرسال النتائج. يرجى المحاولة مرة أخرى.");
        console.error("Email sending failed:", error);
        if (loadingOverlay) {
            loadingOverlay.classList.remove('show');
        }
    });
}

// Event listeners setup
function setupEventListeners() {
    // Consent checkbox
    const consentCheckbox = document.getElementById('consentCheckbox');
    const consentButton = document.getElementById('consentButton');
    
    if (consentCheckbox && consentButton) {
        consentCheckbox.addEventListener('change', function() {
            consentButton.disabled = !this.checked;
        });
    }
    
    // Form validation
    const ageInput = document.getElementById('age');
    if (ageInput) {
        ageInput.addEventListener('input', function() {
            const age = parseInt(this.value);
            if (age < 10 || age > 100) {
                this.setCustomValidity('يجب أن يكون العمر بين 10 و100');
            } else {
                this.setCustomValidity('');
            }
        });
    }
}

// Initialize application
function init() {
    console.log("Initializing memory test application...");
    
    // Load EmailJS
    loadEmailJS().catch(error => {
        console.error("Failed to load EmailJS:", error);
    });
    
    // Setup event listeners
    setupEventListeners();
    
    // Show initial phase
    showPhase('consentPhase');
    
    console.log("Application initialized successfully");
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function generateFullAnalysis(results) {
    const { primacyCorrect, middleCorrect, recencyCorrect, totalCorrect } = results;
    const primacyPercent = (primacyCorrect / 5 * 100).toFixed(1);
    const middlePercent = (middleCorrect / 5 * 100).toFixed(1);
    const recencyPercent = (recencyCorrect / 5 * 100).toFixed(1);
    const effectStrength = ((parseFloat(primacyPercent) + parseFloat(recencyPercent)) / 2 - parseFloat(middlePercent)).toFixed(1);
    
    return `
        📊 Full Results:
        - Remembered Words: ${totalCorrect}/15 (${(totalCorrect/15*100).toFixed(1)}%)
        - First Words (Primacy): ${primacyCorrect}/5 (${primacyPercent}%)
        - Middle Words: ${middleCorrect}/5 (${middlePercent}%)
        - Last Words (Recency): ${recencyCorrect}/5 (${recencyPercent}%)
        - Effect Strength: ${effectStrength}%
        
        🔍 Analysis:
        ${(primacyPercent > middlePercent || recencyPercent > middlePercent) 
            ? 'A serial position effect was observed, with better recall of the first and/or last words compared to the middle ones.'
            : 'No clear serial position effect was observed. Recall was consistent across different positions.'}
        
        📝 Original Word List:
        ${selectedWordSet.join(', ')}
        
        📝 Participant's Responses:
        ${userResponses.filter(r => r).join(', ')}
    `;
}


