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
  // Advanced Biotechnology & Life Sciences
  ["유전자편집", "မျိုးရိုးဗီဇ တည်းဖြတ်မှု", "Biology", "유전자편집을 연구합니다.", "I study gene editing."],
  ["크리스퍼", "ကရစ်စပါ", "Biology", "크리스퍼 기술을 전공합니다.", "I major in CRISPR technology."],
  ["유전자치료", "မျိုးရိုးဗီဇ ကုသမှု", "Biology", "유전자치료 연구를 합니다.", "I conduct gene therapy research."],
  ["세포치료", "ဆဲလ် ကုသမှု", "Biology", "세포치료를 공부합니다.", "I study cell therapy."],
  ["면역치료", "ကိုယ်ခံအား ကုသမှု", "Biology", "면역치료를 전공합니다.", "I major in immunotherapy."],
  ["줄기세포", "ပင်မဆဲလ်", "Biology", "줄기세포를 연구합니다.", "I study stem cells."],
  ["재생의학", "ပြန်လည်ထူထောင်ရေး ဆေးပညာ", "Biology", "재생의학을 공부합니다.", "I study regenerative medicine."],
  ["조직공학", "တစ်ရှူး အင်ဂျင်နီယာ", "Biology", "조직공학을 전공합니다.", "I major in tissue engineering."],
  ["장기배양", "အင်္ဂါ စိုက်ပျိုးမှု", "Biology", "장기배양을 연구합니다.", "I study organ cultivation."],
  ["인공장기", "လူလုပ် အင်္ဂါ", "Biology", "인공장기를 개발합니다.", "I develop artificial organs."],
  
  // Advanced Quantum Sciences
  ["양자중첩", "ကွမ်တမ် ထပ်ဆင့်မှု", "Physics", "양자중첩을 연구합니다.", "I study quantum superposition."],
  ["양자얽힘", "ကွမ်တမ် ရှုပ်ထွေးမှု", "Physics", "양자얽힘을 전공합니다.", "I major in quantum entanglement."],
  ["양자터널링", "ကွမ်တမ် တူးမြောင်း", "Physics", "양자터널링을 공부합니다.", "I study quantum tunneling."],
  ["양자간섭", "ကွမ်တမ် နှောင့်ယှက်မှု", "Physics", "양자간섭을 연구합니다.", "I study quantum interference."],
  ["양자측정", "ကွမ်တမ် တိုင်းတာမှု", "Physics", "양자측정을 전공합니다.", "I major in quantum measurement."],
  ["양자상태", "ကွမ်တမ် အခြေအနေ", "Physics", "양자상태를 공부합니다.", "I study quantum states."],
  ["양자비트", "ကွမ်တမ် ဘစ်", "Technology", "양자비트를 연구합니다.", "I study qubits."],
  ["양자게이트", "ကွမ်တမ် တံခါး", "Technology", "양자게이트를 전공합니다.", "I major in quantum gates."],
  ["양자회로", "ကွမ်တမ် ကွင်းဆက်", "Technology", "양자회로를 공부합니다.", "I study quantum circuits."],
  ["양자알고리즘", "ကွမ်တမ် အယ်လ်ဂိုရီသမ်", "Technology", "양자알고리즘을 연구합니다.", "I study quantum algorithms."],
  
  // Advanced Nanotechnology
  ["나노입자", "နာနို အမှုန်", "Engineering", "나노입자를 연구합니다.", "I study nanoparticles."],
  ["나노와이어", "နာနို ဝိုင်ယာ", "Engineering", "나노와이어를 전공합니다.", "I major in nanowires."],
  ["나노튜브", "နာနို ပြွန်", "Engineering", "나노튜브를 공부합니다.", "I study nanotubes."],
  ["나노막", "နာနို အလွှာ", "Engineering", "나노막을 연구합니다.", "I study nanofilms."],
  ["나노구조", "နာနို ဖွဲ့စည်းပုံ", "Engineering", "나노구조를 전공합니다.", "I major in nanostructures."],
  ["나노패턴", "နာနို ပုံစံ", "Engineering", "나노패턴을 공부합니다.", "I study nanopatterns."],
  ["나노표면", "နာနို မျက်နှာပြင်", "Engineering", "나노표면을 연구합니다.", "I study nanosurfaces."],
  ["나노결정", "နာနို ပုံဆောင်ခဲ", "Engineering", "나노결정을 전공합니다.", "I major in nanocrystals."],
  ["나노섬유", "နာနို အမျှင်", "Engineering", "나노섬유를 공부합니다.", "I study nanofibers."],
  ["나노포어", "နာနို အပေါက်", "Engineering", "나노포어를 연구합니다.", "I study nanopores."],
  
  // Advanced Energy Technologies
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
  
  // Advanced Space Sciences
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
  
  // Advanced Materials Science
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
  
  // Advanced Specialized Medical Terms
  ["정밀의료", "တိကျသော ဆေးပညာ", "Medical", "정밀의료 치료를 받습니다.", "I receive precision medicine treatment."],
  ["개인맞춤의료", "ကိုယ်ပိုင် ဆေးပညာ", "Medical", "개인맞춤의료를 전공합니다.", "I major in personalized medicine."],
  ["유전체의학", "မျိုးရိုးဗီဇ ဆေးပညာ", "Medical", "유전체의학을 연구합니다.", "I study genomic medicine."],
  ["단백질체의학", "ပရိုတိန်း ဆေးပညာ", "Medical", "단백질체의학을 공부합니다.", "I study proteomic medicine."],
  ["대사체의학", "ဇီဝကမ္မဗေဒ ဆေးပညာ", "Medical", "대사체의학을 전공합니다.", "I major in metabolomic medicine."],
  ["전사체의학", "အကြောင်းအရာ ဆေးပညာ", "Medical", "전사체의학을 연구합니다.", "I study transcriptomic medicine."],
  ["면역유전체학", "ကိုယ်ခံအား မျိုးရိုးဗီဇ", "Medical", "면역유전체학을 공부합니다.", "I study immunogenomics."],
  ["약물유전체학", "ဆေးဝါး မျိုးရိုးဗီဇ", "Medical", "약물유전체학을 전공합니다.", "I major in pharmacogenomics."],
  ["암유전체학", "ကင်ဆာ မျိုးရိုးဗီဇ", "Medical", "암유전체학을 연구합니다.", "I study cancer genomics."],
  ["신경유전체학", "အာရုံကြော မျိုးရိုးဗီဇ", "Medical", "신경유전체학을 공부합니다.", "I study neurogenomics."],
  
  // Advanced Computational Sciences
  ["계산생물학", "ကွန်ပျူတာ ဇီဝဗေဒ", "Computer Science", "계산생물학을 전공합니다.", "I major in computational biology."],
  ["계산화학", "ကွန်ပျူတာ ဓာတုဗေဒ", "Computer Science", "계산화학을 연구합니다.", "I study computational chemistry."],
  ["계산물리학", "ကွန်ပျူတာ ရူပဗေဒ", "Computer Science", "계산물리학을 공부합니다.", "I study computational physics."],
  ["계산수학", "ကွန်ပျူတာ သင်္ချာ", "Computer Science", "계산수학을 전공합니다.", "I major in computational mathematics."],
  ["계산공학", "ကွန်ပျူတာ အင်ဂျင်နီယာ", "Computer Science", "계산공학을 연구합니다.", "I study computational engineering."],
  ["계산의학", "ကွန်ပျူတာ ဆေးပညာ", "Computer Science", "계산의학을 공부합니다.", "I study computational medicine."],
  ["계산재료과학", "ကွန်ပျူတာ ပစ္စည်း သိပ္ပံ", "Computer Science", "계산재료과학을 전공합니다.", "I major in computational materials science."],
  ["계산유체역학", "ကွန်ပျူတာ အရည် စွမ်းအား", "Computer Science", "계산유체역학을 연구합니다.", "I study computational fluid dynamics."],
  ["계산구조역학", "ကွန်ပျူတာ ဖွဲ့စည်းပုံ စွမ်းအား", "Computer Science", "계산구조역학을 공부합니다.", "I study computational structural mechanics."],
  ["계산전자기학", "ကွန်ပျူတာ လျှပ်စစ်သံလိုက်", "Computer Science", "계산전자기학을 전공합니다.", "I major in computational electromagnetics."],
  
  // Advanced Interdisciplinary Fields
  ["바이오인포매틱스", "ဇီဝသတင်းအချက်အလက်", "Science", "바이오인포매틱스를 활용합니다.", "I utilize bioinformatics."],
  ["화학인포매틱스", "ဓာတုဗေဒ သတင်းအချက်အလက်", "Science", "화학인포매틱스를 연구합니다.", "I study cheminformatics."],
  ["의료인포매틱스", "ဆေးပညာ သတင်းအချက်အလက်", "Science", "의료인포매틱스를 전공합니다.", "I major in medical informatics."],
  ["환경인포매틱스", "ပတ်ဝန်းကျင် သတင်းအချက်အလက်", "Science", "환경인포매틱스를 공부합니다.", "I study environmental informatics."],
  ["공간인포매틱스", "နေရာ သတင်းအချက်အလက်", "Science", "공간인포매틱스를 연구합니다.", "I study geoinformatics."],
  ["사회인포매틱스", "လူမှုရေး သတင်းအချက်အလက်", "Science", "사회인포매틱스를 전공합니다.", "I major in social informatics."],
  ["경제인포매틱스", "စီးပွားရေး သတင်းအချက်အလက်", "Science", "경제인포매틱스를 공부합니다.", "I study economic informatics."],
  ["문화인포매틱스", "ယဉ်ကျေးမှု သတင်းအချက်အလက်", "Science", "문화인포매틱스를 연구합니다.", "I study cultural informatics."],
  ["도서인포매틱스", "စာကြည့်တိုက် သတင်းအချက်အလက်", "Science", "도서인포매틱스를 전공합니다.", "I major in library informatics."],
  ["법정보학", "ဥပဒေ သတင်းအချက်အလက်", "Science", "법정보학을 공부합니다.", "I study legal informatics."],
  
  // Advanced Quantum Technologies
  ["양자컴퓨터", "ကွမ်တမ် ကွန်ပျူတာ", "Technology", "양자컴퓨터를 개발합니다.", "I develop quantum computers."],
  ["양자센서", "ကွမ်တမ် အာရုံခံကိရိယာ", "Technology", "양자센서를 연구합니다.", "I study quantum sensors."],
  ["양자이미징", "ကွမ်တမ် ပုံရိပ်", "Technology", "양자이미징을 전공합니다.", "I major in quantum imaging."],
  ["양자메타물질", "ကွမ်တမ် မက်တာ ပစ္စည်း", "Technology", "양자메타물질을 공부합니다.", "I study quantum metamaterials."],
  ["양자광전자", "ကွမ်တမ် အလင်း အီလက်ထရွန်", "Technology", "양자광전자를 연구합니다.", "I study quantum optoelectronics."],
  ["양자나노과학", "ကွမ်တမ် နာနို သိပ္ပံ", "Technology", "양자나노과학을 전공합니다.", "I major in quantum nanoscience."],
  ["양자바이오물리학", "ကွမ်တမ် ဇီဝ ရူပဗေဒ", "Technology", "양자바이오물리학을 공부합니다.", "I study quantum biophysics."],
  ["양자나노기술", "ကွမ်တမ် နာနို နည်းပညာ", "Technology", "양자나노기술을 개발합니다.", "I develop quantum nanotechnology."],
  ["양자바이오기술", "ကွမ်တမ် ဇီဝ နည်းပညာ", "Technology", "양자바이오기술을 연구합니다.", "I study quantum biotechnology."],
  ["양자나노의학", "ကွမ်တမ် နာနို ဆေးပညာ", "Technology", "양자나노의학을 전공합니다.", "I major in quantum nanomedicine."],
  
  // Advanced Manufacturing Technologies
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
  
  // Advanced Communication Technologies
  ["5G통신", "5G ဆက်သွယ်ရေး", "Communication", "5G통신을 연구합니다.", "I study 5G communication."],
  ["6G통신", "6G ဆက်သွယ်ရေး", "Communication", "6G통신을 전공합니다.", "I major in 6G communication."],
  ["사물인터넷통신", "အင်တာနက် အရာဝတ္ထု ဆက်သွယ်ရေး", "Communication", "사물인터넷통신을 공부합니다.", "I study IoT communication."],
  ["엣지컴퓨팅통신", "အစွန်း ကွန်ပျူတာ ဆက်သွယ်ရေး", "Communication", "엣지컴퓨팅통신을 연구합니다.", "I study edge computing communication."],
  ["양자통신", "ကွမ်တမ် ဆက်သွယ်ရေး", "Communication", "양자통신을 전공합니다.", "I major in quantum communication."],
  ["광통신", "အလင်း ဆက်သွယ်ရေး", "Communication", "광통신을 공부합니다.", "I study optical communication."],
  ["위성통신", "ဂြိုဟ်တု ဆက်သွယ်ရေး", "Communication", "위성통신을 연구합니다.", "I study satellite communication."],
  ["무선통신", "ကြိုးမဲ့ ဆက်သွယ်ရေး", "Communication", "무선통신을 전공합니다.", "I major in wireless communication."],
  ["모바일통신", "မိုဘိုင်း ဆက်သွယ်ရေး", "Communication", "모바일통신을 공부합니다.", "I study mobile communication."],
  ["초고속통신", "အလွန်မြန်သော ဆက်သွယ်ရေး", "Communication", "초고속통신을 연구합니다.", "I study ultra-fast communication."],
  
  // Advanced Education Technologies
  ["가상현실교육", "အတုအယောင် အမှန်တကယ် ပညာရေး", "Education", "가상현실교육을 연구합니다.", "I study VR education."],
  ["증강현실교육", "တိုးမြှင့်ထားသော အမှန်တကယ် ပညာရေး", "Education", "증강현실교육을 전공합니다.", "I major in AR education."],
  ["혼합현실교육", "ရောနှော အမှန်တကယ် ပညာရေး", "Education", "혼합현실교육을 공부합니다.", "I study mixed reality education."],
  ["인공지능교육", "လူလုပ်ဉာဏ်ရည် ပညာရေး", "Education", "인공지능교육을 전공합니다.", "I major in AI education."],
  ["빅데이터교육", "ကြီးမားသော ဒေတာ ပညာရေး", "Education", "빅데이터교육을 공부합니다.", "I study big data education."],
  ["블록체인교육", "ဘလော့ခ်ချိန်း ပညာရေး", "Education", "블록체인교육을 연구합니다.", "I study blockchain education."],
  ["클라우드교육", "ကလောက်ဒ် ပညာရေး", "Education", "클라우드교육을 전공합니다.", "I major in cloud education."],
  ["모바일교육", "မိုဘိုင်း ပညာရေး", "Education", "모바일교육을 공부합니다.", "I study mobile education."],
  ["웨어러블교육", "ဝတ်ဆင်နိုင်သော ပညာရေး", "Education", "웨어러블교육을 연구합니다.", "I study wearable education."],
  ["스마트교육", "စမတ် ပညာရေး", "Education", "스마트교육을 전공합니다.", "I major in smart education."],
  
  // Advanced Specialized Research Fields
  ["시스템생물학", "စနစ် ဇီဝဗေဒ", "Biology", "시스템생물학을 전공합니다.", "I major in systems biology."],
  ["합성생물학", "ပေါင်းစပ်မှု ဇီဝဗေဒ", "Biology", "합성생물학을 연구합니다.", "I study synthetic biology."],
  ["시스템의학", "စနစ် ဆေးပညာ", "Medical", "시스템의학을 공부합니다.", "I study systems medicine."],
  ["시스템약학", "စနစ် ဆေးဝါး", "Medical", "시스템약학을 전공합니다.", "I major in systems pharmacology."],
  ["시스템화학", "စနစ် ဓာတုဗေဒ", "Chemistry", "시스템화학을 연구합니다.", "I study systems chemistry."],
  ["시스템물리학", "စနစ် ရူပဗေဒ", "Physics", "시스템물리학을 공부합니다.", "I study systems physics."],
  ["시스템공학", "စနစ် အင်ဂျင်နီယာ", "Engineering", "시스템공학을 전공합니다.", "I major in systems engineering."],
  ["시스템경제학", "စနစ် စီးပွားရေး", "Economics", "시스템경제학을 연구합니다.", "I study systems economics."],
  ["시스템사회학", "စနစ် လူမှုရေး", "Social Science", "시스템사회학을 공부합니다.", "I study systems sociology."],
  ["시스템심리학", "စနစ် စိတ်ပညာ", "Psychology", "시스템심리학을 전공합니다.", "I major in systems psychology."],
  
  // Advanced Omics Sciences
  ["유전체학", "မျိုးရိုးဗီဇ", "Biology", "유전체학을 전공합니다.", "I major in genomics."],
  ["전사체학", "အကြောင်းအရာ", "Biology", "전사체학을 연구합니다.", "I study transcriptomics."],
  ["단백질체학", "ပရိုတိန်း", "Biology", "단백질체학을 공부합니다.", "I study proteomics."],
  ["대사체학", "ဇီဝကမ္မဗေဒ", "Biology", "대사체학을 전공합니다.", "I major in metabolomics."],
  ["지질체학", "အဆီ", "Biology", "지질체학을 연구합니다.", "I study lipidomics."],
  ["당단백질체학", "သကြား ပရိုတိန်း", "Biology", "당단백질체학을 공부합니다.", "I study glycomics."],
  ["면역체학", "ကိုယ်ခံအား", "Biology", "면역체학을 전공합니다.", "I major in immunomics."],
  ["약물체학", "ဆေးဝါး", "Biology", "약물체학을 연구합니다.", "I study pharmacogenomics."],
  ["독성체학", "အဆိပ်", "Biology", "독성체학을 공부합니다.", "I study toxicogenomics."],
  ["영양체학", "အာဟာရ", "Biology", "영양체학을 전공합니다.", "I major in nutrigenomics."],
  
  // Advanced Computational Methods
  ["시뮬레이션", "ပုံတူ", "Computer Science", "시뮬레이션을 수행합니다.", "I perform simulations."],
  ["모델링", "ပုံစံ", "Computer Science", "모델링을 연구합니다.", "I study modeling."],
  ["최적화", "အကောင်းဆုံး", "Computer Science", "최적화를 전공합니다.", "I major in optimization."],
  ["알고리즘설계", "အယ်လ်ဂိုရီသမ် ဒီဇိုင်း", "Computer Science", "알고리즘설계를 공부합니다.", "I study algorithm design."],
  ["자료구조설계", "ဒေတာ ဖွဲ့စည်းပုံ ဒီဇိုင်း", "Computer Science", "자료구조설계를 연구합니다.", "I study data structure design."],
  ["소프트웨어아키텍처", "ဆော့ဖ်ဝဲ ဗိသုကာ", "Computer Science", "소프트웨어아키텍처를 전공합니다.", "I major in software architecture."],
  ["시스템설계", "စနစ် ဒီဇိုင်း", "Computer Science", "시스템설계를 공부합니다.", "I study system design."],
  ["데이터베이스설계", "ဒေတာဘေ့စ် ဒီဇိုင်း", "Computer Science", "데이터베이스설계를 연구합니다.", "I study database design."],
  ["네트워크설계", "ကွန်ရက် ဒီဇိုင်း", "Computer Science", "네트워크설계를 전공합니다.", "I major in network design."],
  ["보안설계", "လုံခြုံရေး ဒီဇိုင်း", "Computer Science", "보안설계를 공부합니다.", "I study security design."],
  
  // Advanced Business Analytics
  ["비즈니스인텔리전스", "လုပ်ငန်း ဉာဏ်ရည်", "Business", "비즈니스인텔리전스를 구축합니다.", "I build business intelligence."],
  ["예측분석", "ခန့်မှန်း ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "예측분석을 연구합니다.", "I study predictive analytics."],
  ["고객분석", "ဖောက်သည် ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "고객분석을 실시합니다.", "I conduct customer analytics."],
  ["마케팅분석", "စျေးကွက်ရှာဖွေရေး ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "마케팅분석을 전공합니다.", "I major in marketing analytics."],
  ["재무분석", "ဘဏ္ဍာရေး ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "재무분석을 연구합니다.", "I study financial analysis."],
  ["운영분석", "လုပ်ငန်း ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "운영분석을 공부합니다.", "I study operations analytics."],
  ["의사결정분석", "ဆုံးဖြတ်ချက် ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "의사결정분석을 전공합니다.", "I major in decision analytics."],
  ["리스크분석", "အန္တရာယ် ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "리스크분석을 수행합니다.", "I perform risk analysis."],
  ["성과분석", "စွမ်းဆောင်ရည် ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "성과분석을 연구합니다.", "I study performance analytics."],
  ["경쟁분석", "ယှဉ်ပြိုင်မှု ခွဲခြမ်းစိတ်ဖြာမှု", "Business", "경쟁분석을 공부합니다.", "I study competitive analysis."],
  
  // Advanced Legal & Regulatory Technologies
  ["전자법률", "အီလက်ထရွန်နစ် ဥပဒေ", "Legal", "전자법률을 전공합니다.", "I major in electronic law."],
  ["디지털법률", "ဒစ်ဂျစ်တယ် ဥပဒေ", "Legal", "디지털법률을 공부합니다.", "I study digital law."],
  ["스마트계약", "စမတ် စာချုပ်", "Legal", "스마트계약을 연구합니다.", "I study smart contracts."],
  ["블록체인법률", "ဘလော့ခ်ချိန်း ဥပဒေ", "Legal", "블록체인법률을 전공합니다.", "I major in blockchain law."],
  ["인공지능법률", "လူလုပ်ဉာဏ်ရည် ဥပဒေ", "Legal", "인공지능법률을 공부합니다.", "I study AI law."],
  ["로봇법률", "ရိုဘော့ ဥပဒေ", "Legal", "로봇법률을 연구합니다.", "I study robot law."],
  ["자율주행법률", "ကိုယ်ပိုင် မောင်းနှင်မှု ဥပဒေ", "Legal", "자율주행법률을 전공합니다.", "I major in autonomous vehicle law."],
  ["드론법률", "ဒရုန်း ဥပဒေ", "Legal", "드론법률을 공부합니다.", "I study drone law."],
  ["3D프린팅법률", "3D ပုံနှိပ် ဥပဒေ", "Legal", "3D프린팅법률을 연구합니다.", "I study 3D printing law."],
  ["데이터법률", "ဒေတာ ဥပဒေ", "Legal", "데이터법률을 전공합니다.", "I major in data law."],
  
  // Advanced Environmental Technologies
  ["탄소포집", "ကာဗွန် ဖမ်းယူမှု", "Environment", "탄소포집을 연구합니다.", "I study carbon capture."],
  ["탄소저장", "ကာဗွန် သိုလှောင်မှု", "Environment", "탄소저장을 전공합니다.", "I major in carbon storage."],
  ["탄소활용", "ကာဗွန် အသုံးပြုမှု", "Environment", "탄소활용을 공부합니다.", "I study carbon utilization."],
  ["기후적응기술", "ရာသီဥတု အလိုက်သင့် နည်းပညာ", "Environment", "기후적응기술을 연구합니다.", "I study climate adaptation technology."],
  ["기후완화기술", "ရာသီဥတု လျော့ပါးစေမှု နည်းပညာ", "Environment", "기후완화기술을 전공합니다.", "I major in climate mitigation technology."],
  ["환경모니터링", "ပတ်ဝန်းကျင် စောင့်ကြည့်မှု", "Environment", "환경모니터링을 공부합니다.", "I study environmental monitoring."],
  ["대기질관리", "လေထု အရည်အသွေး စီမံခန့်ခွဲမှု", "Environment", "대기질관리를 연구합니다.", "I study air quality management."],
  ["수질관리", "ရေ အရည်အသွေး စီမံခန့်ခွဲမှု", "Environment", "수질관리를 전공합니다.", "I major in water quality management."],
  ["토양관리", "မြေဆီလွှာ စီမံခန့်ခွဲမှု", "Environment", "토양관리를 공부합니다.", "I study soil management."],
  ["폐기물관리", "အမှိုက် စီမံခန့်ခွဲမှု", "Environment", "폐기물관리를 연구합니다.", "I study waste management."],
  
  // Additional Advanced Specialized Terms
  ["나노포어", "နာနို အပေါက်", "Engineering", "나노포어를 연구합니다.", "I study nanopores."],
  ["나노캡슐", "နာနို ဆေးတောင့်", "Engineering", "나노캡슐을 개발합니다.", "I develop nanocapsules."],
  ["나노스피어", "နာနို လုံး", "Engineering", "나노스피어를 전공합니다.", "I major in nanospheres."],
  ["나노로드", "နာနို လမ်း", "Engineering", "나노로드를 연구합니다.", "I study nanorods."],
  ["나노플레이트", "နာနို ပြား", "Engineering", "나노플레이트를 공부합니다.", "I study nanoplates."],
  ["나노큐브", "နာနို အတုံး", "Engineering", "나노큐브를 전공합니다.", "I major in nanocubes."],
  ["나노스타", "နာနို ကြယ်", "Engineering", "나노스타를 연구합니다.", "I study nanostars."],
  ["나노링", "နာနို ကွင်း", "Engineering", "나노링을 공부합니다.", "I study nanorings."],
  ["나노헬릭스", "နာနို လိမ်ခွေ", "Engineering", "나노헬릭스를 전공합니다.", "I major in nanohelices."],
  ["나노프리즘", "နာနို ပရစ်စမ်", "Engineering", "나노프리즘을 연구합니다.", "I study nanoprisms."],
  
  // Advanced Quantum Phenomena
  ["양자중첩", "ကွမ်တမ် ထပ်ဆင့်မှု", "Physics", "양자중첩을 연구합니다.", "I study quantum superposition."],
  ["양자얽힘", "ကွမ်တမ် ရှုပ်ထွေးမှု", "Physics", "양자얽힘을 전공합니다.", "I major in quantum entanglement."],
  ["양자터널링", "ကွမ်တမ် တူးမြောင်း", "Physics", "양자터널링을 공부합니다.", "I study quantum tunneling."],
  ["양자간섭", "ကွမ်တမ် နှောင့်ယှက်မှု", "Physics", "양자간섭을 연구합니다.", "I study quantum interference."],
  ["양자측정", "ကွမ်တမ် တိုင်းတာမှု", "Physics", "양자측정을 전공합니다.", "I major in quantum measurement."],
  ["양자상태", "ကွမ်တမ် အခြေအနေ", "Physics", "양자상태를 공부합니다.", "I study quantum states."],
  ["양자비트", "ကွမ်တမ် ဘစ်", "Technology", "양자비트를 연구합니다.", "I study qubits."],
  ["양자게이트", "ကွမ်တမ် တံခါး", "Technology", "양자게이트를 전공합니다.", "I major in quantum gates."],
  ["양자회로", "ကွမ်တမ် ကွင်းဆက်", "Technology", "양자회로를 공부합니다.", "I study quantum circuits."],
  ["양자알고리즘", "ကွမ်တမ် အယ်လ်ဂိုရီသမ်", "Technology", "양자알고리즘을 연구합니다.", "I study quantum algorithms."],
  
  // Advanced Biotechnology Methods
  ["유전자편집", "မျိုးရိုးဗီဇ တည်းဖြတ်မှု", "Biology", "유전자편집을 연구합니다.", "I study gene editing."],
  ["크리스퍼", "ကရစ်စပါ", "Biology", "크리스퍼 기술을 전공합니다.", "I major in CRISPR technology."],
  ["유전자치료", "မျိုးရိုးဗီဇ ကုသမှု", "Biology", "유전자치료 연구를 합니다.", "I conduct gene therapy research."],
  ["세포치료", "ဆဲလ် ကုသမှု", "Biology", "세포치료를 공부합니다.", "I study cell therapy."],
  ["면역치료", "ကိုယ်ခံအား ကုသမှု", "Biology", "면역치료를 전공합니다.", "I major in immunotherapy."],
  ["줄기세포", "ပင်မဆဲလ်", "Biology", "줄기세포를 연구합니다.", "I study stem cells."],
  ["재생의학", "ပြန်လည်ထူထောင်ရေး ဆေးပညာ", "Biology", "재생의학을 공부합니다.", "I study regenerative medicine."],
  ["조직공학", "တစ်ရှူး အင်ဂျင်နီယာ", "Biology", "조직공학을 전공합니다.", "I major in tissue engineering."],
  ["장기배양", "အင်္ဂါ စိုက်ပျိုးမှု", "Biology", "장기배양을 연구합니다.", "I study organ cultivation."],
  ["인공장기", "လူလုပ် အင်္ဂါ", "Biology", "인공장기를 개발합니다.", "I develop artificial organs."],
  
  // Advanced Specialized Research Methods
  ["단일세포분석", "တစ်ခုတည်း ဆဲလ် ခွဲခြမ်းစိတ်ဖြာမှု", "Biology", "단일세포분석을 전공합니다.", "I major in single-cell analysis."],
  ["다중오믹스", "များစွာ အိုမစ်", "Biology", "다중오믹스를 연구합니다.", "I study multi-omics."],
  ["통합오믹스", "ပေါင်းစည်းမှု အိုမစ်", "Biology", "통합오믹스를 공부합니다.", "I study integrated omics."],
  ["시스템생물학", "စနစ် ဇီဝဗေဒ", "Biology", "시스템생물학을 전공합니다.", "I major in systems biology."],
  ["합성생물학", "ပေါင်းစပ်မှု ဇီဝဗေဒ", "Biology", "합성생물학을 연구합니다.", "I study synthetic biology."],
  ["계산생물학", "ကွန်ပျူတာ ဇီဝဗေဒ", "Biology", "계산생물학을 공부합니다.", "I study computational biology."],
  ["구조생물학", "ဖွဲ့စည်းပုံ ဇီဝဗေဒ", "Biology", "구조생물학을 전공합니다.", "I major in structural biology."],
  ["기능생물학", "လုပ်ဆောင်ချက် ဇီဝဗေဒ", "Biology", "기능생물학을 연구합니다.", "I study functional biology."],
  ["진화생물학", "ဆင့်ကဲဖြစ်စဉ် ဇီဝဗေဒ", "Biology", "진화생물학을 공부합니다.", "I study evolutionary biology."],
  ["발생생물학", "ဖွံ့ဖြိုးမှု ဇီဝဗေဒ", "Biology", "발생생물학을 전공합니다.", "I major in developmental biology."],
  
  // Advanced Materials Characterization
  ["나노특성화", "နာနို ထူးခြားမှု", "Engineering", "나노특성화를 연구합니다.", "I study nanocaracterization."],
  ["나노분석", "နာနို ခွဲခြမ်းစိတ်ဖြာမှု", "Engineering", "나노분석을 전공합니다.", "I major in nanoanalysis."],
  ["나노측정", "နာနို တိုင်းတာမှု", "Engineering", "나노측정을 공부합니다.", "I study nanomeasurement."],
  ["나노이미징", "နာနို ပုံရိပ်", "Engineering", "나노이미징을 연구합니다.", "I study nanoimaging."],
  ["나노스펙트로스코피", "နာနို စပက်ထရိုစကုပ်ပီ", "Engineering", "나노스펙트로스코피를 전공합니다.", "I major in nanospectroscopy."],
  ["나노현미경", "နာနို မိုက်ခရိုစကုပ်ပီ", "Engineering", "나노현미경을 공부합니다.", "I study nanomicroscopy."],
  ["나노분광학", "နာနို စပက်ထရိုစကုပ်ပီ", "Engineering", "나노분광학을 연구합니다.", "I study nanospectroscopy."],
  ["나노결정학", "နာနို ပုံဆောင်ခဲ", "Engineering", "나노결정학을 전공합니다.", "I major in nanocrystallography."],
  ["나노표면분석", "နာနို မျက်နှာပြင် ခွဲခြမ်းစိတ်ဖြာမှု", "Engineering", "나노표면분석을 공부합니다.", "I study nanosurface analysis."],
  ["나노구조분석", "နာနို ဖွဲ့စည်းပုံ ခွဲခြမ်းစိတ်ဖြာမှု", "Engineering", "나노구조분석을 연구합니다.", "I study nanostructure analysis."],
  
  // Final Additional Terms
  ["나노바이오센서", "နာနို ဇီဝ အာရုံခံကိရိယာ", "Technology", "나노바이오센서를 개발합니다.", "I develop nanobiosensors."],
  ["바이오나노센서", "ဇီဝ နာနို အာရုံခံကိရိယာ", "Technology", "바이오나노센서를 연구합니다.", "I study bionanosensors."],
  ["양자나노센서", "ကွမ်တမ် နာနို အာရုံခံကိရိယာ", "Technology", "양자나노센서를 전공합니다.", "I major in quantum nanosensors."],
  ["양자바이오센서", "ကွမ်တမ် ဇီဝ အာရုံခံကိရိယာ", "Technology", "양자바이오센서를 공부합니다.", "I study quantum biosensors."],
  ["나노바이오이미징", "နာနို ဇီဝ ပုံရိပ်", "Technology", "나노바이오이미징을 연구합니다.", "I study nanobioimaging."],
  ["바이오나노이미징", "ဇီဝ နာနို ပုံရိပ်", "Technology", "바이오나노이미징을 전공합니다.", "I major in bionanoimaging."],
  ["양자나노이미징", "ကွမ်တမ် နာနို ပုံရိပ်", "Technology", "양자나노이미징을 공부합니다.", "I study quantum nanoimaging."],
  ["양자바이오이미징", "ကွမ်တမ် ဇီဝ ပုံရိပ်", "Technology", "양자바이오이미징을 연구합니다.", "I study quantum bioimaging."],
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

