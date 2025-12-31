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
  // Advanced Linguistics & Language
  ["음성학", "အသံ ဘာသာဗေဒ", "Linguistics", "음성학을 연구합니다.", "I study phonetics."],
  ["음운론", "အသံထွက် ဘာသာဗေဒ", "Linguistics", "음운론을 전공합니다.", "I major in phonology."],
  ["형태론", "ပုံစံ ဘာသာဗေဒ", "Linguistics", "형태론을 공부합니다.", "I study morphology."],
  ["통사론", "ဝါကျဖွဲ့စည်းပုံ", "Linguistics", "통사론을 연구합니다.", "I study syntax."],
  ["의미론", "အဓိပ္ပာယ် ဘာသာဗေဒ", "Linguistics", "의미론을 전공합니다.", "I major in semantics."],
  ["화용론", "အသုံးပြုမှု ဘာသာဗေဒ", "Linguistics", "화용론을 공부합니다.", "I study pragmatics."],
  ["사회언어학", "လူမှုရေး ဘာသာဗေဒ", "Linguistics", "사회언어학을 연구합니다.", "I study sociolinguistics."],
  ["심리언어학", "စိတ်ပညာ ဘာသာဗေဒ", "Linguistics", "심리언어학을 전공합니다.", "I major in psycholinguistics."],
  ["계산언어학", "ကွန်ပျူတာ ဘာသာဗေဒ", "Linguistics", "계산언어학을 공부합니다.", "I study computational linguistics."],
  ["비교언어학", "နှိုင်းယှဉ် ဘာသာဗေဒ", "Linguistics", "비교언어학을 연구합니다.", "I study comparative linguistics."],
  
  // Advanced Philosophy & Ethics
  ["형이상학", "ရူပဗေဒ အထက်", "Philosophy", "형이상학을 공부합니다.", "I study metaphysics."],
  ["인식론", "အသိပညာ သီအိုရီ", "Philosophy", "인식론을 전공합니다.", "I major in epistemology."],
  ["논리학", "ယုတ္တိဗေဒ", "Philosophy", "논리학을 연구합니다.", "I study logic."],
  ["윤리학", "ကျင့်ဝတ် သိပ္ပံ", "Philosophy", "윤리학을 공부합니다.", "I study ethics."],
  ["미학", "အလှအပ သိပ္ပံ", "Philosophy", "미학을 전공합니다.", "I major in aesthetics."],
  ["존재론", "တည်ရှိမှု သီအိုရီ", "Philosophy", "존재론을 연구합니다.", "I study ontology."],
  ["현상학", "ဖြစ်ရပ် သိပ္ပံ", "Philosophy", "현상학을 공부합니다.", "I study phenomenology."],
  ["해석학", "အနက်ဖွင့်ဆိုမှု", "Philosophy", "해석학을 전공합니다.", "I major in hermeneutics."],
  ["실존주의", "တည်ရှိမှု ဝါဒ", "Philosophy", "실존주의를 연구합니다.", "I study existentialism."],
  ["구조주의", "ဖွဲ့စည်းပုံ ဝါဒ", "Philosophy", "구조주의를 공부합니다.", "I study structuralism."],
  
  // Advanced Medicine & Healthcare
  ["내분비학", "ဟော်မုန်း", "Medical", "내분비학을 전공합니다.", "I major in endocrinology."],
  ["심장학", "နှလုံး", "Medical", "심장학을 연구합니다.", "I study cardiology."],
  ["폐학", "အဆုတ်", "Medical", "폐학을 공부합니다.", "I study pulmonology."],
  ["소화기내과", "အစာခြေ", "Medical", "소화기내과 진료를 받습니다.", "I receive gastroenterology treatment."],
  ["신장학", "ကျောက်ကပ်", "Medical", "신장학을 전공합니다.", "I major in nephrology."],
  ["혈액학", "သွေး", "Medical", "혈액학을 연구합니다.", "I study hematology."],
  ["종양학", "ကင်ဆာ", "Medical", "종양학을 공부합니다.", "I study oncology."],
  ["면역학", "ကိုယ်ခံအား", "Medical", "면역학을 전공합니다.", "I major in immunology."],
  ["감염학", "ကူးစက်ရောဂါ", "Medical", "감염학을 연구합니다.", "I study infectious diseases."],
  ["재활의학", "ပြန်လည်ထူထောင်ရေး", "Medical", "재활의학 치료를 받습니다.", "I receive rehabilitation medicine treatment."],
  
  // Advanced Technology & Computing
  ["사이버네틱스", "ဆိုက်ဘာနက်တစ်", "Technology", "사이버네틱스를 연구합니다.", "I study cybernetics."],
  ["인지과학", "သိမြင်မှု သိပ္ပံ", "Technology", "인지과학을 전공합니다.", "I major in cognitive science."],
  ["신경망", "အာရုံကြော ကွန်ရက်", "Technology", "신경망을 개발합니다.", "I develop neural networks."],
  ["자연어처리", "သဘာဝ ဘာသာစကား လုပ်ဆောင်မှု", "Technology", "자연어처리를 연구합니다.", "I study natural language processing."],
  ["컴퓨터비전", "ကွန်ပျူတာ အမြင်", "Technology", "컴퓨터비전을 개발합니다.", "I develop computer vision."],
  ["강화학습", "အားကောင်းစေသော သင်ယူမှု", "Technology", "강화학습 알고리즘을 연구합니다.", "I study reinforcement learning algorithms."],
  ["딥러닝", "နက်ရှိုင်းသော သင်ယူမှု", "Technology", "딥러닝 모델을 구축합니다.", "I build deep learning models."],
  ["전이학습", "ပြောင်းလဲသော သင်ယူမှု", "Technology", "전이학습을 적용합니다.", "I apply transfer learning."],
  ["앙상블학습", "ပေါင်းစည်းသော သင်ယူမှု", "Technology", "앙상블학습을 사용합니다.", "I use ensemble learning."],
  ["생성모델", "ဖန်တီးသော ပုံစံ", "Technology", "생성모델을 개발합니다.", "I develop generative models."],
  
  // Advanced Business & Management
  ["조직행동", "အဖွဲ့အစည်း အပြုအမူ", "Business", "조직행동을 분석합니다.", "I analyze organizational behavior."],
  ["인적자원", "လူ့စွမ်းအား", "Business", "인적자원을 관리합니다.", "I manage human resources."],
  ["성과관리", "စွမ်းဆောင်ရည် စီမံခန့်ခွဲမှု", "Business", "성과관리 시스템을 구축합니다.", "I build performance management systems."],
  ["변화관리", "ပြောင်းလဲမှု စီမံခန့်ခွဲမှု", "Business", "변화관리를 실천합니다.", "I practice change management."],
  ["프로세스개선", "လုပ်ငန်းစဉ် ကောင်းမွန်စေမှု", "Business", "프로세스개선을 진행합니다.", "I proceed with process improvement."],
  ["품질보증", "အရည်အသွေး အာမခံ", "Business", "품질보증을 실시합니다.", "I conduct quality assurance."],
  ["리스크관리", "အန္တရာယ် စီမံခန့်ခွဲမှု", "Business", "리스크관리 전략을 수립합니다.", "I establish risk management strategies."],
  ["프로젝트관리", "စီမံကိန်း စီမံခန့်ခွဲမှု", "Business", "프로젝트관리를 수행합니다.", "I perform project management."],
  ["공급망", "ထောက်ပံ့မှု ကွင်းဆက်", "Business", "공급망을 최적화합니다.", "I optimize the supply chain."],
  ["고객관계관리", "ဖောက်သည် ဆက်ဆံရေး စီမံခန့်ခွဲမှု", "Business", "고객관계관리를 도입합니다.", "I introduce customer relationship management."],
  
  // Advanced Social Sciences
  ["문화인류학", "ယဉ်ကျေးမှု လူသားဗေဒ", "Social Science", "문화인류학을 연구합니다.", "I study cultural anthropology."],
  ["고고인류학", "ရှေးဟောင်း လူသားဗေဒ", "Social Science", "고고인류학을 전공합니다.", "I major in archaeological anthropology."],
  ["생물인류학", "ဇီဝ လူသားဗေဒ", "Social Science", "생물인류학을 공부합니다.", "I study biological anthropology."],
  ["언어인류학", "ဘာသာစကား လူသားဗေဒ", "Social Science", "언어인류학을 연구합니다.", "I study linguistic anthropology."],
  ["정치사회학", "နိုင်ငံရေး လူမှုရေး", "Social Science", "정치사회학을 전공합니다.", "I major in political sociology."],
  ["경제사회학", "စီးပွားရေး လူမှုရေး", "Social Science", "경제사회학을 공부합니다.", "I study economic sociology."],
  ["도시사회학", "မြို့ပြ လူမှုရေး", "Social Science", "도시사회학을 연구합니다.", "I study urban sociology."],
  ["가족사회학", "မိသားစု လူမှုရေး", "Social Science", "가족사회학을 전공합니다.", "I major in family sociology."],
  ["교육사회학", "ပညာရေး လူမှုရေး", "Social Science", "교육사회학을 공부합니다.", "I study educational sociology."],
  ["종교사회학", "ဘာသာရေး လူမှုရေး", "Social Science", "종교사회학을 연구합니다.", "I study sociology of religion."],
  
  // Advanced Arts & Design
  ["그래픽디자인", "ဂရပ်ဖစ် ဒီဇိုင်း", "Arts", "그래픽디자인을 전공합니다.", "I major in graphic design."],
  ["산업디자인", "စက်မှု ဒီဇိုင်း", "Arts", "산업디자인을 공부합니다.", "I study industrial design."],
  ["패션디자인", "ဖက်ရှင် ဒီဇိုင်း", "Arts", "패션디자인을 연구합니다.", "I study fashion design."],
  ["인테리어디자인", "အတွင်းပိုင်း ဒီဇိုင်း", "Arts", "인테리어디자인을 전공합니다.", "I major in interior design."],
  ["웹디자인", "ဝက်ဘ် ဒီဇိုင်း", "Arts", "웹디자인을 공부합니다.", "I study web design."],
  ["UI/UX디자인", "အသုံးပြုသူ အင်တာဖေ့စ် ဒီဇိုင်း", "Arts", "UI/UX디자인을 연구합니다.", "I study UI/UX design."],
  ["타이포그래피", "စာလုံး ဒီဇိုင်း", "Arts", "타이포그래피를 전공합니다.", "I major in typography."],
  ["일러스트레이션", "ပုံဆွဲ", "Arts", "일러스트레이션을 공부합니다.", "I study illustration."],
  ["애니메이션", "ရုပ်ရှင်", "Arts", "애니메이션을 연구합니다.", "I study animation."],
  ["디지털아트", "ဒစ်ဂျစ်တယ် အနုပညာ", "Arts", "디지털아트를 전공합니다.", "I major in digital art."],
  
  // Advanced Environmental & Earth Sciences
  ["기상학", "ရာသီဥတု", "Environment", "기상학을 공부합니다.", "I study meteorology."],
  ["해양생물학", "ပင်လယ် ဇီဝဗေဒ", "Environment", "해양생물학을 연구합니다.", "I study marine biology."],
  ["지구화학", "ကမ္ဘာ ဓာတုဗေဒ", "Environment", "지구화학을 전공합니다.", "I major in geochemistry."],
  ["지구물리학", "ကမ္ဘာ ရူပဗေဒ", "Environment", "지구물리학을 공부합니다.", "I study geophysics."],
  ["고생물학", "ရှေးဟောင်း ဇီဝဗေဒ", "Environment", "고생물학을 연구합니다.", "I study paleontology."],
  ["지질구조학", "မြေသိပ္ပံ ဖွဲ့စည်းပုံ", "Environment", "지질구조학을 전공합니다.", "I major in structural geology."],
  ["수문학", "ရေ သိပ္ပံ", "Environment", "수문학을 공부합니다.", "I study hydrology."],
  ["토양학", "မြေဆီလွှာ", "Environment", "토양학을 연구합니다.", "I study soil science."],
  ["대기화학", "လေထု ဓာတုဗေဒ", "Environment", "대기화학을 전공합니다.", "I major in atmospheric chemistry."],
  ["환경공학", "ပတ်ဝန်းကျင် အင်ဂျင်နီယာ", "Environment", "환경공학을 공부합니다.", "I study environmental engineering."],
  
  // Advanced Psychology & Neuroscience
  ["인지심리학", "သိမြင်မှု စိတ်ပညာ", "Psychology", "인지심리학을 연구합니다.", "I study cognitive psychology."],
  ["발달심리학", "ဖွံ့ဖြိုးမှု စိတ်ပညာ", "Psychology", "발달심리학을 전공합니다.", "I major in developmental psychology."],
  ["임상심리학", "ကုသမှု စိတ်ပညာ", "Psychology", "임상심리학을 공부합니다.", "I study clinical psychology."],
  ["신경심리학", "အာရုံကြော စိတ်ပညာ", "Psychology", "신경심리학을 연구합니다.", "I study neuropsychology."],
  ["인격심리학", "ကိုယ်ရည်ကိုယ်သွေး စိတ်ပညာ", "Psychology", "인격심리학을 전공합니다.", "I major in personality psychology."],
  ["사회심리학", "လူမှုရေး စိတ်ပညာ", "Psychology", "사회심리학을 공부합니다.", "I study social psychology."],
  ["실험심리학", "စမ်းသပ်မှု စိတ်ပညာ", "Psychology", "실험심리학을 연구합니다.", "I study experimental psychology."],
  ["생리심리학", "ဇီဝကမ္မဗေဒ စိတ်ပညာ", "Psychology", "생리심리학을 전공합니다.", "I major in physiological psychology."],
  ["신경과학", "အာရုံကြော သိပ္ပံ", "Psychology", "신경과학을 공부합니다.", "I study neuroscience."],
  ["행동신경과학", "အပြုအမူ အာရုံကြော သိပ္ပံ", "Psychology", "행동신경과학을 연구합니다.", "I study behavioral neuroscience."],
  
  // Advanced Legal Studies
  ["국제법", "နိုင်ငံတကာ ဥပဒေ", "Legal", "국제법을 전공합니다.", "I major in international law."],
  ["헌법학", "ဖွဲ့စည်းပုံအခြေခံဥပဒေ", "Legal", "헌법학을 연구합니다.", "I study constitutional law."],
  ["행정법", "စီမံခန့်ခွဲရေး ဥပဒေ", "Legal", "행정법을 공부합니다.", "I study administrative law."],
  ["형법", "ရာဇဝတ်ဥပဒေ", "Legal", "형법을 전공합니다.", "I major in criminal law."],
  ["민법", "ပြည်သူ့ ဥပဒေ", "Legal", "민법을 연구합니다.", "I study civil law."],
  ["상법", "ကုန်သွယ်ရေး ဥပဒေ", "Legal", "상법을 공부합니다.", "I study commercial law."],
  ["노동법", "အလုပ်သမား ဥပဒေ", "Legal", "노동법을 전공합니다.", "I major in labor law."],
  ["환경법", "ပတ်ဝန်းကျင် ဥပဒေ", "Legal", "환경법을 연구합니다.", "I study environmental law."],
  ["지적재산법", "ဉာဏပစ္စည်း ဥပဒေ", "Legal", "지적재산법을 공부합니다.", "I study intellectual property law."],
  ["해양법", "ပင်လယ် ဥပဒေ", "Legal", "해양법을 전공합니다.", "I major in maritime law."],
  
  // Advanced Economics & Finance
  ["계량경제학", "စာရင်းအင်း စီးပွားရေး", "Economics", "계량경제학을 전공합니다.", "I major in econometrics."],
  ["재정학", "ဘဏ္ဍာရေး", "Economics", "재정학을 연구합니다.", "I study public finance."],
  ["금융경제학", "ငွေရေး စီးပွားရေး", "Economics", "금융경제학을 공부합니다.", "I study financial economics."],
  ["국제경제학", "နိုင်ငံတကာ စီးပွားရေး", "Economics", "국제경제학을 전공합니다.", "I major in international economics."],
  ["산업조직론", "စက်မှု အဖွဲ့အစည်း", "Economics", "산업조직론을 연구합니다.", "I study industrial organization theory."],
  ["노동경제학", "အလုပ်သမား စီးပွားရေး", "Economics", "노동경제학을 공부합니다.", "I study labor economics."],
  ["환경경제학", "ပတ်ဝန်းကျင် စီးပွားရေး", "Economics", "환경경제학을 전공합니다.", "I major in environmental economics."],
  ["발전경제학", "ဖွံ့ဖြိုးတိုးတက်မှု စီးပွားရေး", "Economics", "발전경제학을 연구합니다.", "I study development economics."],
  ["행동경제학", "အပြုအမူ စီးပွားရေး", "Economics", "행동경제학을 공부합니다.", "I study behavioral economics."],
  ["게임이론", "ဂိမ်း သီအိုရီ", "Economics", "게임이론을 적용합니다.", "I apply game theory."],
  
  // Advanced Engineering Specializations
  ["전기공학", "လျှပ်စစ် အင်ဂျင်နီယာ", "Engineering", "전기공학을 전공합니다.", "I major in electrical engineering."],
  ["기계공학", "စက်မှု အင်ဂျင်နီယာ", "Engineering", "기계공학을 연구합니다.", "I study mechanical engineering."],
  ["화학공학", "ဓာတုဗေဒ အင်ဂျင်နီယာ", "Engineering", "화학공학을 공부합니다.", "I study chemical engineering."],
  ["산업공학", "စက်မှု အင်ဂျင်နီယာ", "Engineering", "산업공학을 전공합니다.", "I major in industrial engineering."],
  ["원자력공학", "နျူကလီးယား အင်ဂျင်နီယာ", "Engineering", "원자력공학을 연구합니다.", "I study nuclear engineering."],
  ["항공공학", "လေကြောင်း အင်ဂျင်နီယာ", "Engineering", "항공공학을 공부합니다.", "I study aerospace engineering."],
  ["해양공학", "ပင်လယ် အင်ဂျင်နီယာ", "Engineering", "해양공학을 전공합니다.", "I major in ocean engineering."],
  ["생체의공학", "ဇီဝ ဆေးပညာ အင်ဂျင်နီယာ", "Engineering", "생체의공학을 연구합니다.", "I study biomedical engineering."],
  ["재료공학", "ပစ္စည်း အင်ဂျင်နီယာ", "Engineering", "재료공학을 공부합니다.", "I study materials engineering."],
  ["환경공학", "ပတ်ဝန်းကျင် အင်ဂျင်နီယာ", "Engineering", "환경공학을 전공합니다.", "I major in environmental engineering."],
  
  // Advanced Communication & Media
  ["커뮤니케이션학", "ဆက်သွယ်ရေး", "Communication", "커뮤니케이션학을 연구합니다.", "I study communication studies."],
  ["저널리즘", "သတင်းစာပညာ", "Communication", "저널리즘을 전공합니다.", "I major in journalism."],
  ["방송학", "ရုပ်မြင်သံကြား", "Communication", "방송학을 공부합니다.", "I study broadcasting."],
  ["광고학", "ကြော်ငြာ", "Communication", "광고학을 연구합니다.", "I study advertising."],
  ["공 relations", "အများပြည်သူ ဆက်ဆံရေး", "Communication", "공 relations을 전공합니다.", "I major in public relations."],
  ["미디어학", "မီဒီယာ", "Communication", "미디어학을 공부합니다.", "I study media studies."],
  ["디지털미디어", "ဒစ်ဂျစ်တယ် မီဒီယာ", "Communication", "디지털미디어를 연구합니다.", "I study digital media."],
  ["멀티미디어", "များစွာ မီဒီယာ", "Communication", "멀티미디어를 전공합니다.", "I major in multimedia."],
  ["콘텐츠제작", "အကြောင်းအရာ ဖန်တီးမှု", "Communication", "콘텐츠제작을 공부합니다.", "I study content production."],
  ["미디어비평", "မီဒီယာ ဝေဖန်မှု", "Communication", "미디어비평을 연구합니다.", "I study media criticism."],
  
  // Advanced Education & Pedagogy
  ["교육학", "ပညာရေး", "Education", "교육학을 전공합니다.", "I major in education."],
  ["교육심리학", "ပညာရေး စိတ်ပညာ", "Education", "교육심리학을 연구합니다.", "I study educational psychology."],
  ["교육철학", "ပညာရေး ဒဿနိကဗေဒ", "Education", "교육철학을 공부합니다.", "I study philosophy of education."],
  ["교육사회학", "ပညာရေး လူမှုရေး", "Education", "교육사회학을 전공합니다.", "I major in educational sociology."],
  ["교육행정", "ပညာရေး စီမံခန့်ခွဲရေး", "Education", "교육행정을 연구합니다.", "I study educational administration."],
  ["교육과정", "ပညာရေး သင်ရိုးညွှန်းတမ်း", "Education", "교육과정을 개발합니다.", "I develop curriculum."],
  ["교육평가", "ပညာရေး အကဲဖြတ်မှု", "Education", "교육평가를 실시합니다.", "I conduct educational assessment."],
  ["평생교육", "တစ်သက်တာ ပညာရေး", "Education", "평생교육을 연구합니다.", "I study lifelong education."],
  ["특수교육", "အထူး ပညာရေး", "Education", "특수교육을 전공합니다.", "I major in special education."],
  ["유아교육", "ကလေး ပညာရေး", "Education", "유아교육을 공부합니다.", "I study early childhood education."],
  
  // Advanced Agriculture & Food Science
  ["농학", "စိုက်ပျိုးရေး", "Agriculture", "농학을 전공합니다.", "I major in agriculture."],
  ["식품과학", "အစားအစာ သိပ္ပံ", "Agriculture", "식품과학을 연구합니다.", "I study food science."],
  ["농업경제학", "စိုက်ပျိုးရေး စီးပွားရေး", "Agriculture", "농업경제학을 공부합니다.", "I study agricultural economics."],
  ["작물학", "စိုက်ပျိုးမှု", "Agriculture", "작물학을 전공합니다.", "I major in crop science."],
  ["축산학", "မွေးမြူရေး", "Agriculture", "축산학을 연구합니다.", "I study animal husbandry."],
  ["임학", "သစ်တော", "Agriculture", "임학을 공부합니다.", "I study forestry."],
  ["원예학", "ဥယျာဉ်စိုက်ပျိုးရေး", "Agriculture", "원예학을 전공합니다.", "I major in horticulture."],
  ["토양과학", "မြေဆီလွှာ သိပ္ပံ", "Agriculture", "토양과학을 연구합니다.", "I study soil science."],
  ["농업생명공학", "စိုက်ပျိုးရေး ဇီဝနည်းပညာ", "Agriculture", "농업생명공학을 공부합니다.", "I study agricultural biotechnology."],
  ["식품공학", "အစားအစာ အင်ဂျင်နီယာ", "Agriculture", "식품공학을 전공합니다.", "I major in food engineering."],
  
  // Advanced Architecture & Urban Planning
  ["건축학", "ဗိသုကာ", "Architecture", "건축학을 전공합니다.", "I major in architecture."],
  ["도시계획", "မြို့ပြ စီမံကိန်း", "Architecture", "도시계획을 연구합니다.", "I study urban planning."],
  ["조경학", "ဥယျာဉ် ဒီဇိုင်း", "Architecture", "조경학을 공부합니다.", "I study landscape architecture."],
  ["건축설계", "ဗိသုကာ ဒီဇိုင်း", "Architecture", "건축설계를 합니다.", "I do architectural design."],
  ["도시설계", "မြို့ပြ ဒီဇိုင်း", "Architecture", "도시설계를 연구합니다.", "I study urban design."],
  ["건축역사", "ဗိသုကာ သမိုင်း", "Architecture", "건축역사를 전공합니다.", "I major in architectural history."],
  ["건축이론", "ဗိသုကာ သီအိုရီ", "Architecture", "건축이론을 연구합니다.", "I study architectural theory."],
  ["환경설계", "ပတ်ဝန်းကျင် ဒီဇိုင်း", "Architecture", "환경설계를 공부합니다.", "I study environmental design."],
  ["주거학", "နေထိုင်ရေး", "Architecture", "주거학을 전공합니다.", "I major in housing studies."],
  ["건축구조", "ဗိသုကာ ဖွဲ့စည်းပုံ", "Architecture", "건축구조를 연구합니다.", "I study building structures."],
  
  // Advanced Sports & Exercise Science
  ["운동생리학", "လေ့ကျင့်ခန်း ဇီဝကမ္မဗေဒ", "Sports", "운동생리학을 전공합니다.", "I major in exercise physiology."],
  ["스포츠심리학", "အားကစား စိတ်ပညာ", "Sports", "스포츠심리학을 연구합니다.", "I study sports psychology."],
  ["스포츠의학", "အားကစား ဆေးပညာ", "Sports", "스포츠의학을 공부합니다.", "I study sports medicine."],
  ["운동역학", "လေ့ကျင့်ခန်း စွမ်းအား", "Sports", "운동역학을 전공합니다.", "I major in biomechanics."],
  ["스포츠경영", "အားကစား စီမံခန့်ခွဲမှု", "Sports", "스포츠경영을 연구합니다.", "I study sports management."],
  ["체육학", "ကာယပညာ", "Sports", "체육학을 공부합니다.", "I study physical education."],
  ["재활운동", "ပြန်လည်ထူထောင်ရေး လေ့ကျင့်ခန်း", "Sports", "재활운동을 전공합니다.", "I major in rehabilitation exercise."],
  ["운동영양학", "လေ့ကျင့်ခန်း အာဟာရ", "Sports", "운동영양학을 연구합니다.", "I study sports nutrition."],
  ["스포츠코칭", "အားကစား သင်ကြားမှု", "Sports", "스포츠코칭을 공부합니다.", "I study sports coaching."],
  ["운동처방", "လေ့ကျင့်ခန်း ညွှန်ကြားမှု", "Sports", "운동처방을 전공합니다.", "I major in exercise prescription."],
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

