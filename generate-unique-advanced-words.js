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
  // Advanced Interdisciplinary Sciences
  ["생물정보학", "ဇီဝ သတင်းအချက်အလက်", "Science", "생물정보학을 전공합니다.", "I major in bioinformatics."],
  ["화학정보학", "ဓာတုဗေဒ သတင်းအချက်အလက်", "Science", "화학정보학을 연구합니다.", "I study cheminformatics."],
  ["의료정보학", "ဆေးပညာ သတင်းအချက်အလက်", "Science", "의료정보학을 공부합니다.", "I study medical informatics."],
  ["환경정보학", "ပတ်ဝန်းကျင် သတင်းအချက်အလက်", "Science", "환경정보학을 전공합니다.", "I major in environmental informatics."],
  ["공간정보학", "နေရာ သတင်းအချက်အလက်", "Science", "공간정보학을 연구합니다.", "I study geoinformatics."],
  ["사회정보학", "လူမှုရေး သတင်းအချက်အလက်", "Science", "사회정보학을 공부합니다.", "I study social informatics."],
  ["경제정보학", "စီးပွားရေး သတင်းအချက်အလက်", "Science", "경제정보학을 전공합니다.", "I major in economic informatics."],
  ["문화정보학", "ယဉ်ကျေးမှု သတင်းအချက်အလက်", "Science", "문화정보학을 연구합니다.", "I study cultural informatics."],
  ["도서정보학", "စာကြည့်တိုက် သတင်းအချက်အလက်", "Science", "도서정보학을 공부합니다.", "I study library and information science."],
  ["데이터과학", "ဒေတာ သိပ္ပံ", "Science", "데이터과학을 전공합니다.", "I major in data science."],
  
  // Advanced Specialized Technologies
  ["양자정보", "ကွမ်တမ် သတင်းအချက်အလက်", "Technology", "양자정보를 연구합니다.", "I study quantum information."],
  ["양자통신", "ကွမ်တမ် ဆက်သွယ်ရေး", "Technology", "양자통신을 전공합니다.", "I major in quantum communication."],
  ["양자암호", "ကွမ်တမ် လျှို့ဝှက်ကုဒ်", "Technology", "양자암호를 연구합니다.", "I study quantum cryptography."],
  ["양자센서", "ကွမ်တမ် အာရုံခံကိရိယာ", "Technology", "양자센서를 개발합니다.", "I develop quantum sensors."],
  ["양자계산", "ကွမ်တမ် တွက်ချက်မှု", "Technology", "양자계산을 공부합니다.", "I study quantum computing."],
  ["양자시뮬레이션", "ကွမ်တမ် ပုံတူ", "Technology", "양자시뮬레이션을 전공합니다.", "I major in quantum simulation."],
  ["양자알고리즘", "ကွမ်တမ် အယ်လ်ဂိုရီသမ်", "Technology", "양자알고리즘을 연구합니다.", "I study quantum algorithms."],
  ["양자머신러닝", "ကွမ်တမ် စက်သင်ယူမှု", "Technology", "양자머신러닝을 공부합니다.", "I study quantum machine learning."],
  ["양자네트워크", "ကွမ်တမ် ကွန်ရက်", "Technology", "양자네트워크를 구축합니다.", "I build quantum networks."],
  ["양자인터넷", "ကွမ်တမ် အင်တာနက်", "Technology", "양자인터넷을 연구합니다.", "I study quantum internet."],
  
  // Advanced Business & Innovation
  ["오픈이노베이션", "ဖွင့်လှစ်သော ဆန်းသစ်တီထွင်မှု", "Business", "오픈이노베이션을 추진합니다.", "We promote open innovation."],
  ["디지털이노베이션", "ဒစ်ဂျစ်တယ် ဆန်းသစ်တီထွင်မှု", "Business", "디지털이노베이션을 연구합니다.", "I study digital innovation."],
  ["사회적이노베이션", "လူမှုရေး ဆန်းသစ်တီထွင်မှု", "Business", "사회적이노베이션을 전공합니다.", "I major in social innovation."],
  ["기술이전", "နည်းပညာ လွှဲပြောင်းမှု", "Business", "기술이전을 연구합니다.", "I study technology transfer."],
  ["라이선싱", "လိုင်စင်ထုတ်ပေးမှု", "Business", "라이선싱을 전략합니다.", "I strategize licensing."],
  ["기술사업화", "နည်းပညာ လုပ်ငန်းပြုလုပ်မှု", "Business", "기술사업화를 추진합니다.", "We promote technology commercialization."],
  ["스핀오프", "ခွဲထုတ်မှု", "Business", "스핀오프를 연구합니다.", "I study spin-offs."],
  ["기술창업", "နည်းပညာ စွန့်စားရဲသော", "Business", "기술창업을 지원합니다.", "I support technology startups."],
  ["기술경영", "နည်းပညာ စီမံခန့်ခွဲမှု", "Business", "기술경영을 전공합니다.", "I major in technology management."],
  ["혁신생태계", "ဆန်းသစ်တီထွင်မှု ဂေဟစနစ်", "Business", "혁신생태계를 구축합니다.", "I build innovation ecosystems."],
  
  // Advanced Social & Cultural Studies
  ["디지털인문학", "ဒစ်ဂျစ်တယ် လူသားတန်ဖိုး", "Social Science", "디지털인문학을 연구합니다.", "I study digital humanities."],
  ["문화기술", "ယဉ်ကျေးမှု နည်းပညာ", "Social Science", "문화기술을 전공합니다.", "I major in cultural technology."],
  ["디지털고고학", "ဒစ်ဂျစ်တယ် ရှေးဟောင်း သုတေသန", "Social Science", "디지털고고학을 공부합니다.", "I study digital archaeology."],
  ["디지털역사학", "ဒစ်ဂျစ်တယ် သမိုင်း", "Social Science", "디지털역사학을 연구합니다.", "I study digital history."],
  ["디지털지리학", "ဒစ်ဂျစ်တယ် ပထဝီဝင်", "Social Science", "디지털지리학을 전공합니다.", "I major in digital geography."],
  ["공간인문학", "နေရာ လူသားတန်ဖိုး", "Social Science", "공간인문학을 공부합니다.", "I study spatial humanities."],
  ["도시인문학", "မြို့ပြ လူသားတန်ဖိုး", "Social Science", "도시인문학을 연구합니다.", "I study urban humanities."],
  ["환경인문학", "ပတ်ဝန်းကျင် လူသားတန်ဖိုး", "Social Science", "환경인문학을 전공합니다.", "I major in environmental humanities."],
  ["의료인문학", "ဆေးပညာ လူသားတန်ဖိုး", "Social Science", "의료인문학을 공부합니다.", "I study medical humanities."],
  ["기술인문학", "နည်းပညာ လူသားတန်ဖိုး", "Social Science", "기술인문학을 연구합니다.", "I study technology humanities."],
  
  // Advanced Arts & Digital Culture
  ["디지털예술", "ဒစ်ဂျစ်တယ် အနုပညာ", "Arts", "디지털예술을 전공합니다.", "I major in digital art."],
  ["미디어아트", "မီဒီယာ အနုပညာ", "Arts", "미디어아트를 연구합니다.", "I study media art."],
  ["인터랙티브아트", "အပြန်အလှန် အနုပညာ", "Arts", "인터랙티브아트를 공부합니다.", "I study interactive art."],
  ["생체예술", "ဇီဝ အနုပညာ", "Arts", "생체예술을 전공합니다.", "I major in bioart."],
  ["로봇예술", "ရိုဘော့ အနုပညာ", "Arts", "로봇예술을 연구합니다.", "I study robotic art."],
  ["알고리즘예술", "အယ်လ်ဂိုရီသမ် အနုပညာ", "Arts", "알고리즘예술을 공부합니다.", "I study algorithmic art."],
  ["생성예술", "ဖန်တီးသော အနုပညာ", "Arts", "생성예술을 전공합니다.", "I major in generative art."],
  ["가상예술", "အတုအယောင် အနုပညာ", "Arts", "가상예술을 연구합니다.", "I study virtual art."],
  ["증강예술", "တိုးမြှင့်ထားသော အနုပညာ", "Arts", "증강예술을 공부합니다.", "I study augmented art."],
  ["데이터예술", "ဒေတာ အနုပညာ", "Arts", "데이터예술을 전공합니다.", "I major in data art."],
  
  // Advanced Environmental & Sustainability
  ["순환경제", "စက်ဝိုင်း စီးပွားရေး", "Environment", "순환경제를 추진합니다.", "We promote circular economy."],
  ["녹색경제", "အစိမ်းရောင် စီးပွားရေး", "Environment", "녹색경제를 연구합니다.", "I study green economy."],
  ["저탄소경제", "နိမ့်သော ကာဗွန် စီးပွားရေး", "Environment", "저탄소경제를 전공합니다.", "I major in low-carbon economy."],
  ["탄소경제", "ကာဗွန် စီးပွားရေး", "Environment", "탄소경제를 공부합니다.", "I study carbon economy."],
  ["에너지전환", "စွမ်းအင် ပြောင်းလဲမှု", "Environment", "에너지전환을 연구합니다.", "I study energy transition."],
  ["재생에너지", "ပြန်လည်ပြည့်ဖြိုးမြဲ စွမ်းအင်", "Environment", "재생에너지를 활용하세요.", "Utilize renewable energy."],
  ["친환경기술", "ပတ်ဝန်းကျင် နှင့် သင့်လျော်သော နည်းပညာ", "Environment", "친환경기술을 개발합니다.", "We develop eco-friendly technology."],
  ["녹색기술", "အစိမ်းရောင် နည်းပညာ", "Environment", "녹색기술을 연구합니다.", "I study green technology."],
  ["기후기술", "ရာသီဥတု နည်းပညာ", "Environment", "기후기술을 전공합니다.", "I major in climate technology."],
  ["환경기술", "ပတ်ဝန်းကျင် နည်းပညာ", "Environment", "환경기술을 공부합니다.", "I study environmental technology."],
  
  // Advanced Psychology & Cognitive Sciences
  ["인지과학", "သိမြင်မှု သိပ္ပံ", "Psychology", "인지과학을 전공합니다.", "I major in cognitive science."],
  ["뇌과학", "ဦးနှောက် သိပ္ပံ", "Psychology", "뇌과학을 연구합니다.", "I study neuroscience."],
  ["인지신경과학", "သိမြင်မှု အာရုံကြော သိပ္ပံ", "Psychology", "인지신경과학을 공부합니다.", "I study cognitive neuroscience."],
  ["계산신경과학", "ကွန်ပျူတာ အာရုံကြော သိပ္ပံ", "Psychology", "계산신경과학을 전공합니다.", "I major in computational neuroscience."],
  ["행동신경과학", "အပြုအမူ အာရုံကြော သိပ္ပံ", "Psychology", "행동신경과학을 연구합니다.", "I study behavioral neuroscience."],
  ["사회신경과학", "လူမှုရေး အာရုံကြော သိပ္ပံ", "Psychology", "사회신경과학을 공부합니다.", "I study social neuroscience."],
  ["감정신경과학", "စိတ်ခံစားမှု အာရုံကြော သိပ္ပံ", "Psychology", "감정신경과학을 전공합니다.", "I major in affective neuroscience."],
  ["발달신경과학", "ဖွံ့ဖြိုးမှု အာရုံကြော သိပ္ပံ", "Psychology", "발달신경과학을 연구합니다.", "I study developmental neuroscience."],
  ["분자신경과학", "မော်လီကျူး အာရုံကြော သိပ္ပံ", "Psychology", "분자신경과학을 공부합니다.", "I study molecular neuroscience."],
  ["시스템신경과학", "စနစ် အာရုံကြော သိပ္ပံ", "Psychology", "시스템신경과학을 전공합니다.", "I major in systems neuroscience."],
  
  // Advanced Legal & Regulatory Sciences
  ["법정보학", "ဥပဒေ သတင်းအချက်အလက်", "Legal", "법정보학을 연구합니다.", "I study legal informatics."],
  ["전자법률", "အီလက်ထရွန်နစ် ဥပဒေ", "Legal", "전자법률을 전공합니다.", "I major in electronic law."],
  ["디지털법률", "ဒစ်ဂျစ်တယ် ဥပဒေ", "Legal", "디지털법률을 공부합니다.", "I study digital law."],
  ["스마트계약", "စမတ် စာချုပ်", "Legal", "스마트계약을 연구합니다.", "I study smart contracts."],
  ["블록체인법률", "ဘလော့ခ်ချိန်း ဥပဒေ", "Legal", "블록체인법률을 전공합니다.", "I major in blockchain law."],
  ["인공지능법률", "လူလုပ်ဉာဏ်ရည် ဥပဒေ", "Legal", "인공지능법률을 공부합니다.", "I study AI law."],
  ["로봇법률", "ရိုဘော့ ဥပဒေ", "Legal", "로봇법률을 연구합니다.", "I study robot law."],
  ["자율주행법률", "ကိုယ်ပိုင် မောင်းနှင်မှု ဥပဒေ", "Legal", "자율주행법률을 전공합니다.", "I major in autonomous vehicle law."],
  ["드론법률", "ဒရုန်း ဥပဒေ", "Legal", "드론법률을 공부합니다.", "I study drone law."],
  ["3D프린팅법률", "3D ပုံနှိပ် ဥပဒေ", "Legal", "3D프린팅법률을 연구합니다.", "I study 3D printing law."],
  
  // Advanced Economics & Financial Technology
  ["핀테크", "ငွေရေး နည်းပညာ", "Economics", "핀테크를 연구합니다.", "I study fintech."],
  ["블록체인금융", "ဘလော့ခ်ချိန်း ငွေရေး", "Economics", "블록체인금융을 전공합니다.", "I major in blockchain finance."],
  ["암호화폐", "လျှို့ဝှက်ကုဒ် ငွေ", "Economics", "암호화폐를 연구합니다.", "I study cryptocurrency."],
  ["디지털화폐", "ဒစ်ဂျစ်တယ် ငွေ", "Economics", "디지털화폐를 공부합니다.", "I study digital currency."],
  ["중앙은행디지털화폐", "ဗဟိုဘဏ် ဒစ်ဂျစ်တယ် ငွေ", "Economics", "중앙은행디지털화폐를 전공합니다.", "I major in central bank digital currency."],
  ["스마트계약금융", "စမတ် စာချုပ် ငွေရေး", "Economics", "스마트계약금융을 연구합니다.", "I study smart contract finance."],
  ["분산금융", "ဖြန့်ဝေထားသော ငွေရေး", "Economics", "분산금융을 공부합니다.", "I study decentralized finance."],
  ["크라우드펀딩", "လူထု ရန်ပုံငွေ", "Economics", "크라우드펀딩을 전략합니다.", "I strategize crowdfunding."],
  ["피투피대출", "လူမှ လူသို့ ချေးငွေ", "Economics", "피투피대출을 연구합니다.", "I study peer-to-peer lending."],
  ["로보어드바이저", "ရိုဘော့ အကြံပေး", "Economics", "로보어드바이저를 개발합니다.", "I develop robo-advisors."],
  
  // Advanced Engineering & Manufacturing
  ["첨단제조", "ခေတ်မီ ထုတ်လုပ်မှု", "Engineering", "첨단제조를 연구합니다.", "I study advanced manufacturing."],
  ["스마트제조", "စမတ် ထုတ်လုပ်မှု", "Engineering", "스마트제조를 전공합니다.", "I major in smart manufacturing."],
  ["디지털제조", "ဒစ်ဂျစ်တယ် ထုတ်လုပ်မှု", "Engineering", "디지털제조를 공부합니다.", "I study digital manufacturing."],
  ["3D프린팅", "3D ပုံနှိပ်", "Engineering", "3D프린팅을 연구합니다.", "I study 3D printing."],
  ["적층제조", "ထပ်ဆင့် ထုတ်လုပ်မှု", "Engineering", "적층제조를 전공합니다.", "I major in additive manufacturing."],
  ["감산제조", "နုတ်ယူမှု ထုတ်လုပ်မှု", "Engineering", "감산제조를 공부합니다.", "I study subtractive manufacturing."],
  ["나노제조", "နာနို ထုတ်လုပ်မှု", "Engineering", "나노제조를 연구합니다.", "I study nanomanufacturing."],
  ["바이오제조", "ဇီဝ ထုတ်လုပ်မှု", "Engineering", "바이오제조를 전공합니다.", "I major in biomanufacturing."],
  ["그린제조", "အစိမ်းရောင် ထုတ်လုပ်မှု", "Engineering", "그린제조를 공부합니다.", "I study green manufacturing."],
  ["지속가능제조", "ရေရှည်တည်တံ့သော ထုတ်လုပ်မှု", "Engineering", "지속가능제조를 연구합니다.", "I study sustainable manufacturing."],
  
  // Additional Advanced Terms
  ["양자생물학", "ကွမ်တမ် ဇီဝဗေဒ", "Science", "양자생물학을 연구합니다.", "I study quantum biology."],
  ["양자화학", "ကွမ်တမ် ဓာတုဗေဒ", "Science", "양자화학을 전공합니다.", "I major in quantum chemistry."],
  ["양자물리학", "ကွမ်တမ် ရူပဗေဒ", "Science", "양자물리학을 공부합니다.", "I study quantum physics."],
  ["양자광학", "ကွမ်တမ် အလင်း", "Science", "양자광학을 연구합니다.", "I study quantum optics."],
  ["양자전자공학", "ကွမ်တမ် အီလက်ထရွန်နစ် အင်ဂျင်နီယာ", "Engineering", "양자전자공학을 전공합니다.", "I major in quantum electronics."],
  ["양자소재", "ကွမ်တမ် ပစ္စည်း", "Engineering", "양자소재를 연구합니다.", "I study quantum materials."],
  ["양자센서", "ကွမ်တမ် အာရုံခံကိရိယာ", "Engineering", "양자센서를 개발합니다.", "I develop quantum sensors."],
  ["양자이미징", "ကွမ်တမ် ပုံရိပ်", "Technology", "양자이미징을 연구합니다.", "I study quantum imaging."],
  ["양자메타물질", "ကွမ်တမ် မက်တာ ပစ္စည်း", "Technology", "양자메타물질을 전공합니다.", "I major in quantum metamaterials."],
  ["양자광전자", "ကွမ်တမ် အလင်း အီလက်ထရွန်", "Technology", "양자광전자를 공부합니다.", "I study quantum optoelectronics."],
  
  // Final Advanced Terms
  ["양자나노과학", "ကွမ်တမ် နာနို သိပ္ပံ", "Science", "양자나노과학을 연구합니다.", "I study quantum nanoscience."],
  ["양자바이오물리학", "ကွမ်တမ် ဇီဝ ရူပဗေဒ", "Science", "양자바이오물리학을 전공합니다.", "I major in quantum biophysics."],
  ["양자나노기술", "ကွမ်တမ် နာနို နည်းပညာ", "Technology", "양자나노기술을 개발합니다.", "I develop quantum nanotechnology."],
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

