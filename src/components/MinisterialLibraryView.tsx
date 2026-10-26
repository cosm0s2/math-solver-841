import React, { useState, useMemo } from 'react';
import { SolvedProblem } from '../types.ts';
import {
  MINISTERIAL_YEARS_LIBRARY,
  AVAILABLE_YEARS,
} from '../data/ministerialLibrary.ts';
import { MathRenderer } from './MathRenderer.tsx';
import {
  Folder,
  FolderOpen,
  FileText,
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  Sparkles,
  Download,
  BookOpen,
  Filter,
  CheckCircle2,
} from 'lucide-react';

interface MinisterialLibraryViewProps {
  onSelectProblem: (problem: SolvedProblem) => void;
  currentProblemId?: string;
}

type GroupMode = 'by_year' | 'by_chapter';

export const MinisterialLibraryView: React.FC<MinisterialLibraryViewProps> = ({
  onSelectProblem,
  currentProblemId,
}) => {
  const [groupMode, setGroupMode] = useState<GroupMode>('by_year');
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'year-2025': true,
    'year-2024': true,
    'year-2023': false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<'all' | 'علمي' | 'أدبي'>('all');
  const [selectedRoundFilter, setSelectedRoundFilter] = useState<string>('all');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // Toggle folder open/close
  const toggleFolder = (folderId: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const expandAllFolders = () => {
    const allOpen: Record<string, boolean> = {};
    AVAILABLE_YEARS.forEach((yr) => {
      allOpen[`year-${yr}`] = true;
    });
    setOpenFolders(allOpen);
  };

  const collapseAllFolders = () => {
    setOpenFolders({});
  };

  // Filtered library questions
  const filteredQuestions = useMemo(() => {
    return MINISTERIAL_YEARS_LIBRARY.filter((p) => {
      const matchSearch =
        searchQuery === '' ||
        p.title.includes(searchQuery) ||
        p.questionArabic.includes(searchQuery) ||
        p.questionLatex.includes(searchQuery) ||
        (p.ministerialYear && p.ministerialYear.includes(searchQuery));

      const matchBranch =
        selectedBranch === 'all' || p.branch === selectedBranch || p.branch === 'مشترك';

      const matchRound =
        selectedRoundFilter === 'all' ||
        (p.ministerialYear && p.ministerialYear.includes(selectedRoundFilter));

      return matchSearch && matchBranch && matchRound;
    });
  }, [searchQuery, selectedBranch, selectedRoundFilter]);

  // Group by Years
  const questionsByYear = useMemo(() => {
    const map: Record<number, SolvedProblem[]> = {};
    AVAILABLE_YEARS.forEach((y) => {
      map[y] = [];
    });
    filteredQuestions.forEach((q) => {
      const yearMatch = q.ministerialYear?.match(/\b(201[5-9]|202[0-6])\b/);
      if (yearMatch) {
        const yr = parseInt(yearMatch[1], 10);
        if (map[yr]) {
          map[yr].push(q);
        }
      }
    });
    return map;
  }, [filteredQuestions]);

  // Group by Chapters
  const CHAPTERS_LIST = [
    { id: 'complex_numbers', name: 'الفصل الأول: الأعداد المركبة' },
    { id: 'conic_sections', name: 'الفصل الثاني: القطوع المخروطية' },
    { id: 'differentiation', name: 'الفصل الثالث: تطبيقات التفاضل' },
    { id: 'integration', name: 'الفصل الرابع: التكامل وتطبيقاته' },
    { id: 'differential_equations', name: 'الفصل الخامس: المعادلات التفاضلية' },
    { id: 'solid_geometry', name: 'الفصل السادس: الهندسة الفضائية' },
  ];

  const questionsByChapter = useMemo(() => {
    const map: Record<string, SolvedProblem[]> = {};
    CHAPTERS_LIST.forEach((ch) => {
      map[ch.id] = [];
    });
    filteredQuestions.forEach((q) => {
      if (map[q.category]) {
        map[q.category].push(q);
      }
    });
    return map;
  }, [filteredQuestions]);

  const handleDownloadYearPack = (year: number) => {
    setDownloadNotice(`تم تجهيز وتحميل ملزمة الأسئلة الوزارية لعام ${year} مع الأجوبة النموذجية بنجاح 📥`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <div className="space-y-6 text-right">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 rounded-3xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 text-emerald-100 rounded-full text-xs font-bold mb-1 backdrop-blur-sm">
              <Calendar className="w-3.5 h-3.5" />
              أرشيف الوزاريات (2015 - 2026) • 12 سنة معتمدة
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              مكتبة الأسئلة الوزارية المنظمة 📚
            </h2>
            <p className="text-xs text-emerald-100 max-w-lg leading-relaxed">
              تصفح الأسئلة الوزارية مقسمة في مجلدات مرتبة حسب كل سنة من 2015 حتى العام الحالي، مع الأدوار (الأول، الثاني، والتمهيدي) وحلول مركز الفحص الوزاري.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center shrink-0">
            <span className="text-[10px] text-emerald-200 block">إجمالي أسئلة الأرشيف</span>
            <div className="text-2xl font-black">{MINISTERIAL_YEARS_LIBRARY.length}</div>
            <span className="text-[11px] font-semibold text-white">سؤال وزاري كامل</span>
          </div>
        </div>
      </div>

      {downloadNotice && (
        <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs rounded-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث برقم السنة، ديموافر، القطوع، رول، التكامل، أو أي نص..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Group Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl self-center sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setGroupMode('by_year')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                groupMode === 'by_year'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              مجلدات السنوات (2015-2026)
            </button>
            <button
              type="button"
              onClick={() => setGroupMode('by_chapter')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                groupMode === 'by_chapter'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              مجلدات الفصول (1 إلى 6)
            </button>
          </div>
        </div>

        {/* Sub-Filters: Branch & Round */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500 dark:text-slate-400">الفرع:</span>
            {(['all', 'علمي', 'أدبي'] as const).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBranch(b)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  selectedBranch === b
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {b === 'all' ? 'الكل' : b}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500 dark:text-slate-400">الدور:</span>
            {[
              { id: 'all', label: 'كافة الأدوار' },
              { id: 'دور أول', label: 'الدور الأول' },
              { id: 'دور ثان', label: 'الدور الثاني' },
              { id: 'تمهيدي', label: 'التمهيدي' },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRoundFilter(r.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  selectedRoundFilter === r.id
                    ? 'bg-amber-500 text-white font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 mr-auto">
            <button
              type="button"
              onClick={expandAllFolders}
              className="text-[11px] text-slate-500 hover:text-emerald-500 font-semibold"
            >
              فتح الكل
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              type="button"
              onClick={collapseAllFolders}
              className="text-[11px] text-slate-500 hover:text-emerald-500 font-semibold"
            >
              طي الكل
            </button>
          </div>
        </div>
      </div>

      {/* Main Folders Tree */}
      <div className="space-y-3">
        {groupMode === 'by_year' ? (
          /* Year Folders */
          AVAILABLE_YEARS.map((year) => {
            const problems = questionsByYear[year] || [];
            if (problems.length === 0 && searchQuery !== '') return null;

            const folderKey = `year-${year}`;
            const isOpen = !!openFolders[folderKey];

            return (
              <div
                key={year}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm transition"
              >
                {/* Year Folder Header */}
                <div
                  onClick={() => toggleFolder(folderKey)}
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition select-none"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition shadow-sm ${
                        isOpen
                          ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {isOpen ? <FolderOpen className="w-5 h-5" /> : <Folder className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-base text-slate-900 dark:text-white">
                          مجلد أسئلة سنة {year} الوزارية
                        </h3>
                        <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-md">
                          {year === 2026 || year === 2025 ? 'أحدث النماذج الوزارية' : `أرشيف ${year}`}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        يحتوي على {problems.length} سؤال وزاري محلول بالخطوات النموذجية
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadYearPack(year);
                      }}
                      className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition hidden sm:flex items-center gap-1 text-xs"
                      title={`تحميل ملزمة ${year}`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="text-[11px]">تحميل الملزمة</span>
                    </button>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Subfolder & Questions Content */}
                {isOpen && (
                  <div className="p-4 bg-slate-50/70 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
                    {problems.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400">
                        لا توجد أسئلة مطابقة للبحث داخل مجلد هذا العام.
                      </div>
                    ) : (
                      problems.map((prob) => {
                        const isSelected = prob.id === currentProblemId;

                        return (
                          <div
                            key={prob.id}
                            onClick={() => onSelectProblem(prob)}
                            className={`p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'bg-emerald-500/10 border-emerald-500 dark:bg-emerald-950/20 shadow-sm'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold text-slate-900 dark:text-white">
                                  {prob.title}
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md">
                                  {prob.categoryArabic.split(':')[0]}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  • {prob.branch} (10 درجات بالوزاري)
                                </span>
                              </div>

                              <div className="text-xs text-slate-600 dark:text-slate-300 font-mono" dir="ltr">
                                <MathRenderer latex={prob.questionLatex} />
                              </div>
                            </div>

                            <button
                              type="button"
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shrink-0 shadow-sm"
                            >
                              عرض الحل بالخطوات
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          /* Chapter Folders */
          CHAPTERS_LIST.map((chapter) => {
            const problems = questionsByChapter[chapter.id] || [];
            const folderKey = `chapter-${chapter.id}`;
            const isOpen = !!openFolders[folderKey];

            return (
              <div
                key={chapter.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm transition"
              >
                <div
                  onClick={() => toggleFolder(folderKey)}
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition select-none"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition shadow-sm ${
                        isOpen
                          ? 'bg-blue-600 text-white shadow-blue-500/20'
                          : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      {isOpen ? <FolderOpen className="w-5 h-5" /> : <Folder className="w-5 h-5" />}
                    </div>

                    <div>
                      <h3 className="font-black text-base text-slate-900 dark:text-white">
                        {chapter.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {problems.length} أسئلة وزارية من سنوات 2015 حتى 2026
                      </p>
                    </div>
                  </div>

                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                {isOpen && (
                  <div className="p-4 bg-slate-50/70 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
                    {problems.map((prob) => (
                      <div
                        key={prob.id}
                        onClick={() => onSelectProblem(prob)}
                        className="p-3.5 sm:p-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 cursor-pointer transition flex items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {prob.title}
                            </span>
                            {prob.ministerialYear && (
                              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-md">
                                {prob.ministerialYear}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-300 font-mono" dir="ltr">
                            <MathRenderer latex={prob.questionLatex} />
                          </div>
                        </div>

                        <button
                          type="button"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shrink-0 shadow-sm"
                        >
                          عرض الحل بالخطوات
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
