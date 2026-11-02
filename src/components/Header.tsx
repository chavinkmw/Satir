import React from 'react';
import { BookOpen, Compass, RefreshCw, GraduationCap } from 'lucide-react';

interface HeaderProps {
  onOpenGuide: () => void;
  onResetQuiz: () => void;
  onOpenScript?: () => void;
  answeredCount: number;
  totalLayers: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenGuide,
  onResetQuiz,
  onOpenScript,
  answeredCount,
  totalLayers,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-2.5 shrink-0 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold shrink-0">
            <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />
          </div>
          <span className="text-sm sm:text-base md:text-lg font-bold text-slate-100 tracking-tight whitespace-nowrap truncate max-w-[160px] xs:max-w-[200px] sm:max-w-none">
            Satir Iceberg Model
          </span>
        </div>

        {/* Zone 2: Single Study Theme Badge */}
        <div className="hidden md:flex items-center gap-2 text-xs text-sky-300 bg-sky-950/60 border border-sky-400/30 px-3 py-1.5 rounded-full">
          <GraduationCap className="w-4 h-4 text-sky-400" />
          <span>กรณีศึกษา: การเรียน TBL & ปรึกษาจิตแพทย์</span>
        </div>

        {/* Zone 3: 1 Primary / Utility Action */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden lg:flex items-center text-xs text-slate-400 pr-1">
            <span>ความคืบหน้า:</span>
            <span className="ml-1.5 font-semibold text-sky-400 tabular-nums">
              {answeredCount}/{totalLayers} ชั้น
            </span>
          </div>

          {onOpenScript && (
            <button
              onClick={onOpenScript}
              className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 rounded-lg shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">บทละคร 4 ฉาก</span>
              <span className="xs:hidden">บทละคร</span>
            </button>
          )}

          <button
            onClick={onResetQuiz}
            title="เริ่มทำข้อสอบใหม่"
            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenGuide}
            className="px-2.5 sm:px-3.5 py-1.5 text-xs font-medium text-sky-300 bg-sky-950/60 border border-sky-500/30 rounded-lg hover:bg-sky-900/50 hover:text-white transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">คู่มือ 7 ชั้น</span>
            <span className="xs:hidden">คู่มือ</span>
          </button>
        </div>
      </div>
    </header>
  );
};
