// AI-Q 진단 8문항

export type AIQOption = { text: string; score: number };
export type AIQQuestion = { q: string; options: AIQOption[] };
export type AIQGrade = 'S' | 'A' | 'B' | 'C';
export type AIQResult = {
  grade: AIQGrade;
  title: string;
  desc: string;
  recommendation: string;
  color: string;
};

export const aiqQuestions: AIQQuestion[] = [
  {
    q: 'AI 도구(ChatGPT, Claude 등)를 업무에 사용하는 직원 비율은?',
    options: [
      { text: '80% 이상 — 대부분 사용', score: 4 },
      { text: '50~80% — 절반 넘게 사용', score: 3 },
      { text: '20~50% — 일부 사용', score: 2 },
      { text: '20% 미만 — 거의 안 씀', score: 1 },
    ],
  },
  {
    q: '리더(팀장 이상)가 본인 업무에 AI를 적극 활용하나요?',
    options: [
      { text: '거의 모든 리더가 일상적으로 활용', score: 4 },
      { text: '절반 정도 활용', score: 3 },
      { text: '일부만 활용, 대부분은 도구만 인지', score: 2 },
      { text: '거의 활용 안 함', score: 1 },
    ],
  },
  {
    q: '조직에서 AI 관련 교육을 받은 경험이 있나요?',
    options: [
      { text: '체계적인 교육 프로그램이 있고 정기적으로 진행', score: 4 },
      { text: '일부 팀이나 직군 대상 교육 경험 있음', score: 3 },
      { text: '외부 세미나 참석 정도의 수준', score: 2 },
      { text: '교육 경험 없음', score: 1 },
    ],
  },
  {
    q: '실제 업무 프로세스에 AI가 통합되어 있나요?',
    options: [
      { text: '핵심 워크플로우에 AI가 깊게 통합됨', score: 4 },
      { text: '일부 업무에서 AI를 반복 사용', score: 3 },
      { text: '개인별로 간헐적 활용', score: 2 },
      { text: '거의 사용하지 않음', score: 1 },
    ],
  },
  {
    q: 'AI 결과물의 품질을 검토·관리하는 체계가 있나요?',
    options: [
      { text: '검증 프로세스와 담당자가 명확히 있음', score: 4 },
      { text: '비공식적으로 팀 내에서 검토함', score: 3 },
      { text: '개인 판단에 맡기는 수준', score: 2 },
      { text: '특별한 검토 없이 그대로 사용', score: 1 },
    ],
  },
  {
    q: '조직 내 AI 사용에 관한 정책이나 가이드라인이 있나요?',
    options: [
      { text: '공식 정책과 데이터 보안 가이드라인 모두 있음', score: 4 },
      { text: '기본적인 가이드라인은 존재', score: 3 },
      { text: '구두로 주의사항을 공유하는 정도', score: 2 },
      { text: '아무런 기준 없음', score: 1 },
    ],
  },
  {
    q: 'AI 활용으로 업무 시간이 줄었다는 체감이 있나요?',
    options: [
      { text: '30% 이상 절감, 다른 업무에 재투자', score: 4 },
      { text: '10~30% 절감 체감', score: 3 },
      { text: '조금 줄었지만 큰 차이는 없음', score: 2 },
      { text: '오히려 시간이 더 걸리거나 변화 없음', score: 1 },
    ],
  },
  {
    q: '전사적 AI 도입·확산에 관한 전략이나 로드맵이 있나요?',
    options: [
      { text: 'C-레벨이 주도하는 구체적인 AX 전략 있음', score: 4 },
      { text: '부서 단위 계획은 있으나 전사 전략은 미흡', score: 3 },
      { text: '논의는 있지만 구체적인 계획 없음', score: 2 },
      { text: '아직 전략이 없거나 관심 단계', score: 1 },
    ],
  },
];

export const aiqResults: Record<AIQGrade, AIQResult> = {
  S: {
    grade: 'S',
    title: 'AI Native',
    desc: '이미 AI를 조직 운영에 깊게 통합한 상태입니다. 다음은 산업 표준을 만드는 단계입니다.',
    recommendation: '심화 AX 컨설팅 또는 산업별 AI 선도 사례 공유 워크숍을 추천합니다.',
    color: 'from-[#8D36EB] to-[#165CFF]',
  },
  A: {
    grade: 'A',
    title: 'AI Ready',
    desc: 'AI 활용이 상당히 진행되었으나 조직 전체로 확산되지 않은 상태입니다.',
    recommendation: '리더십 AI 역량 강화와 전사 확산 전략 수립을 권장합니다. 리더십 12주 과정이 적합합니다.',
    color: 'from-[#165CFF] to-[#00C896]',
  },
  B: {
    grade: 'B',
    title: 'AI Exploring',
    desc: 'AI에 관심은 높지만 실무 적용이 아직 체계적이지 않습니다.',
    recommendation: '직군별 맞춤 교육으로 현업 적용 속도를 높이는 것이 필요합니다. 실무자 부트캠프가 적합합니다.',
    color: 'from-[#F59E0B] to-[#D97706]',
  },
  C: {
    grade: 'C',
    title: 'AI Starting',
    desc: 'AI 도입 초기 단계로, 기초부터 체계적인 접근이 필요합니다.',
    recommendation: '임원부터 실무자까지 전 직급 대상 AI 기초 교육과 거버넌스 수립이 시급합니다.',
    color: 'from-[#EF4444] to-[#DC2626]',
  },
};

// 직급별 커리큘럼

export type LevelTab = 'exec' | 'leader' | 'practitioner';

export type LevelProgram = {
  id: LevelTab;
  pretitle: string;
  title: string;
  desc: string;
  meta: { key: string; val: string }[];
  sectionTitle: string;
  curriculum: { num: string; title: string; desc: string }[];
  outcomes: string[];
};

export const levelPrograms: LevelProgram[] = [
  {
    id: 'exec',
    pretitle: 'EXECUTIVE PROGRAM',
    title: 'AI 전략 의사결정 워크숍',
    desc: 'C-레벨과 임원이 AI 시대의 전략적 의사결정을 내릴 수 있도록 설계된 집중 워크숍. 강의가 아니라 우리 조직 현황 진단과 실전 시뮬레이션을 중심으로 운영됩니다.',
    meta: [
      { key: '대상', val: 'C-레벨, 임원, 부서장' },
      { key: '정원', val: '10~20명 (소그룹)' },
      { key: '기간', val: '1일 또는 2일 집중' },
      { key: '형식', val: '오프라인 워크숍' },
    ],
    sectionTitle: '주요 모듈',
    curriculum: [
      { num: 'M1', title: 'AI 현황 진단', desc: '우리 조직 AI 성숙도 측정 및 업계 벤치마크 비교' },
      { num: 'M2', title: 'AX 전략 수립', desc: 'AI 도입 로드맵과 우선순위 의사결정 프레임워크' },
      { num: 'M3', title: 'AI 거버넌스', desc: '보안·윤리·리스크 관리 체계 구축' },
      { num: 'M4', title: '투자 대비 효과', desc: 'AI 도입 ROI 측정 방법과 성과 지표 설계' },
    ],
    outcomes: [
      'AI 도입 전략 및 우선순위 결정 능력',
      '조직 내 AI 거버넌스 체계 수립',
      '경쟁사 대비 AX 수준 파악',
      'AI 투자 ROI 측정 프레임워크',
    ],
  },
  {
    id: 'leader',
    pretitle: 'LEADERSHIP FLAGSHIP',
    title: '리더십 AI 전환 12주',
    desc: '팀장부터 중간 관리자까지, 본인 업무에 AI를 적용하고 팀 전체의 AI 역량을 끌어올리는 12주 플래그십 프로그램. 매 주차 실제 업무 과제를 AI로 해결하는 실습 중심.',
    meta: [
      { key: '대상', val: '팀장, 파트장, 중간 관리자' },
      { key: '정원', val: '15~30명' },
      { key: '기간', val: '12주 (주 1회 × 3시간)' },
      { key: '형식', val: '오프라인 + 온라인 혼합' },
    ],
    sectionTitle: '12주 커리큘럼',
    curriculum: [
      { num: 'W1~2', title: 'AI 사고법', desc: 'AI와 협업하는 사고방식, 프롬프트 엔지니어링 기초' },
      { num: 'W3~4', title: '업무 자동화', desc: '반복 업무 자동화, n8n 기초, 워크플로우 설계' },
      { num: 'W5~6', title: '데이터 분석', desc: 'AI 기반 데이터 해석, 대시보드, 의사결정 지원' },
      { num: 'W7~8', title: '콘텐츠 생산', desc: '보고서·기획서·마케팅 자료 AI 생산 속도 3배' },
      { num: 'W9~10', title: '팀 운영', desc: 'AI 활용 팀 문화 조성, 구성원 AI 역량 코칭 방법' },
      { num: 'W11~12', title: '성과 측정', desc: '업무 효율 지표 설계, AI-Q 역량 재진단 및 발표' },
    ],
    outcomes: [
      '본인 업무 AI 적용률 70% 이상',
      '팀 단위 AI 워크플로우 구축',
      'AI 활용 업무 시간 30% 단축',
      '구성원 AI 코칭 역량',
    ],
  },
  {
    id: 'practitioner',
    pretitle: 'PRACTITIONER BOOTCAMP',
    title: '실무자 AI 부트캠프',
    desc: '현업 실무자가 당장 내일부터 AI를 쓸 수 있도록 설계된 집중 부트캠프. 직군별 맞춤 커리큘럼으로 마케터는 광고 소재를, 개발자는 코드 자동화를 배웁니다.',
    meta: [
      { key: '대상', val: '전 직군 실무자' },
      { key: '정원', val: '20~40명' },
      { key: '기간', val: '4주 (주 1회 × 3시간)' },
      { key: '형식', val: '오프라인 실습 중심' },
    ],
    sectionTitle: '4주 과정',
    curriculum: [
      { num: 'W1', title: 'AI 도구 완전 정복', desc: 'ChatGPT·Claude·Gemini 비교 + 직군별 최적 도구 선택' },
      { num: 'W2', title: '프롬프트 엔지니어링', desc: '내 업무에 맞는 프롬프트 설계, 반복 사용 템플릿화' },
      { num: 'W3', title: '직군별 AI 실습', desc: '마케팅·영업·기획·운영 등 직군별 실전 프로젝트' },
      { num: 'W4', title: '워크플로우 자동화', desc: '본인 업무 자동화 파이프라인 발표 + AI-Q 역량 진단' },
    ],
    outcomes: [
      '주요 AI 도구 능숙한 활용',
      '직군 특화 AI 워크플로우 구축',
      '반복 업무 자동화 실현',
      '개인 AI-Q 역량 리포트 발급',
    ],
  },
];

// 직무별 트랙

export type RoleId = 'plan' | 'marketing' | 'sales' | 'ops' | 'dev' | 'design';

export type RoleTrack = {
  id: RoleId;
  name: string;
  summary: string;
  scenarios: string[];
  tools: string[];
  outcome: string;
};

export const roleTracks: RoleTrack[] = [
  {
    id: 'plan',
    name: '기획 · 전략',
    summary: '시장 조사부터 사업 기획서 작성까지, AI로 기획 사이클을 3배 빠르게',
    scenarios: [
      '경쟁사 분석 리포트를 하루 만에 완성',
      'AI로 사업 아이디어 검증 및 린 캔버스 작성',
      '임원 보고용 전략 문서를 Claude로 초안 → 완성',
    ],
    tools: ['ChatGPT', 'Claude', 'Perplexity', 'Notion AI'],
    outcome: '기획 문서 작성 시간 60% 단축',
  },
  {
    id: 'marketing',
    name: '마케팅 · 콘텐츠',
    summary: '광고 소재, SNS 콘텐츠, 브랜드 이미지를 AI로 양산하는 마케터의 워크플로우',
    scenarios: [
      'Midjourney로 한 번에 광고 소재 20종 생산',
      'Claude로 SNS 콘텐츠 캘린더 자동화',
      'AI 카피라이팅으로 A/B 테스트 소재 10배 생성',
    ],
    tools: ['Midjourney', 'Claude', 'Ideogram', 'n8n', 'Buffer'],
    outcome: '콘텐츠 생산량 5배, 비용 40% 절감',
  },
  {
    id: 'sales',
    name: '영업 · CS',
    summary: '고객 리서치, 제안서 작성, CS 대응을 AI로 자동화해 영업 효율을 극대화',
    scenarios: [
      '잠재 고객 리서치를 10분 만에 완성하는 AI 템플릿',
      'Claude로 맞춤형 제안서 초안을 30분 만에',
      'AI 챗봇으로 1차 CS 문의 80% 자동 처리',
    ],
    tools: ['Claude', 'ChatGPT', 'HubSpot AI', 'n8n'],
    outcome: '영업 사이클 단축, CS 응답 시간 70% 감소',
  },
  {
    id: 'ops',
    name: '운영 · HR',
    summary: '채용, 교육, 정산, 일정 관리 등 반복 운영 업무를 n8n과 AI로 자동화',
    scenarios: [
      'n8n으로 채용 프로세스 자동화 (지원자 → Slack 알림 → 서류 검토)',
      'AI로 교육 자료와 온보딩 매뉴얼 자동 생성',
      '정산·보고서 자동화로 월말 야근 제거',
    ],
    tools: ['n8n', 'ChatGPT', 'Notion AI', 'Make'],
    outcome: '반복 운영 업무 70% 자동화',
  },
  {
    id: 'dev',
    name: '개발 · 데이터',
    summary: '코드 작성부터 데이터 분석, 배포 자동화까지 개발 생산성을 2배로',
    scenarios: [
      'GitHub Copilot + Claude로 코드 리뷰 자동화',
      'AI로 데이터 분석 쿼리 작성 시간 80% 단축',
      '바이브 코딩으로 프로토타입을 하루 만에 완성',
    ],
    tools: ['GitHub Copilot', 'Claude', 'Cursor', 'Windsurf'],
    outcome: '개발 속도 2배, 버그 발생률 30% 감소',
  },
  {
    id: 'design',
    name: '디자인 · 크리에이티브',
    summary: '브랜드 일관성을 유지하면서 AI로 시각 자산을 빠르게 생산하는 디자이너의 방식',
    scenarios: [
      'Midjourney + Krea로 브랜드 아이덴티티 일관성 유지',
      'AI로 UI 목업을 2시간 만에 완성',
      '영상 AI로 유튜브 썸네일과 숏폼 소재 자동 생성',
    ],
    tools: ['Midjourney', 'Ideogram', 'Krea', 'Runway', 'Adobe Firefly'],
    outcome: '디자인 에셋 생산 속도 4배 향상',
  },
];

// 단기 과정 4주

export type ShortCourseId = 'img' | 'video' | 'marketing_ai' | 'chat' | 'n8n' | 'code' | 'prompt';

export type ShortCourse = {
  id: ShortCourseId;
  title: string;
  badge?: 'NEW' | 'BEST' | 'HOT';
  tags: string[];
  shortName: string;
  desc: string;
  weeks: { num: string; title: string; desc: string }[];
  capacity: string;
  gradient: string;
};

export const shortCourses: ShortCourse[] = [
  {
    id: 'img',
    title: 'AI 이미지 마케팅 4주',
    badge: 'HOT',
    tags: ['4회차', '12시간', '마케팅·디자인'],
    shortName: 'GPT Image 2.0 · Higgsfield로 광고 소재 양산',
    desc: 'GPT Image 2.0·Higgsfield·Midjourney로 제품 광고, 브랜드 이미지, SNS 콘텐츠를 AI로 양산하는 마케터 전용 과정. 이미지 생성을 넘어 매출로 연결하는 크리에이티브 전략까지.',
    weeks: [
      { num: 'W1', title: 'GPT Image 2.0 완전 정복', desc: 'OpenAI GPT Image 2.0 프롬프트 전략, 제품 사진·광고 배너 즉시 적용' },
      { num: 'W2', title: 'Higgsfield 마케팅 활용', desc: 'Higgsfield로 제품 화보, 라이프스타일 컷, 브랜드 캠페인 이미지 실전 제작' },
      { num: 'W3', title: '브랜드 일관성 유지', desc: 'Midjourney·Ideogram으로 캐릭터·아이콘·썸네일 세트를 브랜드톤 유지하며 양산' },
      { num: 'W4', title: '이미지 → 매출 파이프라인', desc: 'n8n으로 이미지 자동 생성·업로드 파이프라인 구축 + 광고 A/B 소재 전략 발표' },
    ],
    capacity: '15~25명',
    gradient: 'from-pink-500 to-orange-500',
  },
  {
    id: 'video',
    title: 'AI 영상 마케팅 4주',
    badge: 'NEW',
    tags: ['4회차', '12시간', '마케팅·콘텐츠'],
    shortName: 'Higgsfield · Threads 기반 AI 영상 광고 제작',
    desc: 'Higgsfield·Kling·HeyGen으로 Threads·인스타 릴스·유튜브 숏츠에 최적화된 AI 광고 영상을 만드는 과정. UGC 영상, AI 아바타 광고, 제품 데모 영상까지.',
    weeks: [
      { num: 'W1', title: 'AI 영상 도구 비교', desc: 'Higgsfield·Kling·Runway 비교, Threads/릴스/숏츠 플랫폼별 영상 전략' },
      { num: 'W2', title: 'Threads · 숏폼 영상 제작', desc: 'Threads 최적 포맷 AI 영상 제작, 인스타 릴스 바이럴 훅 설계' },
      { num: 'W3', title: 'AI 아바타 · UGC 영상', desc: 'HeyGen으로 AI 발표자 영상, Higgsfield로 제품 영상 자동 생성' },
      { num: 'W4', title: '광고 영상 캠페인 완성', desc: '실전 광고 캠페인 영상 제작 + ROI 측정 전략 발표' },
    ],
    capacity: '15~25명',
    gradient: 'from-violet-500 to-blue-500',
  },
  {
    id: 'marketing_ai',
    title: 'AI 마케팅 크리에이티브 4주',
    badge: 'NEW',
    tags: ['4회차', '12시간', '마케팅 집중'],
    shortName: 'GPT Image 2.0 + Higgsfield + Threads 통합 전략',
    desc: '이미지·영상·텍스트를 AI로 통합 생산하는 마케터를 위한 종합 크리에이티브 과정. GPT Image 2.0, Higgsfield, Threads 알고리즘 기반 콘텐츠 전략을 한 번에.',
    weeks: [
      { num: 'W1', title: 'AI 마케팅 생태계 이해', desc: 'GPT Image 2.0·Higgsfield·Claude 역할 분담, 2025 AI 크리에이티브 트렌드' },
      { num: 'W2', title: 'Threads 알고리즘 마케팅', desc: 'Threads 바이럴 훅 설계, AI로 텍스트+이미지 콘텐츠 일 10개 자동 생산' },
      { num: 'W3', title: '통합 크리에이티브 양산', desc: 'Higgsfield 이미지 → AI 영상 → SNS 자동 발행 파이프라인 구축' },
      { num: 'W4', title: '광고 최적화 전략', desc: '손실회피·희소성·사회적 증명 심리 카피 + AI 소재로 광고 ROAS 극대화' },
    ],
    capacity: '15~25명',
    gradient: 'from-fuchsia-500 to-pink-600',
  },
  {
    id: 'chat',
    title: 'ChatGPT × Claude 4주',
    badge: 'BEST',
    tags: ['4회차', '12시간', '전 직군'],
    shortName: '모든 업무에 AI를 붙이는 프레임워크',
    desc: 'ChatGPT와 Claude를 상황에 맞게 쓰는 법, 프롬프트 설계부터 업무 자동화 연결까지.',
    weeks: [
      { num: 'W1', title: '도구 선택 기준', desc: 'ChatGPT vs Claude 비교, 상황별 최적 도구' },
      { num: 'W2', title: '프롬프트 설계', desc: '재사용 가능한 프롬프트 라이브러리 구축' },
      { num: 'W3', title: '업무 유형별 실습', desc: '보고서·분석·회의록·이메일 자동화' },
      { num: 'W4', title: '나만의 AI 워크플로우', desc: '개인 맞춤 AI 시스템 설계 + 발표' },
    ],
    capacity: '20~30명',
    gradient: 'from-emerald-500 to-cyan-500',
  },
  {
    id: 'n8n',
    title: 'n8n 자동화 4주',
    badge: 'NEW',
    tags: ['4회차', '12시간', '운영·기획'],
    shortName: '코딩 없이 업무 자동화 구축',
    desc: 'n8n으로 슬랙 알림, 이메일 자동화, 데이터 수집, CRM 연동을 코드 없이 구현.',
    weeks: [
      { num: 'W1', title: 'n8n 기초', desc: 'n8n 환경 설정, 노드 개념, 첫 자동화 완성' },
      { num: 'W2', title: 'API 연동', desc: 'Slack·Gmail·Notion·Airtable 연동 자동화' },
      { num: 'W3', title: 'AI + 자동화', desc: 'ChatGPT·Claude를 n8n에 붙여 AI 파이프라인' },
      { num: 'W4', title: '실무 자동화 완성', desc: '실제 업무 자동화 시스템 발표' },
    ],
    capacity: '15~20명',
    gradient: 'from-amber-500 to-red-500',
  },
  {
    id: 'code',
    title: '바이브 코딩 4주',
    badge: 'HOT',
    tags: ['4회차', '12시간', '개발·기획'],
    shortName: '코딩 몰라도 AI로 서비스 만들기',
    desc: 'Cursor·Windsurf·Claude로 비개발자도 웹 서비스, 자동화 스크립트, 챗봇을 만드는 과정.',
    weeks: [
      { num: 'W1', title: '바이브 코딩 개념', desc: 'AI 코딩 도구 선택, 프로젝트 설계 방법' },
      { num: 'W2', title: '웹 서비스 제작', desc: 'Cursor로 나만의 웹 페이지 만들기' },
      { num: 'W3', title: '챗봇 & 자동화', desc: 'AI 챗봇, 슬랙 봇, 이메일 자동화 구현' },
      { num: 'W4', title: '실전 프로젝트', desc: '본인 업무 AI 도구 직접 제작 + 발표' },
    ],
    capacity: '15~20명',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'prompt',
    title: '프롬프트 엔지니어링 4주',
    tags: ['4회차', '12시간', '전 직군'],
    shortName: 'AI를 제대로 부리는 기술',
    desc: '같은 AI로도 10배 다른 결과를 만드는 프롬프트 설계 원리와 실전 라이브러리 구축.',
    weeks: [
      { num: 'W1', title: '프롬프트 원리', desc: 'AI가 응답하는 방식 이해, 핵심 패턴 5가지' },
      { num: 'W2', title: '구조화 프롬프트', desc: 'Chain-of-Thought, Few-shot, Role-play 설계' },
      { num: 'W3', title: '직군별 라이브러리', desc: '마케팅·영업·기획·HR 전용 프롬프트 패키지' },
      { num: 'W4', title: '시스템 프롬프트', desc: '조직 맞춤 AI 어시스턴트 설계 + 발표' },
    ],
    capacity: '20~30명',
    gradient: 'from-purple-500 to-pink-500',
  },
];

// 커리큘럼 카탈로그 — 13개 툴 축 × Lv1–3 레벨제 (2026 AX Education Package)

export type CurriculumGroup = 'general' | 'dev' | 'content';

export type CurriculumLevel = {
  lv: 'LV1' | 'LV2' | 'LV3';
  hours: string;
  title: string;
  goal: string;
  modules: { name: string; time: string }[];
  output: string;
};

export type CurriculumTrack = {
  id: string;
  num: string;
  name: string;
  group: CurriculumGroup;
  desc: string;
  tools: string[];
  capacity: string;
  fullPackage: string;
  target: string;
  levels: CurriculumLevel[];
};

export const curriculumGroups: Record<CurriculumGroup, { label: string; sub: string }> = {
  general: { label: '범용 AI 활용', sub: '전 직군 · 최대 30명 — 웹 기반 툴로 조직 전체 확산' },
  dev: { label: '자동화 · 개발', sub: '소수 정예 6~15명 — 산출물 완결형, 개별 지원 포함' },
  content: { label: '콘텐츠 · 에이전트', sub: '마케팅·콘텐츠 실무 — 눈에 보이는 산출물이 바로 나오는 과정' },
};

export const curriculumPackages = [
  { name: '특강형', spec: 'Lv1 단독 · 3H', desc: '조직 전체 확산용' },
  { name: '기본형', spec: 'Lv1+2 · 6H', desc: '실무 적용까지' },
  { name: '풀패키지', spec: 'Lv1–3 · 9~12H', desc: '산출물 완성까지' },
];

export const curriculumLevelSystem = [
  { lv: 'LV1 입문', tag: '툴 이해 + 기본 실습', desc: '툴의 핵심 기능을 이해하고 첫 산출물을 만듭니다. 계정·환경 세팅부터 기초 실습까지.', hours: '3H · 1차시' },
  { lv: 'LV2 실무', tag: '업무 시나리오 적용', desc: '자기 업무에 툴을 적용해 반복 업무를 개선합니다. 실제 업무 문서·데이터로 실습합니다.', hours: '3H · 1차시' },
  { lv: 'LV3 심화', tag: '프로젝트형 · 자산화', desc: '배포·자산화·팀 적용까지 완결된 산출물을 만듭니다. 워크숍형 프로젝트로 마무리합니다.', hours: '3–6H · 1–2차시' },
];

export const customTracks = [
  { name: '소상공인 트랙', combo: 'ChatGPT + AI 이미지 + 바이브코딩' },
  { name: '사무직 AX 트랙', combo: 'ChatGPT/Copilot + AI 슬라이드 + NotebookLM' },
  { name: '콘텐츠팀 트랙', combo: 'AI 이미지 + AI 영상 + AI 에이전트' },
];

export const curriculumTracks: CurriculumTrack[] = [
  {
    id: 'chatgpt', num: '01', name: 'ChatGPT 실무 활용', group: 'general',
    desc: '가장 수요가 많은 기본 축. 프롬프트 기본기에서 시작해 문서 자동화·데이터 분석을 거쳐, 반복 업무를 Custom GPT와 Agent 모드에 위임하는 단계까지 갑니다.',
    tools: ['ChatGPT', 'GPT Image', 'Custom GPT', 'Agent 모드'],
    capacity: '최대 30명', fullPackage: '9H', target: '전 직군 실무자',
    levels: [
      {
        lv: 'LV1', hours: '3H', title: 'ChatGPT 기본기와 프롬프트', goal: '프롬프트 공식으로 문서 업무를 처리한다',
        modules: [
          { name: '생성형 AI와 ChatGPT 이해', time: '30분' },
          { name: '프롬프트 기본 공식', time: '45분' },
          { name: '문서 업무 실습 — 이메일·요약·회의록', time: '60분' },
          { name: '검색·리서치 활용', time: '30분' },
          { name: '개인 업무 적용', time: '15분' },
        ],
        output: '내 업무용 프롬프트 3종',
      },
      {
        lv: 'LV2', hours: '3H', title: '문서 자동화와 데이터 분석', goal: '보고서·데이터·이미지 업무에 적용한다',
        modules: [
          { name: '보고서·기획안 초안 워크플로', time: '45분' },
          { name: '엑셀/CSV 데이터 분석', time: '45분' },
          { name: 'GPT Image 이미지 생성 활용', time: '30분' },
          { name: 'Custom GPT 만들기', time: '60분' },
        ],
        output: 'Custom GPT 1개',
      },
      {
        lv: 'LV3', hours: '3H', title: 'Custom GPT 고도화와 에이전트', goal: '반복 업무를 GPT·Agent에 위임한다',
        modules: [
          { name: 'Custom GPT 고도화 — 지침·지식·Actions', time: '45분' },
          { name: 'ChatGPT Agent 모드', time: '45분' },
          { name: 'Projects와 업무 자산화', time: '45분' },
          { name: '적용 워크숍 — 위임 설계·발표', time: '45분' },
        ],
        output: '업무 자동화 설계안',
      },
    ],
  },
  {
    id: 'claude', num: '02', name: 'Claude 실무 활용 & AI 비서 만들기', group: 'general',
    desc: '긴 문서 처리와 자연스러운 글쓰기에 강한 Claude로 문서 업무를 잡고, Project·Artifacts로 반복 업무를 템플릿화한 뒤 나만의 AI 비서를 완성합니다.',
    tools: ['Claude 웹', 'Project', 'Artifacts', '커넥터'],
    capacity: '최대 30명', fullPackage: '9H', target: '사무직·기획·관리자',
    levels: [
      {
        lv: 'LV1', hours: '3H', title: 'Claude 기본기와 문서 업무', goal: '긴 문서 분석·글쓰기에 Claude를 쓴다',
        modules: [
          { name: 'Claude 이해 — 강점과 활용 원칙', time: '30분' },
          { name: '긴 문서 분석 실습 — PDF·보고서 비교', time: '60분' },
          { name: '글쓰기 실습 — 보고서·제안서·퇴고', time: '60분' },
          { name: '업무 적용', time: '30분' },
        ],
        output: '문서 분석·보고서 초안',
      },
      {
        lv: 'LV2', hours: '3H', title: 'Project와 Artifacts 실무', goal: '반복 업무를 템플릿으로 만든다',
        modules: [
          { name: 'Project 개념과 설계', time: '45분' },
          { name: 'Artifacts 활용 — 문서·표·인터랙티브', time: '45분' },
          { name: '업무 템플릿 구축 — 주간보고·회의록', time: '60분' },
          { name: '스타일과 지침', time: '30분' },
        ],
        output: '업무 Project 1개 + 템플릿',
      },
      {
        lv: 'LV3', hours: '3H', title: '개인 AI 비서 완성', goal: '나만의 AI 비서를 설계·운영한다',
        modules: [
          { name: '비서 설계 — 역할·원칙·지식 구성', time: '45분' },
          { name: '커넥터와 확장 — Drive·캘린더·MCP', time: '45분' },
          { name: '팀 단위 운영과 보안', time: '45분' },
          { name: '워크숍 — 비서 완성·시연·발표', time: '45분' },
        ],
        output: '개인 AI 비서 (팀 공유용)',
      },
    ],
  },
  {
    id: 'gemini', num: '03', name: 'Gemini의 모든 것', group: 'general',
    desc: 'Google Workspace 조직에 최적화된 축. Gmail·Docs·Sheets 연동에서 시작해 Gem·Deep Research·Canvas를 거쳐, 리서치에서 발표자료까지 이어지는 Google AI 통합 워크플로를 만듭니다.',
    tools: ['Gemini', 'Gem', 'Deep Research', 'Canvas', 'Workspace 연동'],
    capacity: '최대 30명', fullPackage: '9H', target: 'Google Workspace 조직',
    levels: [
      {
        lv: 'LV1', hours: '3H', title: 'Gemini 기본기와 Workspace 연동', goal: 'Gmail·Docs·Sheets에서 Gemini를 쓴다',
        modules: [
          { name: 'Gemini 생태계 지도', time: '30분' },
          { name: '프롬프트 기본 — 이미지·파일 첨부', time: '45분' },
          { name: 'Workspace 연동 실습', time: '75분' },
          { name: '업무 적용', time: '30분' },
        ],
        output: '업무 문서 3종 처리',
      },
      {
        lv: 'LV2', hours: '3H', title: 'Gem · Deep Research · Canvas', goal: '리서치와 맞춤 봇을 만든다',
        modules: [
          { name: '나만의 Gem 만들기', time: '45분' },
          { name: 'Deep Research — 계획·검증·보고서', time: '60분' },
          { name: 'Canvas 협업 편집', time: '45분' },
          { name: '실습 종합 미니 프로젝트', time: '30분' },
        ],
        output: '나만의 Gem + 리서치 보고서',
      },
      {
        lv: 'LV3', hours: '3H', title: 'Google AI 통합 워크플로', goal: '리서치→문서→발표 파이프라인을 만든다',
        modules: [
          { name: '리서치→Docs→Slides 파이프라인', time: '60분' },
          { name: 'NotebookLM 연계', time: '45분' },
          { name: '크리에이티브 툴 개요 — Nano Banana·Flow', time: '45분' },
          { name: '적용 워크숍', time: '30분' },
        ],
        output: '통합 워크플로 1건',
      },
    ],
  },
  {
    id: 'copilot', num: '04', name: 'Microsoft Copilot 실무 활용', group: 'general',
    desc: 'M365 사용 기업을 위한 축. Word·Outlook·Teams의 일상 업무에서 시작해 Excel·PowerPoint 실무를 거쳐, Copilot Studio로 사내 업무 봇을 만드는 단계까지 갑니다.',
    tools: ['M365 Copilot', 'Copilot Studio'],
    capacity: '최대 30명', fullPackage: '9H', target: 'M365 사용 기업',
    levels: [
      {
        lv: 'LV1', hours: '3H', title: 'M365 Copilot 기본기', goal: '매일 쓰는 앱에서 Copilot을 켠다',
        modules: [
          { name: 'Copilot 지도 — 종류와 데이터 접근 범위', time: '30분' },
          { name: 'Word — 초안·요약·다시 쓰기', time: '45분' },
          { name: 'Outlook — 메일 요약·답장·일정', time: '45분' },
          { name: 'Teams — 회의 요약·액션 아이템', time: '45분' },
          { name: '업무 적용', time: '15분' },
        ],
        output: 'Word·Outlook·Teams 실습 결과물',
      },
      {
        lv: 'LV2', hours: '3H', title: 'Excel · PowerPoint 실무', goal: '데이터·발표 업무에 적용한다',
        modules: [
          { name: 'Excel 데이터 분석', time: '60분' },
          { name: 'PowerPoint — 문서→PPT 초안', time: '60분' },
          { name: 'M365 Chat 통합 업무 질의', time: '45분' },
          { name: '종합 실습 미니 프로젝트', time: '15분' },
        ],
        output: '데이터 분석 + PPT 초안',
      },
      {
        lv: 'LV3', hours: '3H', title: 'Copilot Studio 에이전트', goal: '사내 업무 봇을 만든다',
        modules: [
          { name: '에이전트 개념과 사례', time: '45분' },
          { name: 'Copilot Studio 실습 — 지식 연결·흐름 설계', time: '75분' },
          { name: 'Teams 배포와 거버넌스', time: '30분' },
          { name: '적용 워크숍', time: '30분' },
        ],
        output: '사내용 에이전트 1개',
      },
    ],
  },
  {
    id: 'notebooklm', num: '05', name: 'NotebookLM 문서 분석·지식베이스', group: 'general',
    desc: '올린 문서에서만 답하는 출처 기반 AI. 문서 분석·질의응답에서 시작해 Deep Research와 오디오 오버뷰로 확장하고, 팀 지식베이스와 슬라이드 산출물까지 만듭니다.',
    tools: ['NotebookLM', 'Deep Research', '오디오 오버뷰', '슬라이드 생성'],
    capacity: '최대 30명', fullPackage: '9H', target: '기획·연구·행정·정책',
    levels: [
      {
        lv: 'LV1', hours: '3H', title: '소스 기반 문서 분석', goal: '문서를 올리고 출처 있는 답을 얻는다',
        modules: [
          { name: '소스 기반 AI 이해', time: '30분' },
          { name: '노트북 만들기 — 문서 업로드·요약', time: '45분' },
          { name: '질의응답 실습 — 출처 인용·문서 비교', time: '60분' },
          { name: '산출물 만들기 — 요약·FAQ·브리핑', time: '45분' },
        ],
        output: '브리핑 문서 + FAQ',
      },
      {
        lv: 'LV2', hours: '3H', title: '리서치 확장', goal: '웹 리서치와 멀티미디어 산출물을 만든다',
        modules: [
          { name: 'Deep Research — 웹 리서치 리포트', time: '60분' },
          { name: '소스 유형 확장 — 웹·유튜브·오디오', time: '45분' },
          { name: '오디오 오버뷰 · 마인드맵', time: '45분' },
          { name: '노트북 운영 전략', time: '30분' },
        ],
        output: 'Deep Research 보고서 + 오디오 오버뷰',
      },
      {
        lv: 'LV3', hours: '3H', title: '지식베이스와 산출물 제작', goal: '팀 지식베이스와 발표자료를 만든다',
        modules: [
          { name: '슬라이드·인포그래픽 생성', time: '60분' },
          { name: '팀 지식베이스 설계 — 매뉴얼·온보딩', time: '60분' },
          { name: '리서치 파이프라인 전체 흐름', time: '45분' },
          { name: '적용 워크숍', time: '15분' },
        ],
        output: '팀 노트북 + 슬라이드',
      },
    ],
  },
  {
    id: 'slides', num: '06', name: 'AI 슬라이드·문서 디자인', group: 'general',
    desc: '보고·발표 업무의 시간을 바로 줄여주는 신규 축. Gamma로 슬라이드를 만들고 Napkin 다이어그램과 Canva 디자인을 입혀, 조직 톤에 맞는 산출물 패키지를 완성합니다.',
    tools: ['Gamma', 'Napkin AI', 'Canva Magic Studio'],
    capacity: '최대 30명', fullPackage: '9H', target: '보고·발표 실무자',
    levels: [
      {
        lv: 'LV1', hours: '3H', title: 'Gamma로 슬라이드 제작', goal: '프롬프트로 발표자료를 만든다',
        modules: [
          { name: 'AI 슬라이드 도구 이해', time: '30분' },
          { name: '첫 슬라이드 만들기 — 아웃라인 다듬기', time: '45분' },
          { name: '구조·디자인 다듬기', time: '60분' },
          { name: '내보내기와 공유 — PPTX 주의점', time: '30분' },
          { name: '실습 발표', time: '15분' },
        ],
        output: '발표자료 1건',
      },
      {
        lv: 'LV2', hours: '3H', title: '시각화와 디자인 보강', goal: '다이어그램·디자인을 입힌다',
        modules: [
          { name: 'Napkin 다이어그램 — 텍스트→도식', time: '60분' },
          { name: 'Canva Magic Studio — 카드뉴스·배너', time: '60분' },
          { name: '보고서 시각화 실습', time: '45분' },
          { name: '도구 조합 정리', time: '15분' },
        ],
        output: '시각화된 보고서·카드뉴스',
      },
      {
        lv: 'LV3', hours: '3H', title: '브랜드 산출물 패키지', goal: '조직 톤에 맞는 자료 세트를 만든다',
        modules: [
          { name: '브랜드 일관성 — 테마·브랜드 키트', time: '45분' },
          { name: '패키지 제작 워크숍', time: '90분' },
          { name: '팀 템플릿화', time: '30분' },
          { name: '발표·피드백', time: '15분' },
        ],
        output: '제안서·교육자료 패키지',
      },
    ],
  },
  {
    id: 'n8n', num: '07', name: 'n8n 업무 자동화', group: 'dev',
    desc: '반복 업무를 찾아 워크플로로 바꾸는 자동화 축. 노드·트리거 기본기와 시트 연동을 거쳐, AI Agent를 연동한 부서 실무 자동화 PoC를 직접 만듭니다.',
    tools: ['n8n', 'Google Sheets', 'OpenAI API', 'AI Agent 노드'],
    capacity: '6~8명', fullPackage: '12H (Lv3 6H)', target: '운영·HR·마케팅·재무',
    levels: [
      {
        lv: 'LV1', hours: '3H', title: '자동화 사고법과 첫 워크플로', goal: '자동화할 업무를 찾고 첫 워크플로를 만든다',
        modules: [
          { name: '자동화 대상 찾기', time: '45분' },
          { name: 'n8n 기본 개념 — 노드·트리거·크레덴셜', time: '45분' },
          { name: '첫 자동화 실습 — 폼→시트→메일', time: '75분' },
          { name: '업무 자동화 후보 정리', time: '15분' },
        ],
        output: '알림 자동화 1건',
      },
      {
        lv: 'LV2', hours: '3H', title: '핵심 노드와 데이터 처리', goal: '조건·분기·시트 연동을 다룬다',
        modules: [
          { name: '데이터 구조 이해 — JSON·데이터 흐름', time: '45분' },
          { name: '핵심 노드 — Set·IF·HTTP·Webhook', time: '60분' },
          { name: 'Google Sheets 연동', time: '60분' },
          { name: '에러 처리 기초', time: '15분' },
        ],
        output: '시트 기반 자동화 1건',
      },
      {
        lv: 'LV3', hours: '6H · 2차시', title: 'AI Agent와 실무 자동화', goal: 'AI를 연동한 실무 자동화 PoC를 만든다',
        modules: [
          { name: 'LLM API 연동 — 요약·분류·초안', time: '60분' },
          { name: 'AI Agent 노드', time: '60분' },
          { name: '정보 수집 자동화 — 뉴스 브리핑 발송', time: '60분' },
          { name: 'PoC 설계·제작 워크숍', time: '150분' },
          { name: '발표·운영 가이드', time: '30분' },
        ],
        output: '부서 업무 자동화 PoC',
      },
    ],
  },
  {
    id: 'vibe', num: '08', name: '바이브코딩 — 노코드 웹앱 제작', group: 'dev',
    desc: '코드를 몰라도 말로 설명해서 앱을 만드는 비개발자 축. 첫 웹앱 제작에서 데이터가 저장되는 업무 앱으로, 그리고 실제로 팀이 쓰는 배포 상태까지 완성합니다.',
    tools: ['Lovable', 'Bolt.new', 'Supabase 내장 연동'],
    capacity: '10~15명', fullPackage: '12H (Lv3 6H)', target: '비개발자·기획·소상공인',
    levels: [
      {
        lv: 'LV1', hours: '3H', title: '첫 웹앱 만들기', goal: '말로 설명해서 앱을 만든다',
        modules: [
          { name: '바이브코딩 이해 — 가능한 것과 한계', time: '30분' },
          { name: '요구사항 작성법 — 첫 프롬프트 공식', time: '45분' },
          { name: '첫 앱 제작 — 생성·수정 반복', time: '75분' },
          { name: '결과 공유', time: '30분' },
        ],
        output: '체크리스트 웹앱',
      },
      {
        lv: 'LV2', hours: '3H', title: '업무용 앱 제작', goal: '데이터가 저장되는 업무 앱을 만든다',
        modules: [
          { name: '데이터 구조 설계', time: '45분' },
          { name: '업무 앱 제작 — 예약/출퇴근/재고 택1', time: '90분' },
          { name: '로그인·권한', time: '30분' },
          { name: '동작 점검 체크리스트', time: '15분' },
        ],
        output: '예약/출퇴근/재고 앱 택1',
      },
      {
        lv: 'LV3', hours: '6H · 2차시', title: '개선·배포·실사용', goal: '실제로 쓸 수 있는 상태로 완성한다',
        modules: [
          { name: 'UX 개선 — 모바일·에러 처리', time: '60분' },
          { name: '배포·공유·사용 테스트', time: '60분' },
          { name: 'Bolt 비교 체험', time: '60분' },
          { name: '보안·개인정보 점검', time: '30분' },
          { name: '실사용 프로젝트 워크숍·발표', time: '150분' },
        ],
        output: '배포된 앱 + 적용 계획',
      },
    ],
  },
  {
    id: 'claudecode', num: '09', name: 'AI 웹서비스 개발 — Claude Code', group: 'dev',
    desc: '진짜 개발 환경에서 AI로 웹서비스를 만드는 축. 환경 세팅과 첫 프로젝트에서 업무용 웹앱 구현으로, DB 연동과 Vercel 배포로 실제 URL이 나오는 상태까지 완결합니다.',
    tools: ['Claude Code', 'Cursor', 'Supabase', 'GitHub', 'Vercel'],
    capacity: '6~8명', fullPackage: '12H (Lv3 6H)', target: '기획·내부툴 담당·입문자',
    levels: [
      {
        lv: 'LV1', hours: '3H', title: 'AI 코딩 환경과 첫 프로젝트', goal: '개발 환경을 세팅하고 첫 앱을 실행한다',
        modules: [
          { name: 'AI 코딩 도구 지형', time: '30분' },
          { name: '환경 세팅 — 터미널·Git·Node.js', time: '75분' },
          { name: '첫 프로젝트 — 생성→실행→수정', time: '60분' },
          { name: 'CLAUDE.md 개념', time: '15분' },
        ],
        output: '로컬에서 도는 첫 웹앱',
      },
      {
        lv: 'LV2', hours: '3H', title: '업무용 웹앱 구현', goal: '요구사항을 정의하고 핵심 기능을 구현한다',
        modules: [
          { name: '요구사항 정의 — 대시보드/관리툴 택1', time: '45분' },
          { name: '핵심 기능 구현 — 폼·리스트·필터', time: '105분' },
          { name: '중간 점검', time: '30분' },
        ],
        output: '웹앱 1차 구현본',
      },
      {
        lv: 'LV3', hours: '6H · 2차시', title: 'DB 연동과 배포', goal: 'DB 연동·배포까지 완결한다',
        modules: [
          { name: 'Supabase 연동 — 테이블·저장·조회', time: '60분' },
          { name: '로그인·권한', time: '60분' },
          { name: '기능 완성', time: '60분' },
          { name: 'GitHub·Vercel 배포', time: '75분' },
          { name: '개선·운영 정리·발표', time: '105분' },
        ],
        output: '배포 URL + 운영 체크리스트',
      },
    ],
  },
  {
    id: 'ios', num: '10', name: 'iOS 앱 제작·배포 — Codex', group: 'dev',
    desc: '내 아이디어를 앱스토어까지 가져가는 축. 앱 기획과 Codex 환경 구축, SwiftUI 구현·테스트를 거쳐 TestFlight 배포와 심사 준비까지 완주합니다.',
    tools: ['Codex', 'Xcode · SwiftUI', 'TestFlight'],
    capacity: '6~8명 (MacBook 필수)', fullPackage: '9~12H', target: 'MacBook 보유자·창업팀',
    levels: [
      {
        lv: 'LV1', hours: '3H', title: '앱 기획과 Codex 시작', goal: '앱을 기획하고 Codex 환경을 만든다',
        modules: [
          { name: 'Codex 이해 — 에이전트·CLI·GitHub 연동', time: '30분' },
          { name: '앱 기획 — 시나리오·기능·화면 정의', time: '60분' },
          { name: '환경 세팅과 첫 화면', time: '75분' },
          { name: '기획서 점검', time: '15분' },
        ],
        output: '앱 기획서 + 첫 화면',
      },
      {
        lv: 'LV2', hours: '3H', title: 'SwiftUI 구현과 테스트', goal: '핵심 기능을 구현하고 시뮬레이터로 테스트한다',
        modules: [
          { name: 'SwiftUI 구조 읽기', time: '30분' },
          { name: '기능 구현 — 프롬프트·오류 수정', time: '90분' },
          { name: '시뮬레이터 테스트', time: '45분' },
          { name: '이슈 목록화', time: '15분' },
        ],
        output: '동작하는 앱 1차본',
      },
      {
        lv: 'LV3', hours: '3~6H', title: 'TestFlight · App Store 배포', goal: '배포 절차를 완주한다',
        modules: [
          { name: '배포 준비 — Developer Program·인증서', time: '45분' },
          { name: 'TestFlight — 업로드·테스터 초대', time: '60분' },
          { name: '심사 준비 — 스크린샷·정책·리젝 대응', time: '45분' },
          { name: '발표·출시 로드맵', time: '30분' },
          { name: '(6H 확장) 완성도 보강 워크숍', time: '+3H' },
        ],
        output: 'TestFlight 배포본 + 심사 준비물',
      },
    ],
  },
  {
    id: 'image', num: '11', name: 'AI 이미지 콘텐츠 제작', group: 'content',
    desc: 'Midjourney로 컨셉을 잡고 Nano Banana로 정밀 편집하는 실무 표준 파이프라인. 이미지 프롬프트 기본기에서 브랜드 톤의 에셋 패키지 제작까지 갑니다.',
    tools: ['Nano Banana', 'Midjourney', '한글 텍스트·인페인트'],
    capacity: '15~25명', fullPackage: '9H', target: '마케팅·디자인·소상공인',
    levels: [
      {
        lv: 'LV1', hours: '3H', title: '이미지 생성 기본기', goal: '원하는 이미지를 프롬프트로 만든다',
        modules: [
          { name: '이미지 AI 지형 — 저작권·상업 이용', time: '30분' },
          { name: '이미지 프롬프트 기본', time: '45분' },
          { name: 'Nano Banana 실습 — 한글 텍스트·부분 수정', time: '75분' },
          { name: '결과 공유', time: '30분' },
        ],
        output: '업무용 이미지 5종',
      },
      {
        lv: 'LV2', hours: '3H', title: '컨셉과 실무 파이프라인', goal: '컨셉→정밀 편집 파이프라인을 쓴다',
        modules: [
          { name: 'Midjourney 스타일 탐색 — 무드보드', time: '60분' },
          { name: 'MJ→NB 파이프라인 — 실무 표준 흐름', time: '75분' },
          { name: '실무 이미지 제작 — 제품컷·광고', time: '45분' },
        ],
        output: '제품·광고 이미지 세트',
      },
      {
        lv: 'LV3', hours: '3H', title: '브랜드 에셋 패키지', goal: '브랜드 톤의 에셋 세트를 만든다',
        modules: [
          { name: '톤앤매너 정의 — 일관성 유지 기법', time: '45분' },
          { name: '패키지 제작 워크숍', time: '90분' },
          { name: '프롬프트 템플릿화', time: '30분' },
          { name: '피드백', time: '15분' },
        ],
        output: '상세페이지·SNS 에셋 패키지',
      },
    ],
  },
  {
    id: 'video', num: '12', name: 'AI 영상 콘텐츠 제작', group: 'content',
    desc: '2026년 영상 AI 지형에 맞춘 멀티툴 축. Veo/Flow로 클립을 만들고, 콘티→컷 제작→편집의 숏폼 워크플로를 익힌 뒤, HeyGen 아바타와 콘텐츠 캘린더로 운영까지 설계합니다.',
    tools: ['Veo / Flow', 'Kling', 'Higgsfield', 'HeyGen'],
    capacity: '15~25명', fullPackage: '9H', target: '마케팅·콘텐츠·소상공인',
    levels: [
      {
        lv: 'LV1', hours: '3H', title: '영상 생성 기본기', goal: '프롬프트로 영상 클립을 만든다',
        modules: [
          { name: '2026 영상 AI 지형 — 모델·비용 구조', time: '30분' },
          { name: '영상 프롬프트 기본 — 카메라·오디오', time: '45분' },
          { name: 'Veo/Flow 실습 — 텍스트·이미지→영상', time: '90분' },
          { name: '결과 공유', time: '15분' },
        ],
        output: '첫 클립 3개',
      },
      {
        lv: 'LV2', hours: '3H', title: '숏폼 제작 워크플로', goal: '콘티→클립→편집으로 숏폼을 완성한다',
        modules: [
          { name: '콘티 작성 — 장면별 프롬프트', time: '45분' },
          { name: '컷 제작 — Kling·Higgsfield', time: '75분' },
          { name: '편집·완성 — 자막·플랫폼 규격', time: '45분' },
          { name: '시사회', time: '15분' },
        ],
        output: 'SNS 숏폼 1편',
      },
      {
        lv: 'LV3', hours: '3H', title: '아바타·브랜드 영상 패키지', goal: '브랜드 영상 세트를 만든다',
        modules: [
          { name: 'HeyGen 아바타 영상', time: '60분' },
          { name: '브랜드 영상 패키지 — 인트로·시리즈', time: '60분' },
          { name: '콘텐츠 캘린더 — 제작 파이프라인', time: '45분' },
          { name: '발표', time: '15분' },
        ],
        output: '아바타 영상 + 콘텐츠 캘린더',
      },
    ],
  },
  {
    id: 'agent', num: '13', name: 'AI 에이전트 실무 활용', group: 'content',
    desc: '"답변하는 AI"를 넘어 "일을 수행하는 AI"로. 브라우저 에이전트 체험에서 산출물 제작 위임으로, 그리고 어떤 업무를 맡길지 선별·설계하는 파이프라인까지 다룹니다.',
    tools: ['Genspark', 'Manus', 'Comet'],
    capacity: '15~20명', fullPackage: '9H', target: '기획·마케팅·운영',
    levels: [
      {
        lv: 'LV1', hours: '3H', title: '에이전트 이해와 체험', goal: '챗봇과 에이전트의 차이를 체감한다',
        modules: [
          { name: '챗봇 vs 에이전트 — 2026 지형', time: '45분' },
          { name: '업무 위임 사고법', time: '45분' },
          { name: 'Comet 체험 — 리서치·비교표·폼 입력', time: '75분' },
          { name: '위임 후보 정리', time: '15분' },
        ],
        output: '에이전트 위임 실습 결과',
      },
      {
        lv: 'LV2', hours: '3H', title: '산출물 제작 에이전트', goal: '조사→정리→제작을 통째로 맡긴다',
        modules: [
          { name: 'Genspark 실습 — 완성형 산출물', time: '75분' },
          { name: 'Manus 실습 — 멀티스텝 위임', time: '75분' },
          { name: '품질 검증 체크리스트', time: '30분' },
        ],
        output: '슬라이드·보고서 산출물',
      },
      {
        lv: 'LV3', hours: '3H', title: '업무 파이프라인 설계', goal: '위임할 업무를 선별·설계한다',
        modules: [
          { name: '위임 업무 선별 기준 — 비용 대비 효과', time: '45분' },
          { name: '보안·리스크 — 인젝션·데이터 유의점', time: '45분' },
          { name: '설계 워크숍 — 파이프라인 실행 테스트', time: '75분' },
          { name: '발표', time: '15분' },
        ],
        output: '업무 위임 설계안',
      },
    ],
  },
];

// 세미나 · 특강 (단건)

export type SeminarBadge = 'FREE' | 'HOT' | 'NEW' | 'BEST';

export type Seminar = {
  id: string;
  category: string;
  title: string;
  desc: string;
  meta: { duration: string; target: string; format: string };
  highlights: string[];
  badge?: SeminarBadge;
  gradient: string;
  featured?: boolean;
};

export const seminars: Seminar[] = [
  {
    id: 'open_monthly',
    category: '무료 공개 세미나',
    title: '월간 AI 트렌드 & 실습 세미나',
    desc: 'GPT Image 2.0, Higgsfield, 바이브 코딩 등 그 달 가장 뜨거운 AI 도구를 직접 실습하는 무료 공개 세미나. 도입 전 넥스트젠AI의 교육 품질을 직접 경험해보세요.',
    meta: { duration: '2시간 · 매월 1회', target: '누구나 (선착순 20명)', format: '온라인 / 오프라인' },
    highlights: [
      '참가자 전원 프롬프트·템플릿 패키지 제공',
      '실습 중심 · 질의응답 보장',
      '기업교육 도입 전 품질 검증 기회',
    ],
    badge: 'FREE',
    gradient: 'from-emerald-500 to-teal-500',
    featured: true,
  },
  {
    id: 'inhouse_keynote',
    category: '사내 특강',
    title: '전사 AI 트렌드 특강',
    desc: '전 임직원 대상 1~2시간 키노트형 특강. AI 전환의 필요성과 실제 업무 적용 사례를 데모와 함께 전달해 조직의 AI 공감대를 가장 빠르게 만듭니다.',
    meta: { duration: '1~2시간 · 단회', target: '전 임직원 (인원 제한 없음)', format: '오프라인 / 온라인 중계' },
    highlights: [
      '가장 빠르고 가벼운 AI 교육 시작점',
      '라이브 데모 중심의 몰입형 구성',
      '창립기념일·워크숍·타운홀 연계 가능',
    ],
    badge: 'BEST',
    gradient: 'from-[#8D36EB] to-[#165CFF]',
  },
  {
    id: 'exec_seminar',
    category: '임원 세미나',
    title: '임원·리더 AX 전략 세미나',
    desc: 'C-레벨과 임원이 반나절 만에 AI 전환의 전략적 판단 기준을 세우는 프리미엄 세미나. 업계 최신 사례와 우리 회사 적용 시나리오를 함께 다룹니다.',
    meta: { duration: '2~4시간 · 반일', target: 'C-레벨, 임원, 부서장', format: '오프라인 (소그룹)' },
    highlights: [
      '산업별 AX 사례 브리핑',
      '우리 조직 적용 시나리오 도출',
      '10~20명 소그룹 집중 토론',
    ],
    badge: 'HOT',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'handson_workshop',
    category: '실습 워크숍',
    title: '직무별 AI 핸즈온 워크숍',
    desc: '마케팅·기획·영업 등 특정 팀을 위한 반일~1일 집중 실습. 이론 없이 우리 팀 실제 업무 과제를 AI로 직접 해결하고 결과물을 가지고 돌아갑니다.',
    meta: { duration: '4~8시간 · 반일/1일', target: '특정 직무 팀 (10~30명)', format: '오프라인 실습' },
    highlights: [
      '우리 팀 실제 업무 과제로 실습',
      '당일 완성 결과물 확보',
      '4주 과정 도입 전 파일럿으로 최적',
    ],
    badge: 'NEW',
    gradient: 'from-blue-500 to-indigo-600',
  },
];

// 도입 사례

export type CaseStudy = {
  id: string;
  logo: string;
  logoBg: string;
  name: string;
  size: string;
  industry: string;
  quote: string;
  cardBody: string;
  before: string;
  intervention: string;
  after: string;
  results: { num: string; label: string }[];
  imageBg: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'kakao',
    logo: 'K',
    logoBg: 'linear-gradient(135deg, #FFE01B, #FFCD00)',
    name: '카카오스타일',
    size: '500명+',
    industry: '이커머스',
    quote: '"실무에서 바로 쓰는 교육이라 받자마자 적용했어요"',
    cardBody: '전 직군 AI 리터러시 교육 + 마케팅 팀 AI 콘텐츠 양산 워크플로우 구축',
    before: '마케팅 소재 제작에 평균 3일 소요, 디자이너 리소스 병목',
    intervention: '이미지 AI 4주 과정 + 마케팅 팀 전용 AI 소재 양산 파이프라인 구축',
    after: '소재 제작 1일 이내 완성, 월 300개 이상 소재 생산 가능',
    results: [
      { num: '70%', label: '소재 제작 시간 단축' },
      { num: '5×', label: '월간 콘텐츠 생산량' },
      { num: '40%', label: '외주 비용 절감' },
    ],
    imageBg: 'from-yellow-400 to-orange-400',
  },
  {
    id: 'court',
    logo: '법',
    logoBg: 'linear-gradient(135deg, #1a365d, #2b6cb0)',
    name: '대법원',
    size: '공공기관',
    industry: '법률·공공',
    quote: '"공공기관에서도 AI를 실무에 적용할 수 있다는 걸 알았습니다"',
    cardBody: '법원 직원 대상 AI 리터러시 교육 및 문서 자동화 워크플로우 구축',
    before: '판결문 요약, 문서 검토에 과도한 수작업 시간 소요',
    intervention: 'ChatGPT × Claude 4주 과정, 법률 문서 특화 프롬프트 라이브러리 제공',
    after: '문서 검토 시간 50% 단축, 직원 AI 활용 만족도 95%',
    results: [
      { num: '50%', label: '문서 처리 시간 단축' },
      { num: '95%', label: '교육 만족도' },
      { num: '200명+', label: '교육 수료 인원' },
    ],
    imageBg: 'from-blue-800 to-blue-600',
  },
  {
    id: 'eduwill',
    logo: '에',
    logoBg: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
    name: '에듀윌',
    size: '1000명+',
    industry: '교육',
    quote: '"AI 교육을 판매하는 회사가 AI를 못 쓰면 안 되죠"',
    cardBody: '콘텐츠 기획팀·강사진 대상 AI 콘텐츠 제작 역량 강화',
    before: '콘텐츠 기획에서 제작까지 평균 2주, AI 도입 의지는 있으나 방법 모름',
    intervention: '리더십 12주 프로그램 + 콘텐츠 직군 특화 AI 워크플로우 구축',
    after: '콘텐츠 기획·제작 사이클 1주일로 단축',
    results: [
      { num: '50%', label: '제작 사이클 단축' },
      { num: '3×', label: '월간 콘텐츠 발행량' },
      { num: '90%', label: '수료 후 실무 적용률' },
    ],
    imageBg: 'from-red-500 to-orange-500',
  },
  {
    id: 'samsung',
    logo: '삼',
    logoBg: 'linear-gradient(135deg, #1428A0, #0066CC)',
    name: '삼성금융네트웍스',
    size: '500명+',
    industry: '금융',
    quote: '"규제 산업에서도 AI를 안전하게 쓰는 방법을 알려줬어요"',
    cardBody: '금융 규제 환경에 맞는 AI 거버넌스 수립 + 실무자 AI 역량 교육',
    before: 'AI 활용에 관심은 있으나 보안·컴플라이언스 우려로 도입 못 함',
    intervention: '임원 AI 전략 워크숍 + AI 거버넌스 정책 수립 지원 + 실무자 교육',
    after: '공식 AI 사용 가이드라인 수립, 안전한 AI 활용 환경 구축',
    results: [
      { num: '100%', label: '거버넌스 정책 수립' },
      { num: '300명+', label: '교육 수료' },
      { num: '60%', label: '업무 효율 체감' },
    ],
    imageBg: 'from-blue-900 to-blue-700',
  },
  {
    id: 'sk',
    logo: 'SK',
    logoBg: 'linear-gradient(135deg, #FF0000, #CC0000)',
    name: 'SK경영경제연구소',
    size: '연구기관',
    industry: '컨설팅·리서치',
    quote: '"리서치 시간이 절반으로 줄었습니다. 이제 해석에 집중해요"',
    cardBody: '연구원 대상 AI 리서치 자동화 및 보고서 작성 역량 강화',
    before: '자료 수집과 1차 분석에 연구 시간의 60% 소요',
    intervention: '프롬프트 엔지니어링 4주 + 리서치 특화 AI 워크플로우 구축',
    after: '자료 수집·요약 자동화, 연구자가 인사이트 도출에 집중 가능',
    results: [
      { num: '50%', label: '리서치 시간 단축' },
      { num: '2×', label: '보고서 발행 속도' },
      { num: '85%', label: '직원 만족도' },
    ],
    imageBg: 'from-red-700 to-red-500',
  },
  {
    id: 'ebs',
    logo: 'EBS',
    logoBg: 'linear-gradient(135deg, #003087, #0057d8)',
    name: 'EBS',
    size: '공공기관',
    industry: '교육방송',
    quote: '"교육 콘텐츠 기획에 AI를 쓰니 창의적인 아이디어가 더 많이 나와요"',
    cardBody: '콘텐츠 기획팀·PD 대상 AI 창작 지원 도구 활용 교육',
    before: '콘텐츠 기획 아이디어 고갈, 트렌드 리서치에 많은 시간 낭비',
    intervention: 'ChatGPT × Claude 4주 + 방송 콘텐츠 특화 AI 창작 워크숍',
    after: '기획 초안 작성 시간 70% 단축, 아이디어 발산 단계 효율화',
    results: [
      { num: '70%', label: '기획 초안 작성 단축' },
      { num: '4×', label: '아이디어 발산량' },
      { num: '92%', label: '교육 만족도' },
    ],
    imageBg: 'from-blue-800 to-blue-600',
  },
];

// FAQ

export type FAQ = { q: string; a: string };

export const faqs: FAQ[] = [
  {
    q: '교육 대상 인원과 규모는 어떻게 되나요?',
    a: '최소 10명부터 최대 수백 명 규모까지 유연하게 운영합니다. 소그룹 집중 워크숍(10~20명)부터 전사 교육(100명+)까지 기업 규모에 맞게 커리큘럼과 운영 방식을 조정합니다.',
  },
  {
    q: '정규 과정 말고 1~2시간짜리 특강이나 세미나도 가능한가요?',
    a: '가능합니다. 전사 AI 트렌드 특강(1~2시간), 임원·리더 AX 전략 세미나(2~4시간), 직무별 핸즈온 워크숍(반일~1일) 등 단건 프로그램을 운영합니다. 워크숍·타운홀·창립기념일 등 사내 행사와 연계한 진행도 가능하며, 특강 후 정규 과정으로 확장하는 기업이 가장 많습니다.',
  },
  {
    q: '교육 도입 전에 품질을 미리 확인할 방법이 있나요?',
    a: '매월 1회 무료 공개 세미나를 운영합니다. 교육 담당자분이 직접 참여해 강의 품질과 실습 방식을 경험한 후 도입을 결정하실 수 있습니다. AI-Q 무료 진단과 함께 활용하시면 우리 조직에 맞는 과정을 더 정확히 고를 수 있습니다.',
  },
  {
    q: '온라인으로도 교육이 가능한가요?',
    a: '네, 온라인·오프라인·하이브리드 세 가지 방식 모두 운영합니다. 다만 실습 중심 과정의 경우 오프라인을 권장합니다. 지방 및 해외 거점 기업의 경우 온라인으로 진행하며, 동일한 품질을 보장합니다.',
  },
  {
    q: '비용은 어느 정도인가요?',
    a: '기업 규모, 교육 인원, 커리큘럼 구성에 따라 달라집니다. 표준 단가를 제시하기보다 실제 니즈를 파악한 후 맞춤 견적을 드립니다. 도입 문의를 주시면 영업일 1일 내 연락드립니다.',
  },
  {
    q: '커리큘럼을 우리 회사에 맞게 수정할 수 있나요?',
    a: '가능합니다. 표준 커리큘럼을 기반으로 하되, AI-Q 진단을 통해 우리 조직의 현재 수준을 파악하고 직군·업종·목표에 맞게 커스터마이징합니다. 기존 고객사 사례를 활용한 실습 자료도 제공합니다.',
  },
  {
    q: '강사진은 어떻게 구성되나요?',
    a: 'NextGenAI의 전문 강사진은 모두 실무 AX 컨설팅 경험이 있는 현업 전문가입니다. KAIST·연세대 등 학술 배경과 카카오스타일·삼성·EBS 등 기업 교육 경험을 보유하고 있으며, 기업 규모와 업종에 따라 최적 강사를 배정합니다.',
  },
  {
    q: '교육 효과를 어떻게 측정하나요?',
    a: 'AI-Q 역량 진단을 교육 전후에 각각 실시해 6개 지표(AI 이해도, 도구 활용, 업무 적용, 자동화 수준, 생산성 변화, 조직 확산)의 변화를 정량적으로 측정합니다. 기업별 대시보드로 실시간 현황을 공유하며, 교육 종료 후 30일 성과 리포트도 제공합니다.',
  },
];
