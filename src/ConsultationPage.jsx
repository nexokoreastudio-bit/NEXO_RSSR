import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import ConsultationForm from './components/ConsultationForm.jsx';

const ConsultationPage = () => {
  return (
    <div className="min-h-screen bg-surface font-sans text-neutral-800">
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-extrabold text-lg text-neutral-900">
            NEXO <span className="text-accent">전자칠판 상담신청</span>
          </span>
          <a href="tel:032-569-5771" className="text-sm font-bold text-accent">
            032.569.5771
          </a>
        </div>
      </header>

      <main className="py-10 md:py-14">
        <section className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-3">
              전자칠판 상담신청
            </h1>
            <p className="text-neutral-600 text-sm md:text-base">
              아래 정보를 남겨주시면 담당자가 확인 후 연락드립니다.
            </p>
          </div>

          <ConsultationForm />

          <div className="mt-6 bg-surfaceAlt border border-neutral-200 rounded-xl p-4 text-sm text-neutral-600">
            <p className="flex items-center gap-2 mb-1">
              <Phone className="w-4 h-4 text-accent" />
              빠른 문의: <a href="tel:032-569-5771" className="text-accent font-bold">032.569.5771</a>
            </p>
            <p className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-accent" />
              접수 순서대로 확인 후 연락드립니다.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ConsultationPage;
