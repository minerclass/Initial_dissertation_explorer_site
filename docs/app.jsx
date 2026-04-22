const { useState } = React;

const COLORS = {
  bg: "#0f1117",
  surface: "#181b24",
  surfaceHover: "#1e2230",
  border: "#2a2e3b",
  borderAccent: "#3d4258",
  text: "#e8e9ed",
  textMuted: "#8b8fa3",
  textDim: "#5c6078",
  noetic: "#e07a5f",
  rhetorical: "#81b29a",
  existential: "#f2cc8f",
  infrastructural: "#7289da",
  accent: "#c9a87c",
  accentDim: "#8a7455",
  qual: "#81b29a",
  quan: "#7289da",
  ai: "#e07a5f",
};

const FONTS = {
  display: "'Playfair Display', Georgia, serif",
  body: "'Source Sans 3', 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
};

const dimensions = [
  {
    key: "noetic",
    label: "Noetic",
    color: COLORS.noetic,
    desc: "Cognitive struggle and productive difficulty",
    icon: "[N]",
    detail:
      "Measures the frequency and intentionality of cognitive struggle-preserving practices: requiring drafting before AI use, mandating retrieval practice, designing productive failure tasks.",
  },
  {
    key: "rhetorical",
    label: "Rhetorical",
    color: COLORS.rhetorical,
    desc: "Engagement with real audiences",
    icon: "[R]",
    detail:
      "Captures practices that require engagement with real audiences: peer review, public presentation, authentic audience writing assignments.",
  },
  {
    key: "existential",
    label: "Existential",
    color: COLORS.existential,
    desc: "Intellectual ownership and authorial stance",
    icon: "[E]",
    detail:
      "Assesses practices requiring intellectual ownership: oral defense of written work, revision based on personal investment, authorial stance requirements.",
  },
  {
    key: "infrastructural",
    label: "Infrastructural",
    color: COLORS.infrastructural,
    desc: "Policy and institutional conditions",
    icon: "[I]",
    detail:
      "Evaluates perceived institutional support: written AI policy, PD opportunities, administrator messaging, assessment redesign support.",
  },
];

const litDomains = [
  {
    id: "media",
    title: "Media Archaeology & Ecology",
    icon: "[M]",
    color: COLORS.rhetorical,
    theorists: ["Ong", "Kittler", "Ernst", "Parikka", "Huhtamo", "Foucault", "Bolter & Grusin"],
    concepts: ["Tertiary Algorithmicity", "From Orality to Digital", "Materiality of Media", "Remediation", "The Archive as Process"],
    connection:
      "Establishes the historical and materialist depth of how communication technologies restructure consciousness and circulation, moving beyond human authorship.",
    frameworkDim: "rhetorical",
  },
  {
    id: "technoskepticism",
    title: "Technoskepticism & Surveillance",
    icon: "[S]",
    color: COLORS.existential,
    theorists: ["Postman", "Zuboff", "Turkle", "Carr", "Haidt", "Birkerts", "Illich"],
    concepts: ["Surveillance Capitalism", "The Shallows / Cognitive Costs", "Behavioral Modification", "Loss of Human Agency", "Frictionless Risks"],
    connection:
      "Provides the critical lens to examine the trade-offs of frictionless AI convenience, advocating for the preservation of cognitive struggle.",
    frameworkDim: "existential",
  },
  {
    id: "learning",
    title: "Cognitive & Learning Theories",
    icon: "[L]",
    color: COLORS.noetic,
    theorists: ["Dewey", "Vygotsky", "Piaget", "Papert", "Sweller", "Siemens", "Hattie"],
    concepts: ["Constructivism vs. Constructionism", "Cognitive Load Theory", "Connectivism", "Productive Failure", "Visible Learning"],
    connection:
      "Grounds the framework in established learning sciences, proving that resistance and desirable difficulties are prerequisites for durable learning.",
    frameworkDim: "noetic",
  },
  {
    id: "literacy",
    title: "Critical Media Literacy & Pedagogy",
    icon: "[P]",
    color: COLORS.infrastructural,
    theorists: ["Freire", "Buckingham", "Kellner & Share", "Jenkins", "ISTE"],
    concepts: ["Subversive Teaching", "Participatory Culture", "Digital Citizenship", "C.O.R.E. & H.E.A.R.T.", "Algorithmic Awareness"],
    connection:
      "Operationalizes the theoretical concerns into actionable pedagogical strategies, empowering students to navigate and critique AI systems.",
    frameworkDim: "infrastructural",
  },
];

const participants = [
  { group: "University Students", n: 4, criteria: "Currently enrolled; have used GenAI; can reflect on K-12", rq: "RQ1", dims: ["noetic", "rhetorical", "existential"], pair: "Pair 1 - Learner Perspective" },
  { group: "K-12 Teachers", n: 4, criteria: "Varied content areas, grade bands, poverty levels", rq: "RQ1, RQ2", dims: ["noetic", "rhetorical", "existential", "infrastructural"], pair: "Pair 2 - Practitioner/Leader" },
  { group: "Building Administrators", n: "1-2", criteria: "Principals/APs at schools with varying AI policy maturity", rq: "RQ2, RQ3", dims: ["infrastructural"], pair: "Pair 2 - Practitioner/Leader" },
  { group: "District Leaders", n: 2, criteria: "Curriculum, technology, or superintendent roles", rq: "RQ2, RQ3", dims: ["infrastructural"], pair: "Pair 2 - Practitioner/Leader" },
];

const phases = [
  {
    num: 1,
    title: "Concurrent Data Collection",
    desc: "Interviews, card sort, survey distribution, secondary data compilation",
    color: COLORS.accent,
    items: ["Semi-structured interviews (all groups)", "Card sort protocol (teachers & students)", "Teacher survey distribution (N=50-100)", "SPP & RAND secondary data compilation"],
  },
  {
    num: 2,
    title: "Independent Analysis",
    desc: "Strand-appropriate methods applied separately",
    color: COLORS.qual,
    items: ["Thematic coding via PFF lens (a priori + emergent)", "Descriptive statistics & disaggregation", "Cross-tabulation by poverty level", "Cronbach's alpha for survey scales"],
  },
  {
    num: 3,
    title: "Integration",
    desc: "Joint displays comparing qualitative themes with quantitative patterns",
    color: COLORS.quan,
    items: ["Joint display construction by RQ", "Convergence/divergence documentation", "Narrative integration (Chapter 5)", "Meta-inference development"],
  },
  {
    num: 4,
    title: "AI Comparison",
    desc: "Supplementary strand testing framework claims",
    color: COLORS.ai,
    items: ["3 platforms x 4 roles = 12 response sets", "Same codebook applied to AI outputs", "5-indicator structured comparison", "Presentational separation from human data"],
  },
];

const rqs = [
  {
    id: "RQ1",
    text: "How do K-12 teachers and university students understand and navigate the friction-reducing affordances of generative AI in academic work?",
    qual: "Teacher & student interviews; card sort protocol",
    quan: "Teacher survey (friction practices scale)",
    integration: "Survey patterns explained by interview narratives",
    color: COLORS.noetic,
  },
  {
    id: "RQ2",
    text: "What institutional conditions, including policy, assessment design, PD, and leadership disposition, enable or constrain friction-preserving pedagogy?",
    qual: "Administrator & leader interviews; document analysis",
    quan: "SPP secondary data (policy/training gaps by poverty)",
    integration: "National structural patterns contextualized by local institutional accounts",
    color: COLORS.infrastructural,
  },
  {
    id: "RQ3",
    text: "How can the Pedagogical Friction Framework inform AI policy development in K-12 contexts?",
    qual: "Cross-case synthesis of friction-enabling conditions",
    quan: "Survey items on policy awareness and utility",
    integration: "Framework-informed policy recommendations grounded in both strands",
    color: COLORS.existential,
  },
  {
    id: "SAQ",
    text: "When agentic AI systems respond to the same protocols, how do their outputs differ structurally from human practitioner responses?",
    qual: "AI-generated interview & card sort responses",
    quan: "AI-generated survey responses",
    integration: "Structured comparison: human vs. AI discourse analysis",
    color: COLORS.ai,
  },
];

const aiIndicators = [
  { label: "Experiential Specificity", prediction: "AI will lack specific incidents, students, institutional moments", icon: "[1]" },
  { label: "Productive/Exclusionary Distinction", prediction: "AI will acknowledge in general terms but fail context-specific applications", icon: "[2]" },
  { label: "Institutional Memory", prediction: "AI will default to idealized institutional models", icon: "[3]" },
  { label: "Professional Uncertainty", prediction: "AI will resolve tensions prematurely with artificially clean conclusions", icon: "[4]" },
  { label: "Framework Dimension Coverage", prediction: "Exploratory - no directional prediction", icon: "[5]" },
];

const timeline = [
  { phase: "Mixed Methods Course", activities: "Draft plan, develop instruments, pilot protocol, begin IRB", timing: "Current semester", status: "active" },
  { phase: "Qualifying Paper", activities: "Complete 10-week QP; pass rubric evaluation", timing: "CCD 697", status: "upcoming" },
  { phase: "Proposal Development", activities: "Write Chapters 1-3; prepare defense; complete CITI", timing: "CCD 698 Term 1", status: "upcoming" },
  { phase: "Proposal Defense + IRB", activities: "Defend proposal; submit IRB/IRRB; receive approval", timing: "CCD 698 Term 1", status: "upcoming" },
  { phase: "Data Collection", activities: "Interviews, survey, secondary data, AI comparison protocol", timing: "CCD 698 Term 2", status: "upcoming" },
  { phase: "Analysis + Writing", activities: "Code qual data, analyze quan, integrate, write Ch. 4-5", timing: "CCD 698 Term 3", status: "upcoming" },
  { phase: "Defense", activities: "Submit full draft, defend, revisions within 90 days", timing: "CCD 698 T3 / 699", status: "upcoming" },
];

const deliverables = [
  { item: "Research plan document", section: "Overall Ch. 3 architecture", status: "in-progress" },
  { item: "Interview protocol with RQ mapping", section: "Section 3.3.1", status: "to-develop" },
  { item: "Card sort items with dimension mapping", section: "Section 3.3.2", status: "to-develop" },
  { item: "Survey instrument with pilot results", section: "Section 3.3.5", status: "to-develop" },
  { item: "SPP/RAND variable mapping", section: "Section 3.3.4", status: "pilot-complete" },
  { item: "Codebook (a priori codes)", section: "Section 3.4.1", status: "to-develop" },
  { item: "Integration strategy + joint display", section: "Section 3.4.3", status: "to-develop" },
  { item: "AI comparison protocol", section: "Section 3.5", status: "to-develop" },
  { item: "Positionality statement", section: "Section 3.6", status: "draft" },
  { item: "IRB application draft", section: "Section 3.7 + Appendices", status: "to-develop" },
];

const statusColors = {
  "in-progress": COLORS.existential,
  "to-develop": COLORS.textDim,
  "pilot-complete": COLORS.qual,
  draft: COLORS.accent,
};

const statusLabels = {
  "in-progress": "In Progress",
  "to-develop": "To Develop",
  "pilot-complete": "Pilot Complete",
  draft: "Draft",
};

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "literature", label: "Literature Map" },
  { id: "framework", label: "Framework" },
  { id: "rqs", label: "Research Questions" },
  { id: "design", label: "Design & Phases" },
  { id: "participants", label: "Participants" },
  { id: "ai", label: "AI Comparison" },
  { id: "timeline", label: "Timeline" },
  { id: "deliverables", label: "Deliverables" },
];

function Badge({ children, color }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 4,
        fontSize: 11,
        fontFamily: FONTS.mono,
        fontWeight: 500,
        background: `${color}22`,
        color,
        border: `1px solid ${color}44`,
        letterSpacing: "0.03em",
      }}
    >
      {children}
    </span>
  );
}

function Card({ children, style, onClick, hoverable }) {
  return (
    <div
      onClick={onClick}
      role={hoverable ? "button" : undefined}
      tabIndex={hoverable ? 0 : undefined}
      onKeyDown={(event) => {
        if (hoverable && onClick && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onClick(event);
        }
      }}
      className={hoverable ? "hoverable-card" : ""}
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 8,
        padding: 20,
        cursor: hoverable ? "pointer" : "default",
        transition: "all 0.2s ease",
        outline: "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function OverviewTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: 26, fontWeight: 700, color: COLORS.text, margin: "0 0 4px" }}>Pedagogical Friction in the Age of Generative AI</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.textMuted, margin: "0 0 16px", lineHeight: 1.5 }}>A Mixed-Methods Collective Instrumental Case Study</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {[
          { label: "Design", value: "QUAL + quan", sub: "Convergent Mixed Methods" },
          { label: "Methodology", value: "Case Study", sub: "Collective Instrumental (Stake)" },
          { label: "Participants", value: "12-14", sub: "4 groups, matched pairs" },
          { label: "Philosophy", value: "Pragmatism", sub: "Creswell & Plano Clark, 2018" },
        ].map((summary) => (
          <Card key={summary.label}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{summary.label}</div>
            <div style={{ fontFamily: FONTS.display, fontSize: 20, fontWeight: 700, color: COLORS.accent, marginBottom: 2 }}>{summary.value}</div>
            <div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textMuted }}>{summary.sub}</div>
          </Card>
        ))}
      </div>
      <Card>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Study Purpose</div>
        <p style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.text, lineHeight: 1.7, margin: 0 }}>
          Investigates how K-12 educators understand, navigate, and respond to the friction-reducing affordances of generative AI in academic work. Grounded in the original Pedagogical Friction Framework identifying four dimensions of resistance necessary for durable learning.
        </p>
      </Card>
      <Card>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Three Data Strands</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { label: "Qualitative (Dominant)", color: COLORS.qual, items: "Interviews, Card Sort, Document Analysis" },
            { label: "Quantitative", color: COLORS.quan, items: "SPP/RAND Secondary Data, Original Survey" },
            { label: "Supplementary AI Comparison", color: COLORS.ai, items: "3 Platforms x 4 Roles = 12 AI Response Sets" },
          ].map((strand) => (
            <div key={strand.label} style={{ flex: "1 1 180px", padding: 14, borderRadius: 6, border: `1px solid ${strand.color}33`, background: `${strand.color}0a` }}>
              <div style={{ fontFamily: FONTS.body, fontSize: 13, fontWeight: 600, color: strand.color, marginBottom: 6 }}>{strand.label}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textMuted }}>{strand.items}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function LiteratureTab() {
  const [activeDomain, setActiveDomain] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 700, color: COLORS.text, margin: "0 0 6px" }}>Literature Map & Theoretical Foundations</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textMuted, margin: 0, lineHeight: 1.5 }}>
          The dissertation bridges four scholarly domains. Click any domain to see how it connects to the Pedagogical Friction Framework.
        </p>
      </div>

      <Card style={{ background: "transparent", border: `1px solid ${COLORS.border}`, padding: 24 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16, textAlign: "center" }}>Theoretical Convergence</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 8 }}>
          {litDomains.map((domain, index) => (
            <div key={domain.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                type="button"
                onClick={() => setActiveDomain(activeDomain === domain.id ? null : domain.id)}
                aria-pressed={activeDomain === domain.id}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  background: activeDomain === domain.id ? `${domain.color}33` : `${domain.color}11`,
                  border: `1px solid ${activeDomain === domain.id ? domain.color : `${domain.color}44`}`,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: FONTS.body,
                  fontSize: 12,
                  fontWeight: 600,
                  color: domain.color,
                  whiteSpace: "nowrap",
                }}
              >
                {domain.icon} {domain.title.split(" ")[0]}
              </button>
              {index < litDomains.length - 1 && <span style={{ color: COLORS.textDim, fontSize: 16, fontFamily: FONTS.mono }}>+</span>}
            </div>
          ))}
          <span style={{ color: COLORS.textDim, fontSize: 16, fontFamily: FONTS.mono, margin: "0 4px" }}>&rarr;</span>
          <div style={{ padding: "6px 16px", borderRadius: 20, background: `${COLORS.accent}22`, border: `2px solid ${COLORS.accent}`, fontFamily: FONTS.display, fontSize: 13, fontWeight: 700, color: COLORS.accent, whiteSpace: "nowrap" }}>
            Pedagogical Friction
          </div>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
        {litDomains.map((domain) => {
          const isActive = activeDomain === domain.id;
          const dim = dimensions.find((entry) => entry.key === domain.frameworkDim);

          return (
            <Card
              key={domain.id}
              hoverable
              onClick={() => setActiveDomain(isActive ? null : domain.id)}
              style={{
                borderTop: `4px solid ${domain.color}`,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                ...(isActive ? { background: `${domain.color}08`, borderColor: domain.color } : {}),
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 26 }}>{domain.icon}</span>
                <div>
                  <h3 style={{ fontFamily: FONTS.display, fontSize: 17, fontWeight: 700, color: domain.color, margin: 0, lineHeight: 1.2 }}>{domain.title}</h3>
                  {dim && <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: dim.color, marginTop: 3, opacity: 0.8 }}>{dim.icon} {dim.label} Dimension</div>}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Key Theorists</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {domain.theorists.map((theorist) => (
                    <Badge key={theorist} color={domain.color}>{theorist}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Core Concepts</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {domain.concepts.map((concept) => (
                    <div key={concept} style={{ display: "flex", alignItems: "baseline", gap: 8, fontFamily: FONTS.body, fontSize: 13, color: COLORS.text, lineHeight: 1.5 }}>
                      <span style={{ color: domain.color, fontSize: 8, flexShrink: 0, position: "relative", top: -1 }}>*</span>
                      {concept}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: "auto", padding: 12, borderRadius: 6, background: `${domain.color}0d`, border: `1px solid ${domain.color}22` }}>
                <div style={{ fontFamily: FONTS.mono, fontSize: 10, fontWeight: 600, color: domain.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Framework Connection</div>
                <div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textMuted, lineHeight: 1.55 }}>{domain.connection}</div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Ong's Media Ecology - Extended by Miner</div>
        <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", paddingBottom: 4 }}>
          {[
            { label: "Primary Orality", sub: "Pre-literate", color: COLORS.textDim, original: true },
            { label: "Literacy", sub: "Print culture", color: COLORS.textDim, original: true },
            { label: "Secondary Orality", sub: "Broadcast media", color: COLORS.textMuted, original: true },
            { label: "Algorithmic Secondary Orality", sub: "Algorithms curate human content", color: COLORS.existential, original: false },
            { label: "Tertiary Algorithmicity", sub: "Algorithms generate & curate symbolic content", color: COLORS.noetic, original: false },
          ].map((stage, index, collection) => (
            <div key={stage.label} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <div style={{ padding: "8px 12px", borderRadius: 6, background: stage.original ? COLORS.surface : `${stage.color}11`, border: `1px solid ${stage.original ? COLORS.border : `${stage.color}44`}`, minWidth: 110, textAlign: "center" }}>
                <div style={{ fontFamily: FONTS.body, fontSize: 11, fontWeight: 600, color: stage.color, marginBottom: 2, lineHeight: 1.3 }}>{stage.label}</div>
                <div style={{ fontFamily: FONTS.body, fontSize: 10, color: COLORS.textDim, lineHeight: 1.3 }}>{stage.sub}</div>
                {!stage.original && <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: stage.color, marginTop: 4, opacity: 0.7 }}>MINER</div>}
              </div>
              {index < collection.length - 1 && <span style={{ color: COLORS.textDim, fontFamily: FONTS.mono, fontSize: 14, margin: "0 4px", flexShrink: 0 }}>&rarr;</span>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function FrameworkTab() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 700, color: COLORS.text, margin: "0 0 6px" }}>Pedagogical Friction Framework</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textMuted, margin: 0 }}>Four dimensions of resistance necessary for durable learning. Click a dimension for detail.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
        {dimensions.map((dimension) => (
          <Card
            key={dimension.key}
            hoverable
            onClick={() => setSelected(selected === dimension.key ? null : dimension.key)}
            style={{
              borderLeft: `3px solid ${dimension.color}`,
              ...(selected === dimension.key ? { background: `${dimension.color}11`, borderColor: dimension.color } : {}),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>{dimension.icon}</span>
              <span style={{ fontFamily: FONTS.display, fontSize: 18, fontWeight: 700, color: dimension.color }}>{dimension.label}</span>
            </div>
            <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textMuted, margin: 0, lineHeight: 1.5 }}>{dimension.desc}</p>
            {selected === dimension.key && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${dimension.color}33` }}>
                <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.text, margin: 0, lineHeight: 1.6 }}>{dimension.detail}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
      <Card>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Key Distinction</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200, padding: 14, borderRadius: 6, background: `${COLORS.qual}11`, border: `1px solid ${COLORS.qual}33` }}>
            <div style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 13, color: COLORS.qual, marginBottom: 4 }}>Productive Friction</div>
            <div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5 }}>Resistance that builds understanding. Desirable difficulty, productive failure, cognitive struggle that leads to durable learning.</div>
          </div>
          <div style={{ flex: 1, minWidth: 200, padding: 14, borderRadius: 6, background: `${COLORS.ai}11`, border: `1px solid ${COLORS.ai}33` }}>
            <div style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 13, color: COLORS.ai, marginBottom: 4 }}>Exclusionary Friction</div>
            <div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5 }}>Resistance that blocks access. Barriers rooted in inequity, institutional gatekeeping, or structural disadvantage.</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function RQsTab() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 700, color: COLORS.text, margin: 0 }}>Research Questions & Method Alignment</h2>
      {rqs.map((rq) => (
        <Card key={rq.id} hoverable onClick={() => setExpanded(expanded === rq.id ? null : rq.id)} style={{ borderLeft: `3px solid ${rq.color}` }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <Badge color={rq.color}>{rq.id}</Badge>
            <p style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.text, margin: 0, lineHeight: 1.6, flex: 1 }}>{rq.text}</p>
          </div>
          {expanded === rq.id && (
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
              {[
                { label: "Qualitative Data", value: rq.qual, color: COLORS.qual },
                { label: "Quantitative Data", value: rq.quan, color: COLORS.quan },
                { label: "Integration Point", value: rq.integration, color: COLORS.accent },
              ].map((cell) => (
                <div key={cell.label} style={{ padding: 12, borderRadius: 6, background: `${cell.color}0a`, border: `1px solid ${cell.color}22` }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: cell.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{cell.label}</div>
                  <div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5 }}>{cell.value}</div>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

function DesignTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 700, color: COLORS.text, margin: "0 0 4px" }}>Research Design Architecture</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textMuted, margin: "0 0 4px" }}>Convergent Mixed Methods within Collective Instrumental Case Study</p>
        <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
          <Badge color={COLORS.qual}>QUAL (dominant)</Badge>
          <Badge color={COLORS.quan}>quan</Badge>
          <Badge color={COLORS.ai}>AI supplementary</Badge>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {phases.map((phase, index) => (
          <div key={phase.num} style={{ display: "flex", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 40 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${phase.color}22`, border: `2px solid ${phase.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.mono, fontSize: 13, fontWeight: 600, color: phase.color, flexShrink: 0 }}>{phase.num}</div>
              {index < phases.length - 1 && <div style={{ width: 2, flex: 1, background: `linear-gradient(${phase.color}44, ${phases[index + 1].color}44)`, minHeight: 20 }} />}
            </div>
            <Card style={{ flex: 1, marginBottom: 14 }}>
              <div style={{ fontFamily: FONTS.display, fontSize: 16, fontWeight: 700, color: phase.color, marginBottom: 4 }}>{phase.title}</div>
              <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textMuted, margin: "0 0 10px" }}>{phase.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {phase.items.map((item) => (
                  <span key={item} style={{ fontFamily: FONTS.body, fontSize: 11, color: COLORS.text, background: `${phase.color}11`, border: `1px solid ${phase.color}22`, padding: "3px 8px", borderRadius: 4 }}>{item}</span>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

function ParticipantsTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h2 style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 700, color: COLORS.text, margin: 0 }}>Participants & Sampling</h2>
      {["Pair 1 - Learner Perspective", "Pair 2 - Practitioner/Leader"].map((pair) => (
        <div key={pair}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{pair}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {participants.filter((participant) => participant.pair === pair).map((participant) => (
              <Card key={participant.group}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: FONTS.display, fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>
                      {participant.group} <span style={{ fontFamily: FONTS.mono, fontSize: 13, color: COLORS.accent }}>N={participant.n}</span>
                    </div>
                    <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textMuted, margin: "0 0 8px" }}>{participant.criteria}</p>
                  </div>
                  <Badge color={COLORS.quan}>{participant.rq}</Badge>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {participant.dims.map((dimensionKey) => {
                    const dimension = dimensions.find((entry) => entry.key === dimensionKey);
                    return (
                      <Badge key={dimensionKey} color={dimension.color}>
                        {dimension.icon} {dimension.label}
                      </Badge>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
      <Card>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Sampling Strategy</div>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.text, margin: 0, lineHeight: 1.6 }}>Purposeful sampling (Patton, 2015) guided by maximum variation logic across role, content area, school poverty level, and AI policy maturity. Recruitment outside Beach Park District 3 to mitigate insider bias.</p>
      </Card>
    </div>
  );
}

function AITab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 700, color: COLORS.text, margin: "0 0 4px" }}>Supplementary AI Comparison Strand</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textMuted, margin: 0 }}>Testing the framework's claims about what AI-generated discourse lacks relative to practitioner knowledge grounded in lived experience.</p>
      </div>
      <Card>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Protocol Design</div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {["ChatGPT (Agent Mode)", "Google Gemini", "Anthropic Claude (Desktop)"].map((platform) => (
            <div key={platform} style={{ padding: "8px 14px", borderRadius: 6, background: `${COLORS.ai}11`, border: `1px solid ${COLORS.ai}33`, fontFamily: FONTS.mono, fontSize: 12, color: COLORS.ai }}>{platform}</div>
          ))}
        </div>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textMuted, margin: "12px 0 0", lineHeight: 1.5 }}>Each platform receives matched prompts for 4 human participant categories, generating 12 AI response sets for comparison with 12-14 human response sets.</p>
      </Card>
      <div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Five Comparison Indicators</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {aiIndicators.map((indicator) => (
            <Card key={indicator.label} style={{ borderLeft: `3px solid ${COLORS.ai}` }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{indicator.icon}</span>
                <div>
                  <div style={{ fontFamily: FONTS.body, fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>{indicator.label}</div>
                  <div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5 }}>
                    <span style={{ color: COLORS.ai, fontWeight: 500 }}>Predicted: </span>
                    {indicator.prediction}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Card>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Epistemological Status</div>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.text, margin: 0, lineHeight: 1.6 }}>
          AI outputs are <em>analytical artifacts</em>, not participant data. AI systems are not research subjects; their outputs are objects of analysis. Findings reflect specific model versions at a specific moment in time. The strand is illustrative, not definitive.
        </p>
      </Card>
    </div>
  );
}

function TimelineTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h2 style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 700, color: COLORS.text, margin: 0 }}>Anticipated Timeline</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {timeline.map((item, index) => (
          <div key={item.phase} style={{ display: "flex", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 40 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: item.status === "active" ? COLORS.accent : COLORS.border, border: `2px solid ${item.status === "active" ? COLORS.accent : COLORS.borderAccent}`, flexShrink: 0, boxShadow: item.status === "active" ? `0 0 8px ${COLORS.accent}44` : "none" }} />
              {index < timeline.length - 1 && <div style={{ width: 2, flex: 1, background: COLORS.border, minHeight: 20 }} />}
            </div>
            <Card style={{ flex: 1, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                <span style={{ fontFamily: FONTS.display, fontSize: 15, fontWeight: 700, color: item.status === "active" ? COLORS.accent : COLORS.text }}>{item.phase}</span>
                <Badge color={item.status === "active" ? COLORS.accent : COLORS.textDim}>{item.timing}</Badge>
              </div>
              <p style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textMuted, margin: 0 }}>{item.activities}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeliverablesTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h2 style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 700, color: COLORS.text, margin: 0 }}>Mixed Methods Course Deliverables</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {deliverables.map((deliverable) => (
          <Card key={`${deliverable.item}-${deliverable.section}`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontFamily: FONTS.body, fontSize: 14, fontWeight: 500, color: COLORS.text, marginBottom: 2 }}>{deliverable.item}</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textDim }}>Section: {deliverable.section}</div>
              </div>
              <Badge color={statusColors[deliverable.status]}>{statusLabels[deliverable.status]}</Badge>
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Progress Summary</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {Object.entries(statusLabels).map(([status, label]) => {
            const count = deliverables.filter((deliverable) => deliverable.status === status).length;
            return (
              <div key={status} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: statusColors[status] }} />
                <span style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textMuted }}>{label}: {count}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

const tabComponents = {
  overview: OverviewTab,
  literature: LiteratureTab,
  framework: FrameworkTab,
  rqs: RQsTab,
  design: DesignTab,
  participants: ParticipantsTab,
  ai: AITab,
  timeline: TimelineTab,
  deliverables: DeliverablesTab,
};

function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const ActiveComponent = tabComponents[activeTab];

  return (
    <div style={{ minHeight: "100vh", background: "transparent", fontFamily: FONTS.body, color: COLORS.text }}>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "24px 16px 48px" }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.accentDim, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 4 }}>Dissertation Research Plan</div>
          <div style={{ fontFamily: FONTS.display, fontSize: 20, fontWeight: 800, color: COLORS.accent }}>Micah J. Miner</div>
          <div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textDim }}>National Louis University | Ed.D. in Curriculum, Advocacy, and Policy | Spring 2026</div>
        </div>

        <div role="tablist" aria-label="Research plan sections" style={{ display: "flex", gap: 2, marginBottom: 24, overflowX: "auto", borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 0 }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              className="tab-button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "8px 14px",
                fontFamily: FONTS.body,
                fontSize: 12,
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? COLORS.accent : COLORS.textMuted,
                background: "transparent",
                border: "none",
                borderBottom: `2px solid ${activeTab === tab.id ? COLORS.accent : "transparent"}`,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
          <ActiveComponent />
        </div>

        <div style={{ marginTop: 32, paddingTop: 16, borderTop: `1px solid ${COLORS.border}`, fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, textAlign: "center" }}>
          Convergent Mixed Methods | Collective Instrumental Case Study | Pedagogical Friction Framework
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
