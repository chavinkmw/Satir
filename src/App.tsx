import React, { useState } from 'react';
import { Header } from './components/Header';
import { ScenarioBanner } from './components/ScenarioBanner';
import { IcebergVisual } from './components/IcebergVisual';
import { ResultView } from './components/ResultView';
import { SatirGuideModal } from './components/SatirGuideModal';
import { ScriptModal } from './components/ScriptModal';
import { SCENARIOS } from './data/scenarios';
import { ICEBERG_LAYERS } from './data/satirGuide';
import { LayerKey, UserAnswerRecord } from './types/iceberg';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';

export default function App() {
  const currentScenario = SCENARIOS[0]; // Case: นักศึกษาแพทย์กับการเรียน TBL
  const [userAnswers, setUserAnswers] = useState<UserAnswerRecord>({});
  const [activeLayerKey, setActiveLayerKey] = useState<LayerKey | null>('behavior');
  const [viewMode, setViewMode] = useState<'quiz' | 'result'>('quiz');
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);
  const [isScriptModalOpen, setIsScriptModalOpen] = useState<boolean>(false);
  const [scriptInitialSceneId, setScriptInitialSceneId] = useState<string>('scene_0');

  const handleSelectLayer = (layerKey: LayerKey) => {
    setActiveLayerKey((prev) => (prev === layerKey ? null : layerKey));
  };

  const handleSelectChoice = (layerKey: LayerKey, choiceId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [layerKey]: choiceId,
    }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setActiveLayerKey('behavior');
    setViewMode('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitQuiz = () => {
    setViewMode('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenScript = (sceneId?: string) => {
    if (sceneId) {
      setScriptInitialSceneId(sceneId);
    }
    setIsScriptModalOpen(true);
  };

  const answeredCount = Object.keys(userAnswers).filter((k) =>
    Boolean(userAnswers[k])
  ).length;
  const isAllAnswered = answeredCount === ICEBERG_LAYERS.length;

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#060a14] text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        onOpenGuide={() => setIsGuideModalOpen(true)}
        onOpenScript={() => handleOpenScript('scene_0')}
        onResetQuiz={handleResetQuiz}
        answeredCount={answeredCount}
        totalLayers={ICEBERG_LAYERS.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-24 w-full max-w-full overflow-x-hidden">
        {viewMode === 'quiz' ? (
          <div className="w-full max-w-full overflow-hidden">
            {/* Scenario Story Banner with 4-Scene Tabs & Script Preview */}
            <ScenarioBanner
              scenario={currentScenario}
              onOpenScript={handleOpenScript}
              onOpenMatrix={() => handleOpenScript('scene_3')}
            />

            {/* The Main Iceberg Stage with 7 Accordion Layers */}
            <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 w-full max-w-full overflow-hidden">
              <IcebergVisual
                layers={ICEBERG_LAYERS}
                activeLayerKey={activeLayerKey}
                onSelectLayer={handleSelectLayer}
                onSelectChoice={handleSelectChoice}
                userAnswers={userAnswers}
                scenario={currentScenario}
                onOpenScript={handleOpenScript}
              />

              {/* Bottom Verification Banner */}
              <div className="mt-8 p-4 sm:p-6 rounded-2xl border border-slate-700 bg-slate-900/90 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-white">
                      การตรวจสอบความถูกต้อง 7 ชั้นภูเขา
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        isAllAnswered
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      {isAllAnswered
                        ? 'เลือกครบ 7 ชั้นแล้ว (พร้อมตรวจคำตอบ)'
                        : `เลือกแล้ว ${answeredCount} / ${ICEBERG_LAYERS.length} ชั้น (ขาดอีก ${ICEBERG_LAYERS.length - answeredCount} ชั้น)`}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    {isAllAnswered
                      ? 'คุณได้เลือกคำตอบครบทุกชั้นแล้ว คลิกปุ่ม "ตรวจสอบความถูกต้อง" เพื่อดูคะแนนและเฉลยวิเคราะห์'
                      : 'คลิกที่แถบแต่ละชั้นเพื่อเปิดกล่องตัวเลือก และเลือกคำตอบที่ถูกต้องให้ครบทั้ง 7 ชั้น'}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenScript('scene_0')}
                    className="px-4 py-3.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-sky-400" />
                    <span>อ่านบทละคร</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmitQuiz}
                    disabled={!isAllAnswered}
                    className={`w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2.5 shadow-xl ${
                      isAllAnswered
                        ? 'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white hover:from-sky-400 hover:to-blue-500 hover:shadow-sky-500/30 cursor-pointer ring-2 ring-sky-300/50'
                        : 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>ตรวจสอบความถูกต้อง</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Result & Explanation View */
          <ResultView
            scenario={currentScenario}
            layers={ICEBERG_LAYERS}
            userAnswers={userAnswers}
            onRetake={handleResetQuiz}
            onOpenGuide={() => setIsGuideModalOpen(true)}
            onOpenScript={handleOpenScript}
          />
        )}
      </main>

      {/* Script Reader Modal (บทละคร 4 ฉาก & ตารางเฉลย Satir) */}
      <ScriptModal
        isOpen={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
        scenario={currentScenario}
        initialSceneId={scriptInitialSceneId}
      />

      {/* Satir Theory Reference Modal */}
      <SatirGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Satir Iceberg Model Educational Tool — กรณีศึกษานักศึกษาแพทย์กับการเรียน TBL
          </span>
          <span className="text-slate-400">
            อิงทฤษฎีจิตวิทยาของ Virginia Satir (1916–1988)
          </span>
        </div>
      </footer>
    </div>
  );
}
