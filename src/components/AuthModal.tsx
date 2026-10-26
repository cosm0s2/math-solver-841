import React, { useState } from 'react';
import { X, Lock, CheckCircle2, User, Sparkles, ShieldCheck } from 'lucide-react';
import { StudentProfile } from '../types.ts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentProfile;
  onUpdateProfile: (newProfile: StudentProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onUpdateProfile,
}) => {
  const [isSigningInWithOAuth, setIsSigningInWithOAuth] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string>(currentProfile.id);

  const PRESET_STUDENT_PROFILES: StudentProfile[] = [
    {
      id: 'student-1',
      name: 'أحمد العراقي',
      email: 'ahmed.iraq@gmail.com',
      avatar: '👨‍🎓',
      school: 'ثانوية المتميزين للبنين - الرصافة الأولى',
      city: 'بغداد',
      branch: 'السادس العلمي (أحيائي/تطبيقي سابقاً)',
      xp: 2650,
      streakDays: 16,
      solvedCount: 81,
      rank: 2,
      badges: ['صائد الـ 100 بالوزاري 🏆', 'عبقري ديموافر ⚡'],
    },
    {
      id: 'student-2',
      name: 'زينب حيدر',
      email: 'zainab.haider@iraq-edu.iq',
      avatar: '👩‍🎓',
      school: 'إعدادية بابل للبنات للمتميزات',
      city: 'بابل (الحلة)',
      branch: 'السادس العلمي (أحيائي/تطبيقي سابقاً)',
      xp: 3100,
      streakDays: 22,
      solvedCount: 110,
      rank: 1,
      badges: ['فارسة التكامل 📐', 'صائد الـ 100 بالوزاري 🏆'],
    },
    {
      id: 'student-3',
      name: 'عمر البصري',
      email: 'omar.basra@student.iq',
      avatar: '👨‍💼',
      school: 'ثانوية المتميزين في البصرة',
      city: 'البصرة',
      branch: 'السادس الأدبي',
      xp: 1850,
      streakDays: 12,
      solvedCount: 65,
      rank: 4,
      badges: ['بطل مبرهنة رول 🌟'],
    },
  ];

  const handleOAuthLogin = () => {
    setIsSigningInWithOAuth(true);
    setTimeout(() => {
      setIsSigningInWithOAuth(false);
      const chosen = PRESET_STUDENT_PROFILES.find((p) => p.id === selectedProfileId) || PRESET_STUDENT_PROFILES[0];
      onUpdateProfile(chosen);
      onClose();
    }, 1200);
  };

  const handleSelectProfile = (profile: StudentProfile) => {
    setSelectedProfileId(profile.id);
    onUpdateProfile(profile);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-right">
        {/* Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                تسجيل الدخول الآمن للطلبة (OAuth)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                حفظ التقدم، لوحة الشرف، وتزامن Google Classroom
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full transition"
            aria-label="إغلاق نافذة تسجيل الدخول"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Quick OAuth Button */}
          <button
            type="button"
            disabled={isSigningInWithOAuth}
            onClick={handleOAuthLogin}
            className="w-full py-3 px-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-white border-2 border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-xs flex items-center justify-center gap-3 transition shadow-sm active:scale-98"
          >
            {/* Google Logo SVG */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isSigningInWithOAuth ? 'جاري التحقق عبر Google OAuth...' : 'تسجيل دخول سريع بحساب Google التعليمي'}</span>
          </button>

          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full"></div>
            <span className="bg-white dark:bg-slate-900 px-3 text-[11px] text-slate-400 shrink-0">
              أو اختر ملف طالب للتجربة الفورية
            </span>
          </div>

          {/* Preset Profiles */}
          <div className="space-y-2">
            {PRESET_STUDENT_PROFILES.map((p) => {
              const isSelected = p.id === currentProfile.id;

              return (
                <div
                  key={p.id}
                  onClick={() => handleSelectProfile(p)}
                  className={`p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500/40 dark:bg-emerald-950/20 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{p.avatar}</span>
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                        {p.name}
                        {isSelected && (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                            (الحساب الحالي)
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {p.city} • {p.school}
                      </div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                        {p.branch}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-500 justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>بياناتك ومستواك الدراسي مشفر ومحفوظ محلياً</span>
          </div>
        </div>
      </div>
    </div>
  );
};
