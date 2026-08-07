const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageBreak, Footer, Header, PageNumber
} = require("docx");

const EMER = "1F7A5C", EMER2 = "2FA37A", GOLD = "9C7E45", INK = "0B1512", GREY = "5B6B62", SAND = "F3EEE3";

const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const P = (t, opts = {}) => new Paragraph({ spacing: { after: 120, line: 276 }, children: [new TextRun({ text: t, ...opts })] });
const bullet = (t, bold) => new Paragraph({ numbering: { reference: "b", level: 0 }, spacing: { after: 60 }, children: bold ? [new TextRun({ text: bold, bold: true, color: INK }), new TextRun({ text: " — " + t })] : [new TextRun(t)] });
const num = (t, bold) => new Paragraph({ numbering: { reference: "n", level: 0 }, spacing: { after: 70 }, children: [new TextRun({ text: bold + ": ", bold: true, color: EMER }), new TextRun(t)] });

function img(path, type, w) {
  const h = Math.round(w * (type === "png" ? 281 : 278) / 500);
  return new ImageRun({ type, data: fs.readFileSync(path), transformation: { width: w, height: h },
    altText: { title: "Car", description: "City Drive fleet vehicle", name: "car" } });
}

// requirements table
const trow = (a, b, c, head) => new TableRow({ children: [
  [a, 4200], [b, 3360], [c, 1800]
].map(([txt, w], i) => new TableCell({
  width: { size: w, type: WidthType.DXA },
  shading: { fill: head ? EMER : (i === 2 ? SAND : "FFFFFF"), type: ShadingType.CLEAR },
  margins: { top: 70, bottom: 70, left: 120, right: 120 },
  verticalAlign: VerticalAlign.CENTER,
  borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "D9E2DC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "D9E2DC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "D9E2DC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "D9E2DC" } },
  children: [new Paragraph({ children: [new TextRun({ text: txt, bold: !!head, color: head ? "FFFFFF" : INK, size: head ? 19 : 19 })] })]
})) });

const reqTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [4200, 3360, 1800],
  rows: [
    trow("Requirement", "Where it lives", "Status", true),
    trow("Client registration / sign-up", "Web + app — name, email, address; logged-in state", "Built"),
    trow("Arabic & English (full RTL)", "All pages — AR-default toggle, Cairo/Tajawal fonts", "Built"),
    trow("AI assistant & smart notifications", "Chat widget + interest-based alerts, web & app", "Built"),
    trow("Real car photos (7 brands)", "Toyota, Nissan, Hyundai, Geely, Mercedes, BMW, Range Rover", "Built"),
    trow("8-step reserve-car flow", "Gated wizard: ID → licence → period → pay", "Built"),
    trow("Admin: add new car", "Operations CRM — validated modal form", "Built"),
    trow("Admin: add new staff member", "Operations CRM — role + access assignment", "Built"),
    trow("KNET / Visa / PayPal payment", "Reserve flow, step 8 (mock gateway)", "Demonstrated"),
    trow("Civil ID & licence verification", "Reserve flow, steps 2–3 (mock API)", "Demonstrated"),
  ]
});

const doc = new Document({
  numbering: { config: [
    { reference: "b", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { run: { color: EMER2 }, paragraph: { indent: { left: 480, hanging: 240 } } } }] },
    { reference: "n", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 480, hanging: 280 } } } }] },
  ] },
  styles: {
    default: { document: { run: { font: "Arial", size: 21, color: "23302A" } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Arial", color: EMER }, paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 23, bold: true, font: "Arial", color: INK }, paragraph: { spacing: { before: 180, after: 90 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1200, right: 1440, bottom: 1200, left: 1440 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
      new TextRun({ text: "City Drive · سيتي درايف   ·   Page ", size: 16, color: GREY }),
      new TextRun({ children: [PageNumber.CURRENT], size: 16, color: GREY })
    ] })] }) },
    children: [
      // COVER
      new Paragraph({ spacing: { before: 200, after: 0 }, children: [new TextRun({ text: "CITY DRIVE", bold: true, size: 56, color: EMER })] }),
      new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "سيتي درايف", bold: true, size: 36, color: GOLD })] }),
      new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "The Gulf's first AI-powered rental-car delivery service", size: 26, color: INK })] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "أول خدمة لتوصيل سيارات الإيجار بالذكاء الاصطناعي في الكويت والخليج", size: 20, color: GREY })] }),
      new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 10, color: EMER2, space: 1 } }, spacing: { after: 160 }, children: [] }),
      new Paragraph({ children: [
        new TextRun({ text: "Prepared for: ", bold: true, color: INK }), new TextRun({ text: "City Drive leadership\t", }),
      ], tabStops: [] }),
      new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: "Scope: ", bold: true, color: INK }), new TextRun("Client website · Operations CRM · Mobile app · Proposal")] }),
      new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: "Market: ", bold: true, color: INK }), new TextRun("Kuwait-first, GCC-ready · Currency KWD · KNET payments")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Status: ", bold: true, color: INK }), new TextRun("Interactive bilingual prototypes — ready to review")] }),

      new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [4680, 4680], rows: [new TableRow({ children: [
        new TableCell({ width: { size: 4680, type: WidthType.DXA }, borders: noBorder(), margins: { right: 80 }, children: [new Paragraph({ children: [img("assets/landcruiser.png", "png", 290)] })] }),
        new TableCell({ width: { size: 4680, type: WidthType.DXA }, borders: noBorder(), margins: { left: 80 }, children: [new Paragraph({ children: [img("assets/rangerover.jpg", "jpg", 290)] })] }),
      ] })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "Real fleet — Toyota Land Cruiser · Range Rover · Mercedes · BMW · Nissan · Hyundai · Geely", italics: true, size: 17, color: GREY })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // EXEC SUMMARY
      H1("Executive summary"),
      P("This proposal accompanies three working, interactive prototypes for City Drive — a Kuwait-based car-rental company built around one promise: the first AI-powered car-delivery experience in the Gulf. Members discover and book vehicles in Arabic or English, a smart assistant guides every step, and the car is delivered to their door."),
      P("Everything is clickable right now in a browser — no servers, accounts, or installation. The goal of this phase is to turn the idea into something tangible you can react to before committing to a full build."),

      H2("What's new in this version"),
      bullet("rebranded from the original concept to a Kuwait-first identity.", "City Drive"),
      bullet("full Arabic & English with true right-to-left layout, Arabic-first by default.", "Bilingual"),
      bullet("a 24/7 chat assistant plus interest-based notifications — the headline differentiator.", "AI assistant"),
      bullet("a complete 8-step booking journey from ID upload to KNET payment.", "Reserve flow"),
      bullet("managers can now add vehicles and staff through real validated forms.", "Admin"),
      bullet("the entire fleet now uses real photography across seven brands.", "Photos"),

      // PROTOTYPES
      H1("The three prototypes"),
      H2("1 · Client website"),
      P("The member-facing storefront. A cinematic hero tells the AI-delivery story, followed by a searchable, filterable fleet of real cars priced in KWD. Members register in one step (name, email, Kuwait address) and immediately move into a logged-in experience with rewards and an AI concierge."),
      new Paragraph({ spacing: { before: 40, after: 60 }, children: [img("assets/gle.jpg", "jpg", 300)] }),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "Mercedes GLE — one of the luxury models in the bilingual fleet grid.", italics: true, size: 17, color: GREY })] }),

      H2("2 · Mobile app"),
      P("A phone-framed preview of the planned native iOS and Android app: home, search, an AI assistant tab, notifications, registration, and the full reserve flow — all bilingual with RTL tab navigation."),

      H2("3 · Operations CRM"),
      P("The internal console, with role-based access for Manager, Accountant, and Support. Two new processes were added this round: a validated Add-vehicle form that registers a car into the live fleet, and an Add-staff form that creates a teammate with a role and access scope. Finance, bookings, and WhatsApp/SMS + AI engagement automations are all in KWD with Kuwaiti data."),

      // RESERVE FLOW
      H1("The reserve-car journey"),
      P("The core of the platform — a guided, gated 8-step flow that keeps the customer's documents secure and the rental compliant with Kuwait requirements:"),
      num("guests are prompted to register; only members can book.", "Account"),
      num("upload the National Civil ID (skipped if already on file).", "Civil ID"),
      num("upload a valid local driver licence; validity checked by number (mock API ready for the real PACI / licence integration).", "Licence"),
      num("choose the car and period — minimum 1 day (24h), maximum 3 months — with live pricing.", "Period"),
      num("total amount plus included features: full insurance, free delivery, 24/7 assistance, AI tracking.", "Summary"),
      num("scrollable Terms & Conditions with required agreement.", "Terms"),
      num("digital signature pad plus a selfie with licence and Civil ID.", "Verification"),
      num("KNET, Visa/Mastercard, or PayPal (mock gateway), then confirmation and an AI delivery notification.", "Payment"),

      new Paragraph({ children: [new PageBreak()] }),

      // AI + GULF
      H1("AI assistant & smart notifications"),
      bullet("recommends the right car, books it, and tracks delivery — in Arabic and English, on web and app.", "Chat assistant"),
      bullet("learns from activity and favourites to send timely offers (\"Based on your interest in SUVs…\").", "Notifications"),
      bullet("AI plans the fastest delivery route and gives a live arrival time to the customer's door.", "Smart delivery"),

      H1("Built for the Gulf"),
      bullet("Arabic-first interface with genuine right-to-left layout (not a flipped translation), Cairo & Tajawal typography sized for legibility.", "Culture"),
      bullet("KWD pricing, Kuwait governorates and cities, KNET as a first-class payment method.", "Local"),
      bullet("Civil ID and local-licence checks, age 21+ and licence-held rules reflected in the flow.", "Compliance"),
      bullet("security and insurance reassurances placed right at the decision points, as Gulf users expect.", "Trust"),

      new Paragraph({ spacing: { before: 40, after: 60 }, children: [img("assets/ioniq5.jpg", "jpg", 300)] }),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "Hyundai Ioniq 5 — the electric option, reflecting eco-forward demand.", italics: true, size: 17, color: GREY })] }),

      // MAP
      H1("How it maps to your requirements"),
      P("Every feature requested is represented. \"Built\" means interactive in the prototype; \"Demonstrated\" means the interface is complete with the underlying processing to be connected during production."),
      reqTable,

      // NEXT
      H1("Technical notes & next steps"),
      P("The prototypes are lightweight, self-contained HTML — no build step, no backend. All external services (Civil ID and licence verification, KNET/Visa/PayPal payment, notifications) are clearly marked mock functions, designed so a real backend can slot straight in."),
      bullet("connect identity (PACI / licence) and KNET payment gateways.", "Production phase 1"),
      bullet("add a real database for accounts, bookings, and fleet.", "Production phase 2"),
      bullet("replace prototype photography with owned/licensed imagery before launch.", "Production phase 3"),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Prototypes are illustrative: fleet, pricing, and member data are sample content, ready to swap once real identity and inventory are confirmed.", italics: true, size: 18, color: GREY })] }),
    ]
  }]
});

function noBorder() { const n = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }; return { top: n, bottom: n, left: n, right: n }; }

Packer.toBuffer(doc).then(b => { fs.writeFileSync("City-Drive-Proposal.docx", b); console.log("WROTE City-Drive-Proposal.docx", b.length, "bytes"); });
