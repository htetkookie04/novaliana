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
  // Advanced Space & Aerospace Sciences
  ["우주과학", "အာကာသ သိပ္ပံ", "Science", "우주과학을 전공합니다.", "I major in space science."],
  ["항공우주공학", "လေကြောင်း အာကာသ အင်ဂျင်နီယာ", "Engineering", "항공우주공학을 연구합니다.", "I study aerospace engineering."],
  ["우주항공학", "အာကာသ လေကြောင်း", "Engineering", "우주항공학을 공부합니다.", "I study astronautical engineering."],
  ["위성공학", "ဂြိုဟ်တု အင်ဂျင်နီယာ", "Engineering", "위성공학을 전공합니다.", "I major in satellite engineering."],
  ["로켓공학", "ဒုံးပျံ အင်ဂျင်နီယာ", "Engineering", "로켓공학을 연구합니다.", "I study rocket engineering."],
  ["우주탐사", "အာကာသ စူးစမ်းရှာဖွေမှု", "Science", "우주탐사를 수행합니다.", "I conduct space exploration."],
  ["행성과학", "ဂြိုဟ် သိပ္ပံ", "Science", "행성과학을 공부합니다.", "I study planetary science."],
  ["천문학", "နက္ခတ္တဗေဒ", "Science", "천문학을 전공합니다.", "I major in astronomy."],
  ["우주물리학", "အာကာသ ရူပဗေဒ", "Science", "우주물리학을 연구합니다.", "I study space physics."],
  ["우주생물학", "အာကာသ ဇီဝဗေဒ", "Science", "우주생물학을 공부합니다.", "I study astrobiology."],
  
  // Advanced Materials & Nanotechnology
  ["나노소재", "နာနို ပစ္စည်း", "Engineering", "나노소재를 연구합니다.", "I study nanomaterials."],
  ["스마트소재", "စမတ် ပစ္စည်း", "Engineering", "스마트소재를 전공합니다.", "I major in smart materials."],
  ["기능성소재", "လုပ်ဆောင်ချက် ပစ္စည်း", "Engineering", "기능성소재를 공부합니다.", "I study functional materials."],
  ["복합소재", "ရောနှော ပစ္စည်း", "Engineering", "복합소재를 연구합니다.", "I study composite materials."],
  ["메타물질", "မက်တာ ပစ္စည်း", "Engineering", "메타물질을 전공합니다.", "I major in metamaterials."],
  ["양자소재", "ကွမ်တမ် ပစ္စည်း", "Engineering", "양자소재를 공부합니다.", "I study quantum materials."],
  ["바이오소재", "ဇီဝ ပစ္စည်း", "Engineering", "바이오소재를 연구합니다.", "I study biomaterials."],
  ["나노복합소재", "နာနို ရောနှော ပစ္စည်း", "Engineering", "나노복합소재를 전공합니다.", "I major in nanocomposite materials."],
  ["스마트복합소재", "စမတ် ရောနှော ပစ္စည်း", "Engineering", "스마트복합소재를 공부합니다.", "I study smart composite materials."],
  ["기능성나노소재", "လုပ်ဆောင်ချက် နာနို ပစ္စည်း", "Engineering", "기능성나노소재를 연구합니다.", "I study functional nanomaterials."],
  
  // Advanced Energy & Power Systems
  ["신재생에너지", "ခေတ်သစ် ပြန်လည်ပြည့်ဖြိုးမြဲ စွမ်းအင်", "Environment", "신재생에너지를 개발합니다.", "We develop new renewable energy."],
  ["태양광발전", "နေရောင်ခြည် လျှပ်စစ်", "Environment", "태양광발전을 연구합니다.", "I study solar power generation."],
  ["풍력발전", "လေအား လျှပ်စစ်", "Environment", "풍력발전을 전공합니다.", "I major in wind power generation."],
  ["수력발전", "ရေအား လျှပ်စစ်", "Environment", "수력발전을 공부합니다.", "I study hydroelectric power generation."],
  ["지열발전", "မြေအောက်အပူ လျှပ်စစ်", "Environment", "지열발전을 연구합니다.", "I study geothermal power generation."],
  ["조력발전", "ဒီရေ လျှပ်စစ်", "Environment", "조력발전을 전공합니다.", "I major in tidal power generation."],
  ["파력발전", "လှိုင်း လျှပ်စစ်", "Environment", "파력발전을 공부합니다.", "I study wave power generation."],
  ["바이오에너지", "ဇီဝ စွမ်းအင်", "Environment", "바이오에너지를 연구합니다.", "I study bioenergy."],
  ["수소에너지", "ဟိုက်ဒရိုဂျင် စွမ်းအင်", "Environment", "수소에너지를 전공합니다.", "I major in hydrogen energy."],
  ["연료전지", "လောင်စာ ဆဲလ်", "Environment", "연료전지를 개발합니다.", "I develop fuel cells."],
  
  // Advanced Transportation & Mobility
  ["자율주행", "ကိုယ်ပိုင် မောင်းနှင်မှု", "Technology", "자율주행을 연구합니다.", "I study autonomous driving."],
  ["전기자동차", "လျှပ်စစ် ကား", "Technology", "전기자동차를 개발합니다.", "I develop electric vehicles."],
  ["수소자동차", "ဟိုက်ဒရိုဂျင် ကား", "Technology", "수소자동차를 전공합니다.", "I major in hydrogen vehicles."],
  ["하이브리드차", "ရောနှော ကား", "Technology", "하이브리드차를 공부합니다.", "I study hybrid vehicles."],
  ["스마트모빌리티", "စမတ် ရွေ့လျားမှု", "Technology", "스마트모빌리티를 연구합니다.", "I study smart mobility."],
  ["공유모빌리티", "မျှဝေသော ရွေ့လျားမှု", "Technology", "공유모빌리티를 전공합니다.", "I major in shared mobility."],
  ["드론택시", "ဒရုန်း တက္ကစီ", "Technology", "드론택시를 개발합니다.", "I develop drone taxis."],
  ["하이퍼루프", "ဟိုင်ပါ ကွင်းဆက်", "Technology", "하이퍼루프를 연구합니다.", "I study hyperloop."],
  ["자율주행버스", "ကိုယ်ပိုင် မောင်းနှင်သော ဘတ်စကား", "Technology", "자율주행버스를 공부합니다.", "I study autonomous buses."],
  ["전기항공기", "လျှပ်စစ် လေယာဉ်", "Technology", "전기항공기를 전공합니다.", "I major in electric aircraft."],
  
  // Advanced Robotics & Automation
  ["산업로봇", "စက်မှု ရိုဘော့", "Engineering", "산업로봇을 개발합니다.", "I develop industrial robots."],
  ["서비스로봇", "ဝန်ဆောင်မှု ရိုဘော့", "Engineering", "서비스로봇을 연구합니다.", "I study service robots."],
  ["의료로봇", "ဆေးပညာ ရိုဘော့", "Engineering", "의료로봇을 전공합니다.", "I major in medical robots."],
  ["농업로봇", "စိုက်ပျိုးရေး ရိုဘော့", "Engineering", "농업로봇을 공부합니다.", "I study agricultural robots."],
  ["가정로봇", "အိမ် ရိုဘော့", "Engineering", "가정로봇을 연구합니다.", "I study home robots."],
  ["교육로봇", "ပညာရေး ရိုဘော့", "Engineering", "교육로봇을 전공합니다.", "I major in educational robots."],
  ["엔터테인먼트로봇", "ဖျော်ဖြေရေး ရိုဘော့", "Engineering", "엔터테인먼트로봇을 공부합니다.", "I study entertainment robots."],
  ["군사로봇", "စစ်ရေး ရိုဘော့", "Engineering", "군사로봇을 연구합니다.", "I study military robots."],
  ["탐사로봇", "စူးစမ်းရှာဖွေရေး ရိုဘော့", "Engineering", "탐사로봇을 전공합니다.", "I major in exploration robots."],
  ["인간형로봇", "လူပုံစံ ရိုဘော့", "Engineering", "인간형로봇을 공부합니다.", "I study humanoid robots."],
  
  // Advanced Information & Data Sciences
  ["정보과학", "သတင်းအချက်အလက် သိပ္ပံ", "Computer Science", "정보과학을 전공합니다.", "I major in information science."],
  ["데이터과학", "ဒေတာ သိပ္ပံ", "Computer Science", "데이터과학을 연구합니다.", "I study data science."],
  ["빅데이터", "ကြီးမားသော ဒေတာ", "Computer Science", "빅데이터를 분석하세요.", "Analyze big data."],
  ["데이터마이닝", "ဒေတာ တူးဖော်မှု", "Computer Science", "데이터마이닝을 수행합니다.", "I perform data mining."],
  ["데이터분석", "ဒေတာ ခွဲခြမ်းစိတ်ဖြာမှု", "Computer Science", "데이터분석을 연구합니다.", "I study data analysis."],
  ["데이터시각화", "ဒေတာ ပုံဖော်မှု", "Computer Science", "데이터시각화를 전공합니다.", "I major in data visualization."],
  ["데이터웨어하우스", "ဒေတာ ဂိုဒေါင်", "Computer Science", "데이터웨어하우스를 구축합니다.", "I build data warehouses."],
  ["데이터레이크", "ဒေတာ ရေကန်", "Computer Science", "데이터레이크를 연구합니다.", "I study data lakes."],
  ["데이터거버넌스", "ဒေတာ စီမံခန့်ခွဲရေး", "Computer Science", "데이터거버넌스를 공부합니다.", "I study data governance."],
  ["데이터품질", "ဒေတာ အရည်အသွေး", "Computer Science", "데이터품질을 관리합니다.", "I manage data quality."],
  
  // Advanced Security & Cybersecurity
  ["사이버보안", "ဆိုက်ဘာ လုံခြုံရေး", "Technology", "사이버보안을 강화합니다.", "I strengthen cybersecurity."],
  ["정보보안", "သတင်းအချက်အလက် လုံခြုံရေး", "Technology", "정보보안을 연구합니다.", "I study information security."],
  ["네트워크보안", "ကွန်ရက် လုံခြုံရေး", "Technology", "네트워크보안을 전공합니다.", "I major in network security."],
  ["클라우드보안", "ကလောက်ဒ် လုံခြုံရေး", "Technology", "클라우드보안을 공부합니다.", "I study cloud security."],
  ["모바일보안", "မိုဘိုင်း လုံခြုံရေး", "Technology", "모바일보안을 연구합니다.", "I study mobile security."],
  ["사이버위협", "ဆိုက်ဘာ ခြိမ်းခြောက်မှု", "Technology", "사이버위협을 분석합니다.", "I analyze cyber threats."],
  ["침입탐지", "ဝင်ရောက်မှု ရှာဖွေမှု", "Technology", "침입탐지 시스템을 구축합니다.", "I build intrusion detection systems."],
  ["취약점분석", "အားနည်းချက် ခွဲခြမ်းစိတ်ဖြာမှု", "Technology", "취약점분석을 수행합니다.", "I perform vulnerability analysis."],
  ["보안감사", "လုံခြုံရေး စစ်ဆေးမှု", "Technology", "보안감사를 실시합니다.", "I conduct security audits."],
  ["위협분석", "ခြိမ်းခြောက်မှု ခွဲခြမ်းစိတ်ဖြာမှု", "Technology", "위협분석을 연구합니다.", "I study threat analysis."],
  
  // Advanced Social & Behavioral Sciences
  ["행동경제학", "အပြုအမူ စီးပွားရေး", "Social Science", "행동경제학을 공부합니다.", "I study behavioral economics."],
  ["인지편향", "သိမြင်မှု ဘက်လိုက်မှု", "Social Science", "인지편향을 연구합니다.", "I study cognitive biases."],
  ["의사결정", "ဆုံးဖြတ်ချက်", "Social Science", "의사결정을 분석합니다.", "I analyze decision-making."],
  ["동기부여", "စိတ်အားထက်သန်မှု", "Social Science", "동기부여를 연구합니다.", "I study motivation."],
  ["리더십", "ဦးဆောင်မှု", "Social Science", "리더십을 개발합니다.", "I develop leadership."],
  ["팀워크", "အဖွဲ့ အလုပ်", "Social Science", "팀워크를 강화합니다.", "I strengthen teamwork."],
  ["갈등관리", "ပဋိပက္ခ စီမံခန့်ခွဲမှု", "Social Science", "갈등관리를 연구합니다.", "I study conflict management."],
  ["협상", "ညှိနှိုင်းမှု", "Social Science", "협상 기술을 배웁니다.", "I learn negotiation skills."],
  ["소통", "ဆက်သွယ်ရေး", "Social Science", "소통을 개선합니다.", "I improve communication."],
  ["감성지능", "စိတ်ခံစားမှု ဉာဏ်ရည်", "Social Science", "감성지능을 개발합니다.", "I develop emotional intelligence."],
  
  // Advanced Arts & Creative Technologies
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
  
  // Advanced Environmental & Climate Technologies
  ["기후기술", "ရာသီဥတု နည်းပညာ", "Environment", "기후기술을 전공합니다.", "I major in climate technology."],
  ["환경기술", "ပတ်ဝန်းကျင် နည်းပညာ", "Environment", "환경기술을 공부합니다.", "I study environmental technology."],
  ["탄소포집", "ကာဗွန် ဖမ်းယူမှု", "Environment", "탄소포집을 연구합니다.", "I study carbon capture."],
  ["탄소저장", "ကာဗွန် သိုလှောင်မှု", "Environment", "탄소저장을 전공합니다.", "I major in carbon storage."],
  ["탄소활용", "ကာဗွန် အသုံးပြုမှု", "Environment", "탄소활용을 공부합니다.", "I study carbon utilization."],
  ["기후적응기술", "ရာသီဥတု အလိုက်သင့် နည်းပညာ", "Environment", "기후적응기술을 연구합니다.", "I study climate adaptation technology."],
  ["기후완화기술", "ရာသီဥတု လျော့ပါးစေမှု နည်းပညာ", "Environment", "기후완화기술을 전공합니다.", "I major in climate mitigation technology."],
  ["환경모니터링", "ပတ်ဝန်းကျင် စောင့်ကြည့်မှု", "Environment", "환경모니터링을 공부합니다.", "I study environmental monitoring."],
  ["대기질관리", "လေထု အရည်အသွေး စီမံခန့်ခွဲမှု", "Environment", "대기질관리를 연구합니다.", "I study air quality management."],
  ["수질관리", "ရေ အရည်အသွေး စီမံခန့်ခွဲမှု", "Environment", "수질관리를 전공합니다.", "I major in water quality management."],
  
  // Additional Advanced Terms
  ["우주정거장", "အာကာသ ဘူတာရုံ", "Science", "우주정거장을 연구합니다.", "I study space stations."],
  ["우주탐사선", "အာကာသ စူးစမ်းရှာဖွေရေး ယာဉ်", "Science", "우주탐사선을 개발합니다.", "I develop space probes."],
  ["인공위성", "လူလုပ် ဂြိုဟ်တု", "Science", "인공위성을 전공합니다.", "I major in artificial satellites."],
  ["우주선", "အာကာသ ယာဉ်", "Science", "우주선을 연구합니다.", "I study spacecraft."],
  ["우주복", "အာကာသ အဝတ်အစား", "Science", "우주복을 개발합니다.", "I develop spacesuits."],
  ["우주식량", "အာကာသ အစားအစာ", "Science", "우주식량을 공부합니다.", "I study space food."],
  ["우주의학", "အာကာသ ဆေးပညာ", "Medical", "우주의학을 전공합니다.", "I major in space medicine."],
  ["무중력", "ဆွဲငင်အား မရှိမှု", "Science", "무중력을 연구합니다.", "I study microgravity."],
  ["우주환경", "အာကာသ ပတ်ဝန်းကျင်", "Science", "우주환경을 공부합니다.", "I study space environment."],
  ["우주쓰레기", "အာကာသ အမှိုက်", "Science", "우주쓰레기를 관리합니다.", "I manage space debris."],
  
  // Advanced Materials & Composites
  ["그래핀", "ဂရပ်ဖင်", "Engineering", "그래핀을 연구합니다.", "I study graphene."],
  ["탄소나노튜브", "ကာဗွန် နာနို ပြွန်", "Engineering", "탄소나노튜브를 전공합니다.", "I major in carbon nanotubes."],
  ["나노와이어", "နာနို ဝိုင်ယာ", "Engineering", "나노와이어를 공부합니다.", "I study nanowires."],
  ["나노입자", "နာနို အမှုန်", "Engineering", "나노입자를 연구합니다.", "I study nanoparticles."],
  ["나노막", "နာနို အလွှာ", "Engineering", "나노막을 전공합니다.", "I major in nanofilms."],
  ["나노구조", "နာနို ဖွဲ့စည်းပုံ", "Engineering", "나노구조를 공부합니다.", "I study nanostructures."],
  ["나노패턴", "နာနို ပုံစံ", "Engineering", "나노패턴을 연구합니다.", "I study nanopatterns."],
  ["나노표면", "နာနို မျက်နှာပြင်", "Engineering", "나노표면을 전공합니다.", "I major in nanosurfaces."],
  ["나노결정", "နာနို ပုံဆောင်ခဲ", "Engineering", "나노결정을 공부합니다.", "I study nanocrystals."],
  ["나노섬유", "နာနို အမျှင်", "Engineering", "나노섬유를 연구합니다.", "I study nanofibers."],
  
  // Advanced Energy Storage & Conversion
  ["배터리기술", "ဘက်ထရီ နည်းပညာ", "Engineering", "배터리기술을 연구합니다.", "I study battery technology."],
  ["리튬이온배터리", "လီသီယမ် အိုင်ယွန် ဘက်ထရီ", "Engineering", "리튬이온배터리를 전공합니다.", "I major in lithium-ion batteries."],
  ["고체배터리", "အစိုင်အခဲ ဘက်ထရီ", "Engineering", "고체배터리를 공부합니다.", "I study solid-state batteries."],
  ["수소연료전지", "ဟိုက်ဒရိုဂျင် လောင်စာ ဆဲလ်", "Engineering", "수소연료전지를 연구합니다.", "I study hydrogen fuel cells."],
  ["태양전지", "နေရောင်ခြည် ဆဲလ်", "Engineering", "태양전지를 전공합니다.", "I major in solar cells."],
  ["태양광패널", "နေရောင်ခြည် ပြား", "Engineering", "태양광패널을 공부합니다.", "I study solar panels."],
  ["에너지저장", "စွမ်းအင် သိုလှောင်မှု", "Engineering", "에너지저장을 연구합니다.", "I study energy storage."],
  ["스마트그리드", "စမတ် ဂရစ်", "Engineering", "스마트그리드를 전공합니다.", "I major in smart grids."],
  ["에너지관리", "စွမ်းအင် စီမံခန့်ခွဲမှု", "Engineering", "에너지관리를 공부합니다.", "I study energy management."],
  ["에너지효율", "စွမ်းအင် ထိရောက်မှု", "Engineering", "에너지효율을 높입니다.", "We increase energy efficiency."],
  
  // Advanced Transportation Technologies
  ["하이퍼루프", "ဟိုင်ပါ ကွင်းဆက်", "Technology", "하이퍼루프를 연구합니다.", "I study hyperloop."],
  ["자율주행차", "ကိုယ်ပိုင် မောင်းနှင်သော ကား", "Technology", "자율주행차를 개발합니다.", "I develop autonomous vehicles."],
  ["전기버스", "လျှပ်စစ် ဘတ်စကား", "Technology", "전기버스를 전공합니다.", "I major in electric buses."],
  ["전기트럭", "လျှပ်စစ် ထရပ်ကား", "Technology", "전기트럭을 공부합니다.", "I study electric trucks."],
  ["전기오토바이", "လျှပ်စစ် မော်တော်ဆိုင်ကယ်", "Technology", "전기오토바이를 연구합니다.", "I study electric motorcycles."],
  ["전기자전거", "လျှပ်စစ် စက်ဘီး", "Technology", "전기자전거를 전공합니다.", "I major in electric bicycles."],
  ["충전인프라", "အားသွင်းမှု အခြေခံအဆောက်အဦ", "Technology", "충전인프라를 구축합니다.", "I build charging infrastructure."],
  ["배터리교환", "ဘက်ထရီ လဲလှယ်မှု", "Technology", "배터리교환을 연구합니다.", "I study battery swapping."],
  ["충전기술", "အားသွင်းမှု နည်းပညာ", "Technology", "충전기술을 공부합니다.", "I study charging technology."],
  ["고속충전", "မြန်ဆန်သော အားသွင်းမှု", "Technology", "고속충전을 전공합니다.", "I major in fast charging."],
  
  // Advanced Robotics & AI Integration
  ["인공지능로봇", "လူလုပ်ဉာဏ်ရည် ရိုဘော့", "Engineering", "인공지능로봇을 개발합니다.", "I develop AI robots."],
  ["머신러닝로봇", "စက်သင်ယူမှု ရိုဘော့", "Engineering", "머신러닝로봇을 연구합니다.", "I study machine learning robots."],
  ["딥러닝로봇", "နက်ရှိုင်းသော သင်ယူမှု ရိုဘော့", "Engineering", "딥러닝로봇을 전공합니다.", "I major in deep learning robots."],
  ["컴퓨터비전로봇", "ကွန်ပျူတာ အမြင် ရိုဘော့", "Engineering", "컴퓨터비전로봇을 공부합니다.", "I study computer vision robots."],
  ["자연어처리로봇", "သဘာဝ ဘာသာစကား လုပ်ဆောင်မှု ရိုဘော့", "Engineering", "자연어처리로봇을 연구합니다.", "I study NLP robots."],
  ["강화학습로봇", "အားကောင်းစေသော သင်ယူမှု ရိုဘော့", "Engineering", "강화학습로봇을 전공합니다.", "I major in reinforcement learning robots."],
  ["협동로봇", "ပူးပေါင်းသော ရိုဘော့", "Engineering", "협동로봇을 개발합니다.", "I develop collaborative robots."],
  ["스와암로봇", "အုပ်စု ရိုဘော့", "Engineering", "스와암로봇을 연구합니다.", "I study swarm robots."],
  ["소프트로봇", "ပျော့ပျောင်းသော ရိုဘော့", "Engineering", "소프트로봇을 공부합니다.", "I study soft robots."],
  ["바이오로봇", "ဇီဝ ရိုဘော့", "Engineering", "바이오로봇을 전공합니다.", "I major in bio-robots."],
  
  // Advanced Data & Analytics
  ["데이터엔지니어링", "ဒေတာ အင်ဂျင်နီယာ", "Computer Science", "데이터엔지니어링을 연구합니다.", "I study data engineering."],
  ["데이터아키텍처", "ဒေတာ ဗိသုကာ", "Computer Science", "데이터아키텍처를 전공합니다.", "I major in data architecture."],
  ["데이터파이프라인", "ဒေတာ ပိုက်လိုင်း", "Computer Science", "데이터파이프라인을 공부합니다.", "I study data pipelines."],
  ["데이터스트리밍", "ဒေတာ စီးဆင်းမှု", "Computer Science", "데이터스트리밍을 연구합니다.", "I study data streaming."],
  ["실시간데이터", "အချိန်နှင့်တပြေးညီ ဒေတာ", "Computer Science", "실시간데이터를 전공합니다.", "I major in real-time data."],
  ["데이터통합", "ဒေတာ ပေါင်းစည်းမှု", "Computer Science", "데이터통합을 공부합니다.", "I study data integration."],
  ["데이터변환", "ဒေတာ ပြောင်းလဲမှု", "Computer Science", "데이터변환을 연구합니다.", "I study data transformation."],
  ["데이터클리닝", "ဒေတာ သန့်ရှင်းမှု", "Computer Science", "데이터클리닝을 전공합니다.", "I major in data cleaning."],
  ["데이터검증", "ဒေတာ အတည်ပြုမှု", "Computer Science", "데이터검증을 공부합니다.", "I study data validation."],
  ["데이터보관", "ဒေတာ သိုလှောင်မှု", "Computer Science", "데이터보관을 연구합니다.", "I study data archiving."],
  
  // Advanced Security & Privacy
  ["암호화", "လျှို့ဝှက်ကုဒ်", "Technology", "데이터를 암호화하세요.", "Encrypt the data."],
  ["해싱", "ဟက်ရှ်", "Technology", "해싱을 연구합니다.", "I study hashing."],
  ["디지털서명", "ဒစ်ဂျစ်တယ် လက်မှတ်", "Technology", "디지털서명을 전공합니다.", "I major in digital signatures."],
  ["인증", "အတည်ပြုမှု", "Technology", "인증을 공부합니다.", "I study authentication."],
  ["권한관리", "ခွင့်ပြုချက် စီမံခန့်ခွဲမှု", "Technology", "권한관리를 연구합니다.", "I study access control."],
  ["프라이버시보호", "ကိုယ်ရေးလုံခြုံမှု ကာကွယ်ရေး", "Technology", "프라이버시보호를 전공합니다.", "I major in privacy protection."],
  ["데이터보호", "ဒေတာ ကာကွယ်ရေး", "Technology", "데이터보호를 공부합니다.", "I study data protection."],
  ["개인정보보호", "ကိုယ်ရေးသတင်းအချက်အလက် ကာကွယ်ရေး", "Technology", "개인정보보호를 연구합니다.", "I study personal information protection."],
  ["GDPR준수", "GDPR လိုက်နာမှု", "Legal", "GDPR준수를 보장합니다.", "I ensure GDPR compliance."],
  ["데이터거버넌스", "ဒေတာ စီမံခန့်ခွဲရေး", "Technology", "데이터거버넌스를 구축합니다.", "I build data governance."],
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

