import React, { useState } from 'react';
import {
  X,
  BookOpen,
  User,
  Users,
  Heart,
  Stethoscope,
  Sparkles,
  Layers,
  ChevronRight,
  HelpCircle,
  TableProperties,
} from 'lucide-react';
import { Scenario, ScenarioScene, DialogueLine, LayerKey } from '../types/iceberg';
import { ICEBERG_LAYERS } from '../data/satirGuide';

interface ScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: Scenario;
  initialSceneId?: string;
  onJumpToLayer?: (layerKey: LayerKey) => void;
}

export const ScriptModal: React.FC<ScriptModalProps> = ({
  isOpen,
  onClose,
  scenario,
  initialSceneId,
  onJumpToLayer,
}) => {
  const [activeTab, setActiveTab] = useState<'script' | 'matrix'>('script');
  const [selectedSceneId, setSelectedSceneId] = useState<string>(
    initialSceneId || scenario.scenes[0]?.id || 'scene_0'
  );

  if (!isOpen) return null;

  const currentScene =
    scenario.scenes.find((s) => s.id === selectedSceneId) || scenario.scenes[0];

  const getRoleBadge = (role: DialogueLine['role'], speaker: string) => {
    switch (role) {
      case 'patient':
        return {
          icon: <User className="w-3.5 h-3.5 text-sky-400" />,
          label: speaker,
          bg: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
          bubbleBg: 'bg-slate-900/90 border-sky-500/30 text-slate-100',
        };
      case 'peer':
        return {
          icon: <Users className="w-3.5 h-3.5 text-amber-400" />,
          label: speaker,
          bg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
          bubbleBg: 'bg-slate-900/80 border-slate-700/80 text-slate-200',
        };
      case 'mother':
        return {
          icon: <Heart className="w-3.5 h-3.5 text-pink-400" />,
          label: speaker,
          bg: 'bg-pink-500/20 text-pink-300 border-pink-400/40',
          bubbleBg: 'bg-slate-900/80 border-slate-700/80 text-slate-200',
        };
      case 'doctor':
        return {
          icon: <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />,
          label: speaker,
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
          bubbleBg: 'bg-emerald-950/30 border-emerald-500/30 text-slate-100',
        };
      case 'narrator':
      default:
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-slate-400" />,
          label: speaker,
          bg: 'bg-slate-800 text-slate-400 border-slate-700',
          bubbleBg: 'bg-slate-950/60 border-slate-800 text-slate-400 italic text-center',
        };
    }
  };

  const getLayerName = (layerKey: LayerKey) => {
    const layer = ICEBERG_LAYERS.find((l) => l.key === layerKey);
    return layer ? `${layer.nameTh} (${layer.nameEn})` : layerKey;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl my-4 sm:my-8 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 sticky top-0 z-20">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                บทละครกรณีศึกษา: นักศึกษาแพทย์กับการเรียน TBL
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                ฉากที่ 0 ถึง ฉากที่ 3 พร้อมตารางถอดรหัสโมเดลภูเขาน้ำแข็งของซาเทียร์
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* View Mode Toggle */}
            <div className="flex items-center p-0.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('script')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  activeTab === 'script'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                บทละคร (Script)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('matrix')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
                  activeTab === 'matrix'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <TableProperties className="w-3 h-3" />
                <span>ตารางเฉลย Satir</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'script' ? (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Scene Selector Tabs */}
            <div className="px-4 sm:px-6 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
              {scenario.scenes.map((scene) => {
                const isSelected = selectedSceneId === scene.id;
                return (
                  <button
                    key={scene.id}
                    onClick={() => setSelectedSceneId(scene.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-sky-500/25 text-sky-200 border border-sky-400/50 shadow-sm'
                        : 'bg-slate-800/60 text-slate-400 border border-slate-700/60 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <span>{scene.sceneNumber}:</span>
                    <span className="font-normal truncate max-w-[140px] sm:max-w-none">
                      {scene.title.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Scene Sub-Header */}
            <div className="px-4 sm:px-6 py-2.5 bg-slate-900/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs">
              <div>
                <span className="font-bold text-white text-sm">
                  {currentScene.sceneNumber}: {currentScene.title}
                </span>
                <span className="text-slate-400 ml-2">({currentScene.subtitle})</span>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
                สถานที่: {currentScene.location}
              </span>
            </div>

            {/* Scrollable Dialogue Stream */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 sm:space-y-4">
              {currentScene.dialogues.map((dlg, idx) => {
                const badge = getRoleBadge(dlg.role, dlg.speaker);
                const isNarrator = dlg.role === 'narrator';

                if (isNarrator) {
                  return (
                    <div
                      key={idx}
                      className="my-3 py-2 px-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 text-center font-medium italic"
                    >
                      {dlg.text}
                    </div>
                  );
                }

                return (
                  <div
                    key={idx}
                    className={`p-3 sm:p-4 rounded-2xl border transition-all ${badge.bubbleBg} ${
                      dlg.highlightLayer ? 'ring-1 ring-sky-400/40 shadow-lg' : ''
                    }`}
                  >
                    {/* Speaker Header */}
                    <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${badge.bg}`}
                        >
                          {badge.icon}
                          <span>{badge.label}</span>
                        </span>

                        {dlg.stageDirection && (
                          <span className="text-xs text-amber-300/80 font-mono italic">
                            {dlg.stageDirection}
                          </span>
                        )}
                      </div>

                      {/* Highlighted Layer Clue Badge */}
                      {dlg.highlightLayer && (
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <span className="font-bold text-sky-400 bg-sky-950/70 border border-sky-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Layers className="w-3 h-3 text-sky-400" />
                            <span>จุดเชื่อมโยง: {getLayerName(dlg.highlightLayer)}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Speech Text */}
                    <p className="text-xs sm:text-sm leading-relaxed font-medium pl-1 text-slate-100">
                      {dlg.text}
                    </p>

                    {/* Annotation Note if present */}
                    {dlg.highlightNote && (
                      <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-sky-300/90 flex items-start gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>{dlg.highlightNote}</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Special Climax Footer for Scene 3 */}
              {currentScene.id === 'scene_3' && (
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-sky-950/70 via-indigo-950/70 to-slate-900 border border-sky-400/50 shadow-xl text-center space-y-2">
                  <span className="text-2xl animate-bounce inline-block">🚀🕊️</span>
                  <h4 className="text-sm font-bold text-sky-200">
                    จุดคลี่คลาย: การตระหนักรู้ในคุณค่าตนเองและความใจดีกับตนเอง
                  </h4>
                  <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                    "สิ่งที่สำคัญที่สุดก็คงเป็นการเข้าใจตัวเองว่าสิ่งที่เราเป็นทุกข์นั้น มันก็เป็นสิ่งที่สวยงามได้เช่นกัน และตัวผมเองก็คงต้องใจดีกับตัวเองมากขึ้น ไม่เค้นตัวเองมากเกินไป และหาวิธีใหม่ๆ ในการจัดการตัวเอง… ผมคิดว่าผมสามารถไปต่อได้แล้วครับ!!!"
                  </p>
                  <span className="inline-block text-[11px] text-amber-300/90 font-mono font-bold">
                    (บินทะลุหน้าต่างออกไป)
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Satir Formulation Matrix Table */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="p-3.5 rounded-xl bg-sky-950/50 border border-sky-500/30 text-xs text-sky-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <TableProperties className="w-4 h-4 text-sky-400 shrink-0" />
                <span>
                  ตารางเฉลย Satir คนไข้ (สำหรับวิเคราะห์และเชื่อมโยงกับบทสนทนา 4 ฉาก)
                </span>
              </div>
            </div>

            <div className="border border-slate-800 rounded-2xl overflow-hidden shadow-xl bg-slate-950/80">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-300">
                      <th className="p-3 font-bold w-12 text-center">ชั้น</th>
                      <th className="p-3 font-bold w-40">ระดับชั้น Satir</th>
                      <th className="p-3 font-bold w-52 text-sky-300">
                        คำตอบ / สภาวะของคนไข้
                      </th>
                      <th className="p-3 font-bold">หลักฐานจากบทละคร (Script Evidence)</th>
                      <th className="p-3 font-bold hidden md:table-cell">
                        การวิเคราะห์เชิงจิตวิทยา
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {scenario.satirFormulation.map((row, idx) => (
                      <tr
                        key={row.layerKey}
                        className="hover:bg-slate-900/60 transition-colors"
                      >
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
                        <td className="p-3 text-slate-400 text-[11px] leading-relaxed hidden md:table-cell">
                          {row.clinicalMeaning}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between text-xs">
          <span className="text-slate-400 hidden sm:inline">
            ใช้บทละครนี้เพื่อประกอบการเลือกคำตอบ 7 ชั้นบนโมเดลภูเขาน้ำแข็ง
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-colors ml-auto shadow-sm"
          >
            กลับสู่การทำแบบทดสอบ
          </button>
        </div>
      </div>
    </div>
  );
};
