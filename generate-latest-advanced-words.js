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
  // Advanced Mathematics & Applied Math
  ["미분방정식", "ဒစ်ဖရန်ရှယ် ညီမျှခြင်း", "Mathematics", "미분방정식을 풉니다.", "I solve differential equations."],
  ["적분방정식", "အတိမ်တလျား ညီမျှခြင်း", "Mathematics", "적분방정식을 연구합니다.", "I study integral equations."],
  ["편미분방정식", "တစ်စိတ်တစ်ပိုင်း ဒစ်ဖရန်ရှယ် ညီမျှခြင်း", "Mathematics", "편미분방정식을 전공합니다.", "I major in partial differential equations."],
  ["복소해석학", "ရှုပ်ထွေးသော ခွဲခြမ်းစိတ်ဖြာမှု", "Mathematics", "복소해석학을 공부합니다.", "I study complex analysis."],
  ["함수해석학", "လုပ်ဆောင်ချက် ခွဲခြမ်းစိတ်ဖြာမှု", "Mathematics", "함수해석학을 연구합니다.", "I study functional analysis."],
  ["대수기하학", "က္ခရာသင်္ချာ ဂျီသြမေတြီ", "Mathematics", "대수기하학을 전공합니다.", "I major in algebraic geometry."],
  ["미분기하학", "ဒစ်ဖရန်ရှယ် ဂျီသြမေတြီ", "Mathematics", "미분기하학을 공부합니다.", "I study differential geometry."],
  ["군론", "အုပ်စု သီအိုရီ", "Mathematics", "군론을 연구합니다.", "I study group theory."],
  ["환론", "အခွန်ဝန် သီအိုရီ", "Mathematics", "환론을 전공합니다.", "I major in ring theory."],
  ["체론", "ကွင်းဆက် သီအိုရီ", "Mathematics", "체론을 공부합니다.", "I study field theory."],
  
  // Advanced Physics Specializations
  ["양자광학", "ကွမ်တမ် အလင်း", "Physics", "양자광학을 연구합니다.", "I study quantum optics."],
  ["레이저물리학", "လေဆာ ရူပဗေဒ", "Physics", "레이저물리학을 전공합니다.", "I major in laser physics."],
  ["초전도체", "စူပါ လျှပ်စစ်လမ်းကြောင်း", "Physics", "초전도체를 연구합니다.", "I study superconductors."],
  ["반도체물리학", "ဆီမီကွန်ဒတ်တာ ရူပဗေဒ", "Physics", "반도체물리학을 공부합니다.", "I study semiconductor physics."],
  ["나노물리학", "နာနို ရူပဗေဒ", "Physics", "나노물리학을 전공합니다.", "I major in nanophysics."],
  ["생체물리학", "ဇီဝ ရူပဗေဒ", "Physics", "생체물리학을 연구합니다.", "I study biophysics."],
  ["천체역학", "နက္ခတ္တဗေဒ စွမ်းအား", "Physics", "천체역학을 공부합니다.", "I study celestial mechanics."],
  ["통계물리학", "စာရင်းအင်း ရူပဗေဒ", "Physics", "통계물리학을 전공합니다.", "I major in statistical physics."],
  ["고체물리학", "အစိုင်အခဲ ရူပဗေဒ", "Physics", "고체물리학을 연구합니다.", "I study solid state physics."],
  ["플라즈마물리학", "ပလာစမာ ရူပဗေဒ", "Physics", "플라즈마물리학을 공부합니다.", "I study plasma physics."],
  
  // Advanced Chemistry Specializations
  ["유기합성", "အော်ဂဲနစ် ပေါင်းစပ်မှု", "Chemistry", "유기합성을 연구합니다.", "I study organic synthesis."],
  ["무기합성", "အော်ဂဲနစ် မဟုတ်သော ပေါင်းစပ်မှု", "Chemistry", "무기합성을 전공합니다.", "I major in inorganic synthesis."],
  ["고분자화학", "ပိုလီမာ ဓာတုဗေဒ", "Chemistry", "고분자화학을 공부합니다.", "I study polymer chemistry."],
  ["유기금속화학", "အော်ဂဲနစ် သတ္တု ဓာတုဗေဒ", "Chemistry", "유기금속화학을 연구합니다.", "I study organometallic chemistry."],
  ["촉매화학", "ဖျန်းဆေး ဓာတုဗေဒ", "Chemistry", "촉매화학을 전공합니다.", "I major in catalysis chemistry."],
  ["전기화학", "လျှပ်စစ် ဓာတုဗေဒ", "Chemistry", "전기화학을 공부합니다.", "I study electrochemistry."],
  ["광화학", "အလင်း ဓာတုဗေဒ", "Chemistry", "광화학을 연구합니다.", "I study photochemistry."],
  ["열화학", "အပူ ဓာတုဗေဒ", "Chemistry", "열화학을 전공합니다.", "I major in thermochemistry."],
  ["결정화학", "ပုံဆောင်ခဲ ဓာတုဗေဒ", "Chemistry", "결정화학을 공부합니다.", "I study crystallography."],
  ["표면화학", "မျက်နှာပြင် ဓာတုဗေဒ", "Chemistry", "표면화학을 연구합니다.", "I study surface chemistry."],
  
  // Advanced Biology Specializations
  ["분자생물학", "မော်လီကျူး ဇီဝဗေဒ", "Biology", "분자생물학을 전공합니다.", "I major in molecular biology."],
  ["세포생물학", "ဆဲလ် ဇီဝဗေဒ", "Biology", "세포생물학을 연구합니다.", "I study cell biology."],
  ["발생생물학", "ဖွံ့ဖြိုးမှု ဇီဝဗေဒ", "Biology", "발생생물학을 공부합니다.", "I study developmental biology."],
  ["진화생물학", "ဆင့်ကဲဖြစ်စဉ် ဇီဝဗေဒ", "Biology", "진화생물학을 전공합니다.", "I major in evolutionary biology."],
  ["생태생물학", "ဂေဟစနစ် ဇီဝဗေဒ", "Biology", "생태생물학을 연구합니다.", "I study ecological biology."],
  ["해양생물학", "ပင်လယ် ဇီဝဗေဒ", "Biology", "해양생물학을 공부합니다.", "I study marine biology."],
  ["식물생리학", "အပင်များ ဇီဝကမ္မဗေဒ", "Biology", "식물생리학을 전공합니다.", "I major in plant physiology."],
  ["동물생리학", "တိရစ္ဆာန်များ ဇီဝကမ္မဗေဒ", "Biology", "동물생리학을 연구합니다.", "I study animal physiology."],
  ["미생물생리학", "ပိုးမွှားများ ဇီဝကမ္မဗေဒ", "Biology", "미생물생리학을 공부합니다.", "I study microbial physiology."],
  ["생화학", "ဇီဝ ဓာတုဗေဒ", "Biology", "생화학을 전공합니다.", "I major in biochemistry."],
  
  // Advanced Computer Science & AI
  ["머신러닝", "စက်သင်ယူမှု", "Computer Science", "머신러닝을 연구합니다.", "I study machine learning."],
  ["딥러닝", "နက်ရှိုင်းသော သင်ယူမှု", "Computer Science", "딥러닝 모델을 개발합니다.", "I develop deep learning models."],
  ["자연어처리", "သဘာဝ ဘာသာစကား လုပ်ဆောင်မှု", "Computer Science", "자연어처리를 연구합니다.", "I study natural language processing."],
  ["컴퓨터비전", "ကွန်ပျူတာ အမြင်", "Computer Science", "컴퓨터비전을 개발합니다.", "I develop computer vision."],
  ["강화학습", "အားကောင်းစေသော သင်ယူမှု", "Computer Science", "강화학습 알고리즘을 연구합니다.", "I study reinforcement learning algorithms."],
  ["전이학습", "ပြောင်းလဲသော သင်ယူမှု", "Computer Science", "전이학습을 적용합니다.", "I apply transfer learning."],
  ["앙상블학습", "ပေါင်းစည်းသော သင်ယူမှု", "Computer Science", "앙상블학습을 사용합니다.", "I use ensemble learning."],
  ["생성모델", "ဖန်တီးသော ပုံစံ", "Computer Science", "생성모델을 개발합니다.", "I develop generative models."],
  ["신경망", "အာရုံကြော ကွန်ရက်", "Computer Science", "신경망을 구축합니다.", "I build neural networks."],
  ["데이터마이닝", "ဒေတာ တူးဖော်မှု", "Computer Science", "데이터마이닝을 수행합니다.", "I perform data mining."],
  
  // Advanced Business & Strategy
  ["전략경영", "နည်းဗျူဟာ စီမံခန့်ခွဲမှု", "Business", "전략경영을 연구합니다.", "I study strategic management."],
  ["혁신경영", "ဆန်းသစ်တီထွင် စီမံခန့်ခွဲမှု", "Business", "혁신경영을 실천합니다.", "I practice innovation management."],
  ["지식경영", "အသိပညာ စီမံခန့်ခွဲမှု", "Business", "지식경영을 도입합니다.", "I introduce knowledge management."],
  ["조직학습", "အဖွဲ့အစည်း သင်ယူမှု", "Business", "조직학습을 촉진합니다.", "I promote organizational learning."],
  ["기업가정신", "စွန့်စားရဲသော စိတ်ဓာတ်", "Business", "기업가정신을 키웁니다.", "I cultivate entrepreneurship."],
  ["벤처경영", "စွန့်စားရဲသော စီမံခန့်ခွဲမှု", "Business", "벤처경영을 연구합니다.", "I study venture management."],
  ["글로벌경영", "ကမ္ဘာလုံး စီမံခန့်ခွဲမှု", "Business", "글로벌경영을 전공합니다.", "I major in global management."],
  ["지속가능경영", "ရေရှည်တည်တံ့သော စီမံခန့်ခွဲမှု", "Business", "지속가능경영을 실천합니다.", "I practice sustainable management."],
  ["디지털경영", "ဒစ်ဂျစ်တယ် စီမံခန့်ခွဲမှု", "Business", "디지털경영을 도입합니다.", "I introduce digital management."],
  ["서비스경영", "ဝန်ဆောင်မှု စီမံခန့်ခွဲမှု", "Business", "서비스경영을 연구합니다.", "I study service management."],
  
  // Advanced Social Sciences & Humanities
  ["문화연구", "ယဉ်ကျေးမှု သုတေသန", "Social Science", "문화연구를 합니다.", "I conduct cultural studies."],
  ["비교문화학", "နှိုင်းယှဉ် ယဉ်ကျေးမှု", "Social Science", "비교문화학을 연구합니다.", "I study comparative culture."],
  ["문화인류학", "ယဉ်ကျေးမှု လူသားဗေဒ", "Social Science", "문화인류학을 전공합니다.", "I major in cultural anthropology."],
  ["역사학", "သမိုင်း", "Social Science", "역사학을 공부합니다.", "I study history."],
  ["고고학", "ရှေးဟောင်း သုတေသန", "Social Science", "고고학 발굴을 합니다.", "I conduct archaeological excavations."],
  ["인류학", "လူသားဗေဒ", "Social Science", "인류학을 연구합니다.", "I study anthropology."],
  ["민속학", "လူမှုရေး ရိုးရာ", "Social Science", "민속학을 전공합니다.", "I major in folklore studies."],
  ["종교학", "ဘာသာရေး", "Social Science", "종교학을 공부합니다.", "I study religious studies."],
  ["신학", "ဘာသာရေး သိပ္ပံ", "Social Science", "신학을 연구합니다.", "I study theology."],
  ["철학사", "ဒဿနိကဗေဒ သမိုင်း", "Social Science", "철학사를 전공합니다.", "I major in history of philosophy."],
  
  // Advanced Arts & Creative Fields
  ["예술사", "အနုပညာ သမိုင်း", "Arts", "예술사를 강의합니다.", "I lecture on art history."],
  ["미술사", "ပန်းချီ သမိုင်း", "Arts", "미술사를 연구합니다.", "I study art history."],
  ["음악사", "ဂီတ သမိုင်း", "Arts", "음악사를 전공합니다.", "I major in music history."],
  ["문학사", "စာပေ သမိုင်း", "Arts", "문학사를 공부합니다.", "I study literary history."],
  ["연극사", "ပြဇာတ် သမိုင်း", "Arts", "연극사를 연구합니다.", "I study theater history."],
  ["영화사", "ရုပ်ရှင် သမိုင်း", "Arts", "영화사를 전공합니다.", "I major in film history."],
  ["예술비평", "အနုပညာ ဝေဖန်မှု", "Arts", "예술비평을 작성합니다.", "I write art criticism."],
  ["문학비평", "စာပေ ဝေဖန်မှု", "Arts", "문학비평을 연구합니다.", "I study literary criticism."],
  ["문화비평", "ယဉ်ကျေးမှု ဝေဖန်မှု", "Arts", "문화비평을 전공합니다.", "I major in cultural criticism."],
  ["예술철학", "အနုပညာ ဒဿနိကဗေဒ", "Arts", "예술철학을 공부합니다.", "I study philosophy of art."],
  
  // Advanced Environmental Sciences
  ["기후학", "ရာသီဥတု", "Environment", "기후학을 공부합니다.", "I study climatology."],
  ["대기과학", "လေထု သိပ္ပံ", "Environment", "대기과학을 연구합니다.", "I study atmospheric science."],
  ["해양과학", "ပင်လယ် သိပ္ပံ", "Environment", "해양과학을 전공합니다.", "I major in oceanography."],
  ["지구과학", "ကမ္ဘာ သိပ္ပံ", "Environment", "지구과학을 공부합니다.", "I study earth science."],
  ["환경화학", "ပတ်ဝန်းကျင် ဓာတုဗေဒ", "Environment", "환경화학을 연구합니다.", "I study environmental chemistry."],
  ["환경생물학", "ပတ်ဝန်းကျင် ဇီဝဗေဒ", "Environment", "환경생물학을 전공합니다.", "I major in environmental biology."],
  ["생태학", "ဂေဟဗေဒ", "Environment", "생태학을 공부합니다.", "I study ecology."],
  ["보전생물학", "ထိန်းသိမ်းမှု ဇီဝဗေဒ", "Environment", "보전생물학을 연구합니다.", "I study conservation biology."],
  ["환경공학", "ပတ်ဝန်းကျင် အင်ဂျင်နီယာ", "Environment", "환경공학을 전공합니다.", "I major in environmental engineering."],
  ["지속가능성", "ရေရှည်တည်တံ့မှု", "Environment", "지속가능성을 추구합니다.", "I pursue sustainability."],
  
  // Advanced Psychology Specializations
  ["임상심리학", "ကုသမှု စိတ်ပညာ", "Psychology", "임상심리학을 전공합니다.", "I major in clinical psychology."],
  ["상담심리학", "အကြံပေးမှု စိတ်ပညာ", "Psychology", "상담심리학을 연구합니다.", "I study counseling psychology."],
  ["건강심리학", "ကျန်းမာရေး စိတ်ပညာ", "Psychology", "건강심리학을 공부합니다.", "I study health psychology."],
  ["산업심리학", "စက်မှု စိတ်ပညာ", "Psychology", "산업심리학을 전공합니다.", "I major in industrial psychology."],
  ["교육심리학", "ပညာရေး စိတ်ပညာ", "Psychology", "교육심리학을 연구합니다.", "I study educational psychology."],
  ["법의심리학", "ဥပဒေ စိတ်ပညာ", "Psychology", "법의심리학을 공부합니다.", "I study forensic psychology."],
  ["스포츠심리학", "အားကစား စိတ်ပညာ", "Psychology", "스포츠심리학을 전공합니다.", "I major in sports psychology."],
  ["환경심리학", "ပတ်ဝန်းကျင် စိတ်ပညာ", "Psychology", "환경심리학을 연구합니다.", "I study environmental psychology."],
  ["문화심리학", "ယဉ်ကျေးမှု စိတ်ပညာ", "Psychology", "문화심리학을 공부합니다.", "I study cultural psychology."],
  ["긍정심리학", "အပြုသဘော စိတ်ပညာ", "Psychology", "긍정심리학을 전공합니다.", "I major in positive psychology."],
  
  // Advanced Legal Specializations
  ["국제법", "နိုင်ငံတကာ ဥပဒေ", "Legal", "국제법을 전공합니다.", "I major in international law."],
  ["국제인권법", "နိုင်ငံတကာ လူ့အခွင့်အရေး ဥပဒေ", "Legal", "국제인권법을 연구합니다.", "I study international human rights law."],
  ["국제상거래법", "နိုင်ငံတကာ ကုန်သွယ်ရေး ဥပဒေ", "Legal", "국제상거래법을 공부합니다.", "I study international commercial law."],
  ["환경법", "ပတ်ဝန်းကျင် ဥပဒေ", "Legal", "환경법을 전공합니다.", "I major in environmental law."],
  ["해양법", "ပင်လယ် ဥပဒေ", "Legal", "해양법을 연구합니다.", "I study maritime law."],
  ["우주법", "အာကာသ ဥပဒေ", "Legal", "우주법을 공부합니다.", "I study space law."],
  ["인터넷법", "အင်တာနက် ဥပဒေ", "Legal", "인터넷법을 전공합니다.", "I major in internet law."],
  ["데이터보호법", "ဒေတာ ကာကွယ်ရေး ဥပဒေ", "Legal", "데이터보호법을 연구합니다.", "I study data protection law."],
  ["지적재산법", "ဉာဏပစ္စည်း ဥပဒေ", "Legal", "지적재산법을 공부합니다.", "I study intellectual property law."],
  ["경쟁법", "ယှဉ်ပြိုင်မှု ဥပဒေ", "Legal", "경쟁법을 전공합니다.", "I major in competition law."],
  
  // Advanced Economics Specializations
  ["계량경제학", "စာရင်းအင်း စီးပွားရေး", "Economics", "계량경제학을 전공합니다.", "I major in econometrics."],
  ["재정학", "ဘဏ္ဍာရေး", "Economics", "재정학을 연구합니다.", "I study public finance."],
  ["금융경제학", "ငွေရေး စီးပွားရေး", "Economics", "금융경제학을 공부합니다.", "I study financial economics."],
  ["국제경제학", "နိုင်ငံတကာ စီးပွားရေး", "Economics", "국제경제학을 전공합니다.", "I major in international economics."],
  ["산업경제학", "စက်မှု စီးပွားရေး", "Economics", "산업경제학을 연구합니다.", "I study industrial economics."],
  ["노동경제학", "အလုပ်သမား စီးပွားရေး", "Economics", "노동경제학을 공부합니다.", "I study labor economics."],
  ["환경경제학", "ပတ်ဝန်းကျင် စီးပွားရေး", "Economics", "환경경제학을 전공합니다.", "I major in environmental economics."],
  ["발전경제학", "ဖွံ့ဖြိုးတိုးတက်မှု စီးပွားရေး", "Economics", "발전경제학을 연구합니다.", "I study development economics."],
  ["행동경제학", "အပြုအမူ စီးပွားရေး", "Economics", "행동경제학을 공부합니다.", "I study behavioral economics."],
  ["게임이론", "ဂိမ်း သီအိုရီ", "Economics", "게임이론을 적용합니다.", "I apply game theory."],
  
  // Advanced Engineering & Technology
  ["나노공학", "နာနို အင်ဂျင်နီယာ", "Engineering", "나노공학을 전공합니다.", "I major in nanoengineering."],
  ["바이오공학", "ဇီဝ အင်ဂျင်နီယာ", "Engineering", "바이오공학을 연구합니다.", "I study bioengineering."],
  ["에너지공학", "စွမ်းအင် အင်ဂျင်နီယာ", "Engineering", "에너지공학을 공부합니다.", "I study energy engineering."],
  ["소재공학", "ပစ္စည်း အင်ဂျင်နီယာ", "Engineering", "소재공학을 전공합니다.", "I major in materials engineering."],
  ["시스템공학", "စနစ် အင်ဂျင်နီယာ", "Engineering", "시스템공학을 연구합니다.", "I study systems engineering."],
  ["제어공학", "ထိန်းချုပ်မှု အင်ဂျင်နီယာ", "Engineering", "제어공학을 공부합니다.", "I study control engineering."],
  ["신호처리", "အချက်ပြ လုပ်ဆောင်မှု", "Engineering", "신호처리를 연구합니다.", "I study signal processing."],
  ["임베디드시스템", "ထည့်သွင်းထားသော စနစ်", "Engineering", "임베디드시스템을 개발합니다.", "I develop embedded systems."],
  ["사이버보안", "ဆိုက်ဘာ လုံခြုံရေး", "Engineering", "사이버보안을 강화합니다.", "I strengthen cybersecurity."],
  ["클라우드컴퓨팅", "ကလောက်ဒ် ကွန်ပျူတာ", "Engineering", "클라우드컴퓨팅을 활용합니다.", "I utilize cloud computing."],
  
  // Advanced Communication & Media Studies
  ["디지털저널리즘", "ဒစ်ဂျစ်တယ် သတင်းစာပညာ", "Communication", "디지털저널리즘을 연구합니다.", "I study digital journalism."],
  ["멀티미디어저널리즘", "များစွာ မီဒီယာ သတင်းစာပညာ", "Communication", "멀티미디어저널리즘을 전공합니다.", "I major in multimedia journalism."],
  ["데이터저널리즘", "ဒေတာ သတင်းစာပညာ", "Communication", "데이터저널리즘을 공부합니다.", "I study data journalism."],
  ["브랜드커뮤니케이션", "ကုန်အမှတ်တံဆိပ် ဆက်သွယ်ရေး", "Communication", "브랜드커뮤니케이션을 연구합니다.", "I study brand communication."],
  ["크리에이티브커뮤니케이션", "ဖန်တီးမှု ဆက်သွယ်ရေး", "Communication", "크리에이티브커뮤니케이션을 전공합니다.", "I major in creative communication."],
  ["미디어리터러시", "မီဒီယာ စာတတ်မြောက်မှု", "Communication", "미디어리터러시를 교육합니다.", "I teach media literacy."],
  ["소셜미디어", "လူမှုရေး မီဒီယာ", "Communication", "소셜미디어를 활용합니다.", "I utilize social media."],
  ["콘텐츠마케팅", "အကြောင်းအရာ စျေးကွက်ရှာဖွေရေး", "Communication", "콘텐츠마케팅을 전략합니다.", "I strategize content marketing."],
  ["디지털스토리텔링", "ဒစ်ဂျစ်တယ် ဇာတ်လမ်းပြောခြင်း", "Communication", "디지털스토리텔링을 연구합니다.", "I study digital storytelling."],
  ["미디어아트", "မီဒီယာ အနုပညာ", "Communication", "미디어아트를 전공합니다.", "I major in media art."],
  
  // Advanced Education & Learning
  ["평생교육", "တစ်သက်တာ ပညာရေး", "Education", "평생교육을 연구합니다.", "I study lifelong education."],
  ["성인교육", "လူကြီး ပညာရေး", "Education", "성인교육을 전공합니다.", "I major in adult education."],
  ["원격교육", "အကွာအဝေး ပညာရေး", "Education", "원격교육을 공부합니다.", "I study distance education."],
  ["온라인교육", "အွန်လိုင်း ပညာရေး", "Education", "온라인교육을 연구합니다.", "I study online education."],
  ["혼합학습", "ရောနှော သင်ယူမှု", "Education", "혼합학습을 전공합니다.", "I major in blended learning."],
  ["협동학습", "ပူးပေါင်းသော သင်ယူမှု", "Education", "협동학습을 공부합니다.", "I study collaborative learning."],
  ["문제중심학습", "ပြဿနာ အခြေခံ သင်ယူမှု", "Education", "문제중심학습을 연구합니다.", "I study problem-based learning."],
  ["프로젝트학습", "စီမံကိန်း သင်ယူမှု", "Education", "프로젝트학습을 전공합니다.", "I major in project-based learning."],
  ["역량기반교육", "စွမ်းရည် အခြေခံ ပညာရေး", "Education", "역량기반교육을 공부합니다.", "I study competency-based education."],
  ["미래교육", "အနာဂတ် ပညာရေး", "Education", "미래교육을 연구합니다.", "I study future education."],
  
  // Advanced Agriculture & Food Sciences
  ["농업생명공학", "စိုက်ပျိုးရေး ဇီဝနည်းပညာ", "Agriculture", "농업생명공학을 전공합니다.", "I major in agricultural biotechnology."],
  ["식품공학", "အစားအစာ အင်ဂျင်နီယာ", "Agriculture", "식품공학을 연구합니다.", "I study food engineering."],
  ["식품미생물학", "အစားအစာ ပိုးမွှား", "Agriculture", "식품미생물학을 공부합니다.", "I study food microbiology."],
  ["식품화학", "အစားအစာ ဓာတုဗေဒ", "Agriculture", "식품화학을 전공합니다.", "I major in food chemistry."],
  ["식품안전", "အစားအစာ ဘေးကင်းရေး", "Agriculture", "식품안전을 연구합니다.", "I study food safety."],
  ["영양학", "အာဟာရ", "Agriculture", "영양학을 공부합니다.", "I study nutrition."],
  ["임업", "သစ်တော", "Agriculture", "임업을 전공합니다.", "I major in forestry."],
  ["수산학", "ရေထွက်", "Agriculture", "수산학을 연구합니다.", "I study fisheries science."],
  ["축산학", "မွေးမြူရေး", "Agriculture", "축산학을 공부합니다.", "I study animal husbandry."],
  ["원예학", "ဥယျာဉ်စိုက်ပျိုးရေး", "Agriculture", "원예학을 전공합니다.", "I major in horticulture."],
  
  // Advanced Architecture & Design
  ["도시설계", "မြို့ပြ ဒီဇိုင်း", "Architecture", "도시설계를 연구합니다.", "I study urban design."],
  ["조경설계", "ဥယျာဉ် ဒီဇိုင်း", "Architecture", "조경설계를 전공합니다.", "I major in landscape design."],
  ["환경설계", "ပတ်ဝန်းကျင် ဒီဇိုင်း", "Architecture", "환경설계를 공부합니다.", "I study environmental design."],
  ["지속가능건축", "ရေရှည်တည်တံ့သော ဗိသုကာ", "Architecture", "지속가능건축을 연구합니다.", "I study sustainable architecture."],
  ["그린빌딩", "အစိမ်းရောင် အဆောက်အဦ", "Architecture", "그린빌딩을 설계합니다.", "I design green buildings."],
  ["스마트시티", "စမတ် မြို့", "Architecture", "스마트시티를 계획합니다.", "I plan smart cities."],
  ["건축구조", "ဗိသုကာ ဖွဲ့စည်းပုံ", "Architecture", "건축구조를 연구합니다.", "I study building structures."],
  ["건축환경", "ဗိသုကာ ပတ်ဝန်းကျင်", "Architecture", "건축환경을 전공합니다.", "I major in building environment."],
  ["건축설비", "ဗိသုကာ ပစ္စည်းကိရိယာ", "Architecture", "건축설비를 공부합니다.", "I study building facilities."],
  ["건축재료", "ဗိသုကာ ပစ္စည်း", "Architecture", "건축재료를 연구합니다.", "I study building materials."],
  
  // Advanced Sports & Health Sciences
  ["운동생리학", "လေ့ကျင့်ခန်း ဇီဝကမ္မဗေဒ", "Sports", "운동생리학을 전공합니다.", "I major in exercise physiology."],
  ["스포츠의학", "အားကစား ဆေးပညာ", "Sports", "스포츠의학을 연구합니다.", "I study sports medicine."],
  ["운동역학", "လေ့ကျင့်ခန်း စွမ်းအား", "Sports", "운동역학을 공부합니다.", "I study biomechanics."],
  ["스포츠영양학", "အားကစား အာဟာရ", "Sports", "스포츠영양학을 전공합니다.", "I major in sports nutrition."],
  ["재활운동", "ပြန်လည်ထူထောင်ရေး လေ့ကျင့်ခန်း", "Sports", "재활운동을 연구합니다.", "I study rehabilitation exercise."],
  ["운동처방", "လေ့ကျင့်ခန်း ညွှန်ကြားမှု", "Sports", "운동처방을 공부합니다.", "I study exercise prescription."],
  ["스포츠코칭", "အားကစား သင်ကြားမှု", "Sports", "스포츠코칭을 전공합니다.", "I major in sports coaching."],
  ["스포츠경영", "အားကစား စီမံခန့်ခွဲမှု", "Sports", "스포츠경영을 연구합니다.", "I study sports management."],
  ["체육학", "ကာယပညာ", "Sports", "체육학을 공부합니다.", "I study physical education."],
  ["건강증진", "ကျန်းမာရေး တိုးတက်စေမှု", "Sports", "건강증진을 전공합니다.", "I major in health promotion."],
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

