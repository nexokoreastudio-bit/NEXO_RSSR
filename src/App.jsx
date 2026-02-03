import React, { useState, useRef } from 'react';
import { 
  Monitor, 
  CheckCircle, 
  Zap, 
  Award, 
  ArrowRight,
  BookOpen,
  Layout,
  Video,
  Eye,
  Cpu,
  Ruler,
  ChevronDown,
  Star,
  Phone,
  FileText,
  Wifi,
  MessageCircle
} from 'lucide-react';

const scrollToOrder = () => {
  document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
};

const App = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [activeFAQTab, setActiveFAQTab] = useState('기능사용');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedMountType, setSelectedMountType] = useState('wall');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const orderFormRef = useRef(null);

  // 직관 스타일: 오픈채팅 대화 → "그래서 준비했습니다" 배너
  const chatMessages = [
    { type: 'user', text: '전자칠판 공구 가격이 부담되는데, 할부나 공구는 안 하시나요? ㅠㅠ' },
    { type: 'admin', text: '네, 성공운 회원 전용 공동구매로 진행 중이에요. 상담 신청해 주시면 견적·할부 안내해 드립니다.' },
    { type: 'user', text: 'PC/노트북 연결해서 쓸 거라 가성비 좋은 모델 알려주세요!' },
    { type: 'admin', text: 'PC 연결 위주로 쓰시면 NX 시리즈가 딱이에요. UMIND 판서·Eshare 무선 미러링 기본 제공됩니다.' },
    { type: 'system', text: '성공운 원장님이 입장하셨습니다.' },
  ];

  // 공통 사양 (가이드 기반)
  const commonFeatures = ['원터치 수업 녹화', '4K UHD', '50포인트 터치', 'Full-Function Type-C', 'UMIND 판서', 'Eshare 무선 미러링'];
  const bestSellerPoints = ['최다 판매, 안정성 갑', '48MP AI 카메라·8 어레이 마이크 내장', 'OTA 자동 업데이트'];

  // 원장님 후기 (펙트 기반)
  const testimonials = [
    { name: '김*현 원장님', date: '24.03.12', stars: 5, text: 'UMIND 판서에 2D·3D 그래프, 각도기, 자가 다 들어있어서 수학 수업할 때 교구 준비가 필요 없어요. PDF 위에 바로 필기하는 것도 편하고, 원터치 수업 녹화로 결석생한테 보내기 딱 좋습니다. OTA로 업데이트도 알아서 돼서 관리가 수월해요.', reply: '소중한 후기 감사합니다. 수업에 더 도움 되시길 바랍니다!' },
    { name: '이*영 원장님', date: '24.02.28', stars: 5, text: '75인치 NX 시리즈로 설치했어요. Eshare로 노트북·아이패드 무선 연결 3초 만에 되고, Quick Share로 학생이 찍은 오답 사진도 칠판에 바로 띄워요. 48MP 카메라·8 어레이 마이크가 내장돼서 별도 장비 없이 화상·녹화 잘 됩니다. 강추합니다.', reply: '성공운 원장님께서 직접 선택하신 모델이라 더 뿌듯합니다. 감사합니다!' },
    { name: '박*수 원장님', date: '24.02.28', stars: 5, text: '86인치로 설치했습니다. 무반사·ZERO-GAP 터치감이 종이에 쓰는 느낌이라 학생들 필기할 때 반응이 좋아요. 수업 중 문제 생겨서 저녁에 전화했는데 고객센터에서 바로 받아주시더라고요. 무상 2년에 원격 지원도 해주셔서 안심입니다.', reply: '후기 감사합니다. 앞으로도 만족스러운 사용 되시길 바랍니다!' },
  ];

  // 가이드 기반 Product Specs (NX-H Series / High-End 기준)
  const productSpecSections = [
    {
      title: '디스플레이 & 터치 기술',
      icon: Eye,
      items: [
        { spec: '무반사(Anti-Glare) & 9H 강화유리', desc: '빛 반사를 최소화하여 눈의 피로를 줄이고, 스크래치에 강력합니다.' },
        { spec: 'ZERO-GAP Bonding', desc: '패널과 유리 사이의 간격을 없애 실제 종이에 쓰는 듯한 정밀한 터치감을 제공합니다.' },
        { spec: '50포인트 멀티터치', desc: '여러 학생이 동시에 칠판에 필기할 수 있는 멀티 터치를 지원합니다.' },
      ],
    },
    {
      title: '사운드 & 마이크 & 카메라',
      icon: Video,
      items: [
        { spec: '48MP AI 카메라', desc: '4,800만 화소 광각 카메라로 교실 전체를 선명하게 담습니다.' },
        { spec: '8 어레이 마이크', desc: '고성능 마이크가 탑재되어 별도 장비 없이도 목소리를 생생하게 전달합니다.' },
        { spec: '2.1채널 사운드', desc: '20W 스피커 2개와 서브우퍼(Subwoofer)로 풍부한 사운드를 제공합니다. (NX-H/P 기준)' },
      ],
    },
    {
      title: '시스템 사양 (NX-H Series 기준)',
      icon: Cpu,
      items: [
        { spec: 'OS', desc: 'Android 13.0 (Android 15.0 업데이트 지원)' },
        { spec: 'CPU', desc: '고성능 Octa-Core 프로세서' },
        { spec: '메모리', desc: 'RAM 16GB / Storage 256GB (일반적인 8GB 모델 대비 2배의 성능)' },
      ],
    },
    {
      title: '스마트 연결 (Connectivity)',
      icon: Wifi,
      items: [
        { spec: 'Wi-Fi 6 & Bluetooth 5.2', desc: '더 빠르고 안정적인 무선 연결 환경 제공' },
        { spec: 'Full-Function Type-C', desc: '케이블 하나로 화면 출력, 터치 제어, 데이터 전송을 동시에 지원합니다.' },
      ],
    },
  ];

  // 기능 시연 가이드 (Software Feature) - 4대 핵심 기능
  const softwareFeatures = [
    {
      id: 'umind',
      title: 'UMIND 판서 소프트웨어',
      tagline: '판서의 한계를 넘다',
      quote: '단순한 칠판이 아닙니다. 수업을 위한 강력한 도구입니다.',
      image: '/umind-math-formula.png',
      items: [
        { title: '수학/과학 특화 도구', desc: '2D/3D 함수 그래프, 도형, 자, 각도기 등 수업에 필요한 교구를 칠판 안에서 즉시 실행하세요.' },
        { title: '무한 판서 & 제스처 컨트롤', desc: '손가락으로 지우고, 손바닥으로 화면을 이동하는 직관적인 제스처 기능을 지원합니다.' },
        { title: '문서 불러오기', desc: 'PDF, PPT, HWP 등 수업 자료를 UMIND로 바로 불러와 그 위에 판서할 수 있습니다.' },
      ],
    },
    {
      id: 'eshare',
      title: 'Eshare 무선 미러링',
      tagline: '선 없는 자유',
      quote: '케이블을 찾지 마세요. 3초면 충분합니다.',
      image: '/Eshare_Pro.png',
      items: [
        { title: '9대 동시 화면 공유', desc: '선생님의 노트북뿐만 아니라 학생들의 태블릿, 스마트폰까지 최대 9대 기기를 한 화면에 띄울 수 있습니다.' },
        { title: '양방향 제어', desc: '칠판에서 노트북을 터치하여 제어하는 양방향 미러링으로 동선을 획기적으로 줄여줍니다.' },
        { title: '모든 OS 지원', desc: 'Windows, Mac, Android, iOS 무엇이든 상관없습니다.' },
      ],
    },
    {
      id: 'ai-assistant',
      title: 'AI Assistant & Quick Share',
      tagline: '수업의 질을 높이는',
      quote: '인공지능 비서와 함께하는 스마트한 교실',
      image: '/AI_Assistant.png',
      items: [
        { title: '대화형 AI 탑재', desc: 'Google Assistant 및 DeepSeek AI가 탑재되어 음성으로 정보를 검색하고 수업 질의응답을 도와줍니다.' },
        { title: 'Quick Share (폰 공유)', desc: '사진을 찍어 칠판으로 바로 전송하세요. 학생의 오답 노트나 발표 자료를 실시간으로 공유할 수 있습니다.' },
        { title: '원클릭 QR 공유', desc: '오늘 수업한 판서 내용을 QR코드 하나로 학생들에게 즉시 전송하세요.' },
      ],
    },
    {
      id: 'record',
      title: '실시간 녹화 & OTA',
      tagline: '학원 운영의 필수품',
      image: '/Urecord.png',
      items: [
        { title: '원터치 수업 녹화', desc: '별도의 프로그램 없이 칠판 자체 기능으로 수업 화면과 음성을 녹화하여 복습 자료로 활용하세요.' },
        { title: 'OTA 자동 업데이트', desc: '항상 최신 상태의 펌웨어와 기능을 자동으로 업데이트하여 관리의 번거로움을 없앴습니다.' },
      ],
    },
  ];

  const sizeOptions = [
    { size: '65', label: '소규모 강의실', area: '8~10평 미만', students: '5~8명 내외', note: '교습소, 공부방, 1:1 과외방 추천', recommended: false },
    { size: '75', label: '표준 강의실', area: '10~15평', students: '10~15명', note: '가장 무난하고 실패 없는 선택', recommended: true },
    { size: '86', label: '대형 강의실', area: '15평 이상', students: '20명 이상', note: '거거익선, 후회 없는 선택', recommended: false },
  ];

  // study_senior / Nexo 워크스페이스 콘텐츠
  const youtubeVideos = [
    { id: 'Ci1uy-5eEJg', title: '넥소 전자칠판 시연', desc: '내 과목에 딱 맞는 넥소 전자칠판 기능을 확인해보세요' },
    { id: 'hSFAHFgniVU', title: '선 연결 없는 전자칠판? 3초 만에 무선 미러링', desc: '케이블 없이 스마트폰/태블릿을 3초 만에 연결하는 방법' },
    { id: 'bLcOVmdYWzM', title: '선생님들이 진짜 좋아하는 기능 1위! 폰 쉐어', desc: '사진 찍어 바로 칠판으로 보내는 편리한 기능' },
    { id: 'Ofl5GWPY2lQ', title: '구방정식, 1초 만에 3D로 보여주는 전자칠판', desc: '수학 문제를 3D로 시각화하는 혁신적인 기능' },
    { id: '9EZRDCEK7fk', title: '아직도 화면 따로, 판서 따로? 1초 만에 끝내는 스마트 수업', desc: '화면과 판서를 동시에 보여주는 효율적인 수업 방법' },
    { id: 'DycCGxWEzeM', title: '전자칠판 사용법, 넥소 하나로 종결', desc: '넥소 전자칠판의 모든 기능을 한눈에 보는 가이드' },
  ];
  const whyNexoFeatures = [
    { title: '무반사(Anti-Glare) & ZERO-GAP Bonding', desc: '빛 반사 최소화, 9H 강화유리. 실제 종이에 쓰는 듯한 정밀한 터치감' },
    { title: 'Quick Share (폰 공유)', desc: '교육/회의 환경에서 실시간 사진·영상 공유. 학습 자료를 전자칠판에 즉시 표시' },
    { title: 'Eshare 양방향 미러링', desc: '9대 동시 화면 공유, 칠판에서 노트북 제어까지 지원' },
    { title: '48MP AI 카메라 & 8 어레이 마이크', desc: '4,800만 화소 광각 카메라로 교실 전체를 선명하게 담고, 별도 장비 없이 목소리를 생생하게 전달합니다. 화상 수업과 녹화에 최적화' },
    { title: 'OTA 자동 업데이트', desc: '항상 최신 펌웨어와 기능으로 관리 번거로움 해소' },
    { title: 'NX Series 독점 사양', desc: <><strong className="text-accent">"타협하지 않는 압도적 퍼포먼스"</strong> Android 13.0 (15.0 Up), Octa-Core, RAM 16GB / ROM 256GB (High-End 모델 기준)</> },
  ];

  const faqData = {
    기능사용: [
      { q: '문제집을 폰으로 찍어서 칠판에 바로 띄울 수 있나요?', a: '네, Quick Share(폰 공유) 기능으로 가능합니다. 학생이 틀린 문제를 스마트폰으로 찍어 전송하면 전자칠판에 즉시 띄워 풀이할 수 있어 오답 노트 수업에 최적화되어 있습니다.' },
      { q: '아이패드나 맥북 연결도 되나요?', a: '네, Full-Function Type-C 유선 연결은 물론 Eshare 앱으로 무선 미러링도 지원합니다. Windows, Mac, Android, iOS 모두 호환됩니다. 아이패드 화면을 띄운 상태에서 판서도 가능합니다.' },
      { q: '인터넷 창과 판서 화면을 동시에 띄울 수 있나요?', a: '네, UMIND 판서 소프트웨어의 분할 화면(Multi-Window) 기능을 지원합니다. 한쪽엔 유튜브나 교재를, 다른 한쪽엔 칠판을 띄워 수업할 수 있습니다.' },
    ],
    설치배송: [
      { q: '3층인데 엘리베이터가 없어요. 추가 비용이 있나요?', a: '이번 성공운 공구 기간에만 무료로 진행합니다. 계단 운반비(양중비)나 사다리차 비용이 발생해도 본사가 부담합니다. (현장 상황 사전 고지 필요)' },
      { q: '기존 칠판 철거/수거도 해주시나요?', a: '상황에 따라 협의 가능합니다. 상담 신청 시 문의사항에 기존 칠판 종류와 사이즈를 남겨주시면 해피콜 시 안내해 드립니다.' },
      { q: '지방 학원도 설치 가능한가요?', a: '네, 전국(제주·도서산간 제외) 어디든 가능합니다. 수도권은 무료 설치, 수도권 외 지역은 설치비 11만원이 추가됩니다.' },
    ],
    결제지원: [
      { q: '렌탈하면 신용등급에 영향이 있나요?', a: '아니요, 없습니다. 넥소 렌탈은 B2B 렌탈 방식이므로 원장님 개인 신용 점수와 무관하게 이용 가능합니다. (사업자등록증 필요)' },
    ],
  };

  const toggleFAQ = (index) => setActiveFAQ(activeFAQ === index ? null : index);

  // Gukpul 프로젝트 참조: 주문 신청 폼 제출
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const agree = document.getElementById('privacy-agree');
    if (!agree?.checked) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    const form = e.target;
    const formData = new FormData(form);
    const size = formData.get('size');
    const quantity = formData.get('quantity');
    if (!size || !quantity) {
      alert('인치 종류와 구매 수량을 선택해주세요.');
      return;
    }
    const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    if (isLocalhost) {
      console.log('[성공운 주문] 폼 데이터:', Object.fromEntries(formData.entries()));
      alert('✅ [로컬 테스트] 폼 데이터가 콘솔에 출력되었습니다.\n배포 환경에서는 Google Sheets 등으로 전송됩니다.');
      form.reset();
      setSelectedSize('');
      setSelectedMountType('wall');
      setSelectedQuantity('');
      return;
    }
    const formDataObj = {
      customer_name: formData.get('customer_name') || '',
      org_name: formData.get('org_name') || '',
      phone_number: formData.get('phone_number') || '',
      region: formData.get('region') || '',
      size: formData.get('size') || '',
      mount_type: formData.get('mount_type') || 'wall',
      quantity: formData.get('quantity') || '',
      inquiry: formData.get('inquiry') || '',
    };
    try {
      const res = await fetch('/.netlify/functions/save-to-sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDataObj),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.details || body.error || '저장 실패');
      // Netlify Forms에도 백업 제출 (대시보드에서 확인 가능)
      const netlifyParams = new URLSearchParams({
        'form-name': 'nexo-success-order',
        ...formDataObj,
      });
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: netlifyParams.toString() }).catch(() => {});
      alert('주문 신청이 접수되었습니다. 담당자가 24시간 내에 연락드리겠습니다.');
      form.reset();
      setSelectedSize('');
      setSelectedMountType('wall');
      setSelectedQuantity('');
    } catch (err) {
      console.error('[성공운 주문] 제출 오류:', err);
      alert(err.message || '신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-surface font-sans text-neutral-800 overflow-x-hidden">
      {/* Top Bar - LG 스타일 */}
      <div className="fixed top-0 w-full bg-white z-50 border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Monitor className="w-6 h-6 text-neutral-800" />
            <span className="font-bold text-lg text-neutral-900">NEXO <span className="text-accent">X 성공운</span></span>
          </div>
          <a href="#software" className="hidden md:flex items-center gap-2 text-neutral-600 hover:text-neutral-900 text-sm font-medium">기능</a>
          <a href="#video" className="hidden md:flex items-center gap-2 text-neutral-600 hover:text-neutral-900 text-sm font-medium">시연영상</a>
          <a href="#order" onClick={(e) => { e.preventDefault(); scrollToOrder(); }} className="hidden md:flex items-center gap-2 text-neutral-600 hover:text-neutral-900 text-sm font-medium">
            <FileText className="w-4 h-4" /> 온라인 구매 상담
          </a>
          <div className="flex items-center gap-3 md:gap-6 text-sm">
            <span className="hidden lg:flex items-center gap-2 text-neutral-500">
              <FileText className="w-4 h-4 shrink-0" /> 간단한 양식 작성만으로 편리하게 견적을 받아보세요!
            </span>
            <a href="tel:032-569-5771" className="hidden sm:flex items-center gap-1.5 text-neutral-600 hover:text-accent transition-colors">
              <Phone className="w-4 h-4 shrink-0" />
              <span className="text-accent font-bold">032.569.5771</span>
              <span className="text-neutral-500 text-xs">(평일 9:00 ~ 18:00)</span>
            </a>
            <button onClick={scrollToOrder} className="bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity whitespace-nowrap">
              견적 문의하기
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section - NEXO 전자칠판 메인 디자인 */}
      <section className="pt-[3.5rem] pb-0 overflow-hidden bg-surface flex justify-center">
        <img
          src="/hero-main.png"
          alt="NEXO 전자칠판 - 창의력을 키우는 스마트 솔루션. 2/11 4차 공동구매, 매월 첫째주 진행."
          className="w-full max-w-[1400px] h-auto object-contain mx-auto"
        />
      </section>

      {/* 기능 시연 가이드 (Software Feature) - 4대 핵심 기능 */}
      <section id="software" className="py-16 md:py-24 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-neutral-500 text-sm font-medium uppercase tracking-wider">기능 시연 가이드 (Software Feature)</span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mt-2 mb-4">넥소 전자칠판의 핵심 기능을 직접 확인해보세요</h2>
          </div>
          <div className="mb-16 flex justify-center">
            <img src="/nexo-digital-home.png" alt="넥소 전자칠판 실제 홈 화면" className="w-full max-w-2xl rounded-2xl border border-neutral-100 shadow-lg object-contain" />
          </div>
          <div className="space-y-16">
            {softwareFeatures.map((feature, idx) => (
              <div key={feature.id} className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                  <span className="inline-block bg-accent/10 text-accent border border-accent/30 px-4 py-2 rounded-lg text-sm font-bold mb-4">{feature.tagline}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2">[{feature.title}]</h3>
                  {feature.quote && <p className="text-neutral-600 italic mb-6">"{feature.quote}"</p>}
                  <ul className="space-y-4">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-neutral-900 font-medium">{item.title}</strong>
                          <p className="text-neutral-600 text-sm mt-1">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
                  <img src={feature.image} alt={feature.title} className="w-full rounded-2xl border border-neutral-100 shadow-lg object-cover aspect-video" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Software is FREE - study_senior */}
      <section className="py-12 md:py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-3">Software is FREE</h2>
          <p className="text-lg md:text-xl opacity-95">타사 연 150만원 상당의 판서 프로그램, <strong>넥소는 평생 업데이트 포함 무료입니다.</strong></p>
        </div>
      </section>

      {/* 2열 기능 섹션 - LG 스타일 (연결은 더 쉽게 / 회의를 더 편리하게) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-surfaceAlt rounded-2xl overflow-hidden border border-neutral-100">
              <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                <img src="/Eshare_Pro.png" alt="Eshare 무선 미러링" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-3">연결은 더 쉽게</h3>
                <p className="text-neutral-600 mb-4">케이블을 찾지 마세요. 3초면 충분합니다. Eshare로 최대 9대 기기 동시 화면 공유. Windows, Mac, Android, iOS 모두 지원.</p>
                <span className="text-sm text-neutral-500 block">Eshare 무선 미러링</span>
              </div>
            </div>
            <div className="bg-surfaceAlt rounded-2xl overflow-hidden border border-neutral-100">
              <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                <img src="/nexo-problem-statement.png" alt="넥소칠판 문제 지문" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-3">수업을 더 편리하게</h3>
                <p className="text-neutral-600 mb-4">UMIND 판서로 PDF, PPT, HWP 위에 바로 판서. 2D/3D 그래프, 도형, 자, 각도기 등 수학·과학 특화 도구 내장.</p>
                <span className="text-sm text-neutral-500 block">UMIND 판서 소프트웨어</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 성공운 오픈채팅 - 원장님 목소리 */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <span className="text-neutral-500 text-sm font-medium uppercase tracking-wider">성공운 공구 오픈채팅</span>
            <h2 className="text-2xl font-bold text-neutral-900 mt-2">원장님들의 목소리를 들었습니다</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
            <div className="bg-neutral-800 text-white px-4 py-3 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="font-bold text-sm">성공운 공구 오픈채팅방</span>
            </div>
            <div className="p-4 space-y-4 min-h-[180px] bg-surfaceAlt">
              {chatMessages.map((msg, i) => (
                msg.type === 'system' ? (
                  <div key={i} className="flex justify-center">
                    <span className="bg-neutral-200 text-neutral-600 text-xs px-3 py-1.5 rounded-full">{msg.text}</span>
                  </div>
                ) : msg.type === 'user' ? (
                  <div key={i} className="flex gap-2 items-end">
                    <div className="w-8 h-8 rounded-full bg-accent/20 shrink-0" />
                    <div className="bg-amber-50 text-neutral-800 text-sm px-4 py-2.5 rounded-2xl rounded-bl-md max-w-[85%]">{msg.text}</div>
                  </div>
                ) : (
                  <div key={i} className="flex gap-2 items-end justify-end">
                    <div className="bg-neutral-200 text-neutral-800 text-sm px-4 py-2.5 rounded-2xl rounded-br-md max-w-[85%]">{msg.text}</div>
                    <div className="w-8 h-8 rounded-full bg-accent/30 shrink-0" />
                  </div>
                )
              ))}
            </div>
            <div className="bg-accent text-white px-6 py-4 flex items-center justify-between gap-4">
              <span className="font-bold text-base">그래서 준비했습니다. NEXO X 성공운 한정 공동구매</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </div>
            <p className="px-6 py-3 bg-white border-t border-neutral-100 text-neutral-600 text-sm">가성비를 중시하시는 원장님들이 많아서, 이번에는 <b>성공운 회원 한정 수량</b>으로만 진행합니다.</p>
          </div>
        </div>
      </section>

      {/* 교육용 템플릿 + 국어 특화 - Gukpul_img1, math-3d-graph */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-neutral-500 text-sm font-medium uppercase tracking-wider">교육용 템플릿</span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mt-2">다양한 교육용 템플릿 및 교육 도구 제공</h2>
            <p className="text-neutral-600 mt-3 max-w-2xl mx-auto">학생의 활발한 참여를 유도하고 직관적인 수업을 가능하게 합니다.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-surfaceAlt rounded-2xl border border-neutral-100 overflow-hidden">
              <img src="/nexo-classroom.png" alt="교실 수업 환경" className="w-full aspect-video object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-neutral-900 mb-2">교실 수업 환경</h3>
                <p className="text-neutral-600 text-sm">자, 도형, 표, 마인드 맵, 스티커 메모 등 직관적인 도구</p>
              </div>
            </div>
            <div className="bg-surfaceAlt rounded-2xl border border-neutral-100 overflow-hidden">
              <img src="/Gukpul_img1.png" alt="국어 수업 특화 판서 도구" className="w-full aspect-video object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-neutral-900 mb-2">국어 수업 특화</h3>
                <p className="text-neutral-600 text-sm">지문 분석 특화 도구, 무한 판서 & 편집, 문단 구조 분석·논리 흐름 도식화</p>
              </div>
            </div>
          </div>
          <div className="mt-8 bg-surfaceAlt rounded-2xl border border-neutral-100 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0 items-center">
              <div className="p-6 md:p-10">
                <h3 className="font-bold text-neutral-900 text-xl mb-4">수학 3D 그래프</h3>
                <p className="text-neutral-600">구방정식, 1초 만에 3D로 보여주는 전자칠판. 수학 문제를 3D로 시각화하는 혁신적인 기능.</p>
              </div>
              <img src="/math-3d-graph.png" alt="수학 3D 그래프" className="w-full aspect-video md:aspect-auto md:min-h-[200px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 과목별 솔루션 - 시연 영상 */}
      <section id="video" className="py-16 md:py-24 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-neutral-500 text-sm font-medium uppercase tracking-wider">과목별 솔루션</span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mt-2">내 과목에 딱 맞는 기능을 직접 확인하세요</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {youtubeVideos.map((v) => (
              <div key={v.id} className="bg-surfaceAlt rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video bg-neutral-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-neutral-900 text-sm mb-2 line-clamp-2">{v.title}</h4>
                  <p className="text-neutral-600 text-xs">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NEXO */}
      <section className="py-16 md:py-24 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-accent font-bold text-sm tracking-widest uppercase">WHY NEXO</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-4">왜 NEXO인가요?</h2>
            <p className="text-neutral-400">AI 디지털 환경을 위한 NEXO 전자칠판. 학원 운영의 새로운 표준을 제시합니다.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {whyNexoFeatures.map((item, i) => (
              <div key={i} className="bg-neutral-800/80 rounded-2xl p-6 md:p-8 border border-neutral-700">
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Specs - 가이드 기반 상세 스펙 */}
      <section id="specs" className="py-16 md:py-24 bg-surface scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-neutral-500 text-sm font-medium uppercase tracking-wider">Product Specs</span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mt-2">원장님 수업에 최적화된 NX 시리즈 스펙</h2>
            <p className="text-neutral-600 mt-2">수학, 영어, 국어 모든 수업 환경에 맞춘 고사양 하드웨어</p>
            <p className="text-accent font-bold text-base mt-4 bg-accent/5 border border-accent/20 rounded-lg px-4 py-3">"타협하지 않는 압도적 퍼포먼스" Android 13.0 (15.0 Up), Octa-Core CPU, RAM 16GB / ROM 256GB (NX-H Series / High-End 모델 기준)</p>
          </div>
          <div className="space-y-6">
            {productSpecSections.map((section, sIdx) => {
              const IconComp = section.icon;
              return (
                <div key={sIdx} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                  <div className="bg-surfaceAlt px-5 py-4 border-b border-neutral-100 flex items-center gap-2">
                    <IconComp className="w-5 h-5 text-accent shrink-0" />
                    <h3 className="font-bold text-neutral-900">{section.title}</h3>
                  </div>
                  <div className="divide-y divide-neutral-100">
                    {section.items.map((item, i) => (
                      <div key={i} className="p-5">
                        <span className="font-bold text-neutral-900 block">{item.spec}</span>
                        <span className="text-sm text-neutral-600">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Size Guide */}
      <section id="size-guide" className="py-16 md:py-24 bg-white scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-neutral-500 text-sm font-medium uppercase tracking-wider">Size Guide</span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mt-2">"우리 학원에는 몇 인치가 맞을까요?"</h2>
            <p className="text-neutral-600 mt-2">가장 많이 고민하시는 부분, 딱 정해드립니다.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {sizeOptions.map((opt, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 text-center relative bg-surfaceAlt border-2 transition-all ${
                  opt.recommended ? 'border-accent shadow-lg md:-translate-y-1' : 'border-neutral-100 hover:border-neutral-200'
                }`}
              >
                {opt.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    추천
                  </div>
                )}
                <div className="flex justify-center mb-2">
                  <Ruler className={`w-8 h-8 ${opt.recommended ? 'text-accent' : 'text-neutral-400'}`} />
                </div>
                <div className={`font-bold mb-1 ${opt.recommended ? 'text-accent' : 'text-neutral-600'}`}>{opt.label}</div>
                <div className={`font-black text-neutral-900 mb-4 ${opt.recommended ? 'text-4xl' : 'text-3xl'}`}>
                  {opt.size}<span className="text-lg font-normal text-neutral-500">인치</span>
                </div>
                <div className="rounded-xl p-4 mb-4 text-sm bg-white border border-neutral-100 text-neutral-600 text-left">
                  <p className="mb-1"><strong>추천 평수:</strong> {opt.area}</p>
                  <p className="mb-1"><strong>수강 인원:</strong> {opt.students}</p>
                </div>
                <p className="text-xs text-neutral-500">{opt.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 베스트 셀러 + 공통사항 */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="bg-neutral-800 text-white px-5 py-2 rounded-lg text-sm font-bold">PC/노트북 연결 사용자 추천</span>
            <span className="bg-white border border-neutral-200 text-neutral-800 px-5 py-2 rounded-lg text-sm font-bold">전자칠판 단독 사용자 추천</span>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-100 p-6 mb-8">
            <h3 className="text-center text-neutral-500 font-medium text-sm mb-4 uppercase tracking-wider">2개 모델 공통사항</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {commonFeatures.map((f, i) => (
                <div key={i} className="bg-surfaceAlt rounded-xl py-3 px-4 text-center text-sm font-medium text-neutral-700 border border-neutral-100">{f}</div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-0 items-center bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm">
            <div className="relative p-8 md:p-12">
              <div className="absolute top-6 left-6 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">베스트 셀러</div>
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">NX 시리즈</h3>
                <p className="text-neutral-600 text-sm mb-6">원장님들이 가장 많이 선택한 모델</p>
                <div className="space-y-3">
                  {bestSellerPoints.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-neutral-800 font-medium">
                      <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
                <p className="text-neutral-500 text-xs mt-6">65/75/86인치 · 48MP AI 카메라·8 어레이 마이크 내장 · UMIND 판서 기본</p>
              </div>
            </div>
            <div className="bg-surfaceAlt flex items-center justify-center p-8 min-h-[280px] gap-4">
              <img src="/nexo-best-seller.png" alt="NEXO NX-Series" className="rounded-xl w-full max-w-sm object-cover" />
              <img src="/nexo-nh.png" alt="NEXO NX" className="hidden lg:block max-h-32 object-contain" />
            </div>
          </div>
          <div className="mt-8 bg-white rounded-2xl border border-neutral-100 p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">이 모든 고민, NEXO 하나로 끝내세요</h3>
                <p className="text-neutral-600 mb-6">PC, 스피커, 카메라, 판서 소프트웨어가 하나로 통합된 All-in-One 솔루션. 선 하나만 꽂으면, 원장님의 강의실이 최고의 스마트 교실로 완성됩니다.</p>
                <ul className="space-y-2">
                  {['초고화질 4K UHD Display', '무반사(Anti-Glare) & ZERO-GAP Bonding·9H 강화유리', 'Eshare 무선 양방향 9대 동시 미러링', 'Google Assistant & DeepSeek AI 탑재', '50포인트 멀티터치·Full-Function Type-C'].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-neutral-700"><CheckCircle className="w-4 h-4 text-accent shrink-0" />{f}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-center gap-4">
                <img src="/umind-math-formula.png" alt="UMIND 판서 소프트웨어" className="rounded-xl w-full max-w-sm object-cover shadow-lg" />
                <img src="/QR.png" alt="원클릭 QR 공유" className="rounded-xl w-32 h-32 object-cover border border-neutral-100" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Focus - 2열 카드 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-neutral-500 text-sm font-medium uppercase tracking-wider">Support Only for Education</span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mt-2">"원장님의 수업 시간이 곧 저희 업무 시간입니다."</h2>
            <p className="text-neutral-600 mt-3 max-w-2xl mx-auto">
              학원 원장님은 오후 6시에 퇴근하지 않습니다. 아이들이 있는 한 수업은 이어지고, 문제는 수업 중에 생깁니다. 대기업 A/S는 퇴근했지만, 넥소 교육 전용 지원팀은 원장님의 마지막 수업이 끝날 때까지 전화를 받습니다.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-surfaceAlt rounded-2xl p-8 border border-neutral-100">
              <Zap className="w-8 h-8 text-accent mb-4" />
              <h4 className="font-bold text-lg text-neutral-900 mb-2">실시간 원격 지원</h4>
              <p className="text-neutral-600 text-sm leading-relaxed">기계가 서툰 원장님도 안심하세요. 전문가가 즉시 접속하여 문제를 해결해 드립니다.</p>
            </div>
            <div className="bg-surfaceAlt rounded-2xl p-8 border border-neutral-100">
              <BookOpen className="w-8 h-8 text-accent mb-4" />
              <h4 className="font-bold text-lg text-neutral-900 mb-2">무상 서비스 2년 보장</h4>
              <p className="text-neutral-600 text-sm leading-relaxed">품질에 대한 자신감! 대기업보다 긴 무상 보증 기간으로 원장님의 운영 부담을 줄였습니다.</p>
            </div>
          </div>
          <p className="mt-6 text-center text-neutral-600 text-sm">
            <Phone className="w-4 h-4 inline mr-1" /> A/S 문의 · 설치 상담: <a href="tel:032-569-5771" className="text-accent font-bold hover:underline">032.569.5771</a>
          </p>
        </div>
      </section>

      {/* 원장님 후기 */}
      <section id="reviews" className="py-16 md:py-24 bg-surface scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-neutral-500 text-sm font-medium uppercase tracking-wider">성공운 NEXO 후기</span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mt-2">바로 직전 공구했던 원장님들의 후기</h2>
            <p className="text-neutral-600 mt-2">꼼꼼하게 살펴보세요!</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-neutral-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-surfaceAlt flex items-center justify-center text-accent font-bold text-sm border border-neutral-100">{t.name[0]}</div>
                  <div>
                    <span className="font-bold text-neutral-900 text-sm">{t.name}</span>
                    <span className="text-neutral-500 text-xs ml-2">{t.date}</span>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4">{t.text}</p>
                <div className="pt-4 border-t border-neutral-100">
                  <p className="text-xs text-neutral-500 font-medium mb-1">판매자 답변</p>
                  <p className="text-neutral-600 text-sm">{t.reply}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price CTA */}
      <section className="py-16 md:py-24 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">성공운 회원 전용 파격 혜택</h2>
            <p className="text-neutral-400">비교할 수 없는 단독 가격을 확인하세요.</p>
          </div>
          <div className="max-w-xl mx-auto">
            <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-accent text-white px-3 py-1 rounded-md text-xs font-bold uppercase">성공운 단독</span>
                <span className="text-neutral-400 text-sm">한정 수량 진행</span>
              </div>
              <h4 className="text-xl md:text-2xl font-bold mb-4">"최고의 가성비를 경험하세요"</h4>
              <p className="text-neutral-400 text-sm mb-8">대기업 수준의 스펙에 성공운 전용 소프트웨어까지 결합된 독점 공동구매 가격을 확인하세요.</p>
              <button onClick={scrollToOrder} className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:bg-accent/90 transition-all">
                상담 신청하고 가격 확인
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 bg-surface scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-neutral-500 text-sm font-medium uppercase tracking-wider">FAQ</span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mt-2">궁금한 점, 여기서 해결하세요</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['기능사용', '설치배송', '결제지원'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveFAQTab(tab); setActiveFAQ(null); }}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeFAQTab === tab ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {faqData[activeFAQTab].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-neutral-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-surfaceAlt/50 transition-colors"
                >
                  <span className="font-bold text-neutral-900 pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      activeFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-200 ease-out ${
                    activeFAQ === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pt-0 text-neutral-600 text-sm leading-relaxed border-t border-neutral-100 mt-0 pt-4 -mt-1">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 주문 신청 폼 */}
      <section id="order" className="py-16 md:py-24 px-4 md:px-6 bg-white scroll-mt-24">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-neutral-500 text-sm font-medium uppercase tracking-wider">Order</span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mt-2 mb-2">지금 바로 성공운 혜택가로 <br />수업의 품격을 높여보세요.</h2>
            <p className="text-neutral-600">간단한 양식 작성만으로 편리하게 견적을 받아보세요!</p>
          </div>

          <form
            ref={orderFormRef}
            name="nexo-success-order"
            method="POST"
            action="#order"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleOrderSubmit}
            className="space-y-4 bg-surfaceAlt p-6 md:p-8 rounded-2xl border border-neutral-100"
          >
            <input type="hidden" name="form-name" value="nexo-success-order" />
            <input type="hidden" name="inquiry_date" value={new Date().toISOString().split('T')[0]} />
            <input type="hidden" name="bot-field" />

            <div>
              <label className="block text-sm font-bold text-neutral-800 mb-1" htmlFor="customer_name">원장님 성함 <span className="text-accent">*</span></label>
              <input type="text" id="customer_name" name="customer_name" required placeholder="홍길동" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-800 mb-1" htmlFor="org_name">학원명 (선택)</label>
              <input type="text" id="org_name" name="org_name" placeholder="예: OO국어전문학원" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-800 mb-1" htmlFor="phone_number">연락처 <span className="text-accent">*</span></label>
              <input type="tel" id="phone_number" name="phone_number" required placeholder="010-0000-0000" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-800 mb-1" htmlFor="region">지역 / 설치 환경 <span className="text-accent">*</span></label>
              <input type="text" id="region" name="region" required placeholder="예: 서울 강남 / 3층 (엘리베이터 없음)" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-800 mb-1" htmlFor="size">인치 종류 <span className="text-accent">*</span></label>
              <select id="size" name="size" required value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white">
                <option value="">인치를 선택해주세요</option>
                <option value="65">65인치</option>
                <option value="75">75인치</option>
                <option value="86">86인치</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-800 mb-1" htmlFor="mount_type">설치 방식 <span className="text-accent">*</span></label>
              <select id="mount_type" name="mount_type" required value={selectedMountType} onChange={(e) => setSelectedMountType(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white">
                <option value="wall">벽걸이</option>
                <option value="stand">이동형 스탠드</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-800 mb-1" htmlFor="quantity">구매 수량 <span className="text-accent">*</span></label>
              <select id="quantity" name="quantity" required value={selectedQuantity} onChange={(e) => setSelectedQuantity(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white">
                <option value="">수량을 선택해주세요</option>
                <option value="1">1대</option>
                <option value="2">2대</option>
                <option value="3">3대</option>
                <option value="4">4대</option>
                <option value="5">5대</option>
                <option value="6+">6대 이상</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-800 mb-1" htmlFor="inquiry">문의사항 (선택)</label>
              <textarea id="inquiry" name="inquiry" rows="3" placeholder="궁금한 점이 있으시면 남겨주세요" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none" />
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-5 h-5 text-accent" />
                <span className="text-neutral-800 font-bold">성공운 회원 전용 혜택</span>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" /> 성공운 전용 특별 할인가 적용</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" /> 무료 설치 및 현장 교육 지원</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" /> UMIND 판서·Eshare·Quick Share 기본 제공</li>
              </ul>
            </div>

            <div className="flex items-start gap-3 mt-4">
              <input type="checkbox" id="privacy-agree" name="privacy_agree" required className="mt-1 w-4 h-4 rounded border-neutral-300 text-accent focus:ring-accent/30" />
              <label htmlFor="privacy-agree" className="text-xs text-neutral-500 leading-tight cursor-pointer">
                [필수] 개인정보 수집 및 이용에 동의합니다. <br />
                (수집 항목: 성명, 연락처, 학원명 / 목적: 상담 및 견적 안내 / 보유 기간: 상담 종료 후 1년)
              </label>
            </div>

            <button type="submit" className="w-full bg-accent text-white font-bold text-lg py-4 rounded-xl hover:bg-accent/90 transition-all mt-4">
              무료 상담 및 견적 신청하기
            </button>
            <p className="text-xs text-center text-neutral-500 mt-2">* 신청은 구매 확정이 아니며, 담당자 상담 후 최종 확정됩니다.</p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-200 bg-surface">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-neutral-500 text-sm font-medium uppercase tracking-wider">NEXO x 성공운</div>
          <div className="flex flex-wrap gap-6 text-neutral-500 text-xs font-medium">
            <a href="https://nexokorea.co.kr" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">넥소코리아 홈페이지</a>
            <span className="hover:text-neutral-700 cursor-pointer">개인정보처리방침</span>
            <span className="hover:text-neutral-700 cursor-pointer">이용약관</span>
            <span className="hover:text-neutral-700 cursor-pointer">제휴문의</span>
            <a href="tel:032-569-5771" className="text-accent font-bold">032.569.5771</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
