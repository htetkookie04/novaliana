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

// Advanced Korean words - NOT basic words, greetings, or basic verbs
// Format: [korean, myanmar, category, koreanExample, englishExample]
const advancedWords = [
  // Abstract Concepts & Philosophy
  ["철학", "ဒဿနိကဗေဒ", "Abstract concepts", "철학은 삶의 의미를 탐구합니다.", "Philosophy explores the meaning of life."],
  ["윤리", "ကျင့်ဝတ်", "Abstract concepts", "윤리적 판단이 필요합니다.", "Ethical judgment is needed."],
  ["도덕", "ကျင့်ဝတ်", "Abstract concepts", "도덕적 가치를 존중해야 합니다.", "We must respect moral values."],
  ["양심", "စိတ်နှလုံး", "Abstract concepts", "양심에 따라 행동하세요.", "Act according to your conscience."],
  ["정의", "တရားမျှတမှု", "Abstract concepts", "사회적 정의를 추구합니다.", "We pursue social justice."],
  ["자유", "လွတ်လပ်မှု", "Abstract concepts", "자유는 소중한 권리입니다.", "Freedom is a precious right."],
  ["평등", "ညီမျှမှု", "Abstract concepts", "모든 사람은 평등합니다.", "All people are equal."],
  ["존엄", "ဂုဏ်သိက္ခာ", "Abstract concepts", "인간의 존엄을 지켜야 합니다.", "We must protect human dignity."],
  
  // Advanced Emotions & Psychology
  ["열정", "စိတ်အားထက်သန်မှု", "Psychology", "그는 일에 대한 열정이 넘칩니다.", "He has overflowing passion for work."],
  ["동기", "စိတ်အားထက်သန်မှု", "Psychology", "학습 동기를 높여야 합니다.", "We must increase learning motivation."],
  ["자존감", "ကိုယ့်ကိုယ်ကို ယုံကြည်မှု", "Psychology", "자존감을 키우는 것이 중요합니다.", "Building self-esteem is important."],
  ["공감", "စာနာမှု", "Psychology", "다른 사람의 감정에 공감하세요.", "Empathize with others' emotions."],
  ["회복력", "ပြန်လည်ထူထောင်နိုင်စွမ်း", "Psychology", "어려움을 극복하는 회복력이 필요합니다.", "Resilience to overcome difficulties is needed."],
  ["인내", "စိတ်ရှည်မှု", "Psychology", "인내는 성공의 열쇠입니다.", "Patience is the key to success."],
  ["집중력", "စူးစိုက်မှု", "Psychology", "집중력을 향상시켜야 합니다.", "We must improve concentration."],
  ["창의성", "ဖန်တီးနိုင်စွမ်း", "Psychology", "창의성을 발휘하세요.", "Demonstrate creativity."],
  
  // Professional & Business Terms
  ["경영", "စီမံခန့်ခွဲမှု", "Business", "경영 전략을 수립했습니다.", "We established a management strategy."],
  ["마케팅", "စျေးကွက်ရှာဖွေရေး", "Business", "디지털 마케팅이 중요합니다.", "Digital marketing is important."],
  ["재무", "ဘဏ္ဍာရေး", "Business", "재무 상태를 점검하세요.", "Check your financial status."],
  ["투자", "ရင်းနှီးမြှုပ်နှံမှု", "Business", "장기 투자를 고려하세요.", "Consider long-term investment."],
  ["자산", "ပိုင်ဆိုင်မှု", "Business", "자산을 관리하는 것이 중요합니다.", "Managing assets is important."],
  ["부채", "ကြွေးမြီ", "Business", "부채를 줄여야 합니다.", "We must reduce debt."],
  ["수익", "အမြတ်", "Business", "수익이 증가했습니다.", "Profit has increased."],
  ["손실", "အရှုံး", "Business", "예상치 못한 손실이 발생했습니다.", "Unexpected loss occurred."],
  ["협상", "ညှိနှိုင်းမှု", "Business", "협상 기술이 필요합니다.", "Negotiation skills are needed."],
  ["계약", "စာချုပ်", "Business", "계약서를 검토하세요.", "Review the contract."],
  ["인수", "ဝယ်ယူမှု", "Business", "회사 인수를 검토 중입니다.", "We are reviewing company acquisition."],
  ["합병", "ပေါင်းစည်းမှု", "Business", "두 회사의 합병이 발표되었습니다.", "The merger of two companies was announced."],
  
  // Academic & Education
  ["학문", "ပညာရး", "Education", "학문적 탐구가 필요합니다.", "Academic inquiry is needed."],
  ["연구", "သုတေသန", "Education", "과학 연구를 진행 중입니다.", "We are conducting scientific research."],
  ["논문", "စာတမ်း", "Education", "논문을 발표했습니다.", "I presented a thesis."],
  ["이론", "သီအိုရီ", "Education", "이론을 실제에 적용하세요.", "Apply theory to practice."],
  ["실험", "စမ်းသပ်မှု", "Education", "실험 결과를 분석하세요.", "Analyze the experimental results."],
  ["가설", "အယူအဆ", "Education", "가설을 검증해야 합니다.", "We must verify the hypothesis."],
  ["분석", "ခွဲခြမ်းစိတ်ဖြာမှု", "Education", "데이터를 분석하세요.", "Analyze the data."],
  ["증명", "သက်သေပြမှု", "Education", "이론을 증명했습니다.", "I proved the theory."],
  ["논증", "အထောက်အထားပြမှု", "Education", "논증이 설득력이 있습니다.", "The argument is persuasive."],
  ["학술", "ပညာရး", "Education", "학술 회의에 참석했습니다.", "I attended an academic conference."],
  
  // Technology & Science
  ["알고리즘", "အယ်လ်ဂိုရီသမ်", "Technology", "효율적인 알고리즘을 개발했습니다.", "I developed an efficient algorithm."],
  ["프로그래밍", "ပရိုဂရမ်ရေးသားခြင်း", "Technology", "프로그래밍 언어를 배우세요.", "Learn programming languages."],
  ["데이터베이스", "ဒေတာဘေ့စ်", "Technology", "데이터베이스를 설계하세요.", "Design the database."],
  ["네트워크", "ကွန်ရက်", "Technology", "네트워크 보안이 중요합니다.", "Network security is important."],
  ["인공지능", "လူလုပ်ဉာဏ်ရည်", "Technology", "인공지능 기술이 발전했습니다.", "AI technology has advanced."],
  ["로봇공학", "ရိုဘော့အင်ဂျင်နီယာ", "Technology", "로봇공학을 연구합니다.", "I study robotics."],
  ["바이오테크놀로지", "ဇီဝနည်းပညာ", "Science", "바이오테크놀로지 산업이 성장 중입니다.", "The biotechnology industry is growing."],
  ["나노기술", "နာနိုနည်းပညာ", "Science", "나노기술의 응용이 확대됩니다.", "Applications of nanotechnology are expanding."],
  ["유전자", "မျိုးရိုးဗီဇ", "Science", "유전자 분석을 실시했습니다.", "We conducted genetic analysis."],
  ["분자", "မော်လီကျူး", "Science", "분자 구조를 연구합니다.", "I study molecular structure."],
  
  // Advanced Verbs (not basic)
  ["분석하다", "ခွဲခြမ်းစိတ်ဖြာသည်", "Advanced verbs", "문제를 분석하세요.", "Analyze the problem."],
  ["평가하다", "အကဲဖြတ်သည်", "Advanced verbs", "성과를 평가하세요.", "Evaluate the performance."],
  ["검토하다", "စစ်ဆေးသည်", "Advanced verbs", "문서를 검토하세요.", "Review the document."],
  ["검증하다", "အတည်ပြုသည်", "Advanced verbs", "정보를 검증하세요.", "Verify the information."],
  ["최적화하다", "အကောင်းဆုံးဖြစ်အောင် လုပ်သည်", "Advanced verbs", "시스템을 최적화하세요.", "Optimize the system."],
  ["통합하다", "ပေါင်းစည်းသည်", "Advanced verbs", "데이터를 통합하세요.", "Integrate the data."],
  ["구현하다", "အကောင်အထည်ဖော်သည်", "Advanced verbs", "계획을 구현하세요.", "Implement the plan."],
  ["개발하다", "ဖွံ့ဖြိုးစေသည်", "Advanced verbs", "새로운 기술을 개발하세요.", "Develop new technology."],
  ["혁신하다", "ဆန်းသစ်တီထွင်သည်", "Advanced verbs", "비즈니스를 혁신하세요.", "Innovate the business."],
  ["전문화하다", "အထူးပြုသည်", "Advanced verbs", "지식을 전문화하세요.", "Specialize your knowledge."],
  
  // Advanced Adjectives
  ["효율적인", "ထိရောက်သော", "Advanced adjectives", "효율적인 방법을 찾으세요.", "Find an efficient method."],
  ["체계적인", "စနစ်ကျသော", "Advanced adjectives", "체계적인 접근이 필요합니다.", "A systematic approach is needed."],
  ["전문적인", "ကျွမ်းကျင်သော", "Advanced adjectives", "전문적인 조언을 구하세요.", "Seek professional advice."],
  ["혁신적인", "ဆန်းသစ်သော", "Advanced adjectives", "혁신적인 아이디어입니다.", "It's an innovative idea."],
  ["지속가능한", "ရေရှည်တည်တံ့သော", "Advanced adjectives", "지속가능한 발전이 중요합니다.", "Sustainable development is important."],
  ["복합적인", "ရှုပ်ထွေးသော", "Advanced adjectives", "복합적인 문제를 해결하세요.", "Solve complex problems."],
  ["정교한", "အနုစိတ်သော", "Advanced adjectives", "정교한 설계가 필요합니다.", "Precise design is needed."],
  ["포괄적인", "ကျယ်ပြန့်သော", "Advanced adjectives", "포괄적인 계획을 수립하세요.", "Establish a comprehensive plan."],
  ["본질적인", "အခြေခံသော", "Advanced adjectives", "본질적인 문제를 파악하세요.", "Understand the fundamental problem."],
  ["전략적인", "နည်းဗျူဟာဆိုင်ရာ", "Advanced adjectives", "전략적인 사고가 필요합니다.", "Strategic thinking is needed."],
  
  // Legal & Government
  ["법률", "ဥပဒေ", "Legal", "법률을 준수하세요.", "Comply with the law."],
  ["헌법", "ဖွဲ့စည်းပုံအခြေခံဥပဒေ", "Legal", "헌법을 존중해야 합니다.", "We must respect the constitution."],
  ["소송", "တရားစွဲဆိုမှု", "Legal", "소송을 제기했습니다.", "I filed a lawsuit."],
  ["판결", "ဆုံးဖြတ်ချက်", "Legal", "법원의 판결을 기다립니다.", "We await the court's judgment."],
  ["변호사", "ရှေ့နေ", "Legal", "변호사를 선임하세요.", "Appoint a lawyer."],
  ["증인", "သက်သေ", "Legal", "증인을 소환했습니다.", "We summoned a witness."],
  ["증거", "အထောက်အထား", "Legal", "증거를 제시하세요.", "Present evidence."],
  ["정책", "မူဝါဒ", "Government", "정부 정책을 검토하세요.", "Review government policy."],
  ["입법", "ဥပဒေပြုရေး", "Government", "입법 과정에 참여합니다.", "I participate in the legislative process."],
  ["행정", "စီမံခန့်ခွဲရေး", "Government", "행정 개혁이 필요합니다.", "Administrative reform is needed."],
  
  // Medical & Health
  ["진단", "ရောဂါရှာဖွေမှု", "Medical", "정확한 진단이 중요합니다.", "Accurate diagnosis is important."],
  ["치료", "ကုသမှု", "Medical", "효과적인 치료를 받으세요.", "Receive effective treatment."],
  ["수술", "ခွဲစိတ်ကုသမှု", "Medical", "수술이 성공적으로 완료되었습니다.", "The surgery was completed successfully."],
  ["처방", "ဆေးညွှန်း", "Medical", "의사의 처방을 따르세요.", "Follow the doctor's prescription."],
  ["증상", "ရောဂါလက္ခဏာ", "Medical", "증상을 관찰하세요.", "Observe the symptoms."],
  ["면역", "ကိုယ်ခံအား", "Medical", "면역력을 강화하세요.", "Strengthen your immunity."],
  ["예방", "ကာကွယ်မှု", "Medical", "질병 예방이 중요합니다.", "Disease prevention is important."],
  ["재활", "ပြန်လည်ထူထောင်ရေး", "Medical", "재활 치료를 받습니다.", "I receive rehabilitation therapy."],
  ["영양", "အာဟာရ", "Medical", "균형 잡힌 영양을 섭취하세요.", "Consume balanced nutrition."],
  ["건강검진", "ကျန်းမာရေး စစ်ဆေးမှု", "Medical", "정기적인 건강검진을 받으세요.", "Get regular health checkups."],
  
  // Environment & Nature
  ["생태계", "ဂေဟစနစ်", "Environment", "생태계를 보호하세요.", "Protect the ecosystem."],
  ["환경보호", "ပတ်ဝန်းကျင် ကာကွယ်ရေး", "Environment", "환경보호에 참여하세요.", "Participate in environmental protection."],
  ["재생에너지", "ပြန်လည်ပြည့်ဖြိုးမြဲ စွမ်းအင်", "Environment", "재생에너지를 활용하세요.", "Utilize renewable energy."],
  ["지속가능성", "ရေရှည်တည်တံ့မှု", "Environment", "지속가능성을 고려하세요.", "Consider sustainability."],
  ["기후변화", "ရာသီဥတု ပြောင်းလဲမှု", "Environment", "기후변화에 대응하세요.", "Respond to climate change."],
  ["오염", "ညစ်ညမ်းမှု", "Environment", "환경 오염을 줄이세요.", "Reduce environmental pollution."],
  ["재활용", "ပြန်လည်အသုံးပြုမှု", "Environment", "재활용을 실천하세요.", "Practice recycling."],
  ["보전", "ထိန်းသိမ်းမှု", "Environment", "자연을 보전하세요.", "Conserve nature."],
  
  // Arts & Culture
  ["예술", "အနုပညာ", "Arts", "예술 작품을 감상하세요.", "Appreciate art works."],
  ["문학", "စာပေ", "Arts", "문학 작품을 읽으세요.", "Read literary works."],
  ["미술", "ပန်းချီ", "Arts", "미술 전시회에 가세요.", "Go to an art exhibition."],
  ["음악", "ဂီတ", "Arts", "클래식 음악을 듣습니다.", "I listen to classical music."],
  ["연극", "ပြဇာတ်", "Arts", "연극을 관람하세요.", "Watch a play."],
  ["무용", "ကခုန်မှု", "Arts", "무용 공연을 봅니다.", "I watch a dance performance."],
  ["조각", "ရုပ်တု", "Arts", "조각 작품을 만듭니다.", "I create sculpture works."],
  ["건축", "ဗိသုကာ", "Arts", "건축 디자인을 공부합니다.", "I study architectural design."],
  
  // Social & Society
  ["사회", "လူ့အဖွဲ့အစည်း", "Society", "사회 문제를 해결하세요.", "Solve social problems."],
  ["문화", "ယဉ်ကျေးမှု", "Society", "다양한 문화를 존중하세요.", "Respect diverse cultures."],
  ["전통", "ရိုးရာ", "Society", "전통을 보존하세요.", "Preserve traditions."],
  ["관습", "ထုံးတမ်း", "Society", "지역 관습을 이해하세요.", "Understand local customs."],
  ["정체성", "အထောက်အထား", "Society", "문화적 정체성을 찾으세요.", "Find your cultural identity."],
  ["다양성", "ကွဲပြားမှု", "Society", "다양성을 인정하세요.", "Recognize diversity."],
  ["포용", "လက်ခံမှု", "Society", "서로를 포용하세요.", "Embrace each other."],
  ["연대", "ညီညွတ်မှု", "Society", "사회적 연대가 필요합니다.", "Social solidarity is needed."],
  
  // More Advanced Technical Terms
  ["암호화", "လျှို့ဝှက်ကုဒ်", "Technology", "데이터를 암호화하세요.", "Encrypt the data."],
  ["해킹", "ဟက်ကာတိုက်ခိုက်မှု", "Technology", "해킹을 방지하세요.", "Prevent hacking."],
  ["클라우드", "ကလောက်ဒ်", "Technology", "클라우드 서비스를 이용하세요.", "Use cloud services."],
  ["빅데이터", "ကြီးမားသော ဒေတာ", "Technology", "빅데이터를 분석하세요.", "Analyze big data."],
  ["사이버보안", "ဆိုက်ဘာ လုံခြုံရေး", "Technology", "사이버보안이 중요합니다.", "Cybersecurity is important."],
  ["블록체인", "ဘလော့ခ်ချိန်း", "Technology", "블록체인 기술을 연구합니다.", "I study blockchain technology."],
  ["머신러닝", "စက်သင်ယူမှု", "Technology", "머신러닝 모델을 개발합니다.", "I develop machine learning models."],
  ["딥러닝", "နက်ရှိုင်းသော သင်ယူမှု", "Technology", "딥러닝 알고리즘을 적용하세요.", "Apply deep learning algorithms."],
  ["양자컴퓨팅", "ကွမ်တမ် ကွန်ပျူတာ", "Technology", "양자컴퓨팅의 잠재력이 큽니다.", "Quantum computing has great potential."],
  ["사물인터넷", "အင်တာနက် အရာဝတ္ထု", "Technology", "사물인터넷이 확산되고 있습니다.", "The Internet of Things is spreading."],
  
  // Advanced Medical Terms
  ["생명공학", "ဇီဝနည်းပညာ", "Medical", "생명공학 연구를 진행합니다.", "We conduct biotechnology research."],
  ["유전공학", "မျိုးရိုးဗီဇ အင်ဂျင်နီယာ", "Medical", "유전공학의 윤리를 논의합니다.", "We discuss the ethics of genetic engineering."],
  ["면역학", "ကိုယ်ခံအား သိပ္ပံ", "Medical", "면역학을 전공합니다.", "I major in immunology."],
  ["신경과학", "အာရုံကြော သိပ္ပံ", "Medical", "신경과학 연구소에서 일합니다.", "I work at a neuroscience research institute."],
  ["약리학", "ဆေးဝါး သိပ္ပံ", "Medical", "약리학을 공부합니다.", "I study pharmacology."],
  ["해부학", "ခန္ဓာဗေဒ", "Medical", "해부학 수업을 듣습니다.", "I attend anatomy classes."],
  ["생리학", "ဇီဝကမ္မဗေဒ", "Medical", "생리학 실험을 합니다.", "I conduct physiology experiments."],
  ["병리학", "ရောဂါဗေဒ", "Medical", "병리학 진단을 받았습니다.", "I received a pathology diagnosis."],
  ["방사선학", "ရေဒီယို", "Medical", "방사선학 검사를 받습니다.", "I undergo radiology examination."],
  ["정신의학", "စိတ်ရောဂါကုသမှု", "Medical", "정신의학 상담을 받습니다.", "I receive psychiatric counseling."],
  
  // Advanced Business & Economics
  ["경제학", "စီးပွားရေး သိပ္ပံ", "Business", "경제학을 전공합니다.", "I major in economics."],
  ["거시경제", "စုစုပေါင်း စီးပွားရေး", "Business", "거시경제 정책을 분석합니다.", "I analyze macroeconomic policies."],
  ["미시경제", "အသေးစား စီးပွားရေး", "Business", "미시경제 이론을 공부합니다.", "I study microeconomic theory."],
  ["금융", "ငွေရေး", "Business", "금융 시장을 모니터링합니다.", "I monitor financial markets."],
  ["증권", "ငွေစက္ကူ", "Business", "증권 거래를 합니다.", "I trade securities."],
  ["파생상품", "ဆင်းသက်လာသော ကုန်ပစ္စည်း", "Business", "파생상품 투자를 검토합니다.", "I review derivative investments."],
  ["헤지펀드", "အကာအကွယ် ရန်ပုံငွေ", "Business", "헤지펀드에 투자합니다.", "I invest in hedge funds."],
  ["벤처캐피털", "စွန့်စားရဲသော အရင်းအနှီး", "Business", "벤처캐피털을 유치합니다.", "We attract venture capital."],
  ["IPO", "ပထမဆုံး လူထုရောင်းချမှု", "Business", "IPO를 준비 중입니다.", "We are preparing for an IPO."],
  ["M&A", "ဝယ်ယူမှု နှင့် ပေါင်းစည်းမှု", "Business", "M&A 거래를 진행합니다.", "We proceed with M&A transactions."],
  
  // Advanced Academic Terms
  ["인문학", "လူသားတန်ဖိုး သိပ္ပံ", "Education", "인문학을 공부합니다.", "I study humanities."],
  ["사회과학", "လူမှုရေး သိပ္ပံ", "Education", "사회과학 연구를 합니다.", "I conduct social science research."],
  ["자연과학", "သဘာဝ သိပ္ပံ", "Education", "자연과학 실험을 합니다.", "I conduct natural science experiments."],
  ["공학", "အင်ဂျင်နီယာ", "Education", "공학을 전공합니다.", "I major in engineering."],
  ["인문사회과학", "လူသားတန်ဖိုး လူမှုရေး သိပ္ပံ", "Education", "인문사회과학 대학원에 다닙니다.", "I attend graduate school for humanities and social sciences."],
  ["석사", "မဟာဘွဲ့", "Education", "석사 학위를 받았습니다.", "I received a master's degree."],
  ["박사", "ဒေါက်တာ", "Education", "박사 학위를 취득합니다.", "I obtain a doctoral degree."],
  ["박사후", "ဒေါက်တာ နောက်ပိုင်း", "Education", "박사후 연구를 합니다.", "I conduct postdoctoral research."],
  ["학술지", "ပညာရး ဂျာနယ်", "Education", "학술지에 논문을 게재합니다.", "I publish a paper in an academic journal."],
  ["동료심사", "အကဲဖြတ်မှု", "Education", "동료심사를 통과했습니다.", "I passed peer review."],
  
  // Advanced Legal Terms
  ["헌법재판소", "ဖွဲ့စည်းပုံအခြေခံဥပဒေ တရားရုံး", "Legal", "헌법재판소에 제소했습니다.", "I filed a lawsuit with the Constitutional Court."],
  ["대법원", "အမြင့်ဆုံး တရားရုံး", "Legal", "대법원의 판결을 기다립니다.", "We await the Supreme Court's judgment."],
  ["법원", "တရားရုံး", "Legal", "법원에 출두합니다.", "I appear in court."],
  ["검찰", "ရှေ့နေချုပ်", "Legal", "검찰 수사를 받습니다.", "I undergo prosecution investigation."],
  ["경찰", "ရဲ", "Legal", "경찰에 신고합니다.", "I report to the police."],
  ["법령", "ဥပဒေ", "Legal", "법령을 준수하세요.", "Comply with laws and regulations."],
  ["조례", "ဒေသန္တရ ဥပဒေ", "Legal", "지역 조례를 확인하세요.", "Check local ordinances."],
  ["규정", "စည်းမျဉ်း", "Legal", "회사 규정을 따르세요.", "Follow company regulations."],
  ["법적구속력", "ဥပဒေအရ ချုပ်နှောင်မှု", "Legal", "법적구속력이 있습니다.", "It has legal binding force."],
  ["소멸시효", "အချိန်ကုန်ဆုံးမှု", "Legal", "소멸시효를 확인하세요.", "Check the statute of limitations."],
  
  // Advanced Environmental Terms
  ["탄소중립", "ကာဗွန် ကြားနေရေး", "Environment", "탄소중립을 달성합니다.", "We achieve carbon neutrality."],
  ["온실가스", "ဖန်လုံအိမ် ဓာတ်ငွေ့", "Environment", "온실가스 배출을 줄입니다.", "We reduce greenhouse gas emissions."],
  ["친환경", "ပတ်ဝန်းကျင် နှင့် သင့်လျော်သော", "Environment", "친환경 제품을 사용하세요.", "Use eco-friendly products."],
  ["재생가능", "ပြန်လည်ပြည့်ဖြိုးမြဲ", "Environment", "재생가능 에너지를 개발합니다.", "We develop renewable energy."],
  ["생물다양성", "ဇီဝမျိုးစုံမျိုးကွဲ", "Environment", "생물다양성을 보존하세요.", "Preserve biodiversity."],
  ["서식지", "နေထိုင်ရာ", "Environment", "야생동물 서식지를 보호하세요.", "Protect wildlife habitats."],
  ["멸종위기", "မျိုးသုဉ်းရန် အန္တရာယ်", "Environment", "멸종위기 종을 보호합니다.", "We protect endangered species."],
  ["자연보호구역", "သဘာဝ ကာကွယ်ထားသော နေရာ", "Environment", "자연보호구역을 방문합니다.", "I visit nature reserves."],
  ["환경영향평가", "ပတ်ဝန်းကျင် သက်ရောက်မှု အကဲဖြတ်ခြင်း", "Environment", "환경영향평가를 실시합니다.", "We conduct environmental impact assessment."],
  ["지속가능발전", "ရေရှည်တည်တံ့သော ဖွံ့ဖြိုးတိုးတက်မှု", "Environment", "지속가능발전 목표를 추구합니다.", "We pursue sustainable development goals."],
  
  // Advanced Psychology & Mental Health
  ["인지행동치료", "သိမြင်မှု အပြုအမူ ကုသမှု", "Psychology", "인지행동치료를 받습니다.", "I receive cognitive behavioral therapy."],
  ["트라우마", "စိတ်ဒဏ်ရာ", "Psychology", "트라우마를 극복합니다.", "I overcome trauma."],
  ["우울증", "စိတ်ဓာတ်ကျရောဂါ", "Psychology", "우울증 치료를 받습니다.", "I receive treatment for depression."],
  ["불안장애", "စိုးရိမ်ပူပန်မှု ရောဂါ", "Psychology", "불안장애를 관리합니다.", "I manage anxiety disorder."],
  ["강박증", "အတင်းအကျပ် ရောဂါ", "Psychology", "강박증 치료를 받습니다.", "I receive treatment for obsessive-compulsive disorder."],
  ["자폐스펙트럼", "အော်တစ်ဇင် စပါကထရမ်", "Psychology", "자폐스펙트럼 장애를 이해합니다.", "I understand autism spectrum disorder."],
  ["주의력결핍", "အာရုံစူးစိုက်မှု ချို့တဲ့မှု", "Psychology", "주의력결핍 과다행동장애를 진단받았습니다.", "I was diagnosed with attention deficit hyperactivity disorder."],
  ["인격장애", "ကိုယ်ရည်ကိုယ်သွေး ရောဂါ", "Psychology", "인격장애를 치료합니다.", "I treat personality disorder."],
  ["정신건강", "စိတ်ကျန်းမာရေး", "Psychology", "정신건강을 관리하세요.", "Manage your mental health."],
  ["심리상담", "စိတ်ပိုင်းဆိုင်ရာ အကြံပေးမှု", "Psychology", "심리상담을 받습니다.", "I receive psychological counseling."],
  
  // Advanced Arts & Literature
  ["문예창작", "စာပေ ဖန်တီးမှု", "Arts", "문예창작을 공부합니다.", "I study literary creation."],
  ["시학", "ကဗျာ သိပ္ပံ", "Arts", "시학을 전공합니다.", "I major in poetics."],
  ["수사학", "ဟောပြောမှု", "Arts", "수사학 기법을 배웁니다.", "I learn rhetorical techniques."],
  ["비평", "ဝေဖန်မှု", "Arts", "문학 비평을 작성합니다.", "I write literary criticism."],
  ["미학", "အလှအပ သိပ္ပံ", "Arts", "미학을 연구합니다.", "I study aesthetics."],
  ["예술사", "အနုပညာ သမိုင်း", "Arts", "예술사를 강의합니다.", "I lecture on art history."],
  ["조형예술", "ပုံဖော်အနုပညာ", "Arts", "조형예술 작품을 만듭니다.", "I create plastic art works."],
  ["공연예술", "ဖျော်ဖြေတင်ဆက်သော အနုပညာ", "Arts", "공연예술을 감상합니다.", "I appreciate performing arts."],
  ["영화학", "ရုပ်ရှင် သိပ္ပံ", "Arts", "영화학을 공부합니다.", "I study film studies."],
  ["음악학", "ဂီတ သိပ္ပံ", "Arts", "음악학을 전공합니다.", "I major in musicology."],
  
  // More Specialized Advanced Terms
  ["천체물리학", "နက္ခတ္တဗေဒ ရူပဗေဒ", "Science", "천체물리학을 연구합니다.", "I study astrophysics."],
  ["양자역학", "ကွမ်တမ် ရူပဗေဒ", "Science", "양자역학 이론을 공부합니다.", "I study quantum mechanics theory."],
  ["상대성이론", "အိုင်းစတိုင်း သီအိုရီ", "Science", "상대성이론을 이해합니다.", "I understand the theory of relativity."],
  ["유전체학", "မျိုးရိုးဗီဇ သိပ္ပံ", "Science", "유전체학 연구를 합니다.", "I conduct genomics research."],
  ["단백질체학", "ပရိုတိန်း သိပ္ပံ", "Science", "단백질체학을 전공합니다.", "I major in proteomics."],
  ["바이오인포매틱스", "ဇီဝသတင်းအချက်အလက်", "Science", "바이오인포매틱스를 활용합니다.", "I utilize bioinformatics."],
  ["나노의학", "နာနို ဆေးပညာ", "Medical", "나노의학 기술을 개발합니다.", "We develop nanomedicine technology."],
  ["정밀의학", "တိကျသော ဆေးပညာ", "Medical", "정밀의학 치료를 받습니다.", "I receive precision medicine treatment."],
  ["면역요법", "ကိုယ်ခံအား ကုသမှု", "Medical", "면역요법을 시도합니다.", "I try immunotherapy."],
  ["유전자치료", "မျိုးရိုးဗီဇ ကုသမှု", "Medical", "유전자치료 연구를 합니다.", "I conduct gene therapy research."],
  
  // Advanced Engineering
  ["로봇공학", "ရိုဘော့အင်ဂျင်နီယာ", "Technology", "로봇공학을 전공합니다.", "I major in robotics engineering."],
  ["항공우주공학", "လေကြောင်း အာကာသ အင်ဂျင်နီယာ", "Technology", "항공우주공학을 공부합니다.", "I study aerospace engineering."],
  ["생체공학", "ဇီဝ အင်ဂျင်နီယာ", "Technology", "생체공학 연구를 합니다.", "I conduct biomedical engineering research."],
  ["재료공학", "ပစ္စည်း အင်ဂျင်နီယာ", "Technology", "재료공학을 전공합니다.", "I major in materials engineering."],
  ["화학공학", "ဓာတုဗေဒ အင်ဂျင်နီယာ", "Technology", "화학공학 실험을 합니다.", "I conduct chemical engineering experiments."],
  ["전자공학", "အီလက်ထရွန်နစ် အင်ဂျင်နီယာ", "Technology", "전자공학을 공부합니다.", "I study electronic engineering."],
  ["컴퓨터공학", "ကွန်ပျူတာ အင်ဂျင်နီယာ", "Technology", "컴퓨터공학을 전공합니다.", "I major in computer engineering."],
  ["토목공학", "အဆောက်အဦ အင်ဂျင်နီယာ", "Technology", "토목공학 프로젝트를 진행합니다.", "I proceed with civil engineering projects."],
  ["환경공학", "ပတ်ဝန်းကျင် အင်ဂျင်နီယာ", "Technology", "환경공학 솔루션을 개발합니다.", "We develop environmental engineering solutions."],
  ["산업공학", "စက်မှု အင်ဂျင်နီယာ", "Technology", "산업공학을 연구합니다.", "I study industrial engineering."],
  
  // Advanced Social Sciences
  ["정치학", "နိုင်ငံရေး သိပ္ပံ", "Society", "정치학을 전공합니다.", "I major in political science."],
  ["사회학", "လူမှုရေး သိပ္ပံ", "Society", "사회학 연구를 합니다.", "I conduct sociology research."],
  ["인류학", "လူသားဗေဒ", "Society", "인류학을 공부합니다.", "I study anthropology."],
  ["고고학", "ရှေးဟောင်း သုတေသန", "Society", "고고학 발굴을 합니다.", "I conduct archaeological excavations."],
  ["언어학", "ဘာသာဗေဒ", "Society", "언어학을 전공합니다.", "I major in linguistics."],
  ["심리학", "စိတ်ပညာ", "Psychology", "심리학 실험을 합니다.", "I conduct psychology experiments."],
  ["인지심리학", "သိမြင်မှု စိတ်ပညာ", "Psychology", "인지심리학을 연구합니다.", "I study cognitive psychology."],
  ["발달심리학", "ဖွံ့ဖြိုးမှု စိတ်ပညာ", "Psychology", "발달심리학을 공부합니다.", "I study developmental psychology."],
  ["임상심리학", "ကုသမှု စိတ်ပညာ", "Psychology", "임상심리학을 전공합니다.", "I major in clinical psychology."],
  ["사회심리학", "လူမှုရေး စိတ်ပညာ", "Psychology", "사회심리학 연구를 합니다.", "I conduct social psychology research."],
  
  // Advanced Business & Management
  ["경영정보시스템", "စီမံခန့်ခွဲမှု သတင်းအချက်အလက် စနစ်", "Business", "경영정보시스템을 구축합니다.", "We build management information systems."],
  ["인사관리", "လူ့စွမ်းအား စီမံခန့်ခွဲမှု", "Business", "인사관리 정책을 수립합니다.", "We establish human resource management policies."],
  ["조직행동론", "အဖွဲ့အစည်း အပြုအမူ", "Business", "조직행동론을 강의합니다.", "I lecture on organizational behavior."],
  ["전략경영", "နည်းဗျူဟာ စီမံခန့်ခွဲမှု", "Business", "전략경영을 연구합니다.", "I study strategic management."],
  ["혁신경영", "ဆန်းသစ်တီထွင် စီမံခန့်ခွဲမှု", "Business", "혁신경영을 실천합니다.", "We practice innovation management."],
  ["품질관리", "အရည်အသွေး စီမံခန့်ခွဲမှု", "Business", "품질관리 시스템을 도입합니다.", "We introduce quality management systems."],
  ["공급망관리", "ထောက်ပံ့မှု ကွင်းဆက် စီမံခန့်ခွဲမှု", "Business", "공급망관리를 최적화합니다.", "We optimize supply chain management."],
  ["리스크관리", "အန္တရာယ် စီမံခန့်ခွဲမှု", "Business", "리스크관리 전략을 수립합니다.", "We establish risk management strategies."],
  ["지식경영", "အသိပညာ စီမံခန့်ခွဲမှု", "Business", "지식경영을 도입합니다.", "We introduce knowledge management."],
  ["변화관리", "ပြောင်းလဲမှု စီမံခန့်ခွဲမှု", "Business", "변화관리가 필요합니다.", "Change management is needed."],
  
  // Advanced Legal & Government
  ["국제법", "နိုင်ငံတကာ ဥပဒေ", "Legal", "국제법을 전공합니다.", "I major in international law."],
  ["헌법학", "ဖွဲ့စည်းပုံအခြေခံဥပဒေ သိပ္ပံ", "Legal", "헌법학을 연구합니다.", "I study constitutional law."],
  ["행정법", "စီမံခန့်ခွဲရေး ဥပဒေ", "Legal", "행정법을 공부합니다.", "I study administrative law."],
  ["형법", "ရာဇဝတ်ဥပဒေ", "Legal", "형법을 전공합니다.", "I major in criminal law."],
  ["민법", "ပြည်သူ့ ဥပဒေ", "Legal", "민법 조문을 해석합니다.", "I interpret civil law provisions."],
  ["상법", "ကုန်သွယ်ရေး ဥပဒေ", "Legal", "상법을 연구합니다.", "I study commercial law."],
  ["노동법", "အလုပ်သမား ဥပဒေ", "Legal", "노동법을 전공합니다.", "I major in labor law."],
  ["지적재산권", "ဉာဏပစ္စည်း ပိုင်ဆိုင်ခွင့်", "Legal", "지적재산권을 보호하세요.", "Protect intellectual property rights."],
  ["특허", "မူပိုင်ခွင့်", "Legal", "특허를 출원합니다.", "I file a patent application."],
  ["상표권", "ကုန်အမှတ်တံဆိပ် ခွင့်", "Legal", "상표권을 등록합니다.", "I register trademark rights."],
  
  // Advanced Environmental & Energy
  ["태양광", "နေရောင်ခြည်", "Environment", "태양광 발전을 설치합니다.", "We install solar power generation."],
  ["풍력", "လေအား", "Environment", "풍력 에너지를 활용합니다.", "We utilize wind energy."],
  ["수력", "ရေအား", "Environment", "수력 발전소를 건설합니다.", "We build hydroelectric power plants."],
  ["지열", "မြေအောက်အပူ", "Environment", "지열 에너지를 개발합니다.", "We develop geothermal energy."],
  ["원자력", "နျူကလီးယား", "Environment", "원자력 발전을 논의합니다.", "We discuss nuclear power generation."],
  ["에너지효율", "စွမ်းအင် ထိရောက်မှု", "Environment", "에너지효율을 높입니다.", "We increase energy efficiency."],
  ["탄소배출", "ကာဗွန် ထုတ်လွှတ်မှု", "Environment", "탄소배출을 감소시킵니다.", "We reduce carbon emissions."],
  ["대기오염", "လေထု ညစ်ညမ်းမှု", "Environment", "대기오염을 모니터링합니다.", "We monitor air pollution."],
  ["수질오염", "ရေအရည်အသွေး ညစ်ညမ်းမှု", "Environment", "수질오염을 방지합니다.", "We prevent water pollution."],
  ["토양오염", "မြေဆီလွှာ ညစ်ညမ်းမှု", "Environment", "토양오염을 정화합니다.", "We purify soil pollution."],
];

// Filter out existing words
const newWords = advancedWords.filter(word => !existingKoreanWords.has(word[0]));

console.log(`Generated ${newWords.length} new advanced words (out of ${advancedWords.length} total)`);

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

