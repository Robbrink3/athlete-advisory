
/* ---------- constants ---------- */
const SECTIONS=[
 {k:"home",l:"Home",lvl:"free",g:"Start",d:"What needs your attention."},
 {k:"ask",l:"Ask",lvl:"free",g:"Start",d:"Talk or type to Scout, your AI advisor."},
 {k:"scan",l:"Scan",lvl:"free",g:"Start",d:"Snap an offer, a post, a supplement label or a report card."},
 {k:"updates",l:"Updates",lvl:"free",g:"Start",d:"Rule changes and deadlines that affect you."},
 {k:"offers",l:"Offers",lvl:"free",g:"Decide",d:"Upload offers, see risky terms and compare them."},
 {k:"schools",l:"Schools",lvl:"free",g:"Decide",d:"Track schools and see your fit."},
 {k:"grades",l:"Grades",lvl:"free",g:"Decide",d:"Core courses and GPA toward eligibility."},
 {k:"docs",l:"Documents",lvl:"free",g:"You",d:"Contracts, IDs and tax forms, encrypted on this device."},
 {k:"circle",l:"Trusted circle",lvl:"free",g:"You",d:"The people who help you decide, and what each can do."},
 {k:"sharing",l:"Sharing",lvl:"free",g:"You",d:"Move your workspace to a university or agency, with guardian approval."},
 {k:"profile",l:"Profile",lvl:"free",g:"You",d:"Your details and priorities."},
 {k:"rules",l:"Deal rules",lvl:"nil",g:"Your deals",d:"Your signed deals, turned into rules the app checks for you."},
 {k:"money",l:"Money",lvl:"nil",g:"Your deals",d:"Payments, tax set-aside and estimated tax dates."},
 {k:"social",l:"Post check",lvl:"free",g:"Decide",d:"Check a photo and caption against your deals before posting."},
 {k:"agencies",l:"Agencies",lvl:"nil",g:"Your deals",d:"Audit your agent or compare agencies."},
 {k:"rides",l:"Rides",lvl:"nil",g:"Your deals",d:"Uber, Lyft and taxi, with safety and who-pays checks."},
 {k:"campus",l:"My university",lvl:"uni",g:"University",d:"Grades, eligibility and support services from your school, plus your private vault."},
 {k:"legal",l:"Legal review",lvl:"plus",g:"NIL Deal Plus",d:"Attorney-approved changes to risky contract terms."},
 {k:"invest",l:"Investing",lvl:"plus",g:"NIL Deal Plus",d:"Goals and a plan from a registered adviser."},
 {k:"me",l:"Me",lvl:"free",g:"Start",hide:true,d:""}];
const TABS=SECTIONS.map(x=>[x.k,x.l]);
const LEVELS=["High school","NCAA D-I","NCAA D-II","NCAA D-III","NAIA","JUCO"];
const DIVS=["D-I FBS","D-I FCS","D-I (non-football)","D-II","D-III","NAIA","JUCO"];
const STATUSES=["Interested","Contacted","Visited","Offered","Committed","Ruled out"];
const OFFER_TYPES=["Third-party NIL","School revenue share","Athletic scholarship","Combined package"];
const SERVICES=["Contract negotiation","Legal review","NIL deal sourcing","Tax & financial planning","Brand & content","Compliance & NIL Go reporting","Transfer guidance","Pro transition"];
const WEIGHTS=[["money","Money now"],["longterm","Long-term value"],["playing","Playing time"],["academics","Academics"],["location","Location & family"],["brand","Brand growth"]];
const PLATFORMS=["Instagram","TikTok","YouTube","X","Snapchat","LinkedIn","Twitch","Threads","Facebook","Other"];
const PLATFORM_GUIDE={
  Instagram:["Core","good","Where most brands buy NIL posts. Use the paid-partnership label and #ad on sponsored posts."],
  TikTok:["Useful","good","High reach for short video. Some public universities restrict TikTok on school networks and devices, so check your school's policy."],
  YouTube:["Useful","good","Long-form content you own and can monetize over time. Watch for music and school footage rights."],
  X:["Caution","warn","Good for news and fan engagement, but arguments with fans and hot takes on officials or opponents travel fast."],
  Snapchat:["Low value","warn","Little brand demand. Disappearing content still gets screenshotted, so treat it as public."],
  LinkedIn:["Useful","good","Builds your career story beyond sport: internships, degree, community work."],
  Twitch:["Caution","warn","Live and unscripted. Never stream or promote betting, and avoid showing teammates without their consent."],
  Threads:["Optional","good","Low effort if you are already on Instagram. Same disclosure rules apply."],
  Facebook:["Optional","good","Useful for reaching family, alumni and local businesses in your hometown."],
  Other:["Review","warn","Ask your agent or compliance office before posting on a platform not listed here."]
};
const RELS=[
 ["parent","Parent"],["guardian","Legal guardian"],["stepparent","Stepparent"],["grandparent","Grandparent"],["sibling","Brother or sister"],
 ["auntuncle","Aunt or uncle"],["cousin","Cousin"],["partner","Partner"],["friend","Friend"],["teammate","Teammate"],
 ["hscoach","High school coach"],["collegecoach","College coach or school staff"],["agent","Sports agent"],["attorney","Attorney"],
 ["advisor","Financial advisor"],["mentor","Mentor"],["booster","Booster or school donor"],["other","Other"]];
const PERMS=[["offers","See my offers"],["money","See my money"],["cosign","Co-sign contracts"],["negotiate","Negotiate for me"],["alerts","Get my alerts"],["emergency","Emergency contact"]];
const CLAUSES=[
 {k:"perpetual",re:/perpetu|in perpetuity|irrevocabl|forever/i,label:"Perpetual or irrevocable rights",sev:"bad",why:"They could keep using your name and image after the deal ends. Ask for a fixed end date."},
 {k:"clawback",re:/repay|refund|claw ?back|forfeit|reimburse/i,label:"Repayment or clawback",sev:"bad",why:"You may have to pay money back. Find out exactly what triggers it."},
 {k:"transfer",re:/transfer|withdraw(s|al)? from|leave the (university|school|program)/i,label:"Transfer condition",sev:"warn",why:"Check what happens to the money if you transfer."},
 {k:"exclusive",re:/exclusiv|sole and only|shall not (enter|endorse|promote)/i,label:"Exclusivity",sev:"warn",why:"Limits other deals you can sign. Ask for it to cover one product category only."},
 {k:"participation",re:/roster|remain enrolled|participat|eligib|good standing|games played|playing time/i,label:"Participation or eligibility condition",sev:"warn",why:"Payment depends on you staying on the roster or eligible. Injury should not cancel what you've earned."},
 {k:"morals",re:/moral|conduct|disparag|reputation|embarrass/i,label:"Morals or conduct clause",sev:"warn",why:"Vague wording lets them cancel for almost anything. Ask for specific triggers."},
 {k:"terminate",re:/terminat|cancel this agreement/i,label:"Termination terms",sev:"warn",why:"Check whether both sides can end it, and how much notice is required."},
 {k:"assign",re:/assign(ed|ment)? (this|its|the) (agreement|rights)|may assign/i,label:"Assignment",sev:"warn",why:"They could hand your contract to another company without asking you."},
 {k:"arbitration",re:/arbitrat/i,label:"Arbitration or venue",sev:"warn",why:"Disputes go to private arbitration, often in their home state."},
 {k:"confidential",re:/confidential/i,label:"Confidentiality",sev:"info",why:"Make sure you can still share it with your guardian, attorney and compliance office."},
 {k:"prohibited",re:/sportsbook|betting|wager|gambl|casino|alcohol|beer|liquor|cannabis|marijuana|\bthc\b|vape|tobacco|nicotine|adult entertainment/i,label:"Commonly prohibited category",sev:"bad",why:"Many states, schools and associations ban NIL deals in this category. Check before signing."},
 {k:"marks",re:/logo|trademark|school marks|uniform|jersey/i,label:"School logos or uniform use",sev:"warn",why:"You usually need the school's permission to use its logos or uniform in NIL content."},
 {k:"reporting",re:/nil go|report(ed)? (to|within)|disclos/i,label:"Reporting or disclosure",sev:"info",why:"Division I athletes must report third-party NIL deals of $600 or more to NIL Go within five business days."},
];
const ADULT_AGE=(st)=>({AL:19,NE:19,MS:21})[String(st||"").toUpperCase()]||18;

/* ---------- state ---------- */
let tab=(location.hash||"#home").slice(1);if(!TABS.some(t=>t[0]===tab))tab="home";
const LS="athlete-advisory-v2";
const uid=()=>Math.random().toString(36).slice(2,9);
const EX_OFFER_1=`NAME, IMAGE AND LIKENESS AGREEMENT (EXAMPLE)
Sponsor: Summit Peak Energy Drinks LLC. Athlete: Jordan Reyes.
1. Term. This agreement runs for three (3) years from signing.
2. Compensation. Sponsor will pay Athlete $45,000 per year, paid quarterly, provided Athlete remains on the active roster and in good standing.
3. Exclusivity. Athlete shall not endorse or promote any beverage, supplement or nutrition product during the term.
4. License. Athlete grants Sponsor a perpetual, irrevocable license to use Athlete's name, image and likeness in content created during the term, including content showing Athlete in team uniform.
5. Transfer. If Athlete transfers or withdraws from the university, Athlete shall repay all compensation received in the prior 12 months.
6. Conduct. Sponsor may terminate immediately if Athlete engages in conduct that Sponsor, in its sole discretion, finds embarrassing.
7. Disputes. All disputes will be resolved by binding arbitration in Sponsor's home county. Sponsor may assign this agreement to any affiliate.`;
const EX_OFFER_2=`ATHLETIC GRANT-IN-AID AND REVENUE SHARE OFFER (EXAMPLE)
Coastal State University (fictional) offers Jordan Reyes a full athletic scholarship covering tuition, fees, housing, meals and cost of attendance for the 2027-28 academic year, renewable annually.
The university will also enter a revenue share agreement of $60,000 for 2027-28, paid in monthly installments while the athlete remains enrolled and on the roster.
The athlete must report all third-party NIL agreements of $600 or more to NIL Go within five business days. Either party may terminate the revenue share agreement with 30 days written notice.`;
function seed(){
  const o1={id:uid(),example:true,title:"Summit Peak NIL agreement",from:"Summit Peak Energy Drinks",type:"Third-party NIL",value:135000,years:3,text:EX_OFFER_1,source:"Example"};
  const o2={id:uid(),example:true,title:"Coastal State scholarship + revenue share",from:"Coastal State University",type:"Combined package",value:60000,years:1,text:EX_OFFER_2,source:"Example",status:"Reviewing"};
  o1.status="Signed";o1.signed="2026-08-01";
  [o1,o2].forEach(o=>o.flags=detect(o.text));
  return {
    profile:{name:"Jordan Reyes",example:true,sport:"Basketball",position:"Guard",gradYear:"2027",state:"TX",dob:"2009-03-14",level:"High school",school:"Westlake High School",
      interests:"Music production, cooking, mentoring younger players",causes:"Youth sports access",career:"Sports media or business",knownFor:"Leadership and work ethic",never:"Energy drinks, gambling, vapes",
      comm:"Text",advice:"Straight to the point",weights:{money:5,longterm:8,playing:9,academics:6,location:4,brand:6}},
    offers:[o1,o2],
    schools:[
      {id:uid(),example:true,name:"Coastal State University",division:"D-I (non-football)",conference:"Example Conference",state:"FL",status:"Offered",interest:4,r:{playing:4,academics:3,location:2,money:4,brand:3},notes:"Full scholarship + revenue share offer"},
      {id:uid(),example:true,name:"Northern Plains College",division:"D-II",conference:"Example Conference",state:"MN",status:"Visited",interest:3,r:{playing:5,academics:4,location:3,money:2,brand:2},notes:"Starter as a freshman"}],
    agencies:[
      {id:uid(),example:true,name:"Apex Athlete Group (fictional)",current:true,reg:"Not verified",fee:8,services:["Contract negotiation","NIL deal sourcing","Brand & content"],conflicts:"Suspected",notice:90,tail:24,notes:"Also manages the Summit Peak account",agreement:""},
      {id:uid(),example:true,name:"Harbor Sports Advisory (fictional)",current:false,reg:"Verified",fee:4,services:["Contract negotiation","Legal review","NIL deal sourcing","Tax & financial planning","Compliance & NIL Go reporting","Transfer guidance"],conflicts:"None",notice:30,tail:0,notes:"",agreement:""}],
    socials:[
      {id:uid(),example:true,platform:"Instagram",handle:"@jreyes.hoops",url:"",followers:18400},
      {id:uid(),example:true,platform:"TikTok",handle:"@jordanreyes",url:"",followers:52000}],
    circle:[
      {id:uid(),example:true,name:"Maria Reyes",rel:"parent",tier:"Inner",contact:"",perms:{offers:true,money:true,cosign:true,negotiate:false,alerts:true,emergency:true}},
      {id:uid(),example:true,name:"Tony Reyes",rel:"auntuncle",tier:"Inner",contact:"",perms:{offers:true,money:false,cosign:true,negotiate:true,alerts:false,emergency:false}},
      {id:uid(),example:true,name:"Coach Davis",rel:"hscoach",tier:"Extended",contact:"",perms:{offers:true,money:false,cosign:false,negotiate:false,alerts:false,emergency:false}},
      {id:uid(),example:true,name:"Rick Hollis",rel:"booster",tier:"Extended",contact:"",perms:{offers:false,money:true,cosign:false,negotiate:false,alerts:false,emergency:false}}],
    post:{caption:"",sponsored:"no",category:""},
    rides:seedRides(true),
    grades:{gpa:"3.4",core:13,tests:"",example:true},
    shares:[],consent:[],
    level:"free",chat:[],askPrefs:{speak:false,earbuds:false},money:{rate:12,payments:[{id:uid(),date:"2026-08-01",from:"Summit Peak Energy Drinks",amount:11250,example:true}]},legal:{},vault:[],invest:{horizon:"",risk:"",goal:"",status:""},sec:{pinHash:"",credId:""}
  };
}
function seedRides(ex){return {
  services:[{id:"uber",name:"Uber",account:ex?"Parent's family profile":"Not set up"},{id:"lyft",name:"Lyft",account:"Not set up"},{id:"taxi",name:"Local taxi",account:ex?"Phone booking":"Not set up",company:ex?"Example Cab Co. (fictional)":"",phone:ex?"(512) 555-0142":""}],
  places:ex?[{id:uid(),label:"Home",address:"123 Example St, Austin, TX",example:true},{id:uid(),label:"Practice facility",address:"456 Example Ave, Austin, TX",example:true}]:[],
  dest:""}}
let S=null;
const images=new Map(); // offerId/post -> File (not persisted)
const busy={}; // key -> {ctl,text}

/* ---------- helpers ---------- */
const $=s=>document.querySelector(s);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=n=>n||n===0?"$"+Number(n).toLocaleString("en-US",{maximumFractionDigits:0}):"—";
const relName=k=>(RELS.find(r=>r[0]===k)||[k,k])[1];
function toast(msg){const t=$("#toast");t.textContent=msg;t.hidden=false;clearTimeout(t._t);t._t=setTimeout(()=>t.hidden=true,2200)}
function age(){const d=S.profile.dob;if(!d)return null;const b=new Date(d),n=new Date();let a=n.getFullYear()-b.getFullYear();if(n<new Date(n.getFullYear(),b.getMonth(),b.getDate()))a--;return isNaN(a)?null:a}
function isMinor(){const a=age();return a===null?true:a<ADULT_AGE(S.profile.state)}
function detect(text){
  const t=String(text||"");const sentences=t.split(/(?<=[.;\n])\s+/);
  const found=[];
  for(const c of CLAUSES){const s=sentences.find(x=>c.re.test(x));if(s)found.push({k:c.k,label:c.label,sev:c.sev,why:c.why,snip:s.trim().slice(0,220)})}
  const amounts=[...new Set((t.match(/\$\s?\d[\d,]*(\.\d+)?/g)||[]).map(x=>x.replace(/\s/g,"")))].slice(0,6);
  return {found,amounts};
}
function sevCount(o){const f=o.flags?.found||[];return{bad:f.filter(x=>x.sev==="bad").length,warn:f.filter(x=>x.sev==="warn").length}}

/* ---------- agent (sample capability) ---------- */
let sampleFn=null, sampleState="pending", sampleImages=false;
(async()=>{
  try{ if(!window.claude||!window.claude.use){sampleState="off";setTimeout(render);return}
    const s=await window.claude.use("sample");
    if(!s){sampleState="off";render();return}
    sampleFn=s;sampleState="ready";
    try{const l=await s.limits();sampleImages=!!l.images}catch(e){}
    render();
  }catch(e){sampleState="off";render()}
})();
const ERR={not_granted:"Agent analysis wasn't allowed for this page.",sampling_disabled:"Agent analysis isn't available on this account.",rate_limited:"Too many requests right now. Try again in a minute.",session_expired:"Sign in again to use agent analysis.",refused:"The agent couldn't analyze this. Try removing unrelated text.",invalid_json:"The agent's answer came back in the wrong format. Try again.",prompt_too_large:"This document is too long. Paste the key sections instead.",image_rejected:"That image couldn't be read. Try a clearer photo."};
const errCopy=e=>ERR[e&&e.code]||"The agent couldn't finish. Try again.";
function agentButton(key,label){
  if(!hasAI()&&sampleState==="pending") return `<button disabled>Connecting to agent…</button>`;
  if(!hasAI()) return `<span class="small muted">Turn on private AI in <a href="#me">Me</a> for a full review. The instant checks above still work.</span>`;
  if(busy[key]) return `<button data-act="stop" data-key="${key}">Stop</button> <span class="small muted">${esc(busy[key].msg||"Thinking…")}</span>`;
  return `<button class="primary" data-act="agent" data-key="${key}">${label}</button>`;
}
function profileBrief(){
  const p=S.profile,w=p.weights;
  return `Athlete: ${p.sport||"?"} ${p.position||""}, level ${p.level}, state ${p.state||"?"}, age ${age()??"unknown"} (${isMinor()?"MINOR":"adult"}). Priorities 0-10: ${WEIGHTS.map(([k,l])=>l+" "+w[k]).join(", ")}. Won't work with: ${p.never||"none listed"}. Wants to be known for: ${p.knownFor||"—"}. Advice style: ${p.advice||"—"}.`;
}
const GUARD=`You are an advisory assistant inside an athlete-representation firm's app. You are not a lawyer or financial adviser; say that anything legal or financial must be confirmed by the athlete's attorney, registered agent or school compliance office. Be plain-spoken, short, specific. If the athlete is a minor, note that a parent or legal guardian must be involved in signing. Rules context as of late September 2026: D-I athletes must report third-party NIL deals of $600+ to NIL Go (College Sports Commission) within five business days; deals with associated entities (boosters, collectives) are reviewed for valid business purpose and a reasonable range of compensation; the federal Protect College Sports Act passed the Senate Sept 28, 2026 (one transfer without losing eligibility, 5% agent fee cap, agent registration) but is NOT law unless the House passes it. High school NIL rules vary by state association.`;
async function runAgent(key){
  if(!hasAI())return;
  const ctl=new AbortController();busy[key]={ctl,msg:"Thinking… this can take up to a minute."};render();
  try{
    let prompt,opts={signal:ctl.signal};
    if(key.startsWith("offer:")){
      const o=S.offers.find(x=>x.id===key.slice(6));
      prompt=`${GUARD}\n\n${profileBrief()}\n\nAnalyze this offer for the athlete. Reply with only JSON: {"summary": string (2 sentences), "whatYouGet": string, "keyTerms":[{"term":string,"plain":string,"rating":"good"|"watch"|"risk"}], "redFlags":[string], "askForChanges":[string], "questionsToAsk":[string], "complianceNotes":[string], "fit": string (how it fits their priorities), "verdict": "looks reasonable"|"negotiate first"|"high risk"}. Max 6 items per list.\n\nOffer title: ${o.title}\nFrom: ${o.from}\nType: ${o.type}\nStated value: ${o.value}\nTerm years: ${o.years}\n\nOFFER TEXT:\n${String(o.text||"(no text — see image)").slice(0,MAXDOC())}`;
      if(!o.text&&images.get(o.id)&&sampleImages)opts.images=[images.get(o.id)];
      o.analysis=await aiJSON(prompt,opts);
    } else if(key.startsWith("agency:")){
      const a=S.agencies.find(x=>x.id===key.slice(7));
      prompt=`${GUARD}\n\n${profileBrief()}\n\nAudit this sports agency for the athlete. Reply with only JSON: {"summary":string,"strengths":[string],"concerns":[string],"feeCheck":string,"conflictCheck":string,"questionsToAsk":[string],"recommendation":"keep"|"renegotiate"|"look elsewhere"|"need more info"}. Max 6 items per list.\n\nAgency: ${a.name}\nCurrent agency: ${a.current?"yes":"no"}\nState registration: ${a.reg}\nFee: ${a.fee}%\nServices: ${a.services.join(", ")||"none listed"}\nConflicts of interest: ${a.conflicts}\nNotice to leave (days): ${a.notice}\nFees owed after leaving (months): ${a.tail}\nNotes: ${a.notes||"—"}\n\nREPRESENTATION AGREEMENT TEXT:\n${String(a.agreement||"(not uploaded)").slice(0,MAXDOC())}`;
      a.analysis=await aiJSON(prompt,opts);
    } else if(key==="post"){
      const p=S.post;
      const accts=S.socials.map(s=>s.platform+" "+s.handle+" ("+(s.followers||"?")+" followers)").join("; ")||"none";
      prompt=`${GUARD}\n\n${profileBrief()}\nAccounts: ${accts}\n\nReview this planned social post before the athlete publishes it. Consider NIL rules, school/team policies, commonly prohibited categories (betting, alcohol, cannabis, tobacco/vape, adult content), FTC sponsored-content disclosure (#ad), school logos and uniforms, teammates' consent, and reputation with brands, coaches and recruiters. Reply with only JSON: {"verdict":"good to post"|"change first"|"don't post","reasons":[string],"fixes":[string],"disclosure":string,"bestPlatforms":[string],"rewrite":string}.\nThe athlete's signed-deal rules: ${JSON.stringify(dealRules().map(r=>({deal:r.from,rule:r.text,until:r.until})))}\n\nPhoto contains (tagged by athlete): ${(p.tags||[]).join(", ")||"not tagged"}. Text read from the photo: ${p.photoText||"none"}\nSponsored: ${p.sponsored}\nBrand category: ${p.category||"none"}\nCaption:\n${p.caption||"(no caption; see image)"}`;
      if(images.get("post")&&sampleImages)opts.images=[images.get("post")];
      p.analysis=await aiJSON(prompt,opts);
    }
    save();toast("Agent analysis ready");
  }catch(e){ if(e&&e.code!=="cancelled")toast(errCopy(e)); if(e&&["not_granted","sampling_disabled","not_declared","capability_disabled","capability_removed"].includes(e.code)){sampleState="off";sampleFn=null} }
  finally{delete busy[key];render()}
}

/* ---------- file intake ---------- */
function loadScript(src){return new Promise((res,rej)=>{if(document.querySelector(`script[src="${src}"]`))return res();const s=document.createElement("script");s.src=src;s.onload=res;s.onerror=()=>rej(new Error("load"));document.head.appendChild(s)})}
async function pdfText(buf){
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js");
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js");
  const lib=window.pdfjsLib;lib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  const doc=await lib.getDocument({data:buf}).promise;let out="";
  for(let i=1;i<=Math.min(doc.numPages,40);i++){const pg=await doc.getPage(i);const c=await pg.getTextContent();out+=c.items.map(x=>x.str).join(" ")+"\n"}
  return out;
}
async function docxText(buf){await loadScript("https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js");const r=await window.mammoth.extractRawText({arrayBuffer:buf});return r.value}
async function readFile(f){
  const n=f.name.toLowerCase();
  if(f.type.startsWith("image/"))return {text:"",image:true};
  const buf=await f.arrayBuffer();
  if(n.endsWith(".pdf"))return {text:await pdfText(buf)};
  if(n.endsWith(".docx"))return {text:await docxText(buf)};
  return {text:new TextDecoder().decode(buf)};
}
function guessType(t){t=t.toLowerCase();const sch=/scholarship|grant-in-aid|cost of attendance/.test(t),rev=/revenue shar/.test(t),nil=/name, image|likeness|nil|endorse|sponsor/.test(t);if((sch||rev)&&nil&&!rev)return"Combined package";if(sch&&rev)return"Combined package";if(rev)return"School revenue share";if(sch)return"Athletic scholarship";return"Third-party NIL"}
function guessFrom(t){const m=t.match(/(?:sponsor|company|brand|university|college)\s*[:\-]\s*([^\n.]{3,60})/i)||t.match(/([A-Z][A-Za-z&.' ]{2,40} (?:University|College|LLC|Inc\.?|Collective))/);return m?m[1].trim():""}
async function intakeOffers(files){
  for(const f of files){
    try{
      toast("Reading "+(f.name||"photo")+"…");
      const r=await readFile(f);let text=r.text||"";
      if(r.image){try{text=await ocrImage(f)}catch(e){toast("Couldn't read text from the photo. You can paste it instead.")}}
      text=text.replace(/[ \t]+/g," ").trim();
      const docId=await addDoc(f,"Offer");const amts=detect(text).amounts.map(a=>Number(a.replace(/[$,]/g,""))).filter(n=>!isNaN(n));
      const yr=text.match(/\((\d)\)\s*years?|(\d+)\s*-?\s*years?/i)||[];
      S.offers.unshift({id:uid(),title:(f.name||"Scanned offer").replace(/\.[^.]+$/,""),from:guessFrom(text),type:guessType(text),value:amts.length?Math.max(...amts):"",years:Number(yr[1]||yr[2])||"",text,source:r.image?"Photo":f.name,flags:detect(text),open:true,status:"Reviewing",docId});
      toast(text?"Offer added. Terms are flagged below.":"Photo saved. Paste the text to check the terms.");
    }catch(e){toast("Couldn't read "+(f.name||"that file")+". Try a PDF, Word file or clear photo.")}
  }
  save();render();
}
async function intakeAgreement(aid,f){
  try{const r=await readFile(f);const a=S.agencies.find(x=>x.id===aid);a.agreement=(r.text||"").trim();a.agreementName=f.name;a.agreementFlags=detect(a.agreement);save();render();toast("Agreement added")}
  catch(e){toast("Couldn't read that file.")}
}

/* ---------- scoring ---------- */
function agencyScore(a){
  let s=0;const flags=[];
  if(a.reg==="Verified")s+=20;else flags.push(["bad","State athlete-agent registration not verified"]);
  const fee=Number(a.fee);
  if(fee<=5)s+=20;else if(fee<=10){s+=8;flags.push(["warn",`${fee}% fee is above the 5% cap in the pending federal bill`])}else flags.push(["bad",`${fee}% fee is well above the 5% cap in the pending federal bill`]);
  s+=Math.round(25*a.services.length/SERVICES.length);
  if(!a.services.includes("Legal review"))flags.push(["warn","No legal review. Contracts need an attorney's eyes."]);
  if(a.conflicts==="None")s+=15;else if(a.conflicts==="Disclosed"){s+=8;flags.push(["warn","Conflicts of interest disclosed. Get them in writing."])}else flags.push(["bad","Possible conflict of interest (paid by brands, schools or collectives?)"]);
  const n=Number(a.notice)||0,t=Number(a.tail)||0;
  s+=Math.max(0,10-Math.floor(n/15))+Math.max(0,10-Math.floor(t/3));
  if(n>30)flags.push(["warn",`${n}-day notice to leave`]);if(t>0)flags.push([t>12?"bad":"warn",`Keeps earning fees for ${t} months after you leave`]);
  return {score:Math.min(100,s),flags};
}
function schoolFit(sc){
  const w=S.profile.weights;const map={playing:w.playing,academics:w.academics,location:w.location,money:(w.money+w.longterm)/2,brand:w.brand};
  let num=0,den=0;for(const k in map){num+=map[k]*(sc.r[k]||0);den+=map[k]}
  return den?Math.round(num/den*20):0;
}
function relGuide(p){
  const minor=isMinor(),rel=p.rel,out={authority:"",notes:[],flags:[]};
  const adultAge=ADULT_AGE(S.profile.state);
  const family=["grandparent","sibling","auntuncle","cousin","partner","other"];
  if(rel==="parent"||rel==="guardian"){
    out.authority=minor?`Can sign or co-sign contracts for you until you turn ${adultAge}.`:"No automatic legal authority now that you're an adult. You decide what they can see.";
    if(rel==="guardian")out.notes.push("Keep a copy of the guardianship order on file. Brands and schools may ask for it.");
    if(!minor)out.notes.push("At college, your school needs your written consent to share education records with them (FERPA).");
  }else if(rel==="stepparent"){out.authority="No legal authority to sign for you unless they adopted you or hold legal guardianship.";}
  else if(family.includes(rel)){out.authority=minor?"No legal authority to sign for you unless a court appointed them your guardian.":"No legal authority unless you give them a power of attorney.";}
  else if(rel==="friend"||rel==="teammate"){out.authority="No legal authority.";out.notes.push("Loans or gifts between you and a teammate can raise eligibility questions. Check with compliance first.");}
  else if(rel==="hscoach"){out.authority="No legal authority.";out.notes.push("Some state high school associations limit coaches' role in arranging NIL deals. Check your state's rules.");}
  else if(rel==="collegecoach"){out.authority="Works for the school, not for you.";out.flags.push(["warn","Their job is to represent the school. Don't rely on them as your representative in deals with the school."]);}
  else if(rel==="agent"){out.authority="Acts for you only under a signed representation agreement.";out.notes.push("Confirm state athlete-agent registration. The pending federal bill caps fees at 5%.");if(minor)out.notes.push("Your parent or guardian must sign the representation agreement.");}
  else if(rel==="attorney"){out.authority="Acts for you under an engagement letter.";out.notes.push("Confirm they're licensed in your state. Your conversations are privileged.");}
  else if(rel==="advisor"){out.authority="No authority over your money unless you sign an advisory agreement.";out.notes.push("Check registration on the SEC adviser search or FINRA BrokerCheck. Ask if they're a fiduciary and how they're paid.");}
  else if(rel==="booster"){out.authority="No legal authority.";out.flags.push(["bad","Deals, gifts or loans from boosters and school donors get extra review and can put your eligibility at risk. Route any money through your school's compliance office."]);}
  else if(rel==="mentor"){out.authority="No legal authority.";}
  const P=p.perms;
  if(P.cosign&&minor&&!["parent","guardian"].includes(rel))out.flags.push(["bad","Can't legally co-sign contracts for you. Only a parent or legal guardian can while you're a minor."]);
  if(P.cosign&&!minor&&!["parent","guardian"].includes(rel))out.flags.push(["warn","A co-signer shares legal responsibility. Only use this for loans or leases you both agree to."]);
  if(P.negotiate&&!["agent","attorney"].includes(rel))out.flags.push(["warn","Anyone who negotiates deals for you may have to register as an athlete agent in some states."]);
  if(P.money&&["booster","collegecoach"].includes(rel))out.flags.push(["bad","Don't share your finances with boosters or school staff."]);
  return out;
}

/* ---------- alerts ---------- */
function alerts(){
  const a=[];const minor=isMinor();
  S.offers.forEach(o=>{const c=sevCount(o);if(c.bad)a.push(["bad",`${o.title}: ${c.bad} high-risk term${c.bad>1?"s":""} found`,"offers"])});
  if(S.profile.level==="NCAA D-I"&&S.offers.some(o=>/NIL|Combined/.test(o.type)))a.push(["warn","Report any signed third-party NIL deal of $600 or more to NIL Go within five business days.","offers"]);
  S.agencies.forEach(g=>{const s=agencyScore(g);if(s.flags.some(f=>f[0]==="bad"))a.push(["bad",`${g.name}: ${s.flags.filter(f=>f[0]==="bad").length} serious concern(s) in the audit`,"agencies"])});
  S.circle.forEach(p=>{const g=relGuide(p);g.flags.filter(f=>f[0]==="bad").forEach(f=>a.push(["bad",`${p.name} (${relName(p.rel)}): ${f[1]}`,"circle"]))});
  if(minor&&!S.circle.some(p=>["parent","guardian"].includes(p.rel)&&p.perms.cosign))a.push(["bad","You're a minor. Add a parent or legal guardian who can co-sign contracts.","circle"]);
  S.rides.services.forEach(sv=>rideFlags(sv).filter(f=>f[0]==="bad").forEach(f=>a.push(["bad",f[1],"rides"])));
  S.shares.filter(x=>x.status==="Waiting for guardian").forEach(x=>a.push(["warn",`Sharing with ${x.to} is waiting for guardian approval.`,"sharing"]));
  if(!S.socials.length)a.push(["warn","Add your social accounts so the agent can advise on posts and brand value.","social"]);
  if(!S.schools.length)a.push(["warn","Add the schools you're interested in.","schools"]);
  return a;
}

/* ---------- views ---------- */
function vOffers(){
  const list=S.offers;
  return `
  <section class="sec-head"><span class="eyebrow">Offers</span><h1>NIL and scholarship offers</h1><p class="lede">Drop in any offer: a PDF, a Word file, a screenshot or pasted text. The workspace flags risky terms right away; the agent explains them and tells you what to ask for.</p></section>
  <label class="drop" id="drop-offers" for="file-offers"><strong>Drop offers here</strong><span class="small muted">PDF, Word (.docx), text or photo · or tap to choose files</span><input id="file-offers" type="file" multiple accept=".pdf,.docx,.txt,.md,image/*" hidden></label>
  <details class="panel"><summary>Paste offer text instead</summary><div class="form"><label class="f full">Offer title<input id="paste-title" placeholder="e.g. Local car dealership NIL deal"></label><label class="f full">Offer text<textarea id="paste-text" placeholder="Paste the full offer or contract text"></textarea></label></div><div><button class="primary" data-act="paste-offer">Add offer</button></div></details>
  ${list.length>1?compareTable(list):""}
  <section class="stack">${list.map(offerCard).join("")||`<p class="muted">No offers yet.</p>`}</section>`;
}
function compareTable(list){
  const has=(o,k)=>(o.flags?.found||[]).some(f=>f.k===k)?"Yes":"—";
  const rows=[["From",o=>esc(o.from||"—")],["Type",o=>esc(o.type)],["Stated value",o=>`<span class="mono">${money(o.value)}</span>`],["Term",o=>o.years?`<span class="mono">${o.years} yr</span>`:"—"],["Per year",o=>o.value&&o.years?`<span class="mono">${money(o.value/o.years)}</span>`:"—"],["High-risk terms",o=>{const c=sevCount(o).bad;return `<span class="chip ${c?"bad":"good"}">${c}</span>`}],["Clawback",o=>has(o,"clawback")],["Perpetual rights",o=>has(o,"perpetual")],["Exclusivity",o=>has(o,"exclusive")],["Agent verdict",o=>o.analysis?.verdict?`<span class="chip ${o.analysis.verdict==="looks reasonable"?"good":o.analysis.verdict==="high risk"?"bad":"warn"}">${esc(o.analysis.verdict)}</span>`:"—"]];
  return `<section class="stack"><h2>Side by side</h2><div class="tablewrap"><table><thead><tr><th></th>${list.map(o=>`<th>${esc(o.title)}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr><td><b>${r[0]}</b></td>${list.map(o=>`<td>${r[1](o)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section>`;
}
function offerCard(o){
  const c=sevCount(o),f=o.flags||{found:[],amounts:[]},key="offer:"+o.id,an=o.analysis;
  return `<article class="card ${c.bad?"flag-bad":c.warn?"flag-warn":""}">
   <div class="row between"><div class="stack" style="gap:2px;min-width:0"><span class="card-title">${esc(o.title)}</span><span class="small muted">${esc(o.from||"Sender unknown")} · ${esc(o.source||"")}</span></div>
   <div class="row">${o.example?`<span class="chip ex">Example</span>`:""}<span class="chip ${o.status==="Signed"?"good":""}">${esc(o.status||"Reviewing")}</span><span class="chip">${esc(o.type)}</span>${c.bad?`<span class="chip bad">${c.bad} high risk</span>`:""}${c.warn?`<span class="chip warn">${c.warn} to review</span>`:""}</div></div>
   <div class="kv"><div><span>Stated value</span><b>${money(o.value)}</b></div><div><span>Term</span><b>${o.years?o.years+" yr":"—"}</b></div><div><span>Amounts found</span><b>${esc(f.amounts.join(", ")||"—")}</b></div></div>
   <details ${o.open?"open":""} data-open="${o.id}"><summary>Terms found (${f.found.length})</summary><div class="stack" style="margin-top:8px">${f.found.map(x=>`<div class="flagline"><span class="chip ${x.sev==="info"?"":x.sev}">${x.sev==="bad"?"Risk":x.sev==="warn"?"Review":"Note"}</span><div><b>${esc(x.label)}.</b> ${esc(x.why)}<div class="snip">“${esc(x.snip)}”</div></div></div>`).join("")||`<p class="small muted">${o.text?"No common risk terms found. The agent can still review it.":"This is a photo, so there's no text to scan yet. Use agent analysis to read it."}</p>`}</div></details>
   <details><summary>Edit details</summary><div class="form" style="margin-top:8px">
     <label class="f">Title<input data-o="${o.id}" data-field="title" value="${esc(o.title)}"></label>
     <label class="f">From<input data-o="${o.id}" data-field="from" value="${esc(o.from)}"></label>
     <label class="f">Type<select data-o="${o.id}" data-field="type">${OFFER_TYPES.map(t=>`<option ${t===o.type?"selected":""}>${t}</option>`).join("")}</select></label>
     <label class="f">Total value ($)<input type="number" data-o="${o.id}" data-field="value" value="${esc(o.value)}"></label>
     <label class="f">Term (years)<input type="number" data-o="${o.id}" data-field="years" value="${esc(o.years)}"></label>
     <label class="f">Status<select data-o="${o.id}" data-field="status">${["Reviewing","Negotiating","Signed","Declined"].map(t=>`<option ${t===(o.status||"Reviewing")?"selected":""}>${t}</option>`).join("")}</select></label>
     <label class="f">Date signed<input type="date" data-o="${o.id}" data-field="signed" value="${esc(o.signed||"")}"></label></div></details>
   ${an?analysisOffer(an):""}
   <div class="row between"><div class="row">${agentButton(key,an?"Re-run agent analysis":"Analyze with agent")}</div>${o.docId?`<button class="ghost" data-act="doc-view" data-id="${o.docId}">Original</button>`:""}<button class="ghost" data-act="del-offer" data-id="${o.id}">Remove</button></div>
  </article>`;
}
const L=(t,arr)=>arr&&arr.length?`<div><b class="small">${t}</b><ul class="clean small">${arr.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`:"";
function analysisOffer(a){
  const v=a.verdict||"";const cls=v==="looks reasonable"?"good":v==="high risk"?"bad":"warn";
  return `<div class="agent"><div class="row between"><h4>Agent analysis</h4>${v?`<span class="chip ${cls}">${esc(v)}</span>`:""}</div>
  <p>${esc(a.summary||"")}</p>${a.whatYouGet?`<p class="small"><b>What you get:</b> ${esc(a.whatYouGet)}</p>`:""}
  ${(a.keyTerms||[]).length?`<div class="stack">${a.keyTerms.map(k=>`<div class="flagline"><span class="chip ${k.rating==="good"?"good":k.rating==="risk"?"bad":"warn"}">${esc(k.rating)}</span><div class="small"><b>${esc(k.term)}.</b> ${esc(k.plain)}</div></div>`).join("")}</div>`:""}
  <div class="grid2">${L("Red flags",a.redFlags)}${L("Ask for these changes",a.askForChanges)}${L("Questions to ask",a.questionsToAsk)}${L("Compliance",a.complianceNotes)}</div>
  ${a.fit?`<p class="small"><b>Fit with your priorities:</b> ${esc(a.fit)}</p>`:""}
  <p class="small muted">Draft analysis. Your attorney or registered agent approves any changes before you negotiate.</p></div>`;
}
function vSchools(){
  const list=[...S.schools].sort((a,b)=>schoolFit(b)-schoolFit(a));
  const R=[["playing","Playing time"],["academics","Academics"],["location","Location"],["money","Money (aid + NIL)"],["brand","Brand exposure"]];
  return `<section class="sec-head"><span class="eyebrow">Schools</span><h1>Schools you're interested in</h1><p class="lede">Rate each school on what matters. Fit scores use the priorities in your profile, so the list re-ranks when your priorities change.</p></section>
  <details class="panel" ${S.schools.length?"":"open"}><summary>Add a school</summary><div class="form" style="margin-top:8px">
   <label class="f">School name<input id="sc-name" placeholder="University name"></label>
   <label class="f">Division<select id="sc-div">${DIVS.map(d=>`<option>${d}</option>`).join("")}</select></label>
   <label class="f">Conference<input id="sc-conf"></label>
   <label class="f">State<input id="sc-state" maxlength="2" placeholder="TX"></label>
   <label class="f">Status<select id="sc-status">${STATUSES.map(d=>`<option>${d}</option>`).join("")}</select></label>
   <label class="f">Interest (1–5)<input id="sc-int" type="number" min="1" max="5" value="3"></label>
   ${R.map(r=>`<label class="f">${r[1]} (1–5)<input id="sc-${r[0]}" type="number" min="1" max="5" value="3"></label>`).join("")}
   <label class="f full">Notes<input id="sc-notes"></label></div><div><button class="primary" data-act="add-school">Add school</button></div></details>
  <section class="stack">${list.map((s,i)=>{const fit=schoolFit(s);return `<article class="card"><div class="row between"><div class="stack" style="gap:2px"><span class="card-title">${i+1}. ${esc(s.name)}</span><span class="small muted">${esc(s.division)} · ${esc(s.conference||"Conference not set")} · ${esc(s.state||"")}</span></div><div class="row">${s.example?`<span class="chip ex">Example</span>`:""}<select data-s="${s.id}" data-field="status" aria-label="Status" style="width:auto">${STATUSES.map(d=>`<option ${d===s.status?"selected":""}>${d}</option>`).join("")}</select></div></div>
   <div class="row" style="gap:16px;align-items:flex-end"><div><div class="score">${fit}<small>/100 fit</small></div></div><div style="flex:1;min-width:180px" class="stack"><div class="meter"><i style="width:${fit}%"></i></div><span class="small muted">Interest ${"●".repeat(s.interest)}${"○".repeat(5-s.interest)}</span></div></div>
   <div class="kv">${R.map(r=>`<div><span>${r[1]}</span><input type="number" min="1" max="5" data-s="${s.id}" data-r="${r[0]}" value="${s.r[r[0]]}" aria-label="${r[1]}"></div>`).join("")}</div>
   ${s.notes?`<p class="small muted">${esc(s.notes)}</p>`:""}
   <div class="row between"><span class="small muted">Offers linked: ${S.offers.filter(o=>o.from&&s.name&&o.from.toLowerCase().includes(s.name.toLowerCase().split(" ")[0])).length}</span><button class="ghost" data-act="del-school" data-id="${s.id}">Remove</button></div></article>`}).join("")||`<p class="muted">No schools yet.</p>`}</section>`;
}
function vAgencies(){
  const cur=S.agencies.filter(a=>a.current),other=S.agencies.filter(a=>!a.current);
  return `<section class="sec-head"><span class="eyebrow">Agencies</span><h1>Audit my agent</h1><p class="lede">Check the agency you work with now, or compare agencies you might sign with. Scores cover registration, fees, services, conflicts of interest and how hard it is to leave.</p></section>
  ${RANK[S.level]>=2?`<div class="panel"><p class="small"><b>Transparency mode.</b> In the University and NIL Deal Plus editions, your host can show you its own scorecard, and matching you with competing agencies is off. The full audit stays available in your free account.</p></div>`:""}
  <details class="panel" ${S.agencies.length?"":"open"}><summary>Add an agency</summary><div class="form" style="margin-top:8px">
   <label class="f">Agency name<input id="ag-name"></label>
   <label class="f">Relationship<select id="ag-cur"><option value="1">My current agency</option><option value="0" selected>Considering</option></select></label>
   <label class="f">State registration<select id="ag-reg"><option>Verified</option><option>Not verified</option><option>Unknown</option></select></label>
   <label class="f">Fee (% of deals)<input id="ag-fee" type="number" step="0.5" value="5"></label>
   <label class="f">Conflicts of interest<select id="ag-conf"><option>None</option><option>Disclosed</option><option>Suspected</option></select></label>
   <label class="f">Notice to leave (days)<input id="ag-notice" type="number" value="30"></label>
   <label class="f">Fees after leaving (months)<input id="ag-tail" type="number" value="0"></label>
   <div class="full stack"><span class="small muted" style="font-weight:600">Services</span><div class="checks">${SERVICES.map((s,i)=>`<label><input type="checkbox" id="ag-s${i}"> ${s}</label>`).join("")}</div></div>
   <label class="f full">Notes<input id="ag-notes"></label></div><div><button class="primary" data-act="add-agency">Add agency</button></div></details>
  ${S.agencies.length>1?agencyTable():""}
  ${cur.length?`<section class="stack"><h2>Current agency</h2>${cur.map(agencyCard).join("")}</section>`:""}
  ${other.length?`<section class="stack"><h2>Considering</h2>${other.map(agencyCard).join("")}</section>`:""}
  <p class="note">Registry lookups, public records and news checks run in the deployed app. Here, the audit uses what you enter and your representation agreement.</p>`;
}
function agencyTable(){
  const list=[...S.agencies].sort((a,b)=>agencyScore(b).score-agencyScore(a).score);
  return `<div class="tablewrap"><table><thead><tr><th>Agency</th><th>Score</th><th>Fee</th><th>Registered</th><th>Services</th><th>Conflicts</th><th>Exit</th></tr></thead><tbody>${list.map(a=>{const s=agencyScore(a);return `<tr><td><b>${esc(a.name)}</b>${a.current?` <span class="chip">Current</span>`:""}</td><td class="mono">${s.score}</td><td class="mono">${esc(a.fee)}%</td><td>${esc(a.reg)}</td><td class="mono">${a.services.length}/${SERVICES.length}</td><td>${esc(a.conflicts)}</td><td class="small">${esc(a.notice)} days notice${Number(a.tail)?`, ${esc(a.tail)} mo fees after`:""}</td></tr>`}).join("")}</tbody></table></div>`;
}
function agencyCard(a){
  const s=agencyScore(a),an=a.analysis,key="agency:"+a.id;const bad=s.flags.some(f=>f[0]==="bad");
  return `<article class="card ${bad?"flag-bad":s.flags.length?"flag-warn":""}">
  <div class="row between"><div class="stack" style="gap:2px"><span class="card-title">${esc(a.name)}</span><span class="small muted">${esc(a.fee)}% fee · ${esc(a.reg)}</span></div><div class="row">${a.example?`<span class="chip ex">Example</span>`:""}<span class="score">${s.score}<small>/100</small></span></div></div>
  <div class="meter"><i style="width:${s.score}%"></i></div>
  <div class="row">${a.services.map(x=>`<span class="chip">${esc(x)}</span>`).join("")}</div>
  ${s.flags.length?`<div class="stack">${s.flags.map(f=>`<div class="flagline"><span class="chip ${f[0]}">${f[0]==="bad"?"Concern":"Review"}</span><span class="small">${esc(f[1])}</span></div>`).join("")}</div>`:`<p class="small">No concerns from the details entered.</p>`}
  ${a.notes?`<p class="small muted">${esc(a.notes)}</p>`:""}
  <div class="row"><label class="btn" for="ag-file-${a.id}">${a.agreement?"Replace agreement":"Upload representation agreement"}</label><input type="file" id="ag-file-${a.id}" data-agreement="${a.id}" accept=".pdf,.docx,.txt,.md" hidden>${a.agreementName?`<span class="small muted">${esc(a.agreementName)} · ${(a.agreementFlags?.found||[]).length} terms flagged</span>`:""}</div>
  ${(a.agreementFlags?.found||[]).length?`<details><summary>Agreement terms found</summary><div class="stack" style="margin-top:8px">${a.agreementFlags.found.map(x=>`<div class="flagline"><span class="chip ${x.sev==="info"?"":x.sev}">${x.sev==="bad"?"Risk":"Review"}</span><div class="small"><b>${esc(x.label)}.</b> <span class="snip">“${esc(x.snip)}”</span></div></div>`).join("")}</div></details>`:""}
  ${an?`<div class="agent"><div class="row between"><h4>Agent audit</h4>${an.recommendation?`<span class="chip ${an.recommendation==="keep"?"good":an.recommendation==="look elsewhere"?"bad":"warn"}">${esc(an.recommendation)}</span>`:""}</div><p>${esc(an.summary||"")}</p><div class="grid2">${L("Strengths",an.strengths)}${L("Concerns",an.concerns)}${L("Questions to ask",an.questionsToAsk)}</div>${an.feeCheck?`<p class="small"><b>Fees:</b> ${esc(an.feeCheck)}</p>`:""}${an.conflictCheck?`<p class="small"><b>Conflicts:</b> ${esc(an.conflictCheck)}</p>`:""}</div>`:""}
  <div class="row between"><div class="row">${agentButton(key,an?"Re-run audit":"Run agent audit")}</div><div class="row"><button class="ghost" data-act="toggle-cur" data-id="${a.id}">${a.current?"Mark as considering":"Mark as current"}</button><button class="ghost" data-act="del-agency" data-id="${a.id}">Remove</button></div></div></article>`;
}
function vCircle(){
  const tiers=["Inner","Extended"];
  return `<section class="sec-head"><span class="eyebrow">Trusted circle</span><h1>The people you trust</h1><p class="lede">Name the people who help you decide. Choose what each person can see and do. The app tells you what each relationship allows by law and flags anything that could cause trouble.</p></section>
  <div class="panel"><div class="kv"><div><span>Your status</span><b>${isMinor()?"Minor":"Adult"}${age()!==null?` · age ${age()}`:""}</b></div><div><span>Can co-sign for you</span><b>${S.circle.filter(p=>["parent","guardian"].includes(p.rel)&&p.perms.cosign).length}</b></div><div><span>Inner circle</span><b>${S.circle.filter(p=>p.tier==="Inner").length}</b></div><div><span>Extended</span><b>${S.circle.filter(p=>p.tier!=="Inner").length}</b></div></div>
  <p class="small muted">Adult age in ${esc(S.profile.state||"your state")}: ${ADULT_AGE(S.profile.state)}. Based on your date of birth in Profile.</p></div>
  <details class="panel" ${S.circle.length?"":"open"}><summary>Add a person</summary><div class="form" style="margin-top:8px">
   <label class="f">Name<input id="ci-name"></label>
   <label class="f">Relationship<select id="ci-rel">${RELS.map(r=>`<option value="${r[0]}">${r[1]}</option>`).join("")}</select></label>
   <label class="f">Circle<select id="ci-tier"><option>Inner</option><option>Extended</option></select></label>
   <label class="f">Phone or email<input id="ci-contact"></label>
   <div class="full stack"><span class="small muted" style="font-weight:600">What they can do</span><div class="checks">${PERMS.map(p=>`<label><input type="checkbox" id="ci-${p[0]}"> ${p[1]}</label>`).join("")}</div></div></div>
   <div><button class="primary" data-act="add-person">Add to circle</button></div></details>
  <div class="circle-tiers">${tiers.map(t=>`<section class="stack"><h2>${t} circle</h2>${S.circle.filter(p=>(p.tier||"Extended")===t).map(personCard).join("")||`<p class="muted small">No one here yet.</p>`}</section>`).join("")}</div>`;
}
function personCard(p){
  const g=relGuide(p),bad=g.flags.some(f=>f[0]==="bad");
  const ini=(p.name||"?").split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase();
  return `<article class="card ${bad?"flag-bad":g.flags.length?"flag-warn":""}">
   <div class="person-top"><div class="row" style="flex-wrap:nowrap;min-width:0"><span class="avatar">${esc(ini)}</span><div class="stack" style="gap:0;min-width:0"><span class="card-title">${esc(p.name)}</span><span class="small muted">${esc(relName(p.rel))}${p.contact?" · "+esc(p.contact):""}</span></div></div>${p.example?`<span class="chip ex">Example</span>`:""}</div>
   <p class="small"><b>Legal authority:</b> ${esc(g.authority)}</p>
   ${g.notes.length?`<ul class="clean small muted">${g.notes.map(n=>`<li>${esc(n)}</li>`).join("")}</ul>`:""}
   ${g.flags.map(f=>`<div class="flagline"><span class="chip ${f[0]}">${f[0]==="bad"?"Fix":"Review"}</span><span class="small">${esc(f[1])}</span></div>`).join("")}
   <div class="checks">${PERMS.map(x=>`<label><input type="checkbox" data-p="${p.id}" data-perm="${x[0]}" ${p.perms[x[0]]?"checked":""}> ${x[1]}</label>`).join("")}</div>
   <div class="row between"><button class="ghost" data-act="tier" data-id="${p.id}">${p.tier==="Inner"?"Move to extended":"Move to inner circle"}</button><button class="ghost" data-act="del-person" data-id="${p.id}">Remove</button></div></article>`;
}

const RIDE_ACCTS={uber:["Not set up","My own account","Parent's family profile","Uber teen account (managed by parent)"],lyft:["Not set up","My own account","Parent's family profile"],taxi:["Not set up","Phone booking","Taxi app account"]};
function rideFlags(sv){
  const f=[];const minor=isMinor();
  if(minor&&sv.account==="My own account"&&sv.id!=="taxi")f.push(["bad",`${sv.name} requires riders on their own account to be 18 or older. Use a parent's family profile${sv.id==="uber"?" or an Uber teen account where available":""}.`]);
  if(sv.id==="uber"&&sv.account.startsWith("Uber teen"))f.push(["warn","Teen accounts are set up and paid for by a parent, and aren't available in every city. Your parent confirms it in the Uber app."]);
  if(minor&&sv.id==="taxi"&&sv.account!=="Not set up")f.push(["warn","Many taxi companies won't carry unaccompanied minors. Call ahead to check."]);
  return f;
}
function uberLink(addr){return "https://m.uber.com/ul/?action=setPickup&pickup=my_location"+(addr?"&dropoff[formatted_address]="+encodeURIComponent(addr):"")}
function vRides(){
  const R=S.rides,dest=R.dest||"";const em=S.circle.filter(p=>p.perms.emergency);
  const svc=k=>R.services.find(x=>x.id===k);const ready=R.services.filter(x=>x.account!=="Not set up");
  return `<section class="sec-head"><span class="eyebrow">Rides</span><h1>Get a ride</h1><p class="lede">Set up the ride accounts you use. The app opens the ride with your destination filled in; you confirm and pay in the ride app.</p></section>
  <section class="stack"><h2>Where to?</h2><div class="panel">
   <label class="f">Destination<input id="ride-dest" value="${esc(dest)}" placeholder="Address or place name"></label>
   ${R.places.length?`<div class="row">${R.places.map(p=>`<button data-act="ride-place" data-id="${p.id}">${esc(p.label)}</button>`).join("")}</div>`:""}
   <div class="row">
    ${svc("uber").account!=="Not set up"?`<a class="btn primary" style="text-decoration:none" href="${esc(uberLink(dest))}" target="_blank" rel="noopener">Open in Uber</a>`:""}
    ${svc("lyft").account!=="Not set up"?`<a class="btn" style="text-decoration:none" href="https://ride.lyft.com/" target="_blank" rel="noopener">Open Lyft</a><button data-act="copy" data-text="${esc(dest)}">Copy address for Lyft</button>`:""}
    ${svc("taxi").account!=="Not set up"&&svc("taxi").phone?`<span class="small">${esc(svc("taxi").company||"Taxi")}: <b class="mono" style="user-select:all">${esc(svc("taxi").phone)}</b></span><button data-act="copy" data-text="${esc(svc("taxi").phone)}">Copy number</button>`:""}
    ${!ready.length?`<span class="small muted">Set up a ride service below to get started.</span>`:""}
   </div>
   ${em.length?`<p class="small"><b>Share your trip:</b> once you're in the car, use the ride app's share-trip button to send your status to ${em.map(p=>esc(p.name)).join(", ")} (your emergency contacts).</p>`:`<p class="small muted">Add an emergency contact in your trusted circle so you have someone to share trips with.</p>`}
  </div></section>
  <section class="stack"><h2>Ride accounts</h2><div class="grid3">${R.services.map(sv=>{const fl=rideFlags(sv);return `<article class="card ${fl.some(f=>f[0]==="bad")?"flag-bad":fl.length?"flag-warn":""}"><div class="row between"><span class="card-title">${esc(sv.name)}</span><span class="chip ${sv.account==="Not set up"?"":"good"}">${sv.account==="Not set up"?"Not set up":"Ready"}</span></div>
    <label class="f">Account<select data-ride="${sv.id}" data-field="account">${RIDE_ACCTS[sv.id].map(a=>`<option ${a===sv.account?"selected":""}>${esc(a)}</option>`).join("")}</select></label>
    ${sv.id==="taxi"?`<label class="f">Company<input data-ride="taxi" data-field="company" value="${esc(sv.company||"")}"></label><label class="f">Phone<input data-ride="taxi" data-field="phone" value="${esc(sv.phone||"")}" inputmode="tel"></label>`:`<p class="small muted">In the deployed app you connect ${esc(sv.name)} with a secure sign-in so the agent can request rides when you ask. It never sees your password or card.</p>`}
    ${fl.map(f=>`<div class="flagline"><span class="chip ${f[0]}">${f[0]==="bad"?"Fix":"Note"}</span><span class="small">${esc(f[1])}</span></div>`).join("")}</article>`}).join("")}</div></section>
  <section class="stack"><h2>Saved places</h2><div class="panel">
   ${R.places.map(p=>`<div class="row between"><span><b>${esc(p.label)}</b> <span class="small muted">${esc(p.address)}</span>${p.example?` <span class="chip ex">Example</span>`:""}</span><button class="ghost" data-act="del-place" data-id="${p.id}">Remove</button></div>`).join("")||`<p class="small muted">No saved places yet.</p>`}
   <div class="form"><label class="f">Label<input id="pl-label" placeholder="Dorm, practice, airport"></label><label class="f">Address<input id="pl-addr"></label></div>
   <div><button data-act="add-place">Save place</button></div></div></section>
  <div class="panel"><h3>Who pays matters</h3><p class="small">Pay with your own or your family's account. Rides paid for by a booster, collective, school staff or an agency trying to sign you can count as an improper benefit and put your eligibility at risk. If a sponsor covers travel for an NIL job, get it in the written deal and report it.</p></div>`;
}
const SHARE_SECTIONS=[["profile","Profile"],["schools","Schools"],["grades","Grades"],["social","Social accounts"],["offers","Offers and contracts"],["circle","Trusted circle"],["agencies","Agency audits"]];
const PRIVATE_FOR_UNI=["offers","circle","agencies"];
function guardian(){return S.circle.find(p=>["parent","guardian"].includes(p.rel)&&p.perms.cosign)}
function logConsent(text){S.consent.unshift({at:new Date().toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}),text})}
function vGrades(){
  const g=S.grades,core=Number(g.core)||0;
  return `<section class="sec-head"><span class="eyebrow">Grades</span><h1>Grades and eligibility</h1><p class="lede">Track the numbers that keep you eligible. In the University edition your school sends these with your consent. Here you enter them yourself.</p></section>
  ${g.example?`<p class="small"><span class="chip ex">Example</span> Sample numbers. Enter yours below.</p>`:""}
  <div class="panel"><div class="kv"><div><span>Core-course GPA</span><b style="font-size:1.6rem">${esc(g.gpa||"—")}</b></div><div><span>Core courses done</span><b style="font-size:1.6rem">${core}/16</b></div></div>
  <div class="meter"><i style="width:${Math.min(100,core/16*100)}%"></i></div>
  <p class="small muted">NCAA Division I asks for 16 core courses. The NCAA Eligibility Center (high school) or your school's compliance office (college) certifies your status. This tracker never decides it.</p></div>
  <div class="panel"><div class="form"><label class="f">Core-course GPA<input id="gr-gpa" value="${esc(g.gpa)}" inputmode="decimal"></label><label class="f">Core courses completed<input id="gr-core" type="number" min="0" max="20" value="${esc(g.core)}"></label><label class="f full">Notes (tests, classes to retake)<input id="gr-tests" value="${esc(g.tests)}"></label></div><div><button class="primary" data-act="save-grades">Save</button></div></div>
  <div class="panel"><h3>Support from your school</h3><p class="small muted">Tutoring, academic advising and mental-health services show up here when your school uses the University edition.</p></div>`;
}
function vSharing(){
  const minor=isMinor(),gd=guardian();
  const optsA=S.agencies.map(a=>`<option value="Agency|${esc(a.name)}">${esc(a.name)} (agency)</option>`).join("");
  const optsU=S.schools.map(x=>`<option value="University|${esc(x.name)}">${esc(x.name)} (university)</option>`).join("");
  const list=S.shares.filter(x=>x.status!=="Stopped");
  return `<section class="sec-head"><span class="eyebrow">Sharing</span><h1>Share my workspace</h1><p class="lede">Move your workspace to your university or agency so they host it for you. You choose what they see. ${minor?"Because you're a minor, your parent or guardian approves first.":"You confirm every share yourself."}</p></section>
  <div class="panel"><div class="form">
   <label class="f full">Share with<select id="sh-to">${optsU}${optsA}<option value="Agency|">Another agency or law firm</option></select></label>
   <label class="f full">Name, if not listed<input id="sh-other" placeholder="Agency or law firm name"></label>
   <div class="full stack"><span class="small muted" style="font-weight:600">What they can see</span><div class="checks">${SHARE_SECTIONS.map(x=>`<label><input type="checkbox" id="sh-${x[0]}" ${["profile","schools","grades"].includes(x[0])?"checked":""}> ${x[1]}</label>`).join("")}</div>
   <p class="small muted">A university never sees your offers, agency audits or trusted circle, even if you tick them. Those stay in your private area. Agency audits include what you wrote about other agencies.</p></div></div>
   <div class="row"><button class="primary" data-act="share-req">${minor?"Send to my guardian for approval":"Share"}</button>${minor?`<span class="small muted">${gd?"Goes to "+esc(gd.name)+" ("+esc(relName(gd.rel)).toLowerCase()+")":"First add a parent or legal guardian who can co-sign in your trusted circle."}</span>`:""}</div></div>
  <section class="stack"><h2>Your shares</h2>${list.map(x=>`<article class="card ${x.status==="Waiting for guardian"?"flag-warn":""}"><div class="row between"><div class="stack" style="gap:2px"><span class="card-title">${esc(x.to)}</span><span class="small muted">${esc(x.type)} edition · requested ${esc(x.at)}</span></div><span class="chip ${x.status==="Active"?"good":"warn"}">${esc(x.status)}</span></div>
    <div class="row">${x.sections.map(k=>`<span class="chip">${esc((SHARE_SECTIONS.find(y=>y[0]===k)||[k,k])[1])}</span>`).join("")}</div>
    ${x.status==="Waiting for guardian"?`<div class="row"><button class="primary" data-act="share-approve" data-id="${x.id}">Approve as ${esc(x.guardian)} (demo)</button><button data-act="share-decline" data-id="${x.id}">Decline</button></div><p class="small muted">In the real app ${esc(x.guardian)} gets a text and approves in their own account.</p>`:""}
    ${x.status==="Active"?`<div class="row between"><span class="small muted">Approved ${esc(x.approvedAt)}${x.approvedBy?" by "+esc(x.approvedBy):""}</span><button data-act="share-stop" data-id="${x.id}">Stop sharing</button></div>`:""}</article>`).join("")||`<p class="muted small">You aren't sharing with anyone.</p>`}</section>
  <section class="stack"><h2>Consent record</h2><div class="panel">${S.consent.map(c=>`<div class="row between small"><span>${esc(c.text)}</span><span class="muted mono">${esc(c.at)}</span></div>`).join("")||`<p class="small muted">Every request, approval and stop is recorded here.</p>`}</div></section>`;
}
function vProfile(){
  const p=S.profile,a=age();
  const f=(id,label,type="text",extra="")=>`<label class="f">${label}<input id="pf-${id}" data-pf="${id}" type="${type}" value="${esc(p[id])}" ${extra}></label>`;
  const t=(id,label,ph="")=>`<label class="f full">${label}<textarea data-pf="${id}" id="pf-${id}" placeholder="${esc(ph)}" style="min-height:60px">${esc(p[id])}</textarea></label>`;
  return `<section class="sec-head"><span class="eyebrow">Profile</span><h1>About you</h1><p class="lede">Your priorities shape every score and recommendation. The rest helps the agent advise you as a person, not just as an athlete.</p></section>
  ${p.example?`<p class="small"><span class="chip ex">Example</span> This profile is sample data. Edit any field to make it yours.</p>`:""}
  <section class="stack"><h2>Athlete basics</h2><div class="panel"><div class="form">
   ${f("name","Full name")}${f("sport","Sport")}${f("position","Position or event")}${f("gradYear","Graduation year","text",'inputmode="numeric"')}
   <label class="f">Level now<select data-pf="level" id="pf-level">${LEVELS.map(l=>`<option ${l===p.level?"selected":""}>${l}</option>`).join("")}</select></label>
   ${f("school","Current school")}${f("state","Home state","text",'maxlength="2" placeholder="TX"')}${f("dob","Date of birth","date")}
  </div><p class="small muted">${a!==null?`Age ${a}. ${isMinor()?"You're a minor, so a parent or legal guardian must sign contracts with you.":"You're an adult and sign your own contracts."}`:"Add your date of birth so the app knows whether a guardian must sign."}</p></div></section>
  <section class="stack"><h2>What matters most</h2><div class="panel weights">${WEIGHTS.map(([k,l])=>`<div class="wrow"><label for="w-${k}">${l}</label><input id="w-${k}" type="range" min="0" max="10" data-w="${k}" value="${p.weights[k]}"><span class="mono" id="wv-${k}">${p.weights[k]}</span></div>`).join("")}<p class="small muted">0 means it doesn't matter to you. 10 means it's a dealbreaker.</p></div></section>
  <section class="stack"><h2>Beyond sport</h2><div class="panel"><div class="form">
   ${t("interests","What you enjoy outside your sport","Music, gaming, cooking, art…")}
   ${t("causes","Causes you care about","Community, mental health, education…")}
   ${t("career","Career interests after sport")}
   ${t("knownFor","What you want to be known for")}
   ${t("never","Brands or categories you'd never work with")}
   <label class="f">Best way to reach you<select data-pf="comm" id="pf-comm">${["Text","Push notification","Email","Phone call"].map(x=>`<option ${x===p.comm?"selected":""}>${x}</option>`).join("")}</select></label>
   <label class="f">How you like advice<select data-pf="advice" id="pf-advice">${["Straight to the point","Walk me through it","Give me options"].map(x=>`<option ${x===p.advice?"selected":""}>${x}</option>`).join("")}</select></label>
  </div></div></section>
  <p class="small muted">AI, voice and security settings are in <a href="#me">Me</a>.</p>
  <div class="row"><button data-act="reset">Start over with a blank workspace</button></div>`;
}

/* ---------- levels & navigation ---------- */
const LEVELS_APP=[["free","Free"],["nil","NIL add-on"],["uni","University"],["plus","NIL Deal Plus"]];
const RANK={free:0,nil:1,uni:2,plus:3};
const LEVEL_BLURB={
  free:"Build your profile and trusted circle, track schools and grades, and upload offers to compare them with the market.",
  nil:"You've signed a deal. Your contract becomes your rules, plus money, post checks, supplement checks, updates and rides. Monthly price by deal size.",
  uni:"Your university hosts the app. Grades, eligibility and campus support come from your school. Your offers, money and advisers stay in your private vault.",
  plus:"Your agency or law firm hosts the app. Attorney-reviewed contract changes, a secure document vault and investing with a registered adviser."};
const levelName=k=>(LEVELS_APP.find(x=>x[0]===k)||LEVELS_APP[0])[1];
function canSee(sec){return RANK[S.level||"free"]>=RANK[sec.lvl]}
const ICON={
 home:'<path d="M3 10 12 4l9 6"/><path d="M5 10v9h14v-9"/>',
 scan:'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><circle cx="12" cy="12" r="3"/>',
 ask:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
 updates:'<rect x="5" y="2" width="14" height="20" rx="3"/><path d="M10 9l5 3-5 3z"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>'};
const svg=k=>`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k]}</svg>`;
function lockChip(sec){return canSee(sec)?"":`<span class="chip lockc">${levelName(sec.lvl)}</span>`}
function sideNav(){
  const groups=[...new Set(SECTIONS.filter(s=>!s.hide).map(s=>s.g))];
  return groups.map(g=>`<div class="navgroup"><span class="navlabel">${g}</span>${SECTIONS.filter(s=>s.g===g&&!s.hide).map(s=>`<a href="#${s.k}" ${s.k===tab?'aria-current="page"':""}><span>${s.l}</span>${lockChip(s)}</a>`).join("")}</div>`).join("");
}
function levelPanel(){
  return `<div class="panel"><div class="row between"><span class="small" style="font-weight:700">Demo level</span><span class="small muted">Switch to see what each level unlocks</span></div>
  <div class="seg">${LEVELS_APP.map(([k,l])=>`<button data-act="set-level" data-level="${k}" ${S.level===k?'aria-pressed="true"':'aria-pressed="false"'}>${l}</button>`).join("")}</div>
  <p class="small">${esc(LEVEL_BLURB[S.level])}</p></div>`;
}
function vLocked(sec){
  return `<section class="sec-head"><span class="eyebrow">${esc(sec.l)}</span><h1>${esc(sec.l)}</h1></section>
  <div class="panel"><div class="row between"><h3>Unlocks with ${levelName(sec.lvl)}</h3><span class="chip lockc">${levelName(sec.lvl)}</span></div>
  <p>${esc(sec.d||"")}</p><p class="small muted">${esc(LEVEL_BLURB[sec.lvl])}</p>
  <div><button class="primary" data-act="set-level" data-level="${sec.lvl}">Preview as ${levelName(sec.lvl)}</button></div></div>`;
}
/* ---------- AI: Claude viewer, or your own key on the hosted version ---------- */

/* ---------- deal rules (contract-as-rules) ---------- */
const CATS=["beverage","energy drink","sports drink","supplement","nutrition","apparel","footwear","shoes","headphones","audio","automotive","car","restaurant","fast food","gaming","phone","jewelry","watch","betting","snack"];
function addYears(d,y){const x=new Date(d+"T12:00:00");if(isNaN(x))return"";x.setFullYear(x.getFullYear()+Number(y));return x.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
function dealRules(){
  const rules=[];
  S.offers.filter(o=>o.status==="Signed").forEach(o=>{
    const t=o.text||"",sents=t.split(/(?<=[.;\n])\s+/),until=o.signed&&o.years?addYears(o.signed,o.years):"";
    const catsOf=x=>CATS.filter(c=>new RegExp("\\b"+c,"i").test(x));const exs=sents.filter(s=>/exclusiv|shall not (endorse|promote)/i.test(s)).sort((x,y)=>catsOf(y).length-catsOf(x).length);const ex=exs[0];
    if(ex){const cats=catsOf(ex);rules.push({type:"Exclusivity",text:`Don't promote any other ${cats.join(", ")||"competing"} brand`,cats,from:o.title,brand:o.from,snip:ex,until,sev:"bad"})}
    const mk=sents.find(s=>/uniform|logo|school marks/i.test(s));
    if(mk)rules.push({type:"School marks",text:"Content with your uniform or school logos needs the school's written OK",cats:[],from:o.title,brand:o.from,snip:mk,until,sev:"warn"});
    const tr=sents.find(s=>/transfer|withdraw/i.test(s)&&/repay|refund|claw/i.test(s));
    if(tr)rules.push({type:"Transfer",text:"Transferring or leaving school triggers repayment",cats:[],from:o.title,brand:o.from,snip:tr,until,sev:"bad"});
    const cd=sents.find(s=>/moral|conduct|embarrass|disparag/i.test(s));
    if(cd)rules.push({type:"Conduct",text:"The sponsor can end the deal over conduct it finds embarrassing",cats:[],from:o.title,brand:o.from,snip:cd,until,sev:"warn"});
    const ob=t.match(/(\d+)\s+(posts?|videos?|appearances?)\s+(?:per|each|a)\s+(week|month|quarter|year)/i);
    if(ob)rules.push({type:"Obligation",text:`${ob[1]} ${ob[2]} per ${ob[3]}`,cats:[],from:o.title,brand:o.from,snip:ob[0],until,sev:"info"});
  });
  return rules;
}
function ruleConflicts(text){
  const t=String(text||"").toLowerCase();if(!t.trim())return[];
  return dealRules().filter(r=>r.type==="Exclusivity"&&r.cats.some(c=>t.includes(c))&&!(r.brand&&t.includes(r.brand.toLowerCase().split(" ")[0])));
}
function vRules(){
  const rules=dealRules(),signed=S.offers.filter(o=>o.status==="Signed");
  return `<section class="sec-head"><span class="eyebrow">Deal rules</span><h1>Your deals, as rules</h1><p class="lede">When you sign a deal, its terms become rules the app checks for you: before you post, before you take a supplement, before you say yes to another brand.</p></section>
  ${signed.length?"":`<div class="panel"><p>No signed deals yet. Open an offer, choose Edit details, and set its status to Signed.</p><div><a class="btn" href="#offers">Go to offers</a></div></div>`}
  <section class="stack">${rules.map(r=>`<article class="card ${r.sev==="bad"?"flag-bad":r.sev==="warn"?"flag-warn":""}"><div class="row between"><span class="card-title">${esc(r.text)}</span><span class="chip">${esc(r.type)}</span></div>
   <p class="small muted">${esc(r.from)}${r.until?" · until "+esc(r.until):""}</p><div class="snip">“${esc(r.snip)}”</div></article>`).join("")}</section>
  <p class="note">Rules come from the contract text. In NIL Deal Plus, your attorney confirms them.</p>`;
}

/* ---------- money ---------- */
function nextTaxDate(){
  const now=new Date(),y=now.getFullYear();
  const ds=[[y,0,15],[y,3,15],[y,5,15],[y,8,15],[y+1,0,15]].map(a=>new Date(a[0],a[1],a[2]));
  return ds.find(d=>d>now)||ds[ds.length-1];
}
function moneyCalc(){
  const y=new Date().getFullYear();const pays=S.money.payments.filter(p=>String(p.date).startsWith(String(y)));
  const total=pays.reduce((n,p)=>n+(Number(p.amount)||0),0);
  const se=total>400?total*0.9235*0.153:0,inc=total*(Number(S.money.rate)||0)/100,set=se+inc;
  return {total,se,inc,set,pct:total?Math.round(set/total*100):Math.round(15.3*0.9235+(Number(S.money.rate)||0))};
}
function vMoney(){
  const m=moneyCalc(),nd=nextTaxDate();
  return `<section class="sec-head"><span class="eyebrow">Money</span><h1>Money and taxes</h1><p class="lede">NIL money is self-employment income. Set aside tax from every payment so April isn't a surprise.</p></section>
  <div class="panel"><div class="kv"><div><span>Earned this year</span><b style="font-size:1.5rem">${money(m.total)}</b></div><div><span>Set aside for tax</span><b style="font-size:1.5rem">${money(m.set)}</b></div><div><span>Of each payment</span><b style="font-size:1.5rem">${m.pct}%</b></div><div><span>Next estimated payment</span><b>${nd.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</b></div></div>
  <p class="small muted">Self-employment tax ${money(m.se)} (15.3% on 92.35% of earnings) plus federal income tax ${money(m.inc)} at the rate below. State tax not included. Estimates, not tax advice; confirm with a tax professional.</p>
  <label class="f" style="max-width:260px">Federal income tax estimate (%)<input id="money-rate" type="number" min="0" max="37" value="${esc(S.money.rate)}"></label></div>
  <section class="stack"><h2>Payments</h2><div class="panel">
   ${S.money.payments.map(p=>`<div class="row between"><span>${esc(p.date)} · ${esc(p.from)} ${p.example?`<span class="chip ex">Example</span>`:""}</span><span class="row"><b class="mono">${money(p.amount)}</b><span class="small muted">set aside ${money((Number(p.amount)||0)*m.pct/100)}</span><button class="ghost" data-act="del-pay" data-id="${p.id}">Remove</button></span></div>`).join("")||`<p class="small muted">No payments logged yet.</p>`}
   <div class="form"><label class="f">Date<input id="pay-date" type="date"></label><label class="f">From<input id="pay-from" placeholder="Brand or school"></label><label class="f">Amount ($)<input id="pay-amt" type="number" min="0"></label></div>
   <div><button class="primary" data-act="add-pay">Log payment</button></div></div></section>
  ${isMinor()?`<div class="panel"><h3>You're under ${ADULT_AGE(S.profile.state)}</h3><p class="small">Money you earn as a minor usually goes into a custodial account your parent or guardian manages until you're an adult. They see this page too if you've given them "See my money" in your trusted circle.</p></div>`:""}
  ${RANK[S.level]>=3?`<div class="panel"><div class="row between"><h3>Investing</h3><span class="chip">NIL Deal Plus</span></div><p class="small">Your registered adviser can plan what to do with what's left after taxes.</p><div><a class="btn" href="#invest">Open investing</a></div></div>`:""}`;
}

/* ---------- scan (camera) ---------- */
let scanMode="offer",labelResult=null,labelText="";
const BANNED=[
 {re:/1,3-?dimethylamylamine|\bdmaa\b|methylhexan(e)?amine|geranium (oil|extract|stem)/i,name:"DMAA (1,3-dimethylamylamine)",why:"A stimulant on the NCAA banned drug list.",sev:"bad"},
 {re:/\bdmha\b|2-aminoisoheptane|octodrine|2-amino-6-methylheptane/i,name:"DMHA (octodrine)",why:"A stimulant closely related to DMAA. Treat it as banned and ask compliance.",sev:"bad"},
 {re:/ephedr|ma huang/i,name:"Ephedrine or ephedra",why:"A stimulant on the NCAA banned drug list.",sev:"bad"},
 {re:/\bdhea\b|dehydroepiandrosterone/i,name:"DHEA",why:"An anabolic agent on the NCAA banned drug list.",sev:"bad"},
 {re:/androstenedione|androstenediol|\bandro\b/i,name:"Androstenedione-type compounds",why:"Anabolic agents on the NCAA banned drug list.",sev:"bad"},
 {re:/ostarine|enobosarm|ligandrol|lgd-?4033|rad-?140|testolone|\bsarms?\b/i,name:"SARMs",why:"Anabolic agents treated as banned in sport. They aren't legal ingredients in supplements.",sev:"bad"},
 {re:/sibutramine/i,name:"Sibutramine",why:"A banned stimulant sometimes hidden in weight-loss products.",sev:"bad"},
 {re:/proprietary|\bblend\b|\bmatrix\b/i,name:"Proprietary blend",why:"The label doesn't list amounts. Blends are a common source of positive tests.",sev:"warn"},
 {re:/caffeine/i,name:"Caffeine",why:"Allowed in normal amounts, but very high doses can exceed the NCAA limit.",sev:"warn"}];
function checkLabel(t){
  const hits=BANNED.filter(b=>b.re.test(t));
  const cert=/nsf certified for sport|informed sport|bscg|banned substances control group/i.test(t);
  const deal=ruleConflicts(t+" supplement").length&&/supplement|protein|pre-?workout|vitamin|creatine/i.test(t);
  const verdict=hits.some(h=>h.sev==="bad")?["bad","Don't take this"]:hits.length?["warn","Can't confirm"]:["warn","No banned ingredients listed"];
  return {hits,cert,deal,verdict};
}
/* ---------- ask (conversational, text + voice) ---------- */
let askBusy=null,askTipShown=false,pendingAsk="";
const SENS=/\$|\bmoney|\bpay(ment|ing)?\b|contract|\bdeal|\btax|\bgpa\b|grade|clawback|bank|salary|invest|loan/i;
const ASK_RULES=`You are Scout, the AI advisor inside the Athlete Advisory app. Talk like a knowledgeable older teammate: plain words, 2 to 5 short sentences, no markdown tables or headings, because replies may be read aloud. Use the athlete's own data below and name the deal, rule or number you rely on. Never say a supplement is safe; say what's flagged and to check with the school's compliance office. You're not a lawyer or financial adviser: for signing, legal or investment decisions, point to their attorney, registered agent, adviser or school compliance office, and if they're a minor, their parent or guardian. If they ask for something their current edition doesn't include, say which edition unlocks it.`;
function athleteContext(){
  const p=S.profile;
  const offers=S.offers.map(o=>`- ${o.title} (${o.type}, ${o.status||"Reviewing"}, ${money(o.value)}${o.years?" over "+o.years+" yr":""}); flags: ${(o.flags?.found||[]).map(f=>f.label).join(", ")||"none"}`).join("\n");
  const rules=dealRules().map(r=>`- ${r.from}: ${r.text}${r.until?" (until "+r.until+")":""}`).join("\n");
  const schools=[...S.schools].sort((a,b)=>schoolFit(b)-schoolFit(a)).slice(0,4).map(s=>`- ${s.name} (${s.division}, ${s.status}, fit ${schoolFit(s)}/100)`).join("\n");
  const ag=S.agencies.map(a=>`- ${a.name}${a.current?" (current)":""}: fee ${a.fee}%, audit score ${agencyScore(a).score}/100`).join("\n");
  const circle=S.circle.map(c=>`- ${c.name}: ${relName(c.rel)}`).join("\n");
  const m=moneyCalc();
  return `Edition: ${levelName(S.level)}. Today: ${new Date().toDateString()}.\n${profileBrief()}\nName: ${p.name||"unknown"}. School: ${p.school||"?"}. Interests: ${p.interests||"—"}.\nOffers:\n${offers||"none"}\nSigned-deal rules:\n${rules||"none"}\nSchools:\n${schools||"none"}\nAgencies:\n${ag||"none"}\nTrusted circle:\n${circle||"none"}\nGrades: core GPA ${S.grades.gpa||"?"}, ${S.grades.core||0}/16 core courses.\nMoney this year: ${money(m.total)} earned, ${money(m.set)} to set aside for tax. Next estimated tax date ${nextTaxDate().toDateString()}.\n\n${GUARD}`;
}
function localAnswer(q){
  const m=moneyCalc(),rules=dealRules();
  if(/due|deadline|this week|report|remind/i.test(q))return `Here's what's coming up. Your next estimated tax payment is due ${nextTaxDate().toLocaleDateString("en-US",{month:"long",day:"numeric"})}${m.set?`, and you should have about ${money(m.set)} set aside`:""}. ${S.profile.level==="NCAA D-I"?"Any new NIL deal of $600 or more has to be reported to NIL Go within five business days of signing. ":""}${S.shares.some(x=>x.status==="Waiting for guardian")?"You also have a sharing request waiting for your guardian. ":""}`;
  if(/supplement|protein|pre-?workout|creatine|vitamin/i.test(q))return "Use Scan, then Label, and snap the label or type the ingredients. I'll flag anything on the banned list, but a label can't show contamination, so check with your athletic trainer or compliance office before taking it.";
  if(/tax|set aside|money|paid/i.test(q))return m.total?`You've earned ${money(m.total)} this year. Set aside about ${m.pct}% of each payment, which is ${money(m.set)} so far, for self-employment and income tax.`:"Log your NIL payments on the Money page and I'll tell you how much to set aside for taxes from each one.";
  if(/post|instagram|tiktok|#ad|sponsor/i.test(q))return rules.length?`Before you post, remember: ${rules.filter(r=>r.type!=="Obligation").map(r=>r.text.toLowerCase()+" ("+r.from+")").join("; ")}. Paid or gifted posts always need #ad.`:"Paid or gifted posts need #ad. Use the post check on the Social page before you publish.";
  if(/transfer/i.test(q)){const t=rules.find(r=>r.type==="Transfer");return (t?`Careful: ${t.from} says ${t.text.toLowerCase()}. `:"")+"The college sports bill that passed the Senate would allow one transfer without losing eligibility, but it isn't law unless the House passes it by January 3."}
  if(/school|fit|college/i.test(q)){const s=[...S.schools].sort((a,b)=>schoolFit(b)-schoolFit(a))[0];return s?`Your best fit right now is ${s.name} at ${schoolFit(s)} out of 100, based on the priorities in your profile.`:"Add schools on the Schools page and I'll rank them against your priorities."}
  return "I can give short answers from your data here. For full conversations, turn on private AI in Me, under AI.";
}
function startMic(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR)return toast("Voice input isn't available in this browser. Type instead.");
  try{const r=new SR();r.lang="en-US";r.interimResults=false;r.onresult=e=>sendAsk(e.results[0][0].transcript);r.onerror=()=>toast("Couldn't hear you. Allow the microphone or type instead.");r.start();toast("Listening…")}catch(e){toast("Voice input isn't available here. Type instead.")}
}
function vAsk(){
  const P=S.askPrefs;
  const sugg=["What's due this week?","Can I post a pic with free headphones?","How much should I set aside for taxes?","Which school fits me best?","What happens if I transfer?"];
  return `<section class="sec-head"><span class="eyebrow">Ask</span><span data-ai-status></span><div class="row" style="gap:14px"><span class="orb${askBusy?" live":""}" aria-hidden="true"><i></i><i></i><i></i><i></i></span><div class="stack" style="gap:2px"><h1>Ask Scout</h1><span class="small muted">Talk or type. Answers use your deals, schools and profile.</span></div></div></section>
  ${askTipShown?"":`<div class="panel privacy"><div class="row between"><b>Before you ask</b><button data-act="tip-ok">Got it</button></div><p class="small">Make sure no one is looking at your screen or can hear your phone. Answers can include your money, deals and grades.</p></div>`}
  <div class="row"><label class="toggle"><input type="checkbox" id="ask-speak" ${P.speak?"checked":""}> Read answers aloud</label><label class="toggle"><input type="checkbox" id="ask-ear" ${P.earbuds?"checked":""}> I'm using earbuds</label></div>
  ${P.speak&&!P.earbuds?`<p class="small warnline">Speaker is on. Answers about money, deals or grades won't play aloud until you tap Play.</p>`:""}
  ${hasAI()?"":`<p class="small muted">Short answers from your data only. Turn on private AI in <a href="#me">Me</a> for full conversations.</p>`}
  <div class="chat">${S.chat.map((m,i)=>`<div class="msg ${m.role==="user"?"me":"ai"}${m.err?" err":""}">${esc(m.text)}${m.role!=="user"&&!m.err?`<div class="msgtools">${m.sens&&P.speak&&!P.earbuds?`<span class="small">Not played aloud: private details.</span>`:""}<button class="ghost" data-act="speak" data-i="${i}">Play</button></div>`:""}</div>`).join("")}
   ${askBusy?`<div class="msg ai" id="ask-live">${esc(askBusy.msg||"Thinking…")}</div>`:""}<span id="chat-end"></span></div>
  ${S.chat.length?"":`<div class="row">${sugg.map(s=>`<button class="pill" data-act="ask-suggest" data-q="${esc(s)}">${esc(s)}</button>`).join("")}</div>`}
  <div class="askbar"><button class="mic" data-act="mic" aria-label="Talk">${'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 17v5"/></svg>'}</button>
   <label for="ask-in" class="sr">Your question</label><textarea id="ask-in" rows="1" placeholder="Ask anything about your deals, schools or money">${esc(pendingAsk)}</textarea>
   ${askBusy?`<button data-act="ask-stop">Stop</button>`:`<button class="primary" data-act="ask-send">Send</button>`}</div>
  ${S.chat.length?`<div><button class="ghost" data-act="ask-clear">Clear conversation</button></div>`:""}`;
}

/* ---------- updates feed ---------- */
function feedItems(){
  const cur=S.agencies.find(a=>a.current),tr=dealRules().find(r=>r.type==="Transfer"),m=moneyCalc(),nd=nextTaxDate();
  return [
   {tag:"Rule change · pending",title:"The Senate passed a college sports bill.",body:"The Protect College Sports Act passed 77–22 on Sept 28, 2026. If the House passes it by January 3, athletes would get one transfer without losing eligibility, and agent fees would be capped at 5%.",why:[cur&&Number(cur.fee)>5?`Your current agency charges ${cur.fee}%`:"",tr?`${tr.from} has a transfer clawback`:""].filter(Boolean),src:"https://thecollegeinvestor.com/89459/senate-passes-the-protect-college-sports-act/",q:"What would the college sports bill mean for me?"},
   {tag:"Taxes",title:`Next estimated tax payment: ${nd.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}.`,body:"NIL income is self-employment income. Estimated payments are due four times a year.",why:[m.set?`About ${money(m.set)} should be set aside so far`:""].filter(Boolean),src:"",q:"How much should I set aside for taxes?"},
   {tag:"Reporting",title:"Report NIL deals within five business days.",body:"Division I athletes must report third-party NIL deals worth $600 or more to NIL Go within five business days of signing.",why:[S.profile.level==="High school"?"This applies once you're at a Division I school":"This applies to you now"],src:"https://www.collegesportscommission.org/nil/",q:"How do I report an NIL deal?"},
   {tag:"App stores",title:"Texas now requires parental consent for minors' app downloads.",body:"The Supreme Court let the Texas law take effect on July 6, 2026. App stores verify age and get a parent's consent before minors download apps or buy in-app content.",why:[S.profile.state==="TX"&&isMinor()?"You're a minor in Texas, so a parent approves downloads and purchases":""].filter(Boolean),src:"https://www.scotusblog.com/2026/07/supreme-court-allows-texas-to-enforce-law-requiring-age-verification-and-parental-consent-on-app/",q:"Does my parent need to approve things in this app?"}];
}
function vUpdates(){
  return `<section class="sec-head"><span class="eyebrow">Updates</span><h1>What changed, and why it matters to you</h1><p class="lede">Scroll through. In the live app, the rules team and your school or agency add items every week.</p></section>
  <div class="feed">${feedItems().map(f=>`<article class="fcard"><span class="chip ftag">${esc(f.tag)}</span><h2 class="ftitle">${esc(f.title)}</h2><p>${esc(f.body)}</p>
   ${f.why.length?`<div class="stack"><span class="small" style="font-weight:800;letter-spacing:.08em;text-transform:uppercase">Why this is for you</span>${f.why.map(w=>`<span class="fwhy">${esc(w)}</span>`).join("")}</div>`:""}
   <div class="row"><button data-act="feed-ask" data-q="${esc(f.q)}">Ask about this</button>${f.src?`<a class="btn" href="${esc(f.src)}" target="_blank" rel="noopener">Source</a>`:""}</div></article>`).join("")}</div>`;
}

/* ---------- university edition ---------- */
function hostSchool(){const sh=S.shares.find(x=>x.type==="University"&&x.status==="Active");if(sh)return sh.to;const s=S.schools.find(x=>x.status==="Committed")||S.schools.find(x=>x.status==="Offered");return s?s.name:"Your university"}
function vCampus(){
  const sc=hostSchool(),g=S.grades;
  const services=[["Tutoring","Book a session with a subject tutor"],["Academic advising","Plan courses that keep you on track to graduate"],["Counseling and mental health","Confidential support from licensed counselors"],["Career services","Internships and life after sport"],["Financial literacy","Workshops on budgeting, taxes and NIL money"],["Compliance office","Questions about NIL, transfers and eligibility"]];
  return `<section class="sec-head"><span class="eyebrow">My university</span><h1>${esc(sc)}</h1><p class="lede">Your school hosts the app in its own secure cloud. It sends grades, eligibility and support services. It can't open your private vault.</p></section>
  <div class="grid2"><div class="panel"><div class="row between"><h3>Eligibility</h3><span class="chip ex">Demo data</span></div>
   <div class="kv"><div><span>Status from compliance</span><b>Certified for fall</b></div><div><span>Core GPA</span><b>${esc(g.gpa||"—")}</b></div><div><span>Progress toward degree</span><b>On track</b></div></div>
   <p class="small muted">Sent by the school with your FERPA consent. The app shows the school's status. It never decides eligibility itself.</p></div>
   <div class="panel"><div class="row between"><h3>Your private vault</h3><span class="chip good">School can't open</span></div>
   <div class="kv"><div><span>Offers</span><b>${S.offers.length}</b></div><div><span>Agency audits</span><b>${S.agencies.length}</b></div><div><span>Payments</span><b>${S.money.payments.length}</b></div><div><span>Trusted circle</span><b>${S.circle.length}</b></div></div>
   <p class="small muted">Encrypted with keys the university doesn't hold. Share an item only if you choose to.</p></div></div>
  <section class="stack"><h2>Support services</h2><div class="grid3">${services.map(s=>`<div class="card"><span class="card-title">${s[0]}</span><span class="small muted">${s[1]}</span><div><button data-act="book" data-name="${esc(s[0])}">Request</button></div></div>`).join("")}</div></section>
  <section class="stack"><h2>From your athletics department</h2><div class="panel"><div class="row between small"><span>NIL education session for incoming athletes</span><span class="chip ex">Example</span></div><div class="row between small"><span>Reminder: disclose every NIL deal to compliance</span><span class="chip ex">Example</span></div></div></section>`;
}

/* ---------- NIL Deal Plus ---------- */
const REDLINE={clawback:"Payments already earned are not repayable. If Athlete transfers, only future payments stop.",perpetual:"The license ends when this agreement ends. Sponsor may keep content posted during the term for 12 months, then removes it.",exclusive:"Exclusivity covers one named product category only.",morals:"Sponsor may end the agreement only for conduct resulting in criminal charges or school suspension, with written notice.",assign:"Neither party may assign this agreement without the other's written consent.",arbitration:"Disputes are resolved in Athlete's home county.",marks:"Content will not include school marks unless the school approves in writing.",terminate:"Either party may end the agreement with 30 days' written notice.",participation:"If Athlete can't participate because of injury or illness, payments already earned are paid in full.",prohibited:"Remove this category, or confirm in writing that state and school rules allow it.",transfer:"Transfer does not trigger repayment of earned compensation."};
function vLegal(){
  const items=[];S.offers.forEach(o=>(o.flags?.found||[]).filter(f=>f.sev!=="info"&&REDLINE[f.k]).forEach(f=>items.push({key:o.id+":"+f.k,o,f})));
  return `<section class="sec-head"><span class="eyebrow">Legal review</span><h1>Contract changes, approved by your attorney</h1><p class="lede">The agent drafts changes for every risky term. Your agency's attorney approves them before you negotiate.</p></section>
  <section class="stack">${items.map(({key,o,f})=>{const st=S.legal[key]||"Draft";return `<article class="card ${f.sev==="bad"?"flag-bad":"flag-warn"}"><div class="row between"><span class="card-title">${esc(f.label)}</span><span class="chip ${st==="Approved"?"good":st==="With attorney"?"warn":""}">${esc(st)}</span></div>
   <span class="small muted">${esc(o.title)}</span><div class="snip">Now: “${esc(f.snip)}”</div><p class="small"><b>Proposed:</b> ${esc(REDLINE[f.k])}</p>
   <div class="row">${st==="Draft"?`<button class="primary" data-act="legal-send" data-key="${esc(key)}">Send to attorney</button>`:""}${st==="With attorney"?`<button data-act="legal-approve" data-key="${esc(key)}">Approve as attorney (demo)</button>`:""}${st==="Approved"?`<span class="small">Ready to send to ${esc(o.from||"the sponsor")}.</span>`:""}</div></article>`}).join("")||`<p class="muted">No risky terms waiting for review.</p>`}</section>`;
}
function vInvest(){
  const I=S.invest,m=moneyCalc(),left=Math.max(0,m.total-m.set);
  const sel=(id,label,opts)=>`<label class="f">${label}<select id="${id}">${["",...opts].map(o=>`<option ${I[id.slice(3)]===o?"selected":""}>${o}</option>`).join("")}</select></label>`;
  return `<section class="sec-head"><span class="eyebrow">Investing</span><h1>What to do with what's left</h1><p class="lede">After taxes, you have about ${money(left)} from this year's deals. Tell us what you want, and a registered adviser builds the plan.</p></section>
  <div class="panel"><h3>Your goals</h3><div class="form">${sel("iv-horizon","When will you need this money?",["Within a year","1 to 5 years","After I'm done playing"])}${sel("iv-risk","If it dropped 20% in a year, you would…",["Sell to stop the loss","Wait it out","Buy more"])}${sel("iv-goal","Most important goal",["Emergency fund","Help my family","Save for after sport","Grow wealth"])}</div>
   <div class="row"><button class="primary" data-act="invest-save">Save and ask my adviser</button>${I.status?`<span class="chip warn">${esc(I.status)}</span>`:""}</div></div>
  <div class="panel"><h3>Where most athletes start</h3><ul class="clean small"><li>Tax money first, in a separate savings account.</li><li>An emergency fund of three to six months of expenses.</li><li>A Roth IRA can take earned income, including NIL income, up to the yearly limit.</li><li>Broad, low-cost index funds rather than single stocks or tips from friends.</li></ul><p class="small muted">Education, not advice. Your registered adviser approves any specific investment.</p></div>
  <div class="panel"><div class="row between"><h3>Connected accounts</h3><span class="chip ex">Example</span></div>
   <div class="kv"><div><span>Checking</span><b>${money(4200)}</b></div><div><span>Tax savings</span><b>${money(m.set)}</b></div><div><span>Custodial brokerage</span><b>${money(0)}</b></div></div>
   <p class="small muted">In the live app, accounts connect read-only through a secure bank link. The app can't move money.</p></div>`;
}

/* ---------- security: passcode + Face ID / fingerprint ---------- */
let locked=false;
const b64=buf=>btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
const unb64=s=>Uint8Array.from(atob(s.replace(/-/g,"+").replace(/_/g,"/")),c=>c.charCodeAt(0));
async function sha(t){const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode("aa:"+t));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}
function renderLock(){
  document.body.classList.toggle("is-locked",locked);const L=$("#lock");L.hidden=!locked;
  if(!locked){L.innerHTML="";return}
  L.innerHTML=`<div class="lockbox"><span class="brand">Athlete Advisory</span><h1>Locked while you were away</h1><p class="small">Your offers, money and messages stay hidden until you unlock.</p>
   ${S.sec.credId?`<button class="primary" data-act="unlock-bio">Unlock with Face ID or fingerprint</button>`:""}
   <label class="f" style="text-align:left">Passcode<input id="pin-in" type="password" inputmode="numeric" autocomplete="off"></label><button data-act="unlock-pin">Unlock with passcode</button>
   <p class="small muted">Your phone checks your face or fingerprint. The app never sees or stores it.</p></div>`;
  setTimeout(()=>{const i=$("#pin-in");if(i&&!S.sec.credId)i.focus()},50);
}
async function setupBio(){
  if(!window.PublicKeyCredential||!navigator.credentials)return toast("Face ID and fingerprint aren't available in this browser.");
  try{const c=await navigator.credentials.create({publicKey:{challenge:crypto.getRandomValues(new Uint8Array(32)),rp:{name:"Athlete Advisory"},user:{id:crypto.getRandomValues(new Uint8Array(16)),name:S.profile.name||"athlete",displayName:S.profile.name||"Athlete"},pubKeyCredParams:[{type:"public-key",alg:-7},{type:"public-key",alg:-257}],authenticatorSelection:{authenticatorAttachment:"platform",userVerification:"required",residentKey:"preferred"},timeout:60000}});
    S.sec.credId=b64(c.rawId);save();render();toast("Face ID or fingerprint unlock is on");
  }catch(e){toast("Couldn't turn it on here. It works on the hosted version in Safari or Chrome.")}
}
async function unlockBio(){
  try{await navigator.credentials.get({publicKey:{challenge:crypto.getRandomValues(new Uint8Array(32)),allowCredentials:[{type:"public-key",id:unb64(S.sec.credId)}],userVerification:"required",timeout:60000}});locked=false;renderLock();toast("Unlocked")}
  catch(e){toast("That didn't work. Use your passcode.")}
}
document.addEventListener("visibilitychange",()=>{if(document.hidden&&S.sec&&S.sec.pinHash){locked=true;renderLock()}});
function securityPanel(){
  const on=!!S.sec.pinHash;
  return `<section class="stack"><h2>Security</h2><div class="panel">
   <div class="row between"><span>Passcode lock</span><span class="chip ${on?"good":"warn"}">${on?"On":"Off"}</span></div>
   <div class="form"><label class="f">${on?"New passcode":"Choose a passcode"} (4 to 8 digits)<input id="pin-new" type="password" inputmode="numeric" autocomplete="new-password"></label></div>
   <div class="row"><button class="primary" data-act="set-pin">${on?"Change passcode":"Turn on passcode"}</button>${on?`<button data-act="lock-now">Lock now</button><button class="ghost" data-act="clear-sec">Turn off lock</button>`:""}</div>
   <div class="row between"><span>Face ID or fingerprint</span><span class="chip ${S.sec.credId?"good":""}">${S.sec.credId?"On":"Off"}</span></div>
   ${on?`<div><button data-act="setup-bio">${S.sec.credId?"Set up again":"Turn on Face ID or fingerprint"}</button></div>`:`<p class="small muted">Turn on a passcode first. It's the backup if Face ID doesn't work.</p>`}
   <p class="small muted">The app locks whenever you switch away from it. Your data is encrypted on this device. Face ID uses your phone's own passkey check.</p></div></section>`;
}
/* ================= v2: storage, setup, on-device AI, OCR, voice, documents ================= */

/* ---------- blank and sample data ---------- */
function blankData(){return {onboarded:false,setupStep:0,
  profile:{name:"",sport:"",position:"",gradYear:"",state:"",dob:"",level:"High school",school:"",interests:"",causes:"",career:"",knownFor:"",never:"",comm:"Text",advice:"Straight to the point",weights:{money:5,longterm:5,playing:5,academics:5,location:5,brand:5}},
  offers:[],schools:[],agencies:[],socials:[],circle:[],post:{caption:"",sponsored:"no",category:"",tags:[],photoText:""},
  rides:seedRides(false),grades:{gpa:"",core:"",tests:"",example:false},shares:[],consent:[],level:"free",chat:[],
  askPrefs:{speak:false,earbuds:false},money:{rate:12,payments:[]},legal:{},docs:[],invest:{},
  sec:{pinHash:"",credId:""},ai:{enabled:false,size:"",model:""},voice:{name:"",rate:0.88,pitch:0.85}}}
function sampleData(){const d=seed();d.onboarded=true;return d}
function migrate(x){const b=blankData();for(const k in b)if(x[k]===undefined)x[k]=b[k];if(!x.post.tags)x.post.tags=[];if(x.post.photoText===undefined)x.post.photoText="";x.offers.forEach(o=>{if(!o.status)o.status="Reviewing"});return x}

/* ---------- encrypted on-device storage (IndexedDB + AES-GCM) ---------- */
const DBN="athlete-advisory";let _db=null,_key=null,storeMode="secure";
function idb(){if(_db)return Promise.resolve(_db);return new Promise((res,rej)=>{const r=indexedDB.open(DBN,1);r.onupgradeneeded=()=>r.result.createObjectStore("kv");r.onsuccess=()=>{_db=r.result;res(_db)};r.onerror=()=>rej(r.error)})}
function kvTx(mode,fn){return idb().then(d=>new Promise((res,rej)=>{const t=d.transaction("kv",mode);const q=fn(t.objectStore("kv"));t.oncomplete=()=>res(q&&q.result);t.onerror=()=>rej(t.error);t.onabort=()=>rej(t.error)}))}
const kvGet=k=>kvTx("readonly",s=>s.get(k)),kvSet=(k,v)=>kvTx("readwrite",s=>s.put(v,k)),kvDel=k=>kvTx("readwrite",s=>s.delete(k));
async function ckey(){if(_key)return _key;let k=await kvGet("ckey");if(!k){k=await crypto.subtle.generateKey({name:"AES-GCM",length:256},false,["encrypt","decrypt"]);await kvSet("ckey",k)}return _key=k}
async function seal(buf){const iv=crypto.getRandomValues(new Uint8Array(12));return {iv,ct:await crypto.subtle.encrypt({name:"AES-GCM",iv},await ckey(),buf)}}
async function unseal(o){return crypto.subtle.decrypt({name:"AES-GCM",iv:o.iv},await ckey(),o.ct)}
async function loadState(){
  try{const o=await kvGet("state");if(!o)return null;return JSON.parse(new TextDecoder().decode(await unseal(o)))}
  catch(e){storeMode="basic";try{return JSON.parse(localStorage.getItem(LS)||"null")}catch(e2){return null}}
}
let saveT;function save(){clearTimeout(saveT);saveT=setTimeout(persist,300)}
async function persist(){
  if(!S)return;const j=JSON.stringify(S);
  if(storeMode==="secure"){try{await kvSet("state",await seal(new TextEncoder().encode(j)));return}catch(e){storeMode="basic"}}
  try{localStorage.setItem(LS,j)}catch(e){}
}
async function putBlob(id,buf){if(storeMode==="secure"){try{return await kvSet("doc:"+id,await seal(buf))}catch(e){}}return kvSet("doc:"+id,{raw:buf})}
async function getBlob(id,type){const o=await kvGet("doc:"+id);if(!o)return null;return new Blob([o.raw?o.raw:await unseal(o)],{type:type||""})}
async function wipeAll(){try{if(_db)_db.close()}catch(e){}_db=null;_key=null;try{indexedDB.deleteDatabase(DBN)}catch(e){}try{localStorage.removeItem(LS)}catch(e){}}
window.addEventListener("pagehide",()=>{clearTimeout(saveT);persist()});

/* ---------- documents ---------- */
const DOC_KINDS=["Offer","Contract","Representation agreement","ID","Tax form","Grades","Other"];
function guessKind(n){n=n.toLowerCase();if(/w-?9|1099|tax/.test(n))return"Tax form";if(/transcript|report|grade/.test(n))return"Grades";if(/license|passport|\bid\b/.test(n))return"ID";if(/agreement|contract/.test(n))return"Contract";if(/offer/.test(n))return"Offer";return"Other"}
async function addDoc(f,kind){const id=uid();await putBlob(id,await f.arrayBuffer());S.docs.unshift({id,name:f.name||"Photo.jpg",type:f.type||"",size:f.size||0,kind:kind||guessKind(f.name||""),added:new Date().toISOString().slice(0,10),attorney:false});save();return id}
const fmtSize=b=>b>1e6?(b/1e6).toFixed(1)+" MB":Math.max(1,Math.round(b/1e3))+" KB";
let viewerURL=null;
async function openDoc(id){
  const d=S.docs.find(x=>x.id===id);if(!d)return toast("That file isn't on this device anymore.");
  const b=await getBlob(id,d.type);if(!b)return toast("That file isn't on this device anymore.");
  if(viewerURL)URL.revokeObjectURL(viewerURL);viewerURL=URL.createObjectURL(b);
  let body=`<p class="muted">No preview for this file type. Use Download.</p>`;
  if(/^image\//.test(d.type))body=`<img src="${viewerURL}" alt="${esc(d.name)}">`;
  else if(d.type==="application/pdf"||/\.pdf$/i.test(d.name))body=`<iframe src="${viewerURL}" title="${esc(d.name)}"></iframe>`;
  else if(/\.docx$/i.test(d.name)){try{body=`<pre>${esc(await docxText(await b.arrayBuffer()))}</pre>`}catch(e){}}
  else if(/^text\//.test(d.type)||/\.(txt|md)$/i.test(d.name))body=`<pre>${esc(await b.text())}</pre>`;
  const V=$("#viewer");V.hidden=false;
  V.innerHTML=`<div class="vbar"><b>${esc(d.name)}</b><div class="row"><a class="btn" href="${viewerURL}" download="${esc(d.name)}">Download</a><button class="primary" data-act="viewer-close">Close</button></div></div><div class="vbody">${body}</div>`;
}

/* ---------- reading text from photos (on-device OCR) ---------- */
let ocrW=null,ocrBusy="";
async function shrink(file,max=2000){
  try{const bmp=await createImageBitmap(file);const s=Math.min(1,max/Math.max(bmp.width,bmp.height));if(s>=1)return file;
    const c=document.createElement("canvas");c.width=Math.round(bmp.width*s);c.height=Math.round(bmp.height*s);c.getContext("2d").drawImage(bmp,0,0,c.width,c.height);
    return await new Promise(r=>c.toBlob(b=>r(b||file),"image/jpeg",0.9))}catch(e){return file}
}
async function ocrImage(file){
  ocrBusy="Reading the text in your photo…";render();
  try{await loadScript("https://cdn.jsdelivr.net/npm/tesseract.js@7.0.0/dist/tesseract.min.js");
    if(!ocrW)ocrW=await Tesseract.createWorker("eng");
    const r=await ocrW.recognize(await shrink(file));return String(r.data&&r.data.text||"").trim();
  }finally{ocrBusy="";}
}

/* ---------- on-device AI (WebLLM, runs on the phone's graphics chip) ---------- */
const AI={state:"off",pct:0,text:"",engine:null,err:"",loading:null,model:""};
const MODELS={phone:{base:"Llama-3.2-1B-Instruct",label:"Phone size",dl:"about 0.7 GB download"},computer:{base:"Qwen2.5-1.5B-Instruct",label:"Computer size",dl:"about 1 GB download"}};
const isPhone=()=>/iPhone|iPad|Android/i.test(navigator.userAgent)||Math.min(screen.width,screen.height)<700;
function aiSize(){return S.ai.size||(isPhone()?"phone":"computer")}
async function startLocalAI(){
  if(AI.state==="ready"&&AI.engine)return AI.engine;
  if(AI.loading)return AI.loading;
  if(!navigator.gpu){AI.state="error";AI.err="This browser can't run on-device AI. On iPhone, update to iOS 26 and open the app in Safari.";refreshAIStatus();throw {code:"no_gpu"}}
  AI.state="loading";AI.pct=0;AI.text="Starting…";refreshAIStatus();
  AI.loading=(async()=>{
    try{
      const ad=await navigator.gpu.requestAdapter();if(!ad){AI.state="error";AI.err="This device can't run on-device AI. On iPhone, use Safari on iOS 26 or later. Scout still gives short answers from your data.";refreshAIStatus();throw {code:"no_gpu"}}
      const f16=ad.features.has("shader-f16"),size=aiSize();
      const model=`${MODELS[size].base}-${f16?"q4f16_1":"q4f32_1"}-MLC`;
      const webllm=await import("https://esm.run/@mlc-ai/web-llm@0.2.85");
      const eng=await webllm.CreateMLCEngine(model,{initProgressCallback:r=>{AI.pct=r.progress||0;AI.text=r.text||"";refreshAIStatus()}});
      AI.engine=eng;AI.model=model;AI.state="ready";S.ai.enabled=true;S.ai.model=model;S.ai.size=size;save();refreshAIStatus();return eng;
    }catch(e){if(e&&e.code==="no_gpu")throw e;AI.state="error";AI.err="Couldn't start on-device AI ("+(e&&e.message||e)+"). Close other tabs and try again, or choose Phone size.";refreshAIStatus();throw {code:"ai_failed"}}
    finally{AI.loading=null}
  })();
  return AI.loading;
}
function aiStatusHTML(){
  if(AI.state==="loading")return `<div class="meter"><i style="width:${Math.round(AI.pct*100)}%"></i></div><span class="small muted">${esc(String(AI.text).slice(0,140))}</span>`;
  if(AI.state==="ready")return `<span class="chip good">On · running on this device</span>`;
  if(AI.state==="error")return `<span class="small" style="color:var(--bad)">${esc(AI.err)}</span>`;
  if(sampleFn&&!S.ai.enabled)return `<span class="chip good">On through Claude</span>`;
  return S.ai.enabled?`<span class="chip">Downloaded · starts when you ask</span>`:`<span class="chip warn">Off</span>`;
}
function refreshAIStatus(){document.querySelectorAll("[data-ai-status]").forEach(el=>el.innerHTML=aiStatusHTML())}
function hasAI(){return !!(S&&S.ai&&S.ai.enabled)||AI.state==="ready"||!!sampleFn}
function mergeTurns(t){const out=[];t.forEach(m=>{if(out.length&&out[out.length-1].role===m.role)out[out.length-1].content+="\n\n"+m.content;else out.push({...m})});return out}
const MAXDOC=()=>S.ai.enabled?5000:60000;
async function aiChat(messages,opts={}){
  if(S.ai.enabled||AI.state==="ready"){
    const eng=await startLocalAI();
    if(opts.json){
      let r;try{r=await eng.chat.completions.create({messages,temperature:0.2,max_tokens:800,response_format:{type:"json_object"}})}
      catch(e){r=await eng.chat.completions.create({messages,temperature:0.2,max_tokens:800})}
      return r.choices[0].message.content||"";
    }
    const chunks=await eng.chat.completions.create({messages,temperature:0.5,max_tokens:450,stream:true});
    let text="";for await(const c of chunks){if(opts.signal&&opts.signal.aborted){try{eng.interruptGenerate()}catch(e){}throw {code:"cancelled"}}const d=c.choices[0]&&c.choices[0].delta&&c.choices[0].delta.content||"";if(d){text+=d;opts.onText&&opts.onText({text})}}
    return text;
  }
  if(sampleFn){
    const sys=messages.filter(m=>m.role==="system").map(m=>m.content).join("\n\n");
    let turns=messages.filter(m=>m.role!=="system").map(m=>({role:m.role,content:m.content}));
    if(sys)turns[0]={role:"user",content:sys+"\n\n"+turns[0].content};turns=mergeTurns(turns);
    const so={signal:opts.signal};if(opts.images)so.images=opts.images;
    if(opts.json)return JSON.stringify(await sampleFn.json(turns,so));
    const r=await sampleFn(turns,{...so,cache:false,onText:opts.onText});return r.text;
  }
  throw {code:"no_ai"};
}
function parseJSON(t){try{return JSON.parse(t)}catch(e){}const m=String(t).match(/```(?:json)?\s*([\s\S]*?)```/);const raw=m?m[1]:String(t).slice(Math.max(0,String(t).search(/[\[{]/)),Math.max(String(t).lastIndexOf("}"),String(t).lastIndexOf("]"))+1);try{return JSON.parse(raw)}catch(e){throw {code:"invalid_json",text:t}}}
async function aiText(input,opts={}){return aiChat(typeof input==="string"?[{role:"user",content:input}]:input,opts)}
async function aiJSON(input,opts={}){return parseJSON(await aiChat(typeof input==="string"?[{role:"user",content:input}]:input,{...opts,json:true}))}
ERR.no_ai="Turn on private AI in Me, under AI.";ERR.no_gpu="This browser can't run on-device AI. On iPhone, update to iOS 26 and use Safari.";ERR.ai_failed="On-device AI couldn't start. Close other tabs and try again.";
function aiSection(){
  const sz=aiSize();
  return `<div class="panel"><div class="row between"><h3>Private AI</h3><span data-ai-status>${aiStatusHTML()}</span></div>
   <p class="small">Scout's AI runs on this device. Nothing you ask leaves your phone, there's no account or key, and it's free. It downloads once, then works offline.</p>
   <div class="seg">${Object.entries(MODELS).map(([k,m])=>`<button data-act="ai-size" data-size="${k}" aria-pressed="${k===sz}">${m.label}<small>${m.dl}</small></button>`).join("")}</div>
   <div class="row">${AI.state==="ready"?"":`<button class="primary" data-act="ai-start">${S.ai.enabled?"Start AI now":"Download and turn on"}</button>`}${S.ai.enabled?`<button class="ghost" data-act="ai-remove">Turn off and delete download</button>`:""}</div>
   <p class="small muted">Use Wi-Fi for the download. Needs iOS 26 in Safari on iPhone, or a recent Chrome, Edge or Safari on a computer. Smaller models are less precise: Scout still cites your documents, and your attorney or compliance office has the final word.</p></div>`;
}

/* ---------- voice: calm, slower, British male where available ---------- */
const PREF_VOICES=["Daniel","Arthur","Oliver","Google UK English Male","Microsoft Ryan","Microsoft George","Microsoft Thomas","Malcolm"];
function voiceList(){try{return speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang))}catch(e){return[]}}
function pickVoice(){
  const vs=voiceList();if(S.voice.name){const v=vs.find(x=>x.name===S.voice.name);if(v)return v}
  for(const n of PREF_VOICES){const v=vs.find(x=>x.name.startsWith(n)&&/en[-_]GB/i.test(x.lang))||vs.find(x=>x.name.startsWith(n));if(v)return v}
  return vs.find(x=>/en[-_]GB/i.test(x.lang))||vs[0]||null;
}
function speak(text){
  if(!("speechSynthesis" in window))return toast("Spoken answers aren't available in this browser.");
  try{speechSynthesis.cancel();const v=pickVoice();
    (String(text).replace(/[*#_`]/g,"").match(/[^.!?\n]+[.!?]*/g)||[String(text)]).forEach(p=>{if(!p.trim())return;const u=new SpeechSynthesisUtterance(p.trim());if(v){u.voice=v;u.lang=v.lang}u.rate=Number(S.voice.rate)||0.88;u.pitch=Number(S.voice.pitch)||0.85;speechSynthesis.speak(u)});
  }catch(e){toast("Couldn't play audio here.")}
}
if("speechSynthesis" in window){try{speechSynthesis.onvoiceschanged=()=>{if(S&&tab==="me")render()}}catch(e){}}
function voiceSection(){
  const vs=voiceList(),cur=pickVoice();
  const sorted=[...vs].sort((a,b)=>(PREF_VOICES.some(n=>b.name.startsWith(n))-PREF_VOICES.some(n=>a.name.startsWith(n)))||(/GB/.test(b.lang)-/GB/.test(a.lang)));
  return `<div class="panel"><h3>Scout's voice</h3>
   <label class="f">Voice<select id="voice-sel">${sorted.map(v=>`<option value="${esc(v.name)}" ${cur&&v.name===cur.name?"selected":""}>${esc(v.name)} (${esc(v.lang)})</option>`).join("")||`<option>Default voice</option>`}</select></label>
   <div class="form"><label class="f">Speed<input type="range" min="0.6" max="1.2" step="0.02" data-v="rate" value="${esc(S.voice.rate)}"></label><label class="f">Depth<input type="range" min="0.5" max="1.2" step="0.05" data-v="pitch" value="${esc(S.voice.pitch)}"></label></div>
   <div class="row"><button class="primary" data-act="voice-preview">Play a sample</button></div>
   <p class="small muted">Scout uses a calm British male voice when your device has one (Daniel on iPhone). For a richer voice on iPhone: Settings, then Accessibility, Spoken Content, Voices, English (UK), and download an Enhanced male voice.</p></div>`;
}

/* ---------- first-run setup ---------- */
const SETUP=["welcome","you","priorities","people","protect","ai","done"];
function vSetup(){
  const st=SETUP[S.setupStep]||"welcome",p=S.profile,n=S.setupStep;
  const dots=`<div class="dots">${SETUP.slice(1,-1).map((x,i)=>`<i class="${i+1<=n?"on":""}"></i>`).join("")}</div>`;
  const nav=(next="Continue",skip)=>`<div class="setnav"><button data-act="setup-back">Back</button>${skip?`<button class="ghost" data-act="setup-next" data-skip="1">${skip}</button>`:""}<button class="primary" data-act="setup-next">${next}</button></div>`;
  const f=(id,label,type="text",extra="")=>`<label class="f">${label}<input id="pf-${id}" data-pf="${id}" type="${type}" value="${esc(p[id])}" ${extra}></label>`;
  if(st==="welcome")return `<div class="setup-card"><span class="orb big" aria-hidden="true"><i></i><i></i><i></i><i></i></span><h1>Your NIL and scholarship advisor</h1>
   <ul class="clean"><li>Snap an offer and see every term in plain English</li><li>Ask Scout anything, by voice or text</li><li>Keep your deals, documents and people in one private place</li></ul>
   <p class="small muted">Everything you add stays on this device, encrypted. Setup takes about three minutes.</p>
   <button class="primary big" data-act="setup-next">Set up my account</button><button class="ghost" data-act="setup-sample">Explore with sample data instead</button></div>`;
  if(st==="you")return `<div class="setup-card">${dots}<h1>About you</h1><div class="form one">${f("name","Your name","text",'autocomplete="name"')}${f("sport","Sport")}${f("position","Position or event")}
   <label class="f">Where you play now<select data-pf="level" id="pf-level">${LEVELS.map(l=>`<option ${l===p.level?"selected":""}>${l}</option>`).join("")}</select></label>
   ${f("school","School")}${f("gradYear","Graduation year","text",'inputmode="numeric"')}${f("dob","Date of birth","date")}${f("state","Home state (2 letters)","text",'maxlength="2" autocapitalize="characters"')}</div>${nav()}</div>`;
  if(st==="priorities")return `<div class="setup-card">${dots}<h1>What matters most?</h1><p class="small muted">Every school and deal score uses these. 0 means it doesn't matter, 10 means it's a dealbreaker.</p>
   <div class="weights">${WEIGHTS.map(([k,l])=>`<div class="wrow"><label for="w-${k}">${l}</label><input id="w-${k}" type="range" min="0" max="10" data-w="${k}" value="${p.weights[k]}"><span class="mono" id="wv-${k}">${p.weights[k]}</span></div>`).join("")}</div>${nav()}</div>`;
  if(st==="people"){const g=guardian();return `<div class="setup-card">${dots}<h1>Your trusted circle</h1>
   <p class="small">${isMinor()?`Because you're under ${ADULT_AGE(p.state)}, add a parent or legal guardian. They approve contracts and sharing.`:"Add the people who help you decide. You choose what each one can see."}</p>
   ${S.circle.map(c=>`<div class="row between"><span><b>${esc(c.name)}</b> <span class="small muted">${esc(relName(c.rel))}</span></span><button class="ghost" data-act="del-person" data-id="${c.id}">Remove</button></div>`).join("")}
   <div class="form one"><label class="f">Name<input id="su-name"></label><label class="f">Relationship<select id="su-rel">${RELS.map(r=>`<option value="${r[0]}">${r[1]}</option>`).join("")}</select></label><label class="f">Phone or email<input id="su-contact"></label></div>
   <div><button data-act="setup-add-person">Add person</button></div>
   ${isMinor()&&!g?`<p class="small warnline">No parent or guardian added yet.</p>`:""}${nav("Continue","Skip for now")}</div>`}
  if(st==="protect")return `<div class="setup-card">${dots}<h1>Lock the app</h1><p class="small">Your offers, money and documents are private. The app locks every time you leave it.</p>
   ${S.sec.pinHash?`<p><span class="chip good">Passcode on</span></p>${S.sec.credId?`<p><span class="chip good">Face ID on</span></p>`:`<button class="primary" data-act="setup-bio">Turn on Face ID</button><p class="small muted">Your iPhone checks your face. The app never sees it.</p>`}`
   :`<div class="form one"><label class="f">Choose a passcode (4 to 8 digits)<input id="pin-new" type="password" inputmode="numeric" autocomplete="new-password"></label></div><button class="primary" data-act="set-pin">Set passcode</button>`}
   ${nav("Continue","Skip for now")}</div>`;
  if(st==="ai")return `<div class="setup-card">${dots}<h1>Turn on Scout's private AI</h1>${aiSection()}${nav(AI.state==="ready"?"Continue":"Continue",AI.state==="ready"?"":"Do this later")}</div>`;
  return `<div class="setup-card"><span class="orb big" aria-hidden="true"><i></i><i></i><i></i><i></i></span><h1>You're set${p.name?", "+esc(p.name.split(" ")[0]):""}.</h1><p>Start with your first offer, or ask Scout anything.</p>
   <button class="primary big" data-act="setup-finish" data-go="scan">Scan my first offer</button><button data-act="setup-finish" data-go="ask">Ask Scout</button><button class="ghost" data-act="setup-finish" data-go="home">Go to home</button></div>`;
}

/* ---------- home (calm) ---------- */
ICON.doc='<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5"/>';
ICON.folder='<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>';
ICON.me='<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>';
function vHome(){
  const p=S.profile,al=alerts(),first=(p.name||"").split(" ")[0];
  const best=[...S.schools].sort((a,b)=>schoolFit(b)-schoolFit(a))[0];
  const tiles=[
    ["#offers","Offers",S.offers.length?String(S.offers.length):"—",S.offers.length?`${S.offers.reduce((n,o)=>n+sevCount(o).bad,0)} high-risk terms`:"Scan your first"],
    ["#schools","Top school",best?schoolFit(best)+"":"—",best?best.name:"Add schools"],
    ["#grades","Core courses",(Number(S.grades.core)||0)+"/16",S.grades.gpa?"GPA "+S.grades.gpa:"Add grades"],
    canSee(SECTIONS.find(x=>x.k==="money"))?["#money","Tax set-aside",money(moneyCalc().set),"this year"]:["#docs","Documents",String(S.docs.length),"stored privately"]];
  return `<section class="hero"><span class="eyebrow">${levelName(S.level)}</span><h1>${first?`Hey ${esc(first)}.`:"Welcome."}</h1><p class="lede">${al.length?`${al.length} thing${al.length>1?"s need":" needs"} your attention.`:"You're all caught up."}</p></section>
  <div class="quick"><a class="qa" href="#scan">${svg("scan")}<span>Scan</span></a><a class="qa" href="#ask">${svg("ask")}<span>Ask</span></a><a class="qa" href="#offers">${svg("doc")}<span>Offers</span></a><a class="qa" href="#docs">${svg("folder")}<span>Documents</span></a></div>
  ${al.length?`<section class="stack"><h2>Next up</h2>${al.slice(0,3).map(nextCard).join("")}${al.length>3?`<details><summary>${al.length-3} more</summary><div class="stack" style="margin-top:8px">${al.slice(3).map(nextCard).join("")}</div></details>`:""}</section>`:""}
  <section class="stack"><h2>At a glance</h2><div class="glance">${tiles.map(t=>`<a class="tile" href="${t[0]}"><span class="tl">${t[1]}</span><b>${esc(t[2])}</b><span class="small muted">${esc(t[3])}</span></a>`).join("")}</div></section>
  ${[...S.offers,...S.schools,...S.agencies,...S.circle].some(x=>x.example)||S.profile.example?`<div class="panel"><div class="row between"><span class="small"><span class="chip ex">Sample data</span> You're exploring with sample data.</span><button data-act="start-fresh">Start my own setup</button></div></div>`:""}`;
}
const nextCard=x=>`<a class="card nextcard ${x[0]==="bad"?"flag-bad":"flag-warn"}" href="#${x[2]}"><span>${esc(x[1])}</span><span class="chev" aria-hidden="true">›</span></a>`;

/* ---------- me ---------- */
function vMe(){
  const p=S.profile;
  const groups=[...new Set(SECTIONS.filter(s=>!s.hide).map(s=>s.g))];
  return `<section class="sec-head"><span class="eyebrow">Me</span><div class="row between"><h1>${esc(p.name||"Your account")}</h1><a class="btn" href="#profile">Edit profile</a></div><p class="lede">${esc([p.sport,p.position,p.level,p.gradYear&&"class of "+p.gradYear].filter(Boolean).join(" · ")||"Add your sport and school in your profile.")}</p></section>
  <section class="stack"><h2>AI</h2>${aiSection()}</section>
  <section class="stack"><h2>Voice</h2>${voiceSection()}</section>
  ${securityPanel()}
  <section class="stack"><h2>Plan</h2>${levelPanel()}</section>
  <section class="stack"><h2>Everything in the app</h2>${groups.map(g=>`<div class="panel list"><span class="navlabel">${g}</span>${SECTIONS.filter(s=>s.g===g&&!s.hide).map(s=>`<a href="#${s.k}"><span>${s.l}</span>${lockChip(s)}<span class="chev" aria-hidden="true">›</span></a>`).join("")}</div>`).join("")}</section>
  <section class="stack"><h2>Your data</h2><div class="panel"><p class="small">${storeMode==="secure"?"Stored on this device and encrypted.":"Stored on this device. This browser doesn't allow encrypted storage."} ${S.docs.length} document${S.docs.length===1?"":"s"}, ${S.offers.length} offer${S.offers.length===1?"":"s"}.</p>
   <div><button data-act="reset">Erase everything on this device</button></div></div></section>`;
}

/* ---------- documents ---------- */
function vDocs(){
  const plus=RANK[S.level]>=3;
  return `<section class="sec-head"><span class="eyebrow">Documents</span><h1>Your documents</h1><p class="lede">Contracts, offer letters, IDs, tax forms and report cards. Encrypted on this device.</p></section>
  <label class="drop" for="doc-file"><strong>Add documents</strong><span class="small muted">Take a photo, pick from Photos, or choose files</span><input id="doc-file" type="file" multiple hidden></label>
  <section class="stack">${S.docs.map(d=>{const off=S.offers.find(o=>o.docId===d.id);return `<article class="card"><div class="row between"><div class="stack" style="gap:2px;min-width:0"><span class="card-title" style="overflow-wrap:anywhere">${esc(d.name)}</span><span class="small muted">${fmtSize(d.size)} · added ${esc(d.added)}${off?" · linked to "+esc(off.title):""}</span></div>
   <select data-doc="${d.id}" aria-label="Document type" style="width:auto">${DOC_KINDS.map(k=>`<option ${k===d.kind?"selected":""}>${k}</option>`).join("")}</select></div>
   <div class="row"><button class="primary" data-act="doc-view" data-id="${d.id}">View</button>${plus?`<button data-act="doc-atty" data-id="${d.id}">${d.attorney?"Shared with attorney":"Share with attorney"}</button>`:""}<button class="ghost" data-act="doc-del" data-id="${d.id}">Delete</button></div></article>`}).join("")||`<p class="muted">No documents yet. Offers you scan are saved here too.</p>`}</section>`;
}

/* ---------- scan ---------- */
function vScan(){
  const modes=[["offer","Offer"],["post","Post"],["label","Label"],["grades","Grades"]];
  const hint={offer:"Snap an offer or contract, or pick a PDF. Scout reads every term.",post:"Pick the photo you want to post. It's checked against your deals.",label:"Snap a supplement label. Banned ingredients get flagged.",grades:"Snap a report card or transcript to update your grades."}[scanMode];
  const L=labelResult;
  return `<section class="sec-head"><span class="eyebrow">Scan</span><h1>Point, snap, decoded</h1></section>
  <div class="cam"><div class="camframe"></div><p class="camhint">${esc(ocrBusy||hint)}</p>
   <div class="cammodes" role="tablist">${modes.map(([k,l])=>`<button role="tab" aria-selected="${k===scanMode}" data-act="scan-mode" data-mode="${k}">${l}</button>`).join("")}</div>
   <label class="shutter" for="scan-file" aria-label="Take a photo or choose a file"><span></span></label>
   <input id="scan-file" type="file" accept="${scanMode==="offer"?"image/*,.pdf,.docx,.txt":"image/*"}" hidden>
  </div>
  <p class="small muted">Tap the button to take a photo, pick from Photos, or choose a file. Text is read on this device.</p>
  ${scanMode==="label"?`<div class="panel"><label class="f">Ingredients (filled in from your photo, or type them)<textarea id="label-in" placeholder="Supplement Facts and other ingredients">${esc(labelText)}</textarea></label><div><button class="primary" data-act="label-check">Check ingredients</button></div></div>
   ${L?`<div class="panel"><div class="row between"><h2>${esc(L.verdict[1])}</h2><span class="chip ${L.verdict[0]}">${L.hits.length} flagged</span></div>
    ${L.hits.map(h=>`<div class="flagline"><span class="chip ${h.sev}">${h.sev==="bad"?"Banned":"Check"}</span><span class="small"><b>${esc(h.name)}.</b> ${esc(h.why)}</span></div>`).join("")}
    ${L.cert?`<div class="flagline"><span class="chip good">Certified</span><span class="small">The label shows a third-party certification mark. Confirm the product on the certifier's website.</span></div>`:`<div class="flagline"><span class="chip warn">Check</span><span class="small">No third-party certification found on the label.</span></div>`}
    ${L.deal?`<div class="flagline"><span class="chip bad">Deal</span><span class="small">A signed deal covers supplements. Don't post or promote this brand.</span></div>`:""}
    <p class="small muted">A label can't show contamination, so this check never means a product is safe. Ask your athletic trainer or compliance office before taking any supplement.</p></div>`:""}`:""}`;
}

/* ---------- social: check a post first ---------- */
const POST_TAGS=[["drink","Drink or food","beverage energy drink sports drink food restaurant snack"],["supp","Supplement","supplement nutrition"],["uniform","Team uniform","uniform"],["logo","School logo","logo"],["alcohol","Alcohol or vape","alcohol vape"],["brand","Another brand","brand"]];
let postURL=null;
function vSocial(){
  const p=S.post,tags=p.tags||[];
  const tagWords=POST_TAGS.filter(t=>tags.includes(t[0])).map(t=>t[2]).join(" ");
  const all=[p.caption,p.category,p.photoText,tagWords].join(" ");
  const local=detect(all).found.filter(x=>["prohibited","marks"].includes(x.k));
  const needsAd=p.sponsored==="yes"&&!/#ad\b|#sponsored|paid partnership/i.test(p.caption||"");
  const ruleHits=ruleConflicts(all);
  const any=p.caption||tags.length||postURL;
  return `<section class="sec-head"><span class="eyebrow">Social</span><h1>Check a post before it goes up</h1><p class="lede">Pick the photo, tap what's in it, add your caption. It's checked against your deals, your never-list and the rules.</p></section>
  <div class="panel">
   <label class="photo-pick" for="post-photo">${postURL?`<img src="${postURL}" alt="Photo you picked">`:`<span>${svg("scan")}<b>Choose a photo</b><span class="small muted">From Photos or the camera</span></span>`}</label><input id="post-photo" type="file" accept="image/*" hidden>
   ${ocrBusy&&tab==="social"?`<p class="small muted">${esc(ocrBusy)}</p>`:""}
   <span class="small" style="font-weight:700">What's in the photo?</span>
   <div class="row">${POST_TAGS.map(t=>`<button class="tagc" data-act="post-tag" data-tag="${t[0]}" aria-pressed="${tags.includes(t[0])}">${t[1]}</button>`).join("")}</div>
   ${p.photoText?`<p class="small muted">Text found in the photo: “${esc(p.photoText.slice(0,160))}”</p>`:""}
   <div class="form one"><label class="f">Caption<textarea id="post-cap" placeholder="Your caption, hashtags and tags">${esc(p.caption)}</textarea></label>
   <label class="f">Is it sponsored?<select id="post-sp"><option value="no" ${p.sponsored==="no"?"selected":""}>No</option><option value="yes" ${p.sponsored==="yes"?"selected":""}>Yes, paid or gifted</option></select></label>
   <label class="f">Brand category<input id="post-cat" value="${esc(p.category)}" placeholder="e.g. sports drink, local restaurant"></label></div>
   <div class="stack">${local.map(x=>`<div class="flagline"><span class="chip ${x.sev}">${x.sev==="bad"?"Stop":"Review"}</span><span class="small"><b>${esc(x.label)}.</b> ${esc(x.why)}</span></div>`).join("")}${ruleHits.map(r=>`<div class="flagline"><span class="chip bad">Deal</span><span class="small"><b>${esc(r.from)}:</b> ${esc(r.text)}${r.until?" until "+esc(r.until):""}.</span></div>`).join("")}${needsAd?`<div class="flagline"><span class="chip bad">Fix</span><span class="small"><b>Missing disclosure.</b> Sponsored or gifted posts need #ad or the platform's paid-partnership label.</span></div>`:""}${any&&!local.length&&!needsAd&&!ruleHits.length?`<div class="flagline"><span class="chip good">Clear</span><span class="small">No conflicts found with your deals or the common rules.</span></div>`:""}</div>
   ${p.analysis?`<div class="agent"><div class="row between"><h4>Scout's check</h4><span class="chip ${p.analysis.verdict==="good to post"?"good":p.analysis.verdict==="don't post"?"bad":"warn"}">${esc(p.analysis.verdict||"")}</span></div><div class="grid2">${L("Why",p.analysis.reasons)}${L("Fixes",p.analysis.fixes)}</div>${p.analysis.rewrite?`<p class="small"><b>Suggested caption:</b> ${esc(p.analysis.rewrite)}</p>`:""}</div>`:""}
   <div class="row">${agentButton("post","Ask Scout to review it")}${any?`<button class="ghost" data-act="post-clear">Start a new post</button>`:""}</div></div>
  <details class="panel"><summary>Your accounts (${S.socials.length})</summary><div class="stack" style="margin-top:10px">
   ${S.socials.map(s=>{const g=PLATFORM_GUIDE[s.platform]||PLATFORM_GUIDE.Other;return `<div class="row between"><span><b>${esc(s.platform)}</b> ${esc(s.handle)} <span class="chip ${g[1]}">${g[0]}</span></span><button class="ghost" data-act="del-social" data-id="${s.id}">Remove</button></div>`}).join("")}
   <div class="form one"><label class="f">Platform<select id="so-plat">${PLATFORMS.map(x=>`<option>${x}</option>`).join("")}</select></label><label class="f">Handle<input id="so-handle" placeholder="@yourname" autocapitalize="off"></label><label class="f">Followers<input id="so-fol" type="number" inputmode="numeric"></label></div>
   <div><button data-act="add-social">Add account</button></div></div></details>
  <details class="panel"><summary>Which platforms fit you</summary><div class="stack" style="margin-top:10px">${PLATFORMS.filter(x=>x!=="Other").map(k=>{const g=PLATFORM_GUIDE[k];return `<div class="flagline"><span class="chip ${g[1]}">${g[0]}</span><span class="small"><b>${k}.</b> ${esc(g[2])}</span></div>`}).join("")}<div class="flagline"><span class="chip bad">Avoid</span><span class="small">Adult-content subscription sites, betting or prediction-market promotions, and anonymous accounts that talk about teammates or opponents.</span></div></div></details>`;
}

/* ---------- ask (rewritten for on-device AI) ---------- */
async function sendAsk(q){
  q=String(q||"").trim();if(!q||askBusy)return;pendingAsk="";
  S.chat.push({role:"user",text:q});askBusy={ctl:new AbortController(),msg:""};
  if(S.ai.enabled&&AI.state!=="ready")askBusy.msg="Starting private AI. The first start can take up to a minute.";
  save();render();
  try{
    let ans;
    if(hasAI()){
      const hist=S.chat.slice(-8).map(m=>({role:m.role,content:m.text}));
      while(hist.length&&hist[0].role!=="user")hist.shift();
      const msgs=[{role:"system",content:`${ASK_RULES}\n\nWHAT YOU KNOW ABOUT THIS ATHLETE:\n${athleteContext()}`},...mergeTurns(hist)];
      ans=await aiChat(msgs,{signal:askBusy.ctl.signal,onText:({text})=>{const b=$("#ask-live");if(b)b.textContent=text}});
    }else ans=localAnswer(q);
    ans=String(ans||"").trim()||"I didn't catch that. Try asking another way.";
    const sens=SENS.test(q+" "+ans);S.chat.push({role:"assistant",text:ans,sens});
    if(S.askPrefs.speak&&(!sens||S.askPrefs.earbuds))speak(ans);
  }catch(e){if(e&&e.code!=="cancelled")S.chat.push({role:"assistant",text:errCopy(e),err:true})}
  finally{askBusy=null;save();render();const l=$("#chat-end");if(l)l.scrollIntoView({block:"end"})}
}

/* ---------- navigation ---------- */
function bottomNav(){return ["ask","scan","home","updates","me"].map(k=>{const s=SECTIONS.find(x=>x.k===k);return `<a href="#${k}" ${k===tab?'aria-current="page"':""} class="${k==="home"?"homeb":""}">${svg(k==="updates"?"updates":k)}<span>${s.l}</span></a>`}).join("")}

/* ---------- render ---------- */
const VIEWS={home:vHome,scan:vScan,ask:vAsk,offers:vOffers,schools:vSchools,grades:vGrades,circle:vCircle,sharing:vSharing,profile:vProfile,rules:vRules,money:vMoney,social:vSocial,agencies:vAgencies,updates:vUpdates,rides:vRides,campus:vCampus,legal:vLegal,docs:vDocs,invest:vInvest,me:vMe};
function render(){
  if(!S)return;
  const setup=!S.onboarded;document.body.classList.toggle("setup",setup);
  const active=document.activeElement,aid=active&&active.id,sel=active&&active.selectionStart;
  if(setup){$("#main").innerHTML=vSetup();$("#side").innerHTML="";$("#bottom").innerHTML="";}
  else{
    const p=S.profile,sec=SECTIONS.find(x=>x.k===tab)||SECTIONS[0];
    $("#who").innerHTML=`${p.name?`<span class="chip">${esc(p.name)}</span>`:""}${p.dob?`<span class="chip ${isMinor()?"warn":""}">${isMinor()?"Minor":"Adult"}</span>`:""}`;
    $("#lvl-name").textContent=levelName(S.level);
    $("#side").innerHTML=sideNav();$("#bottom").innerHTML=bottomNav();
    const openState={};document.querySelectorAll("details[data-open]").forEach(d=>openState[d.dataset.open]=d.open);
    $("#main").innerHTML=canSee(sec)?VIEWS[sec.k]():vLocked(sec);
    document.querySelectorAll("details[data-open]").forEach(d=>{if(d.dataset.open in openState)d.open=openState[d.dataset.open]});
    wireDrop();
  }
  if(aid){const el=document.getElementById(aid);if(el){el.focus({preventScroll:true});try{if(sel!=null)el.setSelectionRange(sel,sel)}catch(e){}}}
  refreshAIStatus();
}
async function boot(){
  let saved=null;try{saved=await loadState()}catch(e){}
  S=migrate(saved||blankData());
  if(S.sec.pinHash)locked=true;
  render();renderLock();
}

function setPostPhoto(f){images.set("post",f);if(postURL)URL.revokeObjectURL(postURL);postURL=URL.createObjectURL(f);S.post.photoText="";render();ocrImage(f).then(t=>{S.post.photoText=t.replace(/\s+/g," ").trim();save();render()}).catch(()=>render())}
/* ---------- render (moved) ---------- */
window.addEventListener("hashchange",()=>{const t=location.hash.slice(1);if(TABS.some(x=>x[0]===t)){tab=t;render();window.scrollTo(0,0)}});
window.addEventListener("focus",()=>{},{passive:true});

/* ---------- events ---------- */
function wireDrop(){
  const d=$("#drop-offers");if(!d)return;
  ["dragenter","dragover"].forEach(e=>d.addEventListener(e,ev=>{ev.preventDefault();d.classList.add("over")}));
  ["dragleave","drop"].forEach(e=>d.addEventListener(e,ev=>{ev.preventDefault();d.classList.remove("over")}));
  d.addEventListener("drop",ev=>{const fs=[...(ev.dataTransfer?.files||[])];if(fs.length)intakeOffers(fs)});
}
document.addEventListener("dragover",e=>e.preventDefault());document.addEventListener("drop",e=>e.preventDefault());
const val=id=>{const e=document.getElementById(id);return e?e.value.trim():""};
const chk=id=>!!document.getElementById(id)?.checked;
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-act]");if(!b)return;const act=b.dataset.act,id=b.dataset.id;
  if(act==="agent")return runAgent(b.dataset.key);
  if(act==="stop"){busy[b.dataset.key]?.ctl.abort();return}
  if(act==="paste-offer"){const text=val("paste-text");if(!text)return toast("Paste the offer text first.");const amts=detect(text).amounts.map(a=>Number(a.replace(/[$,]/g,"")));S.offers.unshift({id:uid(),title:val("paste-title")||"Pasted offer",from:guessFrom(text),type:guessType(text),value:amts.length?Math.max(...amts):"",years:"",text,source:"Pasted text",flags:detect(text),open:true});toast("Offer added")}
  if(act==="del-offer")S.offers=S.offers.filter(o=>o.id!==id);
  if(act==="add-school"){const n=val("sc-name");if(!n)return toast("Enter a school name.");const cl=x=>Math.min(5,Math.max(1,Number(val(x))||3));S.schools.push({id:uid(),name:n,division:val("sc-div"),conference:val("sc-conf"),state:val("sc-state").toUpperCase(),status:val("sc-status"),interest:cl("sc-int"),r:{playing:cl("sc-playing"),academics:cl("sc-academics"),location:cl("sc-location"),money:cl("sc-money"),brand:cl("sc-brand")},notes:val("sc-notes")});toast("School added")}
  if(act==="del-school")S.schools=S.schools.filter(o=>o.id!==id);
  if(act==="add-agency"){const n=val("ag-name");if(!n)return toast("Enter the agency name.");S.agencies.push({id:uid(),name:n,current:val("ag-cur")==="1",reg:val("ag-reg"),fee:Number(val("ag-fee"))||0,services:SERVICES.filter((s,i)=>chk("ag-s"+i)),conflicts:val("ag-conf"),notice:Number(val("ag-notice"))||0,tail:Number(val("ag-tail"))||0,notes:val("ag-notes"),agreement:""});toast("Agency added")}
  if(act==="toggle-cur"){const a=S.agencies.find(x=>x.id===id);a.current=!a.current}
  if(act==="del-agency")S.agencies=S.agencies.filter(o=>o.id!==id);
  if(act==="add-social"){const h=val("so-handle");if(!h)return toast("Enter your handle.");S.socials.push({id:uid(),platform:val("so-plat"),handle:h,url:/^https:\/\//.test(val("so-url"))?val("so-url"):"",followers:Number(val("so-fol"))||""});toast("Account added")}
  if(act==="del-social")S.socials=S.socials.filter(o=>o.id!==id);
  if(act==="add-person"){const n=val("ci-name");if(!n)return toast("Enter a name.");const perms={};PERMS.forEach(p=>perms[p[0]]=chk("ci-"+p[0]));S.circle.push({id:uid(),name:n,rel:val("ci-rel"),tier:val("ci-tier"),contact:val("ci-contact"),perms});toast(n+" added to your circle")}
  if(act==="tier"){const p=S.circle.find(x=>x.id===id);p.tier=p.tier==="Inner"?"Extended":"Inner"}
  if(act==="del-person"){S.circle=S.circle.filter(o=>o.id!==id);toast("Removed from your circle")}
  if(act==="ride-place"){const p=S.rides.places.find(x=>x.id===id);S.rides.dest=p.address}
  if(act==="add-place"){const a=val("pl-addr");if(!a)return toast("Enter an address.");S.rides.places.push({id:uid(),label:val("pl-label")||"Saved place",address:a});toast("Place saved")}
  if(act==="del-place")S.rides.places=S.rides.places.filter(x=>x.id!==id);
  if(act==="copy"){const t=b.dataset.text||"";if(!t)return toast("Enter a destination first.");navigator.clipboard?.writeText(t).then(()=>toast("Copied"),()=>toast("Select the text and copy it."));return}
  if(act==="save-grades"){S.grades={gpa:val("gr-gpa"),core:Number(val("gr-core"))||0,tests:val("gr-tests"),example:false};toast("Grades saved")}
  if(act==="share-req"){const parts=val("sh-to").split("|");const type=parts[0],to=parts[1]||val("sh-other");if(!to)return toast("Enter who you're sharing with.");
    let sections=SHARE_SECTIONS.map(x=>x[0]).filter(k=>chk("sh-"+k));if(type==="University")sections=sections.filter(k=>!PRIVATE_FOR_UNI.includes(k));if(!sections.length)return toast("Pick at least one thing to share.");
    const at=new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"});
    if(isMinor()){const gd=guardian();if(!gd)return toast("First add a parent or legal guardian who can co-sign.");S.shares.unshift({id:uid(),to,type,sections,status:"Waiting for guardian",guardian:gd.name,at});logConsent(`${S.profile.name||"Athlete"} asked to share with ${to}. Sent to ${gd.name}.`);toast("Sent to "+gd.name)}
    else{if(b.dataset.confirm!=="1"){b.dataset.confirm="1";b.textContent="Tap again to confirm";return}S.shares.unshift({id:uid(),to,type,sections,status:"Active",at,approvedAt:at,approvedBy:""});logConsent(`${S.profile.name||"Athlete"} shared ${sections.length} sections with ${to}.`);toast("Shared with "+to)}}
  if(act==="share-approve"){const x=S.shares.find(y=>y.id===id);x.status="Active";x.approvedBy=x.guardian;x.approvedAt=new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"});logConsent(`${x.guardian} approved sharing with ${x.to}.`);toast("Approved")}
  if(act==="share-decline"){const x=S.shares.find(y=>y.id===id);x.status="Stopped";logConsent(`${x.guardian} declined sharing with ${x.to}.`);toast("Declined")}
  if(act==="share-stop"){const x=S.shares.find(y=>y.id===id);x.status="Stopped";logConsent(`Sharing with ${x.to} stopped. They were asked to delete copies.`);toast("Sharing stopped")}
  if(act==="setup-next"){const st=SETUP[S.setupStep];if(st==="you"&&!S.profile.name.trim())return toast("Add your name to continue.");S.setupStep=Math.min(SETUP.length-1,S.setupStep+1);save();render();window.scrollTo(0,0);return}
  if(act==="setup-back"){S.setupStep=Math.max(0,S.setupStep-1);save();render();window.scrollTo(0,0);return}
  if(act==="setup-sample"){S=migrate(sampleData());save();location.hash="home";render();toast("Exploring with sample data");return}
  if(act==="start-fresh"){(async()=>{await wipeAll();storeMode="secure";S=blankData();render()})();return}
  if(act==="setup-finish"){S.onboarded=true;save();location.hash=b.dataset.go||"home";render();return}
  if(act==="setup-add-person"){const n=val("su-name");if(!n)return toast("Enter a name.");const rel=val("su-rel"),g=["parent","guardian"].includes(rel);S.circle.push({id:uid(),name:n,rel,tier:"Inner",contact:val("su-contact"),perms:{offers:true,money:g,cosign:g,negotiate:false,alerts:g,emergency:g}});toast(n+" added")}
  if(act==="setup-bio"){setupBio();return}
  if(act==="ai-start"){startLocalAI().then(()=>{toast("Private AI is on");render()}).catch(e=>toast(errCopy(e)));return}
  if(act==="ai-size"){if(AI.state==="ready"||AI.state==="loading")return toast("Turn off the current AI first to switch size.");S.ai.size=b.dataset.size}
  if(act==="ai-remove"){(async()=>{try{const w=await import("https://esm.run/@mlc-ai/web-llm@0.2.85");if(AI.engine){try{await AI.engine.unload()}catch(e){}}if(S.ai.model)await w.deleteModelAllInfoInCache(S.ai.model)}catch(e){}AI.state="off";AI.engine=null;S.ai={enabled:false,size:S.ai.size,model:""};save();render();toast("AI turned off and download deleted")})();return}
  if(act==="voice-preview"){speak("Good evening. Your estimated tax payment is due in January, and your Summit Peak deal still blocks other drink brands. Anything else?");return}
  if(act==="post-tag"){const t=b.dataset.tag,a=S.post.tags||(S.post.tags=[]);const i=a.indexOf(t);if(i>=0)a.splice(i,1);else a.push(t)}
  if(act==="post-clear"){S.post={caption:"",sponsored:"no",category:"",tags:[],photoText:""};images.delete("post");if(postURL){URL.revokeObjectURL(postURL);postURL=null}}
  if(act==="doc-view"){openDoc(id);return}
  if(act==="viewer-close"){const V=$("#viewer");V.hidden=true;V.innerHTML="";return}
  if(act==="doc-atty"){const d=S.docs.find(x=>x.id===id);d.attorney=!d.attorney;toast(d.attorney?"Shared with your attorney":"No longer shared")}
  if(act==="doc-del"){if(b.dataset.confirm!=="1"){b.dataset.confirm="1";b.textContent="Tap again to delete";return}S.docs=S.docs.filter(x=>x.id!==id);S.offers.forEach(o=>{if(o.docId===id)o.docId=""});kvDel("doc:"+id).catch(()=>{});toast("Deleted")}
  if(act==="set-level"){S.level=b.dataset.level;toast("Previewing "+levelName(S.level))}
  if(act==="scan-mode"){scanMode=b.dataset.mode;render();return}
  if(act==="label-check"){labelText=val("label-in");if(!labelText)return toast("Type or paste the ingredients first.");labelResult=checkLabel(labelText);render();return}
  if(act==="label-ai"){(async()=>{try{toast("Reading the label…");const r=await aiJSON('Read this supplement label photo. Reply with only JSON: {"ingredients": string} listing every ingredient and any certification marks as plain text.',{images:[images.get("label")]});labelText=String(r.ingredients||"");labelResult=checkLabel(labelText);render()}catch(e){toast(errCopy(e))}})();return}
  if(act==="ask-send"){sendAsk(val("ask-in"));pendingAsk="";return}
  if(act==="ask-suggest"){sendAsk(b.dataset.q);return}
  if(act==="ask-stop"){askBusy?.ctl.abort();return}
  if(act==="ask-clear"){S.chat=[]}
  if(act==="speak"){const m=S.chat[Number(b.dataset.i)];if(m)speak(m.text);return}
  if(act==="mic"){startMic();return}
  if(act==="tip-ok"){askTipShown=true}
  if(act==="feed-ask"){pendingAsk=b.dataset.q;location.hash="ask";return}
  if(act==="add-pay"){const amt=Number(val("pay-amt"));if(!amt)return toast("Enter the amount.");S.money.payments.unshift({id:uid(),date:val("pay-date")||new Date().toISOString().slice(0,10),from:val("pay-from")||"NIL payment",amount:amt});toast("Payment logged. Set aside "+moneyCalc().pct+"% for tax.")}
  if(act==="del-pay")S.money.payments=S.money.payments.filter(x=>x.id!==id);
  if(act==="legal-send"){S.legal[b.dataset.key]="With attorney";toast("Sent to your attorney")}
  if(act==="legal-approve"){S.legal[b.dataset.key]="Approved";toast("Approved")}
  if(act==="invest-save"){S.invest={horizon:val("iv-horizon"),risk:val("iv-risk"),goal:val("iv-goal"),status:"Waiting for your adviser"};toast("Sent to your adviser")}
  if(act==="book"){toast(b.dataset.name+": request sent (demo)");return}
  if(act==="set-pin"){const pin=val("pin-new");if(!/^\d{4,8}$/.test(pin))return toast("Use 4 to 8 digits.");sha(pin).then(h=>{S.sec.pinHash=h;save();render();toast("Passcode on. The app locks when you switch away.")});return}
  if(act==="clear-sec"){S.sec={pinHash:"",credId:""};toast("Lock turned off")}
  if(act==="lock-now"){if(!S.sec.pinHash){location.hash="profile";return toast("Set a passcode first.")}locked=true;renderLock();return}
  if(act==="setup-bio"){setupBio();return}
  if(act==="unlock-bio"){unlockBio();return}
  if(act==="unlock-pin"){sha(val("pin-in")).then(h=>{if(h===S.sec.pinHash){locked=false;renderLock();toast("Unlocked")}else toast("Wrong passcode.")});return}
  if(act==="clear-ex"){S.money.payments=S.money.payments.filter(x=>!x.example);if(S.grades.example)S.grades={gpa:"",core:"",tests:"",example:false};S.rides.places=S.rides.places.filter(x=>!x.example);["offers","schools","agencies","socials","circle"].forEach(k=>S[k]=S[k].filter(x=>!x.example));if(S.profile.example){const w=S.profile.weights;S.profile={name:"",sport:"",position:"",gradYear:"",state:"",dob:"",level:"High school",school:"",interests:"",causes:"",career:"",knownFor:"",never:"",comm:"Text",advice:"Straight to the point",weights:w}}toast("Examples cleared")}
  if(act==="reset"){if(b.dataset.confirm!=="1"){b.dataset.confirm="1";b.textContent="Tap again to erase everything";return}(async()=>{await wipeAll();storeMode="secure";S=blankData();images.clear();locked=false;renderLock();location.hash="home";render();toast("Everything on this device was erased")})();return}
  save();render();
});
document.addEventListener("change",e=>{
  const t=e.target;
  if(t.id==="level-sel"){S.level=t.value;save();render();toast("Previewing "+levelName(S.level));return}
  if(t.id==="scan-file"&&t.files[0]){const f=t.files[0];t.value="";
    if(scanMode==="offer"){intakeOffers([f]).then(()=>{location.hash="offers"});return}
    if(scanMode==="post"){setPostPhoto(f);location.hash="social";return}
    if(scanMode==="label"){ocrImage(f).then(txt=>{labelText=txt;labelResult=checkLabel(txt);addDoc(f,"Other");render();toast(txt?"Label read":"Couldn't read the label. Type the ingredients.")}).catch(()=>{render();toast("Couldn't read the label. Type the ingredients.")});return}
    if(scanMode==="grades"){ocrImage(f).then(txt=>{const g=txt.match(/(?:gpa|grade point average)[^0-9]{0,20}([0-4]\.\d{1,3})/i);if(g){S.grades.gpa=g[1];S.grades.example=false}addDoc(f,"Grades");save();location.hash="grades";toast(g?"Found GPA "+g[1]+". Check the other numbers.":"Saved. Enter your numbers from the report card.")}).catch(()=>toast("Couldn't read that photo."));return}}
  if(t.id==="doc-file"&&t.files.length){const fs=[...t.files];t.value="";Promise.all(fs.map(f=>addDoc(f))).then(()=>{render();toast(fs.length>1?fs.length+" documents added":"Document added")});return}
  if(t.dataset.doc){const d=S.docs.find(x=>x.id===t.dataset.doc);if(d){d.kind=t.value;save()}return}
  if(t.id==="post-photo"&&t.files[0]){setPostPhoto(t.files[0]);t.value="";return}
  if(t.id==="voice-sel"){S.voice.name=t.value;save();speak("This is how I'll sound.");return}
  if(t.id==="ask-speak"){S.askPrefs.speak=t.checked;save();render();return}
  if(t.id==="ask-ear"){S.askPrefs.earbuds=t.checked;save();render();return}
  if(t.id==="file-offers"&&t.files.length)return intakeOffers([...t.files]);
  if(t.dataset.agreement&&t.files[0])return intakeAgreement(t.dataset.agreement,t.files[0]);
  if(t.dataset.o){const o=S.offers.find(x=>x.id===t.dataset.o);const f=t.dataset.field;o[f]=["value","years"].includes(f)?(t.value===""?"":Number(t.value)):t.value;o.example=false;save();render();return}
  if(t.dataset.s){const s=S.schools.find(x=>x.id===t.dataset.s);if(t.dataset.r)s.r[t.dataset.r]=Math.min(5,Math.max(1,Number(t.value)||1));else s[t.dataset.field]=t.value;save();render();return}
  if(t.dataset.p){const p=S.circle.find(x=>x.id===t.dataset.p);p.perms[t.dataset.perm]=t.checked;save();render();return}
  if(t.dataset.pf&&t.tagName==="SELECT"){S.profile[t.dataset.pf]=t.value;S.profile.example=false;save();render();return}
  if(t.dataset.pf&&(t.type==="date")){S.profile.dob=t.value;S.profile.example=false;save();render();return}
  if(t.dataset.ride){const sv=S.rides.services.find(x=>x.id===t.dataset.ride);sv[t.dataset.field]=t.value;save();render();return}
  if(t.id==="post-sp"){S.post.sponsored=t.value;save();render()}
});
document.addEventListener("input",e=>{
  const t=e.target;
  if(t.dataset.w){S.profile.weights[t.dataset.w]=Number(t.value);document.getElementById("wv-"+t.dataset.w).textContent=t.value;save();return}
  if(t.dataset.pf&&t.tagName!=="SELECT"&&t.type!=="date"){S.profile[t.dataset.pf]=t.dataset.pf==="state"?t.value.toUpperCase():t.value;if(S.profile.example){S.profile.example=false}save();return}
  if(t.id==="post-cap"){S.post.caption=t.value;save();clearTimeout(t._t);t._t=setTimeout(render,500);return}
  if(t.id==="ride-dest"){S.rides.dest=t.value;save();clearTimeout(t._t);t._t=setTimeout(render,600);return}
  if(t.id==="post-cat"){S.post.category=t.value;save();return}
  if(t.id==="money-rate"){S.money.rate=Number(t.value)||0;save();clearTimeout(t._t);t._t=setTimeout(render,600);return}
  if(t.id==="ask-in"){pendingAsk=t.value;return}
  if(t.dataset.v){S.voice[t.dataset.v]=Number(t.value);save();return}
});
document.addEventListener("toggle",e=>{const d=e.target;if(d.dataset&&d.dataset.open){const o=S.offers.find(x=>x.id===d.dataset.open);if(o){o.open=d.open;save()}}},true);
document.addEventListener("keydown",e=>{if(e.target.id==="ask-in"&&e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendAsk(e.target.value);pendingAsk=""}if(e.target.id==="pin-in"&&e.key==="Enter"){e.preventDefault();document.querySelector('[data-act="unlock-pin"]')?.click()}});
boot();
if(location.protocol==="https:"&&"serviceWorker" in navigator){navigator.serviceWorker.register("sw.js").catch(()=>{})}
