import React, { useState } from 'react';
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
import ConsultationForm from './components/ConsultationForm.jsx';

const scrollToOrder = () => {
  document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
};

const App = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [activeFAQTab, setActiveFAQTab] = useState('공부방');


  // 가치 중심 카피 (짧고 강력)
  const valueProps = [
    { icon: Target, title: '수업이 바뀐다', desc: '2D·3D 그래프, PDF 위 판서, 9대 동시 화면 공유', color: 'accent' },
    { icon: Clock, title: '시간이 절약된다', desc: '케이블 3초 연결, 원터치 녹화, OTA 자동 업데이트', color: 'accent' },
    { icon: Zap, title: '학생이 참여한다', desc: '50포인트 터치, 폰으로 바로 공유, QR로 즉시 전달', color: 'accent' },
    { icon: Shield, title: '운영이 편해진다', desc: '저녁까지 A/S, 무상 1년, 원격 지원', color: 'accent' },
  ];

  const testimonials = [
    { name: '김*현 원장님', date: '24.03.12', stars: 5, text: 'UMIND 판서에 2D·3D 그래프, 각도기, 자가 다 들어있어서 수학 수업할 때 교구 준비가 필요 없어요. PDF 위에 바로 필기하는 것도 편하고, 원터치 수업 녹화로 결석생한테 보내기 딱 좋습니다.', reply: '소중한 후기 감사합니다!' },
    { name: '이*영 원장님', date: '24.02.28', stars: 5, text: 'Eshare로 노트북·아이패드 무선 연결 3초 만에 되고, Quick Share로 학생 오답 사진도 칠판에 바로 띄워요. 48MP 카메라·8 어레이 마이크 내장이라 별도 장비 없이 화상·녹화 잘 됩니다.', reply: '감사합니다!' },
    { name: '박*수 원장님', date: '24.02.28', stars: 5, text: '무반사·ZERO-GAP 터치감이 종이에 쓰는 느낌이라 학생들 반응 좋아요. 수업 중 문제 생겨서 저녁에 전화했는데 바로 받아주시더라고요. 무상 1년에 원격 지원까지 안심입니다.', reply: '앞으로도 만족스러운 사용 되시길!' },
  ];

  const whyNexoValues = [
    { title: '종이처럼 쓰는 터치', desc: '무반사·ZERO-GAP. 눈 피로 ↓, 필기감 ↑' },
    { title: '수업 끝날 때까지 지원', desc: '저녁 8시 40분에도 전화 받습니다' },
    { title: '하나로 끝나는 All-in-One', desc: '4K·스피커·카메라·판서 소프트웨어 통합' },
    { title: '평생 무료 소프트웨어', desc: '구독료 없이 모든 기능 무제한 사용' },
  ];

  const sizeOptions = [
    { size: '65', area: '8~10평 미만', students: '5~8명 내외', dimensions: '가로 1470.9mm × 세로 930mm', imageUrl: '/size-65-install.jpg', videoUrl: '/size-65-video.mp4' },
    { size: '75', area: '10~15평', students: '10~15명', dimensions: '가로 1692.1mm × 세로 1050mm', imageUrl: '/size-75-install.jpg', videoUrl: '/size-75-video.mp4' },
    { size: '86', area: '15평 이상', students: '20명 이상', dimensions: '가로 1943.4mm × 세로 1193mm', imageUrl: '/size-86-install.jpg', videoUrl: '/size-86-video.mp4' },
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
      { q: '엘리베이터 없는데 추가 비용 있나요?', a: '현장 여건에 따라 설치 비용이 달라질 수 있어요. 상담 신청해주시면 정확히 안내해드립니다.' },
      { q: '기존 칠판 철거 해주시나요?', a: '상황에 따라 협의 가능합니다. 상담 시 문의해주세요.' },
      { q: '지방 학원도 설치 되나요?', a: '네, 전국 가능합니다. 수도권 무료, 수도권 외 11만원 추가예요.' },
    ],
    결제지원: [
      { q: '렌탈하면 신용등급 영향 있나요?', a: '아니요. B2B 렌탈이라 개인 신용과 무관해요. (사업자등록증 필요)' },
    ],
    공부방: [
      { q: '공부방에서 전자칠판 사용하기에 적합할까요?', a: '네, 적합해요. 공간 규모와 수강 인원에 맞는 인치를 선택하시면 됩니다. 8~10평·5~8명은 65인치, 10~15평·10~15명은 75인치, 15평 이상·20명 이상은 86인치를 추천드려요.' },
      { q: '아파트 거실이나 작은 방에 설치해도 되나요?', a: '네, 가능합니다. 벽걸이 또는 이동형 스탠드 선택이 가능해요.' },
      { q: '학생이 5~6명인데 괜찮을까요?', a: '65인치면 5~8명 수강생까지 무리 없어요. 50포인트 멀티터치로 여러 명이 동시에 칠판에 필기할 수 있어서 소규모 공부방에 적합합니다.' },
      { q: '집에서 쓰는데 PC 없이 전자칠판만으로 수업 가능한가요?', a: '네, 가능해요. UMIND 판서, Eshare로 폰·태블릿 연결, Quick Share로 교재 사진 공유까지 전자칠판 단독으로 수업하시는 원장님이 많습니다.' },
      { q: '소규모라 가격이 부담되는데 할부·할인 있나요?', a: '상담 시 예산과 운영 규모에 맞춰 할부 및 견적을 안내해 드립니다.' },
    ],
  };

  const toggleFAQ = (index) => setActiveFAQ(activeFAQ === index ? null : index);

  return (
    <div className="min-h-screen bg-surface font-sans text-neutral-800 overflow-x-hidden">
      {/* Top Bar */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur z-50 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <span className="font-extrabold text-xl text-neutral-900">NEXO <span className="text-accent">전자칠판</span></span>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#value" className="text-neutral-600 hover:text-neutral-900 text-sm font-medium">가치</a>
            <a href="#video" className="text-neutral-600 hover:text-neutral-900 text-sm font-medium">시연</a>
            <a href="#reviews" className="text-neutral-600 hover:text-neutral-900 text-sm font-medium">후기</a>
            <a href="tel:032-569-5771" className="text-neutral-600 hover:text-accent text-sm flex items-center gap-1"><Phone className="w-4 h-4" /><span className="text-accent font-bold">032.569.5771</span></a>
          </nav>
          <button onClick={scrollToOrder} className="bg-accent text-white px-5 py-2 rounded-lg text-sm font-bold hover:opacity-90 whitespace-nowrap">상담 신청</button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-[3.5rem] pb-0 bg-surface">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <img src="/main_nexo.png" alt="NEXO 전자칠판 상담 신청" className="w-full h-auto object-contain" />
        </div>
      </section>

      {/* 핵심 가치 4카드 - 짧고 강력 */}
      <section id="value" className="py-16 md:py-20 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-accent font-extrabold text-lg tracking-widest uppercase mb-3">넥소가 주는 가치</p>
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

      {/* NEXO All-in-One Smart Solution */}
      <section className="py-10 md:py-14 bg-accent">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3">NEXO All-in-One Smart Solution</h2>
          <p className="text-base md:text-lg opacity-95 font-semibold">구독료 없이 <strong>평생 무료 업데이트</strong> · 모든 기능 무제한 사용</p>
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
              <div className="relative aspect-video bg-neutral-900">
                <iframe 
                  src="https://www.youtube.com/embed/hSFAHFgniVU?rel=0" 
                  title="Eshare 3초 무선 미러링" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="font-extrabold text-xl md:text-2xl text-neutral-900 mb-2">Eshare · 3초 연결</h3>
                <p className="text-neutral-600 text-sm">9대 동시 화면 공유. Windows·Mac·iOS·Android.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm">
              <div className="relative aspect-video bg-neutral-900">
                <iframe 
                  src="https://www.youtube.com/embed/Ci1uy-5eEJg?rel=0" 
                  title="UMIND 판서 소프트웨어" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="font-extrabold text-xl md:text-2xl text-neutral-900 mb-2">UMIND · PDF 위에 판서</h3>
                <p className="text-neutral-600 text-sm">PDF 위에 판서, 녹화기능으로 수업자료까지</p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-neutral-100">
              <img src="/nexo-classroom-real.png" alt="교실" className="w-full aspect-video object-cover rounded-xl mb-4" />
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
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {['무반사 9H 강화유리', 'ZERO-GAP Bonding', '50포인트 터치', '48MP AI 카메라', '8 어레이 마이크', 'Wi-Fi 6 · Type-C'].map((s, i) => (
              <div key={i} className="flex items-center gap-2 bg-surfaceAlt rounded-xl px-4 py-3"><CheckCircle className="w-4 h-4 text-accent shrink-0" /><span className="text-sm font-medium text-neutral-800">{s}</span></div>
            ))}
          </div>
          <div className="mb-6 rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
            <img src="/nexo-clear-screen.png" alt="빛 반사 없는 선명한 화면 - NEXO 전자칠판" className="w-full h-auto object-cover" />
          </div>
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
            <h3 className="font-extrabold text-lg text-neutral-900 mb-3 flex items-center gap-2">
              <span className="text-accent">✨</span> 빛 반사 없는 선명한 화면
            </h3>
            <p className="text-neutral-700 text-sm leading-relaxed mb-3">
              형광등 아래서도 화면이 번들거리지 않습니다. <strong>무반사(최상위등급) 기술</strong>과 <strong>9H 경도 강화유리</strong>로 눈의 피로를 최소화하고, 
              선명한 화면으로 학생들의 집중도를 높입니다. 특히 창문이 많은 교실이나 밝은 조명 환경에서도 화면이 선명하게 보입니다.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-xs text-neutral-600">형광등 반사 없음 - 눈 피로 감소</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-xs text-neutral-600">창문 옆 설치 시에도 선명</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-xs text-neutral-600">9H 강화유리 - 스크래치 방지</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-xs text-neutral-600">ZERO-GAP - 종이 같은 필기감</span>
              </div>
            </div>
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
              <div key={i} className="rounded-2xl overflow-hidden bg-white border-2 border-accent">
                {opt.videoUrl ? (
                  <div className="bg-neutral-900 overflow-hidden relative">
                    <video 
                      src={opt.videoUrl}
                      controls
                      className="w-full h-auto max-h-[500px] object-contain"
                      playsInline
                    >
                      브라우저가 비디오 태그를 지원하지 않습니다.
                    </video>
                  </div>
                ) : (
                  <div className="aspect-video bg-neutral-100 overflow-hidden relative">
                    {opt.imageUrl ? (
                      <img 
                        src={opt.imageUrl} 
                        alt={`${opt.size}인치 설치 예시`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-neutral-400 text-sm">설치 예시 사진</div>';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">설치 예시</div>
                    )}
                  </div>
                )}
                <div className="p-6 text-center">
                  <div className="font-black text-4xl md:text-5xl text-neutral-900 mb-3">{opt.size}<span className="text-lg font-normal text-neutral-500">인치</span></div>
                  <div className="text-sm text-neutral-600 space-y-1 text-left bg-surfaceAlt rounded-xl px-4 py-3">
                    <p>추천 평수: {opt.area}</p>
                    <p>수강 인원: {opt.students}</p>
                    <p className="text-xs">사이즈: {opt.dimensions}</p>
                  </div>
                </div>
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
              <h4 className="font-extrabold text-xl text-neutral-900 mb-2">무상 1년</h4>
              <p className="text-neutral-600 text-sm">1년 무상 A/S와 원격 지원으로 안심하고 운영하세요</p>
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
            <p className="text-neutral-600 mt-2 text-base font-semibold">실사용 원장님들의 생생한 이야기</p>
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">전자칠판 상담 신청</h2>
          <p className="text-neutral-400 mb-8 text-base font-semibold">환경에 맞는 모델과 견적을 빠르게 안내해드립니다</p>
          <button onClick={scrollToOrder} className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:bg-accent/90 transition-all">상담 신청하기</button>
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

      {/* 상담 신청 */}
      <section id="order" className="py-16 md:py-20 bg-white scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-3">수업의 품격을 높여보세요</h2>
            <p className="text-neutral-600 text-sm font-semibold">간단한 양식으로 견적 받기</p>
          </div>
          <ConsultationForm showExternalLinks />
        </div>
      </section>

      <footer className="py-10 border-t border-neutral-200 bg-surface">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-neutral-500 text-sm">NEXO 전자칠판</span>
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
