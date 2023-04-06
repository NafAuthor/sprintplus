let starringPJ;
let PJs = [];
let starringGoal;
let CS = false;


function OpenNotifCenter() {
    CS=false;
    starringPJ;
    starringGoal;
    GetPJS()
    document.getElementById('Main').innerHTML = `
    <div class="notifContent">
    <div class="NC-act">
      <div class="NC-t"> Notifications center </div>
      <div class="NC-i">
        <div class="NC-i-t"> This section of Sprint+ allows you to manage all the notifications you will receive from your tasks, goals, and projects. You will also be able to view the status of everything you've done. <br> Your cannot prevent notifications and their appeareance on the main screen. However, you can remove from your account the red buble on your tool bar. <br>
        </div>
        <div class="NC-i-b">
          <div class="NC-i-b-b" id="clearall">
            <span class="material-symbols-outlined"> clear_all </span> Clear notifications <div id="clearallbar"></div>
          </div>
          <div class="NC-i-b-b" id="removered">
            <span class="material-symbols-outlined"> info </span> Remove RedCicle <div id="removeredcircle"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="NC-content">
      <div class="pannel-work">
        <div class="p-w-s">
          <div class="p-w-s-b"></div>
          <div class="p-w-s-t">
            <span class="material-symbols-outlined" id="onlineChange"> radio_button_checked </span> Online
          </div>
          <div class="p-w-s-d">
            Explore your online content: what do you have to work on?<br>
            Sprint+ helps you working on your projects.
          </div>
        </div>
        <div class="p-w-s">
          <div class="p-w-s-b"></div>
          <div class="p-w-s-t" onclick="OnclickProjects()">
            <span class="material-symbols-outlined"> folder </span> Projects <div class="p-w-s-b-as" id="green"></div>
          </div>
          <div class="p-w-s-d">
            Naviguate trough your projects and ideas, organize 
            your inspirations, and more importantly, 
            discover a simple viewer.
          </div>
        </div>
        <div class="p-w-s">
          <div class="p-w-s-b"></div>
          <div class="p-w-s-t" onclick="OnclickGoals(false)">
            <span class="material-symbols-outlined"> signal_cellular_alt </span> Goals <div class="p-w-s-b-as" id="green"></div>
          </div>
          <div class="p-w-s-d">
            Your goals showed up for you to organize it without 
            going here and there on Sprint+.
          </div>
        </div>
      </div>
      <div class="content-showup" id="content-showup">
      
      </div>
    </div>
  </div>
    `;  
}



function OnclickGoals(n,P=null) {
  GetPJS();
  if (n) {
    let index = 0;
    for (let i of PJs) {
        if (i.name === P.name) {
            index=PJs.indexOf(i);
        }
    }
    console.log(PJs, index, P)
    PJs.splice(index,1);
    PJs.unshift(P);
  }
  document.getElementById('content-showup').innerHTML="";
  document.getElementById('content-showup').innerHTML = `
    <div class="goals_container">
        <div class="sourcedesc">
          Develop your projects to see their goals. Directly create a new goal in your 
          folder section.<br>
          Check your goal status and information, and make sure to work on it!
        </div>
        <div id="goal_content">

        </div>
    </div>
  `;
  for (let i=1;i<PJs.length+1; i++) {
    let pj = PJs[i-1];
    document.getElementById('goal_content').innerHTML+=`
        <div class="folderforgoal">
            <div class="expand">
              <span id="${pj.name}_expand" onclick="ShowUpFolderGoals(this)" 
              class="material-symbols-outlined" style="font-size:20px;">
              expand_more
              </span>
            </div>
            <div class="foldergoalname"  style="color:${pj.star ? "rgba(248, 255, 0, 1)" : (pj.backed ? "rgba(186, 186, 186, 1)":"white") }">
            <span class="material-symbols-outlined" style="font-size:13px;">
            ${pj.star ? "star" : (pj.backed ? "hide_source":"blur_on") }
            </span>
                ${pj.name}
            </div>
        </div>
        <div id="${pj.name}_develop" class="developfolder">

        </div>
    `;
  }
}

function ShowUpFolderGoals(el) {
  let index = 0;
  for (let i of PJs) {
      if (i.name+"_expand" === el.id) {
          index=PJs.indexOf(i);
      }
  }
  let pj = PJs[index];
  starringPJ=pj;
  
  let goals = [];

  let items = {...localStorage};
  for (let [key,value] of Object.entries(items)) {
    if (key.includes('goal') && key.includes(pj.name)) {
      goals.push(JSON.parse(value));
    }
  }
  goals.sort(function(a,b){
    return b.started- a.started
  });
  console.log(document.getElementById(pj.name+"_expand").innerHTML)
  if (document.getElementById(pj.name+"_expand").innerHTML.includes('close')) {
    document.getElementById(`${pj.name}_develop`).innerHTML="";
    document.getElementById(`${pj.name}_develop`).style.visibility="hidden";
    document.getElementById(`${pj.name}_develop`).style.position="absolute";
    document.getElementById(pj.name+"_expand").innerHTML = "expand_more";
    starringPJ;
    OnclickGoals(false,starringPJ);
    return;
  }
  else if (document.getElementById(pj.name+"_expand").innerHTML.includes('expand_more')) {
    OnclickGoals(true,starringPJ);
    document.getElementById(pj.name+"_expand").innerHTML = "close";
      if (goals.length>0) {
        for (let i of goals) {

          document.getElementById(`${pj.name}_develop`).innerHTML+=`
            <div class="goalshowup" id="goalshowup">
              <div class="startedornot">
                  ${i.name}
                  <div class="pastilleandtitle">
                    <div class="startedpastille" style="background-color:${i.started?"green":"red"}">
    
                    </div>
                    ${i.started ? "Online":"Offline"}
                  </div>
              </div>
              <div class="goal_namendesc">
                <div class="goal_name">
                  <div class="goal_name_i">
                      Goal name
                  </div>
                  <div class="goal_name_c">
                      <input type="text" placeholder="${i.name}" id="${i.name}_changename" onchange="ChangeGoalName(this)">
                  </div>
                </div>
                <div class="goal_desc">
                  <div class="goal_desc_i">
                      Goal description
                  </div>
                  <div class="goal_desc_c">
                      <textarea type="text" placeholder="${i.details}" id="${i.name}_changedesc" onchange="ChangeGoalDesc(this)"></textarea>
                  </div>
                </div>
              </div>
              ${
                i.started ? `
                <div class="wordNstuff">
                  <div id="UpdatesStat">
    
                  </div>
                  <div id="wordson">
    
                  </div>
                  <div id="durationgoal">
    
                  </div>
                </div>
                ` : ""
    
              }
              <div class="goalsbuttons">
                ${
                    i.started ? `
                    <button onclick="ManageGoals()" style="flex-direction:row;gap:10px;">
                      Manage my goals
                    </button>
                    ` : `
                    <button id="goalofflinebutton" style="flex-direction:column;gap:0px;justify-content:center;position:relative;">
                      <div style="text-decoration: line-through;">Manage my goals</div>
                      <div style="color:rgba(255,255,255,0.6);font-size:13px;">Goal offline: management unavailable</div>
                    </button>
                    <button onclick="ActivateGoal()" style="flex-direction:row;gap:10px;">
                      Activate goal
                    </button>
                    `
                }
              </div>
            </div>
          `;
    
            let d = new Date(i.started_on);
    
            d.setDate(d.getDate()+parseInt(i.duration));
            
    
            let donenow;
            for (let j = 0 ; j < i.duration; j++) {
              let dt =  new Date(i.started_on);
              dt.setDate(dt.getDate()+j);
    
              let today = new Date()
              today.setHours(0,0,0,0)
    
              console.log(dt,today)
    
              if (dt.getDate() === today.getDate() && dt.getMonth() === today.getMonth() && dt.getFullYear() === today.getFullYear()) {
                donenow=j;
              }
            }
            donenow=i.duration - donenow;
            let sd = new Date(i.started_on);
            let val1,val2;
            if (i.started) {
              val1=`
                ${
                  sd.getDate()>9?sd.getDate():"0"+sd.getDate()
                }/${
                  sd.getMonth()>9?sd.getMonth():'0'+(sd.getMonth())
                }/${
                  sd.getFullYear()
                }
              `;
              val2=`
                ${
                  d.getDate()>9?d.getDate():"0"+d.getDate()
                }/${
                  d.getMonth()>9?d.getMonth():'0'+(d.getMonth())
                }/${
                  d.getFullYear()
                }
              `;
            } else if (!i.started) {
                val1="Goal status is offline";
                val2="Goal status is offline";
                donenow = "Goal status is offline"
            }
    
            document.getElementById('durationgoal').innerHTML=`
              <div class="datetitle">
                  <span class="material-symbols-outlined">
                  schedule
                  </span>
                  Timing informations
              </div>
              <div class="dateboard">
                <div class="datec-t">
                  <div class="datec"id="datec-none"></div>
                  <div class="datec">Start</div>
                  <div class="datec">End</div>
    
                </div>
                <div class="datec1">
                  <div class="datec1-t">
                    Date
                  </div>
                  <div class="datec1-c">
                    ${val1}
                  </div>
                  <div class="datec1-c">
                    ${val2}
                  </div>
                </div>
                <div class="datec2">
                  <div class="datec2-t">
                      Days
                  </div>
                  <div class="datec2-c">
                    ${
                      i.duration
                    }
                  </div>
                  <div class="datec2-c">
                    ${
                      donenow
                    }
                  </div>
                </div>
              </div
            `;
          if(!i.updatescount) {i.updatescount=0};
          document.getElementById('UpdatesStat').innerHTML = `
            <div class="statstitle">
              <span class="material-symbols-outlined">
              analytics
              </span>
              Progress
            </div>
            <div class="progressbarstats">
                <div class="progressbarstatscolored" style="width:${(i.words*100)/parseInt(i.amount_of_words)}%">
    
                </div>
                <div class="progressbarstatsct">
                    ${i.words}/${i.amount_of_words} - ${i.updatescount} update${i.updatescount>1?"s":""}
                </div>
            </div>
          `;
        }
      } else if (goals.length===0) {
        document.getElementById(`${pj.name}_develop`).innerHTML+=`
        <div class="goalshowup" id="goalshowup">
          No goal created
          <button onclick="NewGoalCreateByCenter()">
            <span class="material-symbols-outlined">
            add
            </span>
            Create a new goal
          </div>
        </div>
        `;
      }
  
      document.getElementById(`${pj.name}_develop`).style.visibility="visible";
      document.getElementById(`${pj.name}_develop`).style.position="relative";    
      CS=false;
  } 

}

function GetPJS() {
  PJs=[]
  let items = {...localStorage};
  for (let [key, value] of Object.entries(items)) {
      if (key.includes("Project")) {
        let pj = JSON.parse(localStorage.getItem(key));
          PJs.push(
              pj
          )
          if (!pj.star) {
            pj.star = false;
          } 
          if (!pj.backed) {
            pj.backed = false;
          }
      }
  }
  PJs.sort(function(a,b){
    return b.star- a.star
  });
  PJs.sort(function(a,b){
    return a.backed- b.backed
  });
}
function OnclickProjects() {
    document.getElementById('content-showup').innerHTML="";
    document.getElementById('content-showup').innerHTML = `
        <div class="files_container">
            <div class="sourcedesc">
              Explore your project details right here to 
              apply parameters you like. <br>
              Naviguate trough the root of your
              Sprint+ session, select the project 
              you want to see, and modify their parameters.<br>
              However, the goals must be modified in the 
              dedicated part of the center.
            </div>
            <div id="file_content">

            </div>
        </div>
    `;
    for (let i=1;i<PJs.length+1; i++) {
        let pj = PJs[i-1];
        document.getElementById('file_content').innerHTML+=`
            <div id="${pj.name}" class="folder" onclick="OpenFolderPannel(this)">
                <div class="foldername" id="${pj.name}"  style="color:${pj.star ? "rgba(248, 255, 0, 1)" : (pj.backed ? "rgba(186, 186, 186, 1)":"white") }">
                <span class="material-symbols-outlined" style="font-size:14px;">
                ${pj.star ? "star" : (pj.backed ? "hide_source":"blur_on") }
                </span>
                    ${pj.name}
                </div>
            </div>
        `;
    }
    document.getElementById('content-showup').innerHTML+="<div id='filecontentview'></div>";
}

function OpenFolderPannel(el) {
    let bar = document.getElementsByClassName("linkBarPannelFolder");
    document.getElementById('filecontentview').style.visibility = "visible";
    for (let b of bar) b.remove()
    let index = 0;
    for (let i of PJs) {
        if (i.name === el.id) {
            index=PJs.indexOf(i);
        }
    }
    let pj = PJs[index];
    starringPJ=pj;
    let Goals = [];
    let active = 0;
    let sleeping = 0;

    let items = {...localStorage};
    for (let [n,v] of Object.entries(items)) {
      if (n.includes('goal') && n.includes(pj.name)) {
        Goals.push(JSON.parse(v));
        if (JSON.parse(v).started) {
          active++;
        } else {
          sleeping++;
        }
      }
    }
    document.getElementById('filecontentview').innerHTML = `
      <div class="foldercontent">
        <div class="alertInfos" id="alertInfos"></div>
        <div class="foldergoals">
            <div class="foldergoalsmore">${Goals.length} goal${Goals.length>1?"s":""} created for this project (${2-Goals.length} left)</div>
            <div class="foldergoalsinfo">
              <div class="foldergoalsinfostitle">
                  <b>${active}</b> goal${active>1?"s":""} active 
                  <p style="color:rgba(255,255,255,0.6)">Goals you're in are displayed here.</p>
              </div>
              <div id="activegoals">

              </div>
            </div>
            <div class="foldergoalsinfo">
              <div class="foldergoalsinfostitle">

                <b>${sleeping}</b> goal${sleeping>1?"s":""} sleeping
                <p style="color:rgba(255,255,255,0.6)">Goals you created but didn't activate are displayed here.</p>
              </div>
              <div id="sleepinggoals">

              </div>
            </div>
        </div>
        <div class="foldersecurity">
        <div class="fs-a">
        <p style="color:rgba(255,255,255,0.6);font-size:12px">Check if your password is secure enough.</p>
          <div class="fs" onclick="SecurityCheckUp()">
            <span class="material-symbols-outlined">
            lock
            </span>
            Security checkup
          </div>
        </div>
        <div class="fs-a">
        <p style="color:rgba(255,255,255,0.6);font-size:12px">${pj.sync ? "Disable":"Enable"} your project for it to be download.</p>
          <div class="fs" onclick="Synchronize()">
            <span class="material-symbols-outlined">
            recycling
            </span>
            Synchronize
          </div>
        </div>
        <div class="fs-a">
        <p style="color:rgba(255,255,255,0.6);font-size:12px">Open your project on Sprint+.</p>
          <div class="fs" onclick="OpenInFolder()">
            <span class="material-symbols-outlined">
            folder
            </span>
              Open in Folders
          </div>
        </div>
        </div>
        <div class="foldercontentstatus">
            <div class="fcs">
              <span
               class="material-symbols-outlined id="fcs-icon"
                style="position:absolute;left:10;color:${pj.star ? "rgba(248, 255, 0, 1)" : (pj.backed ? "rgba(186, 186, 186, 1)":"white")};display:flex;justify-content:center;align-items:center;width:fit-content;height:fit-content;                "
              >
                ${pj.star ? "star" : (pj.backed ? "hide_source":"blur_on")}
              </span>
              <span
               class="material-symbols-outlined id="fcs-icon"
                style="position:absolute;left:45;color:${pj.sync === true ? "green":"red"};display:flex;justify-content:center;align-items:center;width:fit-content;height:fit-content;                "
              >
                recycling
              </span>
            </div>
            <div class="fcs">
              <!-- <div class="fcs-status" style="width:20px;height:20px;border-radius:50%;background-color:${pj.status === "Offline" ? "grey" : (pj.status === "Online" ? "green" : "white")}">

              </div> -->
              Status : <input onchange="CheckStatus()" id="statusinput" placeholder="${pj.status}">
            </div>
        </div>
      </div>
    `;
    for (let i of Goals) {
      if (i.started) {
        document.getElementById('activegoals').innerHTML+=`
          <div class="goal" id="${i.name}">
            ${i.name}
            <span class="material-symbols-outlined">
            open_in_new
            </span>
          </div>
        `;
      } else {
        document.getElementById('sleepinggoals').innerHTML+=`
          <div class="goal" id="${i.name}">
            ${i.name}
            <span class="material-symbols-outlined">
            open_in_new
            </span>
          </div>
        `;
      }
    }
}

function CheckStatus() {
  starringPJ.status = document.getElementById('statusinput').value;
  localStorage.setItem(`Project : ${starringPJ.name}`,JSON.stringify(starringPJ));
  document.getElementById('statusinput').value = "";
  document.getElementById('statusinput').placeholder  = starringPJ.status;

}
function OpenInFolder() {
  OpenFolder({
    id: `pj-open-${starringPJ.name}`
  })
}

function Synchronize() {
  if (starringPJ.sync) {
    starringPJ.sync = true;
  }
  starringPJ.sync = !starringPJ.sync;
  localStorage.setItem(`Project : ${starringPJ.name}`,JSON.stringify(starringPJ));
  document.getElementById('alertInfos').innerHTML = `
      Synchronisation complete.<br>
      In your next data download, this project will ${starringPJ.sync ? "":"not"} be downloaded.
      <p id="ppinfos" style="font-size:12px;color:rgba(255,255,255,0.6)">

      </p>
  `;
  document.getElementById('alertInfos').style.visibility="visible";
  console.log(document.getElementById('alertInfos').style.visibility)
  for (let i = 0; i <= 4; i++) {
    setTimeout(()=> {
      console.log(i)
      document.getElementById('ppinfos').innerHTML = `This box will be hidden in ${4-i}s.`
      if (i==4) {
        document.getElementById('alertInfos').style.visibility="hidden";
        OpenFolderPannel({id:`Project : ${starringPJ.name}`})
      }
    },1000*i);
  }
}

function SecurityCheckUp() {
  let ps = starringPJ.password;

  let abc = "abcdefghijklmnopqrstuvwxyz";
  let nb = "123456789";
  let crctr = `&é(-è_çà)=^$ù*,;:!~#{[|\^@]}`;
  abc
  let strong = 0;
  if (ps.length > 12) {
    strong++;
  }
  let split = ps.split('');
  let characters = [0,0,0]
  console.log(split)

  for (let i = 0; i < split.length; i++) {
      if (abc.includes(characters[i])) {
        characters[0]++;
      }
      if (nb.includes(characters[i])) {
        characters[1]++;
      }
      if (crctr.includes(characters[i])) {
        characters[2]++;
      }
  }
  for (let i = 0; i < characters.length; i++) {
    if (characters[i]>4) {
      strong++;
    }
  }

  let value;
  if (0<strong<2) {
    value="not strong enough";
  } else if (2<=strong<4) {
    value="strong";
  } else if (strong>=4) {
    value="really strong";
  } else {
    value = "not strong"
  }
  document.getElementById('alertInfos').innerHTML = `
      Password checkup complete.<br>
      Result: Your password is ${value}.<br>
      ${strong<4?"Please make sure to enforce it.":"Nothing to worry about."}
      <br><br>
      <p id="ppasswordcheckup" style="font-size:12px;color:rgba(255,255,255,0.6)">
        
      </p>
  `;
  document.getElementById('alertInfos').style.visibility="visible";
  console.log(document.getElementById('alertInfos').style.visibility)
  for (let i = 0; i <= 6; i++) {
    setTimeout(()=> {
      console.log(i)
      document.getElementById('ppasswordcheckup').innerHTML = `This box will be hidden in ${6-i}s.`
      if (i==6) {
        document.getElementById('alertInfos').style.visibility="hidden";
      }
    },1000*i);
  }
}
/*
setTimeout(()=>{
    OpenNotifCenter();
    OnclickGoals()
},20)*/