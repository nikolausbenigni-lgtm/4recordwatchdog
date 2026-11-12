// Extra sections appended to existing articles to give readers more practical depth.
// Keyed by slug. posts.js appends these after the main content and marks the article as updated.

export const appendSections = {
  "beginners-guide-to-foia-requests": `
      <h2>Writing a Request That Gets Results</h2>
      <p>Vague requests are slow and often rejected. Name the agency, the type of record, and a date range. Compare these two requests:</p>
      <ul>
        <li><strong>Weak:</strong> "All records about the highway project."</li>
        <li><strong>Stronger:</strong> "Copies of the signed construction contract, change orders, and final invoices for the Route 9 resurfacing project awarded in 2024, held by the Department of Transportation."</li>
      </ul>
      <p>Include your contact details, say whether you prefer electronic delivery, and cite the law you are using. If you are not sure which office holds the record, many agencies have a FOIA public liaison who can point you in the right direction.</p>

      <h2>Timing, Fees, and Tracking</h2>
      <p>Federal agencies are generally required to respond to a FOIA request within 20 business days, although extensions for unusual circumstances and large backlogs are common. Most agencies assign a tracking number, so keep it and check status online or by email. Fees depend on who you are: commercial requesters pay search, review, and copying costs, while news media, educational, and noncommercial scientific requesters generally pay only for copying. You can also ask for a fee waiver if disclosure is in the public interest. Many agencies post their fee schedules online.</p>

      <h2>If Your Request Is Denied or Delayed</h2>
      <p>Agencies may withhold information that falls under one of nine statutory exemptions, such as certain national security, personal privacy, and law enforcement material. Even when an exemption applies, the agency is supposed to release the parts that can be separated. A denial letter must explain your right to appeal. A common deadline for an administrative appeal is at least 90 days after the denial, but check your letter for the exact date. The Office of Government Information Services (OGIS) offers free mediation of FOIA disputes, and requesters can also take a dispute to federal court.</p>

      <h2>Federal vs. State Requests</h2>
      <p>FOIA covers federal executive branch agencies. It does not apply to Congress, federal courts, or state and local governments. For records held by a city, county, school district, or state agency, you need that state's own public records law, which has its own name, deadlines, fees, and exemptions. State attorney general offices or open-government organizations often publish plain-language guides and sample request letters.</p>
  `,

  "common-mistakes-people-make-when-searching-court-records": `
      <h2>A Better Search Routine</h2>
      <ol>
        <li><strong>Decide the court level first.</strong> Federal, state, and county courts keep separate records. Think about where a dispute would have been filed.</li>
        <li><strong>Search several name forms.</strong> Try full name, middle initial, previous names, and business names if relevant.</li>
        <li><strong>Narrow with identifiers.</strong> Use birth year, address, or case number where the system allows.</li>
        <li><strong>Open the docket, not just the case list.</strong> The final disposition is on the docket.</li>
        <li><strong>Write down what you found.</strong> Save the court, case number, date viewed, and a copy of the page.</li>
      </ol>

      <h2>Confirming You Have the Right Person</h2>
      <p>Court systems show many people with the same or similar names. Before you decide a record belongs to someone, match at least two independent details, such as date of birth, a known address, a middle name, or the other parties and attorneys. If the record only gives a first and last name, treat the match as unconfirmed. Wrongly attributing a case to someone can cause serious harm, and if you plan to use a record for a decision about a person, the rules of the Fair Credit Reporting Act may apply.</p>

      <h2>When to Call the Clerk</h2>
      <p>If you are unsure whether a record is complete, call or write the clerk's office. Clerks can tell you how far back the online system goes, whether a case was transferred, sealed, or consolidated, and how to order copies. They cannot give legal advice, but they can explain what is available and how to request it.</p>

      <h2>Quick Checklist</h2>
      <ul>
        <li>Right court and right county?</li>
        <li>Name variations and spelling checked?</li>
        <li>Identity confirmed with two details?</li>
        <li>Final disposition read, not just the charge or claim?</li>
        <li>Source and date saved?</li>
      </ul>
  `,

  "how-to-read-a-docket-sheet-in-civil-lawsuits": `
      <h2>Anatomy of a Docket Entry</h2>
      <p>Most docket entries have three parts: the date the document was filed, an entry number, and a short text description written by court staff. Entries are listed in order, so you can read a case from the top like a timeline. If a document is attached to an entry, the number can be used to request or download it. Federal dockets usually number every entry, while some state systems use different formats.</p>

      <h2>Common Entries and What They Mean</h2>
      <ul>
        <li><strong>Complaint or petition:</strong> the document that starts the case and states the plaintiff's claims.</li>
        <li><strong>Summons issued / proof of service:</strong> the defendant has been notified or the court has recorded that service was completed.</li>
        <li><strong>Answer:</strong> the defendant's formal response to the claims.</li>
        <li><strong>Motion to dismiss:</strong> a request to end the case early, usually on legal grounds.</li>
        <li><strong>Scheduling order:</strong> sets deadlines for discovery, motions, and trial.</li>
        <li><strong>Motion for summary judgment:</strong> asks the judge to decide all or part of the case without a trial.</li>
        <li><strong>Notice of settlement or stipulation of dismissal:</strong> the parties have resolved the case or agreed to end it.</li>
        <li><strong>Judgment:</strong> the court's final decision on the case.</li>
        <li><strong>Notice of appeal:</strong> a party is asking a higher court to review the decision.</li>
      </ul>

      <h2>Telling Whether a Case Is Active or Finished</h2>
      <p>Look at the most recent entries. Recent activity and upcoming hearing dates suggest an ongoing case. A final judgment, dismissal, or closing entry points to the end of the trial court phase, though appeals or enforcement may follow. A long gap between entries is not unusual, since cases can pause while parties negotiate or wait for a ruling.</p>

      <h2>Cautions for Beginners</h2>
      <ul>
        <li>A filing is an allegation, not a finding. A complaint alone does not prove anything.</li>
        <li>Some entries are sealed or restricted and will appear only as a placeholder or not at all.</li>
        <li>Docket wording differs between courts. When an entry is unclear, read the underlying document if it is available, or ask the clerk's office.</li>
      </ul>
  `,

  "the-importance-of-registered-agents-in-business-filings": `
      <h2>Finding the Registered Agent on a Public Filing</h2>
      <p>On a Secretary of State entity record, the registered agent usually appears with a name and a street address in the state. The record may also show whether the agent has resigned. This information tells you where official legal papers for the company, such as a lawsuit summons or a tax notice, are supposed to be delivered.</p>

      <h2>Basic Requirements</h2>
      <ul>
        <li>The agent must be an individual who lives in the state or a business entity authorized to act as an agent there.</li>
        <li>The agent must have a physical street address in the state. Post office boxes are generally not accepted.</li>
        <li>The agent must be available during normal business hours to accept documents.</li>
      </ul>
      <p>Specific rules differ by state, so check the filing office's guidance for exact requirements.</p>

      <h2>What Happens If the Agent Is Missing or Resigns</h2>
      <p>If a company has no valid agent, it can be placed in a delinquent or noncompliant status, and in some states it can be administratively dissolved or revoked. A more serious risk is that legal papers may not reach the company, which can lead to a default judgment. If an agent resigns, the company must usually file a change of agent with the state. When you see a company with a resigned or missing agent in a public record, it can be a sign of poor administration.</p>

      <h2>Reading Agent Information During Research</h2>
      <p>Many legitimate companies use commercial registered agent services, so the same agent address may appear on thousands of records. That alone is not a warning sign. It does mean the agent's address is not necessarily the company's office, so look for a principal address or other contact details. If you need to serve legal papers on a business, the registered agent is usually the right person to serve.</p>
  `,

  "how-to-verify-a-contractors-business-license": `
      <h2>What a License Does and Does Not Prove</h2>
      <p>An active license shows that the contractor met the state's requirements to work in a particular trade and classification. It does not guarantee quality, honesty, or financial stability. Check that the license class covers the type of work you are hiring for, since many states have separate classifications for different trades or project sizes. Also confirm that the name on the license matches the name on the contract and the person who will sign it.</p>

      <h2>Insurance and Bonds</h2>
      <ul>
        <li><strong>General liability insurance:</strong> covers property damage or injuries caused by the work.</li>
        <li><strong>Workers' compensation:</strong> covers injuries to the contractor's employees. If it is missing, you could face risk if a worker is hurt on your property, depending on your state's rules.</li>
        <li><strong>License bond:</strong> some states require a bond that can compensate customers in certain cases.</li>
      </ul>
      <p>Ask for a certificate of insurance and request that it be sent directly from the insurer or agent rather than relying on a copy from the contractor. Confirm the policy dates are current.</p>

      <h2>Risks of Hiring an Unlicensed Contractor</h2>
      <p>Rules differ, but in some states an unlicensed contractor cannot enforce a payment contract in court, and homeowners may lose access to certain protections or recovery funds. Local permits can also be a problem, because many jurisdictions require a licensed contractor to pull permits for larger jobs. If a contractor asks you to pull permits yourself or pay mostly in cash, ask why.</p>

      <h2>Verification Checklist</h2>
      <ul>
        <li>Look up the license number on the state licensing board site.</li>
        <li>Confirm status is active and the expiration date is in the future.</li>
        <li>Check the classification matches the job.</li>
        <li>Read any complaints, citations, or disciplinary actions.</li>
        <li>Search county court records for lawsuits involving the contractor.</li>
        <li>Verify insurance directly with the provider.</li>
        <li>Get a written contract and a payment schedule tied to progress.</li>
      </ul>
  `,

  "understanding-civil-vs-criminal-court-records": `
      <h2>Key Terms That Differ</h2>
      <ul>
        <li><strong>Parties:</strong> in a civil case, a plaintiff sues a defendant. In a criminal case, the government (the state or the United States) prosecutes a defendant.</li>
        <li><strong>Standard of proof:</strong> civil plaintiffs generally must prove their case by a preponderance of the evidence, meaning more likely than not. Criminal prosecutors must prove guilt beyond a reasonable doubt.</li>
        <li><strong>Possible outcomes:</strong> civil cases usually result in money damages or an order to do or stop doing something. Criminal cases can result in fines, probation, or incarceration.</li>
      </ul>

      <h2>Reading Case Numbers and Types</h2>
      <p>Case numbers often include a year and a letter code showing the case type, such as civil, criminal, traffic, family, or probate. The codes differ from court to court, so check the court's own explanation. Many courts keep separate records and separate search tools for criminal, traffic, small claims, family, and probate matters, so searching only one can miss others.</p>

      <h2>What a Disposition Tells You</h2>
      <p>The disposition is the outcome of the case. In criminal cases you may see "convicted," "acquitted," "dismissed," or "deferred." In civil cases you may see "judgment for plaintiff," "judgment for defendant," "dismissed," or "settled." A dismissal or settlement is not a finding of fault, and an arrest or charge is not a conviction. Reading the final disposition is the single most important step.</p>

      <h2>Using Records Responsibly</h2>
      <p>Court records are public, but how you use them matters. Decisions about employment, housing, or credit that rely on criminal or civil records can be subject to the Fair Credit Reporting Act and state or local laws, including limits on considering certain older or dismissed matters. If you are making a decision about a person, get legal advice on what you may consider and what notices are required.</p>
  `,

  "why-delaware-is-the-most-popular-state-for-llc-formation": `
      <h2>Costs and Requirements</h2>
      <p>Delaware LLCs must keep a registered agent in Delaware and pay an annual LLC tax, which has been a flat amount of $300 due by June 1 each year. Confirm the current amount with the Delaware Division of Corporations. Forming in Delaware also does not remove obligations elsewhere: if the LLC actually does business in another state, it usually must register there as a foreign LLC and pay that state's fees and taxes. For many small businesses that operate in a single state, forming in that state is simpler and can cost less overall.</p>

      <h2>What a Delaware Public Record Shows</h2>
      <p>The state's online entity search lets anyone look up a company's name, file number, formation date, entity type, and registered agent. Member and manager names are typically not required in the formation certificate, which is one reason Delaware is associated with privacy. A certificate of good standing can be ordered for a fee. Keep in mind that a business may still have to disclose owners to banks, the IRS, or other parties, and ownership can sometimes be found through court records.</p>

      <h2>Who Delaware Fits Best</h2>
      <ul>
        <li>Companies planning to raise venture capital or go public, where investors are familiar with Delaware law.</li>
        <li>Businesses that want the predictability of Delaware's corporate case law and its specialized business court.</li>
        <li>Holding companies and entities with owners in several states.</li>
      </ul>
      <p>For a local service business with owners and customers in one state, home-state formation is often the better fit. A business attorney or accountant can compare the full costs for your situation.</p>
  `,

  "how-to-search-bankruptcy-records-using-pacer": `
      <h2>Reading a Bankruptcy Case Number</h2>
      <p>Bankruptcy case numbers typically combine a division or office code, the year, a "bk" designation, and a sequence number. The court name tells you which district the case was filed in. Cases can be filed where the debtor lives or has their principal place of business, so a company may file in a different state than you would guess.</p>

      <h2>Common Docket Entries</h2>
      <ul>
        <li><strong>Voluntary petition:</strong> the document that opens the case.</li>
        <li><strong>Meeting of creditors (341 meeting):</strong> the required meeting where the trustee and creditors can question the debtor.</li>
        <li><strong>Proof of claim:</strong> a creditor's filing asserting how much it is owed.</li>
        <li><strong>Discharge order:</strong> releases the debtor from eligible debts.</li>
        <li><strong>Order dismissing case:</strong> the case ended without a discharge.</li>
        <li><strong>Final decree or case closed:</strong> the court has finished administering the case.</li>
      </ul>

      <h2>Avoiding Surprise Costs</h2>
      <p>PACER charges per page, with a cap for each document, and waives fees when your account stays under a quarterly threshold. Searching the Case Locator and viewing a case summary is often inexpensive, while downloading many long documents can add up. Check the current fee schedule on the PACER website and review the page count before you open a large filing.</p>

      <h2>Handle the Information With Care</h2>
      <p>Bankruptcy filings include financial details of people and companies. Personal identifiers are redacted under court rules, but remaining information can still be sensitive. Use it for legitimate purposes such as due diligence or research, and do not republish personal details unnecessarily.</p>
  `,

  "understanding-chapter-7-vs-chapter-13-bankruptcy-filings": `
      <h2>Other Chapters You May Encounter</h2>
      <ul>
        <li><strong>Chapter 11:</strong> reorganization, most often used by businesses but also available to some individuals. A small business version, called Subchapter V, has a streamlined process.</li>
        <li><strong>Chapter 12:</strong> a repayment-style option for family farmers and fishermen.</li>
        <li><strong>Chapter 15:</strong> handles cross-border cases involving foreign proceedings.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <p><strong>Are bankruptcy records public?</strong> Yes. Filings in federal bankruptcy court are generally public, with personal identifiers redacted.</p>
      <p><strong>Does a discharge erase every debt?</strong> No. Certain debts, such as most student loans, child support, and some taxes, are generally not discharged, though there are exceptions. A bankruptcy attorney can explain how this applies to a specific case.</p>
      <p><strong>Can a bankruptcy record be removed from PACER?</strong> Generally no. Credit report entries age off after a set number of years, but the court record remains available.</p>
      <p><strong>Can I tell from a docket whether someone completed a Chapter 13 plan?</strong> Look for a discharge order or a case closing entry. A dismissal usually means the plan was not completed.</p>
  `,

  "the-role-of-public-records-in-journalistic-investigations": `
      <h2>Worked Example: Tracing a Local Contract</h2>
      <p>Suppose a county awarded a large repaving contract and you want to understand who benefited. A practical path might look like this:</p>
      <ol>
        <li>Find the contract award in the county board's meeting minutes and agenda packets.</li>
        <li>Look up the winning company on the Secretary of State website to confirm its status, formation date, and registered agent.</li>
        <li>Search county and federal court records for lawsuits or liens involving the company.</li>
        <li>Check campaign finance reports for donations from the company or its principals to officials who voted on the award.</li>
        <li>File a records request for the bids, scoring sheets, and change orders.</li>
        <li>Ask the company and the county for comment before drawing conclusions.</li>
      </ol>
      <p>Each step uses a different public source, and none of them proves wrongdoing alone. The value is in lining up documents, checking dates, and reporting only what the documents support.</p>

      <h2>Keeping a Clean Research Log</h2>
      <p>Write down where each fact came from, the date you accessed it, and the document or case number. Save copies of key documents, since websites change. A simple spreadsheet with columns for source, date, link, and notes makes it easy for an editor or reader to check your work.</p>
  `,

  "how-to-conduct-due-diligence-on-a-new-business-partner": `
      <h2>A Simple Due Diligence Log</h2>
      <p>Keep a short record of each check so that you can show what you verified and when. Useful columns are the check performed, the source, the date, what you found, and any follow-up needed. For example: "Business status, State Secretary of State, active, formed 2019, agent confirmed." A log also makes it easier to repeat checks before renewing a contract.</p>

      <h2>Frequently Asked Questions</h2>
      <p><strong>How long should this take?</strong> A basic check of entity status, liens, lawsuits, and bankruptcy for a small company can often be done in an hour or two, while a large or high-risk relationship needs more time and professional help.</p>
      <p><strong>What if I find a lawsuit?</strong> Read the case to see what it is about and how it ended. A single dismissed dispute is often not meaningful, while repeated claims of non-payment or fraud are more serious.</p>
      <p><strong>Should I tell the partner I am checking?</strong> Many businesses expect it and will provide documents. Being open about standard checks usually builds trust.</p>
      <p><strong>Is this enough?</strong> Public records show a company's legal and litigation history, not its current cash position or reputation. Combine them with references, financial statements, and contract protections.</p>
  `,

  "protecting-your-privacy-when-searching-public-records": `
      <h2>If Your Information Is Wrong or Exposed</h2>
      <ol>
        <li><strong>Identify the source.</strong> Find which office or website published the record.</li>
        <li><strong>Contact the custodian.</strong> For a court record, contact the clerk. For a property or business record, contact the recorder or Secretary of State. Ask about their process for corrections or redaction.</li>
        <li><strong>Put the request in writing.</strong> Include the case or document number, what is wrong, and why.</li>
        <li><strong>Ask about legal options.</strong> Sealing, expungement, and redaction orders are decided by the court and differ by state. Legal aid organizations may help at low or no cost.</li>
        <li><strong>Follow up with brokers.</strong> If third-party sites copied the record, use their opt-out forms.</li>
      </ol>

      <h2>Frequently Asked Questions</h2>
      <p><strong>Can someone see that I looked up a record?</strong> Usually not another member of the public, but the website operator may log activity, and some systems that require an account link searches to that account.</p>
      <p><strong>Are free-looking people-search sites safe?</strong> Many are advertising or data-selling businesses. Using the official source directly avoids that.</p>
  `,

  "how-to-request-certified-copies-of-public-records": `
      <h2>Sample Request Letter</h2>
      <p>If the office has no form, a short letter or email like this works:</p>
      <p><em>To the Clerk of Court: Please provide one certified copy of the final judgment in Case No. [number], [Party A] v. [Party B], filed on [date]. I am enclosing payment for the copy and certification fees (or please let me know the total). Please send the copy to the address below. Contact: [name, address, phone, email].</em></p>

      <h2>Frequently Asked Questions</h2>
      <p><strong>How recent does a certified copy need to be?</strong> It depends on who is asking. Some banks and agencies require certification within a set number of days or months, so ask them.</p>
      <p><strong>Can anyone order a certified copy?</strong> For ordinary court, land, and business records, usually yes. Vital records and sealed or confidential records are restricted.</p>
      <p><strong>What if the office cannot find the record?</strong> Ask them to confirm the search criteria used, double-check the case or document number, and consider whether the record is held by another office or an archive.</p>
  `,

  "county-clerk-vs-recorder-vs-assessor-who-holds-which-records": `
      <h2>Example: Researching a House Before You Buy</h2>
      <ol>
        <li><strong>Assessor:</strong> confirm the owner on the tax roll, parcel number, lot size, and assessed value.</li>
        <li><strong>Recorder or Register of Deeds:</strong> review the deed history and look for mortgages, easements, and liens.</li>
        <li><strong>Treasurer or Tax Collector:</strong> check that property taxes are paid.</li>
        <li><strong>Clerk of Court:</strong> search for lawsuits, foreclosures, or judgments involving the owner.</li>
        <li><strong>Local building or permit office:</strong> check permits and any open code violations.</li>
      </ol>

      <h2>Frequently Asked Questions</h2>
      <p><strong>Why can't I find my county's recorder?</strong> The office may be part of the clerk's office, the county auditor, or another department. Search the county website for "deeds" or "land records."</p>
      <p><strong>Do all counties offer online search?</strong> No. Larger counties often do, while small counties may offer only an index or in-person access.</p>
  `,

  "pacer-vs-courtlistener-which-should-you-use": `
      <h2>Example: Looking Up a Company's Federal Lawsuits</h2>
      <p>Say you want to know whether a vendor has been sued in federal court. Search the company name on CourtListener first to see any dockets and free documents. Then run the same name through the PACER Case Locator to catch cases that have not been archived. Compare the case numbers, open each docket, and read the most recent entries to see the status. Download paid documents only for cases that matter to you.</p>

      <h2>Frequently Asked Questions</h2>
      <p><strong>Is CourtListener a replacement for PACER?</strong> Not fully. It is a valuable free resource, but PACER remains the official source and the most complete.</p>
      <p><strong>Do I need an account?</strong> PACER requires one. CourtListener lets you search without an account, and an account adds features such as alerts.</p>
      <p><strong>Do these cover state court cases?</strong> No. For state and county cases, use the court's own website or clerk.</p>
  `
};
