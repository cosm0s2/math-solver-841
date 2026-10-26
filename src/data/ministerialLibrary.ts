/**
 * NajahMath / رياضيات الخوارزمي - مكتبة الأسئلة الوزارية الشاملة (2015 - 2026)
 * تصميم وتطوير: حيدر حسن
 * المنهج العراقي - السادس الإعدادي (العلمي والأدبي)
 */

import { SolvedProblem } from '../types.ts';

export interface MinisterialExamFolder {
  year: number;
  yearArabic: string;
  rounds: {
    roundId: string;
    roundName: string;
    branch: 'علمي' | 'أدبي' | 'مشترك';
    problemsCount: number;
    problems: SolvedProblem[];
  }[];
}

export const MINISTERIAL_YEARS_LIBRARY: SolvedProblem[] = [
  // ------------------ 2026 (التمهيدي والنموذجي) ------------------
  {
    id: 'min-2026-1',
    title: 'وزاري 2026 تمهيدي: حل المعادلة التفاضلية بطريقة فصل المتغيرات',
    category: 'differential_equations',
    categoryArabic: 'الفصل الخامس: المعادلات التفاضلية',
    ministerialYear: '2026 تمهيدي',
    branch: 'علمي',
    marks: 10,
    questionLatex: '\\frac{dy}{dx} = \\frac{x + 1}{y}, \\quad y(0) = 2',
    questionArabic: 'حل المعادلة التفاضلية الآتية بطريقة فصل المتغيرات: dy/dx = (x + 1)/y مع إيجاد الحل الخاص عند y(0) = 2.',
    finalAnswer: 'y^2 = x^2 + 2x + 4',
    steps: [
      {
        stepNumber: 1,
        title: 'فصل المتغيرات بضرب الطرفين في y dx',
        latex: 'y \\, dy = (x + 1) \\, dx',
        explanation: 'تم عزل حدود y مع dy في الطرف الأيسر وحدود x مع dx في الطرف الأيمن.',
      },
      {
        stepNumber: 2,
        title: 'مكاملة الطرفين لإيجاد الحل العام',
        latex: '\\int y \\, dy = \\int (x + 1) \\, dx \\implies \\frac{y^2}{2} = \\frac{x^2}{2} + x + C',
        explanation: 'إضافة ثابت التكامل C في طرف المتغير المستقل.',
      },
      {
        stepNumber: 3,
        title: 'التعويض بالشروط الابتدائية لاستخراج الثابت C وكتابة الحل الخاص',
        latex: 'x = 0, y = 2 \\implies \\frac{4}{2} = 0 + 0 + C \\implies C = 2 \\implies y^2 = x^2 + 2x + 4',
        explanation: 'نضرب المعادلة في 2 ونحصل على الحل الخاص المعتمد وزارياً.',
      },
    ],
  },
  {
    id: 'min-2026-2',
    title: 'وزاري 2026 تمهيدي: تكامل الدوال المثلثية والمربعات الكاملة',
    category: 'integration',
    categoryArabic: 'الفصل الرابع: التكامل وتطبيقاته',
    ministerialYear: '2026 تمهيدي',
    branch: 'مشترك',
    marks: 10,
    questionLatex: '\\int \\sin^4(x) \\, dx',
    questionArabic: 'احسب قيمة التكامل غير المحدد: ∫ sin⁴(x) dx باستخدام متطابقات تقليص القوى المثلثية.',
    finalAnswer: '\\frac{3}{8}x - \\frac{1}{4}\\sin(2x) + \\frac{1}{32}\\sin(4x) + C',
    steps: [
      {
        stepNumber: 1,
        title: 'تحويل القوة الرابعة إلى مربع تربيع مع متطابقة نصف الزاوية',
        latex: '\\sin^4(x) = [\\sin^2(x)]^2 = \\left( \\frac{1 - \\cos(2x)}{2} \\right)^2 = \\frac{1}{4}(1 - 2\\cos(2x) + \\cos^2(2x))',
        explanation: 'استخدام متطابقة sin²(x) = (1 - cos(2x))/2.',
      },
      {
        stepNumber: 2,
        title: 'تبسيط cos²(2x) مرة أخرى بنصف الزاوية وتوزيع التكامل',
        latex: '\\cos^2(2x) = \\frac{1 + \\cos(4x)}{2} \\implies \\frac{1}{4} \\int \\left( 1 - 2\\cos(2x) + \\frac{1}{2} + \\frac{1}{2}\\cos(4x) \\right) dx',
        explanation: 'تجميع الحدود الثابتة: 1 + 1/2 = 3/2.',
      },
      {
        stepNumber: 3,
        title: 'المكاملة المباشرة وضرب المعامل 1/4',
        latex: '\\frac{1}{4} \\left[ \\frac{3}{2}x - \\sin(2x) + \\frac{1}{8}\\sin(4x) \\right] + C = \\frac{3}{8}x - \\frac{1}{4}\\sin(2x) + \\frac{1}{32}\\sin(4x) + C',
        explanation: 'الحل النموذجي المعتمد لوزارة التربية العراقية مع الثابت C.',
      },
    ],
  },
  // ------------------ 2025 ------------------
  {
    id: 'min-2025-1',
    title: 'وزاري 2025 تمهيدي: نتيجة مبرهنة ديموافر للجذور التكعيبية',
    category: 'complex_numbers',
    categoryArabic: 'الفصل الأول: الأعداد المركبة',
    ministerialYear: '2025 تمهيدي',
    branch: 'علمي',
    marks: 10,
    questionLatex: '\\text{جد الجذور التكعيبية للعدد المركب } z = -27i \\text{ باستخدام نتيجة مبرهنة ديموافر.}',
    questionArabic: 'جد الجذور التكعيبية للعدد المركب z = -27i باستخدام نتيجة مبرهنة ديموافر.',
    finalAnswer: 'w_0 = 3(\\frac{\\sqrt{3}}{2} - \\frac{1}{2}i), \\quad w_1 = 3i, \\quad w_2 = 3(-\\frac{\\sqrt{3}}{2} - \\frac{1}{2}i)',
    graphType: 'argand',
    steps: [
      {
        stepNumber: 1,
        title: 'كتابة العدد بالصيغة القطبية المباشرة',
        latex: 'z = 27(-i) = 27\\left(\\cos \\frac{3\\pi}{2} + i\\sin \\frac{3\\pi}{2}\\right)',
        explanation: 'العدد يقع على الجزء السالب لمحور الصادات، إذن مقياسه r = 27 وزاويته 3π/2.',
        ruleHint: '-i = \\cos\\frac{3\\pi}{2} + i\\sin\\frac{3\\pi}{2}',
      },
      {
        stepNumber: 2,
        title: 'تطبيق قانون نتيجة مبرهنة ديموافر للجذور التكعيبية (n = 3)',
        latex: 'z^{\\frac{1}{3}} = (27)^{\\frac{1}{3}} \\left( \\cos \\frac{\\frac{3\\pi}{2} + 2k\\pi}{3} + i \\sin \\frac{\\frac{3\\pi}{2} + 2k\\pi}{3} \\right), \\quad k = 0, 1, 2',
        explanation: 'نعوض قيم k = 0, 1, 2 للحصول على الجذور الثلاثة.',
      },
      {
        stepNumber: 3,
        title: 'التعويض عند k = 0 (الجذر الأول)',
        latex: 'k = 0 \\implies w_0 = 3 \\left(\\cos \\frac{\\pi}{2} + i \\sin \\frac{\\pi}{2}\\right) = 3(0 + i) = 3i',
        explanation: 'الزاوية (3π/2)/3 = π/2.',
      },
      {
        stepNumber: 4,
        title: 'التعويض عند k = 1 و k = 2 (الجذران الثاني والثالث)',
        latex: 'k = 1 \\implies w_1 = 3 \\left(\\cos \\frac{7\\pi}{6} + i\\sin \\frac{7\\pi}{6}\\right) = 3\\left(-\\frac{\\sqrt{3}}{2} - \\frac{1}{2}i\\right)',
        explanation: 'في الربع الثالث الكوساين والساين سالبان.',
        warning: 'احذر من نسيان حساب الجذور الثلاثة بالكامل وتوزيع معامل المقياس 3.',
      },
    ],
  },
  {
    id: 'min-2025-2',
    title: 'وزاري 2025: ربط القطع المكافئ بالقطع الناقص',
    category: 'conic_sections',
    categoryArabic: 'الفصل الثاني: القطوع المخروطية',
    ministerialYear: '2025 دور أول متوقع',
    branch: 'علمي',
    marks: 10,
    questionLatex: 'y^2 + 16x = 0 \\text{ بؤرته إحدى بؤرتي الناقص، وطول محوره الصغير } 8',
    questionArabic: 'قطع ناقص بؤرتاه هما بؤرة القطع المكافئ y² + 16x = 0 ونقطة الأصل مركزه، وطول محوره الصغير 8 وحدات. جد معادلته.',
    finalAnswer: '\\frac{x^2}{32} + \\frac{y^2}{16} = 1',
    graphType: 'ellipse',
    steps: [
      {
        stepNumber: 1,
        title: 'استخراج بؤرة القطع المكافئ بالمقارنة بالمعادلة القياسية',
        latex: 'y^2 = -16x \\iff y^2 = -4px \\implies 4p = 16 \\implies p = 4',
        explanation: 'بؤرة المكافئ تقع على محور السينات السالب F(-4, 0).',
      },
      {
        stepNumber: 2,
        title: 'تعيين بؤرتي وقيمة c للقطع الناقص',
        latex: 'F_1(4, 0), \\quad F_2(-4, 0) \\implies c = 4 \\implies c^2 = 16',
        explanation: 'البؤرتان تقعان على محور السينات.',
      },
      {
        stepNumber: 3,
        title: 'إيجاد قيمة b من طول المحور الصغير',
        latex: '2b = 8 \\implies b = 4 \\implies b^2 = 16',
        explanation: 'طول المحور الصغير هو 2b.',
      },
      {
        stepNumber: 4,
        title: 'العلاقة الذهبية للقطع الناقص وكتابة المعادلة',
        latex: 'a^2 = b^2 + c^2 = 16 + 16 = 32 \\implies \\frac{x^2}{32} + \\frac{y^2}{16} = 1',
        explanation: 'المقام الأكبر تحت x² لأن البؤرتين على محور السينات.',
      },
    ],
  },

  // ------------------ 2024 ------------------
  {
    id: 'min-2024-1',
    title: 'وزاري 2024 دور أول: إيجاد قيمتي x, y الحقيقيتين',
    category: 'complex_numbers',
    categoryArabic: 'الفصل الأول: الأعداد المركبة',
    ministerialYear: '2024 دور أول',
    branch: 'علمي',
    marks: 10,
    questionLatex: '\\frac{3 + i}{1 - i} x + \\frac{2 - i}{2 + i} y = \\frac{1}{i}',
    questionArabic: 'جد قيمتي x, y الحقيقيتين اللتين تحققان المعادلة: ((3+i)/(1-i))x + ((2-i)/(2+i))y = 1/i',
    finalAnswer: 'x = 1, \\quad y = -3',
    steps: [
      {
        stepNumber: 1,
        title: 'تبسيط الكسور بالضرب في مرافق المقام',
        latex: '\\frac{3+i}{1-i} \\cdot \\frac{1+i}{1+i} = \\frac{2 + 4i}{2} = 1 + 2i',
        explanation: 'مرافق (1 - i) هو (1 + i).',
      },
      {
        stepNumber: 2,
        title: 'تبسيط الكسر الثاني والطرف الأيمن',
        latex: '\\frac{2-i}{2+i} \\cdot \\frac{2-i}{2-i} = \\frac{3-4i}{5}, \\quad \\frac{1}{i} = -i',
        explanation: '1/i = i^(-1) = -i.',
      },
      {
        stepNumber: 3,
        title: 'مساواة الجزء الحقيقي بالحقيقي والتخيلي بالتخيلي',
        latex: '\\text{الحقيقي: } x + \\frac{3}{5}y = 0, \\quad \\text{التخيلي: } 2x - \\frac{4}{5}y = -1',
        explanation: 'نحل المعادلتين آنياً بالتعويض أو الحذف لنحصل على x = 1, y = -3.',
        warning: 'احذر من الإشارات السالبة عند الضرب بمرافق المقام.',
      },
    ],
  },
  {
    id: 'min-2024-2',
    title: 'وزاري 2024 دور ثانٍ: النهايات العظمى والصغرى ونقاط الانقلاب',
    category: 'differentiation',
    categoryArabic: 'الفصل الثالث: تطبيقات التفاضل',
    ministerialYear: '2024 دور ثانٍ',
    branch: 'مشترك',
    marks: 10,
    questionLatex: 'f(x) = 2x^3 - 3x^2 - 12x + 1 \\text{ جد مناطق التزايد والتناقص والنقاط الحرجة}',
    questionArabic: 'جد مناطق التزايد والتناقص ونقاط النهايات العظمى والصغرى المحلية للدالة f(x) = 2x³ - 3x² - 12x + 1.',
    finalAnswer: '(-1, 8) \\text{ نهاية عظمى محلية}, \\quad (2, -19) \\text{ نهاية صغرى محلية}',
    graphType: 'function_curve',
    steps: [
      {
        stepNumber: 1,
        title: 'إيجاد المشتقة الأولى للدالة ومساواتها بالصفر',
        latex: 'f\'(x) = 6x^2 - 6x - 12 = 0 \\implies 6(x^2 - x - 2) = 0 \\implies (x - 2)(x + 1) = 0',
        explanation: 'قيم x الحرجة هي x = 2 و x = -1.',
      },
      {
        stepNumber: 2,
        title: 'اختبار إشارة المشتقة الأولى على خط الأعداد',
        latex: 'x < -1 \\implies f\'(x) > 0 \\text{ (تزايد)}, \\quad -1 < x < 2 \\implies f\'(x) < 0 \\text{ (تناقص)}, \\quad x > 2 \\implies f\'(x) > 0 \\text{ (تزايد)}',
        explanation: 'من تزايد إلى تناقص عند x = -1 (نهاية عظمى)، ومن تناقص إلى تزايد عند x = 2 (نهاية صغرى).',
      },
      {
        stepNumber: 3,
        title: 'إيجاد الصور بالتعويض في الدالة الأصلية f(x)',
        latex: 'f(-1) = 2(-1)^3 - 3(-1)^2 - 12(-1) + 1 = 8, \\quad f(2) = 2(8) - 3(4) - 12(2) + 1 = -19',
        explanation: 'النقاط الحرجة هي (-1, 8) و (2, -19).',
      },
    ],
  },

  // ------------------ 2023 ------------------
  {
    id: 'min-2023-1',
    title: 'وزاري 2023 دور أول: مبرهنة ديموافر للأس 7',
    category: 'complex_numbers',
    categoryArabic: 'الفصل الأول: الأعداد المركبة',
    ministerialYear: '2023 دور أول',
    branch: 'علمي',
    marks: 10,
    questionLatex: '(1 - \\sqrt{3}i)^7 \\text{ باستخدام مبرهنة ديموافر}',
    questionArabic: 'احسب باستخدام مبرهنة ديموافر المقدار (1 - √3 i)^7.',
    finalAnswer: '64 - 64\\sqrt{3}i',
    graphType: 'argand',
    steps: [
      {
        stepNumber: 1,
        title: 'حساب المقياس r',
        latex: 'r = \\sqrt{(1)^2 + (-\\sqrt{3})^2} = 2',
        explanation: 'المقياس هو طول المتجه في مستوي أرجاند.',
      },
      {
        stepNumber: 2,
        title: 'تحديد السعة الأساسية θ في الربع الرابع',
        latex: '\\theta = 2\\pi - \\frac{\\pi}{3} = \\frac{5\\pi}{3}',
        explanation: 'لأن cos موجب و sin سالب فالزاوية بالربع الرابع.',
      },
      {
        stepNumber: 3,
        title: 'تطبيق مبرهنة ديموافر',
        latex: 'z^7 = 2^7 \\left(\\cos \\frac{35\\pi}{3} + i\\sin \\frac{35\\pi}{3}\\right) = 128 \\left(\\frac{1}{2} - \\frac{\\sqrt{3}}{2}i\\right) = 64 - 64\\sqrt{3}i',
        explanation: 'نطرح الدورات الزوجية (10π) لنحصل على 5π/3.',
      },
    ],
  },
  {
    id: 'min-2023-2',
    title: 'وزاري 2023 تمهيدي: المساحة المحددة بين المنحني ومحور السينات',
    category: 'integration',
    categoryArabic: 'الفصل الرابع: التكامل وتطبيقاته',
    ministerialYear: '2023 تمهيدي',
    branch: 'مشترك',
    marks: 10,
    questionLatex: 'f(x) = x^3 - 4x \\text{ ومحور السينات}',
    questionArabic: 'جد المساحة المحددة بمنحني الدالة f(x) = x³ - 4x ومحور السينات.',
    finalAnswer: 'A = 8 \\text{ وحدة مساحة}',
    graphType: 'integral_area',
    steps: [
      {
        stepNumber: 1,
        title: 'إيجاد فترات التكامل بجعل f(x) = 0',
        latex: 'x(x - 2)(x + 2) = 0 \\implies x = -2, \\; 0, \\; 2',
        explanation: 'فترات التكامل الجزئية: [-2, 0] و [0, 2].',
      },
      {
        stepNumber: 2,
        title: 'حساب التكاملين وجمع القيم المطلقة',
        latex: 'A_1 = \\int_{-2}^0 (x^3 - 4x)dx = 4, \\quad A_2 = \\int_0^2 (x^3 - 4x)dx = -4',
        explanation: 'المساحة الكلية A = |A_1| + |A_2| = 4 + 4 = 8.',
      },
    ],
  },

  // ------------------ 2022 ------------------
  {
    id: 'min-2022-1',
    title: 'وزاري 2022 دور ثانٍ: قطع زائد بؤرتاه هما بؤرتا قطع ناقص',
    category: 'conic_sections',
    categoryArabic: 'الفصل الثاني: القطوع المخروطية',
    ministerialYear: '2022 دور ثانٍ',
    branch: 'علمي',
    marks: 10,
    questionLatex: '\\frac{x^2}{25} + \\frac{y^2}{9} = 1 \\implies \\text{جد معادلة الزائد إذا كان محوره المرافق } 2b = 2c',
    questionArabic: 'جد معادلة القطع الزائد الذي بؤرتاه هما بؤرتا القطع الناقص x²/25 + y²/9 = 1 والمسافة بين بؤرتيه تساوي طول محوره المرافق.',
    finalAnswer: '\\frac{x^2}{12} - \\frac{y^2}{4} = 1',
    graphType: 'hyperbola',
    steps: [
      {
        stepNumber: 1,
        title: 'بؤرتا القطع الناقص',
        latex: 'c_1^2 = a_1^2 - b_1^2 = 25 - 9 = 16 \\implies c_1 = 4',
        explanation: 'بؤرتا الناقص تقعان على محور السينات: F(±4, 0).',
      },
      {
        stepNumber: 2,
        title: 'معادلة القطع الزائد',
        latex: 'c_2 = 4, \\quad 2b = 4 \\implies b = 2 \\implies c^2 = a^2 + b^2 \\implies 16 = a^2 + 4 \\implies a^2 = 12',
        explanation: 'معادلة الزائد: x²/12 - y²/4 = 1.',
      },
    ],
  },
  {
    id: 'min-2022-2',
    title: 'وزاري 2022 دور أول: مبرهنة رول',
    category: 'differentiation',
    categoryArabic: 'الفصل الثالث: تطبيقات التفاضل',
    ministerialYear: '2022 دور أول',
    branch: 'علمي',
    marks: 10,
    questionLatex: 'f(x) = (2 - x)^2, \\quad x \\in [0, 4]',
    questionArabic: 'بين هل الدالة f(x) = (2 - x)² على الفترة [0, 4] تحقق شروط مبرهنة رول؟ وجد قيمة c.',
    finalAnswer: 'c = 2 \\in (0, 4)',
    graphType: 'function_curve',
    steps: [
      {
        stepNumber: 1,
        title: 'تحقق شروط مبرهنة رول الثلاثة',
        latex: 'f(0) = (2)^2 = 4, \\quad f(4) = (-2)^2 = 4 \\implies f(0) = f(4)',
        explanation: 'الدالة مستمرة وقابلة للاشتقاق وصورتا طرفي الفترة متساويتان.',
      },
      {
        stepNumber: 2,
        title: 'إيجاد قيمة c بجعل f\'(c) = 0',
        latex: 'f\'(x) = -2(2 - x) \\implies f\'(c) = -4 + 2c = 0 \\implies c = 2',
        explanation: 'قيمة c تنتمي للفترة المفتوحة (0, 4).',
      },
    ],
  },

  // ------------------ 2021 ------------------
  {
    id: 'min-2021-1',
    title: 'وزاري 2021 دور أول: المعادلة التربيعية في C',
    category: 'complex_numbers',
    categoryArabic: 'الفصل الأول: الأعداد المركبة',
    ministerialYear: '2021 دور أول',
    branch: 'علمي',
    marks: 10,
    questionLatex: 'x^2 - 2xi - (1 - 2i) = 0 \\text{ حل المعادلة في مجموعة الأعداد المركبة}',
    questionArabic: 'حل المعادلة التربيعية الآتية في C باستخدام الدستور: x² - 2xi - (1 - 2i) = 0.',
    finalAnswer: 'x_1 = 1 + i, \\quad x_2 = -1 + i',
    steps: [
      {
        stepNumber: 1,
        title: 'تحديد المعاملات وحساب المميز (Δ)',
        latex: 'a = 1, \\quad b = -2i, \\quad c = -(1 - 2i) \\implies \\Delta = b^2 - 4ac = (-2i)^2 - 4(1)(2i - 1)',
        explanation: 'المميز Δ = -4 - 8i + 4 = -8i.',
      },
      {
        stepNumber: 2,
        title: 'إيجاد الجذور التربيعية للمميز (-8i) بالفرضية',
        latex: '(u + iv)^2 = -8i \\implies u^2 - v^2 = 0, \\quad 2uv = -8 \\implies u = \\pm 2, \\quad v = \\mp 2',
        explanation: 'الجذران التربيعيان لـ Δ هما: ±(2 - 2i).',
      },
      {
        stepNumber: 3,
        title: 'التعويض في قانون الدستور',
        latex: 'x = \\frac{-(-2i) \\pm (2 - 2i)}{2} \\implies x_1 = 1 + i, \\quad x_2 = -1 + i',
        explanation: 'جذرا المعادلة هما x_1 = 1 + i و x_2 = -1 + i.',
      },
    ],
  },

  // ------------------ 2020 ------------------
  {
    id: 'min-2020-1',
    title: 'وزاري 2020 دور أول: تكامل الدوال المثلثية المحددة',
    category: 'integration',
    categoryArabic: 'الفصل الرابع: التكامل وتطبيقاته',
    ministerialYear: '2020 دور أول',
    branch: 'مشترك',
    marks: 10,
    questionLatex: '\\int_{0}^{\\frac{\\pi}{4}} \\tan^2 x \\sec^2 x \\, dx',
    questionArabic: 'احسب قيمة التكامل المحدد الآتي: من 0 إلى π/4 للمقدار (tan²x · sec²x) dx.',
    finalAnswer: '\\frac{1}{3}',
    steps: [
      {
        stepNumber: 1,
        title: 'تحديد الدالة ومشتقتها',
        latex: 'u = \\tan x \\implies du = \\sec^2 x \\, dx',
        explanation: 'المشتقة متوفرة مباشرة، إذن نكامل الدالة المرفوعة لأس.',
      },
      {
        stepNumber: 2,
        title: 'إجراء التكامل والتعويض بحدود التكامل',
        latex: '\\left[ \\frac{\\tan^3 x}{3} \\right]_0^{\\frac{\\pi}{4}} = \\frac{(\\tan \\frac{\\pi}{4})^3}{3} - 0 = \\frac{1}{3}',
        explanation: 'tan(π/4) = 1.',
      },
    ],
  },

  // ------------------ 2019 ------------------
  {
    id: 'min-2019-1',
    title: 'وزاري 2019 دور أول: مبرهنة القيمة المتوسطة',
    category: 'differentiation',
    categoryArabic: 'الفصل الثالث: تطبيقات التفاضل',
    ministerialYear: '2019 دور أول',
    branch: 'علمي',
    marks: 10,
    questionLatex: 'f(x) = x^3 - x - 1, \\quad x \\in [-1, 2] \\text{ جد قيمة } c',
    questionArabic: 'جد قيمة c التي تعينها مبرهنة القيمة المتوسطة للدالة f(x) = x³ - x - 1 على الفترة [-1, 2].',
    finalAnswer: 'c = 1 \\in (-1, 2)',
    steps: [
      {
        stepNumber: 1,
        title: 'حساب ميل الوتر [f(b) - f(a)] / (b - a)',
        latex: 'f(2) = 8 - 2 - 1 = 5, \\quad f(-1) = -1 + 1 - 1 = -1 \\implies \\text{ميل الوتر} = \\frac{5 - (-1)}{2 - (-1)} = \\frac{6}{3} = 2',
        explanation: 'ميل الوتر يساوي 2.',
      },
      {
        stepNumber: 2,
        title: 'مساواة ميل المماس بميل الوتر f\'(c) = 2',
        latex: 'f\'(x) = 3x^2 - 1 \\implies 3c^2 - 1 = 2 \\implies 3c^2 = 3 \\implies c = \\pm 1',
        explanation: 'بما أن الفترة المفتوحة هي (-1, 2)، فإن c = 1 ينتمي للفترة بينما c = -1 طرف ولا ينتمي للفترة المفتوحة.',
      },
    ],
  },

  // ------------------ 2018 ------------------
  {
    id: 'min-2018-1',
    title: 'وزاري 2018 دور ثانٍ: المسألة الزمنية (معدل التغير في طول الظل)',
    category: 'differentiation',
    categoryArabic: 'الفصل الثالث: تطبيقات التفاضل',
    ministerialYear: '2018 دور ثانٍ',
    branch: 'علمي',
    marks: 10,
    questionLatex: '\\text{عمود إنارة طوله } 7.2\\text{m ومبتعد عنه رجل طوله } 1.8\\text{m بسرعة } 30\\text{m/min}',
    questionArabic: 'عمود إنارة طوله 7.2 متر في نهايته مصباح، يتحرك رجل طوله 1.8 متر مبتعداً عن العمود بسرعة 30 m/min. جد معدل تغير طول ظل الرجل.',
    finalAnswer: '10 \\text{ m/min}',
    steps: [
      {
        stepNumber: 1,
        title: 'فرض المتغيرات وتشابه المثلثين',
        latex: '\\frac{1.8}{7.2} = \\frac{y}{x + y} \\implies \\frac{1}{4} = \\frac{y}{x + y} \\implies x + y = 4y \\implies x = 3y',
        explanation: 'نفرض بعد الرجل عن العمود x وطول ظله y.',
      },
      {
        stepNumber: 2,
        title: 'الاشتقاق بالنسبة للزمن t',
        latex: '\\frac{dx}{dt} = 3\\frac{dy}{dt} \\implies 30 = 3\\frac{dy}{dt} \\implies \\frac{dy}{dt} = 10 \\text{ m/min}',
        explanation: 'معدل زيادة طول ظل الرجل هو 10 م/دقيقة.',
      },
    ],
  },

  // ------------------ 2017 ------------------
  {
    id: 'min-2017-1',
    title: 'وزاري 2017 تمهيدي: إثبات المتطابقة المثلثية لديموافر',
    category: 'complex_numbers',
    categoryArabic: 'الفصل الأول: الأعداد المركبة',
    ministerialYear: '2017 تمهيدي',
    branch: 'علمي',
    marks: 10,
    questionLatex: '\\frac{(\\cos 2\\theta + i\\sin 2\\theta)^5}{(\\cos 3\\theta + i\\sin 3\\theta)^3} = \\cos \\theta + i\\sin \\theta',
    questionArabic: 'أثبت أن: المقدار [cos(2θ) + i sin(2θ)]⁵ / [cos(3θ) + i sin(3θ)]³ = cos θ + i sin θ.',
    finalAnswer: '\\text{الطرف الأيمن } = \\text{الطرف الأيسر}',
    steps: [
      {
        stepNumber: 1,
        title: 'استخدام مبرهنة ديموافر عكسياً في البسط والمقام',
        latex: '\\text{البسط: } [(\\cos\\theta + i\\sin\\theta)^2]^5 = (\\cos\\theta + i\\sin\\theta)^{10}',
        explanation: 'نخرج معاملات الزاوية كقوة للأس.',
      },
      {
        stepNumber: 2,
        title: 'تبسيط المقام وقسمة القوى',
        latex: '\\text{المقام: } [(\\cos\\theta + i\\sin\\theta)^3]^3 = (\\cos\\theta + i\\sin\\theta)^9',
        explanation: 'عند القسمة تطرح الأسس للأساسات المتشابهة: 10 - 9 = 1.',
      },
      {
        stepNumber: 3,
        title: 'النتيجة النهائية',
        latex: '(\\cos\\theta + i\\sin\\theta)^{10-9} = \\cos\\theta + i\\sin\\theta = \\text{R.H.S}',
        explanation: 'الطرف الأيسر يساوي الطرف الأيمن وهو المطلوب إثباته.',
      },
    ],
  },

  // ------------------ 2016 ------------------
  {
    id: 'min-2016-1',
    title: 'وزاري 2016 دور أول: معادلة تفاضلية متجانسة',
    category: 'differential_equations',
    categoryArabic: 'الفصل الخامس: المعادلات التفاضلية',
    ministerialYear: '2016 دور أول',
    branch: 'علمي',
    marks: 10,
    questionLatex: '(x^2 + y^2)dx - 2xy dy = 0',
    questionArabic: 'حل المعادلة التفاضلية الآتية: (x² + y²)dx - 2xy dy = 0.',
    finalAnswer: 'x^2 - y^2 = C x',
    steps: [
      {
        stepNumber: 1,
        title: 'كتابة المعادلة بصيغة dy/dx والتحقق من التجانس',
        latex: '\\frac{dy}{dx} = \\frac{x^2 + y^2}{2xy} = \\frac{1 + (\\frac{y}{x})^2}{2(\\frac{y}{x})}',
        explanation: 'كل حد من الدرجة الثانية، إذن المعادلة متجانسة.',
      },
      {
        stepNumber: 2,
        title: 'التعويض بالفرضية v = y/x',
        latex: 'y = vx \\implies \\frac{dy}{dx} = v + x\\frac{dv}{dx} \\implies v + x\\frac{dv}{dx} = \\frac{1 + v^2}{2v}',
        explanation: 'تحويل المعادلة إلى معادلة قابلة لفصل المتغيرات.',
      },
      {
        stepNumber: 3,
        title: 'فصل المتغيرات والتكامل',
        latex: 'x\\frac{dv}{dx} = \\frac{1 - v^2}{2v} \\implies \\int \\frac{2v}{1 - v^2} dv = \\int \\frac{1}{x} dx',
        explanation: '-ln|1 - v²| = ln|x| + ln|C| يؤدي إلى x² - y² = C x.',
      },
    ],
  },

  // ------------------ 2015 ------------------
  {
    id: 'min-2015-1',
    title: 'وزاري 2015 دور أول: الجذور التربيعية للعدد المركب ودستور حل المعادلة',
    category: 'complex_numbers',
    categoryArabic: 'الفصل الأول: الأعداد المركبة',
    ministerialYear: '2015 دور أول',
    branch: 'علمي',
    marks: 10,
    questionLatex: 'z^2 + (1 + 4i)z - (5 + i) = 0',
    questionArabic: 'حل المعادلة z² + (1 + 4i)z - (5 + i) = 0 في مجموعة الأعداد المركبة C.',
    finalAnswer: 'z_1 = 1 - 3i, \\quad z_2 = -2 - i',
    steps: [
      {
        stepNumber: 1,
        title: 'حساب المميز Δ للدستور',
        latex: '\\Delta = b^2 - 4ac = (1 + 4i)^2 - 4(1)(-(5 + i)) = (1 + 8i - 16) + (20 + 4i) = 5 + 12i',
        explanation: 'المميز طلع عدداً مركباً 5 + 12i، فنستخرج جذوره بالفرضية.',
      },
      {
        stepNumber: 2,
        title: 'إيجاد الجذور التربيعية لـ (5 + 12i) بالفرضية (x + iy)²',
        latex: 'x^2 - y^2 = 5, \\quad 2xy = 12 \\implies xy = 6 \\implies x = \\pm 3, \\quad y = \\pm 2',
        explanation: 'الجذران هما ±(3 + 2i).',
      },
      {
        stepNumber: 3,
        title: 'تطبيق قانون الدستور لاستخراج جذري المعادلة',
        latex: 'z = \\frac{-(1 + 4i) \\pm (3 + 2i)}{2} \\implies z_1 = 1 - 3i, \\quad z_2 = -2 - i',
        explanation: 'مجموعة الحل هي {1 - 3i, -2 - i}.',
        ruleHint: 'تأكد من إشارة السالب قبل القوس b في قانون الدستور.',
      },
    ],
  },
  {
    id: 'min-2015-2',
    title: 'وزاري 2015 دور ثانٍ: القطع المكافئ الذي يمر بالنقطتين ويمر دليله بالنقطة',
    category: 'conic_sections',
    categoryArabic: 'الفصل الثاني: القطوع المخروطية',
    ministerialYear: '2015 دور ثانٍ',
    branch: 'علمي',
    marks: 10,
    questionLatex: 'y^2 = 4px \\text{ يمر بالنقطتين } (2, 4) \\text{ و } (2, -4)',
    questionArabic: 'جد معادلة القطع المكافئ الذي رأسه نقطة الأصل ويمر بالنقطتين (2, 4) و (2, -4) ثم جد بؤرته ومعادلة دليله.',
    finalAnswer: 'y^2 = 8x, \\quad F(2, 0), \\quad x = -2',
    graphType: 'parabola',
    steps: [
      {
        stepNumber: 1,
        title: 'تحديد محور التناظر والمعادلة القياسية',
        latex: '\\text{النقطتان متناظرتان حول محور السينات الموجب} \\implies y^2 = 4px',
        explanation: 'الإحداثي السيني موجب ومتساوٍ (x = 2) بينما الصادي متناظر (4 و -4).',
      },
      {
        stepNumber: 2,
        title: 'تعويض النقطة (2, 4) لإيجاد قيمة p',
        latex: '(4)^2 = 4p(2) \\implies 16 = 8p \\implies p = 2',
        explanation: 'المسافة البؤرية p = 2.',
      },
      {
        stepNumber: 3,
        title: 'كتابة المعادلة والبؤرة ومعادلة الدليل',
        latex: 'y^2 = 8x, \\quad F(2, 0), \\quad \\text{معادلة الدليل: } x = -2',
        explanation: 'معادلة الدليل تخالف إشارة البؤرة دائماً.',
      },
    ],
  },
];

/**
 * Returns available years in descending order
 */
export const AVAILABLE_YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

/**
 * Groups ministerial questions into folders by Year
 */
export function getQuestionsByYearFolder(year: number): SolvedProblem[] {
  return MINISTERIAL_YEARS_LIBRARY.filter((p) => {
    return p.ministerialYear && p.ministerialYear.includes(`${year}`);
  });
}
