let Pannel_Status = false;
let customGoal = false;
let customGoalName;
let InCharge;

function NewGoalCreateByCenter() {
  OpenFolder({id:`pj-open-${starringPJ.name}`});
  ModifyAddGoal()
  starringPJ;
}
function ActivateGoal() {
  OpenFolder({id:`pj-open-${starringPJ.name}`});
  starringPJ;
}



function ReturnChapterNb() {
  let nb = 0;
  let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
  for (let [i,v] of Object.entries(pj.chapters)) {
    if (v!=null) {
      nb++;
    }
  }
  return nb;
}
function OpenFolder(el) {
  customGoal=false;
  NewAddGoal=0;
    let id = el.id;
    id = id.replace('pj-open-', '');
    let pj = JSON.parse(localStorage.getItem(`Project : ${id}`));

    Pannel_Status = false;


    console.log(" IS PANNEL STATUS");
    let d = new Date(pj.created_on);
    let N = pj.name;
    InCharge = pj.name;
    let fullN = N.split('')
    for (let i = 0; i < fullN.length; i++) {
        if (fullN[i] == "'") {
            fullN[i] = "¨";
        } else if (fullN[i] == '"') {
            fullN[i] = "^";
        }
    }
    fullN = JSON.stringify({
        "name": fullN
    })



    document.getElementById('Main').innerHTML = `
  <div class="pj-board-parent">
    <div class="pj-b-g">
    <div class="pj-b-g-p">
      <div class="pj-b-g-param-title">
      <span class="material-symbols-outlined"> info </span>
      <p>Project details</p>
      </div>
      <div class="pj-b-g-param" id="${pj.name}" onclick="ChangeCover(this)">
        <span class="material-symbols-outlined"> imagesmode </span><p> Edit cover</p>
      </div>
      <div class="pj-b-g-param" id="${pj.name}" onclick="ChangeName(this)">
        <span class="material-symbols-outlined"> edit </span> <p>Edit name</p>
      </div>
      <div class="pj-b-g-param" id="${pj.name}" onclick="ChangeDesc(this)">
        <span class="material-symbols-outlined"> document_scanner </span> <p>Edit desc.</p>
      </div>
      <div class="pj-b-g-param" id="${pj.name}" onclick="ChangeFiles(this)">
        <span class="material-symbols-outlined"> note </span> <p>Edit files</p>
      </div>
      <div class="pj-b-g-param" id="${pj.name}" onclick="ChangeTime(this)">
        <span class="material-symbols-outlined"> all_inclusive </span> <p>Edit time</p>
      </div>
    </div>
    <div class="pj-b-g-p">
      <div class="pj-b-g-param-title">
      <span class="material-symbols-outlined"> warning </span>
      <p>Sensitive area</p>
      </div>
      <div class="pj-b-g-param" onclick="TriggerSecurity(this);" id="${pj.name}" style="color:#4DB399">
        <span class="material-symbols-outlined"> security </span> <p>Security</p>
      </div>
      <div onclick='DeleteProject(this);' class="pj-b-g-param" id="${pj.name}" style="color:#EA3C12">
        <span class="material-symbols-outlined"> delete </span> <p>Delete</p>
      </div>
    </div>
    </div>
    <div class="pj-b-content" id="pj-b-content">
    <div class="pj-b-i-t"> 
      ${pj.name} 
    </div>
    <div class="wholeinfoshover" onclick="HoverShow('infos')">
    <div class="text2">
    <span class="material-symbols-outlined" id="infosright">
    chevron_right
    </span>
    Informations
    </div>
    <div class="pj-whole-contain-all" id="infoswhole" style="visibility:hidden;display:none;">
    <div class="pj-b-c">
    <img src="${pj.cover?pj.cover:"Images & Icons/MS.png"}">
    </div>
    <div class="pjinfocontent">
        <div class="pj-b-i">
          <div class="pj-i-c">
          <div class="-pj-b-i-i" id="containLink">
            ${pj.more?`
              <span class="material-symbols-outlined"> pending </span>
              <a target="_blank" href="${pj.more}">Linked content</a>
              <div id="a-link-goes"></div>
            `:'<span class="material-symbols-outlined"> pending </span> No linked content'}
            </div>
            <p>
              The linked content is an additional and external part of your work you can 
              save as a link to fastly open it when you need it. 
            </p>
          <div class="-pj-b-i-i-desc">
            <span class="material-symbols-outlined"> description </span>
            <div class="-pj-b-i-i-c">
            ${pj.desc}
            </div>
          </div>
          <p>
          Your project description is for you to remember important parts of your story, and for 
          people to read a summary of your story.
          </p>
          </div>          
        </div>
      </div>
    </div>
    </div>
    <div class="wholegoalsinfo" onclick="HoverShow('goals')">
      <div class="text2">
      <span class="material-symbols-outlined" id="goalsright">
      chevron_right
      </span>
      Objectives & Tasks
      </div>
      <div class="wholegoalsinfo-container" id="goalswhole" style="visibility:hidden;display:none;">
        <div class="wholegoalsinfo-c">
            <div class="wholegoalsinfo-c-t">
                <div></div>
                <p>Objectives</p>
                <p id="pjgdesc">Objectives are a way to set up writing objectives in order to 
                progress and to improve your story. You can have up to two goals per project for the moment.</p>
            </div>
            <div class="wholegoalsinfo-c-c" id="wholegoalsinfo-c-c-goal">
                <button onclick="ModifyAddGoal();" id="pj-b-g-b">
                <span class="material-symbols-outlined"> add </span> New goal </button>
            </div>
        </div>
        <div class="wholegoalsinfo-c">
            <div class="wholegoalsinfo-c-t">
                <div></div>
                <p>Tasks</p>
                <p id="pjgdesc">Tasks are a way for you to set up short-time objectives which are not 
                statistically calculated by Sprint+. You can have as much tasks as you want, and your done
                tasks are kept inside the ${pj.name} file.
                </p>
            </div>
            <div class="wholegoalsinfo-c-c" id="wholegoalsinfo-c-c-task">
            </div>
        </div>
      </div>
    </div>
    <div class="wholedetailsinfos" onclick="HoverShow('details')">
      <div class="text2">
      <span class="material-symbols-outlined" id="detailsright">
      chevron_right
      </span>
      Details
      </div>
      <div class="pj-b-details" id="detailswhole"  style="visibility:hidden;display:none;">
      <div class="pj-b-details-c">
        <p id="pj-b-details-c-t">Overview</p>
        <p>
          Writing
        </p>
        <div>
          ${ReturnChapterNb()>1?ReturnChapterNb()+" chapters have been written":ReturnChapterNb()+"chapter have been written"}
        </div>
        <p>
          Inspiration
        </p>
        <div>
          ${pj.inspi?(pj.inspi.length>1?pj.inspi.length+" elements inspire this project":pj.inspi.length+"element inspires this project"):"This project doesn't have any chapter."} 
        </div>
        <p>
          Tasks
        </p>
        <div>
          ${pj.tasks?(pj.tasks.length>1?pj.tasks.length+" tasks made for this project":pj.tasks.length+"task made for this project"):"This project does not have any task."} 
        </div>
      </div>

      <div class="pj-b-details-c">
      <p id="pj-b-details-c-t">Details</p>
      <p>
        Project sorting
      </p>
    <div>
      <span class="material-symbols-outlined" style="color:${pj.star?"yellow":(pj.backed?"grey":"whitee")}">
      ${pj.star?"star":(pj.backed?"hide_source":"blur_on")}
      </span>
      ${pj.star?"Starred":(pj.backed?"Sleeping":"Normal")} project
    </div>
    <p>
    Synchronization on download
    </p>
    <div>
      <span class="material-symbols-outlined" style="color:${pj.sync?"green":"red"}">
      recycling
      </span>
      ${pj.sync?"Synchronized":"Non-synchronized"} project
    </div>
    <p>
    NSFW content 
  </p>
    <div>
      <span class="material-symbols-outlined" style="color:${pj.NSFW?"red":"green"}">
        18_up_rating
      </span>
      This project is marked as ${pj.NSFW?"NSFW (partially or globally)":"not NSFW"}
    </div>
    </div>
    </div>
    </div>
    <div class="wholeonlineinfos">
      <div class="text2">
      <span class="material-symbols-outlined" id="onlineright">
      chevron_right
      </span>
      Online overview <i style="margin-left:auto;color:rgba(255,255,255,0.6)">Section in progress</i>
      </div>
    </div>
    </div>

  </div>
  `;
  let items = {...localStorage} ;
  let g= 0;

  for (let [i,k] of Object.entries(items)) {
    if (i.includes('goal') && i.includes(pj.name)) {
      g++
    }
  }
  if (g===2) {
    document.getElementById('pj-b-g-b').remove()
  }
  if (pj.tasks) {
    for (let i = 0; i < pj.tasks.length; i++) {
      if (pj.tasks[i].validated != true) {
        let t = pj.tasks[i];
        document.getElementById('wholegoalsinfo-c-c-task').innerHTML+=`
          <div class="pjtask">
            <div class="pjtask-t">
              ${t.name}
            </div>
            <div class="pjtask-i">
              <span class="material-symbols-outlined" style="color:${t.delete?"white":"rgba(255,255,255,0.5)"}">
                delete
              </span>
              <span class="material-symbols-outlined" style="color:${t.repeat?"white":"rgba(255,255,255,0.5)"}">
                replay
              </span>
              <span class="material-symbols-outlined" style="color:${t.alert?"white":"rgba(255,255,255,0.5)"}">
              notifications
              </span>
            </div>
          </div>
        `;
      }
    }
  }

  ActualizeGoals()



}


function HoverShow(i) {
  let span = document.getElementById(`${i}right`);
  span.innerHTML = (span.innerHTML.includes("chevron_right") ? "expand_more":"chevron_right");
  
  let whole = document.getElementById(`${i}whole`);
  console.log(whole)
  whole.style.visibility = (whole.style.visibility === "hidden" ? "visible":"hidden");
  whole.style.display =whole.style.display== "none"?"flex":"none"
}

function ChangeTime() {
  let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));

  document.getElementById('pj-b-content').innerHTML = `
  <div class="mdf-b">
    <div class="mdf-t">
      Modify the end date of your project
    </div>
    <div class="mdf-i">
      You are about to modify the end date of your project.<br>
      To proceed, please enter a date.<br>
      You will still be able to modify it later.
    </div>
    <div class="mdf-input">
    <input type="date" value="${pj.end}" id="enter-content" >
    </div>
    <div class="mdf-button">
    <button onclick="SaveDate()">
      <span class="material-symbols-outlined">
      sync_saved_locally
      </span>
      Confirm

    </button>
    <button id="cancel" onclick="Cancel()">
      <span class="material-symbols-outlined">
      close
      </span>
      Cancel
    </button>
    </div>
  </div>
`;
}

function ChangeName() {
  let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));

    document.getElementById('pj-b-content').innerHTML = `
    <div class="mdf-b">
      <div class="mdf-t">
        Modify the name of your project
      </div>
      <div class="mdf-i">
        You are about to modify the name of your project.<br>
        To proceed, please enter name (must not contain « project » or « goal »).<br>
        You will still be able to modify it later.
      </div>
      <div class="mdf-input">
      <input type="text" id="enter-content" autocomplete="off"value="${pj.name}" placeholder="Enter a new name">
      </div>
      <div class="mdf-button">
      <button onclick="SaveName()">
        <span class="material-symbols-outlined">
        sync_saved_locally
        </span>
        Confirm

      </button>
      <button id="cancel" onclick="Cancel()">
        <span class="material-symbols-outlined">
        close
        </span>
        Cancel
      </button>
      </div>
    </div>
  `;
}
function SaveDate() {
  let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));

  let cv = document.getElementById('enter-content').value;
  let d = new Date();
  let c = new Date(cv);
  console.log(c,d,cv)
  if (isNaN(c) != true && d<c) {
      pj.end = cv;
      localStorage.setItem(`Project : ${pj.name}`, JSON.stringify(pj));
      OpenFolder({
          id: `pj-open-${pj.name}`
      })
  } else {
      document.getElementById('enter-content').style.borderBlockColor = "red";
  }
}


function SaveName() {
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));

    let cv = document.getElementById('enter-content').value;

    if (cv && cv.toLowerCase().includes('goal') != true && cv.toLowerCase().includes('project') != true && cv.includes('"') != true && cv.includes("'") !=true) {
        for (let i = 0; i < 2; i++) {
            let g = JSON.parse(localStorage.getItem(`${pj.name}-goal-${i}`));
            if (g) {
                console.log('Goal in')
                localStorage.setItem(`${cv}-goal-${i}`, JSON.stringify(g));
                localStorage.removeItem(`${pj.name}-goal-${i}`);
            }
        }
        let backup = pj.name;
        pj.name = cv;
        localStorage.setItem(`Project : ${cv}`, JSON.stringify(pj));
        OpenFolder({
            id: `pj-open-${cv}`
        })
        localStorage.removeItem(`Project : ${backup}`);
    } else {
        document.getElementById('enter-content').style.borderBlockColor = "red";
    }
}


function ChangeCover() {
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    document.getElementById('pj-b-content').innerHTML = `
    <div class="mdf-b">
      <div class="mdf-t">
        Modify your cover
        <div class="howtoaddLink" onclick="OpenCoverHelp()">
          How to add a cover
        </div>
      </div>
      <div class="mdf-i">
        You are about to modify the cover of your project.<br>
        To proceed, please enter a link to a cover (A4 image type).
      </div>
      <div class="mdf-input">
      <input type="text" id="enter-content" autocomplete="off" value="${pj.cover}" placeholder="Enter a link to an image">
      </div>
      <div class="mdf-button">
      <button onclick="SaveCover()">
        <span class="material-symbols-outlined">
        sync_saved_locally
        </span>
        Confirm

      </button>
      <button id="cancel" onclick="Cancel()">
        <span class="material-symbols-outlined">
        close
        </span>
        Cancel
      </button>
      </div>
    </div>
  `;
}

function SaveCover() {
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));

    let cv = document.getElementById('enter-content').value;
    console.log(cv)
    if (isValidUrl(cv)) {
        pj.cover = cv;
        localStorage.setItem(`Project : ${pj.name}`, JSON.stringify(pj));
        OpenFolder({
            id: `pj-open-${pj.name}`
        })
    } else {
        document.getElementById('enter-content').style.borderBlockColor= "red";
    }
}

function ChangeDesc() {
  let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    document.getElementById('pj-b-content').innerHTML = `
    <div class="mdf-b">
      <div class="mdf-t">
        Modify the description of your project
      </div>
      <div class="mdf-i">
        You are about to modify the description of your project.<br>
        To proceed, please enter a description to your project. 
        Please do not make it too long.<br>
        You will still be able to modify it later.
      </div>
      <div class="mdf-input">
      <textarea type="text" id="enter-content" autocomplete="off"placeholder="Enter a description">${pj.desc}</textarea>
      </div>
      <div class="mdf-button">
      <button onclick="SaveDesc()">
        <span class="material-symbols-outlined">
        sync_saved_locally
        </span>
        Confirm
      </button>
      <button id="cancel" onclick="Cancel()">
        <span class="material-symbols-outlined">
        close
        </span>
        Cancel
      </button>
      </div>
    </div>
  `;
}

function SaveDesc() {
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));

    let cv = document.getElementById('enter-content').value;

    if (cv) {
        pj.desc = cv;
        localStorage.setItem(`Project : ${InCharge}`, JSON.stringify(pj));
        OpenFolder({
            id: `pj-open-${InCharge}`
        })
    } else {
        document.getElementById('enter-content').style.borderBlockColor= "red";
    }
}

function ChangeFiles() {
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    document.getElementById('pj-b-content').innerHTML = `
    <div class="mdf-b">
      <div class="mdf-t">
        Modify additional content
      </div>
      <div class="mdf-i">
        You are about to modify the additional content of your project.<br>
        To proceed, please enter a link to a file of yours on the internet that reffers to your project.
      </div>
      <div class="mdf-input">
      <input type="text" id="enter-content" autocomplete="off" value="${pj.more}" placeholder="Enter a link to any type of content">
      </div>
      <div class="mdf-button">
      <button onclick="SaveFiles()">
        <span class="material-symbols-outlined">
        sync_saved_locally
        </span>
        Confirm

      </button>
      <button id="cancel" onclick="Cancel()">
        <span class="material-symbols-outlined">
        close
        </span>
        Cancel
      </button>
      </div>
    </div>
  `;
}

function Cancel() {
    OpenFolder({
        id: `pj-open-${InCharge}`
    })
}

function SaveFiles() {
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));

    let cv = document.getElementById('enter-content').value;
    console.log(cv)
    if (isValidUrl(cv)) {
        pj.more = cv;
        localStorage.setItem(`Project : ${pj.name}`, JSON.stringify(pj));
        OpenFolder({
            id: `pj-open-${pj.name}`
        })
    } else {
        document.getElementById('enter-content').style.borderBlockColor= "red";
    }
}


function ActualizeGoals() {
    const items = {
        ...localStorage
    };
    let Content = [];
    let z = 0;
    for (let o of Object.entries(items)) {
        if (o[0].includes("goal") && o[0].includes(InCharge)) {
            z++;
            let GoalNumber = o[0].split('')[o[0].split('').length - 1]
            let Goal = JSON.parse(localStorage.getItem(o[0]));
            GoalNumber = parseInt(GoalNumber);
            let Time = parseInt(Goal.duration);
            let Start = new Date(Goal.started_on);
            let Ends = new Date(Start.getTime()+86400000*Time);
            let WhatDayToday = new Date();
          
            WhatDayToday.setHours(0,0,0,0);
            Start.setHours(0,0,0,0);
            Ends.setHours(0,0,0,0);
            Content.push({
                [GoalNumber]: `
      <div class="goal-nb-${GoalNumber + 1 }-${Goal.name}" id="pj-b-gg">
        <div class="pj-b-gg-t">
          <div class="pj-b-gg-t-t">${Goal.name}</div>
          </div>
        <div class="pj-gg-cc">
        <div class="pj-b-gg-d-1">
          <div class="pj-b-gg-t">
            <span class="material-symbols-outlined">
            insights
            </span>
            Global
          </div>
          <div class="pj-b-gg-d">
              <div class="pj-b-gg-d-t">
                Write
              </div>
              <b>${Goal.amount_of_words}</b>
              <p>words</p>
          </div>
          <div class="pj-b-gg-d">
              <div class="pj-b-gg-d-t">
                Written
              </div>
              <b>${Goal.amount_of_words}</b>
              <p>words</p>
          </div>
          <div class="pj-b-sep"></div>
            <div class="pj-b-gg-d">
            <div class="pj-b-gg-d-t">
                Lasts
              </div>
              <b>${Goal.duration}</b>
              <p>days</p>
            </div>
            <div class="pj-b-gg-d">
            <div class="pj-b-gg-d-t">
              Ends on
            </div>
            <b>
            ${
              Ends.getDate()>9?Ends.getDate():"0"+Ends.getDate()
            }/${
              Ends.getMonth()+1>9?Ends.getMonth()+1:"0"+(Ends.getMonth()+1)
            }/${Ends.getFullYear()}
            </b>
            <p>
              dd/mm/yy
            </p>
          </div>
          <div class="pj-b-sep"></div>
          <div class="pj-b-gg-d">
              <div class="pj-b-gg-d-t">
                Download
              </div>
              <b>
                <span class="material-symbols-outlined">
                ${Goal.sync?"check":"close"}
                </span>
              </b>
              <p>
                project-side
              </p>
          </div>
        </div>
        <div class="pj-b-gg-d-2">
        <div class="pj-b-gg-dd" >
          <div class="pj-b-gg-t">
            <span class="material-symbols-outlined">
              description
              </span>
              Description
            </div>
          <p>${Goal.details}</p>
        </div>
        </div>
        <div class="goal-mngment">
            <div class="g-m-t">
            <span class="material-symbols-outlined">
            security
            </span>
            Goal management
            </div>
            <div class="goal-mngment-buttons">
                  <div class="RingGoal" onclick="RingGoal(this);" id="${InCharge}-goal-${GoalNumber}" >
                  <button style="background-color:${Goal.started ? "#98C379":"#E06C75"}">
                    <span class="material-symbols-outlined">
                    notifications_active
                    </span>     
                    <p>
                    Change your objective status to ${Goal.started?"sleeping":"active"}
                  </p>
                  </button>
                </div>
                <div class="DelGoal" onclick="DelGoal(this);" id="${InCharge}-goal-${GoalNumber}">
                <button>
                <span class="material-symbols-outlined">
                delete
                </span>    
                <p>
                Delete ${Goal.name}. This action is irreversible.
                </p>      
                </button>
              </div>
            </div>
        </div>
        <div class="gi">
          You can modify this objective whenever you want, by clicking the <i>Progress</i> button on your menu.
        </div>
        <div class="goalstate">
              <span class="material-symbols-outlined" style="font-size:20px !important">
              ${Goal.started ? "toggle_on":"toggle_off"}
              </span>
              This objective is ${Goal.started ? "running":"sleeping"}
        </div>
        </div>
      </div>
    `
            })

        }
    }

    Content.sort(function(a, b) {
        let c = Object.values(a);
        let d = Object.values(b);

        if (c > d) return 1;
        if (c < d) return -1;
        return 0;
    });
    console.log(Content)
    for (let j = 0; j < Content.length; j++) {
        for (let o of Object.values(Content[j])) {
            document.getElementById('wholegoalsinfo-c-c-goal').innerHTML += o;
        }
    }
    if (z == 2) {
        
    }
}


function RingGoal(el) {
    let id = el.id;
    let g = JSON.parse(localStorage.getItem(id));
        if (!g.started) {
            g.started_on = new Date()
            g.started_on.setHours(0, 0, 0, 0)
        }
        g.started = !g.started;
    localStorage.setItem(id, JSON.stringify(g))
    OpenFolder({
      id: `pj-open-${InCharge}`
    })
}

function DelGoal(g) {
    console.log(g.id)
    if (confirm('Do you really want to delete this goal?')) {
        localStorage.removeItem(g.id);
        OpenFolder({
            id: `pj-open-${InCharge}`
        })
    }
}

let NewAddGoal = 0;

function ModifyAddGoal() {
    customGoal = true;
    let n = InCharge;
    if (NewAddGoal <= 0) {
        NewAddGoal = 1;
        let CG = 0;
        for (let i = 0; i < 2; i++) {
            if (localStorage.getItem(`${customGoal ? n: Name}-goal-${i}`)) {
                CG++;
            }
        }
        console.log(CG)
        if (CG >= 2) {
            alert('Already too much goals (2 max.)');
            return;
        } else {
            document.getElementById('pj-b-content').innerHTML = `
            <div class="g-b-new">
              <div class="g-b-n-t">
                <div class="g-b-n-t-t">
                  <div class="ifo">
                    <span class="material-symbols-outlined"> history_edu </span> Name
                  </div>
                  <input type="text" id="goal-name" maxlength="50" placeholder="Enter your goal name here (50ch. max.)"autocomplete="off">
                </div>
                <div class="g-b-n-t-t">
                  <div class="ifo">
                    <span class="material-symbols-outlined"> timer </span> Duration
                  </div>
                  <input type="number" id="goal-duration" max="999" value="15">
                </div>
                <div class="g-b-n-t-t">
                  <div class="ifo">
                    <span class="material-symbols-outlined"> flag </span> Details
                  </div>
                  <textarea id="goal-details" maxlength="200"  placeholder="Describe your goal (200ch. max.)"></textarea>
                </div>
                <div class="g-b-n-t-t">
                  <div class="ifo">
                    <span class="material-symbols-outlined"> numbers </span> Amount of words
                  </div>
                  <input type="number" min=1000 id="words-amount" value="1000">
                </div>
                <div class="goal-save">
                  <button onclick='Goal_Save();'> Create goal </button>
                </div>
                <div id="AlertMissingContent"> Error: your form is wrongly completed. <br> Make sure there is a duration for your project, a name and an amount of words to reach. </div>
              </div>
          </div>
          `;
        }
    }
}

function FilterRedirect() {
  FilterProjects(document.getElementById("FilterProject").value);
}

function FilterProjects(type) {
      const items = {
        ...localStorage
    };
    var size = Object.keys(items).length;
    let PJNEW = document.querySelectorAll('.pj-new');
    for (let i=0;i  < PJNEW.length; i++) {
      PJNEW[i].remove();
    }
    let PJS = [];
    for (let e of Object.entries(items)) {
      if (e[0].includes("Project")) {
          let o = JSON.parse(e[1])
          if (!o.star) {
            o.star=false;
          }
          if(!o.backed) {
            o.backed=false;
          }
          PJS.push(o);
      }
    }
    console.log(PJs)
    PJS.sort(function(a,b){
      return b.star- a.star
    });
    PJS.sort(function(a,b){
      return a.backed- b.backed
    });    console.log(PJs)

    for (let o of PJS) {
          let item = o;
          if (item.cover === null) {
              item.cover = "https://drive.google.com/uc?id=1AH5bmT04YgAPoQjATPxTLq2C0mv7la1O"
          }
          if (!item.end) {
            item.end = new Date()
          }
          if (!item.chapters) {
            item.chapters = {}
          }
          let chapteramount = 0;
          for (let i =1; i <  Object.keys(item.chapters).length+1;i++) {
            if (item.chapters[i] != null) {
              chapteramount++;
            }
          }
          console.log(item)
          let Ends = item.end;
          console.log(Ends)

          Ends = new Date(Ends)
          console.log(Ends)

          let WTA = `
          <div class="pj-new">
            <div class="pj-${item.name}" id="pj-whl">
              <div class="pj-infos" id="pj-child">
                <div class="pj-new-ttl"> ${item.name} </div>
                <div class="pj-open-and-desc">
                  <div class="pj-open-desc">
                    <div class="pj-open-desc-ddesc">
                      <div class="pj-open-desc-info-b">
                        Project description
                      </div>
                      ${item.desc}
                    </div>
                    <div class="pj-open-desc-infos">
                      <div class="pj-open-infos-b">
                        <span class="material-symbols-outlined" style="color:${item.sync?"green":"red"}">
                        recycling
                        </span>
                        <span class="material-symbols-outlined" style="color:${item.star?"yellow":(item.backed?"white":"white")}">
                        ${item.star?"star":(item.backed?"hide_source":"blur_on")}
                        </span>
                      </div>

                      <div class="pj-open-desc-infos-d">
                        Ends on ${Ends.getDate()>9?Ends.getDate():"0"+Ends.getDate()}/
                        ${Ends.getMonth()+1>9?Ends.getMonth()+1:"0"+(Ends.getMonth()+1)}/
                        ${Ends.getFullYear()}
                      </div>

                      <div class="pj-open-desc-infos-d">
                        ${chapteramount} chapter${chapteramount>1?"s":""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pj-param">
              <div class="pj-open" id="pj-open-${item.name}" onclick="OpenFolder(this);">
                  <button class="material-symbols-outlined"  id="folder"> folder </button>
                  <button class="material-symbols-outlined"  id="folder-open"> folder_open </button>
                  <div class="pj-open-desc"> Open project </div>
              </div>
              <div class="pj-param-contan">
                ${item.more?`
                  <span class="material-symbols-outlined" onclick="window.open('${item.more}')" id="${item.name}"> open_in_new </span>
                `:""}
                <span class="material-symbols-outlined" onclick="GoalsShowUp()" id="${item.name}"> show_chart </span>
                <span class="material-symbols-outlined" onclick="OpenWriting()" id="${item.name}"> edit </span>
                <div class="pj-param-contan-view">
                  <span class="material-symbols-outlined" onclick="ChangeStatusStar(this)" id="${item.name}"
                    style="color: ${item.star ? 'yellow' : 'white'};"
                    > star </span>
                  <span class="material-symbols-outlined" id="${item.name}" onclick="ChangeStatusBack(this)"
                  style="color: ${item.backed ? 'grey' : 'white'}"
                  > hide_source </span>
                </div>
              </div>
            </div>
            </div>
            <div class="pj-slct-img">
            ${item.cover?`
              <img src="${item.cover}" class="pj-cover">
            `:'<img src="Images & Icons/MS.png" class="pj-cover">'}
          </div>
        </div>`;
        let ct = document.getElementById("FilterProject").value;
        if (
          type == "All" ||
          (type=="Starred" && item.star) ||
          (type=="Sleeping" && item.backed)
        ) {
          document.getElementById('pj-ctnt').innerHTML += WTA;
          document.getElementById("FilterProject").value = ct;
        }
  }
}
function ProjectShowUp() {
    InCharge;
    Pannel_Status = false;
    document.getElementById('Main').innerHTML = `
    <div class="pj-ctnt-opt">
      <button onclick="Project()">
      <span class="material-symbols-outlined">
        add
        </span>
        New project
      </button>
    <div class="pj-ctnt-select">
      <div class="pj-ctn-select-title">
        <span class="material-symbols-outlined">
        filter_alt
        </span>
        Filter projects
      </div>
      <select id="FilterProject" onchange="FilterRedirect()">
        <option>All</option>
        <option>Starred</option>
        <option>Sleeping</option>
      </select>
    </div>
  </div>
    <div class="pj-ctnt" id="pj-ctnt">
      
    </div>
  `;
  FilterProjects('All');
}
function ChangeStatusBack(el) {
  let id = el.id;
  let pj = JSON.parse(localStorage.getItem(`Project : ${id}`));
  if (!pj.backed) {
    pj.backed = true;
  } else {
    pj.backed = !pj.backed;
  }
  pj.star = false;
  localStorage.setItem(`Project : ${id}`,JSON.stringify(pj))
  ProjectShowUp();

}

function ChangeStatusStar(el) {
  let id = el.id;
  let pj = JSON.parse(localStorage.getItem(`Project : ${id}`));
  if (!pj.star) {
    pj.star = true;
  } else {
    pj.star = !pj.star;
  }
  pj.backed = false;
  localStorage.setItem(`Project : ${id}`,JSON.stringify(pj))
  ProjectShowUp();

}


/*
            <div class="pj-infos" id="pj-child">
              <div class="pj-open">
                <button class="material-symbols-outlined" style="font-size:50px;cursor:pointer;" id="pj-open"> folder_open </button>
                <div class="pj-open-desc"> Open project </div>
              </div>
              <div class="pj-param">
                <div class="pj-param-contan">
                  <button class="material-symbols-outlined" id="pj-param"> star </button>
                </div>
                <div class="pj-param-contan">
                  <button class="material-symbols-outlined" id="pj-param"> share </button>
                </div>
              </div>
            </div>
*/
function DeleteProject() {
    document.getElementById('pj-b-content').innerHTML = `
  <div class="mdf-b">
    <div class="mdf-t">
      Delete project
    </div>
    <div class="mdf-i">
      You are about to delete your project. <br>
      This action can't be undone. If you're not sure, please download your datas before deleting your project. <br>
      Enter in the following inputs the password of your project, and the password of your account.
    </div>
    <div class="mdf-input">
    <input type="text" id="enter-content-0" placeholder="Project password">
    <input type="text" id="enter-content-1" placeholder="Session password">
    </div>
    <div class="mdf-button">
    <button onclick="confirmdel()">
      <span class="material-symbols-outlined">
      sync_saved_locally
      </span>
      Confirm
    </button>
    <button id="cancel" onclick="Cancel()">
      <span class="material-symbols-outlined">
      close
      </span>
      Cancel
    </button>
    </div>
  </div>
`;


}

let confirmdel = function() {
    let p = document.getElementById('enter-content-0');
    let p1 = document.getElementById('enter-content-1');

    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    let user = JSON.parse(localStorage.getItem(`user`));

    if (p.value == pj.password && p1.value == user.password) {
        localStorage.removeItem(`Project : ${InCharge}`);
        for (let i = 0; i < 2; i++) {
            if (localStorage.getItem(`${pj.name}-goal-${i}`)) {
                localStorage.removeItem(`${pj.name}-goal-${i}`)
            }
        }
        ProjectShowUp();
    } else {
        if (p.value != pj.password) {
            document.getElementById(`enter-content-0`).style.borderBlockColor= "red";
        } else {
            document.getElementById(`enter-content-0`).style.borderBlockColor= "green";
        }
        if (p1.value != user.password) {
            document.getElementById(`enter-content-1`).style.borderBlockColor = "red";
        }
    }

}

function Project() {
    console.log(Pannel_Status + " is pannel status")
    if (
        !Pannel_Status === true
    ) {
        document.getElementById('Main').innerHTML = Project_form;
        document.getElementById('start').valueAsDate = new Date();
        let END = new Date()
        END.setDate(END.getDate()+60);
        console.log(END)
        document.getElementById('end').valueAsDate = END;

    } else {
        document.getElementById('Main').innerHTML = ""
    }
    Pannel_Status = !Pannel_Status;
}
let Name;
const isValidUrl = urlString => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}


function CreateProject() {
    let name = document.getElementById('name').value;
    let desc = document.getElementById('about').value;
    let start = document.getElementById('start').value;
    let end = document.getElementById('end').value;
    let more = document.getElementById('more').value;
    let cover = document.getElementById('cover').value;


    let check = ["name", "about", "start", "end"];
    let o = 0;
    for (let i = 0; i < check.length; i++) {
        if (document.getElementById(check[i]).value.length <= 0) {
            document.getElementById(check[i]).style.borderBlockColor = "red";
            o++;
        } else {
          document.getElementById(check[i]).style.borderBlockColor = "rgba(0,0,0,0)";
        }
    }

    //#24335a
    console.log(start, end)
    let s = new Date(start);
    s = s.getTime();
    let e = new Date(end);
    e = e.getTime();
    if (e < s) {
        o++;
        document.getElementById("start").style.borderBlockColor = "red";
        document.getElementById("end").style.borderBlockColor = "red";

    } else {
        document.getElementById("start").style.borderBlockColor = "rgba(0,0,0,0)";
        document.getElementById("end").style.borderBlockColor = "rgba(0,0,0,0)";

    }
    if (name.includes('"') || name.includes("'")) {
      document.getElementById("name").style.borderBlockColor = "red";
      o+=5;
    }

    if (o > 0) {
        return;
    }
    Name = name;
    let Project = {
        name: name,
        type: "Writing project",
        desc: desc,
        start: start,
        end: end,
        more: more,
        cover: cover,
        created_on: Date.now(),
        chapters : {},
        password: JSON.parse(localStorage.getItem('user')).password,
        inspi: [],
        star : false,
        backed : false
    }
    localStorage.setItem(`Project : ${name}`, JSON.stringify(Project));
    create = 0;
    OpenFolder({
        id: `pj-open-${Name}`
    });
    Name = "";
}

let create = 0;



function CreateGoal() {
    if (create === 0) {
        create = 1;

        document.getElementById('goals-container').innerHTML += `
    <div class="g-b-new">
      <div class="g-b-n-t">
        <div class="g-b-n-t-t">
          <div class="ifo">
            <span class="material-symbols-outlined">
              history_edu
              </span>
              Goal name
          </div>
          <input type="text" id="goal-name" maxlength="20" autocomplete="off">
        </div>
        <div class="g-b-n-t-t">
          <div class="ifo">
            <span class="material-symbols-outlined">
              timer
              </span>
              Duration
          </div>
          <input type="number" id = "goal-duration" max="999">
          <div class="g-b-n-t-t">
            <div class="ifo">
              <span class="material-symbols-outlined">
                flag
                </span>
                Goal
            </div>
            <textarea id="goal-details"  maxlength="50"></textarea>
          </div>
          <div class="g-b-n-t-t">
          <div class="ifo">
            <span class="material-symbols-outlined">
              numbers
              </span>
              Amount of words
          </div>
          <input type="number" min = 1000 id="words-amount">
        </div>
        </div>
        <div class="goal-save">
    
          <button onclick='Goal_Save();'>
            <span class="material-symbols-outlined">
              offline_pin
              </span>
              Save
          </button>
        </div>
      </div>
    </div>

      `
    }
}

let quotes = [
    "Let our advance worrying become advance thinking and planning.",
    "If you don't know where you are going. How can you expect to get there?",
    "Plans are worthless. Planning is essential.",
    "A good plan today is better than a perfect plan tomorrow."
]



function Rem() {
    document.getElementById('Main').innerHTML = ''
}

function Goal_Save() {
    let goal_name = document.getElementById('goal-name').value;
    let duration = document.getElementById('goal-duration').value;
    let details = document.getElementById('goal-details').value;
    let words = document.getElementById('words-amount').value;


    if (goal_name.length > 1 && isNaN(duration) === false && details.length && isNaN(words) === false) {
        let g = {
          name: goal_name,
          duration: duration,
          details: details,
          amount_of_words: words,
          words: 0,
          started: false,
          started_on: "",
          updates: {},
          star:false,
          backed:false,
          status:'',
          sync:true
      }

      for (let i = 0; i < 2; i++) {
          if (!localStorage.getItem(`${InCharge}-goal-${i}`)) {
              localStorage.setItem(
                  `${InCharge}-goal-${i}`,
                  JSON.stringify(
                      g
                  )
              );
              if (!customGoal) {
                  Save();
              } else {
                  document.getElementById('Main').innerHTML = "";
                  OpenFolder({
                      id: `pj-open-${InCharge}`
                  })
                  NewAddGoal = 0;

              }
              customGoal = false;
              customGoalName = "";
              return;
          }
      }
      alert('Error: cannot create a new goal (2 goals already created).');
      document.getElementById('Main').innerHTML = "";
      OpenFolder({
          id: `pj-open-${InCharge}`
      })
      NewAddGoal = 0;
    } else {
      document.getElementById('AlertMissingContent').style.visibility = "visible";
      document.getElementById('AlertMissingContent').style.position = "relative";

    }
}

function OpenCoverHelp() {
  localStorage.setItem('helpItem',"pj-cover");
  window.open('help.html')
}