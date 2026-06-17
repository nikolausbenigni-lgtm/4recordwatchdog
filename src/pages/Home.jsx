import React, { useState } from 'react';
import { Building2, ChevronDown, ExternalLink, FileText, Gavel, Landmark, Search, ShieldCheck, User, Users } from 'lucide-react';

const states = [
  { name: 'All States', abbr: '', biz: '' },
  { name: 'Alabama', abbr: 'AL', biz: 'https://arc-sos.state.al.us/CGI/CORPNAME.MBR/INPUT' },
  { name: 'Alaska', abbr: 'AK', biz: 'https://www.commerce.alaska.gov/cbp/main/search/entities' },
  { name: 'Arizona', abbr: 'AZ', biz: 'https://ecorp.azcc.gov/EntitySearch/Index' },
  { name: 'Arkansas', abbr: 'AR', biz: 'https://www.sos.arkansas.gov/corps/search_all.php' },
  { name: 'California', abbr: 'CA', biz: 'https://bizfileonline.sos.ca.gov/search/business' },
  { name: 'Colorado', abbr: 'CO', biz: 'https://www.sos.state.co.us/biz/BusinessEntityCriteriaExt.do' },
  { name: 'Connecticut', abbr: 'CT', biz: 'https://service.ct.gov/business/s/onlinebusinesssearch' },
  { name: 'Delaware', abbr: 'DE', biz: 'https://icis.corp.delaware.gov/Ecorp/EntitySearch/NameSearch.aspx' },
  { name: 'Florida', abbr: 'FL', biz: 'https://search.sunbiz.org/Inquiry/CorporationSearch/ByName' },
  { name: 'Georgia', abbr: 'GA', biz: 'https://ecorp.sos.ga.gov/BusinessSearch' },
  { name: 'Hawaii', abbr: 'HI', biz: 'https://hbe.ehawaii.gov/documents/search.html' },
  { name: 'Idaho', abbr: 'ID', biz: 'https://sosbiz.idaho.gov/search/business' },
  { name: 'Illinois', abbr: 'IL', biz: 'https://apps.ilsos.gov/businessentitysearch/' },
  { name: 'Indiana', abbr: 'IN', biz: 'https://bsd.sos.in.gov/publicbusinesssearch' },
  { name: 'Iowa', abbr: 'IA', biz: 'https://sos.iowa.gov/search/business/search.aspx' },
  { name: 'Kansas', abbr: 'KS', biz: 'https://www.kansas.gov/bess/flow/main?execution=e1s1' },
  { name: 'Kentucky', abbr: 'KY', biz: 'https://web.sos.ky.gov/ftsearch/' },
  { name: 'Louisiana', abbr: 'LA', biz: 'https://coraweb.sos.la.gov/commercialsearch/commercialsearch.aspx' },
  { name: 'Maine', abbr: 'ME', biz: 'https://icrs.informe.org/nei-sos-icrs/ICRS?MainPage=x' },
  { name: 'Maryland', abbr: 'MD', biz: 'https://egov.maryland.gov/BusinessExpress/EntitySearch' },
  { name: 'Massachusetts', abbr: 'MA', biz: 'https://corp.sec.state.ma.us/corpweb/CorpSearch/CorpSearch.aspx' },
  { name: 'Michigan', abbr: 'MI', biz: 'https://cofs.lara.state.mi.us/SearchApi/Search/Search' },
  { name: 'Minnesota', abbr: 'MN', biz: 'https://mblsportal.sos.state.mn.us/Business/Search' },
  { name: 'Mississippi', abbr: 'MS', biz: 'https://businesssearch.sos.ms.gov/corp/soskb/csearch.asp' },
  { name: 'Missouri', abbr: 'MO', biz: 'https://bsd.sos.mo.gov/BusinessEntity/BESearch.aspx' },
  { name: 'Montana', abbr: 'MT', biz: 'https://biz.sosmt.gov/search/business' },
  { name: 'Nebraska', abbr: 'NE', biz: 'https://www.nebraska.gov/sos/corp/corpsearch.cgi' },
  { name: 'Nevada', abbr: 'NV', biz: 'https://esos.nv.gov/EntitySearch/OnlineEntitySearch' },
  { name: 'New Hampshire', abbr: 'NH', biz: 'https://quickstart.sos.nh.gov/online/BusinessInquire' },
  { name: 'New Jersey', abbr: 'NJ', biz: 'https://www.njportal.com/DOR/BusinessNameSearch/Search/BusinessName' },
  { name: 'New Mexico', abbr: 'NM', biz: 'https://portal.sos.state.nm.us/BFS/online/CorporationBusinessSearch' },
  { name: 'New York', abbr: 'NY', biz: 'https://apps.dos.ny.gov/publicInquiry/' },
  { name: 'North Carolina', abbr: 'NC', biz: 'https://www.sosnc.gov/online_services/search/by_title/_Business_Registration' },
  { name: 'North Dakota', abbr: 'ND', biz: 'https://firststop.sos.nd.gov/search/business' },
  { name: 'Ohio', abbr: 'OH', biz: 'https://businesssearch.ohiosos.gov/' },
  { name: 'Oklahoma', abbr: 'OK', biz: 'https://www.sos.ok.gov/corp/corpInquiryFind.aspx' },
  { name: 'Oregon', abbr: 'OR', biz: 'https://sos.oregon.gov/business/Pages/find.aspx' },
  { name: 'Pennsylvania', abbr: 'PA', biz: 'https://file.dos.pa.gov/search/business' },
  { name: 'Rhode Island', abbr: 'RI', biz: 'https://business.sos.ri.gov/CorpWeb/CorpSearch/CorpSearch.aspx' },
  { name: 'South Carolina', abbr: 'SC', biz: 'https://businessfilings.sc.gov/BusinessFiling/Entity/Search' },
  { name: 'South Dakota', abbr: 'SD', biz: 'https://sosenterprise.sd.gov/BusinessServices/Business/FilingSearch.aspx' },
  { name: 'Tennessee', abbr: 'TN', biz: 'https://tnbear.tn.gov/Ecommerce/FilingSearch.aspx' },
  { name: 'Texas', abbr: 'TX', biz: 'https://mycpa.cpa.state.tx.us/coa/' },
  { name: 'Utah', abbr: 'UT', biz: 'https://secure.utah.gov/bes/' },
  { name: 'Vermont', abbr: 'VT', biz: 'https://bizfilings.vermont.gov/online/BusinessInquire' },
  { name: 'Virginia', abbr: 'VA', biz: 'https://cis.scc.virginia.gov/EntitySearch/Index' },
  { name: 'Washington', abbr: 'WA', biz: 'https://ccfs.sos.wa.gov/#/BusinessSearch' },
  { name: 'West Virginia', abbr: 'WV', biz: 'https://apps.sos.wv.gov/business/corporations/' },
  { name: 'Wisconsin', abbr: 'WI', biz: 'https://www.wdfi.org/apps/CorpSearch/Search.aspx' },
  { name: 'Wyoming', abbr: 'WY', biz: 'https://wyobiz.wyo.gov/Business/FilingSearch.aspx' },
];

const courtDirectoryByState = {
  Alabama: 'https://judicial.alabama.gov/', Alaska: 'https://courts.alaska.gov/', Arizona: 'https://www.azcourts.gov/', Arkansas: 'https://arcourts.gov/',
  California: 'https://www.courts.ca.gov/find-my-court.htm', Colorado: 'https://www.courts.state.co.us/', Connecticut: 'https://jud.ct.gov/', Delaware: 'https://courts.delaware.gov/',
  Florida: 'https://www.flcourts.gov/', Georgia: 'https://georgiacourts.gov/', Hawaii: 'https://www.courts.state.hi.us/', Idaho: 'https://isc.idaho.gov/',
  Illinois: 'https://www.illinoiscourts.gov/', Indiana: 'https://www.in.gov/courts/', Iowa: 'https://www.iowacourts.gov/', Kansas: 'https://www.kscourts.org/',
  Kentucky: 'https://kycourts.gov/', Louisiana: 'https://www.lasc.org/', Maine: 'https://www.courts.maine.gov/', Maryland: 'https://www.courts.state.md.us/',
  Massachusetts: 'https://www.mass.gov/orgs/massachusetts-court-system', Michigan: 'https://www.courts.michigan.gov/', Minnesota: 'https://www.mncourts.gov/', Mississippi: 'https://courts.ms.gov/',
  Missouri: 'https://www.courts.mo.gov/', Montana: 'https://courts.mt.gov/', Nebraska: 'https://supremecourt.nebraska.gov/', Nevada: 'https://nvcourts.gov/',
  'New Hampshire': 'https://www.courts.nh.gov/', 'New Jersey': 'https://www.njcourts.gov/', 'New Mexico': 'https://www.nmcourts.gov/', 'New York': 'https://www.nycourts.gov/',
  'North Carolina': 'https://www.nccourts.gov/', 'North Dakota': 'https://www.ndcourts.gov/', Ohio: 'https://www.supremecourt.ohio.gov/', Oklahoma: 'https://www.oscn.net/',
  Oregon: 'https://www.courts.oregon.gov/', Pennsylvania: 'https://www.pacourts.us/', 'Rhode Island': 'https://www.courts.ri.gov/', 'South Carolina': 'https://www.sccourts.org/',
  'South Dakota': 'https://ujs.sd.gov/', Tennessee: 'https://www.tncourts.gov/', Texas: 'https://www.txcourts.gov/', Utah: 'https://www.utcourts.gov/',
  Vermont: 'https://www.vermontjudiciary.org/', Virginia: 'https://www.vacourts.gov/', Washington: 'https://www.courts.wa.gov/', 'West Virginia': 'https://www.courtswv.gov/',
  Wisconsin: 'https://www.wicourts.gov/', Wyoming: 'https://www.courts.state.wy.us/',
};

const counties = [
  { state: 'New York', county: 'Albany County', url: 'https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new' },
  { state: 'New York', county: 'Bronx County', url: 'https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new' },
  { state: 'New York', county: 'Kings County', url: 'https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new' },
  { state: 'New York', county: 'Nassau County', url: 'https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new' },
  { state: 'New York', county: 'New York County', url: 'https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new' },
  { state: 'New York', county: 'Queens County', url: 'https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new' },
  { state: 'New York', county: 'Richmond County', url: 'https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new' },
  { state: 'New York', county: 'Suffolk County', url: 'https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new' },
  { state: 'New York', county: 'Westchester County', url: 'https://iapps.courts.state.ny.us/nyscef/CaseSearch?task=new' },
  { state: 'Florida', county: 'Miami-Dade County', url: 'https://www2.miamidadeclerk.gov/ocs/' },
  { state: 'Florida', county: 'Broward County', url: 'https://www.browardclerk.org/web2' },
  { state: 'Florida', county: 'Orange County', url: 'https://myeclerk.myorangeclerk.com/' },
  { state: 'Florida', county: 'Palm Beach County', url: 'https://appsgp.mypalmbeachclerk.com/eCaseView/' },
  { state: 'California', county: 'Los Angeles County', url: 'https://www.lacourt.ca.gov/pages/lp/access-a-case/tp/find-case-information/cp/os-civil-case-access' },
  { state: 'Texas', county: 'Harris County', url: 'https://www.hcdistrictclerk.com/edocs/public/search.aspx' },
  { state: 'Texas', county: 'Dallas County', url: 'https://courtsportal.dallascounty.org/DALLASPROD' },
  { state: 'Illinois', county: 'Cook County', url: 'https://www.cookcountyclerkofcourt.org/online-case-information' },
  { state: 'Nevada', county: 'Clark County', url: 'https://www.clarkcountycourts.us/Portal/' },
];

const inmateByState = {
  California: 'https://ciris.mt.cdcr.ca.gov/',
  Florida: 'https://pubapps.fdc.myflorida.com/OffenderSearch/Search.aspx?TypeSearch=AI',
  Illinois: 'https://idoc.illinois.gov/offender/inmatesearch.html',
  'New York': 'https://nysdoccslookup.doccs.ny.gov/',
  Texas: 'https://inmate.tdcj.texas.gov/InmateSearch/start.action',
};

const links = {
  bop: 'https://www.bop.gov/inmateloc/',
  courtListener: 'https://www.courtlistener.com/',
  docketAlarm: 'https://www.docketalarm.com/',
  unicourt: 'https://unicourt.com/',
  nsopw: 'https://www.nsopw.gov/search-public-sex-offender-registries',
  pacerCaseLocator: 'https://pcl.uscourts.gov/pcl/index.jsf',
};

function ButtonLink({ href, children, dark = false }) {
  return (
    <form action={href || '#'} target="_blank" method="get" className="m-0 block w-full">
      <button type="submit" className={`flex min-h-[58px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl px-6 py-4 text-center text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.99] ${dark ? 'bg-[#101943]' : 'bg-[#ff6f36]'}`}>
        <span>{children}</span>
        <ExternalLink className="h-4 w-4 shrink-0" />
      </button>
    </form>
  );
}

function Card({ icon: Icon, title, text, href, tag }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#ff6f36]"><Icon className="h-6 w-6" /></div>
      {tag && <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#ff6f36]">{tag}</p>}
      <h3 className="text-lg font-black text-[#101943]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
      {href && <div className="mt-4 w-full"><ButtonLink href={href}>Open Search</ButtonLink></div>}
    </article>
  );
}

function AdBox({ compact = false }) {
  return (
    <div className={`${compact ? 'py-1' : 'py-2'}`}>
      <div className="mb-2 flex items-center justify-end"><span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-300">Advertisement</span></div>
      <div className={`w-full overflow-hidden rounded-2xl bg-slate-100/80 ${compact ? 'h-[140px]' : 'h-[220px]'}`} />
    </div>
  );
}

function SectionAccent({ icon: Icon, orange = false }) {
  return (
    <>
      <div className={`pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full blur-3xl ${orange ? 'bg-orange-300/50' : 'bg-slate-300/70'}`} />
      <div className="pointer-events-none absolute right-8 top-6 opacity-[0.14]">
        <div className="rounded-[2.5rem] border border-white/60 bg-white/70 p-7 shadow-2xl backdrop-blur-md">
          <Icon className="h-28 w-28 text-[#101943]" strokeWidth={1.3} />
        </div>
      </div>
    </>
  );
}

export default function Home() {
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [sexState, setSexState] = useState('');
  const [zip, setZip] = useState('');
  const [radius, setRadius] = useState('5');

  const hasState = selectedState !== 'All States';
  const state = states.find((s) => s.name === selectedState && s.name !== 'All States');
  const countyOptions = counties.filter((c) => c.state === selectedState);
  const selectedCountyLink = countyOptions.find((c) => c.county === selectedCounty);
  const businessUrl = state?.biz || 'https://www.usa.gov/business';
  const inmateUrl = hasState && inmateByState[selectedState] ? inmateByState[selectedState] : 'https://www.usa.gov/state-corrections';
  const stateCourtUrl = hasState ? courtDirectoryByState[selectedState] || 'https://www.ncsc.org/information-and-resources/state-court-websites' : 'https://www.ncsc.org/information-and-resources/state-court-websites';
  const lawsuitUrl = selectedCountyLink?.url || stateCourtUrl;

  const changeState = (value) => { setSelectedState(value); setSelectedCounty(''); };

  const Chip = ({ children, href = "#business" }) => (
    <a href={href} className="inline-block rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-[#ff6f36] hover:bg-orange-50 hover:text-[#ff6f36]">
      {children}
    </a>
  );

  return (
    <main id="top">
      <section className="relative overflow-hidden bg-[#071638] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,.14),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(255,111,54,.16),transparent_24%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.3fr_.7fr] lg:py-20">
          <div>
            <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">Search Public Records.<br /><span className="text-[#ff6f36]">Find What Matters.</span></h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-200">Start with a state, then access business entity search, lawsuit records, incarceration records, bankruptcy tools, and sex offender registry resources.</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-slate-200">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">50 State Directories</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Official Sources</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Privacy-Friendly</span>
            </div>
            <div className="mt-10 max-w-2xl rounded-3xl border border-white/25 bg-white p-6 shadow-2xl">
              <label className="mb-3 block text-sm font-black uppercase tracking-[0.14em] text-slate-600">Select Your State</label>
              <div className="grid gap-4 md:grid-cols-[1fr_260px]">
                <div className="relative">
                  <select value={selectedState} onChange={(e) => changeState(e.target.value)} className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-5 py-4 text-lg font-bold text-slate-900 outline-none focus:border-[#ff6f36] focus:ring-4 focus:ring-orange-100">
                    {states.map((s) => <option key={s.name}>{s.name}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600" />
                </div>
                <a href="#business" className="flex items-center justify-center rounded-xl bg-[#ff6f36] px-8 py-4 font-black text-white shadow-lg transition hover:bg-[#e55a25]">Show Options</a>
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Florida Records', 'Most searched state'],
                ['California Courts', 'High traffic lookups'],
                ['Texas Business Search', 'Popular entity searches'],
              ].map(([title, subtitle]) => (
                <a href="#business" key={title} className="block rounded-2xl border border-white/15 bg-[#13224d] p-4 text-left shadow-lg transition hover:border-[#ff6f36] hover:bg-[#1a2d63]">
                  <div className="text-base font-extrabold tracking-tight text-white">{title}</div>
                  <div className="mt-1 text-sm font-medium text-slate-300">{subtitle}</div>
                </a>
              ))}
            </div>
          </div>

          <div className="grid content-center gap-8">
            <AdBox />
            <div className="space-y-6 pt-2">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-1 h-8 w-8 shrink-0 text-[#ff6f36]" />
                <div><h3 className="text-xl font-black">Trusted & Secure</h3><p className="mt-2 text-base leading-7 text-slate-200">Official sources, state court systems, and privacy-friendly navigation.</p></div>
              </div>
              <div className="flex items-start gap-4">
                <Search className="mt-1 h-8 w-8 shrink-0 text-[#ff6f36]" />
                <div><h3 className="text-xl font-black">Official Sources</h3><p className="mt-2 text-base leading-7 text-slate-200">Government and court websites prioritized throughout the directory.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50/70 py-10">
        <div className="mx-auto max-w-7xl px-5">
          <p className="font-black uppercase tracking-[0.18em] text-[#ff6f36]">Quick Access</p>
          <h2 className="mt-2 text-3xl font-black">Most Searched States</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {['Florida', 'California', 'Texas', 'New York', 'Illinois', 'Georgia'].map((item) => (
              <button key={item} type="button" onClick={() => changeState(item)} className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-[#ff6f36] hover:shadow-lg">
                <div className="text-lg font-black">{item}</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">Popular public record searches</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="business" className="relative mx-auto max-w-7xl overflow-hidden px-5 py-16">
        <SectionAccent icon={Building2} orange />
        <div className="relative z-10 mb-8">
          <p className="font-black uppercase tracking-[0.2em] text-[#ff6f36]">Business records</p>
          <h2 className="mt-2 text-4xl font-black">{hasState ? `${selectedState} Business Entity Search` : 'Business Entity Search by State'}</h2>
          <p className="mt-3 max-w-3xl text-slate-600">Open official business entity search tools for LLCs, corporations, registered agents, and filings. Business entity searches are commonly used for due diligence, ownership verification, vendor checks, and researching active or dissolved companies.</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-slate-600">
            <span className="rounded-full bg-orange-50 px-4 py-2 text-[#ff6f36]">LLC Verification</span>
            <span className="rounded-full bg-slate-100 px-4 py-2">Corporate Filings</span>
            <span className="rounded-full bg-slate-100 px-4 py-2">Registered Agents</span>
          </div>
        </div>
        <div className="relative z-10 grid gap-5 md:grid-cols-3">
          <Card icon={Building2} title={hasState ? `${selectedState} Entity Search` : 'Select a State First'} text={hasState ? 'Look up official Secretary of State business filings.' : 'Choose a state above to display the official business search link.'} href={hasState ? businessUrl : undefined} tag={hasState ? 'Official source' : 'State required'} />
          <Card icon={FileText} title="Business Filing Tips" text="Search by exact name, partial name, officer, registered agent, or entity number when available." />
          <AdBox compact />
        </div>
      </section>

      <section id="court" className="relative overflow-hidden border-y bg-gradient-to-b from-white to-slate-50 py-16">
        <SectionAccent icon={Gavel} />
        <div className="relative z-10 mx-auto max-w-7xl px-5">
          <p className="font-black uppercase tracking-[0.2em] text-[#ff6f36]">Lawsuit records</p>
          <h2 className="mt-2 text-4xl font-black">{hasState ? `${selectedState} Lawsuit Records` : 'Lawsuit Records by State and County'}</h2>
          <p className="mt-3 max-w-3xl text-slate-600">{hasState ? `Choose a county within ${selectedState} to open lawsuit and civil case lookup tools. Most civil lawsuits, judgments, and local court filings are managed at the county level.` : 'Select a state from the hero section above to load county court records. Most lawsuit and civil court searches begin with the county clerk or local court system.'}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-slate-600">
            <span className="rounded-full bg-orange-50 px-4 py-2 text-[#ff6f36]">Civil Cases</span>
            <span className="rounded-full bg-slate-100 px-4 py-2">Judgments</span>
            <span className="rounded-full bg-slate-100 px-4 py-2">County Court Records</span>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <Card icon={Gavel} title={hasState ? `${selectedState} Court Directory` : 'Select a State First'} text={hasState ? 'Use official court and clerk resources for lawsuit and civil case records.' : 'Choose a state in the hero section above to load county lawsuit record options.'} tag={hasState ? 'Lawsuit source' : 'State required'} />
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#ff6f36]"><Gavel className="h-6 w-6" /></div>
                <div><p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6f36]">County lookup</p><h3 className="text-lg font-black text-[#101943]">Choose County</h3><p className="mt-1 text-sm leading-6 text-slate-600">Most civil lawsuits and local court records are maintained at the county level.</p></div>
              </div>
              <select value={selectedCounty} onChange={(e) => setSelectedCounty(e.target.value)} disabled={!hasState} className="w-full rounded-xl border border-slate-300 px-4 py-4 font-bold outline-none disabled:bg-slate-100 disabled:text-slate-400">
                <option>{hasState ? 'Select County' : 'Select a state above first'}</option>
                {countyOptions.map((county) => <option key={county.county}>{county.county}</option>)}
              </select>
              <div className="mt-4 w-full"><ButtonLink href={lawsuitUrl}>{selectedCountyLink ? 'Open Lawsuit Search' : 'Court Directory'}</ButtonLink></div>
            </div>
            <AdBox compact />
          </div>
        </div>
      </section>

      <section className="px-5 py-5"><div className="mx-auto max-w-7xl"><div className="py-2"><div className="mb-2 flex items-center justify-end"><span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-300">Advertisement</span></div><div className="h-[120px] w-full overflow-hidden rounded-3xl bg-slate-100/80" /></div></div></section>

      <section id="bankruptcy" className="relative mx-auto max-w-7xl overflow-hidden px-5 py-16">
        <SectionAccent icon={FileText} orange />
        <div className="relative z-10">
          <p className="font-black uppercase tracking-[0.2em] text-[#ff6f36]">Federal records</p>
          <h2 className="mt-2 text-4xl font-black">Bankruptcy & Federal Case Search</h2>
          <p className="mt-3 max-w-3xl text-slate-600">Search federal bankruptcy and court systems using PACER and related legal research tools. Bankruptcy filings are maintained in the federal court system and may include Chapter 7, Chapter 11, and Chapter 13 cases.</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-slate-600">
            <span className="rounded-full bg-orange-50 px-4 py-2 text-[#ff6f36]">Federal Court Records</span>
            <span className="rounded-full bg-slate-100 px-4 py-2">Chapter 7 & 11</span>
            <span className="rounded-full bg-slate-100 px-4 py-2">PACER Search</span>
          </div>
        </div>
        <div className="relative z-10 mt-6 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr_260px]">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Person or business name" className="min-w-0 rounded-xl border px-4 py-4 outline-none" />
            <ButtonLink href={links.pacerCaseLocator}>Continue to PACER</ButtonLink>
          </div>
          {name && <p className="mt-4 rounded-xl bg-orange-50 p-4 font-bold">Suggested search term: {name}</p>}
        </div>
        <div className="relative z-10 mt-8 grid items-stretch gap-5 md:grid-cols-3">
          <Card icon={FileText} title="CourtListener" text="Free federal court opinions, RECAP archives, and docket research tools." href={links.courtListener} tag="Free research" />
          <Card icon={Search} title="Docket Alarm" text="Advanced litigation analytics, federal court dockets, and legal intelligence tools." href={links.docketAlarm} tag="Premium analytics" />
          <Card icon={Building2} title="UniCourt" text="Enterprise court analytics, litigation tracking, and federal docket intelligence platform." href={links.unicourt} tag="Legal intelligence" />
        </div>
      </section>

      <section id="inmates" className="relative overflow-hidden border-y bg-gradient-to-b from-white to-slate-50 py-16">
        <SectionAccent icon={Landmark} />
        <div className="relative z-10 mx-auto max-w-7xl px-5">
          <p className="font-black uppercase tracking-[0.2em] text-[#ff6f36]">Incarceration records</p>
          <h2 className="mt-2 text-4xl font-black">Incarceration Records</h2>
          <p className="mt-3 max-w-3xl text-slate-600">{hasState ? `Search ${selectedState} correctional records or federal inmate custody records using official incarceration databases. State systems usually track prison inmates, while county jail systems may maintain separate local detention records.` : 'Select a state above to load state incarceration records, or use the federal inmate locator below. State and federal inmate systems are maintained separately.'}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-slate-600">
            <span className="rounded-full bg-orange-50 px-4 py-2 text-[#ff6f36]">State Corrections</span>
            <span className="rounded-full bg-slate-100 px-4 py-2">Federal Inmates</span>
            <span className="rounded-full bg-slate-100 px-4 py-2">County Jail Records</span>
          </div>
          <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
            <div className="grid gap-3 md:grid-cols-[1fr_260px]">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="First and last name" className="rounded-xl border px-4 py-4 outline-none" />
              <ButtonLink href={inmateUrl}>{hasState ? `Open ${selectedState} Search` : 'Open State Directory'}</ButtonLink>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Card icon={ShieldCheck} title="Federal Inmate Locator" text="Search Bureau of Prisons records for federal inmates, federal convictions, and U.S. federal custody records." href={links.bop} />
            <Card icon={Users} title="County Jail Directory" text="Search county jail rosters, sheriff inmate databases, and local detention records by county or sheriff office." href="https://www.usa.gov/local-governments" />
            <AdBox compact />
          </div>
        </div>
      </section>

      <section id="sex" className="relative mx-auto max-w-7xl overflow-hidden px-5 py-16">
        <SectionAccent icon={ShieldCheck} orange />
        <div className="relative z-10">
          <p className="font-black uppercase tracking-[0.2em] text-[#ff6f36]">Public safety</p>
          <h2 className="mt-2 text-4xl font-black">National Sex Offender Registry</h2>
          <p className="mt-3 max-w-3xl text-slate-600">Search the official NSOPW registry by name or address-radius lookup. The National Sex Offender Public Website aggregates participating state, territorial, and tribal registry systems into one searchable platform.</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-slate-600">
            <span className="rounded-full bg-orange-50 px-4 py-2 text-[#ff6f36]">National Registry</span>
            <span className="rounded-full bg-slate-100 px-4 py-2">Address Radius Search</span>
            <span className="rounded-full bg-slate-100 px-4 py-2">Public Safety Records</span>
          </div>
        </div>
        <div className="relative z-10 mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border bg-white p-7 shadow-sm">
            <div className="mb-5 flex items-center gap-4"><User className="h-8 w-8 text-[#ff6f36]" /><h3 className="text-2xl font-black">Name Lookup</h3></div>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="First and last name" className="w-full rounded-xl border px-4 py-4 outline-none" />
            <div className="mt-5 w-full"><ButtonLink href={links.nsopw}>Open Name Search</ButtonLink></div>
          </div>
          <div className="rounded-3xl border bg-white p-7 shadow-sm">
            <div className="mb-5 flex items-center gap-4"><Search className="h-8 w-8 text-[#101943]" /><h3 className="text-2xl font-black">Address Radius Lookup</h3></div>
            <div className="grid gap-3">
              <input value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Street address" className="rounded-xl border px-4 py-4 outline-none" />
              <div className="grid gap-3 sm:grid-cols-[1fr_130px]">
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="rounded-xl border px-4 py-4 outline-none" />
                <input value={sexState} onChange={(e) => setSexState(e.target.value)} placeholder="State" className="rounded-xl border px-4 py-4 outline-none" />
              </div>
              <div className="grid gap-3 sm:grid-cols-[1fr_130px]">
                <input value={zip} onChange={(e) => setZip(e.target.value)} placeholder="ZIP code" className="rounded-xl border px-4 py-4 outline-none" />
                <select value={radius} onChange={(e) => setRadius(e.target.value)} className="rounded-xl border px-4 py-4 font-bold outline-none">
                  <option value="1">1 Mile</option><option value="5">5 Miles</option><option value="10">10 Miles</option><option value="25">25 Miles</option>
                </select>
              </div>
            </div>
            <div className="mt-5 w-full"><ButtonLink href={links.nsopw} dark>Open Address Search</ButtonLink></div>
          </div>
        </div>
        <p className="relative z-10 mt-5 text-sm text-slate-600">Address searches are completed on the official NSOPW website. RecordWatchdog does not host registry records.</p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="font-black uppercase tracking-[0.18em] text-[#ff6f36]">User Guide</p>
          <h2 className="mt-2 text-3xl font-black text-[#101943] md:text-4xl">How to Use the RecordWatchdog Public Records Directory</h2>
          <div className="mt-6 space-y-6 text-base leading-8 text-slate-700">
            <p>
              RecordWatchdog is designed to simplify the process of finding official public records across the United States. Navigating disparate government websites can be confusing and time-consuming. Our directory organizes over 50 state-level resources, county court systems, and federal databases into one streamlined, easy-to-use platform, saving you hours of research.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff6f36] font-black text-white">1</div>
                <h3 className="text-lg font-black text-[#101943]">Select Your State</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Use the dropdown menu at the top of this page to choose the specific state you are researching. This instantly filters our directory to show only relevant, official resources for that jurisdiction.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff6f36] font-black text-white">2</div>
                <h3 className="text-lg font-black text-[#101943]">Choose Your Record Type</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Navigate to the specific section you need, such as Business Entity Search, County Lawsuit Records, Incarceration Databases, or Bankruptcy Filings.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff6f36] font-black text-white">3</div>
                <h3 className="text-lg font-black text-[#101943]">Access Official Sources</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Click the provided buttons to be directed securely to the official government portal (e.g., Secretary of State, County Clerk, or Department of Corrections) to perform your search.</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-orange-200 bg-orange-50 p-6">
              <h3 className="flex items-center gap-2 text-lg font-black text-[#101943]">
                <svg className="h-5 w-5 text-[#ff6f36]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Important Transparency & FCRA Disclaimer
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                RecordWatchdog is strictly an informational directory and search tool aggregator. <strong>We do not host, generate, or maintain any criminal records, court documents, inmate databases, or personal data on our servers.</strong> All searches are conducted on third-party official government websites. Furthermore, this site is <strong>not</strong> a "consumer reporting agency" as defined by the Fair Credit Reporting Act (FCRA). The information provided here may not be used for tenant screening, employment background checks, credit eligibility decisions, or any other FCRA-regulated purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="font-black uppercase tracking-[0.18em] text-[#ff6f36]">Our Value</p>
          <h2 className="mt-2 text-3xl font-black text-[#101943] md:text-4xl">Why Choose RecordWatchdog?</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-black text-[#101943]">Comprehensive & Verified Directory</h3>
              <p className="mt-3 text-base leading-7 text-slate-700">
                Navigating the fragmented landscape of U.S. public records can be overwhelming. RecordWatchdog saves you hours of research by curating and verifying direct links to over 50 state-level resources, hundreds of county court systems, and federal databases. We ensure every link points to an official, secure .gov or authorized government portal, protecting you from predatory third-party "people search" sites that charge hidden fees for freely available public data.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-black text-[#101943]">Empowering Informed Decisions</h3>
              <p className="mt-3 text-base leading-7 text-slate-700">
                Whether you are a small business owner verifying a new vendor's LLC status, a homeowner researching property liens, or a concerned parent checking local safety registries, access to accurate public information is your right. We provide the roadmap to that information, complete with step-by-step guides on how to interpret docket sheets, understand bankruptcy chapters, and conduct lawful due diligence.
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-2xl bg-slate-50 p-6">
            <h3 className="text-lg font-black text-[#101943]">Types of Public Records We Help You Find:</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-3 text-sm leading-6 text-slate-700"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ff6f36]"></span><strong>Business Entity Filings:</strong> LLCs, Corporations, Registered Agents, and Good Standing certificates.</li>
              <li className="flex items-start gap-3 text-sm leading-6 text-slate-700"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ff6f36]"></span><strong>Civil & Criminal Court Records:</strong> County-level lawsuit dockets, judgments, and case dispositions.</li>
              <li className="flex items-start gap-3 text-sm leading-6 text-slate-700"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ff6f36]"></span><strong>Incarceration & Jail Rosters:</strong> State Department of Corrections inmate locators and county jail databases.</li>
              <li className="flex items-start gap-3 text-sm leading-6 text-slate-700"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ff6f36]"></span><strong>Federal Bankruptcy Filings:</strong> Chapter 7, 11, and 13 records via the official PACER system.</li>
              <li className="flex items-start gap-3 text-sm leading-6 text-slate-700"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ff6f36]"></span><strong>Property & Real Estate:</strong> County assessor values, deed histories, and tax lien records.</li>
              <li className="flex items-start gap-3 text-sm leading-6 text-slate-700"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ff6f36]"></span><strong>Public Safety Registries:</strong> Official National Sex Offender Public Website (NSOPW) geographic and name searches.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="font-black uppercase tracking-[0.18em] text-[#ff6f36]">FAQ</p>
          <h2 className="mt-2 text-3xl font-black text-[#101943] md:text-4xl">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-lg font-black text-[#101943]">Is RecordWatchdog free to use?</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">Yes, our directory is completely free. We provide direct links to official government portals. While our site is free, some official government databases may charge a small fee for downloading certified copies of documents.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-lg font-black text-[#101943]">Do you host criminal records or personal data?</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">No. RecordWatchdog is strictly an informational directory. We do not host, generate, or maintain any criminal records, court documents, inmate databases, or personal data on our servers. All searches redirect you to official, secure government websites.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-lg font-black text-[#101943]">Can I use this site for employment background checks?</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">No. RecordWatchdog is NOT a "consumer reporting agency" as defined by the Fair Credit Reporting Act (FCRA). Our resources may not be used for tenant screening, employment background checks, credit eligibility decisions, or any other FCRA-regulated purpose.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-lg font-black text-[#101943]">Why do some county searches require a visit to the courthouse?</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">While many counties offer robust online databases, some smaller jurisdictions have not fully digitized their historical records. In these cases, you may need to visit the county clerk's office in person or submit a formal written request to access older files.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="font-black uppercase tracking-[0.18em] text-[#ff6f36]">Quick Links</p>
          <h2 className="mt-2 text-4xl font-black">Most Popular Searches</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              { label: 'Florida Public Records', href: '#business' },
              { label: 'California Court Records', href: '#court' },
              { label: 'Texas Business Search', href: '#business' },
              { label: 'New York Inmate Search', href: '#inmates' },
              { label: 'Illinois Court Search', href: '#court' },
              { label: 'Georgia Business Entity Search', href: '#business' },
              { label: 'Delaware LLC Search', href: '#business' },
              { label: 'Florida Arrest Records', href: '#inmates' }
            ].map((item) => <Chip key={item.label} href={item.href}>{item.label}</Chip>)}
          </div>
        </div>
        <div className="mt-10"><AdBox /></div>
      </section>
    </main>
  );
}
