import React, { useMemo, useState } from 'react';
import { Copy, FileText, MessageSquare, Sparkles } from 'lucide-react';

const getWeekLabel = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const makeInstallSummary = (text) => {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return '이번 주 설치 사례는 상담 시 맞춤으로 안내드립니다.';
  return lines.map((line, i) => `${i + 1}. ${line}`).join('\n');
};

const buildPostDraft = ({ weekLabel, topic, audience, highlights, installs, cta }) => {
  const highlightLines = highlights
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const highlightText =
    highlightLines.length > 0
      ? highlightLines.map((line, i) => `- ${line}`).join('\n')
      : '- UMIND 판서, 무선 미러링, 원격 지원까지 현장 중심으로 안내드립니다.';

  const installText = makeInstallSummary(installs);

  const title = `[${weekLabel}] ${topic} | ${audience} 운영에 맞춘 전자칠판 활용 팁`;

  const body = [
    `안녕하세요. 넥소코리아입니다.`,
    ``,
    `이번 주에는 ${audience} 운영에 바로 적용할 수 있는 "${topic}" 내용을 정리했습니다.`,
    ``,
    `[핵심 포인트]`,
    highlightText,
    ``,
    `[이번 주 설치/적용 사례]`,
    installText,
    ``,
    `[문의가 많은 질문 요약]`,
    `- 우리 공간에 맞는 인치 선택`,
    `- 설치 방식(벽걸이/이동형)`,
    `- 수업 운영 방식에 맞는 기능 조합`,
    ``,
    `${cta}`,
    ``,
    `#넥소전자칠판 #공부방전자칠판 #학원전자칠판 #수업디지털전환 #UMIND`,
  ].join('\n');

  return { title, body };
};

const buildReplyDraft = ({ question, stance, contact }) => {
  const q = question.trim() || '문의 주신 내용';
  const toneMap = {
    기본: '문의 주셔서 감사합니다.',
    친절: '좋은 질문 남겨주셔서 감사합니다.',
    간결: '문의 내용 확인했습니다.',
  };
  const opening = toneMap[stance] || toneMap.기본;

  return [
    `${opening}`,
    `${q} 관련해서는 설치 환경과 수업 형태에 따라 최적 구성이 달라집니다.`,
    `원하시면 현재 공간(평수/인원/희망 인치) 기준으로 바로 정리해드리겠습니다.`,
    `${contact}`,
  ].join('\n');
};

const ContentAutomationPage = () => {
  const [weekLabel, setWeekLabel] = useState(getWeekLabel());
  const [topic, setTopic] = useState('수업 몰입도를 높이는 UMIND 활용법');
  const [audience, setAudience] = useState('공부방/소규모 학원');
  const [highlights, setHighlights] = useState(
    '2D/3D 그래프와 판서 도구 활용\nPDF/PPT/DOC 파일 즉시 불러오기\n학생 오답 화면 공유와 즉시 피드백'
  );
  const [installs, setInstalls] = useState(
    '인천 서구 / 75인치 / 벽걸이 설치 완료\n서울 강서구 / 65인치 / 이동형 스탠드 설치 완료'
  );
  const [cta, setCta] = useState('상담 신청 링크에서 간단히 남겨주시면 확인 후 빠르게 안내드립니다.');

  const [question, setQuestion] = useState('');
  const [stance, setStance] = useState('기본');
  const [contact, setContact] = useState('문의: 032-569-5771');
  const [copied, setCopied] = useState('');
  const [postAiDraft, setPostAiDraft] = useState(null);
  const [replyAiDraft, setReplyAiDraft] = useState('');
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingReply, setLoadingReply] = useState(false);
  const [errorPost, setErrorPost] = useState('');
  const [errorReply, setErrorReply] = useState('');

  const postDraft = useMemo(
    () => buildPostDraft({ weekLabel, topic, audience, highlights, installs, cta }),
    [weekLabel, topic, audience, highlights, installs, cta]
  );
  const replyDraft = useMemo(
    () => buildReplyDraft({ question, stance, contact }),
    [question, stance, contact]
  );
  const finalPostDraft = postAiDraft || postDraft;
  const finalReplyDraft = replyAiDraft || replyDraft;

  const copyText = async (key, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(''), 1500);
    } catch (e) {
      setCopied('');
    }
  };

  const generatePostWithGemini = async () => {
    setLoadingPost(true);
    setErrorPost('');
    try {
      const response = await fetch('/.netlify/functions/generate-cafe-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'post',
          inputs: { weekLabel, topic, audience, highlights, installs, cta },
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.details || data?.error || 'post_generate_failed');
      }
      setPostAiDraft({
        title: data.title || postDraft.title,
        body: data.body || postDraft.body,
      });
    } catch (e) {
      setErrorPost('Gemini 생성에 실패했습니다. 환경변수(GEMINI_API_KEY)와 함수 배포 상태를 확인해주세요.');
    } finally {
      setLoadingPost(false);
    }
  };

  const generateReplyWithGemini = async () => {
    setLoadingReply(true);
    setErrorReply('');
    try {
      const response = await fetch('/.netlify/functions/generate-cafe-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'reply',
          inputs: { question, stance, contact },
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.details || data?.error || 'reply_generate_failed');
      }
      setReplyAiDraft(data.reply || replyDraft);
    } catch (e) {
      setErrorReply('Gemini 생성에 실패했습니다. 환경변수(GEMINI_API_KEY)와 함수 배포 상태를 확인해주세요.');
    } finally {
      setLoadingReply(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-neutral-800">
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900">카페 운영 자동화</h1>
          <p className="text-sm text-neutral-600 mt-1">주간 홍보글 초안 + 문의 댓글 답변 초안을 한 번에 생성합니다.</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-6">
        <section className="bg-white border border-neutral-200 rounded-2xl p-5 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-extrabold text-neutral-900">주간 글 생성</h2>
          </div>
          <div className="space-y-3">
            <input className="w-full h-10 px-3 rounded-lg border border-neutral-300" value={weekLabel} onChange={(e) => setWeekLabel(e.target.value)} placeholder="기준일 (예: 2026.03.04)" />
            <input className="w-full h-10 px-3 rounded-lg border border-neutral-300" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="이번 주 주제" />
            <input className="w-full h-10 px-3 rounded-lg border border-neutral-300" value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="타깃 독자" />
            <textarea className="w-full px-3 py-2 rounded-lg border border-neutral-300 min-h-[100px]" value={highlights} onChange={(e) => setHighlights(e.target.value)} placeholder="핵심 포인트 (줄바꿈으로 구분)" />
            <textarea className="w-full px-3 py-2 rounded-lg border border-neutral-300 min-h-[100px]" value={installs} onChange={(e) => setInstalls(e.target.value)} placeholder="설치 사례 (줄바꿈으로 구분)" />
            <input className="w-full h-10 px-3 rounded-lg border border-neutral-300" value={cta} onChange={(e) => setCta(e.target.value)} placeholder="마무리 CTA 문구" />
          </div>
        </section>

        <section className="bg-white border border-neutral-200 rounded-2xl p-5 md:p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-extrabold text-neutral-900">생성 결과</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={generatePostWithGemini}
                disabled={loadingPost}
                className="h-9 px-3 rounded-lg border border-accent text-accent text-sm font-bold"
              >
                {loadingPost ? '생성 중...' : 'Gemini로 생성'}
              </button>
              <button
                onClick={() => copyText('post', `${finalPostDraft.title}\n\n${finalPostDraft.body}`)}
                className="h-9 px-3 rounded-lg bg-accent text-white text-sm font-bold inline-flex items-center gap-1"
              >
                <Copy className="w-4 h-4" />
                {copied === 'post' ? '복사됨' : '글 전체 복사'}
              </button>
            </div>
          </div>
          {errorPost && <p className="text-xs text-red-600 mb-2">{errorPost}</p>}
          <div className="space-y-3">
            <div className="border border-neutral-200 rounded-lg p-3 bg-surfaceAlt">
              <p className="text-xs text-neutral-500 mb-1">제목</p>
              <p className="font-bold text-neutral-900 whitespace-pre-wrap">{finalPostDraft.title}</p>
            </div>
            <div className="border border-neutral-200 rounded-lg p-3">
              <p className="text-xs text-neutral-500 mb-1">본문</p>
              <pre className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-700 font-sans">{finalPostDraft.body}</pre>
            </div>
          </div>
        </section>

        <section className="bg-white border border-neutral-200 rounded-2xl p-5 md:p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-extrabold text-neutral-900">문의 댓글 답변 생성</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <textarea className="w-full px-3 py-2 rounded-lg border border-neutral-300 min-h-[100px]" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="댓글 문의 내용 입력" />
              <select className="w-full h-10 px-3 rounded-lg border border-neutral-300 bg-white" value={stance} onChange={(e) => setStance(e.target.value)}>
                <option value="기본">기본</option>
                <option value="친절">친절</option>
                <option value="간결">간결</option>
              </select>
              <input className="w-full h-10 px-3 rounded-lg border border-neutral-300" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="연락 안내 문구" />
            </div>
            <div className="border border-neutral-200 rounded-lg p-3">
              <div className="flex justify-end mb-2 gap-2">
                <button
                  onClick={generateReplyWithGemini}
                  disabled={loadingReply}
                  className="h-9 px-3 rounded-lg border border-neutral-300 text-neutral-700 text-sm font-bold"
                >
                  {loadingReply ? '생성 중...' : 'Gemini로 생성'}
                </button>
                <button
                  onClick={() => copyText('reply', finalReplyDraft)}
                  className="h-9 px-3 rounded-lg bg-neutral-900 text-white text-sm font-bold inline-flex items-center gap-1"
                >
                  <Copy className="w-4 h-4" />
                  {copied === 'reply' ? '복사됨' : '답변 복사'}
                </button>
              </div>
              {errorReply && <p className="text-xs text-red-600 mb-2">{errorReply}</p>}
              <pre className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-700 font-sans">{finalReplyDraft}</pre>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContentAutomationPage;
