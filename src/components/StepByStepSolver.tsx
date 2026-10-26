import React, { useState } from 'react';
import { SolvedProblem, MathStep } from '../types.ts';
import { MathRenderer } from './MathRenderer.tsx';
import { InteractiveGraph } from './InteractiveGraph.tsx';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Award,
  ChevronDown,
  ChevronUp,
  Share2,
  Bookmark,
  Sparkles,
  Layers,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StepByStepSolverProps {
  problem: SolvedProblem;
  onMastered?: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

export const StepByStepSolver: React.FC<StepByStepSolverProps> = ({
  problem,
  onMastered,
  isBookmarked = false,
  onToggleBookmark,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [expandedWhy, setExpandedWhy] = useState<Record<number, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [showGraph, setShowGraph] = useState<boolean>(true);
  const [isMasteredAwarded, setIsMasteredAwarded] = useState<boolean>(false);

  const toggleWhy = (idx: number) => {
    setExpandedWhy((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleComplete = (idx: number) => {
    setCompletedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleClaimMastery = () => {
    if (!isMasteredAwarded) {
      setIsMasteredAwarded(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#06b6d4', '#f59e0b'],
      });
      if (onMastered) onMastered();
    }
  };

  return (
    <div className="space-y-6">
      {/* Problem Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm transition">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs rounded-full border border-emerald-500/20">
              {problem.categoryArabic}
            </span>
            {problem.ministerialYear && (
              <span className="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-xs rounded-full border border-amber-500/20">
                {problem.ministerialYear}
              </span>
            )}
            <span className="px-2.5 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs rounded-full">
              الفرع {problem.branch}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-500" />
              درجة السؤال الوزاري: {problem.marks} درجات
            </span>
            {onToggleBookmark && (
              <button
                type="button"
                onClick={onToggleBookmark}
                className={`p-2 rounded-xl transition ${
                  isBookmarked
                    ? 'bg-amber-500/10 text-amber-500'
                    : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                aria-label="حفظ السؤال"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-relaxed">
          {problem.title}
        </h2>
        {problem.questionArabic && (
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
            {problem.questionArabic}
          </p>
        )}

        <div className="p-4 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl text-center">
          <MathRenderer latex={problem.questionLatex} block className="text-lg font-semibold text-emerald-600 dark:text-emerald-400" />
        </div>

        {/* Interactive Graph / Visual Diagram Toggle */}
        {problem.graphType && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowGraph(!showGraph)}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 hover:underline"
            >
              <Layers className="w-3.5 h-3.5" />
              {showGraph ? 'إخفاء الرسم الهندسي التفاعلي' : 'عرض الرسم الهندسي ومستوي أرجاند التفاعلي'}
            </button>
            {showGraph && (
              <InteractiveGraph
                type={problem.graphType}
                data={problem.graphData}
                title={`التمثيل البياني: ${problem.title}`}
              />
            )}
          </div>
        )}
      </div>

      {/* Step-by-Step Interactive Workflow */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            خطوات الحل النموذجي المعتمد في الفحص الوزاري ({problem.steps.length} خطوات)
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            أكملت {Object.values(completedSteps).filter(Boolean).length} من {problem.steps.length}
          </span>
        </div>

        {problem.steps.map((step, idx) => {
          const isDone = !!completedSteps[idx];
          const isWhyOpen = !!expandedWhy[idx];

          return (
            <div
              key={idx}
              className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                isDone
                  ? 'bg-emerald-500/5 border-emerald-500/30 dark:bg-emerald-950/10'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Step Title Header */}
              <div className="p-4 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => toggleComplete(idx)}
                    className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition ${
                      isDone
                        ? 'bg-emerald-500 text-white'
                        : 'border-2 border-slate-300 dark:border-slate-600 text-transparent hover:border-emerald-500'
                    }`}
                    aria-label={`تحديد الخطوة ${step.stepNumber} كمكتملة`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                        الخطوة {step.stepNumber}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {step.explanation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Math Expression */}
              <div className="px-4 pb-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200/80 dark:border-slate-800 text-center overflow-x-auto">
                  <MathRenderer latex={step.latex} block className="text-base text-slate-800 dark:text-slate-200 font-medium" />
                </div>
              </div>

              {/* Ministerial Rule Hint & Warning Cards */}
              <div className="px-4 pb-3 space-y-2">
                {step.ruleHint && (
                  <div className="flex items-start gap-2 p-2.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 rounded-xl text-xs text-blue-800 dark:text-blue-300">
                    <Lightbulb className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">القاعدة الوزارية: </span>
                      <MathRenderer latex={step.ruleHint} />
                    </div>
                  </div>
                )}

                {step.warning && (
                  <div className="flex items-start gap-2 p-2.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 rounded-xl text-xs text-rose-800 dark:text-rose-300">
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">انتبه (خطأ شائع في الكنترول): </span>
                      {step.warning}
                    </div>
                  </div>
                )}

                {/* "Why?" Interactive Explanation Toggle */}
                <button
                  type="button"
                  onClick={() => toggleWhy(idx)}
                  className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-500 flex items-center gap-1 transition pt-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  {isWhyOpen ? 'إخفاء التفسير الرياضي التفصيلي' : 'لماذا قمنا بهذه الخطوة؟ (شرح معمق)'}
                  {isWhyOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {isWhyOpen && (
                  <div className="p-3 bg-slate-100/70 dark:bg-slate-800/50 rounded-xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-700">
                    في المنهج العراقي، يشترط مصحح الامتحان الوزاري تفصيل الخطوات وتوضيح الرموز الرياضية والقوانين الجانبية قبل التعويض المباشر، لضمان استحقاق الدرجة الفرعية الكاملة لكل خطوة.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Final Answer Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl p-5 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-white/20 text-white text-[11px] font-bold rounded-full">
                الناتج النهائي النموذجي
              </span>
              <span className="text-xs text-emerald-100 font-semibold">
                الدرجة الكاملة 10/10 ✓
              </span>
            </div>
            <div className="mt-2 text-xl font-bold font-mono" dir="ltr">
              <MathRenderer latex={problem.finalAnswer} className="text-white text-xl" />
            </div>
            {problem.tipsForMinisterialExam && (
              <p className="text-xs text-emerald-100/90 mt-2 max-w-lg leading-relaxed">
                💡 {problem.tipsForMinisterialExam}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleClaimMastery}
            className={`py-3 px-5 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg transition active:scale-95 shrink-0 ${
              isMasteredAwarded
                ? 'bg-white text-emerald-700'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            {isMasteredAwarded ? 'تم تأكيد الإتقان (+25 XP) ✓' : 'أتقنت هذا السؤال (+25 XP)'}
          </button>
        </div>
      </div>
    </div>
  );
};
