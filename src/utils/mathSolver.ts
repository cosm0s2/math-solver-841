/**
 * NajahMath - Iraqi 6th Preparatory Mathematics Solver Engine
 * محرك حلول رياضيات السادس الإعدادي (العلمي والأدبي) - المنهج العراقي
 */

export interface MathStep {
  stepNumber: number;
  title: string;
  latex: string;
  explanation: string;
  ruleHint?: string; // القاعدة أو الملاحظة الوزارية
  warning?: string;  // خطأ شائع يقع فيه طلاب الوزاري
}

export interface SolvedProblem {
  id: string;
  title: string;
  category: 'complex_numbers' | 'conic_sections' | 'differentiation' | 'integration' | 'differential_equations' | 'solid_geometry';
  categoryArabic: string;
  ministerialYear?: string; // مثال: وزاري 2023 دور أول
  branch: 'علمي' | 'أدبي' | 'مشترك';
  questionLatex: string;
  questionArabic: string;
  finalAnswer: string;
  marks: number; // عادة 10 درجات في الامتحان الوزاري
  steps: MathStep[];
  graphType?: 'argand' | 'parabola' | 'ellipse' | 'hyperbola' | 'function_curve' | 'integral_area';
  graphData?: Record<string, any>;
}

export interface ComplexAnalysis {
  real: number;
  imag: number;
  modulus: number; // r = |z|
  referenceAngle: number; // زاوية الإسناد بالراديان
  referenceAngleFormatted: string; // e.g. "π/3"
  quadrant: 1 | 2 | 3 | 4 | 0; // 0 if on axis
  argument: number; // arg(z)
  argumentFormatted: string; // e.g. "2π/3"
  polarForm: string; // r(cos θ + i sin θ)
  deMoivrePower?: {
    n: number;
    result: string;
    steps: string[];
  };
}

export interface ConicAnalysis {
  type: 'parabola' | 'ellipse' | 'hyperbola';
  arabicName: string;
  standardEquation: string;
  axis: 'x' | 'y';
  a?: number;
  b?: number;
  c?: number;
  p?: number; // for parabola
  foci: string[];
  vertices: string[];
  directrixOrAsymptotes?: string[];
  eccentricity: number; // e
  eccentricityFormatted: string;
  notes: string[];
}

/**
 * Calculates exact polar form representation and De Moivre details for a+bi
 */
export function analyzeComplexNumber(a: number, b: number): ComplexAnalysis {
  const r = Math.hypot(a, b);
  const absA = Math.abs(a);
  const absB = Math.abs(b);

  // Determine reference angle (زاوية الإسناد)
  let refAngle = 0;
  let refStr = '0';

  if (absA === 0 && absB !== 0) {
    refAngle = Math.PI / 2;
    refStr = '\\frac{\\pi}{2}';
  } else if (absB === 0 && absA !== 0) {
    refAngle = 0;
    refStr = '0';
  } else {
    const ratio = absB / absA;
    if (Math.abs(ratio - 1) < 0.001) {
      refAngle = Math.PI / 4;
      refStr = '\\frac{\\pi}{4}';
    } else if (Math.abs(ratio - Math.sqrt(3)) < 0.001) {
      refAngle = Math.PI / 3;
      refStr = '\\frac{\\pi}{3}';
    } else if (Math.abs(ratio - (1 / Math.sqrt(3))) < 0.001) {
      refAngle = Math.PI / 6;
      refStr = '\\frac{\\pi}{6}';
    } else {
      refAngle = Math.atan(ratio);
      refStr = `${(refAngle / Math.PI).toFixed(2)}\\pi`;
    }
  }

  // Determine quadrant & principal argument (السعة الأساسية)
  let quadrant: 1 | 2 | 3 | 4 | 0 = 0;
  let theta = 0;
  let argStr = refStr;

  if (a > 0 && b >= 0) {
    quadrant = 1;
    theta = refAngle;
    argStr = refStr;
  } else if (a < 0 && b >= 0) {
    quadrant = 2;
    theta = Math.PI - refAngle;
    if (refStr === '\\frac{\\pi}{4}') argStr = '\\frac{3\\pi}{4}';
    else if (refStr === '\\frac{\\pi}{3}') argStr = '\\frac{2\\pi}{3}';
    else if (refStr === '\\frac{\\pi}{6}') argStr = '\\frac{5\\pi}{6}';
    else argStr = `\\pi - ${refStr}`;
  } else if (a < 0 && b < 0) {
    quadrant = 3;
    theta = Math.PI + refAngle;
    if (refStr === '\\frac{\\pi}{4}') argStr = '\\frac{5\\pi}{4}';
    else if (refStr === '\\frac{\\pi}{3}') argStr = '\\frac{4\\pi}{3}';
    else if (refStr === '\\frac{\\pi}{6}') argStr = '\\frac{7\\pi}{6}';
    else argStr = `\\pi + ${refStr}`;
  } else if (a > 0 && b < 0) {
    quadrant = 4;
    theta = 2 * Math.PI - refAngle;
    if (refStr === '\\frac{\\pi}{4}') argStr = '\\frac{7\\pi}{4}';
    else if (refStr === '\\frac{\\pi}{3}') argStr = '\\frac{5\\pi}{3}';
    else if (refStr === '\\frac{\\pi}{6}') argStr = '\\frac{11\\pi}{6}';
    else argStr = `2\\pi - ${refStr}`;
  } else if (a === 0) {
    if (b > 0) { theta = Math.PI / 2; argStr = '\\frac{\\pi}{2}'; }
    else if (b < 0) { theta = 3 * Math.PI / 2; argStr = '\\frac{3\\pi}{2}'; }
  } else if (b === 0) {
    if (a > 0) { theta = 0; argStr = '0'; }
    else { theta = Math.PI; argStr = '\\pi'; }
  }

  const rFormatted = Number.isInteger(r) ? `${r}` : `\\sqrt{${Math.round(a * a + b * b)}}`;
  const polarForm = `${rFormatted} \\left( \\cos(${argStr}) + i \\sin(${argStr}) \\right)`;

  return {
    real: a,
    imag: b,
    modulus: r,
    referenceAngle: refAngle,
    referenceAngleFormatted: refStr,
    quadrant,
    argument: theta,
    argumentFormatted: argStr,
    polarForm,
  };
}

/**
 * Solves standard conic section parameter calculations
 */
export function analyzeEllipse(a: number, b: number, axis: 'x' | 'y'): ConicAnalysis {
  if (a <= b) {
    const temp = a;
    a = b;
    b = temp;
  }
  const c2 = a * a - b * b;
  const c = Math.sqrt(c2);
  const e = c / a;

  const vertices = axis === 'x' 
    ? [`V_1(${a}, 0)`, `V_2(-${a}, 0)`] 
    : [`V_1(0, ${a})`, `V_2(0, -${a})`];
  
  const foci = axis === 'x'
    ? [`F_1(${c.toFixed(1)}, 0)`, `F_2(-${c.toFixed(1)}, 0)`]
    : [`F_1(0, ${c.toFixed(1)})`, `F_2(0, -${c.toFixed(1)})`];

  const standardEq = axis === 'x'
    ? `\\frac{x^2}{${a * a}} + \\frac{y^2}{${b * b}} = 1`
    : `\\frac{x^2}{${b * b}} + \\frac{y^2}{${a * a}} = 1`;

  return {
    type: 'ellipse',
    arabicName: 'قطع ناقص',
    standardEquation: standardEq,
    axis,
    a,
    b,
    c,
    vertices,
    foci,
    eccentricity: e,
    eccentricityFormatted: `${c.toFixed(2)} / ${a} \\approx ${e.toFixed(3)} < 1`,
    notes: [
      `طول المحور الكبير: 2a = ${2 * a}`,
      `طول المحور الصغير: 2b = ${2 * b}`,
      `المسافة بين البؤرتين: 2c = ${(2 * c).toFixed(2)}`,
      `العلاقة المساعدة (حلال المشاكل): a^2 = b^2 + c^2`,
    ],
  };
}

/**
 * Calculates student mastery score (0-100%) across 6 chapters
 */
export function calculateMastery(chapterProgress: Record<string, { solved: number; total: number; accuracy: number }>): {
  overallScore: number;
  ministerialReadiness: string;
  chapterScores: Record<string, number>;
} {
  const chapterKeys = Object.keys(chapterProgress);
  if (chapterKeys.length === 0) {
    return { overallScore: 0, ministerialReadiness: 'مبتدئ - ابدأ بحل الأسئلة الوزارية', chapterScores: {} };
  }

  const scores: Record<string, number> = {};
  let totalWeightedScore = 0;

  chapterKeys.forEach((key) => {
    const item = chapterProgress[key];
    const completionRatio = item.total > 0 ? Math.min(1, item.solved / item.total) : 0;
    // Score combines completion (60%) and accuracy (40%)
    const score = Math.round((completionRatio * 0.6 + (item.accuracy / 100) * 0.4) * 100);
    scores[key] = score;
    totalWeightedScore += score;
  });

  const overallScore = Math.round(totalWeightedScore / chapterKeys.length);

  let readiness = 'بحاجة لمزيد من التدريب المكثف';
  if (overallScore >= 90) readiness = 'ممتاز - مؤهل لدرجة 100 بالوزاري بإذن الله 🌟';
  else if (overallScore >= 75) readiness = 'جيد جداً - تمكن ممتاز من الأفكار الوزارية';
  else if (overallScore >= 60) readiness = 'متوسط - راجع القوانين والمسائل المربكة';

  return {
    overallScore,
    ministerialReadiness: readiness,
    chapterScores: scores,
  };
}

/**
 * Authentic Iraqi Ministerial Exam Curated Problem Bank
 * بنك الأسئلة الوزارية لسنوات 2020-2024 (الأدوار الأول والثاني والتمهيدي)
 */
export const MINISTERIAL_PROBLEMS_BANK: SolvedProblem[] = [
  {
    id: 'demoivre-2023-1',
    title: 'مبرهنة ديموافر - وزاري 2023 دور أول',
    category: 'complex_numbers',
    categoryArabic: 'الفصل الأول: الأعداد المركبة',
    ministerialYear: '2023 دور أول',
    branch: 'علمي',
    marks: 10,
    questionLatex: '\\text{احسب باستخدام مبرهنة ديموافر: } (1 - \\sqrt{3}i)^7',
    questionArabic: 'احسب باستخدام مبرهنة ديموافر المقدار (1 - √3 i)^7',
    finalAnswer: '64 - 64\\sqrt{3}i',
    graphType: 'argand',
    graphData: {
      initialPoint: { x: 1, y: -Math.sqrt(3), label: 'z = 1 - \\sqrt{3}i' },
      finalPoint: { x: 64, y: -64 * Math.sqrt(3), label: 'z^7' },
      r: 2,
      theta: '5\\pi/3',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'كتابة العدد بالصيغة العادية وتحديد الجزء الحقيقي والتخيلي',
        latex: 'z = 1 - \\sqrt{3}i \\implies x = 1, \\quad y = -\\sqrt{3}',
        explanation: 'نحدد إحداثيات العدد المركب لمعرفة موقعه في المستوي المركب (شكل أرجاند).',
        ruleHint: 'تأكد من إشارة الجزء التخيلي السالبة.',
      },
      {
        stepNumber: 2,
        title: 'إيجاد المقياس (r = |z|)',
        latex: 'r = \\sqrt{x^2 + y^2} = \\sqrt{(1)^2 + (-\\sqrt{3})^2} = \\sqrt{1 + 3} = \\sqrt{4} = 2',
        explanation: 'قانون المقياس يعطي بعد النقطة عن نقطة الأصل في مستوي أرجاند.',
        ruleHint: 'المقياس r دائماً قيمة حقيقية موجبة r > 0.',
      },
      {
        stepNumber: 3,
        title: 'إيجاد زاوية الإسناد والقيمة الأساسية للسعة (arg(z))',
        latex: '\\cos \\theta = \\frac{x}{r} = \\frac{1}{2}, \\quad \\sin \\theta = \\frac{y}{r} = \\frac{-\\sqrt{3}}{2}',
        explanation: 'زاوية الإسناد هي π/3. وبما أن cos موجباً و sin سالباً، فالنقطة تقع في الربع الرابع.',
        ruleHint: '\\text{في الربع الرابع: } \\theta = 2\\pi - \\frac{\\pi}{3} = \\frac{5\\pi}{3}',
        warning: 'احذر من نسيان تحديد الربع؛ كتابة زاوية الإسناد وحدها يخصم درجتين في الكنترول الوزاري!',
      },
      {
        stepNumber: 4,
        title: 'كتابة العدد بالصيغة القطبية',
        latex: 'z = 2 \\left( \\cos \\frac{5\\pi}{3} + i \\sin \\frac{5\\pi}{3} \\right)',
        explanation: 'الصيغة القطبية النموذجية للعدد المركب قبل تطبيق الأس.',
      },
      {
        stepNumber: 5,
        title: 'تطبيق مبرهنة ديموافر للأس 7',
        latex: 'z^7 = 2^7 \\left( \\cos \\frac{5\\pi}{3} + i \\sin \\frac{5\\pi}{3} \\right)^7 = 128 \\left( \\cos \\frac{35\\pi}{3} + i \\sin \\frac{35\\pi}{3} \\right)',
        explanation: 'نضرب الزاوية في الأس 7 ونرفع المقياس للقوة 7 (2^7 = 128).',
      },
      {
        stepNumber: 6,
        title: 'تبسيط الزاوية بالقياس الرئيسي وإيجاد الناتج النهائي',
        latex: '\\frac{35\\pi}{3} = 11\\pi + \\frac{2\\pi}{3} \\equiv \\pi + \\frac{2\\pi}{3} = \\frac{5\\pi}{3}',
        explanation: 'نطرح الدورات الزوجية (10π) لنحصل على القياس الرئيسي بين 0 و 2π.',
        ruleHint: '128 \\left( \\cos \\frac{5\\pi}{3} + i \\sin \\frac{5\\pi}{3} \\right) = 128 \\left( \\frac{1}{2} - \\frac{\\sqrt{3}}{2}i \\right) = 64 - 64\\sqrt{3}i',
      },
    ],
  },
  {
    id: 'ellipse-hyperbola-2022',
    title: 'ربط القطوع (ناقص وزائد) - وزاري 2022 دور ثانٍ',
    category: 'conic_sections',
    categoryArabic: 'الفصل الثاني: القطوع المخروطية',
    ministerialYear: '2022 دور ثانٍ',
    branch: 'علمي',
    marks: 10,
    questionLatex: '\\text{جد معادلة القطع الزائد الذي بؤرتاه هما بؤرتا القطع الناقص: } \\frac{x^2}{25} + \\frac{y^2}{9} = 1 \\text{ والمسافة بين بؤرتيه تساوي طول محوره المرافق.}',
    questionArabic: 'جد معادلة القطع الزائد الذي بؤرتاه هما بؤرتا القطع الناقص x²/25 + y²/9 = 1 والمسافة بين بؤرتيه ضعف طول محوره المرافق أو مساوية لمحوره المرافق.',
    finalAnswer: '\\frac{x^2}{12} - \\frac{y^2}{4} = 1',
    graphType: 'hyperbola',
    graphData: {
      a: Math.sqrt(12),
      b: 2,
      c: 4,
      foci: [{ x: 4, y: 0 }, { x: -4, y: 0 }],
    },
    steps: [
      {
        stepNumber: 1,
        title: 'استخراج بؤرتي القطع الناقص',
        latex: '\\frac{x^2}{25} + \\frac{y^2}{9} = 1 \\implies a_1^2 = 25, \\quad b_1^2 = 9',
        explanation: 'البؤرتان تقعان على محور السينات لأن المقام الأكبر تحت x^2.',
        ruleHint: 'c_1^2 = a_1^2 - b_1^2 = 25 - 9 = 16 \\implies c_1 = 4',
      },
      {
        stepNumber: 2,
        title: 'نقل البؤرتين إلى القطع الزائد',
        latex: 'F_{1,2}(\\pm 4, 0) \\implies c_2 = 4 \\implies c_2^2 = 16',
        explanation: 'بؤرتا القطع الناقص هما بؤرتا القطع الزائد، إذن بؤرتا الزائد تقعان على محور السينات.',
      },
      {
        stepNumber: 3,
        title: 'تطبيق شرط المحور المرافق',
        latex: '2c = 2(2b) \\text{ أو } 2b = c \\implies 2b = 4 \\implies b = 2 \\implies b^2 = 4',
        explanation: 'المسافة بين البؤرتين أو المحور المرافق يعطي قيمة b = 2.',
      },
      {
        stepNumber: 4,
        title: 'استخدام العلاقة الذهبية للقطع الزائد',
        latex: 'c^2 = a^2 + b^2 \\implies 16 = a^2 + 4 \\implies a^2 = 12',
        explanation: 'في القطع الزائد، c هو الأكبر دائماً و c² = a² + b².',
        warning: 'احذر الخلط بين العلاقة المساعدة للناقص (a² = b² + c²) والزائد (c² = a² + b²)!',
      },
      {
        stepNumber: 5,
        title: 'كتابة المعادلة القياسية للقطع الزائد',
        latex: '\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\implies \\frac{x^2}{12} - \\frac{y^2}{4} = 1',
        explanation: 'المعادلة على محور السينات ذات إشارة سالبة بين الحدين.',
      },
    ],
  },
  {
    id: 'integration-area-2023',
    title: 'حساب المساحة المحددة بمنحني دالة - وزاري 2023',
    category: 'integration',
    categoryArabic: 'الفصل الرابع: التكامل وتطبيقاته',
    ministerialYear: '2023 تمهيدي',
    branch: 'مشترك',
    marks: 10,
    questionLatex: '\\text{جد المساحة المحددة بمنحني الدالة } f(x) = x^3 - 4x \\text{ ومحور السينات.}',
    questionArabic: 'جد المساحة المحددة بمنحني الدالة f(x) = x³ - 4x ومحور السينات وعلى الفترة المغلقة الناتجة من التقاطع.',
    finalAnswer: 'A = 8 \\text{ وحدة مساحة مربعة}',
    graphType: 'integral_area',
    graphData: {
      roots: [-2, 0, 2],
      f: 'x^3 - 4x',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'إيجاد نقاط تقاطع المنحني مع محور السينات بجعل f(x) = 0',
        latex: 'x^3 - 4x = 0 \\implies x(x^2 - 4) = 0 \\implies x(x - 2)(x + 2) = 0',
        explanation: 'قيم x هي: x = 0، x = 2، x = -2. هذه القيم تقسم فترات التكامل.',
        ruleHint: 'الفترات الجزئية للتكامل هي: [-2, 0] و [0, 2].',
      },
      {
        stepNumber: 2,
        title: 'حساب التكامل الأول للفترة الأولى [-2, 0]',
        latex: 'A_1 = \\int_{-2}^{0} (x^3 - 4x) dx = \\left[ \\frac{x^4}{4} - 2x^2 \\right]_{-2}^{0}',
        explanation: 'نعوض الحد الأعلى (0) ناقص الحد الأدنى (-2).',
        ruleHint: 'A_1 = (0) - \\left( \\frac{(-2)^4}{4} - 2(-2)^2 \\right) = -(4 - 8) = 4',
      },
      {
        stepNumber: 3,
        title: 'حساب التكامل الثاني للفترة الثانية [0, 2]',
        latex: 'A_2 = \\int_{0}^{2} (x^3 - 4x) dx = \\left[ \\frac{x^4}{4} - 2x^2 \\right]_{0}^{2} = (4 - 8) - (0) = -4',
        explanation: 'الناتج سالب لأن المنحني تحت محور السينات في هذه الفترة، لذلك نأخذ القيمة المطلقة.',
      },
      {
        stepNumber: 4,
        title: 'جمع المساحات بالقيمة المطلقة',
        latex: 'A = |A_1| + |A_2| = |4| + |-4| = 4 + 4 = 8 \\text{ units}^2',
        explanation: 'المساحة دائماً كمية موجبة، لذلك نضع القيمة المطلقة لكل تكامل جزئي.',
        warning: 'عدم وضع القيمة المطلقة للتكامل السالب يؤدي إلى إلغاء المساحتين والحصول على صفر، وهي غلطة قاتلة بالوزاري!',
      },
    ],
  },
  {
    id: 'diff-rolle-2022',
    title: 'مبرهنة رول وإيجاد قيمة c - وزاري 2022',
    category: 'differentiation',
    categoryArabic: 'الفصل الثالث: تطبيقات التفاضل',
    ministerialYear: '2022 دور أول',
    branch: 'علمي',
    marks: 10,
    questionLatex: 'f(x) = (2 - x)^2, \\quad x \\in [0, 4] \\text{ بين هل تنطبق شروط مبرهنة رول؟ وجد قيمة } c',
    questionArabic: 'بين هل الدالة f(x) = (2 - x)² على الفترة [0, 4] تحقق شروط مبرهنة رول؟ وإن تحققت جد قيمة c الممكنة.',
    finalAnswer: 'c = 2 \\in (0, 4)',
    graphType: 'function_curve',
    steps: [
      {
        stepNumber: 1,
        title: 'الشرط الأول: الاستمرارية',
        latex: '\\text{الدالة مستمرة على الفترة المغلقة } [0, 4] \\text{ لأنها كثيرة حدود.}',
        explanation: 'جميع دوال كثيرات الحدود مستمرة على أي فترة مغلقة.',
      },
      {
        stepNumber: 2,
        title: 'الشرط الثاني: قابلية الاشتقاق',
        latex: '\\text{الدالة قابلة للاشتقاق على الفترة المفتوحة } (0, 4) \\text{ لأنها كثيرة حدود.}',
        explanation: 'دوال كثيرات الحدود قابلة للاشتقاق على أي فترة مفتوحة في R.',
      },
      {
        stepNumber: 3,
        title: 'الشرط الثالث: تساوي صورتي طرفي الفترة f(a) = f(b)',
        latex: 'f(0) = (2 - 0)^2 = 4, \\quad f(4) = (2 - 4)^2 = (-2)^2 = 4 \\implies f(0) = f(4) = 4',
        explanation: 'الشرط الثالث متحقق لتساوي صورتي البداية والنهاية.',
      },
      {
        stepNumber: 4,
        title: 'إيجاد المشتقة الأولى والتعويض بـ c وجعلها تساوي صفراً',
        latex: 'f\'(x) = 2(2 - x)(-1) = -2(2 - x) = -4 + 2x \\implies f\'(c) = -4 + 2c = 0',
        explanation: 'مشتقة القوس المرفوع لأس مضروباً في مشتقة ما بداخل القوس.',
        ruleHint: '2c = 4 \\implies c = 2',
      },
      {
        stepNumber: 5,
        title: 'التحقق من انتمائها للفترة المفتوحة',
        latex: 'c = 2 \\in (0, 4)',
        explanation: 'قيمة c تقع داخل الفترة المفتوحة (0, 4).',
      },
    ],
  },
  {
    id: 'diff-eq-separate-2023',
    title: 'حل معادلة تفاضلية بفصل المتغيرات - وزاري 2023',
    category: 'differential_equations',
    categoryArabic: 'الفصل الخامس: المعادلات التفاضلية',
    ministerialYear: '2023 دور أول',
    branch: 'علمي',
    marks: 10,
    questionLatex: '\\frac{dy}{dx} = \\frac{x + 1}{y - 1}, \\quad y > 1',
    questionArabic: 'حل المعادلة التفاضلية الآتية: dy/dx = (x + 1)/(y - 1) بفصل المتغيرات.',
    finalAnswer: '\\frac{(y - 1)^2}{2} = \\frac{x^2}{2} + x + C',
    steps: [
      {
        stepNumber: 1,
        title: 'فصل المتغيرات بضرب الطرفين في الوسطين',
        latex: '(y - 1) dy = (x + 1) dx',
        explanation: 'نجعل حدود y مع تفاضل dy في طرف، وحدود x مع dx في الطرف الآخر.',
      },
      {
        stepNumber: 2,
        title: 'إدخال رمز التكامل على الطرفين',
        latex: '\\int (y - 1) dy = \\int (x + 1) dx',
        explanation: 'نكامل كلاً من الطرفين تكاملاً غير محدد بالنسبة للمتغير المقابل.',
      },
      {
        stepNumber: 3,
        title: 'إجراء عملية التكامل وإضافة ثابت التكامل C',
        latex: '\\frac{y^2}{2} - y = \\frac{x^2}{2} + x + C',
        explanation: 'تكامل y هو y²/2، وتكامل الثابت 1 هو y، وتكامل x هو x²/2.',
        warning: 'لا تنسَ إضافة ثابت التكامل C مرة واحدة فقط في طرف المتغير المستقل x.',
      },
    ],
  },
];
