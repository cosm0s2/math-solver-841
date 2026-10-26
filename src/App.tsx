/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SolvedProblem, StudentProfile } from './types.ts';
import { MINISTERIAL_PROBLEMS_BANK } from './utils/mathSolver.ts';
import { HeaderNav } from './components/HeaderNav.tsx';
import { BottomNav, NavTab } from './components/BottomNav.tsx';
import { StepByStepSolver } from './components/StepByStepSolver.tsx';
import { ProblemBrowser } from './components/ProblemBrowser.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { LeaderboardView } from './components/LeaderboardView.tsx';
import { TeacherChatView } from './components/TeacherChatView.tsx';
import { MinisterialLibraryView } from './components/MinisterialLibraryView.tsx';
import { CameraSolverModal } from './components/CameraSolverModal.tsx';
import { ClassroomSyncModal } from './components/ClassroomSyncModal.tsx';
import { OpenSourceModal } from './components/OpenSourceModal.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { Smartphone, Sparkles, BookOpen, ChevronLeft } from 'lucide-react';

export default function App() {
  // Theme state: dark mode defaults to true for late-night study sessions
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('najah_dark_mode');
    return saved !== null ? saved === 'true' : true;
  });

  // Mobile Flutter Frame simulator toggle
  const [isMobileDeviceFrame, setIsMobileDeviceFrame] = useState<boolean>(false);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<NavTab>('solver');

  // Active selected problem
  const [currentProblem, setCurrentProblem] = useState<SolvedProblem>(MINISTERIAL_PROBLEMS_BANK[0]);

  // Selected topic filter for problem browser
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('all');

  // Student profile state
  const [profile, setProfile] = useState<StudentProfile>({
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
  });

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['demoivre-2023-1']);

  // Modals
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isClassroomOpen, setIsClassroomOpen] = useState<boolean>(false);
  const [isOpenSourceOpen, setIsOpenSourceOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Synchronize dark mode class to HTML document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('najah_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('najah_dark_mode', 'false');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleDeviceFrame = () => setIsMobileDeviceFrame((prev) => !prev);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleProblemMastered = () => {
    setProfile((prev) => ({
      ...prev,
      xp: prev.xp + 25,
      solvedCount: prev.solvedCount + 1,
    }));
  };

  const handleSelectTopicFromDashboard = (topicId: string) => {
    setSelectedTopicFilter(topicId);
    setActiveTab('solver');
  };

  const handleProblemSolvedFromCamera = (newProblem: SolvedProblem) => {
    setCurrentProblem(newProblem);
    setActiveTab('solver');
  };

  const handleSelectFromLibrary = (problem: SolvedProblem) => {
    setCurrentProblem(problem);
    setActiveTab('solver');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Main Tab Content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'library':
        return (
          <MinisterialLibraryView
            onSelectProblem={handleSelectFromLibrary}
            currentProblemId={currentProblem.id}
          />
        );
      case 'dashboard':
        return (
          <DashboardView
            profile={profile}
            onSelectTopic={handleSelectTopicFromDashboard}
            examDaysLeft={56}
          />
        );
      case 'leaderboard':
        return <LeaderboardView currentProfile={profile} />;
      case 'chat':
        return <TeacherChatView />;
      case 'solver':
      default:
        return (
          <div className="space-y-6">
            <ProblemBrowser
              currentProblem={currentProblem}
              onSelectProblem={setCurrentProblem}
              onOpenCamera={() => setIsCameraOpen(true)}
              selectedTopicFilter={selectedTopicFilter}
            />
            <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
              <StepByStepSolver
                problem={currentProblem}
                onMastered={handleProblemMastered}
                isBookmarked={bookmarkedIds.includes(currentProblem.id)}
                onToggleBookmark={() => handleToggleBookmark(currentProblem.id)}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navigation */}
      <HeaderNav
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        isMobileDeviceFrame={isMobileDeviceFrame}
        onToggleDeviceFrame={toggleDeviceFrame}
        currentProfile={profile}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCamera={() => setIsCameraOpen(true)}
        onOpenClassroom={() => setIsClassroomOpen(true)}
        onOpenOpenSource={() => setIsOpenSourceOpen(true)}
        onOpenLibrary={() => setActiveTab('library')}
        examDaysLeft={56}
      />

      {/* Main Body: Either Responsive Web View or Native Flutter Device Frame */}
      <main className="flex-1 pb-24 pt-4 px-3 sm:px-6 flex justify-center">
        {isMobileDeviceFrame ? (
          /* Mobile Flutter Device Frame Simulator */
          <div className="w-full max-w-[410px] my-4 rounded-[44px] p-3.5 bg-slate-800 shadow-2xl border-4 border-slate-700/80 relative">
            {/* Notch / Dynamic Island */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-950 rounded-full z-30 flex items-center justify-between px-3">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
            </div>

            {/* Simulated Mobile Status Bar */}
            <div className="h-6 flex items-center justify-between px-5 text-[11px] font-bold text-slate-400 select-none pt-1">
              <span>9:41</span>
              <div className="flex items-center gap-1.5" dir="ltr">
                <span className="text-[10px] text-slate-500">Zain IQ 5G</span>
                <span className="w-4 h-2 border border-slate-400 rounded-sm inline-block relative">
                  <span className="w-2.5 h-full bg-emerald-500 block"></span>
                </span>
              </div>
            </div>

            {/* Inner Phone Screen */}
            <div className="bg-slate-50 dark:bg-slate-950 rounded-[34px] overflow-y-auto max-h-[760px] p-3 pt-6 border border-slate-700/50">
              {renderTabContent()}
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="h-4 flex items-center justify-center pt-2">
              <div className="w-32 h-1 bg-slate-600 rounded-full"></div>
            </div>
          </div>
        ) : (
          /* Wide Screen Responsive Layout */
          <div className="w-full max-w-4xl mx-auto space-y-6">
            {renderTabContent()}
            <footer className="mt-10 mb-4 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 px-2">
              <span>تطبيق رياضيات الخوارزمي • منهج السادس الإعدادي (العلمي والأدبي)</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span>تصميم وتطوير المبرمج:</span>
                <strong className="text-slate-900 dark:text-white underline decoration-emerald-500 underline-offset-4">حيدر حسن</strong>
              </span>
            </footer>
          </div>
        )}
      </main>

      {/* Flutter-style Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenCamera={() => setIsCameraOpen(true)}
      />

      {/* Modals */}
      <CameraSolverModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onProblemSolved={handleProblemSolvedFromCamera}
      />

      <ClassroomSyncModal
        isOpen={isClassroomOpen}
        onClose={() => setIsClassroomOpen(false)}
        examDaysLeft={56}
      />

      <OpenSourceModal
        isOpen={isOpenSourceOpen}
        onClose={() => setIsOpenSourceOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentProfile={profile}
        onUpdateProfile={setProfile}
      />
    </div>
  );
}
