import React, { useState } from 'react';
import { SolvedProblem } from '../types.ts';
import { MINISTERIAL_PROBLEMS_BANK } from '../utils/mathSolver.ts';
import { MathRenderer } from './MathRenderer.tsx';
import {
  Search,
  BookOpen,
  Sparkles,
  Award,
  Filter,
  Camera,
  Layers,
  CheckCircle,
  PlusCircle,
  Send,
  Loader2,
} from 'lucide-react';

interface ProblemBrowserProps {
  currentProblem: SolvedProblem;
  onSelectProblem: (problem: SolvedProblem) => void;
  onOpenCamera: () => void;
  selectedTopicFilter?: string;
}

export const ProblemBrowser: React.FC<ProblemBrowserProps> = ({
  currentProblem,
  onSelectProblem,
  onOpenCamera,
  selectedTopicFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(selectedTopicFilter || 'all');
  const [customInput, setCustomInput] = useState('');
  const [isSolvingCustom, setIsSolvingCustom] = useState(false);

  const CHAPTER_FILTERS = [
    { id: 'all', label: 'كافة الفصول الوزارية' },
    { id: 'complex_numbers', label: '1. الأعداد المركبة' },
    { id: 'conic_sections', label: '2. القطوع المخروطية' },
    { id: 'differentiation', label: '3. تطبيقات التفاضل' },
    { id: 'integration', label: '4. التكامل وتطبيقاته' },
    { id: 'differential_equations', label: '5. المعادلات التفاضلية' },
  ];

  const filteredProblems = MINISTERIAL_PROBLEMS_BANK.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.title.includes(searchTerm) ||
      p.questionArabic.includes(searchTerm) ||
      (p.ministerialYear && p.ministerialYear.includes(searchTerm));
    return matchesCat && matchesSearch;
  });

  const handleCustomSolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim() || isSolvingCustom) return;

    setIsSolvingCustom(true);
    try {
      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemText: customInput,
          topic: selectedCategory !== 'all' ? selectedCategory : 'السادس الإعدادي العراقي',
        }),
      });

      const res = await response.json();
      if (res && res.data) {
        onSelectProblem({
          id: `custom-${Date.now()}`,
          title: res.data.title || 'مسألة خاصة بالمنهج العراقي',
          category: 'complex_numbers',
          categoryArabic: res.data.categoryArabic || 'الفصل الأول: الأعداد المركبة',
          ministerialYear: 'سؤال خاص مدخل من الطالب',
          branch: 'علمي',
          marks: 10,
          questionLatex: res.data.questionLatex || customInput,
          questionArabic: customInput,
          finalAnswer: res.data.finalAnswer || 'الناتج النهائي',
          steps: res.data.steps || [],
          graphType: 'argand',
          tipsForMinisterialExam: res.data.tipsForMinisterialExam,
        });
        setCustomInput('');
      }
    } catch (err) {
      console.error('Custom solve error:', err);
    } finally {
      setIsSolvingCustom(false);
    }
  };

  return (
    <div className="space-y-4 text-right">
      {/* Quick Custom Input Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            اكتب أي مسألة أو دالة رياضية لحلها فوراً بالخطوات الوزارية:
          </label>
          <button
            type="button"
            onClick={onOpenCamera}
            className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 hover:underline"
          >
            <Camera className="w-3.5 h-3.5" />
            تصوير مسألة بالكاميرا
          </button>
        </div>

        <form onSubmit={handleCustomSolve} className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="مثال: (1 - i)^10 أو x^2/16 - y^2/9 = 1 أو تكامل دالة..."
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 font-mono"
            dir="ltr"
          />
          <button
            type="submit"
            disabled={!customInput.trim() || isSolvingCustom}
            className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 transition disabled:opacity-50 active:scale-95 shadow-md shadow-emerald-500/20 shrink-0"
          >
            {isSolvingCustom ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري الحل...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 rotate-180" />
                <span>حل السؤال</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Chapters Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {CHAPTER_FILTERS.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition border ${
                isSelected
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Ministerial Problems List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 font-semibold">
          <span>الأسئلة الوزارية المتاحة ({filteredProblems.length})</span>
          <span>اختر مسألة لمشاهدة الخطوات والتمثيل البياني</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {filteredProblems.map((prob) => {
            const isCurrent = currentProblem.id === prob.id;

            return (
              <div
                key={prob.id}
                onClick={() => onSelectProblem(prob)}
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between gap-3 ${
                  isCurrent
                    ? 'bg-emerald-500/10 border-emerald-500 dark:bg-emerald-950/20 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {prob.title}
                    </span>
                    {prob.ministerialYear && (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-md">
                        {prob.ministerialYear}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400">
                      • {prob.branch} ({prob.marks} درجات)
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300 font-mono" dir="ltr">
                    <MathRenderer latex={prob.questionLatex} />
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {prob.graphType && (
                    <span
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      title="يحتوي على رسم هندسي تفاعلي"
                    >
                      <Layers className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <span
                    className={`text-xs px-2.5 py-1 rounded-xl font-bold transition ${
                      isCurrent
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {isCurrent ? 'قيد العرض' : 'عرض الحل'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
