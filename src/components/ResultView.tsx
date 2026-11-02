import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  Award,
  Sparkles,
  Filter,
  TableProperties,
  Stethoscope,
  Quote,
  Layers,
} from 'lucide-react';
import {
  IcebergLayerMeta,
  Scenario,
  UserAnswerRecord,
  LayerResultReview,
} from '../types/iceberg';

interface ResultViewProps {
  scenario: Scenario;
  layers: IcebergLayerMeta[];
  userAnswers: UserAnswerRecord;
  onRetake: () => void;
  onOpenGuide: () => void;
  onOpenScript?: (sceneId?: string) => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  scenario,
  layers,
  userAnswers,
  onRetake,
  onOpenGuide,
  onOpenScript,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [showMatrixTable, setShowMatrixTable] = useState<boolean>(true);

  // Compute reviews for each layer
  const reviews: LayerResultReview[] = layers.map((layer) => {
    const question = scenario.questions[layer.key];
    const selectedChoiceId = userAnswers[layer.key] || '';
    const selectedChoice = question?.choices.find((c) => c.id === selectedChoiceId);
    const correctChoice = question?.choices.find((c) => c.id === question.correctChoiceId);
    const isCorrect = selectedChoiceId === question?.correctChoiceId;
    const formulation = scenario.satirFormulation.find((f) => f.layerKey === layer.key);

    return {
      layerKey: layer.key,
      layerMeta: layer,
      selectedChoiceId,
      selectedChoiceText: selectedChoice ? selectedChoice.text : '(ไม่ได้เลือก)',
      correctChoiceId: question ? question.correctChoiceId : '',
      correctChoiceText: correctChoice ? correctChoice.text : '',
      isCorrect,
      explanation: selectedChoice?.explanation || correctChoice?.explanation || '',
      teachingNote: question?.teachingNote || '',
      scriptEvidence: formulation?.scriptEvidence || question?.scriptClue,
    };
  });

  const correctCount = reviews.filter((r) => r.isCorrect).length;
  const totalLayers = layers.length;
  const scorePercent = Math.round((correctCount / totalLayers) * 100);

  // Qualitative feedback
  const getFeedbackBadge = () => {
    if (correctCount === 7) {
      return {
        title: 'ยอดเยี่ยมระดับปรมาจารย์! (7/7 ครบถ้วน)',
        message: 'คุณสามารถจำแนกโลกภายใน 7 ระดับของคนไข้ตามตารางเฉลย Satir Model ได้อย่างสมบูรณ์แบบ',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/30',
      };
    }
    if (correctCount >= 5) {
      return {
        title: 'เข้าใจโครงสร้างจิตวิทยาเป็นอย่างดี (Proficient)',
        message: 'คุณเข้าใจความเชื่อมโยงระหว่างพฤติกรรมหลีกเลี่ยงการอ่านกับความรู้สึกและคุณค่าภายในได้ดีมาก',
        color: 'text-sky-400',
        bg: 'bg-sky-500/10 border-sky-500/30',
      };
    }
    if (correctCount >= 3) {
      return {
        title: 'กำลังพัฒนาความเข้าใจ (Developing)',
        message: 'คุณเริ่มจับจุดความแตกต่างระหว่างความรู้สึก มุมมอง และความคาดหวังได้ดีขึ้น ลองตรวจสอบตารางเฉลยด้านล่าง',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/30',
      };
    }
    return {
      title: 'เริ่มต้นการสำรวจโลกภายใน (Beginner)',
      message: 'การจำแนกชั้นภูเขาน้ำแข็งต้องอาศัยการฝึกฝน อ่านตารางเฉลยและบทละครเพื่อทำความเข้าใจการเชื่อมโยง',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/30',
    };
  };

  const feedback = getFeedbackBadge();

  const filteredReviews = reviews.filter((r) => {
    if (filterMode === 'correct') return r.isCorrect;
    if (filterMode === 'incorrect') return !r.isCorrect;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 w-full max-w-full overflow-hidden">
      {/* Top Score Banner */}
      <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 p-5 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ผลการวิเคราะห์โมเดลภูเขาน้ำแข็ง (กรณีศึกษานักศึกษาแพทย์ TBL)</span>
            </div>

            <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              {scenario.titleTh}
            </h1>

            <div className={`p-4 rounded-xl border ${feedback.bg} space-y-1`}>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Award className={`w-5 h-5 ${feedback.color}`} />
                <span className={`font-bold text-sm ${feedback.color}`}>
                  {feedback.title}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {feedback.message}
              </p>
            </div>
          </div>

          {/* Big Score Dial */}
          <div className="shrink-0 flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 shadow-inner w-36 sm:w-44">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 font-mono">
              คะแนนที่ได้
            </span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
                {correctCount}
              </span>
              <span className="text-lg sm:text-xl text-slate-400 font-mono">
                /{totalLayers}
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  correctCount === 7
                    ? 'bg-emerald-400'
                    : correctCount >= 5
                    ? 'bg-sky-400'
                    : 'bg-amber-400'
                }`}
                style={{ width: `${scorePercent}%` }}
              />
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-1.5">
              ความแม่นยำ {scorePercent}%
            </span>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onRetake}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ทำแบบทดสอบอีกครั้ง</span>
            </button>

            {onOpenScript && (
              <button
                onClick={() => onOpenScript('scene_3')}
                className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>เปิดอ่านบทละครทั้ง 4 ฉาก</span>
              </button>
            )}
          </div>

          <button
            onClick={onOpenGuide}
            className="px-3.5 py-2 text-xs font-medium text-sky-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-xl transition-all border border-sky-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>อ่านคู่มือทฤษฎีภูเขาน้ำแข็ง Satir</span>
          </button>
        </div>
      </div>

      {/* Satir Formulation Matrix Card (ตารางเฉลย Satir คนไข้) */}
      <div className="rounded-2xl border border-sky-500/30 bg-slate-900/90 shadow-xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <TableProperties className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">
                ตารางเฉลย Satir คนไข้ (สำหรับวิเคราะห์และทำความเข้าใจ)
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400">
                สรุปการถอดรหัสโลกภายใน 7 ระดับตรงตามบทสนทนาและการให้คำปรึกษาของแพทย์
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowMatrixTable((p) => !p)}
            className="text-xs text-sky-400 hover:text-sky-300 font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 cursor-pointer"
          >
            {showMatrixTable ? 'ย่อตาราง' : 'แสดงตาราง'}
          </button>
        </div>

        {showMatrixTable && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-300">
                  <th className="p-3 font-bold w-12 text-center">ชั้น</th>
                  <th className="p-3 font-bold w-44">ระดับชั้น Satir</th>
                  <th className="p-3 font-bold w-56 text-sky-300">
                    เฉลยสภาวะของคนไข้
                  </th>
                  <th className="p-3 font-bold">หลักฐานจากบทละคร (Evidence จากบท)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {scenario.satirFormulation.map((row, idx) => (
                  <tr key={row.layerKey} className="hover:bg-slate-850/50 transition-colors">
                    <td className="p-3 text-center font-mono font-bold text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-white block">
                        {row.layerNameTh}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {row.layerNameEn}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-sky-300">
                      {row.patientAnswer}
                    </td>
                    <td className="p-3 text-slate-300 text-[11px] leading-relaxed">
                      {row.scriptEvidence}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Climax Scene 3 Insight Card (หมอกับคนไข้เรื่องชั่วโมงบินและการบิน) */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 p-5 sm:p-6 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <Stethoscope className="w-4 h-4" />
          <span>บทเรียนสำคัญจากการบำบัดในฉากที่ 3 (Doctor's Key Insight)</span>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20 space-y-2">
          <div className="flex items-start gap-2">
            <Quote className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              "การที่เราจะเก่งอะไรสักอย่าง มันก็อาจจะไม่ได้ขึ้นอยู่กับแค่ชั่วโมงบิน แต่มันก็มีส่วนอื่นๆ อีกเช่น{' '}
              <strong className="text-sky-300 font-semibold">คุณเลือกวิธีบินยังไง</strong>{' '}
              หลังจากการบินแต่ละรอบ คุณได้ปรับปรุงอะไรในการบินบ้าง เพราะสุดท้ายแล้วการที่เราบินนานๆ ก็อาจจะไม่ได้หมายความว่าคุณจะบินได้ไกลนะครับ"
            </p>
          </div>
          <span className="block text-[11px] text-slate-400 text-right font-mono">
            — คำแนะนำของคุณหมอในฉากที่ 3
          </span>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-sky-950/40 border border-sky-500/20 text-xs text-sky-200 space-y-1">
          <span className="font-bold text-white block">
            การเปลี่ยนผ่านสู่ความเข้าใจตนเอง (Transformation):
          </span>
          <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
            คนไข้สามารถแยกแยะคุณค่าในตนเอง (Self-worth) ออกจากผลคะแนนสอบ TBL ได้สำเร็จ และเข้าใจว่าความทุกข์ที่เกิดขึ้นสามารถเป็นสิ่งที่สวยงามได้ เมื่อเราใจดีกับตัวเองมากขึ้น ไม่เค้นตัวเอง และค้นหากลยุทธ์การเรียนรู้ใหม่ๆ
          </p>
          <span className="inline-block text-[11px] text-amber-300 font-mono font-bold pt-1">
            "ผมคิดว่าผมสามารถไปต่อได้แล้วครับ!!! (บินทะลุหน้าต่างออกไป) 🚀🕊️"
          </span>
        </div>
      </div>

      {/* Breakdown Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white">
            เฉลยละเอียดรายชั้น (Layer-by-Layer Breakdown)
          </h2>
          <p className="text-xs text-slate-400">
            ตรวจสอบความแตกต่างระหว่างตัวเลือกที่คุณเลือกและคำตอบที่ถูกต้องตามแนวคิดของ Satir
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start sm:self-auto">
          <div className="px-2 text-slate-400 text-xs flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">กรอง:</span>
          </div>
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filterMode === 'all'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ทั้งหมด ({totalLayers})
          </button>
          <button
            onClick={() => setFilterMode('incorrect')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filterMode === 'incorrect'
                ? 'bg-amber-500/20 text-amber-300 shadow-sm border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ข้อที่ผิด ({totalLayers - correctCount})
          </button>
          <button
            onClick={() => setFilterMode('correct')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filterMode === 'correct'
                ? 'bg-emerald-500/20 text-emerald-300 shadow-sm border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ข้อที่ถูก ({correctCount})
          </button>
        </div>
      </div>

      {/* 7 Layer Review Cards */}
      <div className="space-y-4">
        {filteredReviews.map((rev) => {
          const { layerMeta, isCorrect } = rev;
          const question = scenario.questions[layerMeta.key];

          return (
            <div
              key={layerMeta.key}
              className={`rounded-2xl border p-4 sm:p-5 transition-all shadow-md ${
                isCorrect
                  ? 'border-emerald-500/40 bg-slate-900/90'
                  : 'border-amber-500/40 bg-slate-900/95'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isCorrect
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs sm:text-sm text-white">
                        ชั้นที่ {layerMeta.order}: {layerMeta.nameTh}
                      </span>
                      <span className="text-[11px] sm:text-xs text-slate-400">
                        ({layerMeta.nameEn})
                      </span>
                      {layerMeta.isAboveWater ? (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                          ยอดเหนือน้ำ (10%)
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">
                          {layerMeta.depthMeters}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                      {layerMeta.descriptionTh}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[11px] sm:text-xs px-2.5 py-1 rounded-full font-bold shrink-0 ${
                    isCorrect
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {isCorrect ? 'ถูกต้อง (+1)' : 'ยังไม่ถูกต้อง (0)'}
                </span>
              </div>

              {/* Question Context */}
              <div className="mt-3 text-xs text-slate-300 font-medium">
                <span className="text-sky-400 font-bold">โจทย์: </span>
                <span>{question?.questionPrompt}</span>
              </div>

              {/* Answers Comparison */}
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* User's choice */}
                <div
                  className={`p-3 rounded-xl border ${
                    isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                      : 'bg-slate-950/60 border-amber-500/30 text-amber-200'
                  }`}
                >
                  <span className="font-semibold block mb-1 text-[11px] uppercase tracking-wider text-slate-400">
                    คำตอบที่คุณเลือก:
                  </span>
                  <p className="leading-relaxed font-medium">
                    {rev.selectedChoiceText}
                  </p>
                  {!isCorrect && (
                    <span className="mt-1.5 inline-block text-[11px] text-amber-400/90 font-mono">
                      (จัดอยู่ในชั้นหรือบริบทอื่น)
                    </span>
                  )}
                </div>

                {/* Correct Answer */}
                <div className="p-3 rounded-xl border bg-slate-950/80 border-emerald-500/40 text-emerald-100">
                  <span className="font-semibold block mb-1 text-[11px] uppercase tracking-wider text-emerald-400">
                    คำตอบที่ถูกต้องตามเฉลย:
                  </span>
                  <p className="leading-relaxed font-medium">
                    {rev.correctChoiceText}
                  </p>
                  <p className="mt-1.5 text-[11px] text-emerald-300/80">
                    {rev.explanation}
                  </p>
                </div>
              </div>

              {/* Script Evidence Clue */}
              {rev.scriptEvidence && (
                <div className="mt-3 p-2.5 rounded-xl bg-slate-950/60 border border-sky-500/20 text-xs text-slate-300 flex items-start gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sky-300">
                      หลักฐานจากบทละคร:{' '}
                    </span>
                    <span className="text-slate-300 italic">
                      {rev.scriptEvidence}
                    </span>
                  </div>
                </div>
              )}

              {/* Pedagogical Note from Satir's Theory */}
              <div className="mt-2.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-sky-400 block mb-0.5">
                  ข้อคิดเชิงจิตวิทยา Satir ในเรื่องการเรียน:
                </span>
                <p className="leading-relaxed text-slate-300">
                  {rev.teachingNote}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Floating Navigation Bar */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 flex flex-wrap items-center justify-between gap-4">
        <span className="text-xs text-slate-400">
          เข้าใจโลกภายในของตนเองและผู้อื่นด้วย Virginia Satir Iceberg Model
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={onRetake}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-colors cursor-pointer"
          >
            ทำแบบทดสอบนี้อีกครั้ง
          </button>
        </div>
      </div>
    </div>
  );
};
