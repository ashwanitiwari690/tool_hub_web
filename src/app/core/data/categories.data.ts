import { CategoryDefinition } from '../models/tool.model';

export const CATEGORIES: CategoryDefinition[] = [
  {
    slug: 'text',
    name: 'Text Tools',
    description: 'Count, clean, format, and transform text content instantly in your browser.',
    icon: 'text',
    route: '/tools/text',
    intro:
      'ToolNova text utilities help writers, editors, students, and software developers analyze and transform text efficiently. Whether you need an exact character tally for character-restricted social media platforms, an essay word count, or automated casing transformation for variable names and headlines, our text utilities provide instantaneous feedback with zero server latency.',
    whyUseful:
      'Manual text counting and reformatting is repetitive and prone to human error. Our browser-based text tools process your strings in real time as you type or paste, without ever sending your sensitive drafts, journal entries, or confidential manuscripts over the internet.',
    useCases: [
      {
        title: 'Publishing & Editorial Compliance',
        description:
          'Track word counts, character density, and estimated reading durations for blog posts, academic essays, and news articles to meet strict submission criteria.',
      },
      {
        title: 'Headline & Document Case Formatting',
        description:
          'Convert messy notes or all-caps transcripts into clean Title Case, Sentence case, or lowercase for polished presentations and publications.',
      },
      {
        title: 'Developer Variable Naming',
        description:
          'Quickly translate multi-word phrases into camelCase, snake_case, or kebab-case for consistent programming identifiers across codebases.',
      },
      {
        title: 'Social Media & SEO Optimization',
        description:
          'Verify character counts against platform constraints (such as X/Twitter 280-character limits, Meta titles, and SERP snippet guidelines).',
      },
    ],
    faqs: [
      {
        question: 'Are my text drafts or documents stored on ToolNova servers?',
        answer:
          'No. All text parsing, counting, and string manipulation takes place locally inside your web browser. Your inputs are never transmitted across a network, logged in databases, or stored on remote servers.',
      },
      {
        question: 'How is reading time calculated in the Word Counter?',
        answer:
          'Reading time is estimated based on the standard adult reading benchmark of approximately 200 words per minute. Speaking time is calculated at a conversational pace of 130 words per minute.',
      },
      {
        question: 'Can I format large documents or code files?',
        answer:
          'Yes. Because text operations run natively in your browser memory, our tools can handle thousands of words smoothly without hitting network timeout limitations.',
      },
    ],
  },
  {
    slug: 'developer',
    name: 'Developer Tools',
    description: 'Format, validate, debug, and inspect JSON payloads client-side.',
    icon: 'code',
    route: '/tools/developer',
    intro:
      'Modern web and cloud applications rely heavily on JSON for data exchange, configuration, and API communication. ToolNova developer utilities allow software engineers, API designers, and technical students to format minified responses, validate structural syntax, and debug parsing errors directly within browser memory.',
    whyUseful:
      'Pasting proprietary API payloads, database exports, or configuration tokens into unknown third-party cloud formatters exposes your team to data leakage risks. ToolNova executes all JSON formatting and syntax parsing client-side via JavaScript native JSON engines, keeping your tokens and private keys strictly inside your browser sandbox.',
    useCases: [
      {
        title: 'API Payload Debugging',
        description:
          'Turn dense single-line API responses into clean, indented JSON with 2-space or 4-space indentation for easy visual inspection.',
      },
      {
        title: 'Syntax Error Diagnostics',
        description:
          'Pinpoint misplaced commas, unclosed brackets, single-quoted strings, and trailing commas with precise line and column error indicators.',
      },
      {
        title: 'Data Sanitization & Payload Verification',
        description:
          'Verify that webhook payloads and config files adhere to valid JSON standards before deploying to production environments.',
      },
    ],
    faqs: [
      {
        question: 'Is it safe to format JSON containing API keys or private data?',
        answer:
          'Yes, because our developer utilities execute 100% client-side in your browser. No payloads are ever uploaded to any backend server or third-party tracking system.',
      },
      {
        question: 'Why does JSON require double quotes around property names?',
        answer:
          'According to the RFC 8259 JSON standard, all string values and object property keys must be enclosed in double quotes ("). Single quotes or unquoted identifiers are valid in JavaScript object literals, but violate strict JSON specifications.',
      },
      {
        question: 'What is the file size limit for JSON validation?',
        answer:
          'Because parsing occurs in browser memory, files up to several megabytes can be processed instantaneously. Performance depends solely on your computer’s RAM and CPU capabilities.',
      },
    ],
  },
  {
    slug: 'image',
    name: 'Image Tools',
    description: 'Compress, resize, and optimize digital photos directly in your browser.',
    icon: 'image',
    route: '/tools/image',
    intro:
      'High-resolution imagery can severely degrade website loading speeds, inflate bandwidth bills, and exceed email attachment limits. ToolNova image utilities empower web designers, content creators, and everyday users to compress and resize raster images (JPEG, PNG, and WebP) directly on their client device using HTML5 Canvas rendering.',
    whyUseful:
      'Unlike traditional cloud-based image converters that require uploading bulky multi-megabyte files to remote servers—risking personal privacy and incurring slow upload delays—ToolNova processes your images locally in browser memory. Compression and dimension scaling occur in milliseconds without consuming cellular or broadband upload data.',
    useCases: [
      {
        title: 'Web Performance Optimization',
        description:
          'Compress hero banners, blog illustrations, and product photos to decrease webpage load times and boost Core Web Vitals scores.',
      },
      {
        title: 'Email & Document Size Compliance',
        description:
          'Downscale high-resolution phone photos to fit within strict email attachment caps (e.g., under 10MB or 25MB) without visible quality degradation.',
      },
      {
        title: 'Social Media & Avatar Scaling',
        description:
          'Resize images to specific pixel dimensions for platform profile avatars, banners, and article thumbnails while preserving aspect ratios.',
      },
    ],
    faqs: [
      {
        question: 'Are my images uploaded to ToolNova servers during compression or resizing?',
        answer:
          'Never. Your images are loaded into your browser’s temporary memory via the FileReader API and manipulated using the HTML5 Canvas 2D context. The processed image is exported directly to your computer from browser RAM.',
      },
      {
        question: 'What image formats are supported?',
        answer:
          'You can upload and process JPG/JPEG, PNG, and modern WebP formats directly in modern web browsers.',
      },
      {
        question: 'How does browser-based image compression work?',
        answer:
          'The tool draws your image onto an off-screen HTML5 canvas element and re-encodes the pixel matrix using configurable lossy compression parameters, reducing file weight while retaining visual fidelity.',
      },
    ],
  },
  {
    slug: 'calculator',
    name: 'Calculators',
    description: 'Perform verified financial, percentage, and chronological age calculations.',
    icon: 'calculator',
    route: '/tools/calculator',
    intro:
      'Accurate arithmetic is fundamental for budgeting, commercial discounting, academic scoring, and personal milestone tracking. ToolNova calculators deliver straightforward, verified numerical calculations without clunky interfaces or intrusive ads that disrupt your workflow.',
    whyUseful:
      'Complex formulas (such as percentage change, tax markups, and exact chronological calendar intervals accounting for leap years and month lengths) can easily lead to mental math errors. Our calculators break down the math step-by-step with transparent formulas and instant updates.',
    useCases: [
      {
        title: 'Retail Sales & Discount Calculations',
        description:
          'Compute discounted prices during promotional sales and determine exact savings amounts before making purchase decisions.',
      },
      {
        title: 'Academic Grade & Percentage Scoring',
        description:
          'Convert test scores into percentages, calculate required marks for grade thresholds, and determine percentage increases between terms.',
      },
      {
        title: 'Exact Chronological Age Determination',
        description:
          'Calculate age down to the exact day, month, and year for legal documents, passport applications, birthday milestones, and retirement planning.',
      },
    ],
    faqs: [
      {
        question: 'How do you accurately calculate age across leap years?',
        answer:
          'Our age calculator computes calendar-accurate date intervals by evaluating year and month boundaries, adjusting dynamically for 28, 29, 30, and 31-day months and leap years rather than dividing by a generic 365-day average.',
      },
      {
        question: 'Can I calculate both percentage increases and decreases?',
        answer:
          'Yes. The Percentage Calculator offers multiple dedicated calculation modes, including percentage of a number, percentage increase/decrease, and find the percentage.',
      },
      {
        question: 'Are calculations private and secure?',
        answer:
          'All calculations are performed locally in your browser using standard JavaScript IEEE 754 arithmetic. No numerical inputs or results are stored or tracked.',
      },
    ],
  },
  {
    slug: 'qr',
    name: 'QR Tools',
    description: 'Generate scannable, high-resolution static QR codes for links, text, and Wi-Fi.',
    icon: 'qr',
    route: '/tools/qr',
    intro:
      'QR (Quick Response) codes provide a seamless bridge between physical materials and digital experiences. ToolNova QR tools enable users to produce clean, high-resolution static QR codes for URLs, contact information, plain text notes, and network credentials in seconds.',
    whyUseful:
      'Many commercial QR code generators create "dynamic" redirect links that expire after a 14-day trial unless you subscribe to an expensive monthly plan. ToolNova generates genuine static QR codes that directly encode your payload into the matrix. They never expire, require no subscription, and have zero intermediary tracking redirects.',
    useCases: [
      {
        title: 'Print Materials & Marketing Collateral',
        description:
          'Place permanent, non-expiring QR codes on flyers, business cards, restaurant menus, product labels, and conference banners.',
      },
      {
        title: 'Touchless Wi-Fi Access Sharing',
        description:
          'Generate instant connection QR codes for office or home Wi-Fi networks so guests can connect without typing lengthy passwords.',
      },
      {
        title: 'Portfolio & Social Media Links',
        description:
          'Share direct links to your GitHub profile, LinkedIn page, personal website, or digital portfolio on printed resumes.',
      },
    ],
    faqs: [
      {
        question: 'Do ToolNova QR codes expire?',
        answer:
          'No! Our QR codes are 100% static. The data is encoded directly into the geometric pattern. Because there is no intermediary redirect server, your QR code will work permanently as long as the destination URL or content remains accessible.',
      },
      {
        question: 'Is there a scan limit on generated QR codes?',
        answer:
          'No. Because static QR codes do not route through a tracking proxy, they can be scanned an unlimited number of times by any standard smartphone camera or QR scanner.',
      },
      {
        question: 'Can I download the QR code as an image?',
        answer:
          'Yes. Once generated, you can save your QR code directly as a crisp, high-resolution PNG image suitable for digital displays or print production.',
      },
    ],
  },
  {
    slug: 'converter',
    name: 'Converters',
    description: 'Convert units across length, mass, temperature, and volume with verified accuracy.',
    icon: 'converter',
    route: '/tools/converter',
    intro:
      'Converting measurements between international systems is an everyday necessity for cooking, scientific study, construction, logistics, and international travel. ToolNova unit converters provide immediate, bidirectional conversions across metric, imperial, and US customary measurement systems.',
    whyUseful:
      'Searching for unit conversion factors or performing manual multi-step ratio calculations can lead to disastrous rounding errors. Our converter utilities employ standardized International System of Units (SI) conversion factors with high-precision floating-point arithmetic.',
    useCases: [
      {
        title: 'Culinary & Baking Conversions',
        description:
          'Seamlessly translate international cooking recipes between Celsius and Fahrenheit or milliliters and US fluid ounces.',
      },
      {
        title: 'Construction & DIY Carpentry',
        description:
          'Switch project blueprints and material measurements accurately between millimeters, centimeters, meters, inches, and feet.',
      },
      {
        title: 'Travel & Luggage Weight Verification',
        description:
          'Convert airline baggage limits between kilograms and pounds to prevent overweight luggage penalties at airport check-in.',
      },
    ],
    faqs: [
      {
        question: 'Which measurement categories are supported in the Unit Converter?',
        answer:
          'Our Unit Converter supports four core physical measurement categories: Length (meters, kilometers, centimeters, millimeters, miles, yards, feet, inches), Mass/Weight (kilograms, grams, milligrams, pounds, ounces), Temperature (Celsius, Fahrenheit, Kelvin), and Volume (liters, milliliters, gallons, quarts, pints, cups, fluid ounces).',
      },
      {
        question: 'Are the conversion formulas accurate?',
        answer:
          'Yes. All conversions utilize officially recognized international conversion constants (e.g., exactly 25.4 mm per inch, 0.45359237 kg per pound, and standard thermodynamic temperature offsets).',
      },
      {
        question: 'Can I perform two-way bidirectional conversions?',
        answer:
          'Yes. You can effortlessly switch the source and target units with a single click to calculate conversions in either direction.',
      },
    ],
  },
];
