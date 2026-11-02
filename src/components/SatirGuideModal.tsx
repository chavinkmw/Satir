import React from 'react';
import { X, Layers, Compass, ExternalLink, HelpCircle } from 'lucide-react';
import { ICEBERG_LAYERS, SATIR_THEORY_INTRO } from '../data/satirGuide';

interface SatirGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SatirGuideModal: React.FC<SatirGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                คู่มือ 7 ระดับชั้นโมเดลภูเขาน้ำแข็ง (Satir Iceberg Model)
              </h2>
              <p className="text-xs text-slate-400">
                หลักการทำความเข้าใจโลกภายในของมนุษย์โดย Virginia Satir
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-sm">
          {/* Quote Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/60 to-slate-950 border border-sky-500/30">
            <p className="italic text-sky-200 text-xs sm:text-sm leading-relaxed">
              {SATIR_THEORY_INTRO.quote}
            </p>
            <span className="block mt-2 text-xs text-slate-400 font-mono">
              {SATIR_THEORY_INTRO.author}
            </span>
          </div>

          {/* Core Concept */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase font-bold tracking-wider text-sky-400">
              แก่นความคิดของโมเดลภูเขาน้ำแข็ง
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              มนุษย์มักมองเห็นและตัดสินกันจาก "พฤติกรรมภายนอก (Behavior)" ซึ่งเปรียบเสมือนยอดภูเขาน้ำแข็งเพียง 10% ที่โผล่พ้นน้ำ แต่ความจริงแล้วเบื้องหลังทุกพฤติกรรม ล้วนถูกขับเคลื่อนด้วยชั้นจิตวิทยาภายในอีก 6 ชั้นที่ซ่อนอยู่ใต้น้ำ การเรียนรู้ที่จะสำรวจตนเองและผู้อื่นลงไปทีละชั้น จะช่วยให้เราเกิดความเข้าอกเข้าใจ (Empathy) และสามารถสื่อสารอย่างสร้างสรรค์ (Congruent Communication)
            </p>
          </div>

          {/* 7 Layers Breakdown */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs uppercase font-bold tracking-wider text-sky-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>โครงสร้าง 7 ระดับชั้นจากยอดสู่ก้นบึ้ง</span>
            </h3>

            <div className="space-y-2.5">
              {ICEBERG_LAYERS.map((layer) => (
                <div
                  key={layer.key}
                  className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-slate-800 text-sky-400 font-mono text-xs flex items-center justify-center font-bold">
                        {layer.order}
                      </span>
                      <span className="font-bold text-white text-sm">
                        {layer.nameTh}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({layer.nameEn})
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        layer.isAboveWater
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {layer.depthMeters}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pl-7">
                    {layer.descriptionTh}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Tip */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-emerald-300">
                เคล็ดลับการจำแนก:
              </span>{' '}
              พฤติกรรมคือสิ่งที่กล้องบันทึกได้, ความรู้สึกทางกายคือสิ่งที่ร่างกายสัมผัส, ความรู้สึกทางใจคือชื่ออารมณ์, ความรู้สึกต่อความรู้สึกคือการตัดสินอารมณ์นั้น, มุมมองคือประโยคความเชื่อ, ความคาดหวังคือคำว่า "อยากให้...", และความต้องการที่แท้จริงคือความต้องการสากลของมนุษย์ (รัก, ปลอดภัย, มีคุณค่า)
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-colors"
          >
            เข้าใจแล้ว กลับสู่แบบทดสอบ
          </button>
        </div>
      </div>
    </div>
  );
};
