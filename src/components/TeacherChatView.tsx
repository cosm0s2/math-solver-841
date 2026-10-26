import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types.ts';
import { MathRenderer } from './MathRenderer.tsx';
import {
  Send,
  User,
  GraduationCap,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  HelpCircle,
  Hash,
} from 'lucide-react';

export const TeacherChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'teacher',
      text: 'أهلاً بك يا بطل! أنا الأستاذ حيدر، مدرس الرياضيات للسادس الإعدادي. كيف أساعدك اليوم في فهم أسئلة الوزاري ومبرهنات الكتاب؟',
      timestamp: 'الآن',
      hasAudioVoiceNote: true,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const QUICK_QUESTIONS = [
    'كيف أفرق بين a و c في القطوع المخروطية؟',
    'ما هي شروط مبرهنة رول الثلاثة وكيف أجد c؟',
    'كيف أحدد ربع زاوية الإسناد في ديموافر؟',
    'ما هي أكثر الأخطاء التي تضيع الدرجات في التكامل؟',
  ];

  const MATH_SYMBOLS = ['z', '\\theta', '\\pi', '\\int', '\\sqrt{x}', 'x^2', '\\Delta', '\\pm', '\\frac{dy}{dx}'];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'student',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({
            role: m.sender === 'teacher' ? 'teacher' : 'user',
            text: m.text,
          })),
        }),
      });

      const data = await res.json();
      const teacherReply: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: 'teacher',
        text: data.reply || 'إجابة ممتازة يا بطل، راجع القوانين والتمارين الوزارية بانتظام!',
        timestamp: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, teacherReply]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackReply: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        sender: 'teacher',
        text: 'يا بطل، تأكد دائماً في القطوع من كتابة العلاقة الذهبية ومطابقة موقع البؤر مع محور السينات أو الصادات قبل الحل.',
        timestamp: 'الآن',
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const insertSymbol = (sym: string) => {
    setInputText((prev) => `${prev} ${sym} `);
  };

  const toggleVoiceNote = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      // Simulate audio play for 4 seconds
      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 4000);
    }
  };

  return (
    <div className="flex flex-col h-[650px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
      {/* Teacher Profile Header */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">الأستاذ حيدر العراقي</h3>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md">
                مدرس رياضيات خبير
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">متصل الآن لمساعدة طلبة السادس الإعدادي</p>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleVoiceNote}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition ${
            isPlayingAudio
              ? 'bg-emerald-500 text-white border-emerald-500 animate-pulse'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
          aria-label="الاستماع للملاحظة الصوتية الوزارية"
        >
          {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlayingAudio ? 'جاري الاستماع...' : 'ملاحظة صوتية'}</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isTeacher = msg.sender === 'teacher';

          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-[85%] ${isTeacher ? 'self-start' : 'self-end mr-auto flex-row-reverse'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isTeacher
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                }`}
              >
                {isTeacher ? <GraduationCap className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isTeacher
                    ? 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 rounded-tr-none'
                    : 'bg-emerald-600 text-white rounded-tl-none font-medium'
                }`}
              >
                {/* Voice note indicator */}
                {msg.hasAudioVoiceNote && (
                  <div className="mb-2 p-2 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl flex items-center justify-between gap-3 border border-emerald-500/20">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                        ملاحظة صوتية وزارية: "نصيحة الأستاذ حيدر للامتحان" (0:18)
                      </span>
                    </div>
                  </div>
                )}

                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[10px] mt-1.5 text-right ${
                    isTeacher ? 'text-slate-400' : 'text-emerald-200'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-2.5 max-w-[80%] self-start">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 animate-bounce" />
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span>الأستاذ حيدر يكتب الإجابة النموذجية</span>
              <span className="animate-pulse">...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Chips */}
      <div className="p-2 bg-slate-50/70 dark:bg-slate-950/40 border-t border-slate-200/80 dark:border-slate-800 overflow-x-auto flex gap-1.5">
        {QUICK_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(q)}
            className="text-[11px] px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-700 whitespace-nowrap transition active:scale-95 shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Math Quick Symbols Bar */}
      <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1 overflow-x-auto text-xs">
        <span className="text-[10px] font-bold text-slate-400 pl-1 shrink-0">رموز:</span>
        {MATH_SYMBOLS.map((sym, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => insertSymbol(sym)}
            className="px-2 py-0.5 bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-200 font-mono transition text-xs shrink-0"
          >
            {sym}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="اسأل الأستاذ حيدر عن أي مسألة أو قانون بالرياضيات..."
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition disabled:opacity-40 active:scale-95 shadow-md shadow-emerald-500/20"
          aria-label="إرسال الرسالة للأستاذ"
        >
          <Send className="w-4 h-4 rotate-180" />
        </button>
      </form>
    </div>
  );
};
