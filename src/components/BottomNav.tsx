import React from 'react';
import {
  Sparkles,
  Camera,
  BarChart3,
  Trophy,
  MessageSquare,
  FolderOpen,
} from 'lucide-react';

export type NavTab = 'solver' | 'library' | 'camera' | 'dashboard' | 'leaderboard' | 'chat';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenCamera: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenCamera,
}) => {
  const tabs = [
    { id: 'solver' as NavTab, label: 'الحلول', icon: Sparkles },
    { id: 'library' as NavTab, label: 'الوزاريات 2015-2026', icon: FolderOpen },
    { id: 'camera' as NavTab, label: 'الكاميرا', icon: Camera, isCenterFab: true },
    { id: 'dashboard' as NavTab, label: 'الإتقان', icon: BarChart3 },
    { id: 'chat' as NavTab, label: 'الأستاذ', icon: MessageSquare },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around relative">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          if (tab.isCenterFab) {
            return (
              <button
                key={tab.id}
                type="button"
                onClick={onOpenCamera}
                className="relative -top-4 w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex flex-col items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition"
                aria-label="التقاط مسألة بالكاميرا"
              >
                <Camera className="w-6 h-6" />
                <span className="text-[9px] font-black mt-0.5">كاميرا</span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex-1 py-1 flex flex-col items-center justify-center gap-1 transition ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                )}
              </div>
              <span className="text-[11px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
