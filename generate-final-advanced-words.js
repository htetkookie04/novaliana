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
  // Advanced Interdisciplinary & Emerging Sciences
  ["나노바이오기술", "နာနို ဇီဝ နည်းပညာ", "Science", "나노바이오기술을 연구합니다.", "I study nanobiotechnology."],
  ["바이오나노기술", "ဇီဝ နာနို နည်းပညာ", "Science", "바이오나노기술을 전공합니다.", "I major in bionanotechnology."],
  ["나노의학", "နာနို ဆေးပညာ", "Science", "나노의학 기술을 개발합니다.", "We develop nanomedicine technology."],
  ["나노바이오의학", "နာနို ဇီဝ ဆေးပညာ", "Science", "나노바이오의학을 연구합니다.", "I study nanobiomedicine."],
  ["바이오나노의학", "ဇီဝ နာနို ဆေးပညာ", "Science", "바이오나노의학을 공부합니다.", "I study bionanomedicine."],
  ["나노생명공학", "နာနို ဇီဝနည်းပညာ", "Science", "나노생명공학을 전공합니다.", "I major in nanobiotechnology."],
  ["바이오나노과학", "ဇီဝ နာနို သိပ္ပံ", "Science", "바이오나노과학을 연구합니다.", "I study bionanoscience."],
  ["나노바이오과학", "နာနို ဇီဝ သိပ္ပံ", "Science", "나노바이오과학을 공부합니다.", "I study nanobioscience."],
  ["나노바이오물리학", "နာနို ဇီဝ ရူပဗေဒ", "Science", "나노바이오물리학을 전공합니다.", "I major in nanobiophysics."],
  ["바이오나노물리학", "ဇီဝ နာနို ရူပဗေဒ", "Science", "바이오나노물리학을 연구합니다.", "I study bionanophysics."],
  
  // Advanced Quantum & Emerging Technologies
  ["양자나노과학", "ကွမ်တမ် နာနို သိပ္ပံ", "Science", "양자나노과학을 연구합니다.", "I study quantum nanoscience."],
  ["양자바이오물리학", "ကွမ်တမ် ဇီဝ ရူပဗေဒ", "Science", "양자바이오물리학을 전공합니다.", "I major in quantum biophysics."],
  ["양자나노기술", "ကွမ်တမ် နာနို နည်းပညာ", "Technology", "양자나노기술을 개발합니다.", "I develop quantum nanotechnology."],
  ["양자바이오기술", "ကွမ်တမ် ဇီဝ နည်းပညာ", "Technology", "양자바이오기술을 연구합니다.", "I study quantum biotechnology."],
  ["양자나노의학", "ကွမ်တမ် နာနို ဆေးပညာ", "Medical", "양자나노의학을 공부합니다.", "I study quantum nanomedicine."],
  ["양자바이오의학", "ကွမ်တမ် ဇီဝ ဆေးပညာ", "Medical", "양자바이오의학을 전공합니다.", "I major in quantum biomedicine."],
  ["양자나노전자", "ကွမ်တမ် နာနို အီလက်ထရွန်", "Technology", "양자나노전자를 연구합니다.", "I study quantum nanoelectronics."],
  ["양자바이오전자", "ကွမ်တမ် ဇီဝ အီလက်ထရွန်", "Technology", "양자바이오전자를 공부합니다.", "I study quantum bioelectronics."],
  ["양자나노소재", "ကွမ်တမ် နာနို ပစ္စည်း", "Engineering", "양자나노소재를 전공합니다.", "I major in quantum nanomaterials."],
  ["양자바이오소재", "ကွမ်တမ် ဇီဝ ပစ္စည်း", "Engineering", "양자바이오소재를 연구합니다.", "I study quantum biomaterials."],
  
  // Advanced Medical & Health Technologies
  ["텔레의료", "အကွာအဝေး ဆေးကုသမှု", "Medical", "텔레의료를 연구합니다.", "I study telemedicine."],
  ["원격의료", "အကွာအဝေး ဆေးကုသမှု", "Medical", "원격의료를 전공합니다.", "I major in remote medicine."],
  ["디지털의료", "ဒစ်ဂျစ်တယ် ဆေးပညာ", "Medical", "디지털의료를 공부합니다.", "I study digital medicine."],
  ["스마트의료", "စမတ် ဆေးပညာ", "Medical", "스마트의료를 연구합니다.", "I study smart healthcare."],
  ["모바일의료", "မိုဘိုင်း ဆေးပညာ", "Medical", "모바일의료를 전공합니다.", "I major in mobile medicine."],
  ["웨어러블의료", "ဝတ်ဆင်နိုင်သော ဆေးပညာ", "Medical", "웨어러블의료를 공부합니다.", "I study wearable medicine."],
  ["인공지능의료", "လူလုပ်ဉာဏ်ရည် ဆေးပညာ", "Medical", "인공지능의료를 연구합니다.", "I study AI medicine."],
  ["빅데이터의료", "ကြီးမားသော ဒေတာ ဆေးပညာ", "Medical", "빅데이터의료를 전공합니다.", "I major in big data medicine."],
  ["클라우드의료", "ကလောက်ဒ် ဆေးပညာ", "Medical", "클라우드의료를 공부합니다.", "I study cloud medicine."],
  ["블록체인의료", "ဘလော့ခ်ချိန်း ဆေးပညာ", "Medical", "블록체인의료를 연구합니다.", "I study blockchain medicine."],
  
  // Advanced Communication & Media Technologies
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
  
  // Advanced Education & Learning Technologies
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
  
  // Advanced Agriculture & Food Technologies
  ["스마트농업", "စမတ် စိုက်ပျိုးရေး", "Agriculture", "스마트농업을 연구합니다.", "I study smart agriculture."],
  ["디지털농업", "ဒစ်ဂျစ်တယ် စိုက်ပျိုးရေး", "Agriculture", "디지털농업을 전공합니다.", "I major in digital agriculture."],
  ["정밀농업", "တိကျသော စိုက်ပျိုးရေး", "Agriculture", "정밀농업을 공부합니다.", "I study precision agriculture."],
  ["수직농업", "ဒေါင်လိုက် စိုက်ပျိုးရေး", "Agriculture", "수직농업을 연구합니다.", "I study vertical farming."],
  ["유기농업", "အော်ဂဲနစ် စိုက်ပျိုးရေး", "Agriculture", "유기농업을 전공합니다.", "I major in organic farming."],
  ["지속가능농업", "ရေရှည်တည်တံ့သော စိုက်ပျိုးရေး", "Agriculture", "지속가능농업을 공부합니다.", "I study sustainable agriculture."],
  ["농업로봇", "စိုက်ပျိုးရေး ရိုဘော့", "Agriculture", "농업로봇을 개발합니다.", "I develop agricultural robots."],
  ["농업IoT", "စိုက်ပျိုးရေး အင်တာနက် အရာဝတ္ထု", "Agriculture", "농업IoT를 연구합니다.", "I study agricultural IoT."],
  ["스마트축산", "စမတ် မွေးမြူရေး", "Agriculture", "스마트축산을 전공합니다.", "I major in smart livestock farming."],
  ["수자원관리", "ရေ အရင်းအမြစ် စီမံခန့်ခွဲမှု", "Agriculture", "수자원관리를 연구합니다.", "I study water resource management."],
  
  // Advanced Architecture & Smart Cities
  ["스마트시티", "စမတ် မြို့", "Architecture", "스마트시티를 계획합니다.", "I plan smart cities."],
  ["디지털시티", "ဒစ်ဂျစ်တယ် မြို့", "Architecture", "디지털시티를 설계합니다.", "I design digital cities."],
  ["그린시티", "အစိမ်းရောင် မြို့", "Architecture", "그린시티를 연구합니다.", "I study green cities."],
  ["에코시티", "ဂေဟစနစ် မြို့", "Architecture", "에코시티를 전공합니다.", "I major in eco-cities."],
  ["컴팩트시티", "ကျစ်လစ်သော မြို့", "Architecture", "컴팩트시티를 설계합니다.", "I design compact cities."],
  ["저탄소시티", "နိမ့်သော ကာဗွန် မြို့", "Architecture", "저탄소시티를 연구합니다.", "I study low-carbon cities."],
  ["회복력시티", "ပြန်လည်ထူထောင်နိုင်စွမ်း မြို့", "Architecture", "회복력시티를 공부합니다.", "I study resilient cities."],
  ["스마트인프라", "စမတ် အခြေခံအဆောက်အဦ", "Architecture", "스마트인프라를 구축합니다.", "I build smart infrastructure."],
  ["디지털인프라", "ဒစ်ဂျစ်တယ် အခြေခံအဆောက်အဦ", "Architecture", "디지털인프라를 전공합니다.", "I major in digital infrastructure."],
  ["그린인프라", "အစိမ်းရောင် အခြေခံအဆောက်အဦ", "Architecture", "그린인프라를 연구합니다.", "I study green infrastructure."],
  
  // Advanced Sports & Exercise Technologies
  ["스포츠과학", "အားကစား သိပ္ပံ", "Sports", "스포츠과학을 전공합니다.", "I major in sports science."],
  ["스포츠의학", "အားကစား ဆေးပညာ", "Sports", "스포츠의학을 연구합니다.", "I study sports medicine."],
  ["스포츠공학", "အားကစား အင်ဂျင်နီယာ", "Sports", "스포츠공학을 공부합니다.", "I study sports engineering."],
  ["스포츠기술", "အားကစား နည်းပညာ", "Sports", "스포츠기술을 전공합니다.", "I major in sports technology."],
  ["스포츠분석", "အားကစား ခွဲခြမ်းစိတ်ဖြာမှု", "Sports", "스포츠분석을 연구합니다.", "I study sports analytics."],
  ["스포츠데이터", "အားကစား ဒေတာ", "Sports", "스포츠데이터를 공부합니다.", "I study sports data."],
  ["스포츠인공지능", "အားကစား လူလုပ်ဉာဏ်ရည်", "Sports", "스포츠인공지능을 전공합니다.", "I major in sports AI."],
  ["스포츠빅데이터", "အားကစား ကြီးမားသော ဒေတာ", "Sports", "스포츠빅데이터를 연구합니다.", "I study sports big data."],
  ["스포츠웨어러블", "အားကစား ဝတ်ဆင်နိုင်သော", "Sports", "스포츠웨어러블을 공부합니다.", "I study sports wearables."],
  ["스포츠가상현실", "အားကစား အတုအယောင် အမှန်တကယ်", "Sports", "스포츠가상현실을 전공합니다.", "I major in sports VR."],
  
  // Advanced Business & Management Technologies
  ["디지털경영", "ဒစ်ဂျစ်တယ် စီမံခန့်ခွဲမှု", "Business", "디지털경영을 도입합니다.", "We introduce digital management."],
  ["스마트경영", "စမတ် စီမံခန့်ခွဲမှု", "Business", "스마트경영을 연구합니다.", "I study smart management."],
  ["데이터경영", "ဒေတာ စီမံခန့်ခွဲမှု", "Business", "데이터경영을 전공합니다.", "I major in data management."],
  ["인공지능경영", "လူလုပ်ဉာဏ်ရည် စီမံခန့်ခွဲမှု", "Business", "인공지능경영을 공부합니다.", "I study AI management."],
  ["블록체인경영", "ဘလော့ခ်ချိန်း စီမံခန့်ခွဲမှု", "Business", "블록체인경영을 연구합니다.", "I study blockchain management."],
  ["클라우드경영", "ကလောက်ဒ် စီမံခန့်ခွဲမှု", "Business", "클라우드경영을 전공합니다.", "I major in cloud management."],
  ["모바일경영", "မိုဘိုင်း စီမံခန့်ခွဲမှု", "Business", "모바일경영을 공부합니다.", "I study mobile management."],
  ["웨어러블경영", "ဝတ်ဆင်နိုင်သော စီမံခန့်ခွဲမှု", "Business", "웨어러블경영을 연구합니다.", "I study wearable management."],
  ["사물인터넷경영", "အင်တာနက် အရာဝတ္ထု စီမံခန့်ခွဲမှု", "Business", "사물인터넷경영을 전공합니다.", "I major in IoT management."],
  ["빅데이터경영", "ကြီးမားသော ဒေတာ စီမံခန့်ခွဲမှု", "Business", "빅데이터경영을 공부합니다.", "I study big data management."],
  
  // Advanced Legal & Regulatory Technologies
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
  
  // Additional Advanced Interdisciplinary Terms
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
  ["나노바이오치료", "နာနို ဇီဝ ကုသမှု", "Medical", "나노바이오치료를 연구합니다.", "I study nanobiotherapy."],
  ["바이오나노치료", "ဇီဝ နာနို ကုသမှု", "Medical", "바이오나노치료를 전공합니다.", "I major in bionanotherapy."],
  ["양자나노치료", "ကွမ်တမ် နာနို ကုသမှု", "Medical", "양자나노치료를 공부합니다.", "I study quantum nanotherapy."],
  ["양자바이오치료", "ကွမ်တမ် ဇီဝ ကုသမှု", "Medical", "양자바이오치료를 연구합니다.", "I study quantum biotherapy."],
  ["나노바이오진단", "နာနို ဇီဝ ရောဂါရှာဖွေမှု", "Medical", "나노바이오진단을 전공합니다.", "I major in nanobiodiagnostics."],
  ["바이오나노진단", "ဇီဝ နာနို ရောဂါရှာဖွေမှု", "Medical", "바이오나노진단을 공부합니다.", "I study bionanodiagnostics."],
  ["양자나노진단", "ကွမ်တမ် နာနို ရောဂါရှာဖွေမှု", "Medical", "양자나노진단을 연구합니다.", "I study quantum nanodiagnostics."],
  ["양자바이오진단", "ကွမ်တမ် ဇီဝ ရောဂါရှာဖွေမှု", "Medical", "양자바이오진단을 전공합니다.", "I major in quantum biodiagnostics."],
  
  // Final Additional Terms
  ["나노바이오약물전달", "နာနို ဇီဝ ဆေးဝါး ပို့ဆောင်မှု", "Medical", "나노바이오약물전달을 연구합니다.", "I study nanobio drug delivery."],
  ["바이오나노약물전달", "ဇီဝ နာနို ဆေးဝါး ပို့ဆောင်မှု", "Medical", "바이오나노약물전달을 전공합니다.", "I major in bionano drug delivery."],
  ["양자나노약물전달", "ကွမ်တမ် နာနို ဆေးဝါး ပို့ဆောင်မှု", "Medical", "양자나노약물전달을 공부합니다.", "I study quantum nano drug delivery."],
  ["양자바이오약물전달", "ကွမ်တမ် ဇီဝ ဆေးဝါး ပို့ဆောင်မှု", "Medical", "양자바이오약물전달을 연구합니다.", "I study quantum bio drug delivery."],
  ["나노바이오의료기기", "နာနို ဇီဝ ဆေးပညာ ကိရိယာ", "Medical", "나노바이오의료기기를 개발합니다.", "I develop nanobio medical devices."],
  ["바이오나노의료기기", "ဇီဝ နာနို ဆေးပညာ ကိရိယာ", "Medical", "바이오나노의료기기를 전공합니다.", "I major in bionano medical devices."],
  ["양자나노의료기기", "ကွမ်တမ် နာနို ဆေးပညာ ကိရိယာ", "Medical", "양자나노의료기기를 공부합니다.", "I study quantum nano medical devices."],
  ["양자바이오의료기기", "ကွမ်တမ် ဇီဝ ဆေးပညာ ကိရိယာ", "Medical", "양자바이오의료기기를 연구합니다.", "I study quantum bio medical devices."],
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

