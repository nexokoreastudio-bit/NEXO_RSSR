import React, { useState } from 'react';

const ConsultationForm = ({ showExternalLinks = false }) => {
  const [submitState, setSubmitState] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitState('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const formBody = new URLSearchParams(formData).toString();

    try {
      const [formResponse, sheetResponse] = await Promise.all([
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formBody,
        }),
        fetch('/.netlify/functions/save-to-sheets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }),
      ]);

      if (!formResponse.ok || !sheetResponse.ok) {
        throw new Error('submit_failed');
      }

      form.reset();
      setSubmitState('success');
    } catch (error) {
      setSubmitState('error');
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <form
        name="nexo-consultation"
        method="post"
        action="/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input type="hidden" name="form-name" value="nexo-consultation" />
        <input type="hidden" name="bot-field" />

        <div>
          <label htmlFor="customer_name" className="block text-sm font-bold text-neutral-800 mb-2">
            성함
          </label>
          <input
            id="customer_name"
            name="customer_name"
            type="text"
            required
            className="w-full h-11 px-4 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-accent/30"
            placeholder="성함을 입력해주세요"
          />
        </div>

        <div>
          <label htmlFor="phone_number" className="block text-sm font-bold text-neutral-800 mb-2">
            연락처
          </label>
          <input
            id="phone_number"
            name="phone_number"
            type="tel"
            required
            className="w-full h-11 px-4 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-accent/30"
            placeholder="예: 010-1234-5678"
          />
        </div>

        <div>
          <label htmlFor="org_name" className="block text-sm font-bold text-neutral-800 mb-2">
            학원/공부방명
          </label>
          <input
            id="org_name"
            name="org_name"
            type="text"
            className="w-full h-11 px-4 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-accent/30"
            placeholder="학원/공부방명을 입력해주세요"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-bold text-neutral-800 mb-2">
            설치 희망 지역
          </label>
          <input
            id="address"
            name="address"
            type="text"
            className="w-full h-11 px-4 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-accent/30"
            placeholder="예: 인천 서구"
          />
        </div>

        <div>
          <p className="block text-sm font-bold text-neutral-800 mb-2">
            모델별 수량 주문
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label htmlFor="qty_65" className="block text-xs font-semibold text-neutral-600 mb-1">
                65인치
              </label>
              <select
                id="qty_65"
                name="qty_65"
                defaultValue="0"
                className="w-full h-11 px-4 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                <option value="0">선택 안 함</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div>
              <label htmlFor="qty_75" className="block text-xs font-semibold text-neutral-600 mb-1">
                75인치
              </label>
              <select
                id="qty_75"
                name="qty_75"
                defaultValue="0"
                className="w-full h-11 px-4 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                <option value="0">선택 안 함</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div>
              <label htmlFor="qty_86" className="block text-xs font-semibold text-neutral-600 mb-1">
                86인치
              </label>
              <select
                id="qty_86"
                name="qty_86"
                defaultValue="0"
                className="w-full h-11 px-4 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                <option value="0">선택 안 함</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div>

        <input type="hidden" name="quantity" value="모델별 수량 주문 입력" />

        <div>
          <label htmlFor="order_summary" className="block text-sm font-bold text-neutral-800 mb-2">
            상담 희망 내용
          </label>
          <input
            id="order_summary"
            name="order_summary"
            type="text"
            className="w-full h-11 px-4 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-accent/30"
            placeholder="예: 75인치 견적 상담"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="mount_type" className="block text-sm font-bold text-neutral-800 mb-2">
              설치 방식
            </label>
            <select
              id="mount_type"
              name="mount_type"
              className="w-full h-11 px-4 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              <option value="">선택해주세요</option>
              <option value="벽걸이">벽걸이</option>
              <option value="이동형 스탠드">이동형 스탠드</option>
              <option value="상담 후 결정">상담 후 결정</option>
            </select>
          </div>
          <div>
            <label htmlFor="elevator" className="block text-sm font-bold text-neutral-800 mb-2">
              엘리베이터 유무
            </label>
            <select
              id="elevator"
              name="elevator"
              className="w-full h-11 px-4 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              <option value="">선택해주세요</option>
              <option value="있음">있음</option>
              <option value="없음">없음</option>
              <option value="모름">모름</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="naver_id" className="block text-sm font-bold text-neutral-800 mb-2">
            네이버 아이디(선택)
          </label>
          <input
            id="naver_id"
            name="naver_id"
            type="text"
            className="w-full h-11 px-4 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-accent/30"
            placeholder="성공운 카페 아이디"
          />
        </div>

        <input type="hidden" name="payment" value="상담 시 협의" />
        <input type="hidden" name="call_time" value="상담 시 협의" />

        <div>
          <label htmlFor="additional_inquiry" className="block text-sm font-bold text-neutral-800 mb-2">
            기타 문의사항
          </label>
          <textarea
            id="additional_inquiry"
            name="additional_inquiry"
            rows="4"
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-accent/30"
            placeholder="추가로 궁금하신 내용을 남겨주세요"
          />
        </div>

        <button
          type="submit"
          disabled={submitState === 'submitting'}
          className="w-full h-12 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 transition-colors"
        >
          {submitState === 'submitting' ? '접수 중...' : '상담 신청하기'}
        </button>

        {submitState === 'success' && (
          <p className="text-sm text-green-700 font-semibold">
            상담 신청이 접수되었습니다. 확인 후 연락드리겠습니다.
          </p>
        )}
        {submitState === 'error' && (
          <p className="text-sm text-red-600 font-semibold">
            접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
          </p>
        )}
      </form>

      {showExternalLinks && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <a
            href="https://blog.naver.com/nexokorea"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-11 rounded-xl border border-neutral-300 bg-white text-neutral-800 font-bold hover:bg-neutral-50 transition-colors"
          >
            넥소 블로그 바로가기
          </a>
          <a
            href="https://nexokorea.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-11 rounded-xl bg-neutral-900 text-white font-bold hover:bg-neutral-800 transition-colors"
          >
            넥소 홈페이지 바로가기
          </a>
        </div>
      )}
    </div>
  );
};

export default ConsultationForm;
