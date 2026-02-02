import React, { useState, useRef } from 'react';
import { 
  Monitor, 
  Clock, 
  CheckCircle, 
  Zap, 
  Award, 
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Layout,
  Video,
  Users,
  Eye,
  Cpu,
  Ruler,
  ChevronDown,
  Star
} from 'lucide-react';

const App = () => {
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [activeFAQTab, setActiveFAQTab] = useState('기능사용');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedMountType, setSelectedMountType] = useState('wall');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const orderFormRef = useRef(null);

  const subjects = {
    math: {
      title: '수학 원장님 전용',
      hook: '쌍둥이 문제 10초 만에 추출',
      desc: '문제를 풀고 오답이 나왔을 때, 일일이 문제를 찾으러 PC로 가지 마세요. 넥소 전자칠판은 화면에서 즉시 유사 문제를 생성하여 아이들의 완벽한 이해를 돕습니다.',
      videoLabel: '유사문제 추출 시연 영상 보기',
      imageUrl: '/nexo-subject-solution.png',
    },
    english: {
      title: '영어/국어 원장님 전용',
      hook: '지문 분석과 녹화가 동시에',
      desc: '방대한 지문 위에 바로 하이라이트를 치고 구문을 분석하세요. 수업 내용은 그대로 녹화되어 결석생에게 즉시 전송할 수 있습니다. 교재 준비 시간이 절반으로 줄어듭니다.',
      videoLabel: '지문 분석 툴 시연 영상 보기',
      imageUrl: '/nexo-english-analysis.png',
    }
  };

  // 직관 스타일: 오픈채팅 대화 → "그래서 준비했습니다" 배너
  const chatMessages = [
    { type: 'user', text: '전자칠판 공구 가격이 부담되는데, 할부나 공구는 안 하시나요? ㅠㅠ' },
    { type: 'admin', text: '네, 성공운 회원 전용 공동구매로 진행 중이에요. 상담 신청해 주시면 견적·할부 안내해 드립니다.' },
    { type: 'user', text: 'PC/노트북 연결해서 쓸 거라 가성비 좋은 모델 알려주세요!' },
    { type: 'admin', text: 'PC 연결 위주로 쓰시면 NX 시리즈가 딱이에요. 윈도우 판서·무선 미러링 기본 제공됩니다.' },
    { type: 'system', text: '성공운 원장님이 입장하셨습니다.' },
  ];

  // 공통 사양 + 베스트 셀러 (직관 스타일)
  const commonFeatures = ['화면 녹화', '4K UHD', 'IPS 패널', 'Type C', '윈도우 판서', '무선 미러링'];
  const bestSellerPoints = ['최다 판매, 안정성 갑', '카메라·마이크 내장', '핫키 내장'];

  // 원장님 후기 (직관 스타일)
  const testimonials = [
    { name: '김*현 원장님', date: '24.03.12', stars: 5, text: '다른 대기업 칠판보다 수학 수업용 프로그램 구성이 훨씬 좋아요. 각도기, 자, 컴퍼스까지 있어서 강의하기 편하고, 화면 녹화도 빠르고 고객센터도 친절해서 만족스럽습니다. 학생들 집중도도 올라갔어요.', reply: '소중한 후기 감사합니다. 수업에 더 도움 되시길 바랍니다!' },
    { name: '이*영 원장님', date: '24.02.28', stars: 5, text: '75인치로 설치했는데 크기·속도·편의성 다 만족해요. 윈도우 OS라 자료 공유도 쉽고, 폰 미러링도 잘 돼서 활용도가 높습니다. 스탠드 품질도 좋아서 강추합니다.', reply: '성공운 원장님께서 직접 선택하신 모델이라 더 뿌듯합니다. 감사합니다!' },
    { name: '박*수 원장님', date: '24.02.28', stars: 5, text: '86인치 알파 시리즈 구매했어요. 여러 브랜드 비교했는데 넥소가 가장 믿음이 갔고, 전화 상담해 주신 분도 정말 친절하셨고 배송·설치도 만족스러웠습니다. 화면 밝기는 조금 더 밝으면 좋겠지만 전반적으로 만족합니다.', reply: '후기 감사합니다. 밝기 관련 설정은 설치 시 안내해 드릴게요!' },
  ];

  // SMMT_NEXO 참조: 제품 스펙 (성공운 톤 적용)
  const productSpecs = [
    { icon: Eye, title: '디스플레이', spec: '무반사(최상위등급) & Zero-Bonding / 9H 경도 강화유리', desc: '형광등 아래서도 선명한 시인성, 완벽한 필기감' },
    { icon: Video, title: '사운드 & 마이크 & 카메라', spec: '48MP AI 카메라 + 8 어레이 마이크 내장', desc: '별도 장비 없이 목소리와 판서 화면 동시 녹화' },
    { icon: Cpu, title: '시스템 사양', spec: 'Android 13~15 / Octa-Core / RAM 16GB / ROM 256GB', desc: '수학·영어·국어 모든 수업에 최적화된 고사양' },
  ];

  const sizeOptions = [
    { size: '65', label: '소규모 강의실', area: '8~10평 미만', students: '5~8명 내외', note: '교습소, 공부방, 1:1 과외방 추천', recommended: false },
    { size: '75', label: '표준 강의실', area: '10~15평', students: '10~15명', note: '가장 무난하고 실패 없는 선택', recommended: true },
    { size: '86', label: '대형 강의실', area: '15평 이상', students: '20명 이상', note: '거거익선, 후회 없는 선택', recommended: false },
  ];

  const faqData = {
    기능사용: [
      { q: '문제집을 폰으로 찍어서 칠판에 바로 띄울 수 있나요?', a: '네, Phone Share 기능으로 가능합니다. 학생이 틀린 문제를 스마트폰으로 찍어 전송하면 전자칠판에 즉시 띄워 풀이할 수 있어 오답 노트 수업에 최적화되어 있습니다.' },
      { q: '아이패드나 맥북 연결도 되나요?', a: '네, 유선(HDMI)은 물론 E-share 앱으로 무선 미러링도 지원합니다. 아이패드 화면을 띄운 상태에서 판서도 가능합니다.' },
      { q: '인터넷 창과 판서 화면을 동시에 띄울 수 있나요?', a: '네, 분할 화면(Multi-Window)을 지원합니다. 한쪽엔 유튜브나 교재를, 다른 한쪽엔 칠판을 띄워 수업할 수 있습니다.' },
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
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Monitor className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">NEXO <span className="text-indigo-600">X 성공운</span></span>
          </div>
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-700 transition-all">
            혜택 신청하기
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          {/* 이미지: 가장 위, 사이즈 키움 */}
          <div className="flex justify-center -mx-4 md:-mx-6 lg:-mx-8 mb-10 md:mb-12">
            <img
              src="/hero-nexo-board.png"
              alt="NEXO 전자칠판 - 성공운 스터디룸 특별 공동구매, 매월 5명 한정 최저가"
              className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl h-auto rounded-b-2xl md:rounded-b-3xl shadow-2xl shadow-slate-200/60 object-cover"
            />
          </div>
          {/* 텍스트: 이미지 바로 아래 */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              <Award className="w-4 h-4" /> 성공운 카페 회원 단독 공동구매
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8">
              원장님의 판서 시간이 <br />
              <span className="text-indigo-600">진짜 '가르치는 시간'</span>이 됩니다.
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              단순히 화면만 큰 칠판이 아닙니다. <br />
              성공운 원장님들의 수업 노하우를 그대로 녹여낸 <b>넥소의 교육 전용 소프트웨어</b>로 수업의 질을 높이세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="w-full sm:w-auto bg-slate-900 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                공동구매 혜택 확인하기 <ArrowRight className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <Users className="w-4 h-4" /> 성공운 원장님 120여 명 참여 중
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Point Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Layout className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">수업 특화 UI/UX</h3>
              <p className="text-slate-500 text-sm leading-relaxed">복잡한 설정 없이 원터치로<br />과목별 필요한 앱을 실행하세요.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">준비 시간 50% 단축</h3>
              <p className="text-slate-500 text-sm leading-relaxed">지문 입력, 문제 타이핑 NO!<br />PDF 위에서 바로 시작하는 수업</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">안심 밀착 케어</h3>
              <p className="text-slate-500 text-sm leading-relaxed">원장님 퇴근 시간까지 대기!<br />수업 중 문제 발생 시 즉각 대응</p>
            </div>
          </div>
        </div>
      </section>

      {/* 직관 스타일: 오픈채팅방 UI + "그래서 준비했습니다" 배너 */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase">성공운 공구 오픈채팅</span>
            <h2 className="text-2xl font-bold mt-2">원장님들의 목소리를 들었습니다</h2>
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 text-white px-4 py-3 flex items-center gap-2">
              <span className="text-slate-400">←</span>
              <span className="font-bold text-sm">성공운 공구 오픈채팅방</span>
            </div>
            <div className="p-4 space-y-4 min-h-[200px] bg-slate-50">
              {chatMessages.map((msg, i) => (
                msg.type === 'system' ? (
                  <div key={i} className="flex justify-center">
                    <span className="bg-slate-200 text-slate-600 text-xs px-3 py-1.5 rounded-full">{msg.text}</span>
                  </div>
                ) : msg.type === 'user' ? (
                  <div key={i} className="flex gap-2 items-end">
                    <div className="w-8 h-8 rounded-full bg-indigo-200 shrink-0" />
                    <div className="bg-amber-100 text-slate-800 text-sm px-4 py-2.5 rounded-2xl rounded-bl-md max-w-[85%]">{msg.text}</div>
                  </div>
                ) : (
                  <div key={i} className="flex gap-2 items-end justify-end">
                    <div className="bg-slate-200 text-slate-800 text-sm px-4 py-2.5 rounded-2xl rounded-br-md max-w-[85%]">{msg.text}</div>
                    <div className="w-8 h-8 rounded-full bg-indigo-300 shrink-0" />
                  </div>
                )
              ))}
            </div>
            <div className="bg-red-600 text-white px-6 py-4 flex items-center justify-between gap-4">
              <span className="font-black text-base md:text-lg">그래서 준비했습니다. NEXO X 성공운 한정 공동구매</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </div>
            <p className="px-6 py-3 bg-white border-t border-slate-100 text-slate-600 text-sm leading-relaxed">
              가성비를 중시하시는 원장님들이 많아서, 이번에는 <b>성공운 회원 한정 수량</b>으로만 진행합니다. 제품 Q&A는 아래 FAQ에서, 공동구매 참여는 상담 신청으로 부탁드려요.
            </p>
          </div>
        </div>
      </section>

      {/* Subject Feature Section (Tab Style) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">내 과목에 딱 맞는 기능을 직접 확인하세요.</h2>
            <div className="flex justify-center gap-4 mt-8">
              <button 
                onClick={() => setSelectedSubject('math')}
                className={`px-8 py-3 rounded-full font-bold transition-all ${selectedSubject === 'math' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200'}`}
              >
                수학 전용
              </button>
              <button 
                onClick={() => setSelectedSubject('english')}
                className={`px-8 py-3 rounded-full font-bold transition-all ${selectedSubject === 'english' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200'}`}
              >
                영어/국어 전용
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl shadow-slate-200/50">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-3xl overflow-hidden relative group cursor-pointer bg-slate-900 ring-2 ring-slate-200">
                {subjects[selectedSubject].imageUrl ? (
                  <img src={subjects[selectedSubject].imageUrl} alt={subjects[selectedSubject].hook} className="w-full h-full object-cover" />
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <Video className="w-6 h-6 text-indigo-600 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 text-white font-bold text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
                   {subjects[selectedSubject].videoLabel}
                </div>
              </div>
              <div>
                <div className="text-indigo-600 font-bold mb-2 uppercase tracking-widest text-sm">{subjects[selectedSubject].title}</div>
                <h3 className="text-3xl font-bold mb-6 leading-tight">"{subjects[selectedSubject].hook}"</h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  {subjects[selectedSubject].desc}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-500" />
                    <span className="font-medium">성공운 원장님들이 직접 검증한 기능</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-500" />
                    <span className="font-medium">수업 흐름을 끊지 않는 직관적 UI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Specs - SMMT_NEXO 참조 */}
      <section id="specs" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase">Product Specs</span>
            <h2 className="text-3xl font-bold mt-2">원장님 수업에 최적화된 NX 시리즈 스펙</h2>
            <p className="text-slate-500 mt-2">수학, 영어, 국어 모든 수업 환경에 맞춘 고사양</p>
          </div>
          <div className="bg-slate-50 rounded-2xl shadow-sm overflow-hidden border border-slate-100">
            <table className="w-full">
              <tbody>
                {productSpecs.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                  <tr key={index} className={index < productSpecs.length - 1 ? 'border-b border-slate-200' : ''}>
                    <th className="bg-white text-slate-800 font-bold p-4 text-left w-[32%] align-top">
                      <span className="flex items-center gap-2">
                        <IconComponent className="w-5 h-5 text-indigo-600 shrink-0" />
                        {item.title}
                      </span>
                    </th>
                    <td className="p-4">
                      <span className="font-bold text-slate-900 block">{item.spec}</span>
                      <span className="text-sm text-slate-500">{item.desc}</span>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-slate-500 text-sm flex items-center justify-center gap-1">
            <CheckCircle className="w-4 h-4 text-indigo-500" /> 윈도우(PC) 판서 프로그램도 기본 제공됩니다.
          </p>
        </div>
      </section>

      {/* Size Guide - SMMT_NEXO 참조 */}
      <section id="size-guide" className="py-20 bg-slate-50 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase">Size Guide</span>
            <h2 className="text-3xl font-bold mt-2">"우리 학원에는 몇 인치가 맞을까요?"</h2>
            <p className="text-slate-500 mt-2">가장 많이 고민하시는 부분, 딱 정해드립니다.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {sizeOptions.map((opt, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 text-center relative bg-white border-2 transition-all ${
                  opt.recommended ? 'border-indigo-500 shadow-xl shadow-indigo-100 md:-translate-y-1' : 'border-slate-200 hover:border-indigo-200'
                }`}
              >
                {opt.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    추천
                  </div>
                )}
                <div className="flex justify-center mb-2">
                  <Ruler className={`w-8 h-8 ${opt.recommended ? 'text-indigo-600' : 'text-slate-400'}`} />
                </div>
                <div className={`font-bold mb-1 ${opt.recommended ? 'text-indigo-600' : 'text-slate-500'}`}>{opt.label}</div>
                <div className={`font-black text-slate-900 mb-4 ${opt.recommended ? 'text-4xl' : 'text-3xl'}`}>
                  {opt.size}<span className="text-lg font-normal text-slate-500">인치</span>
                </div>
                <div className="rounded-xl p-4 mb-4 text-sm bg-slate-50 text-slate-600 text-left">
                  <p className="mb-1"><strong>추천 평수:</strong> {opt.area}</p>
                  <p className="mb-1"><strong>수강 인원:</strong> {opt.students}</p>
                </div>
                <p className="text-xs text-slate-500">{opt.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 직관 스타일: 2개 모델 공통사항 + 베스트 셀러 */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="bg-sky-400/90 text-white px-5 py-2 rounded-full text-sm font-bold">PC/노트북 연결 사용자 추천</span>
            <span className="bg-amber-400/90 text-slate-900 px-5 py-2 rounded-full text-sm font-bold">전자칠판 단독 사용자 추천</span>
          </div>
          <p className="text-center text-indigo-200 font-bold text-sm mb-6">바로 직전 공구했던 분들의 후기도 꼼꼼하게 살펴보세요!!</p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
            <h3 className="text-center text-white/90 font-bold text-sm mb-4 uppercase tracking-wider">2개 모델 공통사항</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {commonFeatures.map((f, i) => (
                <div key={i} className="bg-white/15 rounded-xl py-3 px-4 text-center text-sm font-bold">{f}</div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="relative p-8 md:p-12">
              <div className="absolute top-6 left-6 bg-amber-400 text-slate-900 text-xs font-black px-3 py-1.5 rounded-lg shadow-lg">베스트 셀러</div>
              <div className="mt-8">
                <h3 className="text-2xl font-black text-slate-900 mb-2">NX 시리즈</h3>
                <p className="text-slate-500 text-sm mb-6">원장님들이 가장 많이 선택한 모델</p>
                <div className="space-y-2">
                  {bestSellerPoints.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-800 font-bold">
                      <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 text-xs mt-6">65/75/86인치 · 카메라·마이크 내장 · 윈도우 판서 기본</p>
              </div>
            </div>
            <div className="bg-slate-100 flex items-center justify-center p-8 min-h-[280px]">
              <img src="/nexo-best-seller.png" alt="NEXO NX-Series All-in-One Smart Solution - 수업, 화상회의, 발표, 행사 등 모든 업무에 활용" className="rounded-2xl w-full max-w-sm object-cover shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Focus Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-sm font-bold mb-6">Support Only for Education</div>
          <h2 className="text-3xl font-bold mb-6">"저녁 8시 40분에도 전화를 받습니다."</h2>
          <p className="text-slate-600 mb-12 leading-relaxed text-lg">
            대기업은 퇴근했지만, 원장님의 수업은 한창입니다. <br />
            수업 중 돌발 상황이 발생해도 당황하지 마세요. <br />
            넥소의 교육 전용 지원팀은 <b>원장님의 퇴근 시간까지 함께합니다.</b>
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <Zap className="w-8 h-8 text-indigo-600 mb-4" />
              <h4 className="font-bold text-lg mb-2">실시간 원격 지원</h4>
              <p className="text-slate-500 text-sm">기계가 서툰 원장님도 안심하세요. 전문가가 즉시 접속하여 문제를 해결해 드립니다.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <BookOpen className="w-8 h-8 text-indigo-600 mb-4" />
              <h4 className="font-bold text-lg mb-2">무상 서비스 2년 보장</h4>
              <p className="text-slate-500 text-sm">품질에 대한 자신감! 대기업보다 긴 무상 보증 기간으로 원장님의 운영 부담을 줄였습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 직관 스타일: 원장님 후기 (테스티모니얼) */}
      <section id="reviews" className="py-24 bg-slate-50 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 px-5 py-2 rounded-full text-sm font-bold mb-6">
              <Star className="w-4 h-4 fill-current" /> 성공운 NEXO 후기
            </div>
            <h2 className="text-3xl font-bold mb-2">바로 직전 공구했던 원장님들의 후기</h2>
            <p className="text-slate-500">꼼꼼하게 살펴보세요!</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">{t.name[0]}</div>
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{t.name}</span>
                    <span className="text-slate-400 text-xs ml-2">{t.date}</span>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{t.text}</p>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 font-medium mb-1">판매자 답변</p>
                  <p className="text-slate-600 text-sm">{t.reply}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price & Gov Support Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6">성공운 회원 전용 파격 혜택</h2>
            <p className="text-slate-400">비교할 수 없는 단독 가격을 확인하세요.</p>
          </div>
          
          <div className="max-w-xl mx-auto">
            <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-md text-xs font-bold uppercase">성공운 단독</span>
                  <span className="text-slate-400 text-sm">한정 수량 진행</span>
                </div>
                <h4 className="text-2xl font-bold mb-4 italic">"최고의 가성비를 경험하세요"</h4>
                <p className="text-slate-400 text-sm mb-8">대기업 수준의 스펙에 성공운 전용 소프트웨어까지 결합된 독점 공동구매 가격을 확인하세요.</p>
              </div>
              <button className="w-full bg-white text-slate-900 py-4 rounded-xl font-black hover:bg-slate-100 transition-all">
                상담 신청하고 가격 확인
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - SMMT_NEXO 참조 */}
      <section id="faq" className="py-24 bg-slate-50 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase">FAQ</span>
            <h2 className="text-3xl font-bold mt-2">궁금한 점, 여기서 해결하세요</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['기능사용', '설치배송', '결제지원'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveFAQTab(tab); setActiveFAQ(null); }}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeFAQTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-200'
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
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
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
                    <p className="px-5 pb-5 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 mt-0 pt-4 -mt-1">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 주문 신청 폼 (Gukpul 프로젝트 참조) */}
      <section id="order" className="py-24 px-4 bg-white scroll-mt-24">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase">Order</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-2">지금 바로 성공운 혜택가로 <br />수업의 품격을 높여보세요.</h2>
            <p className="text-slate-500">신청서를 남겨주시면 전문 상담원이 24시간 내에 연락드립니다.</p>
          </div>

          <form
            ref={orderFormRef}
            name="nexo-success-order"
            method="POST"
            action="#order"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleOrderSubmit}
            className="space-y-4 bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200"
          >
            <input type="hidden" name="form-name" value="nexo-success-order" />
            <input type="hidden" name="inquiry_date" value={new Date().toISOString().split('T')[0]} />
            <input type="hidden" name="bot-field" />

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1" htmlFor="customer_name">원장님 성함 <span className="text-indigo-600">*</span></label>
              <input type="text" id="customer_name" name="customer_name" required placeholder="홍길동" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1" htmlFor="org_name">학원명 (선택)</label>
              <input type="text" id="org_name" name="org_name" placeholder="예: OO국어전문학원" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1" htmlFor="phone_number">연락처 <span className="text-indigo-600">*</span></label>
              <input type="tel" id="phone_number" name="phone_number" required placeholder="010-0000-0000" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1" htmlFor="region">지역 / 설치 환경 <span className="text-indigo-600">*</span></label>
              <input type="text" id="region" name="region" required placeholder="예: 서울 강남 / 3층 (엘리베이터 없음)" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1" htmlFor="size">인치 종류 <span className="text-indigo-600">*</span></label>
              <select id="size" name="size" required value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                <option value="">인치를 선택해주세요</option>
                <option value="65">65인치</option>
                <option value="75">75인치</option>
                <option value="86">86인치</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1" htmlFor="mount_type">설치 방식 <span className="text-indigo-600">*</span></label>
              <select id="mount_type" name="mount_type" required value={selectedMountType} onChange={(e) => setSelectedMountType(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                <option value="wall">벽걸이</option>
                <option value="stand">이동형 스탠드</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1" htmlFor="quantity">구매 수량 <span className="text-indigo-600">*</span></label>
              <select id="quantity" name="quantity" required value={selectedQuantity} onChange={(e) => setSelectedQuantity(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
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
              <label className="block text-sm font-bold text-slate-800 mb-1" htmlFor="inquiry">문의사항 (선택)</label>
              <textarea id="inquiry" name="inquiry" rows="3" placeholder="궁금한 점이 있으시면 남겨주세요" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none" />
            </div>

            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-5 h-5 text-indigo-600" />
                <span className="text-slate-800 font-bold">성공운 회원 전용 혜택</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" /> 성공운 전용 특별 할인가 적용</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" /> 무료 설치 및 현장 교육 지원</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" /> 과목별 판서·유사문제 솔루션 기본 제공</li>
              </ul>
            </div>

            <div className="flex items-start gap-3 mt-4">
              <input type="checkbox" id="privacy-agree" name="privacy_agree" required className="mt-1 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <label htmlFor="privacy-agree" className="text-xs text-slate-500 leading-tight cursor-pointer">
                [필수] 개인정보 수집 및 이용에 동의합니다. <br />
                (수집 항목: 성명, 연락처, 학원명 / 목적: 상담 및 견적 안내 / 보유 기간: 상담 종료 후 1년)
              </label>
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all mt-4">
              무료 상담 및 견적 신청하기
            </button>
            <p className="text-xs text-center text-slate-400 mt-2">* 신청은 구매 확정이 아니며, 담당자 상담 후 최종 확정됩니다.</p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-400 text-sm font-bold uppercase tracking-widest">Nexo x 성공운</div>
          <div className="flex gap-8 text-slate-400 text-xs font-medium">
            <span>개인정보처리방침</span>
            <span>이용약관</span>
            <span>제휴문의</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
