// Key takeaways and official sources for each article, keyed by slug.

export const SRC = {
  pacer:   { label: 'PACER: federal court records (pacer.uscourts.gov)', url: 'https://pacer.uscourts.gov/' },
  pcl:     { label: 'PACER Case Locator (pcl.uscourts.gov)', url: 'https://pcl.uscourts.gov/pcl/index.jsf' },
  cl:      { label: 'CourtListener, Free Law Project (courtlistener.com)', url: 'https://www.courtlistener.com/' },
  flp:     { label: 'Free Law Project (free.law)', url: 'https://free.law/' },
  uscourts:{ label: 'U.S. Courts, federal judiciary (uscourts.gov)', url: 'https://www.uscourts.gov/' },
  foia:    { label: 'FOIA.gov: how to make a federal request', url: 'https://www.foia.gov/how-to.html' },
  foiaHome:{ label: 'FOIA.gov: federal agency directory', url: 'https://www.foia.gov/' },
  ogis:    { label: 'Office of Government Information Services (archives.gov/ogis)', url: 'https://www.archives.gov/ogis' },
  foiaLaw: { label: 'Text of the Freedom of Information Act, 5 U.S.C. 552 (Cornell LII)', url: 'https://www.law.cornell.edu/uscode/text/5/552' },
  rule52:  { label: 'Federal Rule of Civil Procedure 5.2, privacy protection for filings (Cornell LII)', url: 'https://www.law.cornell.edu/rules/frcp/rule_5.2' },
  state:   { label: 'USAGov: state government directory (usa.gov)', url: 'https://www.usa.gov/state-government' },
  local:   { label: 'USAGov: local government directory (usa.gov)', url: 'https://www.usa.gov/local-governments' },
  nass:    { label: 'National Association of Secretaries of State (nass.us)', url: 'https://www.nass.us/' },
  delaware:{ label: 'Delaware Division of Corporations (corp.delaware.gov)', url: 'https://corp.delaware.gov/' },
  casos:   { label: 'California Secretary of State (sos.ca.gov)', url: 'https://www.sos.ca.gov/' },
  cacourts:{ label: 'California Courts (courts.ca.gov)', url: 'https://www.courts.ca.gov/' },
  bop:     { label: 'Federal Bureau of Prisons inmate locator (bop.gov)', url: 'https://www.bop.gov/inmateloc/' },
  nsopw:   { label: 'National Sex Offender Public Website (nsopw.gov)', url: 'https://www.nsopw.gov/' },
  edgar:   { label: 'SEC EDGAR company filings (sec.gov)', url: 'https://www.sec.gov/edgar' },
  sam:     { label: 'SAM.gov: federal exclusions and contractor records', url: 'https://sam.gov/' },
  ofac:    { label: 'OFAC sanctions list search (treasury.gov)', url: 'https://sanctionssearch.ofac.treas.gov/' },
  w9:      { label: 'IRS Form W-9 (irs.gov)', url: 'https://www.irs.gov/forms-pubs/about-form-w-9' },
  fec:     { label: 'Federal Election Commission (fec.gov)', url: 'https://www.fec.gov/' },
  eeoc:    { label: 'U.S. Equal Employment Opportunity Commission (eeoc.gov)', url: 'https://www.eeoc.gov/' },
  ftc:     { label: 'Federal Trade Commission (ftc.gov)', url: 'https://www.ftc.gov/' },
  txag:    { label: 'Texas Attorney General: how to request public information (texasattorneygeneral.gov)', url: 'https://www.texasattorneygeneral.gov/og/how-to-request-public-information' },
  txsos:   { label: 'Texas Secretary of State (sos.state.tx.us)', url: 'https://www.sos.state.tx.us/' },
  txcourts:{ label: 'Texas Judicial Branch (txcourts.gov)', url: 'https://www.txcourts.gov/' },
  flag:    { label: 'Florida Attorney General (myfloridalegal.com)', url: 'https://www.myfloridalegal.com/' },
  sunbiz:  { label: 'Florida Division of Corporations, Sunbiz (dos.fl.gov/sunbiz)', url: 'https://dos.fl.gov/sunbiz/' },
  flcourts:{ label: 'Florida Courts (flcourts.gov)', url: 'https://www.flcourts.gov/' },
  nycoog:  { label: 'New York Committee on Open Government (opengovernment.ny.gov)', url: 'https://opengovernment.ny.gov/' },
  nydos:   { label: 'New York Department of State (dos.ny.gov)', url: 'https://dos.ny.gov/' },
  nycourts:{ label: 'New York State Unified Court System (nycourts.gov)', url: 'https://www.nycourts.gov/' },
  acris:   { label: 'NYC ACRIS: property document search (a836-acris.nyc.gov)', url: 'https://a836-acris.nyc.gov/' },
  paoor:   { label: 'Pennsylvania Office of Open Records (openrecords.pa.gov)', url: 'https://www.openrecords.pa.gov/' },
  ujs:     { label: 'Pennsylvania UJS Web Portal (ujsportal.pacourts.us)', url: 'https://ujsportal.pacourts.us/' },
  pacourts:{ label: 'Pennsylvania Courts (pacourts.us)', url: 'https://www.pacourts.us/' },
  ilag:    { label: 'Illinois Attorney General: Public Access Counselor (illinoisattorneygeneral.gov)', url: 'https://illinoisattorneygeneral.gov/' },
  ilsos:   { label: 'Illinois Secretary of State (ilsos.gov)', url: 'https://www.ilsos.gov/' },
  ilcourts:{ label: 'Illinois Courts (illinoiscourts.gov)', url: 'https://www.illinoiscourts.gov/' },
  gaag:    { label: 'Georgia Attorney General: open government (law.georgia.gov)', url: 'https://law.georgia.gov/' },
  gsccca:  { label: 'Georgia Superior Court Clerks\u2019 Cooperative Authority (gsccca.org)', url: 'https://www.gsccca.org/' },
  gasos:   { label: 'Georgia Secretary of State (sos.ga.gov)', url: 'https://sos.ga.gov/' },
  gacourts:{ label: 'Georgia Courts (georgiacourts.gov)', url: 'https://georgiacourts.gov/' },
  apostille:{ label: 'Hague Conference: Apostille Convention (hcch.net)', url: 'https://www.hcch.net/en/instruments/conventions/specialised-sections/apostille' }
};

export const blogMeta = {
  'how-to-search-public-records-in-texas': {
    takeaways: ['Texas records are kept by 254 counties, so find the right county office before you search.', 'The Public Information Act gives a governmental body 10 business days to respond, release records, or ask the Attorney General for a ruling.', 'Business filings are at the Secretary of State, while property deeds are with the county clerk and values with the appraisal district.'],
    sources: ['txag', 'txsos', 'txcourts', 'pacer']
  },
  'how-to-search-public-records-in-florida': {
    takeaways: ['The Clerk of the Circuit Court keeps both court files and the official land records in each county.', 'Chapter 119 sets no fixed response deadline. Agencies must respond within a reasonable time.', 'Sunbiz shows entity status, registered agent, and officers from annual reports.'],
    sources: ['sunbiz', 'flag', 'flcourts', 'pacer']
  },
  'how-to-search-public-records-in-new-york': {
    takeaways: ['In New York, the Supreme Court is the main trial court, not the highest court.', 'New York City property documents are searched through ACRIS, while other counties use the county clerk.', 'FOIL requires a response within five business days, with an approximate date that is generally within 20 more business days.'],
    sources: ['nydos', 'nycoog', 'nycourts', 'acris', 'pacer']
  },
  'how-to-search-public-records-in-pennsylvania': {
    takeaways: ['The UJS Web Portal lets you search court dockets statewide, then you contact the county for documents.', 'Judgments and many liens are indexed with the Prothonotary, so search both it and the Recorder of Deeds.', 'Right-to-Know appeals go to the Office of Open Records within 15 business days.'],
    sources: ['ujs', 'paoor', 'pacourts', 'pacer']
  },
  'how-to-search-public-records-in-illinois': {
    takeaways: ['Court records are kept by Circuit Clerks in 102 counties, and Cook County has its own systems.', 'The Illinois FOIA allows five business days to respond, plus five more if the body notifies you in writing.', 'You can ask the Attorney General\u2019s Public Access Counselor to review a denial within 60 days.'],
    sources: ['ilsos', 'ilag', 'ilcourts', 'pacer']
  },
  'how-to-search-public-records-in-georgia': {
    takeaways: ['The GSCCCA offers statewide indexes of land records, liens, and UCC filings.', 'The Open Records Act requires a response within three business days.', 'Fees are limited: the first quarter hour is free, copies are capped at $0.10 per page, and estimates over $25 must be shared.'],
    sources: ['gasos', 'gaag', 'gsccca', 'gacourts', 'pacer']
  },
  'how-to-search-public-records-in-california': {
    takeaways: ['California records are split between state offices (business filings) and county offices (courts and property).', 'Search business entities at the Secretary of State, then court and property records in the right county.', 'Confirm identity with more than a name, and verify anything important with the office that holds the record.'],
    sources: ['casos', 'cacourts', 'local']
  },
  'understanding-llc-filings-and-business-entity-searches': {
    takeaways: ['A business entity search shows whether a company exists, its status, and its registered agent.', 'Search the state where the company was formed, and any state where it does business.', 'Inactive, revoked, or mismatched details are red flags worth asking about.'],
    sources: ['nass', 'state']
  },
  'what-to-look-for-in-a-background-check-before-hiring': {
    takeaways: ['A standard background check can include identity, criminal, employment, and education verification.', 'Employers who use an outside screening company must follow the Fair Credit Reporting Act, including notice and consent steps.', 'Rules on what you may consider differ by state and city, so get legal advice before making decisions.'],
    sources: ['ftc', 'eeoc']
  },
  'guide-to-county-court-records-and-lawsuit-searches': {
    takeaways: ['Most lawsuits are filed in county or state courts, not federal courts, and each county keeps its own records.', 'Work out the right county first, then search the clerk\u2019s online portal by name or case number.', 'The docket shows the case history, but you usually need to request the full documents separately.'],
    sources: ['local', 'state', 'uscourts']
  },
  'how-to-find-incarceration-records-by-state': {
    takeaways: ['State prisons, county jails, and federal prisons are separate systems with separate searches.', 'State Department of Corrections databases typically show custody status and expected release information.', 'Online inmate searches can lag or be incomplete, so confirm details with the facility.'],
    sources: ['state', 'bop']
  },
  'difference-between-state-and-federal-inmate-searches': {
    takeaways: ['Which system holds a person depends on whether they were convicted of a state or a federal crime.', 'The Federal Bureau of Prisons has one national locator, while each state runs its own.', 'People held before trial or serving short sentences are often in county jails.'],
    sources: ['bop', 'state']
  },
  'navigating-the-national-sex-offender-public-website': {
    takeaways: ['NSOPW is an official federal tool that searches participating state, territorial, and tribal registries at once.', 'Registry details and what is shown differ by jurisdiction.', 'Use of this information is restricted by law. It is for safety, not harassment or discrimination.'],
    sources: ['nsopw']
  },
  'how-to-search-bankruptcy-records-using-pacer': {
    takeaways: ['Bankruptcy cases are filed in federal court and searched through PACER.', 'The case number, chapter, and key entries such as a discharge or dismissal tell you how a case ended.', 'PACER charges per page with caps and a free quarterly threshold, so check the current fee schedule.'],
    sources: ['pacer', 'pcl', 'uscourts']
  },
  'why-delaware-is-the-most-popular-state-for-llc-formation': {
    takeaways: ['Delaware appeals to companies that want its business courts, flexible law, and investor familiarity.', 'It does not remove duties in other states: a company operating elsewhere usually must register there too.', 'For a small local business, forming in your home state is often simpler and cheaper.'],
    sources: ['delaware', 'nass']
  },
  'understanding-civil-vs-criminal-court-records': {
    takeaways: ['Civil cases are disputes between parties, and criminal cases are brought by the government.', 'Civil plaintiffs prove their case by a preponderance of the evidence, while criminal cases require proof beyond a reasonable doubt.', 'Always read the final disposition: a charge or a claim is not a finding.'],
    sources: ['uscourts', 'local']
  },
  'how-to-verify-a-contractors-business-license': {
    takeaways: ['Verify the license on the state licensing board website and confirm it is active and covers your type of work.', 'A license does not prove quality or insurance, so ask for proof of insurance directly from the insurer.', 'Check court records and complaint history before signing.'],
    sources: ['state', 'local']
  },
  'the-importance-of-registered-agents-in-business-filings': {
    takeaways: ['A registered agent receives legal papers and official notices for a business.', 'A missing or resigned agent can lead to delinquent status and missed lawsuits.', 'Commercial agent addresses are common and are not a warning sign by themselves.'],
    sources: ['nass', 'state']
  },
  'how-to-read-a-docket-sheet-in-civil-lawsuits': {
    takeaways: ['A docket lists every filing and order in a case, in date order.', 'Learn the common entries, such as complaint, answer, motion, order, and judgment.', 'A filing is only an allegation. Look for the final order to see the outcome.'],
    sources: ['pacer', 'cl', 'uscourts']
  },
  'protecting-your-privacy-when-searching-public-records': {
    takeaways: ['Use official .gov sources and avoid entering sensitive identifiers like a Social Security number.', 'Search your own name to see what is public, then ask the custodian about redaction or correction.', 'Sealing, expungement, and address confidentiality programs depend on your state.'],
    sources: ['rule52', 'uscourts', 'state']
  },
  'common-mistakes-people-make-when-searching-court-records': {
    takeaways: ['The most common errors are searching the wrong court, missing name variations, and stopping at the charge.', 'Match at least two details before deciding a record belongs to someone.', 'Save the court, case number, and date for anything you rely on.'],
    sources: ['pacer', 'cl', 'local']
  },
  'how-to-find-property-records-and-liens-in-your-county': {
    takeaways: ['The assessor, recorder, and tax collector each hold different property information.', 'A parcel number is the most reliable way to search.', 'A free search is not a title search. Use a title company or attorney for a purchase.'],
    sources: ['local', 'state']
  },
  'beginners-guide-to-foia-requests': {
    takeaways: ['FOIA covers federal executive agencies. States have their own public records laws.', 'Specific requests get answered faster than broad ones.', 'If a request is denied, the agency must explain how to appeal.'],
    sources: ['foia', 'foiaHome', 'ogis', 'foiaLaw']
  },
  'understanding-chapter-7-vs-chapter-13-bankruptcy-filings': {
    takeaways: ['Chapter 7 liquidates eligible assets, while Chapter 13 reorganizes debt through a three-to-five-year repayment plan.', 'A discharge order shows debts were released. A dismissal does not.', 'Bankruptcy records stay on PACER even after credit report entries age off.'],
    sources: ['uscourts', 'pcl', 'pacer']
  },
  'how-to-conduct-due-diligence-on-a-new-business-partner': {
    takeaways: ['Start with entity status, then check liens, lawsuits, bankruptcy, and licenses.', 'Government exclusion and sanctions lists are free to search.', 'Keep a dated log of every check and treat public records as a starting point.'],
    sources: ['nass', 'sam', 'ofac', 'edgar', 'w9']
  },
  'the-role-of-public-records-in-journalistic-investigations': {
    takeaways: ['Court dockets, business filings, property records, and campaign finance reports can be cross-checked against each other.', 'Verify identity, read primary documents, and separate charges from outcomes.', 'Keep a research log with source, date, and document number.'],
    sources: ['foiaHome', 'fec', 'cl', 'pacer']
  },
  'pacer-vs-courtlistener-which-should-you-use': {
    takeaways: ['PACER is the official federal court system, and CourtListener is a free archive of many of the same records.', 'Start with CourtListener, then verify current activity on PACER.', 'Neither covers state or county courts.'],
    sources: ['pacer', 'cl', 'flp']
  },
  'county-clerk-vs-recorder-vs-assessor-who-holds-which-records': {
    takeaways: ['Clerk, recorder, assessor, and treasurer each keep different records.', 'Office titles vary by state, so search by the record you need.', 'Not every county offers full online access.'],
    sources: ['local', 'state']
  },
  'how-to-request-certified-copies-of-public-records': {
    takeaways: ['A certified copy is an official copy that the custodian vouches for.', 'Request it from the office that holds the original, and ask what kind of certification the receiving agency needs.', 'Expect per-page and certification fees, and an apostille if the document is used abroad.'],
    sources: ['local', 'state', 'apostille']
  }
};
