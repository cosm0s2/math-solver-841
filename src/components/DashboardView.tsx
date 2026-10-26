import React from 'react';
import { StudentProfile } from '../types.ts';
import {
  TrendingUp,
  Award,
  Flame,
  CheckCircle2,
  Clock,
  Target,
  BookOpen,
  ArrowRight,
  Sparkles,
  BarChart3,
  Calendar,
} from 'lucide-react';

interface DashboardViewProps {
  profile: StudentProfile;
  onSelectTopic: (topicId: string) => void;
  examDaysLeft?: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  onSelectTopic,
  examDaysLeft = 56,
}) => {
  // 6 Iraqi preparatory math chapters
  const CHAPTERS_DATA = [
    {
      id: 'complex_numbers',
      number: '1',
      title: 'الفصل الأول: الأعداد المركبة',
      subtitle: 'ديموافر، الصيغة القطبية، الجذور التكعيبية',
      solved: 18,
      total: 20,
      accuracy: 94,
      color: 'emerald',
      weightInExam: '20 درجة بالوزاري',
    },
    {
      id: 'conic_sections',
      number: '2',
      title: 'الفصل الثاني: القطوع المخروطية',
      subtitle: 'القطع المكافئ، الناقص، الزائد والربط المشترك',
      solved: 15,
      total: 20,
      accuracy: 90,
      color: 'blue',
      weightInExam: '20 درجة بالوزاري',
    },
    {
      id: 'differentiation',
      number: '3',
      title: 'الفصل الثالث: تطبيقات التفاضل',
      subtitle: 'المعدلات الزمنية، مبرهنة رول، رسم الدوال، التطبيقات',
      solved: 16,
      total: 24,
      accuracy: 85,
      color: 'amber',
      weightInExam: '30-40 درجة بالوزاري',
    },
    {
      id: 'integration',
      number: '4',
      title: 'الفصل الرابع: التكامل وتطبيقاته',
      subtitle: 'التكامل المحدد، المساحات المحددة، الحجوم الدورانية',
      solved: 14,
      total: 22,
      accuracy: 88,
      color: 'purple',
      weightInExam: '30 درجة بالوزاري',
    },
    {
      id: 'differential_equations',
      number: '5',
      title: 'الفصل الخامس: المعادلات التفاضلية',
      subtitle: 'فصل المتغيرات، المعادلات المتجانسة',
      solved: 10,
      total: 12,
      accuracy: 92,
      color: 'rose',
      weightInExam: '20 درجة بالوزاري',
    },
    {
      id: 'solid_geometry',
      number: '6',
      title: 'الفصل السادس: الهندسة الفضائية',
      subtitle: 'مبرهنة 7، 8، 9 والنتيجة والتعامد والتوازي',
      solved: 7,
      total: 10,
      accuracy: 80,
      color: 'teal',
      weightInExam: '20 درجة بالوزاري',
    },
  ];

  const totalSolved = CHAPTERS_DATA.reduce((acc, c) => acc + c.solved, 0);
  const totalQuestions = CHAPTERS_DATA.reduce((acc, c) => acc + c.total, 0);
  const averageMastery = Math.round((totalSolved / totalQuestions) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner: Student Mastery Summary & Exam Countdown */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-500/30">
              <Calendar className="w-3.5 h-3.5" />
              الامتحان الوزاري الدور الأول بعد: {examDaysLeft} يوماً
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              مرحباً بك يا {profile.name.split(' ')[0]} 🎓
            </h2>
            <p className="text-sm text-slate-300 max-w-md">
              مستواك الحالي يؤهلك لدرجة <span className="text-emerald-400 font-bold">100/100</span> في امتحان الرياضيات الوزاري. استمر بالحل اليومي!
            </p>
          </div>

          {/* Radial Circular Progress Meter */}
          <div className="flex items-center gap-6 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500"
                  strokeDasharray={`${averageMastery}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-black text-white">{averageMastery}%</span>
                <span className="block text-[9px] text-slate-400">نسبة الجاهزية</span>
              </div>
            </div>

            <div className="space-y-1 text-right">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                <Flame className="w-4 h-4 fill-amber-400" />
                استمرار {profile.streakDays} أيام 🔥
              </div>
              <div className="text-xs text-slate-300">
                حللت <span className="font-bold text-white">{profile.solvedCount}</span> سؤالاً وزاريًا
              </div>
              <div className="text-xs text-emerald-400 font-semibold">
                نقاطك: {profile.xp} XP
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-right">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">الأسئلة المحلولة</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {totalSolved} <span className="text-xs font-normal text-slate-400">/ {totalQuestions}</span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            +5 أسئلة هذا الأسبوع
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-right">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">ساعات الدراسة</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            28.5 <span className="text-xs font-normal text-slate-400">ساعة</span>
          </div>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
            تركيز ممتاز للمنهج
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-right">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">دقة الحلول الوزارية</span>
            <Target className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            89%
          </div>
          <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
            أخطاء إشارة منخفضة جداً
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-right">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">الترتيب في بغداد</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            #{profile.rank}
          </div>
          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
            بين أفضل 5% بالعراق
          </span>
        </div>
      </div>

      {/* Chapters Mastery Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-500" />
            نسبة إتقان فصول الكتاب الوزاري (6 فصول)
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            انقر على أي فصل للتدريب المباشر
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CHAPTERS_DATA.map((ch) => {
            const pct = Math.round((ch.solved / ch.total) * 100);

            return (
              <div
                key={ch.id}
                onClick={() => onSelectTopic(ch.id)}
                className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:border-emerald-500 dark:hover:border-emerald-500/50 cursor-pointer transition group"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 transition">
                      {ch.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {ch.subtitle}
                    </p>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg font-medium">
                    {ch.weightInExam}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span className="text-slate-600 dark:text-slate-400">
                      {ch.solved} من {ch.total} سؤال وزاري محلول
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
