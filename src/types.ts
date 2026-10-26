export interface MathStep {
  stepNumber: number;
  title: string;
  latex: string;
  explanation: string;
  ruleHint?: string;
  warning?: string;
}

export interface SolvedProblem {
  id: string;
  title: string;
  category: 'complex_numbers' | 'conic_sections' | 'differentiation' | 'integration' | 'differential_equations' | 'solid_geometry';
  categoryArabic: string;
  ministerialYear?: string;
  branch: 'علمي' | 'أدبي' | 'مشترك';
  questionLatex: string;
  questionArabic: string;
  finalAnswer: string;
  marks: number;
  steps: MathStep[];
  graphType?: 'argand' | 'parabola' | 'ellipse' | 'hyperbola' | 'function_curve' | 'integral_area';
  graphData?: Record<string, any>;
  tipsForMinisterialExam?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  school: string;
  city: string;
  branch: 'السادس العلمي (أحيائي/تطبيقي سابقاً)' | 'السادس الأدبي';
  xp: number;
  streakDays: number;
  solvedCount: number;
  rank: number;
  badges: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'teacher';
  text: string;
  timestamp: string;
  latexFormula?: string;
  hasAudioVoiceNote?: boolean;
}

export interface ClassroomAssignment {
  id: string;
  title: string;
  dueDate: string;
  isCompleted: boolean;
  score: string | null;
}

export interface OfflineResource {
  id: string;
  title: string;
  size: string;
  cached: boolean;
  category: string;
  pages: number;
}
