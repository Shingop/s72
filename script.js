// ── Intro screen ──
document.getElementById('intro-enter-btn').addEventListener('click', () => {
  const enterStage   = document.getElementById('intro-enter-stage');
  const loadingStage = document.getElementById('intro-loading-stage');
  const barFill      = document.getElementById('intro-bar-fill');
  const pctEl        = document.getElementById('intro-pct');
  const subText      = document.getElementById('intro-sub-text');
  const intro        = document.getElementById('intro-screen');

  // Swap stage
  enterStage.style.display = 'none';
  loadingStage.classList.add('visible');

  // Loading subtexts that cycle during progress
  const subtexts = [
    'LOADING FONT RESOURCES...',
    'ESTABLISHING SECURE CONNECTION...',
    'VERIFYING USER CREDENTIALS...',
    'LOADING DATABASE INDEX...',
    'DECRYPTING FILE SYSTEM...',
    'SYNCING SITE TELEMETRY...',
    'FINALIZING INTERFACE...',
  ];

  const totalDuration = 3500; // ms — 3.5 seconds to hit 100%
  const interval = 40;        // update every 40ms
  const steps = totalDuration / interval;
  let current = 0;
  let lastSubIdx = -1;

  const timer = setInterval(() => {
    current++;
    const pct = Math.min(Math.round((current / steps) * 100), 100);

    barFill.style.width = pct + '%';
    pctEl.textContent = pct + '%';

    // Swap subtext at roughly even intervals
    const subIdx = Math.min(Math.floor((pct / 100) * subtexts.length), subtexts.length - 1);
    if (subIdx !== lastSubIdx) {
      subText.textContent = subtexts[subIdx];
      lastSubIdx = subIdx;
    }

    if (pct >= 100) {
      clearInterval(timer);
      // Brief pause at 100% then slide up
      setTimeout(() => {
        intro.classList.add('slide-up');
        intro.addEventListener('transitionend', () => intro.remove(), { once: true });
      }, 400);
    }
  }, interval);
});

// This is V2 of the JS Code
// ── Tab switching ──
const tabs = document.querySelectorAll('.tab');
const pages = document.querySelectorAll('.page');

document.addEventListener("DOMContentLoaded", () => {
  renderFiles();
});

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const currentPage = document.querySelector('.page.active');
    const nextPage = document.getElementById(tab.dataset.tab);
    if (!nextPage || nextPage === currentPage) return;

    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Fade out current page, then swap
    if (currentPage) {
      currentPage.classList.add('page-fading');
      setTimeout(() => {
        currentPage.classList.remove('active', 'page-fading');
        nextPage.classList.add('active', 'page-fadein');
        setTimeout(() => nextPage.classList.remove('page-fadein'), 900);
      }, 600);
    } else {
      nextPage.classList.add('active', 'page-fadein');
      setTimeout(() => nextPage.classList.remove('page-fadein'), 900);
    }
  });
});

// Preload images used inside files
const preloadImages = [
  "https://github.com/Shingop/Cadmus/blob/main/scplogo.png?raw=true",
  "https://raw.githubusercontent.com/Shingop/imagehosting/refs/heads/main/cadmuslogo2.png",
  "https://raw.githubusercontent.com/Shingop/imagehosting/refs/heads/main/cadmuslogo3.png"
];
preloadImages.forEach(src => { const img = new Image(); img.src = src; });

// ── File system ──
// Examples are as follows:
// Standard File - { name: 'Example File', type: 'file', content: `a` },
// Standard Folder - { name: 'Example Folder', type: 'folder', children: [Inside here goes the standard Files]}
// Empty Folders will turn red and be unable to be accessed nor clicked.
// Locked files/folders show an "INSUFFICIENT CLEARANCE" popup when clicked.
// Locked File   - { name: 'Secret File', type: 'locked' }
// Locked Folder - { name: 'Secret Folder', type: 'locked-folder' }

let fileTree = [
  { name: 'Personnel-Guide.pdf', type: 'file', content: `
  <iframe src="https://docs.google.com/document/d/17Sf0QYSeKJreursY1TzC63NRlA7AOHaRNgLH4vyEPAg/preview?tab=t.0"
    style="width:100%; height:500px; border:none;">
  </iframe>
  ` },
  
  { name: 'Facility-Dossier.pdf', type: 'file', content: `
  <iframe src="https://docs.google.com/document/d/1ej32s03zOLnpBBGN0Jmj2cRmqci9HOAGZnLvuT_5_2w/preview?tab=t.0"
    style="width:100%; height:500px; border:none;">
  </iframe>
  ` },
  
  { name: 'SCPs', type: 'folder', children: [
    { name: 'SCP 035', type: 'file', content: `
    <div class="doc-header">
      <img alt="" src="https://github.com/Shingop/Cadmus/blob/main/scplogo.png?raw=true" />
      <div>
        <div class="doc-header-tagline">SECURE. CONTAIN. PROTECT.</div>
        <div class="doc-header-title">SCP FOUNDATION</div>
      </div>
    </div>
    <hr class="doc-divider-conf" />
    <div class="doc-confidential">CONFIDENTIAL - LEVEL 4 CLEARANCE REQUIRED</div>
    <div class="scp-viewer-content">
                        

<div style="text-align: right;"></div>
<div class="scp-image-block block-right grid flex-center flex-column" style="width: 300px;"><img src="//scp-wiki.wdfiles.com/local--files/scp-035/scp--035--002-new.gif" alt="scp--035--002-new.gif" class="image" style="margin: 0;" onerror="this.onerror=null;this.src='glitch.gif';">
<div class="scp-image-caption">
<p>Depiction of SCP-035 without its ever-present secretions</p>
</div>
</div>
<p><strong>Item #:</strong> SCP-035</p>
<p><strong>Object Class:</strong> Keter</p>
<p><strong>Special Containment Procedures:</strong> SCP-035 is to be kept within a hermetically sealed glass case, no fewer than 10 centimeters (4 inches) thick. This case is to be contained within a steel, iron and lead-shielded room at all times. Doors are to be triple-locked at all times, with the exception of allowing personnel in or out. No fewer than two (2) armed guards are to be posted at any time. Guards must remain outside at all times and are not allowed within the containment room under any circumstances. A trained psychologist is to remain on site at all times. Research personnel are not to touch SCP-035 at any time. SCP-035 must be moved to a new sealed case every two (2) weeks. The previous case must be disposed of via <a href="https://scp-wiki.wikidot.com/scp-101" data-scp-link="true">SCP-101</a>, as it shows no adverse reactions to SCP-035's “corruption”. Anyone who comes into contact with SCP-035 when it is in possession of a host is to be given an immediate psychological evaluation.</p>
<p><strong>Description:</strong> SCP-035 appears to be a white porcelain comedy mask, although, at times, it will change to tragedy. In these events, all existing visual records, such as photographs, video footage, even illustrations, of SCP-035 automatically change to reflect its new appearance.</p>
<p>A highly corrosive and degenerative viscous liquid constantly seeps from the eye and mouth holes of SCP-035. Anything coming into contact with this substance slowly decays over a period of time, depending on the material, until it has decayed completely into a pool of the original contaminant. Glass seems to react the slowest to the effects of the item, hence the construction choice of its immediate container. Living organisms that come into contact with the substance react much the same way, with no chance of recovery. Origin of the liquid is unknown. Liquid is only visible from the front, and does not emerge or is even visible from the other side.</p>
<p>Subjects within 1.5 to 2 meters (5-6 feet) of SCP-035, or in visual contact with it, experience a strong urge to put it on. When SCP-035 is placed on the face of an individual, an alternate brain wave pattern from SCP-035 overlaps that of the original host, effectively snuffing it out and causing brain death to the subject. Subject then claims to be the consciousness contained within SCP-035. The bodies of "possessed" subjects decay at a highly accelerated rate, eventually becoming little more than mummified corpses. Nevertheless, SCP-035 has demonstrated the ability to remain in cognitive control of a body experiencing severe structural damage, even if the subject's body literally decays to the point where motion is not mechanically possible. No effect is found to be had when placed on the face of an animal.</p>
<p>Conversations with SCP-035 have proven to be informative. Researchers have learned various details about other SCP objects and history in general, as SCP-035 claims to have been at many momentous events. SCP-035 displays a highly intelligent and charismatic personality, being both amiable and flattering to all those who speak with it. SCP-035 has scored in the 99th percentile on all intelligence and aptitude tests administered to it, and appears to have a photographic memory.</p>
<p>However, psychological analysis has discovered SCP-035 to possess a highly manipulative nature, capable of forcing sudden and profound changes to interviewer's psychological state. SCP-035 has proven to be highly sadistic, prompting some to commit suicide and transforming others into near-mindless servants with linguistic persuasion alone. SCP-035 has stated that it has intimate knowledge of the workings of the human mind and implied that it could change anyone's views if given enough time.</p>
<p><strong>Additional:</strong> SCP-035 was found in a sealed crypt in an abandoned house in Venice, in 18██.</p>
<p><strong>Addendum 035-01:</strong> SCP-035 has been found to be able to possess anything that has a humanoid shape, including mannequins, corpses, and statues. SCP-035 has been able to motivate all into movement, removing the need to expose live subjects to SCP-035. Still, anything it possesses inevitably decays into motionlessness.</p>
<p><strong>Addendum 035-02:</strong> SCP-035 has facilitated an escape attempt, convincing several of the research staff to aid it in its bid for freedom. Insurrection failed. All staff that have been in contact with SCP-035 have been terminated, and mandatory psychiatric evaluations have been implemented for all personnel coming in contact with SCP-035.</p>
<p><strong>Addendum 035-03:</strong> It has been determined that SCP-035 is capable of telepathy, whether or not it possesses a host, even penetrating to the subconscious of others, and using the knowledge it finds to its advantage. Extreme caution is advised when choosing subjects to converse with SCP-035.</p>
<p><strong>Addendum 035-04:</strong> SCP-035 has expressed an interest in other SCPs, most notably <a href="https://scp-wiki.wikidot.com/scp-4715" data-scp-link="true">SCP-4715</a> and <a href="https://scp-wiki.wikidot.com/scp-682" data-scp-link="true">SCP-682</a>. Dr. ██████ has expressed worry that should SCP-035 bond with either, their regenerative qualities would negate its corruption and give it a permanent host.</p>
<p><strong>Addendum 035-05:</strong> After several more escape attempts, and after reviewing SCP-035's incident record, high command has ordered that it be permanently sealed within the facility and prohibited from being allowed any more hosts. Several personnel have protested against this, with some even erupting into violence. As a direct result, all personnel that have come into contact with SCP-035 have been terminated. Going forward, all personnel that deal with SCP-035 are to be rotated frequently, and contact is to be limited even to its dormant state to as little as possible.</p>
<p><strong>Addendum 035-06:</strong> Personnel within 10 meters of SCP-035 have recently reported feeling unease, stating that they can hear unintelligible whispering. Several others have suffered from severe migraines. Object has been monitored, but there is no change in its dormant behavior, and no sounds have been recorded.</p>
<p>The motion to reinstate SCP-035's host privileges has been brought up once more, if only on a temporary basis to discover these new changes in the object's behavior. <em>(Denied)</em></p>
<p><strong>Addendum 035-07:</strong> The walls of SCP-035's containment cell have suddenly begun secreting a black substance. Tests on the substance have revealed it to be human blood, although highly contaminated with several foreign and unknown agents. Substance is corrosive, having a pH of 4.5, and prolonged exposure to the walls has proven to be detrimental to their structural integrity.</p>
<p>More notably, it seems to be forming patterns on the walls. Several segments seem to be paragraphs in various languages, including Italian, Latin, Greek, and Sanskrit. Translation is pending. Other segments appear to be diagrams depicting ritualistic sacrifice and mutilation, often for the arcane benefit of the person committing them. Several staff members have been shocked to note that all of the sacrifices bear an uncanny resemblance to various personnel and their loved ones, often in conflicting positions.</p>
<p>Researchers while in the room examining these newly formed patterns have complained of hearing loud whispering, and high pitched, unnerving laughter at irregular intervals.</p>
<p>Personnel in the section working daily near and around SCP-035's containment unit have suffered catastrophic morale damage, with an all time high in suicide rates in staff in that area, whether or not they have ever had contact with SCP-035.</p>
<p>The only change in SCP-035's dormant behavior is regarding its contained glass case. Degradation of the case has increased to a high degree, enough so that the glass will occasionally shatter, causing a wide dispersal of SCP-035's contaminant. This occurs quite often at the most inopportune times, so far resulting in six (6) casualties and three (3) fatalities of both research and cleanup staff.</p>
<p><strong>Addendum 035-08:</strong> In light of the mass suicide/homicide of the members of the research team tasked with translating the passages garnered from SCP-035's containment cell, the morale damage in the area, and general loss of staff dealing with SCP-035 to either death or insanity, it has been decided to coat the inner and outer walls of its containment cell with <a href="https://scp-wiki.wikidot.com/scp-148" data-scp-link="true">SCP-148</a>, which has proved well in the containment of <a href="https://scp-wiki.wikidot.com/scp-132-arc" data-scp-link="true">SCP-132</a> (see Document 132-01), in order to hopefully block out the high levels of negativity being emitted by SCP-035.</p>
<p><strong>Addendum 035-09:</strong> The use of SCP-148 has worked well, causing morale and suicide rates to return to near pre-SCP-035 rates.</p>
<p>However, the material appears to facilitate the negativity within the cell, causing a veritable "Greenhouse Effect" inside. Personnel inside the cell have stated that they feel a heavy sense of dread, fear, anger, and general depression, as well as hearing constant, nearly inaudible whispering upon immediate entry. A prolonged stay causes severe migraines, suicidal tendencies, heavy hemorrhaging of blood vessels around the eyes and inside the mouth and nose, general hostility to others, and for the whispering to increase to almost deafening volumes, intersected by a constant mocking laughter. Exposure of more than three (3) hours inevitably results in the subject falling into a deep psychosis, and attempting to harm either themselves or others. Most spoke in Latin or Greek, despite the fact that several did not previously know how to speak said languages beforehand.</p>
<p>The presence of blood in both word and diagram formations has increased disproportionately, the walls becoming cluttered, and the formations beginning to overlap each other. The substance has proven to be both difficult to clean, and even more corrosive than was originally recorded, with a pH of roughly 2.4. General estimation gives the current walls a life of two (2) months before they will need replacement.</p>
<p>It is becoming gradually more and more difficult to contain SCP-035, and the debate to reinstate its host privileges has once again come up. <em>(Denied)</em></p>
<p><strong>Addendum 035-10:</strong> The walls, ceiling and floor of SCP-035's containment cell have now been completely saturated in blood. All personnel entering and guarding the area must wear full Hazmat protection suits. Constant cleaning efforts are being instated.</p>
<p><strong>Addendum 035-11:</strong> The magnitude, intensity, and recurrence of the phenomena that occur within SCP-035's containment cell have increased to an alarming degree. The cell door has been known to become locked of its own accord while personnel are inside, and unable to be opened for a period of time. Appendages form out of the larger puddles of blood and often attempt to grab or harm personnel near them. Blurry apparitions have started appearing to staff. Electronic devices no longer work inside the cell, and the light cannot be turned on, though there is no physical reason why it does not work, forcing those entering to use non-electric based light sources.</p>
<p>Cleaning measures are having no discernible effect on the cell, and the walls are degrading at a very high rate, forcing them to be replaced within a week at best, although the blood makes it nearly impossible to properly achieve this.</p>
<p>SCP-035 may have to be moved to a new cell entirely, with the old one sealed off and disengaged from the rest of the facility.</p>



                    </div>
    ` },
    { name: 'SCP 90320 (Custom)', type: 'file', content: `
  <iframe src="https://docs.google.com/document/d/1IFGzF7cQPj2i3NrdT0OTVzMfp5_UM3GbsP5tKgP9WCo/preview?tab=t.0"
    style="width:100%; height:500px; border:none;">
  </iframe>
  ` },
    
    { name: 'SCP 10667 (Custom)', type: 'file', content: `
    <div class="doc-header">
      <img alt="" src="https://github.com/Shingop/Cadmus/blob/main/scplogo.png?raw=true" />
      <div>
        <div class="doc-header-tagline">SECURE. CONTAIN. PROTECT.</div>
        <div class="doc-header-title">SCP FOUNDATION</div>
      </div>
    </div>
    <hr class="doc-divider-conf" />
    <div class="doc-confidential">CONFIDENTIAL - LEVEL 4 CLEARANCE REQUIRED</div>
    ` },
    
    { name: 'SCP 105', type: 'file', content: `
     <div class="doc-header">
      <img alt="" src="https://github.com/Shingop/Cadmus/blob/main/scplogo.png?raw=true" />
      <div>
        <div class="doc-header-tagline">SECURE. CONTAIN. PROTECT.</div>
        <div class="doc-header-title">SCP FOUNDATION</div>
      </div>
    </div>
    <hr class="doc-divider-conf" />
    <div class="doc-confidential">CONFIDENTIAL - LEVEL 4 CLEARANCE REQUIRED</div>
    <div class="scp-viewer-content">
                        

<div style="text-align: right;"></div>
<div class="scp-image-block block-right grid flex-center flex-column" style="width: 250px;"><img src="//scp-wiki.wdfiles.com/local--files/scp-105/2014-07-18%2022.41.47-new.jpg" alt="2014-07-18%2022.41.47-new.jpg" class="image" style="margin: 0;" onerror="this.onerror=null;this.src='glitch.gif';">
<div class="scp-image-caption">
<p>SCP-105-B</p>
</div>
</div>
<p><strong>Item #:</strong> SCP-105</p>
<p><strong>Object Class:</strong> Safe</p>
<p><strong>Special Containment Procedures:</strong> SCP-105 is implanted with a tracking device and is currently housed at Site-17. SCP-105 is currently allowed Class 3 (restricted) socialization privileges with approved site personnel, granted based on continued good behavior and cooperation with Foundation personnel.</p>
<p>SCP-105's personal camera (designated SCP-105-B) is contained in a locked safe-deposit box at Site-19's High Value Item Storage Facility. Standard positive-action defenses (explosive, chemical, biological, and memetic) are to be in place at all times while SCP-105-B is within containment.</p>
<p>SCP-105 and SCP-105-B or any other camera are only to be allowed to come into contact with approval of the current managing researcher.</p>
<p><strong>Description:</strong> SCP-105 (formerly known as Iris Thompson) is a female human of European descent. Records indicate that SCP-105 was born in ████, making her ██ years old at the time of acquisition. She has blonde hair and blue eyes, and at the time of this article, is 1.54 meters in height and 50kg in weight. She does not appear to have any out-of-the-ordinary physical characteristics and appears to be, for all intents and purposes, a normal human being in good health.</p>
<p>SCP-105-B is a Polaroid One Step Express camera, manufactured in 1982. SCP-105-B does not appear to have any out-of-the-ordinary physical characteristics and appears to be, for all intents and purposes, a normal Polaroid camera, operating normally for all persons aside from SCP-105.</p>
<p>When SCP-105 holds a photograph taken by SCP-105-B, the photograph changes from a still image to that of a real-time image of the location in question. SCP-105 is also able to reach through the photograph and manipulate objects within reach of the original point at which the photograph was taken. Persons witnessing this manipulation report seeing a disembodied female hand (determined to be that of SCP-105) reaching out from an invisible portal and carrying out the actions indicated. SCP-105-B and the photographs taken by said camera have no unusual properties when used by any other person.</p>
<p>SCP-105 has demonstrated limited ability to manipulate objects through other photographs, but can only achieve fine control using photographs taken through SCP-105-B. So far, SCP-105 has only been able to significantly advance her ability by using photographs taken by SCP-105-B.</p>
<p><strong>Appendix 1: Circumstances of Acquisition:</strong> SCP-105 was brought to the Foundation's attention shortly after the murder of her boyfriend. SCP-105 claimed to have been on the phone with the victim at the time of his murder, prompting her to hurry to his side; however, telephone records did not correspond to her story, making her suspect in the murder. SCP-105 informed her lawyer that she had, in fact, witnessed the murder through a photograph she had taken with her boyfriend several days prior. The attorney in question disregarded the story and recommended that the subject plead guilty. Subject refused to do so and subsequently told her story in court, offering to demonstrate her ability. This lead to Foundation contact.</p>
<p>Subject was immediately contained by the Foundation. Foundation Personnel retrieved SCP-105-B from SCP-105's home (replacing it with an identical model), and returned it to her. SCP-105's parents were informed that she was killed during the botched escape of another patient while both were in custody of the █████████ ██████ psychiatric care facility.</p>
<p><strong>Appendix 2: Excerpt from Interview Log 105-08-4426, dated ██/██/████</strong></p>
<blockquote class="cornerBorder" style="">
<p><strong>&lt;Begin Log&gt;</strong></p>
<p><em>Dr. █████:</em> Please give a brief personal introduction, including date and place of birth, and your name.</p>
<p><em>SCP-105:</em> Okay… My name is Iris Thompson, I was born in Phoenix, Arizona, on May 12th, ████.</p>
<p><em>Dr. █████:</em> Good. First question, when did you become aware of your abilities?</p>
<p><em>SCP-105:</em> I'm not sure, but I think I was either ten or eleven. I remember because I was looking at a picture of the ocean, and I noticed that the waves began moving.</p>
<p><em>Dr. █████:</em> How did your parents respond when you told them?</p>
<p><em>SCP-105:</em> They just said that I had an overactive imagination.</p>
<p><em>Dr. █████:</em> When did you discover that you were able to manipulate objects through a photograph?</p>
<p><em>SCP-105:</em> It first happened when I was… eleven, twelve, maybe? My family took a trip to the Grand Canyon. I looked through the photo album after we got home, and brushed my hand up against one by accident. When I did, I pushed a rock over the edge, falling into the canyon; I could actually hear it clatter on the way down.</p>
<p><em>Dr. █████:</em> Go on.</p>
<p><em>SCP-105:</em> I became fascinated with photography after that. Most of the time, it didn't work with photographs I took, but my parents got me a Polaroid One Step Express camera — I'd been begging for them to get it since Christmas. <em>&lt;SCP-105 starts smiling.&gt;</em> After I got the camera, the photos got… easier to interact with.</p>
<p><em>Dr. █████:</em> This is the camera we refer to as 105-B? Your personal camera.</p>
<p><em>SCP-105:</em> Yes sir.</p>
<p><em>Dr. █████:</em> How many photos can you focus on at one time?</p>
<p><em>SCP-105:</em> I've gotten up to ten at once with my personal camera, but I'm sure I could do more eventually.</p>
<p><em>Dr. █████:</em> What is your impression of your time with the Foundation so far?</p>
<p><em>&lt;SCP-105 remains silent.&gt;</em></p>
<p><em>Dr. █████:</em> Please, do answer. We don't take offense at these things.</p>
<p><em>SCP-105:</em> It's sort of like… New prison, new warden. But I know it's better than what could've happened to me.</p>
<p><em>Dr. █████:</em> You've been very cooperative during your time here.</p>
<p><em>SCP-105:</em> I'm a pretty well-behaved sort of person. I also like doing the experiments. Some of those things with photographs I would never have thought of.</p>
<p><em>Dr. █████:</em> Do you know why I am asking you these questions, Iris?</p>
<p><em>SCP-105:</em> No, sir.</p>
<p><em>Dr. █████:</em> We've been setting up a special program. If it goes through, you'll be occasionally allowed to leave the site and move about in the outside world. All we ask of you in return are a few favors. Are you interested?</p>
<p><strong>&lt;End Log&gt;</strong></p>
</blockquote>
<p><strong>Addendum 3: History of Service with Mobile Task Force Omega-7:</strong></p>
<p><em>SCP-105 was the second humanoid SCP recruited to Mobile Task Force Omega-7 under the Pandora's Box initiative. Unlike "Team Able" (associated with <a href="https://scp-wiki.wikidot.com/scp-076" data-scp-link="true">SCP-076</a>-2), which was assigned to strike and capture operations, "Team Iris" had the primary mission of reconnaissance and intelligence gathering. "Team Iris" carried out over twenty missions in cooperation with the Bowe Commission. These missions were carried out swiftly and without incident.</em></p>
<p><em>The first disciplinary incident involving SCP-105 involved the escalation of Team Iris missions from reconnaissance to wetwork. SCP-105 violently opposed the use of her abilities to carry out assassinations, even after members of the Bowe Commission repeatedly attempted to secure her cooperation (see Interview Log 105-21-6543).</em></p>
<p><em>During these events, SCP-105 became emotionally distressed and attempted to deceive Foundation personnel into believing that her anomalous traits had disappeared. Dr. D███████ submitted a report recommending that SCP-105 be re-classified as Neutralized, undergo amnestic treatment, and be released to the public with regular monitoring. This recommendation was denied.</em></p>
<p><em>Following this, Dr. D███████ aided SCP-105 in a containment breach aiming to escape Foundation custody. This breach was unsuccessful and SCP-105 was re-contained (see Incident X45-Site-17).</em></p>
<p><em>Investigation afterwards determined that Dr. D███████ had intentionally encouraged SCP-105 to claim loss of anomalous abilities. SCP-105 re-demonstrated her anomalous abilities in exchange for restoration of limited privileges.</em></p>
<p><em>Following the end of the Pandora's Box Initiative, all Mobile Task Force Omega-7 teams were disbanded, and SCP-105 was returned to Site-17. Because of the security risk she represents and lack of current utility, SCP-105 is presently not allowed access to SCP-105-B.</em></p>
<p><em>All further information regarding Mobile Task Force Omega-7 is sealed by order of the Records And Information Security Administration.</em></p>
<p><em>Director ██████ ███, Records And Information Security Administration</em></p>
<p><strong>Addendum 4: SPECIAL NOTICE RE: Current Containment Status</strong></p>
<p><em>Following <a href="https://scp-wiki.wikidot.com/immediate-actions" data-scp-link="true">Incident R1300-Site-17</a>, many formal and informal reports have been made regarding SCP-105 and a supposed connection to <a href="https://scp-wiki.wikidot.com/resurrection" data-scp-link="true">Mobile Task Force Alpha-9</a>.</em></p>
<p><em>These reports constitute a serious breach of security. All information regarding Mobile Task Force Alpha-9 is restricted. All information regarding current research on anomalous characteristics of SCP-105 is restricted. All reports or rumors regarding any current or recent use of SCP-105 as a Foundation asset are to be considered categorically false, and should be reported to the Records And Information Security Administration.</em></p>
<p><em>Director █████ █████, Records And Information Security Administration</em></p>
                    </div>
    ` },
    
    { name: 'SCP 054', type: 'file', content: `
    <div class="doc-header">
      <img alt="" src="https://github.com/Shingop/Cadmus/blob/main/scplogo.png?raw=true" />
      <div>
        <div class="doc-header-tagline">SECURE. CONTAIN. PROTECT.</div>
        <div class="doc-header-title">SCP FOUNDATION</div>
      </div>
    </div>
    <hr class="doc-divider-conf" />
    <div class="doc-confidential">CONFIDENTIAL - LEVEL 4 CLEARANCE REQUIRED</div>
    <div class="scp-viewer-content">
                        

<div style="text-align: right;"></div>
<p><strong>Item #:</strong> SCP-054</p>
<p><strong>Object Class:</strong> Safe</p>
<p><strong>Special Containment Procedures:</strong> Subject is held in a watertight isolation room outfitted with specialized climate control equipment. An ornate fountain filled with water stands in the center of the enclosure. Maintenance personnel are required to wear NBC suits while inside the containment area and must spend ten minutes in a special drying room after exiting. In the event of a breach, the surrounding area should be evacuated and the enclosure flushed with liquid nitrogen.</p>
<p>The fountain's chemical levels and volume are to be monitored and maintained. Spring water from ████████ should be used as SCP-054 is highly sensitive to hydrological conditions. SCP-054 has developed a mistrust for human males during its confinement; thus, assignment of female personnel is recommended.</p>
<p><strong>Description:</strong> Out of the water, the subject most often appears as a female humanoid with a mean volume of 90&nbsp;L comprised entirely of water (other forms are possible, commonly geometric shapes). When it enters a body of water, it becomes indistinguishable from its surroundings. The subject must periodically return to a body of water in order to maintain its volume due to evaporation. Initially found in ████████, it was moved to Site-08 for further study. Subject was initially curious about Foundation personnel and seemed to enjoy interacting with maintenance staff and researchers, and mimicking their forms. After a number of weeks, the creature apparently felt comfortable enough to remain out of the water during routine monitoring, though it retreated when attempts were made to study its composition.</p>
<p>SCP-054 is apparently composed of normal water, with no detectable differences compared to ordinary spring water from the same source. No thermal, electromagnetic, biological, or other phenomenon has ever been detected in its "body" that would suggest how it animates. Water lost by SCP-054 to evaporation exhibits no special properties when condensed.</p>
<p>Experiments with SCP-054 were halted following [DATA EXPUNGED] two researchers injured. After this incident containment protocols were updated. Subject thereafter exhibited signs of mistrust and aggression around male personnel (which made up the majority of the original research staff). Subject reclassified Euclid.</p>
<p><strong>Partial transcripts, Audio Journal 054-A:</strong></p>
<blockquote class="cornerBorder" style="">
<p><strong>Water loss experiment</strong><br>
"Subject becomes withdrawn and inactive when denied access to water. Its compact shape is theorized to reduce surface area exposed to evaporation. For the first few days it moved eagerly to greet anyone entering its enclosure, and behaved excitably. Possibly indicates an understanding by the subject that we control its access to water supplies. Subject ceased this behavior yesterday, presumably in recognition that no help was forthcoming."</p>
</blockquote>
<blockquote class="cornerBorder" style="">
<p><strong>Temperature extremes testing</strong><br>
"We got authorization to attempt sub-zero testing this morning. The subject became lethargic as the temperature fell, and froze completely after ██████. Spectroscopy of the ice crystal revealed no abnormalities. Ice chips were collected for study. This is in stark contrast to its behavior in the 95 degree tests, when it became aggressive and attempted to escape its enclosure. We've submitted a work order to combine the climate control equipment with the subject's standard enclosure, as it has begun to resist efforts to transport it to experimental chambers with increasingly desperate behavior."</p>
</blockquote>
<blockquote class="cornerBorder" style="">
<p><strong>Memory and conditioning evaluation</strong><br>
"Subject has proven unexpectedly adept at navigating complex mazes and solving puzzles. Dr. Seskel has finally overcome the problem of 'motivating' the subject by the application of electrical shocks and/or silica desiccants. He joked that we should have it trained to fetch in no time, and after observing his methods I think he might be right. Note: subject to be allowed a 48 hour recuperation period; it seemed to be lagging in its progress at the end of the week's experiments."</p>
</blockquote>
<blockquote class="cornerBorder" style="">
<p><strong>Acid/base incorporation experiment [last log entry]</strong><br>
"I am starting with a 0.5 M HCl solution. I have no idea what will happen, but if this thing incorporates homeostatic mechanisms like I suspect then we should get some insight into how it maintains its form. Temperature in the enclosure has been lowered to 278&nbsp;K to help control fifty-four's increasingly erratic behavior."</p>
</blockquote>
<p><strong>Addendum 054-B:</strong> After five years with no incidents, subject rating has been downgraded to "Safe" on recommendation of Dr. ████████. Experiments will resume under the auspices of biology unit E7. Caution should still be exercised when interacting with subject.</p>
                    </div>
    ` },
    
    { name: 'SCP 040', type: 'file', content: `
    <div class="doc-header">
      <img alt="" src="https://github.com/Shingop/Cadmus/blob/main/scplogo.png?raw=true" />
      <div>
        <div class="doc-header-tagline">SECURE. CONTAIN. PROTECT.</div>
        <div class="doc-header-title">SCP FOUNDATION</div>
      </div>
    </div>
    <hr class="doc-divider-conf" />
    <div class="doc-confidential">CONFIDENTIAL - LEVEL 4 CLEARANCE REQUIRED</div>
    <div class="scp-viewer-content">
                        

<div style="text-align: right;"></div>
<p><strong>Item #:</strong> SCP-040</p>
<p><strong>Object Class:</strong> Anomalous Human</p>
<p><strong>Containment Class:</strong> Active</p>
<p><strong>Hazard Rating:</strong> Yellow</p>
<p><strong>Standard Containment Policies:</strong></p>
<ul>
<li>Two-person residential module (no amenity restrictions)</li>
<li>Access to site library, recreational facilities, cafeteria, and public areas (supervised)</li>
<li>Dietary restriction (mild peanut allergy)</li>
<li>Youth educational curriculum enrollment (Drs. Abernathy, Logan, and Izawa)</li>
<li>Bi-weekly psychological review (Dr. Abernathy)</li>
<li>Schedule B experimentation plan</li>
</ul>
<p><strong>Special Containment Procedures:</strong> SCP-040-1a, 1c, and 1j have been approved to remain in the containment chamber with SCP-040 for purposes of the subject’s mental well-being. (Security Chief Special Order 392-5: ██/██/██). All other entities modified by SCP-040 during testing are to be disposed of after study according to standard biological specimen clearance protocols, as outlined in Document CDP-BIO-EN-1.</p>
<div style="margin: 10px; width: 400px; float: right;&quot;">
<table class="wiki-content-table" style="">
<tbody><tr>
<td><strong>DOB:</strong></td>
<td>c. 2000 (subject claimed to be 8 years old at DOC)</td>
</tr>
<tr>
<td><strong>POB:</strong></td>
<td>Unknown</td>
</tr>
<tr>
<td><strong>DOC:</strong></td>
<td>██/██/2008</td>
</tr>
<tr>
<td><strong>Height:</strong></td>
<td>111&nbsp;cm</td>
</tr>
<tr>
<td><strong>Weight:</strong></td>
<td>20.7&nbsp;kg</td>
</tr>
<tr>
<td><strong>Hair:</strong></td>
<td>Bright pink</td>
</tr>
<tr>
<td><strong>Eyes:</strong></td>
<td>Green (r) / yellow (l) heterochromia; black sclera (l)</td>
</tr>
<tr>
<td><strong>Other Notes:</strong></td>
<td>Blind in left eye. Skin sensitive to burns and easily bruised. Hair is brittle and falls out easily.</td>
</tr>
</tbody></table>
</div>
<p><strong>Description:</strong> SCP-040 is a human child capable of at-will manipulation of the physical characteristics of living organisms. Modified organisms are collectively referred to as SCP-040-1.</p>
<p>Modifications are primarily cosmetic, ranging from simple color and pattern changes to more involved shifts in bodily form and structure. The creation of new specialized organs is possible, but appears to be the limit of SCP-040’s ability and currently has a 66% failure rate in testing. Modifications are limited to what would be physically possible (regardless of the probability of such a feature naturally arising) – for example, while SCP-040 can grant an organism wings that does not naturally possess them, they will not permit the creature to fly without meeting other physical requirements. SCP-040-1 undergo behavior shifts as part of the modification process, acting with extreme loyalty to SCP-040 regardless of prior association.</p>
<p>SCP-040’s anomalous property requires significant focus and time to enact and causes intense headaches and nausea when performed for more than a few minutes at a time. The effect becomes increasingly unreliable and inaccurate the smaller the modifications or more complex the changes are. SCP-040 is incapable of altering microscopic organisms, and has great difficulty in altering plant life. Dead organic matter may also be used, but must be used in conjunction with a living organism. Instances of SCP-040-1 cannot be modified more than once, though it is currently unknown if this is a hard limit of SCP-040’s properties, or from a lack of mastery over them.</p>
<p>SCP-040’s emotional state is within acceptable boundaries for an individual of its age group, accounting for the effects of prolonged containment and parental seperation. Subject’s intelligence is slightly above-average for its age group. Behavior is generally cooperative. SCP-040 acclimatized quickly to containment, and responded well to the initial orientation and socialization programs. SCP-040 responds to the name "Forty", and does not appear to have any other given or chosen personal name.</p>
<p><strong>Recovery Summary:</strong> Subject was taken into custody on ██/██/2008 as part of the raid on the Keys to the Kingdom Christian Charter School for Gifted Youth in [REDACTED], Colorado. The raid’s primary objective, being the capture or execution of █████ ██████, a former CIA operative who had previously worked alongside Foundation intermediaries as part of Project Blackbook, Project Smilodon and Operation STARGATE from 1967 – 1971, was successful. ██████ was terminated on site and disposed of without incident.</p>
<p>Of the 15 children recovered from the facility, SCP-040 was the only one to demonstrate anomalous properties: the others were administered amnestics and placed in Foundation-observed foster care. Interviews with staff at the school revealed that they were unaware of ██████’s prior history or any connection with Foundation operations. They were administered amnestics and put under a sixth-month communications monitor – no relapses were recorded.</p>
<p>See Operation TATZELWURM after-action report for complete event record.</p>
<p><strong>Addendum-01:</strong> SCP-040 is currently allowed custody of the following SCP-040-1 instances.</p>
<p>• <strong>SCP-040-1a</strong> – Symbiotic organism capable of changing size, shape, color, and texture in reaction to its environment. Subject serves as outer clothing, similar to a jacket or sweater, and absorbs nutrients from SCP-040’s bloodstream. Subject was recovered alongside SCP-040, and genetic testing reveals that the subject shares the majority of its genetic makeup with the common housecat (<em>Felis catus</em>).<br>
• <strong>SCP-040-1c</strong> – Spherical organism capable of flight by means of rubbery bladders filled with lighter-than-air gas mixture. Entity has eleven limbs terminating in opposable digits, and a complex respiratory system capable of replicating a wide variety of musical patterns.<br>
• <strong>SCP-040-1j</strong> – Quadrupedal organism covered in a thick coat of pink and blue fur. Entity has no eyes, a broad mouth with blunt teeth, and is capable of climbing up vertical surfaces. Occasionally used by SCP-040 as a means of transport.</p>
<p><strong>Addendum-02</strong></p>
<p>The following interview excerpt is dated ██/██/2008, shortly after SCP-040’s initial containment and orientation sessions.</p>
<blockquote class="cornerBorder" style="">
<p><strong>Dr. Abernathy:</strong> Good morning, Forty.</p>
<p><strong>SCP-040:</strong> Good morning, Miss Abernathy.</p>
<p><strong>Dr. Abernathy:</strong> Sounds like you’re getting over your cold.</p>
<p><strong>SCP-040:</strong> Mm-hmm.</p>
<p><strong>Dr. Abernathy:</strong> I’m glad. Can I ask you a few questions before we start with today’s lesson?</p>
<p><strong>SCP-040:</strong> Yeah.</p>
<p><strong>Dr. Abernathy:</strong> Can you tell me about your parents?</p>
<p><strong>SCP-040:</strong> Mr. Green said that I don't have any.</p>
<p><strong>Dr. Abernathy:</strong> Can you tell me about Mr. Green, then?<sup class="footnoteref"><a id="footnoteref-1" class="footnoteref footnote-with-tooltip" onclick="WIKIDOT.page.utils.scrollToReference('footnote-1')" data-tooltip-id="footnote-tooltip-scp-viewer-1774651454898-39ki2rcsb" data-tooltip-content="Investigation during Operation TATZELWURM confirmed that █████ ██████ had been operating under the name &quot;Henry Green&quot; since at least 1982." data-tooltip-place="top" data-tooltip-variant="dark">1</a></sup></p>
<p><strong>SCP-040:</strong> He was nice, but he wasn’t very good at talking. He would would would a-always talk l-l-like like this. But he wasn’t there a lot of the time. Most of the time it was the nurses looking after us.</p>
<p><strong>Dr. Abernathy:</strong> And what did they do for you?</p>
<p><strong>SCP-040:</strong> They’d play games with us and teach us things and sometimes they would make us wear these dumb helmets and sit quiet for a long time. Sometimes they’d put a movie on for us, if we behaved, but if we were bad they would lock us in our rooms.</p>
<p><strong>Dr. Abernathy:</strong> Can you tell me anything else?</p>
<p><strong>SCP-040:</strong> Hmmm…They always served us peas for dinner, and I hate peas, so I gave mine to Five, because she liked peas. But I think green beans are better.</p>
</blockquote>
<p><strong>Addendum-03:</strong> ██/██/2009 - SCP-040 successfully reanimated a deceased human body during testing, using three specimens of brown rat (<em>Rattus norvegicus</em>) as the required living component. Resultant subject retained no memories of previous life, and was judged to be of the approximate mental capacity of a human toddler. SCP-040 was highly distressed by the event and refused further testing for the next three weeks.</p>
<div style="clear: both;"></div><div class="footnotes-footer">
<div class="title">Footnotes</div>
<div class="footnote-footer" id="footnote-1"><a onclick="WIKIDOT.page.utils.scrollToReference('footnoteref-1')">1</a>. Investigation during Operation TATZELWURM confirmed that █████ ██████ had been operating under the name "Henry Green" since at least 1982.</div>
</div>
                    </div>
    ` },
    
    { name: 'SCP 073', type: 'file', content: `
    <div class="doc-header">
      <img alt="" src="https://github.com/Shingop/Cadmus/blob/main/scplogo.png?raw=true" />
      <div>
        <div class="doc-header-tagline">SECURE. CONTAIN. PROTECT.</div>
        <div class="doc-header-title">SCP FOUNDATION</div>
      </div>
    </div>
    <hr class="doc-divider-conf" />
    <div class="doc-confidential">CONFIDENTIAL - LEVEL 4 CLEARANCE REQUIRED</div>
    ` },
    
    
  ]},
  
  { name: 'Non-Traditional Departments & Groups of Interests (Factions)', type: 'folder', children: [
    { name: 'Read-Me.txt', type: 'file', content: `a` },
  ]},
  
  { name: 'Personnel (Departments)', type: 'folder', children: [
    { name: 'Department of Administration', type: 'folder', children: [
      { name: 'Read-Me.txt', type: 'file', content: `a` },
    ]},
    
    { name: 'Department of Investigations', type: 'folder', children: [
      { name: 'Read-Me.txt', type: 'file', content: `a` },
    ]},
    
    { name: 'Department of Research', type: 'folder', children: [
      { name: 'Read-Me.txt', type: 'file', content: `a` },
    ]},
    
    { name: 'Department of Tactical Response', type: 'folder', children: [
      { name: 'Read-Me.txt', type: 'file', content: `b` },
    ]},
    
    { name: 'Department of Security', type: 'folder', children: [
      { name: 'Read-Me.txt', type: 'file', content: `a` },
    ]},
    
    { name: 'Department of Facilities', type: 'folder', children: [
      { name: 'Read-Me.txt', type: 'file', content: `a` },
    ]},
    
  ]},
];

// ── Navigation state ──
let currentPath = [];
 
function getNodeAtPath(path) {
  let nodes = fileTree;
  for (const segment of path) {
    const folder = nodes.find(n => n.name === segment && n.type === 'folder');
    if (!folder) return null;
    nodes = folder.children || [];
  }
  return nodes;
}
 
function updateBreadcrumb() {
  const sep = document.querySelector('.filepath-sep');
  if (!sep) return;
  const base = '/ SCP FOUNDATION / FOUNDATION FACILITIES / ';
  if (currentPath.length === 0) {
    sep.innerHTML = `${base}<span class="filepath-sep-active">SITE 72</span>`;
  } else {
    const trail = currentPath.map((p, i) => {
      const isLast = i === currentPath.length - 1;
      const label = p.replace('/', '').toUpperCase();
      return isLast ? `<span class="filepath-sep-active">${label}</span>` : label;
    }).join(' / ');
    sep.innerHTML = `${base}SITE 72 / ${trail}`;
  }
}
 
const fileList = document.getElementById('file-list');
const fileOverlay = document.getElementById('file-overlay');
const fileWindowName = document.getElementById('file-window-name');
const fileWindowBody = document.getElementById('file-window-body');
const fileWindowClose = document.getElementById('file-window-close');
 
function renderFiles() {
  if (!fileList) return;
  fileList.innerHTML = '';
  const nodes = getNodeAtPath(currentPath) || [];
 
  if (currentPath.length > 0) {
    const backRow = document.createElement('div');
    backRow.className = 'file-row file-row--back';
    backRow.innerHTML = `<span class="material-symbols-outlined file-icon">arrow_back</span><span class="file-name">.. (back)</span>`;
    backRow.addEventListener('click', () => {
      currentPath.pop();
      updateBreadcrumb();
      renderFiles();
    });
    fileList.appendChild(backRow);
  }
 
  nodes.forEach(node => {
    const row = document.createElement('div');
    row.className = 'file-row';
 
    if (node.type === 'folder') {
      row.classList.add('file-row--folder');
      const hasFiles = node.children && node.children.length > 0;
      row.classList.add(hasFiles ? 'folder-has-files' : 'folder-empty');
 
      row.innerHTML = `<span class="material-symbols-outlined file-icon">folder</span><span class="file-name">${node.name}</span>`;
 
      // ✅ FIX: block empty folders
      if (hasFiles) {
        row.addEventListener('click', () => {
          currentPath.push(node.name);
          updateBreadcrumb();
          renderFiles();
        });
      } else {
        row.style.cursor = "not-allowed";
        row.style.opacity = "0.6";
      }
 
    } else if (node.type === 'locked' || node.type === 'locked-folder') {
      const baseIcon = node.type === 'locked-folder' ? 'folder' : 'description';
      row.classList.add('file-row--locked');
      row.innerHTML = `
        <span class="file-icon-wrap">
          <span class="material-symbols-outlined file-icon">${baseIcon}</span>
          <span class="material-symbols-outlined file-icon-lock" title="Protected system item">lock</span>
        </span>
        <span class="file-name">${node.name}</span>`;
      row.addEventListener('click', () => openLockedModal(node.type));
 
    } else {
      row.innerHTML = `<span class="material-symbols-outlined file-icon">description</span><span class="file-name">${node.name}</span>`;
      row.addEventListener('click', () => openFile(node));
    }
 
    fileList.appendChild(row);
  });
 
  updateBreadcrumb();
}
 
// ── Persistent iframe panels ──
// Each embed file gets one div+iframe injected directly into the file window
// body at load time and hidden with display:none. Opening a file simply
// toggles visibility — the iframe never moves or reloads.

function getAllFiles(nodes) {
  let all = [];
  for (const n of nodes) {
    if (n.type === 'file') all.push(n);
    else if (n.type === 'folder' && n.children) all = all.concat(getAllFiles(n.children));
  }
  return all;
}

// Inject all embed panels now, hidden
getAllFiles(fileTree).forEach(file => {
  if (file.content && file.content.trim().startsWith('<iframe')) {
    const panel = document.createElement('div');
    panel.className = 'embed-panel';
    panel.dataset.fileName = file.name;
    panel.style.display = 'none';
    panel.innerHTML = file.content;
    fileWindowBody.appendChild(panel);
  }
});

function openFile(file) {
  fileWindowName.textContent = file.name;
  const isEmbed = file.content && file.content.trim().startsWith('<iframe');

  if (isEmbed) {
    // Hide all embed panels, show the right one
    fileWindowBody.querySelectorAll('.embed-panel').forEach(p => p.style.display = 'none');
    // Hide any text content layer
    const textLayer = fileWindowBody.querySelector('.file-content-layer');
    if (textLayer) textLayer.style.display = 'none';

    fileWindowBody.classList.add('is-embed');
    const panel = fileWindowBody.querySelector(`.embed-panel[data-file-name="${CSS.escape(file.name)}"]`);
    if (panel) panel.style.display = 'flex';
  } else {
    // Hide all embed panels
    fileWindowBody.querySelectorAll('.embed-panel').forEach(p => p.style.display = 'none');
    fileWindowBody.classList.remove('is-embed');

    // Reuse or create a text content layer
    let textLayer = fileWindowBody.querySelector('.file-content-layer');
    if (!textLayer) {
      textLayer = document.createElement('div');
      textLayer.className = 'file-content-layer';
      fileWindowBody.appendChild(textLayer);
    }
    textLayer.style.display = 'block';
    textLayer.innerHTML = `<div class="file-content">${file.content}</div>`;
  }

  fileOverlay.classList.add('active');
}

 
fileWindowClose.addEventListener('click', () => {
  fileOverlay.classList.remove('active');
});

fileOverlay.addEventListener('click', (e) => {
  if (e.target === fileOverlay) fileOverlay.classList.remove('active');
});
 
// ── Locked modal ──
const lockedOverlay = document.getElementById('locked-overlay');
const lockedClose = document.getElementById('locked-close');
 
function openLockedModal(type) {
  const thing = type === 'locked-folder' ? 'FOLDER' : 'FILE';
  document.getElementById('locked-modal-label').textContent =
    `YOU DO NOT HAVE THE NECCESSARY AUTHORIZATION TO ACCESS THIS ${thing}, IF THIS IS AN ERROR PLEASE CONTACT YOUR LOCAL ADMINISTRATION DEPARTMENT`;
  lockedOverlay.classList.add('active');
}
 
lockedClose.addEventListener('click', () => lockedOverlay.classList.remove('active'));
lockedOverlay.addEventListener('click', (e) => {
  if (e.target === lockedOverlay) lockedOverlay.classList.remove('active');
});
 
// ── Up directory button ──
const upBtn = document.querySelector('.db-btn--icon[title="Up directory"]');
if (upBtn) {
  upBtn.addEventListener('click', () => {
    if (currentPath.length > 0) {
      currentPath.pop();
      updateBreadcrumb();
      renderFiles();
    }
  });
}
 
// ── New item modal ──
const newItemBtn = document.getElementById('new-item-btn');
const newItemOverlay = document.getElementById('new-item-overlay');
const newItemClose = document.getElementById('new-item-close');
const newItemConfirm = document.getElementById('new-item-confirm');
const newFileName = document.getElementById('new-file-name');
const newFileContent = document.getElementById('new-file-content');
 
newItemBtn.addEventListener('click', () => {
  if (newFileName) newFileName.value = '';
  if (newFileContent) newFileContent.value = '';
  newItemOverlay.classList.add('active');
});
 
newItemClose.addEventListener('click', () => newItemOverlay.classList.remove('active'));
 
newItemOverlay.addEventListener('click', (e) => {
  if (e.target === newItemOverlay) newItemOverlay.classList.remove('active');
});
 
if (newItemConfirm) {
  newItemConfirm.addEventListener('click', () => {
    const name = newFileName.value.trim();
    const content = newFileContent.value.trim();
    if (!name) return;
    const nodes = getNodeAtPath(currentPath);
    if (nodes) nodes.push({ name, type: 'file', content: content || '(empty file)' });
    renderFiles();
    newItemOverlay.classList.remove('active');
  });
}
 
// ── Date ──
const dateEl = document.getElementById("date");
if (dateEl) dateEl.innerHTML = Date();
 
// ── Grid view toggle ──
document.addEventListener("DOMContentLoaded", () => {
  const gridBtn = document.getElementById("grid-view-btn");
  const fileListEl = document.getElementById("file-list");
  if (gridBtn && fileListEl) {
    gridBtn.addEventListener("click", () => {
      fileListEl.classList.toggle("grid-view");
      gridBtn.innerHTML = fileListEl.classList.contains("grid-view") ? "☰ LIST VIEW" : "☷ GRID VIEW";
    });
  }
});
 
//-----------------
(function() {
 
  /* ── Map canvas ── */
  const mapCanvas = document.getElementById('s72-map-canvas');
  if (mapCanvas) {
    const mctx = mapCanvas.getContext('2d');
    mapCanvas.width = 290; mapCanvas.height = 130;
    mctx.fillStyle = '#030d0d';
    mctx.fillRect(0, 0, 290, 130);
    mctx.strokeStyle = 'rgba(255,255,255,0.18)';
    mctx.lineWidth = 1;
    const seed = (n) => ((Math.sin(n) * 43758.5453) % 1 + 1) % 1;
    for (let i = 0; i < 30; i++) {
      mctx.beginPath();
      mctx.moveTo(seed(i*3.1)*290, seed(i*7.3)*130);
      mctx.lineTo(seed(i*2.9)*290, seed(i*5.1)*130);
      mctx.stroke();
    }
    mctx.strokeStyle = 'rgba(255,255,255,0.45)';
    mctx.lineWidth = 1.5;
    [[40,0,80,130],[120,0,100,130],[0,40,290,55],[0,90,290,85]].forEach(([x1,y1,x2,y2]) => {
      mctx.beginPath(); mctx.moveTo(x1,y1); mctx.lineTo(x2,y2); mctx.stroke();
    });
    mctx.fillStyle = '#fff';
    mctx.beginPath(); mctx.arc(155,75,3.5,0,Math.PI*2); mctx.fill();
    mctx.strokeStyle = 'rgba(255,255,255,0.4)';
    mctx.lineWidth = 1;
    mctx.beginPath(); mctx.arc(155,75,7,0,Math.PI*2); mctx.stroke();
  }
 
  /* ── Waveform ── */
  const wCanvas = document.getElementById('s72-waveform');
  let wPhase = 0;
  function drawWaveform(phase) {
    if (!wCanvas) return;
    const ctx = wCanvas.getContext('2d');
    const W = wCanvas.width, H = wCanvas.height;
    ctx.clearRect(0,0,W,H);
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    const s2 = (n) => ((Math.sin(n*127.1+311.7)*43758.5453)%1+1)%1;
    for (let x=0;x<W;x++) {
      const t=(x/W)*Math.PI*2*6+phase;
      const noise=(s2(x*0.05+phase*0.1)-0.5)*14;
      const y=H/2+Math.sin(t)*8+Math.sin(t*2.3)*5+noise;
      x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.stroke();
  }
  function animWave() { wPhase+=0.04; drawWaveform(wPhase); requestAnimationFrame(animWave); }
  animWave();
 
  /* ── Radar ── */
  const radarCanvas = document.getElementById('s72-radar');
  let radarAngle = 0;
  function drawRadar() {
    if (!radarCanvas) return;
    const ctx = radarCanvas.getContext('2d');
    const cx=45,cy=45,r=38;
    ctx.clearRect(0,0,90,90);
    ctx.strokeStyle='rgba(255,255,255,0.2)'; ctx.lineWidth=0.8;
    [r*0.33,r*0.66,r].forEach(ri=>{ctx.beginPath();ctx.arc(cx,cy,ri,0,Math.PI*2);ctx.stroke();});
    [0,Math.PI/2,Math.PI,Math.PI*3/2].forEach(a=>{ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);ctx.stroke();});
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(radarAngle);
    const sg=ctx.createLinearGradient(0,0,r,0);
    sg.addColorStop(0,'rgba(255,255,255,0.25)'); sg.addColorStop(1,'rgba(255,255,255,0)');
    ctx.beginPath(); ctx.moveTo(0,0); ctx.arc(0,0,r,-0.3,0.3); ctx.closePath();
    ctx.fillStyle=sg; ctx.fill(); ctx.restore();
    radarAngle+=0.03;
    ctx.fillStyle='rgba(255,255,255,0.8)';
    ctx.beginPath(); ctx.arc(cx,cy,2,0,Math.PI*2); ctx.fill();
    requestAnimationFrame(drawRadar);
  }
  drawRadar();
 
  /* ── HKG wave ── */
  const hkgCanvas = document.getElementById('s72-hkg-wave');
  let hkgPhase = 0;
  function drawHKG() {
    if (!hkgCanvas) return;
    const ctx=hkgCanvas.getContext('2d');
    ctx.clearRect(0,0,160,22);
    ctx.strokeStyle='rgba(255,255,255,0.5)'; ctx.lineWidth=1; ctx.beginPath();
    for(let x=0;x<160;x++){const t=(x/160)*Math.PI*2*4+hkgPhase;const y=11+Math.sin(t)*6+Math.sin(t*3)*2;x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);}
    ctx.stroke(); hkgPhase+=0.05; requestAnimationFrame(drawHKG);
  }
  drawHKG();
 
  /* ── Event log ── */
  const logMessages=['ALL SYSTEMS OPERA...','LOADING DATABASE...','LOADING SITE OVER...','SETTING UP EVENT L...','LOADING ADDITIONA...','INITIALIZING USER S...','OPTIMIZING INTERFA...','LOCAL RESOURCE PA...','TERMINAL FINISHED ...'];
  const logEl=document.getElementById('s72-event-log');
  function addLogEntry(msg) {
    if(!logEl)return;
    const now=new Date();
    const time=now.getHours().toString().padStart(2,'0')+':'+now.getMinutes().toString().padStart(2,'0');
    const entry=document.createElement('div');
    entry.className='s72-log-entry';
    entry.innerHTML=`<div class="s72-log-dot"></div><div class="s72-log-text-wrap"><div class="s72-log-type">NOTIFICATION</div><div class="s72-log-msg">${time} - ${msg}</div></div>`;
    logEl.appendChild(entry); logEl.scrollTop=logEl.scrollHeight;
  }
  logMessages.forEach((msg,i)=>setTimeout(()=>addLogEntry(msg),i*300));
  setInterval(()=>{const m=['SCAN COMPLETE...','MONITORING ACTIVE...','DATA SYNC OK...','PERIMETER CHECK...','NETWORK STABLE...'];addLogEntry(m[Math.floor(Math.random()*m.length)]);},8000);
 
  /* ── Visit counter ── */
  const vcEl=document.getElementById('s72-visit-count');
  if(vcEl){let count=75986;setInterval(()=>{count+=Math.floor(Math.random()*3);vcEl.textContent=count.toLocaleString();},5000);}
 
})();

// ══════════════════════════════
//  INBOX
// ══════════════════════════════

// ── Inbox data ──
// Add messages here. Fields:
//   sender   : display name
//   email    : sender address
//   to       : recipient address
//   subject  : subject line
//   date     : display date  (DD/MM/YYYY)
//   datetime : full timestamp shown inside the email
//   tag      : optional badge label, e.g. 'CONFIDENTIAL'. Set null to hide.
//   tagColor : 'orange' (default) | 'green'
//   flag     : true to show the orange ! flag (important) on the list row
//   body     : full message text (use \n for line breaks)

const inboxMessages = [
  {
    sender:   'Site 72 Command',
    email:    'site-72command@scip.net',
    to:       'Site 72 Personnel',
    subject:  'Site Memo 08-03-2009',
    date:     '08/03/2009',
    datetime: '08/03/2009, 15:59:03',
    tag:      null,
    tagColor: 'orange',
    flag:     true,
    body:
`On the morning of March 8th 2009, an Officer belonging to Site 72's Security Departent experienced "Some sort of manic episode". The Officer, Identified as "Officer Rayan Williams" was first seen behaving spiratically, sleep-walking and running around the halls shouting & mumbling.

Officer William's "Manic Episode" continued to progressively get worse in time to a point where the officer brandished their deparment issued sidearm and began aiming it at his fellow personnel, claiming he was seeing things before opening fire at random directions, most likely as an attempt to terminate these suppossed "somethings".

At XX:40, The Department of Security's Intervention Team was requested by Department Authority and they successfuly disarmed officer Williams. Officer Williams has been placed into temporary detained and is scheduled for an assessment by both the Department of Medicine & a Well-Being team belonging to the Department of Administration.`
  },
  {
    sender:   'Site 72 Command',
    email:    'site-72command@scip.net',
    to:       'Site 72 Personnel',
    subject:  'Site Memo 22-02-2009',
    date:     '22/02/2009',
    datetime: '22/02/2009, 17:57:13',
    tag:      null,
    tagColor: 'orange',
    flag:     false,
    body:
`An overstaff of Class-D (Approximatly 5-10) was sighted today in the Research Subject Housing Block due to logistical errors involving Class-D personnel originally destined for an alternate site. The Class-D, presumed to be personnel not personaly recruited from Site-72's Class-D Program were considerable more hostile and obtained weapons & contraband via a dead-drop inside a modified vending machine/terminal.

In response, a 6-man team involving both Department of Security Officers & Agents from the Department of Investigations were deployed and successfuly quelled the on-going riot and it's dead-drop.

The Logistics error has been notified to greater Foundation Management and the remaining Class-D have since beenr elocated to other nearby Foundation Facilities.`
  },
  {
    sender:   'Site 72 Command',
    email:    'site-72command@scip.net',
    to:       'Site 72 Personnel',
    subject:  'Site Memo 11-01-2009-DOF-01853',
    date:     '11/01/2009',
    datetime: '11/01/2009, 17:18:25',
    tag:      null,
    tagColor: 'orange',
    flag:     false,
    body:
`Due to melting snow the site has experienced flooding in some lower maintenance sectors. If any water damage or leaking is spotted in personnel areas please submit an urgent maintenance request through the maintenance portal. `
  },
  {
    sender:   'Site 72 Command',
    email:    'site-72command@scip.net',
    to:       'Site 72 Personnel',
    subject:  'Site Memo 04-01-2009',
    date:     '04/01/2009',
    datetime: '04/01/2009, 22:34:52',
    tag:      null,
    tagColor: 'orange',
    flag:     false,
    body:
`The Department of Administration, featuring Vice Site Director Ms. Williams, the Head of Administration Ms. Marmeládova, and staff representing the Disciplinary Team have discussed the policies enacted on the Department of Investigations following the last major incident. Relevant personnel should be aware of these changes upon request to their Department Board. `
  },
  {
    sender:   'Site 72 Command',
    email:    'site-72command@scip.net',
    to:       'Site 72 Personnel',
    subject:  'Site Memo 31-12-2008-DOF-01824',
    date:     '31/12/2008',
    datetime: '31/12/2008, 07:36:12',
    tag:      null,
    tagColor: 'orange',
    flag:     false,
    body:
`Due to structural instability in the Arial Access Pad's Support Beams, the Directors Office has authorised a demolition and repurposment act to reform this area of the site in the new year. A new entrance to the site will be constructed alongside an airstrip and warehouse area. Please be aware of these works in your day to day activities and do not interact with the contracted construction personnel.  `
  },
  {
    sender:   'Site 72 Command',
    email:    'site-72command@scip.net',
    to:       'Site 72 Personnel',
    subject:  'Initing Site Lockdown',
    date:     '30/12/2008',
    datetime: '30/12/2008, 18:56:32',
    tag:      'Confidential',
    tagColor: 'orange',
    flag:     true,
    body:
` Hello,

At this time, Site-72 will initiate a Site-wide Lockdown named "First Trumpet", Please stay where you are at this time, and to listen to orders of Zeta Squad, and the Directors Office, as they have directors clearance. 

Thank you, glory to Site-72.

— — — — —

Site Director F. Merkel,
Site Director of Site-72,
Directors Office. `
  },
];

// ── Inbox open/close ──
const inboxOverlay  = document.getElementById('inbox-overlay');
const inboxClose    = document.getElementById('inbox-close');
const inboxMsgList  = document.getElementById('inbox-msg-list');
const inboxView     = document.getElementById('inbox-view');

// Wire up the INBOX button (the one on the terminal page)
document.querySelectorAll('button').forEach(btn => {
  if (btn.textContent.trim().includes('INBOX')) {
    btn.addEventListener('click', openInbox);
  }
});

inboxClose.addEventListener('click', () => inboxOverlay.classList.remove('active'));
inboxOverlay.addEventListener('click', (e) => {
  if (e.target === inboxOverlay) inboxOverlay.classList.remove('active');
});

function openInbox() {
  renderInboxList();
  inboxView.innerHTML = '<div class="inbox-placeholder">Select a conversation to view its contents</div>';
  inboxOverlay.classList.add('active');
}

function renderInboxList() {
  inboxMsgList.innerHTML = '';
  inboxMessages.forEach((msg, idx) => {
    const row = document.createElement('div');
    row.className = 'inbox-msg-row';
    row.innerHTML = `
      <div class="inbox-msg-top">
        <span class="inbox-msg-sender">${msg.flag ? '<span class="inbox-msg-flag">!</span>' : ''}${msg.sender}</span>
        <span class="inbox-msg-date">${msg.date}</span>
      </div>
      <div class="inbox-msg-subject">${msg.subject}</div>
      <div class="inbox-msg-preview">${msg.body.replace(/\n/g,' ').substring(0,80)}...</div>
    `;
    row.addEventListener('click', () => {
      document.querySelectorAll('.inbox-msg-row').forEach(r => r.classList.remove('active'));
      row.classList.add('active');
      openMessage(msg);
    });
    inboxMsgList.appendChild(row);
  });
}

function openMessage(msg) {
  const tagHtml = msg.tag
    ? `<span class="inbox-open-tag${msg.tagColor === 'green' ? ' green' : ''}">${msg.tag}</span>`
    : '';
  inboxView.innerHTML = `
    <div class="inbox-open-header">
      <div class="inbox-open-header-left">
        <span class="inbox-open-subject">${msg.subject}</span>
        ${tagHtml}
      </div>
      <button class="inbox-reply-btn">&#x21A9; Reply</button>
    </div>
    <div class="inbox-open-body">
      <div class="inbox-msg-card">
        <div class="inbox-card-meta">
          <div>
            <div class="inbox-card-from">${msg.sender} <span class="inbox-card-addr">(${msg.email})</span></div>
            <div class="inbox-card-to">to ${msg.to}</div>
          </div>
          <div class="inbox-card-datetime">${msg.datetime}</div>
        </div>
        <div class="inbox-card-text">${msg.body}</div>
      </div>
    </div>
  `;
}









const mapToggle = document.querySelector('.map-tab-toggle');
const mapTabsContainer = document.querySelector('.map-tabs');
const mapTabs = document.querySelectorAll('.map-tab');
const mapLayers = document.querySelectorAll('.map-layer');

/* open/close dropdown */
if (mapToggle && mapTabsContainer) {
  mapToggle.addEventListener('click', () => {
    mapTabsContainer.classList.toggle('open');
  });
}

/* switch maps */
mapTabs.forEach(tab => {
  tab.addEventListener('click', () => {

    // remove active from tabs
    mapTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // hide all maps
    mapLayers.forEach(map => map.classList.remove('active'));

    // show selected map
    const target = document.getElementById(tab.dataset.map);
    if (target) target.classList.add('active');

  });
});
