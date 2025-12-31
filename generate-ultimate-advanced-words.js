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
  // Advanced Mathematics & Applied Sciences
  ["미분기하학", "ဒစ်ဖရန်ရှယ် ဂျီသြမေတြီ", "Mathematics", "미분기하학을 전공합니다.", "I major in differential geometry."],
  ["대수기하학", "က္ခရာသင်္ချာ ဂျီသြမေတြီ", "Mathematics", "대수기하학을 연구합니다.", "I study algebraic geometry."],
  ["위상기하학", "ထောပတ်လိုဂျီ ဂျီသြမေတြီ", "Mathematics", "위상기하학을 공부합니다.", "I study topological geometry."],
  ["미분위상수학", "ဒစ်ဖရန်ရှယ် ထောပတ်လိုဂျီ", "Mathematics", "미분위상수학을 전공합니다.", "I major in differential topology."],
  ["대수위상수학", "က္ခရာသင်္ချာ ထောပတ်လိုဂျီ", "Mathematics", "대수위상수학을 연구합니다.", "I study algebraic topology."],
  ["조합기하학", "ပေါင်းစပ်မှု ဂျီသြမေတြီ", "Mathematics", "조합기하학을 공부합니다.", "I study combinatorial geometry."],
  ["확률미분방정식", "ဖြစ်နိုင်ခြေ ဒစ်ဖရန်ရှယ် ညီမျှခြင်း", "Mathematics", "확률미분방정식을 전공합니다.", "I major in stochastic differential equations."],
  ["편미분방정식", "တစ်စိတ်တစ်ပိုင်း ဒစ်ဖရန်ရှယ် ညီမျှခြင်း", "Mathematics", "편미분방정식을 연구합니다.", "I study partial differential equations."],
  ["적분방정식", "အတိမ်တလျား ညီမျှခြင်း", "Mathematics", "적분방정식을 공부합니다.", "I study integral equations."],
  ["함수방정식", "လုပ်ဆောင်ချက် ညီမျှခြင်း", "Mathematics", "함수방정식을 전공합니다.", "I major in functional equations."],
  
  // Advanced Physics & Quantum Sciences
  ["양자광학", "ကွမ်တမ် အလင်း", "Physics", "양자광학을 연구합니다.", "I study quantum optics."],
  ["레이저물리학", "လေဆာ ရူပဗေဒ", "Physics", "레이저물리학을 전공합니다.", "I major in laser physics."],
  ["초전도체물리학", "စူပါ လျှပ်စစ်လမ်းကြောင်း ရူပဗေဒ", "Physics", "초전도체물리학을 공부합니다.", "I study superconductor physics."],
  ["나노물리학", "နာနို ရူပဗေဒ", "Physics", "나노물리학을 연구합니다.", "I study nanophysics."],
  ["생체물리학", "ဇီဝ ရူပဗေဒ", "Physics", "생체물리학을 전공합니다.", "I major in biophysics."],
  ["천체물리학", "နက္ခတ္တဗေဒ ရူပဗေဒ", "Physics", "천체물리학을 공부합니다.", "I study astrophysics."],
  ["입자물리학", "အမှုန် ရူပဗေဒ", "Physics", "입자물리학을 연구합니다.", "I study particle physics."],
  ["응집물질물리학", "စုစည်းထားသော ရူပဗေဒ", "Physics", "응집물질물리학을 전공합니다.", "I major in condensed matter physics."],
  ["플라즈마물리학", "ပလာစမာ ရူပဗေဒ", "Physics", "플라즈마물리학을 공부합니다.", "I study plasma physics."],
  ["양자역학", "ကွမ်တမ် စွမ်းအား", "Physics", "양자역학 이론을 공부합니다.", "I study quantum mechanics theory."],
  
  // Advanced Chemistry & Materials Science
  ["나노화학", "နာနို ဓာတုဗေဒ", "Chemistry", "나노화학을 전공합니다.", "I major in nanochemistry."],
  ["재료화학", "ပစ္စည်း ဓာတုဗေဒ", "Chemistry", "재료화학을 연구합니다.", "I study materials chemistry."],
  ["표면화학", "မျက်နှာပြင် ဓာတုဗေဒ", "Chemistry", "표면화학을 공부합니다.", "I study surface chemistry."],
  ["촉매화학", "ဖျန်းဆေး ဓာတုဗေဒ", "Chemistry", "촉매화학을 전공합니다.", "I major in catalysis chemistry."],
  ["전기화학", "လျှပ်စစ် ဓာတုဗေဒ", "Chemistry", "전기화학을 연구합니다.", "I study electrochemistry."],
  ["광화학", "အလင်း ဓာတုဗေဒ", "Chemistry", "광화학을 공부합니다.", "I study photochemistry."],
  ["열화학", "အပူ ဓာတုဗေဒ", "Chemistry", "열화학을 전공합니다.", "I major in thermochemistry."],
  ["결정화학", "ပုံဆောင်ခဲ ဓာတုဗေဒ", "Chemistry", "결정화학을 연구합니다.", "I study crystallography."],
  ["고분자화학", "ပိုလီမာ ဓာတုဗေဒ", "Chemistry", "고분자화학을 공부합니다.", "I study polymer chemistry."],
  ["유기금속화학", "အော်ဂဲနစ် သတ္တု ဓာတုဗေဒ", "Chemistry", "유기금속화학을 전공합니다.", "I major in organometallic chemistry."],
  
  // Advanced Biology & Life Sciences
  ["생명공학", "ဇီဝနည်းပညာ", "Biology", "생명공학 연구를 진행합니다.", "We conduct biotechnology research."],
  ["유전공학", "မျိုးရိုးဗီဇ အင်ဂျင်နီယာ", "Biology", "유전공학의 윤리를 논의합니다.", "We discuss the ethics of genetic engineering."],
  ["단백질공학", "ပရိုတိန်း အင်ဂျင်နီယာ", "Biology", "단백질공학을 연구합니다.", "I study protein engineering."],
  ["세포공학", "ဆဲလ် အင်ဂျင်နီယာ", "Biology", "세포공학을 전공합니다.", "I major in cell engineering."],
  ["조직공학", "တစ်ရှူး အင်ဂျင်နီယာ", "Biology", "조직공학을 공부합니다.", "I study tissue engineering."],
  ["생체재료", "ဇီဝ ပစ္စည်း", "Biology", "생체재료를 연구합니다.", "I study biomaterials."],
  ["생체의학", "ဇီဝ ဆေးပညာ", "Biology", "생체의학을 전공합니다.", "I major in biomedicine."],
  ["시스템생물학", "စနစ် ဇီဝဗေဒ", "Biology", "시스템생물학을 공부합니다.", "I study systems biology."],
  ["합성생물학", "ပေါင်းစပ်မှု ဇီဝဗေဒ", "Biology", "합성생물학을 연구합니다.", "I study synthetic biology."],
  ["계산생물학", "ကွန်ပျူတာ ဇီဝဗေဒ", "Biology", "계산생물학을 전공합니다.", "I major in computational biology."],
  
  // Advanced Computer Science & AI
  ["자연어처리", "သဘာဝ ဘာသာစကား လုပ်ဆောင်မှု", "Computer Science", "자연어처리를 연구합니다.", "I study natural language processing."],
  ["컴퓨터비전", "ကွန်ပျူတာ အမြင်", "Computer Science", "컴퓨터비전을 개발합니다.", "I develop computer vision."],
  ["강화학습", "အားကောင်းစေသော သင်ယူမှု", "Computer Science", "강화학습 알고리즘을 연구합니다.", "I study reinforcement learning algorithms."],
  ["전이학습", "ပြောင်းလဲသော သင်ယူမှု", "Computer Science", "전이학습을 적용합니다.", "I apply transfer learning."],
  ["앙상블학습", "ပေါင်းစည်းသော သင်ယူမှု", "Computer Science", "앙상블학습을 사용합니다.", "I use ensemble learning."],
  ["생성모델", "ဖန်တီးသော ပုံစံ", "Computer Science", "생성모델을 개발합니다.", "I develop generative models."],
  ["신경망", "အာရုံကြော ကွန်ရက်", "Computer Science", "신경망을 구축합니다.", "I build neural networks."],
  ["딥러닝", "နက်ရှိုင်းသော သင်ယူမှု", "Computer Science", "딥러닝 모델을 구축합니다.", "I build deep learning models."],
  ["머신러닝", "စက်သင်ယူမှု", "Computer Science", "머신러닝을 연구합니다.", "I study machine learning."],
  ["데이터마이닝", "ဒေတာ တူးဖော်မှု", "Computer Science", "데이터마이닝을 수행합니다.", "I perform data mining."],
  
  // Advanced Business & Management
  ["디지털경영", "ဒစ်ဂျစ်တယ် စီမံခန့်ခွဲမှု", "Business", "디지털경영을 도입합니다.", "We introduce digital management."],
  ["서비스경영", "ဝန်ဆောင်မှု စီမံခန့်ခွဲမှု", "Business", "서비스경영을 연구합니다.", "I study service management."],
  ["혁신경영", "ဆန်းသစ်တီထွင် စီမံခန့်ခွဲမှု", "Business", "혁신경영을 실천합니다.", "We practice innovation management."],
  ["전략경영", "နည်းဗျူဟာ စီမံခန့်ခွဲမှု", "Business", "전략경영을 연구합니다.", "I study strategic management."],
  ["지식경영", "အသိပညာ စီမံခန့်ခွဲမှု", "Business", "지식경영을 도입합니다.", "We introduce knowledge management."],
  ["조직학습", "အဖွဲ့အစည်း သင်ယူမှု", "Business", "조직학습을 촉진합니다.", "I promote organizational learning."],
  ["기업가정신", "စွန့်စားရဲသော စိတ်ဓာတ်", "Business", "기업가정신을 키웁니다.", "I cultivate entrepreneurship."],
  ["벤처경영", "စွန့်စားရဲသော စီမံခန့်ခွဲမှု", "Business", "벤처경영을 연구합니다.", "I study venture management."],
  ["글로벌경영", "ကမ္ဘာလုံး စီမံခန့်ခွဲမှု", "Business", "글로벌경영을 전공합니다.", "I major in global management."],
  ["지속가능경영", "ရေရှည်တည်တံ့သော စီမံခန့်ခွဲမှု", "Business", "지속가능경영을 실천합니다.", "We practice sustainable management."],
  
  // Advanced Social Sciences & Research
  ["정책연구", "မူဝါဒ သုတေသန", "Social Science", "정책연구를 수행합니다.", "I conduct policy research."],
  ["사회조사", "လူမှုရေး စစ်ဆေးမှု", "Social Science", "사회조사를 실시합니다.", "I conduct social surveys."],
  ["정량연구", "ကိန်းဂဏန်း သုတေသန", "Social Science", "정량연구를 합니다.", "I conduct quantitative research."],
  ["정성연구", "အရည်အသွေး သုတေသန", "Social Science", "정성연구를 전공합니다.", "I major in qualitative research."],
  ["혼합연구", "ရောနှော သုတေသန", "Social Science", "혼합연구를 연구합니다.", "I study mixed methods research."],
  ["행동연구", "အပြုအမူ သုတေသန", "Social Science", "행동연구를 공부합니다.", "I study behavioral research."],
  ["비교연구", "နှိုင်းယှဉ် သုတေသန", "Social Science", "비교연구를 전공합니다.", "I major in comparative research."],
  ["종단연구", "ရှည်လျားသော သုတေသန", "Social Science", "종단연구를 연구합니다.", "I study longitudinal research."],
  ["횡단연구", "ဖြတ်သန်း သုတေသန", "Social Science", "횡단연구를 공부합니다.", "I study cross-sectional research."],
  ["실험연구", "စမ်းသပ်မှု သုတေသန", "Social Science", "실험연구를 전공합니다.", "I major in experimental research."],
  
  // Advanced Arts & Creative Fields
  ["크리에이티브산업", "ဖန်တီးမှု စက်မှု", "Arts", "크리에이티브산업을 연구합니다.", "I study creative industries."],
  ["문화산업", "ယဉ်ကျေးမှု စက်မှု", "Arts", "문화산업을 전공합니다.", "I major in cultural industries."],
  ["콘텐츠산업", "အကြောင်းအရာ စက်မှု", "Arts", "콘텐츠산업을 공부합니다.", "I study content industries."],
  ["엔터테인먼트산업", "ဖျော်ဖြေရေး စက်မှု", "Arts", "엔터테인먼트산업을 연구합니다.", "I study entertainment industries."],
  ["문화정책", "ယဉ်ကျေးမှု မူဝါဒ", "Arts", "문화정책을 수립합니다.", "I establish cultural policies."],
  ["문화기획", "ယဉ်ကျေးမှု စီမံကိန်း", "Arts", "문화기획을 합니다.", "I do cultural planning."],
  ["예술경영", "အနုပညာ စီမံခန့်ခွဲမှု", "Arts", "예술경영을 전공합니다.", "I major in arts management."],
  ["갤러리경영", "ပြခန်း စီမံခန့်ခွဲမှု", "Arts", "갤러리경영을 연구합니다.", "I study gallery management."],
  ["문화마케팅", "ယဉ်ကျေးမှု စျေးကွက်ရှာဖွေရေး", "Arts", "문화마케팅을 공부합니다.", "I study cultural marketing."],
  ["예술후원", "အနုပညာ ထောက်ပံ့မှု", "Arts", "예술후원을 추진합니다.", "We promote arts sponsorship."],
  
  // Advanced Environmental & Climate
  ["기후변화", "ရာသီဥတု ပြောင်းလဲမှု", "Environment", "기후변화에 대응하세요.", "Respond to climate change."],
  ["기후적응", "ရာသီဥတု အလိုက်သင့်", "Environment", "기후적응을 연구합니다.", "I study climate adaptation."],
  ["기후완화", "ရာသီဥတု လျော့ပါးစေမှု", "Environment", "기후완화를 추진합니다.", "We promote climate mitigation."],
  ["탄소배출", "ကာဗွန် ထုတ်လွှတ်မှု", "Environment", "탄소배출을 감소시킵니다.", "We reduce carbon emissions."],
  ["탄소상쇄", "ကာဗွန် ပြန်လည်ထူထောင်ရေး", "Environment", "탄소상쇄를 실시합니다.", "I conduct carbon offsetting."],
  ["온실가스", "ဖန်လုံအိမ် ဓာတ်ငွေ့", "Environment", "온실가스 배출을 줄입니다.", "We reduce greenhouse gas emissions."],
  ["기후모델링", "ရာသီဥတု ပုံစံ", "Environment", "기후모델링을 연구합니다.", "I study climate modeling."],
  ["기후시나리오", "ရာသီဥတု ဇာတ်လမ်း", "Environment", "기후시나리오를 분석합니다.", "I analyze climate scenarios."],
  ["기후정책", "ရာသီဥတု မူဝါဒ", "Environment", "기후정책을 수립합니다.", "I establish climate policies."],
  ["기후금융", "ရာသီဥတု ငွေရေး", "Environment", "기후금융을 연구합니다.", "I study climate finance."],
  
  // Advanced Psychology & Behavioral Sciences
  ["인지행동치료", "သိမြင်မှု အပြုအမူ ကုသမှု", "Psychology", "인지행동치료를 받습니다.", "I receive cognitive behavioral therapy."],
  ["트라우마치료", "စိတ်ဒဏ်ရာ ကုသမှု", "Psychology", "트라우마치료를 연구합니다.", "I study trauma therapy."],
  ["가족치료", "မိသားစု ကုသမှု", "Psychology", "가족치료를 전공합니다.", "I major in family therapy."],
  ["집단치료", "အုပ်စု ကုသမှု", "Psychology", "집단치료를 공부합니다.", "I study group therapy."],
  ["예술치료", "အနုပညာ ကုသမှု", "Psychology", "예술치료를 연구합니다.", "I study art therapy."],
  ["음악치료", "ဂီတ ကုသမှု", "Psychology", "음악치료를 전공합니다.", "I major in music therapy."],
  ["놀이치료", "ကစားခြင်း ကုသမှု", "Psychology", "놀이치료를 공부합니다.", "I study play therapy."],
  ["인지재활", "သိမြင်မှု ပြန်လည်ထူထောင်ရေး", "Psychology", "인지재활을 연구합니다.", "I study cognitive rehabilitation."],
  ["신경재활", "အာရုံကြော ပြန်လည်ထူထောင်ရေး", "Psychology", "신경재활을 전공합니다.", "I major in neurorehabilitation."],
  ["정신건강증진", "စိတ်ကျန်းမာရေး တိုးတက်စေမှု", "Psychology", "정신건강증진을 추진합니다.", "We promote mental health."],
  
  // Advanced Legal & Regulatory
  ["규제법", "စည်းမျဉ်း ဥပဒေ", "Legal", "규제법을 연구합니다.", "I study regulatory law."],
  ["행정규제", "စီမံခန့်ခွဲရေး စည်းမျဉ်း", "Legal", "행정규제를 전공합니다.", "I major in administrative regulation."],
  ["경제규제", "စီးပွားရေး စည်းမျဉ်း", "Legal", "경제규제를 공부합니다.", "I study economic regulation."],
  ["환경규제", "ပတ်ဝန်းကျင် စည်းမျဉ်း", "Legal", "환경규제를 연구합니다.", "I study environmental regulation."],
  ["안전규제", "ဘေးကင်းရေး စည်းမျဉ်း", "Legal", "안전규제를 전공합니다.", "I major in safety regulation."],
  ["의료법", "ဆေးပညာ ဥပဒေ", "Legal", "의료법을 공부합니다.", "I study medical law."],
  ["생명윤리법", "ဇီဝ ကျင့်ဝတ် ဥပဒေ", "Legal", "생명윤리법을 연구합니다.", "I study bioethics law."],
  ["정보법", "သတင်းအချက်အလက် ဥပဒေ", "Legal", "정보법을 전공합니다.", "I major in information law."],
  ["프라이버시법", "ကိုယ်ရေးလုံခြုံမှု ဥပဒေ", "Legal", "프라이버시법을 공부합니다.", "I study privacy law."],
  ["사이버법", "ဆိုက်ဘာ ဥပဒေ", "Legal", "사이버법을 연구합니다.", "I study cyber law."],
  
  // Advanced Economics & Finance
  ["금융공학", "ငွေရေး အင်ဂျင်နီယာ", "Economics", "금융공학을 전공합니다.", "I major in financial engineering."],
  ["리스크관리", "အန္တရာယ် စီမံခန့်ခွဲမှု", "Economics", "리스크관리를 연구합니다.", "I study risk management."],
  ["파생상품", "ဆင်းသက်လာသော ကုန်ပစ္စည်း", "Economics", "파생상품 투자를 검토합니다.", "I review derivative investments."],
  ["포트폴리오이론", "ပို့ဆောင်မှု သီအိုရီ", "Economics", "포트폴리오이론을 공부합니다.", "I study portfolio theory."],
  ["자산배분", "ပိုင်ဆိုင်မှု ခွဲဝေမှု", "Economics", "자산배분 전략을 수립합니다.", "I establish asset allocation strategies."],
  ["재무모델링", "ဘဏ္ဍာရေး ပုံစံ", "Economics", "재무모델링을 구축합니다.", "I build financial models."],
  ["기업가치평가", "လုပ်ငန်း တန်ဖိုး အကဲဖြတ်မှု", "Economics", "기업가치평가를 합니다.", "I conduct business valuation."],
  ["자본시장", "အရင်းအနှီး စျေးကွက်", "Economics", "자본시장을 분석합니다.", "I analyze capital markets."],
  ["금융시장", "ငွေရေး စျေးကွက်", "Economics", "금융시장을 연구합니다.", "I study financial markets."],
  ["국제금융", "နိုင်ငံတကာ ငွေရေး", "Economics", "국제금융을 전공합니다.", "I major in international finance."],
  
  // Advanced Engineering & Systems
  ["로봇공학", "ရိုဘော့အင်ဂျင်နီယာ", "Engineering", "로봇공학을 전공합니다.", "I major in robotics engineering."],
  ["자동화시스템", "အလိုအလျောက် စနစ်", "Engineering", "자동화시스템을 개발합니다.", "I develop automation systems."],
  ["스마트팩토리", "စမတ် စက်ရုံ", "Engineering", "스마트팩토리를 구축합니다.", "I build smart factories."],
  ["산업4.0", "စက်မှု 4.0", "Engineering", "산업4.0을 연구합니다.", "I study Industry 4.0."],
  ["디지털트윈", "ဒစ်ဂျစ်တယ် ထပ်တူ", "Engineering", "디지털트윈을 개발합니다.", "I develop digital twins."],
  ["사이버물리시스템", "ဆိုက်ဘာ ရူပဗေဒ စနစ်", "Engineering", "사이버물리시스템을 연구합니다.", "I study cyber-physical systems."],
  ["지능형시스템", "ဉာဏ်ရည် စနစ်", "Engineering", "지능형시스템을 전공합니다.", "I major in intelligent systems."],
  ["자율시스템", "ကိုယ်ပိုင် စနစ်", "Engineering", "자율시스템을 공부합니다.", "I study autonomous systems."],
  ["협동로봇", "ပူးပေါင်းသော ရိုဘော့", "Engineering", "협동로봇을 개발합니다.", "I develop collaborative robots."],
  ["인간로봇상호작용", "လူ ရိုဘော့ အပြန်အလှန်", "Engineering", "인간로봇상호작용을 연구합니다.", "I study human-robot interaction."],
  
  // Advanced Medical & Health Sciences
  ["의료정보학", "ဆေးပညာ သတင်းအချက်အလက်", "Medical", "의료정보학을 전공합니다.", "I major in medical informatics."],
  ["원격진단", "အကွာအဝေး ရောဂါရှာဖွေမှု", "Medical", "원격진단을 연구합니다.", "I study telemedicine diagnosis."],
  ["의료영상", "ဆေးပညာ ပုံရိပ်", "Medical", "의료영상을 분석합니다.", "I analyze medical imaging."],
  ["생체신호", "ဇီဝ အချက်ပြ", "Medical", "생체신호를 연구합니다.", "I study biosignals."],
  ["의료로봇", "ဆေးပညာ ရိုဘော့", "Medical", "의료로봇을 개발합니다.", "I develop medical robots."],
  ["스마트의료", "စမတ် ဆေးပညာ", "Medical", "스마트의료를 연구합니다.", "I study smart healthcare."],
  ["개인맞춤의료", "ကိုယ်ပိုင် ဆေးပညာ", "Medical", "개인맞춤의료를 전공합니다.", "I major in personalized medicine."],
  ["유전자진단", "မျိုးရိုးဗီဇ ရောဂါရှာဖွေမှု", "Medical", "유전자진단을 연구합니다.", "I study genetic diagnosis."],
  ["바이오마커", "ဇီဝ အမှတ်အသား", "Medical", "바이오마커를 분석합니다.", "I analyze biomarkers."],
  ["의료빅데이터", "ဆေးပညာ ကြီးမားသော ဒေတာ", "Medical", "의료빅데이터를 연구합니다.", "I study medical big data."],
  ["정밀의학", "တိကျသော ဆေးပညာ", "Medical", "정밀의학 치료를 받습니다.", "I receive precision medicine treatment."],
  ["나노의학", "နာနို ဆေးပညာ", "Medical", "나노의학 기술을 개발합니다.", "We develop nanomedicine technology."],
  ["면역요법", "ကိုယ်ခံအား ကုသမှု", "Medical", "면역요법을 시도합니다.", "I try immunotherapy."],
  ["유전자치료", "မျိုးရိုးဗီဇ ကုသမှု", "Medical", "유전자치료 연구를 합니다.", "I conduct gene therapy research."],
  ["재생의학", "ပြန်လည်ထူထောင်ရေး ဆေးပညာ", "Medical", "재생의학을 연구합니다.", "I study regenerative medicine."],
  
  // Advanced Communication & Media Technology
  ["디지털전략", "ဒစ်ဂျစ်တယ် နည်းဗျူဟာ", "Communication", "디지털전략을 수립합니다.", "I establish digital strategies."],
  ["온라인마케팅", "အွန်လိုင်း စျေးကွက်ရှာဖွေရေး", "Communication", "온라인마케팅을 연구합니다.", "I study online marketing."],
  ["검색엔진최적화", "ရှာဖွေရေး အင်ဂျင် အကောင်းဆုံး", "Communication", "검색엔진최적화를 수행합니다.", "I perform SEO."],
  ["소셜미디어마케팅", "လူမှုရေး မီဒီယာ စျေးကွက်ရှာဖွေရေး", "Communication", "소셜미디어마케팅을 전략합니다.", "I strategize social media marketing."],
  ["이메일마케팅", "အီးမေးလ် စျေးကွက်ရှာဖွေရေး", "Communication", "이메일마케팅을 연구합니다.", "I study email marketing."],
  ["모바일마케팅", "မိုဘိုင်း စျေးကွက်ရှာဖွေရေး", "Communication", "모바일마케팅을 공부합니다.", "I study mobile marketing."],
  ["디지털광고", "ဒစ်ဂျစ်တယ် ကြော်ငြာ", "Communication", "디지털광고를 전공합니다.", "I major in digital advertising."],
  ["퍼포먼스마케팅", "စွမ်းဆောင်ရည် စျေးကွက်ရှာဖွေရေး", "Communication", "퍼포먼스마케팅을 연구합니다.", "I study performance marketing."],
  ["리타겟팅", "ပြန်လည် ရည်ရွယ်ချက်", "Communication", "리타겟팅을 전략합니다.", "I strategize retargeting."],
  ["컨버전최적화", "ပြောင်းလဲမှု အကောင်းဆုံး", "Communication", "컨버전최적화를 수행합니다.", "I perform conversion optimization."],
  ["콘텐츠전략", "အကြောင်းအရာ နည်းဗျူဟာ", "Communication", "콘텐츠전략을 수립합니다.", "I establish content strategy."],
  ["브랜드스토리텔링", "ကုန်အမှတ်တံဆိပ် ဇာတ်လမ်းပြောခြင်း", "Communication", "브랜드스토리텔링을 연구합니다.", "I study brand storytelling."],
  ["크로스미디어", "ဖြတ်သန်း မီဒီယာ", "Communication", "크로스미디어를 전공합니다.", "I major in cross-media."],
  ["트랜스미디어", "ဖြတ်သန်း မီဒီယာ", "Communication", "트랜스미디어를 공부합니다.", "I study transmedia."],
  ["모바일저널리즘", "မိုဘိုင်း သတင်းစာပညာ", "Communication", "모바일저널리즘을 연구합니다.", "I study mobile journalism."],
  
  // Advanced Education & Learning Technology
  ["교육공학", "ပညာရေး နည်းပညာ", "Education", "교육공학을 전공합니다.", "I major in educational technology."],
  ["이러닝", "အင်တာနက် သင်ယူမှု", "Education", "이러닝을 개발합니다.", "I develop e-learning."],
  ["모바일러닝", "မိုဘိုင်း သင်ယူမှု", "Education", "모바일러닝을 연구합니다.", "I study mobile learning."],
  ["게이미피케이션", "ဂိမ်းပြုလုပ်ခြင်း", "Education", "게이미피케이션을 적용합니다.", "I apply gamification."],
  ["적응형학습", "အလိုက်သင့် သင်ယူမှု", "Education", "적응형학습을 전공합니다.", "I major in adaptive learning."],
  ["개인화학습", "ကိုယ်ပိုင် သင်ယူမှု", "Education", "개인화학습을 연구합니다.", "I study personalized learning."],
  ["빅데이터교육", "ကြီးမားသော ဒေတာ ပညာရေး", "Education", "빅데이터교육을 공부합니다.", "I study big data education."],
  ["인공지능교육", "လူလုပ်ဉာဏ်ရည် ပညာရေး", "Education", "인공지능교육을 전공합니다.", "I major in AI education."],
  ["가상학습환경", "အတုအယောင် သင်ယူမှု ပတ်ဝန်းကျင်", "Education", "가상학습환경을 구축합니다.", "I build virtual learning environments."],
  ["학습분석", "သင်ယူမှု ခွဲခြမ်းစိတ်ဖြာမှု", "Education", "학습분석을 연구합니다.", "I study learning analytics."],
  ["직무교육", "အလုပ်အကိုင် ပညာရေး", "Education", "직무교육을 실시합니다.", "I conduct job training."],
  ["인재개발", "အရည်အသွေး ဖွံ့ဖြိုးတိုးတက်မှု", "Education", "인재개발을 추진합니다.", "We promote talent development."],
  ["역량개발", "စွမ်းရည် ဖွံ့ဖြိုးတိုးတက်မှု", "Education", "역량개발을 연구합니다.", "I study competency development."],
  ["리더십개발", "ဦးဆောင်မှု ဖွံ့ဖြိုးတိုးတက်မှု", "Education", "리더십개발을 전공합니다.", "I major in leadership development."],
  ["조직개발", "အဖွဲ့အစည်း ဖွံ့ဖြိုးတိုးတက်မှု", "Education", "조직개발을 연구합니다.", "I study organizational development."],
  
  // Advanced Agriculture & Food Technology
  ["스마트팜", "စမတ် လယ်ယာ", "Agriculture", "스마트팜을 구축합니다.", "I build smart farms."],
  ["정밀농업", "တိကျသော စိုက်ပျိုးရေး", "Agriculture", "정밀농업을 전공합니다.", "I major in precision agriculture."],
  ["농업IoT", "စိုက်ပျိုးရေး အင်တာနက် အရာဝတ္ထု", "Agriculture", "농업IoT를 연구합니다.", "I study agricultural IoT."],
  ["스마트축산", "စမတ် မွေးမြူရေး", "Agriculture", "스마트축산을 공부합니다.", "I study smart livestock farming."],
  ["식품안전관리", "အစားအစာ ဘေးကင်းရေး စီမံခန့်ခွဲမှု", "Agriculture", "식품안전관리를 연구합니다.", "I study food safety management."],
  ["식품품질관리", "အစားအစာ အရည်အသွေး စီမံခန့်ခွဲမှု", "Agriculture", "식품품질관리를 전공합니다.", "I major in food quality management."],
  ["식품가공", "အစားအစာ လုပ်ဆောင်မှု", "Agriculture", "식품가공을 연구합니다.", "I study food processing."],
  ["식품보존", "အစားအစာ ထိန်းသိမ်းမှု", "Agriculture", "식품보존을 공부합니다.", "I study food preservation."],
  ["식품포장", "အစားအစာ ထုပ်ပိုးမှု", "Agriculture", "식품포장을 전공합니다.", "I major in food packaging."],
  ["식품유통", "အစားအစာ ဖြန့်ဖြူးမှု", "Agriculture", "식품유통을 연구합니다.", "I study food distribution."],
  ["수직농업", "ဒေါင်လိုက် စိုက်ပျိုးရေး", "Agriculture", "수직농업을 연구합니다.", "I study vertical farming."],
  ["유기농업", "အော်ဂဲနစ် စိုက်ပျိုးရေး", "Agriculture", "유기농업을 전공합니다.", "I major in organic farming."],
  ["지속가능농업", "ရေရှည်တည်တံ့သော စိုက်ပျိုးရေး", "Agriculture", "지속가능농업을 공부합니다.", "I study sustainable agriculture."],
  ["디지털농업", "ဒစ်ဂျစ်တယ် စိုက်ပျိုးရေး", "Agriculture", "디지털농업을 연구합니다.", "I study digital agriculture."],
  ["농업로봇", "စိုက်ပျိုးရေး ရိုဘော့", "Agriculture", "농업로봇을 개발합니다.", "I develop agricultural robots."],
  
  // Advanced Architecture & Smart Cities
  ["스마트시티", "စမတ် မြို့", "Architecture", "스마트시티를 계획합니다.", "I plan smart cities."],
  ["도시재생", "မြို့ပြ ပြန်လည်ထူထောင်ရေး", "Architecture", "도시재생을 계획합니다.", "I plan urban regeneration."],
  ["그린빌딩", "အစိမ်းရောင် အဆောက်အဦ", "Architecture", "그린빌딩을 설계합니다.", "I design green buildings."],
  ["에너지효율", "စွမ်းအင် ထိရောက်မှု", "Architecture", "에너지효율을 높입니다.", "We increase energy efficiency."],
  ["친환경건축", "ပတ်ဝန်းကျင် နှင့် သင့်လျော်သော ဗိသုကာ", "Architecture", "친환경건축을 연구합니다.", "I study eco-friendly architecture."],
  ["패시브디자인", "ဆိုးသွမ်းသော ဒီဇိုင်း", "Architecture", "패시브디자인을 전공합니다.", "I major in passive design."],
  ["바이오필릭디자인", "ဇီဝ နှစ်သက်သော ဒီဇိုင်း", "Architecture", "바이오필릭디자인을 연구합니다.", "I study biophilic design."],
  ["도시계획", "မြို့ပြ စီမံကိန်း", "Architecture", "도시계획을 수립합니다.", "I establish urban planning."],
  ["조경설계", "ဥယျာဉ် ဒီဇိုင်း", "Architecture", "조경설계를 전공합니다.", "I major in landscape design."],
  ["공간디자인", "နေရာ ဒီဇိုင်း", "Architecture", "공간디자인을 연구합니다.", "I study spatial design."],
  ["스마트건축", "စမတ် ဗိသုကာ", "Architecture", "스마트건축을 연구합니다.", "I study smart architecture."],
  ["생체모방건축", "ဇီဝ အတုယူ ဗိသုကာ", "Architecture", "생체모방건축을 전공합니다.", "I major in biomimetic architecture."],
  ["패시브하우스", "ဆိုးသွမ်းသော အိမ်", "Architecture", "패시브하우스를 설계합니다.", "I design passive houses."],
  ["제로에너지건물", "သုည စွမ်းအင် အဆောက်အဦ", "Architecture", "제로에너지건물을 구축합니다.", "I build zero-energy buildings."],
  ["컴팩트시티", "ကျစ်လစ်သော မြို့", "Architecture", "컴팩트시티를 설계합니다.", "I design compact cities."],
  
  // Advanced Sports & Exercise Science
  ["스포츠과학", "အားကစား သိပ္ပံ", "Sports", "스포츠과학을 전공합니다.", "I major in sports science."],
  ["운동생리학", "လေ့ကျင့်ခန်း ဇီဝကမ္မဗေဒ", "Sports", "운동생리학을 전공합니다.", "I major in exercise physiology."],
  ["스포츠의학", "အားကစား ဆေးပညာ", "Sports", "스포츠의학을 연구합니다.", "I study sports medicine."],
  ["운동역학", "လေ့ကျင့်ခန်း စွမ်းအား", "Sports", "운동역학을 공부합니다.", "I study biomechanics."],
  ["스포츠영양학", "အားကစား အာဟာရ", "Sports", "스포츠영양학을 전공합니다.", "I major in sports nutrition."],
  ["재활운동", "ပြန်လည်ထူထောင်ရေး လေ့ကျင့်ခန်း", "Sports", "재활운동을 연구합니다.", "I study rehabilitation exercise."],
  ["운동처방", "လေ့ကျင့်ခန်း ညွှန်ကြားမှု", "Sports", "운동처방을 공부합니다.", "I study exercise prescription."],
  ["스포츠코칭", "အားကစား သင်ကြားမှု", "Sports", "스포츠코칭을 전공합니다.", "I major in sports coaching."],
  ["스포츠경영", "အားကစား စီမံခန့်ခွဲမှု", "Sports", "스포츠경영을 연구합니다.", "I study sports management."],
  ["체육학", "ကာယပညာ", "Sports", "체육학을 공부합니다.", "I study physical education."],
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

