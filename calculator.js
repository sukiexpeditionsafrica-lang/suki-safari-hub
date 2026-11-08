// Suki Safari Hub shared calculator (web v1.6).
// One implementation used by both index.html (home page) and calculator.html
// (Plan Your Safari). Edit here and both routes change together.
// Maths: permits are charged once per trekker, not per day;
// park fees are charged per person per day.

var CALC_CSS=".step{display:none}\n.step.active{display:block}\n.progress{height:10px;background:#e8e8e8;border-radius:5px;overflow:hidden;margin:8px 0}\n.progressFill{height:100%;background:#7a5a12;width:17%}\n.stepnav{display:flex;gap:10px;margin-top:16px}\n.stepnav button{flex:1}\n.choice{display:block;border:1px solid #ddd;border-radius:8px;padding:12px;margin:8px 0;cursor:pointer}\n.choice input{width:auto;margin-right:8px}\n#expMatches button{margin:6px 6px 0 0;width:auto}\n.note{background:#e8f5e9;border:1px solid #7a5a12;padding:10px;border-radius:8px}\n.card{border:1px solid #ddd;border-radius:10px;padding:16px;margin-top:18px;overflow-x:auto}\n.warn{background:#fff8e1;border:1px solid #e6c87a;padding:12px;border-radius:8px}\n.stay{border:1px solid #ddd;border-radius:10px;padding:12px;margin-top:10px}\n.stay button{margin-top:8px}\ntable{width:100%;border-collapse:collapse}\ntd{padding:6px 0;border-bottom:1px solid #eee}\ntd:last-child{text-align:right}\nlabel{display:block;margin:12px 0 4px;font-weight:600}\ninput,select{width:100%;padding:10px;font-size:16px;box-sizing:border-box;max-width:100%}\nbutton{margin-top:16px;padding:12px 18px;font-size:16px;background:#7a5a12;color:#fff;border:0;cursor:pointer;border-radius:6px;min-height:44px}\n.btn{display:inline-block;background:#1d4d2b;color:#fff!important;padding:12px 18px;border-radius:6px;text-decoration:none;font-weight:700;margin:6px 8px 0 0;min-height:44px;line-height:1.2}\n.btn-gold{background:#7a5a12;color:#fff!important}\n@media (max-width:600px){.stepnav{flex-direction:column}.stepnav button{width:100%}}\n";
var DESTINATIONS=[{"country": "Uganda", "name": "Bwindi Impenetrable National Park", "type": "National park", "permit": 800, "feeNote": "Gorilla permit $800 per person for foreign non-residents, $700 for foreign residents, $600 low season April, May and November, checked 30 Oct 2026 against UWA tariff summaries, recheck UWA before quoting"}, {"country": "Uganda", "name": "Kibale National Park", "type": "National park", "permit": 0, "feeNote": "Fee varies by activity, check UWA"}, {"country": "Uganda", "name": "Queen Elizabeth National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check UWA"}, {"country": "Uganda", "name": "Murchison Falls National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check UWA"}, {"country": "Uganda", "name": "Kidepo Valley National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check UWA"}, {"country": "Uganda", "name": "Mgahinga Gorilla National Park", "type": "National park", "permit": 800, "feeNote": "Gorilla permit $800 per person for foreign non-residents, $700 for foreign residents, $600 low season April, May and November, checked 30 Oct 2026 against UWA tariff summaries, recheck UWA before quoting"}, {"country": "Uganda", "name": "Lake Mburo National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check UWA"}, {"country": "Uganda", "name": "Rwenzori Mountains National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check UWA"}, {"country": "Uganda", "name": "Semuliki National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check UWA"}, {"country": "Uganda", "name": "Mount Elgon National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check UWA"}, {"country": "Uganda", "name": "Lake Bunyonyi", "type": "Tourist attraction", "permit": 0, "feeNote": "No national park fee, local activity prices vary"}, {"country": "Uganda", "name": "Jinja and the Source of the Nile", "type": "Tourist attraction", "permit": 0, "feeNote": "Activity prices vary"}, {"country": "Uganda", "name": "Sipi Falls", "type": "Tourist attraction", "permit": 0, "feeNote": "Local guide fees vary"}, {"country": "Uganda", "name": "Uganda Wildlife Conservation Education Centre, Entebbe Zoo", "type": "Zoo", "permit": 0, "feeNote": "Entry fee varies, check centre"}, {"country": "Uganda", "name": "Kampala City and Kasubi Tombs", "type": "Tourist attraction", "permit": 0, "feeNote": "Site entry fees vary"}, {"country": "Kenya", "name": "Maasai Mara National Reserve", "type": "National park", "permit": 0, "feeNote": "Park fee varies by season, check KWS"}, {"country": "Kenya", "name": "Amboseli National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check KWS"}, {"country": "Kenya", "name": "Tsavo East National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check KWS"}, {"country": "Kenya", "name": "Tsavo West National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check KWS"}, {"country": "Kenya", "name": "Lake Nakuru National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check KWS"}, {"country": "Kenya", "name": "Samburu National Reserve", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check KWS"}, {"country": "Kenya", "name": "Nairobi National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check KWS"}, {"country": "Kenya", "name": "Hell's Gate National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check KWS"}, {"country": "Kenya", "name": "Mount Kenya National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check KWS"}, {"country": "Kenya", "name": "Diani Beach", "type": "Tourist attraction", "permit": 0, "feeNote": "No park fee, hotel and activity prices vary"}, {"country": "Kenya", "name": "Lamu Old Town", "type": "Tourist attraction", "permit": 0, "feeNote": "Site and activity prices vary"}, {"country": "Kenya", "name": "Nairobi Animal Orphanage and Giraffe Centre", "type": "Zoo", "permit": 0, "feeNote": "Entry fee varies, check centre"}, {"country": "Kenya", "name": "David Sheldrick Wildlife Trust, Nairobi", "type": "Zoo", "permit": 0, "feeNote": "Entry fee varies, check trust"}, {"country": "Tanzania", "name": "Serengeti National Park", "type": "National park", "permit": 0, "feeNote": "Reported $70 plus VAT to $82.60 all in, sources conflict, check TANAPA"}, {"country": "Tanzania", "name": "Ngorongoro Crater and Conservation Area", "type": "National park", "permit": 0, "feeNote": "Park and crater fees vary, check NCAA"}, {"country": "Tanzania", "name": "Tarangire National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check TANAPA"}, {"country": "Tanzania", "name": "Lake Manyara National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check TANAPA"}, {"country": "Tanzania", "name": "Kilimanjaro National Park", "type": "National park", "permit": 0, "feeNote": "Climbing and park fees vary, check TANAPA"}, {"country": "Tanzania", "name": "Nyerere National Park, formerly Selous", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check TANAPA"}, {"country": "Tanzania", "name": "Ruaha National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check TANAPA"}, {"country": "Tanzania", "name": "Arusha National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check TANAPA"}, {"country": "Tanzania", "name": "Zanzibar Beaches", "type": "Tourist attraction", "permit": 0, "feeNote": "No park fee, plus Zanzibar insurance requirements, check official guidance"}, {"country": "Tanzania", "name": "Stone Town, Zanzibar", "type": "Tourist attraction", "permit": 0, "feeNote": "Site entry fees vary"}, {"country": "Rwanda", "name": "Volcanoes National Park", "type": "National park", "permit": 1500, "feeNote": "Gorilla permit $1,500 per person, October 2026 research figure, recheck RDB"}, {"country": "Rwanda", "name": "Akagera National Park", "type": "National park", "permit": 0, "feeNote": "Park fee varies, check RDB"}, {"country": "Rwanda", "name": "Nyungwe Forest National Park", "type": "National park", "permit": 0, "feeNote": "Park and activity fees vary, check RDB"}, {"country": "Rwanda", "name": "Lake Kivu", "type": "Tourist attraction", "permit": 0, "feeNote": "Activity prices vary"}, {"country": "Rwanda", "name": "Kigali Genocide Memorial", "type": "Tourist attraction", "permit": 0, "feeNote": "Entry guidance varies, check memorial"}];

function injectCalcStyle(){
  if(document.getElementById('suki-calc-style')) return;
  var st=document.createElement('style');
  st.id='suki-calc-style';
  st.textContent=CALC_CSS;
  document.head.appendChild(st);
}
function buildCalculatorHTML(){
  var options=DESTINATIONS.map(function(d){
    var label=d.country+', '+d.name+' ('+d.type+')'+(d.permit>0?' - gorilla permit $'+d.permit:'');
    return '<option value="'+d.permit+'|'+d.country+'">'+label+'</option>';
  }).join('');
  return ''
+'<div id="guideCalc">'
+'<p class="note" id="progressText">Step 1 of 6: Where would you like to go?</p>'
+'<div class="progress"><div class="progressFill" id="progressFill"></div></div>'
+'<div class="warn">Fees are from the October 2026 gaps research and are flagged where sources conflict. Recheck park, visa and permit fees on official portals (KWS, TANAPA, NCAA, UWA, RDB, immigration) before booking. For parks and attractions without a fixed fee shown, edit the park fee field to the official figure.</div>'
+'<div class="step active" id="step1">'
+'<h3>Step 1: Where would you like to go?</h3>'
+'<label>Choose a famous park, zoo or attraction</label>'
+'<select id="exp">'+options+'</select>'
+'<div class="stepnav"><button type="button" onclick="goStep(2)">Continue</button></div>'
+'</div>'
+'<div class="step" id="step2">'
+'<h3>Step 2: What would you like to experience?</h3>'
+'<p>Choose one. We check it against the destination you picked in Step 1.</p>'
+'<label class="choice"><input type="radio" name="experience" value="Gorilla trekking" onchange="updateExpCheck()"> Gorilla trekking</label>'
+'<label class="choice"><input type="radio" name="experience" value="Wildlife safari" onchange="updateExpCheck()"> Wildlife safari</label>'
+'<label class="choice"><input type="radio" name="experience" value="Chimpanzee tracking" onchange="updateExpCheck()"> Chimpanzee tracking</label>'
+'<label class="choice"><input type="radio" name="experience" value="Mountain climbing" onchange="updateExpCheck()"> Mountain climbing</label>'
+'<label class="choice"><input type="radio" name="experience" value="Beach holiday" onchange="updateExpCheck()"> Beach holiday</label>'
+'<label class="choice"><input type="radio" name="experience" value="Not sure yet" onchange="updateExpCheck()"> Not sure yet</label>'
+'<p id="expWarn" class="warn" style="display:none"></p>'
+'<div id="expMatches"></div>'
+'<div class="stepnav"><button type="button" onclick="goStep(1)">Back</button><button type="button" onclick="goStep(3)">Continue</button></div>'
+'</div>'
+'<div class="step" id="step3">'
+'<h3>Step 3: When are you travelling?</h3>'
+'<p>Prices here do not change by date; your quote will confirm the season price.</p>'
+'<label>Travel month</label>'
+'<select id="travelMonth"><option>Not sure yet</option><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option></select>'
+'<label>Travel date (optional)</label>'
+'<input id="travelDate" type="date">'
+'<div class="stepnav"><button type="button" onclick="goStep(2)">Back</button><button type="button" onclick="goStep(4)">Continue</button></div>'
+'</div>'
+'<div class="step" id="step4">'
+'<h3>Step 4: How many people are travelling?</h3>'
+'<label>Travellers</label><input id="people" type="number" min="1" value="2">'
+'<p id="peopleMsg" class="warn" style="display:none"></p>'
+'<div class="stepnav"><button type="button" onclick="goStep(3)">Back</button><button type="button" onclick="goStep(5)">Continue</button></div>'
+'</div>'
+'<div class="step" id="step5">'
+'<h3>Step 5: What accommodation level do you prefer?</h3>'
+'<p>Choosing a level sets your stay price automatically to the midpoint of that level for your destination\'s country. You can edit the figure afterwards.</p>'
+'<label class="choice"><input type="radio" name="comfort" value="Budget" onchange="applyComfort(this.value)"> Budget <span id="range-Budget"></span></label>'
+'<label class="choice"><input type="radio" name="comfort" value="Mid-range" onchange="applyComfort(this.value)"> Mid-range <span id="range-Mid-range"></span></label>'
+'<label class="choice"><input type="radio" name="comfort" value="Luxury" onchange="applyComfort(this.value)"> Luxury <span id="range-Luxury"></span></label>'
+'<p id="comfortNote">Choose a level to set your stay price automatically.</p>'
+'<p id="comfortMsg" class="warn" style="display:none"></p>'
+'<label>Accommodation per person per night (USD, your estimate)</label><input id="stay" type="number" min="0" value="150">'
+'<div class="card" id="stays"><h2>Stays near this destination</h2><p><strong>SAMPLE, NOT VERIFIED.</strong> These are planning ranges, not lodge quotes and not live availability. Confirm the live rate, board basis and inclusions with the lodge before booking. Click a tier to use its midpoint in the calculator, then edit it if you know better.</p><p id="stayarea"></p><div id="staylist"></div></div>'
+'<div class="stepnav"><button type="button" onclick="goStep(4)">Back</button><button type="button" onclick="goStep(6)">Continue</button></div>'
+'</div>'
+'<div class="step" id="step6">'
+'<h3>Step 6: Calculate your safari budget</h3>'
+'<p id="budgetSummary"></p>'
+'<label>Trip days</label><input id="days" type="number" min="1" value="5">'
+'<label>Park or entry fee per person per day (USD, editable)</label><input id="park" type="number" min="0" value="70">'
+'<p class="note" id="parkFeeNote">Example only: $70 is a starting figure, not a universal East African park fee. Park entry differs by park \u2014 edit this figure for your destination.</p>'
+'<p id="destFeeNote"><strong>Fee note for this destination:</strong> <span id="destFeeNoteText"></span></p>'
+'<label>Guide and vehicle per day for the whole group (USD, your estimate)</label><input id="guide" type="number" min="0" value="200">'
+'<label>Transport total for the group (USD, your estimate)</label><input id="transport" type="number" min="0" value="300">'
+'<p id="splitNote">Gorilla permits: $800 per person, charged once per trekker, not per day. Park or entry fees: $70 per person per day.</p>'
+'<p>Permits are charged once per trekker. Park fees are charged per person per day.</p>'
+'<div class="stepnav"><button type="button" onclick="goStep(5)">Back</button><button type="button" onclick="calc()">Calculate estimate</button></div>'
+'</div>'
+'</div>'
+'<div class="card" id="out" style="display:none"><h2>Estimate</h2><table id="rows"></table>'
+'<p id="paper"></p><p><em>Tips allowance used here: $25 per person per day for guides, within the $20 to $30 range in the research. Lodge staff tips are not included.</em></p></div>'
+'<div class="card" id="quote"><h2>Request this estimate as a quote</h2><p>Send this estimate to Suki Expeditions Africa and we will reply with a personalised quotation. This is an enquiry, not a booking, and no payment is taken here.</p><p><a class="btn" id="waQuote" href="#" onclick="return quoteFirst(event)">Request on WhatsApp</a><a class="btn btn-gold" id="emailQuote" href="#" onclick="return quoteFirst(event)">Request by email</a></p><p id="quoteNote">Calculate an estimate first, then your choices will be added to your message.</p></div>';
}

const STAY_AREAS={"Bwindi Impenetrable National Park":"Buhoma, Ruhija, Rushaga and Nkuringo sectors","Mgahinga Gorilla National Park":"Kisoro and Mgahinga sectors","Kibale National Park":"Fort Portal and Kibale forest edge","Queen Elizabeth National Park":"Mweya, Ishasha and Kasese","Murchison Falls National Park":"Paraa, Pakwach and Masindi","Kidepo Valley National Park":"Kaabong and Karamoja","Lake Mburo National Park":"Mbarara road and Lake Mburo area","Rwenzori Mountains National Park":"Kasese","Semuliki National Park":"Bundibugyo","Mount Elgon National Park":"Mbale and Sipi","Lake Bunyonyi":"Kabale and Lake Bunyonyi shore","Jinja and the Source of the Nile":"Jinja town and Nile shore","Sipi Falls":"Sipi and Kapchorwa","Uganda Wildlife Conservation Education Centre, Entebbe Zoo":"Entebbe","Kampala City and Kasubi Tombs":"Kampala","Maasai Mara National Reserve":"Talek, Sekenani and Mara North conservancies","Amboseli National Park":"Kimana and Amboseli area","Tsavo East National Park":"Voi and Tsavo East gates","Tsavo West National Park":"Voi and Tsavo West gates","Lake Nakuru National Park":"Nakuru town and lake shore","Samburu National Reserve":"Samburu and Ewaso Nyiro area","Nairobi National Park":"Nairobi and Langata","Hell's Gate National Park":"Naivasha","Mount Kenya National Park":"Nanyuki and Mount Kenya area","Diani Beach":"Diani Beach and Ukunda","Lamu Old Town":"Lamu Island","Nairobi Animal Orphanage and Giraffe Centre":"Nairobi, Langata","David Sheldrick Wildlife Trust, Nairobi":"Nairobi, Langata","Serengeti National Park":"Seronera, Grumeti and Northern Serengeti","Ngorongoro Crater and Conservation Area":"Ngorongoro Crater rim and Karatu","Tarangire National Park":"Tarangire area and Manyara region","Lake Manyara National Park":"Mto wa Mbu and Lake Manyara area","Kilimanjaro National Park":"Moshi and Marangu routes","Nyerere National Park, formerly Selous":"Selous and Rufiji area","Ruaha National Park":"Iringa and Ruaha area","Arusha National Park":"Arusha town and Momella area","Zanzibar Beaches":"Nungwi and Paje","Stone Town, Zanzibar":"Stone Town","Volcanoes National Park":"Musanze and Kinigi","Akagera National Park":"Eastern Rwanda and Akagera area","Nyungwe Forest National Park":"Nyungwe forest edge","Lake Kivu":"Gisenyi and Kibuye","Kigali Genocide Memorial":"Kigali"};
const BANDS={"Uganda":[[30,100],[100,350],[350,1200]],"Kenya":[[80,150],[200,400],[500,1000]],"Tanzania":[[100,200],[230,800],[600,1500]],"Rwanda":[[50,120],[150,400],[500,1500]]};
const TIER_INFO=[["Budget","Basic guesthouse, camp or banda. Simple rooms, shared facilities in some cases, meals often separate."],["Mid-range","Comfortable lodge or tented camp. Private rooms, usually full board, game drives often included or added separately."],["Luxury","High end lodge or tented camp. Private suites or tents, full board, guided activities and premium service."]];
function renderStays(){
 const sel=document.getElementById('exp');
 const dest=DESTINATIONS[sel.selectedIndex];
 const country=dest.country;
 const name=dest.name;
 const area=STAY_AREAS[name]||('Near '+name);
 const bands=BANDS[country]||BANDS.Uganda;
 document.getElementById('stayarea').innerHTML='<strong>Stay area:</strong> '+area;
 document.getElementById('staylist').innerHTML=bands.map((b,i)=>{
   const mid=Math.round((b[0]+b[1])/2);
   return '<div class="stay"><strong>'+TIER_INFO[i][0]+'</strong> - SAMPLE $'+b[0]+' to $'+b[1]+' per person per night<br>'+TIER_INFO[i][1]+'<br><button onclick="document.getElementById(\'stay\').value='+mid+';calc();">Use $'+mid+' in calculator</button></div>';
 }).join('');
}

var lastQuote=null;
function quoteText(){
 var q=lastQuote;
 return 'Hello Suki Expeditions Africa, please send me a personalised quotation for this safari estimate from Suki Safari Hub.\n'
 +'Destination: '+q.dest+'\nExperience: '+(q.experience||'Not sure yet')+'\nTravel date: '+(q.travelDate||'date not set')+'\nAccommodation level: '+(q.comfort||'Not set')+'\nTravellers: '+q.people+'\nDays: '+q.days
 +'\nPark or entry fee per person per day: $'+q.park
 +'\nAccommodation per person per night: $'+q.stay
 +'\nGuide and vehicle per day: $'+q.guide
 +'\nTransport total: $'+q.transport
 +'\nPermits: $'+q.permitTotal.toLocaleString()+'\nPark or entry fees: $'+q.parkTotal.toLocaleString()
 +'\nAccommodation: $'+q.stayTotal.toLocaleString()+'\nGuide and vehicle: $'+q.guideTotal.toLocaleString()
 +'\nTransport: $'+q.transport.toLocaleString()+'\nGuide tips allowance: $'+q.tipTotal.toLocaleString()
 +'\nTotal estimate: $'+q.total.toLocaleString()+'\nPer person: $'+q.perPerson.toLocaleString()
 +'\nThis is an enquiry, not a booking.';
}
function updateQuote(){
 var wa=document.getElementById('waQuote'), em=document.getElementById('emailQuote'), note=document.getElementById('quoteNote');
 if(!wa||!em) return;
 if(!lastQuote){ if(note) note.textContent='Calculate an estimate first, then your choices will be added to your message.'; return; }
 var text=quoteText();
 wa.href='https://wa.me/256773036247?text='+encodeURIComponent(text);
 em.href='mailto:info@sukiexpeditionsafrica.com?subject='+encodeURIComponent('Safari quote request, Suki Safari Hub')+'&body='+encodeURIComponent(text);
 if(note) note.textContent='Your estimate is ready to send. Your choices are included in the message.';
}
function quoteFirst(e){
 if(!lastQuote){ e.preventDefault(); var note=document.getElementById('quoteNote'); if(note) note.textContent='Please calculate an estimate first, then send it as a quote.'; return false; }
 return true;
}
function calc(){
 const dest=DESTINATIONS[document.getElementById('exp').selectedIndex];
 const permit=dest.permit; const country=dest.country;
 const people=+document.getElementById('people').value||0;
 const days=+document.getElementById('days').value||0;
 const park=+document.getElementById('park').value||0;
 const stay=+document.getElementById('stay').value||0;
 const guide=+document.getElementById('guide').value||0;
 const transport=+document.getElementById('transport').value||0;
 const permitTotal=permit*people, parkTotal=park*days*people, stayTotal=stay*days*people, guideTotal=guide*days, tipTotal=25*days*people;
 const total=permitTotal+parkTotal+stayTotal+guideTotal+transport+tipTotal;
 lastQuote={dest:document.getElementById('exp').options[document.getElementById('exp').selectedIndex].text,people:people,days:days,park:park,stay:stay,guide:guide,transport:transport,permitTotal:permitTotal,parkTotal:parkTotal,stayTotal:stayTotal,guideTotal:guideTotal,tipTotal:tipTotal,total:total,perPerson:people?Math.round(total/people):0,experience:expChoice(),travelDate:travelDateText(),comfort:comfortChoice()};
 const visa = country==='Tanzania' ? 'Tanzania e-visa, separate from the East African Tourist Visa. The $100 East African Tourist Visa covers Kenya, Uganda and Rwanda only, not Tanzania.' : 'Check the East African Tourist Visa ($100, Kenya, Uganda and Rwanda) or the single country eTA or visa for your entry country, on the official immigration portal.';
 document.getElementById('out').style.display='block';
 document.getElementById('rows').innerHTML =
 `<tr><td>Permits</td><td>$${permitTotal.toLocaleString()}</td></tr><tr><td>Park or entry fees</td><td>$${parkTotal.toLocaleString()}</td></tr><tr><td>Accommodation</td><td>$${stayTotal.toLocaleString()}</td></tr><tr><td>Guide and vehicle</td><td>$${guideTotal.toLocaleString()}</td></tr><tr><td>Transport</td><td>$${transport.toLocaleString()}</td></tr><tr><td>Guide tips allowance</td><td>$${tipTotal.toLocaleString()}</td></tr><tr><td><strong>Total estimate</strong></td><td><strong>$${total.toLocaleString()}</strong></td></tr><tr><td>Per person</td><td>$${people?Math.round(total/people).toLocaleString():0}</td></tr>`;
 document.getElementById('paper').innerHTML = '<strong>Paperwork checklist:</strong> '+visa+' Also check yellow fever and insurance requirements, and whether your route crosses a border, which may mean a vehicle or guide change.';
 updateQuote();
}

const EXPERIENCES={
 'Gorilla trekking':['Bwindi Impenetrable National Park','Mgahinga Gorilla National Park','Volcanoes National Park'],
 'Wildlife safari':['Maasai Mara National Reserve','Serengeti National Park','Queen Elizabeth National Park','Murchison Falls National Park','Akagera National Park','Amboseli National Park','Tsavo East National Park','Tsavo West National Park','Lake Nakuru National Park','Samburu National Reserve','Nairobi National Park','Lake Mburo National Park','Kidepo Valley National Park','Tarangire National Park','Lake Manyara National Park','Nyerere National Park, formerly Selous','Ruaha National Park','Arusha National Park','Ngorongoro Crater and Conservation Area'],
 'Chimpanzee tracking':['Kibale National Park','Nyungwe Forest National Park'],
 'Mountain climbing':['Kilimanjaro National Park','Rwenzori Mountains National Park','Mount Kenya National Park','Mount Elgon National Park'],
 'Beach holiday':['Diani Beach','Zanzibar Beaches','Lake Kivu']
};
const STEP_TITLES={1:'Where would you like to go?',2:'What would you like to experience?',3:'When are you travelling?',4:'How many people are travelling?',5:'What accommodation level do you prefer?',6:'Calculate your safari budget'};
var currentStep=1;
function destName(){var s=document.getElementById('exp');return DESTINATIONS[s.selectedIndex].name;}
function destCountry(){var s=document.getElementById('exp');return DESTINATIONS[s.selectedIndex].country;}
function destFeeNote(){var s=document.getElementById('exp');return DESTINATIONS[s.selectedIndex].feeNote;}
function updateParkFeeNote(){var el=document.getElementById('destFeeNoteText');if(!el) return;el.textContent=destFeeNote();}
function expChoice(){var r=document.querySelector('input[name="experience"]:checked');return r?r.value:'';}
function comfortChoice(){var r=document.querySelector('input[name="comfort"]:checked');return r?r.value:'';}
function travelDateText(){var m=document.getElementById('travelMonth').value;var d=document.getElementById('travelDate').value;if(d) return d+(m&&m!=='Not sure yet'?' ('+m+')':'');if(m&&m!=='Not sure yet') return m;return 'Not sure yet';}
function showStep(n){currentStep=n;for(var i=1;i<=6;i++){var el=document.getElementById('step'+i);if(el) el.classList.toggle('active',i===n);}var pt=document.getElementById('progressText');if(pt) pt.textContent='Step '+n+' of 6: '+STEP_TITLES[n];var pf=document.getElementById('progressFill');if(pf) pf.style.width=Math.round(n/6*100)+'%';if(n===2) updateExpCheck();if(n===5) renderComfortRanges();if(n===6) updateBudgetSummary();}
function goStep(n){if(n>currentStep){if(currentStep===2&&!expChoice()){var w=document.getElementById('expWarn');w.style.display='block';w.textContent='Please choose an experience, or choose Not sure yet.';return;}if(currentStep===4){var p=+document.getElementById('people').value||0;if(p<1){var pm=document.getElementById('peopleMsg');pm.style.display='block';pm.textContent='Please enter at least 1 traveller.';return;}}if(currentStep===5&&!comfortChoice()){var cm=document.getElementById('comfortMsg');cm.style.display='block';cm.textContent='Please choose an accommodation level. It sets your stay price, and you can edit the figure afterwards.';return;}}showStep(n);var h=document.getElementById('calculator');if(h) h.scrollIntoView();}
function updateExpCheck(){var ex=expChoice();var warn=document.getElementById('expWarn');var box=document.getElementById('expMatches');if(!warn) return;if(!ex||ex==='Not sure yet'){warn.style.display='none';box.innerHTML='';return;}var list=EXPERIENCES[ex]||[];var name=destName();if(list.indexOf(name)>=0){warn.style.display='block';warn.className='note';warn.textContent='Good match: '+name+' fits '+ex+'.';box.innerHTML='';return;}warn.style.display='block';warn.className='warn';warn.textContent='Your chosen destination, '+name+', does not match '+ex+'. Pick one of the matching destinations below, or go back to Step 1 and choose another destination.';box.innerHTML=list.map(function(n){return '<button type="button" onclick="pickDest(\''+n.replace(/'/g,"\\'")+'\')">'+n+'</button>';}).join(' ');}
function pickDest(name){var sel=document.getElementById('exp');for(var i=0;i<sel.options.length;i++){if(sel.options[i].text.indexOf(name)>=0){sel.selectedIndex=i;break;}}renderStays();onDestChange();updateExpCheck();}
function onDestChange(){renderComfortRanges();if(comfortChoice()) applyComfort(comfortChoice());updateExpCheck();updateParkFeeNote();}
function renderComfortRanges(){var country=destCountry();var bands=BANDS[country]||BANDS.Uganda;['Budget','Mid-range','Luxury'].forEach(function(level,i){var el=document.getElementById('range-'+level);if(el) el.textContent='$'+bands[i][0]+' to $'+bands[i][1]+' per person per night ('+country+')';});}
function applyComfort(level){var country=destCountry();var bands=BANDS[country]||BANDS.Uganda;var idx=level==='Budget'?0:(level==='Luxury'?2:1);var b=bands[idx];var mid=Math.round((b[0]+b[1])/2);document.getElementById('stay').value=mid;var n=document.getElementById('comfortNote');if(n) n.textContent=level+' for '+country+': $'+b[0]+' to $'+b[1]+' per person per night. Using $'+mid+' per night. You can edit the figure below.';var m=document.getElementById('comfortMsg');if(m) m.style.display='none';}
function updateBudgetSummary(){var el=document.getElementById('budgetSummary');if(!el) return;var permit=DESTINATIONS[document.getElementById('exp').selectedIndex].permit;updateParkFeeNote();el.textContent='Destination: '+destName()+' | Travellers: '+(document.getElementById('people').value||2)+' | Stay: $'+(document.getElementById('stay').value||0)+' per person per night ('+(comfortChoice()||'not set')+')';var sn=document.getElementById('splitNote');if(sn){var park=+document.getElementById('park').value||0;sn.textContent=permit>0?('Gorilla permits: $'+permit.toLocaleString()+' per person, charged once per trekker, not per day. Park or entry fees: $'+park+' per person per day.'):('No gorilla permit for this destination. Park or entry fees: $'+park+' per person per day. Gorilla permits, where they apply, are $800 per person in Uganda and $1,500 in Rwanda, charged once per trekker, not per day.');}}
var DEST_SLUGS={'akagera-national-park':'Akagera National Park','amboseli-national-park':'Amboseli National Park','arusha-national-park':'Arusha National Park','bwindi-impenetrable-national-park':'Bwindi Impenetrable National Park','david-sheldrick-wildlife-trust-nairobi':'David Sheldrick Wildlife Trust, Nairobi','diani-beach':'Diani Beach','hell-s-gate-national-park':'Hell\'s Gate National Park','jinja-and-the-source-of-the-nile':'Jinja and the Source of the Nile','kampala-city-and-kasubi-tombs':'Kampala City and Kasubi Tombs','kibale-national-park':'Kibale National Park','kidepo-valley-national-park':'Kidepo Valley National Park','kigali-genocide-memorial':'Kigali Genocide Memorial','kilimanjaro-national-park':'Kilimanjaro National Park','lake-bunyonyi':'Lake Bunyonyi','lake-kivu':'Lake Kivu','lake-manyara-national-park':'Lake Manyara National Park','lake-mburo-national-park':'Lake Mburo National Park','lake-nakuru-national-park':'Lake Nakuru National Park','lamu-old-town':'Lamu Old Town','maasai-mara-national-reserve':'Maasai Mara National Reserve','mgahinga-gorilla-national-park':'Mgahinga Gorilla National Park','mount-elgon-national-park':'Mount Elgon National Park','mount-kenya-national-park':'Mount Kenya National Park','murchison-falls-national-park':'Murchison Falls National Park','nairobi-animal-orphanage-and-giraffe-centre':'Nairobi Animal Orphanage and Giraffe Centre','nairobi-national-park':'Nairobi National Park','ngorongoro-crater-and-conservation-area':'Ngorongoro Crater and Conservation Area','nyerere-national-park-formerly-selous':'Nyerere National Park, formerly Selous','nyungwe-forest-national-park':'Nyungwe Forest National Park','queen-elizabeth-national-park':'Queen Elizabeth National Park','ruaha-national-park':'Ruaha National Park','rwenzori-mountains-national-park':'Rwenzori Mountains National Park','samburu-national-reserve':'Samburu National Reserve','semuliki-national-park':'Semuliki National Park','serengeti-national-park':'Serengeti National Park','sipi-falls':'Sipi Falls','stone-town-zanzibar':'Stone Town, Zanzibar','tarangire-national-park':'Tarangire National Park','tsavo-east-national-park':'Tsavo East National Park','tsavo-west-national-park':'Tsavo West National Park','uganda-wildlife-conservation-education-centre-entebbe-zoo':'Uganda Wildlife Conservation Education Centre, Entebbe Zoo','volcanoes-national-park':'Volcanoes National Park','zanzibar-beaches':'Zanzibar Beaches'};
function preselectDestination(){try{var q=new URLSearchParams(window.location.search);var slug=q.get('destination');if(!slug||!DEST_SLUGS[slug])return;var name=DEST_SLUGS[slug];var sel=document.getElementById('exp');for(var i=0;i<sel.options.length;i++){if(sel.options[i].text.indexOf(name)>=0){sel.selectedIndex=i;break;}}renderStays();onDestChange();updateBudgetSummary();}catch(e){}}
(function initCalculator(){
  var mount=document.getElementById('calculator');
  if(!mount) return;
  injectCalcStyle();
  mount.innerHTML=buildCalculatorHTML();
  document.getElementById('exp').addEventListener('change',renderStays);
  document.getElementById('exp').addEventListener('change',onDestChange);
  renderStays();
  renderComfortRanges();
  updateParkFeeNote();
  preselectDestination();
  showStep(1);
})();