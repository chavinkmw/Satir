import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';
import { IcebergLayerMeta, LayerKey, Scenario, UserAnswerRecord } from '../types/iceberg';

interface AccordionDeckProps {
  layers: IcebergLayerMeta[];
  scenario: Scenario;
  userAnswers: UserAnswerRecord;
  activeLayerKey: LayerKey | null;
  onToggleLayer: (layerKey: LayerKey) => void;
  onSelectChoice: (layerKey: LayerKey, choiceId: string) => void;
  onSubmit: () => void;
}

export const AccordionDeck: React.FC<AccordionDeckProps> = ({
  layers,
  scenario,
  userAnswers,
  activeLayerKey,
  onToggleLayer,
  onSelectChoice,
  onSubmit,
}) => {
  const answeredCount = Object.keys(userAnswers).filter((k) => Boolean(userAnswers[k])).length;
  const isAllAnswered = answeredCount === layers.length;

  const handleNextLayer = (currentKey: LayerKey) => {
    const currentIndex = layers.findIndex((l) => l.key === currentKey);
    if (currentIndex < layers.length - 1) {
      onToggleLayer(layers[currentIndex + 1].key);
    }
  };

  const handlePrevLayer = (currentKey: LayerKey) => {
    const currentIndex = layers.findIndex((l) => l.key === currentKey);
    if (currentIndex > 0) {
      onToggleLayer(layers[currentIndex - 1].key);
    }
  };

  const choiceLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-3">
      {/* Deck Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>ตัวเลือกคำตอบประจำแต่ละชั้น (7 Iceberg Layers)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            คลิกเพื่อคลี่เปิดแผง Accordion และเลือกคำตอบที่ถูกต้องที่สุด 1 ข้อในแต่ละชั้น
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">ตอบแล้ว:</span>
          <span
            className={`font-mono font-bold px-2 py-0.5 rounded-md ${
              isAllAnswered
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-sky-400 border border-slate-700'
            }`}
          >
            {answeredCount} / {layers.length}
          </span>
        </div>
      </div>

      {/* 7 Layers Accordion List */}
      <div className="space-y-2.5">
        {layers.map((layer, index) => {
          const isOpen = activeLayerKey === layer.key;
          const isAnswered = Boolean(userAnswers[layer.key]);
          const question = scenario.questions[layer.key];
          const selectedChoiceId = userAnswers[layer.key];

          return (
            <div
              key={layer.key}
              id={`layer-card-${layer.key}`}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-sky-400/80 bg-slate-900 shadow-md ring-1 ring-sky-400/20'
                  : isAnswered
                  ? 'border-slate-700/80 bg-slate-900/80 hover:border-slate-600'
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                type="button"
                onClick={() => onToggleLayer(layer.key)}
                className="w-full px-4 py-3.5 flex items-center justify-between gap-3 text-left transition-colors hover:bg-slate-800/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Layer badge */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-all ${
                      isAnswered
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : isOpen
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {isAnswered ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      layer.order
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-slate-100">
                        {layer.nameTh}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({layer.nameEn})
                      </span>
                      {layer.isAboveWater ? (
                        <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                          เหนือผิวน้ำ
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">
                          {layer.depthMeters}
                        </span>
                      )}
                    </div>

                    {/* Compact selection preview */}
                    {!isOpen && isAnswered && (
                      <p className="text-xs text-emerald-400/90 mt-0.5 truncate">
                        ✓ เลือกแล้ว:{' '}
                        {
                          question?.choices.find((c) => c.id === selectedChoiceId)
                            ?.text
                        }
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md font-medium hidden sm:inline-block ${
                      isAnswered
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isAnswered ? 'เลือกคำตอบแล้ว' : 'ยังไม่ตอบ'}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="text-slate-400"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
              </button>

              {/* Accordion Expandable Content with smooth Motion */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.28,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 bg-slate-950/40">
                      {/* Layer Definition Callout */}
                      <div className="mb-3.5 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 flex items-start gap-2">
                        <HelpCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-slate-200">
                            นิยามชั้นนี้:{' '}
                          </span>
                          <span>{layer.descriptionTh}</span>
                        </div>
                      </div>

                      {/* Question prompt for this layer */}
                      <div className="mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 block mb-1">
                          คำถามประจำชั้นที่ {layer.order}
                        </span>
                        <p className="text-sm font-medium text-slate-100">
                          {question?.questionPrompt}
                        </p>
                      </div>

                      {/* 4 Choices */}
                      <div className="space-y-2">
                        {question?.choices.map((choice, cIndex) => {
                          const isSelected = selectedChoiceId === choice.id;
                          const letter = choiceLetters[cIndex] || `${cIndex + 1}`;

                          return (
                            <button
                              key={choice.id}
                              type="button"
                              onClick={() => onSelectChoice(layer.key, choice.id)}
                              className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 group ${
                                isSelected
                                  ? 'border-sky-400 bg-sky-950/50 text-white shadow-sm ring-1 ring-sky-400/40'
                                  : 'border-slate-800 bg-slate-900/80 text-slate-200 hover:border-slate-700 hover:bg-slate-800/70'
                              }`}
                            >
                              <div
                                className={`w-6 h-6 rounded-md flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                                  isSelected
                                    ? 'bg-sky-500 text-white'
                                    : 'bg-slate-800 text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-700'
                                }`}
                              >
                                {letter}
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="text-sm leading-relaxed">
                                  {choice.text}
                                </p>
                              </div>

                              {isSelected && (
                                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Step Navigation Controls inside layer */}
                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <button
                          type="button"
                          onClick={() => handlePrevLayer(layer.key)}
                          disabled={index === 0}
                          className="px-2.5 py-1.5 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 transition-colors"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>ชั้นก่อนหน้า</span>
                        </button>

                        <span className="text-slate-400 font-mono">
                          ชั้น {layer.order} จาก 7
                        </span>

                        <button
                          type="button"
                          onClick={() => handleNextLayer(layer.key)}
                          disabled={index === layers.length - 1}
                          className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 transition-colors font-medium"
                        >
                          <span>ชั้นถัดไป</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Submission Card (Sticky or prominent at bottom) */}
      <div className="mt-6 p-4 rounded-xl border border-slate-700/80 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                สถานะการตอบแบบทดสอบ
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  isAllAnswered
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {isAllAnswered
                  ? 'ตอบครบ 7 ชั้นแล้ว'
                  : `เหลืออีก ${layers.length - answeredCount} ชั้น`}
              </span>
            </div>

            <p className="text-xs text-slate-400">
              {isAllAnswered
                ? 'คุณได้เลือกคำตอบครบทั้ง 7 ระดับชั้นแล้ว กดปุ่มเพื่อตรวจสอบความถูกต้องและดูเฉลยละเอียด'
                : 'กรุณาคลิกเลือกคำตอบ 1 ข้อให้ครบทุกชั้นของภูเขาน้ำแข็งก่อนกดตรวจสอบ'}
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={onSubmit}
              disabled={!isAllAnswered}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                isAllAnswered
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-400 hover:to-blue-500 hover:shadow-sky-500/25 cursor-pointer ring-2 ring-sky-400/40 animate-pulse'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed opacity-60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>ตรวจสอบความถูกต้อง</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3.5 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              isAllAnswered ? 'bg-emerald-400' : 'bg-sky-500'
            }`}
            style={{ width: `${(answeredCount / layers.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
