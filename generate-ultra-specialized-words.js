const fs = require('fs');
const path = require('path');

// Read existing dictionary
const filePath = path.join(__dirname, 'public', 'data', 'dictionary.json');
let existingData = [];
try {
  existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} catch (err) {
  console.log('No existing dictionary found, starting fresh');
}

console.log(`Existing entries: ${existingData.length}`);

// Create a set of existing Korean words to avoid duplicates
const existingKoreanWords = new Set(existingData.map(entry => entry.korean));

// NEW Advanced Korean words - NOT basic words, greetings, or basic verbs
// Format: [korean, myanmar, category, koreanExample, englishExample]
const newAdvancedWords = [
  // Ultra-specialized Advanced Terms
  ["전자현미경", "အီလက်ထရွန် မိုက်ခရိုစကုပ်ပီ", "Technology", "전자현미경을 사용합니다.", "I use electron microscopy."],
  ["원자력현미경", "အက်တမ် စွမ်းအား မိုက်ခရိုစကုပ်ပီ", "Technology", "원자력현미경을 연구합니다.", "I study atomic force microscopy."],
  ["초음파현미경", "အလွန်မြန်သော အသံ မိုက်ခရိုစကုပ်ပီ", "Technology", "초음파현미경을 전공합니다.", "I major in ultrasonic microscopy."],
  ["공초점현미경", "ပေါင်းစည်းသော အာရုံစူးစိုက်မှု မိုက်ခရိုစကုပ်ပီ", "Technology", "공초점현미경을 공부합니다.", "I study confocal microscopy."],
  ["형광현미경", "ဖလူရိုရှင်း မိုက်ခရိုစကုပ်ပီ", "Technology", "형광현미경을 연구합니다.", "I study fluorescence microscopy."],
  ["주사전자현미경", "ရှာဖွေသော အီလက်ထရွန် မိုက်ခရိုစကုပ်ပီ", "Technology", "주사전자현미경을 전공합니다.", "I major in scanning electron microscopy."],
  ["투과전자현미경", "ဖြတ်သန်းသော အီလက်ထရွန် မိုက်ခရိုစကုပ်ပီ", "Technology", "투과전자현미경을 공부합니다.", "I study transmission electron microscopy."],
  ["초고해상도현미경", "အလွန်မြန်သော ဖြေရှင်းနိုင်မှု မိုက်ခရိုစကုပ်ပီ", "Technology", "초고해상도현미경을 연구합니다.", "I study super-resolution microscopy."],
  ["양자현미경", "ကွမ်တမ် မိုက်ခရိုစကုပ်ပီ", "Technology", "양자현미경을 전공합니다.", "I major in quantum microscopy."],
  ["나노현미경", "နာနို မိုက်ခရိုစကုပ်ပီ", "Technology", "나노현미경을 공부합니다.", "I study nanomicroscopy."],
  
  // Advanced Spectroscopy Techniques
  ["라만분광법", "ရာမန် စပက်ထရိုစကုပ်ပီ", "Science", "라만분광법을 연구합니다.", "I study Raman spectroscopy."],
  ["적외선분광법", "အနီအောက်ရောင်ခြည် စပက်ထရိုစကုပ်ပီ", "Science", "적외선분광법을 전공합니다.", "I major in infrared spectroscopy."],
  ["자외선분광법", "ခရမ်းလွန်ရောင်ခြည် စပက်ထရိုစကုပ်ပီ", "Science", "자외선분광법을 공부합니다.", "I study ultraviolet spectroscopy."],
  ["핵자기공명", "နျူကလီးယား သံလိုက် ပြန်လည်ထူထောင်ရေး", "Science", "핵자기공명을 연구합니다.", "I study nuclear magnetic resonance."],
  ["질량분석법", "ထုထည် ခွဲခြမ်းစိတ်ဖြာမှု", "Science", "질량분석법을 전공합니다.", "I major in mass spectrometry."],
  ["X선결정학", "X-ရောင်ခြည် ပုံဆောင်ခဲ", "Science", "X선결정학을 공부합니다.", "I study X-ray crystallography."],
  ["중성자산란", "အလယ်အလတ် ဖြန့်ဝေမှု", "Science", "중성자산란을 연구합니다.", "I study neutron scattering."],
  ["전자스핀공명", "အီလက်ထရွန် လည်ပတ်မှု ပြန်လည်ထူထောင်ရေး", "Science", "전자스핀공명을 전공합니다.", "I major in electron spin resonance."],
  ["원자흡수분광법", "အက်တမ် စုပ်ယူမှု စပက်ထရိုစကုပ်ပီ", "Science", "원자흡수분광법을 공부합니다.", "I study atomic absorption spectroscopy."],
  ["형광분광법", "ဖလူရိုရှင်း စပက်ထရိုစကုပ်ပီ", "Science", "형광분광법을 연구합니다.", "I study fluorescence spectroscopy."],
  
  // Advanced Computational Methods
  ["몬테카를로시뮬레이션", "မွန်တီကာလို ပုံတူ", "Computer Science", "몬테카를로시뮬레이션을 수행합니다.", "I perform Monte Carlo simulations."],
  ["분자동역학시뮬레이션", "မော်လီကျူး လှုပ်ရှားမှု ပုံတူ", "Computer Science", "분자동역학시뮬레이션을 연구합니다.", "I study molecular dynamics simulations."],
  ["양자몬테카를로", "ကွမ်တမ် မွန်တီကာလို", "Computer Science", "양자몬테카를로를 전공합니다.", "I major in quantum Monte Carlo."],
  ["유한요소법", "အကန့်အသတ် ဒြပ်စင်", "Computer Science", "유한요소법을 공부합니다.", "I study finite element method."],
  ["유한차분법", "အကန့်အသတ် ကွာခြားမှု", "Computer Science", "유한차분법을 연구합니다.", "I study finite difference method."],
  ["유한체적법", "အကန့်အသတ် ထုထည်", "Computer Science", "유한체적법을 전공합니다.", "I major in finite volume method."],
  ["격자볼츠만방법", "ဂရစ် ဘော့ဇ်မန် နည်းလမ်း", "Computer Science", "격자볼츠만방법을 공부합니다.", "I study lattice Boltzmann method."],
  ["격자양자색역학", "ဂရစ် ကွမ်တမ် ရောင်စဉ် စွမ်းအား", "Computer Science", "격자양자색역학을 연구합니다.", "I study lattice quantum chromodynamics."],
  ["밀도범함수이론", "သိပ်သည်းမှု လုပ်ဆောင်ချက် သီအိုရီ", "Computer Science", "밀도범함수이론을 전공합니다.", "I major in density functional theory."],
  ["하트리폭방법", "ဟာထရီ-ဖော့ခ် နည်းလမ်း", "Computer Science", "하트리폭방법을 공부합니다.", "I study Hartree-Fock method."],
  
  // Advanced Biotechnology Techniques
  ["PCR증폭", "PCR တိုးမြှင့်မှု", "Biology", "PCR증폭을 수행합니다.", "I perform PCR amplification."],
  ["DNA시퀀싱", "DNA အစဉ်", "Biology", "DNA시퀀싱을 연구합니다.", "I study DNA sequencing."],
  ["RNA시퀀싱", "RNA အစဉ်", "Biology", "RNA시퀀싱을 전공합니다.", "I major in RNA sequencing."],
  ["단백질결정화", "ပရိုတိန်း ပုံဆောင်ခဲ", "Biology", "단백질결정화를 공부합니다.", "I study protein crystallization."],
  ["크로마토그래피", "အရောင်ခွဲခြမ်းစိတ်ဖြာမှု", "Biology", "크로마토그래피를 연구합니다.", "I study chromatography."],
  ["전기영동", "လျှပ်စစ် ရွေ့လျားမှု", "Biology", "전기영동을 전공합니다.", "I major in electrophoresis."],
  ["서던블롯", "ဆာသန် ဘလော့", "Biology", "서던블롯을 공부합니다.", "I study Southern blotting."],
  ["노던블롯", "နော်သန် ဘလော့", "Biology", "노던블롯을 연구합니다.", "I study Northern blotting."],
  ["웨스턴블롯", "ဝက်စတန် ဘလော့", "Biology", "웨스턴블롯을 전공합니다.", "I major in Western blotting."],
  ["면역형광법", "ကိုယ်ခံအား ဖလူရိုရှင်း", "Biology", "면역형광법을 공부합니다.", "I study immunofluorescence."],
  
  // Advanced Materials Processing
  ["화학기상증착", "ဓာတုဗေဒ ရေငွေ့ အလွှာထည့်သွင်းမှု", "Engineering", "화학기상증착을 연구합니다.", "I study chemical vapor deposition."],
  ["물리기상증착", "ရူပဗေဒ ရေငွေ့ အလွှာထည့်သွင်းမှု", "Engineering", "물리기상증착을 전공합니다.", "I major in physical vapor deposition."],
  ["원자층증착", "အက်တမ် အလွှာ အလွှာထည့်သွင်းမှု", "Engineering", "원자층증착을 공부합니다.", "I study atomic layer deposition."],
  ["분자빔에피택시", "မော်လီကျူး ရောင်ခြည် အပေါ်ယံအလွှာ", "Engineering", "분자빔에피택시를 연구합니다.", "I study molecular beam epitaxy."],
  ["금속유기화학기상증착", "သတ္တု အော်ဂဲနစ် ဓာတုဗေဒ ရေငွေ့ အလွှာထည့်သွင်းမှု", "Engineering", "금속유기화학기상증착을 전공합니다.", "I major in metal-organic chemical vapor deposition."],
  ["플라즈마증착", "ပလာစမာ အလွှာထည့်သွင်းမှု", "Engineering", "플라즈마증착을 공부합니다.", "I study plasma deposition."],
  ["스퍼터링", "ဖြန်းဆေးထည့်သွင်းမှု", "Engineering", "스퍼터링을 연구합니다.", "I study sputtering."],
  ["레이저증착", "လေဆာ အလွှာထည့်သွင်းမှု", "Engineering", "레이저증착을 전공합니다.", "I major in laser deposition."],
  ["전자빔증착", "အီလက်ထရွန် ရောင်ခြည် အလွှာထည့်သွင်းမှု", "Engineering", "전자빔증착을 공부합니다.", "I study electron beam deposition."],
  ["이온빔증착", "အိုင်ယွန် ရောင်ခြည် အလွှာထည့်သွင်းမှု", "Engineering", "이온빔증착을 연구합니다.", "I study ion beam deposition."],
  
  // Advanced Analysis Techniques
  ["열분석", "အပူ ခွဲခြမ်းစိတ်ဖြာမှု", "Science", "열분석을 수행합니다.", "I perform thermal analysis."],
  ["시차주사열량법", "ကွာခြားမှု ရှာဖွေသော အပူ ထုထည်", "Science", "시차주사열량법을 연구합니다.", "I study differential scanning calorimetry."],
  ["열중량분석", "အပူ ထုထည် ခွဲခြမ်းစိတ်ဖြာမှု", "Science", "열중량분석을 전공합니다.", "I major in thermogravimetric analysis."],
  ["열기계분석", "အပူ စက်မှု ခွဲခြမ်းစိတ်ဖြာမှု", "Science", "열기계분석을 공부합니다.", "I study thermomechanical analysis."],
  ["동적기계분석", "လှုပ်ရှားမှု စက်မှု ခွဲခြမ်းစိတ်ဖြာမှု", "Science", "동적기계분석을 연구합니다.", "I study dynamic mechanical analysis."],
  ["표면분석", "မျက်နှာပြင် ခွဲခြမ်းစိတ်ဖြာမှု", "Science", "표면분석을 전공합니다.", "I major in surface analysis."],
  ["X선광전자분광법", "X-ရောင်ခြည် အလင်း အီလက်ထရွန် စပက်ထရိုစကုပ်ပီ", "Science", "X선광전자분광법을 공부합니다.", "I study X-ray photoelectron spectroscopy."],
  ["오제전자분광법", "အော်ဂျာ အီလက်ထရွန် စပက်ထရိုစကုပ်ပီ", "Science", "오제전자분광법을 연구합니다.", "I study Auger electron spectroscopy."],
  ["이차이온질량분석", "ဒုတိယ အိုင်ယွန် ထုထည် ခွဲခြမ်းစိတ်ဖြာမှု", "Science", "이차이온질량분석을 전공합니다.", "I major in secondary ion mass spectrometry."],
  ["주사탐침현미경", "ရှာဖွေသော စူးစမ်းရှာဖွေမှု မိုက်ခရိုစကုပ်ပီ", "Science", "주사탐침현미경을 공부합니다.", "I study scanning probe microscopy."],
  
  // Additional Ultra-Specialized Terms
  ["초음파분쇄", "အလွန်မြန်သော အသံ ကြိတ်ချေမှု", "Engineering", "초음파분쇄를 수행합니다.", "I perform ultrasonic fragmentation."],
  ["초음파추출", "အလွန်မြန်သော အသံ ထုတ်ယူမှု", "Engineering", "초음파추출을 연구합니다.", "I study ultrasonic extraction."],
  ["초음파세정", "အလွန်မြန်သော အသံ သန့်ရှင်းမှု", "Engineering", "초음파세정을 전공합니다.", "I major in ultrasonic cleaning."],
  ["초음파용접", "အလွန်မြန်သော အသံ ပေါင်းစပ်မှု", "Engineering", "초음파용접을 공부합니다.", "I study ultrasonic welding."],
  ["초음파가공", "အလွန်မြန်သော အသံ လုပ်ဆောင်မှု", "Engineering", "초음파가공을 연구합니다.", "I study ultrasonic processing."],
  ["레이저가공", "လေဆာ လုပ်ဆောင်မှု", "Engineering", "레이저가공을 전공합니다.", "I major in laser processing."],
  ["레이저용접", "လေဆာ ပေါင်းစပ်မှု", "Engineering", "레이저용접을 공부합니다.", "I study laser welding."],
  ["레이저절단", "လေဆာ ဖြတ်တောက်မှု", "Engineering", "레이저절단을 연구합니다.", "I study laser cutting."],
  ["레이저드릴링", "လေဆာ တူးဖော်မှု", "Engineering", "레이저드릴링을 전공합니다.", "I major in laser drilling."],
  ["레이저마킹", "လေဆာ အမှတ်အသား", "Engineering", "레이저마킹을 공부합니다.", "I study laser marking."],
  
  // Advanced Characterization Methods
  ["표면거칠기측정", "မျက်နှာပြင် ကြမ်းတမ်းမှု တိုင်းတာမှု", "Engineering", "표면거칠기측정을 수행합니다.", "I perform surface roughness measurement."],
  ["경도측정", "ခိုင်မာမှု တိုင်းတာမှု", "Engineering", "경도측정을 연구합니다.", "I study hardness measurement."],
  ["인장시험", "ဆွဲဆန့်မှု စမ်းသပ်မှု", "Engineering", "인장시험을 전공합니다.", "I major in tensile testing."],
  ["압축시험", "ဖိသိပ်မှု စမ်းသပ်မှု", "Engineering", "압축시험을 공부합니다.", "I study compression testing."],
  ["굽힘시험", "ကွေးညွှတ်မှု စမ်းသပ်မှု", "Engineering", "굽힘시험을 연구합니다.", "I study bending testing."],
  ["피로시험", "ပင်ပန်းနွမ်းနယ်မှု စမ်းသပ်မှု", "Engineering", "피로시험을 전공합니다.", "I major in fatigue testing."],
  ["충격시험", "ရိုက်ခတ်မှု စမ်းသပ်မှု", "Engineering", "충격시험을 공부합니다.", "I study impact testing."],
  ["마모시험", "ပွန်းပဲ့မှု စမ်းသပ်မှု", "Engineering", "마모시험을 연구합니다.", "I study wear testing."],
  ["부식시험", "ချေးတက်မှု စမ်းသပ်မှု", "Engineering", "부식시험을 전공합니다.", "I major in corrosion testing."],
  ["크리프시험", "တဖြည်းဖြည်း ပြောင်းလဲမှု စမ်းသပ်မှု", "Engineering", "크리프시험을 공부합니다.", "I study creep testing."],
  
  // Advanced Processing Techniques
  ["전기방사", "လျှပ်စစ် ရှေးခေတ်စက်", "Engineering", "전기방사를 수행합니다.", "I perform electrospinning."],
  ["전기도금", "လျှပ်စစ် သတ္တုဖုံးအုပ်မှု", "Engineering", "전기도금을 연구합니다.", "I study electroplating."],
  ["전기화학연마", "လျှပ်စစ် ဓာတုဗေဒ ချောမွေ့စေမှု", "Engineering", "전기화학연마를 전공합니다.", "I major in electrochemical polishing."],
  ["전기화학가공", "လျှပ်စစ် ဓာတုဗေဒ လုပ်ဆောင်မှု", "Engineering", "전기화학가공을 공부합니다.", "I study electrochemical processing."],
  ["전기화학에칭", "လျှပ်စစ် ဓာတုဗေဒ ထွင်းထုမှု", "Engineering", "전기화학에칭을 연구합니다.", "I study electrochemical etching."],
  ["플라즈마에칭", "ပလာစမာ ထွင်းထုမှု", "Engineering", "플라즈마에칭을 전공합니다.", "I major in plasma etching."],
  ["플라즈마처리", "ပလာစမာ လုပ်ဆောင်မှု", "Engineering", "플라즈마처리를 공부합니다.", "I study plasma processing."],
  ["플라즈마증착", "ပလာစမာ အလွှာထည့်သွင်းမှု", "Engineering", "플라즈마증착을 연구합니다.", "I study plasma deposition."],
  ["플라즈마용사", "ပလာစမာ ဖြန်းဆေးထည့်သွင်းမှု", "Engineering", "플라즈마용사를 전공합니다.", "I major in plasma spraying."],
  ["플라즈마나이트리딩", "ပလာစမာ နိုက်ထရိုဂျင် ထည့်သွင်းမှု", "Engineering", "플라즈마나이트리딩을 공부합니다.", "I study plasma nitriding."],
  
  // Advanced Analysis & Testing
  ["열팽창계수", "အပူ ဖြန့်ထွက်မှု ကိန်းသေ", "Science", "열팽창계수를 측정합니다.", "I measure thermal expansion coefficient."],
  ["열전도율", "အပူ လျှပ်စစ်လမ်းကြောင်း", "Science", "열전도율을 연구합니다.", "I study thermal conductivity."],
  ["열용량", "အပူ ထုထည်", "Science", "열용량을 전공합니다.", "I major in heat capacity."],
  ["비열", "အထူး အပူ", "Science", "비열을 공부합니다.", "I study specific heat."],
  ["열확산율", "အပူ ဖြန့်ဝေမှု", "Science", "열확산율을 연구합니다.", "I study thermal diffusivity."],
  ["전기전도율", "လျှပ်စစ် လျှပ်စစ်လမ်းကြောင်း", "Science", "전기전도율을 전공합니다.", "I major in electrical conductivity."],
  ["저항률", "ခုခံမှု", "Science", "저항률을 공부합니다.", "I study resistivity."],
  ["유전율", "လျှပ်စစ်လမ်းကြောင်း စွမ်းအား", "Science", "유전율을 연구합니다.", "I study permittivity."],
  ["투자율", "သံလိုက် စွမ်းအား", "Science", "투자율을 전공합니다.", "I major in permeability."],
  ["자화율", "သံလိုက် စွမ်းအား", "Science", "자화율을 공부합니다.", "I study magnetic susceptibility."],
  
  // Advanced Manufacturing Processes
  ["압출성형", "ဖိသိပ်ထုတ်လုပ်မှု", "Engineering", "압출성형을 수행합니다.", "I perform extrusion molding."],
  ["사출성형", "ထိုးသွင်းထုတ်လုပ်မှု", "Engineering", "사출성형을 연구합니다.", "I study injection molding."],
  ["압축성형", "ဖိသိပ် ထုတ်လုပ်မှု", "Engineering", "압축성형을 전공합니다.", "I major in compression molding."],
  ["취성형", "လေမှုတ်ထုတ်လုပ်မှု", "Engineering", "취성형을 공부합니다.", "I study blow molding."],
  ["회전성형", "လည်ပတ် ထုတ်လုပ်မှု", "Engineering", "회전성형을 연구합니다.", "I study rotational molding."],
  ["진공성형", "လေဟာနယ် ထုတ်လုပ်မှု", "Engineering", "진공성형을 전공합니다.", "I major in vacuum forming."],
  ["열성형", "အပူ ထုတ်လုပ်မှု", "Engineering", "열성형을 공부합니다.", "I study thermoforming."],
  ["압연", "ဖိသိပ် လိမ်ခွေမှု", "Engineering", "압연을 연구합니다.", "I study rolling."],
  ["인발", "ဆွဲထုတ်မှု", "Engineering", "인발을 전공합니다.", "I major in drawing."],
  ["단조", "ပုံသွင်းမှု", "Engineering", "단조를 공부합니다.", "I study forging."],
];

// Filter out existing words
const newWords = newAdvancedWords.filter(word => !existingKoreanWords.has(word[0]));

console.log(`Generated ${newWords.length} new advanced words (out of ${newAdvancedWords.length} total)`);

// Convert to dictionary format
const newEntries = newWords.map(([korean, myanmar, category, koreanExample, englishExample]) => ({
  korean: korean,
  myanmar: myanmar,
  category: category,
  koreanExample: koreanExample,
  englishExample: englishExample
}));

// Add to existing dictionary
const updatedDictionary = [...existingData, ...newEntries];

// Write to file
fs.writeFileSync(filePath, JSON.stringify(updatedDictionary, null, 2), 'utf8');

console.log(`Dictionary updated! Total entries: ${updatedDictionary.length}`);
console.log(`Added ${newEntries.length} new advanced Korean words.`);

