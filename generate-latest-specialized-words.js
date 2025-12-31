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
  // Advanced Specialized Surface Treatment
  ["플라즈마보로나이징", "ပလာစမာ ဘိုရွန် ထည့်သွင်းမှု", "Engineering", "플라즈마보로나이징을 전공합니다.", "I major in plasma boriding."],
  ["플라즈마실리코나이징", "ပလာစမာ ဆီလီကွန် ထည့်သွင်းမှု", "Engineering", "플라즈마실리코나이징을 공부합니다.", "I study plasma siliconizing."],
  ["플라즈마알루미나이징", "ပလာစမာ အလူမီနီယမ် ထည့်သွင်းမှု", "Engineering", "플라즈마알루미나이징을 연구합니다.", "I study plasma aluminizing."],
  ["플라즈마크로마이징", "ပလာစမာ ခရိုမီယမ် ထည့်သွင်းမှု", "Engineering", "플라즈마크로마이징을 전공합니다.", "I major in plasma chromizing."],
  ["플라즈마바나다이징", "ပလာစမာ ဗာနာဒီယမ် ထည့်သွင်းမှု", "Engineering", "플라즈마바나다이징을 공부합니다.", "I study plasma vanadizing."],
  ["플라즈마티타나이징", "ပလာစမာ တိုက်တာနီယမ် ထည့်သွင်းမှု", "Engineering", "플라즈마티타나이징을 연구합니다.", "I study plasma titanizing."],
  ["플라즈마지르코나이징", "ပလာစမာ ဇာကွန်နီယမ် ထည့်သွင်းမှု", "Engineering", "플라즈마지르코나이징을 전공합니다.", "I major in plasma zirconizing."],
  ["플라즈마니오브이징", "ပလာစမာ နီအိုဘီယမ် ထည့်သွင်းမှု", "Engineering", "플라즈마니오브이징을 공부합니다.", "I study plasma niobizing."],
  ["플라즈마탄탈라이징", "ပလာစမာ တန်တာလမ် ထည့်သွင်းမှု", "Engineering", "플라즈마탄탈라이징을 연구합니다.", "I study plasma tantalizing."],
  ["플라즈마몰리브덴이징", "ပလာစမာ မိုလစ်ဒီနမ် ထည့်သွင်းမှု", "Engineering", "플라즈마몰리브덴이징을 전공합니다.", "I major in plasma molybdenizing."],
  
  // Advanced Ion Beam Techniques
  ["이온주입", "အိုင်ယွန် ထိုးသွင်းမှု", "Engineering", "이온주입을 수행합니다.", "I perform ion implantation."],
  ["이온주입도핑", "အိုင်ယွန် ထိုးသွင်းမှု ထည့်သွင်းမှု", "Engineering", "이온주입도핑을 연구합니다.", "I study ion implantation doping."],
  ["이온빔가공", "အိုင်ယွန် ရောင်ခြည် လုပ်ဆောင်မှု", "Engineering", "이온빔가공을 전공합니다.", "I major in ion beam processing."],
  ["이온빔에칭", "အိုင်ယွန် ရောင်ခြည် ထွင်းထုမှု", "Engineering", "이온빔에칭을 공부합니다.", "I study ion beam etching."],
  ["이온빔밀링", "အိုင်ယွန် ရောင်ခြည် ကြိတ်ချေမှု", "Engineering", "이온빔밀링을 연구합니다.", "I study ion beam milling."],
  ["이온빔리소그래피", "အိုင်ယွန် ရောင်ခြည် ပုံနှိပ်", "Engineering", "이온빔리소그래피를 전공합니다.", "I major in ion beam lithography."],
  ["이온빔표면처리", "အိုင်ယွန် ရောင်ခြည် မျက်နှာပြင် လုပ်ဆောင်မှု", "Engineering", "이온빔표면처리를 공부합니다.", "I study ion beam surface treatment."],
  ["이온빔박리", "အိုင်ယွန် ရောင်ခြည် ခွာထုတ်မှု", "Engineering", "이온빔박리를 연구합니다.", "I study ion beam sputtering."],
  ["이온빔정제", "အိုင်ယွန် ရောင်ခြည် သန့်စင်မှု", "Engineering", "이온빔정제를 전공합니다.", "I major in ion beam purification."],
  ["이온빔분석", "အိုင်ယွန် ရောင်ခြည် ခွဲခြမ်းစိတ်ဖြာမှု", "Engineering", "이온빔분석을 공부합니다.", "I study ion beam analysis."],
  
  // Advanced Coating Techniques
  ["스퍼터코팅", "ဖြန်းဆေးထည့်သွင်းမှု ဖုံးအုပ်မှု", "Engineering", "스퍼터코팅을 수행합니다.", "I perform sputter coating."],
  ["증착코팅", "အလွှာထည့်သွင်းမှု ဖုံးအုပ်မှု", "Engineering", "증착코팅을 연구합니다.", "I study deposition coating."],
  ["플라즈마코팅", "ပလာစမာ ဖုံးအုပ်မှု", "Engineering", "플라즈마코팅을 전공합니다.", "I major in plasma coating."],
  ["레이저코팅", "လေဆာ ဖုံးအုပ်မှု", "Engineering", "레이저코팅을 공부합니다.", "I study laser coating."],
  ["전기도금코팅", "လျှပ်စစ် သတ္တုဖုံးအုပ်မှု ဖုံးအုပ်မှု", "Engineering", "전기도금코팅을 연구합니다.", "I study electroplating coating."],
  ["무전해도금", "လျှပ်စစ်မဲ့ သတ္တုဖုံးအုပ်မှု", "Engineering", "무전해도금을 전공합니다.", "I major in electroless plating."],
  ["화학도금", "ဓာတုဗေဒ သတ္တုဖုံးအုပ်မှု", "Engineering", "화학도금을 공부합니다.", "I study chemical plating."],
  ["열분해코팅", "အပူ ခွဲခြမ်းစိတ်ဖြာမှု ဖုံးအုပ်မှု", "Engineering", "열분해코팅을 연구합니다.", "I study pyrolysis coating."],
  ["용융코팅", "အရည်ပျော်မှု ဖုံးအုပ်မှု", "Engineering", "용융코팅을 전공합니다.", "I major in molten coating."],
  ["분무코팅", "ဖြန်းဆေးထည့်သွင်းမှု ဖုံးအုပ်မှု", "Engineering", "분무코팅을 공부합니다.", "I study spray coating."],
  
  // Advanced Joining Techniques
  ["마찰교반용접", "ပွတ်တိုက်မှု ရောနှောမှု ပေါင်းစပ်မှု", "Engineering", "마찰교반용접을 수행합니다.", "I perform friction stir welding."],
  ["전자빔용접", "အီလက်ထရွန် ရောင်ခြည် ပေါင်းစပ်မှု", "Engineering", "전자빔용접을 연구합니다.", "I study electron beam welding."],
  ["플라즈마용접", "ပလာစမာ ပေါင်းစပ်မှု", "Engineering", "플라즈마용접을 전공합니다.", "I major in plasma welding."],
  ["저항용접", "ခုခံမှု ပေါင်းစပ်မှု", "Engineering", "저항용접을 공부합니다.", "I study resistance welding."],
  ["아크용접", "အာ့ခ် ပေါင်းစပ်မှု", "Engineering", "아크용접을 연구합니다.", "I study arc welding."],
  ["가스용접", "ဓာတ်ငွေ့ ပေါင်းစပ်မှု", "Engineering", "가스용접을 전공합니다.", "I major in gas welding."],
  ["티그용접", "TIG ပေါင်းစပ်မှု", "Engineering", "티그용접을 공부합니다.", "I study TIG welding."],
  ["미그용접", "MIG ပေါင်းစပ်မှု", "Engineering", "미그용접을 연구합니다.", "I study MIG welding."],
  ["서브머지드아크용접", "မြုပ်နေသော အာ့ခ် ပေါင်းစပ်မှု", "Engineering", "서브머지드아크용접을 전공합니다.", "I major in submerged arc welding."],
  ["플럭스코어드아크용접", "ဖလပ်စ် အာ့ခ် ပေါင်းစပ်မှု", "Engineering", "플럭스코어드아크용접을 공부합니다.", "I study flux-cored arc welding."],
  
  // Advanced Heat Treatment
  ["담금질", "အေးစေမှု", "Engineering", "담금질을 수행합니다.", "I perform quenching."],
  ["풀림", "ပြန်လည်ထူထောင်ရေး", "Engineering", "풀림을 연구합니다.", "I study annealing."],
  ["시효처리", "အချိန်ကုန်လွန်မှု လုပ်ဆောင်မှု", "Engineering", "시효처리를 전공합니다.", "I major in aging treatment."],
  ["담금질시효", "အေးစေမှု အချိန်ကုန်လွန်မှု", "Engineering", "담금질시효를 공부합니다.", "I study quench aging."],
  ["인공시효", "လူလုပ် အချိန်ကုန်လွန်မှု", "Engineering", "인공시효를 연구합니다.", "I study artificial aging."],
  ["자연시효", "သဘာဝ အချိန်ကုန်လွန်မှု", "Engineering", "자연시효를 전공합니다.", "I major in natural aging."],
  ["침탄", "ကာဗွန် ထည့်သွင်းမှု", "Engineering", "침탄을 공부합니다.", "I study carburizing."],
  ["질화", "နိုက်ထရိုဂျင် ထည့်သွင်းမှု", "Engineering", "질화를 연구합니다.", "I study nitriding."],
  ["탄질화", "ကာဗွန် နိုက်ထရိုဂျင် ထည့်သွင်းမှု", "Engineering", "탄질화를 전공합니다.", "I major in carbonitriding."],
  ["보로나이징", "ဘိုရွန် ထည့်သွင်းမှု", "Engineering", "보로나이징을 공부합니다.", "I study boriding."],
  
  // Advanced Machining Techniques
  ["초정밀가공", "အလွန်တိကျသော လုပ်ဆောင်မှု", "Engineering", "초정밀가공을 수행합니다.", "I perform ultra-precision machining."],
  ["나노가공", "နာနို လုပ်ဆောင်မှု", "Engineering", "나노가공을 연구합니다.", "I study nanomachining."],
  ["마이크로가공", "မိုက်ခရို လုပ်ဆောင်မှု", "Engineering", "마이크로가공을 전공합니다.", "I major in micromachining."],
  ["전기방전가공", "လျှပ်စစ် ထွန်းလင်းမှု လုပ်ဆောင်မှု", "Engineering", "전기방전가공을 공부합니다.", "I study electrical discharge machining."],
  ["전기화학가공", "လျှပ်စစ် ဓာတုဗေဒ လုပ်ဆောင်မှု", "Engineering", "전기화학가공을 전공합니다.", "I major in electrochemical machining."],
  ["수제트가공", "ရေစီးဆင်းမှု လုပ်ဆောင်မှု", "Engineering", "수제트가공을 공부합니다.", "I study waterjet machining."],
  ["플라즈마가공", "ပလာစမာ လုပ်ဆောင်မှု", "Engineering", "플라즈마가공을 전공합니다.", "I major in plasma machining."],
  ["이온빔가공", "အိုင်ယွန် ရောင်ခြည် လုပ်ဆောင်မှု", "Engineering", "이온빔가공을 공부합니다.", "I study ion beam machining."],
  ["전자빔가공", "အီလက်ထရွန် ရောင်ခြည် လုပ်ဆောင်မှု", "Engineering", "전자빔가공을 연구합니다.", "I study electron beam machining."],
  ["초음파가공", "အလွန်မြန်သော အသံ လုပ်ဆောင်မှု", "Engineering", "초음파가공을 전공합니다.", "I major in ultrasonic machining."],
  
  // Advanced Forming Techniques
  ["초음파성형", "အလွန်မြန်သော အသံ ထုတ်လုပ်မှု", "Engineering", "초음파성형을 수행합니다.", "I perform ultrasonic forming."],
  ["전자기성형", "လျှပ်စစ် သံလိုက် ထုတ်လုပ်မှု", "Engineering", "전자기성형을 연구합니다.", "I study electromagnetic forming."],
  ["폭발성형", "ပေါက်ကွဲမှု ထုတ်လုပ်မှု", "Engineering", "폭발성형을 전공합니다.", "I major in explosive forming."],
  ["유압성형", "ရေ ဖိအား ထုတ်လုပ်မှု", "Engineering", "유압성형을 공부합니다.", "I study hydroforming."],
  ["기압성형", "လေဖိအား ထုတ်လုပ်မှု", "Engineering", "기압성형을 연구합니다.", "I study pneumatic forming."],
  ["딥드로잉", "နက်ရှိုင်းသော ဆွဲထုတ်မှု", "Engineering", "딥드로잉을 전공합니다.", "I major in deep drawing."],
  ["스핀성형", "လည်ပတ် ထုတ်လုပ်မှု", "Engineering", "스핀성형을 공부합니다.", "I study spin forming."],
  ["인발성형", "ဆွဲထုတ်မှု ထုတ်လုပ်မှု", "Engineering", "인발성형을 전공합니다.", "I major in drawing forming."],
  ["굽힘성형", "ကွေးညွှတ်မှု ထုတ်လုပ်မှု", "Engineering", "굽힘성형을 공부합니다.", "I study bending forming."],
  ["압연성형", "ဖိသိပ် လိမ်ခွေမှု ထုတ်လုပ်မှု", "Engineering", "압연성형을 연구합니다.", "I study rolling forming."],
  
  // Advanced Grinding Techniques
  ["초정밀연삭", "အလွန်တိကျသော ကြိတ်ချေမှု", "Engineering", "초정밀연삭을 수행합니다.", "I perform ultra-precision grinding."],
  ["나노연삭", "နာနို ကြိတ်ချေမှု", "Engineering", "나노연삭을 연구합니다.", "I study nanogrinding."],
  ["마이크로연삭", "မိုက်ခရို ကြိတ်ချေမှု", "Engineering", "마이크로연삭을 전공합니다.", "I major in microgrinding."],
  ["초음파연삭", "အလွန်မြန်သော အသံ ကြိတ်ချေမှု", "Engineering", "초음파연삭을 공부합니다.", "I study ultrasonic grinding."],
  ["전기연삭", "လျှပ်စစ် ကြိတ်ချေမှု", "Engineering", "전기연삭을 연구합니다.", "I study electrical grinding."],
  ["화학연삭", "ဓာတုဗေဒ ကြိတ်ချေမှု", "Engineering", "화학연삭을 전공합니다.", "I major in chemical grinding."],
  ["전기화학연삭", "လျှပ်စစ် ဓာတုဗေဒ ကြိတ်ချေမှု", "Engineering", "전기화학연삭을 공부합니다.", "I study electrochemical grinding."],
  ["플라즈마연삭", "ပလာစမာ ကြိတ်ချေမှု", "Engineering", "플라즈마연삭을 연구합니다.", "I study plasma grinding."],
  ["레이저연삭", "လေဆာ ကြိတ်ချေမှု", "Engineering", "레이저연삭을 전공합니다.", "I major in laser grinding."],
  ["이온빔연삭", "အိုင်ယွန် ရောင်ခြည် ကြိတ်ချေမှု", "Engineering", "이온빔연삭을 공부합니다.", "I study ion beam grinding."],
  
  // Advanced Polishing Techniques
  ["초정밀연마", "အလွန်တိကျသော ချောမွေ့စေမှု", "Engineering", "초정밀연마를 수행합니다.", "I perform ultra-precision polishing."],
  ["나노연마", "နာနို ချောမွေ့စေမှု", "Engineering", "나노연마를 연구합니다.", "I study nanopolishing."],
  ["마이크로연마", "မိုက်ခရို ချောမွေ့စေမှု", "Engineering", "마이크로연마를 전공합니다.", "I major in micropolishing."],
  ["화학연마", "ဓာတုဗေဒ ချောမွေ့စေမှု", "Engineering", "화학연마를 공부합니다.", "I study chemical polishing."],
  ["전기화학연마", "လျှပ်စစ် ဓာတုဗေဒ ချောမွေ့စေမှု", "Engineering", "전기화학연마를 연구합니다.", "I study electrochemical polishing."],
  ["기계연마", "စက်မှု ချောမွေ့စေမှု", "Engineering", "기계연마를 전공합니다.", "I major in mechanical polishing."],
  ["전해연마", "လျှပ်စစ် ချောမွေ့စေမှု", "Engineering", "전해연마를 공부합니다.", "I study electrolytic polishing."],
  ["플라즈마연마", "ပလာစမာ ချောမွေ့စေမှု", "Engineering", "플라즈마연마를 연구합니다.", "I study plasma polishing."],
  ["레이저연마", "လေဆာ ချောမွေ့စေမှု", "Engineering", "레이저연마를 전공합니다.", "I major in laser polishing."],
  ["이온빔연마", "အိုင်ယွန် ရောင်ခြည် ချောမွေ့စေမှု", "Engineering", "이온빔연마를 공부합니다.", "I study ion beam polishing."],
  
  // Advanced Cutting Techniques
  ["초정밀절단", "အလွန်တိကျသော ဖြတ်တောက်မှု", "Engineering", "초정밀절단을 수행합니다.", "I perform ultra-precision cutting."],
  ["나노절단", "နာနို ဖြတ်တောက်မှု", "Engineering", "나노절단을 연구합니다.", "I study nanocutting."],
  ["마이크로절단", "မိုက်ခရို ဖြတ်တောက်မှု", "Engineering", "마이크로절단을 전공합니다.", "I major in microcutting."],
  ["플라즈마절단", "ပလာစမာ ဖြတ်တောက်မှု", "Engineering", "플라즈마절단을 공부합니다.", "I study plasma cutting."],
  ["수제트절단", "ရေစီးဆင်းမှု ဖြတ်တောက်မှု", "Engineering", "수제트절단을 전공합니다.", "I major in waterjet cutting."],
  ["전기방전절단", "လျှပ်စစ် ထွန်းလင်းမှု ဖြတ်တောက်မှု", "Engineering", "전기방전절단을 공부합니다.", "I study electrical discharge cutting."],
  ["전기화학절단", "လျှပ်စစ် ဓာတုဗေဒ ဖြတ်တောက်မှု", "Engineering", "전기화학절단을 연구합니다.", "I study electrochemical cutting."],
  ["이온빔절단", "အိုင်ယွန် ရောင်ခြည် ဖြတ်တောက်မှု", "Engineering", "이온빔절단을 전공합니다.", "I major in ion beam cutting."],
  ["초음파절단", "အလွန်မြန်သော အသံ ဖြတ်တောက်မှု", "Engineering", "초음파절단을 공부합니다.", "I study ultrasonic cutting."],
  ["전자빔절단", "အီလက်ထရွန် ရောင်ခြည် ဖြတ်တောက်မှု", "Engineering", "전자빔절단을 연구합니다.", "I study electron beam cutting."],
  
  // Advanced Drilling Techniques
  ["초정밀드릴링", "အလွန်တိကျသော တူးဖော်မှု", "Engineering", "초정밀드릴링을 수행합니다.", "I perform ultra-precision drilling."],
  ["나노드릴링", "နာနို တူးဖော်မှု", "Engineering", "나노드릴링을 연구합니다.", "I study nanodrilling."],
  ["마이크로드릴링", "မိုက်ခရို တူးဖော်မှု", "Engineering", "마이크로드릴링을 전공합니다.", "I major in microdrilling."],
  ["전기방전드릴링", "လျှပ်စစ် ထွန်းလင်းမှု တူးဖော်မှု", "Engineering", "전기방전드릴링을 공부합니다.", "I study electrical discharge drilling."],
  ["전기화학드릴링", "လျှပ်စစ် ဓာတုဗေဒ တူးဖော်မှု", "Engineering", "전기화학드릴링을 연구합니다.", "I study electrochemical drilling."],
  ["초음파드릴링", "အလွန်မြန်သော အသံ တူးဖော်မှု", "Engineering", "초음파드릴링을 전공합니다.", "I major in ultrasonic drilling."],
  ["플라즈마드릴링", "ပလာစမာ တူးဖော်မှု", "Engineering", "플라즈마드릴링을 공부합니다.", "I study plasma drilling."],
  ["이온빔드릴링", "အိုင်ယွန် ရောင်ခြည် တူးဖော်မှု", "Engineering", "이온빔드릴링을 연구합니다.", "I study ion beam drilling."],
  ["전자빔드릴링", "အီလက်ထရွန် ရောင်ခြည် တူးဖော်မှု", "Engineering", "전자빔드릴링을 전공합니다.", "I major in electron beam drilling."],
  ["레이저드릴링", "လေဆာ တူးဖော်မှု", "Engineering", "레이저드릴링을 공부합니다.", "I study laser drilling."],
  
  // Advanced Milling Techniques
  ["초정밀밀링", "အလွန်တိကျသော ကြိတ်ချေမှု", "Engineering", "초정밀밀링을 수행합니다.", "I perform ultra-precision milling."],
  ["나노밀링", "နာနို ကြိတ်ချေမှု", "Engineering", "나노밀링을 연구합니다.", "I study nanomilling."],
  ["마이크로밀링", "မိုက်ခရို ကြိတ်ချေမှု", "Engineering", "마이크로밀링을 전공합니다.", "I major in micromilling."],
  ["초음파밀링", "အလွန်မြန်သော အသံ ကြိတ်ချေမှု", "Engineering", "초음파밀링을 공부합니다.", "I study ultrasonic milling."],
  ["전기방전밀링", "လျှပ်စစ် ထွန်းလင်းမှု ကြိတ်ချေမှု", "Engineering", "전기방전밀링을 연구합니다.", "I study electrical discharge milling."],
  ["전기화학밀링", "လျှပ်စစ် ဓာတုဗေဒ ကြိတ်ချေမှု", "Engineering", "전기화학밀링을 전공합니다.", "I major in electrochemical milling."],
  ["레이저밀링", "လေဆာ ကြိတ်ချေမှု", "Engineering", "레이저밀링을 공부합니다.", "I study laser milling."],
  ["플라즈마밀링", "ပလာစမာ ကြိတ်ချေမှု", "Engineering", "플라즈마밀링을 연구합니다.", "I study plasma milling."],
  ["이온빔밀링", "အိုင်ယွန် ရောင်ခြည် ကြိတ်ချေမှု", "Engineering", "이온빔밀링을 전공합니다.", "I major in ion beam milling."],
  ["전자빔밀링", "အီလက်ထရွန် ရောင်ခြည် ကြိတ်ချေမှု", "Engineering", "전자빔밀링을 공부합니다.", "I study electron beam milling."],
  
  // Advanced Turning Techniques
  ["초정밀선반가공", "အလွန်တိကျသော လည်ပတ်မှု လုပ်ဆောင်မှု", "Engineering", "초정밀선반가공을 수행합니다.", "I perform ultra-precision turning."],
  ["나노선반가공", "နာနို လည်ပတ်မှု လုပ်ဆောင်မှု", "Engineering", "나노선반가공을 연구합니다.", "I study nanoturning."],
  ["마이크로선반가공", "မိုက်ခရို လည်ပတ်မှု လုပ်ဆောင်မှု", "Engineering", "마이크로선반가공을 전공합니다.", "I major in microturning."],
  ["초음파선반가공", "အလွန်မြန်သော အသံ လည်ပတ်မှု လုပ်ဆောင်မှု", "Engineering", "초음파선반가공을 공부합니다.", "I study ultrasonic turning."],
  ["전기방전선반가공", "လျှပ်စစ် ထွန်းလင်းမှု လည်ပတ်မှု လုပ်ဆောင်မှု", "Engineering", "전기방전선반가공을 연구합니다.", "I study electrical discharge turning."],
  ["전기화학선반가공", "လျှပ်စစ် ဓာတုဗေဒ လည်ပတ်မှု လုပ်ဆောင်မှု", "Engineering", "전기화학선반가공을 전공합니다.", "I major in electrochemical turning."],
  ["레이저선반가공", "လေဆာ လည်ပတ်မှု လုပ်ဆောင်မှု", "Engineering", "레이저선반가공을 공부합니다.", "I study laser turning."],
  ["플라즈마선반가공", "ပလာစမာ လည်ပတ်မှု လုပ်ဆောင်မှု", "Engineering", "플라즈마선반가공을 연구합니다.", "I study plasma turning."],
  ["이온빔선반가공", "အိုင်ယွန် ရောင်ခြည် လည်ပတ်မှု လုပ်ဆောင်မှု", "Engineering", "이온빔선반가공을 전공합니다.", "I major in ion beam turning."],
  ["전자빔선반가공", "အီလက်ထရွန် ရောင်ခြည် လည်ပတ်မှု လုပ်ဆောင်မှု", "Engineering", "전자빔선반가공을 공부합니다.", "I study electron beam turning."],
  
  // Additional Advanced Specialized Terms
  ["서브머지드아크용접", "မြုပ်နေသော အာ့ခ် ပေါင်းစပ်မှု", "Engineering", "서브머지드아크용접을 전공합니다.", "I major in submerged arc welding."],
  ["플럭스코어드아크용접", "ဖလပ်စ် အာ့ခ် ပေါင်းစပ်မှု", "Engineering", "플럭스코어드아크용접을 공부합니다.", "I study flux-cored arc welding."],
  ["가스텅스텐아크용접", "ဓာတ်ငွေ့ တန်စတင် အာ့ခ် ပေါင်းစပ်မှု", "Engineering", "가스텅스텐아크용접을 연구합니다.", "I study gas tungsten arc welding."],
  ["가스메탈아크용접", "ဓာတ်ငွေ့ သတ္တု အာ့ခ် ပေါင်းစပ်မှု", "Engineering", "가스메탈아크용접을 전공합니다.", "I major in gas metal arc welding."],
  ["플라즈마아크용접", "ပလာစမာ အာ့ခ် ပေါင်းစပ်မှု", "Engineering", "플라즈마아크용접을 공부합니다.", "I study plasma arc welding."],
  ["플라즈마몰리브덴이징", "ပလာစမာ မိုလစ်ဒီနမ် ထည့်သွင်းမှု", "Engineering", "플라즈마몰리브덴이징을 연구합니다.", "I study plasma molybdenizing."],
  ["플라즈마텅스텐이징", "ပလာစမာ တန်စတင် ထည့်သွင်းမှု", "Engineering", "플라즈마텅스텐이징을 전공합니다.", "I major in plasma tungstening."],
  ["플라즈마코발트이징", "ပလာစမာ ကိုဘော့ ထည့်သွင်းမှု", "Engineering", "플라즈마코발트이징을 공부합니다.", "I study plasma cobaltizing."],
  ["플라즈마니켈이징", "ပလာစမာ နီကယ် ထည့်သွင်းမှု", "Engineering", "플라즈마니켈이징을 연구합니다.", "I study plasma nickelizing."],
  ["플라즈마구리이징", "ပလာစမာ ကြေးနီ ထည့်သွင်းမှု", "Engineering", "플라즈마구리이징을 전공합니다.", "I major in plasma copperizing."],
  
  // Advanced Specialized Analysis Methods
  ["주사전자현미경분석", "ရှာဖွေသော အီလက်ထရွန် မိုက်ခရိုစကုပ်ပီ ခွဲခြမ်းစိတ်ဖြာမှု", "Science", "주사전자현미경분석을 수행합니다.", "I perform scanning electron microscopy analysis."],
  ["투과전자현미경분석", "ဖြတ်သန်းသော အီလက်ထရွန် မိုက်ခရိုစကုပ်ပီ ခွဲခြမ်းစိတ်ဖြာမှု", "Science", "투과전자현미경분석을 연구합니다.", "I study transmission electron microscopy analysis."],
  ["원자력현미경분석", "အက်တမ် စွမ်းအား မိုက်ခရိုစကုပ်ပီ ခွဲခြမ်းစိတ်ဖြာမှု", "Science", "원자력현미경분석을 전공합니다.", "I major in atomic force microscopy analysis."],
  ["공초점현미경분석", "ပေါင်းစည်းသော အာရုံစူးစိုက်မှု မိုက်ခရိုစကုပ်ပီ ခွဲခြမ်းစိတ်ဖြာမှု", "Science", "공초점현미경분석을 공부합니다.", "I study confocal microscopy analysis."],
  ["형광현미경분석", "ဖလူရိုရှင်း မိုက်ခရိုစကုပ်ပီ ခွဲခြမ်းစိတ်ဖြာမှု", "Science", "형광현미경분석을 연구합니다.", "I study fluorescence microscopy analysis."],
  ["라만분광분석", "ရာမန် စပက်ထရိုစကုပ်ပီ ခွဲခြမ်းစိတ်ဖြာမှု", "Science", "라만분광분석을 전공합니다.", "I major in Raman spectroscopy analysis."],
  ["적외선분광분석", "အနီအောက်ရောင်ခြည် စပက်ထရိုစကုပ်ပီ ခွဲခြမ်းစိတ်ဖြာမှု", "Science", "적외선분광분석을 공부합니다.", "I study infrared spectroscopy analysis."],
  ["자외선분광분석", "ခရမ်းလွန်ရောင်ခြည် စပက်ထရိုစကုပ်ပီ ခွဲခြမ်းစိတ်ဖြာမှု", "Science", "자외선분광분석을 연구합니다.", "I study ultraviolet spectroscopy analysis."],
  ["핵자기공명분석", "နျူကလီးယား သံလိုက် ပြန်လည်ထူထောင်ရေး ခွဲခြမ်းစိတ်ဖြာမှု", "Science", "핵자기공명분석을 전공합니다.", "I major in nuclear magnetic resonance analysis."],
  ["질량분석법분석", "ထုထည် ခွဲခြမ်းစိတ်ဖြာမှု ခွဲခြမ်းစိတ်ဖြာမှု", "Science", "질량분석법분석을 공부합니다.", "I study mass spectrometry analysis."],
  
  // Advanced Specialized Processing Methods
  ["화학기상증착법", "ဓာတုဗေဒ ရေငွေ့ အလွှာထည့်သွင်းမှု နည်းလမ်း", "Engineering", "화학기상증착법을 연구합니다.", "I study chemical vapor deposition method."],
  ["물리기상증착법", "ရူပဗေဒ ရေငွေ့ အလွှာထည့်သွင်းမှု နည်းလမ်း", "Engineering", "물리기상증착법을 전공합니다.", "I major in physical vapor deposition method."],
  ["원자층증착법", "အက်တမ် အလွှာ အလွှာထည့်သွင်းမှု နည်းလမ်း", "Engineering", "원자층증착법을 공부합니다.", "I study atomic layer deposition method."],
  ["분자빔에피택시법", "မော်လီကျူး ရောင်ခြည် အပေါ်ယံအလွှာ နည်းလမ်း", "Engineering", "분자빔에피택시법을 연구합니다.", "I study molecular beam epitaxy method."],
  ["금속유기화학기상증착법", "သတ္တု အော်ဂဲနစ် ဓာတုဗေဒ ရေငွေ့ အလွှာထည့်သွင်းမှု နည်းလမ်း", "Engineering", "금속유기화학기상증착법을 전공합니다.", "I major in metal-organic chemical vapor deposition method."],
  ["플라즈마증착법", "ပလာစမာ အလွှာ ထည့်သွင်းမှု နည်းလမ်း", "Engineering", "플라즈마증착법을 공부합니다.", "I study plasma deposition method."],
  ["스퍼터링법", "ဖြန်းဆေးထည့်သွင်းမှု နည်းလမ်း", "Engineering", "스퍼터링법을 연구합니다.", "I study sputtering method."],
  ["레이저증착법", "လေဆာ အလွှာ ထည့်သွင်းမှု နည်းလမ်း", "Engineering", "레이저증착법을 전공합니다.", "I major in laser deposition method."],
  ["전자빔증착법", "အီလက်ထရွန် ရောင်ခြည် အလွှာ ထည့်သွင်းမှု နည်းလမ်း", "Engineering", "전자빔증착법을 공부합니다.", "I study electron beam deposition method."],
  ["이온빔증착법", "အိုင်ယွန် ရောင်ခြည် အလွှာ ထည့်သွင်းမှု နည်းလမ်း", "Engineering", "이온빔증착법을 연구합니다.", "I study ion beam deposition method."],
  
  // Advanced Specialized Testing Methods
  ["인장시험법", "ဆွဲဆန့်မှု စမ်းသပ်မှု နည်းလမ်း", "Engineering", "인장시험법을 수행합니다.", "I perform tensile testing method."],
  ["압축시험법", "ဖိသိပ်မှု စမ်းသပ်မှု နည်းလမ်း", "Engineering", "압축시험법을 연구합니다.", "I study compression testing method."],
  ["굽힘시험법", "ကွေးညွှတ်မှု စမ်းသပ်မှု နည်းလမ်း", "Engineering", "굽힘시험법을 전공합니다.", "I major in bending testing method."],
  ["피로시험법", "ပင်ပန်းနွမ်းနယ်မှု စမ်းသပ်မှု နည်းလမ်း", "Engineering", "피로시험법을 공부합니다.", "I study fatigue testing method."],
  ["충격시험법", "ရိုက်ခတ်မှု စမ်းသပ်မှု နည်းလမ်း", "Engineering", "충격시험법을 연구합니다.", "I study impact testing method."],
  ["마모시험법", "ပွန်းပဲ့မှု စမ်းသပ်မှု နည်းလမ်း", "Engineering", "마모시험법을 전공합니다.", "I major in wear testing method."],
  ["부식시험법", "ချေးတက်မှု စမ်းသပ်မှု နည်းလမ်း", "Engineering", "부식시험법을 공부합니다.", "I study corrosion testing method."],
  ["크리프시험법", "တဖြည်းဖြည်း ပြောင်းလဲမှု စမ်းသပ်မှု နည်းလမ်း", "Engineering", "크리프시험법을 연구합니다.", "I study creep testing method."],
  ["경도시험법", "ခိုင်မာမှု စမ်းသပ်မှု နည်းလမ်း", "Engineering", "경도시험법을 전공합니다.", "I major in hardness testing method."],
  ["표면거칠기시험법", "မျက်နှာပြင် ကြမ်းတမ်းမှု စမ်းသပ်မှု နည်းလမ်း", "Engineering", "표면거칠기시험법을 공부합니다.", "I study surface roughness testing method."],
  
  // Advanced Specialized Measurement Techniques
  ["열팽창계수측정", "အပူ ဖြန့်ထွက်မှု ကိန်းသေ တိုင်းတာမှု", "Science", "열팽창계수측정을 수행합니다.", "I perform thermal expansion coefficient measurement."],
  ["열전도율측정", "အပူ လျှပ်စစ်လမ်းကြောင်း တိုင်းတာမှု", "Science", "열전도율측정을 연구합니다.", "I study thermal conductivity measurement."],
  ["열용량측정", "အပူ ထုထည် တိုင်းတာမှု", "Science", "열용량측정을 전공합니다.", "I major in heat capacity measurement."],
  ["비열측정", "အထူး အပူ တိုင်းတာမှု", "Science", "비열측정을 공부합니다.", "I study specific heat measurement."],
  ["열확산율측정", "အပူ ဖြန့်ဝေမှု တိုင်းတာမှု", "Science", "열확산율측정을 연구합니다.", "I study thermal diffusivity measurement."],
  ["전기전도율측정", "လျှပ်စစ် လျှပ်စစ်လမ်းကြောင်း တိုင်းတာမှု", "Science", "전기전도율측정을 전공합니다.", "I major in electrical conductivity measurement."],
  ["저항률측정", "ခုခံမှု တိုင်းတာမှု", "Science", "저항률측정을 공부합니다.", "I study resistivity measurement."],
  ["유전율측정", "လျှပ်စစ်လမ်းကြောင်း စွမ်းအား တိုင်းတာမှု", "Science", "유전율측정을 연구합니다.", "I study permittivity measurement."],
  ["투자율측정", "သံလိုက် စွမ်းအား တိုင်းတာမှု", "Science", "투자율측정을 전공합니다.", "I major in permeability measurement."],
  ["자화율측정", "သံလိုက် စွမ်းအား တိုင်းတာမှု", "Science", "자화율측정을 공부합니다.", "I study magnetic susceptibility measurement."],
  
  // Advanced Specialized Manufacturing Processes
  ["압출성형법", "ဖိသိပ်ထုတ်လုပ်မှု နည်းလမ်း", "Engineering", "압출성형법을 수행합니다.", "I perform extrusion molding method."],
  ["사출성형법", "ထိုးသွင်းထုတ်လုပ်မှု နည်းလမ်း", "Engineering", "사출성형법을 연구합니다.", "I study injection molding method."],
  ["압축성형법", "ဖိသိပ် ထုတ်လုပ်မှု နည်းလမ်း", "Engineering", "압축성형법을 전공합니다.", "I major in compression molding method."],
  ["취성형법", "လေမှုတ်ထုတ်လုပ်မှု နည်းလမ်း", "Engineering", "취성형법을 공부합니다.", "I study blow molding method."],
  ["회전성형법", "လည်ပတ် ထုတ်လုပ်မှု နည်းလမ်း", "Engineering", "회전성형법을 연구합니다.", "I study rotational molding method."],
  ["진공성형법", "လေဟာနယ် ထုတ်လုပ်မှု နည်းလမ်း", "Engineering", "진공성형법을 전공합니다.", "I major in vacuum forming method."],
  ["열성형법", "အပူ ထုတ်လုပ်မှု နည်းလမ်း", "Engineering", "열성형법을 공부합니다.", "I study thermoforming method."],
  ["압연법", "ဖိသိပ် လိမ်ခွေမှု နည်းလမ်း", "Engineering", "압연법을 연구합니다.", "I study rolling method."],
  ["인발법", "ဆွဲထုတ်မှု နည်းလမ်း", "Engineering", "인발법을 전공합니다.", "I major in drawing method."],
  ["단조법", "ပုံသွင်းမှု နည်းလမ်း", "Engineering", "단조법을 공부합니다.", "I study forging method."],
  
  // Advanced Specialized Characterization
  ["나노특성화법", "နာနို ထူးခြားမှု နည်းလမ်း", "Engineering", "나노특성화법을 연구합니다.", "I study nanocaracterization method."],
  ["나노분석법", "နာနို ခွဲခြမ်းစိတ်ဖြာမှု နည်းလမ်း", "Engineering", "나노분석법을 전공합니다.", "I major in nanoanalysis method."],
  ["나노측정법", "နာနို တိုင်းတာမှု နည်းလမ်း", "Engineering", "나노측정법을 공부합니다.", "I study nanomeasurement method."],
  ["나노이미징법", "နာနို ပုံရိပ် နည်းလမ်း", "Engineering", "나노이미징법을 연구합니다.", "I study nanoimaging method."],
  ["나노스펙트로스코피법", "နာနို စပက်ထရိုစကုပ်ပီ နည်းလမ်း", "Engineering", "나노스펙트로스코피법을 전공합니다.", "I major in nanospectroscopy method."],
  ["나노현미경법", "နာနို မိုက်ခရိုစကုပ်ပီ နည်းလမ်း", "Engineering", "나노현미경법을 공부합니다.", "I study nanomicroscopy method."],
  ["나노분광학법", "နာနို စပက်ထရိုစကုပ်ပီ နည်းလမ်း", "Engineering", "나노분광학법을 연구합니다.", "I study nanospectroscopy method."],
  ["나노결정학법", "နာနို ပုံဆောင်ခဲ နည်းလမ်း", "Engineering", "나노결정학법을 전공합니다.", "I major in nanocrystallography method."],
  ["나노표면분석법", "နာနို မျက်နှာပြင် ခွဲခြမ်းစိတ်ဖြာမှု နည်းလမ်း", "Engineering", "나노표면분석법을 공부합니다.", "I study nanosurface analysis method."],
  ["나노구조분석법", "နာနို ဖွဲ့စည်းပုံ ခွဲခြမ်းစိတ်ဖြာမှု နည်းလမ်း", "Engineering", "나노구조분석법을 연구합니다.", "I study nanostructure analysis method."],
  
  // Additional Advanced Specialized Terms - Part 2
  ["초정밀가공기술", "အလွန်တိကျသော လုပ်ဆောင်မှု နည်းပညာ", "Engineering", "초정밀가공기술을 연구합니다.", "I study ultra-precision machining technology."],
  ["나노가공기술", "နာနို လုပ်ဆောင်မှု နည်းပညာ", "Engineering", "나노가공기술을 전공합니다.", "I major in nanomachining technology."],
  ["마이크로가공기술", "မိုက်ခရို လုပ်ဆောင်မှု နည်းပညာ", "Engineering", "마이크로가공기술을 공부합니다.", "I study micromachining technology."],
  ["전기방전가공기술", "လျှပ်စစ် ထွန်းလင်းမှု လုပ်ဆောင်မှု နည်းပညာ", "Engineering", "전기방전가공기술을 연구합니다.", "I study electrical discharge machining technology."],
  ["전기화학가공기술", "လျှပ်စစ် ဓာတုဗေဒ လုပ်ဆောင်မှု နည်းပညာ", "Engineering", "전기화학가공기술을 전공합니다.", "I major in electrochemical machining technology."],
  ["레이저가공기술", "လေဆာ လုပ်ဆောင်မှု နည်းပညာ", "Engineering", "레이저가공기술을 공부합니다.", "I study laser machining technology."],
  ["플라즈마가공기술", "ပလာစမာ လုပ်ဆောင်မှု နည်းပညာ", "Engineering", "플라즈마가공기술을 연구합니다.", "I study plasma machining technology."],
  ["이온빔가공기술", "အိုင်ယွန် ရောင်ခြည် လုပ်ဆောင်မှု နည်းပညာ", "Engineering", "이온빔가공기술을 전공합니다.", "I major in ion beam machining technology."],
  ["전자빔가공기술", "အီလက်ထရွန် ရောင်ခြည် လုပ်ဆောင်မှု နည်းပညာ", "Engineering", "전자빔가공기술을 공부합니다.", "I study electron beam machining technology."],
  ["초음파가공기술", "အလွန်မြန်သော အသံ လုပ်ဆောင်မှု နည်းပညာ", "Engineering", "초음파가공기술을 연구합니다.", "I study ultrasonic machining technology."],
  
  // Advanced Specialized Surface Engineering
  ["표면개질기술", "မျက်နှာပြင် ပြုပြင်မှု နည်းပညာ", "Engineering", "표면개질기술을 전공합니다.", "I major in surface modification technology."],
  ["표면처리기술", "မျက်နှာပြင် လုပ်ဆောင်မှု နည်းပညာ", "Engineering", "표면처리기술을 공부합니다.", "I study surface treatment technology."],
  ["표면코팅기술", "မျက်နှာပြင် ဖုံးအုပ်မှု နည်းပညာ", "Engineering", "표면코팅기술을 연구합니다.", "I study surface coating technology."],
  ["표면증착기술", "မျက်နှာပြင် အလွှာထည့်သွင်းမှု နည်းပညာ", "Engineering", "표면증착기술을 전공합니다.", "I major in surface deposition technology."],
  ["표면에칭기술", "မျက်နှာပြင် ထွင်းထုမှု နည်းပညာ", "Engineering", "표면에칭기술을 공부합니다.", "I study surface etching technology."],
  ["표면연마기술", "မျက်နှာပြင် ချောမွေ့စေမှု နည်းပညာ", "Engineering", "표면연마기술을 연구합니다.", "I study surface polishing technology."],
  ["표면나노구조화기술", "မျက်နှာပြင် နာနို ဖွဲ့စည်းပုံ နည်းပညာ", "Engineering", "표면나노구조화기술을 전공합니다.", "I major in surface nanostructuring technology."],
  ["표면미세구조제어기술", "မျက်နှာပြင် အသေးစား ဖွဲ့စည်းပုံ ထိန်းချုပ်မှု နည်းပညာ", "Engineering", "표면미세구조제어기술을 공부합니다.", "I study surface microstructure control technology."],
  ["표면나노패턴기술", "မျက်နှာပြင် နာနို ပုံစံ နည်းပညာ", "Engineering", "표면나노패턴기술을 연구합니다.", "I study surface nanopatterning technology."],
  ["표면기능화기술", "မျက်နှာပြင် လုပ်ဆောင်ချက် နည်းပညာ", "Engineering", "표면기능화기술을 전공합니다.", "I major in surface functionalization technology."],
  
  // Advanced Specialized Material Processing
  ["재료합성기술", "ပစ္စည်း ပေါင်းစပ်မှု နည်းပညာ", "Engineering", "재료합성기술을 연구합니다.", "I study material synthesis technology."],
  ["재료가공기술", "ပစ္စည်း လုပ်ဆောင်မှု နည်းပညာ", "Engineering", "재료가공기술을 전공합니다.", "I major in material processing technology."],
  ["재료특성화기술", "ပစ္စည်း ထူးခြားမှု နည်းပညာ", "Engineering", "재료특성화기술을 공부합니다.", "I study material characterization technology."],
  ["재료분석기술", "ပစ္စည်း ခွဲခြမ်းစိတ်ဖြာမှု နည်းပညာ", "Engineering", "재료분석기술을 연구합니다.", "I study material analysis technology."],
  ["재료설계기술", "ပစ္စည်း ဒီဇိုင်း နည်းပညာ", "Engineering", "재료설계기술을 전공합니다.", "I major in material design technology."],
  ["재료최적화기술", "ပစ္စည်း အကောင်းဆုံး နည်းပညာ", "Engineering", "재료최적화기술을 공부합니다.", "I study material optimization technology."],
  ["재료개발기술", "ပစ္စည်း ဖွံ့ဖြိုးတိုးတက်မှု နည်းပညာ", "Engineering", "재료개발기술을 연구합니다.", "I study material development technology."],
  ["재료평가기술", "ပစ္စည်း အကဲဖြတ်မှု နည်းပညာ", "Engineering", "재료평가기술을 전공합니다.", "I major in material evaluation technology."],
  ["재료시험기술", "ပစ္စည်း စမ်းသပ်မှု နည်းပညာ", "Engineering", "재료시험기술을 공부합니다.", "I study material testing technology."],
  ["재료품질관리기술", "ပစ္စည်း အရည်အသွေး စီမံခန့်ခွဲမှု နည်းပညာ", "Engineering", "재료품질관리기술을 연구합니다.", "I study material quality management technology."],
  
  // Advanced Specialized Measurement and Analysis
  ["나노측정기술", "နာနို တိုင်းတာမှု နည်းပညာ", "Science", "나노측정기술을 전공합니다.", "I major in nanomeasurement technology."],
  ["나노분석기술", "နာနို ခွဲခြမ်းစိတ်ဖြာမှု နည်းပညာ", "Science", "나노분석기술을 공부합니다.", "I study nanoanalysis technology."],
  ["나노이미징기술", "နာနို ပုံရိပ် နည်းပညာ", "Science", "나노이미징기술을 연구합니다.", "I study nanoimaging technology."],
  ["나노스펙트로스코피기술", "နာနို စပက်ထရိုစကုပ်ပီ နည်းပညာ", "Science", "나노스펙트로스코피기술을 전공합니다.", "I major in nanospectroscopy technology."],
  ["나노현미경기술", "နာနို မိုက်ခရိုစကုပ်ပီ နည်းပညာ", "Science", "나노현미경기술을 공부합니다.", "I study nanomicroscopy technology."],
  ["나노분광학기술", "နာနို စပက်ထရိုစကုပ်ပီ နည်းပညာ", "Science", "나노분광학기술을 연구합니다.", "I study nanospectroscopy technology."],
  ["나노결정학기술", "နာနို ပုံဆောင်ခဲ နည်းပညာ", "Science", "나노결정학기술을 전공합니다.", "I major in nanocrystallography technology."],
  ["나노표면분석기술", "နာနို မျက်နှာပြင် ခွဲခြမ်းစိတ်ဖြာမှု နည်းပညာ", "Science", "나노표면분석기술을 공부합니다.", "I study nanosurface analysis technology."],
  ["나노구조분석기술", "နာနို ဖွဲ့စည်းပုံ ခွဲခြမ်းစိတ်ဖြာမှု နည်းပညာ", "Science", "나노구조분석기술을 연구합니다.", "I study nanostructure analysis technology."],
  ["나노특성화기술", "နာနို ထူးခြားမှု နည်းပညာ", "Science", "나노특성화기술을 전공합니다.", "I major in nanocaracterization technology."],
  
  // Advanced Specialized Computational Methods
  ["분자동역학시뮬레이션기술", "မော်လီကျူး လှုပ်ရှားမှု ပုံတူ နည်းပညာ", "Computer Science", "분자동역학시뮬레이션기술을 공부합니다.", "I study molecular dynamics simulation technology."],
  ["몬테카를로시뮬레이션기술", "မွန်တီကာလို ပုံတူ နည်းပညာ", "Computer Science", "몬테카를로시뮬레이션기술을 연구합니다.", "I study Monte Carlo simulation technology."],
  ["양자몬테카를로기술", "ကွမ်တမ် မွန်တီကာလို နည်းပညာ", "Computer Science", "양자몬테카를로기술을 전공합니다.", "I major in quantum Monte Carlo technology."],
  ["유한요소법기술", "အကန့်အသတ် ဒြပ်စင် နည်းပညာ", "Computer Science", "유한요소법기술을 공부합니다.", "I study finite element method technology."],
  ["유한차분법기술", "အကန့်အသတ် ကွာခြားမှု နည်းပညာ", "Computer Science", "유한차분법기술을 연구합니다.", "I study finite difference method technology."],
  ["유한체적법기술", "အကန့်အသတ် ထုထည် နည်းပညာ", "Computer Science", "유한체적법기술을 전공합니다.", "I major in finite volume method technology."],
  ["격자볼츠만방법기술", "ဂရစ် ဘော့ဇ်မန် နည်းလမ်း နည်းပညာ", "Computer Science", "격자볼츠만방법기술을 공부합니다.", "I study lattice Boltzmann method technology."],
  ["격자양자색역학기술", "ဂရစ် ကွမ်တမ် ရောင်စဉ် စွမ်းအား နည်းပညာ", "Computer Science", "격자양자색역학기술을 연구합니다.", "I study lattice quantum chromodynamics technology."],
  ["밀도범함수이론기술", "သိပ်သည်းမှု လုပ်ဆောင်ချက် သီအိုရီ နည်းပညာ", "Computer Science", "밀도범함수이론기술을 전공합니다.", "I major in density functional theory technology."],
  ["하트리폭방법기술", "ဟာထရီ-ဖော့ခ် နည်းလမ်း နည်းပညာ", "Computer Science", "하트리폭방법기술을 공부합니다.", "I study Hartree-Fock method technology."],
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

