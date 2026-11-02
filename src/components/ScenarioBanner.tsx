import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  TableProperties,
  ChevronRight,
  Flame,
  Stethoscope,
  Heart,
  Users,
  User,
} from 'lucide-react';
import { Scenario, LayerKey } from '../types/iceberg';

interface ScenarioBannerProps {
  scenario: Scenario;
  onOpenScript: (sceneId?: string) => void;
  onOpenMatrix: () => void;
}

export const ScenarioBanner: React.FC<ScenarioBannerProps> = ({
  scenario,
  onOpenScript,
  onOpenMatrix,
}) => {
  const [activePreviewIndex, setActivePreviewIndex] = useState<number>(0);
  const activeScene = scenario.scenes[activePreviewIndex] || scenario.scenes[0];

  const getSceneIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <User className="w-3.5 h-3.5 text-sky-400" />;
      case 1:
        return <Users className="w-3.5 h-3.5 text-amber-400" />;
      case 2:
        return <Heart className="w-3.5 h-3.5 text-pink-400" />;
      case 3:
        return <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <BookOpen className="w-3.5 h-3.5 text-sky-400" />;
    }
  };

  return (
    <section className="bg-gradient-to-b from-slate-900 via-slate-900/95 to-[#060a14] border-b border-slate-800 w-full max-w-full overflow-hidden">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-5 space-y-4">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold">
              <GraduationCap className="w-4 h-4" />
              <span>{scenario.categoryLabel}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">บทละคร 4 ฉาก (Pre-class, TBL, บ้าน, หาหมอ)</span>
            </div>

            <h1 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
              {scenario.titleTh}
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {scenario.summary}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto flex-wrap">
            <button
              type="button"
              onClick={() => onOpenScript(activeScene.id)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer ring-1 ring-sky-300/40"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>อ่านบทละครฉบับเต็ม</span>
            </button>

            <button
              type="button"
              onClick={onOpenMatrix}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-semibold transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              <TableProperties className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">ตารางเฉลย Satir</span>
            </button>
          </div>
        </div>

        {/* Scene Tabs Carousel / Cards */}
        <div className="rounded-2xl border border-slate-800/90 bg-slate-950/70 p-3 sm:p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>เลือกดูตัวอย่างบทละครตามฉาก (คลิกเพื่อสลับฉาก หรือกดอ่านฉบับเต็ม)</span>
            </span>

            <button
              type="button"
              onClick={() => onOpenScript(activeScene.id)}
              className="text-[11px] text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-0.5"
            >
              <span>อ่านทั้ง 4 ฉาก</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Scene Pill Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {scenario.scenes.map((scene, idx) => {
              const isSelected = activePreviewIndex === idx;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => setActivePreviewIndex(idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                    isSelected
                      ? 'bg-sky-950/80 border-sky-400/80 text-white shadow-md ring-1 ring-sky-400/40'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] font-bold font-mono text-sky-400">
                      {scene.sceneNumber}
                    </span>
                    {getSceneIcon(idx)}
                  </div>
                  <span className="text-xs font-bold truncate">
                    {scene.title.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate">
                    {scene.location}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Scene Snippet Quote */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs">
                  {activeScene.sceneNumber}: {activeScene.title}
                </span>
                <span className="text-slate-400 text-[11px]">
                  ({activeScene.subtitle})
                </span>
              </div>
              <p className="text-slate-300 text-[11px] sm:text-xs italic truncate max-w-2xl">
                "{activeScene.dialogues[activeScene.dialogues.length - 1]?.speaker}: {activeScene.dialogues[activeScene.dialogues.length - 1]?.text}"
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenScript(activeScene.id)}
              className="text-xs px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 font-semibold border border-sky-400/30 shrink-0 self-start sm:self-auto transition-colors"
            >
              อ่านบทสนทนาฉากนี้
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
