let Pannel_Status = false;
let customGoal = false;
let customGoalName;
let InCharge;

function OpenFolder(el) {
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
      Project details
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
      Sensitive area
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
      <div class="pj-b-i">
        <div class="pj-i-c">
        <div class="pj-b-i-t"> ${pj.name} </div>
        <div class="-pj-b-i-i">
          <span class="material-symbols-outlined"> article </span> ${pj.type}
        </div>
        <div class="-pj-b-i-i" id="containLink">
          <span class="material-symbols-outlined"> pending </span>
          <a target="_blank" href="${pj.more}">Linked content</a>
          <div id="a-link-goes"></div>
          </div>
        <div class="-pj-b-i-i-desc">
          <span class="material-symbols-outlined"> description </span>
          <div class="-pj-b-i-i-c">
          ${pj.desc}
          </div>
        </div>
        </div>
        <div class="pj-b-c">
        <img src="${pj.cover}">
        </div>
      </div>

      <div class="pj-b-p">
        <div class="pj-b-goals" id="pj-b-goals">
          <div class="pj-b-g-b" id="pj-b-g-b">
            <button onclick="ModifyAddGoal();">
              <span class="material-symbols-outlined"> add </span> New goal </button>
          </div>
        <div class="pj-b-g-c" id="pj-b-g-c"></div>
        </div>
        <div class="pj-mi">
          <div class="pj-mi-c">
            <div class="-pj-b-i-i" style="font-size: 12px;">
              <span class="material-symbols-outlined"> line_start </span> Created on ${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}
            </div>
            <div class="-pj-b-i-i" style="font-size: 12px;">
              <span class="material-symbols-outlined"> timer </span> Start on ${pj.start} - End on ${pj.end}
            </div>
          </div>
          <div class="pj-mi-c">
            <div class="-pj-b-i-i" style="font-size: 12px;">
              <span class="material-symbols-outlined"> cognition </span>  ${pj.inspi ? pj.inspi.length : "No"} elements inspires this project
            </div>
            <div class="-pj-b-i-i" style="font-size: 12px;">
              <span class="material-symbols-outlined"> timer </span> ${pj.tasks ? pj.tasks.length : "No"} tasks made for this project
            </div>
          </div>
          <div class="pj-mi-c">
            <div class="-pj-b-i-i" style="font-size: 12px;">
              <span class="material-symbols-outlined"> star </span> This project is ${pj.star ? "starry" : "not starry"}
            </div>
            <div class="-pj-b-i-i" style="font-size: 12px;">
              <span class="material-symbols-outlined"> hide_source </span> This project is ${pj.backed ? "sleepy" : "not sleepy"}
            </div>
          </div>
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
    ActualizeGoals()



}

function ChangeTime() {
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
    <input type="date" id="enter-content">
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
`;
}

function ChangeName() {
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
      <input type="text" id="enter-content">
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
      document.getElementById('enter-content').style.border = "2px solid red";
  }
}


function SaveName() {
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));

    let cv = document.getElementById('enter-content').value;

    if (cv && cv.toLowerCase().includes('goal') != true && cv.toLowerCase().includes('project') != true) {
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
        document.getElementById('enter-content').style.border = "2px solid red";
    }
}


function ChangeCover() {
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    document.getElementById('pj-b-content').innerHTML = `
    <div class="mdf-b">
      <div class="mdf-t">
        Modify your cover
      </div>
      <div class="mdf-i">
        You are about to modify the cover of your project.<br>
        To proceed, please enter a link to a cover (A4 image type).
      </div>
      <input type="text" id="enter-content">
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
        document.getElementById('enter-content').style.border = "2px solid red";
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
      <input type="text" id="enter-content">
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
  `;
}

function SaveDesc() {
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));

    let cv = document.getElementById('enter-content').value;

    if (cv) {
        pj.desc = cv;
        localStorage.setItem(`Project : ${id}`, JSON.stringify(pj));
        OpenFolder({
            id: `pj-open-${id}`
        })
    } else {
        document.getElementById('enter-content').style.border = "2px solid red";
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
      <input type="text" id="enter-content">
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
        document.getElementById('enter-content').style.border = "2px solid red";
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
            Content.push({
                [GoalNumber]: `
      <div class="goal-nb-${GoalNumber + 1 }-${Goal.name}" id="pj-b-gg">
        <div class="pj-b-gg-t">
          <div class="pj-b-gg-t-t">${Goal.name}</div>
          <div class="RingGoal" onclick="RingGoal(this);" id="${InCharge}-goal-${GoalNumber}">
          <button>
          <span class="material-symbols-outlined">
          notifications_active
          </span>          
          </button>
        </div>
          <div class="DelGoal" onclick="DelGoal(this);" id="${InCharge}-goal-${GoalNumber}">
          <button>
          <span class="material-symbols-outlined">
          delete
          </span>          
          </button>
        </div>
          </div>
        <div class="pj-gg-cc">
        <div class="pj-b-gg-d-1">
          <div class="pj-b-gg-d">
            <span class="material-symbols-outlined">
            alarm_smart_wake
            </span>
            ${Goal.duration} days long
          </div>
          <div class="pj-b-gg-d">
            <span class="material-symbols-outlined">
            chart_data
            </span>
            ${Goal.amount_of_words} words long
          </div>
        </div>
        <div class="pj-b-gg-d-2">
        <div class="pj-b-gg-d">
          <span class="material-symbols-outlined">
          description
          </span>
          ${Goal.details}
        </div>
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
            document.getElementById('pj-b-g-c').innerHTML += o;
        }
    }
    if (z == 2) {
        document.getElementById('pj-b-g-b').innerHTML = "";
    }
}


function RingGoal(el) {
    let id = el.id;
    let g = JSON.parse(localStorage.getItem(id));
    if (confirm(`${!g.started ? "Start" : "Stop"} the goal?`)) {
        if (!g.started) {
            g.started_on = new Date()
            g.started_on.setHours(0, 0, 0, 0)
        }
        g.started = !g.started;
    }
    localStorage.setItem(id, JSON.stringify(g))

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
    console.log(n)
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
                      <span class="material-symbols-outlined">
                        history_edu
                        </span>
                        Goal name (50ch.)
                    </div>
                    <input id="goal-name" maxlength="50">
                  </div>
                  <div class="g-b-n-t-t">
                    <div class="ifo">
                      <span class="material-symbols-outlined">
                        timer
                        </span>
                        Duration
                    </div>
                    <input type="number" id = "goal-duration" max="999" value="15">
                  </div>
                  <div class="g-b-n-t-t">
                  <div class="ifo">
                    <span class="material-symbols-outlined">
                      flag
                      </span>
                      Describe your goal (200ch.)
                  </div>
                  <textarea id="goal-details"  maxlength="200"></textarea>
                </div>
                <div class="g-b-n-t-t">
                  <div class="ifo">
                    <span class="material-symbols-outlined">
                      numbers
                      </span>
                      Amount of words
                  </div>
                  <input type="number" min = 1000 id="words-amount" value="1000">
                </div>
                  <div class="goal-save">
              
                    <button onclick='Goal_Save();'>
                        Create goal
                    </button>
                  </div>
                  <div id="AlertMissingContent">
                    Error: your form is wrongly completed.<br>
                    Make sure there is a duration for your project,
                    a name and an amount of words to reach.
                  </div>
                </div>
              </div>`;
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
    for (let o of Object.entries(items)) {
      if (o[0].includes("Project")) {
          PJS.push(JSON.parse(o[1]))
      }
    }
    PJS.sort(function(a,b){return b.star- a.star});
    for (let o of PJS) {
          let item = o;
          if (item.cover === null) {
              item.cover = "https://drive.google.com/uc?id=1AH5bmT04YgAPoQjATPxTLq2C0mv7la1O"
          }
          let WTA = `
          <div class="pj-new">
            <div class="pj-${item.name}" id="pj-whl">
              <div class="pj-infos" id="pj-child">
                <div class="pj-new-ttl"> ${item.name} </div>
                <div class="pj-open" id="pj-open-${item.name}" onclick="OpenFolder(this);">
                  <button class="material-symbols-outlined" style="font-size:50px;cursor:pointer;" id="folder"> folder </button>
                  <button class="material-symbols-outlined" style="font-size:50px;cursor:pointer;" id="folder-open"> folder_open </button>
                  <div class="pj-open-desc"> Open project </div></div>
                <div class="pj-param">
                  <div class="pj-param-contan">
                    <span class="material-symbols-outlined" onclick="ChangeStatusStar(this)" id="${item.name}"
                      style="border:1px solid ${item.star ? 'yellow' : '#2c3f70'}"
                      > star </span>
                    <span class="material-symbols-outlined" id="${item.name}" onclick="ChangeStatusBack(this)"
                    style="border:1px solid ${item.backed ? 'white' : '#2c3f70'}"
                    > hide_source </span>
                  </div>
                </div>
              </div>
              <div class="pj-slct-img">
                <img src="${item.cover}" class="pj-cover">
              </div>
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
    <div class="pj-ctnt" id="pj-ctnt">
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
      You are about to delete project. <br>
      This action can't be undone. If you're not sure, please download yoru datas before deleting your project. <br>
      Enter in the following inputs the password of your project, and the password of your account.
    </div>
    <input type="text" id="enter-content-0">
    <input type="text" id="enter-content-1">
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
            document.getElementById(`enter-content-0`).style.border = "2px solid red";
        } else {
            document.getElementById(`enter-content-0`).style.border = "2px solid green";
        }
        if (p1.value != user.password) {
            document.getElementById(`enter-content-1`).style.border = "2px solid red";
        }
    }

}

function Project() {
    console.log(Pannel_Status + " is pannel status")
    if (
        !Pannel_Status === true
    ) {
        document.getElementById('Main').innerHTML = Project_form;
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
    let type = document.getElementById('type').value;
    let desc = document.getElementById('about').value;
    let start = document.getElementById('start').value;
    let end = document.getElementById('end').value;
    let more = document.getElementById('more').value;
    let cover = document.getElementById('cover').value;


    let check = ["name", "type", "about", "start", "end", "more", "cover"];
    let o = 0;
    for (let i = 0; i < check.length; i++) {
        console.log(document.getElementById(check[i]).value)
        if (document.getElementById(check[i]).value.length <= 0) {
            document.getElementById(check[i]).style.border = "2px solid red";
            o++;
        } else {
            document.getElementById(check[i]).style.border = "2px solid #24335a";
        }
        if (check[i] == "more" || check[i] == "cover") {
            if (!isValidUrl(document.getElementById(check[i]).value)) {
                document.getElementById(check[i]).style.border = "2px solid red";
                o++;
            } else {
                document.getElementById(check[i]).style.border = "2px solid #24335a";
            }
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
        document.getElementById("start").style.border = "2px solid red";
        document.getElementById("end").style.border = "2px solid red";

    } else {
        document.getElementById("start").style.border = "2px solid #24335a";
        document.getElementById("end").style.border = "2px solid #24335a";

    }

    if (o > 0) {
        return;
    }
    Name = name;
    let Project = {
        name: name,
        type: type,
        desc: desc,
        start: start,
        end: end,
        more: more,
        cover: cover,
        created_on: Date.now(),
        password: password,
        inspi: [],
        star : false,
        backed : false
    }
    localStorage.setItem(`Project : ${name}`, JSON.stringify(Project));
    let Tracker = document.getElementById('tracker');
    Tracker.src = "/Images & Icons/2.png";

    document.getElementById('Main').innerHTML = `
            <div class="following">
            <img id="tracker" src="Images & Icons/2.png" >
        </div>
        <div class="r-f-1">
            <div class="Review-form">
            <div class="r-f-pic">
            <img src="${cover}" >
            </div>
            <div class="r-f-m">
            <div class="r-f-t">
                ${name}
            </div>
            <div class="r-f-i" id="r-f-c">
                <span class="material-symbols-outlined">
                edit
                </span>
                ${type}
            </div>
            <div class="r-f-t_t" id="r-f-c">
                <span class="material-symbols-outlined">
                schedule
                </span>
                Starting: ${start} - Ending: ${end}
            </div>
            <div class="r-f-d" id="r-f-c">
                <span class="material-symbols-outlined">
                sms
                </span>
                ${desc}
            </div>
            <div class="r-f-p" id="r-f-c">
                <span class="material-symbols-outlined">
                pin_drop
                </span>
                <a href="${more}" target="_blank">More content</a>
            </div>
            </div>
        </div>
        <div class="buttons">
        <button onclick="Back('Project : ${name}')">
        <span class="material-symbols-outlined">
        arrow_back
        </span>
        Back
        </button>
        <button onclick="Save()">
          Continue
          <span class="material-symbols-outlined">
          arrow_forward
          </span>
        </button>
        </div>

    `
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
          <input id="goal-name" maxlength="20">
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

function Save() {
    document.getElementById('Main').innerHTML = `
  <div class="following">
  <img id="tracker" src="Images & Icons/4.png" >
</div>
  <div class="Save_project">
    <div class="s-p-t">
      Your project ${Name} is created! 
      Now, you just have to save it, and start 
      working on it!
    </div>
    <div class="s-p-q">
      « ${quotes[Math.floor((Math.random() * quotes.length - 1))]} »
    </div>
    <div class="s-p-b">

      <button onclick="Rem()">
      <span class="material-symbols-outlined">
      celebration
      </span>
      Finalize my project</button>
    </div>
  </div>
  `;
    create = 0;
    OpenFolder({
        id: `pj-open-${Name}`
    });
    Name = "";

}

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
          updates: {}
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


function Back(c) {
    let p = localStorage.getItem(c)
    c = JSON.parse(p);

    document.getElementById('Main').innerHTML = `
    <div class="whole-pj-form">
    <div class="following">
      <img id="tracker" src="Images & Icons/1.png" >
    </div>
    <div class="pj-form">
      <div class="title" id="form-intro-title">
        Create a new project
      </div>
      <div class="p-n" id="p-bx">
        <div class="p-n-t"id="form-title" >
          <span class="material-symbols-outlined">
            history_edu
            </span>
          Give your project a name
        </div>
        <input type="text" id="name">
      </div>
      <div class="p-t"id="p-bx">
        <div class="p-t-t"id="form-title">
          <span class="material-symbols-outlined">
            sort_by_alpha
            </span>
          What is your project?
        </div>
        <select id="type">
          <option name="WP">Writing project</option>
        </select>
      </div>
      <div class="p-d"id="p-bx">
        <div class="p-d-t"id="form-title">
          <span class="material-symbols-outlined">
            info
            </span>
          What is your project about?
        </div>
        <textarea id="about"></textarea>
      </div>
      <div class="p-d2"id="p-bx">
        <div class="p-d2-s"id="form-title">
          <span class="material-symbols-outlined">
            calendar_month
            </span>
          When will your project start?
        </div>
        <input type="date" id="start">
        <div class="p-d2-e"id="form-title">
          <span class="material-symbols-outlined">
            event_busy
            </span>
          When will your project end?
        </div>
        <input type="date" id="end">
      </div>
      <div class="p-d-i"id="p-bx">
        <div class="p-d-i-t" id="form-title">
          <span class="material-symbols-outlined">
            edit_note
            </span>
          Add a link to your project
        </div>
        <input type="text" id="more">
      </div>
      <div class="p-d-p"id="p-bx">
        <div class="p-d-p-t" id="form-title">
          <span class="material-symbols-outlined">
            edit_note
            </span>
          Add a cover (link, A4)
        </div>
        <input type="text" id="cover">
      </div>
      <div class="n-p-s">
        <button type="button" onclick="CreateProject()">
          Create
        </button>
      </div>
    </div>
    `;
    document.getElementById('name').value = c.name;
    document.getElementById('type').value = c.type;
    document.getElementById('about').value = c.desc;
    document.getElementById('start').value = c.start;
    document.getElementById('end').value = c.end;
    document.getElementById('more').value = c.more;
    document.getElementById('cover').value = c.cover;
}