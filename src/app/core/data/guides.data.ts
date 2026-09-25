import { GuideDefinition } from '../models/guide.model';

export const GUIDES: GuideDefinition[] = [
  {
    slug: 'how-to-format-json',
    title: 'How to Format and Beautify JSON Online',
    description:
      'A practical, step-by-step guide to formatting, indenting, and beautifying minified JSON directly in your browser.',
    updatedDate: '2026-09-21',
    introduction:
      'JavaScript Object Notation (JSON) is the universal standard for web API data transfer. While minified JSON saves network bandwidth, it is nearly impossible for human developers and analysts to read or debug when compacted into a single continuous line. Formatting adds structured line breaks and indentation so you can quickly inspect objects, arrays, and key-value pairs.',
    sections: [
      {
        heading: 'Why Format JSON?',
        content:
          'Raw API responses from servers, databases, and microservices are almost always minified to conserve bandwidth and reduce latency. Without indentation and whitespace, identifying syntax errors, nested attributes, or missing arrays is tedious and error-prone. Beautifying JSON transforms a dense block of text into a clean hierarchy without altering any underlying data types or values.',
      },
      {
        heading: 'Minification vs Pretty-Printing',
        content:
          'Pretty-printing (formatting) expands JSON by inserting spaces (typically 2 or 4 spaces) and newline characters after structural delimiters ({}, [], commas, and colons). Minification performs the exact opposite: it strips all non-essential whitespace, line breaks, and indentation, producing the smallest possible payload for production network transfers.',
        codeExample:
          '// Minified:\n{"user":"alex","role":"admin","active":true,"tags":["web","dev"]}\n\n// Formatted (Pretty-Printed):\n{\n  "user": "alex",\n  "role": "admin",\n  "active": true,\n  "tags": [\n    "web",\n    "dev"\n  ]\n}',
      },
      {
        heading: 'Client-Side Privacy Advantage',
        content:
          'Many online formatters send your data to remote cloud servers to run backend parsing libraries. If your JSON contains customer records, private tokens, or database secrets, uploading it creates an unnecessary security exposure. ToolNova formats your JSON 100% locally in your browser memory using the native JSON JavaScript engine — your payload never touches any external server.',
        tips: [
          'Never paste production API keys, database connection strings, or plaintext passwords into tools that upload data to a server.',
          'Verify that your browser tab displays local execution before processing sensitive customer records.',
        ],
      },
    ],
    steps: [
      {
        title: 'Paste or Load Your JSON',
        detail:
          'Copy your raw, minified, or unformatted JSON text and paste it into the input area of the JSON Formatter tool.',
      },
      {
        title: 'Click Format',
        detail:
          'Press the Format button. The client-side parser parses the payload and re-emits it with consistent two-space hierarchy.',
      },
      {
        title: 'Inspect Syntax & Structure',
        detail:
          'Review the output. If the input contains any syntax errors, the tool flags the exact parsing issue so you can correct it immediately.',
      },
      {
        title: 'Copy or Download the Result',
        detail:
          'Use the Copy button to place the beautified JSON onto your clipboard, or click Download to save it as a valid .json file.',
      },
    ],
    commonMistakes: [
      'Using single quotes (\'key\': \'value\') instead of standard double quotes ("key": "value").',
      'Leaving trailing commas after the last element in an object or array.',
      'Unquoted object keys (e.g., { name: "Alice" } instead of { "name": "Alice" }).',
      'Pasting JavaScript object literals containing functions, undefined, or NaN, which are not valid JSON primitives.',
    ],
    faq: [
      {
        question: 'Does the formatter change any data values?',
        answer:
          'No. Formatting only adjusts whitespace and indentation. Keys, string values, numbers, booleans, and nulls remain completely unchanged.',
      },
      {
        question: 'Is my JSON uploaded to a remote server?',
        answer:
          'No. ToolNova processes all JSON entirely in client-side browser memory via standard JavaScript APIs. No data is transmitted across the network.',
      },
      {
        question: 'What is the maximum JSON payload size supported?',
        answer:
          'Because parsing occurs in the browser, the tool can handle multi-megabyte payloads comfortably, constrained only by your device available RAM.',
      },
      {
        question: 'Can I re-minify the formatted JSON afterwards?',
        answer:
          'Yes. You can switch between formatted and minified representations at any time using the Minify button.',
      },
    ],
    relatedToolSlugs: ['json-formatter', 'json-validator'],
  },
  {
    slug: 'how-to-validate-json',
    title: 'How to Validate JSON Syntax and Fix Common Syntax Errors',
    description:
      'Learn how to inspect JSON payloads against standard RFC 8259 specifications and resolve parsing errors.',
    updatedDate: '2026-09-21',
    introduction:
      'JSON syntax is intentionally strict. A single missing quote, an extra trailing comma, or an unescaped control character can break an entire API pipeline, crash mobile apps, or fail continuous integration builds. Validating your JSON before sending it into production ensures strict compliance with standard data exchange formats.',
    sections: [
      {
        heading: 'The Strict Rules of RFC 8259',
        content:
          'Unlike JavaScript objects, the JSON standard requires strict quotation conventions. All object keys must be enclosed in double quotes. String values must also use double quotes. Primitive values are restricted to string, number, boolean (true/false), object, array, and null. Values like undefined, symbols, functions, or comments (// or /* */) are strictly prohibited.',
      },
      {
        heading: 'Understanding Parser Error Messages',
        content:
          'When a JSON parser encounters invalid syntax, it stops execution and reports the character position where parsing failed. Understanding how to interpret error messages like "Unexpected token" or "Expected double-quoted property name" allows you to pinpoint syntax failures in large payloads within seconds.',
        codeExample:
          '// INVALID (Trailing comma & single quotes):\n{\n  \'service\': "ToolNova",\n  \'status\': "active",\n}\n\n// VALID (RFC 8259 Compliant):\n{\n  "service": "ToolNova",\n  "status": "active"\n}',
      },
    ],
    steps: [
      {
        title: 'Input Your Payload',
        detail:
          'Paste the JSON content you wish to inspect into the JSON Validator editor window.',
      },
      {
        title: 'Execute Validation',
        detail:
          'Click Validate. The tool executes a rigorous native parse check against RFC 8259 rules.',
      },
      {
        title: 'Review the Diagnostic Report',
        detail:
          'If valid, a confirmation indicator appears. If invalid, review the clear error notice describing the specific syntax breakdown.',
      },
      {
        title: 'Correct the Faulty Syntax',
        detail:
          'Fix the identified issue (such as replacing single quotes with double quotes or removing a trailing comma) and re-validate.',
      },
    ],
    commonMistakes: [
      'Adding JavaScript-style comments (// comment or /* comment */) inside the JSON payload.',
      'Forgetting to escape backslashes or quotation marks within string values (use \\" and \\\\).',
      'Using leading zeros in numeric values (e.g., 0123 is invalid in standard JSON).',
      'Missing a closing bracket ] or brace } in deeply nested objects.',
    ],
    faq: [
      {
        question: 'Can JSON include comments?',
        answer:
          'No. The official JSON specification (RFC 8259) does not allow comments. If you need comments in configuration files, consider formats like JSON5 or YAML.',
      },
      {
        question: 'Why does valid JavaScript code fail JSON validation?',
        answer:
          'JavaScript is much more lenient than JSON. JS allows single quotes, unquoted keys, trailing commas, and functions, none of which are allowed in JSON.',
      },
      {
        question: 'Does ToolNova store my validated payloads?',
        answer:
          'Never. Validation executes in the browser without sending any payload data over the network.',
      },
    ],
    relatedToolSlugs: ['json-validator', 'json-formatter'],
  },
  {
    slug: 'common-json-errors',
    title: 'Common JSON Errors and How to Fix Them',
    description:
      'A comprehensive reference guide detailing the most frequent JSON syntax mistakes, error messages, and their solutions.',
    updatedDate: '2026-09-21',
    introduction:
      'Whether you are writing REST API payloads, configuring web application settings, or managing CI/CD pipelines, encountering a JSON syntax error is inevitable. This guide outlines the most frequent syntax traps and shows you exactly how to resolve them.',
    sections: [
      {
        heading: '1. The Trailing Comma Trap',
        content:
          'Modern JavaScript allows trailing commas in arrays and objects, but JSON strictly forbids them. Having a comma after the final key-value pair in an object or after the last element in an array is one of the leading causes of "Unexpected token" errors.',
        codeExample:
          '// BROKEN:\n{"name": "ToolNova", "speed": "fast",}\n\n// FIXED:\n{"name": "ToolNova", "speed": "fast"}',
      },
      {
        heading: '2. Single Quotes Instead of Double Quotes',
        content:
          'JSON strings and property keys must always be enclosed in double quotation marks ("). Single quotes (\') will always trigger an immediate parser error.',
        codeExample:
          '// BROKEN:\n{\'title\': \'Free Online Tools\'}\n\n// FIXED:\n{"title": "Free Online Tools"}',
      },
      {
        heading: '3. Unquoted Property Keys',
        content:
          'In JavaScript, you can omit quotation marks around object keys if they are valid identifiers. In JSON, every single key without exception must be wrapped in double quotes.',
        codeExample:
          '// BROKEN:\n{count: 42, active: true}\n\n// FIXED:\n{"count": 42, "active": true}',
      },
      {
        heading: '4. Unescaped Special Characters',
        content:
          'Strings containing literal quotation marks, backslashes, or control characters must be escaped using a preceding backslash (\\). Unescaped double quotes inside a string terminate the string prematurely, breaking parser syntax.',
        codeExample:
          '// BROKEN:\n{"quote": "He said "Hello" to the team"}\n\n// FIXED:\n{"quote": "He said \\"Hello\\" to the team"}',
      },
    ],
    steps: [
      {
        title: 'Identify the Error Location',
        detail:
          'Read the error message carefully to locate the token or line where the parser stopped.',
      },
      {
        title: 'Check the Immediate Preceding Tokens',
        detail:
          'Inspect the characters right before the error point — often a missing comma or an unescaped quote in the preceding line triggers an error on the next line.',
      },
      {
        title: 'Verify Quotes and Commas',
        detail:
          'Confirm that all keys and strings use double quotes and that no trailing commas exist.',
      },
      {
        title: 'Run Through Validator',
        detail:
          'Paste your revised JSON into the ToolNova JSON Validator to confirm 100% compliance.',
      },
    ],
    commonMistakes: [
      'Assuming trailing commas are safe because modern browsers accept them in standard JS files.',
      'Pasting rich-text quotes (“smart quotes” or curly quotes) copied from word processors instead of ASCII standard double quotes (").',
      'Using NaN or Infinity as numbers; JSON requires null or standard numeric values.',
    ],
    faq: [
      {
        question: 'Why do word processors break JSON?',
        answer:
          'Word processors often automatically convert straight double quotes (") into curly or smart quotes (“ ”). These are entirely different Unicode characters that JSON parsers reject.',
      },
      {
        question: 'How do I handle multi-line strings in JSON?',
        answer:
          'JSON strings cannot span multiple physical lines. You must represent line breaks using the escape sequence \\n.',
      },
    ],
    relatedToolSlugs: ['json-validator', 'json-formatter'],
  },
  {
    slug: 'how-to-compress-image',
    title: 'How to Compress Images Without Losing Visual Quality',
    description:
      'Learn how to reduce image file size in your browser while preserving clarity and crispness for websites and social media.',
    updatedDate: '2026-09-21',
    introduction:
      'High-resolution images captured on modern smartphones and digital cameras frequently exceed 5 to 15 megabytes. Uploading uncompressed images slows down web page load times, consumes mobile data, and degrades SEO performance. Compressing your images properly reduces file weight by 60% to 80% without noticeable degradation.',
    sections: [
      {
        heading: 'How Image Compression Works',
        content:
          'Image compression works by identifying and streamlining redundant or imperceptible visual information. In lossy compression (such as JPEG and WebP), mathematical quantization algorithms discard subtle color variations that the human eye cannot readily distinguish at normal viewing distances.',
      },
      {
        heading: 'Balancing Quality and File Size',
        content:
          'Setting compression quality between 75% and 85% is typically the optimal "sweet spot" for photography and web graphics. It yields massive reductions in byte weight (often 70% or more) while appearing visually indistinguishable from the raw uncompressed original on screens.',
        tips: [
          'A quality setting of 80% is ideal for web articles and blogs.',
          'For hero background banners, 70% to 75% offers great load speed with solid visual fidelity.',
          'Save original unedited photos before applying compression.',
        ],
      },
      {
        heading: 'In-Browser Compression Privacy',
        content:
          'Most third-party image compression services upload your photos to remote cloud servers. ToolNova utilizes the browser HTML5 Canvas API and WebAssembly to compress files directly inside your computer or phone memory. Your personal photos, receipts, and designs never leave your device.',
      },
    ],
    steps: [
      {
        title: 'Select Your Image',
        detail:
          'Drag and drop a JPG, PNG, or WebP image into the drop zone or click to select from your device storage.',
      },
      {
        title: 'Choose Output Format',
        detail:
          'Select WebP for modern web delivery with maximum size reduction, or JPEG for universal legacy compatibility.',
      },
      {
        title: 'Fine-Tune the Quality Slider',
        detail:
          'Adjust the quality slider to observe the resulting file size and inspect the preview comparison.',
      },
      {
        title: 'Download the Compressed File',
        detail:
          'Click Download to save the compressed image directly to your local downloads folder.',
      },
    ],
    commonMistakes: [
      'Over-compressing below 50% quality, which introduces visible blocking and pixelation artifacts around high-contrast edges.',
      'Compressing an already heavily compressed JPEG repeatedly, which causes cumulative visual degradation.',
      'Using JPEG for graphics that require transparent backgrounds (JPEG fills transparency with solid white).',
    ],
    faq: [
      {
        question: 'Can I compress PNG images with transparent backgrounds?',
        answer:
          'Yes. When compressing images with transparency, convert to WebP to preserve alpha channel transparency while reducing file size.',
      },
      {
        question: 'Are my images stored on ToolNova servers?',
        answer:
          'No. ToolNova uses local browser Canvas processing. Your images are never sent over the network or saved on our servers.',
      },
      {
        question: 'What is the ideal image size for web pages?',
        answer:
          'Most web images should ideally be under 200 KB, with full-width banner images kept under 500 KB to maintain fast Core Web Vitals.',
      },
    ],
    relatedToolSlugs: ['image-compressor', 'image-resizer'],
  },
  {
    slug: 'jpg-vs-png-vs-webp',
    title: 'JPG vs PNG vs WebP: Which Image Format Should You Choose?',
    description:
      'A clear comparison of the three primary web image formats, their strengths, compression behaviors, and best use cases.',
    updatedDate: '2026-09-21',
    introduction:
      'Choosing the right image format is critical for website speed, visual crispness, and storage efficiency. Understanding the differences between JPEG, PNG, and WebP allows you to deliver professional graphics without bloating page load times.',
    sections: [
      {
        heading: 'JPEG (Joint Photographic Experts Group)',
        content:
          'JPEG is the historical standard for digital photography and complex images with rich color gradients. It uses lossy compression to achieve compact file sizes. However, JPEG does not support transparency (alpha channels) and can produce visible artifacts around sharp text or vector line art.',
      },
      {
        heading: 'PNG (Portable Network Graphics)',
        content:
          'PNG is a lossless format designed for graphics, logos, screenshots, and icons that demand pixel-perfect precision and alpha transparency. Because compression is lossless, PNG files are significantly larger than JPEG or WebP when storing continuous-tone photographs.',
      },
      {
        heading: 'WebP: The Modern Web Standard',
        content:
          'Developed by Google, WebP supports both lossy and lossless compression, alongside transparent backgrounds and animation. WebP images are typically 25% to 35% smaller than comparable JPEGs and PNGs at equivalent visual quality, making WebP the recommended format for modern web publishing.',
      },
    ],
    steps: [
      {
        title: 'Evaluate Your Content Type',
        detail:
          'Determine if the image is a photograph (gradients/complex lighting) or graphic/logo (sharp lines/solid colors).',
      },
      {
        title: 'Check Transparency Requirements',
        detail:
          'If the image requires a transparent cutout background, choose PNG or WebP; JPEG does not support transparency.',
      },
      {
        title: 'Choose the Modern Format',
        detail:
          'Default to WebP whenever publishing to the modern web for maximum speed and Core Web Vitals performance.',
      },
      {
        title: 'Convert in ToolNova',
        detail:
          'Use ToolNova Image Compressor or Resizer to convert between formats locally in seconds.',
      },
    ],
    commonMistakes: [
      'Saving simple flat-color logos as JPEG, creating fuzzy compression artifacts around typography.',
      'Saving multi-megapixel DSLR photos as PNG, resulting in enormous 20MB files that stall websites.',
      'Ignoring WebP browser support: all modern browsers (Chrome, Safari, Firefox, Edge) have supported WebP for years.',
    ],
    faq: [
      {
        question: 'Do all browsers support WebP today?',
        answer:
          'Yes. Over 97% of global web browsers natively support WebP, including all current versions of Safari, iOS, Chrome, Edge, and Firefox.',
      },
      {
        question: 'Will converting a PNG to JPG remove transparency?',
        answer:
          'Yes. Because JPEG has no alpha channel, transparent regions will be replaced with a solid white background.',
      },
    ],
    relatedToolSlugs: ['image-compressor', 'image-resizer'],
  },
  {
    slug: 'how-to-resize-images',
    title: 'How to Resize Images for Web and Social Media',
    description:
      'Step-by-step guide to scaling image dimensions, maintaining aspect ratios, and preparing graphics for online publishing.',
    updatedDate: '2026-09-21',
    introduction:
      'Displaying a 4000-pixel wide camera photo inside a 400-pixel card on a website wastes bandwidth and causes unnecessary browser rendering overhead. Resizing images to match their intended display dimensions speeds up page load times and ensures sharp, professional presentation across devices.',
    sections: [
      {
        heading: 'Dimensions vs File Size',
        content:
          'Image dimensions refer to the width and height measured in pixels (e.g., 1920x1080). File size refers to the bytes occupied on disk (e.g., 250 KB). Resizing downscales the physical pixel matrix, drastically reducing both visual scale and file size simultaneously.',
      },
      {
        heading: 'The Importance of Aspect Ratio',
        content:
          'Aspect ratio is the proportional relationship between width and height (such as 16:9, 4:3, or 1:1 square). Locking the aspect ratio while resizing ensures your subject matter does not stretch, squash, or distort unnaturally.',
        tips: [
          'Standard Instagram feeds favor 1:1 (1080x1080) or 4:5 (1080x1350) portrait ratios.',
          'YouTube thumbnails and standard web hero banners use 16:9 (1280x720 or 1920x1080).',
          'Favicons and web icons use 1:1 square dimensions (32x32, 64x64, or 192x192).',
        ],
      },
    ],
    steps: [
      {
        title: 'Upload Your Image',
        detail:
          'Load your picture into the ToolNova Image Resizer tool using drag and drop or file selector.',
      },
      {
        title: 'Set Target Dimensions',
        detail:
          'Enter your desired width or height in pixels. Keep the aspect ratio lock checked to maintain proportions automatically.',
      },
      {
        title: 'Inspect the Live Preview',
        detail:
          'Review the real-time preview to ensure the resized image matches your expectations.',
      },
      {
        title: 'Export and Save',
        detail:
          'Download the resized asset directly to your device ready for posting or integration.',
      },
    ],
    commonMistakes: [
      'Upscaling low-resolution images: expanding a 300px image to 1200px results in blurry, pixelated results because missing pixel data cannot be magically invented.',
      'Unlocking aspect ratio by accident, causing people or products in the photo to look squeezed or stretched.',
      'Using print dimensions (inches/cm) directly without accounting for digital screen PPI (Pixels Per Inch).',
    ],
    faq: [
      {
        question: 'Does resizing reduce image file size?',
        answer:
          'Yes. Downscaling an image reduces the total number of pixels stored, which significantly lowers file size.',
      },
      {
        question: 'Can I resize images directly on an iPhone or Android phone?',
        answer:
          'Yes. ToolNova is fully responsive and executes canvas-based resizing directly in your mobile web browser.',
      },
    ],
    relatedToolSlugs: ['image-resizer', 'image-compressor'],
  },
  {
    slug: 'how-to-create-qr-code',
    title: 'How to Create and Customize Scannable QR Codes',
    description:
      'A practical guide to generating high-contrast, permanent QR codes for URLs, plain text messages, and Wi-Fi configurations.',
    updatedDate: '2026-09-21',
    introduction:
      'Quick Response (QR) codes bridge the physical and digital worlds. By encoding URLs, Wi-Fi credentials, or text strings into a 2D matrix barcode, smartphone cameras can scan and open web content in an instant. Creating a clean, high-contrast QR code ensures reliable scanning across all lighting conditions and devices.',
    sections: [
      {
        heading: 'How QR Codes Work',
        content:
          'A QR code represents binary information using a grid of dark modules on a light background. Built-in position detection markers (the three large squares in the corners) allow camera software to orient the code at any angle, while Reed-Solomon error correction algorithms reconstruct data even if parts of the code are smudged or partially obscured.',
      },
      {
        heading: 'Static vs Dynamic Codes',
        content:
          'ToolNova generates clean static QR codes. The destination URL or data is hardcoded directly into the barcode matrix. Unlike commercial subscription services, our static QR codes never expire, never redirect through tracking intermediaries, and do not require monthly fees.',
        tips: [
          'Always test your QR code with at least two different smartphone cameras before printing on posters or business cards.',
          'Maintain high contrast: black modules on a clean white background provide maximum readability.',
          'Keep URLs concise: shorter URLs generate fewer modules, resulting in larger, easier-to-scan dots.',
        ],
      },
    ],
    steps: [
      {
        title: 'Choose Payload Type',
        detail:
          'Select whether you wish to encode a website URL, arbitrary plain text, or Wi-Fi login parameters.',
      },
      {
        title: 'Enter Content',
        detail:
          'Type or paste your link (e.g., https://yourwebsite.com) or text into the input field.',
      },
      {
        title: 'Preview the Matrix',
        detail:
          'The QR code updates instantaneously on screen as you type, rendering a sharp vector-accurate preview.',
      },
      {
        title: 'Download High-Resolution PNG',
        detail:
          'Download the generated PNG file for inclusion in printed flyers, menus, product packaging, or digital presentations.',
      },
    ],
    commonMistakes: [
      'Inverting colors (white QR code on black background), which many older barcode scanners cannot process.',
      'Printing the QR code too small: for physical scanning, keep the code at least 2cm x 2cm (0.8 x 0.8 inches) for arm-length scanning.',
      'Encoding huge paragraphs of text into a single code, creating a dense pattern that is difficult for low-end cameras to resolve.',
    ],
    faq: [
      {
        question: 'Do QR codes created on ToolNova ever expire?',
        answer:
          'No. ToolNova encodes your data directly into the standard static QR matrix. It functions indefinitely without depending on any server.',
      },
      {
        question: 'Is there a limit to how many QR codes I can create?',
        answer:
          'No. The generator is completely free and unlimited for both personal and commercial use.',
      },
      {
        question: 'Can I generate a Wi-Fi QR code for guests?',
        answer:
          'Yes. Select the Wi-Fi option in the QR generator, enter your network SSID and password, and guests can connect automatically by scanning.',
      },
    ],
    relatedToolSlugs: ['qr-generator'],
  },
  {
    slug: 'how-to-count-words-and-characters',
    title: 'How to Count Words and Characters for Content Writing',
    description:
      'Understand how word and character counters work, why character limits matter, and how to meet editorial guidelines.',
    updatedDate: '2026-09-21',
    introduction:
      'Whether you are writing an essay with a strict word limit, drafting a concise Google Ad headline, or publishing a social media post, accurate word and character tracking is vital. Understanding the mechanics of whitespace, punctuation, and reading speed metrics ensures your text meets editorial standards.',
    sections: [
      {
        heading: 'Word Count vs Character Count',
        content:
          'A word is defined as any continuous sequence of non-whitespace characters bounded by whitespace or punctuation. Character counts, on the other hand, tally every individual Unicode scalar value, including letters, numerals, symbols, and (optionally) space characters.',
      },
      {
        heading: 'Common Social Media & Editorial Limits',
        content:
          'Platforms enforce precise character boundaries. Knowing these benchmarks helps you craft copy that avoids truncation:',
        tips: [
          'X (Twitter): 280 characters for standard posts.',
          'Google Search Meta Titles: 50 to 60 characters (approx. 600px width).',
          'Google Search Meta Descriptions: 150 to 160 characters.',
          'LinkedIn Post Summary: 3,000 characters maximum; first 210 characters appear before "see more".',
          'Standard College Admissions Essay: typically 500 to 650 words.',
        ],
      },
      {
        heading: 'Calculating Reading Time',
        content:
          'Reading time estimates are based on the global average adult silent reading rate of approximately 200 to 250 words per minute. ToolNova Word Counter computes estimated reading time automatically to help bloggers and essayists pace their content.',
      },
    ],
    steps: [
      {
        title: 'Paste or Type Your Text',
        detail:
          'Enter your text directly into the ToolNova Word Counter workspace.',
      },
      {
        title: 'View Live Metrics',
        detail:
          'Inspect total words, characters (with and without spaces), sentences, paragraphs, and reading time in real time.',
      },
      {
        title: 'Edit to Match Target Requirements',
        detail:
          'Adjust phrasing, trim filler words, and monitor metrics updating with every keystroke.',
      },
    ],
    commonMistakes: [
      'Assuming hyphens always split words: algorithms may treat hyphenated compounds (e.g., "state-of-the-art") as one word or four depending on tokenizer rules.',
      'Overlooking space characters in platforms with strict total character limits.',
      'Counting emojis as single characters: some complex emojis contain zero-width joiners and represent multiple UTF-16 code units.',
    ],
    faq: [
      {
        question: 'Does the word counter upload my writing to a server?',
        answer:
          'No. All text parsing happens directly inside your browser memory. Your drafts, confidential essays, and articles are never sent over the internet.',
      },
      {
        question: 'How are sentences counted?',
        answer:
          'Sentences are counted based on standard sentence-terminating punctuation marks (. ! ?) followed by whitespace or end-of-string boundaries.',
      },
    ],
    relatedToolSlugs: ['word-counter', 'case-converter'],
  },
  {
    slug: 'how-to-calculate-percentages',
    title: 'How to Calculate Percentages, Increases, and Discounts',
    description:
      'Master the mathematical formulas for percentages, percentage change, and retail discounts with clear real-world examples.',
    updatedDate: '2026-09-21',
    introduction:
      'Percentages are ubiquitous in daily life — from computing sales tax and retail discounts to analyzing investment returns and grade averages. Mastering percentage arithmetic and understanding how automated calculators work prevents costly calculation mistakes.',
    sections: [
      {
        heading: 'The Basic Percentage Formula',
        content:
          'A percentage simply represents a fraction out of 100. To find what percentage X is of Y, divide X by Y and multiply by 100: (X / Y) * 100. To calculate X% of Y, multiply Y by (X / 100).',
        codeExample:
          '// Example 1: What is 15% of 80?\n(15 / 100) * 80 = 12\n\n// Example 2: 25 is what percentage of 200?\n(25 / 200) * 100 = 12.5%',
      },
      {
        heading: 'Calculating Percentage Increase and Decrease',
        content:
          'Percentage change measures the relative difference between an original value and a new value. The formula is: ((New Value - Original Value) / Original Value) * 100. If the result is positive, it represents an increase; if negative, it represents a decrease.',
        codeExample:
          '// Example: An item price goes from $50 to $65\n((65 - 50) / 50) * 100 = (15 / 50) * 100 = 30% increase',
      },
      {
        heading: 'Discounts and Retail Markups',
        content:
          'To calculate a final price after a discount: Final Price = Original Price * (1 - Discount Percentage / 100). A $120 jacket with a 25% discount costs: $120 * (1 - 0.25) = $120 * 0.75 = $90.',
      },
    ],
    steps: [
      {
        title: 'Select the Calculation Mode',
        detail:
          'Open the Percentage Calculator and choose whether you want to find a percentage of a number, calculate percentage change, or find what percent X is of Y.',
      },
      {
        title: 'Input Your Values',
        detail:
          'Enter the initial number and target value into the appropriate fields.',
      },
      {
        title: 'Review the Calculation',
        detail:
          'The exact answer is calculated instantly with step-by-step mathematical breakdowns.',
      },
    ],
    commonMistakes: [
      'Confusing percentage points with percentage change: an increase from 10% to 15% is an increase of 5 percentage points, but a 50% relative increase.',
      'Dividing by the new value instead of the original value when calculating percentage change.',
      'Applying successive discounts incorrectly: two consecutive 20% discounts equal a 36% discount, not a 40% discount.',
    ],
    faq: [
      {
        question: 'Why are consecutive discounts not simply added together?',
        answer:
          'The second discount applies to the already-reduced price, not the original starting price. For example, $100 discounted by 20% is $80; 20% off $80 is $16, resulting in a final price of $64 (a total discount of 36%).',
      },
      {
        question: 'Can percentages exceed 100%?',
        answer:
          'Yes. Any quantity that is greater than the base value represents a percentage over 100%. For example, 250 is 250% of 100.',
      },
    ],
    relatedToolSlugs: ['percentage-calculator', 'age-calculator'],
  },
  {
    slug: 'how-browser-based-tools-protect-privacy',
    title: 'How Browser-Based Online Tools Protect Your Data Privacy',
    description:
      'Discover how client-side web technologies keep your sensitive documents, images, and text secure directly on your device.',
    updatedDate: '2026-09-21',
    introduction:
      'When you use an online tool to format a JSON configuration containing secrets or compress a personal photo, where does your data go? On traditional utility sites, your data is uploaded to remote cloud servers. Browser-based client-side tools provide an entirely different architecture centered around local device execution.',
    sections: [
      {
        heading: 'Client-Side vs Server-Side Architecture',
        content:
          'Server-side tools require your browser to upload your payload over the internet via HTTP POST. A remote server receives the data, processes it with backend code (e.g., Python, PHP, Java), writes temporary files to disk, and sends the result back. If that server is compromised, logged, or insecure, your data is exposed.',
      },
      {
        heading: 'How Client-Side Tools Work',
        content:
          'In a client-side architecture (like ToolNova), the website only downloads static HTML, CSS, and JavaScript files to your browser once. All processing happens inside your browser sandbox using native browser APIs such as JSON.parse(), CanvasRenderingContext2D, and Web Crypto. No input data ever leaves your device.',
      },
      {
        heading: 'How to Verify Client-Side Execution Yourself',
        content:
          'You can verify that a tool runs client-side using standard developer tools built into Chrome, Firefox, Safari, or Edge:',
        tips: [
          'Press F12 to open Developer Tools and select the "Network" tab.',
          'Type text or upload an image in the tool and execute the action.',
          'Notice that no outgoing POST or upload requests are dispatched to external servers.',
          'You can even turn on Airplane Mode / disconnect your Wi-Fi after loading the page, and the tool will continue working flawlessly!',
        ],
      },
    ],
    steps: [
      {
        title: 'Load the Tool Page',
        detail:
          'Navigate to any client-side tool on ToolNova. The lightweight JavaScript bundle loads into your browser cache.',
      },
      {
        title: 'Work Securely Offline or Online',
        detail:
          'Paste confidential text, format JSON with tokens, or compress private images with complete confidence.',
      },
      {
        title: 'Export Locally',
        detail:
          'Copy or download your results directly from volatile browser memory to your disk.',
      },
    ],
    commonMistakes: [
      'Assuming all online tools without accounts are private: many traditional sites quietly log all inputs on their servers.',
      'Failing to verify SSL/TLS encryption (the padlock in the browser address bar) before loading web tools.',
      'Keeping sensitive information in shared public browser sessions without clearing browser history or local storage afterwards.',
    ],
    faq: [
      {
        question: 'Will ToolNova tools work without an active internet connection?',
        answer:
          'Once the tool page has finished loading in your browser, the computation runs locally. You can disconnect your internet and the tools will still process your inputs.',
      },
      {
        question: 'Do client-side tools use my computer resources?',
        answer:
          'Yes, operations like image compression use your local device CPU and GPU, which is why local tools are fast and have no cloud waiting queues.',
      },
    ],
    relatedToolSlugs: ['json-formatter', 'image-compressor', 'qr-generator'],
  },
  {
    slug: 'how-to-convert-text-case',
    title: 'How to Convert Text Case: From camelCase to snake_case and Title Case',
    description:
      'Learn the rules of common capitalization formats, when to use each, and how to convert text instantly.',
    updatedDate: '2026-09-25',
    introduction:
      'Capitalization styles serve different roles across software development, digital publishing, copywriting, and data normalization. Understanding standard conventions like camelCase, snake_case, Title Case, and Sentence case prevents bugs and ensures clean typographic consistency.',
    sections: [
      {
        heading: 'Programming Casing Conventions',
        content:
          'Software programming languages enforce strict naming conventions to keep code readable. For instance, JavaScript and TypeScript conventionally use camelCase for variables and functions (e.g., calculateTotalAmount), while Python and SQL prefer snake_case (e.g., calculate_total_amount). Web URLs and CSS classes rely on kebab-case (e.g., total-amount-display) to avoid issues with space encoding.',
        codeExample:
          '// camelCase (JavaScript, TypeScript, Java)\nconst userAccountStatus = "active";\n\n// snake_case (Python, Ruby, SQL)\nuser_account_status = "active"\n\n// kebab-case (URLs, CSS, HTML)\n.user-account-status { color: green; }',
      },
      {
        heading: 'Editorial and Publishing Casing',
        content:
          'In editorial work, Title Case is standard for book titles, article headlines, and email subject lines, capitalizing major words while keeping minor words (like "and", "in", "of") lowercase. Sentence case capitalizes only the first word of a sentence and proper nouns, which is commonly used for modern web user interfaces and technical documentation.',
        tips: [
          'Use Title Case for main website page headers and blog post titles.',
          'Use Sentence case for buttons, tooltips, and form input labels.',
          'Use UPPERCASE sparingly for acronyms (JSON, API, URL) or short legal notices.',
        ],
      },
    ],
    steps: [
      {
        title: 'Input Your Text',
        detail:
          'Type or paste your text snippet into the Case Converter editor.',
      },
      {
        title: 'Select Desired Style',
        detail:
          'Click the button corresponding to your target format (such as camelCase, Title Case, or snake_case).',
      },
      {
        title: 'Copy Converted Result',
        detail:
          'The transformed text appears instantly in the result box ready for copying with a single click.',
      },
    ],
    commonMistakes: [
      'Pasting rich text that contains smart punctuation (curly quotes) into programming identifiers.',
      'Assuming acronyms stay uppercase in camelCase (e.g., parseJson vs parseJSON).',
      'Over-capitalizing prepositions and conjunctions in Title Case headlines.',
    ],
    faq: [
      {
        question: 'Does converting case alter punctuation or numbers?',
        answer:
          'Punctuation is preserved in natural writing styles (Sentence case, Title Case) and normalized into word boundaries when generating code identifiers (camelCase, snake_case).',
      },
      {
        question: 'Can Case Converter handle international accented letters?',
        answer:
          'Yes. Unicode characters such as é, ñ, and ü are transformed correctly according to standard language casing rules.',
      },
    ],
    relatedToolSlugs: ['case-converter', 'word-counter'],
  },
  {
    slug: 'static-vs-dynamic-qr-codes',
    title: 'Static vs Dynamic QR Codes: Differences, Lifespans, and Scannability',
    description:
      'Understand the key differences between static and dynamic QR codes, expiration risks, and testing guidelines.',
    updatedDate: '2026-09-25',
    introduction:
      'QR codes are used everywhere from product packaging and menus to trade show badges and Wi-Fi access cards. However, many users do not realize there is a critical distinction between static QR codes and dynamic QR codes.',
    sections: [
      {
        heading: 'What is a Static QR Code?',
        content:
          'A static QR code encodes your data directly into the matrix of black-and-white modules. When a smartphone scans a static QR code, the camera reads the payload directly from the pattern itself without routing through an intermediary server. Because there is no middleman, static QR codes never expire, cannot be remotely shut down, and carry no monthly subscription fees.',
      },
      {
        heading: 'What is a Dynamic QR Code?',
        content:
          'A dynamic QR code encodes a short tracking URL that redirects the user to the final destination. This allows the creator to edit the destination link later or collect scan analytics. However, if the service hosting that redirect shuts down, charges a fee, or experiences downtime, the printed QR code permanently stops working.',
        tips: [
          'For permanent printing (business cards, signs, packaging), static QR codes are the most reliable option.',
          'Always verify that the destination URL in a static QR code is correct and uses HTTPS before mass-printing.',
          'A static QR code itself never expires, but remember that the website it points to must remain hosted and active.',
        ],
      },
    ],
    steps: [
      {
        title: 'Choose Your Data Type',
        detail:
          'Select whether to encode a web link, text message, or Wi-Fi login credentials in ToolNova QR Generator.',
      },
      {
        title: 'Verify the Content',
        detail:
          'Double-check URLs for typos and test that Wi-Fi passwords match your router settings.',
      },
      {
        title: 'Test With Multiple Devices',
        detail:
          'Scan the on-screen preview with both iPhone and Android cameras before downloading.',
      },
      {
        title: 'Print With Adequate Margin',
        detail:
          'Ensure printed codes have a minimum 2x2 cm size and a clear "quiet zone" border around all sides.',
      },
    ],
    commonMistakes: [
      'Inverting colors (white modules on black background), which many hardware scanners fail to detect.',
      'Placing QR codes in high-glare surfaces or folds on printed packaging.',
      'Encoding overly long URLs with dozens of tracking parameters, creating a dense pattern that is difficult to scan.',
    ],
    faq: [
      {
        question: 'Will a static QR code stop working if ToolNova changes in the future?',
        answer:
          'No. The QR code contains only your data and does not redirect through ToolNova. As long as the destination URL or Wi-Fi password remains valid, the QR code functions indefinitely.',
      },
      {
        question: 'Can I edit the destination of a static QR code after printing?',
        answer:
          'No. Because the data is permanently encoded into the physical pattern, you must generate and print a new QR code to change the content.',
      },
    ],
    relatedToolSlugs: ['qr-generator'],
  },
  {
    slug: 'how-to-calculate-age-from-date',
    title: 'How to Calculate Exact Age From Date of Birth: Calendar Math Explained',
    description:
      'Explore the mathematics of chronological age, Gregorian calendar adjustments, leap years, and milestone dates.',
    updatedDate: '2026-09-25',
    introduction:
      'Determining someone\'s exact chronological age seems simple at first glance, but calendar mathematics is surprisingly nuanced. Because months have different lengths and leap years introduce an extra day every four years, exact date arithmetic requires structured calculation.',
    sections: [
      {
        heading: 'Chronological Age vs Simple Year Subtraction',
        content:
          'Subtracting the birth year from the current calendar year only tells you the age a person will reach in the current year, not their actual age today. Until the exact birth date arrives, the person is still one year younger. True chronological age measures completed years, months, and days.',
      },
      {
        heading: 'How Date Borrowing Works',
        content:
          'When subtracting birth dates where the current day of the month is smaller than the birth day, days must be borrowed from the preceding month. Because different months span 28, 29, 30, or 31 days, the number of borrowed days varies depending on the specific calendar month.',
        codeExample:
          '// Example:\n// Today: September 25, 2026\n// Born: November 30, 2000\n// Years: 25 years (since Nov 30 has not occurred yet in 2026)\n// Months: 9 months\n// Days: 26 days',
      },
    ],
    steps: [
      {
        title: 'Select Birth Date',
        detail:
          'Open the ToolNova Age Calculator and pick your exact date of birth.',
      },
      {
        title: 'Review Breakdown',
        detail:
          'The tool automatically computes completed years, months, days, and total days lived.',
      },
      {
        title: 'Check Milestone Milestones',
        detail:
          'See cumulative statistics useful for school admissions, legal verification, or anniversary planning.',
      },
    ],
    commonMistakes: [
      'Multiplying age in years by 365, which ignores leap days accumulated over decades.',
      'Assuming all months have 30 days when calculating partial-month differences.',
      'Failing to account for time zones when calculating age across international boundaries.',
    ],
    faq: [
      {
        question: 'How are leap years handled for February 29 birthdays?',
        answer:
          'In non-leap years, people born on February 29 commonly celebrate their birthday on either February 28 or March 1 depending on legal jurisdiction.',
      },
      {
        question: 'Can this tool calculate elapsed time for contracts or historical events?',
        answer:
          'Yes. You can enter any past date to find the exact elapsed time in years, months, and days up to today.',
      },
    ],
    relatedToolSlugs: ['age-calculator', 'percentage-calculator'],
  },
  {
    slug: 'metric-vs-imperial-units',
    title: 'Metric vs Imperial Units: How Measurement Conversions Work',
    description:
      'A comprehensive guide to international measurement systems, standard conversion factors, and affine temperature conversions.',
    updatedDate: '2026-09-25',
    introduction:
      'Navigating between the Metric system (SI) and the Imperial / US Customary system is an essential everyday skill for cooking, traveling, construction, and engineering. Understanding standard conversion constants and temperature zero offsets ensures accurate results.',
    sections: [
      {
        heading: 'The Metric System (SI): Decimal Simplicity',
        content:
          'The International System of Units (SI) is based on decimal powers of 10. Prefixes like kilo- (1,000), centi- (1/100), and milli- (1/1,000) make scaling between units intuitive. 1,000 meters equal 1 kilometer, and 1,000 grams equal 1 kilogram.',
      },
      {
        heading: 'Imperial and US Customary Units',
        content:
          'The Imperial and US Customary systems evolved historically from trade and human-scale references (e.g., a foot was originally based on human foot length). Relationships are non-decimal: 12 inches per foot, 3 feet per yard, 1,760 yards per mile, and 16 ounces per pound.',
      },
      {
        heading: 'Key Conversion Benchmarks',
        content:
          'The following international constants define modern conversions:',
        tips: [
          'Length: 1 inch is defined internationally as exactly 2.54 centimeters.',
          'Distance: 1 mile is approximately 1.60934 kilometers; 1 kilometer is ~0.621371 miles.',
          'Weight: 1 kilogram is approximately 2.20462 pounds; 1 pound is ~453.592 grams.',
          'Temperature: 0°C is 32°F; 100°C is 212°F; the formula is °F = (°C × 9/5) + 32.',
        ],
      },
    ],
    steps: [
      {
        title: 'Choose Measurement Category',
        detail:
          'Select Length, Weight, Temperature, or Digital Data in ToolNova Unit Converter.',
      },
      {
        title: 'Set Source and Target Units',
        detail:
          'Pick your current unit in "From" and desired output in "To".',
      },
      {
        title: 'Enter Amount',
        detail:
          'Type the numeric value to see the converted result update in real time.',
      },
    ],
    commonMistakes: [
      'Applying linear multipliers to temperature conversions instead of affine formulas with zero-point offsets.',
      'Confusing fluid ounces (volume) with dry weight ounces (mass).',
      'Confusing decimal data units (MB = 1,000 KB) with binary units (MiB = 1,024 KiB).',
    ],
    faq: [
      {
        question: 'Why do Celsius and Fahrenheit have different formulas?',
        answer:
          'Celsius and Fahrenheit have different zero points and degree step sizes. Celsius sets zero at the freezing point of water, while Fahrenheit sets zero at the freezing point of a brine solution.',
      },
      {
        question: 'Are conversion results rounded?',
        answer:
          'ToolNova displays results up to six decimal places, providing high accuracy for everyday, academic, and practical tasks.',
      },
    ],
    relatedToolSlugs: ['unit-converter'],
  },
];

export function getGuideBySlug(slug: string): GuideDefinition | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

export function getGuidesByToolSlug(toolSlug: string, limit = 3): GuideDefinition[] {
  return GUIDES.filter((guide) => guide.relatedToolSlugs.includes(toolSlug)).slice(0, limit);
}

export function getGuidesByCategory(category: string, limit = 4): GuideDefinition[] {
  const categoryMap: Record<string, string[]> = {
    text: ['word-counter', 'case-converter'],
    developer: ['json-formatter', 'json-validator'],
    image: ['image-compressor', 'image-resizer'],
    calculator: ['percentage-calculator', 'age-calculator'],
    qr: ['qr-generator'],
    converter: ['unit-converter'],
  };
  const tools = categoryMap[category] ?? [];
  return GUIDES.filter((guide) =>
    guide.relatedToolSlugs.some((t) => tools.includes(t))
  ).slice(0, limit);
}
