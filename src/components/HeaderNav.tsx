import React from 'react';
import {
  Sun,
  Moon,
  Camera,
  Trophy,
  Github,
  Bell,
  Smartphone,
  Monitor,
  GraduationCap,
  Calendar,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { StudentProfile } from '../types.ts';

interface HeaderNavProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isMobileDeviceFrame: boolean;
  onToggleDeviceFrame: () => void;
  currentProfile: StudentProfile;
  onOpenAuth: () => void;
  onOpenCamera: () => void;
  onOpenClassroom: () => void;
  onOpenOpenSource: () => void;
  onOpenLibrary?: () => void;
  examDaysLeft?: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  isDarkMode,
  onToggleDarkMode,
  isMobileDeviceFrame,
  onToggleDeviceFrame,
  currentProfile,
  onOpenAuth,
  onOpenCamera,
  onOpenClassroom,
  onOpenOpenSource,
  onOpenLibrary,
  examDaysLeft = 56,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20 shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                رياضيات الخوارزمي
              </span>
              <span className="text-[10px] font-black px-1.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md border border-emerald-500/20">
                السادس الإعدادي
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">تصميم: حيدر حسن</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">منهج الرياضيات الوزاري العراقي</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Ministerial Library 2015-2026 Button */}
          {onOpenLibrary && (
            <button
              type="button"
              onClick={onOpenLibrary}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 transition"
              title="مكتبة الأسئلة الوزارية 2015-2026"
              aria-label="مكتبة الوزاريات"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden sm:inline">الوزاريات (2015-2026)</span>
            </button>
          )}
          {/* Exam Days Badge */}
          <div
            onClick={onOpenClassroom}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl text-xs font-bold border border-amber-500/20 cursor-pointer transition"
            title="انقر لتفاصيل الامتحانات والواجبات"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>الوزاري: {examDaysLeft} يوماً</span>
          </div>

          {/* Quick Camera Action */}
          <button
            type="button"
            onClick={onOpenCamera}
            className="p-2 sm:px-3 sm:py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition active:scale-95"
            aria-label="فتح كاميرا حل الأسئلة"
          >
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">الكاميرا</span>
          </button>

          {/* Device Frame View Toggle (Flutter Simulator vs Wide Screen) */}
          <button
            type="button"
            onClick={onToggleDeviceFrame}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            title={isMobileDeviceFrame ? 'التبديل إلى العرض الكامل' : 'التبديل إلى إطار هاتف Flutter'}
            aria-label="تبديل إطار العرض"
          >
            {isMobileDeviceFrame ? (
              <Monitor className="w-4 h-4 text-emerald-500" />
            ) : (
              <Smartphone className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            title={isDarkMode ? 'الوضع النهاري' : 'وضع الدراسة الليلية (Dark Mode)'}
            aria-label="تبديل الوضع الليلي والنهاري"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Google Classroom & Push Reminders */}
          <button
            type="button"
            onClick={onOpenClassroom}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition relative"
            title="Google Classroom وإشعارات الواجبات"
            aria-label="تنبيهات الواجبات والتزامن"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full"></span>
          </button>

          {/* Open Source Modal Button */}
          <button
            type="button"
            onClick={onOpenOpenSource}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            title="مشروع مفتوح المصدر ومساهمات الأساتذة"
            aria-label="المصدر المفتوح"
          >
            <Github className="w-4 h-4" />
          </button>

          {/* Student Profile & Fast Login */}
          <button
            type="button"
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl transition border border-slate-200 dark:border-slate-700"
            aria-label="الملف الشخصي للطالب وتسجيل الدخول"
          >
            <span className="text-base">{currentProfile.avatar}</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden sm:inline">
              {currentProfile.name.split(' ')[0]}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
