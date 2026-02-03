import React, { useState, useRef } from 'react';
import { 
  Monitor, 
  CheckCircle, 
  Zap, 
  Award, 
  ArrowRight,
  BookOpen,
  Video,
  ChevronDown,
  Star,
  Phone,
  FileText,
  MessageCircle,
  Clock,
  Target,
  Shield
} from 'lucide-react';

const scrollToOrder = () => {
  document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
};

const App = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [activeFAQTab, setActiveFAQTab] = useState('공부방');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedMountType, setSelectedMountType] = useState('wall');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const orderFormRef = useRef(null);

  // 가치 중심 카피 (짧고 강력)
  const valueProps = [
    { icon: Target, title: '수업이 바뀐다', desc: '2D·3D 그래프, PDF 위 판서, 9대 동시 화면 공유', color: 'accent' },
    { icon: Clock, title: '시간이 절약된다', desc: '케이블 3초 연결, 원터치 녹화, OTA 자동 업데이트', color: 'accent' },
    { icon: Zap, title: '학생이 참여한다', desc: '50포인트 터치, 폰으로 바로 공유, QR로 즉시 전달', color: 'accent' },
    { icon: Shield, title: '운영이 편해진다', desc: '저녁까지 A/S, 무상 2년, 원격 지원', color: 'accent' },
  ];

  const chatMessages = [
    { type: 'user', text: '전자칠판 공구 가격이 부담되는데...' },
    { type: 'admin', text: '성공운 회원 전용 공동구매로 진행 중이에요.' },
    { type: 'user', text: '가성비 좋은 모델 알려주세요!' },
    { type: 'admin', text: 'NX 시리즈가 딱이에요. UMIND·Eshare 기본 제공됩니다.' },
    { type: 'system', text: '성공운 원장님이 입장하셨습니다.' },
  ];

  const testimonials = [
    { name: '김*현 원장님', date: '24.03.12', stars: 5, text: 'UMIND 판서에 2D·3D 그래프, 각도기, 자가 다 들어있어서 수학 수업할 때 교구 준비가 필요 없어요. PDF 위에 바로 필기하는 것도 편하고, 원터치 수업 녹화로 결석생한테 보내기 딱 좋습니다.', reply: '소중한 후기 감사합니다!' },
    { name: '이*영 원장님', date: '24.02.28', stars: 5, text: 'Eshare로 노트북·아이패드 무선 연결 3초 만에 되고, Quick Share로 학생 오답 사진도 칠판에 바로 띄워요. 48MP 카메라·8 어레이 마이크 내장이라 별도 장비 없이 화상·녹화 잘 됩니다.', reply: '감사합니다!' },
    { name: '박*수 원장님', date: '24.02.28', stars: 5, text: '무반사·ZERO-GAP 터치감이 종이에 쓰는 느낌이라 학생들 반응 좋아요. 수업 중 문제 생겨서 저녁에 전화했는데 바로 받아주시더라고요. 무상 2년에 원격 지원까지 안심입니다.', reply: '앞으로도 만족스러운 사용 되시길!' },
  ];

  const whyNexoValues = [
    { title: '종이처럼 쓰는 터치', desc: '무반사·ZERO-GAP. 눈 피로 ↓, 필기감 ↑' },
    { title: '수업 끝날 때까지 지원', desc: '저녁 8시 40분에도 전화 받습니다' },
    { title: '하나로 끝나는 All-in-One', desc: '4K·스피커·카메라·판서 소프트웨어 통합' },
    { title: '평생 무료 소프트웨어', desc: '타사 연 150만원 상당, 넥소는 무료' },
  ];

  const sizeOptions = [
    { size: '65', label: '추천', area: '8~10평', students: '5~8명', note: '공부방·집 사용. 성공운 회원 대다수 선택', recommended: true },
    { size: '75', label: '표준', area: '10~15평', students: '10~15명', note: '중규모 교실용', recommended: false },
    { size: '86', label: '대형', area: '15평+', students: '20명+', note: '거거익선', recommended: false },
  ];

  const youtubeVideos = [
    { id: 'Ci1uy-5eEJg', title: '넥소 전자칠판 시연', desc: '핵심 기능 한눈에' },
    { id: 'hSFAHFgniVU', title: '3초 무선 미러링', desc: '케이블 없이 연결' },
    { id: 'bLcOVmdYWzM', title: '폰 쉐어 1위 기능', desc: '사진 → 칠판 즉시' },
    { id: 'Ofl5GWPY2lQ', title: '3D 수학 시각화', desc: '구방정식 1초에' },
    { id: '9EZRDCEK7fk', title: '화면+판서 동시', desc: '스마트 수업' },
    { id: 'DycCGxWEzeM', title: '넥소 사용법 가이드', desc: '한 번에 종결' },
  ];

  const faqData = {
    기능사용: [
      { q: '폰으로 찍어서 칠판에 바로 띄울 수 있나요?', a: '네, Quick Share로 가능합니다. 학생 오답을 스마트폰으로 찍어 전송하면 칠판에 즉시 띄워 풀이할 수 있어요.' },
      { q: '아이패드·맥북 연결 되나요?', a: '네, Eshare로 Windows, Mac, Android, iOS 모두 지원됩니다.' },
      { q: '인터넷 창과 판서 동시에 띄울 수 있나요?', a: '네, UMIND 분할 화면으로 한쪽엔 교재, 다른 쪽엔 칠판을 띄울 수 있어요.' },
    ],
    설치배송: [
      { q: '엘리베이터 없는데 추가 비용 있나요?', a: '이번 공구 기간 무료입니다. 계단 운반비·사다리차도 본사 부담해요.' },
      { q: '기존 칠판 철거 해주시나요?', a: '상황에 따라 협의 가능합니다. 상담 시 문의해주세요.' },
      { q: '지방 학원도 설치 되나요?', a: '네, 전국 가능합니다. 수도권 무료, 수도권 외 11만원 추가예요.' },
    ],
    결제지원: [
      { q: '렌탈하면 신용등급 영향 있나요?', a: '아니요. B2B 렌탈이라 개인 신용과 무관해요. (사업자등록증 필요)' },
    ],
    공부방: [
      { q: '공부방·집에서 65인치면 충분할까요?', a: '네, 충분해요. 성공운 회원님 대다수가 공부방·집 사용으로 65인치를 선택하십니다. 8~10평, 학생 5~8명 환경에 최적이에요.' },
      { q: '아파트 거실이나 작은 방에 설치해도 되나요?', a: '네, 가능합니다. 벽걸이 또는 이동형 스탠드 선택이 가능해요. 이동형이면 필요할 때만 꺼내 쓰실 수 있어서 공간 활용이 좋습니다.' },
      { q: '학생이 5~6명인데 괜찮을까요?', a: '65인치면 5~8명 수강생까지 무리 없어요. 50포인트 멀티터치로 여러 명이 동시에 칠판에 필기할 수 있어서 소규모 공부방에 적합합니다.' },
      { q: '집에서 쓰는데 PC 없이 전자칠판만으로 수업 가능한가요?', a: '네, 가능해요. UMIND 판서, Eshare로 폰·태블릿 연결, Quick Share로 교재 사진 공유까지 전자칠판 단독으로 수업하시는 원장님이 많습니다.' },
      { q: '소규모라 가격이 부담되는데 할부·할인 있나요?', a: '성공운 회원 전용 특별 할인가가 적용되고, 할부도 가능해요. 상담 신청하시면 맞춤 견적·할부 조건 안내해 드립니다.' },
    ],
  };

  const toggleFAQ = (index) => setActiveFAQ(activeFAQ === index ? null : index);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const agree = document.getElementById('privacy-agree');
    if (!agree?.checked) { alert('개인정보 수집에 동의해주세요.'); return; }
    const form = e.target;
    const formData = new FormData(form);
    if (!formData.get('size') || !formData.get('quantity')) { alert('인치와 수량을 선택해주세요.'); return; }

    const isLocalhost = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
    if (isLocalhost) {
      console.log('[성공운 주문]', Object.fromEntries(formData.entries()));
      alert('✅ [로컬 테스트] 콘솔에 출력되었습니다.');
      form.reset(); setSelectedSize(''); setSelectedMountType('wall'); setSelectedQuantity('');
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
      const res = await fetch('/.netlify/functions/save-to-sheets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formDataObj) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.details || body.error || '저장 실패');
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ 'form-name': 'nexo-success-order', ...formDataObj }).toString() }).catch(() => {});
      alert('접수되었습니다. 24시간 내 연락드리겠습니다.');
      form.reset(); setSelectedSize(''); setSelectedMountType('wall'); setSelectedQuantity('');
    } catch (err) {
      alert(err.message || '오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-surface font-sans text-neutral-800 overflow-x-hidden">
      {/* Top Bar */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur z-50 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <span className="font-extrabold text-xl text-neutral-900">NEXO <span className="text-accent">X 성공운</span></span>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#value" className="text-neutral-600 hover:text-neutral-900 text-sm font-medium">가치</a>
            <a href="#video" className="text-neutral-600 hover:text-neutral-900 text-sm font-medium">시연</a>
            <a href="#reviews" className="text-neutral-600 hover:text-neutral-900 text-sm font-medium">후기</a>
            <a href="tel:032-569-5771" className="text-neutral-600 hover:text-accent text-sm flex items-center gap-1"><Phone className="w-4 h-4" /><span className="text-accent font-bold">032.569.5771</span></a>
          </nav>
          <button onClick={scrollToOrder} className="bg-accent text-white px-5 py-2 rounded-lg text-sm font-bold hover:opacity-90 whitespace-nowrap">견적 문의</button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-[3.5rem] pb-0 bg-surface">
        <img src="/hero-main.png" alt="NEXO 전자칠판 공동구매" className="w-full max-w-[1024px] h-auto object-contain mx-auto" />
      </section>

      {/* 핵심 가치 4카드 - 짧고 강력 */}
      <section id="value" className="py-16 md:py-20 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-accent font-extrabold text-base tracking-widest uppercase mb-3">넥소가 주는 가치</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight">전자칠판 하나로<br /><span className="text-accent">수업이 바뀝니다</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {valueProps.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="bg-surfaceAlt rounded-2xl p-6 md:p-8 border border-neutral-100 hover:border-accent/30 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4"><Icon className="w-6 h-6 text-accent" /></div>
                  <h3 className="font-extrabold text-xl md:text-2xl text-neutral-900 mb-2">{v.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Software is FREE - 강력한 카피 */}
      <section className="py-10 md:py-14 bg-accent">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3">Software is FREE</h2>
          <p className="text-base md:text-lg opacity-95 font-semibold">타사 연 150만원 상당, <strong>넥소는 평생 무료</strong></p>
        </div>
      </section>

      {/* 넥소 한눈에 - 통합 (기능 시연 + 2열 + 교육 템플릿 → 1개) */}
      <section id="software" className="py-16 md:py-20 bg-surface scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-neutral-500 font-extrabold text-base uppercase tracking-wider mb-3">한눈에 보는 넥소</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900">필요한 건 다 있습니다</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm">
              <img src="/Eshare_Pro.png" alt="Eshare" className="w-full aspect-video object-cover" />
              <div className="p-6">
                <h3 className="font-extrabold text-xl md:text-2xl text-neutral-900 mb-2">Eshare · 3초 연결</h3>
                <p className="text-neutral-600 text-sm">9대 동시 화면 공유. Windows·Mac·iOS·Android.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm">
              <img src="/nexo-problem-statement.png" alt="UMIND 판서" className="w-full aspect-video object-cover" />
              <div className="p-6">
                <h3 className="font-extrabold text-xl md:text-2xl text-neutral-900 mb-2">UMIND · PDF 위에 판서</h3>
                <p className="text-neutral-600 text-sm">2D·3D 그래프, 도형, 자, 각도기. 수학·과학 특화.</p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-neutral-100">
              <img src="/nexo-classroom.png" alt="교실" className="w-full aspect-video object-cover rounded-xl mb-4" />
              <h4 className="font-extrabold text-lg md:text-xl text-neutral-900 mb-1">교실 수업</h4>
              <p className="text-neutral-600 text-xs">자·도형·마인드맵·스티커 메모</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-neutral-100">
              <img src="/Gukpul_img1.png" alt="국어" className="w-full aspect-video object-cover rounded-xl mb-4" />
              <h4 className="font-extrabold text-lg md:text-xl text-neutral-900 mb-1">국어 특화</h4>
              <p className="text-neutral-600 text-xs">지문 분석·문단 구조·논리 도식화</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-neutral-100">
              <img src="/math-3d-graph.png" alt="수학 3D" className="w-full aspect-video object-cover rounded-xl mb-4" />
              <h4 className="font-extrabold text-lg md:text-xl text-neutral-900 mb-1">수학 3D</h4>
              <p className="text-neutral-600 text-xs">구방정식 1초에 시각화</p>
            </div>
          </div>
        </div>
      </section>

      {/* 오픈채팅 - 축약 */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-surfaceAlt rounded-2xl border border-neutral-100 overflow-hidden">
            <div className="bg-neutral-800 text-white px-4 py-3 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="font-extrabold text-base md:text-lg">성공운 공구 오픈채팅</span>
            </div>
            <div className="p-4 space-y-3 min-h-[140px]">
              {chatMessages.map((msg, i) => (
                msg.type === 'system' ? <div key={i} className="flex justify-center"><span className="bg-neutral-200 text-neutral-600 text-sm px-3 py-1 rounded-full">{msg.text}</span></div>
                : msg.type === 'user' ? <div key={i} className="flex gap-2"><div className="w-7 h-7 rounded-full bg-accent/20 shrink-0" /><div className="bg-amber-50 text-sm px-3 py-2 rounded-xl max-w-[80%]">{msg.text}</div></div>
                : <div key={i} className="flex gap-2 justify-end"><div className="bg-neutral-200 text-sm px-3 py-2 rounded-xl max-w-[80%]">{msg.text}</div><div className="w-7 h-7 rounded-full bg-accent/30 shrink-0" /></div>
              ))}
            </div>
            <div className="bg-accent text-white px-6 py-4 flex items-center justify-between">
              <span className="font-extrabold text-base md:text-lg">NEXO X 성공운 한정 공동구매</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </div>
          </div>
        </div>
      </section>

      {/* 시연 영상 */}
      <section id="video" className="py-16 md:py-20 bg-surface scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900">직접 확인하세요</h2>
            <p className="text-neutral-600 mt-2 text-base font-semibold">시연 영상으로 기능을 보세요</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {youtubeVideos.map((v) => (
              <div key={v.id} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video bg-neutral-900">
                  <iframe src={`https://www.youtube.com/embed/${v.id}`} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" />
                </div>
                <div className="p-4">
                  <h4 className="font-extrabold text-neutral-900 text-lg md:text-xl mb-1 line-clamp-1">{v.title}</h4>
                  <p className="text-neutral-500 text-sm">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 왜 넥소인가 - 가치 4카드 */}
      <section className="py-16 md:py-20 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-accent font-extrabold text-base tracking-widest uppercase mb-3">WHY NEXO</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">왜 넥소인가요?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyNexoValues.map((item, i) => (
              <div key={i} className="bg-neutral-800/80 rounded-2xl p-6 border border-neutral-700">
                <h3 className="font-extrabold text-xl md:text-2xl mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 스펙 간소화 */}
      <section id="specs" className="py-16 md:py-20 bg-white scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900">NX 시리즈 스펙</h2>
            <p className="text-accent font-extrabold text-base mt-4 bg-accent/5 border border-accent/20 rounded-lg px-5 py-3 inline-block">"타협하지 않는 퍼포먼스" Android 13→15, Octa-Core, RAM 16GB / ROM 256GB</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {['무반사 9H 강화유리', 'ZERO-GAP Bonding', '50포인트 터치', '48MP AI 카메라', '8 어레이 마이크', 'Wi-Fi 6 · Type-C'].map((s, i) => (
              <div key={i} className="flex items-center gap-2 bg-surfaceAlt rounded-xl px-4 py-3"><CheckCircle className="w-4 h-4 text-accent shrink-0" /><span className="text-sm font-medium text-neutral-800">{s}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* 사이즈 가이드 */}
      <section id="size-guide" className="py-16 md:py-20 bg-surface scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900">우리 학원엔 몇 인치?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {sizeOptions.map((opt, i) => (
              <div key={i} className={`rounded-2xl p-6 text-center bg-white border-2 ${opt.recommended ? 'border-accent shadow-lg' : 'border-neutral-100'}`}>
                {opt.recommended && <span className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-3">추천</span>}
                <div className="font-black text-4xl md:text-5xl text-neutral-900 mb-2">{opt.size}<span className="text-lg font-normal text-neutral-500">인치</span></div>
                <div className="text-sm text-neutral-600 mb-2">{opt.area} · {opt.students}</div>
                <p className="text-xs text-neutral-500">{opt.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 베스트 셀러 - 간소화 */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-surfaceAlt rounded-2xl p-8 border border-neutral-100">
            <div className="flex-1 text-center md:text-left">
              <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-lg">베스트 셀러</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mt-4 mb-2">NX 시리즈</h2>
              <p className="text-neutral-600 text-sm mb-6">원장님들이 가장 많이 선택한 모델. 최다 판매·안정성 갑</p>
              <div className="flex flex-wrap gap-2">
                {['48MP 카메라·8 어레이 마이크', 'OTA 자동 업데이트', '65/75/86인치'].map((p, i) => (
                  <span key={i} className="inline-flex items-center gap-1 bg-white border border-neutral-200 rounded-lg px-3 py-1.5 text-sm font-medium"><CheckCircle className="w-4 h-4 text-accent" />{p}</span>
                ))}
              </div>
            </div>
            <img src="/nexo-best-seller.png" alt="NX 시리즈" className="w-full max-w-sm rounded-xl object-cover" />
          </div>
        </div>
      </section>

      {/* 서비스 - 짧게 */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-3">"원장님의 수업 시간이 곧 저희 업무 시간"</h2>
          <p className="text-neutral-600 mb-8 text-base font-semibold">저녁 수업 중 문제 생기면? 넥소는 전화 받습니다.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-neutral-100">
              <Zap className="w-8 h-8 text-accent mb-3" />
              <h4 className="font-extrabold text-xl text-neutral-900 mb-2">실시간 원격 지원</h4>
              <p className="text-neutral-600 text-sm">전문가가 즉시 접속해 해결해 드려요.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-neutral-100">
              <BookOpen className="w-8 h-8 text-accent mb-3" />
              <h4 className="font-extrabold text-xl text-neutral-900 mb-2">무상 2년</h4>
              <p className="text-neutral-600 text-sm">대기업보다 긴 보증. 운영 부담 ↓</p>
            </div>
          </div>
          <p className="mt-6 text-neutral-600 text-sm"><Phone className="w-4 h-4 inline mr-1" /> <a href="tel:032-569-5771" className="text-accent font-bold">032.569.5771</a></p>
        </div>
      </section>

      {/* 후기 */}
      <section id="reviews" className="py-16 md:py-20 bg-white scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900">원장님들 후기</h2>
            <p className="text-neutral-600 mt-2 text-base font-semibold">직전 공구 참여 원장님들의 생생한 이야기</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-surfaceAlt rounded-2xl p-6 border border-neutral-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">{t.name[0]}</div>
                  <div><span className="font-bold text-sm">{t.name}</span><span className="text-neutral-500 text-sm ml-2">{t.date}</span></div>
                </div>
                <div className="flex gap-0.5 mb-3">{[...Array(t.stars)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}</div>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4">{t.text}</p>
                <div className="pt-4 border-t border-neutral-200"><p className="text-xs text-neutral-500 mb-1">판매자 답변</p><p className="text-neutral-600 text-sm">{t.reply}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price CTA */}
      <section className="py-16 md:py-20 bg-neutral-900 text-white">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">성공운 회원 전용 파격 혜택</h2>
          <p className="text-neutral-400 mb-8 text-base font-semibold">비교할 수 없는 단독 가격을 확인하세요</p>
          <button onClick={scrollToOrder} className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:bg-accent/90 transition-all">상담 신청하고 가격 확인</button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-20 bg-surface scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900">궁금한 점</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {['공부방', '기능사용', '설치배송', '결제지원'].map((tab) => (
              <button key={tab} onClick={() => { setActiveFAQTab(tab); setActiveFAQ(null); }} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${tab === '공부방' ? (activeFAQTab === tab ? 'bg-accent text-white border-2 border-accent shadow-md' : 'bg-accent/10 text-accent border-2 border-accent/50 hover:bg-accent/20') : (activeFAQTab === tab ? 'bg-neutral-900 text-white border border-neutral-900' : 'bg-white text-neutral-600 border border-neutral-200')}`}>{tab}</button>
            ))}
          </div>
          <div className="space-y-3">
            {faqData[activeFAQTab].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
                <button onClick={() => toggleFAQ(i)} className="w-full flex items-center justify-between p-4 text-left">
                  <span className="font-extrabold text-neutral-900 text-base pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform ${activeFAQ === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`grid transition-all ${activeFAQ === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden"><p className="px-4 pb-4 text-neutral-600 text-sm">{faq.a}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 주문 폼 */}
      <section id="order" className="py-16 md:py-20 bg-white scroll-mt-20">
        <div className="max-w-xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-3">수업의 품격을 높여보세요</h2>
            <p className="text-neutral-600 text-sm font-semibold">간단한 양식으로 견적 받기</p>
          </div>
          <form ref={orderFormRef} name="nexo-success-order" method="POST" action="#order" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleOrderSubmit} className="space-y-4 bg-surfaceAlt p-6 md:p-8 rounded-2xl border border-neutral-100">
            <input type="hidden" name="form-name" value="nexo-success-order" />
            <input type="hidden" name="bot-field" />
            <div><label className="block text-sm font-bold mb-1">원장님 성함 *</label><input type="text" name="customer_name" required placeholder="홍길동" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-accent/30" /></div>
            <div><label className="block text-sm font-bold mb-1">학원명</label><input type="text" name="org_name" placeholder="OO학원" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white" /></div>
            <div><label className="block text-sm font-bold mb-1">연락처 *</label><input type="tel" name="phone_number" required placeholder="010-0000-0000" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-accent/30" /></div>
            <div><label className="block text-sm font-bold mb-1">지역/설치환경 *</label><input type="text" name="region" required placeholder="서울 강남 / 3층" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white" /></div>
            <div><label className="block text-sm font-bold mb-1">인치 *</label><select name="size" required value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white"><option value="">선택</option><option value="65">65</option><option value="75">75</option><option value="86">86</option></select></div>
            <div><label className="block text-sm font-bold mb-1">설치 *</label><select name="mount_type" value={selectedMountType} onChange={(e) => setSelectedMountType(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white"><option value="wall">벽걸이</option><option value="stand">이동형</option></select></div>
            <div><label className="block text-sm font-bold mb-1">수량 *</label><select name="quantity" required value={selectedQuantity} onChange={(e) => setSelectedQuantity(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white"><option value="">선택</option><option value="1">1대</option><option value="2">2대</option><option value="3">3대</option><option value="4">4대</option><option value="5">5대</option><option value="6+">6대+</option></select></div>
            <div><label className="block text-sm font-bold mb-1">문의</label><textarea name="inquiry" rows="2" placeholder="궁금한 점" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white resize-none" /></div>
            <div className="bg-white rounded-xl p-4 border border-neutral-200">
              <p className="font-extrabold text-base md:text-lg mb-2">성공운 혜택</p>
              <ul className="text-sm text-neutral-600 space-y-1"><li>· 특별 할인가</li><li>· 무료 설치·교육</li><li>· UMIND·Eshare·Quick Share 기본</li></ul>
            </div>
            <div className="flex items-start gap-3"><input type="checkbox" id="privacy-agree" required className="mt-1" /><label htmlFor="privacy-agree" className="text-xs text-neutral-500">개인정보 수집 동의 (필수)</label></div>
            <button type="submit" className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:bg-accent/90">무료 상담 및 견적 신청</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-neutral-200 bg-surface">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-neutral-500 text-sm">NEXO x 성공운</span>
          <div className="flex gap-6 text-neutral-500 text-xs">
            <a href="https://nexokorea.co.kr" target="_blank" rel="noopener noreferrer" className="hover:text-accent">넥소코리아</a>
            <a href="tel:032-569-5771" className="text-accent font-bold">032.569.5771</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
