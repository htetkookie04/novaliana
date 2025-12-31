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
  // Advanced Specialized Biotechnology Methods
  ["유전자편집기술", "မျိုးရိုးဗီဇ ပြင်ဆင်မှု နည်းပညာ", "Biology", "유전자편집기술을 연구합니다.", "I study gene editing technology."],
  ["크리스퍼기술", "CRISPR နည်းပညာ", "Biology", "크리스퍼기술을 전공합니다.", "I major in CRISPR technology."],
  ["유전자치료기술", "မျိုးရိုးဗီဇ ကုသမှု နည်းပညာ", "Biology", "유전자치료기술을 공부합니다.", "I study gene therapy technology."],
  ["세포배양기술", "ဆဲလ် စိုက်ပျိုးမှု နည်းပညာ", "Biology", "세포배양기술을 연구합니다.", "I study cell culture technology."],
  ["조직공학기술", "တစ်ရှူး အင်ဂျင်နီယာ နည်းပညာ", "Biology", "조직공학기술을 전공합니다.", "I major in tissue engineering technology."],
  ["생체재료기술", "ဇီဝပစ္စည်း နည်းပညာ", "Biology", "생체재료기술을 공부합니다.", "I study biomaterial technology."],
  ["단백질공학기술", "ပရိုတိန်း အင်ဂျင်နီယာ နည်းပညာ", "Biology", "단백질공학기술을 연구합니다.", "I study protein engineering technology."],
  ["효소공학기술", "အင်ဇိုင်း အင်ဂျင်နီယာ နည်းပညာ", "Biology", "효소공학기술을 전공합니다.", "I major in enzyme engineering technology."],
  ["면역공학기술", "ကိုယ်ခံအား အင်ဂျင်နီယာ နည်းပညာ", "Biology", "면역공학기술을 공부합니다.", "I study immunology engineering technology."],
  ["바이오센서기술", "ဇီဝအာရုံခံ နည်းပညာ", "Biology", "바이오센서기술을 연구합니다.", "I study biosensor technology."],
  
  // Advanced Specialized Nanotechnology
  ["나노입자합성기술", "နာနို အမှုန် ပေါင်းစပ်မှု နည်းပညာ", "Engineering", "나노입자합성기술을 전공합니다.", "I major in nanoparticle synthesis technology."],
  ["나노튜브제조기술", "နာနို ပိုက် ထုတ်လုပ်မှု နည်းပညာ", "Engineering", "나노튜브제조기술을 공부합니다.", "I study nanotube manufacturing technology."],
  ["나노와이어제조기술", "နာနို ဝိုင်ယာ ထုတ်လုပ်မှု နည်းပညာ", "Engineering", "나노와이어제조기술을 연구합니다.", "I study nanowire manufacturing technology."],
  ["나노막제조기술", "နာနို အလွှာ ထုတ်လုပ်မှု နည်းပညာ", "Engineering", "나노막제조기술을 전공합니다.", "I major in nanofilm manufacturing technology."],
  ["나노구조제어기술", "နာနို ဖွဲ့စည်းပုံ ထိန်းချုပ်မှု နည်းပညာ", "Engineering", "나노구조제어기술을 공부합니다.", "I study nanostructure control technology."],
  ["나노패턴기술", "နာနို ပုံစံ နည်းပညာ", "Engineering", "나노패턴기술을 연구합니다.", "I study nanopatterning technology."],
  ["나노리소그래피기술", "နာနို ပုံနှိပ် နည်းပညာ", "Engineering", "나노리소그래피기술을 전공합니다.", "I major in nanolithography technology."],
  ["나노어셈블리기술", "နာနို စုစည်းမှု နည်းပညာ", "Engineering", "나노어셈블리기술을 공부합니다.", "I study nanoassembly technology."],
  ["나노조작기술", "နာနို လုပ်ဆောင်မှု နည်းပညာ", "Engineering", "나노조작기술을 연구합니다.", "I study nanomanipulation technology."],
  ["나노자기기술", "နာနို သံလိုက် နည်းပညာ", "Engineering", "나노자기기술을 전공합니다.", "I major in nanomagnetic technology."],
  
  // Advanced Specialized Quantum Technology
  ["양자컴퓨팅기술", "ကွမ်တမ် ကွန်ပျူတာ နည်းပညာ", "Computer Science", "양자컴퓨팅기술을 공부합니다.", "I study quantum computing technology."],
  ["양자암호화기술", "ကွမ်တမ် လျှို့ဝှက်ကုဒ် နည်းပညာ", "Computer Science", "양자암호화기술을 연구합니다.", "I study quantum encryption technology."],
  ["양자통신기술", "ကွမ်တမ် ဆက်သွယ်ရေး နည်းပညာ", "Computer Science", "양자통신기술을 전공합니다.", "I major in quantum communication technology."],
  ["양자센서기술", "ကွမ်တမ် အာရုံခံ နည်းပညာ", "Computer Science", "양자센서기술을 공부합니다.", "I study quantum sensor technology."],
  ["양자시뮬레이션기술", "ကွမ်တမ် ပုံတူ နည်းပညာ", "Computer Science", "양자시뮬레이션기술을 연구합니다.", "I study quantum simulation technology."],
  ["양자알고리즘기술", "ကွမ်တမ် အယ်လ်ဂိုရီသမ် နည်းပညာ", "Computer Science", "양자알고리즘기술을 전공합니다.", "I major in quantum algorithm technology."],
  ["양자네트워크기술", "ကွမ်တမ် ကွန်ရက် နည်းပညာ", "Computer Science", "양자네트워크기술을 공부합니다.", "I study quantum network technology."],
  ["양자메모리기술", "ကွမ်တမ် မှတ်ဉာဏ် နည်းပညာ", "Computer Science", "양자메모리기술을 연구합니다.", "I study quantum memory technology."],
  ["양자정보처리기술", "ကွမ်တမ် အချက်အလက် လုပ်ဆောင်မှု နည်းပညာ", "Computer Science", "양자정보처리기술을 전공합니다.", "I major in quantum information processing technology."],
  ["양자계산기술", "ကွမ်တမ် တွက်ချက်မှု နည်းပညာ", "Computer Science", "양자계산기술을 공부합니다.", "I study quantum calculation technology."],
  
  // Advanced Specialized Energy Technology
  ["태양전지기술", "နေရောင်ခြည် ဘက်ထရီ နည်းပညာ", "Engineering", "태양전지기술을 연구합니다.", "I study solar cell technology."],
  ["연료전지기술", "လောင်စာ ဘက်ထရီ နည်းပညာ", "Engineering", "연료전지기술을 전공합니다.", "I major in fuel cell technology."],
  ["리튬이온전지기술", "လီသီယမ် အိုင်ယွန် ဘက်ထရီ နည်းပညာ", "Engineering", "리튬이온전지기술을 공부합니다.", "I study lithium-ion battery technology."],
  ["수소연료기술", "ဟိုက်ဒရိုဂျင် လောင်စာ နည်းပညာ", "Engineering", "수소연료기술을 연구합니다.", "I study hydrogen fuel technology."],
  ["바이오연료기술", "ဇီဝ လောင်စာ နည်းပညာ", "Engineering", "바이오연료기술을 전공합니다.", "I major in biofuel technology."],
  ["풍력발전기술", "လေအား လျှပ်စစ်ထုတ်လုပ်မှု နည်းပညာ", "Engineering", "풍력발전기술을 공부합니다.", "I study wind power generation technology."],
  ["수력발전기술", "ရေအား လျှပ်စစ်ထုတ်လုပ်မှု နည်းပညာ", "Engineering", "수력발전기술을 연구합니다.", "I study hydroelectric power generation technology."],
  ["지열발전기술", "မြေအောက်အပူ လျှပ်စစ်ထုတ်လုပ်မှု နည်းပညာ", "Engineering", "지열발전기술을 전공합니다.", "I major in geothermal power generation technology."],
  ["조력발전기술", "ဒီရေ လျှပ်စစ်ထုတ်လုပ်မှု နည်းပညာ", "Engineering", "조력발전기술을 공부합니다.", "I study tidal power generation technology."],
  ["원자력발전기술", "နျူကလီးယား စွမ်းအား လျှပ်စစ်ထုတ်လုပ်မှု နည်းပညာ", "Engineering", "원자력발전기술을 연구합니다.", "I study nuclear power generation technology."],
  
  // Advanced Specialized Materials Science
  ["초전도체기술", "အလွန်လျှပ်စစ်လမ်းကြောင်း နည်းပညာ", "Engineering", "초전도체기술을 전공합니다.", "I major in superconductor technology."],
  ["반도체기술", "ခွဲခြမ်းစိတ်ဖြာသော လျှပ်စစ်လမ်းကြောင်း နည်းပညာ", "Engineering", "반도체기술을 공부합니다.", "I study semiconductor technology."],
  ["도체기술", "လျှပ်စစ်လမ်းကြောင်း နည်းပညာ", "Engineering", "도체기술을 연구합니다.", "I study conductor technology."],
  ["절연체기술", "ခွဲခြမ်းစိတ်ဖြာသော လျှပ်စစ်လမ်းကြောင်း နည်းပညာ", "Engineering", "절연체기술을 전공합니다.", "I major in insulator technology."],
  ["자성재료기술", "သံလိုက် ပစ္စည်း နည်းပညာ", "Engineering", "자성재료기술을 공부합니다.", "I study magnetic material technology."],
  ["강자성재료기술", "ခိုင်မာသော သံလိုက် ပစ္စည်း နည်းပညာ", "Engineering", "강자성재료기술을 연구합니다.", "I study ferromagnetic material technology."],
  ["상자성재료기술", "အပေါ်ယံ သံလိုက် ပစ္စည်း နည်းပညာ", "Engineering", "상자성재료기술을 전공합니다.", "I major in paramagnetic material technology."],
  ["반자성재료기술", "ခွဲခြမ်းစိတ်ဖြာသော သံလိုက် ပစ္စည်း နည်းပညာ", "Engineering", "반자성재료기술을 공부합니다.", "I study diamagnetic material technology."],
  ["초강자성재료기술", "အလွန်ခိုင်မာသော သံလိုက် ပစ္စည်း နည်းပညာ", "Engineering", "초강자성재료기술을 연구합니다.", "I study superparamagnetic material technology."],
  ["자기저항재료기술", "သံလိုက် ခုခံမှု ပစ္စည်း နည်းပညာ", "Engineering", "자기저항재료기술을 전공합니다.", "I major in magnetoresistive material technology."],
  
  // Advanced Specialized Optical Technology
  ["레이저기술", "လေဆာ နည်းပညာ", "Engineering", "레이저기술을 공부합니다.", "I study laser technology."],
  ["광섬유기술", "အလင်း ဖိုင်ဘာ နည်းပညာ", "Engineering", "광섬유기술을 연구합니다.", "I study optical fiber technology."],
  ["광전자기술", "အလင်း အီလက်ထရွန် နည်းပညာ", "Engineering", "광전자기술을 전공합니다.", "I major in optoelectronics technology."],
  ["광통신기술", "အလင်း ဆက်သွယ်ရေး နည်းပညာ", "Engineering", "광통신기술을 공부합니다.", "I study optical communication technology."],
  ["광학기술", "အလင်း နည်းပညာ", "Engineering", "광학기술을 연구합니다.", "I study optics technology."],
  ["광학현미경기술", "အလင်း မိုက်ခရိုစကုပ်ပီ နည်းပညာ", "Engineering", "광학현미경기술을 전공합니다.", "I major in optical microscopy technology."],
  ["광학분광기술", "အလင်း စပက်ထရိုစကုပ်ပီ နည်းပညာ", "Engineering", "광학분광기술을 공부합니다.", "I study optical spectroscopy technology."],
  ["광학이미징기술", "အလင်း ပုံရိပ် နည်းပညာ", "Engineering", "광학이미징기술을 연구합니다.", "I study optical imaging technology."],
  ["광학센서기술", "အလင်း အာရုံခံ နည်းပညာ", "Engineering", "광학센서기술을 전공합니다.", "I major in optical sensor technology."],
  ["광학계산기술", "အလင်း တွက်ချက်မှု နည်းပညာ", "Engineering", "광학계산기술을 공부합니다.", "I study optical computing technology."],
  
  // Advanced Specialized Chemical Processing
  ["화학합성기술", "ဓာတုဗေဒ ပေါင်းစပ်မှု နည်းပညာ", "Chemistry", "화학합성기술을 연구합니다.", "I study chemical synthesis technology."],
  ["촉매기술", "ဖျော်ရည် နည်းပညာ", "Chemistry", "촉매기술을 전공합니다.", "I major in catalyst technology."],
  ["화학반응기술", "ဓာတုဗေဒ တုံ့ပြန်မှု နည်းပညာ", "Chemistry", "화학반응기술을 공부합니다.", "I study chemical reaction technology."],
  ["화학분리기술", "ဓာတုဗေဒ ခွဲထုတ်မှု နည်းပညာ", "Chemistry", "화학분리기술을 연구합니다.", "I study chemical separation technology."],
  ["화학정제기술", "ဓာတုဗေဒ သန့်စင်မှု နည်းပညာ", "Chemistry", "화학정제기술을 전공합니다.", "I major in chemical purification technology."],
  ["화학분석기술", "ဓာတုဗေဒ ခွဲခြမ်းစိတ်ဖြာမှု နည်းပညာ", "Chemistry", "화학분석기술을 공부합니다.", "I study chemical analysis technology."],
  ["화학처리기술", "ဓာတုဗေဒ လုပ်ဆောင်မှု နည်းပညာ", "Chemistry", "화학처리기술을 연구합니다.", "I study chemical processing technology."],
  ["화학변환기술", "ဓာတုဗေဒ ပြောင်းလဲမှု နည်းပညာ", "Chemistry", "화학변환기술을 전공합니다.", "I major in chemical conversion technology."],
  ["화학최적화기술", "ဓာတုဗေဒ အကောင်းဆုံး နည်းပညာ", "Chemistry", "화학최적화기술을 공부합니다.", "I study chemical optimization technology."],
  ["화학공정기술", "ဓာတုဗေဒ လုပ်ငန်းစဉ် နည်းပညာ", "Chemistry", "화학공정기술을 연구합니다.", "I study chemical process technology."],
  
  // Advanced Specialized Environmental Technology
  ["환경정화기술", "ပတ်ဝန်းကျင် သန့်စင်မှု နည်းပညာ", "Engineering", "환경정화기술을 전공합니다.", "I major in environmental purification technology."],
  ["대기정화기술", "လေထု သန့်စင်မှု နည်းပညာ", "Engineering", "대기정화기술을 공부합니다.", "I study air purification technology."],
  ["수질정화기술", "ရေအရည်အသွေး သန့်စင်မှု နည်းပညာ", "Engineering", "수질정화기술을 연구합니다.", "I study water quality purification technology."],
  ["폐기물처리기술", "စွန့်ပစ်ပစ္စည်း လုပ်ဆောင်မှု နည်းပညာ", "Engineering", "폐기물처리기술을 전공합니다.", "I major in waste treatment technology."],
  ["재활용기술", "ပြန်လည်အသုံးပြုမှု နည်းပညာ", "Engineering", "재활용기술을 공부합니다.", "I study recycling technology."],
  ["폐수처리기술", "စွန့်ပစ်ရေ လုပ်ဆောင်မှု နည်းပညာ", "Engineering", "폐수처리기술을 연구합니다.", "I study wastewater treatment technology."],
  ["대기오염방지기술", "လေထု ညစ်ညမ်းမှု တားဆီးမှု နည်းပညာ", "Engineering", "대기오염방지기술을 전공합니다.", "I major in air pollution prevention technology."],
  ["수질오염방지기술", "ရေအရည်အသွေး ညစ်ညမ်းမှု တားဆီးမှု နည်းပညာ", "Engineering", "수질오염방지기술을 공부합니다.", "I study water pollution prevention technology."],
  ["토양정화기술", "မြေဆီလွှာ သန့်စင်မှု နည်းပညာ", "Engineering", "토양정화기술을 연구합니다.", "I study soil purification technology."],
  ["환경모니터링기술", "ပတ်ဝန်းကျင် စောင့်ကြည့်မှု နည်းပညာ", "Engineering", "환경모니터링기술을 전공합니다.", "I major in environmental monitoring technology."],
  
  // Advanced Specialized Medical Technology
  ["의료영상기술", "ဆေးဘက် ပုံရိပ် နည်းပညာ", "Medicine", "의료영상기술을 공부합니다.", "I study medical imaging technology."],
  ["의료진단기술", "ဆေးဘက် ရောဂါရှာဖွေမှု နည်းပညာ", "Medicine", "의료진단기술을 연구합니다.", "I study medical diagnosis technology."],
  ["의료치료기술", "ဆေးဘက် ကုသမှု နည်းပညာ", "Medicine", "의료치료기술을 전공합니다.", "I major in medical treatment technology."],
  ["의료기기기술", "ဆေးဘက် ကိရိယာ နည်းပညာ", "Medicine", "의료기기기술을 공부합니다.", "I study medical device technology."],
  ["의료로봇기술", "ဆေးဘက် စက်ရုပ် နည်းပညာ", "Medicine", "의료로봇기술을 연구합니다.", "I study medical robot technology."],
  ["의료센서기술", "ဆေးဘက် အာရုံခံ နည်းပညာ", "Medicine", "의료센서기술을 전공합니다.", "I major in medical sensor technology."],
  ["의료데이터기술", "ဆေးဘက် အချက်အလက် နည်းပညာ", "Medicine", "의료데이터기술을 공부합니다.", "I study medical data technology."],
  ["의료인공지능기술", "ဆေးဘက် လူလုပ် ဉာဏ်ရည် နည်းပညာ", "Medicine", "의료인공지능기술을 연구합니다.", "I study medical artificial intelligence technology."],
  ["의료바이오기술", "ဆေးဘက် ဇီဝ နည်းပညာ", "Medicine", "의료바이오기술을 전공합니다.", "I major in medical biotechnology."],
  ["의료나노기술", "ဆေးဘက် နာနို နည်းပညာ", "Medicine", "의료나노기술을 공부합니다.", "I study medical nanotechnology."],
  
  // Advanced Specialized Information Technology
  ["인공지능기술", "လူလုပ် ဉာဏ်ရည် နည်းပညာ", "Computer Science", "인공지능기술을 연구합니다.", "I study artificial intelligence technology."],
  ["머신러닝기술", "စက် သင်ယူမှု နည်းပညာ", "Computer Science", "머신러닝기술을 전공합니다.", "I major in machine learning technology."],
  ["딥러닝기술", "နက်ရှိုင်းသော သင်ယူမှု နည်းပညာ", "Computer Science", "딥러닝기술을 공부합니다.", "I study deep learning technology."],
  ["신경망기술", "အာရုံကြော ကွန်ရက် နည်းပညာ", "Computer Science", "신경망기술을 연구합니다.", "I study neural network technology."],
  ["자연어처리기술", "သဘာဝ ဘာသာစကား လုပ်ဆောင်မှု နည်းပညာ", "Computer Science", "자연어처리기술을 전공합니다.", "I major in natural language processing technology."],
  ["컴퓨터비전기술", "ကွန်ပျူတာ အမြင်အာရုံ နည်းပညာ", "Computer Science", "컴퓨터비전기술을 공부합니다.", "I study computer vision technology."],
  ["빅데이터기술", "ကြီးမားသော အချက်အလက် နည်းပညာ", "Computer Science", "빅데이터기술을 연구합니다.", "I study big data technology."],
  ["클라우드컴퓨팅기술", "မိုးတိမ် ကွန်ပျူတာ နည်းပညာ", "Computer Science", "클라우드컴퓨팅기술을 전공합니다.", "I major in cloud computing technology."],
  ["사이버보안기술", "ဆိုက်ဘာ လုံခြုံရေး နည်းပညာ", "Computer Science", "사이버보안기술을 공부합니다.", "I study cybersecurity technology."],
  ["블록체인기술", "ဘလော့ခ်ချိန်း နည်းပညာ", "Computer Science", "블록체인기술을 연구합니다.", "I study blockchain technology."],
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
