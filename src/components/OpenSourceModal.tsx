import React, { useState } from 'react';
import { X, GitBranch, Github, Heart, Send, CheckCircle2, FileCode, Users } from 'lucide-react';

interface OpenSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OpenSourceModal: React.FC<OpenSourceModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [problemTitle, setProblemTitle] = useState('');
  const [solutionSteps, setSolutionSteps] = useState('');

  const handleSubmitContribution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemTitle || !solutionSteps) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setProblemTitle('');
      setSolutionSteps('');
      onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center shadow-md">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                مشروع مفتوح المصدر (Open Source)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                مبادرة مجتمعية لدعم طلبة السادس الإعدادي في العراق
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full transition"
            aria-label="إغلاق نافذة المصدر المفتوح"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-right">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs mb-1">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              من أجل شفافية التعليم ومجانية حلول الأسئلة الوزارية • تصميم حيدر حسن
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              تطبيق <strong>رياضيات الخوارزمي</strong> من تصميم وتطوير <strong>حيدر حسن</strong>، مبني كبرمجية مفتوحة المصدر بالكامل ومتاحة لخدمة طلبة العراق والأساتذة بشفافية تامة وفق معايير مركز الفحص الوزاري.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <GitBranch className="w-5 h-5 mx-auto text-emerald-500 mb-1" />
              <div className="font-bold text-xs text-slate-900 dark:text-white">GitHub Repository</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">github.com/iraq-edu/najah-math</div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <Users className="w-5 h-5 mx-auto text-blue-500 mb-1" />
              <div className="font-bold text-xs text-slate-900 dark:text-white">مجتمع مدرسي العراق</div>
              <div className="text-[10px] text-slate-400 mt-0.5">أكثر من 120 مساهمة معتمدة</div>
            </div>
          </div>

          {/* Teacher Contribution Form */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
            <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-amber-500" />
              مساهمة مدرس: أضف حل سؤال وزاري جديد للمجتمع
            </h4>

            {submitted ? (
              <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs flex items-center justify-center gap-2 font-bold animate-bounce">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                تم إرسال مساهمتك للمراجعة والاعتماد في بنك الأسئلة الوزارية! شكراً لك.
              </div>
            ) : (
              <form onSubmit={handleSubmitContribution} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    عنوان وسنة السؤال الوزاري:
                  </label>
                  <input
                    type="text"
                    required
                    value={problemTitle}
                    onChange={(e) => setProblemTitle(e.target.value)}
                    placeholder="مثال: وزاري 2024 دور أول - إيجاد قيمتي x, y الحقيقيتين"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    الخطوات النموذجية وملاحظات التصحيح الوزاري:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={solutionSteps}
                    onChange={(e) => setSolutionSteps(e.target.value)}
                    placeholder="اكتب خطوات الحل النموذجي مع توضيح القوانين والأخطاء الشائعة..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  إرسال مقترح الحل للمستودع المفتوح
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
