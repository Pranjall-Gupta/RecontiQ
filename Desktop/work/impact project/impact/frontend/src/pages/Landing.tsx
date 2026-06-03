import { useState, useEffect } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  X,
  Upload,
  Search,
  Mail,
  Download,
  Shield,
  Clock,
  Lock,
  Users,
  TrendingUp,
  BarChart3,
  Zap,
  Globe,
  Rocket,
} from 'lucide-react'

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */

const navLinks = [
  { label: 'SmartRecon', href: '#reconciliation' },
  { label: 'ITCView', href: '#analytics' },
  { label: 'Enterprise', href: '#enterprise' },
  { label: 'Pricing', href: '#pricing' },
]

// trustedCompanies was removed (unused) to keep the codebase clean

const heroTabs = [
  { label: 'SmartRecon', dot: 'bg-orange-500' },
  { label: 'ITCView', dot: 'bg-emerald-500' },
  { label: 'RecontiqAPI', dot: 'bg-blue-500' },
]

// Recontiq logo component used in the header
export const RecontiqLogo = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <svg width="30" height="28" viewBox="0 0 30 28" fill="none" aria-hidden>
        <path d="M10 4L4 14L10 24" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 4L26 14L20 24" stroke="rgba(255,255,255,0.25)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="15" cy="14" r="2" fill="#4ade80" />
      </svg>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '16px',
          fontWeight: 500,
          color: '#ffffff',
          letterSpacing: '-0.03em',
        }}
      >
        Recontiq
      </span>
    </div>
)

const reconFeatures = [
  { icon: Upload, title: 'Upload', desc: 'Bring Excel, CSV, ERP exports, and downloaded GST portal files. Columns are mapped and data is cleaned automatically.' },
  { icon: Search, title: 'Match', desc: 'Compare invoice number, date, taxable value, CGST, SGST, IGST, and supplier GSTIN across registers.' },
  { icon: Mail, title: 'Follow-up', desc: 'Group vendor-pending invoices, draft supplier emails, track replies, and keep review notes beside each mismatch.' },
  { icon: Download, title: 'Export', desc: 'Download mismatch registers, ITC summaries, vendor reports, and review sheets your CA can use immediately.' },
]

const itcFeatures = [
  { icon: TrendingUp, title: 'ITC Tracking', desc: 'Monitor recoverable input tax credit across all GSTINs with period-wise breakdowns and trend analysis.' },
  { icon: Users, title: 'Vendor Scoring', desc: 'Score vendors by filing compliance, response rate, mismatch frequency, and credit impact over time.' },
  { icon: BarChart3, title: 'Workflows', desc: 'Handle complex multi-entity reconciliation flows, apply review gates, and connect securely to your existing systems.' },
]

const securityItems = [
  {
    title: 'Compliance',
    desc: 'We maintain strict controls over data access and processing aligned with Indian regulatory requirements.',
    icon: Shield,
  },
  {
    title: 'Audit Trail',
    desc: 'Every import, edit, comment, export, and status change remains traceable with complete history.',
    icon: Clock,
  },
  {
    title: 'Data Privacy',
    desc: 'Clear workspace boundaries for entities, GSTINs, teams, and monthly periods with encrypted storage.',
    icon: Lock,
  },
]

const plans = [
  {
    name: 'Starter',
    price: '₹9,999',
    per: '/month',
    desc: 'For a small finance team replacing spreadsheet-only reconciliation.',
    features: ['1 GSTIN workspace', '1,000 invoices/month', 'Excel and CSV imports', 'Mismatch register export', 'Email support'],
  },
  {
    name: 'Growth',
    price: '₹29,999',
    per: '/month',
    desc: 'For growing businesses reconciling multiple GSTINs with review ownership.',
    features: ['Up to 10 GSTINs', '10,000 invoices/month', 'Vendor follow-up tracker', 'Reviewer notes and assignments', 'Priority onboarding'],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    per: '',
    desc: 'For CA firms, enterprise groups, and teams with custom import and security needs.',
    features: ['Custom invoice volume', 'ERP import mapping', 'Dedicated workspaces', 'Advanced access controls', 'Dedicated success manager'],
  },
]

const faqs = [
  { q: 'Is RECONTIQ only for GSTR-2B reconciliation?', a: 'The first workflow is focused on GSTR-2B purchase reconciliation, ITC impact, and vendor follow-up. The structure also supports reports and review packs around that monthly process.' },
  { q: 'Can my team start without an ERP integration?', a: 'Yes. The product is designed to start with Excel, CSV, and downloaded GST files. ERP mapping can come later once your monthly process is stable.' },
  { q: 'What makes this better than Excel?', a: 'Excel can match rows, but it struggles with ownership, comments, vendor follow-up, approval status, audit trails, and repeatable monthly controls. RECONTIQ keeps those parts together.' },
  { q: 'Can CA firms use it for multiple clients?', a: 'Yes. The Enterprise plan is meant for separate client/entity workspaces with controlled access and reusable import mappings.' },
]

const updates = [
  { title: 'Introducing Smart Match v2', category: 'Product', date: 'May 15, 2025', gradient: 'from-orange-500/20 via-rose-500/20 to-purple-500/20' },
  { title: 'RECONTIQ for Multi-Entity Groups', category: 'Enterprise', date: 'Apr 28, 2025', gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20' },
  { title: 'New Vendor Follow-up Workflows', category: 'Product', date: 'Apr 10, 2025', gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20' },
]

const footerLinks: Record<string, string[]> = {
  Product: ['SmartRecon', 'ITCView', 'API', 'Pricing', 'Changelog'],
  Solutions: ['Finance Teams', 'CA Firms', 'Enterprise', 'Multi-Entity'],
  Resources: ['Documentation', 'Blog', 'Support', 'Status'],
  Company: ['About', 'Careers', 'Contact', 'Legal'],
}

/* ═══════════════════════════════════════════════════
   PRODUCT MOCKUP COMPONENTS (Premium glassmorphism)
   ═══════════════════════════════════════════════════ */

function SmartReconMockup() {
  const rows = [
    { name: 'Kaveri Textiles Pvt Ltd', gstin: '29AAECK9412H1ZK', inv: 'KT-2408', amt: '₹4,56,000', status: 'Matched', badge: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' },
    { name: 'Northline Foods', gstin: '27AAFCN5028B1ZU', inv: 'NF-1182', amt: '₹2,10,500', status: 'Tax diff', badge: 'bg-amber-500/20 text-amber-400 border border-amber-500/30' },
    { name: 'Apex Retail Services', gstin: '07AAGCA9941C1Z4', inv: 'AR-6021', amt: '₹89,200', status: 'Pending', badge: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' },
    { name: 'UrbanLedger Inc', gstin: '06AADCU4821M1ZP', inv: 'UL-3301', amt: '₹1,24,000', status: 'Matched', badge: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' },
  ]

  return (
      <div className="bg-gray-900/60 rounded-2xl border border-gray-800 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-gray-800 rounded-lg flex items-center justify-center text-orange-400 text-[11px] font-semibold font-mono">R</div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white font-sans">SmartRecon</span>
                <span className="text-[10px] text-white/40">›</span>
                <span className="text-[10px] text-white/40">April 2025</span>
              </div>
            </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <Search className="w-3 h-3 text-white/60" />
            </div>
            <div className="w-6 h-6 rounded-full bg-white/20 text-[10px] flex items-center justify-center font-medium text-white">N</div>
          </div>
        </div>

        <div className="flex">
          <div className="w-44 border-r border-white/10 py-3 px-2.5 space-y-0.5 hidden lg:block">
            {['Overview', 'Matched', 'Review', 'Vendors', 'Export'].map((item, i) => (
                <div key={item} className={`rounded-lg px-3 py-2 text-[11px] cursor-default ${i === 0 ? 'bg-white/10 font-medium text-white' : 'text-white/40'}`}>{item}</div>
            ))}
          </div>

          <div className="flex-1 p-4 min-w-0">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Matched', value: '2,196', color: 'text-emerald-400' },
                { label: 'Review', value: '137', color: 'text-amber-400' },
                { label: 'Pending', value: '85', color: 'text-blue-400' },
              ].map(s => (
                  <div key={s.label} className="bg-white/5 rounded-xl p-3 backdrop-blur-sm">
                    <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">{s.label}</span>
                    <p className={`text-xl font-bold mt-0.5 ${s.color}`}>{s.value}</p>
                  </div>
              ))}
            </div>

            <div className="border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-[11px]">
                <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-2.5 text-left text-white/40 font-medium">Supplier</th>
                  <th className="px-4 py-2.5 text-left text-white/40 font-medium hidden sm:table-cell">Invoice</th>
                  <th className="px-4 py-2.5 text-left text-white/40 font-medium">Amount</th>
                  <th className="px-4 py-2.5 text-right text-white/40 font-medium">Status</th>
                </tr>
                </thead>
                <tbody>
                {rows.map(row => (
                    <tr key={row.inv} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-2.5">
                        <p className="font-medium text-white">{row.name}</p>
                        <p className="text-[10px] text-white/40 font-mono mt-0.5">{row.gstin}</p>
                      </td>
                      <td className="px-4 py-2.5 text-white/60 hidden sm:table-cell">{row.inv}</td>
                      <td className="px-4 py-2.5 text-white/60 font-medium">{row.amt}</td>
                      <td className="px-4 py-2.5 text-right">
                        <span className={`${row.badge} px-2 py-0.5 rounded-full text-[10px] font-semibold`}>{row.status}</span>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  )
}

function ITCViewMockup() {
  return (
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">R</div>
            <span className="text-xs font-semibold text-white">ITCView</span>
            <span className="text-[10px] text-white/40">Q4 FY25</span>
          </div>
        </div>
        <div className="flex">
          <div className="w-44 border-r border-white/10 py-3 px-2.5 space-y-0.5 hidden lg:block">
            {['Dashboard', 'Credits', 'Vendors', 'Trends', 'Reports'].map((item, i) => (
                <div key={item} className={`rounded-lg px-3 py-2 text-[11px] cursor-default ${i === 0 ? 'bg-white/10 font-medium text-white' : 'text-white/40'}`}>{item}</div>
            ))}
          </div>
          <div className="flex-1 p-4 min-w-0">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Total ITC', value: '₹23.4L', sub: 'Eligible this quarter' },
                { label: 'At Risk', value: '₹4.8L', sub: 'Vendor non-filing' },
                { label: 'Recovered', value: '₹18.6L', sub: 'Claimed successfully' },
              ].map(s => (
                  <div key={s.label} className="bg-white/5 rounded-xl p-3 backdrop-blur-sm">
                    <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">{s.label}</span>
                    <p className="text-xl font-bold mt-0.5 text-white">{s.value}</p>
                    <span className="text-[10px] text-white/40">{s.sub}</span>
                  </div>
              ))}
            </div>
            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-medium text-white/60">Monthly ITC trend</span>
                <span className="text-[10px] text-white/40">Last 12 months</span>
              </div>
              <div className="flex items-end gap-1.5 h-24">
                {[35, 45, 55, 48, 62, 58, 72, 68, 78, 82, 76, 88].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-emerald-500 to-teal-400 transition-all hover:from-emerald-400" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[9px] text-white/30">Apr</span>
                <span className="text-[9px] text-white/30">Mar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

function APIPreview() {
  return (
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-white-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-white-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-white-400" />
          <span className="text-[10px] text-white/40 ml-3">recontiq-api.js</span>
        </div>
        <div className="p-5 font-mono text-[12px] leading-relaxed overflow-x-auto text-white/90">
          <div><span className="text-rose-400">import</span> {'{'} RecontiqClient {'}'} <span className="text-rose-400">from</span> <span className="text-emerald-400">"@recontiq/sdk"</span>;</div>
          <div className="mt-3"><span className="text-rose-400">const</span> client = <span className="text-rose-400">new</span> <span className="text-blue-400">RecontiqClient</span>({'{'} apiKey: <span className="text-emerald-400">"YOUR_API_KEY"</span> {'}'});</div>
          <div className="mt-3"><span className="text-rose-400">const</span> result = <span className="text-rose-400">await</span> client.<span className="text-blue-400">reconcile</span>({'{'}</div>
          <div className="ml-6">purchaseRegister: <span className="text-emerald-400">"register.xlsx"</span>,</div>
          <div className="ml-6">gstr2b: <span className="text-emerald-400">"gstr2b.json"</span>,</div>
          <div className="ml-6">period: <span className="text-emerald-400">"2025-04"</span>,</div>
          <div>{'}'});</div>
          <div className="mt-3 text-white/40">// result.matched    → 2,196</div>
          <div className="text-white/40">// result.mismatched → 137</div>
          <div className="text-white/40">// result.pending    → 85</div>
        </div>
      </div>
  )
}

/* ═══════════════════════════════════════════════════
   ANIMATED BACKGROUND COMPONENT (Mesh gradient + noise)
   ═══════════════════════════════════════════════════ */

function AnimatedBackground() {
  return (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
        {/* Subtle color blobs using transforms (less GPU-heavy than large blur filters) */}
        <div className="absolute top-0 -left-40 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply opacity-18 transform scale-110 animate-pulse-slow" />
        <div className="absolute top-0 -right-40 w-72 h-72 bg-emerald-600 rounded-full mix-blend-multiply opacity-18 transform scale-105 animate-pulse-slow animation-delay-2000" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply opacity-18 transform scale-115 animate-pulse-slow animation-delay-4000" />
        {/* Subtle noise texture (kept small) */}
        <div className="absolute inset-0 opacity-6 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      </div>
  )
}

/* ═══════════════════════════════════════════════════
   MAIN LANDING COMPONENT
   ═══════════════════════════════════════════════════ */

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
      <div className="min-h-screen bg-transparent text-white font-sans antialiased">
        <AnimatedBackground />

        {/* ═══ NAVIGATION (Glassmorphism) ═══ */}
        <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
              <a href="#" className="flex items-center gap-2.5 group">
                <RecontiqLogo />
              </a>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                  <a key={link.href} href={link.href} className="text-[14px] font-medium text-white/70 hover:text-white transition-colors relative group">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 transition-all group-hover:w-full" />
                  </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a href="/dashboard" className="text-[14px] font-medium text-white/70 hover:text-white transition-colors px-3 py-2">
                Log in
              </a>
              <a href="/dashboard" className="bg-gradient-to-r from-white to-white/90 text-gray-900 rounded-lg px-5 py-2 text-[14px] font-medium hover:shadow-lg transition-all">
                Sign up
              </a>
            </div>

            <button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {menuOpen && (
              <div className="md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 py-5">
                {navLinks.map(link => (
                    <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block py-3 text-base font-medium text-white/80 hover:text-white">
                      {link.label}
                    </a>
                ))}
                <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-4">
                  <a href="/dashboard" className="text-base text-white/70">Log in</a>
                  <a href="/dashboard" className="bg-white text-gray-900 rounded-lg px-5 py-2.5 text-base font-medium">Sign up</a>
                </div>
              </div>
          )}
        </header>

        <main className="relative z-10 pt-20">
          {/* ═══ HERO SECTION ═══ */}
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-bold tracking-tight bg-gradient-to-r from-white via-white to-orange-400 bg-clip-text text-transparent">
                    Bringing clarity <br />to every invoice
                  </h1>
                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
                    <a href="/dashboard" className="w-full sm:w-auto bg-gradient-to-r from-white to-white/90 text-gray-900 rounded-lg px-7 py-3.5 text-sm font-medium hover:shadow-xl transition-all flex items-center justify-center gap-2">
                      Start free trial <Rocket className="w-4 h-4" />
                    </a>
                    <a href="#pricing" className="w-full sm:w-auto border border-white/20 rounded-lg px-7 py-3.5 text-sm font-medium text-white/80 hover:bg-white/10 transition-colors text-center">
                      Contact sales
                    </a>
                  </div>
                </div>
                <div className="lg:pt-6">
                  <p className="text-lg text-white/60 leading-relaxed">
                    Powering the best finance teams, CA firms, and enterprises. From SmartRecon for purchase matching,
                    ITCView for credit analytics, to the leading GST reconciliation platform.
                  </p>
                  <div className="mt-8 flex gap-6">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-white/50">99.9% SLA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-white/50">ISO 27001</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs + Mockup */}
              <div className="mt-16 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                <div className="flex border-b border-white/10">
                  {heroTabs.map((tab, i) => (
                      <button
                          key={tab.label}
                          onClick={() => setActiveTab(i)}
                          className={`flex-1 flex items-center justify-center gap-2.5 py-4 text-sm font-medium transition-all ${
                              activeTab === i
                                  ? 'border-b-2 border-white text-white bg-white/5'
                                  : 'text-white/40 hover:text-white/70 border-b-2 border-transparent'
                          }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${tab.dot}`} />
                        {tab.label}
                      </button>
                  ))}
                </div>
                <div className="p-4 md:p-6">
                  {activeTab === 0 && <SmartReconMockup />}
                  {activeTab === 1 && <ITCViewMockup />}
                  {activeTab === 2 && <APIPreview />}
                </div>
              </div>
            </div>
          </section>

           {/* ═══ AI FEATURES - GRILL ANIMATION ═══ */}
           <section className="py-24 border-y border-white/5 bg-black/20 backdrop-blur-sm">
             <div className="max-w-7xl mx-auto px-6">
               <p className="text-sm text-white/40 font-medium tracking-widest text-center mb-16 uppercase">Intelligent automation at scale</p>
               <div className="relative overflow-hidden">
                 <div className="flex gap-20 animate-scroll-row">
                   {[
                     'Smart invoice matching',
                     'Risk scoring engine',
                     'Fraud ring detection',
                     'Predictive ITC optimization',
                     'Agentic workflow automation',
                   ].map((item) => (
                       <div
                         key={item}
                         className="flex-shrink-0 py-12 px-8"
                       >
                         <p className="text-2xl font-semibold text-white/80 whitespace-nowrap">
                           {item}
                         </p>
                       </div>
                   ))}
                   {/* Duplicate for seamless loop */}
                   {[
                     'Smart invoice matching',
                     'Risk scoring engine',
                     'Fraud ring detection',
                     'Predictive ITC optimization',
                     'Agentic workflow automation',
                   ].map((item) => (
                       <div
                         key={item + '-copy'}
                         className="flex-shrink-0 py-12 px-8"
                       >
                         <p className="text-2xl font-semibold text-white/80 whitespace-nowrap">
                           {item}
                         </p>
                       </div>
                   ))}
                 </div>
               </div>
             </div>
           </section>

          {/* ═══ TWO PLATFORMS ═══ */}
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Two powerful tools, one engine
              </h2>
              <div className="mt-12 grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-orange-500/30 transition-all group">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">SmartRecon</h3>
                  <p className="mt-2 text-white/60">Upload, match and resolve GST purchase mismatches with clear reasons, ownership, and vendor follow-up tracking.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-emerald-500/30 transition-all group">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">ITCView</h3>
                  <p className="mt-2 text-white/60">Track recoverable input tax credit, monitor vendor filing compliance, and export filing-ready reports across all GSTINs.</p>
                </div>
              </div>
              <div className="mt-10 grid md:grid-cols-2 gap-6">
                <SmartReconMockup />
                <ITCViewMockup />
              </div>
            </div>
          </section>

          {/* ═══ SMARTRECON FEATURES ═══ */}
          <section id="reconciliation" className="py-24 border-t border-white/5 bg-black/30">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <p className="text-sm text-orange-500 font-medium mb-4">SmartRecon</p>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Reconcile, review and resolve</h2>
                  <a href="/dashboard" className="mt-6 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-6 py-3 text-sm font-medium transition-all border border-white/20">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div>
                  <p className="text-lg text-white/60">Upload purchase registers and GSTR-2B files, review every mismatch with a clear reason, track vendor follow-ups, and export the exact pack your filing process needs.</p>
                </div>
              </div>
              <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {reconFeatures.map(feat => (
                    <div key={feat.title} className="pro-card">
                      <feat.icon className="w-8 h-8 text-orange-400 mb-6" strokeWidth={1.5} />
                      <h4 className="text-base font-semibold mb-2 text-white font-dmsans tracking-tight">{feat.title}</h4>
                      <p className="text-sm text-white/60 font-mono">{feat.desc}</p>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ ITCVIEW FEATURES ═══ */}
          <section id="analytics" className="py-24 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <p className="text-sm text-emerald-500 font-medium mb-4">ITCView</p>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Track every rupee of ITC</h2>
                  <a href="/dashboard" className="mt-6 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-6 py-3 text-sm font-medium transition-all border border-white/20">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div>
                  <p className="text-lg text-white/60">Monitor recoverable credits, score vendor compliance, identify at-risk ITC before filing deadlines, and generate reports that your advisory team can action immediately.</p>
                </div>
              </div>
              <div className="mt-12 grid sm:grid-cols-3 gap-5">
                {itcFeatures.map(feat => (
                    <div key={feat.title} className="pro-card">
                      <feat.icon className="w-8 h-8 text-emerald-400 mb-6" strokeWidth={1.5} />
                      <h4 className="text-base font-semibold mb-2 text-white font-dmsans tracking-tight">{feat.title}</h4>
                      <p className="text-sm text-white/60 font-mono">{feat.desc}</p>
                    </div>
                ))}
              </div>
            </div>
          </section>

           {/* ═══ STATS ═══ */}
           <section className="py-24 border-t border-white/5 bg-black/30">
             <div className="max-w-7xl mx-auto px-6">
               <div className="grid lg:grid-cols-2 gap-12 items-start">
                 <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Built for scale, proven in production</h2>
                 <p className="text-lg text-white/60">Our vision is to make GST compliance seamless. We build purpose-built reconciliation systems, beginning with the first truly intelligent invoice matching engine.</p>
               </div>
               <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                   { value: '2,400+', label: 'Invoices processed per minute' },
                   { value: '91%', label: 'Average first-pass match rate' },
                   { value: '68%', label: 'Reduction in open exceptions' },
                   { value: '3 hrs', label: 'From upload to filing pack' },
                 ].map(stat => (
                     <div key={stat.label} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/10">
                       <p className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">{stat.value}</p>
                       <p className="mt-2 text-sm text-white/50">{stat.label}</p>
                     </div>
                 ))}
               </div>
             </div>
           </section>

           {/* ═══ SECURITY ═══ */}
          <section id="enterprise" className="py-24 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center text-white mb-12">Security, built in</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {securityItems.map(item => (
                    <div key={item.title} className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all">
                      <item.icon className="w-10 h-10 text-amber-400 mb-6" />
                      <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-white/50 text-sm">{item.desc}</p>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ LATEST UPDATES ═══ */}
          <section className="py-24 border-t border-white/5 bg-black/30">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Latest updates</h2>
                <a href="#" className="text-sm text-white/50 hover:text-white border border-white/20 rounded-lg px-4 py-2">All posts →</a>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                {updates.map(post => (
                    <a key={post.title} href="#" className="group">
                      <div className={`bg-gradient-to-br ${post.gradient} rounded-2xl aspect-[4/3] flex items-center justify-center p-6 mb-4 group-hover:scale-[1.02] transition-transform backdrop-blur-sm border border-white/10`}>
                        <h3 className="text-xl font-bold text-center text-white leading-tight">{post.title}</h3>
                      </div>
                      <h4 className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{post.title}</h4>
                      <p className="mt-1 text-xs text-white/40">{post.category} · {post.date}</p>
                    </a>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ PRICING ═══ */}
          <section id="pricing" className="py-24 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center text-white mb-12">Plans that scale with you</h2>
              <div className="grid lg:grid-cols-3 gap-8">
                {plans.map(plan => (
                    <div key={plan.name} className={`rounded-2xl p-8 flex flex-col transition-all duration-300 ${plan.featured ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl' : 'bg-white/5 border border-white/10 hover:border-white/20'}`}>
                      {plan.featured && (
                          <span className="self-start bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider mb-4">
                      Most Popular
                    </span>
                      )}
                      <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                      <p className="mt-2 text-sm text-white/50">{plan.desc}</p>
                      <div className="mt-6 flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        {plan.per && <span className="text-sm text-white/40">{plan.per}</span>}
                      </div>
                      <div className="my-6 h-px bg-white/10" />
                      <ul className="space-y-3 flex-1">
                        {plan.features.map(feat => (
                            <li key={feat} className="flex items-start gap-3 text-sm text-white/60">
                              <Check className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" strokeWidth={2.5} />
                              {feat}
                            </li>
                        ))}
                      </ul>
                      <a href="/dashboard" className={`mt-8 rounded-lg px-6 py-3 text-sm font-medium text-center transition-all ${
                          plan.featured ? 'bg-white text-gray-900 hover:bg-white/90' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                      }`}>
                        {plan.price === 'Custom' ? 'Contact sales' : 'Get started'}
                      </a>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ FAQ ═══ */}
          <section className="py-24 border-t border-white/5 bg-black/30">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-[0.4fr_0.6fr] gap-12 lg:gap-20">
                <h2 className="text-4xl font-bold tracking-tight text-white">Questions? We have answers.</h2>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                      <div key={faq.q} className="border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
                        <button
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                        >
                          <span className="text-sm font-semibold text-white">{faq.q}</span>
                          <ChevronDown className={`w-4 h-4 shrink-0 text-white/40 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`grid transition-all duration-300 ${openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                          <div className="overflow-hidden">
                            <p className="px-6 pb-5 text-sm text-white/50 leading-relaxed">{faq.a}</p>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══ CTA ═══ */}
          <section className="py-24 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto">
                Ready to stop rebuilding reconciliation every month?
              </h2>
              <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto">
                Open the product, upload a register, and see the complete GST review flow from import to export.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="/dashboard" className="bg-white text-gray-900 rounded-lg px-8 py-4 text-sm font-medium hover:shadow-xl transition-all flex items-center gap-2">
                  Start free trial <Rocket className="w-4 h-4" />
                </a>
                <a href="#pricing" className="border border-white/20 rounded-lg px-8 py-4 text-sm font-medium text-white/80 hover:bg-white/10 transition-colors">
                  Contact sales
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* ═══ FOOTER ═══ */}
        <footer className="border-t border-white/5 bg-black/50 backdrop-blur-md py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2.5 mb-4">
                  <RecontiqLogo />
                </div>
                <p className="text-sm text-white/40 max-w-[200px]">The modern GST reconciliation platform for Indian finance teams.</p>
              </div>
              {Object.entries(footerLinks).map(([category, links]) => (
                  <div key={category}>
                    <p className="text-sm font-semibold text-white mb-4">{category}</p>
                    <ul className="space-y-2">
                      {links.map(link => (
                          <li key={link}><a href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors">{link}</a></li>
                      ))}
                    </ul>
                  </div>
              ))}
            </div>
            <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-xs text-white/30">© 2025 RECONTIQ. All rights reserved.</p>
              <div className="flex gap-5">
                <a href="#" className="text-xs text-white/30 hover:text-white/50">Privacy Policy</a>
                <a href="#" className="text-xs text-white/30 hover:text-white/50">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

        <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50% { opacity: 0.28; transform: scale(1.04); }
        }
        .animate-pulse-slow {
          animation: pulse 10s ease-in-out infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes scrollRow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-row { animation: scrollRow 20s linear infinite; will-change: transform; }

        /* Performance: prefer transforms & opacity over heavy filters; respect user motion preference */
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-slow, .animate-scroll-row { animation: none !important; }
        }

        /* Small helpers to keep animations smooth */
        .animate-pulse-slow { will-change: transform, opacity; }
      `}</style>
      </div>
  )
}