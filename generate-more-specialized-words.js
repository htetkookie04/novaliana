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
  // Advanced Specialized Medical Technologies
  ["나노의학기술", "နာနို ဆေးပညာ နည်းပညာ", "Medical", "나노의학기술을 개발합니다.", "I develop nanomedicine technology."],
  ["바이오의학기술", "ဇီဝ ဆေးပညာ နည်းပညာ", "Medical", "바이오의학기술을 연구합니다.", "I study biomedical technology."],
  ["나노바이오의학기술", "နာနို ဇီဝ ဆေးပညာ နည်းပညာ", "Medical", "나노바이오의학기술을 전공합니다.", "I major in nanobiomedical technology."],
  ["양자의학", "ကွမ်တမ် ဆေးပညာ", "Medical", "양자의학을 공부합니다.", "I study quantum medicine."],
  ["양자나노의학기술", "ကွမ်တမ် နာနို ဆေးပညာ နည်းပညာ", "Medical", "양자나노의학기술을 연구합니다.", "I study quantum nanomedicine technology."],
  ["양자바이오의학기술", "ကွမ်တမ် ဇီဝ ဆေးပညာ နည်းပညာ", "Medical", "양자바이오의학기술을 전공합니다.", "I major in quantum biomedicine technology."],
  ["나노바이오공학", "နာနို ဇီဝ အင်ဂျင်နီယာ", "Engineering", "나노바이오공학을 공부합니다.", "I study nanobioengineering."],
  ["바이오나노공학", "ဇီဝ နာနို အင်ဂျင်နီယာ", "Engineering", "바이오나노공학을 연구합니다.", "I study bionanoengineering."],
  ["양자나노공학", "ကွမ်တမ် နာနို အင်ဂျင်နီယာ", "Engineering", "양자나노공학을 전공합니다.", "I major in quantum nanoengineering."],
  ["양자바이오공학", "ကွမ်တမ် ဇီဝ အင်ဂျင်နီယာ", "Engineering", "양자바이오공학을 공부합니다.", "I study quantum bioengineering."],
  
  // Advanced Materials & Composites
  ["나노바이오소재", "နာနို ဇီဝ ပစ္စည်း", "Engineering", "나노바이오소재를 연구합니다.", "I study nanobiomaterials."],
  ["바이오나노소재", "ဇီဝ နာနို ပစ္စည်း", "Engineering", "바이오나노소재를 전공합니다.", "I major in bionanomaterials."],
  ["양자나노소재", "ကွမ်တမ် နာနို ပစ္စည်း", "Engineering", "양자나노소재를 공부합니다.", "I study quantum nanomaterials."],
  ["양자바이오소재", "ကွမ်တမ် ဇီဝ ပစ္စည်း", "Engineering", "양자바이오소재를 연구합니다.", "I study quantum biomaterials."],
  ["나노바이오센서", "နာနို ဇီဝ အာရုံခံကိရိယာ", "Technology", "나노바이오센서를 개발합니다.", "I develop nanobiosensors."],
  ["바이오나노센서", "ဇီဝ နာနို အာရုံခံကိရိယာ", "Technology", "바이오나노센서를 연구합니다.", "I study bionanosensors."],
  ["양자나노센서", "ကွမ်တမ် နာနို အာရုံခံကိရိယာ", "Technology", "양자나노센서를 전공합니다.", "I major in quantum nanosensors."],
  ["양자바이오센서", "ကွမ်တမ် ဇီဝ အာရုံခံကိရိယာ", "Technology", "양자바이오센서를 공부합니다.", "I study quantum biosensors."],
  ["나노바이오이미징", "နာနို ဇီဝ ပုံရိပ်", "Technology", "나노바이오이미징을 연구합니다.", "I study nanobioimaging."],
  ["바이오나노이미징", "ဇီဝ နာနို ပုံရိပ်", "Technology", "바이오나노이미징을 전공합니다.", "I major in bionanoimaging."],
  
  // Advanced Quantum Technologies
  ["양자나노이미징", "ကွမ်တမ် နာနို ပုံရိပ်", "Technology", "양자나노이미징을 공부합니다.", "I study quantum nanoimaging."],
  ["양자바이오이미징", "ကွမ်တမ် ဇီဝ ပုံရိပ်", "Technology", "양자바이오이미징을 연구합니다.", "I study quantum bioimaging."],
  ["나노바이오전자", "နာနို ဇီဝ အီလက်ထရွန်", "Technology", "나노바이오전자를 전공합니다.", "I major in nanobioelectronics."],
  ["바이오나노전자", "ဇီဝ နာနို အီလက်ထရွန်", "Technology", "바이오나노전자를 공부합니다.", "I study bionanoelectronics."],
  ["양자나노전자", "ကွမ်တမ် နာနို အီလက်ထရွန်", "Technology", "양자나노전자를 연구합니다.", "I study quantum nanoelectronics."],
  ["양자바이오전자", "ကွမ်တမ် ဇီဝ အီလက်ထရွန်", "Technology", "양자바이오전자를 전공합니다.", "I major in quantum bioelectronics."],
  ["나노바이오로봇", "နာနို ဇီဝ ရိုဘော့", "Technology", "나노바이오로봇을 개발합니다.", "I develop nanobiorobots."],
  ["바이오나노로봇", "ဇီဝ နာနို ရိုဘော့", "Technology", "바이오나노로봇을 연구합니다.", "I study bionanorobots."],
  ["양자나노로봇", "ကွမ်တမ် နာနို ရိုဘော့", "Technology", "양자나노로봇을 전공합니다.", "I major in quantum nanorobots."],
  ["양자바이오로봇", "ကွမ်တမ် ဇီဝ ရိုဘော့", "Technology", "양자바이오로봇을 공부합니다.", "I study quantum biorobots."],
  
  // Advanced Medical Applications
  ["나노바이오치료", "နာနို ဇီဝ ကုသမှု", "Medical", "나노바이오치료를 연구합니다.", "I study nanobiotherapy."],
  ["바이오나노치료", "ဇီဝ နာနို ကုသမှု", "Medical", "바이오나노치료를 전공합니다.", "I major in bionanotherapy."],
  ["양자나노치료", "ကွမ်တမ် နာနို ကုသမှု", "Medical", "양자나노치료를 공부합니다.", "I study quantum nanotherapy."],
  ["양자바이오치료", "ကွမ်တမ် ဇီဝ ကုသမှု", "Medical", "양자바이오치료를 연구합니다.", "I study quantum biotherapy."],
  ["나노바이오진단", "နာနို ဇီဝ ရောဂါရှာဖွေမှု", "Medical", "나노바이오진단을 전공합니다.", "I major in nanobiodiagnostics."],
  ["바이오나노진단", "ဇီဝ နာနို ရောဂါရှာဖွေမှု", "Medical", "바이오나노진단을 공부합니다.", "I study bionanodiagnostics."],
  ["양자나노진단", "ကွမ်တမ် နာနို ရောဂါရှာဖွေမှု", "Medical", "양자나노진단을 연구합니다.", "I study quantum nanodiagnostics."],
  ["양자바이오진단", "ကွမ်တမ် ဇီဝ ရောဂါရှာဖွေမှု", "Medical", "양자바이오진단을 전공합니다.", "I major in quantum biodiagnostics."],
  ["나노바이오약물전달", "နာနို ဇီဝ ဆေးဝါး ပို့ဆောင်မှု", "Medical", "나노바이오약물전달을 연구합니다.", "I study nanobio drug delivery."],
  ["바이오나노약물전달", "ဇီဝ နာနို ဆေးဝါး ပို့ဆောင်မှု", "Medical", "바이오나노약물전달을 전공합니다.", "I major in bionano drug delivery."],
  
  // Advanced Medical Devices
  ["나노바이오의료기기", "နာနို ဇီဝ ဆေးပညာ ကိရိယာ", "Medical", "나노바이오의료기기를 개발합니다.", "I develop nanobio medical devices."],
  ["바이오나노의료기기", "ဇီဝ နာနို ဆေးပညာ ကိရိယာ", "Medical", "바이오나노의료기기를 전공합니다.", "I major in bionano medical devices."],
  ["양자나노의료기기", "ကွမ်တမ် နာနို ဆေးပညာ ကိရိယာ", "Medical", "양자나노의료기기를 공부합니다.", "I study quantum nano medical devices."],
  ["양자바이오의료기기", "ကွမ်တမ် ဇီဝ ဆေးပညာ ကိရိယာ", "Medical", "양자바이오의료기기를 연구합니다.", "I study quantum bio medical devices."],
  ["나노의료기기", "နာနို ဆေးပညာ ကိရိယာ", "Medical", "나노의료기기를 개발합니다.", "I develop nano medical devices."],
  ["바이오의료기기", "ဇီဝ ဆေးပညာ ကိရိယာ", "Medical", "바이오의료기기를 전공합니다.", "I major in bio medical devices."],
  ["양자의료기기", "ကွမ်တမ် ဆေးပညာ ကိရိယာ", "Medical", "양자의료기기를 공부합니다.", "I study quantum medical devices."],
  ["스마트의료기기", "စမတ် ဆေးပညာ ကိရိယာ", "Medical", "스마트의료기기를 연구합니다.", "I study smart medical devices."],
  ["웨어러블의료기기", "ဝတ်ဆင်နိုင်သော ဆေးပညာ ကိရိယာ", "Medical", "웨어러블의료기기를 전공합니다.", "I major in wearable medical devices."],
  ["디지털의료기기", "ဒစ်ဂျစ်တယ် ဆေးပညာ ကိရိယာ", "Medical", "디지털의료기기를 공부합니다.", "I study digital medical devices."],
  
  // Advanced Specialized Research Areas
  ["단일세포유전체학", "တစ်ခုတည်း ဆဲလ် မျိုးရိုးဗီဇ", "Biology", "단일세포유전체학을 전공합니다.", "I major in single-cell genomics."],
  ["단일세포전사체학", "တစ်ခုတည်း ဆဲလ် အကြောင်းအရာ", "Biology", "단일세포전사체학을 연구합니다.", "I study single-cell transcriptomics."],
  ["단일세포단백질체학", "တစ်ခုတည်း ဆဲလ် ပရိုတိန်း", "Biology", "단일세포단백질체학을 공부합니다.", "I study single-cell proteomics."],
  ["단일세포대사체학", "တစ်ခုတည်း ဆဲလ် ဇီဝကမ္မဗေဒ", "Biology", "단일세포대사체학을 전공합니다.", "I major in single-cell metabolomics."],
  ["단일세포면역학", "တစ်ခုတည်း ဆဲလ် ကိုယ်ခံအား", "Biology", "단일세포면역학을 연구합니다.", "I study single-cell immunology."],
  ["단일세포생물학", "တစ်ခုတည်း ဆဲလ် ဇီဝဗေဒ", "Biology", "단일세포생물학을 공부합니다.", "I study single-cell biology."],
  ["단일세포분석", "တစ်ခုတည်း ဆဲလ် ခွဲခြမ်းစိတ်ဖြာမှု", "Biology", "단일세포분석을 전공합니다.", "I major in single-cell analysis."],
  ["단일세포시퀀싱", "တစ်ခုတည်း ဆဲလ် အစဉ်", "Biology", "단일세포시퀀싱을 연구합니다.", "I study single-cell sequencing."],
  ["단일세포이미징", "တစ်ခုတည်း ဆဲလ် ပုံရိပ်", "Biology", "단일세포이미징을 공부합니다.", "I study single-cell imaging."],
  ["단일세포유전학", "တစ်ခုတည်း ဆဲလ် မျိုးရိုးဗီဇ", "Biology", "단일세포유전학을 전공합니다.", "I major in single-cell genetics."],
  
  // Advanced Computational & Simulation Methods
  ["분자동역학", "မော်လီကျူး လှုပ်ရှားမှု", "Computer Science", "분자동역학을 연구합니다.", "I study molecular dynamics."],
  ["양자동역학", "ကွမ်တမ် လှုပ်ရှားမှု", "Computer Science", "양자동역학을 전공합니다.", "I major in quantum dynamics."],
  ["전산화학", "ကွန်ပျူတာ ဓာတုဗေဒ", "Computer Science", "전산화학을 공부합니다.", "I study computational chemistry."],
  ["전산물리학", "ကွန်ပျူတာ ရူပဗေဒ", "Computer Science", "전산물리학을 연구합니다.", "I study computational physics."],
  ["전산수학", "ကွန်ပျူတာ သင်္ချာ", "Computer Science", "전산수학을 전공합니다.", "I major in computational mathematics."],
  ["전산공학", "ကွန်ပျူတာ အင်ဂျင်နီယာ", "Computer Science", "전산공학을 공부합니다.", "I study computational engineering."],
  ["전산의학", "ကွန်ပျူတာ ဆေးပညာ", "Computer Science", "전산의학을 연구합니다.", "I study computational medicine."],
  ["전산재료과학", "ကွန်ပျူတာ ပစ္စည်း သိပ္ပံ", "Computer Science", "전산재료과학을 전공합니다.", "I major in computational materials science."],
  ["전산유체역학", "ကွန်ပျူတာ အရည် စွမ်းအား", "Computer Science", "전산유체역학을 공부합니다.", "I study computational fluid dynamics."],
  ["전산구조역학", "ကွန်ပျူတာ ဖွဲ့စည်းပုံ စွမ်းအား", "Computer Science", "전산구조역학을 연구합니다.", "I study computational structural mechanics."],
  
  // Advanced Specialized Technologies
  ["나노바이오기술", "နာနို ဇီဝ နည်းပညာ", "Technology", "나노바이오기술을 연구합니다.", "I study nanobiotechnology."],
  ["바이오나노기술", "ဇီဝ နာနို နည်းပညာ", "Technology", "바이오나노기술을 전공합니다.", "I major in bionanotechnology."],
  ["나노바이오과학", "နာနို ဇီဝ သိပ္ပံ", "Science", "나노바이오과학을 공부합니다.", "I study nanobioscience."],
  ["바이오나노과학", "ဇီဝ နာနို သိပ္ပံ", "Science", "바이오나노과학을 연구합니다.", "I study bionanoscience."],
  ["나노바이오물리학", "နာနို ဇီဝ ရူပဗေဒ", "Science", "나노바이오물리학을 전공합니다.", "I major in nanobiophysics."],
  ["바이오나노물리학", "ဇီဝ နာနို ရူပဗေဒ", "Science", "바이오나노물리학을 공부합니다.", "I study bionanophysics."],
  ["나노바이오화학", "နာနို ဇီဝ ဓာတုဗေဒ", "Science", "나노바이오화학을 연구합니다.", "I study nanobiochemistry."],
  ["바이오나노화학", "ဇီဝ နာနို ဓာတုဗေဒ", "Science", "바이오나노화학을 전공합니다.", "I major in bionanochemistry."],
  ["나노바이오의학", "နာနို ဇီဝ ဆေးပညာ", "Medical", "나노바이오의학을 공부합니다.", "I study nanobiomedicine."],
  ["바이오나노의학", "ဇီဝ နာနို ဆေးပညာ", "Medical", "바이오나노의학을 연구합니다.", "I study bionanomedicine."],
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

