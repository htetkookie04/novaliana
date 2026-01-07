const fs = require('fs');
const path = require('path');

// ============================================================================
// CATEGORY WORDS DATA - Comprehensive word lists for all categories
// ============================================================================
// Format: [korean, myanmar, category, koreanExample, englishExample]
// Each category has multiple advanced words

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
// ADVANCED WORDS BY CATEGORY - One advanced word per category
// ============================================================================
// Format: [korean, myanmar, category, koreanExample, englishExample]
// One word per category for quick generation

const advancedWordsByCategory = {
  "Abstract concepts": ["현상학적환원", "ဖြစ်ရပ် လျှော့ချမှု", "Abstract concepts", "현상학적환원을 수행합니다.", "I perform phenomenological reduction."],
  "Academic & Intellectual": ["지식구조론", "အသိပညာ ဖွဲ့စည်းပုံ", "Academic & Intellectual", "지식구조론을 연구합니다.", "I study knowledge structure theory."],
  "Advanced adjectives": ["선구적인", "ရှေ့ဆောင်သော", "Advanced adjectives", "선구적인 연구가 필요합니다.", "Pioneering research is needed."],
  "Advanced verbs": ["융성하다", "ဖွံ့ဖြိုးသည်", "Advanced verbs", "산업이 융성합니다.", "The industry flourishes."],
  "Advanced vocabulary": ["패러다임전환", "စံနမူနာ ပြောင်းလဲမှု", "Advanced vocabulary", "패러다임전환을 경험합니다.", "I experience a paradigm shift."],
  "Agriculture": ["농업생물학", "စိုက်ပျိုးရေး ဇီဝ", "Agriculture", "농업생물학을 연구합니다.", "I study agricultural biology."],
  "Animals": ["동물복지학", "တိရစ္ဆာန် ကောင်းကျိုး", "Animals", "동물복지학을 연구합니다.", "I study animal welfare science."],
  "Architecture": ["모듈러건축", "အစိတ်အပိုင်း ဗိသုကာ", "Architecture", "모듈러건축을 설계합니다.", "I design modular architecture."],
  "Arts": ["예술치료학", "အနုပညာ ကုသမှု", "Arts", "예술치료학을 실천합니다.", "I practice art therapy."],
  "Biology": ["생태학", "ဂေဟစနစ်", "Biology", "생태학을 연구합니다.", "I study ecology."],
  "Body": ["신경해부학", "အာရုံကြော ခန္ဓာဗေဒ", "Body", "신경해부학을 공부합니다.", "I study neuroanatomy."],
  "Business": ["기업문화", "လုပ်ငန်း ယဉ်ကျေးမှု", "Business", "기업문화를 구축합니다.", "I build corporate culture."],
  "Business & Economics": ["공공경제학", "အများပြည်သူ စီးပွားရေး", "Business & Economics", "공공경제학을 연구합니다.", "I study public economics."],
  "Chemistry": ["무기화학", "အော်ဂဲနစ် မဟုတ်သော ဓာတုဗေဒ", "Chemistry", "무기화학을 연구합니다.", "I study inorganic chemistry."],
  "Clothing": ["스마트패션", "စမတ် ဖက်ရှင်", "Clothing", "스마트패션을 개발합니다.", "I develop smart fashion."],
  "Colors": ["색채공간론", "အရောင် နေရာ", "Colors", "색채공간론을 연구합니다.", "I study color space theory."],
  "Communication": ["비언어커뮤니케이션", "စကားမပြော ဆက်သွယ်ရေး", "Communication", "비언어커뮤니케이션을 분석합니다.", "I analyze nonverbal communication."],
  "Communication & Media": ["미디어법학", "မီဒီယာ ဥပဒေ", "Communication & Media", "미디어법학을 연구합니다.", "I study media law."],
  "Computer Science": ["프로그래밍언어", "ကွန်ပျူတာ ဘာသာစကား", "Computer Science", "프로그래밍언어를 개발합니다.", "I develop programming languages."],
  "Culture & Arts": ["문화정체성", "ယဉ်ကျေးမှု ကိုယ်ပိုင်", "Culture & Arts", "문화정체성을 탐구합니다.", "I explore cultural identity."],
  "Daily conversation": ["대화전략", "စကားပြောဆို နည်းဗျူဟာ", "Daily conversation", "대화전략을 학습합니다.", "I learn conversation strategies."],
  "Economics": ["화폐경제학", "ငွေကြေး စီးပွားရေး", "Economics", "화폐경제학을 연구합니다.", "I study monetary economics."],
  "Education": ["디지털교육", "ဒစ်ဂျစ်တယ် ပညာရေး", "Education", "디지털교육을 실시합니다.", "I implement digital education."],
  "Education & Research": ["교육과정론", "ပညာရေး သင်ရိုး", "Education & Research", "교육과정론을 연구합니다.", "I study curriculum theory."],
  "Emotions": ["감정표현", "စိတ်ခံစားမှု ဖော်ပြမှု", "Emotions", "감정표현을 개발합니다.", "I develop emotional expression."],
  "Engineering": ["건축공학", "ဗိသုကာ အင်ဂျင်နီယာ", "Engineering", "건축공학을 적용합니다.", "I apply architectural engineering."],
  "Environment": ["환경정책학", "ပတ်ဝန်းကျင် မူဝါဒ", "Environment", "환경정책학을 연구합니다.", "I study environmental policy."],
  "Environment & Nature": ["생태복원학", "ဂေဟစနစ် ပြန်လည်ထူထောင်မှု", "Environment & Nature", "생태복원학을 연구합니다.", "I study ecological restoration."],
  "Environmental Science": ["환경복원학", "ပတ်ဝန်းကျင် ပြန်လည်ထူထောင်မှု", "Environmental Science", "환경복원학을 연구합니다.", "I study environmental restoration."],
  "Family": ["가족상담학", "မိသားစု အကြံပေးမှု", "Family", "가족상담학을 실천합니다.", "I practice family counseling."],
  "Film Studies": ["영화제작학", "ရုပ်ရှင် ထုတ်လုပ်မှု", "Film Studies", "영화제작학을 연구합니다.", "I study film production."],
  "Finance": ["재무관리", "ငွေကြေး စီမံခန့်ခွဲမှု", "Finance", "재무관리를 수행합니다.", "I perform financial management."],
  "Food": ["분자요리학", "မော်လီကျူး ချက်ပြုတ်မှု", "Food", "분자요리학을 연구합니다.", "I study molecular gastronomy."],
  "General": ["융합적사고", "ပေါင်းစည်းထားသော စဉ်းစားမှု", "General", "융합적사고를 개발합니다.", "I develop convergent thinking."],
  "Geography": ["인문지리학", "လူသား ပထဝီဝင်", "Geography", "인문지리학을 연구합니다.", "I study human geography."],
  "Government": ["정부혁신", "အစိုးရ ဆန်းသစ်မှု", "Government", "정부혁신을 추진합니다.", "I promote government innovation."],
  "Health": ["웰빙", "ကောင်းမွန်သော နေထိုင်မှု", "Health", "웰빙을 추구합니다.", "I pursue wellness."],
  "History": ["구술역사", "နှုတ်ပြော သမိုင်း", "History", "구술역사를 기록합니다.", "I record oral history."],
  "History & Time": ["시간사회학", "အချိန် လူမှုရေး", "History & Time", "시간사회학을 연구합니다.", "I study sociology of time."],
  "Hobbies": ["취미치료", "အပန်းဖြေ ကုသမှု", "Hobbies", "취미치료를 시행합니다.", "I perform hobby therapy."],
  "Home": ["홈디자인", "အိမ် ဒီဇိုင်း", "Home", "홈디자인을 계획합니다.", "I plan home design."],
  "Law": ["국제법학", "နိုင်ငံတကာ ဥပဒေ", "Law", "국제법학을 연구합니다.", "I study international law."],
  "Legal": ["법경제학", "ဥပဒေ စီးပွားရေး", "Legal", "법경제학을 연구합니다.", "I study law and economics."],
  "Legal & Administrative": ["규제행정", "စည်းမျဉ်း စီမံခန့်ခွဲမှု", "Legal & Administrative", "규제행정을 강화합니다.", "I strengthen regulatory administration."],
  "Linguistics": ["언어학습", "ဘာသာစကား သင်ယူမှု", "Linguistics", "언어학습을 연구합니다.", "I study language acquisition."],
  "Literature": ["문학이론", "စာပေ သီအိုရီ", "Literature", "문학이론을 연구합니다.", "I study literary theory."],
  "Mathematics": ["집합론", "စုစည်းမှု", "Mathematics", "집합론을 공부합니다.", "I study set theory."],
  "Medical": ["응급의학", "အရေးပေါ် ဆေးပညာ", "Medical", "응급의학을 실천합니다.", "I practice emergency medicine."],
  "Medical & Health": ["건강증진학", "ကျန်းမာရေး တိုးတက်မှု", "Medical & Health", "건강증진학을 연구합니다.", "I study health promotion."],
  "Medicine": ["내과학", "အတွင်း ဆေးပညာ", "Medicine", "내과학을 연구합니다.", "I study internal medicine."],
  "Music": ["음악인지과학", "ဂီတ သိမြင်မှု သိပ္ပံ", "Music", "음악인지과학을 연구합니다.", "I study music cognition science."],
  "Nature": ["자연관찰", "သဘာဝ လေ့လာမှု", "Nature", "자연관찰을 수행합니다.", "I perform nature observation."],
  "Numbers": ["계산학", "တွက်ချက်မှု", "Numbers", "계산학을 연구합니다.", "I study computational science."],
  "Philosophy": ["현대철학", "ခေတ်သစ် ဒဿနိကဗေဒ", "Philosophy", "현대철학을 탐구합니다.", "I explore modern philosophy."],
  "Philosophy & Ethics": ["의료윤리", "ဆေးကုသမှု ကျင့်ဝတ်", "Philosophy & Ethics", "의료윤리를 연구합니다.", "I study medical ethics."],
  "Physics": ["열역학", "အပူ လှုပ်ရှားမှု", "Physics", "열역학을 연구합니다.", "I study thermodynamics."],
  "Political Science": ["국제관계학", "နိုင်ငံတကာ ဆက်ဆံရေး", "Political Science", "국제관계학을 연구합니다.", "I study international relations."],
  "Psychology": ["이상심리학", "ပုံမှန် မဟုတ်သော စိတ်ပညာ", "Psychology", "이상심리학을 연구합니다.", "I study abnormal psychology."],
  "Religious Studies": ["종교비교학", "ဘာသာရေး နှိုင်းယှဉ်မှု", "Religious Studies", "종교비교학을 연구합니다.", "I study comparative religion."],
  "Science": ["기초과학", "အခြေခံ သိပ္ပံ", "Science", "기초과학을 연구합니다.", "I study basic science."],
  "Science & Space": ["우주탐사학", "အာကာသ ရှာဖွေမှု", "Science & Space", "우주탐사학을 연구합니다.", "I study space exploration."],
  "Shopping": ["소비자심리학", "စားသုံးသူ စိတ်ပညာ", "Shopping", "소비자심리학을 연구합니다.", "I study consumer psychology."],
  "Social & Political": ["사회운동", "လူမှုရေး လှုပ်ရှားမှု", "Social & Political", "사회운동을 분석합니다.", "I analyze social movements."],
  "Social Science": ["민족지학", "လူမျိုး", "Social Science", "민족지학을 연구합니다.", "I study ethnography."],
  "Society": ["사회변화", "လူမှုရေး ပြောင်းလဲမှု", "Society", "사회변화를 분석합니다.", "I analyze social change."],
  "Sociology": ["농촌사회학", "ကျေးလက် လူမှုရေး", "Sociology", "농촌사회학을 연구합니다.", "I study rural sociology."],
  "Sports": ["스포츠트레이닝", "အားကစား လေ့ကျင့်မှု", "Sports", "스포츠트레이닝을 연구합니다.", "I study sports training."],
  "Technology": ["바이오기술", "ဇီဝ နည်းပညာ", "Technology", "바이오기술을 개발합니다.", "I develop biotechnology."],
  "Technology & IT": ["암호학", "လျှို့ဝှက်ကုဒ်", "Technology & IT", "암호학을 연구합니다.", "I study cryptography."],
  "Time": ["시간관리학", "အချိန် စီမံခန့်ခွဲမှု", "Time", "시간관리학을 연구합니다.", "I study time management."],
  "Travel": ["에코투어리즘", "ဂေဟစနစ် ခရီးသွား", "Travel", "에코투어리즘을 추진합니다.", "I promote ecotourism."],
  "Weather": ["기상예보학", "ရာသီဥတု ခန့်မှန်းမှု", "Weather", "기상예보학을 연구합니다.", "I study weather forecasting."],
  "Work": ["조직심리학", "အဖွဲ့အစည်း စိတ်ပညာ", "Work", "조직심리학을 연구합니다.", "I study organizational psychology."],
};

// ============================================================================
// UTILITY FUNCTIONS - Combined from all generation files
// ============================================================================

/**
 * Get all unique categories from dictionary
 */
function getCategories() {
  const dictPath = path.join(__dirname, '..', 'public', 'data', 'data.json');
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
  const dictPath = path.join(__dirname, '..', 'public', 'data', 'data.json');
  let existingData = [];
  try {
    existingData = JSON.parse(fs.readFileSync(dictPath, 'utf8'));
  } catch (err) {
    existingData = [];
  }
  
  const existingKoreanWords = new Set(existingData.map(entry => entry.korean));
  
  const appJsPath = path.join(__dirname, 'app-engine.js');
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
  
  const appJsPath = path.join(__dirname, 'app-engine.js');
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
 * Update data.json with new words
 */
function updateDictionary(newWords) {
  if (!newWords || newWords.length === 0) {
    console.log('No new words to add to dictionary');
    return false;
  }
  
  const filePath = path.join(__dirname, '..', 'public', 'data', 'data.json');
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
 * This function processes all words from categoryWordsData and adds new ones to app.js and data.json
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
    console.log(`\n✓ Updated app.js and data.json with ${totalAdded} new words`);
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



/**
 * Generate and add 1 advanced word per category
 * This function processes advancedWordsByCategory and adds new ones to data.json
 */
function generateAdvancedWords() {
  console.log('\n=== Generating 1 Advanced Word Per Category ===\n');
  
  const categories = getCategories();
  const existing = getExistingWords();
  const existingWords = new Set([...existing.dictWords, ...existing.appWords]);
  
  console.log(`Total categories: ${categories.length}`);
  console.log(`Existing dictionary words: ${existingWords.size}\n`);
  
  const newWords = [];
  let addedCount = 0;
  let duplicateCount = 0;
  
  categories.forEach((category, idx) => {
    const wordData = advancedWordsByCategory[category];
    
    if (!wordData) {
      console.log(`[${idx + 1}/${categories.length}] ${category}: No advanced word defined`);
      return;
    }
    
    const korean = wordData[0];
    
    if (existingWords.has(korean)) {
      duplicateCount++;
      console.log(`[${idx + 1}/${categories.length}] ${category}: "${korean}" already exists (duplicate)`);
    } else {
      newWords.push(wordData);
      addedCount++;
      console.log(`[${idx + 1}/${categories.length}] ${category}: "${korean}" - NEW`);
    }
  });
  
  console.log(`\n=== Summary ===`);
  console.log(`Categories processed: ${categories.length}`);
  console.log(`New words to add: ${addedCount}`);
  console.log(`Duplicates filtered: ${duplicateCount}`);
  
  if (newWords.length > 0) {
    updateDictionary(newWords);
    console.log(`\n✓ Successfully added ${newWords.length} new advanced words to data.json`);
  } else {
    console.log(`\n⚠ No new words to add (all are duplicates)`);
  }
  
  return { added: addedCount, duplicates: duplicateCount, total: categories.length };
}

/**
 * Generate and filter new words by category (from generate-new-words.js)
 * Returns filtered words that don't exist in dictionary or app-engine.js
 */
function generateAndFilterNewWords() {
  const dataPath = path.join(__dirname, '..', 'public', 'data', 'data.json');
  const appEnginePath = path.join(__dirname, 'app-engine.js');
  
  let data = [];
  try {
    data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (err) {
    console.log('No existing dictionary found');
  }
  
  let appEngine = '';
  try {
    appEngine = fs.readFileSync(appEnginePath, 'utf8');
  } catch (err) {
    console.log('Could not read app-engine.js');
  }
  
  // Get all existing Korean words from dictionary
  const existingWords = new Set(data.map(e => e.korean));
  
  // Extract words from advancedWordsByCategory in app-engine.js
  const match = appEngine.match(/const advancedWordsByCategory = \{([\s\S]*?)\};/);
  if (match) {
    const content = match[1];
    const lines = content.split('\n');
    lines.forEach(line => {
      const wordMatch = line.match(/\["([^"]+)"/);
      if (wordMatch) {
        existingWords.add(wordMatch[1]);
      }
    });
  }
  
  console.log(`Total existing words: ${existingWords.size}`);
  
  // Filter out duplicates from advancedWordsByCategory
  const filteredNewWords = {};
  let duplicatesFound = 0;
  let newWordsCount = 0;
  
  Object.entries(advancedWordsByCategory).forEach(([category, wordData]) => {
    if (!wordData) {
      console.log(`⚠ No word defined for category: ${category}`);
      return;
    }
    
    const korean = wordData[0];
    if (existingWords.has(korean)) {
      duplicatesFound++;
      console.log(`✗ ${category}: "${korean}" already exists (duplicate)`);
    } else {
      filteredNewWords[category] = wordData;
      newWordsCount++;
      existingWords.add(korean); // Add to set to avoid duplicates within new words
      console.log(`✓ ${category}: "${korean}" - NEW`);
    }
  });
  
  console.log(`\n=== Summary ===`);
  console.log(`Total categories: ${Object.keys(advancedWordsByCategory).length}`);
  console.log(`New unique words: ${newWordsCount}`);
  console.log(`Duplicates filtered: ${duplicatesFound}`);
  
  return { filteredNewWords, newWordsCount, duplicatesFound };
}

/**
 * Add filtered new words to app-engine.js and data.json (from add-new-words.js)
 * This function combines the logic from add-new-words.js
 */
function addFilteredNewWords(filteredNewWords) {
  if (!filteredNewWords || Object.keys(filteredNewWords).length === 0) {
    console.log('No new words to add');
    return false;
  }
  
  const newWords = Object.values(filteredNewWords);
  
  console.log(`\n=== Adding ${newWords.length} new words to app-engine.js and data.json ===\n`);
  
  // Update app-engine.js
  const appEnginePath = path.join(__dirname, 'app-engine.js');
  let appEngine = fs.readFileSync(appEnginePath, 'utf8');
  
  // Find the advancedWordsByCategory object and update it
  const match = appEngine.match(/(const advancedWordsByCategory = \{[\s\S]*?\};)/);
  if (match) {
    // Build new words string
    let newWordsString = '';
    Object.entries(filteredNewWords).forEach(([category, wordData]) => {
      const [korean, myanmar, cat, koreanExample, englishExample] = wordData;
      newWordsString += `  "${category}": ["${korean}", "${myanmar}", "${cat}", "${koreanExample}", "${englishExample}"],\n`;
    });
    
    // Replace the entire advancedWordsByCategory object
    const newAdvancedWords = `const advancedWordsByCategory = {\n${newWordsString}};`;
    appEngine = appEngine.replace(/const advancedWordsByCategory = \{[\s\S]*?\};/, newAdvancedWords);
    
    fs.writeFileSync(appEnginePath, appEngine, 'utf8');
    console.log(`✓ Updated app-engine.js with ${newWords.length} new words`);
  } else {
    console.error('Could not find advancedWordsByCategory in app-engine.js');
    return false;
  }
  
  // Update data.json using the updateDictionary function
  const result = updateDictionary(newWords);
  
  if (result) {
    console.log(`✓ Successfully added ${newWords.length} new words to data.json`);
  } else {
    console.log('⚠ No new words were added to data.json (may already exist)');
  }
  
  console.log(`\n=== Complete ===`);
  console.log(`Total new words processed: ${newWords.length}`);
  
  return true;
}

/**
 * Combined function: Generate, filter, and add new words
 * This combines the functionality of generate-new-words.js and add-new-words.js
 */
function generateAndAddNewWords() {
  const { filteredNewWords, newWordsCount, duplicatesFound } = generateAndFilterNewWords();
  
  if (newWordsCount > 0) {
    return addFilteredNewWords(filteredNewWords);
  } else {
    console.log('\n⚠ No new words to add (all are duplicates)');
    return false;
  }
}

// ============================================================================
// MODULE EXPORTS
// ============================================================================

module.exports = {
  getCategories,
  getExistingWords,
  filterDuplicates,
  addWordsByCategory,
  generateWordsForCategory,
  updateAppJs,
  updateDictionary,
  addWordsForAllCategories,
  generateAdvancedWords,
  generateAndFilterNewWords,
  addFilteredNewWords,
  generateAndAddNewWords,
  categoryWordsData,
  advancedWordsByCategory
};
