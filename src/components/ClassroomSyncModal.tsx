import React, { useState } from 'react';
import {
  X,
  Bell,
  CheckCircle2,
  Calendar,
  Download,
  FileText,
  WifiOff,
  RefreshCw,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ClassroomAssignment, OfflineResource } from '../types.ts';

interface ClassroomSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  examDaysLeft?: number;
}

export const ClassroomSyncModal: React.FC<ClassroomSyncModalProps> = ({
  isOpen,
  onClose,
  examDaysLeft = 56,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationStatusMsg, setNotificationStatusMsg] = useState<string | null>(null);
  const [downloadedResources, setDownloadedResources] = useState<Record<string, boolean>>({
    'mat-1': true,
    'mat-2': true,
    'mat-3': false,
  });

  const ASSIGNMENTS: ClassroomAssignment[] = [
    {
      id: 'asg-1',
      title: 'واجب ديموافر: إيجاد الجذور التكعيبية للعدد 8i باستخدام النتيجة',
      dueDate: 'غداً، الساعة 10:00 مساءً',
      isCompleted: true,
      score: '10/10',
    },
    {
      id: 'asg-2',
      title: 'اختبار إلكتروني: ربط القطع الناقص والزائد المشترك (وزاري)',
      dueDate: 'الخميس، 29 أيار',
      isCompleted: false,
      score: null,
    },
    {
      id: 'asg-3',
      title: 'تطبيق عملي: حساب المساحة تحت منحني الدالة f(x) = x³ - 4x',
      dueDate: 'الأحد القادم',
      isCompleted: false,
      score: null,
    },
  ];

  const OFFLINE_RESOURCES: OfflineResource[] = [
    {
      id: 'mat-1',
      title: 'ملزمة القوانين الذهبية للقطوع المخروطية (نسخة أوفلاين)',
      category: 'الفصل الثاني',
      size: '2.4 MB',
      pages: 18,
      cached: true,
    },
    {
      id: 'mat-2',
      title: 'جدول زوايا الإسناد والصيغة القطبية وديموافر (PDF)',
      category: 'الفصل الأول',
      size: '1.2 MB',
      pages: 8,
      cached: true,
    },
    {
      id: 'mat-3',
      title: 'حقيبة المبرهنات الوزارية في الهندسة الفضائية 7، 8، 9',
      category: 'الفصل السادس',
      size: '3.6 MB',
      pages: 24,
      cached: false,
    },
  ];

  const handleToggleNotifications = async () => {
    if (!notificationsEnabled) {
      if ('Notification' in window) {
        const perm = await Notification.requestPermission();
        if (perm === 'granted') {
          setNotificationsEnabled(true);
          setNotificationStatusMsg('تم تفعيل إشعارات التذكير اليومية للامتحان الوزاري والواجبات!');
        } else {
          setNotificationStatusMsg('يرجى السماح بالإشعارات من إعدادات المتصفح.');
        }
      } else {
        setNotificationsEnabled(true);
        setNotificationStatusMsg('الإشعارات مفعلة عبر التطبيق!');
      }
    } else {
      setNotificationsEnabled(false);
      setNotificationStatusMsg('تم إيقاف الإشعارات مؤقتاً.');
    }
    setTimeout(() => setNotificationStatusMsg(null), 3500);
  };

  const handleTestNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('تطبيق رياضيات الخوارزمي - تصميم حيدر حسن', {
        body: 'يا بطل: تبقى 56 يوماً على الامتحان الوزاري الدور الأول! حان وقت حل سؤال وزاري اليوم.',
        icon: '/favicon.ico',
      });
    }
    setNotificationStatusMsg('تم إرسال تنبيه تجريبي: "اقترب موعد تسليم واجب ديموافر" 🔔');
    setTimeout(() => setNotificationStatusMsg(null), 3500);
  };

  const toggleDownload = (id: string) => {
    setDownloadedResources((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                تزامن Google Classroom والوصول دون إنترنت
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                مزامنة الواجبات المدرسية والملازم المحفوظة بالهاتف
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full transition"
            aria-label="إغلاق نافذة التزامن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-5 text-right">
          {/* Notification feedback toast */}
          {notificationStatusMsg && (
            <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs rounded-xl flex items-center gap-2 animate-bounce">
              <Sparkles className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{notificationStatusMsg}</span>
            </div>
          )}

          {/* Connected Classroom Bar */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 rounded-2xl flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-xs text-blue-900 dark:text-blue-200">
                  متصل بـ Google Classroom: رياضيات السادس العلمي
                </span>
              </div>
              <p className="text-[11px] text-blue-700/80 dark:text-blue-300/80 mt-0.5">
                حساب الطالب: student.iraq@gmail.com • المدرس: أ. حيدر
              </p>
            </div>
            <button
              type="button"
              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-xl transition"
              title="مزامنة الواجبات"
              aria-label="تحديث المزامنة"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Push Notification Controls */}
          <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-amber-500" />
                  نظام التنبيهات الذكي للواجبات والامتحان الوزاري
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  تذكير بمواعيد تسليم الواجبات والعد التنازلي للدور الأول ({examDaysLeft} يوماً)
                </p>
              </div>

              <button
                type="button"
                onClick={handleToggleNotifications}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  notificationsEnabled
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {notificationsEnabled ? 'مفعّلة ✓' : 'معطّلة'}
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleTestNotification}
                className="py-2 px-3 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-semibold hover:border-emerald-500 transition active:scale-95 flex items-center gap-1.5"
              >
                <Bell className="w-3.5 h-3.5 text-emerald-500" />
                إرسال تنبيه تجريبي لهاتفي الآن
              </button>
            </div>
          </div>

          {/* Assignments List */}
          <div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-500" />
              الواجبات المتزامنة من Google Classroom
            </h4>
            <div className="space-y-2">
              {ASSIGNMENTS.map((asg) => (
                <div
                  key={asg.id}
                  className="p-3 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl flex items-center justify-between gap-3 text-right"
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-xs ${
                        asg.isCompleted
                          ? 'bg-emerald-500 text-white'
                          : 'border border-slate-300 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-white">
                        {asg.title}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        موعد التسليم: {asg.dueDate}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      asg.isCompleted
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {asg.isCompleted ? `تم التسليم (${asg.score})` : 'متبقي'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Offline Access to Materials */}
          <div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
              <WifiOff className="w-4 h-4 text-emerald-500" />
              الملازم والمواد المحفوظة للعمل دون إنترنت (Offline)
            </h4>
            <div className="space-y-2">
              {OFFLINE_RESOURCES.map((mat) => {
                const isDownloaded = !!downloadedResources[mat.id];

                return (
                  <div
                    key={mat.id}
                    className="p-3 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 dark:text-white">
                          {mat.title}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          {mat.category} • {mat.size} • {mat.pages} صفحة
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleDownload(mat.id)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition ${
                        isDownloaded
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-emerald-500 hover:text-white'
                      }`}
                    >
                      {isDownloaded ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          محفوظ أوفلاين
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          تحميل
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
