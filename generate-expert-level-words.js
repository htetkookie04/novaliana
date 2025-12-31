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
  // Advanced Specialized Research Methodologies
  ["단일세포유전체학", "တစ်ခုတည်း ဆဲလ် မျိုးရိုးဗီဇ", "Biology", "단일세포유전체학을 전공합니다.", "I major in single-cell genomics."],
  ["단일세포전사체학", "တစ်ခုတည်း ဆဲလ် အကြောင်းအရာ", "Biology", "단일세포전사체학을 연구합니다.", "I study single-cell transcriptomics."],
  ["단일세포단백질체학", "တစ်ခုတည်း ဆဲလ် ပရိုတိန်း", "Biology", "단일세포단백질체학을 공부합니다.", "I study single-cell proteomics."],
  ["단일세포대사체학", "တစ်ခုတည်း ဆဲလ် ဇီဝကမ္မဗေဒ", "Biology", "단일세포대사체학을 전공합니다.", "I major in single-cell metabolomics."],
  ["단일세포면역학", "တစ်ခုတည်း ဆဲလ် ကိုယ်ခံအား", "Biology", "단일세포면역학을 연구합니다.", "I study single-cell immunology."],
  ["단일세포생물학", "တစ်ခုတည်း ဆဲလ် ဇီဝဗေဒ", "Biology", "단일세포생물학을 공부합니다.", "I study single-cell biology."],
  ["단일세포분석", "တစ်ခုတည်း ဆဲလ် ခွဲခြမ်းစိတ်ဖြာမှု", "Biology", "단일세포분석을 전공합니다.", "I major in single-cell analysis."],
  ["단일세포시퀀싱", "တစ်ခုတည်း ဆဲလ် အစဉ်", "Biology", "단일세포시퀀싱을 연구합니다.", "I study single-cell sequencing."],
  ["단일세포이미징", "တစ်ခုတည်း ဆဲလ် ပုံရိပ်", "Biology", "단일세포이미징을 공부합니다.", "I study single-cell imaging."],
  ["단일세포유전학", "တစ်ခုတည်း ဆဲလ် မျိုးရိုးဗီဇ", "Biology", "단일세포유전학을 전공합니다.", "I major in single-cell genetics."],
  
  // Advanced Computational & Simulation Methods
  ["분자동역학", "မော်လီကျူး လှုပ်ရှားမှု", "Computer Science", "분자동역학을 연구합니다.", "I study molecular dynamics."],
  ["양자동역학", "ကွမ်တမ် လှုပ်ရှားမှု", "Computer Science", "양자동역학을 전공합니다.", "I major in quantum dynamics."],
  ["전산화학", "ကွန်ပျူတာ ဓာတုဗေဒ", "Computer Science", "전산화학을 공부합니다.", "I study computational chemistry."],
  ["전산물리학", "ကွန်ပျူတာ ရူပဗေဒ", "Computer Science", "전산물리학을 연구합니다.", "I study computational physics."],
  ["전산수학", "ကွန်ပျူတာ သင်္ချာ", "Computer Science", "전산수학을 전공합니다.", "I major in computational mathematics."],
  ["전산공학", "ကွန်ပျူတာ အင်ဂျင်နီယာ", "Computer Science", "전산공학을 공부합니다.", "I study computational engineering."],
  ["전산의학", "ကွန်ပျူတာ ဆေးပညာ", "Computer Science", "전산의학을 연구합니다.", "I study computational medicine."],
  ["전산재료과학", "ကွန်ပျူတာ ပစ္စည်း သိပ္ပံ", "Computer Science", "전산재료과학을 전공합니다.", "I major in computational materials science."],
  ["전산유체역학", "ကွန်ပျူတာ အရည် စွမ်းအား", "Computer Science", "전산유체역학을 공부합니다.", "I study computational fluid dynamics."],
  ["전산구조역학", "ကွန်ပျူတာ ဖွဲ့စည်းပုံ စွမ်းအား", "Computer Science", "전산구조역학을 연구합니다.", "I study computational structural mechanics."],
  
  // Advanced Specialized Technologies
  ["나노바이오기술", "နာနို ဇီဝ နည်းပညာ", "Technology", "나노바이오기술을 연구합니다.", "I study nanobiotechnology."],
  ["바이오나노기술", "ဇီဝ နာနို နည်းပညာ", "Technology", "바이오나노기술을 전공합니다.", "I major in bionanotechnology."],
  ["나노바이오과학", "နာနို ဇီဝ သိပ္ပံ", "Science", "나노바이오과학을 공부합니다.", "I study nanobioscience."],
  ["바이오나노과학", "ဇီဝ နာနို သိပ္ပံ", "Science", "바이오나노과학을 연구합니다.", "I study bionanoscience."],
  ["나노바이오물리학", "နာနို ဇီဝ ရူပဗေဒ", "Science", "나노바이오물리학을 전공합니다.", "I major in nanobiophysics."],
  ["바이오나노물리학", "ဇီဝ နာနို ရူပဗေဒ", "Science", "바이오나노물리학을 공부합니다.", "I study bionanophysics."],
  ["나노바이오화학", "နာနို ဇီဝ ဓာတုဗေဒ", "Science", "나노바이오화학을 연구합니다.", "I study nanobiochemistry."],
  ["바이오나노화학", "ဇီဝ နာနို ဓာတုဗေဒ", "Science", "바이오나노화학을 전공합니다.", "I major in bionanochemistry."],
  ["나노바이오의학", "နာနို ဇီဝ ဆေးပညာ", "Medical", "나노바이오의학을 공부합니다.", "I study nanobiomedicine."],
  ["바이오나노의학", "ဇီဝ နာနို ဆေးပညာ", "Medical", "바이오나노의학을 연구합니다.", "I study bionanomedicine."],
  
  // Advanced Interdisciplinary Research Fields
  ["시스템생물학", "စနစ် ဇီဝဗေဒ", "Biology", "시스템생물학을 전공합니다.", "I major in systems biology."],
  ["합성생물학", "ပေါင်းစပ်မှု ဇီဝဗေဒ", "Biology", "합성생물학을 연구합니다.", "I study synthetic biology."],
  ["계산생물학", "ကွန်ပျူတာ ဇီဝဗေဒ", "Biology", "계산생물학을 공부합니다.", "I study computational biology."],
  ["구조생물학", "ဖွဲ့စည်းပုံ ဇီဝဗေဒ", "Biology", "구조생물학을 전공합니다.", "I major in structural biology."],
  ["기능생물학", "လုပ်ဆောင်ချက် ဇီဝဗေဒ", "Biology", "기능생물학을 연구합니다.", "I study functional biology."],
  ["진화생물학", "ဆင့်ကဲဖြစ်စဉ် ဇီဝဗေဒ", "Biology", "진화생물학을 공부합니다.", "I study evolutionary biology."],
  ["발생생물학", "ဖွံ့ဖြိုးမှု ဇီဝဗေဒ", "Biology", "발생생물학을 전공합니다.", "I major in developmental biology."],
  ["세포생물학", "ဆဲလ် ဇီဝဗေဒ", "Biology", "세포생물학을 연구합니다.", "I study cell biology."],
  ["분자생물학", "မော်လီကျူး ဇီဝဗေဒ", "Biology", "분자생물학을 공부합니다.", "I study molecular biology."],
  ["유전학", "မျိုးရိုးဗီဇ", "Biology", "유전학을 전공합니다.", "I major in genetics."],
  
  // Advanced Materials Science & Engineering
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
  
  // Advanced Quantum Sciences & Technologies
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
  
  // Advanced Nanotechnology Structures
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
  
  // Advanced Systems Sciences
  ["시스템의학", "စနစ် ဆေးပညာ", "Medical", "시스템의학을 연구합니다.", "I study systems medicine."],
  ["시스템약학", "စနစ် ဆေးဝါး", "Medical", "시스템약학을 전공합니다.", "I major in systems pharmacology."],
  ["시스템화학", "စနစ် ဓာတုဗေဒ", "Chemistry", "시스템화학을 공부합니다.", "I study systems chemistry."],
  ["시스템물리학", "စနစ် ရူပဗေဒ", "Physics", "시스템물리학을 연구합니다.", "I study systems physics."],
  ["시스템공학", "စနစ် အင်ဂျင်နီယာ", "Engineering", "시스템공학을 전공합니다.", "I major in systems engineering."],
  ["시스템경제학", "စနစ် စီးပွားရေး", "Economics", "시스템경제학을 공부합니다.", "I study systems economics."],
  ["시스템사회학", "စနစ် လူမှုရေး", "Social Science", "시스템사회학을 연구합니다.", "I study systems sociology."],
  ["시스템심리학", "စနစ် စိတ်ပညာ", "Psychology", "시스템심리학을 전공합니다.", "I major in systems psychology."],
  ["시스템생태학", "စနစ် ဂေဟစနစ်", "Science", "시스템생태학을 공부합니다.", "I study systems ecology."],
  ["시스템정보학", "စနစ် သတင်းအချက်အလက်", "Science", "시스템정보학을 연구합니다.", "I study systems informatics."],
  
  // Advanced Specialized Medical & Health Sciences
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
  
  // Advanced Interdisciplinary Informatics
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

