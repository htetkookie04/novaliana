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
  // Advanced Medical Specializations
  ["정형외과", "အရိုးအဆစ်", "Medical", "정형외과 치료를 받습니다.", "I receive orthopedic treatment."],
  ["신경외과", "အာရုံကြော ခွဲစိတ်ကုသမှု", "Medical", "신경외과 수술을 받습니다.", "I receive neurosurgical treatment."],
  ["흉부외과", "ရင်ဘတ် ခွဲစိတ်ကုသမှု", "Medical", "흉부외과를 전공합니다.", "I major in thoracic surgery."],
  ["소아외과", "ကလေး ခွဲစိတ်ကုသမှု", "Medical", "소아외과를 연구합니다.", "I study pediatric surgery."],
  ["성형외과", "ပုံဆောင်ခြင်း ခွဲစိတ်ကုသမှု", "Medical", "성형외과를 공부합니다.", "I study plastic surgery."],
  ["비뇨기과", "ဆီးနှင့် လိင်အင်္ဂါ", "Medical", "비뇨기과 진료를 받습니다.", "I receive urology treatment."],
  ["안과", "မျက်စိ", "Medical", "안과 검진을 받습니다.", "I receive ophthalmology examination."],
  ["이비인후과", "နား နှာခေါင်း လည်ချောင်း", "Medical", "이비인후과 진료를 받습니다.", "I receive ENT treatment."],
  ["피부과", "အရေပြား", "Medical", "피부과 치료를 받습니다.", "I receive dermatology treatment."],
  ["정신건강의학과", "စိတ်ကျန်းမာရေး", "Medical", "정신건강의학과 상담을 받습니다.", "I receive mental health counseling."],
  
  // Advanced Technology & Innovation
  ["사물인터넷", "အင်တာနက် အရာဝတ္ထု", "Technology", "사물인터넷이 확산되고 있습니다.", "The Internet of Things is spreading."],
  ["블록체인", "ဘလော့ခ်ချိန်း", "Technology", "블록체인 기술을 연구합니다.", "I study blockchain technology."],
  ["양자컴퓨팅", "ကွမ်တမ် ကွန်ပျူတာ", "Technology", "양자컴퓨팅의 잠재력이 큽니다.", "Quantum computing has great potential."],
  ["증강현실", "တိုးမြှင့်ထားသော အမှန်တကယ်", "Technology", "증강현실을 개발합니다.", "I develop augmented reality."],
  ["가상현실", "အတုအယောင် အမှန်တကယ်", "Technology", "가상현실을 연구합니다.", "I study virtual reality."],
  ["혼합현실", "ရောနှော အမှန်တကယ်", "Technology", "혼합현실을 전공합니다.", "I major in mixed reality."],
  ["엣지컴퓨팅", "အစွန်း ကွန်ပျူတာ", "Technology", "엣지컴퓨팅을 활용합니다.", "I utilize edge computing."],
  ["퓨지컴퓨팅", "မှုန်ဝါးသော ကွန်ပျူတာ", "Technology", "퓨지컴퓨팅을 연구합니다.", "I study fog computing."],
  ["그리드컴퓨팅", "ဂရစ် ကွန်ပျူတာ", "Technology", "그리드컴퓨팅을 공부합니다.", "I study grid computing."],
  ["분산컴퓨팅", "ဖြန့်ဝေထားသော ကွန်ပျူတာ", "Technology", "분산컴퓨팅을 전공합니다.", "I major in distributed computing."],
  
  // Advanced Business Analytics & Data Science
  ["데이터사이언스", "ဒေတာ သိပ္ပံ", "Business", "데이터사이언스를 전공합니다.", "I major in data science."],
  ["빅데이터", "ကြီးမားသော ဒေတာ", "Business", "빅데이터를 분석하세요.", "Analyze big data."],
  ["데이터분석", "ဒေတာ ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "데이터분석을 수행합니다.", "I perform data analysis."],
  ["비즈니스인텔리전스", "လုပ်ငန်း ဉာဏ်ရည်", "Business", "비즈니스인텔리전스를 구축합니다.", "I build business intelligence."],
  ["예측분석", "ခန့်မှန်း ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "예측분석을 연구합니다.", "I study predictive analytics."],
  ["고객분석", "ဖောက်သည် ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "고객분석을 실시합니다.", "I conduct customer analytics."],
  ["마케팅분석", "စျေးကွက်ရှာဖွေရေး ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "마케팅분석을 전공합니다.", "I major in marketing analytics."],
  ["재무분석", "ဘဏ္ဍာရေး ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "재무분석을 연구합니다.", "I study financial analysis."],
  ["운영분석", "လုပ်ငန်း ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "운영분석을 공부합니다.", "I study operations analytics."],
  ["의사결정분석", "ဆုံးဖြတ်ချက် ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "의사결정분석을 전공합니다.", "I major in decision analytics."],
  
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
  
  // Advanced Arts & Performance
  ["연기학", "သရုပ်ဆောင်", "Arts", "연기학을 전공합니다.", "I major in acting."],
  ["연출학", "ဒါရိုက်တာ", "Arts", "연출학을 연구합니다.", "I study directing."],
  ["제작학", "ထုတ်လုပ်မှု", "Arts", "제작학을 공부합니다.", "I study production."],
  ["시나리오", "စာတမ်း", "Arts", "시나리오를 작성합니다.", "I write screenplays."],
  ["영화제작", "ရုပ်ရှင် ထုတ်လုပ်မှု", "Arts", "영화제작을 연구합니다.", "I study film production."],
  ["다큐멘터리", "မှတ်တမ်း", "Arts", "다큐멘터리를 제작합니다.", "I produce documentaries."],
  ["애니메이션제작", "ရုပ်ရှင် ထုတ်လုပ်မှု", "Arts", "애니메이션제작을 전공합니다.", "I major in animation production."],
  ["게임디자인", "ဂိမ်း ဒီဇိုင်း", "Arts", "게임디자인을 연구합니다.", "I study game design."],
  ["인터랙티브미디어", "အပြန်အလှန် မီဒီယာ", "Arts", "인터랙티브미디어를 공부합니다.", "I study interactive media."],
  ["뉴미디어아트", "ခေတ်သစ် မီဒီယာ အနုပညာ", "Arts", "뉴미디어아트를 전공합니다.", "I major in new media art."],
  
  // Advanced Environmental & Sustainability
  ["지속가능발전", "ရေရှည်တည်တံ့သော ဖွံ့ဖြိုးတိုးတက်မှု", "Environment", "지속가능발전 목표를 추구합니다.", "We pursue sustainable development goals."],
  ["탄소중립", "ကာဗွန် ကြားနေရေး", "Environment", "탄소중립을 달성합니다.", "We achieve carbon neutrality."],
  ["재생에너지", "ပြန်လည်ပြည့်ဖြိုးမြဲ စွမ်းအင်", "Environment", "재생에너지를 활용하세요.", "Utilize renewable energy."],
  ["친환경기술", "ပတ်ဝန်းကျင် နှင့် သင့်လျော်သော နည်းပညာ", "Environment", "친환경기술을 개발합니다.", "We develop eco-friendly technology."],
  ["순환경제", "စက်ဝိုင်း စီးပွားရေး", "Environment", "순환경제를 추진합니다.", "We promote circular economy."],
  ["녹색기술", "အစိမ်းရောင် နည်းပညာ", "Environment", "녹색기술을 연구합니다.", "I study green technology."],
  ["기후변화대응", "ရာသီဥတု ပြောင်းလဲမှု တုံ့ပြန်မှု", "Environment", "기후변화대응을 전략합니다.", "We strategize climate change response."],
  ["생물다양성보전", "ဇီဝမျိုးစုံမျိုးကွဲ ထိန်းသိမ်းမှု", "Environment", "생물다양성보전을 실천합니다.", "We practice biodiversity conservation."],
  ["환경복원", "ပတ်ဝန်းကျင် ပြန်လည်ထူထောင်ရေး", "Environment", "환경복원을 진행합니다.", "We proceed with environmental restoration."],
  ["에코디자인", "ဂေဟစနစ် ဒီဇိုင်း", "Environment", "에코디자인을 연구합니다.", "I study eco-design."],
  
  // Advanced Psychology & Mental Health
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
  
  // Advanced Engineering Applications
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
  
  // Advanced Health & Wellness
  ["예방의학", "ကာကွယ်ရေး ဆေးပညာ", "Medical", "예방의학을 전공합니다.", "I major in preventive medicine."],
  ["공중보건", "အများပြည်သူ ကျန်းမာရေး", "Medical", "공중보건을 연구합니다.", "I study public health."],
  ["역학", "ရောဂါဗေဒ", "Medical", "역학을 공부합니다.", "I study epidemiology."],
  ["보건통계", "ကျန်းမာရေး စာရင်းအင်း", "Medical", "보건통계를 전공합니다.", "I major in health statistics."],
  ["건강증진", "ကျန်းမာရေး တိုးတက်စေမှု", "Medical", "건강증진을 추진합니다.", "We promote health promotion."],
  ["질병관리", "ရောဂါ စီမံခန့်ခွဲမှု", "Medical", "질병관리를 연구합니다.", "I study disease management."],
  ["건강정보학", "ကျန်းမာရေး သတင်းအချက်အလက်", "Medical", "건강정보학을 공부합니다.", "I study health informatics."],
  ["원격의료", "အကွာအဝေး ဆေးကုသမှု", "Medical", "원격의료를 전공합니다.", "I major in telemedicine."],
  ["디지털헬스", "ဒစ်ဂျစ်တယ် ကျန်းမာရေး", "Medical", "디지털헬스를 연구합니다.", "I study digital health."],
  ["정밀의학", "တိကျသော ဆေးပညာ", "Medical", "정밀의학 치료를 받습니다.", "I receive precision medicine treatment."],
  
  // Advanced Communication & Digital Media
  ["디지털커뮤니케이션", "ဒစ်ဂျစ်တယ် ဆက်သွယ်ရေး", "Communication", "디지털커뮤니케이션을 연구합니다.", "I study digital communication."],
  ["소셜네트워크", "လူမှုရေး ကွန်ရက်", "Communication", "소셜네트워크를 분석합니다.", "I analyze social networks."],
  ["인플루언서마케팅", "ဩဇာရှိသူ စျေးကွက်ရှာဖွေရေး", "Communication", "인플루언서마케팅을 전략합니다.", "I strategize influencer marketing."],
  ["바이럴마케팅", "ဗိုင်းရပ်စ် စျေးကွက်ရှာဖွေရေး", "Communication", "바이럴마케팅을 연구합니다.", "I study viral marketing."],
  ["콘텐츠전략", "အကြောင်းအရာ နည်းဗျူဟာ", "Communication", "콘텐츠전략을 수립합니다.", "I establish content strategy."],
  ["브랜드스토리텔링", "ကုန်အမှတ်တံဆိပ် ဇာတ်လမ်းပြောခြင်း", "Communication", "브랜드스토리텔링을 연구합니다.", "I study brand storytelling."],
  ["크로스미디어", "ဖြတ်သန်း မီဒီယာ", "Communication", "크로스미디어를 전공합니다.", "I major in cross-media."],
  ["트랜스미디어", "ဖြတ်သန်း မီဒီယာ", "Communication", "트랜스미디어를 공부합니다.", "I study transmedia."],
  ["모바일저널리즘", "မိုဘိုင်း သတင်းစာပညာ", "Communication", "모바일저널리즘을 연구합니다.", "I study mobile journalism."],
  ["시민저널리즘", "ပြည်သူ့ သတင်းစာပညာ", "Communication", "시민저널리즘을 전공합니다.", "I major in citizen journalism."],
  
  // Advanced Education Technology
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
  
  // Advanced Agriculture Technology
  ["스마트농업", "စမတ် စိုက်ပျိုးရေး", "Agriculture", "스마트농업을 연구합니다.", "I study smart agriculture."],
  ["정밀농업", "တိကျသော စိုက်ပျိုးရေး", "Agriculture", "정밀농업을 전공합니다.", "I major in precision agriculture."],
  ["수직농업", "ဒေါင်လိုက် စိုက်ပျိုးရေး", "Agriculture", "수직농업을 공부합니다.", "I study vertical farming."],
  ["유기농업", "အော်ဂဲနစ် စိုက်ပျိုးရေး", "Agriculture", "유기농업을 연구합니다.", "I study organic farming."],
  ["지속가능농업", "ရေရှည်တည်တံ့သော စိုက်ပျိုးရေး", "Agriculture", "지속가능농업을 전공합니다.", "I major in sustainable agriculture."],
  ["디지털농업", "ဒစ်ဂျစ်တယ် စိုက်ပျိုးရေး", "Agriculture", "디지털농업을 공부합니다.", "I study digital agriculture."],
  ["농업로봇", "စိုက်ပျိုးရေး ရိုဘော့", "Agriculture", "농업로봇을 개발합니다.", "I develop agricultural robots."],
  ["농업IoT", "စိုက်ပျိုးရေး အင်တာနက် အရာဝတ္ထု", "Agriculture", "농업IoT를 연구합니다.", "I study agricultural IoT."],
  ["스마트축산", "စမတ် မွေးမြူရေး", "Agriculture", "스마트축산을 전공합니다.", "I major in smart livestock farming."],
  ["수자원관리", "ရေ အရင်းအမြစ် စီမံခန့်ခွဲမှု", "Agriculture", "수자원관리를 연구합니다.", "I study water resource management."],
  
  // Advanced Architecture & Smart Cities
  ["스마트건축", "စမတ် ဗိသုကာ", "Architecture", "스마트건축을 연구합니다.", "I study smart architecture."],
  ["생체모방건축", "ဇီဝ အတုယူ ဗိသုကာ", "Architecture", "생체모방건축을 전공합니다.", "I major in biomimetic architecture."],
  ["패시브하우스", "ဆိုးသွမ်းသော အိမ်", "Architecture", "패시브하우스를 설계합니다.", "I design passive houses."],
  ["제로에너지건물", "သုည စွမ်းအင် အဆောက်အဦ", "Architecture", "제로에너지건물을 구축합니다.", "I build zero-energy buildings."],
  ["도시재생", "မြို့ပြ ပြန်လည်ထူထောင်ရေး", "Architecture", "도시재생을 계획합니다.", "I plan urban regeneration."],
  ["컴팩트시티", "ကျစ်လစ်သော မြို့", "Architecture", "컴팩트시티를 설계합니다.", "I design compact cities."],
  ["생태도시", "ဂေဟစနစ် မြို့", "Architecture", "생태도시를 연구합니다.", "I study eco-cities."],
  ["저탄소도시", "နိမ့်သော ကာဗွန် မြို့", "Architecture", "저탄소도시를 전공합니다.", "I major in low-carbon cities."],
  ["회복력도시", "ပြန်လည်ထူထောင်နိုင်စွမ်း မြို့", "Architecture", "회복력도시를 공부합니다.", "I study resilient cities."],
  ["스마트인프라", "စမတ် အခြေခံအဆောက်အဦ", "Architecture", "스마트인프라를 구축합니다.", "I build smart infrastructure."],
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

