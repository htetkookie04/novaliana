const fs = require('fs');
const path = require('path');

// ============================================================================
// CATEGORY WORDS DATA - Inline from category-words-data.js
// ============================================================================
// Comprehensive word lists for all categories
// Format: [korean, myanmar, category, koreanExample, englishExample]
// Each category has advanced words

const categoryWordsData = {
  "Abstract concepts": [
    ["존재론", "တည်ရှိမှု သီအိုရီ", "Abstract concepts", "존재론을 연구합니다.", "I study ontology."],
    ["인식론", "သိမြင်မှု သီအိုရီ", "Abstract concepts", "인식론을 전공합니다.", "I major in epistemology."],
    ["형이상학", "ရူပဗေဒ အထက်", "Abstract concepts", "형이상학을 공부합니다.", "I study metaphysics."],
    ["현상학", "ဖြစ်ရပ်", "Abstract concepts", "현상학을 연구합니다.", "I study phenomenology."],
    ["해석학", "ဖွင့်ဆိုမှု", "Abstract concepts", "해석학을 전공합니다.", "I major in hermeneutics."],
    ["구성주의", "ဖွဲ့စည်းမှု", "Abstract concepts", "구성주의를 공부합니다.", "I study constructivism."],
    ["실용주의", "လက်တွေ့", "Abstract concepts", "실용주의를 연구합니다.", "I study pragmatism."],
    ["실존주의", "တည်ရှိမှု", "Abstract concepts", "실존주의를 전공합니다.", "I major in existentialism."],
    ["구조주의", "ဖွဲ့စည်းပုံ", "Abstract concepts", "구조주의를 공부합니다.", "I study structuralism."],
    ["후구조주의", "နောက်ပိုင်း ဖွဲ့စည်းပုံ", "Abstract concepts", "후구조주의를 연구합니다.", "I study post-structuralism."],
    ["해체주의", "ဖြေရှင်းမှု", "Abstract concepts", "해체주의를 공부합니다.", "I study deconstructionism."],
    ["포스트모더니즘", "နောက်ပိုင်း ခေတ်သစ်", "Abstract concepts", "포스트모더니즘을 전공합니다.", "I major in postmodernism."],
    ["합리주의", "ဆင်ခြင်တုံတရား", "Abstract concepts", "합리주의를 연구합니다.", "I study rationalism."],
    ["경험주의", "အတွေ့အကြုံ", "Abstract concepts", "경험주의를 공부합니다.", "I study empiricism."],
    ["관념론", "အယူအဆ", "Abstract concepts", "관념론을 전공합니다.", "I major in idealism."],
    ["유물론", "ပစ္စည်း", "Abstract concepts", "유물론을 연구합니다.", "I study materialism."],
    ["변증법", "ဆန့်ကျင်ဘက်", "Abstract concepts", "변증법을 공부합니다.", "I study dialectics."],
    ["논리학", "ဆင်ခြင်တုံတရား", "Abstract concepts", "논리학을 전공합니다.", "I major in logic."],
    ["윤리학", "ကျင့်ဝတ်", "Abstract concepts", "윤리학을 연구합니다.", "I study ethics."],
    ["미학", "အလှအပ", "Abstract concepts", "미학을 공부합니다.", "I study aesthetics."],
    ["인간성", "လူသား", "Abstract concepts", "인간성을 존중합니다.", "I respect humanity."],
    ["보편성", "အထွေထွေ", "Abstract concepts", "보편성을 추구합니다.", "I pursue universality."],
    ["특수성", "အထူး", "Abstract concepts", "특수성을 인정합니다.", "I recognize particularity."],
    ["개별성", "တစ်ခုတည်း", "Abstract concepts", "개별성을 존중합니다.", "I respect individuality."],
    ["일반성", "ပုံမှန်", "Abstract concepts", "일반성을 이해합니다.", "I understand generality."],
    ["필연성", "မလွဲမသွေ", "Abstract concepts", "필연성을 인식합니다.", "I recognize necessity."],
    ["우연성", "အခွင့်အရေး", "Abstract concepts", "우연성을 고려합니다.", "I consider contingency."],
    ["가능성", "ဖြစ်နိုင်ခြေ", "Abstract concepts", "가능성을 탐구합니다.", "I explore possibility."],
    ["현실성", "လက်တွေ့", "Abstract concepts", "현실성을 평가합니다.", "I evaluate reality."],
    ["이상성", "စံနမူနာ", "Abstract concepts", "이상성을 추구합니다.", "I pursue ideality."],
    ["절대성", "အပြည့်အဝ", "Abstract concepts", "절대성을 탐구합니다.", "I explore absoluteness."],
    ["상대성", "ဆက်စပ်", "Abstract concepts", "상대성을 이해합니다.", "I understand relativity."],
    ["주관성", "ကိုယ်ပိုင်", "Abstract concepts", "주관성을 인식합니다.", "I recognize subjectivity."],
    ["객관성", "အရာဝတ္ထု", "Abstract concepts", "객관성을 추구합니다.", "I pursue objectivity."],
    ["주체성", "အဓိက", "Abstract concepts", "주체성을 확립합니다.", "I establish subjectivity."],
    ["객체성", "အရာဝတ္ထု", "Abstract concepts", "객체성을 분석합니다.", "I analyze objectivity."],
    ["본질", "အခြေခံ", "Abstract concepts", "본질을 탐구합니다.", "I explore essence."],
    ["현상", "ဖြစ်ရပ်", "Abstract concepts", "현상을 관찰합니다.", "I observe phenomena."],
    ["내용", "အကြောင်းအရာ", "Abstract concepts", "내용을 분석합니다.", "I analyze content."],
    ["형식", "ပုံစံ", "Abstract concepts", "형식을 연구합니다.", "I study form."],
    ["질", "အရည်အသွေး", "Abstract concepts", "질을 평가합니다.", "I evaluate quality."],
    ["량", "ပမာဏ", "Abstract concepts", "량을 측정합니다.", "I measure quantity."],
    ["변화", "ပြောင်းလဲမှု", "Abstract concepts", "변화를 관찰합니다.", "I observe change."],
    ["발전", "ဖွံ့ဖြိုးတိုးတက်မှု", "Abstract concepts", "발전을 추진합니다.", "I promote development."],
    ["진화", "ဆင့်ကဲဖြစ်စဉ်", "Abstract concepts", "진화를 연구합니다.", "I study evolution."],
    ["혁명", "တော်လှန်ရေး", "Abstract concepts", "혁명을 분석합니다.", "I analyze revolution."],
    ["개혁", "ပြုပြင်ပြောင်းလဲမှု", "Abstract concepts", "개혁을 추진합니다.", "I promote reform."],
    ["보수", "ထိန်းသိမ်းမှု", "Abstract concepts", "보수를 지지합니다.", "I support conservatism."],
    ["진보", "တိုးတက်မှု", "Abstract concepts", "진보를 추구합니다.", "I pursue progress."],
    ["전통", "ရိုးရာ", "Abstract concepts", "전통을 보존합니다.", "I preserve tradition."],
    ["혁신", "ဆန်းသစ်မှု", "Abstract concepts", "혁신을 추진합니다.", "I promote innovation."],
    ["창조", "ဖန်တီးမှု", "Abstract concepts", "창조를 수행합니다.", "I perform creation."],
    ["파괴", "ဖျက်ဆီးမှု", "Abstract concepts", "파괴를 방지합니다.", "I prevent destruction."],
    ["건설", "ဆောက်လုပ်မှု", "Abstract concepts", "건설을 진행합니다.", "I proceed with construction."],
    ["해체", "ဖြေရှင်းမှု", "Abstract concepts", "해체를 분석합니다.", "I analyze deconstruction."],
    ["통합", "ပေါင်းစည်းမှု", "Abstract concepts", "통합을 추진합니다.", "I promote integration."],
    ["분리", "ခွဲထုတ်မှု", "Abstract concepts", "분리를 수행합니다.", "I perform separation."],
    ["결합", "ပေါင်းစပ်မှု", "Abstract concepts", "결합을 연구합니다.", "I study combination."],
    ["분해", "ခွဲခြမ်းစိတ်ဖြာမှု", "Abstract concepts", "분해를 분석합니다.", "I analyze decomposition."],
    ["합성", "ပေါင်းစပ်မှု", "Abstract concepts", "합성을 수행합니다.", "I perform synthesis."],
    ["분석", "ခွဲခြမ်းစိတ်ဖြာမှု", "Abstract concepts", "분석을 진행합니다.", "I proceed with analysis."],
    ["종합", "စုစုပေါင်း", "Abstract concepts", "종합을 수행합니다.", "I perform synthesis."],
    ["세분화", "ခွဲခြမ်းစိတ်ဖြာမှု", "Abstract concepts", "세분화를 진행합니다.", "I proceed with segmentation."],
    ["일원화", "တစ်ခုတည်း", "Abstract concepts", "일원화를 추진합니다.", "I promote unification."],
    ["다원화", "မျိုးစုံ", "Abstract concepts", "다원화를 지지합니다.", "I support pluralization."],
    ["단순화", "ရိုးရှင်းမှု", "Abstract concepts", "단순화를 추구합니다.", "I pursue simplification."],
    ["복잡화", "ရှုပ်ထွေးမှု", "Abstract concepts", "복잡화를 분석합니다.", "I analyze complication."],
    ["체계화", "စနစ်ကျမှု", "Abstract concepts", "체계화를 진행합니다.", "I proceed with systematization."],
    ["무질서", "အစီအစဉ်မဲ့", "Abstract concepts", "무질서를 방지합니다.", "I prevent disorder."],
    ["질서", "အစီအစဉ်", "Abstract concepts", "질서를 유지합니다.", "I maintain order."],
    ["혼란", "ရှုပ်ထွေးမှု", "Abstract concepts", "혼란을 해소합니다.", "I resolve confusion."],
    ["안정", "တည်ငြိမ်မှု", "Abstract concepts", "안정을 추구합니다.", "I pursue stability."],
    ["불안정", "မတည်ငြိမ်", "Abstract concepts", "불안정을 분석합니다.", "I analyze instability."],
    ["균형", "ညီမျှမှု", "Abstract concepts", "균형을 유지합니다.", "I maintain balance."],
    ["불균형", "မညီမျှ", "Abstract concepts", "불균형을 조정합니다.", "I adjust imbalance."],
    ["조화", "သဟဇာတ", "Abstract concepts", "조화를 추구합니다.", "I pursue harmony."],
    ["갈등", "အငြင်းပွားမှု", "Abstract concepts", "갈등을 해결합니다.", "I resolve conflict."],
    ["협력", "ပူးပေါင်းဆောင်ရွက်မှု", "Abstract concepts", "협력을 추진합니다.", "I promote cooperation."],
    ["경쟁", "ပြိုင်ဆိုင်မှု", "Abstract concepts", "경쟁을 분석합니다.", "I analyze competition."],
    ["대립", "ဆန့်ကျင်ဘက်", "Abstract concepts", "대립을 해소합니다.", "I resolve opposition."],
    ["통일", "ညီညွတ်မှု", "Abstract concepts", "통일을 추구합니다.", "I pursue unity."],
    ["분열", "ခွဲထွက်မှု", "Abstract concepts", "분열을 방지합니다.", "I prevent division."],
    ["연결", "ဆက်သွယ်မှု", "Abstract concepts", "연결을 구축합니다.", "I build connection."],
    ["단절", "ဖြတ်တောက်မှု", "Abstract concepts", "단절을 분석합니다.", "I analyze disconnection."],
    ["연속성", "ဆက်တိုက်", "Abstract concepts", "연속성을 유지합니다.", "I maintain continuity."],
    ["불연속성", "မဆက်တိုက်", "Abstract concepts", "불연속성을 연구합니다.", "I study discontinuity."],
    ["일관성", "ဆက်စပ်", "Abstract concepts", "일관성을 추구합니다.", "I pursue consistency."],
    ["모순", "ဆန့်ကျင်ဘက်", "Abstract concepts", "모순을 해결합니다.", "I resolve contradiction."],
    ["일치", "ကိုက်ညီမှု", "Abstract concepts", "일치를 추구합니다.", "I pursue agreement."],
    ["차이", "ကွာခြားမှု", "Abstract concepts", "차이를 인식합니다.", "I recognize difference."],
    ["동일성", "တူညီမှု", "Abstract concepts", "동일성을 확인합니다.", "I verify identity."],
    ["차별성", "ကွာခြားမှု", "Abstract concepts", "차별성을 존중합니다.", "I respect distinctiveness."],
    ["유사성", "ဆင်တူမှု", "Abstract concepts", "유사성을 분석합니다.", "I analyze similarity."],
    ["상이성", "ကွာခြားမှု", "Abstract concepts", "상이성을 인식합니다.", "I recognize difference."],
    ["동질성", "တူညီမှု", "Abstract concepts", "동질성을 확인합니다.", "I verify homogeneity."],
    ["이질성", "မတူညီ", "Abstract concepts", "이질성을 분석합니다.", "I analyze heterogeneity."]
  ],
  
  "Academic & Intellectual": [
    ["학술연구", "ပညာရေး သုတေသန", "Academic & Intellectual", "학술연구를 수행합니다.", "I conduct academic research."],
    ["학문적탐구", "ပညာရေး ရှာဖွေမှု", "Academic & Intellectual", "학문적탐구를 진행합니다.", "I proceed with academic inquiry."],
    ["지적재산권", "ဉာဏပစ္စည်း", "Academic & Intellectual", "지적재산권을 보호합니다.", "I protect intellectual property."],
    ["학술논문", "ပညာရေး စာတမ်း", "Academic & Intellectual", "학술논문을 작성합니다.", "I write academic papers."],
    ["이론적프레임워크", "သီအိုရီ ဘောင်ခတ်မှု", "Academic & Intellectual", "이론적프레임워크를 구축합니다.", "I build theoretical frameworks."],
    ["학술컨퍼런스", "ပညာရေး ညီလာခံ", "Academic & Intellectual", "학술컨퍼런스에 참석합니다.", "I attend academic conferences."],
    ["학제간연구", "ဘာသာရပ် စပ်ကြား သုတေသန", "Academic & Intellectual", "학제간연구를 수행합니다.", "I conduct interdisciplinary research."],
    ["학술지", "ပညာရေး ဂျာနယ်", "Academic & Intellectual", "학술지에 게재합니다.", "I publish in academic journals."],
    ["박사학위", "ဒေါက်တာ", "Academic & Intellectual", "박사학위를 취득합니다.", "I obtain a doctoral degree."],
    ["석사학위", "မဟာဘွဲ့", "Academic & Intellectual", "석사학위를 받습니다.", "I receive a master's degree."],
    ["학사학위", "ဘွဲ့", "Academic & Intellectual", "학사학위를 취득합니다.", "I obtain a bachelor's degree."],
    ["학술발표", "ပညာရေး ဟောပြောမှု", "Academic & Intellectual", "학술발표를 합니다.", "I give academic presentations."],
    ["연구방법론", "သုတေသန နည်းလမ်း", "Academic & Intellectual", "연구방법론을 학습합니다.", "I learn research methodology."],
    ["정량연구", "အရေအတွက် သုတေသန", "Academic & Intellectual", "정량연구를 수행합니다.", "I conduct quantitative research."],
    ["정성연구", "အရည်အသွေး သုတေသန", "Academic & Intellectual", "정성연구를 진행합니다.", "I proceed with qualitative research."],
    ["문헌연구", "စာပေ သုတေသန", "Academic & Intellectual", "문헌연구를 수행합니다.", "I conduct literature research."],
    ["실험연구", "စမ်းသပ်မှု သုတေသန", "Academic & Intellectual", "실험연구를 진행합니다.", "I proceed with experimental research."],
    ["조사연구", "စစ်တမ်း သုတေသန", "Academic & Intellectual", "조사연구를 수행합니다.", "I conduct survey research."],
    ["사례연구", "ကိစ္စ သုတေသန", "Academic & Intellectual", "사례연구를 진행합니다.", "I proceed with case studies."],
    ["비교연구", "နှိုင်းယှဉ် သုတေသန", "Academic & Intellectual", "비교연구를 수행합니다.", "I conduct comparative research."],
    ["종단연구", "ရှည်လျား သုတေသန", "Academic & Intellectual", "종단연구를 진행합니다.", "I proceed with longitudinal research."],
    ["횡단연구", "ဖြတ်တောက် သုတေသန", "Academic & Intellectual", "횡단연구를 수행합니다.", "I conduct cross-sectional research."],
    ["행동연구", "အပြုအမူ သုတေသန", "Academic & Intellectual", "행동연구를 진행합니다.", "I proceed with behavioral research."],
    ["인지연구", "သိမြင်မှု သုတေသန", "Academic & Intellectual", "인지연구를 수행합니다.", "I conduct cognitive research."],
    ["사회연구", "လူမှုရေး သုတေသန", "Academic & Intellectual", "사회연구를 진행합니다.", "I proceed with social research."],
    ["문화연구", "ယဉ်ကျေးမှု သုတေသန", "Academic & Intellectual", "문화연구를 수행합니다.", "I conduct cultural research."],
    ["역사연구", "သမိုင်း သုတေသန", "Academic & Intellectual", "역사연구를 진행합니다.", "I proceed with historical research."],
    ["언어연구", "ဘာသာစကား သုတေသန", "Academic & Intellectual", "언어연구를 수행합니다.", "I conduct linguistic research."],
    ["문학연구", "စာပေ သုတေသန", "Academic & Intellectual", "문학연구를 진행합니다.", "I proceed with literary research."],
    ["철학연구", "ဒဿနိကဗေဒ သုတေသန", "Academic & Intellectual", "철학연구를 수행합니다.", "I conduct philosophical research."],
    ["과학연구", "သိပ္ပံ သုတေသန", "Academic & Intellectual", "과학연구를 진행합니다.", "I proceed with scientific research."],
    ["기술연구", "နည်းပညာ သုတေသန", "Academic & Intellectual", "기술연구를 수행합니다.", "I conduct technical research."],
    ["의학연구", "ဆေးပညာ သုတေသန", "Academic & Intellectual", "의학연구를 진행합니다.", "I proceed with medical research."],
    ["경제연구", "စီးပွားရေး သုတေသန", "Academic & Intellectual", "경제연구를 수행합니다.", "I conduct economic research."],
    ["정치연구", "နိုင်ငံရေး သုတေသန", "Academic & Intellectual", "정치연구를 진행합니다.", "I proceed with political research."],
    ["심리연구", "စိတ်ပညာ သုတေသန", "Academic & Intellectual", "심리연구를 수행합니다.", "I conduct psychological research."],
    ["교육연구", "ပညာရေး သုတေသန", "Academic & Intellectual", "교육연구를 진행합니다.", "I proceed with educational research."],
    ["환경연구", "ပတ်ဝန်းကျင် သုတေသန", "Academic & Intellectual", "환경연구를 수행합니다.", "I conduct environmental research."],
    ["지구연구", "ကမ္ဘာ သုတေသန", "Academic & Intellectual", "지구연구를 진행합니다.", "I proceed with earth research."],
    ["우주연구", "အာကာသ သုတေသန", "Academic & Intellectual", "우주연구를 수행합니다.", "I conduct space research."],
    ["해양연구", "ပင်လယ် သုတေသန", "Academic & Intellectual", "해양연구를 진행합니다.", "I proceed with marine research."],
    ["생물연구", "ဇီဝ သုတေသန", "Academic & Intellectual", "생물연구를 수행합니다.", "I conduct biological research."],
    ["화학연구", "ဓာတုဗေဒ သုတေသန", "Academic & Intellectual", "화학연구를 진행합니다.", "I proceed with chemical research."],
    ["물리연구", "ရူပဗေဒ သုတေသန", "Academic & Intellectual", "물리연구를 수행합니다.", "I conduct physics research."],
    ["수학연구", "သင်္ချာ သုတေသန", "Academic & Intellectual", "수학연구를 진행합니다.", "I proceed with mathematical research."],
    ["통계연구", "စာရင်းအင်း သုတေသန", "Academic & Intellectual", "통계연구를 수행합니다.", "I conduct statistical research."],
    ["컴퓨터연구", "ကွန်ပျူတာ သုတေသန", "Academic & Intellectual", "컴퓨터연구를 진행합니다.", "I proceed with computer research."],
    ["인공지능연구", "အတုထာဘူတ သုတေသန", "Academic & Intellectual", "인공지능연구를 수행합니다.", "I conduct AI research."],
    ["로봇연구", "ရိုဘော့ သုတေသန", "Academic & Intellectual", "로봇연구를 진행합니다.", "I proceed with robotics research."],
    ["나노연구", "နာနို သုတေသန", "Academic & Intellectual", "나노연구를 수행합니다.", "I conduct nanotechnology research."],
    ["바이오연구", "ဇီဝ သုတေသန", "Academic & Intellectual", "바이오연구를 진행합니다.", "I proceed with biotechnology research."],
    ["에너지연구", "စွမ်းအား သုတေသန", "Academic & Intellectual", "에너지연구를 수행합니다.", "I conduct energy research."],
    ["재료연구", "ပစ္စည်း သုတေသန", "Academic & Intellectual", "재료연구를 진행합니다.", "I proceed with materials research."],
    ["건축연구", "ဗိသုကာ သုတေသန", "Academic & Intellectual", "건축연구를 수행합니다.", "I conduct architectural research."],
    ["도시연구", "မြို့ သုတေသန", "Academic & Intellectual", "도시연구를 진행합니다.", "I proceed with urban research."],
    ["지역연구", "ဒေသ သုတေသန", "Academic & Intellectual", "지역연구를 수행합니다.", "I conduct regional research."],
    ["국제연구", "နိုင်ငံတကာ သုတေသန", "Academic & Intellectual", "국제연구를 진행합니다.", "I proceed with international research."],
    ["비교문화연구", "နှိုင်းယှဉ် ယဉ်ကျေးမှု သုတေသန", "Academic & Intellectual", "비교문화연구를 수행합니다.", "I conduct cross-cultural research."],
    ["젠더연구", "လိင် သုတေသန", "Academic & Intellectual", "젠더연구를 진행합니다.", "I proceed with gender research."],
    ["인종연구", "လူမျိုး သုတေသန", "Academic & Intellectual", "인종연구를 수행합니다.", "I conduct ethnic research."],
    ["계급연구", "အတန်း သုတေသန", "Academic & Intellectual", "계급연구를 진행합니다.", "I proceed with class research."],
    ["세대연구", "မျိုးဆက် သုတေသန", "Academic & Intellectual", "세대연구를 수행합니다.", "I conduct generational research."],
    ["미디어연구", "မီဒီယာ သုတေသန", "Academic & Intellectual", "미디어연구를 진행합니다.", "I proceed with media research."],
    ["커뮤니케이션연구", "ဆက်သွယ်ရေး သုတေသန", "Academic & Intellectual", "커뮤니케이션연구를 수행합니다.", "I conduct communication research."],
    ["저널리즘연구", "သတင်းစာပညာ သုတေသန", "Academic & Intellectual", "저널리즘연구를 진행합니다.", "I proceed with journalism research."],
    ["영화연구", "ရုပ်ရှင် သုတေသန", "Academic & Intellectual", "영화연구를 수행합니다.", "I conduct film research."],
    ["음악연구", "ဂီတ သုတေသန", "Academic & Intellectual", "음악연구를 진행합니다.", "I proceed with music research."],
    ["예술연구", "အနုပညာ သုတေသန", "Academic & Intellectual", "예술연구를 수행합니다.", "I conduct art research."],
    ["디자인연구", "ဒီဇိုင်း သုတေသန", "Academic & Intellectual", "디자인연구를 진행합니다.", "I proceed with design research."],
    ["패션연구", "ဖက်ရှင် သုတေသန", "Academic & Intellectual", "패션연구를 수행합니다.", "I conduct fashion research."],
    ["스포츠연구", "အားကစား သုတေသန", "Academic & Intellectual", "스포츠연구를 진행합니다.", "I proceed with sports research."],
    ["레저연구", "အားလပ်ရက် သုတေသန", "Academic & Intellectual", "레저연구를 수행합니다.", "I conduct leisure research."],
    ["관광연구", "ခရီးသွား သုတေသန", "Academic & Intellectual", "관광연구를 진행합니다.", "I proceed with tourism research."],
    ["식품연구", "အစားအစာ သုတေသန", "Academic & Intellectual", "식품연구를 수행합니다.", "I conduct food research."],
    ["영양연구", "အာဟာရ သုတေသန", "Academic & Intellectual", "영양연구를 진행합니다.", "I proceed with nutrition research."],
    ["건강연구", "ကျန်းမာရေး သုတေသန", "Academic & Intellectual", "건강연구를 수행합니다.", "I conduct health research."],
    ["의료연구", "ဆေးကုသမှု သုတေသန", "Academic & Intellectual", "의료연구를 진행합니다.", "I proceed with medical care research."],
    ["간호연구", "သူနာပြု သုတေသန", "Academic & Intellectual", "간호연구를 수행합니다.", "I conduct nursing research."],
    ["약학연구", "ဆေးဝါး သုတေသန", "Academic & Intellectual", "약학연구를 진행합니다.", "I proceed with pharmaceutical research."],
    ["치의학연구", "သွားဆရာဝန် သုတေသန", "Academic & Intellectual", "치의학연구를 수행합니다.", "I conduct dental research."],
    ["수의학연구", "တိရစ္ဆာန် ဆေးကုသမှု သုတေသန", "Academic & Intellectual", "수의학연구를 진행합니다.", "I proceed with veterinary research."],
    ["법학연구", "ဥပဒေ သုတေသန", "Academic & Intellectual", "법학연구를 수행합니다.", "I conduct legal research."],
    ["경영연구", "စီမံခန့်ခွဲမှု သုတေသန", "Academic & Intellectual", "경영연구를 진행합니다.", "I proceed with management research."],
    ["마케팅연구", "စျေးကွက် သုတေသန", "Academic & Intellectual", "마케팅연구를 수행합니다.", "I conduct marketing research."],
    ["재무연구", "ငွေကြေး သုတေသန", "Academic & Intellectual", "재무연구를 진행합니다.", "I proceed with finance research."],
    ["회계연구", "စာရင်းကိုင်မှု သုတေသန", "Academic & Intellectual", "회계연구를 수행합니다.", "I conduct accounting research."],
    ["인사연구", "လူ့စွမ်းအား သုတေသန", "Academic & Intellectual", "인사연구를 진행합니다.", "I proceed with human resources research."],
    ["조직연구", "အဖွဲ့အစည်း သုတေသန", "Academic & Intellectual", "조직연구를 수행합니다.", "I conduct organizational research."],
    ["전략연구", "နည်းဗျူဟာ သုတေသန", "Academic & Intellectual", "전략연구를 진행합니다.", "I proceed with strategic research."],
    ["혁신연구", "ဆန်းသစ်မှု သုတေသန", "Academic & Intellectual", "혁신연구를 수행합니다.", "I conduct innovation research."],
    ["기업연구", "လုပ်ငန်း သုတေသန", "Academic & Intellectual", "기업연구를 진행합니다.", "I proceed with corporate research."],
    ["창업연구", "စတင်မှု သုတေသန", "Academic & Intellectual", "창업연구를 수행합니다.", "I conduct entrepreneurship research."],
    ["벤처연구", "စွန့်စားမှု သုတေသန", "Academic & Intellectual", "벤처연구를 진행합니다.", "I proceed with venture research."],
    ["스타트업연구", "စတင်မှု သုတေသန", "Academic & Intellectual", "스타트업연구를 수행합니다.", "I conduct startup research."],
    ["글로벌연구", "ကမ္ဘာ့ သုတေသန", "Academic & Intellectual", "글로벌연구를 진행합니다.", "I proceed with global research."],
    ["다국적연구", "မျိုးစုံ နိုင်ငံ သုတေသန", "Academic & Intellectual", "다국적연구를 수행합니다.", "I conduct multinational research."],
    ["지역협력연구", "ဒေသ ပူးပေါင်းဆောင်ရွက်မှု သုတေသန", "Academic & Intellectual", "지역협력연구를 진행합니다.", "I proceed with regional cooperation research."],
    ["국제협력연구", "နိုင်ငံတကာ ပူးပေါင်းဆောင်ရွက်မှု သုတေသန", "Academic & Intellectual", "국제협력연구를 수행합니다.", "I conduct international cooperation research."],
    ["개발연구", "ဖွံ့ဖြိုးတိုးတက်မှု သုတေသန", "Academic & Intellectual", "개발연구를 진행합니다.", "I proceed with development research."],
    ["지속가능연구", "ရေရှည် သုတေသန", "Academic & Intellectual", "지속가능연구를 수행합니다.", "I conduct sustainability research."],
    ["기후연구", "ရာသီဥတု သုတေသန", "Academic & Intellectual", "기후연구를 진행합니다.", "I proceed with climate research."],
    ["환경보호연구", "ပတ်ဝန်းကျင် ကာကွယ်မှု သုတေသန", "Academic & Intellectual", "환경보호연구를 수행합니다.", "I conduct environmental protection research."],
    ["재생에너지연구", "ပြန်လည်ပြည့်ဖြိုးမြဲ စွမ်းအား သုတေသန", "Academic & Intellectual", "재생에너지연구를 진행합니다.", "I proceed with renewable energy research."],
    ["친환경연구", "ပတ်ဝန်းကျင် နှင့် သဟဇာတ သုတေသန", "Academic & Intellectual", "친환경연구를 수행합니다.", "I conduct eco-friendly research."],
    ["녹색기술연구", "အစိမ်းရောင် နည်းပညာ သုတေသန", "Academic & Intellectual", "녹색기술연구를 진행합니다.", "I proceed with green technology research."],
    ["순환경제연구", "စက်ဝိုင်း စီးပွားရေး သုတေသန", "Academic & Intellectual", "순환경제연구를 수행합니다.", "I conduct circular economy research."]
  ]
};

// ============================================================================
// UTILITY FUNCTIONS - Combined from all generation files
// ============================================================================

/**
 * Get all unique categories from dictionary
 */
function getCategories() {
  const dictPath = path.join(__dirname, '..', 'public', 'data', 'dictionary.json');
  let existingData = [];
  try {
    existingData = JSON.parse(fs.readFileSync(dictPath, 'utf8'));
  } catch (err) {
    return [];
  }
  return [...new Set(existingData.map(e => e.category))].sort();
}

/**
 * Get existing words from dictionary and app.js
 */
function getExistingWords() {
  const dictPath = path.join(__dirname, '..', 'public', 'data', 'dictionary.json');
  let existingData = [];
  try {
    existingData = JSON.parse(fs.readFileSync(dictPath, 'utf8'));
  } catch (err) {
    existingData = [];
  }
  
  const existingKoreanWords = new Set(existingData.map(entry => entry.korean));
  
  const appJsPath = path.join(__dirname, 'main-generator.js');
  let appJsContent = '';
  try {
    appJsContent = fs.readFileSync(appJsPath, 'utf8');
  } catch (err) {
    return { dictWords: existingKoreanWords, appWords: new Set(), allWords: [] };
  }
  
  const allWordsMatch = appJsContent.match(/const allWords = (\[[\s\S]*?\]);/);
  let allWords = [];
  if (allWordsMatch) {
    try {
      allWords = eval(allWordsMatch[1]);
    } catch (e) {
      allWords = [];
    }
  }
  
  const existingWordsSet = new Set(allWords.map(w => w[0]));
  
  return {
    dictWords: existingKoreanWords,
    appWords: existingWordsSet,
    allWords: allWords
  };
}

/**
 * Filter duplicates from word list
 */
function filterDuplicates(words, existingDictWords, existingAppWords) {
  return words.filter(w => 
    !existingDictWords.has(w[0]) && !existingAppWords.has(w[0])
  );
}

/**
 * Add words by category using categoryWordsData
 */
function addWordsByCategory(category, count = 100) {
  const existing = getExistingWords();
  const words = categoryWordsData[category] || [];
  const filtered = filterDuplicates(words, existing.dictWords, existing.appWords);
  return filtered.slice(0, count);
}

/**
 * Generate words for a specific category (programmatic generation)
 */
function generateWordsForCategory(category, count = 100) {
  if (categoryWordsData[category] && categoryWordsData[category].length > 0) {
    const existing = getExistingWords();
    const filtered = filterDuplicates(
      categoryWordsData[category],
      existing.dictWords,
      existing.appWords
    );
    return filtered.slice(0, count);
  }
  return [];
}

/**
 * Update app.js with new words
 */
function updateAppJs(newWords) {
  if (!newWords || newWords.length === 0) {
    console.log('No new words to add to app.js');
    return false;
  }
  
  const appJsPath = path.join(__dirname, 'main-generator.js');
  let appJsContent = fs.readFileSync(appJsPath, 'utf8');
  
  const allWordsMatch = appJsContent.match(/const allWords = (\[[\s\S]*?\]);/);
  if (!allWordsMatch) {
    console.error('Could not find allWords array in app.js');
    return false;
  }
  
  let allWords = [];
  try {
    allWords = eval(allWordsMatch[1]);
  } catch (e) {
    console.error('Error parsing allWords:', e.message);
    return false;
  }
  
  allWords.push(...newWords);
  
  const newAllWordsString = JSON.stringify(allWords, null, 2);
  appJsContent = appJsContent.replace(/const allWords = \[[\s\S]*?\];/, `const allWords = ${newAllWordsString};`);
  
  fs.writeFileSync(appJsPath, appJsContent, 'utf8');
  console.log(`✓ Updated app.js with ${newWords.length} new words`);
  console.log(`  Total words in app.js: ${allWords.length}`);
  return true;
}

/**
 * Update dictionary.json with new words
 */
function updateDictionary(newWords) {
  if (!newWords || newWords.length === 0) {
    console.log('No new words to add to dictionary');
    return false;
  }
  
  const filePath = path.join(__dirname, '..', 'public', 'data', 'dictionary.json');
  let existingData = [];
  try {
    existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.log('No existing dictionary found, starting fresh');
  }
  
  const existingKoreanWords = new Set(existingData.map(entry => entry.korean));
  
  const filteredWords = newWords.filter(word => !existingKoreanWords.has(word[0]));
  
  if (filteredWords.length === 0) {
    console.log('All words already exist in dictionary');
    return false;
  }
  
  const newEntries = filteredWords.map(word => {
    const [korean, myanmar, category, koreanExample, englishExample] = word;
    const entry = {
      korean: korean,
      myanmar: myanmar,
      category: category || 'General'
    };
    if (koreanExample) entry.koreanExample = koreanExample;
    if (englishExample) entry.englishExample = englishExample;
    return entry;
  });
  
  const updatedDictionary = [...existingData, ...newEntries];
  
  fs.writeFileSync(filePath, JSON.stringify(updatedDictionary, null, 2), 'utf8');
  
  console.log(`✓ Dictionary updated!`);
  console.log(`  Total entries: ${updatedDictionary.length}`);
  console.log(`  Added ${newEntries.length} new words`);
  return true;
}

/**
 * Add words for all categories from categoryWordsData
 * This function processes all words from categoryWordsData and adds new ones to app.js and dictionary.json
 * Combined logic from complete-word-generator.js
 */
function addWordsForAllCategories() {
  const categories = getCategories();
  const existing = getExistingWords();
  
  console.log(`\n=== Generating words from categoryWordsData ===`);
  console.log(`Total categories: ${categories.length}`);
  console.log(`Existing dictionary: ${existing.dictWords.size} words`);
  console.log(`Existing app.js: ${existing.appWords.size} words\n`);
  
  let allNewWords = [];
  let totalAdded = 0;
  let categoriesProcessed = 0;
  
  categories.forEach((category, idx) => {
    const words = categoryWordsData[category] || [];
    
    if (words.length > 0) {
      const filtered = filterDuplicates(words, existing.dictWords, existing.appWords);
      
      if (filtered.length > 0) {
        allNewWords.push(...filtered);
        totalAdded += filtered.length;
        categoriesProcessed++;
        console.log(`[${idx + 1}/${categories.length}] ${category}: ${filtered.length} new words (${words.length} total)`);
      } else {
        console.log(`[${idx + 1}/${categories.length}] ${category}: All ${words.length} words already exist`);
      }
    } else {
      console.log(`[${idx + 1}/${categories.length}] ${category}: No word list defined (need to add)`);
    }
  });
  
  console.log(`\n=== Summary ===`);
  console.log(`Categories with word lists: ${categoriesProcessed}/${categories.length}`);
  console.log(`Total new words to add: ${totalAdded}`);
  
  if (totalAdded > 0) {
    updateAppJs(allNewWords);
    updateDictionary(allNewWords);
    console.log(`\n✓ Updated app.js and dictionary.json with ${totalAdded} new words`);
    if (categoriesProcessed < categories.length) {
      console.log(`\nNext: Add word lists for remaining ${categories.length - categoriesProcessed} categories`);
    }
  } else {
    console.log('\nNo new words to add.');
    if (categoriesProcessed < categories.length) {
      console.log(`\nNeed to add word lists for ${categories.length - categoriesProcessed} categories`);
    }
  }
  
  return { added: totalAdded, categoriesProcessed };
}

// ============================================================================
// MAIN EXECUTION - Original app.js logic
// ============================================================================

// Read existing dictionary
const filePath = path.join(__dirname, '..', 'public', 'data', 'dictionary.json');
let existingData = [];
try {
  existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} catch (err) {
  console.log('No existing dictionary found, starting fresh');
}

console.log(`Existing entries: ${existingData.length}`);

// Create a set of existing Korean words to avoid duplicates
const existingKoreanWords = new Set(existingData.map(entry => entry.korean));

// Combined word list from all generate files
// Format: [korean, myanmar, category, koreanExample?, englishExample?]
const allWords = [
  [
    "안녕하세요",
    "မင်္ဂလာပါ",
    "General"
  ],
  [
    "안녕",
    "ဟယ်လို",
    "General"
  ],
  [
    "감사합니다",
    "ကျေးဇူးတင်ပါတယ်",
    "General"
  ],
  [
    "고맙습니다",
    "ကျေးဇူးတင်ပါတယ်",
    "General"
  ],
  [
    "죄송합니다",
    "တောင်းပန်ပါတယ်",
    "General"
  ],
  [
    "미안합니다",
    "တောင်းပန်ပါတယ်",
    "General"
  ],
  [
    "실례합니다",
    "ခွင့်ပြုပါ",
    "General"
  ],
  [
    "네",
    "ဟုတ်ကဲ့",
    "General"
  ],
  [
    "아니요",
    "မဟုတ်ပါ",
    "General"
  ],
  [
    "예",
    "ဟုတ်ကဲ့",
    "General"
  ],
  [
    "안녕히 가세요",
    "ကောင်းကောင်းသွားပါ",
    "General"
  ],
  [
    "안녕히 계세요",
    "ကောင်းကောင်းနေပါ",
    "General"
  ],
  [
    "만나서 반갑습니다",
    "တွေ့ရတာ ဝမ်းသာပါတယ်",
    "General"
  ],
  [
    "처음 뵙겠습니다",
    "ပထမဆုံး တွေ့ရပါတယ်",
    "General"
  ],
  [
    "이름이 뭐예요?",
    "နာမည် ဘာလဲ?",
    "General"
  ],
  [
    "제 이름은",
    "ကျွန်တော့်နာမည်က",
    "General"
  ],
  [
    "어디서 오셨어요?",
    "ဘယ်ကလာတာလဲ?",
    "General"
  ],
  [
    "어떻게 지내세요?",
    "ဘယ်လို နေထိုင်ပါသလဲ?",
    "General"
  ],
  [
    "잘 지냅니다",
    "ကောင်းကောင်း နေပါတယ်",
    "General"
  ],
  [
    "또 만나요",
    "နောက်မှ ထပ်တွေ့မယ်",
    "General"
  ],
  [
    "나중에 봐요",
    "နောက်မှ ထပ်တွေ့မယ်",
    "General"
  ],
  [
    "잘 가세요",
    "ကောင်းကောင်း သွားပါ",
    "General"
  ],
  [
    "잘 있어요",
    "ကောင်းကောင်း နေပါ",
    "General"
  ],
  [
    "도와주세요",
    "ကူညီပါ",
    "General"
  ],
  [
    "괜찮습니다",
    "အဆင်ပြေပါတယ်",
    "General"
  ],
  [
    "알겠습니다",
    "နားလည်ပါတယ်",
    "General"
  ],
  [
    "모르겠어요",
    "မသိပါဘူး",
    "General"
  ],
  [
    "이해했어요",
    "နားလည်ပါတယ်",
    "General"
  ],
  [
    "이해가 안 돼요",
    "နားမလည်ပါဘူး",
    "General"
  ],
  [
    "천만에요",
    "ရပါတယ်",
    "General"
  ],
  [
    "별말씀을요",
    "ရပါတယ်",
    "General"
  ],
  [
    "죄송해요",
    "တောင်းပန်ပါတယ်",
    "General"
  ],
  [
    "수고하셨습니다",
    "ပင်ပန်းပါတယ်",
    "General"
  ],
  [
    "고생하셨습니다",
    "ပင်ပန်းပါတယ်",
    "General"
  ],
  [
    "축하합니다",
    "ဂုဏ်ယူပါတယ်",
    "General"
  ],
  [
    "생일 축하해요",
    "မွေးနေ့ မင်္ဂလာပါ",
    "General"
  ],
  [
    "건강하세요",
    "ကျန်းမာပါစေ",
    "General"
  ],
  [
    "조심하세요",
    "သတိထားပါ",
    "General"
  ],
  [
    "잘 먹겠습니다",
    "သေချာစွာ စားပါမယ်",
    "General"
  ],
  [
    "잘 먹었습니다",
    "သေချာစွာ စားပြီးပါပြီ",
    "General"
  ],
  [
    "맛있게 드세요",
    "အရသာရှိရှိ စားပါ",
    "General"
  ],
  [
    "천천히 드세요",
    "ဖြေးဖြေး စားပါ",
    "General"
  ],
  [
    "많이 드세요",
    "များများ စားပါ",
    "General"
  ],
  [
    "괜찮으세요?",
    "အဆင်ပြေပါသလား?",
    "General"
  ],
  [
    "어떻게 하면 될까요?",
    "ဘယ်လို လုပ်ရမလဲ?",
    "General"
  ],
  [
    "도와드릴까요?",
    "ကူညီပေးရမလား?",
    "General"
  ],
  [
    "필요하세요?",
    "လိုအပ်ပါသလား?",
    "General"
  ],
  [
    "필요 없어요",
    "မလိုအပ်ပါဘူး",
    "General"
  ],
  [
    "괜찮아요",
    "အဆင်ပြေပါတယ်",
    "General"
  ],
  [
    "어떻게 되나요?",
    "ဘယ်လို ဖြစ်ပါသလဲ?",
    "General"
  ],
  [
    "뭐 도와드릴까요?",
    "ဘာ ကူညီပေးရမလား?",
    "General"
  ],
  [
    "괜찮으시겠어요?",
    "အဆင်ပြေပါမလား?",
    "General"
  ],
  [
    "밥",
    "ထမင်း",
    "General"
  ],
  [
    "물",
    "ရေ",
    "General"
  ],
  [
    "김치",
    "ကင်ချီ",
    "General"
  ],
  [
    "불고기",
    "အသားကင်",
    "General"
  ],
  [
    "비빔밥",
    "ထမင်းရောနှော",
    "General"
  ],
  [
    "된장찌개",
    "ပဲငံပြာရည် ဟင်းချို",
    "General"
  ],
  [
    "김밥",
    "ကင်ဘပ်",
    "General"
  ],
  [
    "떡볶이",
    "ထမင်းပေါင်း",
    "General"
  ],
  [
    "라면",
    "ခေါက်ဆွဲ",
    "General"
  ],
  [
    "국수",
    "ခေါက်ဆွဲ",
    "General"
  ],
  [
    "떡",
    "မုန့်",
    "General"
  ],
  [
    "과일",
    "သစ်သီး",
    "General"
  ],
  [
    "사과",
    "ပန်းသီး",
    "General"
  ],
  [
    "바나나",
    "ငှက်ပျောသီး",
    "General"
  ],
  [
    "오렌지",
    "လိမ္မော်သီး",
    "General"
  ],
  [
    "딸기",
    "စတော်ဘယ်ရီ",
    "General"
  ],
  [
    "포도",
    "စပျစ်သီး",
    "General"
  ],
  [
    "수박",
    "ဖရဲသီး",
    "General"
  ],
  [
    "참외",
    "သခွားသီး",
    "General"
  ],
  [
    "배",
    "သစ်တော်သီး",
    "General"
  ],
  [
    "복숭아",
    "ချယ်ရီ",
    "General"
  ],
  [
    "체리",
    "ချယ်ရီ",
    "General"
  ],
  [
    "레몬",
    "သံပုရာသီး",
    "General"
  ],
  [
    "파인애플",
    "နာနတ်သီး",
    "General"
  ],
  [
    "망고",
    "သရက်သီး",
    "General"
  ],
  [
    "야채",
    "ဟင်းသီးဟင်းရွက်",
    "General"
  ],
  [
    "양파",
    "ကြက်သွန်နီ",
    "General"
  ],
  [
    "마늘",
    "ကြက်သွန်ဖြူ",
    "General"
  ],
  [
    "당근",
    "မုန်လာဥနီ",
    "General"
  ],
  [
    "토마토",
    "ခရမ်းချဉ်သီး",
    "General"
  ],
  [
    "오이",
    "သခွားသီး",
    "General"
  ],
  [
    "상추",
    "ဆလတ်ရွက်",
    "General"
  ],
  [
    "배추",
    "ဂေါ်ဖီထုပ်",
    "General"
  ],
  [
    "시금치",
    "ဟင်းနုနွယ်",
    "General"
  ],
  [
    "브로콜리",
    "ပန်းဂေါ်ဖီ",
    "General"
  ],
  [
    "콩나물",
    "ပဲပင်ပေါက်",
    "General"
  ],
  [
    "버섯",
    "မှို",
    "General"
  ],
  [
    "고추",
    "ငရုတ်သီး",
    "General"
  ],
  [
    "고구마",
    "ကန်စွန်းဥ",
    "General"
  ],
  [
    "감자",
    "အာလူး",
    "General"
  ],
  [
    "옥수수",
    "ပြောင်း",
    "General"
  ],
  [
    "고기",
    "အသား",
    "General"
  ],
  [
    "소고기",
    "အမဲသား",
    "General"
  ],
  [
    "돼지고기",
    "ဝက်သား",
    "General"
  ],
  [
    "닭고기",
    "ကြက်သား",
    "General"
  ],
  [
    "양고기",
    "သိုးသား",
    "General"
  ],
  [
    "생선",
    "ငါး",
    "General"
  ],
  [
    "새우",
    "ပုစွန်",
    "General"
  ],
  [
    "게",
    "ကဏန်း",
    "General"
  ],
  [
    "오징어",
    "ပြည်ကြီးငါး",
    "General"
  ],
  [
    "문어",
    "ရေဘဝဲ",
    "General"
  ],
  [
    "계란",
    "ကြက်ဥ",
    "General"
  ],
  [
    "우유",
    "နို့",
    "General"
  ],
  [
    "치즈",
    "ဒိန်ခဲ",
    "General"
  ],
  [
    "버터",
    "ထောပတ်",
    "General"
  ],
  [
    "요구르트",
    "ဒိန်ချဉ်",
    "General"
  ],
  [
    "빵",
    "မုန့်",
    "General"
  ],
  [
    "케이크",
    "ကိတ်မုန့်",
    "General"
  ],
  [
    "과자",
    "မုန့်ပဲသရေစာ",
    "General"
  ],
  [
    "초콜릿",
    "ချောကလက်",
    "General"
  ],
  [
    "아이스크림",
    "ရေခဲမုန့်",
    "General"
  ],
  [
    "사탕",
    "သကြားလုံး",
    "General"
  ],
  [
    "껌",
    "ပီကေ",
    "General"
  ],
  [
    "차",
    "လက်ဖက်",
    "General"
  ],
  [
    "커피",
    "ကော်ဖီ",
    "General"
  ],
  [
    "주스",
    "ဖျော်ရည်",
    "General"
  ],
  [
    "맥주",
    "ဘီယာ",
    "General"
  ],
  [
    "소주",
    "ဆိုဂျူ",
    "General"
  ],
  [
    "와인",
    "ဝိုင်း",
    "General"
  ],
  [
    "소금",
    "ဆား",
    "General"
  ],
  [
    "설탕",
    "သကြား",
    "General"
  ],
  [
    "후추",
    "ငရုတ်ကောင်း",
    "General"
  ],
  [
    "식용유",
    "ဆီ",
    "General"
  ],
  [
    "식초",
    "ရှာလကာရည်",
    "General"
  ],
  [
    "간장",
    "ပဲငံပြာရည်",
    "General"
  ],
  [
    "고춧가루",
    "ငရုတ်သီးမှုန့်",
    "General"
  ],
  [
    "생강",
    "ဂျင်း",
    "General"
  ],
  [
    "파",
    "ကြက်သွန်စိမ်း",
    "General"
  ],
  [
    "된장",
    "ပဲငံပြာရည်",
    "General"
  ],
  [
    "고추장",
    "ငရုတ်သီး ငံပြာရည်",
    "General"
  ],
  [
    "참기름",
    "ဆီ",
    "General"
  ],
  [
    "들기름",
    "ဆီ",
    "General"
  ],
  [
    "올리브유",
    "ဆီ",
    "General"
  ],
  [
    "식빵",
    "မုန့်",
    "General"
  ],
  [
    "크림",
    "ကရင်မ်",
    "General"
  ],
  [
    "마요네즈",
    "မေယိုနိစ်",
    "General"
  ],
  [
    "케첩",
    "ကက်ချပ်",
    "General"
  ],
  [
    "머스타드",
    "မုတ်စတာဒ်",
    "General"
  ],
  [
    "피자",
    "ပီဇာ",
    "General"
  ],
  [
    "햄버거",
    "ဟမ်ဘာဂါ",
    "General"
  ],
  [
    "샌드위치",
    "ဆန်းဒဝစ်ချ်",
    "General"
  ],
  [
    "파스타",
    "ပါစတာ",
    "General"
  ],
  [
    "스파게티",
    "စပါဂက်တီ",
    "General"
  ],
  [
    "스테이크",
    "စတိတ်",
    "General"
  ],
  [
    "샐러드",
    "ဆလတ်",
    "General"
  ],
  [
    "수프",
    "ဟင်းချို",
    "General"
  ],
  [
    "국",
    "ဟင်းချို",
    "General"
  ],
  [
    "찌개",
    "ဟင်းချို",
    "General"
  ],
  [
    "볶음밥",
    "ထမင်းကြော်",
    "General"
  ],
  [
    "짜장면",
    "ခေါက်ဆွဲ",
    "General"
  ],
  [
    "짬뽕",
    "ခေါက်ဆွဲ",
    "General"
  ],
  [
    "냉면",
    "ခေါက်ဆွဲ",
    "General"
  ],
  [
    "우동",
    "ခေါက်ဆွဲ",
    "General"
  ],
  [
    "만두",
    "မုန့်",
    "General"
  ],
  [
    "순두부",
    "ပဲပြား",
    "General"
  ],
  [
    "두부",
    "ပဲပြား",
    "General"
  ],
  [
    "콩",
    "ပဲ",
    "General"
  ],
  [
    "팥",
    "ပဲ",
    "General"
  ],
  [
    "녹두",
    "ပဲ",
    "General"
  ],
  [
    "땅콩",
    "ပဲ",
    "General"
  ],
  [
    "호두",
    "အခွံမာသီး",
    "General"
  ],
  [
    "아몬드",
    "အခွံမာသီး",
    "General"
  ],
  [
    "캐슈넛",
    "အခွံမာသီး",
    "General"
  ],
  [
    "피스타치오",
    "အခွံမာသီး",
    "General"
  ],
  [
    "밤",
    "အခွံမာသီး",
    "General"
  ],
  [
    "대추",
    "အခွံမာသီး",
    "General"
  ],
  [
    "건포도",
    "စပျစ်သီးခြောက်",
    "General"
  ],
  [
    "건조과일",
    "သစ်သီးခြောက်",
    "General"
  ],
  [
    "잼",
    "ဂျမ်",
    "General"
  ],
  [
    "꿀",
    "ပျားရည်",
    "General"
  ],
  [
    "땅콩버터",
    "ပဲထောပတ်",
    "General"
  ],
  [
    "마가린",
    "ထောပတ်",
    "General"
  ],
  [
    "크래커",
    "မုန့်",
    "General"
  ],
  [
    "비스킷",
    "မုန့်",
    "General"
  ],
  [
    "쿠키",
    "မုန့်",
    "General"
  ],
  [
    "도넛",
    "မုန့်",
    "General"
  ],
  [
    "와플",
    "မုန့်",
    "General"
  ],
  [
    "팬케이크",
    "မုန့်",
    "General"
  ],
  [
    "프렌치토스트",
    "မုန့်",
    "General"
  ],
  [
    "베이글",
    "မုန့်",
    "General"
  ],
  [
    "크루아상",
    "မုန့်",
    "General"
  ],
  [
    "마카롱",
    "မုန့်",
    "General"
  ],
  [
    "티라미수",
    "မုန့်",
    "General"
  ],
  [
    "푸딩",
    "မုန့်",
    "General"
  ],
  [
    "젤리",
    "ဂျယ်လီ",
    "General"
  ],
  [
    "마시멜로",
    "မုန့်",
    "General"
  ],
  [
    "초콜릿바",
    "ချောကလက်",
    "General"
  ],
  [
    "아이스크림콘",
    "ရေခဲမုန့်",
    "General"
  ],
  [
    "슬러시",
    "ဖျော်ရည်",
    "General"
  ],
  [
    "스무디",
    "ဖျော်ရည်",
    "General"
  ],
  [
    "밀크셰이크",
    "ဖျော်ရည်",
    "General"
  ],
  [
    "에스프레소",
    "ကော်ဖီ",
    "General"
  ],
  [
    "라떼",
    "ကော်ဖီ",
    "General"
  ],
  [
    "카푸치노",
    "ကော်ဖီ",
    "General"
  ],
  [
    "아메리카노",
    "ကော်ဖီ",
    "General"
  ],
  [
    "녹차",
    "လက်ဖက်",
    "General"
  ],
  [
    "홍차",
    "လက်ဖက်",
    "General"
  ],
  [
    "우롱차",
    "လက်ဖက်",
    "General"
  ],
  [
    "보리차",
    "လက်ဖက်",
    "General"
  ],
  [
    "생수",
    "ရေ",
    "General"
  ],
  [
    "탄산수",
    "ရေ",
    "General"
  ],
  [
    "에너지드링크",
    "အားဖြည့်ရည်",
    "General"
  ],
  [
    "비타민음료",
    "ဗီတာမင် ဖျော်ရည်",
    "General"
  ],
  [
    "야채주스",
    "ဟင်းသီးဟင်းရွက် ဖျော်ရည်",
    "General"
  ],
  [
    "과일주스",
    "သစ်သီး ဖျော်ရည်",
    "General"
  ],
  [
    "오렌지주스",
    "လိမ္မော်သီး ဖျော်ရည်",
    "General"
  ],
  [
    "사과주스",
    "ပန်းသီး ဖျော်ရည်",
    "General"
  ],
  [
    "포도주스",
    "စပျစ်သီး ဖျော်ရည်",
    "General"
  ],
  [
    "토마토주스",
    "ခရမ်းချဉ်သီး ဖျော်ရည်",
    "General"
  ],
  [
    "당근주스",
    "မုန်လာဥနီ ဖျော်ရည်",
    "General"
  ],
  [
    "콜라",
    "ကိုလာ",
    "General"
  ],
  [
    "사이다",
    "ဆိုဒါ",
    "General"
  ],
  [
    "환타",
    "ဖန်တာ",
    "General"
  ],
  [
    "스프라이트",
    "စပရိုက်",
    "General"
  ],
  [
    "공항",
    "လေဆိပ်",
    "General"
  ],
  [
    "비행기",
    "လေယာဉ်",
    "General"
  ],
  [
    "기차",
    "ရထား",
    "General"
  ],
  [
    "버스",
    "ဘတ်စကား",
    "General"
  ],
  [
    "택시",
    "တက္ကစီ",
    "General"
  ],
  [
    "지하철",
    "မြေအောက်ရထား",
    "General"
  ],
  [
    "자동차",
    "ကား",
    "General"
  ],
  [
    "오토바이",
    "မော်တော်ဆိုင်ကယ်",
    "General"
  ],
  [
    "자전거",
    "စက်ဘီး",
    "General"
  ],
  [
    "호텔",
    "ဟိုတယ်",
    "General"
  ],
  [
    "여관",
    "ဟိုတယ်",
    "General"
  ],
  [
    "펜션",
    "အိမ်ငှား",
    "General"
  ],
  [
    "리조트",
    "အားလပ်ရက် စခန်း",
    "General"
  ],
  [
    "여권",
    "ပတ်စပို့",
    "General"
  ],
  [
    "비자",
    "ဗီဇာ",
    "General"
  ],
  [
    "티켓",
    "လက်မှတ်",
    "General"
  ],
  [
    "표",
    "လက်မှတ်",
    "General"
  ],
  [
    "가방",
    "အိတ်",
    "General"
  ],
  [
    "여행가방",
    "ခရီးဆောင်အိတ်",
    "General"
  ],
  [
    "지도",
    "မြေပုံ",
    "General"
  ],
  [
    "가이드북",
    "လမ်းညွှန်စာအုပ်",
    "General"
  ],
  [
    "카메라",
    "ကင်မရာ",
    "General"
  ],
  [
    "여행",
    "ခရီးသွား",
    "General"
  ],
  [
    "관광",
    "ခရီးသွား",
    "General"
  ],
  [
    "관광지",
    "ခရီးသွား နေရာ",
    "General"
  ],
  [
    "명소",
    "ထင်ရှားသော နေရာ",
    "General"
  ],
  [
    "박물관",
    "ပြတိုက်",
    "General"
  ],
  [
    "미술관",
    "ပန်းချီပြတိုက်",
    "General"
  ],
  [
    "공원",
    "ပန်းခြံ",
    "General"
  ],
  [
    "해변",
    "ကမ်းခြေ",
    "General"
  ],
  [
    "산",
    "တောင်",
    "General"
  ],
  [
    "강",
    "မြစ်",
    "General"
  ],
  [
    "호수",
    "အင်းအိုင်",
    "General"
  ],
  [
    "섬",
    "ကျွန်း",
    "General"
  ],
  [
    "도시",
    "မြို့",
    "General"
  ],
  [
    "시골",
    "ကျေးလက်",
    "General"
  ],
  [
    "시내",
    "မြို့ထဲ",
    "General"
  ],
  [
    "교외",
    "မြို့ပြင်",
    "General"
  ],
  [
    "북쪽",
    "မြောက်",
    "General"
  ],
  [
    "남쪽",
    "တောင်",
    "General"
  ],
  [
    "동쪽",
    "အရှေ့",
    "General"
  ],
  [
    "서쪽",
    "အနောက်",
    "General"
  ],
  [
    "위",
    "အပေါ်",
    "General"
  ],
  [
    "아래",
    "အောက်",
    "General"
  ],
  [
    "앞",
    "ရှေ့",
    "General"
  ],
  [
    "뒤",
    "နောက်",
    "General"
  ],
  [
    "왼쪽",
    "ဘယ်",
    "General"
  ],
  [
    "오른쪽",
    "ညာ",
    "General"
  ],
  [
    "가까이",
    "အနီး",
    "General"
  ],
  [
    "멀리",
    "ဝေးဝေး",
    "General"
  ],
  [
    "직진",
    "ရှေ့သို့",
    "General"
  ],
  [
    "우회전",
    "ညာဘက် လှည့်",
    "General"
  ],
  [
    "좌회전",
    "ဘယ်ဘက် လှည့်",
    "General"
  ],
  [
    "U턴",
    "ပြန်လှည့်",
    "General"
  ],
  [
    "회사",
    "ကုမ္ပဏီ",
    "General"
  ],
  [
    "사무실",
    "ရုံး",
    "General"
  ],
  [
    "직장",
    "အလုပ်",
    "General"
  ],
  [
    "직원",
    "ဝန်ထမ်း",
    "General"
  ],
  [
    "사장",
    "အကြီးအကဲ",
    "General"
  ],
  [
    "부장",
    "ဌာနခွဲ မန်နေဂျာ",
    "General"
  ],
  [
    "과장",
    "ဌာနခွဲ ခေါင်းဆောင်",
    "General"
  ],
  [
    "대리",
    "ဒုတိယ ခေါင်းဆောင်",
    "General"
  ],
  [
    "사원",
    "ဝန်ထမ်း",
    "General"
  ],
  [
    "동료",
    "လုပ်ဖော်",
    "General"
  ],
  [
    "상사",
    "အကြီးအကဲ",
    "General"
  ],
  [
    "부하",
    "လက်အောက်ငယ်သား",
    "General"
  ],
  [
    "회의",
    "အစည်းအဝေး",
    "General"
  ],
  [
    "프레젠테이션",
    "တင်ပြခြင်း",
    "General"
  ],
  [
    "프로젝트",
    "စီမံကိန်း",
    "General"
  ],
  [
    "업무",
    "အလုပ်",
    "General"
  ],
  [
    "일",
    "အလုပ်",
    "General"
  ],
  [
    "작업",
    "အလုပ်",
    "General"
  ],
  [
    "과제",
    "တာဝန်",
    "General"
  ],
  [
    "데드라인",
    "နောက်ဆုံး ရက်စွဲ",
    "General"
  ],
  [
    "마감",
    "ပိတ်သိမ်း",
    "General"
  ],
  [
    "계약",
    "စာချုပ်",
    "General"
  ],
  [
    "협상",
    "ညှိနှိုင်း",
    "General"
  ],
  [
    "거래",
    "လုပ်ငန်း",
    "General"
  ],
  [
    "고객",
    "ဖောက်သည်",
    "General"
  ],
  [
    "클라이언트",
    "ဖောက်သည်",
    "General"
  ],
  [
    "파트너",
    "လုပ်ဖော်",
    "General"
  ],
  [
    "공급업체",
    "ထောက်ပံ့သူ",
    "General"
  ],
  [
    "벤더",
    "ရောင်းချသူ",
    "General"
  ],
  [
    "매출",
    "ရောင်းအား",
    "General"
  ],
  [
    "수익",
    "အမြတ်",
    "General"
  ],
  [
    "손익",
    "အမြတ် အရှုံး",
    "General"
  ],
  [
    "예산",
    "ဘတ်ဂျက်",
    "General"
  ],
  [
    "비용",
    "ကုန်ကျစရိတ်",
    "General"
  ],
  [
    "지출",
    "အသုံးစရိတ်",
    "General"
  ],
  [
    "급여",
    "လစာ",
    "General"
  ],
  [
    "월급",
    "လစာ",
    "General"
  ],
  [
    "연봉",
    "နှစ်စဉ် လစာ",
    "General"
  ],
  [
    "보너스",
    "အပိုဆုကြေး",
    "General"
  ],
  [
    "인센티브",
    "လှုံ့ဆော်မှု",
    "General"
  ],
  [
    "승진",
    "ရာထူးတိုး",
    "General"
  ],
  [
    "승급",
    "ရာထူးတိုး",
    "General"
  ],
  [
    "이직",
    "အလုပ်ပြောင်း",
    "General"
  ],
  [
    "퇴직",
    "အလုပ်ထွက်",
    "General"
  ],
  [
    "은퇴",
    "အနားယူ",
    "General"
  ],
  [
    "채용",
    "ခန့်အပ်",
    "General"
  ],
  [
    "면접",
    "တွေ့ဆုံမေးမြန်း",
    "General"
  ],
  [
    "이력서",
    "ကိုယ်ရေးရာဇဝင်",
    "General"
  ],
  [
    "자기소개서",
    "ကိုယ်တိုင် မိတ်ဆက်",
    "General"
  ],
  [
    "경력",
    "အတွေ့အကြုံ",
    "General"
  ],
  [
    "경험",
    "အတွေ့အကြုံ",
    "General"
  ],
  [
    "자격",
    "အရည်အချင်း",
    "General"
  ],
  [
    "자격증",
    "လက်မှတ်",
    "General"
  ],
  [
    "스킬",
    "စွမ်းရည်",
    "General"
  ],
  [
    "기술",
    "စွမ်းရည်",
    "General"
  ],
  [
    "능력",
    "စွမ်းရည်",
    "General"
  ],
  [
    "전문성",
    "ကျွမ်းကျင်မှု",
    "General"
  ],
  [
    "컴퓨터",
    "ကွန်ပျူတာ",
    "General"
  ],
  [
    "노트북",
    "လက်တော့ပ်",
    "General"
  ],
  [
    "프린터",
    "ပုံနှိပ်စက်",
    "General"
  ],
  [
    "팩스",
    "ဖက်စ်",
    "General"
  ],
  [
    "복사기",
    "ပုံကူးစက်",
    "General"
  ],
  [
    "전화",
    "ဖုန်း",
    "General"
  ],
  [
    "이메일",
    "အီးမေးလ်",
    "General"
  ],
  [
    "인터넷",
    "အင်တာနက်",
    "General"
  ],
  [
    "웹사이트",
    "ဝက်ဘ်ဆိုဒ်",
    "General"
  ],
  [
    "소프트웨어",
    "ဆော့ဖ်ဝဲ",
    "General"
  ],
  [
    "애플리케이션",
    "အက်ပ်လီကေးရှင်း",
    "General"
  ],
  [
    "데이터",
    "ဒေတာ",
    "General"
  ],
  [
    "파일",
    "ဖိုင်လ်",
    "General"
  ],
  [
    "문서",
    "စာရွက်",
    "General"
  ],
  [
    "보고서",
    "အစီရင်ခံစာ",
    "General"
  ],
  [
    "제안서",
    "အဆိုပြုချက်",
    "General"
  ],
  [
    "계획서",
    "အစီအစဉ်",
    "General"
  ],
  [
    "행사",
    "ပွဲ",
    "General"
  ],
  [
    "세미나",
    "ဆွေးနွေးပွဲ",
    "General"
  ],
  [
    "워크샵",
    "ဆွေးနွေးပွဲ",
    "General"
  ],
  [
    "교육",
    "ပညာရေး",
    "General"
  ],
  [
    "훈련",
    "လေ့ကျင့်မှု",
    "General"
  ],
  [
    "오리엔테이션",
    "မိတ်ဆက်",
    "General"
  ],
  [
    "평가",
    "အကဲဖြတ်",
    "General"
  ],
  [
    "피드백",
    "အကြံပြုချက်",
    "General"
  ],
  [
    "리뷰",
    "သုံးသပ်ချက်",
    "General"
  ],
  [
    "검토",
    "စစ်ဆေး",
    "General"
  ],
  [
    "수정",
    "ပြင်ဆင်",
    "General"
  ],
  [
    "승인",
    "ခွင့်ပြု",
    "General"
  ],
  [
    "거부",
    "ငြင်းဆို",
    "General"
  ],
  [
    "취소",
    "ပယ်ဖျက်",
    "General"
  ],
  [
    "확인",
    "အတည်ပြု",
    "General"
  ],
  [
    "완료",
    "ပြီးစီး",
    "General"
  ],
  [
    "진행",
    "ဆက်လက်",
    "General"
  ],
  [
    "대기",
    "စောင့်ဆိုင်း",
    "General"
  ],
  [
    "지연",
    "နောက်ကျ",
    "General"
  ],
  [
    "기쁨",
    "ဝမ်းသာ",
    "General"
  ],
  [
    "행복",
    "ပျော်ရွှင်",
    "General"
  ],
  [
    "즐거움",
    "ပျော်ရွှင်",
    "General"
  ],
  [
    "기쁘다",
    "ဝမ်းသာ",
    "General"
  ],
  [
    "행복하다",
    "ပျော်ရွှင်",
    "General"
  ],
  [
    "즐겁다",
    "ပျော်ရွှင်",
    "General"
  ],
  [
    "신나다",
    "စိတ်လှုပ်ရှား",
    "General"
  ],
  [
    "흥분",
    "စိတ်လှုပ်ရှား",
    "General"
  ],
  [
    "흥미",
    "စိတ်ဝင်စား",
    "General"
  ],
  [
    "관심",
    "စိတ်ဝင်စား",
    "General"
  ],
  [
    "호기심",
    "သိလိုစိတ်",
    "General"
  ],
  [
    "기대",
    "မျှော်လင့်",
    "General"
  ],
  [
    "희망",
    "မျှော်လင့်ချက်",
    "General"
  ],
  [
    "낙관",
    "အကောင်းမြင်စိတ်",
    "General"
  ],
  [
    "자신감",
    "ယုံကြည်မှု",
    "General"
  ],
  [
    "자신",
    "ယုံကြည်မှု",
    "General"
  ],
  [
    "자부심",
    "ဂုဏ်ယူမှု",
    "General"
  ],
  [
    "만족",
    "ကျေနပ်",
    "General"
  ],
  [
    "만족하다",
    "ကျေနပ်",
    "General"
  ],
  [
    "슬픔",
    "ဝမ်းနည်း",
    "General"
  ],
  [
    "슬프다",
    "ဝမ်းနည်း",
    "General"
  ],
  [
    "우울",
    "စိတ်ဓာတ်ကျ",
    "General"
  ],
  [
    "우울하다",
    "စိတ်ဓာတ်ကျ",
    "General"
  ],
  [
    "절망",
    "မျှော်လင့်ချက် ပျက်",
    "General"
  ],
  [
    "절망하다",
    "မျှော်လင့်ချက် ပျက်",
    "General"
  ],
  [
    "실망",
    "စိတ်ပျက်",
    "General"
  ],
  [
    "실망하다",
    "စိတ်ပျက်",
    "General"
  ],
  [
    "아쉬움",
    "ဝမ်းနည်း",
    "General"
  ],
  [
    "아쉽다",
    "ဝမ်းနည်း",
    "General"
  ],
  [
    "그리움",
    "သတိရ",
    "General"
  ],
  [
    "그리워하다",
    "သတိရ",
    "General"
  ],
  [
    "외로움",
    "အထီးကျန်",
    "General"
  ],
  [
    "외롭다",
    "အထီးကျန်",
    "General"
  ],
  [
    "고독",
    "အထီးကျန်",
    "General"
  ],
  [
    "고독하다",
    "အထီးကျန်",
    "General"
  ],
  [
    "두려움",
    "ကြောက်ရွံ့",
    "General"
  ],
  [
    "두렵다",
    "ကြောက်ရွံ့",
    "General"
  ],
  [
    "무서움",
    "ကြောက်ရွံ့",
    "General"
  ],
  [
    "무섭다",
    "ကြောက်ရွံ့",
    "General"
  ],
  [
    "공포",
    "ကြောက်ရွံ့",
    "General"
  ],
  [
    "공포스럽다",
    "ကြောက်ရွံ့",
    "General"
  ],
  [
    "불안",
    "စိုးရိမ်",
    "General"
  ],
  [
    "불안하다",
    "စိုးရိမ်",
    "General"
  ],
  [
    "걱정",
    "စိုးရိမ်",
    "General"
  ],
  [
    "걱정하다",
    "စိုးရိမ်",
    "General"
  ],
  [
    "염려",
    "စိုးရိမ်",
    "General"
  ],
  [
    "염려하다",
    "စိုးရိမ်",
    "General"
  ],
  [
    "근심",
    "စိုးရိမ်",
    "General"
  ],
  [
    "근심하다",
    "စိုးရိမ်",
    "General"
  ],
  [
    "우려",
    "စိုးရိမ်",
    "General"
  ],
  [
    "우려하다",
    "စိုးရိမ်",
    "General"
  ],
  [
    "긴장",
    "စိတ်တင်းကျပ်",
    "General"
  ],
  [
    "긴장하다",
    "စိတ်တင်းကျပ်",
    "General"
  ],
  [
    "초조",
    "စိတ်တင်းကျပ်",
    "General"
  ],
  [
    "초조하다",
    "စိတ်တင်းကျပ်",
    "General"
  ],
  [
    "안절부절",
    "စိတ်တင်းကျပ်",
    "General"
  ],
  [
    "안절부절하다",
    "စိတ်တင်းကျပ်",
    "General"
  ],
  [
    "화",
    "ဒေါသ",
    "General"
  ],
  [
    "화나다",
    "ဒေါသ",
    "General"
  ],
  [
    "분노",
    "ဒေါသ",
    "General"
  ],
  [
    "분노하다",
    "ဒေါသ",
    "General"
  ],
  [
    "짜증",
    "စိတ်တိုး",
    "General"
  ],
  [
    "짜증나다",
    "စိတ်တိုး",
    "General"
  ],
  [
    "성가심",
    "စိတ်တိုး",
    "General"
  ],
  [
    "성가시다",
    "စိတ်တိုး",
    "General"
  ],
  [
    "답답함",
    "စိတ်တိုး",
    "General"
  ],
  [
    "답답하다",
    "စိတ်တိုး",
    "General"
  ],
  [
    "불쾌",
    "စိတ်တိုး",
    "General"
  ],
  [
    "불쾌하다",
    "စိတ်တိုး",
    "General"
  ],
  [
    "싫음",
    "မုန်း",
    "General"
  ],
  [
    "싫다",
    "မုန်း",
    "General"
  ],
  [
    "혐오",
    "မုန်း",
    "General"
  ],
  [
    "혐오하다",
    "မုန်း",
    "General"
  ],
  [
    "증오",
    "မုန်း",
    "General"
  ],
  [
    "증오하다",
    "မုန်း",
    "General"
  ],
  [
    "미움",
    "မုန်း",
    "General"
  ],
  [
    "미워하다",
    "မုန်း",
    "General"
  ],
  [
    "질투",
    "မနာလို",
    "General"
  ],
  [
    "질투하다",
    "မနာလို",
    "General"
  ],
  [
    "시기",
    "မနာလို",
    "General"
  ],
  [
    "시기하다",
    "မနာလို",
    "General"
  ],
  [
    "부러움",
    "မနာလို",
    "General"
  ],
  [
    "부럽다",
    "မနာလို",
    "General"
  ],
  [
    "선망",
    "မနာလို",
    "General"
  ],
  [
    "선망하다",
    "မနာလို",
    "General"
  ],
  [
    "사랑",
    "ချစ်",
    "General"
  ],
  [
    "사랑하다",
    "ချစ်",
    "General"
  ],
  [
    "애정",
    "ချစ်",
    "General"
  ],
  [
    "애정하다",
    "ချစ်",
    "General"
  ],
  [
    "호감",
    "ကြိုက်",
    "General"
  ],
  [
    "호감이 있다",
    "ကြိုက်",
    "General"
  ],
  [
    "좋아함",
    "ကြိုက်",
    "General"
  ],
  [
    "좋아하다",
    "ကြိုက်",
    "General"
  ],
  [
    "관심이 있다",
    "စိတ်ဝင်စား",
    "General"
  ],
  [
    "흥미가 있다",
    "စိတ်ဝင်စား",
    "General"
  ],
  [
    "매력",
    "ဆွဲဆောင်",
    "General"
  ],
  [
    "매력적",
    "ဆွဲဆောင်",
    "General"
  ],
  [
    "매력있다",
    "ဆွဲဆောင်",
    "General"
  ],
  [
    "끌림",
    "ဆွဲဆောင်",
    "General"
  ],
  [
    "끌리다",
    "ဆွဲဆောင်",
    "General"
  ],
  [
    "반함",
    "ချစ်မိ",
    "General"
  ],
  [
    "반하다",
    "ချစ်မိ",
    "General"
  ],
  [
    "설렘",
    "စိတ်လှုပ်ရှား",
    "General"
  ],
  [
    "설레다",
    "စိတ်လှုပ်ရှား",
    "General"
  ],
  [
    "두근거림",
    "စိတ်လှုပ်ရှား",
    "General"
  ],
  [
    "두근거리다",
    "စိတ်လှုပ်ရှား",
    "General"
  ],
  [
    "심장이 뛴다",
    "စိတ်လှုပ်ရှား",
    "General"
  ],
  [
    "감동",
    "စိတ်လှုပ်ရှား",
    "General"
  ],
  [
    "감동하다",
    "စိတ်လှုပ်ရှား",
    "General"
  ],
  [
    "감동적",
    "စိတ်လှုပ်ရှား",
    "General"
  ],
  [
    "감동스럽다",
    "စိတ်လှုပ်ရှား",
    "General"
  ],
  [
    "감사",
    "ကျေးဇူးတင်",
    "General"
  ],
  [
    "감사하다",
    "ကျေးဇူးတင်",
    "General"
  ],
  [
    "고마움",
    "ကျေးဇူးတင်",
    "General"
  ],
  [
    "고맙다",
    "ကျေးဇူးတင်",
    "General"
  ],
  [
    "고마워하다",
    "ကျေးဇူးတင်",
    "General"
  ],
  [
    "은혜",
    "ကျေးဇူး",
    "General"
  ],
  [
    "은혜를 입다",
    "ကျေးဇူး",
    "General"
  ],
  [
    "가다",
    "သွား",
    "General"
  ],
  [
    "오다",
    "လာ",
    "General"
  ],
  [
    "먹다",
    "စား",
    "General"
  ],
  [
    "마시다",
    "သောက်",
    "General"
  ],
  [
    "자다",
    "အိပ်",
    "General"
  ],
  [
    "일어나다",
    "ထ",
    "General"
  ],
  [
    "앉다",
    "ထိုင်",
    "General"
  ],
  [
    "서다",
    "ရပ်",
    "General"
  ],
  [
    "걷다",
    "လျှောက်",
    "General"
  ],
  [
    "뛰다",
    "ပြေး",
    "General"
  ],
  [
    "달리다",
    "ပြေး",
    "General"
  ],
  [
    "날다",
    "ပျံ",
    "General"
  ],
  [
    "수영하다",
    "ရေကူး",
    "General"
  ],
  [
    "춤추다",
    "ကခုန်",
    "General"
  ],
  [
    "노래하다",
    "ဆို",
    "General"
  ],
  [
    "연주하다",
    "တီးမှုတ်",
    "General"
  ],
  [
    "듣다",
    "နား",
    "General"
  ],
  [
    "보다",
    "ကြည့်",
    "General"
  ],
  [
    "읽다",
    "ဖတ်",
    "General"
  ],
  [
    "쓰다",
    "ရေး",
    "General"
  ],
  [
    "그리다",
    "ပုံဆွဲ",
    "General"
  ],
  [
    "좋다",
    "ကောင်း",
    "General"
  ],
  [
    "나쁘다",
    "မကောင်း",
    "General"
  ],
  [
    "크다",
    "ကြီး",
    "General"
  ],
  [
    "작다",
    "ငယ်",
    "General"
  ],
  [
    "높다",
    "မြင့်",
    "General"
  ],
  [
    "낮다",
    "နိမ့်",
    "General"
  ],
  [
    "길다",
    "ရှည်",
    "General"
  ],
  [
    "짧다",
    "တို",
    "General"
  ],
  [
    "넓다",
    "ကျယ်",
    "General"
  ],
  [
    "좁다",
    "ကျဉ်း",
    "General"
  ],
  [
    "깊다",
    "နက်ရှိုင်း",
    "General"
  ],
  [
    "얕다",
    "တိမ်",
    "General"
  ],
  [
    "무겁다",
    "အလေးချိန်",
    "General"
  ],
  [
    "가볍다",
    "ပေါ့ပါး",
    "General"
  ],
  [
    "따뜻하다",
    "နွေးထွေး",
    "General"
  ],
  [
    "차갑다",
    "အေး",
    "General"
  ],
  [
    "뜨겁다",
    "ပူ",
    "General"
  ],
  [
    "시원하다",
    "အေး",
    "General"
  ],
  [
    "양자컴퓨터",
    "ကွမ်တမ် ကွန်ပျူတာ",
    "Computer Science",
    "양자컴퓨터를 개발합니다.",
    "I develop quantum computers."
  ],
  [
    "양자알고리즘",
    "ကွမ်တမ် အယ်လ်ဂိုရီသမ်",
    "Computer Science",
    "양자알고리즘을 설계합니다.",
    "I design quantum algorithms."
  ],
  [
    "양자우월성",
    "ကွမ်တမ် သာလွန်မှု",
    "Computer Science",
    "양자우월성을 달성합니다.",
    "I achieve quantum supremacy."
  ],
  [
    "양자오류수정",
    "ကွမ်တမ် အမှား ပြင်ဆင်မှု",
    "Computer Science",
    "양자오류수정을 연구합니다.",
    "I study quantum error correction."
  ],
  [
    "양자게이트",
    "ကွမ်တမ် တံခါး",
    "Computer Science",
    "양자게이트를 구현합니다.",
    "I implement quantum gates."
  ],
  [
    "양자회로",
    "ကွမ်တမ် ဆားကစ်",
    "Computer Science",
    "양자회로를 설계합니다.",
    "I design quantum circuits."
  ],
  [
    "양자상태",
    "ကွမ်တမ် အခြေအနေ",
    "Science",
    "양자상태를 측정합니다.",
    "I measure quantum states."
  ],
  [
    "양자얽힘",
    "ကွမ်တမ် ရှုပ်ထွေးမှု",
    "Science",
    "양자얽힘을 생성합니다.",
    "I create quantum entanglement."
  ],
  [
    "양자중첩",
    "ကွမ်တမ် ထပ်တိုးမှု",
    "Science",
    "양자중첩을 관찰합니다.",
    "I observe quantum superposition."
  ],
  [
    "양자측정",
    "ကွမ်တမ် တိုင်းတာမှု",
    "Science",
    "양자측정을 수행합니다.",
    "I perform quantum measurement."
  ],
  [
    "양자터널링",
    "ကွမ်တမ် တွင်းဖောက်မှု",
    "Science",
    "양자터널링을 연구합니다.",
    "I study quantum tunneling."
  ],
  [
    "양자역학",
    "ကွမ်တမ် ရူပဗေဒ",
    "Science",
    "양자역학을 전공합니다.",
    "I major in quantum mechanics."
  ],
  [
    "양자광학",
    "ကွမ်တမ် အလင်း",
    "Science",
    "양자광학을 연구합니다.",
    "I study quantum optics."
  ],
  [
    "양자정보",
    "ကွမ်တမ် သတင်းအချက်အလက်",
    "Science",
    "양자정보를 전공합니다.",
    "I major in quantum information."
  ],
  [
    "양자센서",
    "ကွမ်တမ် အာရုံခံကိရိယာ",
    "Engineering",
    "양자센서를 개발합니다.",
    "I develop quantum sensors."
  ],
  [
    "양자시뮬레이션",
    "ကွမ်တမ် တုပမှု",
    "Computer Science",
    "양자시뮬레이션을 수행합니다.",
    "I perform quantum simulation."
  ],
  [
    "양자암호화",
    "ကွမ်တမ် လျှို့ဝှက်ကုဒ်",
    "Technology",
    "양자암호화를 개발합니다.",
    "I develop quantum encryption."
  ],
  [
    "양자통신",
    "ကွမ်တမ် ဆက်သွယ်ရေး",
    "Technology",
    "양자통신을 연구합니다.",
    "I study quantum communication."
  ],
  [
    "양자네트워크",
    "ကွမ်တမ် ကွန်ရက်",
    "Technology",
    "양자네트워크를 개발합니다.",
    "I develop quantum networks."
  ],
  [
    "양자머신러닝",
    "ကွမ်တမ် စက်သင်ယူမှု",
    "Computer Science",
    "양자머신러닝을 연구합니다.",
    "I study quantum machine learning."
  ],
  [
    "트랜스포머",
    "ထရန်စ်ဖော်မာ",
    "Computer Science",
    "트랜스포머 모델을 학습시킵니다.",
    "I train transformer models."
  ],
  [
    "어텐션메커니즘",
    "အာရုံစိုက်မှု ယန္တရား",
    "Computer Science",
    "어텐션메커니즘을 구현합니다.",
    "I implement attention mechanisms."
  ],
  [
    "생성모델",
    "ဖန်တီးသော ပုံစံ",
    "Computer Science",
    "생성모델을 개발합니다.",
    "I develop generative models."
  ],
  [
    "대화형AI",
    "စကားပြောသော AI",
    "Computer Science",
    "대화형AI를 구축합니다.",
    "I build conversational AI."
  ],
  [
    "멀티모달AI",
    "မျိုးစုံ ပုံစံ AI",
    "Computer Science",
    "멀티모달AI를 연구합니다.",
    "I study multimodal AI."
  ],
  [
    "메타러닝",
    "မက်တာ သင်ယူမှု",
    "Computer Science",
    "메타러닝을 연구합니다.",
    "I study meta-learning."
  ],
  [
    "페더레이션러닝",
    "ဖယ်ဒရေးရှင်း သင်ယူမှု",
    "Computer Science",
    "페더레이션러닝을 구현합니다.",
    "I implement federated learning."
  ],
  [
    "설명가능한AI",
    "ရှင်းလင်းသော AI",
    "Computer Science",
    "설명가능한AI를 개발합니다.",
    "I develop explainable AI."
  ],
  [
    "자율학습",
    "ကိုယ်ပိုင် သင်ယူမှု",
    "Computer Science",
    "자율학습을 전공합니다.",
    "I major in self-supervised learning."
  ],
  [
    "적대적생성신경망",
    "ဆန့်ကျင်ဘက် ဖန်တီးသော အာရုံကြော ကွန်ရက်",
    "Computer Science",
    "적대적생성신경망을 연구합니다.",
    "I study GANs."
  ],
  [
    "전이학습",
    "ပြောင်းလဲသော သင်ယူမှု",
    "Computer Science",
    "전이학습을 활용합니다.",
    "I utilize transfer learning."
  ],
  [
    "강화학습",
    "အားကောင်းစေသော သင်ယူမှု",
    "Computer Science",
    "강화학습을 적용합니다.",
    "I apply reinforcement learning."
  ],
  [
    "딥러닝",
    "နက်ရှိုင်းသော သင်ယူမှု",
    "Computer Science",
    "딥러닝을 연구합니다.",
    "I study deep learning."
  ],
  [
    "신경망",
    "အာရုံကြော ကွန်ရက်",
    "Computer Science",
    "신경망을 구축합니다.",
    "I build neural networks."
  ],
  [
    "컴퓨터비전",
    "ကွန်ပျူတာ အမြင်",
    "Computer Science",
    "컴퓨터비전을 개발합니다.",
    "I develop computer vision."
  ],
  [
    "자연어처리",
    "သဘာဝ ဘာသာစကား လုပ်ဆောင်မှု",
    "Computer Science",
    "자연어처리를 전공합니다.",
    "I major in NLP."
  ],
  [
    "음성인식",
    "အသံ အသိအမှတ်ပြုမှု",
    "Computer Science",
    "음성인식을 연구합니다.",
    "I study speech recognition."
  ],
  [
    "감정인식",
    "စိတ်ခံစားမှု အသိအမှတ်ပြုမှု",
    "Computer Science",
    "감정인식을 공부합니다.",
    "I study emotion recognition."
  ],
  [
    "생성AI",
    "ဖန်တီးသော AI",
    "Arts",
    "생성AI를 사용합니다.",
    "I use generative AI."
  ],
  [
    "AI예술",
    "AI အနုပညာ",
    "Arts",
    "AI예술을 창작합니다.",
    "I create AI art."
  ],
  [
    "유전체편집",
    "မျိုးရိုးဗီဇ တည်းဖြတ်မှု",
    "Medical",
    "유전체편집을 수행합니다.",
    "I perform genome editing."
  ],
  [
    "단일세포유전체학",
    "တစ်ခုတည်း ဆဲလ် မျိုးရိုးဗီဇ",
    "Medical",
    "단일세포유전체학을 연구합니다.",
    "I study single-cell genomics."
  ],
  [
    "후성유전학",
    "အတုအယောင် မျိုးရိုးဗီဇ",
    "Medical",
    "후성유전학을 전공합니다.",
    "I major in epigenetics."
  ],
  [
    "단백질체학",
    "ပရိုတိန်း",
    "Medical",
    "단백질체학을 분석합니다.",
    "I analyze proteomics."
  ],
  [
    "대사체학",
    "ဇီဝဖြစ်စဉ်",
    "Medical",
    "대사체학을 연구합니다.",
    "I study metabolomics."
  ],
  [
    "전사체학",
    "ကူးယူမှု",
    "Medical",
    "전사체학을 전공합니다.",
    "I major in transcriptomics."
  ],
  [
    "시스템생물학",
    "စနစ် ဇီဝဗေဒ",
    "Science",
    "시스템생물학을 공부합니다.",
    "I study systems biology."
  ],
  [
    "합성생물학",
    "ပေါင်းစပ်သော ဇီဝဗေဒ",
    "Science",
    "합성생물학을 연구합니다.",
    "I study synthetic biology."
  ],
  [
    "바이오인포매틱스",
    "ဇီဝ သတင်းအချက်အလက်",
    "Science",
    "바이오인포매틱스를 활용합니다.",
    "I utilize bioinformatics."
  ],
  [
    "정밀의학",
    "တိကျသော ဆေးပညာ",
    "Medical",
    "정밀의학을 적용합니다.",
    "I apply precision medicine."
  ],
  [
    "크리스퍼",
    "ခရစ်စပါ",
    "Medical",
    "크리스퍼 기술을 개발합니다.",
    "I develop CRISPR technology."
  ],
  [
    "유전자치료",
    "မျိုးရိုးဗီဇ ကုသမှု",
    "Medical",
    "유전자치료를 전공합니다.",
    "I major in gene therapy."
  ],
  [
    "줄기세포",
    "ပင်မဆဲလ်",
    "Medical",
    "줄기세포를 연구합니다.",
    "I study stem cells."
  ],
  [
    "재생의학",
    "ပြန်လည်ဖြစ်ပေါ်သော ဆေးပညာ",
    "Medical",
    "재생의학을 공부합니다.",
    "I study regenerative medicine."
  ],
  [
    "조직공학",
    "တစ်ရှူး အင်ဂျင်နီယာ",
    "Medical",
    "조직공학을 연구합니다.",
    "I study tissue engineering."
  ],
  [
    "바이오프린팅",
    "ဇီဝ ပုံနှိပ်မှု",
    "Medical",
    "바이오프린팅을 전공합니다.",
    "I major in bioprinting."
  ],
  [
    "면역치료",
    "ကိုယ်ခံအား ကုသမှု",
    "Medical",
    "면역치료를 개발합니다.",
    "I develop immunotherapy."
  ],
  [
    "개인맞춤의학",
    "ကိုယ်ပိုင် ဆေးပညာ",
    "Medical",
    "개인맞춤의학을 연구합니다.",
    "I study personalized medicine."
  ],
  [
    "유전의학",
    "မျိုးရိုးဗီဇ ဆေးပညာ",
    "Medical",
    "유전의학을 전공합니다.",
    "I major in genetic medicine."
  ],
  [
    "분자의학",
    "မော်လီကျူး ဆေးပညာ",
    "Medical",
    "분자의학을 공부합니다.",
    "I study molecular medicine."
  ],
  [
    "메타물질",
    "မက်တာ ပစ္စည်း",
    "Engineering",
    "메타물질을 설계합니다.",
    "I design metamaterials."
  ],
  [
    "포토닉결정",
    "အလင်း ပုံဆောင်ခဲ",
    "Engineering",
    "포토닉결정을 연구합니다.",
    "I study photonic crystals."
  ],
  [
    "플라즈모닉스",
    "ပလာစမာ",
    "Engineering",
    "플라즈모닉스를 전공합니다.",
    "I major in plasmonics."
  ],
  [
    "나노포토닉스",
    "နာနို အလင်း",
    "Engineering",
    "나노포토닉스를 개발합니다.",
    "I develop nanophotonics."
  ],
  [
    "양자점",
    "ကွမ်တမ် အမှတ်",
    "Engineering",
    "양자점을 제조합니다.",
    "I fabricate quantum dots."
  ],
  [
    "나노구조체",
    "နာနို ဖွဲ့စည်းပုံ",
    "Engineering",
    "나노구조체를 설계합니다.",
    "I design nanostructures."
  ],
  [
    "초소수성표면",
    "စူပါ ရေငြိမ်းသော မျက်နှာပြင်",
    "Engineering",
    "초소수성표면을 개발합니다.",
    "I develop superhydrophobic surfaces."
  ],
  [
    "자기유체",
    "သံလိုက် အရည်",
    "Engineering",
    "자기유체를 연구합니다.",
    "I study magnetorheological fluids."
  ],
  [
    "전기변색소재",
    "လျှပ်စစ် အရောင် ပြောင်းသော ပစ္စည်း",
    "Engineering",
    "전기변색소재를 개발합니다.",
    "I develop electrochromic materials."
  ],
  [
    "형상기억합금",
    "ပုံစံ မှတ်မိသော သတ္တုစပ်",
    "Engineering",
    "형상기억합금을 연구합니다.",
    "I study shape memory alloys."
  ],
  [
    "그래핀",
    "ဂရပ်ဖင်",
    "Engineering",
    "그래핀을 연구합니다.",
    "I study graphene."
  ],
  [
    "탄소나노튜브",
    "ကာဗွန် နာနို ပြွန်",
    "Engineering",
    "탄소나노튜브를 전공합니다.",
    "I major in carbon nanotubes."
  ],
  [
    "나노와이어",
    "နာနို ဝိုင်ယာ",
    "Engineering",
    "나노와이어를 공부합니다.",
    "I study nanowires."
  ],
  [
    "나노입자",
    "နာနို အမှုန်",
    "Engineering",
    "나노입자를 연구합니다.",
    "I study nanoparticles."
  ],
  [
    "나노막",
    "နာနို အလွှာ",
    "Engineering",
    "나노막을 전공합니다.",
    "I major in nanofilms."
  ],
  [
    "나노구조",
    "နာနို ဖွဲ့စည်းပုံ",
    "Engineering",
    "나노구조를 공부합니다.",
    "I study nanostructures."
  ],
  [
    "나노패턴",
    "နာနို ပုံစံ",
    "Engineering",
    "나노패턴을 연구합니다.",
    "I study nanopatterns."
  ],
  [
    "나노표면",
    "နာနို မျက်နှာပြင်",
    "Engineering",
    "나노표면을 전공합니다.",
    "I major in nanosurfaces."
  ],
  [
    "나노결정",
    "နာနို ပုံဆောင်ခဲ",
    "Engineering",
    "나노결정을 공부합니다.",
    "I study nanocrystals."
  ],
  [
    "나노섬유",
    "နာနို အမျှင်",
    "Engineering",
    "나노섬유를 연구합니다.",
    "I study nanofibers."
  ],
  [
    "마이크로서비스아키텍처",
    "မိုက်ခရို ဝန်ဆောင်မှု ဗိသုကာ",
    "Computer Science",
    "마이크로서비스아키텍처를 설계합니다.",
    "I design microservices architecture."
  ],
  [
    "서버리스컴퓨팅",
    "ဆာဗာ မရှိ ကွန်ပျူတာ",
    "Computer Science",
    "서버리스컴퓨팅을 구축합니다.",
    "I build serverless computing."
  ],
  [
    "컨테이너오케스트레이션",
    "ကွန်တိန်နာ စည်းရုံးမှု",
    "Computer Science",
    "컨테이너오케스트레이션을 관리합니다.",
    "I manage container orchestration."
  ],
  [
    "함수형프로그래밍",
    "လုပ်ဆောင်ချက် ပရိုဂရမ်မိန်း",
    "Computer Science",
    "함수형프로그래밍을 실천합니다.",
    "I practice functional programming."
  ],
  [
    "리액티브프로그래밍",
    "တုံ့ပြန်သော ပရိုဂရမ်မိန်း",
    "Computer Science",
    "리액티브프로그래밍을 연구합니다.",
    "I study reactive programming."
  ],
  [
    "병렬컴퓨팅",
    "ပြိုင်တူ ကွန်ပျူတာ",
    "Computer Science",
    "병렬컴퓨팅을 최적화합니다.",
    "I optimize parallel computing."
  ],
  [
    "고성능컴퓨팅",
    "မြင့်မားသော စွမ်းဆောင်ရည် ကွန်ပျူတာ",
    "Computer Science",
    "고성능컴퓨팅을 활용합니다.",
    "I utilize high-performance computing."
  ],
  [
    "그리드컴퓨팅",
    "ဂရစ် ကွန်ပျူတာ",
    "Computer Science",
    "그리드컴퓨팅을 구축합니다.",
    "I build grid computing."
  ],
  [
    "분산컴퓨팅",
    "ဖြန့်ဝေသော ကွန်ပျူတာ",
    "Computer Science",
    "분산컴퓨팅을 설계합니다.",
    "I design distributed computing."
  ],
  [
    "엣지AI",
    "အစွန်း AI",
    "Computer Science",
    "엣지AI를 배포합니다.",
    "I deploy edge AI."
  ],
  [
    "클라우드컴퓨팅",
    "ကလောက်ဒ် ကွန်ပျူတာ",
    "Computer Science",
    "클라우드컴퓨팅을 연구합니다.",
    "I study cloud computing."
  ],
  [
    "서버리스",
    "ဆာဗာ မရှိ",
    "Computer Science",
    "서버리스를 개발합니다.",
    "I develop serverless."
  ],
  [
    "컨테이너화",
    "ကွန်တိန်နာ ပြုလုပ်မှု",
    "Computer Science",
    "컨테이너화를 전공합니다.",
    "I major in containerization."
  ],
  [
    "마이크로서비스",
    "မိုက်ခရို ဝန်ဆောင်မှု",
    "Computer Science",
    "마이크로서비스를 구축합니다.",
    "I build microservices."
  ],
  [
    "데브옵스",
    "ဒက်ဗ်အော့ပ်စ်",
    "Computer Science",
    "데브옵스를 실천합니다.",
    "I practice DevOps."
  ],
  [
    "CI/CD",
    "CI/CD",
    "Computer Science",
    "CI/CD를 구축합니다.",
    "I build CI/CD."
  ],
  [
    "인프라코드화",
    "အခြေခံအဆောက်အဦ ကုဒ်",
    "Computer Science",
    "인프라코드화를 연구합니다.",
    "I study infrastructure as code."
  ],
  [
    "자동화테스트",
    "အလိုအလျောက် စမ်းသပ်မှု",
    "Computer Science",
    "자동화테스트를 수행합니다.",
    "I perform automated testing."
  ],
  [
    "성능최적화",
    "စွမ်းဆောင်ရည် အကောင်းဆုံး",
    "Computer Science",
    "성능최적화를 연구합니다.",
    "I study performance optimization."
  ],
  [
    "확장성",
    "ချဲ့ထွင်နိုင်မှု",
    "Computer Science",
    "확장성을 설계합니다.",
    "I design scalability."
  ],
  [
    "나노의약품",
    "နာနို ဆေးဝါး",
    "Medical",
    "나노의약품을 개발합니다.",
    "I develop nanomedicines."
  ],
  [
    "의료영상처리",
    "ဆေးပညာ ပုံရိပ် လုပ်ဆောင်မှု",
    "Medical",
    "의료영상처리를 분석합니다.",
    "I analyze medical image processing."
  ],
  [
    "진단기기",
    "ရောဂါရှာဖွေရေး ကိရိယာ",
    "Medical",
    "진단기기를 개발합니다.",
    "I develop diagnostic devices."
  ],
  [
    "치료기기",
    "ကုသမှု ကိရိယာ",
    "Medical",
    "치료기기를 연구합니다.",
    "I study therapeutic devices."
  ],
  [
    "생체신호처리",
    "ဇီဝ အချက်ပြမှု လုပ်ဆောင်မှု",
    "Medical",
    "생체신호처리를 분석합니다.",
    "I analyze biosignal processing."
  ],
  [
    "의료데이터분석",
    "ဆေးပညာ ဒေတာ ခွဲခြမ်းစိတ်ဖြာမှု",
    "Medical",
    "의료데이터분석을 수행합니다.",
    "I perform medical data analysis."
  ],
  [
    "임상시험",
    "ကုသမှု စမ်းသပ်မှု",
    "Medical",
    "임상시험을 설계합니다.",
    "I design clinical trials."
  ],
  [
    "의료정보시스템",
    "ဆေးပညာ သတင်းအချက်အလက် စနစ်",
    "Medical",
    "의료정보시스템을 구축합니다.",
    "I build health information systems."
  ],
  [
    "전자의무기록",
    "အီလက်ထရွန်နစ် ဆေးဘက် မှတ်တမ်း",
    "Medical",
    "전자의무기록을 관리합니다.",
    "I manage electronic health records."
  ],
  [
    "원격모니터링",
    "အကွာအဝေး စောင့်ကြည့်မှု",
    "Medical",
    "원격모니터링을 구현합니다.",
    "I implement remote monitoring."
  ],
  [
    "원격의료",
    "အကွာအဝေး ဆေးပညာ",
    "Medical",
    "원격의료를 제공합니다.",
    "I provide telemedicine."
  ],
  [
    "디지털치료",
    "ဒစ်ဂျစ်တယ် ကုသမှု",
    "Medical",
    "디지털치료를 개발합니다.",
    "I develop digital therapeutics."
  ],
  [
    "웨어러블헬스",
    "ဝတ်ဆင်နိုင်သော ကျန်းမာရေး",
    "Medical",
    "웨어러블헬스를 연구합니다.",
    "I study wearable health."
  ],
  [
    "건강데이터",
    "ကျန်းမာရေး ဒေတာ",
    "Medical",
    "건강데이터를 분석합니다.",
    "I analyze health data."
  ],
  [
    "예측의학",
    "ခန့်မှန်းသော ဆေးပညာ",
    "Medical",
    "예측의학을 전공합니다.",
    "I major in predictive medicine."
  ],
  [
    "디지털헬스케어",
    "ဒစ်ဂျစ်တယ် ကျန်းမာရေး စောင့်ရှောက်မှု",
    "Medical",
    "디지털헬스케어를 공부합니다.",
    "I study digital healthcare."
  ],
  [
    "의료AI",
    "ဆေးပညာ AI",
    "Medical",
    "의료AI를 개발합니다.",
    "I develop medical AI."
  ],
  [
    "로봇수술",
    "ရိုဘော့ ခွဲစိတ်မှု",
    "Medical",
    "로봇수술을 연구합니다.",
    "I study robotic surgery."
  ],
  [
    "나노의학",
    "နာနို ဆေးပညာ",
    "Medical",
    "나노의학을 전공합니다.",
    "I major in nanomedicine."
  ],
  [
    "바이오마커",
    "ဇီဝ အမှတ်အသား",
    "Medical",
    "바이오마커를 분석합니다.",
    "I analyze biomarkers."
  ],
  [
    "스마트미터",
    "စမတ် မီတာ",
    "Engineering",
    "스마트미터를 설치합니다.",
    "I install smart meters."
  ],
  [
    "에너지하베스팅",
    "စွမ်းအင် ရိတ်သိမ်းမှု",
    "Engineering",
    "에너지하베스팅을 연구합니다.",
    "I study energy harvesting."
  ],
  [
    "무선전력전송",
    "ဝိုင်ယာလက်မဲ့ လျှပ်စစ် ပို့ဆောင်မှု",
    "Engineering",
    "무선전력전송을 개발합니다.",
    "I develop wireless power transfer."
  ],
  [
    "초전도체",
    "စူပါ လျှပ်စစ် လမ်းကြောင်း",
    "Engineering",
    "초전도체를 연구합니다.",
    "I study superconductors."
  ],
  [
    "연료전지시스템",
    "လောင်စာ ဆဲလ် စနစ်",
    "Engineering",
    "연료전지시스템을 구축합니다.",
    "I build fuel cell systems."
  ],
  [
    "태양광시스템",
    "နေရောင်ခြည် စနစ်",
    "Engineering",
    "태양광시스템을 설계합니다.",
    "I design solar systems."
  ],
  [
    "풍력터빈",
    "လေအား တာဘိုင်",
    "Engineering",
    "풍력터빈을 개발합니다.",
    "I develop wind turbines."
  ],
  [
    "지열시스템",
    "မြေအောက်အပူ စနစ်",
    "Engineering",
    "지열시스템을 연구합니다.",
    "I study geothermal systems."
  ],
  [
    "바이오가스",
    "ဇီဝ ဓာတ်ငွေ့",
    "Environment",
    "바이오가스를 생산합니다.",
    "I produce biogas."
  ],
  [
    "수소경제",
    "ဟိုက်ဒရိုဂျင် စီးပွားရေး",
    "Environment",
    "수소경제를 구축합니다.",
    "I build hydrogen economy."
  ],
  [
    "신재생에너지",
    "ခေတ်သစ် ပြန်လည်ပြည့်ဖြိုးမြဲ စွမ်းအင်",
    "Environment",
    "신재생에너지를 개발합니다.",
    "We develop new renewable energy."
  ],
  [
    "태양광발전",
    "နေရောင်ခြည် လျှပ်စစ်",
    "Environment",
    "태양광발전을 연구합니다.",
    "I study solar power generation."
  ],
  [
    "풍력발전",
    "လေအား လျှပ်စစ်",
    "Environment",
    "풍력발전을 전공합니다.",
    "I major in wind power generation."
  ],
  [
    "수력발전",
    "ရေအား လျှပ်စစ်",
    "Environment",
    "수력발전을 공부합니다.",
    "I study hydroelectric power generation."
  ],
  [
    "지열발전",
    "မြေအောက်အပူ လျှပ်စစ်",
    "Environment",
    "지열발전을 연구합니다.",
    "I study geothermal power generation."
  ],
  [
    "조력발전",
    "ဒီရေ လျှပ်စစ်",
    "Environment",
    "조력발전을 전공합니다.",
    "I major in tidal power generation."
  ],
  [
    "파력발전",
    "လှိုင်း လျှပ်စစ်",
    "Environment",
    "파력발전을 공부합니다.",
    "I study wave power generation."
  ],
  [
    "바이오에너지",
    "ဇီဝ စွမ်းအင်",
    "Environment",
    "바이오에너지를 연구합니다.",
    "I study bioenergy."
  ],
  [
    "수소에너지",
    "ဟိုက်ဒရိုဂျင် စွမ်းအင်",
    "Environment",
    "수소에너지를 전공합니다.",
    "I major in hydrogen energy."
  ],
  [
    "연료전지",
    "လောင်စာ ဆဲလ်",
    "Environment",
    "연료전지를 개발합니다.",
    "I develop fuel cells."
  ],
  [
    "협동로봇",
    "ပူးပေါင်းသော ရိုဘော့",
    "Engineering",
    "협동로봇을 개발합니다.",
    "I develop collaborative robots."
  ],
  [
    "스와암로봇",
    "အုပ်စု ရိုဘော့",
    "Engineering",
    "스와암로봇을 연구합니다.",
    "I study swarm robots."
  ],
  [
    "소프트로봇",
    "ပျော့ပျောင်းသော ရိုဘော့",
    "Engineering",
    "소프트로봇을 전공합니다.",
    "I major in soft robots."
  ],
  [
    "바이오로봇",
    "ဇီဝ ရိုဘော့",
    "Engineering",
    "바이오로봇을 공부합니다.",
    "I study bio-robots."
  ],
  [
    "나노로봇",
    "နာနို ရိုဘော့",
    "Engineering",
    "나노로봇을 연구합니다.",
    "I study nanorobots."
  ],
  [
    "의료로봇",
    "ဆေးပညာ ရိုဘော့",
    "Engineering",
    "의료로봇을 개발합니다.",
    "I develop medical robots."
  ],
  [
    "산업자동화",
    "စက်မှု အလိုအလျောက်",
    "Engineering",
    "산업자동화를 구축합니다.",
    "I build industrial automation."
  ],
  [
    "프로세스자동화",
    "လုပ်ငန်းစဉ် အလိုအလျောက်",
    "Engineering",
    "프로세스자동화를 연구합니다.",
    "I study process automation."
  ],
  [
    "지능형자동화",
    "ဉာဏ်ရည် အလိုအလျောက်",
    "Engineering",
    "지능형자동화를 전공합니다.",
    "I major in intelligent automation."
  ],
  [
    "로봇공학",
    "ရိုဘော့ အင်ဂျင်နီယာ",
    "Engineering",
    "로봇공학을 공부합니다.",
    "I study robotics engineering."
  ],
  [
    "산업로봇",
    "စက်မှု ရိုဘော့",
    "Engineering",
    "산업로봇을 개발합니다.",
    "I develop industrial robots."
  ],
  [
    "서비스로봇",
    "ဝန်ဆောင်မှု ရိုဘော့",
    "Engineering",
    "서비스로봇을 연구합니다.",
    "I study service robots."
  ],
  [
    "농업로봇",
    "စိုက်ပျိုးရေး ရိုဘော့",
    "Engineering",
    "농업로봇을 전공합니다.",
    "I major in agricultural robots."
  ],
  [
    "가정로봇",
    "အိမ် ရိုဘော့",
    "Engineering",
    "가정로봇을 연구합니다.",
    "I study home robots."
  ],
  [
    "교육로봇",
    "ပညာရေး ရိုဘော့",
    "Engineering",
    "교육로봇을 전공합니다.",
    "I major in educational robots."
  ],
  [
    "엔터테인먼트로봇",
    "ဖျော်ဖြေရေး ရိုဘော့",
    "Engineering",
    "엔터테인먼트로봇을 공부합니다.",
    "I study entertainment robots."
  ],
  [
    "군사로봇",
    "စစ်ရေး ရိုဘော့",
    "Engineering",
    "군사로봇을 연구합니다.",
    "I study military robots."
  ],
  [
    "탐사로봇",
    "စူးစမ်းရှာဖွေရေး ရိုဘော့",
    "Engineering",
    "탐사로봇을 전공합니다.",
    "I major in exploration robots."
  ],
  [
    "인간형로봇",
    "လူပုံစံ ရိုဘော့",
    "Engineering",
    "인간형로봇을 공부합니다.",
    "I study humanoid robots."
  ],
  [
    "인공지능로봇",
    "လူလုပ်ဉာဏ်ရည် ရိုဘော့",
    "Engineering",
    "인공지능로봇을 개발합니다.",
    "I develop AI robots."
  ],
  [
    "사이버물리시스템",
    "ဆိုက်ဘာ ရုပ်ပိုင်း စနစ်",
    "Technology",
    "사이버물리시스템을 구축합니다.",
    "I build cyber-physical systems."
  ],
  [
    "인터넷오브싱스",
    "အရာဝတ္ထု အင်တာနက်",
    "Technology",
    "인터넷오브싱스를 개발합니다.",
    "I develop Internet of Things."
  ],
  [
    "산업인터넷",
    "စက်မှု အင်တာနက်",
    "Technology",
    "산업인터넷을 연구합니다.",
    "I study industrial internet."
  ],
  [
    "사물지능",
    "အရာဝတ္ထု ဉာဏ်ရည်",
    "Technology",
    "사물지능을 전공합니다.",
    "I major in artificial intelligence of things."
  ],
  [
    "엣지컴퓨팅",
    "အစွန်း ကွန်ပျူတာ",
    "Technology",
    "엣지컴퓨팅을 연구합니다.",
    "I study edge computing."
  ],
  [
    "포그컴퓨팅",
    "မြူ ကွန်ပျူတာ",
    "Technology",
    "포그컴퓨팅을 공부합니다.",
    "I study fog computing."
  ],
  [
    "메시네트워크",
    "ပိုက်ကွန် ကွန်ရက်",
    "Technology",
    "메시네트워크를 개발합니다.",
    "I develop mesh networks."
  ],
  [
    "소프트웨어정의네트워크",
    "ဆော့ဖ်ဝဲ သတ်မှတ်သော ကွန်ရက်",
    "Technology",
    "소프트웨어정의네트워크를 전공합니다.",
    "I major in SDN."
  ],
  [
    "네트워크가상화",
    "ကွန်ရက် အတုအယောင်",
    "Technology",
    "네트워크가상화를 연구합니다.",
    "I study network virtualization."
  ],
  [
    "양자인터넷",
    "ကွမ်တမ် အင်တာနက်",
    "Technology",
    "양자인터넷을 개발합니다.",
    "I develop quantum internet."
  ],
  [
    "5G",
    "5G",
    "Technology",
    "5G를 구축합니다.",
    "I build 5G."
  ],
  [
    "6G",
    "6G",
    "Technology",
    "6G를 연구합니다.",
    "I study 6G."
  ],
  [
    "사물인터넷",
    "အရာဝတ္ထု အင်တာနက်",
    "Technology",
    "사물인터넷을 개발합니다.",
    "I develop IoT."
  ],
  [
    "초저지연통신",
    "စူပါ နှောင့်နှေးမှု ဆက်သွယ်ရေး",
    "Technology",
    "초저지연통신을 개발합니다.",
    "I develop ultra-low latency communication."
  ],
  [
    "블록체인금융",
    "ဘလော့ခ်ချိန်း ငွေကြေး",
    "Finance",
    "블록체인금융을 개발합니다.",
    "I develop blockchain finance."
  ],
  [
    "디지털자산",
    "ဒစ်ဂျစ်တယ် အရင်းအမြစ်",
    "Finance",
    "디지털자산을 관리합니다.",
    "I manage digital assets."
  ],
  [
    "탈중앙화금융",
    "ဗဟိုမဲ့ ငွေကြေး",
    "Finance",
    "탈중앙화금융을 전공합니다.",
    "I major in DeFi."
  ],
  [
    "크라우드펀딩",
    "လူထု ငွေကြေးထောက်ပံ့မှု",
    "Finance",
    "크라우드펀딩을 공부합니다.",
    "I study crowdfunding."
  ],
  [
    "핀테크혁신",
    "ဖင်တက် ဆန်းသစ်မှု",
    "Finance",
    "핀테크혁신을 연구합니다.",
    "I study fintech innovation."
  ],
  [
    "디지털지갑",
    "ဒစ်ဂျစ်တယ် ပိုက်ဆံအိတ်",
    "Finance",
    "디지털지갑을 개발합니다.",
    "I develop digital wallets."
  ],
  [
    "암호화폐거래소",
    "လျှို့ဝှက်ကုဒ် ငွေကြေး ကုန်သွယ်ရေး",
    "Finance",
    "암호화폐거래소를 운영합니다.",
    "I operate cryptocurrency exchanges."
  ],
  [
    "토큰경제",
    "တိုကန် စီးပွားရေး",
    "Finance",
    "토큰경제를 분석합니다.",
    "I analyze token economy."
  ],
  [
    "디지털중앙은행화폐",
    "ဒစ်ဂျစ်တယ် ဗဟို ဘဏ် ငွေကြေး",
    "Finance",
    "디지털중앙은행화폐를 연구합니다.",
    "I study CBDC."
  ],
  [
    "스마트계약",
    "စမတ် စာချုပ်",
    "Finance",
    "스마트계약을 연구합니다.",
    "I study smart contracts."
  ],
  [
    "블록체인",
    "ဘလော့ခ်ချိန်း",
    "Technology",
    "블록체인을 개발합니다.",
    "I develop blockchain."
  ],
  [
    "분산원장",
    "ဖြန့်ဝေသော စာအုပ်",
    "Technology",
    "분산원장을 전공합니다.",
    "I major in distributed ledger."
  ],
  [
    "암호화폐",
    "လျှို့ဝှက်ကုဒ် ငွေကြေး",
    "Finance",
    "암호화폐를 거래합니다.",
    "I trade cryptocurrency."
  ],
  [
    "디파이",
    "ဒီဖိုင်း",
    "Finance",
    "디파이를 연구합니다.",
    "I study DeFi."
  ],
  [
    "NFT",
    "NFT",
    "Technology",
    "NFT를 생성합니다.",
    "I create NFTs."
  ],
  [
    "웹3",
    "ဝက်ဘ် 3",
    "Technology",
    "웹3를 개발합니다.",
    "I develop Web3."
  ],
  [
    "메타버스",
    "မက်တာဗာ့စ်",
    "Technology",
    "메타버스를 구축합니다.",
    "I build metaverse."
  ],
  [
    "가상자산",
    "အတုအယောင် အရင်းအမြစ်",
    "Finance",
    "가상자산을 관리합니다.",
    "I manage virtual assets."
  ],
  [
    "토큰화",
    "တိုကန် ပြုလုပ်မှု",
    "Technology",
    "토큰화를 연구합니다.",
    "I study tokenization."
  ],
  [
    "소셜미디어분석",
    "လူမှုရေး မီဒီယာ ခွဲခြမ်းစိတ်ဖြာမှု",
    "Social Science",
    "소셜미디어분석을 수행합니다.",
    "I perform social media analysis."
  ],
  [
    "데이터저널리즘",
    "ဒေတာ သတင်းစာပညာ",
    "Social Science",
    "데이터저널리즘을 전공합니다.",
    "I major in data journalism."
  ],
  [
    "컴퓨터보조인문학",
    "ကွန်ပျူတာ အကူအညီ လူမှုရေး",
    "Social Science",
    "컴퓨터보조인문학을 공부합니다.",
    "I study computational humanities."
  ],
  [
    "디지털고고학",
    "ဒစ်ဂျစ်တယ် ရှေးဟောင်း",
    "Social Science",
    "디지털고고학을 연구합니다.",
    "I study digital archaeology."
  ],
  [
    "가상인류학",
    "အတုအယောင် လူမှုရေး",
    "Social Science",
    "가상인류학을 전공합니다.",
    "I major in virtual anthropology."
  ],
  [
    "디지털사회학",
    "ဒစ်ဂျစ်တယ် လူမှုရေး",
    "Social Science",
    "디지털사회학을 공부합니다.",
    "I study digital sociology."
  ],
  [
    "네트워크분석",
    "ကွန်ရက် ခွဲခြမ်းစိတ်ဖြာမှု",
    "Social Science",
    "네트워크분석을 연구합니다.",
    "I study network analysis."
  ],
  [
    "빅데이터사회과학",
    "ကြီးမားသော ဒေတာ လူမှုရေး သိပ္ပံ",
    "Social Science",
    "빅데이터사회과학을 전공합니다.",
    "I major in big data social science."
  ],
  [
    "디지털정치학",
    "ဒစ်ဂျစ်တယ် နိုင်ငံရေး",
    "Social Science",
    "디지털정치학을 공부합니다.",
    "I study digital political science."
  ],
  [
    "디지털인문학",
    "ဒစ်ဂျစ်တယ် လူမှုရေး",
    "Social Science",
    "디지털인문학을 연구합니다.",
    "I study digital humanities."
  ],
  [
    "철학",
    "ဒဿနိကဗေဒ",
    "Abstract concepts",
    "철학은 삶의 의미를 탐구합니다.",
    "Philosophy explores the meaning of life."
  ],
  [
    "윤리",
    "ကျင့်ဝတ်",
    "Abstract concepts",
    "윤리적 판단이 필요합니다.",
    "Ethical judgment is needed."
  ],
  [
    "도덕",
    "ကျင့်ဝတ်",
    "Abstract concepts",
    "도덕적 가치를 존중해야 합니다.",
    "We must respect moral values."
  ],
  [
    "양심",
    "စိတ်နှလုံး",
    "Abstract concepts",
    "양심에 따라 행동하세요.",
    "Act according to your conscience."
  ],
  [
    "정의",
    "တရားမျှတမှု",
    "Abstract concepts",
    "사회적 정의를 추구합니다.",
    "We pursue social justice."
  ],
  [
    "자유",
    "လွတ်လပ်မှု",
    "Abstract concepts",
    "자유는 소중한 권리입니다.",
    "Freedom is a precious right."
  ],
  [
    "평등",
    "ညီမျှမှု",
    "Abstract concepts",
    "모든 사람은 평등합니다.",
    "All people are equal."
  ],
  [
    "존엄",
    "ဂုဏ်သိက္ခာ",
    "Abstract concepts",
    "인간의 존엄을 지켜야 합니다.",
    "We must protect human dignity."
  ],
  [
    "열정",
    "စိတ်အားထက်သန်မှု",
    "Psychology",
    "그는 일에 대한 열정이 넘칩니다.",
    "He has overflowing passion for work."
  ],
  [
    "동기",
    "စိတ်အားထက်သန်မှု",
    "Psychology",
    "학습 동기를 높여야 합니다.",
    "We must increase learning motivation."
  ],
  [
    "자존감",
    "ကိုယ့်ကိုယ်ကို ယုံကြည်မှု",
    "Psychology",
    "자존감을 키우는 것이 중요합니다.",
    "Building self-esteem is important."
  ],
  [
    "공감",
    "စာနာမှု",
    "Psychology",
    "다른 사람의 감정에 공감하세요.",
    "Empathize with others' emotions."
  ],
  [
    "회복력",
    "ပြန်လည်ထူထောင်နိုင်စွမ်း",
    "Psychology",
    "어려움을 극복하는 회복력이 필요합니다.",
    "Resilience to overcome difficulties is needed."
  ],
  [
    "인내",
    "စိတ်ရှည်မှု",
    "Psychology",
    "인내는 성공의 열쇠입니다.",
    "Patience is the key to success."
  ],
  [
    "집중력",
    "စူးစိုက်မှု",
    "Psychology",
    "집중력을 향상시켜야 합니다.",
    "We must improve concentration."
  ],
  [
    "창의성",
    "ဖန်တီးနိုင်စွမ်း",
    "Psychology",
    "창의성을 발휘하세요.",
    "Demonstrate creativity."
  ],
  [
    "경영",
    "စီမံခန့်ခွဲမှု",
    "Business",
    "경영 전략을 수립했습니다.",
    "We established a management strategy."
  ],
  [
    "마케팅",
    "စျေးကွက်ရှာဖွေရေး",
    "Business",
    "디지털 마케팅이 중요합니다.",
    "Digital marketing is important."
  ],
  [
    "재무",
    "ဘဏ္ဍာရေး",
    "Business",
    "재무 상태를 점검하세요.",
    "Check your financial status."
  ],
  [
    "투자",
    "ရင်းနှီးမြှုပ်နှံမှု",
    "Business",
    "장기 투자를 고려하세요.",
    "Consider long-term investment."
  ],
  [
    "자산",
    "ပိုင်ဆိုင်မှု",
    "Business",
    "자산을 관리하는 것이 중요합니다.",
    "Managing assets is important."
  ],
  [
    "부채",
    "ကြွေးမြီ",
    "Business",
    "부채를 줄여야 합니다.",
    "We must reduce debt."
  ],
  [
    "손실",
    "အရှုံး",
    "Business",
    "예상치 못한 손실이 발생했습니다.",
    "Unexpected loss occurred."
  ],
  [
    "인수",
    "ဝယ်ယူမှု",
    "Business",
    "회사 인수를 검토 중입니다.",
    "We are reviewing company acquisition."
  ],
  [
    "합병",
    "ပေါင်းစည်းမှု",
    "Business",
    "두 회사의 합병이 발표되었습니다.",
    "The merger of two companies was announced."
  ],
  [
    "학문",
    "ပညာရး",
    "Education",
    "학문적 탐구가 필요합니다.",
    "Academic inquiry is needed."
  ],
  [
    "연구",
    "သုတေသန",
    "Education",
    "과학 연구를 진행 중입니다.",
    "We are conducting scientific research."
  ],
  [
    "논문",
    "စာတမ်း",
    "Education",
    "논문을 발표했습니다.",
    "I presented a thesis."
  ],
  [
    "이론",
    "သီအိုရီ",
    "Education",
    "이론을 실제에 적용하세요.",
    "Apply theory to practice."
  ],
  [
    "실험",
    "စမ်းသပ်မှု",
    "Education",
    "실험 결과를 분석하세요.",
    "Analyze the experimental results."
  ],
  [
    "가설",
    "အယူအဆ",
    "Education",
    "가설을 검증해야 합니다.",
    "We must verify the hypothesis."
  ],
  [
    "분석",
    "ခွဲခြမ်းစိတ်ဖြာမှု",
    "Education",
    "데이터를 분석하세요.",
    "Analyze the data."
  ],
  [
    "증명",
    "သက်သေပြမှု",
    "Education",
    "이론을 증명했습니다.",
    "I proved the theory."
  ],
  [
    "논증",
    "အထောက်အထားပြမှု",
    "Education",
    "논증이 설득력이 있습니다.",
    "The argument is persuasive."
  ],
  [
    "학술",
    "ပညာရး",
    "Education",
    "학술 회의에 참석했습니다.",
    "I attended an academic conference."
  ],
  [
    "알고리즘",
    "အယ်လ်ဂိုရီသမ်",
    "Technology",
    "효율적인 알고리즘을 개발했습니다.",
    "I developed an efficient algorithm."
  ],
  [
    "프로그래밍",
    "ပရိုဂရမ်ရေးသားခြင်း",
    "Technology",
    "프로그래밍 언어를 배우세요.",
    "Learn programming languages."
  ],
  [
    "데이터베이스",
    "ဒေတာဘေ့စ်",
    "Technology",
    "데이터베이스를 설계하세요.",
    "Design the database."
  ],
  [
    "네트워크",
    "ကွန်ရက်",
    "Technology",
    "네트워크 보안이 중요합니다.",
    "Network security is important."
  ],
  [
    "인공지능",
    "လူလုပ်ဉာဏ်ရည်",
    "Technology",
    "인공지능 기술이 발전했습니다.",
    "AI technology has advanced."
  ],
  [
    "바이오테크놀로지",
    "ဇီဝနည်းပညာ",
    "Science",
    "바이오테크놀로지 산업이 성장 중입니다.",
    "The biotechnology industry is growing."
  ],
  [
    "나노기술",
    "နာနိုနည်းပညာ",
    "Science",
    "나노기술의 응용이 확대됩니다.",
    "Applications of nanotechnology are expanding."
  ],
  [
    "유전자",
    "မျိုးရိုးဗီဇ",
    "Science",
    "유전자 분석을 실시했습니다.",
    "We conducted genetic analysis."
  ],
  [
    "분자",
    "မော်လီကျူး",
    "Science",
    "분자 구조를 연구합니다.",
    "I study molecular structure."
  ],
  [
    "분석하다",
    "ခွဲခြမ်းစိတ်ဖြာသည်",
    "Advanced verbs",
    "문제를 분석하세요.",
    "Analyze the problem."
  ],
  [
    "평가하다",
    "အကဲဖြတ်သည်",
    "Advanced verbs",
    "성과를 평가하세요.",
    "Evaluate the performance."
  ],
  [
    "검토하다",
    "စစ်ဆေးသည်",
    "Advanced verbs",
    "문서를 검토하세요.",
    "Review the document."
  ],
  [
    "검증하다",
    "အတည်ပြုသည်",
    "Advanced verbs",
    "정보를 검증하세요.",
    "Verify the information."
  ],
  [
    "최적화하다",
    "အကောင်းဆုံးဖြစ်အောင် လုပ်သည်",
    "Advanced verbs",
    "시스템을 최적화하세요.",
    "Optimize the system."
  ],
  [
    "통합하다",
    "ပေါင်းစည်းသည်",
    "Advanced verbs",
    "데이터를 통합하세요.",
    "Integrate the data."
  ],
  [
    "구현하다",
    "အကောင်အထည်ဖော်သည်",
    "Advanced verbs",
    "계획을 구현하세요.",
    "Implement the plan."
  ],
  [
    "개발하다",
    "ဖွံ့ဖြိုးစေသည်",
    "Advanced verbs",
    "새로운 기술을 개발하세요.",
    "Develop new technology."
  ],
  [
    "혁신하다",
    "ဆန်းသစ်တီထွင်သည်",
    "Advanced verbs",
    "비즈니스를 혁신하세요.",
    "Innovate the business."
  ],
  [
    "전문화하다",
    "အထူးပြုသည်",
    "Advanced verbs",
    "지식을 전문화하세요.",
    "Specialize your knowledge."
  ],
  [
    "효율적인",
    "ထိရောက်သော",
    "Advanced adjectives",
    "효율적인 방법을 찾으세요.",
    "Find an efficient method."
  ],
  [
    "체계적인",
    "စနစ်ကျသော",
    "Advanced adjectives",
    "체계적인 접근이 필요합니다.",
    "A systematic approach is needed."
  ],
  [
    "전문적인",
    "ကျွမ်းကျင်သော",
    "Advanced adjectives",
    "전문적인 조언을 구하세요.",
    "Seek professional advice."
  ],
  [
    "혁신적인",
    "ဆန်းသစ်သော",
    "Advanced adjectives",
    "혁신적인 아이디어입니다.",
    "It's an innovative idea."
  ],
  [
    "지속가능한",
    "ရေရှည်တည်တံ့သော",
    "Advanced adjectives",
    "지속가능한 발전이 중요합니다.",
    "Sustainable development is important."
  ],
  [
    "복합적인",
    "ရှုပ်ထွေးသော",
    "Advanced adjectives",
    "복합적인 문제를 해결하세요.",
    "Solve complex problems."
  ],
  [
    "정교한",
    "အနုစိတ်သော",
    "Advanced adjectives",
    "정교한 설계가 필요합니다.",
    "Precise design is needed."
  ],
  [
    "포괄적인",
    "ကျယ်ပြန့်သော",
    "Advanced adjectives",
    "포괄적인 계획을 수립하세요.",
    "Establish a comprehensive plan."
  ],
  [
    "본질적인",
    "အခြေခံသော",
    "Advanced adjectives",
    "본질적인 문제를 파악하세요.",
    "Understand the fundamental problem."
  ],
  [
    "전략적인",
    "နည်းဗျူဟာဆိုင်ရာ",
    "Advanced adjectives",
    "전략적인 사고가 필요합니다.",
    "Strategic thinking is needed."
  ],
  [
    "법률",
    "ဥပဒေ",
    "Legal",
    "법률을 준수하세요.",
    "Comply with the law."
  ],
  [
    "헌법",
    "ဖွဲ့စည်းပုံအခြေခံဥပဒေ",
    "Legal",
    "헌법을 존중해야 합니다.",
    "We must respect the constitution."
  ],
  [
    "소송",
    "တရားစွဲဆိုမှု",
    "Legal",
    "소송을 제기했습니다.",
    "I filed a lawsuit."
  ],
  [
    "판결",
    "ဆုံးဖြတ်ချက်",
    "Legal",
    "법원의 판결을 기다립니다.",
    "We await the court's judgment."
  ],
  [
    "변호사",
    "ရှေ့နေ",
    "Legal",
    "변호사를 선임하세요.",
    "Appoint a lawyer."
  ],
  [
    "증인",
    "သက်သေ",
    "Legal",
    "증인을 소환했습니다.",
    "We summoned a witness."
  ],
  [
    "증거",
    "အထောက်အထား",
    "Legal",
    "증거를 제시하세요.",
    "Present evidence."
  ],
  [
    "정책",
    "မူဝါဒ",
    "Government",
    "정부 정책을 검토하세요.",
    "Review government policy."
  ],
  [
    "입법",
    "ဥပဒေပြုရေး",
    "Government",
    "입법 과정에 참여합니다.",
    "I participate in the legislative process."
  ],
  [
    "행정",
    "စီမံခန့်ခွဲရေး",
    "Government",
    "행정 개혁이 필요합니다.",
    "Administrative reform is needed."
  ],
  [
    "진단",
    "ရောဂါရှာဖွေမှု",
    "Medical",
    "정확한 진단이 중요합니다.",
    "Accurate diagnosis is important."
  ],
  [
    "치료",
    "ကုသမှု",
    "Medical",
    "효과적인 치료를 받으세요.",
    "Receive effective treatment."
  ],
  [
    "수술",
    "ခွဲစိတ်ကုသမှု",
    "Medical",
    "수술이 성공적으로 완료되었습니다.",
    "The surgery was completed successfully."
  ],
  [
    "처방",
    "ဆေးညွှန်း",
    "Medical",
    "의사의 처방을 따르세요.",
    "Follow the doctor's prescription."
  ],
  [
    "증상",
    "ရောဂါလက္ခဏာ",
    "Medical",
    "증상을 관찰하세요.",
    "Observe the symptoms."
  ],
  [
    "면역",
    "ကိုယ်ခံအား",
    "Medical",
    "면역력을 강화하세요.",
    "Strengthen your immunity."
  ],
  [
    "예방",
    "ကာကွယ်မှု",
    "Medical",
    "질병 예방이 중요합니다.",
    "Disease prevention is important."
  ],
  [
    "재활",
    "ပြန်လည်ထူထောင်ရေး",
    "Medical",
    "재활 치료를 받습니다.",
    "I receive rehabilitation therapy."
  ],
  [
    "영양",
    "အာဟာရ",
    "Medical",
    "균형 잡힌 영양을 섭취하세요.",
    "Consume balanced nutrition."
  ],
  [
    "건강검진",
    "ကျန်းမာရေး စစ်ဆေးမှု",
    "Medical",
    "정기적인 건강검진을 받으세요.",
    "Get regular health checkups."
  ],
  [
    "생태계",
    "ဂေဟစနစ်",
    "Environment",
    "생태계를 보호하세요.",
    "Protect the ecosystem."
  ],
  [
    "환경보호",
    "ပတ်ဝန်းကျင် ကာကွယ်ရေး",
    "Environment",
    "환경보호에 참여하세요.",
    "Participate in environmental protection."
  ],
  [
    "재생에너지",
    "ပြန်လည်ပြည့်ဖြိုးမြဲ စွမ်းအင်",
    "Environment",
    "재생에너지를 활용하세요.",
    "Utilize renewable energy."
  ],
  [
    "지속가능성",
    "ရေရှည်တည်တံ့မှု",
    "Environment",
    "지속가능성을 고려하세요.",
    "Consider sustainability."
  ],
  [
    "기후변화",
    "ရာသီဥတု ပြောင်းလဲမှု",
    "Environment",
    "기후변화에 대응하세요.",
    "Respond to climate change."
  ],
  [
    "오염",
    "ညစ်ညမ်းမှု",
    "Environment",
    "환경 오염을 줄이세요.",
    "Reduce environmental pollution."
  ],
  [
    "재활용",
    "ပြန်လည်အသုံးပြုမှု",
    "Environment",
    "재활용을 실천하세요.",
    "Practice recycling."
  ],
  [
    "보전",
    "ထိန်းသိမ်းမှု",
    "Environment",
    "자연을 보전하세요.",
    "Conserve nature."
  ],
  [
    "예술",
    "အနုပညာ",
    "Arts",
    "예술 작품을 감상하세요.",
    "Appreciate art works."
  ],
  [
    "문학",
    "စာပေ",
    "Arts",
    "문학 작품을 읽으세요.",
    "Read literary works."
  ],
  [
    "미술",
    "ပန်းချီ",
    "Arts",
    "미술 전시회에 가세요.",
    "Go to an art exhibition."
  ],
  [
    "음악",
    "ဂီတ",
    "Arts",
    "클래식 음악을 듣습니다.",
    "I listen to classical music."
  ],
  [
    "연극",
    "ပြဇာတ်",
    "Arts",
    "연극을 관람하세요.",
    "Watch a play."
  ],
  [
    "무용",
    "ကခုန်မှု",
    "Arts",
    "무용 공연을 봅니다.",
    "I watch a dance performance."
  ],
  [
    "조각",
    "ရုပ်တု",
    "Arts",
    "조각 작품을 만듭니다.",
    "I create sculpture works."
  ],
  [
    "건축",
    "ဗိသုကာ",
    "Arts",
    "건축 디자인을 공부합니다.",
    "I study architectural design."
  ],
  [
    "사회",
    "လူ့အဖွဲ့အစည်း",
    "Society",
    "사회 문제를 해결하세요.",
    "Solve social problems."
  ],
  [
    "문화",
    "ယဉ်ကျေးမှု",
    "Society",
    "다양한 문화를 존중하세요.",
    "Respect diverse cultures."
  ],
  [
    "전통",
    "ရိုးရာ",
    "Society",
    "전통을 보존하세요.",
    "Preserve traditions."
  ],
  [
    "관습",
    "ထုံးတမ်း",
    "Society",
    "지역 관습을 이해하세요.",
    "Understand local customs."
  ],
  [
    "정체성",
    "အထောက်အထား",
    "Society",
    "문화적 정체성을 찾으세요.",
    "Find your cultural identity."
  ],
  [
    "다양성",
    "ကွဲပြားမှု",
    "Society",
    "다양성을 인정하세요.",
    "Recognize diversity."
  ],
  [
    "포용",
    "လက်ခံမှု",
    "Society",
    "서로를 포용하세요.",
    "Embrace each other."
  ],
  [
    "연대",
    "ညီညွတ်မှု",
    "Society",
    "사회적 연대가 필요합니다.",
    "Social solidarity is needed."
  ],
  [
    "암호화",
    "လျှို့ဝှက်ကုဒ်",
    "Technology",
    "데이터를 암호화하세요.",
    "Encrypt the data."
  ],
  [
    "해킹",
    "ဟက်ကာတိုက်ခိုက်မှု",
    "Technology",
    "해킹을 방지하세요.",
    "Prevent hacking."
  ],
  [
    "클라우드",
    "ကလောက်ဒ်",
    "Technology",
    "클라우드 서비스를 이용하세요.",
    "Use cloud services."
  ],
  [
    "빅데이터",
    "ကြီးမားသော ဒေတာ",
    "Technology",
    "빅데이터를 분석하세요.",
    "Analyze big data."
  ],
  [
    "사이버보안",
    "ဆိုက်ဘာ လုံခြုံရေး",
    "Technology",
    "사이버보안이 중요합니다.",
    "Cybersecurity is important."
  ],
  [
    "머신러닝",
    "စက်သင်ယူမှု",
    "Technology",
    "머신러닝 모델을 개발합니다.",
    "I develop machine learning models."
  ],
  [
    "양자컴퓨팅",
    "ကွမ်တမ် ကွန်ပျူတာ",
    "Technology",
    "양자컴퓨팅의 잠재력이 큽니다.",
    "Quantum computing has great potential."
  ],
  [
    "생명공학",
    "ဇီဝနည်းပညာ",
    "Medical",
    "생명공학 연구를 진행합니다.",
    "We conduct biotechnology research."
  ],
  [
    "유전공학",
    "မျိုးရိုးဗီဇ အင်ဂျင်နီယာ",
    "Medical",
    "유전공학의 윤리를 논의합니다.",
    "We discuss the ethics of genetic engineering."
  ],
  [
    "면역학",
    "ကိုယ်ခံအား သိပ္ပံ",
    "Medical",
    "면역학을 전공합니다.",
    "I major in immunology."
  ],
  [
    "신경과학",
    "အာရုံကြော သိပ္ပံ",
    "Medical",
    "신경과학 연구소에서 일합니다.",
    "I work at a neuroscience research institute."
  ],
  [
    "약리학",
    "ဆေးဝါး သိပ္ပံ",
    "Medical",
    "약리학을 공부합니다.",
    "I study pharmacology."
  ],
  [
    "해부학",
    "ခန္ဓာဗေဒ",
    "Medical",
    "해부학 수업을 듣습니다.",
    "I attend anatomy classes."
  ],
  [
    "생리학",
    "ဇီဝကမ္မဗေဒ",
    "Medical",
    "생리학 실험을 합니다.",
    "I conduct physiology experiments."
  ],
  [
    "병리학",
    "ရောဂါဗေဒ",
    "Medical",
    "병리학 진단을 받았습니다.",
    "I received a pathology diagnosis."
  ],
  [
    "방사선학",
    "ရေဒီယို",
    "Medical",
    "방사선학 검사를 받습니다.",
    "I undergo radiology examination."
  ],
  [
    "정신의학",
    "စိတ်ရောဂါကုသမှု",
    "Medical",
    "정신의학 상담을 받습니다.",
    "I receive psychiatric counseling."
  ],
  [
    "경제학",
    "စီးပွားရေး သိပ္ပံ",
    "Business",
    "경제학을 전공합니다.",
    "I major in economics."
  ],
  [
    "거시경제",
    "စုစုပေါင်း စီးပွားရေး",
    "Business",
    "거시경제 정책을 분석합니다.",
    "I analyze macroeconomic policies."
  ],
  [
    "미시경제",
    "အသေးစား စီးပွားရေး",
    "Business",
    "미시경제 이론을 공부합니다.",
    "I study microeconomic theory."
  ],
  [
    "금융",
    "ငွေရေး",
    "Business",
    "금융 시장을 모니터링합니다.",
    "I monitor financial markets."
  ],
  [
    "증권",
    "ငွေစက္ကူ",
    "Business",
    "증권 거래를 합니다.",
    "I trade securities."
  ],
  [
    "파생상품",
    "ဆင်းသက်လာသော ကုန်ပစ္စည်း",
    "Business",
    "파생상품 투자를 검토합니다.",
    "I review derivative investments."
  ],
  [
    "헤지펀드",
    "အကာအကွယ် ရန်ပုံငွေ",
    "Business",
    "헤지펀드에 투자합니다.",
    "I invest in hedge funds."
  ],
  [
    "벤처캐피털",
    "စွန့်စားရဲသော အရင်းအနှီး",
    "Business",
    "벤처캐피털을 유치합니다.",
    "We attract venture capital."
  ],
  [
    "IPO",
    "ပထမဆုံး လူထုရောင်းချမှု",
    "Business",
    "IPO를 준비 중입니다.",
    "We are preparing for an IPO."
  ],
  [
    "M&A",
    "ဝယ်ယူမှု နှင့် ပေါင်းစည်းမှု",
    "Business",
    "M&A 거래를 진행합니다.",
    "We proceed with M&A transactions."
  ],
  [
    "인문학",
    "လူသားတန်ဖိုး သိပ္ပံ",
    "Education",
    "인문학을 공부합니다.",
    "I study humanities."
  ],
  [
    "사회과학",
    "လူမှုရေး သိပ္ပံ",
    "Education",
    "사회과학 연구를 합니다.",
    "I conduct social science research."
  ],
  [
    "자연과학",
    "သဘာဝ သိပ္ပံ",
    "Education",
    "자연과학 실험을 합니다.",
    "I conduct natural science experiments."
  ],
  [
    "공학",
    "အင်ဂျင်နီယာ",
    "Education",
    "공학을 전공합니다.",
    "I major in engineering."
  ],
  [
    "인문사회과학",
    "လူသားတန်ဖိုး လူမှုရေး သိပ္ပံ",
    "Education",
    "인문사회과학 대학원에 다닙니다.",
    "I attend graduate school for humanities and social sciences."
  ],
  [
    "석사",
    "မဟာဘွဲ့",
    "Education",
    "석사 학위를 받았습니다.",
    "I received a master's degree."
  ],
  [
    "박사",
    "ဒေါက်တာ",
    "Education",
    "박사 학위를 취득합니다.",
    "I obtain a doctoral degree."
  ],
  [
    "박사후",
    "ဒေါက်တာ နောက်ပိုင်း",
    "Education",
    "박사후 연구를 합니다.",
    "I conduct postdoctoral research."
  ],
  [
    "학술지",
    "ပညာရး ဂျာနယ်",
    "Education",
    "학술지에 논문을 게재합니다.",
    "I publish a paper in an academic journal."
  ],
  [
    "동료심사",
    "အကဲဖြတ်မှု",
    "Education",
    "동료심사를 통과했습니다.",
    "I passed peer review."
  ],
  [
    "헌법재판소",
    "ဖွဲ့စည်းပုံအခြေခံဥပဒေ တရားရုံး",
    "Legal",
    "헌법재판소에 제소했습니다.",
    "I filed a lawsuit with the Constitutional Court."
  ],
  [
    "대법원",
    "အမြင့်ဆုံး တရားရုံး",
    "Legal",
    "대법원의 판결을 기다립니다.",
    "We await the Supreme Court's judgment."
  ],
  [
    "법원",
    "တရားရုံး",
    "Legal",
    "법원에 출두합니다.",
    "I appear in court."
  ],
  [
    "검찰",
    "ရှေ့နေချုပ်",
    "Legal",
    "검찰 수사를 받습니다.",
    "I undergo prosecution investigation."
  ],
  [
    "경찰",
    "ရဲ",
    "Legal",
    "경찰에 신고합니다.",
    "I report to the police."
  ],
  [
    "법령",
    "ဥပဒေ",
    "Legal",
    "법령을 준수하세요.",
    "Comply with laws and regulations."
  ],
  [
    "조례",
    "ဒေသန္တရ ဥပဒေ",
    "Legal",
    "지역 조례를 확인하세요.",
    "Check local ordinances."
  ],
  [
    "규정",
    "စည်းမျဉ်း",
    "Legal",
    "회사 규정을 따르세요.",
    "Follow company regulations."
  ],
  [
    "법적구속력",
    "ဥပဒေအရ ချုပ်နှောင်မှု",
    "Legal",
    "법적구속력이 있습니다.",
    "It has legal binding force."
  ],
  [
    "소멸시효",
    "အချိန်ကုန်ဆုံးမှု",
    "Legal",
    "소멸시효를 확인하세요.",
    "Check the statute of limitations."
  ],
  [
    "탄소중립",
    "ကာဗွန် ကြားနေရေး",
    "Environment",
    "탄소중립을 달성합니다.",
    "We achieve carbon neutrality."
  ],
  [
    "온실가스",
    "ဖန်လုံအိမ် ဓာတ်ငွေ့",
    "Environment",
    "온실가스 배출을 줄입니다.",
    "We reduce greenhouse gas emissions."
  ],
  [
    "친환경",
    "ပတ်ဝန်းကျင် နှင့် သင့်လျော်သော",
    "Environment",
    "친환경 제품을 사용하세요.",
    "Use eco-friendly products."
  ],
  [
    "재생가능",
    "ပြန်လည်ပြည့်ဖြိုးမြဲ",
    "Environment",
    "재생가능 에너지를 개발합니다.",
    "We develop renewable energy."
  ],
  [
    "생물다양성",
    "ဇီဝမျိုးစုံမျိုးကွဲ",
    "Environment",
    "생물다양성을 보존하세요.",
    "Preserve biodiversity."
  ],
  [
    "서식지",
    "နေထိုင်ရာ",
    "Environment",
    "야생동물 서식지를 보호하세요.",
    "Protect wildlife habitats."
  ],
  [
    "멸종위기",
    "မျိုးသုဉ်းရန် အန္တရာယ်",
    "Environment",
    "멸종위기 종을 보호합니다.",
    "We protect endangered species."
  ],
  [
    "자연보호구역",
    "သဘာဝ ကာကွယ်ထားသော နေရာ",
    "Environment",
    "자연보호구역을 방문합니다.",
    "I visit nature reserves."
  ],
  [
    "환경영향평가",
    "ပတ်ဝန်းကျင် သက်ရောက်မှု အကဲဖြတ်ခြင်း",
    "Environment",
    "환경영향평가를 실시합니다.",
    "We conduct environmental impact assessment."
  ],
  [
    "지속가능발전",
    "ရေရှည်တည်တံ့သော ဖွံ့ဖြိုးတိုးတက်မှု",
    "Environment",
    "지속가능발전 목표를 추구합니다.",
    "We pursue sustainable development goals."
  ],
  [
    "인지행동치료",
    "သိမြင်မှု အပြုအမူ ကုသမှု",
    "Psychology",
    "인지행동치료를 받습니다.",
    "I receive cognitive behavioral therapy."
  ],
  [
    "트라우마",
    "စိတ်ဒဏ်ရာ",
    "Psychology",
    "트라우마를 극복합니다.",
    "I overcome trauma."
  ],
  [
    "우울증",
    "စိတ်ဓာတ်ကျရောဂါ",
    "Psychology",
    "우울증 치료를 받습니다.",
    "I receive treatment for depression."
  ],
  [
    "불안장애",
    "စိုးရိမ်ပူပန်မှု ရောဂါ",
    "Psychology",
    "불안장애를 관리합니다.",
    "I manage anxiety disorder."
  ],
  [
    "강박증",
    "အတင်းအကျပ် ရောဂါ",
    "Psychology",
    "강박증 치료를 받습니다.",
    "I receive treatment for obsessive-compulsive disorder."
  ],
  [
    "자폐스펙트럼",
    "အော်တစ်ဇင် စပါကထရမ်",
    "Psychology",
    "자폐스펙트럼 장애를 이해합니다.",
    "I understand autism spectrum disorder."
  ],
  [
    "주의력결핍",
    "အာရုံစူးစိုက်မှု ချို့တဲ့မှု",
    "Psychology",
    "주의력결핍 과다행동장애를 진단받았습니다.",
    "I was diagnosed with attention deficit hyperactivity disorder."
  ],
  [
    "인격장애",
    "ကိုယ်ရည်ကိုယ်သွေး ရောဂါ",
    "Psychology",
    "인격장애를 치료합니다.",
    "I treat personality disorder."
  ],
  [
    "정신건강",
    "စိတ်ကျန်းမာရေး",
    "Psychology",
    "정신건강을 관리하세요.",
    "Manage your mental health."
  ],
  [
    "심리상담",
    "စိတ်ပိုင်းဆိုင်ရာ အကြံပေးမှု",
    "Psychology",
    "심리상담을 받습니다.",
    "I receive psychological counseling."
  ],
  [
    "문예창작",
    "စာပေ ဖန်တီးမှု",
    "Arts",
    "문예창작을 공부합니다.",
    "I study literary creation."
  ],
  [
    "시학",
    "ကဗျာ သိပ္ပံ",
    "Arts",
    "시학을 전공합니다.",
    "I major in poetics."
  ],
  [
    "수사학",
    "ဟောပြောမှု",
    "Arts",
    "수사학 기법을 배웁니다.",
    "I learn rhetorical techniques."
  ],
  [
    "비평",
    "ဝေဖန်မှု",
    "Arts",
    "문학 비평을 작성합니다.",
    "I write literary criticism."
  ],
  [
    "미학",
    "အလှအပ သိပ္ပံ",
    "Arts",
    "미학을 연구합니다.",
    "I study aesthetics."
  ],
  [
    "예술사",
    "အနုပညာ သမိုင်း",
    "Arts",
    "예술사를 강의합니다.",
    "I lecture on art history."
  ],
  [
    "조형예술",
    "ပုံဖော်အနုပညာ",
    "Arts",
    "조형예술 작품을 만듭니다.",
    "I create plastic art works."
  ],
  [
    "공연예술",
    "ဖျော်ဖြေတင်ဆက်သော အနုပညာ",
    "Arts",
    "공연예술을 감상합니다.",
    "I appreciate performing arts."
  ],
  [
    "영화학",
    "ရုပ်ရှင် သိပ္ပံ",
    "Arts",
    "영화학을 공부합니다.",
    "I study film studies."
  ],
  [
    "음악학",
    "ဂီတ သိပ္ပံ",
    "Arts",
    "음악학을 전공합니다.",
    "I major in musicology."
  ],
  [
    "천체물리학",
    "နက္ခတ္တဗေဒ ရူပဗေဒ",
    "Science",
    "천체물리학을 연구합니다.",
    "I study astrophysics."
  ],
  [
    "상대성이론",
    "အိုင်းစတိုင်း သီအိုရီ",
    "Science",
    "상대성이론을 이해합니다.",
    "I understand the theory of relativity."
  ],
  [
    "유전체학",
    "မျိုးရိုးဗီဇ သိပ္ပံ",
    "Science",
    "유전체학 연구를 합니다.",
    "I conduct genomics research."
  ],
  [
    "면역요법",
    "ကိုယ်ခံအား ကုသမှု",
    "Medical",
    "면역요법을 시도합니다.",
    "I try immunotherapy."
  ],
  [
    "항공우주공학",
    "လေကြောင်း အာကာသ အင်ဂျင်နီယာ",
    "Technology",
    "항공우주공학을 공부합니다.",
    "I study aerospace engineering."
  ],
  [
    "생체공학",
    "ဇီဝ အင်ဂျင်နီယာ",
    "Technology",
    "생체공학 연구를 합니다.",
    "I conduct biomedical engineering research."
  ],
  [
    "재료공학",
    "ပစ္စည်း အင်ဂျင်နီယာ",
    "Technology",
    "재료공학을 전공합니다.",
    "I major in materials engineering."
  ],
  [
    "화학공학",
    "ဓာတုဗေဒ အင်ဂျင်နီယာ",
    "Technology",
    "화학공학 실험을 합니다.",
    "I conduct chemical engineering experiments."
  ],
  [
    "전자공학",
    "အီလက်ထရွန်နစ် အင်ဂျင်နီယာ",
    "Technology",
    "전자공학을 공부합니다.",
    "I study electronic engineering."
  ],
  [
    "컴퓨터공학",
    "ကွန်ပျူတာ အင်ဂျင်နီယာ",
    "Technology",
    "컴퓨터공학을 전공합니다.",
    "I major in computer engineering."
  ],
  [
    "토목공학",
    "အဆောက်အဦ အင်ဂျင်နီယာ",
    "Technology",
    "토목공학 프로젝트를 진행합니다.",
    "I proceed with civil engineering projects."
  ],
  [
    "환경공학",
    "ပတ်ဝန်းကျင် အင်ဂျင်နီယာ",
    "Technology",
    "환경공학 솔루션을 개발합니다.",
    "We develop environmental engineering solutions."
  ],
  [
    "산업공학",
    "စက်မှု အင်ဂျင်နီယာ",
    "Technology",
    "산업공학을 연구합니다.",
    "I study industrial engineering."
  ],
  [
    "정치학",
    "နိုင်ငံရေး သိပ္ပံ",
    "Society",
    "정치학을 전공합니다.",
    "I major in political science."
  ],
  [
    "사회학",
    "လူမှုရေး သိပ္ပံ",
    "Society",
    "사회학 연구를 합니다.",
    "I conduct sociology research."
  ],
  [
    "인류학",
    "လူသားဗေဒ",
    "Society",
    "인류학을 공부합니다.",
    "I study anthropology."
  ],
  [
    "고고학",
    "ရှေးဟောင်း သုတေသန",
    "Society",
    "고고학 발굴을 합니다.",
    "I conduct archaeological excavations."
  ],
  [
    "언어학",
    "ဘာသာဗေဒ",
    "Society",
    "언어학을 전공합니다.",
    "I major in linguistics."
  ],
  [
    "심리학",
    "စိတ်ပညာ",
    "Psychology",
    "심리학 실험을 합니다.",
    "I conduct psychology experiments."
  ],
  [
    "인지심리학",
    "သိမြင်မှု စိတ်ပညာ",
    "Psychology",
    "인지심리학을 연구합니다.",
    "I study cognitive psychology."
  ],
  [
    "발달심리학",
    "ဖွံ့ဖြိုးမှု စိတ်ပညာ",
    "Psychology",
    "발달심리학을 공부합니다.",
    "I study developmental psychology."
  ],
  [
    "임상심리학",
    "ကုသမှု စိတ်ပညာ",
    "Psychology",
    "임상심리학을 전공합니다.",
    "I major in clinical psychology."
  ],
  [
    "사회심리학",
    "လူမှုရေး စိတ်ပညာ",
    "Psychology",
    "사회심리학 연구를 합니다.",
    "I conduct social psychology research."
  ],
  [
    "경영정보시스템",
    "စီမံခန့်ခွဲမှု သတင်းအချက်အလက် စနစ်",
    "Business",
    "경영정보시스템을 구축합니다.",
    "We build management information systems."
  ],
  [
    "인사관리",
    "လူ့စွမ်းအား စီမံခန့်ခွဲမှု",
    "Business",
    "인사관리 정책을 수립합니다.",
    "We establish human resource management policies."
  ],
  [
    "조직행동론",
    "အဖွဲ့အစည်း အပြုအမူ",
    "Business",
    "조직행동론을 강의합니다.",
    "I lecture on organizational behavior."
  ],
  [
    "전략경영",
    "နည်းဗျူဟာ စီမံခန့်ခွဲမှု",
    "Business",
    "전략경영을 연구합니다.",
    "I study strategic management."
  ],
  [
    "혁신경영",
    "ဆန်းသစ်တီထွင် စီမံခန့်ခွဲမှု",
    "Business",
    "혁신경영을 실천합니다.",
    "We practice innovation management."
  ],
  [
    "품질관리",
    "အရည်အသွေး စီမံခန့်ခွဲမှု",
    "Business",
    "품질관리 시스템을 도입합니다.",
    "We introduce quality management systems."
  ],
  [
    "공급망관리",
    "ထောက်ပံ့မှု ကွင်းဆက် စီမံခန့်ခွဲမှု",
    "Business",
    "공급망관리를 최적화합니다.",
    "We optimize supply chain management."
  ],
  [
    "리스크관리",
    "အန္တရာယ် စီမံခန့်ခွဲမှု",
    "Business",
    "리스크관리 전략을 수립합니다.",
    "We establish risk management strategies."
  ],
  [
    "지식경영",
    "အသိပညာ စီမံခန့်ခွဲမှု",
    "Business",
    "지식경영을 도입합니다.",
    "We introduce knowledge management."
  ],
  [
    "변화관리",
    "ပြောင်းလဲမှု စီမံခန့်ခွဲမှု",
    "Business",
    "변화관리가 필요합니다.",
    "Change management is needed."
  ],
  [
    "국제법",
    "နိုင်ငံတကာ ဥပဒေ",
    "Legal",
    "국제법을 전공합니다.",
    "I major in international law."
  ],
  [
    "헌법학",
    "ဖွဲ့စည်းပုံအခြေခံဥပဒေ သိပ္ပံ",
    "Legal",
    "헌법학을 연구합니다.",
    "I study constitutional law."
  ],
  [
    "행정법",
    "စီမံခန့်ခွဲရေး ဥပဒေ",
    "Legal",
    "행정법을 공부합니다.",
    "I study administrative law."
  ],
  [
    "형법",
    "ရာဇဝတ်ဥပဒေ",
    "Legal",
    "형법을 전공합니다.",
    "I major in criminal law."
  ],
  [
    "민법",
    "ပြည်သူ့ ဥပဒေ",
    "Legal",
    "민법 조문을 해석합니다.",
    "I interpret civil law provisions."
  ],
  [
    "상법",
    "ကုန်သွယ်ရေး ဥပဒေ",
    "Legal",
    "상법을 연구합니다.",
    "I study commercial law."
  ],
  [
    "노동법",
    "အလုပ်သမား ဥပဒေ",
    "Legal",
    "노동법을 전공합니다.",
    "I major in labor law."
  ],
  [
    "지적재산권",
    "ဉာဏပစ္စည်း ပိုင်ဆိုင်ခွင့်",
    "Legal",
    "지적재산권을 보호하세요.",
    "Protect intellectual property rights."
  ],
  [
    "특허",
    "မူပိုင်ခွင့်",
    "Legal",
    "특허를 출원합니다.",
    "I file a patent application."
  ],
  [
    "상표권",
    "ကုန်အမှတ်တံဆိပ် ခွင့်",
    "Legal",
    "상표권을 등록합니다.",
    "I register trademark rights."
  ],
  [
    "태양광",
    "နေရောင်ခြည်",
    "Environment",
    "태양광 발전을 설치합니다.",
    "We install solar power generation."
  ],
  [
    "풍력",
    "လေအား",
    "Environment",
    "풍력 에너지를 활용합니다.",
    "We utilize wind energy."
  ],
  [
    "수력",
    "ရေအား",
    "Environment",
    "수력 발전소를 건설합니다.",
    "We build hydroelectric power plants."
  ],
  [
    "지열",
    "မြေအောက်အပူ",
    "Environment",
    "지열 에너지를 개발합니다.",
    "We develop geothermal energy."
  ],
  [
    "원자력",
    "နျူကလီးယား",
    "Environment",
    "원자력 발전을 논의합니다.",
    "We discuss nuclear power generation."
  ],
  [
    "에너지효율",
    "စွမ်းအင် ထိရောက်မှု",
    "Environment",
    "에너지효율을 높입니다.",
    "We increase energy efficiency."
  ],
  [
    "탄소배출",
    "ကာဗွန် ထုတ်လွှတ်မှု",
    "Environment",
    "탄소배출을 감소시킵니다.",
    "We reduce carbon emissions."
  ],
  [
    "대기오염",
    "လေထု ညစ်ညမ်းမှု",
    "Environment",
    "대기오염을 모니터링합니다.",
    "We monitor air pollution."
  ],
  [
    "수질오염",
    "ရေအရည်အသွေး ညစ်ညမ်းမှု",
    "Environment",
    "수질오염을 방지합니다.",
    "We prevent water pollution."
  ],
  [
    "토양오염",
    "မြေဆီလွှာ ညစ်ညမ်းမှု",
    "Environment",
    "토양오염을 정화합니다.",
    "We purify soil pollution."
  ],
  [
    "교통",
    "ယာဉ်အသွားအလာ",
    "General"
  ],
  [
    "신호등",
    "အချက်ပြ မီး",
    "General"
  ],
  [
    "횡단보도",
    "လမ်းဖြတ်ကူး",
    "General"
  ],
  [
    "다리",
    "တံတား",
    "General"
  ],
  [
    "터널",
    "တွင်းလိုဏ်",
    "General"
  ],
  [
    "고속도로",
    "အမြန်လမ်း",
    "General"
  ],
  [
    "일반도로",
    "ပုံမှန် လမ်း",
    "General"
  ],
  [
    "길",
    "လမ်း",
    "General"
  ],
  [
    "거리",
    "လမ်း",
    "General"
  ],
  [
    "골목",
    "လမ်းသွယ်",
    "General"
  ],
  [
    "주차장",
    "ကားရပ်နားရာ",
    "General"
  ],
  [
    "주차",
    "ကားရပ်",
    "General"
  ],
  [
    "주유소",
    "ဆီဆိုင်",
    "General"
  ],
  [
    "정비소",
    "ပြင်ဆင်ရုံ",
    "General"
  ],
  [
    "세차장",
    "ကားဆေးရုံ",
    "General"
  ],
  [
    "렌터카",
    "ကားငှား",
    "General"
  ],
  [
    "버스정류장",
    "ဘတ်စကား ရပ်နားရာ",
    "General"
  ],
  [
    "지하철역",
    "မြေအောက်ရထား ဘူတာ",
    "General"
  ],
  [
    "기차역",
    "ရထား ဘူတာ",
    "General"
  ],
  [
    "공항버스",
    "လေဆိပ် ဘတ်စကား",
    "General"
  ],
  [
    "시내버스",
    "မြို့ထဲ ဘတ်စကား",
    "General"
  ],
  [
    "고속버스",
    "အမြန် ဘတ်စကား",
    "General"
  ],
  [
    "시외버스",
    "မြို့ပြင် ဘတ်စကား",
    "General"
  ],
  [
    "택시승강장",
    "တက္ကစီ ရပ်နားရာ",
    "General"
  ],
  [
    "지하도",
    "မြေအောက် လမ်း",
    "General"
  ],
  [
    "육교",
    "လမ်းဖြတ်ကူး",
    "General"
  ],
  [
    "계단",
    "လှေကား",
    "General"
  ],
  [
    "엘리베이터",
    "ဓာတ်လှေကား",
    "General"
  ],
  [
    "에스컬레이터",
    "လှေကား",
    "General"
  ],
  [
    "출구",
    "ထွက်ပေါက်",
    "General"
  ],
  [
    "입구",
    "ဝင်ပေါက်",
    "General"
  ],
  [
    "매표소",
    "လက်မှတ် ရောင်းရုံ",
    "General"
  ],
  [
    "안내소",
    "အကူအညီ ရုံး",
    "General"
  ],
  [
    "화장실",
    "အိမ်သာ",
    "General"
  ],
  [
    "휴게실",
    "အနားယူရာ",
    "General"
  ],
  [
    "대합실",
    "စောင့်ဆိုင်းရာ",
    "General"
  ],
  [
    "게이트",
    "တံခါး",
    "General"
  ],
  [
    "탑승구",
    "တက်ရောက်ရာ",
    "General"
  ],
  [
    "수하물",
    "ခရီးဆောင်ပစ္စည်း",
    "General"
  ],
  [
    "수하물보관소",
    "ခရီးဆောင်ပစ္စည်း သိုလှောင်ရာ",
    "General"
  ],
  [
    "체크인",
    "စစ်ဆေး",
    "General"
  ],
  [
    "체크아웃",
    "ထွက်ခွာ",
    "General"
  ],
  [
    "예약",
    "ကြိုတင် စာရင်း",
    "General"
  ],
  [
    "변경",
    "ပြောင်းလဲ",
    "General"
  ],
  [
    "발권",
    "လက်မှတ် ထုတ်",
    "General"
  ],
  [
    "탑승권",
    "တက်ရောက်လက်မှတ်",
    "General"
  ],
  [
    "좌석",
    "ထိုင်ခုံ",
    "General"
  ],
  [
    "창가석",
    "ပြတင်းပေါက် ထိုင်ခုံ",
    "General"
  ],
  [
    "복도석",
    "လမ်းကြား ထိုင်ခုံ",
    "General"
  ],
  [
    "비상구",
    "အရေးပေါ် ထွက်ပေါက်",
    "General"
  ],
  [
    "구명조끼",
    "ကယ်ဆယ်ရေး အင်္ကျီ",
    "General"
  ],
  [
    "안전띠",
    "လုံခြုံရေး ခါးပတ်",
    "General"
  ],
  [
    "연기",
    "ရွှေ့ဆိုင်း",
    "General"
  ],
  [
    "중단",
    "ရပ်ဆိုင်း",
    "General"
  ],
  [
    "재개",
    "ပြန်လည်",
    "General"
  ],
  [
    "시작",
    "စတင်",
    "General"
  ],
  [
    "종료",
    "ပြီးဆုံး",
    "General"
  ],
  [
    "마무리",
    "အဆုံးသတ်",
    "General"
  ],
  [
    "준비",
    "ပြင်ဆင်",
    "General"
  ],
  [
    "계획",
    "အစီအစဉ်",
    "General"
  ],
  [
    "실행",
    "လုပ်ဆောင်",
    "General"
  ],
  [
    "관리",
    "စီမံ",
    "General"
  ],
  [
    "감독",
    "စောင့်ကြည့်",
    "General"
  ],
  [
    "지시",
    "ညွှန်ကြား",
    "General"
  ],
  [
    "명령",
    "အမိန့်",
    "General"
  ],
  [
    "요청",
    "တောင်းဆို",
    "General"
  ],
  [
    "제안",
    "အဆိုပြု",
    "General"
  ],
  [
    "논의",
    "ဆွေးနွေး",
    "General"
  ],
  [
    "토론",
    "ဆွေးနွေး",
    "General"
  ],
  [
    "결정",
    "ဆုံးဖြတ်",
    "General"
  ],
  [
    "선택",
    "ရွေးချယ်",
    "General"
  ],
  [
    "포기",
    "စွန့်လွှတ်",
    "General"
  ],
  [
    "포함",
    "ပါဝင်",
    "General"
  ],
  [
    "제외",
    "ဖယ်ထုတ်",
    "General"
  ],
  [
    "추가",
    "ထပ်ထည့်",
    "General"
  ],
  [
    "삭제",
    "ဖျက်",
    "General"
  ],
  [
    "개선",
    "ပြုပြင်",
    "General"
  ],
  [
    "개발",
    "ဖွံ့ဖြိုး",
    "General"
  ],
  [
    "조사",
    "စစ်ဆေး",
    "General"
  ],
  [
    "측정",
    "တိုင်းတာ",
    "General"
  ],
  [
    "비교",
    "နှိုင်းယှဉ်",
    "General"
  ],
  [
    "대조",
    "နှိုင်းယှဉ်",
    "General"
  ],
  [
    "검증",
    "အတည်ပြု",
    "General"
  ],
  [
    "심사",
    "စိစစ်",
    "General"
  ],
  [
    "반려",
    "ပြန်လည်",
    "General"
  ],
  [
    "보완",
    "ဖြည့်စွက်",
    "General"
  ],
  [
    "재검토",
    "ပြန်လည် စစ်ဆေး",
    "General"
  ],
  [
    "최종",
    "နောက်ဆုံး",
    "General"
  ],
  [
    "초안",
    "မူကြမ်း",
    "General"
  ],
  [
    "단일세포전사체학",
    "တစ်ခုတည်း ဆဲလ် အကြောင်းအရာ",
    "Biology",
    "단일세포전사체학을 연구합니다.",
    "I study single-cell transcriptomics."
  ],
  [
    "단일세포단백질체학",
    "တစ်ခုတည်း ဆဲလ် ပရိုတိန်း",
    "Biology",
    "단일세포단백질체학을 공부합니다.",
    "I study single-cell proteomics."
  ],
  [
    "단일세포대사체학",
    "တစ်ခုတည်း ဆဲလ် ဇီဝကမ္မဗေဒ",
    "Biology",
    "단일세포대사체학을 전공합니다.",
    "I major in single-cell metabolomics."
  ],
  [
    "단일세포면역학",
    "တစ်ခုတည်း ဆဲလ် ကိုယ်ခံအား",
    "Biology",
    "단일세포면역학을 연구합니다.",
    "I study single-cell immunology."
  ],
  [
    "단일세포생물학",
    "တစ်ခုတည်း ဆဲလ် ဇီဝဗေဒ",
    "Biology",
    "단일세포생물학을 공부합니다.",
    "I study single-cell biology."
  ],
  [
    "단일세포분석",
    "တစ်ခုတည်း ဆဲလ် ခွဲခြမ်းစိတ်ဖြာမှု",
    "Biology",
    "단일세포분석을 전공합니다.",
    "I major in single-cell analysis."
  ],
  [
    "단일세포시퀀싱",
    "တစ်ခုတည်း ဆဲလ် အစဉ်",
    "Biology",
    "단일세포시퀀싱을 연구합니다.",
    "I study single-cell sequencing."
  ],
  [
    "단일세포이미징",
    "တစ်ခုတည်း ဆဲလ် ပုံရိပ်",
    "Biology",
    "단일세포이미징을 공부합니다.",
    "I study single-cell imaging."
  ],
  [
    "단일세포유전학",
    "တစ်ခုတည်း ဆဲလ် မျိုးရိုးဗီဇ",
    "Biology",
    "단일세포유전학을 전공합니다.",
    "I major in single-cell genetics."
  ],
  [
    "분자동역학",
    "မော်လီကျူး လှုပ်ရှားမှု",
    "Computer Science",
    "분자동역학을 연구합니다.",
    "I study molecular dynamics."
  ],
  [
    "양자동역학",
    "ကွမ်တမ် လှုပ်ရှားမှု",
    "Computer Science",
    "양자동역학을 전공합니다.",
    "I major in quantum dynamics."
  ],
  [
    "전산화학",
    "ကွန်ပျူတာ ဓာတုဗေဒ",
    "Computer Science",
    "전산화학을 공부합니다.",
    "I study computational chemistry."
  ],
  [
    "전산물리학",
    "ကွန်ပျူတာ ရူပဗေဒ",
    "Computer Science",
    "전산물리학을 연구합니다.",
    "I study computational physics."
  ],
  [
    "전산수학",
    "ကွန်ပျူတာ သင်္ချာ",
    "Computer Science",
    "전산수학을 전공합니다.",
    "I major in computational mathematics."
  ],
  [
    "전산공학",
    "ကွန်ပျူတာ အင်ဂျင်နီယာ",
    "Computer Science",
    "전산공학을 공부합니다.",
    "I study computational engineering."
  ],
  [
    "전산의학",
    "ကွန်ပျူတာ ဆေးပညာ",
    "Computer Science",
    "전산의학을 연구합니다.",
    "I study computational medicine."
  ],
  [
    "전산재료과학",
    "ကွန်ပျူတာ ပစ္စည်း သိပ္ပံ",
    "Computer Science",
    "전산재료과학을 전공합니다.",
    "I major in computational materials science."
  ],
  [
    "전산유체역학",
    "ကွန်ပျူတာ အရည် စွမ်းအား",
    "Computer Science",
    "전산유체역학을 공부합니다.",
    "I study computational fluid dynamics."
  ],
  [
    "전산구조역학",
    "ကွန်ပျူတာ ဖွဲ့စည်းပုံ စွမ်းအား",
    "Computer Science",
    "전산구조역학을 연구합니다.",
    "I study computational structural mechanics."
  ],
  [
    "나노바이오기술",
    "နာနို ဇီဝ နည်းပညာ",
    "Technology",
    "나노바이오기술을 연구합니다.",
    "I study nanobiotechnology."
  ],
  [
    "바이오나노기술",
    "ဇီဝ နာနို နည်းပညာ",
    "Technology",
    "바이오나노기술을 전공합니다.",
    "I major in bionanotechnology."
  ],
  [
    "나노바이오과학",
    "နာနို ဇီဝ သိပ္ပံ",
    "Science",
    "나노바이오과학을 공부합니다.",
    "I study nanobioscience."
  ],
  [
    "바이오나노과학",
    "ဇီဝ နာနို သိပ္ပံ",
    "Science",
    "바이오나노과학을 연구합니다.",
    "I study bionanoscience."
  ],
  [
    "나노바이오물리학",
    "နာနို ဇီဝ ရူပဗေဒ",
    "Science",
    "나노바이오물리학을 전공합니다.",
    "I major in nanobiophysics."
  ],
  [
    "바이오나노물리학",
    "ဇီဝ နာနို ရူပဗေဒ",
    "Science",
    "바이오나노물리학을 공부합니다.",
    "I study bionanophysics."
  ],
  [
    "나노바이오화학",
    "နာနို ဇီဝ ဓာတုဗေဒ",
    "Science",
    "나노바이오화학을 연구합니다.",
    "I study nanobiochemistry."
  ],
  [
    "바이오나노화학",
    "ဇီဝ နာနို ဓာတုဗေဒ",
    "Science",
    "바이오나노화학을 전공합니다.",
    "I major in bionanochemistry."
  ],
  [
    "나노바이오의학",
    "နာနို ဇီဝ ဆေးပညာ",
    "Medical",
    "나노바이오의학을 공부합니다.",
    "I study nanobiomedicine."
  ],
  [
    "바이오나노의학",
    "ဇီဝ နာနို ဆေးပညာ",
    "Medical",
    "바이오나노의학을 연구합니다.",
    "I study bionanomedicine."
  ],
  [
    "계산생물학",
    "ကွန်ပျူတာ ဇီဝဗေဒ",
    "Biology",
    "계산생물학을 공부합니다.",
    "I study computational biology."
  ],
  [
    "구조생물학",
    "ဖွဲ့စည်းပုံ ဇီဝဗေဒ",
    "Biology",
    "구조생물학을 전공합니다.",
    "I major in structural biology."
  ],
  [
    "기능생물학",
    "လုပ်ဆောင်ချက် ဇီဝဗေဒ",
    "Biology",
    "기능생물학을 연구합니다.",
    "I study functional biology."
  ],
  [
    "진화생물학",
    "ဆင့်ကဲဖြစ်စဉ် ဇီဝဗေဒ",
    "Biology",
    "진화생물학을 공부합니다.",
    "I study evolutionary biology."
  ],
  [
    "발생생물학",
    "ဖွံ့ဖြိုးမှု ဇီဝဗေဒ",
    "Biology",
    "발생생물학을 전공합니다.",
    "I major in developmental biology."
  ],
  [
    "세포생물학",
    "ဆဲလ် ဇီဝဗေဒ",
    "Biology",
    "세포생물학을 연구합니다.",
    "I study cell biology."
  ],
  [
    "분자생물학",
    "မော်လီကျူး ဇီဝဗေဒ",
    "Biology",
    "분자생물학을 공부합니다.",
    "I study molecular biology."
  ],
  [
    "유전학",
    "မျိုးရိုးဗီဇ",
    "Biology",
    "유전학을 전공합니다.",
    "I major in genetics."
  ],
  [
    "나노특성화",
    "နာနို ထူးခြားမှု",
    "Engineering",
    "나노특성화를 연구합니다.",
    "I study nanocaracterization."
  ],
  [
    "나노분석",
    "နာနို ခွဲခြမ်းစိတ်ဖြာမှု",
    "Engineering",
    "나노분석을 전공합니다.",
    "I major in nanoanalysis."
  ],
  [
    "나노측정",
    "နာနို တိုင်းတာမှု",
    "Engineering",
    "나노측정을 공부합니다.",
    "I study nanomeasurement."
  ],
  [
    "나노이미징",
    "နာနို ပုံရိပ်",
    "Engineering",
    "나노이미징을 연구합니다.",
    "I study nanoimaging."
  ],
  [
    "나노스펙트로스코피",
    "နာနို စပက်ထရိုစကုပ်ပီ",
    "Engineering",
    "나노스펙트로스코피를 전공합니다.",
    "I major in nanospectroscopy."
  ],
  [
    "나노현미경",
    "နာနို မိုက်ခရိုစကုပ်ပီ",
    "Engineering",
    "나노현미경을 공부합니다.",
    "I study nanomicroscopy."
  ],
  [
    "나노분광학",
    "နာနို စပက်ထရိုစကုပ်ပီ",
    "Engineering",
    "나노분광학을 연구합니다.",
    "I study nanospectroscopy."
  ],
  [
    "나노결정학",
    "နာနို ပုံဆောင်ခဲ",
    "Engineering",
    "나노결정학을 전공합니다.",
    "I major in nanocrystallography."
  ],
  [
    "나노표면분석",
    "နာနို မျက်နှာပြင် ခွဲခြမ်းစိတ်ဖြာမှု",
    "Engineering",
    "나노표면분석을 공부합니다.",
    "I study nanosurface analysis."
  ],
  [
    "나노구조분석",
    "နာနို ဖွဲ့စည်းပုံ ခွဲခြမ်းစိတ်ဖြာမှု",
    "Engineering",
    "나노구조분석을 연구합니다.",
    "I study nanostructure analysis."
  ],
  [
    "양자간섭",
    "ကွမ်တမ် နှောင့်ယှက်မှု",
    "Physics",
    "양자간섭을 연구합니다.",
    "I study quantum interference."
  ],
  [
    "양자비트",
    "ကွမ်တမ် ဘစ်",
    "Technology",
    "양자비트를 연구합니다.",
    "I study qubits."
  ],
  [
    "유전자편집",
    "မျိုးရိုးဗီဇ တည်းဖြတ်မှု",
    "Biology",
    "유전자편집을 연구합니다.",
    "I study gene editing."
  ],
  [
    "세포치료",
    "ဆဲလ် ကုသမှု",
    "Biology",
    "세포치료를 공부합니다.",
    "I study cell therapy."
  ],
  [
    "장기배양",
    "အင်္ဂါ စိုက်ပျိုးမှု",
    "Biology",
    "장기배양을 연구합니다.",
    "I study organ cultivation."
  ],
  [
    "인공장기",
    "လူလုပ် အင်္ဂါ",
    "Biology",
    "인공장기를 개발합니다.",
    "I develop artificial organs."
  ],
  [
    "나노포어",
    "နာနို အပေါက်",
    "Engineering",
    "나노포어를 연구합니다.",
    "I study nanopores."
  ],
  [
    "나노캡슐",
    "နာနို ဆေးတောင့်",
    "Engineering",
    "나노캡슐을 개발합니다.",
    "I develop nanocapsules."
  ],
  [
    "나노스피어",
    "နာနို လုံး",
    "Engineering",
    "나노스피어를 전공합니다.",
    "I major in nanospheres."
  ],
  [
    "나노로드",
    "နာနို လမ်း",
    "Engineering",
    "나노로드를 연구합니다.",
    "I study nanorods."
  ],
  [
    "나노플레이트",
    "နာနို ပြား",
    "Engineering",
    "나노플레이트를 공부합니다.",
    "I study nanoplates."
  ],
  [
    "나노큐브",
    "နာနို အတုံး",
    "Engineering",
    "나노큐브를 전공합니다.",
    "I major in nanocubes."
  ],
  [
    "나노스타",
    "နာနို ကြယ်",
    "Engineering",
    "나노스타를 연구합니다.",
    "I study nanostars."
  ],
  [
    "나노링",
    "နာနို ကွင်း",
    "Engineering",
    "나노링을 공부합니다.",
    "I study nanorings."
  ],
  [
    "나노헬릭스",
    "နာနို လိမ်ခွေ",
    "Engineering",
    "나노헬릭스를 전공합니다.",
    "I major in nanohelices."
  ],
  [
    "나노프리즘",
    "နာနို ပရစ်စမ်",
    "Engineering",
    "나노프리즘을 연구합니다.",
    "I study nanoprisms."
  ],
  [
    "지질체학",
    "အဆီ",
    "Biology",
    "지질체학을 연구합니다.",
    "I study lipidomics."
  ],
  [
    "당단백질체학",
    "သကြား ပရိုတိန်း",
    "Biology",
    "당단백질체학을 공부합니다.",
    "I study glycomics."
  ],
  [
    "면역체학",
    "ကိုယ်ခံအား",
    "Biology",
    "면역체학을 전공합니다.",
    "I major in immunomics."
  ],
  [
    "약물체학",
    "ဆေးဝါး",
    "Biology",
    "약물체학을 연구합니다.",
    "I study pharmacogenomics."
  ],
  [
    "독성체학",
    "အဆိပ်",
    "Biology",
    "독성체학을 공부합니다.",
    "I study toxicogenomics."
  ],
  [
    "영양체학",
    "အာဟာရ",
    "Biology",
    "영양체학을 전공합니다.",
    "I major in nutrigenomics."
  ],
  [
    "시스템의학",
    "စနစ် ဆေးပညာ",
    "Medical",
    "시스템의학을 연구합니다.",
    "I study systems medicine."
  ],
  [
    "시스템약학",
    "စနစ် ဆေးဝါး",
    "Medical",
    "시스템약학을 전공합니다.",
    "I major in systems pharmacology."
  ],
  [
    "시스템화학",
    "စနစ် ဓာတုဗေဒ",
    "Chemistry",
    "시스템화학을 공부합니다.",
    "I study systems chemistry."
  ],
  [
    "시스템물리학",
    "စနစ် ရူပဗေဒ",
    "Physics",
    "시스템물리학을 연구합니다.",
    "I study systems physics."
  ],
  [
    "시스템공학",
    "စနစ် အင်ဂျင်နီယာ",
    "Engineering",
    "시스템공학을 전공합니다.",
    "I major in systems engineering."
  ],
  [
    "시스템경제학",
    "စနစ် စီးပွားရေး",
    "Economics",
    "시스템경제학을 공부합니다.",
    "I study systems economics."
  ],
  [
    "시스템사회학",
    "စနစ် လူမှုရေး",
    "Social Science",
    "시스템사회학을 연구합니다.",
    "I study systems sociology."
  ],
  [
    "시스템심리학",
    "စနစ် စိတ်ပညာ",
    "Psychology",
    "시스템심리학을 전공합니다.",
    "I major in systems psychology."
  ],
  [
    "시스템생태학",
    "စနစ် ဂေဟစနစ်",
    "Science",
    "시스템생태학을 공부합니다.",
    "I study systems ecology."
  ],
  [
    "시스템정보학",
    "စနစ် သတင်းအချက်အလက်",
    "Science",
    "시스템정보학을 연구합니다.",
    "I study systems informatics."
  ],
  [
    "정밀의료",
    "တိကျသော ဆေးပညာ",
    "Medical",
    "정밀의료 치료를 받습니다.",
    "I receive precision medicine treatment."
  ],
  [
    "개인맞춤의료",
    "ကိုယ်ပိုင် ဆေးပညာ",
    "Medical",
    "개인맞춤의료를 전공합니다.",
    "I major in personalized medicine."
  ],
  [
    "유전체의학",
    "မျိုးရိုးဗီဇ ဆေးပညာ",
    "Medical",
    "유전체의학을 연구합니다.",
    "I study genomic medicine."
  ],
  [
    "단백질체의학",
    "ပရိုတိန်း ဆေးပညာ",
    "Medical",
    "단백질체의학을 공부합니다.",
    "I study proteomic medicine."
  ],
  [
    "대사체의학",
    "ဇီဝကမ္မဗေဒ ဆေးပညာ",
    "Medical",
    "대사체의학을 전공합니다.",
    "I major in metabolomic medicine."
  ],
  [
    "전사체의학",
    "အကြောင်းအရာ ဆေးပညာ",
    "Medical",
    "전사체의학을 연구합니다.",
    "I study transcriptomic medicine."
  ],
  [
    "면역유전체학",
    "ကိုယ်ခံအား မျိုးရိုးဗီဇ",
    "Medical",
    "면역유전체학을 공부합니다.",
    "I study immunogenomics."
  ],
  [
    "약물유전체학",
    "ဆေးဝါး မျိုးရိုးဗီဇ",
    "Medical",
    "약물유전체학을 전공합니다.",
    "I major in pharmacogenomics."
  ],
  [
    "암유전체학",
    "ကင်ဆာ မျိုးရိုးဗီဇ",
    "Medical",
    "암유전체학을 연구합니다.",
    "I study cancer genomics."
  ],
  [
    "신경유전체학",
    "အာရုံကြော မျိုးရိုးဗီဇ",
    "Medical",
    "신경유전체학을 공부합니다.",
    "I study neurogenomics."
  ],
  [
    "화학인포매틱스",
    "ဓာတုဗေဒ သတင်းအချက်အလက်",
    "Science",
    "화학인포매틱스를 연구합니다.",
    "I study cheminformatics."
  ],
  [
    "의료인포매틱스",
    "ဆေးပညာ သတင်းအချက်အလက်",
    "Science",
    "의료인포매틱스를 전공합니다.",
    "I major in medical informatics."
  ],
  [
    "환경인포매틱스",
    "ပတ်ဝန်းကျင် သတင်းအချက်အလက်",
    "Science",
    "환경인포매틱스를 공부합니다.",
    "I study environmental informatics."
  ],
  [
    "공간인포매틱스",
    "နေရာ သတင်းအချက်အလက်",
    "Science",
    "공간인포매틱스를 연구합니다.",
    "I study geoinformatics."
  ],
  [
    "사회인포매틱스",
    "လူမှုရေး သတင်းအချက်အလက်",
    "Science",
    "사회인포매틱스를 전공합니다.",
    "I major in social informatics."
  ],
  [
    "경제인포매틱스",
    "စီးပွားရေး သတင်းအချက်အလက်",
    "Science",
    "경제인포매틱스를 공부합니다.",
    "I study economic informatics."
  ],
  [
    "문화인포매틱스",
    "ယဉ်ကျေးမှု သတင်းအချက်အလက်",
    "Science",
    "문화인포매틱스를 연구합니다.",
    "I study cultural informatics."
  ],
  [
    "도서인포매틱스",
    "စာကြည့်တိုက် သတင်းအချက်အလက်",
    "Science",
    "도서인포매틱스를 전공합니다.",
    "I major in library informatics."
  ],
  [
    "법정보학",
    "ဥပဒေ သတင်းအချက်အလက်",
    "Science",
    "법정보학을 공부합니다.",
    "I study legal informatics."
  ],
  [
    "양자이미징",
    "ကွမ်တမ် ပုံရိပ်",
    "Technology",
    "양자이미징을 전공합니다.",
    "I major in quantum imaging."
  ],
  [
    "양자메타물질",
    "ကွမ်တမ် မက်တာ ပစ္စည်း",
    "Technology",
    "양자메타물질을 공부합니다.",
    "I study quantum metamaterials."
  ],
  [
    "양자광전자",
    "ကွမ်တမ် အလင်း အီလက်ထရွန်",
    "Technology",
    "양자광전자를 연구합니다.",
    "I study quantum optoelectronics."
  ],
  [
    "양자나노과학",
    "ကွမ်တမ် နာနို သိပ္ပံ",
    "Technology",
    "양자나노과학을 전공합니다.",
    "I major in quantum nanoscience."
  ],
  [
    "양자바이오물리학",
    "ကွမ်တမ် ဇီဝ ရူပဗေဒ",
    "Technology",
    "양자바이오물리학을 공부합니다.",
    "I study quantum biophysics."
  ],
  [
    "양자나노기술",
    "ကွမ်တမ် နာနို နည်းပညာ",
    "Technology",
    "양자나노기술을 개발합니다.",
    "I develop quantum nanotechnology."
  ],
  [
    "양자바이오기술",
    "ကွမ်တမ် ဇီဝ နည်းပညာ",
    "Technology",
    "양자바이오기술을 연구합니다.",
    "I study quantum biotechnology."
  ],
  [
    "양자나노의학",
    "ကွမ်တမ် နာနို ဆေးပညာ",
    "Technology",
    "양자나노의학을 전공합니다.",
    "I major in quantum nanomedicine."
  ],
  [
    "첨단제조",
    "ခေတ်မီ ထုတ်လုပ်မှု",
    "Engineering",
    "첨단제조를 연구합니다.",
    "I study advanced manufacturing."
  ],
  [
    "스마트제조",
    "စမတ် ထုတ်လုပ်မှု",
    "Engineering",
    "스마트제조를 전공합니다.",
    "I major in smart manufacturing."
  ],
  [
    "디지털제조",
    "ဒစ်ဂျစ်တယ် ထုတ်လုပ်မှု",
    "Engineering",
    "디지털제조를 공부합니다.",
    "I study digital manufacturing."
  ],
  [
    "3D프린팅",
    "3D ပုံနှိပ်",
    "Engineering",
    "3D프린팅을 연구합니다.",
    "I study 3D printing."
  ],
  [
    "적층제조",
    "ထပ်ဆင့် ထုတ်လုပ်မှု",
    "Engineering",
    "적층제조를 전공합니다.",
    "I major in additive manufacturing."
  ],
  [
    "감산제조",
    "နုတ်ယူမှု ထုတ်လုပ်မှု",
    "Engineering",
    "감산제조를 공부합니다.",
    "I study subtractive manufacturing."
  ],
  [
    "나노제조",
    "နာနို ထုတ်လုပ်မှု",
    "Engineering",
    "나노제조를 연구합니다.",
    "I study nanomanufacturing."
  ],
  [
    "바이오제조",
    "ဇီဝ ထုတ်လုပ်မှု",
    "Engineering",
    "바이오제조를 전공합니다.",
    "I major in biomanufacturing."
  ],
  [
    "그린제조",
    "အစိမ်းရောင် ထုတ်လုပ်မှု",
    "Engineering",
    "그린제조를 공부합니다.",
    "I study green manufacturing."
  ],
  [
    "지속가능제조",
    "ရေရှည်တည်တံ့သော ထုတ်လုပ်မှု",
    "Engineering",
    "지속가능제조를 연구합니다.",
    "I study sustainable manufacturing."
  ],
  [
    "5G통신",
    "5G ဆက်သွယ်ရေး",
    "Communication",
    "5G통신을 연구합니다.",
    "I study 5G communication."
  ],
  [
    "6G통신",
    "6G ဆက်သွယ်ရေး",
    "Communication",
    "6G통신을 전공합니다.",
    "I major in 6G communication."
  ],
  [
    "사물인터넷통신",
    "အင်တာနက် အရာဝတ္ထု ဆက်သွယ်ရေး",
    "Communication",
    "사물인터넷통신을 공부합니다.",
    "I study IoT communication."
  ],
  [
    "엣지컴퓨팅통신",
    "အစွန်း ကွန်ပျူတာ ဆက်သွယ်ရေး",
    "Communication",
    "엣지컴퓨팅통신을 연구합니다.",
    "I study edge computing communication."
  ],
  [
    "광통신",
    "အလင်း ဆက်သွယ်ရေး",
    "Communication",
    "광통신을 공부합니다.",
    "I study optical communication."
  ],
  [
    "위성통신",
    "ဂြိုဟ်တု ဆက်သွယ်ရေး",
    "Communication",
    "위성통신을 연구합니다.",
    "I study satellite communication."
  ],
  [
    "무선통신",
    "ကြိုးမဲ့ ဆက်သွယ်ရေး",
    "Communication",
    "무선통신을 전공합니다.",
    "I major in wireless communication."
  ],
  [
    "모바일통신",
    "မိုဘိုင်း ဆက်သွယ်ရေး",
    "Communication",
    "모바일통신을 공부합니다.",
    "I study mobile communication."
  ],
  [
    "초고속통신",
    "အလွန်မြန်သော ဆက်သွယ်ရေး",
    "Communication",
    "초고속통신을 연구합니다.",
    "I study ultra-fast communication."
  ],
  [
    "가상현실교육",
    "အတုအယောင် အမှန်တကယ် ပညာရေး",
    "Education",
    "가상현실교육을 연구합니다.",
    "I study VR education."
  ],
  [
    "증강현실교육",
    "တိုးမြှင့်ထားသော အမှန်တကယ် ပညာရေး",
    "Education",
    "증강현실교육을 전공합니다.",
    "I major in AR education."
  ],
  [
    "혼합현실교육",
    "ရောနှော အမှန်တကယ် ပညာရေး",
    "Education",
    "혼합현실교육을 공부합니다.",
    "I study mixed reality education."
  ],
  [
    "인공지능교육",
    "လူလုပ်ဉာဏ်ရည် ပညာရေး",
    "Education",
    "인공지능교육을 전공합니다.",
    "I major in AI education."
  ],
  [
    "빅데이터교육",
    "ကြီးမားသော ဒေတာ ပညာရေး",
    "Education",
    "빅데이터교육을 공부합니다.",
    "I study big data education."
  ],
  [
    "블록체인교육",
    "ဘလော့ခ်ချိန်း ပညာရေး",
    "Education",
    "블록체인교육을 연구합니다.",
    "I study blockchain education."
  ],
  [
    "클라우드교육",
    "ကလောက်ဒ် ပညာရေး",
    "Education",
    "클라우드교육을 전공합니다.",
    "I major in cloud education."
  ],
  [
    "모바일교육",
    "မိုဘိုင်း ပညာရေး",
    "Education",
    "모바일교육을 공부합니다.",
    "I study mobile education."
  ],
  [
    "웨어러블교육",
    "ဝတ်ဆင်နိုင်သော ပညာရေး",
    "Education",
    "웨어러블교육을 연구합니다.",
    "I study wearable education."
  ],
  [
    "스마트교육",
    "စမတ် ပညာရေး",
    "Education",
    "스마트교육을 전공합니다.",
    "I major in smart education."
  ],
  [
    "탄소포집",
    "ကာဗွန် ဖမ်းယူမှု",
    "Environment",
    "탄소포집을 연구합니다.",
    "I study carbon capture."
  ],
  [
    "탄소저장",
    "ကာဗွန် သိုလှောင်မှု",
    "Environment",
    "탄소저장을 전공합니다.",
    "I major in carbon storage."
  ],
  [
    "탄소활용",
    "ကာဗွန် အသုံးပြုမှု",
    "Environment",
    "탄소활용을 공부합니다.",
    "I study carbon utilization."
  ],
  [
    "기후적응기술",
    "ရာသီဥတု အလိုက်သင့် နည်းပညာ",
    "Environment",
    "기후적응기술을 연구합니다.",
    "I study climate adaptation technology."
  ],
  [
    "기후완화기술",
    "ရာသီဥတု လျော့ပါးစေမှု နည်းပညာ",
    "Environment",
    "기후완화기술을 전공합니다.",
    "I major in climate mitigation technology."
  ],
  [
    "환경모니터링",
    "ပတ်ဝန်းကျင် စောင့်ကြည့်မှု",
    "Environment",
    "환경모니터링을 공부합니다.",
    "I study environmental monitoring."
  ],
  [
    "대기질관리",
    "လေထု အရည်အသွေး စီမံခန့်ခွဲမှု",
    "Environment",
    "대기질관리를 연구합니다.",
    "I study air quality management."
  ],
  [
    "수질관리",
    "ရေ အရည်အသွေး စီမံခန့်ခွဲမှု",
    "Environment",
    "수질관리를 전공합니다.",
    "I major in water quality management."
  ],
  [
    "토양관리",
    "မြေဆီလွှာ စီမံခန့်ခွဲမှု",
    "Environment",
    "토양관리를 공부합니다.",
    "I study soil management."
  ],
  [
    "폐기물관리",
    "အမှိုက် စီမံခန့်ခွဲမှု",
    "Environment",
    "폐기물관리를 연구합니다.",
    "I study waste management."
  ],
  [
    "양자최적화",
    "ကွမ်တမ် အကောင်းဆုံး",
    "Computer Science",
    "양자최적화를 전공합니다.",
    "I major in quantum optimization."
  ],
  [
    "양자시뮬레이터",
    "ကွမ်တမ် တုပကိရိယာ",
    "Computer Science",
    "양자시뮬레이터를 구축합니다.",
    "I build quantum simulators."
  ],
  [
    "양자암호학",
    "ကွမ်တမ် လျှို့ဝှက်ကုဒ်",
    "Technology",
    "양자암호학을 연구합니다.",
    "I study quantum cryptography."
  ],
  [
    "양자보안",
    "ကွမ်တမ် လုံခြုံရေး",
    "Technology",
    "양자보안을 전공합니다.",
    "I major in quantum security."
  ],
  [
    "양자센싱",
    "ကွမ်တမ် အာရုံခံမှု",
    "Engineering",
    "양자센싱을 공부합니다.",
    "I study quantum sensing."
  ],
  [
    "양자계측",
    "ကွမ်တမ် တိုင်းတာမှု",
    "Engineering",
    "양자계측을 연구합니다.",
    "I study quantum metrology."
  ],
  [
    "생태유전학",
    "ဂေဟစနစ် မျိုးရိုးဗီဇ",
    "Science",
    "생태유전학을 공부합니다.",
    "I study ecological genetics."
  ],
  [
    "예방의학",
    "ကာကွယ်သော ဆေးပညာ",
    "Medical",
    "예방의학을 연구합니다.",
    "I study preventive medicine."
  ],
  [
    "통합의학",
    "ပေါင်းစည်းသော ဆေးပညာ",
    "Medical",
    "통합의학을 전공합니다.",
    "I major in integrative medicine."
  ],
  [
    "대체의학",
    "အစားထိုး ဆေးပညာ",
    "Medical",
    "대체의학을 공부합니다.",
    "I study alternative medicine."
  ],
  [
    "기능의학",
    "လုပ်ဆောင်ချက် ဆေးပညာ",
    "Medical",
    "기능의학을 연구합니다.",
    "I study functional medicine."
  ],
  [
    "생명의학",
    "အသက် ဆေးပညာ",
    "Medical",
    "생명의학을 전공합니다.",
    "I major in life medicine."
  ],
  [
    "데이터기반의학",
    "ဒေတာ အခြေခံ ဆေးပညာ",
    "Medical",
    "데이터기반의학을 연구합니다.",
    "I study data-driven medicine."
  ],
  [
    "바이오메카닉스",
    "ဇီဝ စက်မှု",
    "Engineering",
    "바이오메카닉스를 연구합니다.",
    "I study biomechanics."
  ],
  [
    "바이오소재공학",
    "ဇီဝ ပစ္စည်း အင်ဂျင်နီယာ",
    "Engineering",
    "바이오소재공학을 전공합니다.",
    "I major in biomaterials engineering."
  ],
  [
    "의료기기공학",
    "ဆေးပညာ ကိရိယာ အင်ဂျင်နီယာ",
    "Engineering",
    "의료기기공학을 공부합니다.",
    "I study medical device engineering."
  ],
  [
    "바이오신호처리",
    "ဇီဝ အချက်ပြမှု လုပ်ဆောင်မှု",
    "Engineering",
    "바이오신호처리를 연구합니다.",
    "I study biosignal processing."
  ],
  [
    "생체계측",
    "ဇီဝ တိုင်းတာမှု",
    "Engineering",
    "생체계측을 공부합니다.",
    "I study biomedical measurement."
  ],
  [
    "의료정보학",
    "ဆေးပညာ သတင်းအချက်အလက်",
    "Medical",
    "의료정보학을 연구합니다.",
    "I study health informatics."
  ],
  [
    "바이오정보학",
    "ဇီဝ သတင်းအချက်အလက်",
    "Science",
    "바이오정보학을 전공합니다.",
    "I major in bioinformatics."
  ],
  [
    "의료로봇공학",
    "ဆေးပညာ ရိုဘော့ အင်ဂျင်နီယာ",
    "Engineering",
    "의료로봇공학을 공부합니다.",
    "I study medical robotics engineering."
  ],
  [
    "재활공학",
    "ပြန်လည်ထူထောင်မှု အင်ဂျင်နီယာ",
    "Engineering",
    "재활공학을 연구합니다.",
    "I study rehabilitation engineering."
  ],
  [
    "나노생명공학",
    "နာနို ဇီဝနည်းပညာ",
    "Science",
    "나노생명공학을 전공합니다.",
    "I major in nanobiotechnology."
  ],
  [
    "양자바이오의학",
    "ကွမ်တမ် ဇီဝ ဆေးပညာ",
    "Medical",
    "양자바이오의학을 전공합니다.",
    "I major in quantum biomedicine."
  ],
  [
    "양자나노전자",
    "ကွမ်တမ် နာနို အီလက်ထရွန်",
    "Technology",
    "양자나노전자를 연구합니다.",
    "I study quantum nanoelectronics."
  ],
  [
    "양자바이오전자",
    "ကွမ်တမ် ဇီဝ အီလက်ထရွန်",
    "Technology",
    "양자바이오전자를 공부합니다.",
    "I study quantum bioelectronics."
  ],
  [
    "양자나노소재",
    "ကွမ်တမ် နာနို ပစ္စည်း",
    "Engineering",
    "양자나노소재를 전공합니다.",
    "I major in quantum nanomaterials."
  ],
  [
    "양자바이오소재",
    "ကွမ်တမ် ဇီဝ ပစ္စည်း",
    "Engineering",
    "양자바이오소재를 연구합니다.",
    "I study quantum biomaterials."
  ],
  [
    "텔레의료",
    "အကွာအဝေး ဆေးကုသမှု",
    "Medical",
    "텔레의료를 연구합니다.",
    "I study telemedicine."
  ],
  [
    "디지털의료",
    "ဒစ်ဂျစ်တယ် ဆေးပညာ",
    "Medical",
    "디지털의료를 공부합니다.",
    "I study digital medicine."
  ],
  [
    "스마트의료",
    "စမတ် ဆေးပညာ",
    "Medical",
    "스마트의료를 연구합니다.",
    "I study smart healthcare."
  ],
  [
    "모바일의료",
    "မိုဘိုင်း ဆေးပညာ",
    "Medical",
    "모바일의료를 전공합니다.",
    "I major in mobile medicine."
  ],
  [
    "웨어러블의료",
    "ဝတ်ဆင်နိုင်သော ဆေးပညာ",
    "Medical",
    "웨어러블의료를 공부합니다.",
    "I study wearable medicine."
  ],
  [
    "인공지능의료",
    "လူလုပ်ဉာဏ်ရည် ဆေးပညာ",
    "Medical",
    "인공지능의료를 연구합니다.",
    "I study AI medicine."
  ],
  [
    "빅데이터의료",
    "ကြီးမားသော ဒေတာ ဆေးပညာ",
    "Medical",
    "빅데이터의료를 전공합니다.",
    "I major in big data medicine."
  ],
  [
    "클라우드의료",
    "ကလောက်ဒ် ဆေးပညာ",
    "Medical",
    "클라우드의료를 공부합니다.",
    "I study cloud medicine."
  ],
  [
    "블록체인의료",
    "ဘလော့ခ်ချိန်း ဆေးပညာ",
    "Medical",
    "블록체인의료를 연구합니다.",
    "I study blockchain medicine."
  ],
  [
    "스마트농업",
    "စမတ် စိုက်ပျိုးရေး",
    "Agriculture",
    "스마트농업을 연구합니다.",
    "I study smart agriculture."
  ],
  [
    "디지털농업",
    "ဒစ်ဂျစ်တယ် စိုက်ပျိုးရေး",
    "Agriculture",
    "디지털농업을 전공합니다.",
    "I major in digital agriculture."
  ],
  [
    "정밀농업",
    "တိကျသော စိုက်ပျိုးရေး",
    "Agriculture",
    "정밀농업을 공부합니다.",
    "I study precision agriculture."
  ],
  [
    "수직농업",
    "ဒေါင်လိုက် စိုက်ပျိုးရေး",
    "Agriculture",
    "수직농업을 연구합니다.",
    "I study vertical farming."
  ],
  [
    "유기농업",
    "အော်ဂဲနစ် စိုက်ပျိုးရေး",
    "Agriculture",
    "유기농업을 전공합니다.",
    "I major in organic farming."
  ],
  [
    "지속가능농업",
    "ရေရှည်တည်တံ့သော စိုက်ပျိုးရေး",
    "Agriculture",
    "지속가능농업을 공부합니다.",
    "I study sustainable agriculture."
  ],
  [
    "농업IoT",
    "စိုက်ပျိုးရေး အင်တာနက် အရာဝတ္ထု",
    "Agriculture",
    "농업IoT를 연구합니다.",
    "I study agricultural IoT."
  ],
  [
    "스마트축산",
    "စမတ် မွေးမြူရေး",
    "Agriculture",
    "스마트축산을 전공합니다.",
    "I major in smart livestock farming."
  ],
  [
    "수자원관리",
    "ရေ အရင်းအမြစ် စီမံခန့်ခွဲမှု",
    "Agriculture",
    "수자원관리를 연구합니다.",
    "I study water resource management."
  ],
  [
    "스마트시티",
    "စမတ် မြို့",
    "Architecture",
    "스마트시티를 계획합니다.",
    "I plan smart cities."
  ],
  [
    "디지털시티",
    "ဒစ်ဂျစ်တယ် မြို့",
    "Architecture",
    "디지털시티를 설계합니다.",
    "I design digital cities."
  ],
  [
    "그린시티",
    "အစိမ်းရောင် မြို့",
    "Architecture",
    "그린시티를 연구합니다.",
    "I study green cities."
  ],
  [
    "에코시티",
    "ဂေဟစနစ် မြို့",
    "Architecture",
    "에코시티를 전공합니다.",
    "I major in eco-cities."
  ],
  [
    "컴팩트시티",
    "ကျစ်လစ်သော မြို့",
    "Architecture",
    "컴팩트시티를 설계합니다.",
    "I design compact cities."
  ],
  [
    "저탄소시티",
    "နိမ့်သော ကာဗွန် မြို့",
    "Architecture",
    "저탄소시티를 연구합니다.",
    "I study low-carbon cities."
  ],
  [
    "회복력시티",
    "ပြန်လည်ထူထောင်နိုင်စွမ်း မြို့",
    "Architecture",
    "회복력시티를 공부합니다.",
    "I study resilient cities."
  ],
  [
    "스마트인프라",
    "စမတ် အခြေခံအဆောက်အဦ",
    "Architecture",
    "스마트인프라를 구축합니다.",
    "I build smart infrastructure."
  ],
  [
    "디지털인프라",
    "ဒစ်ဂျစ်တယ် အခြေခံအဆောက်အဦ",
    "Architecture",
    "디지털인프라를 전공합니다.",
    "I major in digital infrastructure."
  ],
  [
    "그린인프라",
    "အစိမ်းရောင် အခြေခံအဆောက်အဦ",
    "Architecture",
    "그린인프라를 연구합니다.",
    "I study green infrastructure."
  ],
  [
    "스포츠과학",
    "အားကစား သိပ္ပံ",
    "Sports",
    "스포츠과학을 전공합니다.",
    "I major in sports science."
  ],
  [
    "스포츠의학",
    "အားကစား ဆေးပညာ",
    "Sports",
    "스포츠의학을 연구합니다.",
    "I study sports medicine."
  ],
  [
    "스포츠공학",
    "အားကစား အင်ဂျင်နီယာ",
    "Sports",
    "스포츠공학을 공부합니다.",
    "I study sports engineering."
  ],
  [
    "스포츠기술",
    "အားကစား နည်းပညာ",
    "Sports",
    "스포츠기술을 전공합니다.",
    "I major in sports technology."
  ],
  [
    "스포츠분석",
    "အားကစား ခွဲခြမ်းစိတ်ဖြာမှု",
    "Sports",
    "스포츠분석을 연구합니다.",
    "I study sports analytics."
  ],
  [
    "스포츠데이터",
    "အားကစား ဒေတာ",
    "Sports",
    "스포츠데이터를 공부합니다.",
    "I study sports data."
  ],
  [
    "스포츠인공지능",
    "အားကစား လူလုပ်ဉာဏ်ရည်",
    "Sports",
    "스포츠인공지능을 전공합니다.",
    "I major in sports AI."
  ],
  [
    "스포츠빅데이터",
    "အားကစား ကြီးမားသော ဒေတာ",
    "Sports",
    "스포츠빅데이터를 연구합니다.",
    "I study sports big data."
  ],
  [
    "스포츠웨어러블",
    "အားကစား ဝတ်ဆင်နိုင်သော",
    "Sports",
    "스포츠웨어러블을 공부합니다.",
    "I study sports wearables."
  ],
  [
    "스포츠가상현실",
    "အားကစား အတုအယောင် အမှန်တကယ်",
    "Sports",
    "스포츠가상현실을 전공합니다.",
    "I major in sports VR."
  ],
  [
    "디지털경영",
    "ဒစ်ဂျစ်တယ် စီမံခန့်ခွဲမှု",
    "Business",
    "디지털경영을 도입합니다.",
    "We introduce digital management."
  ],
  [
    "스마트경영",
    "စမတ် စီမံခန့်ခွဲမှု",
    "Business",
    "스마트경영을 연구합니다.",
    "I study smart management."
  ],
  [
    "데이터경영",
    "ဒေတာ စီမံခန့်ခွဲမှု",
    "Business",
    "데이터경영을 전공합니다.",
    "I major in data management."
  ],
  [
    "인공지능경영",
    "လူလုပ်ဉာဏ်ရည် စီမံခန့်ခွဲမှု",
    "Business",
    "인공지능경영을 공부합니다.",
    "I study AI management."
  ],
  [
    "블록체인경영",
    "ဘလော့ခ်ချိန်း စီမံခန့်ခွဲမှု",
    "Business",
    "블록체인경영을 연구합니다.",
    "I study blockchain management."
  ],
  [
    "클라우드경영",
    "ကလောက်ဒ် စီမံခန့်ခွဲမှု",
    "Business",
    "클라우드경영을 전공합니다.",
    "I major in cloud management."
  ],
  [
    "모바일경영",
    "မိုဘိုင်း စီမံခန့်ခွဲမှု",
    "Business",
    "모바일경영을 공부합니다.",
    "I study mobile management."
  ],
  [
    "웨어러블경영",
    "ဝတ်ဆင်နိုင်သော စီမံခန့်ခွဲမှု",
    "Business",
    "웨어러블경영을 연구합니다.",
    "I study wearable management."
  ],
  [
    "사물인터넷경영",
    "အင်တာနက် အရာဝတ္ထု စီမံခန့်ခွဲမှု",
    "Business",
    "사물인터넷경영을 전공합니다.",
    "I major in IoT management."
  ],
  [
    "빅데이터경영",
    "ကြီးမားသော ဒေတာ စီမံခန့်ခွဲမှု",
    "Business",
    "빅데이터경영을 공부합니다.",
    "I study big data management."
  ],
  [
    "전자법률",
    "အီလက်ထရွန်နစ် ဥပဒေ",
    "Legal",
    "전자법률을 전공합니다.",
    "I major in electronic law."
  ],
  [
    "디지털법률",
    "ဒစ်ဂျစ်တယ် ဥပဒေ",
    "Legal",
    "디지털법률을 공부합니다.",
    "I study digital law."
  ],
  [
    "블록체인법률",
    "ဘလော့ခ်ချိန်း ဥပဒေ",
    "Legal",
    "블록체인법률을 전공합니다.",
    "I major in blockchain law."
  ],
  [
    "인공지능법률",
    "လူလုပ်ဉာဏ်ရည် ဥပဒေ",
    "Legal",
    "인공지능법률을 공부합니다.",
    "I study AI law."
  ],
  [
    "로봇법률",
    "ရိုဘော့ ဥပဒေ",
    "Legal",
    "로봇법률을 연구합니다.",
    "I study robot law."
  ],
  [
    "자율주행법률",
    "ကိုယ်ပိုင် မောင်းနှင်မှု ဥပဒေ",
    "Legal",
    "자율주행법률을 전공합니다.",
    "I major in autonomous vehicle law."
  ],
  [
    "드론법률",
    "ဒရုန်း ဥပဒေ",
    "Legal",
    "드론법률을 공부합니다.",
    "I study drone law."
  ],
  [
    "3D프린팅법률",
    "3D ပုံနှိပ် ဥပဒေ",
    "Legal",
    "3D프린팅법률을 연구합니다.",
    "I study 3D printing law."
  ],
  [
    "나노의학기술",
    "နာနို ဆေးပညာ နည်းပညာ",
    "Medical",
    "나노의학기술을 개발합니다.",
    "I develop nanomedicine technology."
  ],
  [
    "바이오의학기술",
    "ဇီဝ ဆေးပညာ နည်းပညာ",
    "Medical",
    "바이오의학기술을 연구합니다.",
    "I study biomedical technology."
  ],
  [
    "나노바이오의학기술",
    "နာနို ဇီဝ ဆေးပညာ နည်းပညာ",
    "Medical",
    "나노바이오의학기술을 전공합니다.",
    "I major in nanobiomedical technology."
  ],
  [
    "양자의학",
    "ကွမ်တမ် ဆေးပညာ",
    "Medical",
    "양자의학을 공부합니다.",
    "I study quantum medicine."
  ],
  [
    "양자나노의학기술",
    "ကွမ်တမ် နာနို ဆေးပညာ နည်းပညာ",
    "Medical",
    "양자나노의학기술을 연구합니다.",
    "I study quantum nanomedicine technology."
  ],
  [
    "양자바이오의학기술",
    "ကွမ်တမ် ဇီဝ ဆေးပညာ နည်းပညာ",
    "Medical",
    "양자바이오의학기술을 전공합니다.",
    "I major in quantum biomedicine technology."
  ],
  [
    "나노바이오공학",
    "နာနို ဇီဝ အင်ဂျင်နီယာ",
    "Engineering",
    "나노바이오공학을 공부합니다.",
    "I study nanobioengineering."
  ],
  [
    "바이오나노공학",
    "ဇီဝ နာနို အင်ဂျင်နီယာ",
    "Engineering",
    "바이오나노공학을 연구합니다.",
    "I study bionanoengineering."
  ],
  [
    "양자나노공학",
    "ကွမ်တမ် နာနို အင်ဂျင်နီယာ",
    "Engineering",
    "양자나노공학을 전공합니다.",
    "I major in quantum nanoengineering."
  ],
  [
    "양자바이오공학",
    "ကွမ်တမ် ဇီဝ အင်ဂျင်နီယာ",
    "Engineering",
    "양자바이오공학을 공부합니다.",
    "I study quantum bioengineering."
  ],
  [
    "나노바이오소재",
    "နာနို ဇီဝ ပစ္စည်း",
    "Engineering",
    "나노바이오소재를 연구합니다.",
    "I study nanobiomaterials."
  ],
  [
    "바이오나노소재",
    "ဇီဝ နာနို ပစ္စည်း",
    "Engineering",
    "바이오나노소재를 전공합니다.",
    "I major in bionanomaterials."
  ],
  [
    "나노바이오센서",
    "နာနို ဇီဝ အာရုံခံကိရိယာ",
    "Technology",
    "나노바이오센서를 개발합니다.",
    "I develop nanobiosensors."
  ],
  [
    "바이오나노센서",
    "ဇီဝ နာနို အာရုံခံကိရိယာ",
    "Technology",
    "바이오나노센서를 연구합니다.",
    "I study bionanosensors."
  ],
  [
    "양자나노센서",
    "ကွမ်တမ် နာနို အာရုံခံကိရိယာ",
    "Technology",
    "양자나노센서를 전공합니다.",
    "I major in quantum nanosensors."
  ],
  [
    "양자바이오센서",
    "ကွမ်တမ် ဇီဝ အာရုံခံကိရိယာ",
    "Technology",
    "양자바이오센서를 공부합니다.",
    "I study quantum biosensors."
  ],
  [
    "나노바이오이미징",
    "နာနို ဇီဝ ပုံရိပ်",
    "Technology",
    "나노바이오이미징을 연구합니다.",
    "I study nanobioimaging."
  ],
  [
    "바이오나노이미징",
    "ဇီဝ နာနို ပုံရိပ်",
    "Technology",
    "바이오나노이미징을 전공합니다.",
    "I major in bionanoimaging."
  ],
  [
    "양자나노이미징",
    "ကွမ်တမ် နာနို ပုံရိပ်",
    "Technology",
    "양자나노이미징을 공부합니다.",
    "I study quantum nanoimaging."
  ],
  [
    "양자바이오이미징",
    "ကွမ်တမ် ဇီဝ ပုံရိပ်",
    "Technology",
    "양자바이오이미징을 연구합니다.",
    "I study quantum bioimaging."
  ],
  [
    "나노바이오전자",
    "နာနို ဇီဝ အီလက်ထရွန်",
    "Technology",
    "나노바이오전자를 전공합니다.",
    "I major in nanobioelectronics."
  ],
  [
    "바이오나노전자",
    "ဇီဝ နာနို အီလက်ထရွန်",
    "Technology",
    "바이오나노전자를 공부합니다.",
    "I study bionanoelectronics."
  ],
  [
    "나노바이오로봇",
    "နာနို ဇီဝ ရိုဘော့",
    "Technology",
    "나노바이오로봇을 개발합니다.",
    "I develop nanobiorobots."
  ],
  [
    "바이오나노로봇",
    "ဇီဝ နာနို ရိုဘော့",
    "Technology",
    "바이오나노로봇을 연구합니다.",
    "I study bionanorobots."
  ],
  [
    "양자나노로봇",
    "ကွမ်တမ် နာနို ရိုဘော့",
    "Technology",
    "양자나노로봇을 전공합니다.",
    "I major in quantum nanorobots."
  ],
  [
    "양자바이오로봇",
    "ကွမ်တမ် ဇီဝ ရိုဘော့",
    "Technology",
    "양자바이오로봇을 공부합니다.",
    "I study quantum biorobots."
  ],
  [
    "나노바이오치료",
    "နာနို ဇီဝ ကုသမှု",
    "Medical",
    "나노바이오치료를 연구합니다.",
    "I study nanobiotherapy."
  ],
  [
    "바이오나노치료",
    "ဇီဝ နာနို ကုသမှု",
    "Medical",
    "바이오나노치료를 전공합니다.",
    "I major in bionanotherapy."
  ],
  [
    "양자나노치료",
    "ကွမ်တမ် နာနို ကုသမှု",
    "Medical",
    "양자나노치료를 공부합니다.",
    "I study quantum nanotherapy."
  ],
  [
    "양자바이오치료",
    "ကွမ်တမ် ဇီဝ ကုသမှု",
    "Medical",
    "양자바이오치료를 연구합니다.",
    "I study quantum biotherapy."
  ],
  [
    "나노바이오진단",
    "နာနို ဇီဝ ရောဂါရှာဖွေမှု",
    "Medical",
    "나노바이오진단을 전공합니다.",
    "I major in nanobiodiagnostics."
  ],
  [
    "바이오나노진단",
    "ဇီဝ နာနို ရောဂါရှာဖွေမှု",
    "Medical",
    "바이오나노진단을 공부합니다.",
    "I study bionanodiagnostics."
  ],
  [
    "양자나노진단",
    "ကွမ်တမ် နာနို ရောဂါရှာဖွေမှု",
    "Medical",
    "양자나노진단을 연구합니다.",
    "I study quantum nanodiagnostics."
  ],
  [
    "양자바이오진단",
    "ကွမ်တမ် ဇီဝ ရောဂါရှာဖွေမှု",
    "Medical",
    "양자바이오진단을 전공합니다.",
    "I major in quantum biodiagnostics."
  ],
  [
    "나노바이오약물전달",
    "နာနို ဇီဝ ဆေးဝါး ပို့ဆောင်မှု",
    "Medical",
    "나노바이오약물전달을 연구합니다.",
    "I study nanobio drug delivery."
  ],
  [
    "바이오나노약물전달",
    "ဇီဝ နာနို ဆေးဝါး ပို့ဆောင်မှု",
    "Medical",
    "바이오나노약물전달을 전공합니다.",
    "I major in bionano drug delivery."
  ],
  [
    "양자나노약물전달",
    "ကွမ်တမ် နာနို ဆေးဝါး ပို့ဆောင်မှု",
    "Medical",
    "양자나노약물전달을 공부합니다.",
    "I study quantum nano drug delivery."
  ],
  [
    "양자바이오약물전달",
    "ကွမ်တမ် ဇီဝ ဆေးဝါး ပို့ဆောင်မှု",
    "Medical",
    "양자바이오약물전달을 연구합니다.",
    "I study quantum bio drug delivery."
  ],
  [
    "나노바이오의료기기",
    "နာနို ဇီဝ ဆေးပညာ ကိရိယာ",
    "Medical",
    "나노바이오의료기기를 개발합니다.",
    "I develop nanobio medical devices."
  ],
  [
    "바이오나노의료기기",
    "ဇီဝ နာနို ဆေးပညာ ကိရိယာ",
    "Medical",
    "바이오나노의료기기를 전공합니다.",
    "I major in bionano medical devices."
  ],
  [
    "양자나노의료기기",
    "ကွမ်တမ် နာနို ဆေးပညာ ကိရိယာ",
    "Medical",
    "양자나노의료기기를 공부합니다.",
    "I study quantum nano medical devices."
  ],
  [
    "양자바이오의료기기",
    "ကွမ်တမ် ဇီဝ ဆေးပညာ ကိရိယာ",
    "Medical",
    "양자바이오의료기기를 연구합니다.",
    "I study quantum bio medical devices."
  ],
  [
    "생체인식",
    "ဇီဝ အသိအမှတ်ပြုမှု",
    "Technology",
    "생체인식을 연구합니다.",
    "I study biometrics."
  ],
  [
    "홀로그래피",
    "ဟိုလိုဂရပ်ဖီ",
    "Technology",
    "홀로그래피를 전공합니다.",
    "I major in holography."
  ],
  [
    "광전자학",
    "အလင်း အီလက်ထရွန်နစ်",
    "Engineering",
    "광전자학을 공부합니다.",
    "I study optoelectronics."
  ],
  [
    "마이크로일렉트로닉스",
    "မိုက်ခရို အီလက်ထရွန်နစ်",
    "Engineering",
    "마이크로일렉트로닉스를 연구합니다.",
    "I study microelectronics."
  ],
  [
    "나노일렉트로닉스",
    "နာနို အီလက်ထရွန်နစ်",
    "Engineering",
    "나노일렉트로닉스를 전공합니다.",
    "I major in nanoelectronics."
  ],
  [
    "스핀트로닉스",
    "စပင်း အီလက်ထရွန်နစ်",
    "Engineering",
    "스핀트로닉스를 공부합니다.",
    "I study spintronics."
  ],
  [
    "유기전자",
    "အော်ဂဲနစ် အီလက်ထရွန်နစ်",
    "Engineering",
    "유기전자를 연구합니다.",
    "I study organic electronics."
  ],
  [
    "플렉서블전자",
    "ကွေးညွှတ်နိုင်သော အီလက်ထရွန်နစ်",
    "Engineering",
    "플렉서블전자를 개발합니다.",
    "I develop flexible electronics."
  ],
  [
    "인쇄전자",
    "ပုံနှိပ်သော အီလက်ထရွန်နစ်",
    "Engineering",
    "인쇄전자를 전공합니다.",
    "I major in printed electronics."
  ],
  [
    "의료영상",
    "ဆေးပညာ ပုံရိပ်",
    "Medical",
    "의료영상을 분석합니다.",
    "I analyze medical imaging."
  ],
  [
    "생체신호",
    "ဇီဝ အချက်ပြမှု",
    "Medical",
    "생체신호를 분석합니다.",
    "I analyze biosignals."
  ],
  [
    "의료데이터",
    "ဆေးပညာ ဒေတာ",
    "Medical",
    "의료데이터를 연구합니다.",
    "I study medical data."
  ],
  [
    "자기소재",
    "သံလိုက် ပစ္စည်း",
    "Engineering",
    "자기소재를 연구합니다.",
    "I study magnetic materials."
  ],
  [
    "나노튜브",
    "နာနို ပြွန်",
    "Engineering",
    "나노튜브를 공부합니다.",
    "I study nanotubes."
  ],
  [
    "클라우드네이티브",
    "ကလောက်ဒ် မူရင်း",
    "Computer Science",
    "클라우드네이티브를 구축합니다.",
    "I build cloud-native."
  ],
  [
    "네트워크함 virtualization",
    "ကွန်ရက် အတုအယောင်",
    "Technology",
    "네트워크가상화를 공부합니다.",
    "I study network virtualization."
  ],
  [
    "우주탐사로봇",
    "အာကာသ စူးစမ်းရှာဖွေရေး ရိုဘော့",
    "Science",
    "우주탐사로봇을 개발합니다.",
    "I develop space exploration robots."
  ],
  [
    "행성탐사",
    "ဂြိုဟ် စူးစမ်းရှာဖွေမှု",
    "Science",
    "행성탐사를 수행합니다.",
    "I conduct planetary exploration."
  ],
  [
    "우주광학",
    "အာကာသ အလင်း",
    "Science",
    "우주광학을 연구합니다.",
    "I study space optics."
  ],
  [
    "우주통신",
    "အာကာသ ဆက်သွယ်ရေး",
    "Science",
    "우주통신을 전공합니다.",
    "I major in space communication."
  ],
  [
    "위성항법",
    "ဂြိုဟ်တု လမ်းညွှန်",
    "Science",
    "위성항법을 공부합니다.",
    "I study satellite navigation."
  ],
  [
    "우주기상",
    "အာကာသ ရာသီဥတု",
    "Science",
    "우주기상을 연구합니다.",
    "I study space weather."
  ],
  [
    "우주방사선",
    "အာကာသ ရေဒီယို",
    "Science",
    "우주방사선을 분석합니다.",
    "I analyze space radiation."
  ],
  [
    "우주생명과학",
    "အာကာသ ဇီဝ သိပ္ပံ",
    "Science",
    "우주생명과학을 전공합니다.",
    "I major in space life sciences."
  ],
  [
    "우주의학",
    "အာကာသ ဆေးပညာ",
    "Medical",
    "우주의학을 공부합니다.",
    "I study space medicine."
  ],
  [
    "우주식품",
    "အာကာသ အစားအစာ",
    "Science",
    "우주식품을 개발합니다.",
    "I develop space food."
  ],
  [
    "탄소포집기술",
    "ကာဗွန် ဖမ်းယူမှု နည်းပညာ",
    "Environment",
    "탄소포집기술을 개발합니다.",
    "I develop carbon capture technology."
  ],
  [
    "탄소저장기술",
    "ကာဗွန် သိုလှောင်မှု နည်းပညာ",
    "Environment",
    "탄소저장기술을 연구합니다.",
    "I study carbon storage technology."
  ],
  [
    "탄소활용기술",
    "ကာဗွန် အသုံးပြုမှု နည်းပညာ",
    "Environment",
    "탄소활용기술을 전공합니다.",
    "I major in carbon utilization technology."
  ],
  [
    "폐기물처리",
    "အမှိုက် လုပ်ဆောင်မှု",
    "Environment",
    "폐기물처리를 공부합니다.",
    "I study waste treatment."
  ],
  [
    "재생에너지시스템",
    "ပြန်လည်ပြည့်ဖြိုးမြဲ စွမ်းအင် စနစ်",
    "Environment",
    "재생에너지시스템을 구축합니다.",
    "I build renewable energy systems."
  ],
  [
    "나노의료기기",
    "နာနို ဆေးပညာ ကိရိယာ",
    "Medical",
    "나노의료기기를 개발합니다.",
    "I develop nano medical devices."
  ],
  [
    "바이오의료기기",
    "ဇီဝ ဆေးပညာ ကိရိယာ",
    "Medical",
    "바이오의료기기를 전공합니다.",
    "I major in bio medical devices."
  ],
  [
    "양자의료기기",
    "ကွမ်တမ် ဆေးပညာ ကိရိယာ",
    "Medical",
    "양자의료기기를 공부합니다.",
    "I study quantum medical devices."
  ],
  [
    "스마트의료기기",
    "စမတ် ဆေးပညာ ကိရိယာ",
    "Medical",
    "스마트의료기기를 연구합니다.",
    "I study smart medical devices."
  ],
  [
    "웨어러블의료기기",
    "ဝတ်ဆင်နိုင်သော ဆေးပညာ ကိရိယာ",
    "Medical",
    "웨어러블의료기기를 전공합니다.",
    "I major in wearable medical devices."
  ],
  [
    "디지털의료기기",
    "ဒစ်ဂျစ်တယ် ဆေးပညာ ကိရိယာ",
    "Medical",
    "디지털의료기기를 공부합니다.",
    "I study digital medical devices."
  ],
  [
    "정형외과",
    "အရိုးအဆစ်",
    "Medical",
    "정형외과 치료를 받습니다.",
    "I receive orthopedic treatment."
  ],
  [
    "신경외과",
    "အာရုံကြော ခွဲစိတ်ကုသမှု",
    "Medical",
    "신경외과 수술을 받습니다.",
    "I receive neurosurgical treatment."
  ],
  [
    "흉부외과",
    "ရင်ဘတ် ခွဲစိတ်ကုသမှု",
    "Medical",
    "흉부외과를 전공합니다.",
    "I major in thoracic surgery."
  ],
  [
    "소아외과",
    "ကလေး ခွဲစိတ်ကုသမှု",
    "Medical",
    "소아외과를 연구합니다.",
    "I study pediatric surgery."
  ],
  [
    "성형외과",
    "ပုံဆောင်ခြင်း ခွဲစိတ်ကုသမှု",
    "Medical",
    "성형외과를 공부합니다.",
    "I study plastic surgery."
  ],
  [
    "비뇨기과",
    "ဆီးနှင့် လိင်အင်္ဂါ",
    "Medical",
    "비뇨기과 진료를 받습니다.",
    "I receive urology treatment."
  ],
  [
    "안과",
    "မျက်စိ",
    "Medical",
    "안과 검진을 받습니다.",
    "I receive ophthalmology examination."
  ],
  [
    "이비인후과",
    "နား နှာခေါင်း လည်ချောင်း",
    "Medical",
    "이비인후과 진료를 받습니다.",
    "I receive ENT treatment."
  ],
  [
    "피부과",
    "အရေပြား",
    "Medical",
    "피부과 치료를 받습니다.",
    "I receive dermatology treatment."
  ],
  [
    "정신건강의학과",
    "စိတ်ကျန်းမာရေး",
    "Medical",
    "정신건강의학과 상담을 받습니다.",
    "I receive mental health counseling."
  ],
  [
    "증강현실",
    "တိုးမြှင့်ထားသော အမှန်တကယ်",
    "Technology",
    "증강현실을 개발합니다.",
    "I develop augmented reality."
  ],
  [
    "가상현실",
    "အတုအယောင် အမှန်တကယ်",
    "Technology",
    "가상현실을 연구합니다.",
    "I study virtual reality."
  ],
  [
    "혼합현실",
    "ရောနှော အမှန်တကယ်",
    "Technology",
    "혼합현실을 전공합니다.",
    "I major in mixed reality."
  ],
  [
    "퓨지컴퓨팅",
    "မှုန်ဝါးသော ကွန်ပျူတာ",
    "Technology",
    "퓨지컴퓨팅을 연구합니다.",
    "I study fog computing."
  ],
  [
    "데이터사이언스",
    "ဒေတာ သိပ္ပံ",
    "Business",
    "데이터사이언스를 전공합니다.",
    "I major in data science."
  ],
  [
    "데이터분석",
    "ဒေတာ ခွဲခြမ်းစိတ်ဖြာမှု",
    "Business",
    "데이터분석을 수행합니다.",
    "I perform data analysis."
  ],
  [
    "비즈니스인텔리전스",
    "လုပ်ငန်း ဉာဏ်ရည်",
    "Business",
    "비즈니스인텔리전스를 구축합니다.",
    "I build business intelligence."
  ],
  [
    "예측분석",
    "ခန့်မှန်း ခွဲခြမ်းစိတ်ဖြာမှု",
    "Business",
    "예측분석을 연구합니다.",
    "I study predictive analytics."
  ],
  [
    "고객분석",
    "ဖောက်သည် ခွဲခြမ်းစိတ်ဖြာမှု",
    "Business",
    "고객분석을 실시합니다.",
    "I conduct customer analytics."
  ],
  [
    "마케팅분석",
    "စျေးကွက်ရှာဖွေရေး ခွဲခြမ်းစိတ်ဖြာမှု",
    "Business",
    "마케팅분석을 전공합니다.",
    "I major in marketing analytics."
  ],
  [
    "재무분석",
    "ဘဏ္ဍာရေး ခွဲခြမ်းစိတ်ဖြာမှု",
    "Business",
    "재무분석을 연구합니다.",
    "I study financial analysis."
  ],
  [
    "운영분석",
    "လုပ်ငန်း ခွဲခြမ်းစိတ်ဖြာမှု",
    "Business",
    "운영분석을 공부합니다.",
    "I study operations analytics."
  ],
  [
    "의사결정분석",
    "ဆုံးဖြတ်ချက် ခွဲခြမ်းစိတ်ဖြာမှု",
    "Business",
    "의사결정분석을 전공합니다.",
    "I major in decision analytics."
  ],
  [
    "정책연구",
    "မူဝါဒ သုတေသန",
    "Social Science",
    "정책연구를 수행합니다.",
    "I conduct policy research."
  ],
  [
    "사회조사",
    "လူမှုရေး စစ်ဆေးမှု",
    "Social Science",
    "사회조사를 실시합니다.",
    "I conduct social surveys."
  ],
  [
    "정량연구",
    "ကိန်းဂဏန်း သုတေသန",
    "Social Science",
    "정량연구를 합니다.",
    "I conduct quantitative research."
  ],
  [
    "정성연구",
    "အရည်အသွေး သုတေသန",
    "Social Science",
    "정성연구를 전공합니다.",
    "I major in qualitative research."
  ],
  [
    "혼합연구",
    "ရောနှော သုတေသန",
    "Social Science",
    "혼합연구를 연구합니다.",
    "I study mixed methods research."
  ],
  [
    "행동연구",
    "အပြုအမူ သုတေသန",
    "Social Science",
    "행동연구를 공부합니다.",
    "I study behavioral research."
  ],
  [
    "비교연구",
    "နှိုင်းယှဉ် သုတေသန",
    "Social Science",
    "비교연구를 전공합니다.",
    "I major in comparative research."
  ],
  [
    "종단연구",
    "ရှည်လျားသော သုတေသန",
    "Social Science",
    "종단연구를 연구합니다.",
    "I study longitudinal research."
  ],
  [
    "횡단연구",
    "ဖြတ်သန်း သုတေသန",
    "Social Science",
    "횡단연구를 공부합니다.",
    "I study cross-sectional research."
  ],
  [
    "실험연구",
    "စမ်းသပ်မှု သုတေသန",
    "Social Science",
    "실험연구를 전공합니다.",
    "I major in experimental research."
  ],
  [
    "연기학",
    "သရုပ်ဆောင်",
    "Arts",
    "연기학을 전공합니다.",
    "I major in acting."
  ],
  [
    "연출학",
    "ဒါရိုက်တာ",
    "Arts",
    "연출학을 연구합니다.",
    "I study directing."
  ],
  [
    "제작학",
    "ထုတ်လုပ်မှု",
    "Arts",
    "제작학을 공부합니다.",
    "I study production."
  ],
  [
    "시나리오",
    "စာတမ်း",
    "Arts",
    "시나리오를 작성합니다.",
    "I write screenplays."
  ],
  [
    "영화제작",
    "ရုပ်ရှင် ထုတ်လုပ်မှု",
    "Arts",
    "영화제작을 연구합니다.",
    "I study film production."
  ],
  [
    "다큐멘터리",
    "မှတ်တမ်း",
    "Arts",
    "다큐멘터리를 제작합니다.",
    "I produce documentaries."
  ],
  [
    "애니메이션제작",
    "ရုပ်ရှင် ထုတ်လုပ်မှု",
    "Arts",
    "애니메이션제작을 전공합니다.",
    "I major in animation production."
  ],
  [
    "게임디자인",
    "ဂိမ်း ဒီဇိုင်း",
    "Arts",
    "게임디자인을 연구합니다.",
    "I study game design."
  ],
  [
    "인터랙티브미디어",
    "အပြန်အလှန် မီဒီယာ",
    "Arts",
    "인터랙티브미디어를 공부합니다.",
    "I study interactive media."
  ],
  [
    "뉴미디어아트",
    "ခေတ်သစ် မီဒီယာ အနုပညာ",
    "Arts",
    "뉴미디어아트를 전공합니다.",
    "I major in new media art."
  ],
  [
    "친환경기술",
    "ပတ်ဝန်းကျင် နှင့် သင့်လျော်သော နည်းပညာ",
    "Environment",
    "친환경기술을 개발합니다.",
    "We develop eco-friendly technology."
  ],
  [
    "순환경제",
    "စက်ဝိုင်း စီးပွားရေး",
    "Environment",
    "순환경제를 추진합니다.",
    "We promote circular economy."
  ],
  [
    "녹색기술",
    "အစိမ်းရောင် နည်းပညာ",
    "Environment",
    "녹색기술을 연구합니다.",
    "I study green technology."
  ],
  [
    "기후변화대응",
    "ရာသီဥတု ပြောင်းလဲမှု တုံ့ပြန်မှု",
    "Environment",
    "기후변화대응을 전략합니다.",
    "We strategize climate change response."
  ],
  [
    "생물다양성보전",
    "ဇီဝမျိုးစုံမျိုးကွဲ ထိန်းသိမ်းမှု",
    "Environment",
    "생물다양성보전을 실천합니다.",
    "We practice biodiversity conservation."
  ],
  [
    "환경복원",
    "ပတ်ဝန်းကျင် ပြန်လည်ထူထောင်ရေး",
    "Environment",
    "환경복원을 진행합니다.",
    "We proceed with environmental restoration."
  ],
  [
    "에코디자인",
    "ဂေဟစနစ် ဒီဇိုင်း",
    "Environment",
    "에코디자인을 연구합니다.",
    "I study eco-design."
  ],
  [
    "트라우마치료",
    "စိတ်ဒဏ်ရာ ကုသမှု",
    "Psychology",
    "트라우마치료를 연구합니다.",
    "I study trauma therapy."
  ],
  [
    "가족치료",
    "မိသားစု ကုသမှု",
    "Psychology",
    "가족치료를 전공합니다.",
    "I major in family therapy."
  ],
  [
    "집단치료",
    "အုပ်စု ကုသမှု",
    "Psychology",
    "집단치료를 공부합니다.",
    "I study group therapy."
  ],
  [
    "예술치료",
    "အနုပညာ ကုသမှု",
    "Psychology",
    "예술치료를 연구합니다.",
    "I study art therapy."
  ],
  [
    "음악치료",
    "ဂီတ ကုသမှု",
    "Psychology",
    "음악치료를 전공합니다.",
    "I major in music therapy."
  ],
  [
    "놀이치료",
    "ကစားခြင်း ကုသမှု",
    "Psychology",
    "놀이치료를 공부합니다.",
    "I study play therapy."
  ],
  [
    "인지재활",
    "သိမြင်မှု ပြန်လည်ထူထောင်ရေး",
    "Psychology",
    "인지재활을 연구합니다.",
    "I study cognitive rehabilitation."
  ],
  [
    "신경재활",
    "အာရုံကြော ပြန်လည်ထူထောင်ရေး",
    "Psychology",
    "신경재활을 전공합니다.",
    "I major in neurorehabilitation."
  ],
  [
    "정신건강증진",
    "စိတ်ကျန်းမာရေး တိုးတက်စေမှု",
    "Psychology",
    "정신건강증진을 추진합니다.",
    "We promote mental health."
  ],
  [
    "규제법",
    "စည်းမျဉ်း ဥပဒေ",
    "Legal",
    "규제법을 연구합니다.",
    "I study regulatory law."
  ],
  [
    "행정규제",
    "စီမံခန့်ခွဲရေး စည်းမျဉ်း",
    "Legal",
    "행정규제를 전공합니다.",
    "I major in administrative regulation."
  ],
  [
    "경제규제",
    "စီးပွားရေး စည်းမျဉ်း",
    "Legal",
    "경제규제를 공부합니다.",
    "I study economic regulation."
  ],
  [
    "환경규제",
    "ပတ်ဝန်းကျင် စည်းမျဉ်း",
    "Legal",
    "환경규제를 연구합니다.",
    "I study environmental regulation."
  ],
  [
    "안전규제",
    "ဘေးကင်းရေး စည်းမျဉ်း",
    "Legal",
    "안전규제를 전공합니다.",
    "I major in safety regulation."
  ],
  [
    "의료법",
    "ဆေးပညာ ဥပဒေ",
    "Legal",
    "의료법을 공부합니다.",
    "I study medical law."
  ],
  [
    "생명윤리법",
    "ဇီဝ ကျင့်ဝတ် ဥပဒေ",
    "Legal",
    "생명윤리법을 연구합니다.",
    "I study bioethics law."
  ],
  [
    "정보법",
    "သတင်းအချက်အလက် ဥပဒေ",
    "Legal",
    "정보법을 전공합니다.",
    "I major in information law."
  ],
  [
    "프라이버시법",
    "ကိုယ်ရေးလုံခြုံမှု ဥပဒေ",
    "Legal",
    "프라이버시법을 공부합니다.",
    "I study privacy law."
  ],
  [
    "사이버법",
    "ဆိုက်ဘာ ဥပဒေ",
    "Legal",
    "사이버법을 연구합니다.",
    "I study cyber law."
  ],
  [
    "금융공학",
    "ငွေရေး အင်ဂျင်နီယာ",
    "Economics",
    "금융공학을 전공합니다.",
    "I major in financial engineering."
  ],
  [
    "포트폴리오이론",
    "ပို့ဆောင်မှု သီအိုရီ",
    "Economics",
    "포트폴리오이론을 공부합니다.",
    "I study portfolio theory."
  ],
  [
    "자산배분",
    "ပိုင်ဆိုင်မှု ခွဲဝေမှု",
    "Economics",
    "자산배분 전략을 수립합니다.",
    "I establish asset allocation strategies."
  ],
  [
    "재무모델링",
    "ဘဏ္ဍာရေး ပုံစံ",
    "Economics",
    "재무모델링을 구축합니다.",
    "I build financial models."
  ],
  [
    "기업가치평가",
    "လုပ်ငန်း တန်ဖိုး အကဲဖြတ်မှု",
    "Economics",
    "기업가치평가를 합니다.",
    "I conduct business valuation."
  ],
  [
    "자본시장",
    "အရင်းအနှီး စျေးကွက်",
    "Economics",
    "자본시장을 분석합니다.",
    "I analyze capital markets."
  ],
  [
    "금융시장",
    "ငွေရေး စျေးကွက်",
    "Economics",
    "금융시장을 연구합니다.",
    "I study financial markets."
  ],
  [
    "국제금융",
    "နိုင်ငံတကာ ငွေရေး",
    "Economics",
    "국제금융을 전공합니다.",
    "I major in international finance."
  ],
  [
    "자동화시스템",
    "အလိုအလျောက် စနစ်",
    "Engineering",
    "자동화시스템을 개발합니다.",
    "I develop automation systems."
  ],
  [
    "스마트팩토리",
    "စမတ် စက်ရုံ",
    "Engineering",
    "스마트팩토리를 구축합니다.",
    "I build smart factories."
  ],
  [
    "산업4.0",
    "စက်မှု 4.0",
    "Engineering",
    "산업4.0을 연구합니다.",
    "I study Industry 4.0."
  ],
  [
    "디지털트윈",
    "ဒစ်ဂျစ်တယ် ထပ်တူ",
    "Engineering",
    "디지털트윈을 개발합니다.",
    "I develop digital twins."
  ],
  [
    "지능형시스템",
    "ဉာဏ်ရည် စနစ်",
    "Engineering",
    "지능형시스템을 전공합니다.",
    "I major in intelligent systems."
  ],
  [
    "자율시스템",
    "ကိုယ်ပိုင် စနစ်",
    "Engineering",
    "자율시스템을 공부합니다.",
    "I study autonomous systems."
  ],
  [
    "인간로봇상호작용",
    "လူ ရိုဘော့ အပြန်အလှန်",
    "Engineering",
    "인간로봇상호작용을 연구합니다.",
    "I study human-robot interaction."
  ],
  [
    "공중보건",
    "အများပြည်သူ ကျန်းမာရေး",
    "Medical",
    "공중보건을 연구합니다.",
    "I study public health."
  ],
  [
    "역학",
    "ရောဂါဗေဒ",
    "Medical",
    "역학을 공부합니다.",
    "I study epidemiology."
  ],
  [
    "보건통계",
    "ကျန်းမာရေး စာရင်းအင်း",
    "Medical",
    "보건통계를 전공합니다.",
    "I major in health statistics."
  ],
  [
    "건강증진",
    "ကျန်းမာရေး တိုးတက်စေမှု",
    "Medical",
    "건강증진을 추진합니다.",
    "We promote health promotion."
  ],
  [
    "질병관리",
    "ရောဂါ စီမံခန့်ခွဲမှု",
    "Medical",
    "질병관리를 연구합니다.",
    "I study disease management."
  ],
  [
    "건강정보학",
    "ကျန်းမာရေး သတင်းအချက်အလက်",
    "Medical",
    "건강정보학을 공부합니다.",
    "I study health informatics."
  ],
  [
    "디지털헬스",
    "ဒစ်ဂျစ်တယ် ကျန်းမာရေး",
    "Medical",
    "디지털헬스를 연구합니다.",
    "I study digital health."
  ],
  [
    "디지털커뮤니케이션",
    "ဒစ်ဂျစ်တယ် ဆက်သွယ်ရေး",
    "Communication",
    "디지털커뮤니케이션을 연구합니다.",
    "I study digital communication."
  ],
  [
    "소셜네트워크",
    "လူမှုရေး ကွန်ရက်",
    "Communication",
    "소셜네트워크를 분석합니다.",
    "I analyze social networks."
  ],
  [
    "인플루언서마케팅",
    "ဩဇာရှိသူ စျေးကွက်ရှာဖွေရေး",
    "Communication",
    "인플루언서마케팅을 전략합니다.",
    "I strategize influencer marketing."
  ],
  [
    "바이럴마케팅",
    "ဗိုင်းရပ်စ် စျေးကွက်ရှာဖွေရေး",
    "Communication",
    "바이럴마케팅을 연구합니다.",
    "I study viral marketing."
  ],
  [
    "콘텐츠전략",
    "အကြောင်းအရာ နည်းဗျူဟာ",
    "Communication",
    "콘텐츠전략을 수립합니다.",
    "I establish content strategy."
  ],
  [
    "브랜드스토리텔링",
    "ကုန်အမှတ်တံဆိပ် ဇာတ်လမ်းပြောခြင်း",
    "Communication",
    "브랜드스토리텔링을 연구합니다.",
    "I study brand storytelling."
  ],
  [
    "크로스미디어",
    "ဖြတ်သန်း မီဒီယာ",
    "Communication",
    "크로스미디어를 전공합니다.",
    "I major in cross-media."
  ],
  [
    "트랜스미디어",
    "ဖြတ်သန်း မီဒီယာ",
    "Communication",
    "트랜스미디어를 공부합니다.",
    "I study transmedia."
  ],
  [
    "모바일저널리즘",
    "မိုဘိုင်း သတင်းစာပညာ",
    "Communication",
    "모바일저널리즘을 연구합니다.",
    "I study mobile journalism."
  ],
  [
    "시민저널리즘",
    "ပြည်သူ့ သတင်းစာပညာ",
    "Communication",
    "시민저널리즘을 전공합니다.",
    "I major in citizen journalism."
  ],
  [
    "교육공학",
    "ပညာရေး နည်းပညာ",
    "Education",
    "교육공학을 전공합니다.",
    "I major in educational technology."
  ],
  [
    "이러닝",
    "အင်တာနက် သင်ယူမှု",
    "Education",
    "이러닝을 개발합니다.",
    "I develop e-learning."
  ],
  [
    "모바일러닝",
    "မိုဘိုင်း သင်ယူမှု",
    "Education",
    "모바일러닝을 연구합니다.",
    "I study mobile learning."
  ],
  [
    "게이미피케이션",
    "ဂိမ်းပြုလုပ်ခြင်း",
    "Education",
    "게이미피케이션을 적용합니다.",
    "I apply gamification."
  ],
  [
    "적응형학습",
    "အလိုက်သင့် သင်ယူမှု",
    "Education",
    "적응형학습을 전공합니다.",
    "I major in adaptive learning."
  ],
  [
    "개인화학습",
    "ကိုယ်ပိုင် သင်ယူမှု",
    "Education",
    "개인화학습을 연구합니다.",
    "I study personalized learning."
  ],
  [
    "가상학습환경",
    "အတုအယောင် သင်ယူမှု ပတ်ဝန်းကျင်",
    "Education",
    "가상학습환경을 구축합니다.",
    "I build virtual learning environments."
  ],
  [
    "학습분석",
    "သင်ယူမှု ခွဲခြမ်းစိတ်ဖြာမှု",
    "Education",
    "학습분석을 연구합니다.",
    "I study learning analytics."
  ],
  [
    "스마트건축",
    "စမတ် ဗိသုကာ",
    "Architecture",
    "스마트건축을 연구합니다.",
    "I study smart architecture."
  ],
  [
    "생체모방건축",
    "ဇီဝ အတုယူ ဗိသုကာ",
    "Architecture",
    "생체모방건축을 전공합니다.",
    "I major in biomimetic architecture."
  ],
  [
    "패시브하우스",
    "ဆိုးသွမ်းသော အိမ်",
    "Architecture",
    "패시브하우스를 설계합니다.",
    "I design passive houses."
  ],
  [
    "제로에너지건물",
    "သုည စွမ်းအင် အဆောက်အဦ",
    "Architecture",
    "제로에너지건물을 구축합니다.",
    "I build zero-energy buildings."
  ],
  [
    "도시재생",
    "မြို့ပြ ပြန်လည်ထူထောင်ရေး",
    "Architecture",
    "도시재생을 계획합니다.",
    "I plan urban regeneration."
  ],
  [
    "생태도시",
    "ဂေဟစနစ် မြို့",
    "Architecture",
    "생태도시를 연구합니다.",
    "I study eco-cities."
  ],
  [
    "저탄소도시",
    "နိမ့်သော ကာဗွန် မြို့",
    "Architecture",
    "저탄소도시를 전공합니다.",
    "I major in low-carbon cities."
  ],
  [
    "회복력도시",
    "ပြန်လည်ထူထောင်နိုင်စွမ်း မြို့",
    "Architecture",
    "회복력도시를 공부합니다.",
    "I study resilient cities."
  ],
  [
    "미분방정식",
    "ဒစ်ဖရန်ရှယ် ညီမျှခြင်း",
    "Mathematics",
    "미분방정식을 풉니다.",
    "I solve differential equations."
  ],
  [
    "적분방정식",
    "အတိမ်တလျား ညီမျှခြင်း",
    "Mathematics",
    "적분방정식을 연구합니다.",
    "I study integral equations."
  ],
  [
    "편미분방정식",
    "တစ်စိတ်တစ်ပိုင်း ဒစ်ဖရန်ရှယ် ညီမျှခြင်း",
    "Mathematics",
    "편미분방정식을 전공합니다.",
    "I major in partial differential equations."
  ],
  [
    "복소해석학",
    "ရှုပ်ထွေးသော ခွဲခြမ်းစိတ်ဖြာမှု",
    "Mathematics",
    "복소해석학을 공부합니다.",
    "I study complex analysis."
  ],
  [
    "함수해석학",
    "လုပ်ဆောင်ချက် ခွဲခြမ်းစိတ်ဖြာမှု",
    "Mathematics",
    "함수해석학을 연구합니다.",
    "I study functional analysis."
  ],
  [
    "대수기하학",
    "က္ခရာသင်္ချာ ဂျီသြမေတြီ",
    "Mathematics",
    "대수기하학을 전공합니다.",
    "I major in algebraic geometry."
  ],
  [
    "미분기하학",
    "ဒစ်ဖရန်ရှယ် ဂျီသြမေတြီ",
    "Mathematics",
    "미분기하학을 공부합니다.",
    "I study differential geometry."
  ],
  [
    "군론",
    "အုပ်စု သီအိုရီ",
    "Mathematics",
    "군론을 연구합니다.",
    "I study group theory."
  ],
  [
    "환론",
    "အခွန်ဝန် သီအိုရီ",
    "Mathematics",
    "환론을 전공합니다.",
    "I major in ring theory."
  ],
  [
    "체론",
    "ကွင်းဆက် သီအိုရီ",
    "Mathematics",
    "체론을 공부합니다.",
    "I study field theory."
  ],
  [
    "레이저물리학",
    "လေဆာ ရူပဗေဒ",
    "Physics",
    "레이저물리학을 전공합니다.",
    "I major in laser physics."
  ],
  [
    "반도체물리학",
    "ဆီမီကွန်ဒတ်တာ ရူပဗေဒ",
    "Physics",
    "반도체물리학을 공부합니다.",
    "I study semiconductor physics."
  ],
  [
    "나노물리학",
    "နာနို ရူပဗေဒ",
    "Physics",
    "나노물리학을 전공합니다.",
    "I major in nanophysics."
  ],
  [
    "생체물리학",
    "ဇီဝ ရူပဗေဒ",
    "Physics",
    "생체물리학을 연구합니다.",
    "I study biophysics."
  ],
  [
    "천체역학",
    "နက္ခတ္တဗေဒ စွမ်းအား",
    "Physics",
    "천체역학을 공부합니다.",
    "I study celestial mechanics."
  ],
  [
    "통계물리학",
    "စာရင်းအင်း ရူပဗေဒ",
    "Physics",
    "통계물리학을 전공합니다.",
    "I major in statistical physics."
  ],
  [
    "고체물리학",
    "အစိုင်အခဲ ရူပဗေဒ",
    "Physics",
    "고체물리학을 연구합니다.",
    "I study solid state physics."
  ],
  [
    "플라즈마물리학",
    "ပလာစမာ ရူပဗေဒ",
    "Physics",
    "플라즈마물리학을 공부합니다.",
    "I study plasma physics."
  ],
  [
    "유기합성",
    "အော်ဂဲနစ် ပေါင်းစပ်မှု",
    "Chemistry",
    "유기합성을 연구합니다.",
    "I study organic synthesis."
  ],
  [
    "무기합성",
    "အော်ဂဲနစ် မဟုတ်သော ပေါင်းစပ်မှု",
    "Chemistry",
    "무기합성을 전공합니다.",
    "I major in inorganic synthesis."
  ],
  [
    "고분자화학",
    "ပိုလီမာ ဓာတုဗေဒ",
    "Chemistry",
    "고분자화학을 공부합니다.",
    "I study polymer chemistry."
  ],
  [
    "유기금속화학",
    "အော်ဂဲနစ် သတ္တု ဓာတုဗေဒ",
    "Chemistry",
    "유기금속화학을 연구합니다.",
    "I study organometallic chemistry."
  ],
  [
    "촉매화학",
    "ဖျန်းဆေး ဓာတုဗေဒ",
    "Chemistry",
    "촉매화학을 전공합니다.",
    "I major in catalysis chemistry."
  ],
  [
    "전기화학",
    "လျှပ်စစ် ဓာတုဗေဒ",
    "Chemistry",
    "전기화학을 공부합니다.",
    "I study electrochemistry."
  ],
  [
    "광화학",
    "အလင်း ဓာတုဗေဒ",
    "Chemistry",
    "광화학을 연구합니다.",
    "I study photochemistry."
  ],
  [
    "열화학",
    "အပူ ဓာတုဗေဒ",
    "Chemistry",
    "열화학을 전공합니다.",
    "I major in thermochemistry."
  ],
  [
    "결정화학",
    "ပုံဆောင်ခဲ ဓာတုဗေဒ",
    "Chemistry",
    "결정화학을 공부합니다.",
    "I study crystallography."
  ],
  [
    "표면화학",
    "မျက်နှာပြင် ဓာတုဗေဒ",
    "Chemistry",
    "표면화학을 연구합니다.",
    "I study surface chemistry."
  ],
  [
    "생태생물학",
    "ဂေဟစနစ် ဇီဝဗေဒ",
    "Biology",
    "생태생물학을 연구합니다.",
    "I study ecological biology."
  ],
  [
    "해양생물학",
    "ပင်လယ် ဇီဝဗေဒ",
    "Biology",
    "해양생물학을 공부합니다.",
    "I study marine biology."
  ],
  [
    "식물생리학",
    "အပင်များ ဇီဝကမ္မဗေဒ",
    "Biology",
    "식물생리학을 전공합니다.",
    "I major in plant physiology."
  ],
  [
    "동물생리학",
    "တိရစ္ဆာန်များ ဇီဝကမ္မဗေဒ",
    "Biology",
    "동물생리학을 연구합니다.",
    "I study animal physiology."
  ],
  [
    "미생물생리학",
    "ပိုးမွှားများ ဇီဝကမ္မဗေဒ",
    "Biology",
    "미생물생리학을 공부합니다.",
    "I study microbial physiology."
  ],
  [
    "생화학",
    "ဇီဝ ဓာတုဗေဒ",
    "Biology",
    "생화학을 전공합니다.",
    "I major in biochemistry."
  ],
  [
    "앙상블학습",
    "ပေါင်းစည်းသော သင်ယူမှု",
    "Computer Science",
    "앙상블학습을 사용합니다.",
    "I use ensemble learning."
  ],
  [
    "데이터마이닝",
    "ဒေတာ တူးဖော်မှု",
    "Computer Science",
    "데이터마이닝을 수행합니다.",
    "I perform data mining."
  ],
  [
    "조직학습",
    "အဖွဲ့အစည်း သင်ယူမှု",
    "Business",
    "조직학습을 촉진합니다.",
    "I promote organizational learning."
  ],
  [
    "기업가정신",
    "စွန့်စားရဲသော စိတ်ဓာတ်",
    "Business",
    "기업가정신을 키웁니다.",
    "I cultivate entrepreneurship."
  ],
  [
    "벤처경영",
    "စွန့်စားရဲသော စီမံခန့်ခွဲမှု",
    "Business",
    "벤처경영을 연구합니다.",
    "I study venture management."
  ],
  [
    "글로벌경영",
    "ကမ္ဘာလုံး စီမံခန့်ခွဲမှု",
    "Business",
    "글로벌경영을 전공합니다.",
    "I major in global management."
  ],
  [
    "지속가능경영",
    "ရေရှည်တည်တံ့သော စီမံခန့်ခွဲမှု",
    "Business",
    "지속가능경영을 실천합니다.",
    "I practice sustainable management."
  ],
  [
    "서비스경영",
    "ဝန်ဆောင်မှု စီမံခန့်ခွဲမှု",
    "Business",
    "서비스경영을 연구합니다.",
    "I study service management."
  ],
  [
    "문화연구",
    "ယဉ်ကျေးမှု သုတေသန",
    "Social Science",
    "문화연구를 합니다.",
    "I conduct cultural studies."
  ],
  [
    "비교문화학",
    "နှိုင်းယှဉ် ယဉ်ကျေးမှု",
    "Social Science",
    "비교문화학을 연구합니다.",
    "I study comparative culture."
  ],
  [
    "문화인류학",
    "ယဉ်ကျေးမှု လူသားဗေဒ",
    "Social Science",
    "문화인류학을 전공합니다.",
    "I major in cultural anthropology."
  ],
  [
    "역사학",
    "သမိုင်း",
    "Social Science",
    "역사학을 공부합니다.",
    "I study history."
  ],
  [
    "민속학",
    "လူမှုရေး ရိုးရာ",
    "Social Science",
    "민속학을 전공합니다.",
    "I major in folklore studies."
  ],
  [
    "종교학",
    "ဘာသာရေး",
    "Social Science",
    "종교학을 공부합니다.",
    "I study religious studies."
  ],
  [
    "신학",
    "ဘာသာရေး သိပ္ပံ",
    "Social Science",
    "신학을 연구합니다.",
    "I study theology."
  ],
  [
    "철학사",
    "ဒဿနိကဗေဒ သမိုင်း",
    "Social Science",
    "철학사를 전공합니다.",
    "I major in history of philosophy."
  ],
  [
    "미술사",
    "ပန်းချီ သမိုင်း",
    "Arts",
    "미술사를 연구합니다.",
    "I study art history."
  ],
  [
    "음악사",
    "ဂီတ သမိုင်း",
    "Arts",
    "음악사를 전공합니다.",
    "I major in music history."
  ],
  [
    "문학사",
    "စာပေ သမိုင်း",
    "Arts",
    "문학사를 공부합니다.",
    "I study literary history."
  ],
  [
    "연극사",
    "ပြဇာတ် သမိုင်း",
    "Arts",
    "연극사를 연구합니다.",
    "I study theater history."
  ],
  [
    "영화사",
    "ရုပ်ရှင် သမိုင်း",
    "Arts",
    "영화사를 전공합니다.",
    "I major in film history."
  ],
  [
    "예술비평",
    "အနုပညာ ဝေဖန်မှု",
    "Arts",
    "예술비평을 작성합니다.",
    "I write art criticism."
  ],
  [
    "문학비평",
    "စာပေ ဝေဖန်မှု",
    "Arts",
    "문학비평을 연구합니다.",
    "I study literary criticism."
  ],
  [
    "문화비평",
    "ယဉ်ကျေးမှု ဝေဖန်မှု",
    "Arts",
    "문화비평을 전공합니다.",
    "I major in cultural criticism."
  ],
  [
    "예술철학",
    "အနုပညာ ဒဿနိကဗေဒ",
    "Arts",
    "예술철학을 공부합니다.",
    "I study philosophy of art."
  ],
  [
    "기후학",
    "ရာသီဥတု",
    "Environment",
    "기후학을 공부합니다.",
    "I study climatology."
  ],
  [
    "대기과학",
    "လေထု သိပ္ပံ",
    "Environment",
    "대기과학을 연구합니다.",
    "I study atmospheric science."
  ],
  [
    "해양과학",
    "ပင်လယ် သိပ္ပံ",
    "Environment",
    "해양과학을 전공합니다.",
    "I major in oceanography."
  ],
  [
    "지구과학",
    "ကမ္ဘာ သိပ္ပံ",
    "Environment",
    "지구과학을 공부합니다.",
    "I study earth science."
  ],
  [
    "환경화학",
    "ပတ်ဝန်းကျင် ဓာတုဗေဒ",
    "Environment",
    "환경화학을 연구합니다.",
    "I study environmental chemistry."
  ],
  [
    "환경생물학",
    "ပတ်ဝန်းကျင် ဇီဝဗေဒ",
    "Environment",
    "환경생물학을 전공합니다.",
    "I major in environmental biology."
  ],
  [
    "생태학",
    "ဂေဟဗေဒ",
    "Environment",
    "생태학을 공부합니다.",
    "I study ecology."
  ],
  [
    "보전생물학",
    "ထိန်းသိမ်းမှု ဇီဝဗေဒ",
    "Environment",
    "보전생물학을 연구합니다.",
    "I study conservation biology."
  ],
  [
    "상담심리학",
    "အကြံပေးမှု စိတ်ပညာ",
    "Psychology",
    "상담심리학을 연구합니다.",
    "I study counseling psychology."
  ],
  [
    "건강심리학",
    "ကျန်းမာရေး စိတ်ပညာ",
    "Psychology",
    "건강심리학을 공부합니다.",
    "I study health psychology."
  ],
  [
    "산업심리학",
    "စက်မှု စိတ်ပညာ",
    "Psychology",
    "산업심리학을 전공합니다.",
    "I major in industrial psychology."
  ],
  [
    "교육심리학",
    "ပညာရေး စိတ်ပညာ",
    "Psychology",
    "교육심리학을 연구합니다.",
    "I study educational psychology."
  ],
  [
    "법의심리학",
    "ဥပဒေ စိတ်ပညာ",
    "Psychology",
    "법의심리학을 공부합니다.",
    "I study forensic psychology."
  ],
  [
    "스포츠심리학",
    "အားကစား စိတ်ပညာ",
    "Psychology",
    "스포츠심리학을 전공합니다.",
    "I major in sports psychology."
  ],
  [
    "환경심리학",
    "ပတ်ဝန်းကျင် စိတ်ပညာ",
    "Psychology",
    "환경심리학을 연구합니다.",
    "I study environmental psychology."
  ],
  [
    "문화심리학",
    "ယဉ်ကျေးမှု စိတ်ပညာ",
    "Psychology",
    "문화심리학을 공부합니다.",
    "I study cultural psychology."
  ],
  [
    "긍정심리학",
    "အပြုသဘော စိတ်ပညာ",
    "Psychology",
    "긍정심리학을 전공합니다.",
    "I major in positive psychology."
  ],
  [
    "국제인권법",
    "နိုင်ငံတကာ လူ့အခွင့်အရေး ဥပဒေ",
    "Legal",
    "국제인권법을 연구합니다.",
    "I study international human rights law."
  ],
  [
    "국제상거래법",
    "နိုင်ငံတကာ ကုန်သွယ်ရေး ဥပဒေ",
    "Legal",
    "국제상거래법을 공부합니다.",
    "I study international commercial law."
  ],
  [
    "환경법",
    "ပတ်ဝန်းကျင် ဥပဒေ",
    "Legal",
    "환경법을 전공합니다.",
    "I major in environmental law."
  ],
  [
    "해양법",
    "ပင်လယ် ဥပဒေ",
    "Legal",
    "해양법을 연구합니다.",
    "I study maritime law."
  ],
  [
    "우주법",
    "အာကာသ ဥပဒေ",
    "Legal",
    "우주법을 공부합니다.",
    "I study space law."
  ],
  [
    "인터넷법",
    "အင်တာနက် ဥပဒေ",
    "Legal",
    "인터넷법을 전공합니다.",
    "I major in internet law."
  ],
  [
    "데이터보호법",
    "ဒေတာ ကာကွယ်ရေး ဥပဒေ",
    "Legal",
    "데이터보호법을 연구합니다.",
    "I study data protection law."
  ],
  [
    "지적재산법",
    "ဉာဏပစ္စည်း ဥပဒေ",
    "Legal",
    "지적재산법을 공부합니다.",
    "I study intellectual property law."
  ],
  [
    "경쟁법",
    "ယှဉ်ပြိုင်မှု ဥပဒေ",
    "Legal",
    "경쟁법을 전공합니다.",
    "I major in competition law."
  ],
  [
    "계량경제학",
    "စာရင်းအင်း စီးပွားရေး",
    "Economics",
    "계량경제학을 전공합니다.",
    "I major in econometrics."
  ],
  [
    "재정학",
    "ဘဏ္ဍာရေး",
    "Economics",
    "재정학을 연구합니다.",
    "I study public finance."
  ],
  [
    "금융경제학",
    "ငွေရေး စီးပွားရေး",
    "Economics",
    "금융경제학을 공부합니다.",
    "I study financial economics."
  ],
  [
    "국제경제학",
    "နိုင်ငံတကာ စီးပွားရေး",
    "Economics",
    "국제경제학을 전공합니다.",
    "I major in international economics."
  ],
  [
    "산업경제학",
    "စက်မှု စီးပွားရေး",
    "Economics",
    "산업경제학을 연구합니다.",
    "I study industrial economics."
  ],
  [
    "노동경제학",
    "အလုပ်သမား စီးပွားရေး",
    "Economics",
    "노동경제학을 공부합니다.",
    "I study labor economics."
  ],
  [
    "환경경제학",
    "ပတ်ဝန်းကျင် စီးပွားရေး",
    "Economics",
    "환경경제학을 전공합니다.",
    "I major in environmental economics."
  ],
  [
    "발전경제학",
    "ဖွံ့ဖြိုးတိုးတက်မှု စီးပွားရေး",
    "Economics",
    "발전경제학을 연구합니다.",
    "I study development economics."
  ],
  [
    "행동경제학",
    "အပြုအမူ စီးပွားရေး",
    "Economics",
    "행동경제학을 공부합니다.",
    "I study behavioral economics."
  ],
  [
    "게임이론",
    "ဂိမ်း သီအိုရီ",
    "Economics",
    "게임이론을 적용합니다.",
    "I apply game theory."
  ],
  [
    "나노공학",
    "နာနို အင်ဂျင်နီယာ",
    "Engineering",
    "나노공학을 전공합니다.",
    "I major in nanoengineering."
  ],
  [
    "바이오공학",
    "ဇီဝ အင်ဂျင်နီယာ",
    "Engineering",
    "바이오공학을 연구합니다.",
    "I study bioengineering."
  ],
  [
    "에너지공학",
    "စွမ်းအင် အင်ဂျင်နီယာ",
    "Engineering",
    "에너지공학을 공부합니다.",
    "I study energy engineering."
  ],
  [
    "소재공학",
    "ပစ္စည်း အင်ဂျင်နီယာ",
    "Engineering",
    "소재공학을 전공합니다.",
    "I major in materials engineering."
  ],
  [
    "제어공학",
    "ထိန်းချုပ်မှု အင်ဂျင်နီယာ",
    "Engineering",
    "제어공학을 공부합니다.",
    "I study control engineering."
  ],
  [
    "신호처리",
    "အချက်ပြ လုပ်ဆောင်မှု",
    "Engineering",
    "신호처리를 연구합니다.",
    "I study signal processing."
  ],
  [
    "임베디드시스템",
    "ထည့်သွင်းထားသော စနစ်",
    "Engineering",
    "임베디드시스템을 개발합니다.",
    "I develop embedded systems."
  ],
  [
    "디지털저널리즘",
    "ဒစ်ဂျစ်တယ် သတင်းစာပညာ",
    "Communication",
    "디지털저널리즘을 연구합니다.",
    "I study digital journalism."
  ],
  [
    "멀티미디어저널리즘",
    "များစွာ မီဒီယာ သတင်းစာပညာ",
    "Communication",
    "멀티미디어저널리즘을 전공합니다.",
    "I major in multimedia journalism."
  ],
  [
    "브랜드커뮤니케이션",
    "ကုန်အမှတ်တံဆိပ် ဆက်သွယ်ရေး",
    "Communication",
    "브랜드커뮤니케이션을 연구합니다.",
    "I study brand communication."
  ],
  [
    "크리에이티브커뮤니케이션",
    "ဖန်တီးမှု ဆက်သွယ်ရေး",
    "Communication",
    "크리에이티브커뮤니케이션을 전공합니다.",
    "I major in creative communication."
  ],
  [
    "미디어리터러시",
    "မီဒီယာ စာတတ်မြောက်မှု",
    "Communication",
    "미디어리터러시를 교육합니다.",
    "I teach media literacy."
  ],
  [
    "소셜미디어",
    "လူမှုရေး မီဒီယာ",
    "Communication",
    "소셜미디어를 활용합니다.",
    "I utilize social media."
  ],
  [
    "콘텐츠마케팅",
    "အကြောင်းအရာ စျေးကွက်ရှာဖွေရေး",
    "Communication",
    "콘텐츠마케팅을 전략합니다.",
    "I strategize content marketing."
  ],
  [
    "디지털스토리텔링",
    "ဒစ်ဂျစ်တယ် ဇာတ်လမ်းပြောခြင်း",
    "Communication",
    "디지털스토리텔링을 연구합니다.",
    "I study digital storytelling."
  ],
  [
    "미디어아트",
    "မီဒီယာ အနုပညာ",
    "Communication",
    "미디어아트를 전공합니다.",
    "I major in media art."
  ],
  [
    "평생교육",
    "တစ်သက်တာ ပညာရေး",
    "Education",
    "평생교육을 연구합니다.",
    "I study lifelong education."
  ],
  [
    "성인교육",
    "လူကြီး ပညာရေး",
    "Education",
    "성인교육을 전공합니다.",
    "I major in adult education."
  ],
  [
    "원격교육",
    "အကွာအဝေး ပညာရေး",
    "Education",
    "원격교육을 공부합니다.",
    "I study distance education."
  ],
  [
    "온라인교육",
    "အွန်လိုင်း ပညာရေး",
    "Education",
    "온라인교육을 연구합니다.",
    "I study online education."
  ],
  [
    "혼합학습",
    "ရောနှော သင်ယူမှု",
    "Education",
    "혼합학습을 전공합니다.",
    "I major in blended learning."
  ],
  [
    "협동학습",
    "ပူးပေါင်းသော သင်ယူမှု",
    "Education",
    "협동학습을 공부합니다.",
    "I study collaborative learning."
  ],
  [
    "문제중심학습",
    "ပြဿနာ အခြေခံ သင်ယူမှု",
    "Education",
    "문제중심학습을 연구합니다.",
    "I study problem-based learning."
  ],
  [
    "프로젝트학습",
    "စီမံကိန်း သင်ယူမှု",
    "Education",
    "프로젝트학습을 전공합니다.",
    "I major in project-based learning."
  ],
  [
    "역량기반교육",
    "စွမ်းရည် အခြေခံ ပညာရေး",
    "Education",
    "역량기반교육을 공부합니다.",
    "I study competency-based education."
  ],
  [
    "미래교육",
    "အနာဂတ် ပညာရေး",
    "Education",
    "미래교육을 연구합니다.",
    "I study future education."
  ],
  [
    "농업생명공학",
    "စိုက်ပျိုးရေး ဇီဝနည်းပညာ",
    "Agriculture",
    "농업생명공학을 전공합니다.",
    "I major in agricultural biotechnology."
  ],
  [
    "식품공학",
    "အစားအစာ အင်ဂျင်နီယာ",
    "Agriculture",
    "식품공학을 연구합니다.",
    "I study food engineering."
  ],
  [
    "식품미생물학",
    "အစားအစာ ပိုးမွှား",
    "Agriculture",
    "식품미생물학을 공부합니다.",
    "I study food microbiology."
  ],
  [
    "식품화학",
    "အစားအစာ ဓာတုဗေဒ",
    "Agriculture",
    "식품화학을 전공합니다.",
    "I major in food chemistry."
  ],
  [
    "식품안전",
    "အစားအစာ ဘေးကင်းရေး",
    "Agriculture",
    "식품안전을 연구합니다.",
    "I study food safety."
  ],
  [
    "영양학",
    "အာဟာရ",
    "Agriculture",
    "영양학을 공부합니다.",
    "I study nutrition."
  ],
  [
    "임업",
    "သစ်တော",
    "Agriculture",
    "임업을 전공합니다.",
    "I major in forestry."
  ],
  [
    "수산학",
    "ရေထွက်",
    "Agriculture",
    "수산학을 연구합니다.",
    "I study fisheries science."
  ],
  [
    "축산학",
    "မွေးမြူရေး",
    "Agriculture",
    "축산학을 공부합니다.",
    "I study animal husbandry."
  ],
  [
    "원예학",
    "ဥယျာဉ်စိုက်ပျိုးရေး",
    "Agriculture",
    "원예학을 전공합니다.",
    "I major in horticulture."
  ],
  [
    "도시설계",
    "မြို့ပြ ဒီဇိုင်း",
    "Architecture",
    "도시설계를 연구합니다.",
    "I study urban design."
  ],
  [
    "조경설계",
    "ဥယျာဉ် ဒီဇိုင်း",
    "Architecture",
    "조경설계를 전공합니다.",
    "I major in landscape design."
  ],
  [
    "환경설계",
    "ပတ်ဝန်းကျင် ဒီဇိုင်း",
    "Architecture",
    "환경설계를 공부합니다.",
    "I study environmental design."
  ],
  [
    "지속가능건축",
    "ရေရှည်တည်တံ့သော ဗိသုကာ",
    "Architecture",
    "지속가능건축을 연구합니다.",
    "I study sustainable architecture."
  ],
  [
    "그린빌딩",
    "အစိမ်းရောင် အဆောက်အဦ",
    "Architecture",
    "그린빌딩을 설계합니다.",
    "I design green buildings."
  ],
  [
    "건축구조",
    "ဗိသုကာ ဖွဲ့စည်းပုံ",
    "Architecture",
    "건축구조를 연구합니다.",
    "I study building structures."
  ],
  [
    "건축환경",
    "ဗိသုကာ ပတ်ဝန်းကျင်",
    "Architecture",
    "건축환경을 전공합니다.",
    "I major in building environment."
  ],
  [
    "건축설비",
    "ဗိသုကာ ပစ္စည်းကိရိယာ",
    "Architecture",
    "건축설비를 공부합니다.",
    "I study building facilities."
  ],
  [
    "건축재료",
    "ဗိသုကာ ပစ္စည်း",
    "Architecture",
    "건축재료를 연구합니다.",
    "I study building materials."
  ],
  [
    "운동생리학",
    "လေ့ကျင့်ခန်း ဇီဝကမ္မဗေဒ",
    "Sports",
    "운동생리학을 전공합니다.",
    "I major in exercise physiology."
  ],
  [
    "운동역학",
    "လေ့ကျင့်ခန်း စွမ်းအား",
    "Sports",
    "운동역학을 공부합니다.",
    "I study biomechanics."
  ],
  [
    "스포츠영양학",
    "အားကစား အာဟာရ",
    "Sports",
    "스포츠영양학을 전공합니다.",
    "I major in sports nutrition."
  ],
  [
    "재활운동",
    "ပြန်လည်ထူထောင်ရေး လေ့ကျင့်ခန်း",
    "Sports",
    "재활운동을 연구합니다.",
    "I study rehabilitation exercise."
  ],
  [
    "운동처방",
    "လေ့ကျင့်ခန်း ညွှန်ကြားမှု",
    "Sports",
    "운동처방을 공부합니다.",
    "I study exercise prescription."
  ],
  [
    "스포츠코칭",
    "အားကစား သင်ကြားမှု",
    "Sports",
    "스포츠코칭을 전공합니다.",
    "I major in sports coaching."
  ],
  [
    "스포츠경영",
    "အားကစား စီမံခန့်ခွဲမှု",
    "Sports",
    "스포츠경영을 연구합니다.",
    "I study sports management."
  ],
  [
    "체육학",
    "ကာယပညာ",
    "Sports",
    "체육학을 공부합니다.",
    "I study physical education."
  ],
  [
    "플라즈마보로나이징",
    "ပလာစမာ ဘိုရွန် ထည့်သွင်းမှု",
    "Engineering",
    "플라즈마보로나이징을 전공합니다.",
    "I major in plasma boriding."
  ],
  [
    "플라즈마실리코나이징",
    "ပလာစမာ ဆီလီကွန် ထည့်သွင်းမှု",
    "Engineering",
    "플라즈마실리코나이징을 공부합니다.",
    "I study plasma siliconizing."
  ],
  [
    "플라즈마알루미나이징",
    "ပလာစမာ အလူမီနီယမ် ထည့်သွင်းမှု",
    "Engineering",
    "플라즈마알루미나이징을 연구합니다.",
    "I study plasma aluminizing."
  ],
  [
    "플라즈마크로마이징",
    "ပလာစမာ ခရိုမီယမ် ထည့်သွင်းမှု",
    "Engineering",
    "플라즈마크로마이징을 전공합니다.",
    "I major in plasma chromizing."
  ],
  [
    "플라즈마바나다이징",
    "ပလာစမာ ဗာနာဒီယမ် ထည့်သွင်းမှု",
    "Engineering",
    "플라즈마바나다이징을 공부합니다.",
    "I study plasma vanadizing."
  ],
  [
    "플라즈마티타나이징",
    "ပလာစမာ တိုက်တာနီယမ် ထည့်သွင်းမှု",
    "Engineering",
    "플라즈마티타나이징을 연구합니다.",
    "I study plasma titanizing."
  ],
  [
    "플라즈마지르코나이징",
    "ပလာစမာ ဇာကွန်နီယမ် ထည့်သွင်းမှု",
    "Engineering",
    "플라즈마지르코나이징을 전공합니다.",
    "I major in plasma zirconizing."
  ],
  [
    "플라즈마니오브이징",
    "ပလာစမာ နီအိုဘီယမ် ထည့်သွင်းမှု",
    "Engineering",
    "플라즈마니오브이징을 공부합니다.",
    "I study plasma niobizing."
  ],
  [
    "플라즈마탄탈라이징",
    "ပလာစမာ တန်တာလမ် ထည့်သွင်းမှု",
    "Engineering",
    "플라즈마탄탈라이징을 연구합니다.",
    "I study plasma tantalizing."
  ],
  [
    "플라즈마몰리브덴이징",
    "ပလာစမာ မိုလစ်ဒီနမ် ထည့်သွင်းမှု",
    "Engineering",
    "플라즈마몰리브덴이징을 전공합니다.",
    "I major in plasma molybdenizing."
  ],
  [
    "이온주입",
    "အိုင်ယွန် ထိုးသွင်းမှု",
    "Engineering",
    "이온주입을 수행합니다.",
    "I perform ion implantation."
  ],
  [
    "이온주입도핑",
    "အိုင်ယွန် ထိုးသွင်းမှု ထည့်သွင်းမှု",
    "Engineering",
    "이온주입도핑을 연구합니다.",
    "I study ion implantation doping."
  ],
  [
    "이온빔가공",
    "အိုင်ယွန် ရောင်ခြည် လုပ်ဆောင်မှု",
    "Engineering",
    "이온빔가공을 전공합니다.",
    "I major in ion beam processing."
  ],
  [
    "이온빔에칭",
    "အိုင်ယွန် ရောင်ခြည် ထွင်းထုမှု",
    "Engineering",
    "이온빔에칭을 공부합니다.",
    "I study ion beam etching."
  ],
  [
    "이온빔밀링",
    "အိုင်ယွန် ရောင်ခြည် ကြိတ်ချေမှု",
    "Engineering",
    "이온빔밀링을 연구합니다.",
    "I study ion beam milling."
  ],
  [
    "이온빔리소그래피",
    "အိုင်ယွန် ရောင်ခြည် ပုံနှိပ်",
    "Engineering",
    "이온빔리소그래피를 전공합니다.",
    "I major in ion beam lithography."
  ],
  [
    "이온빔표면처리",
    "အိုင်ယွန် ရောင်ခြည် မျက်နှာပြင် လုပ်ဆောင်မှု",
    "Engineering",
    "이온빔표면처리를 공부합니다.",
    "I study ion beam surface treatment."
  ],
  [
    "이온빔박리",
    "အိုင်ယွန် ရောင်ခြည် ခွာထုတ်မှု",
    "Engineering",
    "이온빔박리를 연구합니다.",
    "I study ion beam sputtering."
  ],
  [
    "이온빔정제",
    "အိုင်ယွန် ရောင်ခြည် သန့်စင်မှု",
    "Engineering",
    "이온빔정제를 전공합니다.",
    "I major in ion beam purification."
  ],
  [
    "이온빔분석",
    "အိုင်ယွန် ရောင်ခြည် ခွဲခြမ်းစိတ်ဖြာမှု",
    "Engineering",
    "이온빔분석을 공부합니다.",
    "I study ion beam analysis."
  ],
  [
    "스퍼터코팅",
    "ဖြန်းဆေးထည့်သွင်းမှု ဖုံးအုပ်မှု",
    "Engineering",
    "스퍼터코팅을 수행합니다.",
    "I perform sputter coating."
  ],
  [
    "증착코팅",
    "အလွှာထည့်သွင်းမှု ဖုံးအုပ်မှု",
    "Engineering",
    "증착코팅을 연구합니다.",
    "I study deposition coating."
  ],
  [
    "플라즈마코팅",
    "ပလာစမာ ဖုံးအုပ်မှု",
    "Engineering",
    "플라즈마코팅을 전공합니다.",
    "I major in plasma coating."
  ],
  [
    "레이저코팅",
    "လေဆာ ဖုံးအုပ်မှု",
    "Engineering",
    "레이저코팅을 공부합니다.",
    "I study laser coating."
  ],
  [
    "전기도금코팅",
    "လျှပ်စစ် သတ္တုဖုံးအုပ်မှု ဖုံးအုပ်မှု",
    "Engineering",
    "전기도금코팅을 연구합니다.",
    "I study electroplating coating."
  ],
  [
    "무전해도금",
    "လျှပ်စစ်မဲ့ သတ္တုဖုံးအုပ်မှု",
    "Engineering",
    "무전해도금을 전공합니다.",
    "I major in electroless plating."
  ],
  [
    "화학도금",
    "ဓာတုဗေဒ သတ္တုဖုံးအုပ်မှု",
    "Engineering",
    "화학도금을 공부합니다.",
    "I study chemical plating."
  ],
  [
    "열분해코팅",
    "အပူ ခွဲခြမ်းစိတ်ဖြာမှု ဖုံးအုပ်မှု",
    "Engineering",
    "열분해코팅을 연구합니다.",
    "I study pyrolysis coating."
  ],
  [
    "용융코팅",
    "အရည်ပျော်မှု ဖုံးအုပ်မှု",
    "Engineering",
    "용융코팅을 전공합니다.",
    "I major in molten coating."
  ],
  [
    "분무코팅",
    "ဖြန်းဆေးထည့်သွင်းမှု ဖုံးအုပ်မှု",
    "Engineering",
    "분무코팅을 공부합니다.",
    "I study spray coating."
  ],
  [
    "마찰교반용접",
    "ပွတ်တိုက်မှု ရောနှောမှု ပေါင်းစပ်မှု",
    "Engineering",
    "마찰교반용접을 수행합니다.",
    "I perform friction stir welding."
  ],
  [
    "전자빔용접",
    "အီလက်ထရွန် ရောင်ခြည် ပေါင်းစပ်မှု",
    "Engineering",
    "전자빔용접을 연구합니다.",
    "I study electron beam welding."
  ],
  [
    "플라즈마용접",
    "ပလာစမာ ပေါင်းစပ်မှု",
    "Engineering",
    "플라즈마용접을 전공합니다.",
    "I major in plasma welding."
  ],
  [
    "저항용접",
    "ခုခံမှု ပေါင်းစပ်မှု",
    "Engineering",
    "저항용접을 공부합니다.",
    "I study resistance welding."
  ],
  [
    "아크용접",
    "အာ့ခ် ပေါင်းစပ်မှု",
    "Engineering",
    "아크용접을 연구합니다.",
    "I study arc welding."
  ],
  [
    "가스용접",
    "ဓာတ်ငွေ့ ပေါင်းစပ်မှု",
    "Engineering",
    "가스용접을 전공합니다.",
    "I major in gas welding."
  ],
  [
    "티그용접",
    "TIG ပေါင်းစပ်မှု",
    "Engineering",
    "티그용접을 공부합니다.",
    "I study TIG welding."
  ],
  [
    "미그용접",
    "MIG ပေါင်းစပ်မှု",
    "Engineering",
    "미그용접을 연구합니다.",
    "I study MIG welding."
  ],
  [
    "서브머지드아크용접",
    "မြုပ်နေသော အာ့ခ် ပေါင်းစပ်မှု",
    "Engineering",
    "서브머지드아크용접을 전공합니다.",
    "I major in submerged arc welding."
  ],
  [
    "플럭스코어드아크용접",
    "ဖလပ်စ် အာ့ခ် ပေါင်းစပ်မှု",
    "Engineering",
    "플럭스코어드아크용접을 공부합니다.",
    "I study flux-cored arc welding."
  ],
  [
    "담금질",
    "အေးစေမှု",
    "Engineering",
    "담금질을 수행합니다.",
    "I perform quenching."
  ],
  [
    "풀림",
    "ပြန်လည်ထူထောင်ရေး",
    "Engineering",
    "풀림을 연구합니다.",
    "I study annealing."
  ],
  [
    "시효처리",
    "အချိန်ကုန်လွန်မှု လုပ်ဆောင်မှု",
    "Engineering",
    "시효처리를 전공합니다.",
    "I major in aging treatment."
  ],
  [
    "담금질시효",
    "အေးစေမှု အချိန်ကုန်လွန်မှု",
    "Engineering",
    "담금질시효를 공부합니다.",
    "I study quench aging."
  ],
  [
    "인공시효",
    "လူလုပ် အချိန်ကုန်လွန်မှု",
    "Engineering",
    "인공시효를 연구합니다.",
    "I study artificial aging."
  ],
  [
    "자연시효",
    "သဘာဝ အချိန်ကုန်လွန်မှု",
    "Engineering",
    "자연시효를 전공합니다.",
    "I major in natural aging."
  ],
  [
    "침탄",
    "ကာဗွန် ထည့်သွင်းမှု",
    "Engineering",
    "침탄을 공부합니다.",
    "I study carburizing."
  ],
  [
    "질화",
    "နိုက်ထရိုဂျင် ထည့်သွင်းမှု",
    "Engineering",
    "질화를 연구합니다.",
    "I study nitriding."
  ],
  [
    "탄질화",
    "ကာဗွန် နိုက်ထရိုဂျင် ထည့်သွင်းမှု",
    "Engineering",
    "탄질화를 전공합니다.",
    "I major in carbonitriding."
  ],
  [
    "보로나이징",
    "ဘိုရွန် ထည့်သွင်းမှု",
    "Engineering",
    "보로나이징을 공부합니다.",
    "I study boriding."
  ],
  [
    "초정밀가공",
    "အလွန်တိကျသော လုပ်ဆောင်မှု",
    "Engineering",
    "초정밀가공을 수행합니다.",
    "I perform ultra-precision machining."
  ],
  [
    "나노가공",
    "နာနို လုပ်ဆောင်မှု",
    "Engineering",
    "나노가공을 연구합니다.",
    "I study nanomachining."
  ],
  [
    "마이크로가공",
    "မိုက်ခရို လုပ်ဆောင်မှု",
    "Engineering",
    "마이크로가공을 전공합니다.",
    "I major in micromachining."
  ],
  [
    "전기방전가공",
    "လျှပ်စစ် ထွန်းလင်းမှု လုပ်ဆောင်မှု",
    "Engineering",
    "전기방전가공을 공부합니다.",
    "I study electrical discharge machining."
  ],
  [
    "전기화학가공",
    "လျှပ်စစ် ဓာတုဗေဒ လုပ်ဆောင်မှု",
    "Engineering",
    "전기화학가공을 전공합니다.",
    "I major in electrochemical machining."
  ],
  [
    "수제트가공",
    "ရေစီးဆင်းမှု လုပ်ဆောင်မှု",
    "Engineering",
    "수제트가공을 공부합니다.",
    "I study waterjet machining."
  ],
  [
    "플라즈마가공",
    "ပလာစမာ လုပ်ဆောင်မှု",
    "Engineering",
    "플라즈마가공을 전공합니다.",
    "I major in plasma machining."
  ],
  [
    "전자빔가공",
    "အီလက်ထရွန် ရောင်ခြည် လုပ်ဆောင်မှု",
    "Engineering",
    "전자빔가공을 연구합니다.",
    "I study electron beam machining."
  ],
  [
    "초음파가공",
    "အလွန်မြန်သော အသံ လုပ်ဆောင်မှု",
    "Engineering",
    "초음파가공을 전공합니다.",
    "I major in ultrasonic machining."
  ],
  [
    "초음파성형",
    "အလွန်မြန်သော အသံ ထုတ်လုပ်မှု",
    "Engineering",
    "초음파성형을 수행합니다.",
    "I perform ultrasonic forming."
  ],
  [
    "전자기성형",
    "လျှပ်စစ် သံလိုက် ထုတ်လုပ်မှု",
    "Engineering",
    "전자기성형을 연구합니다.",
    "I study electromagnetic forming."
  ],
  [
    "폭발성형",
    "ပေါက်ကွဲမှု ထုတ်လုပ်မှု",
    "Engineering",
    "폭발성형을 전공합니다.",
    "I major in explosive forming."
  ],
  [
    "유압성형",
    "ရေ ဖိအား ထုတ်လုပ်မှု",
    "Engineering",
    "유압성형을 공부합니다.",
    "I study hydroforming."
  ],
  [
    "기압성형",
    "လေဖိအား ထုတ်လုပ်မှု",
    "Engineering",
    "기압성형을 연구합니다.",
    "I study pneumatic forming."
  ],
  [
    "딥드로잉",
    "နက်ရှိုင်းသော ဆွဲထုတ်မှု",
    "Engineering",
    "딥드로잉을 전공합니다.",
    "I major in deep drawing."
  ],
  [
    "스핀성형",
    "လည်ပတ် ထုတ်လုပ်မှု",
    "Engineering",
    "스핀성형을 공부합니다.",
    "I study spin forming."
  ],
  [
    "인발성형",
    "ဆွဲထုတ်မှု ထုတ်လုပ်မှု",
    "Engineering",
    "인발성형을 전공합니다.",
    "I major in drawing forming."
  ],
  [
    "굽힘성형",
    "ကွေးညွှတ်မှု ထုတ်လုပ်မှု",
    "Engineering",
    "굽힘성형을 공부합니다.",
    "I study bending forming."
  ],
  [
    "압연성형",
    "ဖိသိပ် လိမ်ခွေမှု ထုတ်လုပ်မှု",
    "Engineering",
    "압연성형을 연구합니다.",
    "I study rolling forming."
  ],
  [
    "초정밀연삭",
    "အလွန်တိကျသော ကြိတ်ချေမှု",
    "Engineering",
    "초정밀연삭을 수행합니다.",
    "I perform ultra-precision grinding."
  ],
  [
    "나노연삭",
    "နာနို ကြိတ်ချေမှု",
    "Engineering",
    "나노연삭을 연구합니다.",
    "I study nanogrinding."
  ],
  [
    "마이크로연삭",
    "မိုက်ခရို ကြိတ်ချေမှု",
    "Engineering",
    "마이크로연삭을 전공합니다.",
    "I major in microgrinding."
  ],
  [
    "초음파연삭",
    "အလွန်မြန်သော အသံ ကြိတ်ချေမှု",
    "Engineering",
    "초음파연삭을 공부합니다.",
    "I study ultrasonic grinding."
  ],
  [
    "전기연삭",
    "လျှပ်စစ် ကြိတ်ချေမှု",
    "Engineering",
    "전기연삭을 연구합니다.",
    "I study electrical grinding."
  ],
  [
    "화학연삭",
    "ဓာတုဗေဒ ကြိတ်ချေမှု",
    "Engineering",
    "화학연삭을 전공합니다.",
    "I major in chemical grinding."
  ],
  [
    "전기화학연삭",
    "လျှပ်စစ် ဓာတုဗေဒ ကြိတ်ချေမှု",
    "Engineering",
    "전기화학연삭을 공부합니다.",
    "I study electrochemical grinding."
  ],
  [
    "플라즈마연삭",
    "ပလာစမာ ကြိတ်ချေမှု",
    "Engineering",
    "플라즈마연삭을 연구합니다.",
    "I study plasma grinding."
  ],
  [
    "레이저연삭",
    "လေဆာ ကြိတ်ချေမှု",
    "Engineering",
    "레이저연삭을 전공합니다.",
    "I major in laser grinding."
  ],
  [
    "이온빔연삭",
    "အိုင်ယွန် ရောင်ခြည် ကြိတ်ချေမှု",
    "Engineering",
    "이온빔연삭을 공부합니다.",
    "I study ion beam grinding."
  ],
  [
    "초정밀연마",
    "အလွန်တိကျသော ချောမွေ့စေမှု",
    "Engineering",
    "초정밀연마를 수행합니다.",
    "I perform ultra-precision polishing."
  ],
  [
    "나노연마",
    "နာနို ချောမွေ့စေမှု",
    "Engineering",
    "나노연마를 연구합니다.",
    "I study nanopolishing."
  ],
  [
    "마이크로연마",
    "မိုက်ခရို ချောမွေ့စေမှု",
    "Engineering",
    "마이크로연마를 전공합니다.",
    "I major in micropolishing."
  ],
  [
    "화학연마",
    "ဓာတုဗေဒ ချောမွေ့စေမှု",
    "Engineering",
    "화학연마를 공부합니다.",
    "I study chemical polishing."
  ],
  [
    "전기화학연마",
    "လျှပ်စစ် ဓာတုဗေဒ ချောမွေ့စေမှု",
    "Engineering",
    "전기화학연마를 연구합니다.",
    "I study electrochemical polishing."
  ],
  [
    "기계연마",
    "စက်မှု ချောမွေ့စေမှု",
    "Engineering",
    "기계연마를 전공합니다.",
    "I major in mechanical polishing."
  ],
  [
    "전해연마",
    "လျှပ်စစ် ချောမွေ့စေမှု",
    "Engineering",
    "전해연마를 공부합니다.",
    "I study electrolytic polishing."
  ],
  [
    "플라즈마연마",
    "ပလာစမာ ချောမွေ့စေမှု",
    "Engineering",
    "플라즈마연마를 연구합니다.",
    "I study plasma polishing."
  ],
  [
    "레이저연마",
    "လေဆာ ချောမွေ့စေမှု",
    "Engineering",
    "레이저연마를 전공합니다.",
    "I major in laser polishing."
  ],
  [
    "이온빔연마",
    "အိုင်ယွန် ရောင်ခြည် ချောမွေ့စေမှု",
    "Engineering",
    "이온빔연마를 공부합니다.",
    "I study ion beam polishing."
  ],
  [
    "초정밀절단",
    "အလွန်တိကျသော ဖြတ်တောက်မှု",
    "Engineering",
    "초정밀절단을 수행합니다.",
    "I perform ultra-precision cutting."
  ],
  [
    "나노절단",
    "နာနို ဖြတ်တောက်မှု",
    "Engineering",
    "나노절단을 연구합니다.",
    "I study nanocutting."
  ],
  [
    "마이크로절단",
    "မိုက်ခရို ဖြတ်တောက်မှု",
    "Engineering",
    "마이크로절단을 전공합니다.",
    "I major in microcutting."
  ],
  [
    "플라즈마절단",
    "ပလာစမာ ဖြတ်တောက်မှု",
    "Engineering",
    "플라즈마절단을 공부합니다.",
    "I study plasma cutting."
  ],
  [
    "수제트절단",
    "ရေစီးဆင်းမှု ဖြတ်တောက်မှု",
    "Engineering",
    "수제트절단을 전공합니다.",
    "I major in waterjet cutting."
  ],
  [
    "전기방전절단",
    "လျှပ်စစ် ထွန်းလင်းမှု ဖြတ်တောက်မှု",
    "Engineering",
    "전기방전절단을 공부합니다.",
    "I study electrical discharge cutting."
  ],
  [
    "전기화학절단",
    "လျှပ်စစ် ဓာတုဗေဒ ဖြတ်တောက်မှု",
    "Engineering",
    "전기화학절단을 연구합니다.",
    "I study electrochemical cutting."
  ],
  [
    "이온빔절단",
    "အိုင်ယွန် ရောင်ခြည် ဖြတ်တောက်မှု",
    "Engineering",
    "이온빔절단을 전공합니다.",
    "I major in ion beam cutting."
  ],
  [
    "초음파절단",
    "အလွန်မြန်သော အသံ ဖြတ်တောက်မှု",
    "Engineering",
    "초음파절단을 공부합니다.",
    "I study ultrasonic cutting."
  ],
  [
    "전자빔절단",
    "အီလက်ထရွန် ရောင်ခြည် ဖြတ်တောက်မှု",
    "Engineering",
    "전자빔절단을 연구합니다.",
    "I study electron beam cutting."
  ],
  [
    "초정밀드릴링",
    "အလွန်တိကျသော တူးဖော်မှု",
    "Engineering",
    "초정밀드릴링을 수행합니다.",
    "I perform ultra-precision drilling."
  ],
  [
    "나노드릴링",
    "နာနို တူးဖော်မှု",
    "Engineering",
    "나노드릴링을 연구합니다.",
    "I study nanodrilling."
  ],
  [
    "마이크로드릴링",
    "မိုက်ခရို တူးဖော်မှု",
    "Engineering",
    "마이크로드릴링을 전공합니다.",
    "I major in microdrilling."
  ],
  [
    "전기방전드릴링",
    "လျှပ်စစ် ထွန်းလင်းမှု တူးဖော်မှု",
    "Engineering",
    "전기방전드릴링을 공부합니다.",
    "I study electrical discharge drilling."
  ],
  [
    "전기화학드릴링",
    "လျှပ်စစ် ဓာတုဗေဒ တူးဖော်မှု",
    "Engineering",
    "전기화학드릴링을 연구합니다.",
    "I study electrochemical drilling."
  ],
  [
    "초음파드릴링",
    "အလွန်မြန်သော အသံ တူးဖော်မှု",
    "Engineering",
    "초음파드릴링을 전공합니다.",
    "I major in ultrasonic drilling."
  ],
  [
    "플라즈마드릴링",
    "ပလာစမာ တူးဖော်မှု",
    "Engineering",
    "플라즈마드릴링을 공부합니다.",
    "I study plasma drilling."
  ],
  [
    "이온빔드릴링",
    "အိုင်ယွန် ရောင်ခြည် တူးဖော်မှု",
    "Engineering",
    "이온빔드릴링을 연구합니다.",
    "I study ion beam drilling."
  ],
  [
    "전자빔드릴링",
    "အီလက်ထရွန် ရောင်ခြည် တူးဖော်မှု",
    "Engineering",
    "전자빔드릴링을 전공합니다.",
    "I major in electron beam drilling."
  ],
  [
    "레이저드릴링",
    "လေဆာ တူးဖော်မှု",
    "Engineering",
    "레이저드릴링을 공부합니다.",
    "I study laser drilling."
  ],
  [
    "초정밀밀링",
    "အလွန်တိကျသော ကြိတ်ချေမှု",
    "Engineering",
    "초정밀밀링을 수행합니다.",
    "I perform ultra-precision milling."
  ],
  [
    "나노밀링",
    "နာနို ကြိတ်ချေမှု",
    "Engineering",
    "나노밀링을 연구합니다.",
    "I study nanomilling."
  ],
  [
    "마이크로밀링",
    "မိုက်ခရို ကြိတ်ချေမှု",
    "Engineering",
    "마이크로밀링을 전공합니다.",
    "I major in micromilling."
  ],
  [
    "초음파밀링",
    "အလွန်မြန်သော အသံ ကြိတ်ချေမှု",
    "Engineering",
    "초음파밀링을 공부합니다.",
    "I study ultrasonic milling."
  ],
  [
    "전기방전밀링",
    "လျှပ်စစ် ထွန်းလင်းမှု ကြိတ်ချေမှု",
    "Engineering",
    "전기방전밀링을 연구합니다.",
    "I study electrical discharge milling."
  ],
  [
    "전기화학밀링",
    "လျှပ်စစ် ဓာတုဗေဒ ကြိတ်ချေမှု",
    "Engineering",
    "전기화학밀링을 전공합니다.",
    "I major in electrochemical milling."
  ],
  [
    "레이저밀링",
    "လေဆာ ကြိတ်ချေမှု",
    "Engineering",
    "레이저밀링을 공부합니다.",
    "I study laser milling."
  ],
  [
    "플라즈마밀링",
    "ပလာစမာ ကြိတ်ချေမှု",
    "Engineering",
    "플라즈마밀링을 연구합니다.",
    "I study plasma milling."
  ],
  [
    "전자빔밀링",
    "အီလက်ထရွန် ရောင်ခြည် ကြိတ်ချေမှု",
    "Engineering",
    "전자빔밀링을 공부합니다.",
    "I study electron beam milling."
  ],
  [
    "초정밀선반가공",
    "အလွန်တိကျသော လည်ပတ်မှု လုပ်ဆောင်မှု",
    "Engineering",
    "초정밀선반가공을 수행합니다.",
    "I perform ultra-precision turning."
  ],
  [
    "나노선반가공",
    "နာနို လည်ပတ်မှု လုပ်ဆောင်မှု",
    "Engineering",
    "나노선반가공을 연구합니다.",
    "I study nanoturning."
  ],
  [
    "마이크로선반가공",
    "မိုက်ခရို လည်ပတ်မှု လုပ်ဆောင်မှု",
    "Engineering",
    "마이크로선반가공을 전공합니다.",
    "I major in microturning."
  ],
  [
    "초음파선반가공",
    "အလွန်မြန်သော အသံ လည်ပတ်မှု လုပ်ဆောင်မှု",
    "Engineering",
    "초음파선반가공을 공부합니다.",
    "I study ultrasonic turning."
  ],
  [
    "전기방전선반가공",
    "လျှပ်စစ် ထွန်းလင်းမှု လည်ပတ်မှု လုပ်ဆောင်မှု",
    "Engineering",
    "전기방전선반가공을 연구합니다.",
    "I study electrical discharge turning."
  ],
  [
    "전기화학선반가공",
    "လျှပ်စစ် ဓာတုဗေဒ လည်ပတ်မှု လုပ်ဆောင်မှု",
    "Engineering",
    "전기화학선반가공을 전공합니다.",
    "I major in electrochemical turning."
  ],
  [
    "레이저선반가공",
    "လေဆာ လည်ပတ်မှု လုပ်ဆောင်မှု",
    "Engineering",
    "레이저선반가공을 공부합니다.",
    "I study laser turning."
  ],
  [
    "플라즈마선반가공",
    "ပလာစမာ လည်ပတ်မှု လုပ်ဆောင်မှု",
    "Engineering",
    "플라즈마선반가공을 연구합니다.",
    "I study plasma turning."
  ],
  [
    "이온빔선반가공",
    "အိုင်ယွန် ရောင်ခြည် လည်ပတ်မှု လုပ်ဆောင်မှု",
    "Engineering",
    "이온빔선반가공을 전공합니다.",
    "I major in ion beam turning."
  ],
  [
    "전자빔선반가공",
    "အီလက်ထရွန် ရောင်ခြည် လည်ပတ်မှု လုပ်ဆောင်မှု",
    "Engineering",
    "전자빔선반가공을 공부합니다.",
    "I study electron beam turning."
  ],
  [
    "가스텅스텐아크용접",
    "ဓာတ်ငွေ့ တန်စတင် အာ့ခ် ပေါင်းစပ်မှု",
    "Engineering",
    "가스텅스텐아크용접을 연구합니다.",
    "I study gas tungsten arc welding."
  ],
  [
    "가스메탈아크용접",
    "ဓာတ်ငွေ့ သတ္တု အာ့ခ် ပေါင်းစပ်မှု",
    "Engineering",
    "가스메탈아크용접을 전공합니다.",
    "I major in gas metal arc welding."
  ],
  [
    "플라즈마아크용접",
    "ပလာစမာ အာ့ခ် ပေါင်းစပ်မှု",
    "Engineering",
    "플라즈마아크용접을 공부합니다.",
    "I study plasma arc welding."
  ],
  [
    "플라즈마텅스텐이징",
    "ပလာစမာ တန်စတင် ထည့်သွင်းမှု",
    "Engineering",
    "플라즈마텅스텐이징을 전공합니다.",
    "I major in plasma tungstening."
  ],
  [
    "플라즈마코발트이징",
    "ပလာစမာ ကိုဘော့ ထည့်သွင်းမှု",
    "Engineering",
    "플라즈마코발트이징을 공부합니다.",
    "I study plasma cobaltizing."
  ],
  [
    "플라즈마니켈이징",
    "ပလာစမာ နီကယ် ထည့်သွင်းမှု",
    "Engineering",
    "플라즈마니켈이징을 연구합니다.",
    "I study plasma nickelizing."
  ],
  [
    "플라즈마구리이징",
    "ပလာစမာ ကြေးနီ ထည့်သွင်းမှု",
    "Engineering",
    "플라즈마구리이징을 전공합니다.",
    "I major in plasma copperizing."
  ],
  [
    "주사전자현미경분석",
    "ရှာဖွေသော အီလက်ထရွန် မိုက်ခရိုစကုပ်ပီ ခွဲခြမ်းစိတ်ဖြာမှု",
    "Science",
    "주사전자현미경분석을 수행합니다.",
    "I perform scanning electron microscopy analysis."
  ],
  [
    "투과전자현미경분석",
    "ဖြတ်သန်းသော အီလက်ထရွန် မိုက်ခရိုစကုပ်ပီ ခွဲခြမ်းစိတ်ဖြာမှု",
    "Science",
    "투과전자현미경분석을 연구합니다.",
    "I study transmission electron microscopy analysis."
  ],
  [
    "원자력현미경분석",
    "အက်တမ် စွမ်းအား မိုက်ခရိုစကုပ်ပီ ခွဲခြမ်းစိတ်ဖြာမှု",
    "Science",
    "원자력현미경분석을 전공합니다.",
    "I major in atomic force microscopy analysis."
  ],
  [
    "공초점현미경분석",
    "ပေါင်းစည်းသော အာရုံစူးစိုက်မှု မိုက်ခရိုစကုပ်ပီ ခွဲခြမ်းစိတ်ဖြာမှု",
    "Science",
    "공초점현미경분석을 공부합니다.",
    "I study confocal microscopy analysis."
  ],
  [
    "형광현미경분석",
    "ဖလူရိုရှင်း မိုက်ခရိုစကုပ်ပီ ခွဲခြမ်းစိတ်ဖြာမှု",
    "Science",
    "형광현미경분석을 연구합니다.",
    "I study fluorescence microscopy analysis."
  ],
  [
    "라만분광분석",
    "ရာမန် စပက်ထရိုစကုပ်ပီ ခွဲခြမ်းစိတ်ဖြာမှု",
    "Science",
    "라만분광분석을 전공합니다.",
    "I major in Raman spectroscopy analysis."
  ],
  [
    "적외선분광분석",
    "အနီအောက်ရောင်ခြည် စပက်ထရိုစကုပ်ပီ ခွဲခြမ်းစိတ်ဖြာမှု",
    "Science",
    "적외선분광분석을 공부합니다.",
    "I study infrared spectroscopy analysis."
  ],
  [
    "자외선분광분석",
    "ခရမ်းလွန်ရောင်ခြည် စပက်ထရိုစကုပ်ပီ ခွဲခြမ်းစိတ်ဖြာမှု",
    "Science",
    "자외선분광분석을 연구합니다.",
    "I study ultraviolet spectroscopy analysis."
  ],
  [
    "핵자기공명분석",
    "နျူကလီးယား သံလိုက် ပြန်လည်ထူထောင်ရေး ခွဲခြမ်းစိတ်ဖြာမှု",
    "Science",
    "핵자기공명분석을 전공합니다.",
    "I major in nuclear magnetic resonance analysis."
  ],
  [
    "질량분석법분석",
    "ထုထည် ခွဲခြမ်းစိတ်ဖြာမှု ခွဲခြမ်းစိတ်ဖြာမှု",
    "Science",
    "질량분석법분석을 공부합니다.",
    "I study mass spectrometry analysis."
  ],
  [
    "화학기상증착법",
    "ဓာတုဗေဒ ရေငွေ့ အလွှာထည့်သွင်းမှု နည်းလမ်း",
    "Engineering",
    "화학기상증착법을 연구합니다.",
    "I study chemical vapor deposition method."
  ],
  [
    "물리기상증착법",
    "ရူပဗေဒ ရေငွေ့ အလွှာထည့်သွင်းမှု နည်းလမ်း",
    "Engineering",
    "물리기상증착법을 전공합니다.",
    "I major in physical vapor deposition method."
  ],
  [
    "원자층증착법",
    "အက်တမ် အလွှာ အလွှာထည့်သွင်းမှု နည်းလမ်း",
    "Engineering",
    "원자층증착법을 공부합니다.",
    "I study atomic layer deposition method."
  ],
  [
    "분자빔에피택시법",
    "မော်လီကျူး ရောင်ခြည် အပေါ်ယံအလွှာ နည်းလမ်း",
    "Engineering",
    "분자빔에피택시법을 연구합니다.",
    "I study molecular beam epitaxy method."
  ],
  [
    "금속유기화학기상증착법",
    "သတ္တု အော်ဂဲနစ် ဓာတုဗေဒ ရေငွေ့ အလွှာထည့်သွင်းမှု နည်းလမ်း",
    "Engineering",
    "금속유기화학기상증착법을 전공합니다.",
    "I major in metal-organic chemical vapor deposition method."
  ],
  [
    "플라즈마증착법",
    "ပလာစမာ အလွှာ ထည့်သွင်းမှု နည်းလမ်း",
    "Engineering",
    "플라즈마증착법을 공부합니다.",
    "I study plasma deposition method."
  ],
  [
    "스퍼터링법",
    "ဖြန်းဆေးထည့်သွင်းမှု နည်းလမ်း",
    "Engineering",
    "스퍼터링법을 연구합니다.",
    "I study sputtering method."
  ],
  [
    "레이저증착법",
    "လေဆာ အလွှာ ထည့်သွင်းမှု နည်းလမ်း",
    "Engineering",
    "레이저증착법을 전공합니다.",
    "I major in laser deposition method."
  ],
  [
    "전자빔증착법",
    "အီလက်ထရွန် ရောင်ခြည် အလွှာ ထည့်သွင်းမှု နည်းလမ်း",
    "Engineering",
    "전자빔증착법을 공부합니다.",
    "I study electron beam deposition method."
  ],
  [
    "이온빔증착법",
    "အိုင်ယွန် ရောင်ခြည် အလွှာ ထည့်သွင်းမှု နည်းလမ်း",
    "Engineering",
    "이온빔증착법을 연구합니다.",
    "I study ion beam deposition method."
  ],
  [
    "인장시험법",
    "ဆွဲဆန့်မှု စမ်းသပ်မှု နည်းလမ်း",
    "Engineering",
    "인장시험법을 수행합니다.",
    "I perform tensile testing method."
  ],
  [
    "압축시험법",
    "ဖိသိပ်မှု စမ်းသပ်မှု နည်းလမ်း",
    "Engineering",
    "압축시험법을 연구합니다.",
    "I study compression testing method."
  ],
  [
    "굽힘시험법",
    "ကွေးညွှတ်မှု စမ်းသပ်မှု နည်းလမ်း",
    "Engineering",
    "굽힘시험법을 전공합니다.",
    "I major in bending testing method."
  ],
  [
    "피로시험법",
    "ပင်ပန်းနွမ်းနယ်မှု စမ်းသပ်မှု နည်းလမ်း",
    "Engineering",
    "피로시험법을 공부합니다.",
    "I study fatigue testing method."
  ],
  [
    "충격시험법",
    "ရိုက်ခတ်မှု စမ်းသပ်မှု နည်းလမ်း",
    "Engineering",
    "충격시험법을 연구합니다.",
    "I study impact testing method."
  ],
  [
    "마모시험법",
    "ပွန်းပဲ့မှု စမ်းသပ်မှု နည်းလမ်း",
    "Engineering",
    "마모시험법을 전공합니다.",
    "I major in wear testing method."
  ],
  [
    "부식시험법",
    "ချေးတက်မှု စမ်းသပ်မှု နည်းလမ်း",
    "Engineering",
    "부식시험법을 공부합니다.",
    "I study corrosion testing method."
  ],
  [
    "크리프시험법",
    "တဖြည်းဖြည်း ပြောင်းလဲမှု စမ်းသပ်မှု နည်းလမ်း",
    "Engineering",
    "크리프시험법을 연구합니다.",
    "I study creep testing method."
  ],
  [
    "경도시험법",
    "ခိုင်မာမှု စမ်းသပ်မှု နည်းလမ်း",
    "Engineering",
    "경도시험법을 전공합니다.",
    "I major in hardness testing method."
  ],
  [
    "표면거칠기시험법",
    "မျက်နှာပြင် ကြမ်းတမ်းမှု စမ်းသပ်မှု နည်းလမ်း",
    "Engineering",
    "표면거칠기시험법을 공부합니다.",
    "I study surface roughness testing method."
  ],
  [
    "열팽창계수측정",
    "အပူ ဖြန့်ထွက်မှု ကိန်းသေ တိုင်းတာမှု",
    "Science",
    "열팽창계수측정을 수행합니다.",
    "I perform thermal expansion coefficient measurement."
  ],
  [
    "열전도율측정",
    "အပူ လျှပ်စစ်လမ်းကြောင်း တိုင်းတာမှု",
    "Science",
    "열전도율측정을 연구합니다.",
    "I study thermal conductivity measurement."
  ],
  [
    "열용량측정",
    "အပူ ထုထည် တိုင်းတာမှု",
    "Science",
    "열용량측정을 전공합니다.",
    "I major in heat capacity measurement."
  ],
  [
    "비열측정",
    "အထူး အပူ တိုင်းတာမှု",
    "Science",
    "비열측정을 공부합니다.",
    "I study specific heat measurement."
  ],
  [
    "열확산율측정",
    "အပူ ဖြန့်ဝေမှု တိုင်းတာမှု",
    "Science",
    "열확산율측정을 연구합니다.",
    "I study thermal diffusivity measurement."
  ],
  [
    "전기전도율측정",
    "လျှပ်စစ် လျှပ်စစ်လမ်းကြောင်း တိုင်းတာမှု",
    "Science",
    "전기전도율측정을 전공합니다.",
    "I major in electrical conductivity measurement."
  ],
  [
    "저항률측정",
    "ခုခံမှု တိုင်းတာမှု",
    "Science",
    "저항률측정을 공부합니다.",
    "I study resistivity measurement."
  ],
  [
    "유전율측정",
    "လျှပ်စစ်လမ်းကြောင်း စွမ်းအား တိုင်းတာမှု",
    "Science",
    "유전율측정을 연구합니다.",
    "I study permittivity measurement."
  ],
  [
    "투자율측정",
    "သံလိုက် စွမ်းအား တိုင်းတာမှု",
    "Science",
    "투자율측정을 전공합니다.",
    "I major in permeability measurement."
  ],
  [
    "자화율측정",
    "သံလိုက် စွမ်းအား တိုင်းတာမှု",
    "Science",
    "자화율측정을 공부합니다.",
    "I study magnetic susceptibility measurement."
  ],
  [
    "압출성형법",
    "ဖိသိပ်ထုတ်လုပ်မှု နည်းလမ်း",
    "Engineering",
    "압출성형법을 수행합니다.",
    "I perform extrusion molding method."
  ],
  [
    "사출성형법",
    "ထိုးသွင်းထုတ်လုပ်မှု နည်းလမ်း",
    "Engineering",
    "사출성형법을 연구합니다.",
    "I study injection molding method."
  ],
  [
    "압축성형법",
    "ဖိသိပ် ထုတ်လုပ်မှု နည်းလမ်း",
    "Engineering",
    "압축성형법을 전공합니다.",
    "I major in compression molding method."
  ],
  [
    "취성형법",
    "လေမှုတ်ထုတ်လုပ်မှု နည်းလမ်း",
    "Engineering",
    "취성형법을 공부합니다.",
    "I study blow molding method."
  ],
  [
    "회전성형법",
    "လည်ပတ် ထုတ်လုပ်မှု နည်းလမ်း",
    "Engineering",
    "회전성형법을 연구합니다.",
    "I study rotational molding method."
  ],
  [
    "진공성형법",
    "လေဟာနယ် ထုတ်လုပ်မှု နည်းလမ်း",
    "Engineering",
    "진공성형법을 전공합니다.",
    "I major in vacuum forming method."
  ],
  [
    "열성형법",
    "အပူ ထုတ်လုပ်မှု နည်းလမ်း",
    "Engineering",
    "열성형법을 공부합니다.",
    "I study thermoforming method."
  ],
  [
    "압연법",
    "ဖိသိပ် လိမ်ခွေမှု နည်းလမ်း",
    "Engineering",
    "압연법을 연구합니다.",
    "I study rolling method."
  ],
  [
    "인발법",
    "ဆွဲထုတ်မှု နည်းလမ်း",
    "Engineering",
    "인발법을 전공합니다.",
    "I major in drawing method."
  ],
  [
    "단조법",
    "ပုံသွင်းမှု နည်းလမ်း",
    "Engineering",
    "단조법을 공부합니다.",
    "I study forging method."
  ],
  [
    "나노특성화법",
    "နာနို ထူးခြားမှု နည်းလမ်း",
    "Engineering",
    "나노특성화법을 연구합니다.",
    "I study nanocaracterization method."
  ],
  [
    "나노분석법",
    "နာနို ခွဲခြမ်းစိတ်ဖြာမှု နည်းလမ်း",
    "Engineering",
    "나노분석법을 전공합니다.",
    "I major in nanoanalysis method."
  ],
  [
    "나노측정법",
    "နာနို တိုင်းတာမှု နည်းလမ်း",
    "Engineering",
    "나노측정법을 공부합니다.",
    "I study nanomeasurement method."
  ],
  [
    "나노이미징법",
    "နာနို ပုံရိပ် နည်းလမ်း",
    "Engineering",
    "나노이미징법을 연구합니다.",
    "I study nanoimaging method."
  ],
  [
    "나노스펙트로스코피법",
    "နာနို စပက်ထရိုစကုပ်ပီ နည်းလမ်း",
    "Engineering",
    "나노스펙트로스코피법을 전공합니다.",
    "I major in nanospectroscopy method."
  ],
  [
    "나노현미경법",
    "နာနို မိုက်ခရိုစကုပ်ပီ နည်းလမ်း",
    "Engineering",
    "나노현미경법을 공부합니다.",
    "I study nanomicroscopy method."
  ],
  [
    "나노분광학법",
    "နာနို စပက်ထရိုစကုပ်ပီ နည်းလမ်း",
    "Engineering",
    "나노분광학법을 연구합니다.",
    "I study nanospectroscopy method."
  ],
  [
    "나노결정학법",
    "နာနို ပုံဆောင်ခဲ နည်းလမ်း",
    "Engineering",
    "나노결정학법을 전공합니다.",
    "I major in nanocrystallography method."
  ],
  [
    "나노표면분석법",
    "နာနို မျက်နှာပြင် ခွဲခြမ်းစိတ်ဖြာမှု နည်းလမ်း",
    "Engineering",
    "나노표면분석법을 공부합니다.",
    "I study nanosurface analysis method."
  ],
  [
    "나노구조분석법",
    "နာနို ဖွဲ့စည်းပုံ ခွဲခြမ်းစိတ်ဖြာမှု နည်းလမ်း",
    "Engineering",
    "나노구조분석법을 연구합니다.",
    "I study nanostructure analysis method."
  ],
  [
    "초정밀가공기술",
    "အလွန်တိကျသော လုပ်ဆောင်မှု နည်းပညာ",
    "Engineering",
    "초정밀가공기술을 연구합니다.",
    "I study ultra-precision machining technology."
  ],
  [
    "나노가공기술",
    "နာနို လုပ်ဆောင်မှု နည်းပညာ",
    "Engineering",
    "나노가공기술을 전공합니다.",
    "I major in nanomachining technology."
  ],
  [
    "마이크로가공기술",
    "မိုက်ခရို လုပ်ဆောင်မှု နည်းပညာ",
    "Engineering",
    "마이크로가공기술을 공부합니다.",
    "I study micromachining technology."
  ],
  [
    "전기방전가공기술",
    "လျှပ်စစ် ထွန်းလင်းမှု လုပ်ဆောင်မှု နည်းပညာ",
    "Engineering",
    "전기방전가공기술을 연구합니다.",
    "I study electrical discharge machining technology."
  ],
  [
    "전기화학가공기술",
    "လျှပ်စစ် ဓာတုဗေဒ လုပ်ဆောင်မှု နည်းပညာ",
    "Engineering",
    "전기화학가공기술을 전공합니다.",
    "I major in electrochemical machining technology."
  ],
  [
    "레이저가공기술",
    "လေဆာ လုပ်ဆောင်မှု နည်းပညာ",
    "Engineering",
    "레이저가공기술을 공부합니다.",
    "I study laser machining technology."
  ],
  [
    "플라즈마가공기술",
    "ပလာစမာ လုပ်ဆောင်မှု နည်းပညာ",
    "Engineering",
    "플라즈마가공기술을 연구합니다.",
    "I study plasma machining technology."
  ],
  [
    "이온빔가공기술",
    "အိုင်ယွန် ရောင်ခြည် လုပ်ဆောင်မှု နည်းပညာ",
    "Engineering",
    "이온빔가공기술을 전공합니다.",
    "I major in ion beam machining technology."
  ],
  [
    "전자빔가공기술",
    "အီလက်ထရွန် ရောင်ခြည် လုပ်ဆောင်မှု နည်းပညာ",
    "Engineering",
    "전자빔가공기술을 공부합니다.",
    "I study electron beam machining technology."
  ],
  [
    "초음파가공기술",
    "အလွန်မြန်သော အသံ လုပ်ဆောင်မှု နည်းပညာ",
    "Engineering",
    "초음파가공기술을 연구합니다.",
    "I study ultrasonic machining technology."
  ],
  [
    "표면개질기술",
    "မျက်နှာပြင် ပြုပြင်မှု နည်းပညာ",
    "Engineering",
    "표면개질기술을 전공합니다.",
    "I major in surface modification technology."
  ],
  [
    "표면처리기술",
    "မျက်နှာပြင် လုပ်ဆောင်မှု နည်းပညာ",
    "Engineering",
    "표면처리기술을 공부합니다.",
    "I study surface treatment technology."
  ],
  [
    "표면코팅기술",
    "မျက်နှာပြင် ဖုံးအုပ်မှု နည်းပညာ",
    "Engineering",
    "표면코팅기술을 연구합니다.",
    "I study surface coating technology."
  ],
  [
    "표면증착기술",
    "မျက်နှာပြင် အလွှာထည့်သွင်းမှု နည်းပညာ",
    "Engineering",
    "표면증착기술을 전공합니다.",
    "I major in surface deposition technology."
  ],
  [
    "표면에칭기술",
    "မျက်နှာပြင် ထွင်းထုမှု နည်းပညာ",
    "Engineering",
    "표면에칭기술을 공부합니다.",
    "I study surface etching technology."
  ],
  [
    "표면연마기술",
    "မျက်နှာပြင် ချောမွေ့စေမှု နည်းပညာ",
    "Engineering",
    "표면연마기술을 연구합니다.",
    "I study surface polishing technology."
  ],
  [
    "표면나노구조화기술",
    "မျက်နှာပြင် နာနို ဖွဲ့စည်းပုံ နည်းပညာ",
    "Engineering",
    "표면나노구조화기술을 전공합니다.",
    "I major in surface nanostructuring technology."
  ],
  [
    "표면미세구조제어기술",
    "မျက်နှာပြင် အသေးစား ဖွဲ့စည်းပုံ ထိန်းချုပ်မှု နည်းပညာ",
    "Engineering",
    "표면미세구조제어기술을 공부합니다.",
    "I study surface microstructure control technology."
  ],
  [
    "표면나노패턴기술",
    "မျက်နှာပြင် နာနို ပုံစံ နည်းပညာ",
    "Engineering",
    "표면나노패턴기술을 연구합니다.",
    "I study surface nanopatterning technology."
  ],
  [
    "표면기능화기술",
    "မျက်နှာပြင် လုပ်ဆောင်ချက် နည်းပညာ",
    "Engineering",
    "표면기능화기술을 전공합니다.",
    "I major in surface functionalization technology."
  ],
  [
    "재료합성기술",
    "ပစ္စည်း ပေါင်းစပ်မှု နည်းပညာ",
    "Engineering",
    "재료합성기술을 연구합니다.",
    "I study material synthesis technology."
  ],
  [
    "재료가공기술",
    "ပစ္စည်း လုပ်ဆောင်မှု နည်းပညာ",
    "Engineering",
    "재료가공기술을 전공합니다.",
    "I major in material processing technology."
  ],
  [
    "재료특성화기술",
    "ပစ္စည်း ထူးခြားမှု နည်းပညာ",
    "Engineering",
    "재료특성화기술을 공부합니다.",
    "I study material characterization technology."
  ],
  [
    "재료분석기술",
    "ပစ္စည်း ခွဲခြမ်းစိတ်ဖြာမှု နည်းပညာ",
    "Engineering",
    "재료분석기술을 연구합니다.",
    "I study material analysis technology."
  ],
  [
    "재료설계기술",
    "ပစ္စည်း ဒီဇိုင်း နည်းပညာ",
    "Engineering",
    "재료설계기술을 전공합니다.",
    "I major in material design technology."
  ],
  [
    "재료최적화기술",
    "ပစ္စည်း အကောင်းဆုံး နည်းပညာ",
    "Engineering",
    "재료최적화기술을 공부합니다.",
    "I study material optimization technology."
  ],
  [
    "재료개발기술",
    "ပစ္စည်း ဖွံ့ဖြိုးတိုးတက်မှု နည်းပညာ",
    "Engineering",
    "재료개발기술을 연구합니다.",
    "I study material development technology."
  ],
  [
    "재료평가기술",
    "ပစ္စည်း အကဲဖြတ်မှု နည်းပညာ",
    "Engineering",
    "재료평가기술을 전공합니다.",
    "I major in material evaluation technology."
  ],
  [
    "재료시험기술",
    "ပစ္စည်း စမ်းသပ်မှု နည်းပညာ",
    "Engineering",
    "재료시험기술을 공부합니다.",
    "I study material testing technology."
  ],
  [
    "재료품질관리기술",
    "ပစ္စည်း အရည်အသွေး စီမံခန့်ခွဲမှု နည်းပညာ",
    "Engineering",
    "재료품질관리기술을 연구합니다.",
    "I study material quality management technology."
  ],
  [
    "나노측정기술",
    "နာနို တိုင်းတာမှု နည်းပညာ",
    "Science",
    "나노측정기술을 전공합니다.",
    "I major in nanomeasurement technology."
  ],
  [
    "나노분석기술",
    "နာနို ခွဲခြမ်းစိတ်ဖြာမှု နည်းပညာ",
    "Science",
    "나노분석기술을 공부합니다.",
    "I study nanoanalysis technology."
  ],
  [
    "나노이미징기술",
    "နာနို ပုံရိပ် နည်းပညာ",
    "Science",
    "나노이미징기술을 연구합니다.",
    "I study nanoimaging technology."
  ],
  [
    "나노스펙트로스코피기술",
    "နာနို စပက်ထရိုစကုပ်ပီ နည်းပညာ",
    "Science",
    "나노스펙트로스코피기술을 전공합니다.",
    "I major in nanospectroscopy technology."
  ],
  [
    "나노현미경기술",
    "နာနို မိုက်ခရိုစကုပ်ပီ နည်းပညာ",
    "Science",
    "나노현미경기술을 공부합니다.",
    "I study nanomicroscopy technology."
  ],
  [
    "나노분광학기술",
    "နာနို စပက်ထရိုစကုပ်ပီ နည်းပညာ",
    "Science",
    "나노분광학기술을 연구합니다.",
    "I study nanospectroscopy technology."
  ],
  [
    "나노결정학기술",
    "နာနို ပုံဆောင်ခဲ နည်းပညာ",
    "Science",
    "나노결정학기술을 전공합니다.",
    "I major in nanocrystallography technology."
  ],
  [
    "나노표면분석기술",
    "နာနို မျက်နှာပြင် ခွဲခြမ်းစိတ်ဖြာမှု နည်းပညာ",
    "Science",
    "나노표면분석기술을 공부합니다.",
    "I study nanosurface analysis technology."
  ],
  [
    "나노구조분석기술",
    "နာနို ဖွဲ့စည်းပုံ ခွဲခြမ်းစိတ်ဖြာမှု နည်းပညာ",
    "Science",
    "나노구조분석기술을 연구합니다.",
    "I study nanostructure analysis technology."
  ],
  [
    "나노특성화기술",
    "နာနို ထူးခြားမှု နည်းပညာ",
    "Science",
    "나노특성화기술을 전공합니다.",
    "I major in nanocaracterization technology."
  ],
  [
    "분자동역학시뮬레이션기술",
    "မော်လီကျူး လှုပ်ရှားမှု ပုံတူ နည်းပညာ",
    "Computer Science",
    "분자동역학시뮬레이션기술을 공부합니다.",
    "I study molecular dynamics simulation technology."
  ],
  [
    "몬테카를로시뮬레이션기술",
    "မွန်တီကာလို ပုံတူ နည်းပညာ",
    "Computer Science",
    "몬테카를로시뮬레이션기술을 연구합니다.",
    "I study Monte Carlo simulation technology."
  ],
  [
    "양자몬테카를로기술",
    "ကွမ်တမ် မွန်တီကာလို နည်းပညာ",
    "Computer Science",
    "양자몬테카를로기술을 전공합니다.",
    "I major in quantum Monte Carlo technology."
  ],
  [
    "유한요소법기술",
    "အကန့်အသတ် ဒြပ်စင် နည်းပညာ",
    "Computer Science",
    "유한요소법기술을 공부합니다.",
    "I study finite element method technology."
  ],
  [
    "유한차분법기술",
    "အကန့်အသတ် ကွာခြားမှု နည်းပညာ",
    "Computer Science",
    "유한차분법기술을 연구합니다.",
    "I study finite difference method technology."
  ],
  [
    "유한체적법기술",
    "အကန့်အသတ် ထုထည် နည်းပညာ",
    "Computer Science",
    "유한체적법기술을 전공합니다.",
    "I major in finite volume method technology."
  ],
  [
    "격자볼츠만방법기술",
    "ဂရစ် ဘော့ဇ်မန် နည်းလမ်း နည်းပညာ",
    "Computer Science",
    "격자볼츠만방법기술을 공부합니다.",
    "I study lattice Boltzmann method technology."
  ],
  [
    "격자양자색역학기술",
    "ဂရစ် ကွမ်တမ် ရောင်စဉ် စွမ်းအား နည်းပညာ",
    "Computer Science",
    "격자양자색역학기술을 연구합니다.",
    "I study lattice quantum chromodynamics technology."
  ],
  [
    "밀도범함수이론기술",
    "သိပ်သည်းမှု လုပ်ဆောင်ချက် သီအိုရီ နည်းပညာ",
    "Computer Science",
    "밀도범함수이론기술을 전공합니다.",
    "I major in density functional theory technology."
  ],
  [
    "하트리폭방법기술",
    "ဟာထရီ-ဖော့ခ် နည်းလမ်း နည်းပညာ",
    "Computer Science",
    "하트리폭방법기술을 공부합니다.",
    "I study Hartree-Fock method technology."
  ],
  [
    "우주과학",
    "အာကာသ သိပ္ပံ",
    "Science",
    "우주과학을 전공합니다.",
    "I major in space science."
  ],
  [
    "우주항공학",
    "အာကာသ လေကြောင်း",
    "Engineering",
    "우주항공학을 공부합니다.",
    "I study astronautical engineering."
  ],
  [
    "위성공학",
    "ဂြိုဟ်တု အင်ဂျင်နီယာ",
    "Engineering",
    "위성공학을 전공합니다.",
    "I major in satellite engineering."
  ],
  [
    "로켓공학",
    "ဒုံးပျံ အင်ဂျင်နီယာ",
    "Engineering",
    "로켓공학을 연구합니다.",
    "I study rocket engineering."
  ],
  [
    "우주탐사",
    "အာကာသ စူးစမ်းရှာဖွေမှု",
    "Science",
    "우주탐사를 수행합니다.",
    "I conduct space exploration."
  ],
  [
    "행성과학",
    "ဂြိုဟ် သိပ္ပံ",
    "Science",
    "행성과학을 공부합니다.",
    "I study planetary science."
  ],
  [
    "천문학",
    "နက္ခတ္တဗေဒ",
    "Science",
    "천문학을 전공합니다.",
    "I major in astronomy."
  ],
  [
    "우주물리학",
    "အာကာသ ရူပဗေဒ",
    "Science",
    "우주물리학을 연구합니다.",
    "I study space physics."
  ],
  [
    "우주생물학",
    "အာကာသ ဇီဝဗေဒ",
    "Science",
    "우주생물학을 공부합니다.",
    "I study astrobiology."
  ],
  [
    "나노소재",
    "နာနို ပစ္စည်း",
    "Engineering",
    "나노소재를 연구합니다.",
    "I study nanomaterials."
  ],
  [
    "스마트소재",
    "စမတ် ပစ္စည်း",
    "Engineering",
    "스마트소재를 전공합니다.",
    "I major in smart materials."
  ],
  [
    "기능성소재",
    "လုပ်ဆောင်ချက် ပစ္စည်း",
    "Engineering",
    "기능성소재를 공부합니다.",
    "I study functional materials."
  ],
  [
    "복합소재",
    "ရောနှော ပစ္စည်း",
    "Engineering",
    "복합소재를 연구합니다.",
    "I study composite materials."
  ],
  [
    "양자소재",
    "ကွမ်တမ် ပစ္စည်း",
    "Engineering",
    "양자소재를 공부합니다.",
    "I study quantum materials."
  ],
  [
    "바이오소재",
    "ဇီဝ ပစ္စည်း",
    "Engineering",
    "바이오소재를 연구합니다.",
    "I study biomaterials."
  ],
  [
    "나노복합소재",
    "နာနို ရောနှော ပစ္စည်း",
    "Engineering",
    "나노복합소재를 전공합니다.",
    "I major in nanocomposite materials."
  ],
  [
    "스마트복합소재",
    "စမတ် ရောနှော ပစ္စည်း",
    "Engineering",
    "스마트복합소재를 공부합니다.",
    "I study smart composite materials."
  ],
  [
    "기능성나노소재",
    "လုပ်ဆောင်ချက် နာနို ပစ္စည်း",
    "Engineering",
    "기능성나노소재를 연구합니다.",
    "I study functional nanomaterials."
  ],
  [
    "자율주행",
    "ကိုယ်ပိုင် မောင်းနှင်မှု",
    "Technology",
    "자율주행을 연구합니다.",
    "I study autonomous driving."
  ],
  [
    "전기자동차",
    "လျှပ်စစ် ကား",
    "Technology",
    "전기자동차를 개발합니다.",
    "I develop electric vehicles."
  ],
  [
    "수소자동차",
    "ဟိုက်ဒရိုဂျင် ကား",
    "Technology",
    "수소자동차를 전공합니다.",
    "I major in hydrogen vehicles."
  ],
  [
    "하이브리드차",
    "ရောနှော ကား",
    "Technology",
    "하이브리드차를 공부합니다.",
    "I study hybrid vehicles."
  ],
  [
    "스마트모빌리티",
    "စမတ် ရွေ့လျားမှု",
    "Technology",
    "스마트모빌리티를 연구합니다.",
    "I study smart mobility."
  ],
  [
    "공유모빌리티",
    "မျှဝေသော ရွေ့လျားမှု",
    "Technology",
    "공유모빌리티를 전공합니다.",
    "I major in shared mobility."
  ],
  [
    "드론택시",
    "ဒရုန်း တက္ကစီ",
    "Technology",
    "드론택시를 개발합니다.",
    "I develop drone taxis."
  ],
  [
    "하이퍼루프",
    "ဟိုင်ပါ ကွင်းဆက်",
    "Technology",
    "하이퍼루프를 연구합니다.",
    "I study hyperloop."
  ],
  [
    "자율주행버스",
    "ကိုယ်ပိုင် မောင်းနှင်သော ဘတ်စကား",
    "Technology",
    "자율주행버스를 공부합니다.",
    "I study autonomous buses."
  ],
  [
    "전기항공기",
    "လျှပ်စစ် လေယာဉ်",
    "Technology",
    "전기항공기를 전공합니다.",
    "I major in electric aircraft."
  ],
  [
    "정보과학",
    "သတင်းအချက်အလက် သိပ္ပံ",
    "Computer Science",
    "정보과학을 전공합니다.",
    "I major in information science."
  ],
  [
    "데이터과학",
    "ဒေတာ သိပ္ပံ",
    "Computer Science",
    "데이터과학을 연구합니다.",
    "I study data science."
  ],
  [
    "데이터시각화",
    "ဒေတာ ပုံဖော်မှု",
    "Computer Science",
    "데이터시각화를 전공합니다.",
    "I major in data visualization."
  ],
  [
    "데이터웨어하우스",
    "ဒေတာ ဂိုဒေါင်",
    "Computer Science",
    "데이터웨어하우스를 구축합니다.",
    "I build data warehouses."
  ],
  [
    "데이터레이크",
    "ဒေတာ ရေကန်",
    "Computer Science",
    "데이터레이크를 연구합니다.",
    "I study data lakes."
  ],
  [
    "데이터거버넌스",
    "ဒေတာ စီမံခန့်ခွဲရေး",
    "Computer Science",
    "데이터거버넌스를 공부합니다.",
    "I study data governance."
  ],
  [
    "데이터품질",
    "ဒေတာ အရည်အသွေး",
    "Computer Science",
    "데이터품질을 관리합니다.",
    "I manage data quality."
  ],
  [
    "정보보안",
    "သတင်းအချက်အလက် လုံခြုံရေး",
    "Technology",
    "정보보안을 연구합니다.",
    "I study information security."
  ],
  [
    "네트워크보안",
    "ကွန်ရက် လုံခြုံရေး",
    "Technology",
    "네트워크보안을 전공합니다.",
    "I major in network security."
  ],
  [
    "클라우드보안",
    "ကလောက်ဒ် လုံခြုံရေး",
    "Technology",
    "클라우드보안을 공부합니다.",
    "I study cloud security."
  ],
  [
    "모바일보안",
    "မိုဘိုင်း လုံခြုံရေး",
    "Technology",
    "모바일보안을 연구합니다.",
    "I study mobile security."
  ],
  [
    "사이버위협",
    "ဆိုက်ဘာ ခြိမ်းခြောက်မှု",
    "Technology",
    "사이버위협을 분석합니다.",
    "I analyze cyber threats."
  ],
  [
    "침입탐지",
    "ဝင်ရောက်မှု ရှာဖွေမှု",
    "Technology",
    "침입탐지 시스템을 구축합니다.",
    "I build intrusion detection systems."
  ],
  [
    "취약점분석",
    "အားနည်းချက် ခွဲခြမ်းစိတ်ဖြာမှု",
    "Technology",
    "취약점분석을 수행합니다.",
    "I perform vulnerability analysis."
  ],
  [
    "보안감사",
    "လုံခြုံရေး စစ်ဆေးမှု",
    "Technology",
    "보안감사를 실시합니다.",
    "I conduct security audits."
  ],
  [
    "위협분석",
    "ခြိမ်းခြောက်မှု ခွဲခြမ်းစိတ်ဖြာမှု",
    "Technology",
    "위협분석을 연구합니다.",
    "I study threat analysis."
  ],
  [
    "인지편향",
    "သိမြင်မှု ဘက်လိုက်မှု",
    "Social Science",
    "인지편향을 연구합니다.",
    "I study cognitive biases."
  ],
  [
    "의사결정",
    "ဆုံးဖြတ်ချက်",
    "Social Science",
    "의사결정을 분석합니다.",
    "I analyze decision-making."
  ],
  [
    "동기부여",
    "စိတ်အားထက်သန်မှု",
    "Social Science",
    "동기부여를 연구합니다.",
    "I study motivation."
  ],
  [
    "리더십",
    "ဦးဆောင်မှု",
    "Social Science",
    "리더십을 개발합니다.",
    "I develop leadership."
  ],
  [
    "팀워크",
    "အဖွဲ့ အလုပ်",
    "Social Science",
    "팀워크를 강화합니다.",
    "I strengthen teamwork."
  ],
  [
    "갈등관리",
    "ပဋိပက္ခ စီမံခန့်ခွဲမှု",
    "Social Science",
    "갈등관리를 연구합니다.",
    "I study conflict management."
  ],
  [
    "소통",
    "ဆက်သွယ်ရေး",
    "Social Science",
    "소통을 개선합니다.",
    "I improve communication."
  ],
  [
    "감성지능",
    "စိတ်ခံစားမှု ဉာဏ်ရည်",
    "Social Science",
    "감성지능을 개발합니다.",
    "I develop emotional intelligence."
  ],
  [
    "디지털예술",
    "ဒစ်ဂျစ်တယ် အနုပညာ",
    "Arts",
    "디지털예술을 전공합니다.",
    "I major in digital art."
  ],
  [
    "인터랙티브아트",
    "အပြန်အလှန် အနုပညာ",
    "Arts",
    "인터랙티브아트를 공부합니다.",
    "I study interactive art."
  ],
  [
    "생체예술",
    "ဇီဝ အနုပညာ",
    "Arts",
    "생체예술을 전공합니다.",
    "I major in bioart."
  ],
  [
    "로봇예술",
    "ရိုဘော့ အနုပညာ",
    "Arts",
    "로봇예술을 연구합니다.",
    "I study robotic art."
  ],
  [
    "알고리즘예술",
    "အယ်လ်ဂိုရီသမ် အနုပညာ",
    "Arts",
    "알고리즘예술을 공부합니다.",
    "I study algorithmic art."
  ],
  [
    "생성예술",
    "ဖန်တီးသော အနုပညာ",
    "Arts",
    "생성예술을 전공합니다.",
    "I major in generative art."
  ],
  [
    "가상예술",
    "အတုအယောင် အနုပညာ",
    "Arts",
    "가상예술을 연구합니다.",
    "I study virtual art."
  ],
  [
    "증강예술",
    "တိုးမြှင့်ထားသော အနုပညာ",
    "Arts",
    "증강예술을 공부합니다.",
    "I study augmented art."
  ],
  [
    "데이터예술",
    "ဒေတာ အနုပညာ",
    "Arts",
    "데이터예술을 전공합니다.",
    "I major in data art."
  ],
  [
    "기후기술",
    "ရာသီဥတု နည်းပညာ",
    "Environment",
    "기후기술을 전공합니다.",
    "I major in climate technology."
  ],
  [
    "환경기술",
    "ပတ်ဝန်းကျင် နည်းပညာ",
    "Environment",
    "환경기술을 공부합니다.",
    "I study environmental technology."
  ],
  [
    "우주정거장",
    "အာကာသ ဘူတာရုံ",
    "Science",
    "우주정거장을 연구합니다.",
    "I study space stations."
  ],
  [
    "우주탐사선",
    "အာကာသ စူးစမ်းရှာဖွေရေး ယာဉ်",
    "Science",
    "우주탐사선을 개발합니다.",
    "I develop space probes."
  ],
  [
    "인공위성",
    "လူလုပ် ဂြိုဟ်တု",
    "Science",
    "인공위성을 전공합니다.",
    "I major in artificial satellites."
  ],
  [
    "우주선",
    "အာကာသ ယာဉ်",
    "Science",
    "우주선을 연구합니다.",
    "I study spacecraft."
  ],
  [
    "우주복",
    "အာကာသ အဝတ်အစား",
    "Science",
    "우주복을 개발합니다.",
    "I develop spacesuits."
  ],
  [
    "우주식량",
    "အာကာသ အစားအစာ",
    "Science",
    "우주식량을 공부합니다.",
    "I study space food."
  ],
  [
    "무중력",
    "ဆွဲငင်အား မရှိမှု",
    "Science",
    "무중력을 연구합니다.",
    "I study microgravity."
  ],
  [
    "우주환경",
    "အာကာသ ပတ်ဝန်းကျင်",
    "Science",
    "우주환경을 공부합니다.",
    "I study space environment."
  ],
  [
    "우주쓰레기",
    "အာကာသ အမှိုက်",
    "Science",
    "우주쓰레기를 관리합니다.",
    "I manage space debris."
  ],
  [
    "배터리기술",
    "ဘက်ထရီ နည်းပညာ",
    "Engineering",
    "배터리기술을 연구합니다.",
    "I study battery technology."
  ],
  [
    "리튬이온배터리",
    "လီသီယမ် အိုင်ယွန် ဘက်ထရီ",
    "Engineering",
    "리튬이온배터리를 전공합니다.",
    "I major in lithium-ion batteries."
  ],
  [
    "고체배터리",
    "အစိုင်အခဲ ဘက်ထရီ",
    "Engineering",
    "고체배터리를 공부합니다.",
    "I study solid-state batteries."
  ],
  [
    "수소연료전지",
    "ဟိုက်ဒရိုဂျင် လောင်စာ ဆဲလ်",
    "Engineering",
    "수소연료전지를 연구합니다.",
    "I study hydrogen fuel cells."
  ],
  [
    "태양전지",
    "နေရောင်ခြည် ဆဲလ်",
    "Engineering",
    "태양전지를 전공합니다.",
    "I major in solar cells."
  ],
  [
    "태양광패널",
    "နေရောင်ခြည် ပြား",
    "Engineering",
    "태양광패널을 공부합니다.",
    "I study solar panels."
  ],
  [
    "에너지저장",
    "စွမ်းအင် သိုလှောင်မှု",
    "Engineering",
    "에너지저장을 연구합니다.",
    "I study energy storage."
  ],
  [
    "스마트그리드",
    "စမတ် ဂရစ်",
    "Engineering",
    "스마트그리드를 전공합니다.",
    "I major in smart grids."
  ],
  [
    "에너지관리",
    "စွမ်းအင် စီမံခန့်ခွဲမှု",
    "Engineering",
    "에너지관리를 공부합니다.",
    "I study energy management."
  ],
  [
    "자율주행차",
    "ကိုယ်ပိုင် မောင်းနှင်သော ကား",
    "Technology",
    "자율주행차를 개발합니다.",
    "I develop autonomous vehicles."
  ],
  [
    "전기버스",
    "လျှပ်စစ် ဘတ်စကား",
    "Technology",
    "전기버스를 전공합니다.",
    "I major in electric buses."
  ],
  [
    "전기트럭",
    "လျှပ်စစ် ထရပ်ကား",
    "Technology",
    "전기트럭을 공부합니다.",
    "I study electric trucks."
  ],
  [
    "전기오토바이",
    "လျှပ်စစ် မော်တော်ဆိုင်ကယ်",
    "Technology",
    "전기오토바이를 연구합니다.",
    "I study electric motorcycles."
  ],
  [
    "전기자전거",
    "လျှပ်စစ် စက်ဘီး",
    "Technology",
    "전기자전거를 전공합니다.",
    "I major in electric bicycles."
  ],
  [
    "충전인프라",
    "အားသွင်းမှု အခြေခံအဆောက်အဦ",
    "Technology",
    "충전인프라를 구축합니다.",
    "I build charging infrastructure."
  ],
  [
    "배터리교환",
    "ဘက်ထရီ လဲလှယ်မှု",
    "Technology",
    "배터리교환을 연구합니다.",
    "I study battery swapping."
  ],
  [
    "충전기술",
    "အားသွင်းမှု နည်းပညာ",
    "Technology",
    "충전기술을 공부합니다.",
    "I study charging technology."
  ],
  [
    "고속충전",
    "မြန်ဆန်သော အားသွင်းမှု",
    "Technology",
    "고속충전을 전공합니다.",
    "I major in fast charging."
  ],
  [
    "머신러닝로봇",
    "စက်သင်ယူမှု ရိုဘော့",
    "Engineering",
    "머신러닝로봇을 연구합니다.",
    "I study machine learning robots."
  ],
  [
    "딥러닝로봇",
    "နက်ရှိုင်းသော သင်ယူမှု ရိုဘော့",
    "Engineering",
    "딥러닝로봇을 전공합니다.",
    "I major in deep learning robots."
  ],
  [
    "컴퓨터비전로봇",
    "ကွန်ပျူတာ အမြင် ရိုဘော့",
    "Engineering",
    "컴퓨터비전로봇을 공부합니다.",
    "I study computer vision robots."
  ],
  [
    "자연어처리로봇",
    "သဘာဝ ဘာသာစကား လုပ်ဆောင်မှု ရိုဘော့",
    "Engineering",
    "자연어처리로봇을 연구합니다.",
    "I study NLP robots."
  ],
  [
    "강화학습로봇",
    "အားကောင်းစေသော သင်ယူမှု ရိုဘော့",
    "Engineering",
    "강화학습로봇을 전공합니다.",
    "I major in reinforcement learning robots."
  ],
  [
    "데이터엔지니어링",
    "ဒေတာ အင်ဂျင်နီယာ",
    "Computer Science",
    "데이터엔지니어링을 연구합니다.",
    "I study data engineering."
  ],
  [
    "데이터아키텍처",
    "ဒေတာ ဗိသုကာ",
    "Computer Science",
    "데이터아키텍처를 전공합니다.",
    "I major in data architecture."
  ],
  [
    "데이터파이프라인",
    "ဒေတာ ပိုက်လိုင်း",
    "Computer Science",
    "데이터파이프라인을 공부합니다.",
    "I study data pipelines."
  ],
  [
    "데이터스트리밍",
    "ဒေတာ စီးဆင်းမှု",
    "Computer Science",
    "데이터스트리밍을 연구합니다.",
    "I study data streaming."
  ],
  [
    "실시간데이터",
    "အချိန်နှင့်တပြေးညီ ဒေတာ",
    "Computer Science",
    "실시간데이터를 전공합니다.",
    "I major in real-time data."
  ],
  [
    "데이터통합",
    "ဒေတာ ပေါင်းစည်းမှု",
    "Computer Science",
    "데이터통합을 공부합니다.",
    "I study data integration."
  ],
  [
    "데이터변환",
    "ဒေတာ ပြောင်းလဲမှု",
    "Computer Science",
    "데이터변환을 연구합니다.",
    "I study data transformation."
  ],
  [
    "데이터클리닝",
    "ဒေတာ သန့်ရှင်းမှု",
    "Computer Science",
    "데이터클리닝을 전공합니다.",
    "I major in data cleaning."
  ],
  [
    "데이터검증",
    "ဒေတာ အတည်ပြုမှု",
    "Computer Science",
    "데이터검증을 공부합니다.",
    "I study data validation."
  ],
  [
    "데이터보관",
    "ဒေတာ သိုလှောင်မှု",
    "Computer Science",
    "데이터보관을 연구합니다.",
    "I study data archiving."
  ],
  [
    "해싱",
    "ဟက်ရှ်",
    "Technology",
    "해싱을 연구합니다.",
    "I study hashing."
  ],
  [
    "디지털서명",
    "ဒစ်ဂျစ်တယ် လက်မှတ်",
    "Technology",
    "디지털서명을 전공합니다.",
    "I major in digital signatures."
  ],
  [
    "인증",
    "အတည်ပြုမှု",
    "Technology",
    "인증을 공부합니다.",
    "I study authentication."
  ],
  [
    "권한관리",
    "ခွင့်ပြုချက် စီမံခန့်ခွဲမှု",
    "Technology",
    "권한관리를 연구합니다.",
    "I study access control."
  ],
  [
    "프라이버시보호",
    "ကိုယ်ရေးလုံခြုံမှု ကာကွယ်ရေး",
    "Technology",
    "프라이버시보호를 전공합니다.",
    "I major in privacy protection."
  ],
  [
    "데이터보호",
    "ဒေတာ ကာကွယ်ရေး",
    "Technology",
    "데이터보호를 공부합니다.",
    "I study data protection."
  ],
  [
    "개인정보보호",
    "ကိုယ်ရေးသတင်းအချက်အလက် ကာကွယ်ရေး",
    "Technology",
    "개인정보보호를 연구합니다.",
    "I study personal information protection."
  ],
  [
    "GDPR준수",
    "GDPR လိုက်နာမှု",
    "Legal",
    "GDPR준수를 보장합니다.",
    "I ensure GDPR compliance."
  ],
  [
    "미적분학",
    "ကဲကုလပ်",
    "Mathematics",
    "미적분학을 공부합니다.",
    "I study calculus."
  ],
  [
    "선형대수학",
    "ရှေးဦးစွာ မျဉ်းဖြောင့် သင်္ချာ",
    "Mathematics",
    "선형대수학을 전공합니다.",
    "I major in linear algebra."
  ],
  [
    "확률론",
    "ဖြစ်နိုင်ခြေ သီအိုရီ",
    "Mathematics",
    "확률론을 연구합니다.",
    "I study probability theory."
  ],
  [
    "통계학",
    "စာရင်းအင်း",
    "Mathematics",
    "통계학 분석을 합니다.",
    "I conduct statistical analysis."
  ],
  [
    "기하학",
    "ဂျီသြမေတြီ",
    "Mathematics",
    "기하학 문제를 풉니다.",
    "I solve geometry problems."
  ],
  [
    "위상수학",
    "ထောပတ်လိုဂျီ",
    "Mathematics",
    "위상수학을 공부합니다.",
    "I study topology."
  ],
  [
    "수치해석",
    "ကိန်းဂဏန်း ခွဲခြမ်းစိတ်ဖြာမှု",
    "Mathematics",
    "수치해석 방법을 사용합니다.",
    "I use numerical analysis methods."
  ],
  [
    "최적화이론",
    "အကောင်းဆုံး သီအိုရီ",
    "Mathematics",
    "최적화이론을 적용합니다.",
    "I apply optimization theory."
  ],
  [
    "조합론",
    "ပေါင်းစပ်မှု",
    "Mathematics",
    "조합론을 연구합니다.",
    "I study combinatorics."
  ],
  [
    "수론",
    "ကိန်းဂဏန်း သီအိုရီ",
    "Mathematics",
    "수론을 전공합니다.",
    "I major in number theory."
  ],
  [
    "전자기학",
    "လျှပ်စစ်သံလိုက်",
    "Physics",
    "전자기학을 공부합니다.",
    "I study electromagnetism."
  ],
  [
    "열역학",
    "အပူ စွမ်းအား",
    "Physics",
    "열역학 법칙을 이해합니다.",
    "I understand thermodynamics laws."
  ],
  [
    "유체역학",
    "အရည် စွမ်းအား",
    "Physics",
    "유체역학을 연구합니다.",
    "I study fluid mechanics."
  ],
  [
    "광학",
    "အလင်း",
    "Physics",
    "광학 실험을 합니다.",
    "I conduct optics experiments."
  ],
  [
    "음향학",
    "အသံ",
    "Physics",
    "음향학을 전공합니다.",
    "I major in acoustics."
  ],
  [
    "핵물리학",
    "နျူကလီးယား ရူပဗေဒ",
    "Physics",
    "핵물리학 연구를 합니다.",
    "I conduct nuclear physics research."
  ],
  [
    "입자물리학",
    "အမှုန် ရူပဗေဒ",
    "Physics",
    "입자물리학을 공부합니다.",
    "I study particle physics."
  ],
  [
    "응집물질물리학",
    "စုစည်းထားသော ရူပဗေဒ",
    "Physics",
    "응집물질물리학을 연구합니다.",
    "I study condensed matter physics."
  ],
  [
    "상대론",
    "အိုင်းစတိုင်း သီအိုရီ",
    "Physics",
    "상대론을 이해합니다.",
    "I understand relativity theory."
  ],
  [
    "유기화학",
    "အော်ဂဲနစ် ဓာတုဗေဒ",
    "Chemistry",
    "유기화학을 공부합니다.",
    "I study organic chemistry."
  ],
  [
    "무기화학",
    "အော်ဂဲနစ် မဟုတ်သော ဓာတုဗေဒ",
    "Chemistry",
    "무기화학을 전공합니다.",
    "I major in inorganic chemistry."
  ],
  [
    "물리화학",
    "ရူပဗေဒ ဓာတုဗေဒ",
    "Chemistry",
    "물리화학 실험을 합니다.",
    "I conduct physical chemistry experiments."
  ],
  [
    "분석화학",
    "ခွဲခြမ်းစိတ်ဖြာမှု ဓာတုဗေဒ",
    "Chemistry",
    "분석화학을 연구합니다.",
    "I study analytical chemistry."
  ],
  [
    "촉매",
    "ဖျန်းဆေး",
    "Chemistry",
    "촉매 반응을 연구합니다.",
    "I study catalytic reactions."
  ],
  [
    "화학결합",
    "ဓာတုဗေဒ ပေါင်းစည်းမှု",
    "Chemistry",
    "화학결합을 이해합니다.",
    "I understand chemical bonding."
  ],
  [
    "화학평형",
    "ဓာတုဗေဒ ညီမျှမှု",
    "Chemistry",
    "화학평형을 분석합니다.",
    "I analyze chemical equilibrium."
  ],
  [
    "반응속도론",
    "တုံ့ပြန်မှု အမြန်နှုန်း",
    "Chemistry",
    "반응속도론을 연구합니다.",
    "I study reaction kinetics."
  ],
  [
    "미생물학",
    "ပိုးမွှား ဇီဝဗေဒ",
    "Biology",
    "미생물학을 전공합니다.",
    "I major in microbiology."
  ],
  [
    "식물학",
    "အပင်ဗေဒ",
    "Biology",
    "식물학을 공부합니다.",
    "I study botany."
  ],
  [
    "동물학",
    "တိရစ္ဆာန် ဗေဒ",
    "Biology",
    "동물학을 연구합니다.",
    "I study zoology."
  ],
  [
    "해부생리학",
    "ခန္ဓာဗေဒ ဇီဝကမ္မဗေဒ",
    "Biology",
    "해부생리학을 전공합니다.",
    "I major in anatomy and physiology."
  ],
  [
    "면역생물학",
    "ကိုယ်ခံအား ဇီဝဗေဒ",
    "Biology",
    "면역생물학을 공부합니다.",
    "I study immunobiology."
  ],
  [
    "자료구조",
    "ဒေတာ ဖွဲ့စည်းပုံ",
    "Computer Science",
    "자료구조를 학습합니다.",
    "I learn data structures."
  ],
  [
    "알고리즘분석",
    "အယ်လ်ဂိုရီသမ် ခွဲခြမ်းစိတ်ဖြာမှု",
    "Computer Science",
    "알고리즘분석을 합니다.",
    "I conduct algorithm analysis."
  ],
  [
    "컴파일러",
    "ကွန်ပျူတာ ဘာသာပြန်စက်",
    "Computer Science",
    "컴파일러를 설계합니다.",
    "I design compilers."
  ],
  [
    "운영체제",
    "စနစ် လည်ပတ်မှု",
    "Computer Science",
    "운영체제를 공부합니다.",
    "I study operating systems."
  ],
  [
    "데이터베이스설계",
    "ဒေတာဘေ့စ် ဒီဇိုင်း",
    "Computer Science",
    "데이터베이스설계를 합니다.",
    "I design databases."
  ],
  [
    "컴퓨터네트워크",
    "ကွန်ပျူတာ ကွန်ရက်",
    "Computer Science",
    "컴퓨터네트워크를 구축합니다.",
    "I build computer networks."
  ],
  [
    "분산시스템",
    "ဖြန့်ဝေထားသော စနစ်",
    "Computer Science",
    "분산시스템을 개발합니다.",
    "I develop distributed systems."
  ],
  [
    "병렬처리",
    "အပြိုင်လုပ်ဆောင်မှု",
    "Computer Science",
    "병렬처리를 연구합니다.",
    "I study parallel processing."
  ],
  [
    "인공지능이론",
    "လူလုပ်ဉာဏ်ရည် သီအိုရီ",
    "Computer Science",
    "인공지능이론을 공부합니다.",
    "I study artificial intelligence theory."
  ],
  [
    "컴퓨터보안",
    "ကွန်ပျူတာ လုံခြုံရေး",
    "Computer Science",
    "컴퓨터보안을 강화합니다.",
    "I strengthen computer security."
  ],
  [
    "산업조직론",
    "စက်မှု အဖွဲ့အစည်း",
    "Economics",
    "산업조직론을 공부합니다.",
    "I study industrial organization theory."
  ],
  [
    "내과",
    "အတွင်းရောဂါကုသမှု",
    "Medical",
    "내과 진료를 받습니다.",
    "I receive internal medicine treatment."
  ],
  [
    "외과",
    "ခွဲစိတ်ကုသမှု",
    "Medical",
    "외과 수술을 받습니다.",
    "I receive surgical treatment."
  ],
  [
    "소아과",
    "ကလေးဆေးကုသမှု",
    "Medical",
    "소아과 진료를 받습니다.",
    "I receive pediatric treatment."
  ],
  [
    "산부인과",
    "သားဖွားမီးယပ်",
    "Medical",
    "산부인과 검진을 받습니다.",
    "I receive obstetrics and gynecology examination."
  ],
  [
    "신경과",
    "အာရုံကြော",
    "Medical",
    "신경과 진료를 받습니다.",
    "I receive neurology treatment."
  ],
  [
    "정신과",
    "စိတ်ရောဂါကုသမှု",
    "Medical",
    "정신과 상담을 받습니다.",
    "I receive psychiatric counseling."
  ],
  [
    "포트폴리오",
    "ပို့ဆောင်မှု",
    "Business",
    "포트폴리오를 관리합니다.",
    "I manage a portfolio."
  ],
  [
    "리스크분석",
    "အန္တရာယ် ခွဲခြမ်းစိတ်ဖြာမှု",
    "Business",
    "리스크분석을 수행합니다.",
    "I perform risk analysis."
  ],
  [
    "자본구조",
    "အရင်းအနှီး ဖွဲ့စည်းပုံ",
    "Business",
    "자본구조를 최적화합니다.",
    "I optimize capital structure."
  ],
  [
    "현금흐름",
    "ငွေသား စီးဆင်းမှု",
    "Business",
    "현금흐름을 분석합니다.",
    "I analyze cash flow."
  ],
  [
    "수익성분석",
    "အမြတ် ခွဲခြမ်းစိတ်ဖြာမှု",
    "Business",
    "수익성분석을 수행합니다.",
    "I perform profitability analysis."
  ],
  [
    "시장조사",
    "စျေးကွက် သုတေသန",
    "Business",
    "시장조사를 실시합니다.",
    "I conduct market research."
  ],
  [
    "브랜드전략",
    "ကုန်အမှတ်တံဆိပ် နည်းဗျူဟာ",
    "Business",
    "브랜드전략을 수립합니다.",
    "I establish brand strategies."
  ],
  [
    "정치경제학",
    "နိုင်ငံရေး စီးပွားရေး",
    "Social Science",
    "정치경제학을 공부합니다.",
    "I study political economy."
  ],
  [
    "비교정치학",
    "နှိုင်းယှဉ် နိုင်ငံရေး",
    "Social Science",
    "비교정치학을 연구합니다.",
    "I study comparative politics."
  ],
  [
    "국제관계",
    "နိုင်ငံတကာ ဆက်ဆံရေး",
    "Social Science",
    "국제관계를 전공합니다.",
    "I major in international relations."
  ],
  [
    "공공정책",
    "အများပြည်သူ မူဝါဒ",
    "Social Science",
    "공공정책을 분석합니다.",
    "I analyze public policy."
  ],
  [
    "행정학",
    "စီမံခန့်ခွဲရေး",
    "Social Science",
    "행정학을 공부합니다.",
    "I study public administration."
  ],
  [
    "도시계획",
    "မြို့ပြ စီမံကိန်း",
    "Social Science",
    "도시계획을 수립합니다.",
    "I establish urban planning."
  ],
  [
    "사회복지",
    "လူမှုရေး ကောင်းကျိုး",
    "Social Science",
    "사회복지를 실천합니다.",
    "I practice social welfare."
  ],
  [
    "인권",
    "လူ့အခွင့်အရေး",
    "Social Science",
    "인권을 보호합니다.",
    "I protect human rights."
  ],
  [
    "미학이론",
    "အလှအပ သီအိုရီ",
    "Arts",
    "미학이론을 연구합니다.",
    "I study aesthetic theory."
  ],
  [
    "예술사학",
    "အနုပညာ သမိုင်း",
    "Arts",
    "예술사학을 전공합니다.",
    "I major in art history."
  ],
  [
    "비교문학",
    "နှိုင်းယှဉ် စာပေ",
    "Arts",
    "비교문학을 공부합니다.",
    "I study comparative literature."
  ],
  [
    "서사학",
    "ဇာတ်လမ်း",
    "Arts",
    "서사학을 연구합니다.",
    "I study narratology."
  ],
  [
    "연극학",
    "ပြဇာတ်",
    "Arts",
    "연극학을 공부합니다.",
    "I study theater studies."
  ],
  [
    "영화이론",
    "ရုပ်ရှင် သီအိုရီ",
    "Arts",
    "영화이론을 연구합니다.",
    "I study film theory."
  ],
  [
    "세법",
    "အခွန်ဥပဒေ",
    "Legal",
    "세법을 공부합니다.",
    "I study tax law."
  ],
  [
    "가족법",
    "မိသားစု ဥပဒေ",
    "Legal",
    "가족법을 연구합니다.",
    "I study family law."
  ],
  [
    "형사소송법",
    "ရာဇဝတ်တရားစွဲဆိုမှု ဥပဒေ",
    "Legal",
    "형사소송법을 전공합니다.",
    "I major in criminal procedure law."
  ],
  [
    "민사소송법",
    "ပြည်သူ့ တရားစွဲဆိုမှု ဥပဒေ",
    "Legal",
    "민사소송법을 공부합니다.",
    "I study civil procedure law."
  ],
  [
    "해양학",
    "ပင်လယ် သိပ္ပံ",
    "Environment",
    "해양학을 전공합니다.",
    "I major in oceanography."
  ],
  [
    "지질학",
    "မြေသိပ္ပံ",
    "Environment",
    "지질학을 공부합니다.",
    "I study geology."
  ],
  [
    "자원관리",
    "အရင်းအမြစ် စီမံခန့်ခွဲမှု",
    "Environment",
    "자원관리를 실천합니다.",
    "I practice resource management."
  ],
  [
    "생태복원",
    "ဂေဟစနစ် ပြန်လည်ထူထောင်ရေး",
    "Environment",
    "생태복원을 진행합니다.",
    "I proceed with ecological restoration."
  ],
  [
    "환경정책",
    "ပတ်ဝန်းကျင် မူဝါဒ",
    "Environment",
    "환경정책을 수립합니다.",
    "I establish environmental policies."
  ],
  [
    "초분자화학",
    "စူပါမော်လီကျူး ဓာတုဗေဒ",
    "Science",
    "초분자화학을 연구합니다.",
    "I study supramolecular chemistry."
  ],
  [
    "나노화학",
    "နာနို ဓာတုဗေဒ",
    "Science",
    "나노화학을 전공합니다.",
    "I major in nanochemistry."
  ],
  [
    "그린화학",
    "စိမ်းလန်းသော ဓာတုဗေဒ",
    "Science",
    "그린화학을 공부합니다.",
    "I study green chemistry."
  ],
  [
    "통계역학",
    "စာရင်းအင်း ရူပဗေဒ",
    "Mathematics",
    "통계역학을 공부합니다.",
    "I study statistical mechanics."
  ],
  [
    "그래프이론",
    "ဂရပ်ဖ် သီအိုရီ",
    "Mathematics",
    "그래프이론을 연구합니다.",
    "I study graph theory."
  ],
  [
    "암호수학",
    "လျှို့ဝှက်ကုဒ် သင်္ချာ",
    "Mathematics",
    "암호수학을 전공합니다.",
    "I major in cryptography mathematics."
  ],
  [
    "양자장론",
    "ကွမ်တမ် စက်ကွင်း သီအိုရီ",
    "Science",
    "양자장론을 전공합니다.",
    "I major in quantum field theory."
  ],
  [
    "끈이론",
    "ကြိုး သီအိုရီ",
    "Science",
    "끈이론을 공부합니다.",
    "I study string theory."
  ],
  [
    "세포의학",
    "ဆဲလ် ဆေးပညာ",
    "Medical",
    "세포의학을 연구합니다.",
    "I study cellular medicine."
  ],
  [
    "종양학",
    "ကင်ဆာ",
    "Medical",
    "종양학을 공부합니다.",
    "I study oncology."
  ],
  [
    "심장외과",
    "နှလုံး ခွဲစိတ်ကုသမှု",
    "Medical",
    "심장외과를 전공합니다.",
    "I major in cardiac surgery."
  ],
  [
    "미세수술",
    "မိုက်ခရို ခွဲစိတ်မှု",
    "Medical",
    "미세수술을 공부합니다.",
    "I study microsurgery."
  ],
  [
    "최소침습수술",
    "အနည်းဆုံး ထိုးဖောက်မှု ခွဲစိတ်မှု",
    "Medical",
    "최소침습수술을 전공합니다.",
    "I major in minimally invasive surgery."
  ],
  [
    "기계공학",
    "စက်မှု အင်ဂျင်နီယာ",
    "Engineering",
    "기계공학을 공부합니다.",
    "I study mechanical engineering."
  ],
  [
    "전기공학",
    "လျှပ်စစ် အင်ဂျင်နီယာ",
    "Engineering",
    "전기공학을 연구합니다.",
    "I study electrical engineering."
  ],
  [
    "알고리즘설계",
    "အယ်လ်ဂိုရီသမ် ဒီဇိုင်း",
    "Computer Science",
    "알고리즘설계를 연구합니다.",
    "I study algorithm design."
  ],
  [
    "컴퓨터그래픽스",
    "ကွန်ပျူတာ ဂရပ်ဖစ်",
    "Computer Science",
    "컴퓨터그래픽스를 개발합니다.",
    "I develop computer graphics."
  ],
  [
    "인간컴퓨터상호작용",
    "လူ ကွန်ပျူတာ အပြန်အလှန်",
    "Computer Science",
    "인간컴퓨터상호작용을 연구합니다.",
    "I study HCI."
  ],
  [
    "소프트웨어공학",
    "ဆော့ဖ်ဝဲ အင်ဂျင်နီယာ",
    "Computer Science",
    "소프트웨어공학을 전공합니다.",
    "I major in software engineering."
  ],
  [
    "네트워크프로토콜",
    "ကွန်ရက် စည်းမျဉ်း",
    "Computer Science",
    "네트워크프로토콜을 공부합니다.",
    "I study network protocols."
  ],
  [
    "디지털마케팅",
    "ဒစ်ဂျစ်တယ် စျေးကွက်",
    "Business",
    "디지털마케팅을 연구합니다.",
    "I study digital marketing."
  ],
  [
    "데이터마케팅",
    "ဒေတာ စျေးကွက်",
    "Business",
    "데이터마케팅을 전공합니다.",
    "I major in data marketing."
  ],
  [
    "고객경험",
    "ဖောက်သည် အတွေ့အကြုံ",
    "Business",
    "고객경험을 개선합니다.",
    "I improve customer experience."
  ],
  [
    "전략기획",
    "ဗျူဟာ စီစဉ်မှု",
    "Business",
    "전략기획을 수립합니다.",
    "I develop strategic planning."
  ],
  [
    "미디어연구",
    "မီဒီယာ လေ့လာမှု",
    "Social Science",
    "미디어연구를 공부합니다.",
    "I study media studies."
  ],
  [
    "젠더연구",
    "လိင် လေ့လာမှု",
    "Social Science",
    "젠더연구를 연구합니다.",
    "I study gender studies."
  ],
  [
    "도시연구",
    "မြို့ပြ လေ့လာမှု",
    "Social Science",
    "도시연구를 전공합니다.",
    "I major in urban studies."
  ],
  [
    "글로벌화",
    "ကမ္ဘာလုံးဆိုင်ရာ",
    "Social Science",
    "글로벌화를 분석합니다.",
    "I analyze globalization."
  ],
  [
    "다문화주의",
    "ဘာသာစကားမျိုးစုံ",
    "Social Science",
    "다문화주의를 공부합니다.",
    "I study multiculturalism."
  ],
  [
    "포스트모더니즘",
    "ပို့စ်မော်ဒန်",
    "Social Science",
    "포스트모더니즘을 연구합니다.",
    "I study postmodernism."
  ],
  [
    "비판이론",
    "ဝေဖန်သော သီအိုရီ",
    "Social Science",
    "비판이론을 전공합니다.",
    "I major in critical theory."
  ],
  [
    "계산언어학",
    "တွက်ချက်သော ဘာသာဗေဒ",
    "Language",
    "계산언어학을 연구합니다.",
    "I study computational linguistics."
  ],
  [
    "음성학",
    "အသံ",
    "Language",
    "음성학을 전공합니다.",
    "I major in phonetics."
  ],
  [
    "음운론",
    "အသံ သီအိုရီ",
    "Language",
    "음운론을 공부합니다.",
    "I study phonology."
  ],
  [
    "형태론",
    "ပုံစံ",
    "Language",
    "형태론을 연구합니다.",
    "I study morphology."
  ],
  [
    "통사론",
    "ဝါကျဖွဲ့စည်းပုံ",
    "Language",
    "통사론을 전공합니다.",
    "I major in syntax."
  ],
  [
    "의미론",
    "အဓိပ္ပာယ်",
    "Language",
    "의미론을 공부합니다.",
    "I study semantics."
  ],
  [
    "화용론",
    "အသုံးပြုမှု",
    "Language",
    "화용론을 연구합니다.",
    "I study pragmatics."
  ],
  [
    "사회언어학",
    "လူမှုရေး ဘာသာဗေဒ",
    "Language",
    "사회언어학을 전공합니다.",
    "I major in sociolinguistics."
  ],
  [
    "심리언어학",
    "စိတ်ပညာ ဘာသာဗေဒ",
    "Language",
    "심리언어학을 공부합니다.",
    "I study psycholinguistics."
  ],
  [
    "신경언어학",
    "အာရုံကြော ဘာသာဗေဒ",
    "Language",
    "신경언어학을 연구합니다.",
    "I study neurolinguistics."
  ],
  [
    "인터랙티브디자인",
    "အပြန်အလှန် ဒီဇိုင်း",
    "Arts",
    "인터랙티브디자인을 연구합니다.",
    "I study interactive design."
  ],
  [
    "사용자경험디자인",
    "အသုံးပြုသူ အတွေ့အကြုံ ဒီဇိုင်း",
    "Arts",
    "사용자경험디자인을 개발합니다.",
    "I develop UX design."
  ],
  [
    "사용자인터페이스",
    "အသုံးပြုသူ မျက်နှာပြင်",
    "Arts",
    "사용자인터페이스를 설계합니다.",
    "I design user interfaces."
  ],
  [
    "정보디자인",
    "သတင်းအချက်အလက် ဒီဇိုင်း",
    "Arts",
    "정보디자인을 전공합니다.",
    "I major in information design."
  ],
  [
    "타이포그래피",
    "စာလုံး ဒီဇိုင်း",
    "Arts",
    "타이포그래피를 공부합니다.",
    "I study typography."
  ],
  [
    "그래픽디자인",
    "ဂရပ်ဖစ် ဒီဇိုင်း",
    "Arts",
    "그래픽디자인을 연구합니다.",
    "I study graphic design."
  ],
  [
    "산업디자인",
    "စက်မှု ဒီဇိုင်း",
    "Arts",
    "산업디자인을 전공합니다.",
    "I major in industrial design."
  ],
  [
    "환경디자인",
    "ပတ်ဝန်းကျင် ဒီဇိုင်း",
    "Arts",
    "환경디자인을 공부합니다.",
    "I study environmental design."
  ],
  [
    "사회인류학",
    "လူမှုရေး လူမှုရေး",
    "Social Science",
    "사회인류학을 연구합니다.",
    "I study social anthropology."
  ],
  [
    "공간디자인",
    "အာကာသ ဒီဇိုင်း",
    "Arts",
    "공간디자인을 연구합니다.",
    "I study spatial design."
  ],
  [
    "비교언어학",
    "နှိုင်းယှဉ် ဘာသာဗေဒ",
    "Linguistics",
    "비교언어학을 연구합니다.",
    "I study comparative linguistics."
  ],
  [
    "형이상학",
    "ရူပဗေဒ အထက်",
    "Philosophy",
    "형이상학을 공부합니다.",
    "I study metaphysics."
  ],
  [
    "인식론",
    "အသိပညာ သီအိုရီ",
    "Philosophy",
    "인식론을 전공합니다.",
    "I major in epistemology."
  ],
  [
    "논리학",
    "ယုတ္တိဗေဒ",
    "Philosophy",
    "논리학을 연구합니다.",
    "I study logic."
  ],
  [
    "윤리학",
    "ကျင့်ဝတ် သိပ္ပံ",
    "Philosophy",
    "윤리학을 공부합니다.",
    "I study ethics."
  ],
  [
    "존재론",
    "တည်ရှိမှု သီအိုရီ",
    "Philosophy",
    "존재론을 연구합니다.",
    "I study ontology."
  ],
  [
    "현상학",
    "ဖြစ်ရပ် သိပ္ပံ",
    "Philosophy",
    "현상학을 공부합니다.",
    "I study phenomenology."
  ],
  [
    "해석학",
    "အနက်ဖွင့်ဆိုမှု",
    "Philosophy",
    "해석학을 전공합니다.",
    "I major in hermeneutics."
  ],
  [
    "실존주의",
    "တည်ရှိမှု ဝါဒ",
    "Philosophy",
    "실존주의를 연구합니다.",
    "I study existentialism."
  ],
  [
    "구조주의",
    "ဖွဲ့စည်းပုံ ဝါဒ",
    "Philosophy",
    "구조주의를 공부합니다.",
    "I study structuralism."
  ],
  [
    "내분비학",
    "ဟော်မုန်း",
    "Medical",
    "내분비학을 전공합니다.",
    "I major in endocrinology."
  ],
  [
    "심장학",
    "နှလုံး",
    "Medical",
    "심장학을 연구합니다.",
    "I study cardiology."
  ],
  [
    "폐학",
    "အဆုတ်",
    "Medical",
    "폐학을 공부합니다.",
    "I study pulmonology."
  ],
  [
    "소화기내과",
    "အစာခြေ",
    "Medical",
    "소화기내과 진료를 받습니다.",
    "I receive gastroenterology treatment."
  ],
  [
    "신장학",
    "ကျောက်ကပ်",
    "Medical",
    "신장학을 전공합니다.",
    "I major in nephrology."
  ],
  [
    "혈액학",
    "သွေး",
    "Medical",
    "혈액학을 연구합니다.",
    "I study hematology."
  ],
  [
    "감염학",
    "ကူးစက်ရောဂါ",
    "Medical",
    "감염학을 연구합니다.",
    "I study infectious diseases."
  ],
  [
    "재활의학",
    "ပြန်လည်ထူထောင်ရေး",
    "Medical",
    "재활의학 치료를 받습니다.",
    "I receive rehabilitation medicine treatment."
  ],
  [
    "사이버네틱스",
    "ဆိုက်ဘာနက်တစ်",
    "Technology",
    "사이버네틱스를 연구합니다.",
    "I study cybernetics."
  ],
  [
    "인지과학",
    "သိမြင်မှု သိပ္ပံ",
    "Technology",
    "인지과학을 전공합니다.",
    "I major in cognitive science."
  ],
  [
    "조직행동",
    "အဖွဲ့အစည်း အပြုအမူ",
    "Business",
    "조직행동을 분석합니다.",
    "I analyze organizational behavior."
  ],
  [
    "인적자원",
    "လူ့စွမ်းအား",
    "Business",
    "인적자원을 관리합니다.",
    "I manage human resources."
  ],
  [
    "성과관리",
    "စွမ်းဆောင်ရည် စီမံခန့်ခွဲမှု",
    "Business",
    "성과관리 시스템을 구축합니다.",
    "I build performance management systems."
  ],
  [
    "프로세스개선",
    "လုပ်ငန်းစဉ် ကောင်းမွန်စေမှု",
    "Business",
    "프로세스개선을 진행합니다.",
    "I proceed with process improvement."
  ],
  [
    "품질보증",
    "အရည်အသွေး အာမခံ",
    "Business",
    "품질보증을 실시합니다.",
    "I conduct quality assurance."
  ],
  [
    "프로젝트관리",
    "စီမံကိန်း စီမံခန့်ခွဲမှု",
    "Business",
    "프로젝트관리를 수행합니다.",
    "I perform project management."
  ],
  [
    "공급망",
    "ထောက်ပံ့မှု ကွင်းဆက်",
    "Business",
    "공급망을 최적화합니다.",
    "I optimize the supply chain."
  ],
  [
    "고객관계관리",
    "ဖောက်သည် ဆက်ဆံရေး စီမံခန့်ခွဲမှု",
    "Business",
    "고객관계관리를 도입합니다.",
    "I introduce customer relationship management."
  ],
  [
    "고고인류학",
    "ရှေးဟောင်း လူသားဗေဒ",
    "Social Science",
    "고고인류학을 전공합니다.",
    "I major in archaeological anthropology."
  ],
  [
    "생물인류학",
    "ဇီဝ လူသားဗေဒ",
    "Social Science",
    "생물인류학을 공부합니다.",
    "I study biological anthropology."
  ],
  [
    "언어인류학",
    "ဘာသာစကား လူသားဗေဒ",
    "Social Science",
    "언어인류학을 연구합니다.",
    "I study linguistic anthropology."
  ],
  [
    "정치사회학",
    "နိုင်ငံရေး လူမှုရေး",
    "Social Science",
    "정치사회학을 전공합니다.",
    "I major in political sociology."
  ],
  [
    "경제사회학",
    "စီးပွားရေး လူမှုရေး",
    "Social Science",
    "경제사회학을 공부합니다.",
    "I study economic sociology."
  ],
  [
    "도시사회학",
    "မြို့ပြ လူမှုရေး",
    "Social Science",
    "도시사회학을 연구합니다.",
    "I study urban sociology."
  ],
  [
    "가족사회학",
    "မိသားစု လူမှုရေး",
    "Social Science",
    "가족사회학을 전공합니다.",
    "I major in family sociology."
  ],
  [
    "교육사회학",
    "ပညာရေး လူမှုရေး",
    "Social Science",
    "교육사회학을 공부합니다.",
    "I study educational sociology."
  ],
  [
    "종교사회학",
    "ဘာသာရေး လူမှုရေး",
    "Social Science",
    "종교사회학을 연구합니다.",
    "I study sociology of religion."
  ],
  [
    "패션디자인",
    "ဖက်ရှင် ဒီဇိုင်း",
    "Arts",
    "패션디자인을 연구합니다.",
    "I study fashion design."
  ],
  [
    "인테리어디자인",
    "အတွင်းပိုင်း ဒီဇိုင်း",
    "Arts",
    "인테리어디자인을 전공합니다.",
    "I major in interior design."
  ],
  [
    "웹디자인",
    "ဝက်ဘ် ဒီဇိုင်း",
    "Arts",
    "웹디자인을 공부합니다.",
    "I study web design."
  ],
  [
    "UI/UX디자인",
    "အသုံးပြုသူ အင်တာဖေ့စ် ဒီဇိုင်း",
    "Arts",
    "UI/UX디자인을 연구합니다.",
    "I study UI/UX design."
  ],
  [
    "일러스트레이션",
    "ပုံဆွဲ",
    "Arts",
    "일러스트레이션을 공부합니다.",
    "I study illustration."
  ],
  [
    "애니메이션",
    "ရုပ်ရှင်",
    "Arts",
    "애니메이션을 연구합니다.",
    "I study animation."
  ],
  [
    "디지털아트",
    "ဒစ်ဂျစ်တယ် အနုပညာ",
    "Arts",
    "디지털아트를 전공합니다.",
    "I major in digital art."
  ],
  [
    "기상학",
    "ရာသီဥတု",
    "Environment",
    "기상학을 공부합니다.",
    "I study meteorology."
  ],
  [
    "지구화학",
    "ကမ္ဘာ ဓာတုဗေဒ",
    "Environment",
    "지구화학을 전공합니다.",
    "I major in geochemistry."
  ],
  [
    "지구물리학",
    "ကမ္ဘာ ရူပဗေဒ",
    "Environment",
    "지구물리학을 공부합니다.",
    "I study geophysics."
  ],
  [
    "고생물학",
    "ရှေးဟောင်း ဇီဝဗေဒ",
    "Environment",
    "고생물학을 연구합니다.",
    "I study paleontology."
  ],
  [
    "지질구조학",
    "မြေသိပ္ပံ ဖွဲ့စည်းပုံ",
    "Environment",
    "지질구조학을 전공합니다.",
    "I major in structural geology."
  ],
  [
    "수문학",
    "ရေ သိပ္ပံ",
    "Environment",
    "수문학을 공부합니다.",
    "I study hydrology."
  ],
  [
    "토양학",
    "မြေဆီလွှာ",
    "Environment",
    "토양학을 연구합니다.",
    "I study soil science."
  ],
  [
    "대기화학",
    "လေထု ဓာတုဗေဒ",
    "Environment",
    "대기화학을 전공합니다.",
    "I major in atmospheric chemistry."
  ],
  [
    "신경심리학",
    "အာရုံကြော စိတ်ပညာ",
    "Psychology",
    "신경심리학을 연구합니다.",
    "I study neuropsychology."
  ],
  [
    "인격심리학",
    "ကိုယ်ရည်ကိုယ်သွေး စိတ်ပညာ",
    "Psychology",
    "인격심리학을 전공합니다.",
    "I major in personality psychology."
  ],
  [
    "실험심리학",
    "စမ်းသပ်မှု စိတ်ပညာ",
    "Psychology",
    "실험심리학을 연구합니다.",
    "I study experimental psychology."
  ],
  [
    "생리심리학",
    "ဇီဝကမ္မဗေဒ စိတ်ပညာ",
    "Psychology",
    "생리심리학을 전공합니다.",
    "I major in physiological psychology."
  ],
  [
    "행동신경과학",
    "အပြုအမူ အာရုံကြော သိပ္ပံ",
    "Psychology",
    "행동신경과학을 연구합니다.",
    "I study behavioral neuroscience."
  ],
  [
    "원자력공학",
    "နျူကလီးယား အင်ဂျင်နီယာ",
    "Engineering",
    "원자력공학을 연구합니다.",
    "I study nuclear engineering."
  ],
  [
    "항공공학",
    "လေကြောင်း အင်ဂျင်နီယာ",
    "Engineering",
    "항공공학을 공부합니다.",
    "I study aerospace engineering."
  ],
  [
    "해양공학",
    "ပင်လယ် အင်ဂျင်နီယာ",
    "Engineering",
    "해양공학을 전공합니다.",
    "I major in ocean engineering."
  ],
  [
    "생체의공학",
    "ဇီဝ ဆေးပညာ အင်ဂျင်နီယာ",
    "Engineering",
    "생체의공학을 연구합니다.",
    "I study biomedical engineering."
  ],
  [
    "커뮤니케이션학",
    "ဆက်သွယ်ရေး",
    "Communication",
    "커뮤니케이션학을 연구합니다.",
    "I study communication studies."
  ],
  [
    "저널리즘",
    "သတင်းစာပညာ",
    "Communication",
    "저널리즘을 전공합니다.",
    "I major in journalism."
  ],
  [
    "방송학",
    "ရုပ်မြင်သံကြား",
    "Communication",
    "방송학을 공부합니다.",
    "I study broadcasting."
  ],
  [
    "광고학",
    "ကြော်ငြာ",
    "Communication",
    "광고학을 연구합니다.",
    "I study advertising."
  ],
  [
    "공 relations",
    "အများပြည်သူ ဆက်ဆံရေး",
    "Communication",
    "공 relations을 전공합니다.",
    "I major in public relations."
  ],
  [
    "미디어학",
    "မီဒီယာ",
    "Communication",
    "미디어학을 공부합니다.",
    "I study media studies."
  ],
  [
    "디지털미디어",
    "ဒစ်ဂျစ်တယ် မီဒီယာ",
    "Communication",
    "디지털미디어를 연구합니다.",
    "I study digital media."
  ],
  [
    "멀티미디어",
    "များစွာ မီဒီယာ",
    "Communication",
    "멀티미디어를 전공합니다.",
    "I major in multimedia."
  ],
  [
    "콘텐츠제작",
    "အကြောင်းအရာ ဖန်တီးမှု",
    "Communication",
    "콘텐츠제작을 공부합니다.",
    "I study content production."
  ],
  [
    "미디어비평",
    "မီဒီယာ ဝေဖန်မှု",
    "Communication",
    "미디어비평을 연구합니다.",
    "I study media criticism."
  ],
  [
    "교육학",
    "ပညာရေး",
    "Education",
    "교육학을 전공합니다.",
    "I major in education."
  ],
  [
    "교육철학",
    "ပညာရေး ဒဿနိကဗေဒ",
    "Education",
    "교육철학을 공부합니다.",
    "I study philosophy of education."
  ],
  [
    "교육행정",
    "ပညာရေး စီမံခန့်ခွဲရေး",
    "Education",
    "교육행정을 연구합니다.",
    "I study educational administration."
  ],
  [
    "교육과정",
    "ပညာရေး သင်ရိုးညွှန်းတမ်း",
    "Education",
    "교육과정을 개발합니다.",
    "I develop curriculum."
  ],
  [
    "교육평가",
    "ပညာရေး အကဲဖြတ်မှု",
    "Education",
    "교육평가를 실시합니다.",
    "I conduct educational assessment."
  ],
  [
    "특수교육",
    "အထူး ပညာရေး",
    "Education",
    "특수교육을 전공합니다.",
    "I major in special education."
  ],
  [
    "유아교육",
    "ကလေး ပညာရေး",
    "Education",
    "유아교육을 공부합니다.",
    "I study early childhood education."
  ],
  [
    "농학",
    "စိုက်ပျိုးရေး",
    "Agriculture",
    "농학을 전공합니다.",
    "I major in agriculture."
  ],
  [
    "식품과학",
    "အစားအစာ သိပ္ပံ",
    "Agriculture",
    "식품과학을 연구합니다.",
    "I study food science."
  ],
  [
    "농업경제학",
    "စိုက်ပျိုးရေး စီးပွားရေး",
    "Agriculture",
    "농업경제학을 공부합니다.",
    "I study agricultural economics."
  ],
  [
    "작물학",
    "စိုက်ပျိုးမှု",
    "Agriculture",
    "작물학을 전공합니다.",
    "I major in crop science."
  ],
  [
    "임학",
    "သစ်တော",
    "Agriculture",
    "임학을 공부합니다.",
    "I study forestry."
  ],
  [
    "토양과학",
    "မြေဆီလွှာ သိပ္ပံ",
    "Agriculture",
    "토양과학을 연구합니다.",
    "I study soil science."
  ],
  [
    "건축학",
    "ဗိသုကာ",
    "Architecture",
    "건축학을 전공합니다.",
    "I major in architecture."
  ],
  [
    "조경학",
    "ဥယျာဉ် ဒီဇိုင်း",
    "Architecture",
    "조경학을 공부합니다.",
    "I study landscape architecture."
  ],
  [
    "건축설계",
    "ဗိသုကာ ဒီဇိုင်း",
    "Architecture",
    "건축설계를 합니다.",
    "I do architectural design."
  ],
  [
    "건축역사",
    "ဗိသုကာ သမိုင်း",
    "Architecture",
    "건축역사를 전공합니다.",
    "I major in architectural history."
  ],
  [
    "건축이론",
    "ဗိသုကာ သီအိုရီ",
    "Architecture",
    "건축이론을 연구합니다.",
    "I study architectural theory."
  ],
  [
    "주거학",
    "နေထိုင်ရေး",
    "Architecture",
    "주거학을 전공합니다.",
    "I major in housing studies."
  ],
  [
    "운동영양학",
    "လေ့ကျင့်ခန်း အာဟာရ",
    "Sports",
    "운동영양학을 연구합니다.",
    "I study sports nutrition."
  ],
  [
    "초고해상도현미경",
    "အလွန်မြန်သော ဖြေရှင်းနိုင်မှု မိုက်ခရိုစကုပ်ပီ",
    "Technology",
    "초고해상도현미경을 연구합니다.",
    "I study super-resolution microscopy."
  ],
  [
    "양자현미경",
    "ကွမ်တမ် မိုက်ခရိုစကုပ်ပီ",
    "Technology",
    "양자현미경을 전공합니다.",
    "I major in quantum microscopy."
  ],
  [
    "원자력현미경",
    "အက်တမ် စွမ်းအား မိုက်ခရိုစကုပ်ပီ",
    "Technology",
    "원자력현미경을 연구합니다.",
    "I study atomic force microscopy."
  ],
  [
    "초음파현미경",
    "အလွန်မြန်သော အသံ မိုက်ခရိုစကုပ်ပီ",
    "Technology",
    "초음파현미경을 전공합니다.",
    "I major in ultrasonic microscopy."
  ],
  [
    "공초점현미경",
    "ပေါင်းစည်းသော အာရုံစူးစိုက်မှု မိုက်ခရိုစကုပ်ပီ",
    "Technology",
    "공초점현미경을 공부합니다.",
    "I study confocal microscopy."
  ],
  [
    "형광현미경",
    "ဖလူရိုရှင်း မိုက်ခရိုစကုပ်ပီ",
    "Technology",
    "형광현미경을 연구합니다.",
    "I study fluorescence microscopy."
  ],
  [
    "주사전자현미경",
    "ရှာဖွေသော အီလက်ထရွန် မိုက်ခရိုစကုပ်ပီ",
    "Technology",
    "주사전자현미경을 전공합니다.",
    "I major in scanning electron microscopy."
  ],
  [
    "투과전자현미경",
    "ဖြတ်သန်းသော အီလက်ထရွန် မိုက်ခရိုစကုပ်ပီ",
    "Technology",
    "투과전자현미경을 공부합니다.",
    "I study transmission electron microscopy."
  ],
  [
    "전자현미경",
    "အီလက်ထရွန် မိုက်ခရိုစကုပ်ပီ",
    "Technology",
    "전자현미경을 사용합니다.",
    "I use electron microscopy."
  ],
  [
    "라만분광법",
    "ရာမန် စပက်ထရိုစကုပ်ပီ",
    "Science",
    "라만분광법을 연구합니다.",
    "I study Raman spectroscopy."
  ],
  [
    "적외선분광법",
    "အနီအောက်ရောင်ခြည် စပက်ထရိုစကုပ်ပီ",
    "Science",
    "적외선분광법을 전공합니다.",
    "I major in infrared spectroscopy."
  ],
  [
    "자외선분광법",
    "ခရမ်းလွန်ရောင်ခြည် စပက်ထရိုစကုပ်ပီ",
    "Science",
    "자외선분광법을 공부합니다.",
    "I study ultraviolet spectroscopy."
  ],
  [
    "핵자기공명",
    "နျူကလီးယား သံလိုက် ပြန်လည်ထူထောင်ရေး",
    "Science",
    "핵자기공명을 연구합니다.",
    "I study nuclear magnetic resonance."
  ],
  [
    "질량분석법",
    "ထုထည် ခွဲခြမ်းစိတ်ဖြာမှု",
    "Science",
    "질량분석법을 전공합니다.",
    "I major in mass spectrometry."
  ],
  [
    "X선결정학",
    "X-ရောင်ခြည် ပုံဆောင်ခဲ",
    "Science",
    "X선결정학을 공부합니다.",
    "I study X-ray crystallography."
  ],
  [
    "중성자산란",
    "အလယ်အလတ် ဖြန့်ဝေမှု",
    "Science",
    "중성자산란을 연구합니다.",
    "I study neutron scattering."
  ],
  [
    "전자스핀공명",
    "အီလက်ထရွန် လည်ပတ်မှု ပြန်လည်ထူထောင်ရေး",
    "Science",
    "전자스핀공명을 전공합니다.",
    "I major in electron spin resonance."
  ],
  [
    "원자흡수분광법",
    "အက်တမ် စုပ်ယူမှု စပက်ထရိုစကုပ်ပီ",
    "Science",
    "원자흡수분광법을 공부합니다.",
    "I study atomic absorption spectroscopy."
  ],
  [
    "형광분광법",
    "ဖလူရိုရှင်း စပက်ထရိုစကုပ်ပီ",
    "Science",
    "형광분광법을 연구합니다.",
    "I study fluorescence spectroscopy."
  ],
  [
    "몬테카를로시뮬레이션",
    "မွန်တီကာလို ပုံတူ",
    "Computer Science",
    "몬테카를로시뮬레이션을 수행합니다.",
    "I perform Monte Carlo simulations."
  ],
  [
    "분자동역학시뮬레이션",
    "မော်လီကျူး လှုပ်ရှားမှု ပုံတူ",
    "Computer Science",
    "분자동역학시뮬레이션을 연구합니다.",
    "I study molecular dynamics simulations."
  ],
  [
    "양자몬테카를로",
    "ကွမ်တမ် မွန်တီကာလို",
    "Computer Science",
    "양자몬테카를로를 전공합니다.",
    "I major in quantum Monte Carlo."
  ],
  [
    "유한요소법",
    "အကန့်အသတ် ဒြပ်စင်",
    "Computer Science",
    "유한요소법을 공부합니다.",
    "I study finite element method."
  ],
  [
    "유한차분법",
    "အကန့်အသတ် ကွာခြားမှု",
    "Computer Science",
    "유한차분법을 연구합니다.",
    "I study finite difference method."
  ],
  [
    "유한체적법",
    "အကန့်အသတ် ထုထည်",
    "Computer Science",
    "유한체적법을 전공합니다.",
    "I major in finite volume method."
  ],
  [
    "격자볼츠만방법",
    "ဂရစ် ဘော့ဇ်မန် နည်းလမ်း",
    "Computer Science",
    "격자볼츠만방법을 공부합니다.",
    "I study lattice Boltzmann method."
  ],
  [
    "격자양자색역학",
    "ဂရစ် ကွမ်တမ် ရောင်စဉ် စွမ်းအား",
    "Computer Science",
    "격자양자색역학을 연구합니다.",
    "I study lattice quantum chromodynamics."
  ],
  [
    "밀도범함수이론",
    "သိပ်သည်းမှု လုပ်ဆောင်ချက် သီအိုရီ",
    "Computer Science",
    "밀도범함수이론을 전공합니다.",
    "I major in density functional theory."
  ],
  [
    "하트리폭방법",
    "ဟာထရီ-ဖော့ခ် နည်းလမ်း",
    "Computer Science",
    "하트리폭방법을 공부합니다.",
    "I study Hartree-Fock method."
  ],
  [
    "PCR증폭",
    "PCR တိုးမြှင့်မှု",
    "Biology",
    "PCR증폭을 수행합니다.",
    "I perform PCR amplification."
  ],
  [
    "DNA시퀀싱",
    "DNA အစဉ်",
    "Biology",
    "DNA시퀀싱을 연구합니다.",
    "I study DNA sequencing."
  ],
  [
    "RNA시퀀싱",
    "RNA အစဉ်",
    "Biology",
    "RNA시퀀싱을 전공합니다.",
    "I major in RNA sequencing."
  ],
  [
    "단백질결정화",
    "ပရိုတိန်း ပုံဆောင်ခဲ",
    "Biology",
    "단백질결정화를 공부합니다.",
    "I study protein crystallization."
  ],
  [
    "크로마토그래피",
    "အရောင်ခွဲခြမ်းစိတ်ဖြာမှု",
    "Biology",
    "크로마토그래피를 연구합니다.",
    "I study chromatography."
  ],
  [
    "전기영동",
    "လျှပ်စစ် ရွေ့လျားမှု",
    "Biology",
    "전기영동을 전공합니다.",
    "I major in electrophoresis."
  ],
  [
    "서던블롯",
    "ဆာသန် ဘလော့",
    "Biology",
    "서던블롯을 공부합니다.",
    "I study Southern blotting."
  ],
  [
    "노던블롯",
    "နော်သန် ဘလော့",
    "Biology",
    "노던블롯을 연구합니다.",
    "I study Northern blotting."
  ],
  [
    "웨스턴블롯",
    "ဝက်စတန် ဘလော့",
    "Biology",
    "웨스턴블롯을 전공합니다.",
    "I major in Western blotting."
  ],
  [
    "면역형광법",
    "ကိုယ်ခံအား ဖလူရိုရှင်း",
    "Biology",
    "면역형광법을 공부합니다.",
    "I study immunofluorescence."
  ],
  [
    "화학기상증착",
    "ဓာတုဗေဒ ရေငွေ့ အလွှာထည့်သွင်းမှု",
    "Engineering",
    "화학기상증착을 연구합니다.",
    "I study chemical vapor deposition."
  ],
  [
    "물리기상증착",
    "ရူပဗေဒ ရေငွေ့ အလွှာထည့်သွင်းမှု",
    "Engineering",
    "물리기상증착을 전공합니다.",
    "I major in physical vapor deposition."
  ],
  [
    "원자층증착",
    "အက်တမ် အလွှာ အလွှာထည့်သွင်းမှု",
    "Engineering",
    "원자층증착을 공부합니다.",
    "I study atomic layer deposition."
  ],
  [
    "분자빔에피택시",
    "မော်လီကျူး ရောင်ခြည် အပေါ်ယံအလွှာ",
    "Engineering",
    "분자빔에피택시를 연구합니다.",
    "I study molecular beam epitaxy."
  ],
  [
    "금속유기화학기상증착",
    "သတ္တု အော်ဂဲနစ် ဓာတုဗေဒ ရေငွေ့ အလွှာထည့်သွင်းမှု",
    "Engineering",
    "금속유기화학기상증착을 전공합니다.",
    "I major in metal-organic chemical vapor deposition."
  ],
  [
    "플라즈마증착",
    "ပလာစမာ အလွှာ ထည့်သွင်းမှု",
    "Engineering",
    "플라즈마증착을 공부합니다.",
    "I study plasma deposition."
  ],
  [
    "스퍼터링",
    "ဖြန်းဆေးထည့်သွင်းမှု",
    "Engineering",
    "스퍼터링을 연구합니다.",
    "I study sputtering."
  ],
  [
    "레이저증착",
    "လေဆာ အလွှာ ထည့်သွင်းမှု",
    "Engineering",
    "레이저증착을 전공합니다.",
    "I major in laser deposition."
  ],
  [
    "전자빔증착",
    "အီလက်ထရွန် ရောင်ခြည် အလွှာ ထည့်သွင်းမှု",
    "Engineering",
    "전자빔증착을 공부합니다.",
    "I study electron beam deposition."
  ],
  [
    "이온빔증착",
    "အိုင်ယွန် ရောင်ခြည် အလွှာ ထည့်သွင်းမှု",
    "Engineering",
    "이온빔증착을 연구합니다.",
    "I study ion beam deposition."
  ],
  [
    "열분석",
    "အပူ ခွဲခြမ်းစိတ်ဖြာမှု",
    "Science",
    "열분석을 수행합니다.",
    "I perform thermal analysis."
  ],
  [
    "시차주사열량법",
    "ကွာခြားမှု ရှာဖွေသော အပူ ထုထည်",
    "Science",
    "시차주사열량법을 연구합니다.",
    "I study differential scanning calorimetry."
  ],
  [
    "열중량분석",
    "အပူ ထုထည် ခွဲခြမ်းစိတ်ဖြာမှု",
    "Science",
    "열중량분석을 전공합니다.",
    "I major in thermogravimetric analysis."
  ],
  [
    "열기계분석",
    "အပူ စက်မှု ခွဲခြမ်းစိတ်ဖြာမှု",
    "Science",
    "열기계분석을 공부합니다.",
    "I study thermomechanical analysis."
  ],
  [
    "동적기계분석",
    "လှုပ်ရှားမှု စက်မှု ခွဲခြမ်းစိတ်ဖြာမှု",
    "Science",
    "동적기계분석을 연구합니다.",
    "I study dynamic mechanical analysis."
  ],
  [
    "표면분석",
    "မျက်နှာပြင် ခွဲခြမ်းစိတ်ဖြာမှု",
    "Science",
    "표면분석을 전공합니다.",
    "I major in surface analysis."
  ],
  [
    "X선광전자분광법",
    "X-ရောင်ခြည် အလင်း အီလက်ထရွန် စပက်ထရိုစကုပ်ပီ",
    "Science",
    "X선광전자분광법을 공부합니다.",
    "I study X-ray photoelectron spectroscopy."
  ],
  [
    "오제전자분광법",
    "အော်ဂျာ အီလက်ထရွန် စပက်ထရိုစကုပ်ပီ",
    "Science",
    "오제전자분광법을 연구합니다.",
    "I study Auger electron spectroscopy."
  ],
  [
    "이차이온질량분석",
    "ဒုတိယ အိုင်ယွန် ထုထည် ခွဲခြမ်းစိတ်ဖြာမှု",
    "Science",
    "이차이온질량분석을 전공합니다.",
    "I major in secondary ion mass spectrometry."
  ],
  [
    "주사탐침현미경",
    "ရှာဖွေသော စူးစမ်းရှာဖွေမှု မိုက်ခရိုစကုပ်ပီ",
    "Science",
    "주사탐침현미경을 공부합니다.",
    "I study scanning probe microscopy."
  ],
  [
    "초음파분쇄",
    "အလွန်မြန်သော အသံ ကြိတ်ချေမှု",
    "Engineering",
    "초음파분쇄를 수행합니다.",
    "I perform ultrasonic fragmentation."
  ],
  [
    "초음파추출",
    "အလွန်မြန်သော အသံ ထုတ်ယူမှု",
    "Engineering",
    "초음파추출을 연구합니다.",
    "I study ultrasonic extraction."
  ],
  [
    "초음파세정",
    "အလွန်မြန်သော အသံ သန့်ရှင်းမှု",
    "Engineering",
    "초음파세정을 전공합니다.",
    "I major in ultrasonic cleaning."
  ],
  [
    "초음파용접",
    "အလွန်မြန်သော အသံ ပေါင်းစပ်မှု",
    "Engineering",
    "초음파용접을 공부합니다.",
    "I study ultrasonic welding."
  ],
  [
    "레이저가공",
    "လေဆာ လုပ်ဆောင်မှု",
    "Engineering",
    "레이저가공을 전공합니다.",
    "I major in laser processing."
  ],
  [
    "레이저용접",
    "လေဆာ ပေါင်းစပ်မှု",
    "Engineering",
    "레이저용접을 공부합니다.",
    "I study laser welding."
  ],
  [
    "레이저절단",
    "လေဆာ ဖြတ်တောက်မှု",
    "Engineering",
    "레이저절단을 연구합니다.",
    "I study laser cutting."
  ],
  [
    "레이저마킹",
    "လေဆာ အမှတ်အသား",
    "Engineering",
    "레이저마킹을 공부합니다.",
    "I study laser marking."
  ],
  [
    "표면거칠기측정",
    "မျက်နှာပြင် ကြမ်းတမ်းမှု တိုင်းတာမှု",
    "Engineering",
    "표면거칠기측정을 수행합니다.",
    "I perform surface roughness measurement."
  ],
  [
    "경도측정",
    "ခိုင်မာမှု တိုင်းတာမှု",
    "Engineering",
    "경도측정을 연구합니다.",
    "I study hardness measurement."
  ],
  [
    "인장시험",
    "ဆွဲဆန့်မှု စမ်းသပ်မှု",
    "Engineering",
    "인장시험을 전공합니다.",
    "I major in tensile testing."
  ],
  [
    "압축시험",
    "ဖိသိပ်မှု စမ်းသပ်မှု",
    "Engineering",
    "압축시험을 공부합니다.",
    "I study compression testing."
  ],
  [
    "굽힘시험",
    "ကွေးညွှတ်မှု စမ်းသပ်မှု",
    "Engineering",
    "굽힘시험을 연구합니다.",
    "I study bending testing."
  ],
  [
    "피로시험",
    "ပင်ပန်းနွမ်းနယ်မှု စမ်းသပ်မှု",
    "Engineering",
    "피로시험을 전공합니다.",
    "I major in fatigue testing."
  ],
  [
    "충격시험",
    "ရိုက်ခတ်မှု စမ်းသပ်မှု",
    "Engineering",
    "충격시험을 공부합니다.",
    "I study impact testing."
  ],
  [
    "마모시험",
    "ပွန်းပဲ့မှု စမ်းသပ်မှု",
    "Engineering",
    "마모시험을 연구합니다.",
    "I study wear testing."
  ],
  [
    "부식시험",
    "ချေးတက်မှု စမ်းသပ်မှု",
    "Engineering",
    "부식시험을 전공합니다.",
    "I major in corrosion testing."
  ],
  [
    "크리프시험",
    "တဖြည်းဖြည်း ပြောင်းလဲမှု စမ်းသပ်မှု",
    "Engineering",
    "크리프시험을 공부합니다.",
    "I study creep testing."
  ],
  [
    "전기방사",
    "လျှပ်စစ် ရှေးခေတ်စက်",
    "Engineering",
    "전기방사를 수행합니다.",
    "I perform electrospinning."
  ],
  [
    "전기도금",
    "လျှပ်စစ် သတ္တုဖုံးအုပ်မှု",
    "Engineering",
    "전기도금을 연구합니다.",
    "I study electroplating."
  ],
  [
    "전기화학에칭",
    "လျှပ်စစ် ဓာတုဗေဒ ထွင်းထုမှု",
    "Engineering",
    "전기화학에칭을 연구합니다.",
    "I study electrochemical etching."
  ],
  [
    "플라즈마에칭",
    "ပလာစမာ ထွင်းထုမှု",
    "Engineering",
    "플라즈마에칭을 전공합니다.",
    "I major in plasma etching."
  ],
  [
    "플라즈마처리",
    "ပလာစမာ လုပ်ဆောင်မှု",
    "Engineering",
    "플라즈마처리를 공부합니다.",
    "I study plasma processing."
  ],
  [
    "플라즈마용사",
    "ပလာစမာ ဖြန်းဆေးထည့်သွင်းမှု",
    "Engineering",
    "플라즈마용사를 연구합니다.",
    "I study plasma spraying."
  ],
  [
    "플라즈마나이트리딩",
    "ပလာစမာ နိုက်ထရိုဂျင် ထည့်သွင်းမှု",
    "Engineering",
    "플라즈마나이트리딩을 전공합니다.",
    "I major in plasma nitriding."
  ],
  [
    "플라즈마카보나이징",
    "ပလာစမာ ကာဗွန် ထည့်သွင်းမှု",
    "Engineering",
    "플라즈마카보나이징을 공부합니다.",
    "I study plasma carburizing."
  ],
  [
    "열팽창계수",
    "အပူ ဖြန့်ထွက်မှု ကိန်းသေ",
    "Science",
    "열팽창계수를 측정합니다.",
    "I measure thermal expansion coefficient."
  ],
  [
    "열전도율",
    "အပူ လျှပ်စစ်လမ်းကြောင်း",
    "Science",
    "열전도율을 연구합니다.",
    "I study thermal conductivity."
  ],
  [
    "열용량",
    "အပူ ထုထည်",
    "Science",
    "열용량을 전공합니다.",
    "I major in heat capacity."
  ],
  [
    "비열",
    "အထူး အပူ",
    "Science",
    "비열을 공부합니다.",
    "I study specific heat."
  ],
  [
    "열확산율",
    "အပူ ဖြန့်ဝေမှု",
    "Science",
    "열확산율을 연구합니다.",
    "I study thermal diffusivity."
  ],
  [
    "전기전도율",
    "လျှပ်စစ် လျှပ်စစ်လမ်းကြောင်း",
    "Science",
    "전기전도율을 전공합니다.",
    "I major in electrical conductivity."
  ],
  [
    "저항률",
    "ခုခံမှု",
    "Science",
    "저항률을 공부합니다.",
    "I study resistivity."
  ],
  [
    "유전율",
    "လျှပ်စစ်လမ်းကြောင်း စွမ်းအား",
    "Science",
    "유전율을 연구합니다.",
    "I study permittivity."
  ],
  [
    "투자율",
    "သံလိုက် စွမ်းအား",
    "Science",
    "투자율을 전공합니다.",
    "I major in permeability."
  ],
  [
    "자화율",
    "သံလိုက် စွမ်းအား",
    "Science",
    "자화율을 공부합니다.",
    "I study magnetic susceptibility."
  ],
  [
    "압출성형",
    "ဖိသိပ်ထုတ်လုပ်မှု",
    "Engineering",
    "압출성형을 수행합니다.",
    "I perform extrusion molding."
  ],
  [
    "사출성형",
    "ထိုးသွင်းထုတ်လုပ်မှု",
    "Engineering",
    "사출성형을 연구합니다.",
    "I study injection molding."
  ],
  [
    "압축성형",
    "ဖိသိပ် ထုတ်လုပ်မှု",
    "Engineering",
    "압축성형을 전공합니다.",
    "I major in compression molding."
  ],
  [
    "취성형",
    "လေမှုတ်ထုတ်လုပ်မှု",
    "Engineering",
    "취성형을 공부합니다.",
    "I study blow molding."
  ],
  [
    "회전성형",
    "လည်ပတ် ထုတ်လုပ်မှု",
    "Engineering",
    "회전성형을 연구합니다.",
    "I study rotational molding."
  ],
  [
    "진공성형",
    "လေဟာနယ် ထုတ်လုပ်မှု",
    "Engineering",
    "진공성형을 전공합니다.",
    "I major in vacuum forming."
  ],
  [
    "열성형",
    "အပူ ထုတ်လုပ်မှု",
    "Engineering",
    "열성형을 공부합니다.",
    "I study thermoforming."
  ],
  [
    "압연",
    "ဖိသိပ် လိမ်ခွေမှု",
    "Engineering",
    "압연을 연구합니다.",
    "I study rolling."
  ],
  [
    "인발",
    "ဆွဲထုတ်မှု",
    "Engineering",
    "인발을 전공합니다.",
    "I major in drawing."
  ],
  [
    "단조",
    "ပုံသွင်းမှု",
    "Engineering",
    "단조를 공부합니다.",
    "I study forging."
  ],
  [
    "유전자편집기술",
    "မျိုးရိုးဗီဇ ပြင်ဆင်မှု နည်းပညာ",
    "Biology",
    "유전자편집기술을 연구합니다.",
    "I study gene editing technology."
  ],
  [
    "크리스퍼기술",
    "CRISPR နည်းပညာ",
    "Biology",
    "크리스퍼기술을 전공합니다.",
    "I major in CRISPR technology."
  ],
  [
    "유전자치료기술",
    "မျိုးရိုးဗီဇ ကုသမှု နည်းပညာ",
    "Biology",
    "유전자치료기술을 공부합니다.",
    "I study gene therapy technology."
  ],
  [
    "세포배양기술",
    "ဆဲလ် စိုက်ပျိုးမှု နည်းပညာ",
    "Biology",
    "세포배양기술을 연구합니다.",
    "I study cell culture technology."
  ],
  [
    "조직공학기술",
    "တစ်ရှူး အင်ဂျင်နီယာ နည်းပညာ",
    "Biology",
    "조직공학기술을 전공합니다.",
    "I major in tissue engineering technology."
  ],
  [
    "생체재료기술",
    "ဇီဝပစ္စည်း နည်းပညာ",
    "Biology",
    "생체재료기술을 공부합니다.",
    "I study biomaterial technology."
  ],
  [
    "단백질공학기술",
    "ပရိုတိန်း အင်ဂျင်နီယာ နည်းပညာ",
    "Biology",
    "단백질공학기술을 연구합니다.",
    "I study protein engineering technology."
  ],
  [
    "효소공학기술",
    "အင်ဇိုင်း အင်ဂျင်နီယာ နည်းပညာ",
    "Biology",
    "효소공학기술을 전공합니다.",
    "I major in enzyme engineering technology."
  ],
  [
    "면역공학기술",
    "ကိုယ်ခံအား အင်ဂျင်နီယာ နည်းပညာ",
    "Biology",
    "면역공학기술을 공부합니다.",
    "I study immunology engineering technology."
  ],
  [
    "바이오센서기술",
    "ဇီဝအာရုံခံ နည်းပညာ",
    "Biology",
    "바이오센서기술을 연구합니다.",
    "I study biosensor technology."
  ],
  [
    "나노입자합성기술",
    "နာနို အမှုန် ပေါင်းစပ်မှု နည်းပညာ",
    "Engineering",
    "나노입자합성기술을 전공합니다.",
    "I major in nanoparticle synthesis technology."
  ],
  [
    "나노튜브제조기술",
    "နာနို ပိုက် ထုတ်လုပ်မှု နည်းပညာ",
    "Engineering",
    "나노튜브제조기술을 공부합니다.",
    "I study nanotube manufacturing technology."
  ],
  [
    "나노와이어제조기술",
    "နာနို ဝိုင်ယာ ထုတ်လုပ်မှု နည်းပညာ",
    "Engineering",
    "나노와이어제조기술을 연구합니다.",
    "I study nanowire manufacturing technology."
  ],
  [
    "나노막제조기술",
    "နာနို အလွှာ ထုတ်လုပ်မှု နည်းပညာ",
    "Engineering",
    "나노막제조기술을 전공합니다.",
    "I major in nanofilm manufacturing technology."
  ],
  [
    "나노구조제어기술",
    "နာနို ဖွဲ့စည်းပုံ ထိန်းချုပ်မှု နည်းပညာ",
    "Engineering",
    "나노구조제어기술을 공부합니다.",
    "I study nanostructure control technology."
  ],
  [
    "나노패턴기술",
    "နာနို ပုံစံ နည်းပညာ",
    "Engineering",
    "나노패턴기술을 연구합니다.",
    "I study nanopatterning technology."
  ],
  [
    "나노리소그래피기술",
    "နာနို ပုံနှိပ် နည်းပညာ",
    "Engineering",
    "나노리소그래피기술을 전공합니다.",
    "I major in nanolithography technology."
  ],
  [
    "나노어셈블리기술",
    "နာနို စုစည်းမှု နည်းပညာ",
    "Engineering",
    "나노어셈블리기술을 공부합니다.",
    "I study nanoassembly technology."
  ],
  [
    "나노조작기술",
    "နာနို လုပ်ဆောင်မှု နည်းပညာ",
    "Engineering",
    "나노조작기술을 연구합니다.",
    "I study nanomanipulation technology."
  ],
  [
    "나노자기기술",
    "နာနို သံလိုက် နည်းပညာ",
    "Engineering",
    "나노자기기술을 전공합니다.",
    "I major in nanomagnetic technology."
  ],
  [
    "양자컴퓨팅기술",
    "ကွမ်တမ် ကွန်ပျူတာ နည်းပညာ",
    "Computer Science",
    "양자컴퓨팅기술을 공부합니다.",
    "I study quantum computing technology."
  ],
  [
    "양자암호화기술",
    "ကွမ်တမ် လျှို့ဝှက်ကုဒ် နည်းပညာ",
    "Computer Science",
    "양자암호화기술을 연구합니다.",
    "I study quantum encryption technology."
  ],
  [
    "양자통신기술",
    "ကွမ်တမ် ဆက်သွယ်ရေး နည်းပညာ",
    "Computer Science",
    "양자통신기술을 전공합니다.",
    "I major in quantum communication technology."
  ],
  [
    "양자센서기술",
    "ကွမ်တမ် အာရုံခံ နည်းပညာ",
    "Computer Science",
    "양자센서기술을 공부합니다.",
    "I study quantum sensor technology."
  ],
  [
    "양자시뮬레이션기술",
    "ကွမ်တမ် ပုံတူ နည်းပညာ",
    "Computer Science",
    "양자시뮬레이션기술을 연구합니다.",
    "I study quantum simulation technology."
  ],
  [
    "양자알고리즘기술",
    "ကွမ်တမ် အယ်လ်ဂိုရီသမ် နည်းပညာ",
    "Computer Science",
    "양자알고리즘기술을 전공합니다.",
    "I major in quantum algorithm technology."
  ],
  [
    "양자네트워크기술",
    "ကွမ်တမ် ကွန်ရက် နည်းပညာ",
    "Computer Science",
    "양자네트워크기술을 공부합니다.",
    "I study quantum network technology."
  ],
  [
    "양자메모리기술",
    "ကွမ်တမ် မှတ်ဉာဏ် နည်းပညာ",
    "Computer Science",
    "양자메모리기술을 연구합니다.",
    "I study quantum memory technology."
  ],
  [
    "양자정보처리기술",
    "ကွမ်တမ် အချက်အလက် လုပ်ဆောင်မှု နည်းပညာ",
    "Computer Science",
    "양자정보처리기술을 전공합니다.",
    "I major in quantum information processing technology."
  ],
  [
    "양자계산기술",
    "ကွမ်တမ် တွက်ချက်မှု နည်းပညာ",
    "Computer Science",
    "양자계산기술을 공부합니다.",
    "I study quantum calculation technology."
  ],
  [
    "태양전지기술",
    "နေရောင်ခြည် ဘက်ထရီ နည်းပညာ",
    "Engineering",
    "태양전지기술을 연구합니다.",
    "I study solar cell technology."
  ],
  [
    "연료전지기술",
    "လောင်စာ ဘက်ထရီ နည်းပညာ",
    "Engineering",
    "연료전지기술을 전공합니다.",
    "I major in fuel cell technology."
  ],
  [
    "리튬이온전지기술",
    "လီသီယမ် အိုင်ယွန် ဘက်ထရီ နည်းပညာ",
    "Engineering",
    "리튬이온전지기술을 공부합니다.",
    "I study lithium-ion battery technology."
  ],
  [
    "수소연료기술",
    "ဟိုက်ဒရိုဂျင် လောင်စာ နည်းပညာ",
    "Engineering",
    "수소연료기술을 연구합니다.",
    "I study hydrogen fuel technology."
  ],
  [
    "바이오연료기술",
    "ဇီဝ လောင်စာ နည်းပညာ",
    "Engineering",
    "바이오연료기술을 전공합니다.",
    "I major in biofuel technology."
  ],
  [
    "풍력발전기술",
    "လေအား လျှပ်စစ်ထုတ်လုပ်မှု နည်းပညာ",
    "Engineering",
    "풍력발전기술을 공부합니다.",
    "I study wind power generation technology."
  ],
  [
    "수력발전기술",
    "ရေအား လျှပ်စစ်ထုတ်လုပ်မှု နည်းပညာ",
    "Engineering",
    "수력발전기술을 연구합니다.",
    "I study hydroelectric power generation technology."
  ],
  [
    "지열발전기술",
    "မြေအောက်အပူ လျှပ်စစ်ထုတ်လုပ်မှု နည်းပညာ",
    "Engineering",
    "지열발전기술을 전공합니다.",
    "I major in geothermal power generation technology."
  ],
  [
    "조력발전기술",
    "ဒီရေ လျှပ်စစ်ထုတ်လုပ်မှု နည်းပညာ",
    "Engineering",
    "조력발전기술을 공부합니다.",
    "I study tidal power generation technology."
  ],
  [
    "원자력발전기술",
    "နျူကလီးယား စွမ်းအား လျှပ်စစ်ထုတ်လုပ်မှု နည်းပညာ",
    "Engineering",
    "원자력발전기술을 연구합니다.",
    "I study nuclear power generation technology."
  ],
  [
    "초전도체기술",
    "အလွန်လျှပ်စစ်လမ်းကြောင်း နည်းပညာ",
    "Engineering",
    "초전도체기술을 전공합니다.",
    "I major in superconductor technology."
  ],
  [
    "반도체기술",
    "ခွဲခြမ်းစိတ်ဖြာသော လျှပ်စစ်လမ်းကြောင်း နည်းပညာ",
    "Engineering",
    "반도체기술을 공부합니다.",
    "I study semiconductor technology."
  ],
  [
    "도체기술",
    "လျှပ်စစ်လမ်းကြောင်း နည်းပညာ",
    "Engineering",
    "도체기술을 연구합니다.",
    "I study conductor technology."
  ],
  [
    "절연체기술",
    "ခွဲခြမ်းစိတ်ဖြာသော လျှပ်စစ်လမ်းကြောင်း နည်းပညာ",
    "Engineering",
    "절연체기술을 전공합니다.",
    "I major in insulator technology."
  ],
  [
    "자성재료기술",
    "သံလိုက် ပစ္စည်း နည်းပညာ",
    "Engineering",
    "자성재료기술을 공부합니다.",
    "I study magnetic material technology."
  ],
  [
    "강자성재료기술",
    "ခိုင်မာသော သံလိုက် ပစ္စည်း နည်းပညာ",
    "Engineering",
    "강자성재료기술을 연구합니다.",
    "I study ferromagnetic material technology."
  ],
  [
    "상자성재료기술",
    "အပေါ်ယံ သံလိုက် ပစ္စည်း နည်းပညာ",
    "Engineering",
    "상자성재료기술을 전공합니다.",
    "I major in paramagnetic material technology."
  ],
  [
    "반자성재료기술",
    "ခွဲခြမ်းစိတ်ဖြာသော သံလိုက် ပစ္စည်း နည်းပညာ",
    "Engineering",
    "반자성재료기술을 공부합니다.",
    "I study diamagnetic material technology."
  ],
  [
    "초강자성재료기술",
    "အလွန်ခိုင်မာသော သံလိုက် ပစ္စည်း နည်းပညာ",
    "Engineering",
    "초강자성재료기술을 연구합니다.",
    "I study superparamagnetic material technology."
  ],
  [
    "자기저항재료기술",
    "သံလိုက် ခုခံမှု ပစ္စည်း နည်းပညာ",
    "Engineering",
    "자기저항재료기술을 전공합니다.",
    "I major in magnetoresistive material technology."
  ],
  [
    "레이저기술",
    "လေဆာ နည်းပညာ",
    "Engineering",
    "레이저기술을 공부합니다.",
    "I study laser technology."
  ],
  [
    "광섬유기술",
    "အလင်း ဖိုင်ဘာ နည်းပညာ",
    "Engineering",
    "광섬유기술을 연구합니다.",
    "I study optical fiber technology."
  ],
  [
    "광전자기술",
    "အလင်း အီလက်ထရွန် နည်းပညာ",
    "Engineering",
    "광전자기술을 전공합니다.",
    "I major in optoelectronics technology."
  ],
  [
    "광통신기술",
    "အလင်း ဆက်သွယ်ရေး နည်းပညာ",
    "Engineering",
    "광통신기술을 공부합니다.",
    "I study optical communication technology."
  ],
  [
    "광학기술",
    "အလင်း နည်းပညာ",
    "Engineering",
    "광학기술을 연구합니다.",
    "I study optics technology."
  ],
  [
    "광학현미경기술",
    "အလင်း မိုက်ခရိုစကုပ်ပီ နည်းပညာ",
    "Engineering",
    "광학현미경기술을 전공합니다.",
    "I major in optical microscopy technology."
  ],
  [
    "광학분광기술",
    "အလင်း စပက်ထရိုစကုပ်ပီ နည်းပညာ",
    "Engineering",
    "광학분광기술을 공부합니다.",
    "I study optical spectroscopy technology."
  ],
  [
    "광학이미징기술",
    "အလင်း ပုံရိပ် နည်းပညာ",
    "Engineering",
    "광학이미징기술을 연구합니다.",
    "I study optical imaging technology."
  ],
  [
    "광학센서기술",
    "အလင်း အာရုံခံ နည်းပညာ",
    "Engineering",
    "광학센서기술을 전공합니다.",
    "I major in optical sensor technology."
  ],
  [
    "광학계산기술",
    "အလင်း တွက်ချက်မှု နည်းပညာ",
    "Engineering",
    "광학계산기술을 공부합니다.",
    "I study optical computing technology."
  ],
  [
    "화학합성기술",
    "ဓာတုဗေဒ ပေါင်းစပ်မှု နည်းပညာ",
    "Chemistry",
    "화학합성기술을 연구합니다.",
    "I study chemical synthesis technology."
  ],
  [
    "촉매기술",
    "ဖျော်ရည် နည်းပညာ",
    "Chemistry",
    "촉매기술을 전공합니다.",
    "I major in catalyst technology."
  ],
  [
    "화학반응기술",
    "ဓာတုဗေဒ တုံ့ပြန်မှု နည်းပညာ",
    "Chemistry",
    "화학반응기술을 공부합니다.",
    "I study chemical reaction technology."
  ],
  [
    "화학분리기술",
    "ဓာတုဗေဒ ခွဲထုတ်မှု နည်းပညာ",
    "Chemistry",
    "화학분리기술을 연구합니다.",
    "I study chemical separation technology."
  ],
  [
    "화학정제기술",
    "ဓာတုဗေဒ သန့်စင်မှု နည်းပညာ",
    "Chemistry",
    "화학정제기술을 전공합니다.",
    "I major in chemical purification technology."
  ],
  [
    "화학분석기술",
    "ဓာတုဗေဒ ခွဲခြမ်းစိတ်ဖြာမှု နည်းပညာ",
    "Chemistry",
    "화학분석기술을 공부합니다.",
    "I study chemical analysis technology."
  ],
  [
    "화학처리기술",
    "ဓာတုဗေဒ လုပ်ဆောင်မှု နည်းပညာ",
    "Chemistry",
    "화학처리기술을 연구합니다.",
    "I study chemical processing technology."
  ],
  [
    "화학변환기술",
    "ဓာတုဗေဒ ပြောင်းလဲမှု နည်းပညာ",
    "Chemistry",
    "화학변환기술을 전공합니다.",
    "I major in chemical conversion technology."
  ],
  [
    "화학최적화기술",
    "ဓာတုဗေဒ အကောင်းဆုံး နည်းပညာ",
    "Chemistry",
    "화학최적화기술을 공부합니다.",
    "I study chemical optimization technology."
  ],
  [
    "화학공정기술",
    "ဓာတုဗေဒ လုပ်ငန်းစဉ် နည်းပညာ",
    "Chemistry",
    "화학공정기술을 연구합니다.",
    "I study chemical process technology."
  ],
  [
    "환경정화기술",
    "ပတ်ဝန်းကျင် သန့်စင်မှု နည်းပညာ",
    "Engineering",
    "환경정화기술을 전공합니다.",
    "I major in environmental purification technology."
  ],
  [
    "대기정화기술",
    "လေထု သန့်စင်မှု နည်းပညာ",
    "Engineering",
    "대기정화기술을 공부합니다.",
    "I study air purification technology."
  ],
  [
    "수질정화기술",
    "ရေအရည်အသွေး သန့်စင်မှု နည်းပညာ",
    "Engineering",
    "수질정화기술을 연구합니다.",
    "I study water quality purification technology."
  ],
  [
    "폐기물처리기술",
    "စွန့်ပစ်ပစ္စည်း လုပ်ဆောင်မှု နည်းပညာ",
    "Engineering",
    "폐기물처리기술을 전공합니다.",
    "I major in waste treatment technology."
  ],
  [
    "재활용기술",
    "ပြန်လည်အသုံးပြုမှု နည်းပညာ",
    "Engineering",
    "재활용기술을 공부합니다.",
    "I study recycling technology."
  ],
  [
    "폐수처리기술",
    "စွန့်ပစ်ရေ လုပ်ဆောင်မှု နည်းပညာ",
    "Engineering",
    "폐수처리기술을 연구합니다.",
    "I study wastewater treatment technology."
  ],
  [
    "대기오염방지기술",
    "လေထု ညစ်ညမ်းမှု တားဆီးမှု နည်းပညာ",
    "Engineering",
    "대기오염방지기술을 전공합니다.",
    "I major in air pollution prevention technology."
  ],
  [
    "수질오염방지기술",
    "ရေအရည်အသွေး ညစ်ညမ်းမှု တားဆီးမှု နည်းပညာ",
    "Engineering",
    "수질오염방지기술을 공부합니다.",
    "I study water pollution prevention technology."
  ],
  [
    "토양정화기술",
    "မြေဆီလွှာ သန့်စင်မှု နည်းပညာ",
    "Engineering",
    "토양정화기술을 연구합니다.",
    "I study soil purification technology."
  ],
  [
    "환경모니터링기술",
    "ပတ်ဝန်းကျင် စောင့်ကြည့်မှု နည်းပညာ",
    "Engineering",
    "환경모니터링기술을 전공합니다.",
    "I major in environmental monitoring technology."
  ],
  [
    "의료영상기술",
    "ဆေးဘက် ပုံရိပ် နည်းပညာ",
    "Medicine",
    "의료영상기술을 공부합니다.",
    "I study medical imaging technology."
  ],
  [
    "의료진단기술",
    "ဆေးဘက် ရောဂါရှာဖွေမှု နည်းပညာ",
    "Medicine",
    "의료진단기술을 연구합니다.",
    "I study medical diagnosis technology."
  ],
  [
    "의료치료기술",
    "ဆေးဘက် ကုသမှု နည်းပညာ",
    "Medicine",
    "의료치료기술을 전공합니다.",
    "I major in medical treatment technology."
  ],
  [
    "의료기기기술",
    "ဆေးဘက် ကိရိယာ နည်းပညာ",
    "Medicine",
    "의료기기기술을 공부합니다.",
    "I study medical device technology."
  ],
  [
    "의료로봇기술",
    "ဆေးဘက် စက်ရုပ် နည်းပညာ",
    "Medicine",
    "의료로봇기술을 연구합니다.",
    "I study medical robot technology."
  ],
  [
    "의료센서기술",
    "ဆေးဘက် အာရုံခံ နည်းပညာ",
    "Medicine",
    "의료센서기술을 전공합니다.",
    "I major in medical sensor technology."
  ],
  [
    "의료데이터기술",
    "ဆေးဘက် အချက်အလက် နည်းပညာ",
    "Medicine",
    "의료데이터기술을 공부합니다.",
    "I study medical data technology."
  ],
  [
    "의료인공지능기술",
    "ဆေးဘက် လူလုပ် ဉာဏ်ရည် နည်းပညာ",
    "Medicine",
    "의료인공지능기술을 연구합니다.",
    "I study medical artificial intelligence technology."
  ],
  [
    "의료바이오기술",
    "ဆေးဘက် ဇီဝ နည်းပညာ",
    "Medicine",
    "의료바이오기술을 전공합니다.",
    "I major in medical biotechnology."
  ],
  [
    "의료나노기술",
    "ဆေးဘက် နာနို နည်းပညာ",
    "Medicine",
    "의료나노기술을 공부합니다.",
    "I study medical nanotechnology."
  ],
  [
    "인공지능기술",
    "လူလုပ် ဉာဏ်ရည် နည်းပညာ",
    "Computer Science",
    "인공지능기술을 연구합니다.",
    "I study artificial intelligence technology."
  ],
  [
    "머신러닝기술",
    "စက် သင်ယူမှု နည်းပညာ",
    "Computer Science",
    "머신러닝기술을 전공합니다.",
    "I major in machine learning technology."
  ],
  [
    "딥러닝기술",
    "နက်ရှိုင်းသော သင်ယူမှု နည်းပညာ",
    "Computer Science",
    "딥러닝기술을 공부합니다.",
    "I study deep learning technology."
  ],
  [
    "신경망기술",
    "အာရုံကြော ကွန်ရက် နည်းပညာ",
    "Computer Science",
    "신경망기술을 연구합니다.",
    "I study neural network technology."
  ],
  [
    "자연어처리기술",
    "သဘာဝ ဘာသာစကား လုပ်ဆောင်မှု နည်းပညာ",
    "Computer Science",
    "자연어처리기술을 전공합니다.",
    "I major in natural language processing technology."
  ],
  [
    "컴퓨터비전기술",
    "ကွန်ပျူတာ အမြင်အာရုံ နည်းပညာ",
    "Computer Science",
    "컴퓨터비전기술을 공부합니다.",
    "I study computer vision technology."
  ],
  [
    "빅데이터기술",
    "ကြီးမားသော အချက်အလက် နည်းပညာ",
    "Computer Science",
    "빅데이터기술을 연구합니다.",
    "I study big data technology."
  ],
  [
    "클라우드컴퓨팅기술",
    "မိုးတိမ် ကွန်ပျူတာ နည်းပညာ",
    "Computer Science",
    "클라우드컴퓨팅기술을 전공합니다.",
    "I major in cloud computing technology."
  ],
  [
    "사이버보안기술",
    "ဆိုက်ဘာ လုံခြုံရေး နည်းပညာ",
    "Computer Science",
    "사이버보안기술을 공부합니다.",
    "I study cybersecurity technology."
  ],
  [
    "블록체인기술",
    "ဘလော့ခ်ချိန်း နည်းပညာ",
    "Computer Science",
    "블록체인기술을 연구합니다.",
    "I study blockchain technology."
  ],
  [
    "계산화학",
    "ကွန်ပျူတာ ဓာတုဗေဒ",
    "Computer Science",
    "계산화학을 연구합니다.",
    "I study computational chemistry."
  ],
  [
    "계산물리학",
    "ကွန်ပျူတာ ရူပဗေဒ",
    "Computer Science",
    "계산물리학을 공부합니다.",
    "I study computational physics."
  ],
  [
    "계산수학",
    "ကွန်ပျူတာ သင်္ချာ",
    "Computer Science",
    "계산수학을 전공합니다.",
    "I major in computational mathematics."
  ],
  [
    "계산공학",
    "ကွန်ပျူတာ အင်ဂျင်နီယာ",
    "Computer Science",
    "계산공학을 연구합니다.",
    "I study computational engineering."
  ],
  [
    "계산의학",
    "ကွန်ပျူတာ ဆေးပညာ",
    "Computer Science",
    "계산의학을 공부합니다.",
    "I study computational medicine."
  ],
  [
    "계산재료과학",
    "ကွန်ပျူတာ ပစ္စည်း သိပ္ပံ",
    "Computer Science",
    "계산재료과학을 전공합니다.",
    "I major in computational materials science."
  ],
  [
    "계산유체역학",
    "ကွန်ပျူတာ အရည် စွမ်းအား",
    "Computer Science",
    "계산유체역학을 연구합니다.",
    "I study computational fluid dynamics."
  ],
  [
    "계산구조역학",
    "ကွန်ပျူတာ ဖွဲ့စည်းပုံ စွမ်းအား",
    "Computer Science",
    "계산구조역학을 공부합니다.",
    "I study computational structural mechanics."
  ],
  [
    "계산전자기학",
    "ကွန်ပျူတာ လျှပ်စစ်သံလိုက်",
    "Computer Science",
    "계산전자기학을 전공합니다.",
    "I major in computational electromagnetics."
  ],
  [
    "시뮬레이션",
    "ပုံတူ",
    "Computer Science",
    "시뮬레이션을 수행합니다.",
    "I perform simulations."
  ],
  [
    "모델링",
    "ပုံစံ",
    "Computer Science",
    "모델링을 연구합니다.",
    "I study modeling."
  ],
  [
    "최적화",
    "အကောင်းဆုံး",
    "Computer Science",
    "최적화를 전공합니다.",
    "I major in optimization."
  ],
  [
    "자료구조설계",
    "ဒေတာ ဖွဲ့စည်းပုံ ဒီဇိုင်း",
    "Computer Science",
    "자료구조설계를 연구합니다.",
    "I study data structure design."
  ],
  [
    "소프트웨어아키텍처",
    "ဆော့ဖ်ဝဲ ဗိသုကာ",
    "Computer Science",
    "소프트웨어아키텍처를 전공합니다.",
    "I major in software architecture."
  ],
  [
    "시스템설계",
    "စနစ် ဒီဇိုင်း",
    "Computer Science",
    "시스템설계를 공부합니다.",
    "I study system design."
  ],
  [
    "네트워크설계",
    "ကွန်ရက် ဒီဇိုင်း",
    "Computer Science",
    "네트워크설계를 전공합니다.",
    "I major in network design."
  ],
  [
    "보안설계",
    "လုံခြုံရေး ဒီဇိုင်း",
    "Computer Science",
    "보안설계를 공부합니다.",
    "I study security design."
  ],
  [
    "성과분석",
    "စွမ်းဆောင်ရည် ခွဲခြမ်းစိတ်ဖြာမှု",
    "Business",
    "성과분석을 연구합니다.",
    "I study performance analytics."
  ],
  [
    "경쟁분석",
    "ယှဉ်ပြိုင်မှု ခွဲခြမ်းစိတ်ဖြာမှု",
    "Business",
    "경쟁분석을 공부합니다.",
    "I study competitive analysis."
  ],
  [
    "데이터법률",
    "ဒေတာ ဥပဒေ",
    "Legal",
    "데이터법률을 전공합니다.",
    "I major in data law."
  ],
  [
    "다중오믹스",
    "များစွာ အိုမစ်",
    "Biology",
    "다중오믹스를 연구합니다.",
    "I study multi-omics."
  ],
  [
    "통합오믹스",
    "ပေါင်းစည်းမှု အိုမစ်",
    "Biology",
    "통합오믹스를 공부합니다.",
    "I study integrated omics."
  ],
  [
    "위상기하학",
    "ထောပတ်လိုဂျီ ဂျီသြမေတြီ",
    "Mathematics",
    "위상기하학을 공부합니다.",
    "I study topological geometry."
  ],
  [
    "미분위상수학",
    "ဒစ်ဖရန်ရှယ် ထောပတ်လိုဂျီ",
    "Mathematics",
    "미분위상수학을 전공합니다.",
    "I major in differential topology."
  ],
  [
    "대수위상수학",
    "က္ခရာသင်္ချာ ထောပတ်လိုဂျီ",
    "Mathematics",
    "대수위상수학을 연구합니다.",
    "I study algebraic topology."
  ],
  [
    "조합기하학",
    "ပေါင်းစပ်မှု ဂျီသြမေတြီ",
    "Mathematics",
    "조합기하학을 공부합니다.",
    "I study combinatorial geometry."
  ],
  [
    "확률미분방정식",
    "ဖြစ်နိုင်ခြေ ဒစ်ဖရန်ရှယ် ညီမျှခြင်း",
    "Mathematics",
    "확률미분방정식을 전공합니다.",
    "I major in stochastic differential equations."
  ],
  [
    "함수방정식",
    "လုပ်ဆောင်ချက် ညီမျှခြင်း",
    "Mathematics",
    "함수방정식을 전공합니다.",
    "I major in functional equations."
  ],
  [
    "초전도체물리학",
    "စူပါ လျှပ်စစ်လမ်းကြောင်း ရူပဗေဒ",
    "Physics",
    "초전도체물리학을 공부합니다.",
    "I study superconductor physics."
  ],
  [
    "재료화학",
    "ပစ္စည်း ဓာတုဗေဒ",
    "Chemistry",
    "재료화학을 연구합니다.",
    "I study materials chemistry."
  ],
  [
    "단백질공학",
    "ပရိုတိန်း အင်ဂျင်နီယာ",
    "Biology",
    "단백질공학을 연구합니다.",
    "I study protein engineering."
  ],
  [
    "세포공학",
    "ဆဲလ် အင်ဂျင်နီယာ",
    "Biology",
    "세포공학을 전공합니다.",
    "I major in cell engineering."
  ],
  [
    "생체재료",
    "ဇီဝ ပစ္စည်း",
    "Biology",
    "생체재료를 연구합니다.",
    "I study biomaterials."
  ],
  [
    "생체의학",
    "ဇီဝ ဆေးပညာ",
    "Biology",
    "생체의학을 전공합니다.",
    "I major in biomedicine."
  ],
  [
    "크리에이티브산업",
    "ဖန်တီးမှု စက်မှု",
    "Arts",
    "크리에이티브산업을 연구합니다.",
    "I study creative industries."
  ],
  [
    "문화산업",
    "ယဉ်ကျေးမှု စက်မှု",
    "Arts",
    "문화산업을 전공합니다.",
    "I major in cultural industries."
  ],
  [
    "콘텐츠산업",
    "အကြောင်းအရာ စက်မှု",
    "Arts",
    "콘텐츠산업을 공부합니다.",
    "I study content industries."
  ],
  [
    "엔터테인먼트산업",
    "ဖျော်ဖြေရေး စက်မှု",
    "Arts",
    "엔터테인먼트산업을 연구합니다.",
    "I study entertainment industries."
  ],
  [
    "문화정책",
    "ယဉ်ကျေးမှု မူဝါဒ",
    "Arts",
    "문화정책을 수립합니다.",
    "I establish cultural policies."
  ],
  [
    "문화기획",
    "ယဉ်ကျေးမှု စီမံကိန်း",
    "Arts",
    "문화기획을 합니다.",
    "I do cultural planning."
  ],
  [
    "예술경영",
    "အနုပညာ စီမံခန့်ခွဲမှု",
    "Arts",
    "예술경영을 전공합니다.",
    "I major in arts management."
  ],
  [
    "갤러리경영",
    "ပြခန်း စီမံခန့်ခွဲမှု",
    "Arts",
    "갤러리경영을 연구합니다.",
    "I study gallery management."
  ],
  [
    "문화마케팅",
    "ယဉ်ကျေးမှု စျေးကွက်ရှာဖွေရေး",
    "Arts",
    "문화마케팅을 공부합니다.",
    "I study cultural marketing."
  ],
  [
    "예술후원",
    "အနုပညာ ထောက်ပံ့မှု",
    "Arts",
    "예술후원을 추진합니다.",
    "We promote arts sponsorship."
  ],
  [
    "기후적응",
    "ရာသီဥတု အလိုက်သင့်",
    "Environment",
    "기후적응을 연구합니다.",
    "I study climate adaptation."
  ],
  [
    "기후완화",
    "ရာသီဥတု လျော့ပါးစေမှု",
    "Environment",
    "기후완화를 추진합니다.",
    "We promote climate mitigation."
  ],
  [
    "탄소상쇄",
    "ကာဗွန် ပြန်လည်ထူထောင်ရေး",
    "Environment",
    "탄소상쇄를 실시합니다.",
    "I conduct carbon offsetting."
  ],
  [
    "기후모델링",
    "ရာသီဥတု ပုံစံ",
    "Environment",
    "기후모델링을 연구합니다.",
    "I study climate modeling."
  ],
  [
    "기후시나리오",
    "ရာသီဥတု ဇာတ်လမ်း",
    "Environment",
    "기후시나리오를 분석합니다.",
    "I analyze climate scenarios."
  ],
  [
    "기후정책",
    "ရာသီဥတု မူဝါဒ",
    "Environment",
    "기후정책을 수립합니다.",
    "I establish climate policies."
  ],
  [
    "기후금융",
    "ရာသီဥတု ငွေရေး",
    "Environment",
    "기후금융을 연구합니다.",
    "I study climate finance."
  ],
  [
    "원격진단",
    "အကွာအဝေး ရောဂါရှာဖွေမှု",
    "Medical",
    "원격진단을 연구합니다.",
    "I study telemedicine diagnosis."
  ],
  [
    "유전자진단",
    "မျိုးရိုးဗီဇ ရောဂါရှာဖွေမှု",
    "Medical",
    "유전자진단을 연구합니다.",
    "I study genetic diagnosis."
  ],
  [
    "의료빅데이터",
    "ဆေးပညာ ကြီးမားသော ဒေတာ",
    "Medical",
    "의료빅데이터를 연구합니다.",
    "I study medical big data."
  ],
  [
    "디지털전략",
    "ဒစ်ဂျစ်တယ် နည်းဗျူဟာ",
    "Communication",
    "디지털전략을 수립합니다.",
    "I establish digital strategies."
  ],
  [
    "온라인마케팅",
    "အွန်လိုင်း စျေးကွက်ရှာဖွေရေး",
    "Communication",
    "온라인마케팅을 연구합니다.",
    "I study online marketing."
  ],
  [
    "검색엔진최적화",
    "ရှာဖွေရေး အင်ဂျင် အကောင်းဆုံး",
    "Communication",
    "검색엔진최적화를 수행합니다.",
    "I perform SEO."
  ],
  [
    "소셜미디어마케팅",
    "လူမှုရေး မီဒီယာ စျေးကွက်ရှာဖွေရေး",
    "Communication",
    "소셜미디어마케팅을 전략합니다.",
    "I strategize social media marketing."
  ],
  [
    "이메일마케팅",
    "အီးမေးလ် စျေးကွက်ရှာဖွေရေး",
    "Communication",
    "이메일마케팅을 연구합니다.",
    "I study email marketing."
  ],
  [
    "모바일마케팅",
    "မိုဘိုင်း စျေးကွက်ရှာဖွေရေး",
    "Communication",
    "모바일마케팅을 공부합니다.",
    "I study mobile marketing."
  ],
  [
    "디지털광고",
    "ဒစ်ဂျစ်တယ် ကြော်ငြာ",
    "Communication",
    "디지털광고를 전공합니다.",
    "I major in digital advertising."
  ],
  [
    "퍼포먼스마케팅",
    "စွမ်းဆောင်ရည် စျေးကွက်ရှာဖွေရေး",
    "Communication",
    "퍼포먼스마케팅을 연구합니다.",
    "I study performance marketing."
  ],
  [
    "리타겟팅",
    "ပြန်လည် ရည်ရွယ်ချက်",
    "Communication",
    "리타겟팅을 전략합니다.",
    "I strategize retargeting."
  ],
  [
    "컨버전최적화",
    "ပြောင်းလဲမှု အကောင်းဆုံး",
    "Communication",
    "컨버전최적화를 수행합니다.",
    "I perform conversion optimization."
  ],
  [
    "직무교육",
    "အလုပ်အကိုင် ပညာရေး",
    "Education",
    "직무교육을 실시합니다.",
    "I conduct job training."
  ],
  [
    "인재개발",
    "အရည်အသွေး ဖွံ့ဖြိုးတိုးတက်မှု",
    "Education",
    "인재개발을 추진합니다.",
    "We promote talent development."
  ],
  [
    "역량개발",
    "စွမ်းရည် ဖွံ့ဖြိုးတိုးတက်မှု",
    "Education",
    "역량개발을 연구합니다.",
    "I study competency development."
  ],
  [
    "리더십개발",
    "ဦးဆောင်မှု ဖွံ့ဖြိုးတိုးတက်မှု",
    "Education",
    "리더십개발을 전공합니다.",
    "I major in leadership development."
  ],
  [
    "조직개발",
    "အဖွဲ့အစည်း ဖွံ့ဖြိုးတိုးတက်မှု",
    "Education",
    "조직개발을 연구합니다.",
    "I study organizational development."
  ],
  [
    "스마트팜",
    "စမတ် လယ်ယာ",
    "Agriculture",
    "스마트팜을 구축합니다.",
    "I build smart farms."
  ],
  [
    "식품안전관리",
    "အစားအစာ ဘေးကင်းရေး စီမံခန့်ခွဲမှု",
    "Agriculture",
    "식품안전관리를 연구합니다.",
    "I study food safety management."
  ],
  [
    "식품품질관리",
    "အစားအစာ အရည်အသွေး စီမံခန့်ခွဲမှု",
    "Agriculture",
    "식품품질관리를 전공합니다.",
    "I major in food quality management."
  ],
  [
    "식품가공",
    "အစားအစာ လုပ်ဆောင်မှု",
    "Agriculture",
    "식품가공을 연구합니다.",
    "I study food processing."
  ],
  [
    "식품보존",
    "အစားအစာ ထိန်းသိမ်းမှု",
    "Agriculture",
    "식품보존을 공부합니다.",
    "I study food preservation."
  ],
  [
    "식품포장",
    "အစားအစာ ထုပ်ပိုးမှု",
    "Agriculture",
    "식품포장을 전공합니다.",
    "I major in food packaging."
  ],
  [
    "식품유통",
    "အစားအစာ ဖြန့်ဖြူးမှု",
    "Agriculture",
    "식품유통을 연구합니다.",
    "I study food distribution."
  ],
  [
    "친환경건축",
    "ပတ်ဝန်းကျင် နှင့် သင့်လျော်သော ဗိသုကာ",
    "Architecture",
    "친환경건축을 연구합니다.",
    "I study eco-friendly architecture."
  ],
  [
    "패시브디자인",
    "ဆိုးသွမ်းသော ဒီဇိုင်း",
    "Architecture",
    "패시브디자인을 전공합니다.",
    "I major in passive design."
  ],
  [
    "바이오필릭디자인",
    "ဇီဝ နှစ်သက်သော ဒီဇိုင်း",
    "Architecture",
    "바이오필릭디자인을 연구합니다.",
    "I study biophilic design."
  ],
  [
    "ESG경영",
    "ESG စီမံခန့်ခွဲမှု",
    "Business",
    "ESG경영을 실시합니다.",
    "I practice ESG management."
  ],
  [
    "에너지전환",
    "စွမ်းအင် ပြောင်းလဲမှု",
    "Environment",
    "에너지전환을 전공합니다.",
    "I major in energy transition."
  ],
  [
    "녹색금융",
    "စိမ်းလန်းသော ငွေကြေး",
    "Finance",
    "녹색금융을 공부합니다.",
    "I study green finance."
  ],
  [
    "탄소배출권",
    "ကာဗွန် ထုတ်လွှတ်မှု အခွင့်အရေး",
    "Environment",
    "탄소배출권을 거래합니다.",
    "I trade carbon credits."
  ],
  [
    "핀테크",
    "ဖင်တက်",
    "Finance",
    "핀테크를 개발합니다.",
    "I develop fintech."
  ],
  [
    "인슈어테크",
    "အင်ရှူရာတက်",
    "Finance",
    "인슈어테크를 연구합니다.",
    "I study insurtech."
  ],
  [
    "프롭테크",
    "ပရော့ပ်တက်",
    "Business",
    "프롭테크를 전공합니다.",
    "I major in proptech."
  ],
  [
    "디지털전환",
    "ဒစ်ဂျစ်တယ် ပြောင်းလဲမှု",
    "Business",
    "디지털전환을 추진합니다.",
    "I drive digital transformation."
  ],
  [
    "데이터경제",
    "ဒေတာ စီးပွားရေး",
    "Business",
    "데이터경제를 연구합니다.",
    "I study data economy."
  ],
  [
    "플랫폼경제",
    "ပလက်ဖောင်း စီးပွားရေး",
    "Business",
    "플랫폼경제를 공부합니다.",
    "I study platform economy."
  ],
  [
    "공유경제",
    "မျှဝေသော စီးပွားရေး",
    "Business",
    "공유경제를 전공합니다.",
    "I major in sharing economy."
  ],
  [
    "온디맨드경제",
    "တောင်းဆိုမှု စီးပွားရေး",
    "Business",
    "온디맨드경제를 연구합니다.",
    "I study on-demand economy."
  ],
  [
    "크리에이터경제",
    "ဖန်တီးသူ စီးပွားရေး",
    "Business",
    "크리에이터경제를 개발합니다.",
    "I develop creator economy."
  ],
  [
    "긱경제",
    "ဂစ် စီးပွားရေး",
    "Business",
    "긱경제를 분석합니다.",
    "I analyze gig economy."
  ],
  [
    "초소재",
    "စူပါ ပစ္စည်း",
    "Engineering",
    "초소재를 연구합니다.",
    "I study supermaterials."
  ],
  [
    "스마트폴리머",
    "စမတ် ပေါ်လီမာ",
    "Engineering",
    "스마트폴리머를 개발합니다.",
    "I develop smart polymers."
  ],
  [
    "광전소재",
    "အလင်း လျှပ်စစ် ပစ္စည်း",
    "Engineering",
    "광전소재를 개발합니다.",
    "I develop optoelectronic materials."
  ],
  [
    "열전소재",
    "အပူ လျှပ်စစ် ပစ္စည်း",
    "Engineering",
    "열전소재를 전공합니다.",
    "I major in thermoelectric materials."
  ],
  [
    "초소수성소재",
    "စူပါ ရေငြိမ်းသော ပစ္စည်း",
    "Engineering",
    "초소수성소재를 공부합니다.",
    "I study superhydrophobic materials."
  ],
  [
    "반도체소재",
    "ခွဲခြမ်းစိတ်ဖြာသော လျှပ်စစ် ပစ္စည်း",
    "Engineering",
    "반도체소재를 개발합니다.",
    "I develop semiconductor materials."
  ],
  [
    "예측정비",
    "ခန့်မှန်းသော ထိန်းသိမ်းမှု",
    "Engineering",
    "예측정비를 수행합니다.",
    "I perform predictive maintenance."
  ],
  [
    "적응제조",
    "အလိုက်သင့် ထုတ်လုပ်မှု",
    "Engineering",
    "적응제조를 연구합니다.",
    "I study adaptive manufacturing."
  ],
  [
    "수직농장",
    "ဒေါင်လိုက် လယ်ယာ",
    "Agriculture",
    "수직농장을 구축합니다.",
    "I build vertical farms."
  ],
  [
    "식물공장",
    "အပင်စက်ရုံ",
    "Agriculture",
    "식물공장을 전공합니다.",
    "I major in plant factories."
  ],
  [
    "유전자변형작물",
    "မျိုးရိုးဗီဇ ပြောင်းလဲသော ကောက်ပဲသီးနှံ",
    "Agriculture",
    "유전자변형작물을 연구합니다.",
    "I study GMOs."
  ],
  [
    "수경재배",
    "ရေ စိုက်ပျိုးရေး",
    "Agriculture",
    "수경재배를 연구합니다.",
    "I study hydroponics."
  ],
  [
    "기능성식품",
    "လုပ်ဆောင်ချက် အစားအစာ",
    "Food",
    "기능성식품을 개발합니다.",
    "I develop functional foods."
  ],
  [
    "규제기술",
    "စည်းမျဉ်း နည်းပညာ",
    "Legal",
    "규제기술을 연구합니다.",
    "I study regulatory technology."
  ],
  [
    "법률테크",
    "ဥပဒေ တက်",
    "Legal",
    "법률테크를 개발합니다.",
    "I develop legal tech."
  ],
  [
    "스마트계약법",
    "စမတ် စာချုပ် ဥပဒေ",
    "Legal",
    "스마트계약법을 전공합니다.",
    "I major in smart contract law."
  ],
  [
    "디지털권리",
    "ဒစ်ဂျစ်တယ် အခွင့်အရေး",
    "Legal",
    "디지털권리를 연구합니다.",
    "I study digital rights."
  ],
  [
    "AI규제",
    "AI စည်းမျဉ်း",
    "Legal",
    "AI규제를 분석합니다.",
    "I analyze AI regulation."
  ],
  [
    "개인정보법",
    "ကိုယ်ရေးသတင်းအချက်အလက် ဥပဒေ",
    "Legal",
    "개인정보법을 공부합니다.",
    "I study privacy law."
  ],
  [
    "전자거래법",
    "အီလက်ထရွန်နစ် ကုန်သွယ်မှု ဥပဒေ",
    "Legal",
    "전자거래법을 연구합니다.",
    "I study e-commerce law."
  ],
  [
    "뇌과학",
    "ဦးနှောက် သိပ္ပံ",
    "Science",
    "뇌과학을 공부합니다.",
    "I study brain science."
  ],
  [
    "마음챙김",
    "စိတ် သတိထားမှု",
    "Social Science",
    "마음챙김을 실천합니다.",
    "I practice mindfulness."
  ],
  [
    "4D프린팅",
    "4D ပုံနှိပ်မှု",
    "Engineering",
    "4D프린팅을 개발합니다.",
    "I develop 4D printing."
  ],
  [
    "디지털스컬핑",
    "ဒစ်ဂျစ်တယ် ပန်းပု",
    "Arts",
    "디지털스컬핑을 공부합니다.",
    "I study digital sculpting."
  ],
  [
    "가상현실예술",
    "အတုအယောင် လက်တွေ့ အနုပညာ",
    "Arts",
    "가상현실예술을 연구합니다.",
    "I study VR art."
  ],
  [
    "모션캡처",
    "လှုပ်ရှားမှု ဖမ်းယူမှု",
    "Technology",
    "모션캡처를 연구합니다.",
    "I study motion capture."
  ],
  [
    "홀로그램",
    "ဟိုလိုဂရမ်",
    "Technology",
    "홀로그램을 전공합니다.",
    "I major in holograms."
  ],
  [
    "화성탐사",
    "အင်္ဂါဂြိုဟ် စူးစမ်းရှာဖွေမှု",
    "Science",
    "화성탐사를 수행합니다.",
    "I conduct Mars exploration."
  ],
  [
    "달기지",
    "လ စခန်း",
    "Science",
    "달기지를 건설합니다.",
    "I build lunar bases."
  ],
  [
    "우주광산",
    "အာကာသ သတ္တုတွင်း",
    "Science",
    "우주광산을 연구합니다.",
    "I study space mining."
  ],
  [
    "우주관광",
    "အာကာသ ခရီးသွားလုပ်ငန်း",
    "Travel",
    "우주관광을 개발합니다.",
    "I develop space tourism."
  ],
  [
    "우주식민지",
    "အာကာသ ကိုလိုနီ",
    "Science",
    "우주식민지를 계획합니다.",
    "I plan space colonies."
  ],
  [
    "행성방어",
    "ဂြိုဟ် ကာကွယ်ရေး",
    "Science",
    "행성방어를 연구합니다.",
    "I study planetary defense."
  ],
  [
    "우주쓰레기제거",
    "အာကာသ အမှိုက် ဖယ်ရှားမှု",
    "Science",
    "우주쓰레기제거를 수행합니다.",
    "I perform space debris removal."
  ],
  [
    "우주태양광",
    "အာကာသ နေရောင်ခြည်",
    "Science",
    "우주태양광을 개발합니다.",
    "I develop space-based solar power."
  ],
  [
    "우주제조",
    "အာကာသ ထုတ်လုပ်မှု",
    "Science",
    "우주제조를 연구합니다.",
    "I study space manufacturing."
  ],
  [
    "우주생명체탐사",
    "အာကာသ သက်ရှိ စူးစမ်းရှာဖွေမှု",
    "Science",
    "우주생명체탐사를 전공합니다.",
    "I major in astrobiology exploration."
  ],
  [
    "핵융합",
    "နျူကလီးယား ပေါင်းစည်းမှု",
    "Science",
    "핵융합을 연구합니다.",
    "I study nuclear fusion."
  ],
  [
    "핵분열",
    "နျူကလီးယား ခွဲထွက်မှု",
    "Science",
    "핵분열을 전공합니다.",
    "I major in nuclear fission."
  ],
  [
    "청정에너지",
    "သန့်ရှင်းသော စွမ်းအင်",
    "Environment",
    "청정에너지를 개발합니다.",
    "I develop clean energy."
  ],
  [
    "스마트에너지",
    "စမတ် စွမ်းအင်",
    "Engineering",
    "스마트에너지를 전공합니다.",
    "I major in smart energy."
  ],
  [
    "마이크로그리드",
    "မိုက်ခရို ဂရစ်",
    "Engineering",
    "마이크로그리드를 구축합니다.",
    "I build microgrids."
  ],
  [
    "에너지저장시스템",
    "စွမ်းအင် သိုလှောင်မှု စနစ်",
    "Engineering",
    "에너지저장시스템을 개발합니다.",
    "I develop energy storage systems."
  ],
  [
    "배터리재활용",
    "ဘက်ထရီ ပြန်လည်အသုံးပြုမှု",
    "Environment",
    "배터리재활용을 연구합니다.",
    "I study battery recycling."
  ],
  [
    "전력전자",
    "လျှပ်စစ် အီလက်ထရွန်နစ်",
    "Engineering",
    "전력전자를 공부합니다.",
    "I study power electronics."
  ],
  [
    "에너지효율화",
    "စွမ်းအင် ထိရောက်မှု",
    "Engineering",
    "에너지효율화를 추진합니다.",
    "I promote energy efficiency."
  ],
  [
    "면역글로불린",
    "ကိုယ်ခံအား ဂလိုဘူလင်",
    "Medical",
    "면역글로불린 주사를 맞았습니다.",
    "I received an immunoglobulin injection."
  ],
  [
    "혈청학",
    "သွေးရည်ကြည် သိပ္ပံ",
    "Medical",
    "혈청학 연구를 진행합니다.",
    "I conduct serology research."
  ],
  [
    "병리조직학",
    "ရောဂါ အင်္ဂါအစိတ်အပိုင်း သိပ္ပံ",
    "Medical",
    "병리조직학을 전공합니다.",
    "I major in histopathology."
  ],
  [
    "면역조직화학",
    "ကိုယ်ခံအား အင်္ဂါအစိတ်အပိုင်း ဓာတုဗေဒ",
    "Medical",
    "면역조직화학 분석을 수행합니다.",
    "I perform immunohistochemistry analysis."
  ],
  [
    "세포유전학",
    "ဆဲလ် မျိုးရိုးဗီဇ",
    "Medical",
    "세포유전학 연구를 합니다.",
    "I study cytogenetics."
  ],
  [
    "분자병리학",
    "မော်လီကျူး ရောဂါ",
    "Medical",
    "분자병리학을 공부합니다.",
    "I study molecular pathology."
  ],
  [
    "임상약리학",
    "ကုသမှု ဆေးဝါး",
    "Medical",
    "임상약리학을 전공합니다.",
    "I major in clinical pharmacology."
  ],
  [
    "약물동태학",
    "ဆေးဝါး လှုပ်ရှားမှု",
    "Medical",
    "약물동태학을 연구합니다.",
    "I study pharmacokinetics."
  ],
  [
    "약물역학",
    "ဆေးဝါး စွမ်းအား",
    "Medical",
    "약물역학을 공부합니다.",
    "I study pharmacodynamics."
  ],
  [
    "독성학",
    "အဆိပ်အတောက်",
    "Medical",
    "독성학을 전공합니다.",
    "I major in toxicology."
  ],
  [
    "헌법해석학",
    "ဖွဲ့စည်းပုံ အခြေခံဥပဒေ ဖွင့်ဆိုမှု",
    "Law",
    "헌법해석학을 연구합니다.",
    "I study constitutional interpretation."
  ],
  [
    "행정법학",
    "စီမံခန့်ခွဲမှု ဥပဒေ",
    "Law",
    "행정법학을 전공합니다.",
    "I major in administrative law."
  ],
  [
    "국제사법",
    "နိုင်ငံတကာ ပုဂ္ဂိုလ်ရေး ဥပဒေ",
    "Law",
    "국제사법을 공부합니다.",
    "I study private international law."
  ],
  [
    "국제공법",
    "နိုင်ငံတကာ အများပြည်သူ ဥပဒေ",
    "Law",
    "국제공법을 연구합니다.",
    "I study public international law."
  ],
  [
    "상법학",
    "ကုန်သွယ်မှု ဥပဒေ",
    "Law",
    "상법학을 연구합니다.",
    "I study commercial law."
  ],
  [
    "노동법학",
    "အလုပ် ဥပဒေ",
    "Law",
    "노동법학을 전공합니다.",
    "I major in labor law."
  ],
  [
    "환경법학",
    "ပတ်ဝန်းကျင် ဥပဒေ",
    "Law",
    "환경법학을 공부합니다.",
    "I study environmental law."
  ],
  [
    "지적재산권법",
    "ဉာဏပစ္စည်း ပိုင်ဆိုင်ခွင့် ဥပဒေ",
    "Law",
    "지적재산권법을 연구합니다.",
    "I study intellectual property law."
  ],
  [
    "재정정책학",
    "ဘဏ္ဍာရေး မူဝါဒ",
    "Economics",
    "재정정책학을 공부합니다.",
    "I study fiscal policy."
  ],
  [
    "통화정책학",
    "ငွေကြေး မူဝါဒ",
    "Economics",
    "통화정책학을 전공합니다.",
    "I major in monetary policy."
  ],
  [
    "국제금융학",
    "နိုင်ငံတကာ ငွေကြေး",
    "Economics",
    "국제금융학을 연구합니다.",
    "I study international finance."
  ],
  [
    "파생상품학",
    "ဆင်းသက်လာသော ကုန်ပစ္စည်း",
    "Economics",
    "파생상품학을 공부합니다.",
    "I study derivatives."
  ],
  [
    "자산가격결정이론",
    "ပိုင်ဆိုင်မှု ဈေးနှုန်း ဆုံးဖြတ်မှု သီအိုရီ",
    "Economics",
    "자산가격결정이론을 연구합니다.",
    "I study asset pricing theory."
  ],
  [
    "시장미시구조이론",
    "စျေးကွက် အသေးစား ဖွဲ့စည်းပုံ သီအိုရီ",
    "Economics",
    "시장미시구조이론을 공부합니다.",
    "I study market microstructure theory."
  ],
  [
    "리스크관리학",
    "အန္တရာယ် စီမံခန့်ခွဲမှု",
    "Economics",
    "리스크관리학을 전공합니다.",
    "I major in risk management."
  ],
  [
    "인지신경과학",
    "သိမြင်မှု အာရုံကြော သိပ္ပံ",
    "Psychology",
    "인지신경과학을 연구합니다.",
    "I study cognitive neuroscience."
  ],
  [
    "발달신경심리학",
    "ဖွံ့ဖြိုးတိုးတက်မှု အာရုံကြော စိတ်ပညာ",
    "Psychology",
    "발달신경심리학을 전공합니다.",
    "I major in developmental neuropsychology."
  ],
  [
    "임상신경심리학",
    "ကုသမှု အာရုံကြော စိတ်ပညာ",
    "Psychology",
    "임상신경심리학을 공부합니다.",
    "I study clinical neuropsychology."
  ],
  [
    "사회인지신경과학",
    "လူမှုရေး သိမြင်မှု အာရုံကြော သိပ္ပံ",
    "Psychology",
    "사회인지신경과학을 연구합니다.",
    "I study social cognitive neuroscience."
  ],
  [
    "정서신경과학",
    "စိတ်ခံစားမှု အာရုံကြော သိပ္ပံ",
    "Psychology",
    "정서신경과학을 전공합니다.",
    "I major in affective neuroscience."
  ],
  [
    "계산신경과학",
    "တွက်ချက်မှု အာရုံကြော သိပ္ပံ",
    "Psychology",
    "계산신경과학을 공부합니다.",
    "I study computational neuroscience."
  ],
  [
    "인지언어학",
    "သိမြင်မှု ဘာသာစကား",
    "Psychology",
    "인지언어학을 연구합니다.",
    "I study cognitive linguistics."
  ],
  [
    "인지발달심리학",
    "သိမြင်မှု ဖွံ့ဖြိုးတိုးတက်မှု စိတ်ပညာ",
    "Psychology",
    "인지발달심리학을 연구합니다.",
    "I study cognitive developmental psychology."
  ],
  [
    "문체론",
    "စာပေ ပုံစံ",
    "Literature",
    "문체론을 전공합니다.",
    "I major in stylistics."
  ],
  [
    "비평이론",
    "ဝေဖန်မှု သီအိုရီ",
    "Literature",
    "비평이론을 연구합니다.",
    "I study critical theory."
  ],
  [
    "해체주의",
    "ဖြေရှင်းမှု",
    "Literature",
    "해체주의를 공부합니다.",
    "I study deconstructionism."
  ],
  [
    "후구조주의",
    "နောက်ပိုင်း ဖွဲ့စည်းပုံ",
    "Literature",
    "후구조주의를 연구합니다.",
    "I study post-structuralism."
  ],
  [
    "페미니스트비평",
    "အမျိုးသမီး ဝေဖန်မှု",
    "Literature",
    "페미니스트비평을 전공합니다.",
    "I major in feminist criticism."
  ],
  [
    "시각문화연구",
    "မြင်ကွင်း ယဉ်ကျေးမှု သုတေသန",
    "Arts",
    "시각문화연구를 수행합니다.",
    "I conduct visual culture studies."
  ],
  [
    "현대미술사",
    "ခေတ်သစ် အနုပညာ သမိုင်း",
    "Arts",
    "현대미술사를 공부합니다.",
    "I study modern art history."
  ],
  [
    "예술비평학",
    "အနုပညာ ဝေဖန်မှု",
    "Arts",
    "예술비평학을 연구합니다.",
    "I study art criticism."
  ],
  [
    "설치미술",
    "တပ်ဆင်မှု အနုပညာ",
    "Arts",
    "설치미술을 공부합니다.",
    "I study installation art."
  ],
  [
    "개념미술",
    "အယူအဆ အနုပညာ",
    "Arts",
    "개념미술을 연구합니다.",
    "I study conceptual art."
  ],
  [
    "행위예술",
    "အပြုအမူ အနုပညာ",
    "Arts",
    "행위예술을 전공합니다.",
    "I major in performance art."
  ],
  [
    "분석철학",
    "ခွဲခြမ်းစိတ်ဖြာမှု ဒဿနိကဗေဒ",
    "Philosophy",
    "분석철학을 공부합니다.",
    "I study analytic philosophy."
  ],
  [
    "대륙철학",
    "တိုက်ကြီး ဒဿနိကဗေဒ",
    "Philosophy",
    "대륙철학을 연구합니다.",
    "I study continental philosophy."
  ],
  [
    "실용주의",
    "လက်တွေ့",
    "Philosophy",
    "실용주의를 전공합니다.",
    "I major in pragmatism."
  ],
  [
    "구성주의",
    "ဖွဲ့စည်းမှု",
    "Philosophy",
    "구성주의를 연구합니다.",
    "I study constructivism."
  ],
  [
    "의료인류학",
    "ဆေးပညာ လူသားဗေဒ",
    "Sociology",
    "의료인류학을 공부합니다.",
    "I study medical anthropology."
  ],
  [
    "경제인류학",
    "စီးပွားရေး လူသားဗေဒ",
    "Sociology",
    "경제인류학을 전공합니다.",
    "I major in economic anthropology."
  ],
  [
    "환경사회학",
    "ပတ်ဝန်းကျင် လူမှုရေး",
    "Sociology",
    "환경사회학을 공부합니다.",
    "I study environmental sociology."
  ],
  [
    "과학기술사회학",
    "သိပ္ပံ နည်းပညာ လူမှုရေး",
    "Sociology",
    "과학기술사회학을 전공합니다.",
    "I major in science and technology studies."
  ],
  [
    "국제정치경제학",
    "နိုင်ငံတကာ နိုင်ငံရေး စီးပွားရေး",
    "Political Science",
    "국제정치경제학을 전공합니다.",
    "I major in international political economy."
  ],
  [
    "정치철학",
    "နိုင်ငံရေး ဒဿနိကဗေဒ",
    "Political Science",
    "정치철학을 공부합니다.",
    "I study political philosophy."
  ],
  [
    "공공정책학",
    "အများပြည်သူ မူဝါဒ",
    "Political Science",
    "공공정책학을 연구합니다.",
    "I study public policy."
  ],
  [
    "거버넌스이론",
    "စီမံခန့်ခွဲမှု သီအိုရီ",
    "Political Science",
    "거버넌스이론을 전공합니다.",
    "I major in governance theory."
  ],
  [
    "정당정치학",
    "နိုင်ငံရေး ပါတီ နိုင်ငံရေး",
    "Political Science",
    "정당정치학을 공부합니다.",
    "I study party politics."
  ],
  [
    "선거학",
    "မဲပေးမှု",
    "Political Science",
    "선거학을 연구합니다.",
    "I study electoral studies."
  ],
  [
    "외교정책분석",
    "သံတမန် မူဝါဒ ခွဲခြမ်းစိတ်ဖြာမှု",
    "Political Science",
    "외교정책분석을 전공합니다.",
    "I major in foreign policy analysis."
  ],
  [
    "분쟁해결학",
    "အငြင်းပွားမှု ဖြေရှင်းမှု",
    "Political Science",
    "분쟁해결학을 공부합니다.",
    "I study conflict resolution."
  ],
  [
    "평화연구",
    "ငြိမ်းချမ်းရေး သုတေသန",
    "Political Science",
    "평화연구를 수행합니다.",
    "I conduct peace studies."
  ],
  [
    "교육평가학",
    "ပညာရေး အကဲဖြတ်မှု",
    "Education",
    "교육평가학을 전공합니다.",
    "I major in educational assessment."
  ],
  [
    "성인교육학",
    "လူကြီး ပညာရေး",
    "Education",
    "성인교육학을 공부합니다.",
    "I study adult education."
  ],
  [
    "평생교육학",
    "တစ်သက်တာ ပညာရေး",
    "Education",
    "평생교육학을 전공합니다.",
    "I major in lifelong education."
  ],
  [
    "특수교육학",
    "အထူး ပညာရေး",
    "Education",
    "특수교육학을 연구합니다.",
    "I study special education."
  ],
  [
    "비교교육학",
    "နှိုင်းယှဉ် ပညာရေး",
    "Education",
    "비교교육학을 공부합니다.",
    "I study comparative education."
  ],
  [
    "교육정책학",
    "ပညာရေး မူဝါဒ",
    "Education",
    "교육정책학을 전공합니다.",
    "I major in educational policy."
  ],
  [
    "생태계복원학",
    "ဂေဟစနစ် ပြန်လည်ထူထောင်ရေး",
    "Environmental Science",
    "생태계복원학을 연구합니다.",
    "I study ecosystem restoration."
  ],
  [
    "환경생화학",
    "ပတ်ဝန်းကျင် ဇီဝဓာတုဗေဒ",
    "Environmental Science",
    "환경생화학을 전공합니다.",
    "I major in environmental biochemistry."
  ],
  [
    "해양생태학",
    "ပင်လယ် ဂေဟ",
    "Environmental Science",
    "해양생태학을 연구합니다.",
    "I study marine ecology."
  ],
  [
    "습지생태학",
    "စိုစွတ်သော မြေနိမ့် ဂေဟ",
    "Environmental Science",
    "습지생태학을 전공합니다.",
    "I major in wetland ecology."
  ],
  [
    "산림생태학",
    "သစ်တော ဂေဟ",
    "Environmental Science",
    "산림생태학을 공부합니다.",
    "I study forest ecology."
  ],
  [
    "기후변화학",
    "ရာသီဥတု ပြောင်းလဲမှု",
    "Environmental Science",
    "기후변화학을 연구합니다.",
    "I study climate change science."
  ],
  [
    "환경독성학",
    "ပတ်ဝန်းကျင် အဆိပ်အတောက်",
    "Environmental Science",
    "환경독성학을 전공합니다.",
    "I major in environmental toxicology."
  ],
  [
    "생물다양성보전학",
    "ဇီဝ ကွဲပြားမှု ထိန်းသိမ်းမှု",
    "Environmental Science",
    "생물다양성보전학을 공부합니다.",
    "I study biodiversity conservation."
  ],
  [
    "기계학습이론",
    "စက် သင်ယူမှု သီအိုရီ",
    "Computer Science",
    "기계학습이론을 연구합니다.",
    "I study machine learning theory."
  ],
  [
    "딥러닝아키텍처",
    "နက်ရှိုင်းသော သင်ယူမှု ဗိသုကာ",
    "Computer Science",
    "딥러닝아키텍처를 설계합니다.",
    "I design deep learning architectures."
  ],
  [
    "신경망최적화",
    "အာရုံကြော ကွန်ရက် အကောင်းဆုံး",
    "Computer Science",
    "신경망최적화를 전공합니다.",
    "I major in neural network optimization."
  ],
  [
    "도시계획학",
    "မြို့ပြ အစီအစဉ်",
    "Architecture",
    "도시계획학을 전공합니다.",
    "I major in urban planning."
  ],
  [
    "환경건축학",
    "ပတ်ဝန်းကျင် ဗိသုကာ",
    "Architecture",
    "환경건축학을 공부합니다.",
    "I study environmental architecture."
  ],
  [
    "도시설계학",
    "မြို့ပြ ဒီဇိုင်း",
    "Architecture",
    "도시설계학을 연구합니다.",
    "I study urban design."
  ],
  [
    "경관건축학",
    "မြင်ကွင်း ဗိသုကာ",
    "Architecture",
    "경관건축학을 공부합니다.",
    "I study landscape architecture."
  ],
  [
    "건축역사학",
    "ဗိသုကာ သမိုင်း",
    "Architecture",
    "건축역사학을 전공합니다.",
    "I major in architectural history."
  ],
  [
    "건축구조학",
    "ဗိသုကာ ဖွဲ့စည်းပုံ",
    "Architecture",
    "건축구조학을 연구합니다.",
    "I study architectural structures."
  ],
  [
    "건축재료학",
    "ဗိသုကာ ပစ္စည်း",
    "Architecture",
    "건축재료학을 공부합니다.",
    "I study architectural materials."
  ],
  [
    "디지털건축",
    "ဒစ်ဂျစ်တယ် ဗိသုကာ",
    "Architecture",
    "디지털건축을 전공합니다.",
    "I major in digital architecture."
  ],
  [
    "음악이론",
    "ဂီတ သီအိုရီ",
    "Music",
    "음악이론을 연구합니다.",
    "I study music theory."
  ],
  [
    "화성학",
    "သဟဇာတ",
    "Music",
    "화성학을 전공합니다.",
    "I major in harmony."
  ],
  [
    "대위법",
    "ကောင်တာပွိုင့်",
    "Music",
    "대위법을 공부합니다.",
    "I study counterpoint."
  ],
  [
    "음악분석학",
    "ဂီတ ခွဲခြမ်းစိတ်ဖြာမှု",
    "Music",
    "음악분석학을 연구합니다.",
    "I study music analysis."
  ],
  [
    "음악사학",
    "ဂီတ သမိုင်း",
    "Music",
    "음악사학을 전공합니다.",
    "I major in music history."
  ],
  [
    "민족음악학",
    "လူမျိုး ဂီတ",
    "Music",
    "민족음악학을 공부합니다.",
    "I study ethnomusicology."
  ],
  [
    "음향공학",
    "အသံ အင်ဂျင်နီယာ",
    "Music",
    "음향공학을 연구합니다.",
    "I study audio engineering."
  ],
  [
    "작곡이론",
    "ဂီတဖွဲ့စည်းမှု သီအိုရီ",
    "Music",
    "작곡이론을 전공합니다.",
    "I major in composition theory."
  ],
  [
    "연주법",
    "ဖျော်ဖြေမှု",
    "Music",
    "연주법을 공부합니다.",
    "I study performance practice."
  ],
  [
    "음악심리학",
    "ဂီတ စိတ်ပညာ",
    "Music",
    "음악심리학을 연구합니다.",
    "I study music psychology."
  ],
  [
    "영화사학",
    "ရုပ်ရှင် သမိုင်း",
    "Film Studies",
    "영화사학을 연구합니다.",
    "I study film history."
  ],
  [
    "영화비평학",
    "ရုပ်ရှင် ဝေဖန်မှု",
    "Film Studies",
    "영화비평학을 공부합니다.",
    "I study film criticism."
  ],
  [
    "시네마토그래피",
    "ရုပ်ရှင် ရိုက်ကူးမှု",
    "Film Studies",
    "시네마토그래피를 전공합니다.",
    "I major in cinematography."
  ],
  [
    "영화편집학",
    "ရုပ်ရှင် တည်းဖြတ်မှု",
    "Film Studies",
    "영화편집학을 연구합니다.",
    "I study film editing."
  ],
  [
    "다큐멘터리이론",
    "မှတ်တမ်း သီအိုရီ",
    "Film Studies",
    "다큐멘터리이론을 공부합니다.",
    "I study documentary theory."
  ],
  [
    "애니메이션학",
    "ကာတွန်း",
    "Film Studies",
    "애니메이션학을 전공합니다.",
    "I major in animation studies."
  ],
  [
    "미디어이론",
    "မီဒီယာ သီအိုရီ",
    "Film Studies",
    "미디어이론을 연구합니다.",
    "I study media theory."
  ],
  [
    "스크린스터디",
    "မျက်နှာပြင် လေ့လာမှု",
    "Film Studies",
    "스크린스터디를 전공합니다.",
    "I major in screen studies."
  ],
  [
    "종교철학",
    "ဘာသာရေး ဒဿနိကဗေဒ",
    "Religious Studies",
    "종교철학을 연구합니다.",
    "I study philosophy of religion."
  ],
  [
    "비교종교학",
    "နှိုင်းယှဉ် ဘာသာရေး",
    "Religious Studies",
    "비교종교학을 전공합니다.",
    "I major in comparative religion."
  ],
  [
    "종교인류학",
    "ဘာသာရေး လူသားဗေဒ",
    "Religious Studies",
    "종교인류학을 연구합니다.",
    "I study anthropology of religion."
  ],
  [
    "종교심리학",
    "ဘာသာရေး စိတ်ပညာ",
    "Religious Studies",
    "종교심리학을 전공합니다.",
    "I major in psychology of religion."
  ],
  [
    "경전해석학",
    "ကျမ်းစာ ဖွင့်ဆိုမှု",
    "Religious Studies",
    "경전해석학을 연구합니다.",
    "I study scriptural hermeneutics."
  ],
  [
    "종교예술학",
    "ဘာသာရေး အနုပညာ",
    "Religious Studies",
    "종교예술학을 전공합니다.",
    "I major in religious art."
  ],
  [
    "종교윤리학",
    "ဘာသာရေး ကျင့်ဝတ်",
    "Religious Studies",
    "종교윤리학을 공부합니다.",
    "I study religious ethics."
  ],
  [
    "신비주의",
    "လျှို့ဝှက်ဆန်းကြယ်မှု",
    "Religious Studies",
    "신비주의를 연구합니다.",
    "I study mysticism."
  ],
  [
    "사학방법론",
    "သမိုင်း နည်းလမ်း",
    "History",
    "사학방법론을 전공합니다.",
    "I major in historical methodology."
  ],
  [
    "사료학",
    "သမိုင်း စာရွက်စာတမ်း",
    "History",
    "사료학을 연구합니다.",
    "I study source criticism."
  ],
  [
    "구술사학",
    "နှုတ်ပြော သမိုင်း",
    "History",
    "구술사학을 공부합니다.",
    "I study oral history."
  ],
  [
    "미시사",
    "အသေးစား သမိုင်း",
    "History",
    "미시사를 전공합니다.",
    "I major in microhistory."
  ],
  [
    "사회사",
    "လူမှုရေး သမိုင်း",
    "History",
    "사회사를 연구합니다.",
    "I study social history."
  ],
  [
    "문화사",
    "ယဉ်ကျေးမှု သမိုင်း",
    "History",
    "문화사를 공부합니다.",
    "I study cultural history."
  ],
  [
    "경제사",
    "စီးပွားရေး သမိုင်း",
    "History",
    "경제사를 전공합니다.",
    "I major in economic history."
  ],
  [
    "지적사",
    "ဉာဏပစ္စည်း သမိုင်း",
    "History",
    "지적사를 연구합니다.",
    "I study intellectual history."
  ],
  [
    "여성사",
    "အမျိုးသမီး သမိုင်း",
    "History",
    "여성사를 공부합니다.",
    "I study women's history."
  ],
  [
    "환경사",
    "ပတ်ဝန်းကျင် သမိုင်း",
    "History",
    "환경사를 전공합니다.",
    "I major in environmental history."
  ],
  [
    "지리정보시스템",
    "မြေပုံ သတင်းအချက်အလက် စနစ်",
    "Geography",
    "지리정보시스템을 연구합니다.",
    "I study geographic information systems."
  ],
  [
    "공간분석학",
    "နေရာ ခွဲခြမ်းစိတ်ဖြာမှု",
    "Geography",
    "공간분석학을 전공합니다.",
    "I major in spatial analysis."
  ],
  [
    "도시지리학",
    "မြို့ပြ မြေပုံ",
    "Geography",
    "도시지리학을 공부합니다.",
    "I study urban geography."
  ],
  [
    "경제지리학",
    "စီးပွားရေး မြေပုံ",
    "Geography",
    "경제지리학을 연구합니다.",
    "I study economic geography."
  ],
  [
    "문화지리학",
    "ယဉ်ကျေးမှု မြေပုံ",
    "Geography",
    "문화지리학을 전공합니다.",
    "I major in cultural geography."
  ],
  [
    "정치지리학",
    "နိုင်ငံရေး မြေပုံ",
    "Geography",
    "정치지리학을 공부합니다.",
    "I study political geography."
  ],
  [
    "사회지리학",
    "လူမှုရေး မြေပုံ",
    "Geography",
    "사회지리학을 연구합니다.",
    "I study social geography."
  ],
  [
    "환경지리학",
    "ပတ်ဝန်းကျင် မြေပုံ",
    "Geography",
    "환경지리학을 전공합니다.",
    "I major in environmental geography."
  ],
  [
    "인구지리학",
    "လူဦးရေ မြေပုံ",
    "Geography",
    "인구지리학을 공부합니다.",
    "I study population geography."
  ],
  [
    "지형학",
    "မြေမျက်နှာပြင်",
    "Geography",
    "지형학을 연구합니다.",
    "I study geomorphology."
  ],
  [
    "커뮤니케이션이론",
    "ဆက်သွယ်ရေး သီအိုရီ",
    "Communication",
    "커뮤니케이션이론을 전공합니다.",
    "I major in communication theory."
  ],
  [
    "미디어효과이론",
    "မီဒီယာ သက်ရောက်မှု သီအိုရီ",
    "Communication",
    "미디어효과이론을 연구합니다.",
    "I study media effects theory."
  ],
  [
    "수용자연구",
    "လက်ခံသူ သုတေသန",
    "Communication",
    "수용자연구를 수행합니다.",
    "I conduct audience research."
  ],
  [
    "저널리즘학",
    "သတင်းစာပညာ",
    "Communication",
    "저널리즘학을 전공합니다.",
    "I major in journalism studies."
  ],
  [
    "공중관계학",
    "အများပြည်သူ ဆက်ဆံရေး",
    "Communication",
    "공중관계학을 연구합니다.",
    "I study public relations."
  ],
  [
    "디지털미디어학",
    "ဒစ်ဂျစ်တယ် မီဒီယာ",
    "Communication",
    "디지털미디어학을 전공합니다.",
    "I major in digital media studies."
  ],
  [
    "언론윤리학",
    "သတင်းစာ ကျင့်ဝတ်",
    "Communication",
    "언론윤리학을 연구합니다.",
    "I study media ethics."
  ],
  [
    "미디어정책학",
    "မီဒီယာ မူဝါဒ",
    "Communication",
    "미디어정책학을 공부합니다.",
    "I study media policy."
  ],
  [
    "커뮤니케이션심리학",
    "ဆက်သွယ်ရေး စိတ်ပညာ",
    "Communication",
    "커뮤니케이션심리학을 전공합니다.",
    "I major in communication psychology."
  ],
  [
    "합리주의",
    "ဆင်ခြင်တုံတရား",
    "Abstract concepts",
    "합리주의를 연구합니다.",
    "I study rationalism."
  ],
  [
    "경험주의",
    "အတွေ့အကြုံ",
    "Abstract concepts",
    "경험주의를 공부합니다.",
    "I study empiricism."
  ],
  [
    "관념론",
    "အယူအဆ",
    "Abstract concepts",
    "관념론을 전공합니다.",
    "I major in idealism."
  ],
  [
    "유물론",
    "ပစ္စည်း",
    "Abstract concepts",
    "유물론을 연구합니다.",
    "I study materialism."
  ],
  [
    "인간성",
    "လူသား",
    "Abstract concepts",
    "인간성을 존중합니다.",
    "I respect humanity."
  ],
  [
    "보편성",
    "အထွေထွေ",
    "Abstract concepts",
    "보편성을 추구합니다.",
    "I pursue universality."
  ],
  [
    "특수성",
    "အထူး",
    "Abstract concepts",
    "특수성을 인정합니다.",
    "I recognize particularity."
  ],
  [
    "개별성",
    "တစ်ခုတည်း",
    "Abstract concepts",
    "개별성을 존중합니다.",
    "I respect individuality."
  ],
  [
    "일반성",
    "ပုံမှန်",
    "Abstract concepts",
    "일반성을 이해합니다.",
    "I understand generality."
  ],
  [
    "현실성",
    "လက်တွေ့",
    "Abstract concepts",
    "현실성을 평가합니다.",
    "I evaluate reality."
  ],
  [
    "이상성",
    "စံနမူနာ",
    "Abstract concepts",
    "이상성을 추구합니다.",
    "I pursue ideality."
  ],
  [
    "절대성",
    "အပြည့်အဝ",
    "Abstract concepts",
    "절대성을 탐구합니다.",
    "I explore absoluteness."
  ],
  [
    "상대성",
    "ဆက်စပ်",
    "Abstract concepts",
    "상대성을 이해합니다.",
    "I understand relativity."
  ],
  [
    "주관성",
    "ကိုယ်ပိုင်",
    "Abstract concepts",
    "주관성을 인식합니다.",
    "I recognize subjectivity."
  ],
  [
    "객관성",
    "အရာဝတ္ထု",
    "Abstract concepts",
    "객관성을 추구합니다.",
    "I pursue objectivity."
  ],
  [
    "주체성",
    "အဓိက",
    "Abstract concepts",
    "주체성을 확립합니다.",
    "I establish subjectivity."
  ],
  [
    "객체성",
    "အရာဝတ္ထု",
    "Abstract concepts",
    "객체성을 분석합니다.",
    "I analyze objectivity."
  ],
  [
    "본질",
    "အခြေခံ",
    "Abstract concepts",
    "본질을 탐구합니다.",
    "I explore essence."
  ],
  [
    "현상",
    "ဖြစ်ရပ်",
    "Abstract concepts",
    "현상을 관찰합니다.",
    "I observe phenomena."
  ],
  [
    "내용",
    "အကြောင်းအရာ",
    "Abstract concepts",
    "내용을 분석합니다.",
    "I analyze content."
  ],
  [
    "형식",
    "ပုံစံ",
    "Abstract concepts",
    "형식을 연구합니다.",
    "I study form."
  ],
  [
    "질",
    "အရည်အသွေး",
    "Abstract concepts",
    "질을 평가합니다.",
    "I evaluate quality."
  ],
  [
    "량",
    "ပမာဏ",
    "Abstract concepts",
    "량을 측정합니다.",
    "I measure quantity."
  ],
  [
    "보수",
    "ထိန်းသိမ်းမှု",
    "Abstract concepts",
    "보수를 지지합니다.",
    "I support conservatism."
  ],
  [
    "창조",
    "ဖန်တီးမှု",
    "Abstract concepts",
    "창조를 수행합니다.",
    "I perform creation."
  ],
  [
    "파괴",
    "ဖျက်ဆီးမှု",
    "Abstract concepts",
    "파괴를 방지합니다.",
    "I prevent destruction."
  ],
  [
    "건설",
    "ဆောက်လုပ်မှု",
    "Abstract concepts",
    "건설을 진행합니다.",
    "I proceed with construction."
  ],
  [
    "해체",
    "ဖြေရှင်းမှု",
    "Abstract concepts",
    "해체를 분석합니다.",
    "I analyze deconstruction."
  ],
  [
    "통합",
    "ပေါင်းစည်းမှု",
    "Abstract concepts",
    "통합을 추진합니다.",
    "I promote integration."
  ],
  [
    "분리",
    "ခွဲထုတ်မှု",
    "Abstract concepts",
    "분리를 수행합니다.",
    "I perform separation."
  ],
  [
    "결합",
    "ပေါင်းစပ်မှု",
    "Abstract concepts",
    "결합을 연구합니다.",
    "I study combination."
  ],
  [
    "분해",
    "ခွဲခြမ်းစိတ်ဖြာမှု",
    "Abstract concepts",
    "분해를 분석합니다.",
    "I analyze decomposition."
  ],
  [
    "합성",
    "ပေါင်းစပ်မှု",
    "Abstract concepts",
    "합성을 수행합니다.",
    "I perform synthesis."
  ],
  [
    "세분화",
    "ခွဲခြမ်းစိတ်ဖြာမှု",
    "Abstract concepts",
    "세분화를 진행합니다.",
    "I proceed with segmentation."
  ],
  [
    "일원화",
    "တစ်ခုတည်း",
    "Abstract concepts",
    "일원화를 추진합니다.",
    "I promote unification."
  ],
  [
    "다원화",
    "မျိုးစုံ",
    "Abstract concepts",
    "다원화를 지지합니다.",
    "I support pluralization."
  ],
  [
    "단순화",
    "ရိုးရှင်းမှု",
    "Abstract concepts",
    "단순화를 추구합니다.",
    "I pursue simplification."
  ],
  [
    "복잡화",
    "ရှုပ်ထွေးမှု",
    "Abstract concepts",
    "복잡화를 분석합니다.",
    "I analyze complication."
  ],
  [
    "체계화",
    "စနစ်ကျမှု",
    "Abstract concepts",
    "체계화를 진행합니다.",
    "I proceed with systematization."
  ],
  [
    "무질서",
    "အစီအစဉ်မဲ့",
    "Abstract concepts",
    "무질서를 방지합니다.",
    "I prevent disorder."
  ],
  [
    "질서",
    "အစီအစဉ်",
    "Abstract concepts",
    "질서를 유지합니다.",
    "I maintain order."
  ],
  [
    "혼란",
    "ရှုပ်ထွေးမှု",
    "Abstract concepts",
    "혼란을 해소합니다.",
    "I resolve confusion."
  ],
  [
    "안정",
    "တည်ငြိမ်မှု",
    "Abstract concepts",
    "안정을 추구합니다.",
    "I pursue stability."
  ],
  [
    "불안정",
    "မတည်ငြိမ်",
    "Abstract concepts",
    "불안정을 분석합니다.",
    "I analyze instability."
  ],
  [
    "균형",
    "ညီမျှမှု",
    "Abstract concepts",
    "균형을 유지합니다.",
    "I maintain balance."
  ],
  [
    "불균형",
    "မညီမျှ",
    "Abstract concepts",
    "불균형을 조정합니다.",
    "I adjust imbalance."
  ],
  [
    "조화",
    "သဟဇာတ",
    "Abstract concepts",
    "조화를 추구합니다.",
    "I pursue harmony."
  ],
  [
    "갈등",
    "အငြင်းပွားမှု",
    "Abstract concepts",
    "갈등을 해결합니다.",
    "I resolve conflict."
  ],
  [
    "협력",
    "ပူးပေါင်းဆောင်ရွက်မှု",
    "Abstract concepts",
    "협력을 추진합니다.",
    "I promote cooperation."
  ],
  [
    "대립",
    "ဆန့်ကျင်ဘက်",
    "Abstract concepts",
    "대립을 해소합니다.",
    "I resolve opposition."
  ],
  [
    "통일",
    "ညီညွတ်မှု",
    "Abstract concepts",
    "통일을 추구합니다.",
    "I pursue unity."
  ],
  [
    "분열",
    "ခွဲထွက်မှု",
    "Abstract concepts",
    "분열을 방지합니다.",
    "I prevent division."
  ],
  [
    "연결",
    "ဆက်သွယ်မှု",
    "Abstract concepts",
    "연결을 구축합니다.",
    "I build connection."
  ],
  [
    "단절",
    "ဖြတ်တောက်မှု",
    "Abstract concepts",
    "단절을 분석합니다.",
    "I analyze disconnection."
  ],
  [
    "연속성",
    "ဆက်တိုက်",
    "Abstract concepts",
    "연속성을 유지합니다.",
    "I maintain continuity."
  ],
  [
    "불연속성",
    "မဆက်တိုက်",
    "Abstract concepts",
    "불연속성을 연구합니다.",
    "I study discontinuity."
  ],
  [
    "일관성",
    "ဆက်စပ်",
    "Abstract concepts",
    "일관성을 추구합니다.",
    "I pursue consistency."
  ],
  [
    "모순",
    "ဆန့်ကျင်ဘက်",
    "Abstract concepts",
    "모순을 해결합니다.",
    "I resolve contradiction."
  ],
  [
    "일치",
    "ကိုက်ညီမှု",
    "Abstract concepts",
    "일치를 추구합니다.",
    "I pursue agreement."
  ],
  [
    "차이",
    "ကွာခြားမှု",
    "Abstract concepts",
    "차이를 인식합니다.",
    "I recognize difference."
  ],
  [
    "동일성",
    "တူညီမှု",
    "Abstract concepts",
    "동일성을 확인합니다.",
    "I verify identity."
  ],
  [
    "차별성",
    "ကွာခြားမှု",
    "Abstract concepts",
    "차별성을 존중합니다.",
    "I respect distinctiveness."
  ],
  [
    "유사성",
    "ဆင်တူမှု",
    "Abstract concepts",
    "유사성을 분석합니다.",
    "I analyze similarity."
  ],
  [
    "상이성",
    "ကွာခြားမှု",
    "Abstract concepts",
    "상이성을 인식합니다.",
    "I recognize difference."
  ],
  [
    "동질성",
    "တူညီမှု",
    "Abstract concepts",
    "동질성을 확인합니다.",
    "I verify homogeneity."
  ],
  [
    "이질성",
    "မတူညီ",
    "Abstract concepts",
    "이질성을 분석합니다.",
    "I analyze heterogeneity."
  ],
  [
    "학술연구",
    "ပညာရေး သုတေသန",
    "Academic & Intellectual",
    "학술연구를 수행합니다.",
    "I conduct academic research."
  ],
  [
    "학문적탐구",
    "ပညာရေး ရှာဖွေမှု",
    "Academic & Intellectual",
    "학문적탐구를 진행합니다.",
    "I proceed with academic inquiry."
  ],
  [
    "학술논문",
    "ပညာရေး စာတမ်း",
    "Academic & Intellectual",
    "학술논문을 작성합니다.",
    "I write academic papers."
  ],
  [
    "이론적프레임워크",
    "သီအိုရီ ဘောင်ခတ်မှု",
    "Academic & Intellectual",
    "이론적프레임워크를 구축합니다.",
    "I build theoretical frameworks."
  ],
  [
    "학술컨퍼런스",
    "ပညာရေး ညီလာခံ",
    "Academic & Intellectual",
    "학술컨퍼런스에 참석합니다.",
    "I attend academic conferences."
  ],
  [
    "학제간연구",
    "ဘာသာရပ် စပ်ကြား သုတေသန",
    "Academic & Intellectual",
    "학제간연구를 수행합니다.",
    "I conduct interdisciplinary research."
  ],
  [
    "박사학위",
    "ဒေါက်တာ",
    "Academic & Intellectual",
    "박사학위를 취득합니다.",
    "I obtain a doctoral degree."
  ],
  [
    "석사학위",
    "မဟာဘွဲ့",
    "Academic & Intellectual",
    "석사학위를 받습니다.",
    "I receive a master's degree."
  ],
  [
    "학사학위",
    "ဘွဲ့",
    "Academic & Intellectual",
    "학사학위를 취득합니다.",
    "I obtain a bachelor's degree."
  ],
  [
    "문헌연구",
    "စာပေ သုတေသန",
    "Academic & Intellectual",
    "문헌연구를 수행합니다.",
    "I conduct literature research."
  ],
  [
    "조사연구",
    "စစ်တမ်း သုတေသန",
    "Academic & Intellectual",
    "조사연구를 수행합니다.",
    "I conduct survey research."
  ],
  [
    "사례연구",
    "ကိစ္စ သုတေသန",
    "Academic & Intellectual",
    "사례연구를 진행합니다.",
    "I proceed with case studies."
  ],
  [
    "인지연구",
    "သိမြင်မှု သုတေသန",
    "Academic & Intellectual",
    "인지연구를 수행합니다.",
    "I conduct cognitive research."
  ],
  [
    "사회연구",
    "လူမှုရေး သုတေသန",
    "Academic & Intellectual",
    "사회연구를 진행합니다.",
    "I proceed with social research."
  ],
  [
    "역사연구",
    "သမိုင်း သုတေသန",
    "Academic & Intellectual",
    "역사연구를 진행합니다.",
    "I proceed with historical research."
  ],
  [
    "언어연구",
    "ဘာသာစကား သုတေသန",
    "Academic & Intellectual",
    "언어연구를 수행합니다.",
    "I conduct linguistic research."
  ],
  [
    "문학연구",
    "စာပေ သုတေသန",
    "Academic & Intellectual",
    "문학연구를 진행합니다.",
    "I proceed with literary research."
  ],
  [
    "철학연구",
    "ဒဿနိကဗေဒ သုတေသန",
    "Academic & Intellectual",
    "철학연구를 수행합니다.",
    "I conduct philosophical research."
  ],
  [
    "과학연구",
    "သိပ္ပံ သုတေသန",
    "Academic & Intellectual",
    "과학연구를 진행합니다.",
    "I proceed with scientific research."
  ],
  [
    "기술연구",
    "နည်းပညာ သုတေသန",
    "Academic & Intellectual",
    "기술연구를 수행합니다.",
    "I conduct technical research."
  ],
  [
    "의학연구",
    "ဆေးပညာ သုတေသန",
    "Academic & Intellectual",
    "의학연구를 진행합니다.",
    "I proceed with medical research."
  ],
  [
    "경제연구",
    "စီးပွားရေး သုတေသန",
    "Academic & Intellectual",
    "경제연구를 수행합니다.",
    "I conduct economic research."
  ],
  [
    "정치연구",
    "နိုင်ငံရေး သုတေသန",
    "Academic & Intellectual",
    "정치연구를 진행합니다.",
    "I proceed with political research."
  ],
  [
    "심리연구",
    "စိတ်ပညာ သုတေသန",
    "Academic & Intellectual",
    "심리연구를 수행합니다.",
    "I conduct psychological research."
  ],
  [
    "교육연구",
    "ပညာရေး သုတေသန",
    "Academic & Intellectual",
    "교육연구를 진행합니다.",
    "I proceed with educational research."
  ],
  [
    "환경연구",
    "ပတ်ဝန်းကျင် သုတေသန",
    "Academic & Intellectual",
    "환경연구를 수행합니다.",
    "I conduct environmental research."
  ],
  [
    "지구연구",
    "ကမ္ဘာ သုတေသန",
    "Academic & Intellectual",
    "지구연구를 진행합니다.",
    "I proceed with earth research."
  ],
  [
    "우주연구",
    "အာကာသ သုတေသန",
    "Academic & Intellectual",
    "우주연구를 수행합니다.",
    "I conduct space research."
  ],
  [
    "해양연구",
    "ပင်လယ် သုတေသန",
    "Academic & Intellectual",
    "해양연구를 진행합니다.",
    "I proceed with marine research."
  ],
  [
    "생물연구",
    "ဇီဝ သုတေသန",
    "Academic & Intellectual",
    "생물연구를 수행합니다.",
    "I conduct biological research."
  ],
  [
    "화학연구",
    "ဓာတုဗေဒ သုတေသန",
    "Academic & Intellectual",
    "화학연구를 진행합니다.",
    "I proceed with chemical research."
  ],
  [
    "물리연구",
    "ရူပဗေဒ သုတေသန",
    "Academic & Intellectual",
    "물리연구를 수행합니다.",
    "I conduct physics research."
  ],
  [
    "수학연구",
    "သင်္ချာ သုတေသန",
    "Academic & Intellectual",
    "수학연구를 진행합니다.",
    "I proceed with mathematical research."
  ],
  [
    "통계연구",
    "စာရင်းအင်း သုတေသန",
    "Academic & Intellectual",
    "통계연구를 수행합니다.",
    "I conduct statistical research."
  ],
  [
    "컴퓨터연구",
    "ကွန်ပျူတာ သုတေသန",
    "Academic & Intellectual",
    "컴퓨터연구를 진행합니다.",
    "I proceed with computer research."
  ],
  [
    "인공지능연구",
    "အတုထာဘူတ သုတေသန",
    "Academic & Intellectual",
    "인공지능연구를 수행합니다.",
    "I conduct AI research."
  ],
  [
    "로봇연구",
    "ရိုဘော့ သုတေသန",
    "Academic & Intellectual",
    "로봇연구를 진행합니다.",
    "I proceed with robotics research."
  ],
  [
    "나노연구",
    "နာနို သုတေသန",
    "Academic & Intellectual",
    "나노연구를 수행합니다.",
    "I conduct nanotechnology research."
  ],
  [
    "바이오연구",
    "ဇီဝ သုတေသန",
    "Academic & Intellectual",
    "바이오연구를 진행합니다.",
    "I proceed with biotechnology research."
  ],
  [
    "에너지연구",
    "စွမ်းအား သုတေသန",
    "Academic & Intellectual",
    "에너지연구를 수행합니다.",
    "I conduct energy research."
  ],
  [
    "재료연구",
    "ပစ္စည်း သုတေသန",
    "Academic & Intellectual",
    "재료연구를 진행합니다.",
    "I proceed with materials research."
  ],
  [
    "건축연구",
    "ဗိသုကာ သုတေသန",
    "Academic & Intellectual",
    "건축연구를 수행합니다.",
    "I conduct architectural research."
  ],
  [
    "지역연구",
    "ဒေသ သုတေသန",
    "Academic & Intellectual",
    "지역연구를 수행합니다.",
    "I conduct regional research."
  ],
  [
    "국제연구",
    "နိုင်ငံတကာ သုတေသန",
    "Academic & Intellectual",
    "국제연구를 진행합니다.",
    "I proceed with international research."
  ],
  [
    "비교문화연구",
    "နှိုင်းယှဉ် ယဉ်ကျေးမှု သုတေသန",
    "Academic & Intellectual",
    "비교문화연구를 수행합니다.",
    "I conduct cross-cultural research."
  ],
  [
    "인종연구",
    "လူမျိုး သုတေသန",
    "Academic & Intellectual",
    "인종연구를 수행합니다.",
    "I conduct ethnic research."
  ],
  [
    "계급연구",
    "အတန်း သုတေသန",
    "Academic & Intellectual",
    "계급연구를 진행합니다.",
    "I proceed with class research."
  ],
  [
    "세대연구",
    "မျိုးဆက် သုတေသန",
    "Academic & Intellectual",
    "세대연구를 수행합니다.",
    "I conduct generational research."
  ],
  [
    "커뮤니케이션연구",
    "ဆက်သွယ်ရေး သုတေသန",
    "Academic & Intellectual",
    "커뮤니케이션연구를 수행합니다.",
    "I conduct communication research."
  ],
  [
    "저널리즘연구",
    "သတင်းစာပညာ သုတေသန",
    "Academic & Intellectual",
    "저널리즘연구를 진행합니다.",
    "I proceed with journalism research."
  ],
  [
    "영화연구",
    "ရုပ်ရှင် သုတေသန",
    "Academic & Intellectual",
    "영화연구를 수행합니다.",
    "I conduct film research."
  ],
  [
    "음악연구",
    "ဂီတ သုတေသန",
    "Academic & Intellectual",
    "음악연구를 진행합니다.",
    "I proceed with music research."
  ],
  [
    "예술연구",
    "အနုပညာ သုတေသန",
    "Academic & Intellectual",
    "예술연구를 수행합니다.",
    "I conduct art research."
  ],
  [
    "디자인연구",
    "ဒီဇိုင်း သုတေသန",
    "Academic & Intellectual",
    "디자인연구를 진행합니다.",
    "I proceed with design research."
  ],
  [
    "패션연구",
    "ဖက်ရှင် သုတေသန",
    "Academic & Intellectual",
    "패션연구를 수행합니다.",
    "I conduct fashion research."
  ],
  [
    "스포츠연구",
    "အားကစား သုတေသန",
    "Academic & Intellectual",
    "스포츠연구를 진행합니다.",
    "I proceed with sports research."
  ],
  [
    "레저연구",
    "အားလပ်ရက် သုတေသန",
    "Academic & Intellectual",
    "레저연구를 수행합니다.",
    "I conduct leisure research."
  ],
  [
    "관광연구",
    "ခရီးသွား သုတေသန",
    "Academic & Intellectual",
    "관광연구를 진행합니다.",
    "I proceed with tourism research."
  ],
  [
    "식품연구",
    "အစားအစာ သုတေသန",
    "Academic & Intellectual",
    "식품연구를 수행합니다.",
    "I conduct food research."
  ],
  [
    "영양연구",
    "အာဟာရ သုတေသန",
    "Academic & Intellectual",
    "영양연구를 진행합니다.",
    "I proceed with nutrition research."
  ],
  [
    "건강연구",
    "ကျန်းမာရေး သုတေသန",
    "Academic & Intellectual",
    "건강연구를 수행합니다.",
    "I conduct health research."
  ],
  [
    "의료연구",
    "ဆေးကုသမှု သုတေသန",
    "Academic & Intellectual",
    "의료연구를 진행합니다.",
    "I proceed with medical care research."
  ],
  [
    "간호연구",
    "သူနာပြု သုတေသန",
    "Academic & Intellectual",
    "간호연구를 수행합니다.",
    "I conduct nursing research."
  ],
  [
    "약학연구",
    "ဆေးဝါး သုတေသန",
    "Academic & Intellectual",
    "약학연구를 진행합니다.",
    "I proceed with pharmaceutical research."
  ],
  [
    "치의학연구",
    "သွားဆရာဝန် သုတေသန",
    "Academic & Intellectual",
    "치의학연구를 수행합니다.",
    "I conduct dental research."
  ],
  [
    "수의학연구",
    "တိရစ္ဆာန် ဆေးကုသမှု သုတေသန",
    "Academic & Intellectual",
    "수의학연구를 진행합니다.",
    "I proceed with veterinary research."
  ],
  [
    "법학연구",
    "ဥပဒေ သုတေသန",
    "Academic & Intellectual",
    "법학연구를 수행합니다.",
    "I conduct legal research."
  ],
  [
    "경영연구",
    "စီမံခန့်ခွဲမှု သုတေသန",
    "Academic & Intellectual",
    "경영연구를 진행합니다.",
    "I proceed with management research."
  ],
  [
    "마케팅연구",
    "စျေးကွက် သုတေသန",
    "Academic & Intellectual",
    "마케팅연구를 수행합니다.",
    "I conduct marketing research."
  ],
  [
    "재무연구",
    "ငွေကြေး သုတေသန",
    "Academic & Intellectual",
    "재무연구를 진행합니다.",
    "I proceed with finance research."
  ],
  [
    "회계연구",
    "စာရင်းကိုင်မှု သုတေသန",
    "Academic & Intellectual",
    "회계연구를 수행합니다.",
    "I conduct accounting research."
  ],
  [
    "인사연구",
    "လူ့စွမ်းအား သုတေသန",
    "Academic & Intellectual",
    "인사연구를 진행합니다.",
    "I proceed with human resources research."
  ],
  [
    "조직연구",
    "အဖွဲ့အစည်း သုတေသန",
    "Academic & Intellectual",
    "조직연구를 수행합니다.",
    "I conduct organizational research."
  ],
  [
    "전략연구",
    "နည်းဗျူဟာ သုတေသန",
    "Academic & Intellectual",
    "전략연구를 진행합니다.",
    "I proceed with strategic research."
  ],
  [
    "혁신연구",
    "ဆန်းသစ်မှု သုတေသန",
    "Academic & Intellectual",
    "혁신연구를 수행합니다.",
    "I conduct innovation research."
  ],
  [
    "기업연구",
    "လုပ်ငန်း သုတေသန",
    "Academic & Intellectual",
    "기업연구를 진행합니다.",
    "I proceed with corporate research."
  ],
  [
    "창업연구",
    "စတင်မှု သုတေသန",
    "Academic & Intellectual",
    "창업연구를 수행합니다.",
    "I conduct entrepreneurship research."
  ],
  [
    "벤처연구",
    "စွန့်စားမှု သုတေသန",
    "Academic & Intellectual",
    "벤처연구를 진행합니다.",
    "I proceed with venture research."
  ],
  [
    "스타트업연구",
    "စတင်မှု သုတေသန",
    "Academic & Intellectual",
    "스타트업연구를 수행합니다.",
    "I conduct startup research."
  ],
  [
    "글로벌연구",
    "ကမ္ဘာ့ သုတေသန",
    "Academic & Intellectual",
    "글로벌연구를 진행합니다.",
    "I proceed with global research."
  ],
  [
    "다국적연구",
    "မျိုးစုံ နိုင်ငံ သုတေသန",
    "Academic & Intellectual",
    "다국적연구를 수행합니다.",
    "I conduct multinational research."
  ],
  [
    "지역협력연구",
    "ဒေသ ပူးပေါင်းဆောင်ရွက်မှု သုတေသန",
    "Academic & Intellectual",
    "지역협력연구를 진행합니다.",
    "I proceed with regional cooperation research."
  ],
  [
    "국제협력연구",
    "နိုင်ငံတကာ ပူးပေါင်းဆောင်ရွက်မှု သုတေသန",
    "Academic & Intellectual",
    "국제협력연구를 수행합니다.",
    "I conduct international cooperation research."
  ],
  [
    "개발연구",
    "ဖွံ့ဖြိုးတိုးတက်မှု သုတေသန",
    "Academic & Intellectual",
    "개발연구를 진행합니다.",
    "I proceed with development research."
  ],
  [
    "지속가능연구",
    "ရေရှည် သုတေသန",
    "Academic & Intellectual",
    "지속가능연구를 수행합니다.",
    "I conduct sustainability research."
  ],
  [
    "기후연구",
    "ရာသီဥတု သုတေသန",
    "Academic & Intellectual",
    "기후연구를 진행합니다.",
    "I proceed with climate research."
  ],
  [
    "환경보호연구",
    "ပတ်ဝန်းကျင် ကာကွယ်မှု သုတေသန",
    "Academic & Intellectual",
    "환경보호연구를 수행합니다.",
    "I conduct environmental protection research."
  ],
  [
    "재생에너지연구",
    "ပြန်လည်ပြည့်ဖြိုးမြဲ စွမ်းအား သုတေသန",
    "Academic & Intellectual",
    "재생에너지연구를 진행합니다.",
    "I proceed with renewable energy research."
  ],
  [
    "친환경연구",
    "ပတ်ဝန်းကျင် နှင့် သဟဇာတ သုတေသန",
    "Academic & Intellectual",
    "친환경연구를 수행합니다.",
    "I conduct eco-friendly research."
  ],
  [
    "녹색기술연구",
    "အစိမ်းရောင် နည်းပညာ သုတေသန",
    "Academic & Intellectual",
    "녹색기술연구를 진행합니다.",
    "I proceed with green technology research."
  ],
  [
    "순환경제연구",
    "စက်ဝိုင်း စီးပွားရေး သုတေသန",
    "Academic & Intellectual",
    "순환경제연구를 수행합니다.",
    "I conduct circular economy research."
  ],
  [
    "변증법적유물론",
    "ဆန့်ကျင်ဘက် ပစ္စည်းဝါဒ",
    "Abstract concepts",
    "변증법적유물론을 연구합니다.",
    "I study dialectical materialism."
  ],
  [
    "학제간융합연구",
    "ဘာသာရပ် စပ်ကြား ပေါင်းစည်းမှု သုတေသန",
    "Academic & Intellectual",
    "학제간융합연구를 수행합니다.",
    "I conduct interdisciplinary convergence research."
  ],
  [
    "불가사의한",
    "အံ့ဩဖွယ်",
    "Advanced adjectives",
    "불가사의한 현상을 관찰합니다.",
    "I observe mysterious phenomena."
  ],
  [
    "융합하다",
    "ပေါင်းစည်းသည်",
    "Advanced verbs",
    "기술을 융합합니다.",
    "I converge technologies."
  ],
  [
    "유기농재배",
    "အော်ဂဲနစ် စိုက်ပျိုးမှု",
    "Agriculture",
    "유기농재배를 실시합니다.",
    "I practice organic farming."
  ],
  [
    "멸종위기종",
    "မျိုးသုဉ်းရန် အန္တရာယ်ရှိ",
    "Animals",
    "멸종위기종을 보호합니다.",
    "I protect endangered species."
  ],
  [
    "면역체계",
    "ကိုယ်ခံအား စနစ်",
    "Body",
    "면역체계를 강화합니다.",
    "I strengthen the immune system."
  ],
  [
    "지속가능패션",
    "ရေရှည် ဖက်ရှင်",
    "Clothing",
    "지속가능패션을 추구합니다.",
    "I pursue sustainable fashion."
  ],
  [
    "색채심리학",
    "အရောင် စိတ်ပညာ",
    "Colors",
    "색채심리학을 연구합니다.",
    "I study color psychology."
  ],
  [
    "디지털소통",
    "ဒစ်ဂျစ်တယ် ဆက်သွယ်ရေး",
    "Communication",
    "디지털소통을 활용합니다.",
    "I utilize digital communication."
  ],
  [
    "문화융합",
    "ယဉ်ကျေးမှု ပေါင်းစည်းမှု",
    "Culture & Arts",
    "문화융합을 추진합니다.",
    "I promote cultural fusion."
  ],
  [
    "상호작용",
    "အပြန်အလှန် ဆက်သွယ်မှု",
    "Daily conversation",
    "상호작용을 촉진합니다.",
    "I facilitate interaction."
  ],
  [
    "거시경제학",
    "ကြီးမားသော စီးပွားရေး",
    "Economics",
    "거시경제학을 연구합니다.",
    "I study macroeconomics."
  ],
  [
    "액션리서치",
    "လုပ်ဆောင်မှု သုတေသန",
    "Education & Research",
    "액션리서치를 수행합니다.",
    "I conduct action research."
  ],
  [
    "공감능력",
    "ထောက်ထားမှု စွမ်းရည်",
    "Emotions",
    "공감능력을 개발합니다.",
    "I develop empathy."
  ],
  [
    "바이오엔지니어링",
    "ဇီဝ အင်ဂျင်နီယာ",
    "Engineering",
    "바이오엔지니어링을 연구합니다.",
    "I study bioengineering."
  ],
  [
    "생태계복원",
    "ဂေဟစနစ် ပြန်လည်ထူထောင်မှု",
    "Environment",
    "생태계복원을 추진합니다.",
    "I promote ecosystem restoration."
  ],
  [
    "다문화가족",
    "မျိုးစုံ ယဉ်ကျေးမှု မိသားစု",
    "Family",
    "다문화가족을 지원합니다.",
    "I support multicultural families."
  ],
  [
    "시네마테크",
    "ရုပ်ရှင် ပညာ",
    "Film Studies",
    "시네마테크를 연구합니다.",
    "I study cinematography."
  ],
  [
    "분자요리",
    "မော်လီကျူး ချက်ပြုတ်မှု",
    "Food",
    "분자요리를 실험합니다.",
    "I experiment with molecular gastronomy."
  ],
  [
    "상호존중",
    "အပြန်အလှန် လေးစားမှု",
    "General",
    "상호존중을 실천합니다.",
    "I practice mutual respect."
  ],
  [
    "연대기",
    "ခေတ်ကာလ",
    "History & Time",
    "연대기를 작성합니다.",
    "I compile a chronology."
  ],
  [
    "취미활동",
    "ဝါသနာ လုပ်ဆောင်မှု",
    "Hobbies",
    "취미활동을 즐깁니다.",
    "I enjoy hobby activities."
  ],
  [
    "스마트홈",
    "စမတ် အိမ်",
    "Home",
    "스마트홈을 구축합니다.",
    "I build a smart home."
  ],
  [
    "전자음악",
    "အီလက်ထရွန်နစ် ဂီတ",
    "Music",
    "전자음악을 작곡합니다.",
    "I compose electronic music."
  ],
  [
    "자연보존",
    "သဘာဝ ထိန်းသိမ်းမှု",
    "Nature",
    "자연보존을 추진합니다.",
    "I promote nature conservation."
  ],
  [
    "응용윤리학",
    "အသုံးချ ကျင့်ဝတ်",
    "Philosophy & Ethics",
    "응용윤리학을 연구합니다.",
    "I study applied ethics."
  ],
  [
    "실험과학",
    "စမ်းသပ်မှု သိပ္ပံ",
    "Science",
    "실험과학을 수행합니다.",
    "I conduct experimental science."
  ],
  [
    "전자상거래",
    "အီလက်ထရွန်နစ် ကုန်သွယ်ရေး",
    "Shopping",
    "전자상거래를 이용합니다.",
    "I use e-commerce."
  ],
  [
    "시민사회",
    "ပြည်သူ့ လူ့အဖွဲ့အစည်း",
    "Social & Political",
    "시민사회를 강화합니다.",
    "I strengthen civil society."
  ],
  [
    "정량분석",
    "အရေအတွက် ခွဲခြမ်းစိတ်ဖြာမှု",
    "Social Science",
    "정량분석을 수행합니다.",
    "I conduct quantitative analysis."
  ],
  [
    "다원주의",
    "မျိုးစုံ ဝါဒ",
    "Society",
    "다원주의를 지지합니다.",
    "I support pluralism."
  ],
  [
    "사회구조",
    "လူမှုရေး ဖွဲ့စည်းပုံ",
    "Sociology",
    "사회구조를 분석합니다.",
    "I analyze social structure."
  ],
  [
    "시공간",
    "အချိန် နှင့် နေရာ",
    "Time",
    "시공간을 탐구합니다.",
    "I explore spacetime."
  ],
  [
    "지속가능관광",
    "ရေရှည် ခရီးသွား",
    "Travel",
    "지속가능관광을 추진합니다.",
    "I promote sustainable tourism."
  ],
  [
    "기상예보",
    "ရာသီဥတု ခန့်မှန်းချက်",
    "Weather",
    "기상예보를 확인합니다.",
    "I check weather forecasts."
  ],
  [
    "원격근무",
    "အကွာအဝေး အလုပ်",
    "Work",
    "원격근무를 수행합니다.",
    "I work remotely."
  ],
  [
    "메타인지",
    "အထက်တန်း သိမြင်မှု",
    "Advanced vocabulary",
    "메타인지를 개발합니다.",
    "I develop metacognition."
  ],
  [
    "경영혁신",
    "စီမံခန့်ခွဲမှု ဆန်းသစ်မှု",
    "Business & Economics",
    "경영혁신을 추진합니다.",
    "I promote management innovation."
  ],
  [
    "하이퍼미디어",
    "အထက်တန်း မီဒီယာ",
    "Communication & Media",
    "하이퍼미디어를 제작합니다.",
    "I produce hypermedia."
  ],
  [
    "혁신교육",
    "ဆန်းသစ်မှု ပညာရေး",
    "Education",
    "혁신교육을 추진합니다.",
    "I promote innovative education."
  ],
  [
    "사학",
    "သမိုင်း ပညာ",
    "History",
    "사학을 연구합니다.",
    "I study historiography."
  ],
  [
    "법리학",
    "ဥပဒေ သီအိုရီ",
    "Legal",
    "법리학을 연구합니다.",
    "I study jurisprudence."
  ],
  [
    "공법",
    "အများပြည်သူ ဥပဒေ",
    "Legal & Administrative",
    "공법을 적용합니다.",
    "I apply public law."
  ],
  [
    "대수학",
    "အက္ခရာသင်္ချာ",
    "Mathematics",
    "대수학을 연구합니다.",
    "I study algebra."
  ],
  [
    "정치이론",
    "နိုင်ငံရေး သီအိုရီ",
    "Political Science",
    "정치이론을 분석합니다.",
    "I analyze political theory."
  ],
  [
    "형이상학적",
    "ရူပဗေဒ အထက်",
    "Abstract concepts",
    "형이상학적 문제를 탐구합니다.",
    "I explore metaphysical questions."
  ],
  [
    "지식융합",
    "အသိပညာ ပေါင်းစည်းမှု",
    "Academic & Intellectual",
    "지식융합을 추진합니다.",
    "I promote knowledge convergence."
  ],
  [
    "초월적인",
    "ကျော်လွန်သော",
    "Advanced adjectives",
    "초월적인 경험을 합니다.",
    "I have a transcendent experience."
  ],
  [
    "융화하다",
    "ပေါင်းစည်းသည်",
    "Advanced verbs",
    "문화를 융화합니다.",
    "I harmonize cultures."
  ],
  [
    "야생동물보호",
    "တောရိုင်း တိရစ္ဆာန် ကာကွယ်ရေး",
    "Animals",
    "야생동물보호를 실천합니다.",
    "I practice wildlife conservation."
  ],
  [
    "신경계",
    "အာရုံကြော စနစ်",
    "Body",
    "신경계를 연구합니다.",
    "I study the nervous system."
  ],
  [
    "스마트의류",
    "စမတ် အဝတ်အစား",
    "Clothing",
    "스마트의류를 개발합니다.",
    "I develop smart clothing."
  ],
  [
    "색채이론",
    "အရောင် သီအိုရီ",
    "Colors",
    "색채이론을 연구합니다.",
    "I study color theory."
  ],
  [
    "비대면소통",
    "မျက်နှာချင်းဆိုင် မဟုတ် ဆက်သွယ်ရေး",
    "Communication",
    "비대면소통을 활용합니다.",
    "I utilize non-face-to-face communication."
  ],
  [
    "문화다양성",
    "ယဉ်ကျေးမှု မျိုးစုံ",
    "Culture & Arts",
    "문화다양성을 존중합니다.",
    "I respect cultural diversity."
  ],
  [
    "대화기법",
    "စကားပြောနည်းလမ်း",
    "Daily conversation",
    "대화기법을 학습합니다.",
    "I learn conversation techniques."
  ],
  [
    "미시경제학",
    "သေးငယ်သော စီးပွားရေး",
    "Economics",
    "미시경제학을 연구합니다.",
    "I study microeconomics."
  ],
  [
    "정서지능",
    "စိတ်ခံစားမှု ဉာဏ်ရည်",
    "Emotions",
    "정서지능을 개발합니다.",
    "I develop emotional intelligence."
  ],
  [
    "자연생태",
    "သဘာဝ ဂေဟစနစ်",
    "Environment & Nature",
    "자연생태를 보존합니다.",
    "I preserve natural ecology."
  ],
  [
    "가족상담",
    "မိသားစု အကြံပေးမှု",
    "Family",
    "가족상담을 받습니다.",
    "I receive family counseling."
  ],
  [
    "디지털금융",
    "ဒစ်ဂျစ်တယ် ငွေကြေး",
    "Finance",
    "디지털금융을 활용합니다.",
    "I utilize digital finance."
  ],
  [
    "푸드테크",
    "အစားအစာ နည်းပညာ",
    "Food",
    "푸드테크를 개발합니다.",
    "I develop food tech."
  ],
  [
    "상호이해",
    "အပြန်အလှန် နားလည်မှု",
    "General",
    "상호이해를 증진합니다.",
    "I promote mutual understanding."
  ],
  [
    "지리학",
    "ပထဝီ",
    "Geography",
    "지리학을 연구합니다.",
    "I study geography."
  ],
  [
    "건강관리",
    "ကျန်းမာရေး စီမံခန့်ခွဲမှု",
    "Health",
    "건강관리를 실천합니다.",
    "I practice health management."
  ],
  [
    "취미문화",
    "ဝါသနာ ယဉ်ကျေးမှု",
    "Hobbies",
    "취미문화를 즐깁니다.",
    "I enjoy hobby culture."
  ],
  [
    "홈오토메이션",
    "အိမ် အလိုအလျောက်",
    "Home",
    "홈오토메이션을 구축합니다.",
    "I build home automation."
  ],
  [
    "법학",
    "ဥပဒေ ပညာ",
    "Law",
    "법학을 연구합니다.",
    "I study law."
  ],
  [
    "보건의료",
    "ကျန်းမာရေး ဆေးကုသမှု",
    "Medical & Health",
    "보건의료를 제공합니다.",
    "I provide healthcare."
  ],
  [
    "임상의학",
    "ကုသမှု ဆေးပညာ",
    "Medicine",
    "임상의학을 실천합니다.",
    "I practice clinical medicine."
  ],
  [
    "윤리철학",
    "ကျင့်ဝတ် ဒဿန",
    "Philosophy & Ethics",
    "윤리철학을 탐구합니다.",
    "I explore moral philosophy."
  ],
  [
    "응용물리학",
    "အသုံးချ ရူပဗေဒ",
    "Physics",
    "응용물리학을 연구합니다.",
    "I study applied physics."
  ],
  [
    "응용과학",
    "အသုံးချ သိပ္ပံ",
    "Science",
    "응용과학을 연구합니다.",
    "I study applied science."
  ],
  [
    "온라인쇼핑",
    "အွန်လိုင်း ဈေးဝယ်",
    "Shopping",
    "온라인쇼핑을 합니다.",
    "I shop online."
  ],
  [
    "사회정의",
    "လူမှုရေး တရားမျှတမှု",
    "Social & Political",
    "사회정의를 추구합니다.",
    "I pursue social justice."
  ],
  [
    "사회통합",
    "လူမှုရေး ပေါင်းစည်းမှု",
    "Society",
    "사회통합을 추진합니다.",
    "I promote social integration."
  ],
  [
    "첨단기술",
    "ခေတ်မီ နည်းပညာ",
    "Technology",
    "첨단기술을 개발합니다.",
    "I develop advanced technology."
  ],
  [
    "시간관리",
    "အချိန် စီမံခန့်ခွဲမှု",
    "Time",
    "시간관리를 실천합니다.",
    "I practice time management."
  ],
  [
    "스마트관광",
    "စမတ် ခရီးသွား",
    "Travel",
    "스마트관광을 즐깁니다.",
    "I enjoy smart tourism."
  ],
  [
    "디지털노마드",
    "ဒစ်ဂျစ်တယ် လှည့်လည်နေထိုင်သူ",
    "Work",
    "디지털노마드로 일합니다.",
    "I work as a digital nomad."
  ],
  [
    "스타트업생태계",
    "စတင်မှု ဂေဟစနစ်",
    "Business",
    "스타트업생태계를 구축합니다.",
    "I build startup ecosystem."
  ],
  [
    "경제정책",
    "စီးပွားရေး မူဝါဒ",
    "Business & Economics",
    "경제정책을 수립합니다.",
    "I establish economic policy."
  ],
  [
    "전자정부",
    "အီလက်ထရွန်နစ် အစိုးရ",
    "Government",
    "전자정부를 구축합니다.",
    "I build e-government."
  ],
  [
    "수학모델링",
    "သင်္ချာ ပုံစံ",
    "Numbers",
    "수학모델링을 수행합니다.",
    "I perform mathematical modeling."
  ]
];

// Filter out existing words
const newWords = allWords.filter(word => !existingKoreanWords.has(word[0]));

console.log(`Generated ${newWords.length} new words (out of ${allWords.length} total)`);

// Convert to dictionary format
const newEntries = newWords.map(word => {
  const [korean, myanmar, category, koreanExample, englishExample] = word;
  const entry = {
    korean: korean,
    myanmar: myanmar,
    category: category || 'General'
  };
  if (koreanExample) entry.koreanExample = koreanExample;
  if (englishExample) entry.englishExample = englishExample;
  return entry;
});

// Add to existing dictionary
const updatedDictionary = [...existingData, ...newEntries];

// Write to file
fs.writeFileSync(filePath, JSON.stringify(updatedDictionary, null, 2), 'utf8');

console.log(`Dictionary updated! Total entries: ${updatedDictionary.length}`);
console.log(`Added ${newEntries.length} new Korean words.`);

// Export utility functions for use in other scripts
module.exports = {
  getCategories,
  getExistingWords,
  filterDuplicates,
  addWordsByCategory,
  generateWordsForCategory,
  updateAppJs,
  updateDictionary,
  addWordsForAllCategories
};
