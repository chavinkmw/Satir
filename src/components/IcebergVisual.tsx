import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  ChevronDown,
  Waves,
  Sparkles,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { IcebergLayerMeta, LayerKey, Scenario, UserAnswerRecord } from '../types/iceberg';

interface IcebergVisualProps {
  layers: IcebergLayerMeta[];
  activeLayerKey: LayerKey | null;
  onSelectLayer: (layerKey: LayerKey) => void;
  onSelectChoice: (layerKey: LayerKey, choiceId: string) => void;
  userAnswers: UserAnswerRecord;
  scenario: Scenario;
  onOpenScript?: (sceneId?: string) => void;
}

export const IcebergVisual: React.FC<IcebergVisualProps> = ({
  layers,
  activeLayerKey,
  onSelectLayer,
  onSelectChoice,
  userAnswers,
  scenario,
  onOpenScript,
}) => {
  const choiceLetters = ['A', 'B', 'C', 'D'];

  const handleNextLayer = (currentKey: LayerKey) => {
    const currentIndex = layers.findIndex((l) => l.key === currentKey);
    if (currentIndex < layers.length - 1) {
      onSelectLayer(layers[currentIndex + 1].key);
    }
  };

  const handlePrevLayer = (currentKey: LayerKey) => {
    const currentIndex = layers.findIndex((l) => l.key === currentKey);
    if (currentIndex > 0) {
      onSelectLayer(layers[currentIndex - 1].key);
    }
  };

  // Geometric widths for the iceberg tiers, fully bounded to prevent any horizontal overflow
  const getLayerWidthClass = (key: LayerKey, isOpen: boolean) => {
    if (isOpen) {
      return 'w-full max-w-full sm:max-w-3xl';
    }

    switch (key) {
      case 'behavior':
        return 'w-[88%] sm:w-[54%] md:w-[44%] max-w-full';
      case 'body_sensation':
        return 'w-[98%] sm:w-[92%] md:w-[88%] max-w-full'; // Widest submerged shelf
      case 'feeling':
        return 'w-[95%] sm:w-[88%] md:w-[82%] max-w-full';
      case 'feeling_about_feeling':
        return 'w-[91%] sm:w-[82%] md:w-[74%] max-w-full';
      case 'perception':
        return 'w-[86%] sm:w-[76%] md:w-[66%] max-w-full';
      case 'expectation':
        return 'w-[82%] sm:w-[68%] md:w-[56%] max-w-full';
      case 'yearning':
        return 'w-[78%] sm:w-[60%] md:w-[48%] max-w-full';
      default:
        return 'w-full max-w-full';
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden space-y-4">
      {/* Title & Guidance Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs shadow-lg max-w-full overflow-hidden">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse shrink-0" />
          <div className="min-w-0">
            <h2 className="font-bold text-xs sm:text-sm text-white tracking-tight truncate">
              โมเดลภูเขาน้ำแข็งของซาเทียร์ (Satir Iceberg Model)
            </h2>
            <p className="text-slate-400 mt-0.5 text-[11px] sm:text-xs truncate">
              คลิกที่แต่ละชั้นภูเขาเพื่อเปิดกล่องตัวเลือกคำตอบ 4 ข้อ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <span className="text-slate-400 text-[11px] sm:text-xs">ตอบครบ:</span>
          <span className="font-mono font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[11px] sm:text-xs">
            {Object.keys(userAnswers).filter((k) => Boolean(userAnswers[k])).length} / {layers.length} ชั้น
          </span>
        </div>
      </div>

      {/* Realistic Iceberg Container with Triangular Peak and Base */}
      <div className="relative rounded-3xl overflow-hidden border border-sky-950/80 bg-gradient-to-b from-[#030712] via-[#041226] to-[#020617] shadow-2xl p-3 sm:p-6 md:p-8 max-w-full">
        {/* Atmospheric Lighting Gradients */}
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-sky-400/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-sky-900/20 via-transparent to-transparent pointer-events-none" />

        {/* Title Top Center */}
        <div className="relative z-10 text-center pb-3 pt-1">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-sky-400 font-bold font-mono">
            Satir Model
          </span>
          <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
            โมเดลภูเขาน้ำแข็งของซาเทียร์
          </h3>
        </div>

        {/* Iceberg Construction: Triangular Peak -> Waterline -> Submerged Tiers -> Triangular Bottom Tip */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-full overflow-hidden">
          {/* 1. TRIANGULAR PEAK (สามเหลี่ยมบนยอดภูเขาน้ำแข็ง ขนาดใหญ่เท่ากล่องคำถามแรก) */}
          <button
            type="button"
            onClick={() => onSelectLayer('behavior')}
            title="คลิกที่ยอดสามเหลี่ยมเพื่อเปิดชั้นที่ 1 พฤติกรรม"
            className="w-[88%] sm:w-[54%] md:w-[44%] max-w-full mx-auto group flex flex-col items-center focus:outline-none transition-transform hover:scale-[1.01] active:scale-[0.99] mb-1"
          >
            <div
              className="w-full h-24 sm:h-36 md:h-40 bg-gradient-to-b from-white via-sky-200/90 to-sky-400/50 border-t-2 border-x-2 border-white shadow-[0_0_30px_rgba(56,189,248,0.3)] relative flex flex-col items-center justify-end pb-2 sm:pb-4 max-w-full"
              style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent pointer-events-none" />
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff] mb-1.5 sm:mb-2 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-black text-sky-950 uppercase tracking-widest drop-shadow-sm px-2.5 py-0.5 rounded-full bg-white/80 backdrop-blur-sm">
                ยอดภูเขาน้ำแข็ง
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-sky-900 mt-0.5">
                ชั้นที่ 1: พฤติกรรม (Behavior) เหนือน้ำ 10%
              </span>
            </div>
          </button>

          {/* 2. ALL 7 LAYERS IN CASCADE */}
          <div className="w-full max-w-full flex flex-col items-center space-y-2.5 mt-1">
            {layers.map((layer, index) => {
              const isOpen = activeLayerKey === layer.key;
              const isAnswered = Boolean(userAnswers[layer.key]);
              const question = scenario.questions[layer.key];
              const selectedChoiceId = userAnswers[layer.key];
              const selectedChoice = question?.choices.find((c) => c.id === selectedChoiceId);
              const widthClass = getLayerWidthClass(layer.key, isOpen);

              return (
                <React.Fragment key={layer.key}>
                  {/* Waterline Divider right before Body Sensation (Layer 2) */}
                  {layer.key === 'body_sensation' && (
                    <div className="w-[98%] sm:w-[94%] max-w-full my-2.5 py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-sky-500/20 via-sky-400/35 to-sky-500/20 border-y-2 border-dashed border-sky-300/80 backdrop-blur-md flex items-center justify-between text-[11px] sm:text-xs text-sky-100 shadow-lg">
                      <div className="flex items-center gap-1.5 sm:gap-2 font-bold tracking-wide min-w-0">
                        <Waves className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-300 animate-pulse shrink-0" />
                        <span className="truncate">ระดับผิวน้ำ (Waterline) — เหนือน้ำ (10%) / ใต้น้ำ (90%)</span>
                      </div>
                      <span className="font-mono text-sky-200 text-[10px] sm:text-[11px] font-bold shrink-0 ml-2">0.00 m</span>
                    </div>
                  )}

                  {/* Layer Tier Box */}
                  <div
                    id={`iceberg-tier-${layer.key}`}
                    className={`${widthClass} transition-all duration-300 mx-auto rounded-2xl border backdrop-blur-md overflow-hidden box-border ${
                      layer.isAboveWater
                        ? 'rounded-t-2xl shadow-xl border-sky-400/50'
                        : 'shadow-lg'
                    } ${
                      isOpen
                        ? `${layer.bandColor.activeBg} border-sky-300 shadow-sky-500/20 shadow-2xl ring-2 ring-sky-300`
                        : isAnswered
                        ? 'bg-slate-900/85 border-emerald-500/50 hover:border-emerald-400 hover:bg-slate-900'
                        : `${layer.bandColor.bg} ${layer.bandColor.border} ${layer.bandColor.hoverBg}`
                    }`}
                  >
                    {/* Tier Click Header */}
                    <button
                      type="button"
                      onClick={() => onSelectLayer(layer.key)}
                      className="w-full px-3.5 sm:px-5 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left transition-colors focus-visible:outline-none"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                        <div
                          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors shadow-sm ${
                            isAnswered
                              ? 'bg-emerald-500 text-white'
                              : isOpen
                              ? 'bg-sky-400 text-slate-950 font-black'
                              : 'bg-black/50 text-white border border-white/20'
                          }`}
                        >
                          {isAnswered ? <CheckCircle2 className="w-3.5 h-3.5" /> : layer.order}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs sm:text-sm md:text-base font-bold text-white drop-shadow-md truncate">
                              {layer.nameTh}
                            </span>
                            <span className="text-[10px] sm:text-xs text-sky-200/90 font-medium">
                              ({layer.nameEn})
                            </span>
                            {layer.isAboveWater && (
                              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-sky-400/30 text-sky-100 border border-sky-300/40">
                                เหนือน้ำ
                              </span>
                            )}
                          </div>

                          {/* Selected answer preview or floating keywords */}
                          {isAnswered && selectedChoice ? (
                            <p className="text-[11px] sm:text-xs text-emerald-300 font-medium mt-0.5 truncate max-w-[220px] sm:max-w-md">
                              ✓ ตอบแล้ว: "{selectedChoice.text}"
                            </p>
                          ) : (
                            <div className="flex items-center gap-1 flex-wrap mt-0.5">
                              {layer.keywordsTh.slice(0, 4).map((kw, i) => (
                                <span
                                  key={i}
                                  className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded bg-black/35 text-slate-300 border border-white/10"
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Status Pill & Chevron */}
                      <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                        <span
                          className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-bold shadow-sm ${
                            isAnswered
                              ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/40'
                              : isOpen
                              ? 'bg-sky-400 text-slate-950 font-black'
                              : 'bg-black/40 text-slate-300 border border-white/10'
                          }`}
                        >
                          {isAnswered ? 'เลือกแล้ว' : 'กดเลือกช้อยส์'}
                        </span>

                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-white drop-shadow"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </button>

                    {/* Expanding Choice Box */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="choice-box"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="p-3.5 sm:p-5 border-t border-sky-400/40 bg-slate-950/95 space-y-3.5">
                            {/* Layer Definition */}
                            <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-[11px] sm:text-xs text-slate-300 flex items-start gap-2">
                              <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-sky-300">
                                  นิยามชั้นนี้:{' '}
                                </span>
                                <span className="leading-relaxed">
                                  {layer.descriptionTh}
                                </span>
                              </div>
                            </div>

                            {/* Specific Question Prompt */}
                            <div className="p-3 sm:p-4 rounded-xl bg-sky-950/50 border border-sky-500/30 space-y-2">
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                                  <Sparkles className="w-3 h-3 text-sky-400" />
                                  <span>โจทย์วิเคราะห์ชั้นที่ {layer.order}: {layer.nameTh}</span>
                                </span>

                                {onOpenScript && (
                                  <button
                                    type="button"
                                    onClick={() => onOpenScript(layer.key === 'body_sensation' ? 'scene_1' : 'scene_3')}
                                    className="text-[11px] text-sky-300 hover:text-white underline decoration-sky-400/50 font-semibold cursor-pointer"
                                  >
                                    เปิดอ่านบทละครอ้างอิง →
                                  </button>
                                )}
                              </div>
                              <p className="text-xs sm:text-sm md:text-base font-bold text-white leading-relaxed">
                                {question?.questionPrompt}
                              </p>
                              {question?.scriptClue && (
                                <div className="pt-1.5 border-t border-sky-500/20 text-[11px] text-slate-300 flex items-start gap-1.5">
                                  <span className="font-bold text-sky-400 shrink-0">เบาะแสจากบท:</span>
                                  <span className="italic">{question.scriptClue}</span>
                                </div>
                              )}
                            </div>

                            {/* 4 Choices */}
                            <div className="space-y-2">
                              <span className="text-[11px] sm:text-xs font-semibold text-slate-300 block">
                                เลือกคำตอบที่ถูกต้อง 1 ข้อ:
                              </span>

                              {question?.choices.map((choice, cIndex) => {
                                const isSelected = selectedChoiceId === choice.id;
                                const letter = choiceLetters[cIndex] || `${cIndex + 1}`;

                                return (
                                  <button
                                    key={choice.id}
                                    type="button"
                                    onClick={() => onSelectChoice(layer.key, choice.id)}
                                    className={`w-full text-left p-3 sm:p-3.5 rounded-xl border transition-all duration-200 flex items-start gap-2.5 sm:gap-3 group cursor-pointer ${
                                      isSelected
                                        ? 'border-sky-400 bg-sky-950/80 text-white shadow-lg ring-2 ring-sky-400/50'
                                        : 'border-slate-800 bg-slate-900/90 text-slate-200 hover:border-slate-700 hover:bg-slate-850'
                                    }`}
                                  >
                                    <div
                                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                                        isSelected
                                          ? 'bg-sky-500 text-white shadow-sm'
                                          : 'bg-slate-800 text-slate-400 group-hover:text-white group-hover:bg-slate-700'
                                      }`}
                                    >
                                      {letter}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs sm:text-sm leading-relaxed font-medium">
                                        {choice.text}
                                      </p>
                                    </div>

                                    {isSelected && (
                                      <div className="shrink-0 flex items-center gap-1 text-sky-400 font-semibold text-xs">
                                        <CheckCircle2 className="w-4 h-4" />
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Step Navigation footer */}
                            <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs">
                              <button
                                type="button"
                                onClick={() => handlePrevLayer(layer.key)}
                                disabled={index === 0}
                                className="px-2.5 py-1 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 transition-colors text-[11px] sm:text-xs"
                              >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                <span>ชั้นก่อนหน้า</span>
                              </button>

                              <span className="text-slate-400 font-mono text-[11px] sm:text-xs">
                                ชั้น {layer.order} จาก 7
                              </span>

                              <button
                                type="button"
                                onClick={() => handleNextLayer(layer.key)}
                                disabled={index === layers.length - 1}
                                className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 transition-colors font-medium shadow-sm text-[11px] sm:text-xs"
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
                </React.Fragment>
              );
            })}
          </div>

          {/* 3. TRIANGULAR BOTTOM TIP (สามเหลี่ยมล่างสุดของภูเขาน้ำแข็ง: ตัวตน Self / I Am) */}
          <div className="w-[78%] sm:w-[60%] md:w-[48%] max-w-full mx-auto flex flex-col items-center pt-2 sm:pt-3">
            <div
              className="w-full h-32 sm:h-44 md:h-48 bg-gradient-to-b from-blue-900/95 via-[#071938] to-sky-400/35 border-b-2 border-x-2 border-sky-400/60 shadow-[0_20px_35px_rgba(3,105,161,0.35)] relative flex flex-col items-center justify-start pt-3 sm:pt-5 text-center px-3 sm:px-4 max-w-full"
              style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-400/10 to-sky-300/30 pointer-events-none" />

              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-sky-300 font-mono font-bold">
                แก่นแท้จิตใต้สำนึก
              </span>

              <h4 className="text-sm sm:text-base font-black text-white tracking-tight drop-shadow-md mt-0.5">
                ตัวตน (Self / I Am)
              </h4>

              <p className="text-[9px] sm:text-[10px] text-slate-200 mt-0.5 max-w-[190px] sm:max-w-[230px] leading-tight drop-shadow">
                ศูนย์กลางแห่งชีวิต คุณค่าในตนเอง และความเชื่อมโยงสากล
              </p>

              <div className="w-2 h-2 rounded-full bg-sky-300 shadow-[0_0_12px_#38bdf8] mt-2 sm:mt-3 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
