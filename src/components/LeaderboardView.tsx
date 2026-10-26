import React, { useState } from 'react';
import { StudentProfile } from '../types.ts';
import {
  Trophy,
  Medal,
  Flame,
  Award,
  Users,
  Building2,
  Globe2,
  Sparkles,
  ChevronUp,
} from 'lucide-react';

interface LeaderboardViewProps {
  currentProfile: StudentProfile;
}

interface LeaderboardUser {
  rank: number;
  name: string;
  school: string;
  city: string;
  branch: string;
  xp: number;
  solvedCount: number;
  streakDays: number;
  badge: string;
  isCurrentUser?: boolean;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ currentProfile }) => {
  const [activeTab, setActiveTab] = useState<'class' | 'school' | 'iraq'>('class');

  const CLASS_LEADERBOARD: LeaderboardUser[] = [
    {
      rank: 1,
      name: 'علي الكرخي',
      school: 'ثانوية المتميزين - الرصافة',
      city: 'بغداد',
      branch: 'السادس العلمي',
      xp: 2850,
      solvedCount: 142,
      streakDays: 24,
      badge: 'عبقري ديموافر ⚡',
    },
    {
      rank: 2,
      name: currentProfile.name,
      school: currentProfile.school,
      city: currentProfile.city,
      branch: currentProfile.branch,
      xp: currentProfile.xp,
      solvedCount: currentProfile.solvedCount,
      streakDays: currentProfile.streakDays,
      badge: 'صائد الـ 100 بالوزاري 🏆',
      isCurrentUser: true,
    },
    {
      rank: 3,
      name: 'فاطمة الزهراء حيدر',
      school: 'ثانوية المتميزات',
      city: 'بغداد',
      branch: 'السادس العلمي',
      xp: 2340,
      solvedCount: 118,
      streakDays: 19,
      badge: 'فارسة التكامل 📐',
    },
    {
      rank: 4,
      name: 'حسين البصري',
      school: 'ثانوية المتميزين',
      city: 'البصرة',
      branch: 'السادس العلمي',
      xp: 2190,
      solvedCount: 105,
      streakDays: 14,
      badge: 'أستاذ القطوع 🌀',
    },
    {
      rank: 5,
      name: 'زينب عادل',
      school: 'إعدادية بغداد للبنات',
      city: 'بغداد',
      branch: 'السادس العلمي',
      xp: 1980,
      solvedCount: 96,
      streakDays: 11,
      badge: 'نجمة رول 🌟',
    },
  ];

  const IRAQ_LEADERBOARD: LeaderboardUser[] = [
    {
      rank: 1,
      name: 'مصطفى السامرائي',
      school: 'ثانوية كلية بغداد',
      city: 'بغداد',
      branch: 'السادس العلمي',
      xp: 4120,
      solvedCount: 215,
      streakDays: 45,
      badge: 'أسطورة الرياضيات الوزارية 👑',
    },
    {
      rank: 2,
      name: 'مريم الكردي',
      school: 'ثانوية نيلوفر النموذجية',
      city: 'أربيل',
      branch: 'السادس العلمي',
      xp: 3890,
      solvedCount: 198,
      streakDays: 38,
      badge: 'عبقرية ديموافر ⚡',
    },
    {
      rank: 3,
      name: 'حسن النجفي',
      school: 'ثانوية الذرى للمتميزين',
      city: 'النجف الأشرف',
      branch: 'السادس العلمي',
      xp: 3670,
      solvedCount: 184,
      streakDays: 32,
      badge: 'صائد الـ 100 بالوزاري 🏆',
    },
    {
      rank: 4,
      name: 'علي الكرخي',
      school: 'ثانوية المتميزين',
      city: 'بغداد',
      branch: 'السادس العلمي',
      xp: 2850,
      solvedCount: 142,
      streakDays: 24,
      badge: 'فارس التكامل 📐',
    },
    {
      rank: 12,
      name: currentProfile.name,
      school: currentProfile.school,
      city: currentProfile.city,
      branch: currentProfile.branch,
      xp: currentProfile.xp,
      solvedCount: currentProfile.solvedCount,
      streakDays: currentProfile.streakDays,
      badge: 'صائد الـ 100 بالوزاري 🏆',
      isCurrentUser: true,
    },
  ];

  const currentList = activeTab === 'iraq' ? IRAQ_LEADERBOARD : CLASS_LEADERBOARD;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-teal-500/15 border border-amber-500/30 rounded-3xl p-5 sm:p-6 text-right">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-500 dark:text-amber-300 rounded-full text-xs font-bold mb-2">
              <Trophy className="w-3.5 h-3.5" />
              المنافسة الودية الأسبوعية لطلاب السادس الإعدادي
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              لوحة المتصدرين وأوائل العراق 🥇
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-md">
              حل الأسئلة الوزارية يومياً يمنحك نقاط XP ويرفع ترتيبك بين زملائك في الصف وعلى مستوى العراق!
            </p>
          </div>

          {/* User's Current Badge Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 rounded-2xl shadow-sm text-center shrink-0 w-full sm:w-auto">
            <span className="text-[10px] text-slate-400 block mb-1">وسامك الحالي</span>
            <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">
              صائد الـ 100 بالوزاري 🏆
            </div>
            <span className="text-xs text-slate-500 font-bold block mt-1">
              ترتيبك بالصف: #{currentProfile.rank}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('class')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition ${
            activeTab === 'class'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-500" />
          شعبتي / صفي (السادس العلمي)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('school')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition ${
            activeTab === 'school'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4 text-blue-500" />
          مدرستي ({currentProfile.school})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('iraq')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition ${
            activeTab === 'iraq'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Globe2 className="w-4 h-4 text-amber-500" />
          أوائل العراق (كافة المحافظات)
        </button>
      </div>

      {/* Leaderboard Ranks List */}
      <div className="space-y-2">
        {currentList.map((user) => {
          const isTop3 = user.rank <= 3;
          const medalColor =
            user.rank === 1
              ? 'text-amber-400 bg-amber-400/10 border-amber-400/30'
              : user.rank === 2
              ? 'text-slate-300 bg-slate-300/10 border-slate-300/30'
              : user.rank === 3
              ? 'text-amber-700 bg-amber-700/10 border-amber-700/30'
              : 'text-slate-400 bg-slate-100 dark:bg-slate-800';

          return (
            <div
              key={`${user.rank}-${user.name}`}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                user.isCurrentUser
                  ? 'bg-emerald-500/10 border-emerald-500/40 dark:bg-emerald-950/20 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Rank and Student Info */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm border shrink-0 ${medalColor}`}
                >
                  {isTop3 ? (
                    <Trophy className="w-4 h-4" />
                  ) : (
                    <span>{user.rank}</span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {user.name}
                    </span>
                    {user.isCurrentUser && (
                      <span className="text-[10px] font-black px-1.5 py-0.5 bg-emerald-500 text-white rounded-md">
                        أنت
                      </span>
                    )}
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">
                      • {user.city} ({user.school})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      {user.badge}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                      <Flame className="w-3 h-3 text-amber-500" />
                      {user.streakDays} أيام
                    </span>
                  </div>
                </div>
              </div>

              {/* XP and Solved Questions */}
              <div className="text-left shrink-0">
                <div className="text-sm font-black text-slate-900 dark:text-white">
                  {user.xp} <span className="text-[10px] text-emerald-500">XP</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {user.solvedCount} سؤال وزاري
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
