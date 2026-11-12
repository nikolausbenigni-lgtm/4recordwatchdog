// Expanded replacements for the thinnest articles in blogData.js.
// Keyed by slug. posts.js merges these over the originals and marks them as updated.

export const rewrites = {
  "how-to-find-property-records-and-liens-in-your-county": {
    excerpt: "Property records are split between several county offices. Learn which office holds ownership, tax, and lien information, how to search each one, and how to read what you find.",
    content: `
      <p>Property records in the United States are kept at the county level, and no single national database covers them. The information you want is usually split between two or three offices, and each one answers a different question. Knowing which office to check saves hours of searching and keeps you from mistaking a tax-assessment page for a legal title record.</p>

      <h2>Which County Office Holds What</h2>
      <ul>
        <li><strong>Assessor:</strong> estimates property value for taxation. It lists the owner of record, parcel number (APN), lot size, building details, and assessed value. It is not the authoritative record of who legally holds title.</li>
        <li><strong>Recorder, Register of Deeds, or Clerk of Court (the name varies by state):</strong> stores recorded deeds, mortgages or deeds of trust, easements, liens, and the releases that cancel them. This is the office that matters for ownership history and encumbrances.</li>
        <li><strong>Treasurer or Tax Collector:</strong> shows whether property taxes are paid, what is owed, and whether a tax lien or tax sale is pending.</li>
      </ul>

      <h2>Step 1: Gather Identifiers</h2>
      <p>Start with the full street address and, if you can get it, the parcel number. Parcel numbers are the most reliable way to search because addresses change and owner names can be misspelled or recorded in different forms. Most assessor websites let you look up the parcel number from an address, and that number can then be used at the recorder and tax collector.</p>

      <h2>Step 2: Check the Assessor Record</h2>
      <p>Open the county assessor's property search and enter the address or parcel number. Confirm the legal description, the owner name on the tax roll, the mailing address, and the assessed value. A mismatch between the owner on the tax roll and the person selling a property is worth investigating, since the roll can lag behind a recent sale by weeks or months.</p>

      <h2>Step 3: Search the Recorder's Index</h2>
      <p>Recorder databases are normally searched by grantor and grantee (seller and buyer), by document type, by date range, or by document number. To trace the history of a property, search the current owner as grantee to find the deed that gave them title, then search that deed's seller to move one step back. Look for each recorded mortgage and then look for the matching "release," "reconveyance," or "satisfaction of mortgage." A mortgage with no recorded release is not automatically still owed, since lenders sometimes record releases late, but it should be confirmed.</p>

      <h2>Common Types of Liens</h2>
      <ul>
        <li><strong>Mortgage or deed of trust:</strong> secures a home loan.</li>
        <li><strong>Property tax lien:</strong> arises from unpaid local property taxes and typically ranks ahead of most other claims.</li>
        <li><strong>Mechanic's or contractor's lien:</strong> filed by a contractor or supplier who says they were not paid for work on the property.</li>
        <li><strong>HOA or condominium lien:</strong> filed by an association for unpaid assessments.</li>
        <li><strong>Judgment lien:</strong> created when a court judgment against an owner is recorded against their real estate.</li>
        <li><strong>Federal or state tax lien:</strong> a recorded notice that a tax agency claims the owner owes unpaid taxes.</li>
      </ul>

      <h2>Step 4: Check Taxes and Pending Actions</h2>
      <p>On the treasurer or tax collector site, look for delinquent amounts and any tax sale status. In the recorder's index, also search for a "lis pendens," which is a notice that a lawsuit or foreclosure involving the property has been filed. Court case records at the county clerk can show the lawsuit itself.</p>

      <h2>Costs, Limits, and Timing</h2>
      <ul>
        <li>Searching is free in many counties, but copies, and especially certified copies, usually carry a per-page fee.</li>
        <li>Online indexes may only reach back a certain number of years. Older deeds can require a visit, a records request, or microfilm.</li>
        <li>Recording is not instant. A deed or lien filed this week may take days or weeks to appear in the online index.</li>
        <li>Search every spelling and name variation for the owner, including maiden names, initials, and entity names, because indexing errors are common.</li>
      </ul>

      <h2>Common Mistakes</h2>
      <ul>
        <li>Treating assessed value as market value or as proof of ownership.</li>
        <li>Searching only the owner's name and missing liens recorded against the property description or parcel.</li>
        <li>Ignoring recorded releases and wrongly assuming an old lien is still active.</li>
        <li>Relying on a free online search as a substitute for a title search before a purchase.</li>
      </ul>

      <h2>When a Free Search Is Not Enough</h2>
      <p>Public searches are a good way to screen a property or confirm facts, but they are not a title guarantee. For a purchase, a refinance, or a lien dispute, title companies and real estate attorneys search the full chain of title and offer title insurance, which protects you if something is missed. Procedures and office names differ by state, so confirm details with the county office directly.</p>
    `
  },

  "protecting-your-privacy-when-searching-public-records": {
    excerpt: "Looking up public records leaves traces, and your own information may be searchable too. Practical steps for safer searching and for limiting what others can find about you.",
    content: `
      <p>Public records are open by design, but that openness cuts both ways. Searching them can leave a trail, and the records you create in daily life, such as buying property, starting a business, or appearing in court, can make your own details easy to find. This guide covers two questions: how to search more safely, and how to reduce what others can learn about you.</p>

      <h2>Searching More Safely</h2>
      <p>The safest searches use official sources. Government portals ending in .gov, and the websites of county clerks, recorders, and courts, publish records directly. Commercial "people search" sites repackage that same data, sometimes with errors, and often push paid reports or sell the details of what you searched. If a site asks for payment to show "free" public information, check whether the official source offers it at no charge first.</p>
      <ul>
        <li><strong>Assume portals keep logs.</strong> Government sites may record IP addresses and, where an account is required, tie searches to that account. PACER, the federal court system, requires registration and tracks usage for billing.</li>
        <li><strong>Use a private connection.</strong> Avoid public Wi-Fi when logging into any records account.</li>
        <li><strong>Share as little as needed.</strong> You almost never need to enter a Social Security number to search a record. Be wary of any site that asks for one.</li>
        <li><strong>Check the address bar.</strong> Look-alike sites copy the appearance of official portals. Type the address yourself or follow links from a state or county homepage.</li>
      </ul>

      <h2>What Records Show About You</h2>
      <p>Common places your information appears include county property records (owner name and mailing address), court dockets, business filings (officer names and registered agent addresses), professional license databases, and campaign donation records. Run your own name through the county recorder, the courts where you have lived, and the Secretary of State business search to see what is visible.</p>

      <h2>Ways to Limit Exposure</h2>
      <ul>
        <li><strong>Use a registered agent address for a business</strong> instead of your home address, where state law allows it.</li>
        <li><strong>Ask about address confidentiality programs.</strong> Many states run programs for survivors of domestic violence, stalking, and similar situations that provide a substitute address for public records and voter registration. Eligibility rules vary.</li>
        <li><strong>Know the redaction rules.</strong> Under the federal court rules, filers must redact Social Security numbers to the last four digits, birth dates to the year, minors' names to initials, and financial account numbers to the last four digits. Many state courts have similar rules. If sensitive data appears unredacted, contact the court clerk and ask about its process for correcting it.</li>
        <li><strong>Ask about sealing or expungement.</strong> Some records can be sealed or expunged. The eligibility rules are state-specific, and a legal aid office or attorney can tell you what applies.</li>
        <li><strong>Opt out of data brokers.</strong> Many commercial sites that republish public records provide an opt-out form. This removes the listing from that site, but it does not change the underlying government record.</li>
      </ul>

      <h2>Searching Responsibly</h2>
      <p>Public does not mean unrestricted. Records pulled for tenant screening, employment, or credit decisions fall under the Fair Credit Reporting Act when they come from a consumer reporting agency, and misusing personal information to harass or stalk someone can break state and federal law. Use records for legitimate purposes, such as verifying a business, researching a property, or understanding a court case.</p>

      <h2>Quick Checklist</h2>
      <ul>
        <li>Start at the official .gov source.</li>
        <li>Never enter a Social Security number to run a search.</li>
        <li>Search your own name to see what is public.</li>
        <li>Look into address confidentiality or sealing if you have a safety concern.</li>
        <li>Record the source, date, and case or document number of anything you rely on.</li>
      </ul>
    `
  },

  "the-role-of-public-records-in-journalistic-investigations": {
    excerpt: "How reporters and researchers use FOIA requests, court dockets, property and business filings to build verifiable stories, and the habits that keep that work accurate.",
    content: `
      <p>Many accountability stories begin with a document that anyone could have requested. Public records give reporters, researchers, and curious residents a way to check claims against official sources instead of relying on statements alone. This guide explains the main record types investigators use, how records requests work, and the verification habits that prevent errors.</p>

      <h2>Core Record Types</h2>
      <ul>
        <li><strong>Court records:</strong> dockets, complaints, motions, and judgments show disputes and outcomes. Federal cases are searchable through PACER and, in part, through the free CourtListener archive. State and county courts run their own systems.</li>
        <li><strong>Business filings:</strong> Secretary of State records show when an entity was formed, its status, and its registered agent. They can help trace connected companies.</li>
        <li><strong>Property records:</strong> county recorders and assessors show ownership, sales, mortgages, and liens.</li>
        <li><strong>Campaign finance:</strong> federal filings are published by the Federal Election Commission, and state agencies publish state-level reports.</li>
        <li><strong>Government spending and contracts:</strong> budgets, meeting minutes, and contract databases show how public money is used.</li>
        <li><strong>Inspection and licensing records:</strong> regulators publish restaurant inspections, professional licenses, and enforcement actions.</li>
      </ul>

      <h2>Using Records Requests</h2>
      <p>The federal Freedom of Information Act (FOIA) lets anyone request records from executive branch agencies. It does not apply to Congress, the federal courts, or state and local governments. Every state has its own public records law, with different deadlines, fees, and exemptions. Under FOIA, an agency generally has 20 business days to respond, though extensions and backlogs are common.</p>
      <ul>
        <li><strong>Be specific.</strong> Name the record type, the office, and a date range. Narrow requests are processed faster than broad ones.</li>
        <li><strong>Ask about fees.</strong> Requesters who are representatives of the news media, educational institutions, or noncommercial scientific groups generally pay reduced fees. You can also request a fee waiver if disclosure serves the public interest.</li>
        <li><strong>Expect exemptions.</strong> FOIA lists nine categories that agencies can withhold, including certain personal privacy, law enforcement, and national security information. A partial release with redactions is common.</li>
        <li><strong>Appeal denials.</strong> Agencies must explain how to appeal. Appeal rights and deadlines are stated in the denial letter.</li>
        <li><strong>Keep your own record.</strong> Save the request, tracking number, dates, and every reply.</li>
      </ul>

      <h2>Verification Habits That Prevent Mistakes</h2>
      <ul>
        <li><strong>Confirm identity.</strong> Common names produce false matches. Check birth year, address, business role, or case number before connecting a record to a person.</li>
        <li><strong>Separate charges from outcomes.</strong> A charge, a conviction, and a dismissal are different facts. Check the final disposition on the docket.</li>
        <li><strong>Read the primary document.</strong> Do not rely on a summary, a data broker, or a news article that repeats a docket entry.</li>
        <li><strong>Note the date.</strong> Records change. State the date you viewed a record and update when it changes.</li>
        <li><strong>Seek comment.</strong> Give the person or organization named in a record a chance to respond.</li>
      </ul>

      <h2>Corrections and Care</h2>
      <p>Records can contain errors, outdated information, or details about people who are not the subject of the story. If a mistake is found after publication, correct it plainly and quickly. Be careful with the personal information of private individuals in records, such as addresses or account numbers, and publish only what is necessary and in the public interest.</p>

      <h2>Where to Start</h2>
      <p>Pick one question you can answer with a document, identify which office holds it, and check whether an online database exists before filing a request. Official portals are listed in our directory by state, and the other guides on this site explain how to read dockets, search business filings, and find property records.</p>
    `
  },

  "how-to-conduct-due-diligence-on-a-new-business-partner": {
    excerpt: "A practical, step-by-step checklist for verifying a company or partner using public records: entity status, filings, liens, lawsuits, bankruptcy, licenses, and sanctions lists.",
    content: `
      <p>Before you sign a contract, share money, or hand over customer data, it pays to confirm that a business is what it says it is. Public records can answer many basic questions for free: whether the company legally exists, whether it is in good standing, whether it owes secured debts, and whether it has a history of lawsuits or bankruptcy. This checklist walks through each step and what to look for.</p>

      <h2>Step 1: Confirm the Business Exists</h2>
      <p>Search the Secretary of State (or equivalent business filing office) in the state where the company was formed. Record the exact legal name, entity type, formation date, status, and registered agent. A status such as "active" or "good standing" is a good sign. "Inactive," "revoked," "dissolved," or "delinquent" means the company may not be allowed to do business and deserves questions. Also check whether it is registered in your own state if it operates there.</p>

      <h2>Step 2: Match the Details</h2>
      <p>Compare the name, address, and officer names in the filing to what the partner told you and what appears on their contract and invoices. Differences are not always a problem, since companies use trade names and move offices, but unexplained differences are worth clearing up. Ask for a signed IRS Form W-9 and a certificate of good standing if the deal is significant.</p>

      <h2>Step 3: Look for Secured Debts and Liens</h2>
      <p>UCC filings, searchable through the Secretary of State in most states, show lenders who have a claim on a company's assets. County and state records may also show tax liens and judgment liens. A heavily encumbered company may have little left to satisfy a new creditor.</p>

      <h2>Step 4: Search Court Records</h2>
      <p>Search the company and its principals in county or state civil court records where they operate, and in federal courts through PACER or CourtListener. Look at how many cases exist, what they are about, and how they ended. A few contract disputes are ordinary for an established business. A pattern of unpaid vendors or fraud claims is not.</p>

      <h2>Step 5: Check Bankruptcy</h2>
      <p>Bankruptcy filings are in the federal court system. Search the business and its owners in PACER's Case Locator. A past bankruptcy does not automatically disqualify anyone, but it tells you about financial risk and the chapter filed, as described in our guide to Chapter 7 and Chapter 13.</p>

      <h2>Step 6: Verify Licenses and Registrations</h2>
      <p>If the work requires a license, such as contracting, real estate, healthcare, or financial services, verify it with the state licensing board and check for disciplinary actions. Public companies and some private fundraisings file with the SEC, and its EDGAR database is free to search.</p>

      <h2>Step 7: Screen Government Exclusion and Sanctions Lists</h2>
      <p>If you do business with government contractors or international parties, check the federal System for Award Management (SAM.gov) exclusion records and the Treasury Department's OFAC sanctions list search. These are free official tools.</p>

      <h2>Warning Signs</h2>
      <ul>
        <li>The company was formed very recently but claims a long track record.</li>
        <li>The business is not in good standing, or its registered agent has resigned.</li>
        <li>Names, addresses, or officers differ across documents.</li>
        <li>Multiple lawsuits from vendors, customers, or employees on similar claims.</li>
        <li>The partner will not provide basic documents or pushes you to skip checks.</li>
      </ul>

      <h2>Limits and Good Practice</h2>
      <p>Ownership details are not always public, so ask directly who owns and controls the business. A registered agent address is not an office, and many legitimate companies use a commercial agent. Save screenshots or copies of everything you rely on with the date. If you intend to run credit or background reports on individual people, rules such as the Fair Credit Reporting Act may apply, and an attorney can advise you. For large deals, public searches are a starting point, not a replacement for legal and financial review.</p>
    `
  },

  "understanding-chapter-7-vs-chapter-13-bankruptcy-filings": {
    excerpt: "How Chapter 7 and Chapter 13 differ, what each leaves in the public record, and how to tell them apart when reading a federal bankruptcy docket.",
    content: `
      <p>Bankruptcy cases are filed in federal court, and most of what is filed is public. If you are researching a person or company, or reviewing your own case, it helps to know what Chapter 7 and Chapter 13 mean and how each shows up in the records. This article is for general information and is not legal advice.</p>

      <h2>Chapter 7: Liquidation</h2>
      <p>Chapter 7 is often called "liquidation" or "straight" bankruptcy. A court-appointed trustee reviews the debtor's assets, can sell property that is not protected by exemptions, and distributes the proceeds to creditors. Individuals who qualify usually receive a discharge, which releases them from personal liability on eligible debts. Eligibility for individuals depends in part on a "means test" that compares income to the state median. A typical case lasts a few months. Many individual cases are "no-asset" cases, meaning the trustee finds nothing to distribute.</p>

      <h2>Chapter 13: Repayment Plan</h2>
      <p>Chapter 13 is for individuals with regular income who propose a plan to repay some or all of their debts over three to five years. The debtor generally keeps their property and pays the trustee under a court-confirmed plan. It can be used to catch up on missed mortgage payments and stop a foreclosure while payments are made. Chapter 13 has debt limits set by law, and the amounts are adjusted periodically.</p>

      <h2>Key Differences</h2>
      <ul>
        <li><strong>Purpose:</strong> Chapter 7 wipes out eligible debts through liquidation. Chapter 13 reorganizes debts through a repayment plan.</li>
        <li><strong>Property:</strong> Chapter 7 may involve selling nonexempt assets. Chapter 13 generally lets the debtor keep property.</li>
        <li><strong>Length:</strong> Chapter 7 is typically months. Chapter 13 is three to five years.</li>
        <li><strong>Eligibility:</strong> Chapter 7 uses a means test. Chapter 13 requires regular income and falls within debt limits.</li>
        <li><strong>Credit reporting:</strong> Credit bureaus commonly report Chapter 7 for up to 10 years and Chapter 13 for about 7 years, though practices and exceptions vary.</li>
      </ul>

      <h2>What the Public Record Contains</h2>
      <p>A bankruptcy docket usually includes the voluntary petition, schedules listing assets, debts, income, and expenses, a statement of financial affairs, a creditor list, trustee reports, and orders. Personal identifiers are redacted under court rules, so you will not see full Social Security numbers. These records are valuable for due diligence and for understanding a case, but they contain sensitive financial information, so use them responsibly.</p>

      <h2>How to Tell the Chapter on a Docket</h2>
      <ul>
        <li>The case header or docket text states the chapter, for example "Chapter 7" or "Chapter 13."</li>
        <li>An "order confirming plan" and trustee payment entries point to Chapter 13.</li>
        <li>A "trustee's report of no distribution" or a discharge order shortly after the creditors' meeting is typical of a Chapter 7 no-asset case.</li>
        <li>A case can be converted from one chapter to another, and the docket will show the conversion order.</li>
      </ul>

      <h2>Discharge vs. Dismissal</h2>
      <p>A discharge means eligible debts were legally released. A dismissal means the case ended without that relief, often because of missed deadlines or payments. Treating a dismissed case as a completed bankruptcy is a common error, so look for a discharge order or a closing entry before drawing a conclusion.</p>

      <h2>How to Search</h2>
      <p>Use the PACER Case Locator from the federal courts, which searches bankruptcy courts nationwide by name or case number. PACER charges $0.10 per page with a cap per document, and fees are waived if your account stays under a quarterly threshold. Verify current fees on the PACER website. You can start from the bankruptcy section of our directory, which links to the official site.</p>
    `
  }
};
