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
  // Advanced Mathematics & Statistics
  ["미적분학", "ကဲကုလပ်", "Mathematics", "미적분학을 공부합니다.", "I study calculus."],
  ["선형대수학", "ရှေးဦးစွာ မျဉ်းဖြောင့် သင်္ချာ", "Mathematics", "선형대수학을 전공합니다.", "I major in linear algebra."],
  ["확률론", "ဖြစ်နိုင်ခြေ သီအိုရီ", "Mathematics", "확률론을 연구합니다.", "I study probability theory."],
  ["통계학", "စာရင်းအင်း", "Mathematics", "통계학 분석을 합니다.", "I conduct statistical analysis."],
  ["기하학", "ဂျီသြမေတြီ", "Mathematics", "기하학 문제를 풉니다.", "I solve geometry problems."],
  ["위상수학", "ထောပတ်လိုဂျီ", "Mathematics", "위상수학을 공부합니다.", "I study topology."],
  ["수치해석", "ကိန်းဂဏန်း ခွဲခြမ်းစိတ်ဖြာမှု", "Mathematics", "수치해석 방법을 사용합니다.", "I use numerical analysis methods."],
  ["최적화이론", "အကောင်းဆုံး သီအိုရီ", "Mathematics", "최적화이론을 적용합니다.", "I apply optimization theory."],
  ["조합론", "ပေါင်းစပ်မှု", "Mathematics", "조합론을 연구합니다.", "I study combinatorics."],
  ["수론", "ကိန်းဂဏန်း သီအိုရီ", "Mathematics", "수론을 전공합니다.", "I major in number theory."],
  
  // Advanced Physics
  ["전자기학", "လျှပ်စစ်သံလိုက်", "Physics", "전자기학을 공부합니다.", "I study electromagnetism."],
  ["열역학", "အပူ စွမ်းအား", "Physics", "열역학 법칙을 이해합니다.", "I understand thermodynamics laws."],
  ["유체역학", "အရည် စွမ်းအား", "Physics", "유체역학을 연구합니다.", "I study fluid mechanics."],
  ["광학", "အလင်း", "Physics", "광학 실험을 합니다.", "I conduct optics experiments."],
  ["음향학", "အသံ", "Physics", "음향학을 전공합니다.", "I major in acoustics."],
  ["핵물리학", "နျူကလီးယား ရူပဗေဒ", "Physics", "핵물리학 연구를 합니다.", "I conduct nuclear physics research."],
  ["입자물리학", "အမှုန် ရူပဗေဒ", "Physics", "입자물리학을 공부합니다.", "I study particle physics."],
  ["응집물질물리학", "စုစည်းထားသော ရူပဗေဒ", "Physics", "응집물질물리학을 연구합니다.", "I study condensed matter physics."],
  ["플라즈마물리학", "ပလာစမာ ရူပဗေဒ", "Physics", "플라즈마물리학을 전공합니다.", "I major in plasma physics."],
  ["상대론", "အိုင်းစတိုင်း သီအိုရီ", "Physics", "상대론을 이해합니다.", "I understand relativity theory."],
  
  // Advanced Chemistry
  ["유기화학", "အော်ဂဲနစ် ဓာတုဗေဒ", "Chemistry", "유기화학을 공부합니다.", "I study organic chemistry."],
  ["무기화학", "အော်ဂဲနစ် မဟုတ်သော ဓာတုဗေဒ", "Chemistry", "무기화학을 전공합니다.", "I major in inorganic chemistry."],
  ["물리화학", "ရူပဗေဒ ဓာတုဗေဒ", "Chemistry", "물리화학 실험을 합니다.", "I conduct physical chemistry experiments."],
  ["분석화학", "ခွဲခြမ်းစိတ်ဖြာမှု ဓာတုဗေဒ", "Chemistry", "분석화학을 연구합니다.", "I study analytical chemistry."],
  ["생화학", "ဇီဝ ဓာတုဗေဒ", "Chemistry", "생화학을 공부합니다.", "I study biochemistry."],
  ["고분자화학", "ပိုလီမာ ဓာတုဗေဒ", "Chemistry", "고분자화학을 전공합니다.", "I major in polymer chemistry."],
  ["촉매", "ဖျန်းဆေး", "Chemistry", "촉매 반응을 연구합니다.", "I study catalytic reactions."],
  ["화학결합", "ဓာတုဗေဒ ပေါင်းစည်းမှု", "Chemistry", "화학결합을 이해합니다.", "I understand chemical bonding."],
  ["화학평형", "ဓာတုဗေဒ ညီမျှမှု", "Chemistry", "화학평형을 분석합니다.", "I analyze chemical equilibrium."],
  ["반응속도론", "တုံ့ပြန်မှု အမြန်နှုန်း", "Chemistry", "반응속도론을 연구합니다.", "I study reaction kinetics."],
  
  // Advanced Biology
  ["세포생물학", "ဆဲလ် ဇီဝဗေဒ", "Biology", "세포생물학을 공부합니다.", "I study cell biology."],
  ["분자생물학", "မော်လီကျူး ဇီဝဗေဒ", "Biology", "분자생물학을 전공합니다.", "I major in molecular biology."],
  ["유전학", "မျိုးရိုးဗီဇ", "Biology", "유전학 연구를 합니다.", "I conduct genetics research."],
  ["생태학", "ဂေဟဗေဒ", "Biology", "생태학을 공부합니다.", "I study ecology."],
  ["진화생물학", "ဆင့်ကဲဖြစ်စဉ် ဇီဝဗေဒ", "Biology", "진화생물학을 연구합니다.", "I study evolutionary biology."],
  ["미생물학", "ပိုးမွှား ဇီဝဗေဒ", "Biology", "미생물학을 전공합니다.", "I major in microbiology."],
  ["식물학", "အပင်ဗေဒ", "Biology", "식물학을 공부합니다.", "I study botany."],
  ["동물학", "တိရစ္ဆာန် ဗေဒ", "Biology", "동물학을 연구합니다.", "I study zoology."],
  ["해부생리학", "ခန္ဓာဗေဒ ဇီဝကမ္မဗေဒ", "Biology", "해부생리학을 전공합니다.", "I major in anatomy and physiology."],
  ["면역생물학", "ကိုယ်ခံအား ဇီဝဗေဒ", "Biology", "면역생물학을 공부합니다.", "I study immunobiology."],
  
  // Advanced Computer Science
  ["자료구조", "ဒေတာ ဖွဲ့စည်းပုံ", "Computer Science", "자료구조를 학습합니다.", "I learn data structures."],
  ["알고리즘분석", "အယ်လ်ဂိုရီသမ် ခွဲခြမ်းစိတ်ဖြာမှု", "Computer Science", "알고리즘분석을 합니다.", "I conduct algorithm analysis."],
  ["컴파일러", "ကွန်ပျူတာ ဘာသာပြန်စက်", "Computer Science", "컴파일러를 설계합니다.", "I design compilers."],
  ["운영체제", "စနစ် လည်ပတ်မှု", "Computer Science", "운영체제를 공부합니다.", "I study operating systems."],
  ["데이터베이스설계", "ဒေတာဘေ့စ် ဒီဇိုင်း", "Computer Science", "데이터베이스설계를 합니다.", "I design databases."],
  ["컴퓨터네트워크", "ကွန်ပျူတာ ကွန်ရက်", "Computer Science", "컴퓨터네트워크를 구축합니다.", "I build computer networks."],
  ["분산시스템", "ဖြန့်ဝေထားသော စနစ်", "Computer Science", "분산시스템을 개발합니다.", "I develop distributed systems."],
  ["병렬처리", "အပြိုင်လုပ်ဆောင်မှု", "Computer Science", "병렬처리를 연구합니다.", "I study parallel processing."],
  ["인공지능이론", "လူလုပ်ဉာဏ်ရည် သီအိုရီ", "Computer Science", "인공지능이론을 공부합니다.", "I study artificial intelligence theory."],
  ["컴퓨터보안", "ကွန်ပျူတာ လုံခြုံရေး", "Computer Science", "컴퓨터보안을 강화합니다.", "I strengthen computer security."],
  
  // Advanced Economics
  ["계량경제학", "စာရင်းအင်း စီးပွားရေး", "Economics", "계량경제학을 전공합니다.", "I major in econometrics."],
  ["재정학", "ဘဏ္ဍာရေး", "Economics", "재정학을 공부합니다.", "I study public finance."],
  ["금융경제학", "ငွေရေး စီးပွားရေး", "Economics", "금융경제학을 연구합니다.", "I study financial economics."],
  ["국제경제학", "နိုင်ငံတကာ စီးပွားရေး", "Economics", "국제경제학을 전공합니다.", "I major in international economics."],
  ["산업조직론", "စက်မှု အဖွဲ့အစည်း", "Economics", "산업조직론을 공부합니다.", "I study industrial organization theory."],
  ["노동경제학", "အလုပ်သမား စီးပွားရေး", "Economics", "노동경제학을 연구합니다.", "I study labor economics."],
  ["환경경제학", "ပတ်ဝန်းကျင် စီးပွားရေး", "Economics", "환경경제학을 전공합니다.", "I major in environmental economics."],
  ["발전경제학", "ဖွံ့ဖြိုးတိုးတက်မှု စီးပွားရေး", "Economics", "발전경제학을 공부합니다.", "I study development economics."],
  ["행동경제학", "အပြုအမူ စီးပွားရေး", "Economics", "행동경제학을 연구합니다.", "I study behavioral economics."],
  ["게임이론", "ဂိမ်း သီအိုရီ", "Economics", "게임이론을 적용합니다.", "I apply game theory."],
  
  // Advanced Medical Specialties
  ["내과", "အတွင်းရောဂါကုသမှု", "Medical", "내과 진료를 받습니다.", "I receive internal medicine treatment."],
  ["외과", "ခွဲစိတ်ကုသမှု", "Medical", "외과 수술을 받습니다.", "I receive surgical treatment."],
  ["소아과", "ကလေးဆေးကုသမှု", "Medical", "소아과 진료를 받습니다.", "I receive pediatric treatment."],
  ["산부인과", "သားဖွားမီးယပ်", "Medical", "산부인과 검진을 받습니다.", "I receive obstetrics and gynecology examination."],
  ["정형외과", "အရိုးအဆစ်", "Medical", "정형외과 치료를 받습니다.", "I receive orthopedic treatment."],
  ["신경과", "အာရုံကြော", "Medical", "신경과 진료를 받습니다.", "I receive neurology treatment."],
  ["정신과", "စိတ်ရောဂါကုသမှု", "Medical", "정신과 상담을 받습니다.", "I receive psychiatric counseling."],
  ["안과", "မျက်စိ", "Medical", "안과 검진을 받습니다.", "I receive ophthalmology examination."],
  ["이비인후과", "နား နှာခေါင်း လည်ချောင်း", "Medical", "이비인후과 진료를 받습니다.", "I receive ENT treatment."],
  ["피부과", "အရေပြား", "Medical", "피부과 치료를 받습니다.", "I receive dermatology treatment."],
  
  // Advanced Business & Finance
  ["포트폴리오", "ပို့ဆောင်မှု", "Business", "포트폴리오를 관리합니다.", "I manage a portfolio."],
  ["자산배분", "ပိုင်ဆိုင်မှု ခွဲဝေမှု", "Business", "자산배분 전략을 수립합니다.", "I establish asset allocation strategies."],
  ["리스크분석", "အန္တရာယ် ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "리스크분석을 수행합니다.", "I perform risk analysis."],
  ["재무모델링", "ဘဏ္ဍာရေး ပုံစံ", "Business", "재무모델링을 구축합니다.", "I build financial models."],
  ["기업가치평가", "လုပ်ငန်း တန်ဖိုး အကဲဖြတ်မှု", "Business", "기업가치평가를 합니다.", "I conduct business valuation."],
  ["자본구조", "အရင်းအနှီး ဖွဲ့စည်းပုံ", "Business", "자본구조를 최적화합니다.", "I optimize capital structure."],
  ["현금흐름", "ငွေသား စီးဆင်းမှု", "Business", "현금흐름을 분석합니다.", "I analyze cash flow."],
  ["수익성분석", "အမြတ် ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "수익성분석을 수행합니다.", "I perform profitability analysis."],
  ["시장조사", "စျေးကွက် သုတေသန", "Business", "시장조사를 실시합니다.", "I conduct market research."],
  ["브랜드전략", "ကုန်အမှတ်တံဆိပ် နည်းဗျူဟာ", "Business", "브랜드전략을 수립합니다.", "I establish brand strategies."],
  
  // Advanced Social Sciences
  ["문화인류학", "ယဉ်ကျေးမှု လူသားဗေဒ", "Social Science", "문화인류학을 연구합니다.", "I study cultural anthropology."],
  ["사회심리학", "လူမှုရေး စိတ်ပညာ", "Social Science", "사회심리학을 전공합니다.", "I major in social psychology."],
  ["정치경제학", "နိုင်ငံရေး စီးပွားရေး", "Social Science", "정치경제학을 공부합니다.", "I study political economy."],
  ["비교정치학", "နှိုင်းယှဉ် နိုင်ငံရေး", "Social Science", "비교정치학을 연구합니다.", "I study comparative politics."],
  ["국제관계", "နိုင်ငံတကာ ဆက်ဆံရေး", "Social Science", "국제관계를 전공합니다.", "I major in international relations."],
  ["공공정책", "အများပြည်သူ မူဝါဒ", "Social Science", "공공정책을 분석합니다.", "I analyze public policy."],
  ["행정학", "စီမံခန့်ခွဲရေး", "Social Science", "행정학을 공부합니다.", "I study public administration."],
  ["도시계획", "မြို့ပြ စီမံကိန်း", "Social Science", "도시계획을 수립합니다.", "I establish urban planning."],
  ["사회복지", "လူမှုရေး ကောင်းကျိုး", "Social Science", "사회복지를 실천합니다.", "I practice social welfare."],
  ["인권", "လူ့အခွင့်အရေး", "Social Science", "인권을 보호합니다.", "I protect human rights."],
  
  // Advanced Arts & Humanities
  ["미학이론", "အလှအပ သီအိုရီ", "Arts", "미학이론을 연구합니다.", "I study aesthetic theory."],
  ["문학비평", "စာပေ ဝေဖန်မှု", "Arts", "문학비평을 작성합니다.", "I write literary criticism."],
  ["예술사학", "အနုပညာ သမိုင်း", "Arts", "예술사학을 전공합니다.", "I major in art history."],
  ["문화연구", "ယဉ်ကျေးမှု သုတေသန", "Arts", "문화연구를 합니다.", "I conduct cultural studies."],
  ["비교문학", "နှိုင်းယှဉ် စာပေ", "Arts", "비교문학을 공부합니다.", "I study comparative literature."],
  ["수사학", "ဟောပြောမှု", "Arts", "수사학 기법을 배웁니다.", "I learn rhetorical techniques."],
  ["서사학", "ဇာတ်လမ်း", "Arts", "서사학을 연구합니다.", "I study narratology."],
  ["시학", "ကဗျာ", "Arts", "시학을 전공합니다.", "I major in poetics."],
  ["연극학", "ပြဇာတ်", "Arts", "연극학을 공부합니다.", "I study theater studies."],
  ["영화이론", "ရုပ်ရှင် သီအိုရီ", "Arts", "영화이론을 연구합니다.", "I study film theory."],
  
  // Advanced Legal Specialties
  ["국제상거래법", "နိုင်ငံတကာ ကုန်သွယ်ရေး ဥပဒေ", "Legal", "국제상거래법을 전공합니다.", "I major in international commercial law."],
  ["세법", "အခွန်ဥပဒေ", "Legal", "세법을 공부합니다.", "I study tax law."],
  ["환경법", "ပတ်ဝန်းကျင် ဥပဒေ", "Legal", "환경법을 연구합니다.", "I study environmental law."],
  ["지적재산법", "ဉာဏပစ္စည်း ဥပဒေ", "Legal", "지적재산법을 전공합니다.", "I major in intellectual property law."],
  ["노동법", "အလုပ်သမား ဥပဒေ", "Legal", "노동법을 공부합니다.", "I study labor law."],
  ["가족법", "မိသားစု ဥပဒေ", "Legal", "가족법을 연구합니다.", "I study family law."],
  ["형사소송법", "ရာဇဝတ်တရားစွဲဆိုမှု ဥပဒေ", "Legal", "형사소송법을 전공합니다.", "I major in criminal procedure law."],
  ["민사소송법", "ပြည်သူ့ တရားစွဲဆိုမှု ဥပဒေ", "Legal", "민사소송법을 공부합니다.", "I study civil procedure law."],
  ["국제인권법", "နိုင်ငံတကာ လူ့အခွင့်အရေး ဥပဒေ", "Legal", "국제인권법을 연구합니다.", "I study international human rights law."],
  ["해양법", "ပင်လယ် ဥပဒေ", "Legal", "해양법을 전공합니다.", "I major in maritime law."],
  
  // Advanced Environmental Science
  ["기후학", "ရာသီဥတု", "Environment", "기후학을 공부합니다.", "I study climatology."],
  ["대기과학", "လေထု သိပ္ပံ", "Environment", "대기과학을 연구합니다.", "I study atmospheric science."],
  ["해양학", "ပင်လယ် သိပ္ပံ", "Environment", "해양학을 전공합니다.", "I major in oceanography."],
  ["지질학", "မြေသိပ္ပံ", "Environment", "지질학을 공부합니다.", "I study geology."],
  ["환경화학", "ပတ်ဝန်းကျင် ဓာတုဗေဒ", "Environment", "환경화학을 연구합니다.", "I study environmental chemistry."],
  ["환경생물학", "ပတ်ဝန်းကျင် ဇီဝဗေဒ", "Environment", "환경생물학을 전공합니다.", "I major in environmental biology."],
  ["자원관리", "အရင်းအမြစ် စီမံခန့်ခွဲမှု", "Environment", "자원관리를 실천합니다.", "I practice resource management."],
  ["환경영향평가", "ပတ်ဝန်းကျင် သက်ရောက်မှု အကဲဖြတ်ခြင်း", "Environment", "환경영향평가를 실시합니다.", "I conduct environmental impact assessment."],
  ["생태복원", "ဂေဟစနစ် ပြန်လည်ထူထောင်ရေး", "Environment", "생태복원을 진행합니다.", "I proceed with ecological restoration."],
  ["환경정책", "ပတ်ဝန်းကျင် မူဝါဒ", "Environment", "환경정책을 수립합니다.", "I establish environmental policies."],
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

