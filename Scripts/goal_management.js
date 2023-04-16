
let Current_goal="_3";
let GoalItem = "";
let Goal_name = "";

function TimeLapse(goal) {
  let today = new Date();
  today.setHours(0,0,0,0);
  let start = new Date(goal.started_on);
  start.setHours(0,0,0,0)
  let end = new Date();
  end.setDate(start.getDate() + parseInt(goal.duration));


  let timelapse = dateDiffInDays(today,end)
  


  console.log(`Timelapse is ${timelapse}`)

  return timelapse; // Amount of days including « today » and « end » before the actual end of the goal
}

function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function CheckEnd(goal) {
  if (goal.words >= goal.amount_of_words) {

      return true;
  }
  if (dateDiffInDays(new Date(goal.started_on), new Date())<0) {
      return true;
  }

}


function UpdateWords(goal, words) {
  let today = new Date();
  let start = new Date(goal.started_on);

  let day = dateDiffInDays(start,today);
  
  if (!goal.updates) goal.updates={};
  if (!goal.updates[day]) {
      goal.updates[day]=0;
  }
  goal.updates[day]+=parseInt(words);

  if (!goal.updatescount) goal.updatescount=0;

  goal.updatescount++;
  goal.words+=parseInt(words);

  let ifEnd = CheckEnd(goal);

  if (ifEnd) {
      return [true, goal];
  } else {
      return [false,goal];
  }
  
}
function UpdateGoal() {
    let el = document.getElementById('select-pj-goal');
    let number = document.getElementById('g-c-s-u-p').value;
    var text = el.options[el.selectedIndex].text;
    if (isNaN(number) 
    || (parseInt(number)==0) || 
    !localStorage.getItem(`Project : ${text}`)) {
      document.getElementById('update_empty').innerHTML = "Error: wrong value or no selected goal."
    } else {
      document.getElementById('update_empty').innerHTML = ""
      let pj = JSON.parse(localStorage.getItem(`Project : ${text}`));
      InCharge = pj.name;
      let goal = JSON.parse(localStorage.getItem(`${pj.name}-goal-${parseInt(GoalItem)}`));
      
      let W = UpdateWords(goal, number);
      if (W[0] === true) {
        goal.finished=true;
      }
      localStorage.setItem(`${pj.name}-goal-${parseInt(GoalItem)}`,JSON.stringify(goal))
      document.getElementById('g-c-s-u-p').value = "";
  
      OpenStats()
    }

}

function ShowUpOPT() {
  document.getElementById('openContainer').style.display="none";
  let s = document.getElementById('g-child-selector');
  let c = document.getElementById('child-viewer');
  document.getElementById('error-no-goal').style.visibility="hidden";
  document.getElementById('error-no-goal').style.position="absolute";

  if (s.style.visibility ==="visible") {
    s.style.visibility ="hidden";
    s.style.position="absolute";
    c.style.visibility="visible";
    c.style.position="relative";
  }
  else  {
    c.style.visibility ="hidden";
    c.style.position="absolute";
    s.style.visibility="visible";
    s.style.position="relative";
  }
}
function GoalsShowUp() {
  Pannel_Status=false;
  Current_goal="_3"
    document.getElementById('Main').innerHTML = `
    <div class="g-parent">
    <div class="openContainer" id="openContainer" onclick="ShowUpOPT()">
    <span class="material-symbols-outlined">
      keyboard_backspace
    </span>
    </div>
    <div class="g-child-selector" id="g-child-selector" style="visibility:visible">
      <div class="g-c-s-container">
        <div class="g-c-s-c-C">
          <div class="g-c-s-c-t">
            <span class="material-symbols-outlined">
            bookmark
            </span>
              <p>Select a project</p>
          </div>
          <div class="g-c-s-c-p">
            <select id="select-pj-goal" onchange="GoalSelect()">
            </select>
          </div>
        </div>
        <div class="g-c-s-c-C">
          <div class="g-c-s-c-t">
            <span class="material-symbols-outlined">
            beenhere
            </span>
            <p>Select a goal</p>
          </div>
          <div class="g-c-s-c-g">
            <div class="g-c" id="g-c">
            </div>
          </div>
        </div>
        <div class="g-c-s-updt">
        <div class="g-c-s-updt-t">
          <span class="material-symbols-outlined">
          update
          </span>
          Update objective
        </div>
        <div class="g-c-s-u-inbox">
          <div class="g-c-s-u-p">
            <input placeholder="Words written" type="number" id="g-c-s-u-p">
          </div>
          <div class="g-c-s-u-u">
          <button onclick="UpdateGoal()">
            <span class="material-symbols-outlined">
              add
              </span> 
          </button>
          <div id="update_empty"></div>
        </div>
        </div>

      </div>
      </div>
      <div class="g-c-s-management" id="g-c-s-management">
              ${ManagementContent}
          </div>
      </div>
    </div>
    <div class="huge-separator"></div>
    <div class="child-viewer" id="child-viewer">
    </div>
  </div>
    `;//rgba(26,41,80,0.3)
    document.getElementById('openContainer').style.display="none";




    AddPJS()
}

function AddPJS() {
  let v = 0;
  const items = { ...localStorage };
  console.log(items);
  let PJT = []
  for (let [i,k] of Object.entries(items)) {
      if (i.includes("Project")) {
          let K = JSON.parse(k);
          if(!K.star) K.star=false;
          if(!K.backed) K.backed=false;
          PJT.push(K);
      }
  }
  PJT.sort(function(a, b){
    if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;
  })
  PJT.sort(function(a,b){
    return b.star- a.star
  });
  PJT.sort(function(a,b){
    return a.backed- b.backed
  });   
  for (let i of PJT) {
    document.getElementById('select-pj-goal').innerHTML+=`
    <option>${i.name}</option>
    `;
    if ( v===0 ){
      document.getElementById('select-pj-goal').value =  i.name;
      document.getElementById('select-pj-goal').onchange();
      
      v = 1;
    }
  }
}

function ManageGoals() {
  GoalsShowUp();
  AddPJS()
  document.getElementById('select-pj-goal').value =  starringPJ.name;
  document.getElementById('select-pj-goal').onchange();
  starringPJ;
}


function EditGoal() {
  let g = JSON.parse(localStorage.getItem(document.getElementsByClassName('DelToActualize').id));
  if (g) {
      document.getElementById('g-c-s-management').innerHTML=`
      <div class="editGoalContent">
        <div class="EGC-c">
          <div class="EGC-c-t">
            <span class="material-symbols-outlined">
            edit_note
            </span>
            Name
          </div>
          <div class="EGC-c-d">
            Change the name of your goal
          </div>
          <div class="EGC-c-c">
            <input type="text" id="goalName">
          </div>
        </div>
        <div class="EGC-c">
          <div class="EGC-c-t">
            <span class="material-symbols-outlined">
            description
            </span>
            Description
          </div>
          <div class="EGC-c-d">
            Describe your goal with some words
          </div>
          <div class="EGC-c-c">
            <input type="textarea" id="goalDesc"></textarea>
          </div>
        </div>
        <div class="EGC-c">
          <div class="EGC-c-t">
            <span class="material-symbols-outlined">
            timer
            </span>
            Duration
          </div>
          <div class="EGC-c-d" id="GoalEndInHowMuchDays">
            In how much days will your goal end? 
          </div>
          <div class="EGC-c-c">
            <input type="number" id="goalDays" min="0">
          </div>
        </div>
        <div class="EGC-c">
          <div class="EGC-c-t">
            <span class="material-symbols-outlined">
            text_snippet
            </span>
            Words objective
          </div>
          <div class="EGC-c-d">
            How much words do you want to write? You already wrote ${g.words} words
          </div>
          <div class="EGC-c-c">
            <input type="number" id="goalWords" min="${g.words}">
          </div>
        </div>
        <div class="EGC-c">
          <div class="EGC-c-t">
            <span class="material-symbols-outlined">
            text_snippet
            </span>
            Current amount of words
          </div>
          <div class="EGC-c-d">
            This shows how much words you've already written
          </div>
          <div class="EGC-c-c"  id="CantModifyContent">
            <input type="number" id="currentamount" readonly="true">
          </div>
        </div>
        <div class="EGC-c">
          <div class="EGC-c-t">
            <span class="material-symbols-outlined">
            calendar_month
            </span>
            Started on
          </div>
          <div class="EGC-c-d">
            THis shows when your goal started.
          </div>
          <div class="EGC-c-c"  id="CantModifyContent">
            <input type="text" id="StartedOn" readonly="true">
          </div>
        </div>
        <button id="SaveGoalButton"> 
          Save goal
        </button>
        <div id="errorGoalSave" style="background-color:red;position:absolute;visibility:hidden">
          An error occured. Check for your content.
        </div>
      </div>
    `;
    document.getElementById('goalName').value=g.name;
    document.getElementById('goalDesc').value=g.details;
    document.getElementById('goalWords').value=parseInt(g.amount_of_words);
    document.getElementById('currentamount').value=g.words;

    let Start = new Date(g.started_on);  
    let Time = parseInt(g.duration)
    let Today = new Date();
    Today.setHours(0,0,0,0)
    let TD = 0;
    let ClockSet = false;
    console.log('TIME IS ' + Time)
    for (let i = 1; i < Time+1; i++) {
      let d =Start.getTime() + 86400000*i;
      d = new Date(d);
      console.log(`${d.getDate()}/${d.getMonth()+1}`)
      d.setHours(0,0,0,0)
      if (
        ClockSet != true && d.getDate() === Today.getDate() && 
        d.getMonth() === Today.getMonth() && 
        d.getFullYear() === Today.getFullYear() 
        )  {

          TD = i;
          ClockSet = true;
        }
    }

    Start.setDate(Start.getDate()+Time-TD)
    Start = new Date(Start)
    document.getElementById('GoalEndInHowMuchDays').innerHTML=`
      Your goal will end on ${
        Start.getDate()>9?Start.getDate():'0'+Start.getDate()
      }/${Start.getMonth()+1>9?Start.getMonth()+1:'0'+(Start.getMonth()+1)}/${Start.getFullYear()},
      which means in ${Time-TD} days
  
    `;
    document.getElementById('goalDays').value=parseInt(g.duration);
    document.getElementById('goalDays').onchange = function() {
        let Start = new Date(g.started_on);  
        let Time = parseInt(document.getElementById('goalDays').value);
        Start.setDate(Start.getDate()+Time-TD)
        Start = new Date(Start)
        document.getElementById('GoalEndInHowMuchDays').innerHTML=`
        Your goal will end on ${
          Start.getDate()>9?Start.getDate():'0'+Start.getDate()
        }/${Start.getMonth()+1>9?Start.getMonth()+1:'0'+(Start.getMonth()+1)}/${Start.getFullYear()},
        which means in ${TimeLapse(g)} days
    
      `;
    }



    let startedOn = new Date(g.started_on);
    document.getElementById('StartedOn').value=`${
      startedOn.getDate()>9?startedOn.getDate():'0'+startedOn.getDate()
    }/${startedOn.getMonth()+1>9?startedOn.getMonth()+1:'0'+(startedOn.getMonth()+1)}/${startedOn.getFullYear()}

    `
    ;

    document.getElementById('SaveGoalButton').onclick = function() {
      console.log(document.getElementById('goalName').length)
      console.log(document.getElementById('goalDesc').value)
      console.log(document.getElementById('goalWords').value)

      if (
        document.getElementById('goalName').value.length>0 &&
        document.getElementById('goalDesc').value &&
        document.getElementById('goalWords').value>=g.words
      ) {
        g.amount_of_words = document.getElementById('goalWords').value;
        g.name = document.getElementById('goalName').value;
        g.details = document.getElementById('goalDesc').value;
        g.duration = parseInt(document.getElementById('goalDays').value);
        localStorage.setItem(document.getElementsByClassName('DelToActualize').id,JSON.stringify(g));
        Current_goal="_3";
        GoalItem = "";
        Goal_name = "";
        GoalsShowUp();
      }
    }
  }
  else {
    document.getElementById('errorGoalSave').style.visibility = 'visible';
    document.getElementById('errorGoalSave').style.position = 'relative';

  }
}




function StopGoal() {
  let g = JSON.parse(localStorage.getItem(document.getElementsByClassName('DelToActualize').id));
  if (g) {
      g.started = false;
      localStorage.setItem(document.getElementsByClassName('DelToActualize').id,JSON.stringify(g))
      GoalsShowUp();
      document.getElementsByClassName('DelToActualize').id = '';

  } else {
    document.getElementById('error-no-goal').style.visibility = 'visible';

  }
}




function DelGoalStats() {
  if (localStorage.getItem(document.getElementsByClassName('DelToActualize').id)) {
      document.getElementById('g-c-s-management').innerHTML = `
        <div class="confirmPassword">
          Confirm your action with the password of your project:
          <input type="password" id="passwordProject">
          <button onclick="ConfirmGoalDel()">
              Confirm
          </button>
        </div>
      `;

  } else {
    document.getElementById('error-no-goal').style.visibility = 'visible';
  }
}

function ConfirmGoalDel() {
  let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`))
  if (pj) {
    if (document.getElementById('passwordProject').value==pj.password) {
      localStorage.removeItem(document.getElementsByClassName('DelToActualize').id);
      document.getElementsByClassName('DelToActualize').id = '';
    }
  } 
  Current_goal="_3";
  GoalItem = "";
  Goal_name = "";
  GoalsShowUp();
}
function DownloadCanvas() {
  let canvas = document.getElementById('pjcurve');
  document.getElementById('error-no-goal').style.visibility = 'hidden';
  var image = canvas.toDataURL();
  // Create a link
  var aDownloadLink = document.createElement('a');
  // Add the name of the file to the link
  aDownloadLink.download = 'SPRINT+ progress curve.png';
  // Attach the data to the link
  aDownloadLink.href = image;
  // Get the code to click the download link
  aDownloadLink.click();
}


function FixGoal(el) {
  document.getElementById('error-no-goal').style.visibility = 'hidden';
  console.log(Current_goal, el.id)
    if (Current_goal!=el.id) {
        document.getElementById(el.id).style.borderColor = "rgba(255, 255, 255, 0.3)";
        Current_goal = el.id;
        GoalItem = parseInt(el.id.replace("_",""))-1;
        document.getElementsByClassName('DelToActualize').id = `${InCharge}-goal-${parseInt(el.id.replace('_',''))-1}`;
        console.log('SETID ' + document.getElementsByClassName('DelToActualize').id)
    } else {
        Current_goal="_3";
        document.getElementById(el.id).style.borderColor = "";
        document.getElementsByClassName('DelToActualize').id = '';
        console.log('UNSETID')
        GoalItem = 0;
    }
    document.getElementById(el.id === "_1" ? "_2" : "_1").style.borderColor = "";

}

function GoalSelect() {
    let el = document.getElementById('select-pj-goal');
    var text = el.options[el.selectedIndex].text;
    console.log(el.selectedIndex, el.options[el.selectedIndex].text)

    let pj = JSON.parse(localStorage.getItem(`Project : ${text}`));
    InCharge = pj.name;


    document.getElementById('g-c').innerHTML="";

    for (let i=0;i<2;i++) {
        let g = JSON.parse(localStorage.getItem(`${pj.name}-goal-${i}`));
        if (g && g.started) {
            document.getElementById('g-c').innerHTML+=`
                <div id="_${i+1}" onclick="FixGoal(this)">
                <span class="material-symbols-outlined">
                    school
                    </span>
                    <p> ${g.name} </p>
                </div>
            `;
        } else {
            document.getElementById('g-c').innerHTML+=`
                <div id="_${i+1}" onclick="OpenFolder({id:'pj-open-${InCharge}'})">
                <span class="material-symbols-outlined" >
                    empty_dashboard
                    </span>
                   <p> Manage goals </p>
                </div>
            `;
        }
    } 


}



function GetWidth(a) {
  var w = window.innerWidth;
  w = (w*390)/525;
  return (a*w)/980;
}
function GetHeight(a) {
  var w = window.innerWidth;
  w = (w*390)/525;
  h= (w*500)/980;
  return (h*a)/500 ;
}

function DrawCurve() {
  document.getElementById('child-viewer').innerHTML=`<canvas id="pjcurve" width="980" height="500" style="background-color: rgba(26,41,80,0.3);"></canvas> `;
  var w = window.innerWidth;
  var canvas = document.getElementById('pjcurve');
  w = (w*390)/525;
  if (w>=320 && w<=420) {
    var h = (w*500)/980;
    canvas.width  = w;
    canvas.height = h;
  } else {
    canvas.width  = 980;
    canvas.height = 500;
  }
  if (  document.getElementById('update_empty')) {
    document.getElementById('update_empty').innerHTML = "";
  }
  ShowUpOPT()

    let goal = JSON.parse(localStorage.getItem(`${InCharge}-goal-${parseInt(Current_goal.replace('_',''))-1}`));
    if (!goal) {
      document.getElementById('error-no-goal').style.visibility = 'visible';
      return;
    }
    let daysUntil = parseInt(goal.duration);
    let MaxWords = parseInt(goal.amount_of_words);
    let updates = goal.updates;

    var canvas = document.getElementById("pjcurve");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#CDE";
    
    ctx.fillRect(GetWidth(100), GetHeight(390), GetWidth(700), 2);
    ctx.fillRect(GetWidth(100), GetHeight(80), 2, GetHeight(310));

    ctx.font = "15px serif";
    ctx.fillText("Words (K)", GetWidth(80), GetHeight(70));
    ctx.fillText("Time (D)", GetWidth(790), GetHeight(380));


    for (let i = 0; i < 11;i+=(daysUntil/(daysUntil/10))/10) {
      console.log(i*(daysUntil/10))
        ctx.fillText(Math.floor(i*(daysUntil/10)),GetWidth(97+i*60), GetHeight(415+(500-canvas.height)/8));
        ctx.fillRect(GetWidth(100+i*60), GetHeight(390), 2, 8);
    }
    for (let i = 0; i < 11; i+=1) {
        ctx.fillText(Math.floor((i*((MaxWords/10)/1000))),GetWidth(((canvas.width*76)/980)), GetHeight(395+i*-30));
        ctx.fillRect(GetWidth(92), GetHeight(90+i*30), 8, 2);
    }
    function DrawCircle(ctx, x,y) {
      ctx.beginPath();
      ctx.arc(x+1, y+1, 2, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'red';
      ctx.stroke();
    }



    let lastx = GetWidth(100);
    let lasty = GetHeight(390);
    for (let update of Object.keys(updates)) {
      console.log(updates[update])
      let x = GetWidth(100) + (update*GetWidth(50))/(daysUntil/10);
      let y = GetHeight(390) - ((updates[update]/1000)*GetHeight(29.5))/((MaxWords/10)/1000);


      ctx.beginPath();
      ctx.strokeStyle = '#CDE';
      ctx.lineWidth = 0.5;
      ctx.quadraticCurveTo(lastx+1,lasty+1,x+1,y+1);
      ctx.stroke();

      DrawCircle(ctx, x,y);

      lastx = x;
      lasty = y;

      
    }
    ctx.fillStyle = '#CDE';
    ctx.fillText(`Sprint+ Generated`,GetWidth(10), GetHeight(490));
    //ctx.fillText(`A tool made by https://www.instagram.com/naf_author/`,GetWidth(625), GetHeight(490));
    //ctx.font = "25px serif"
    //ctx.fillText(`${goal.name}: write ${MaxWords} words in ${daysUntil} days`, GetWidth(300), GetHeight(50));

}





function ChangeGoalFeedback(el) {
    let project = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    for (let i = 0 ; i < project.archived_goals.length;i++) {
      if (project.archived_goals[i].name === el.id) {
        project.archived_goals[i].feedback = document.getElementById('feedbackarea').value;
        localStorage.setItem(`Project : ${InCharge}`,JSON.stringify(project));
        return;
      }
    }
}
function OpenStats(y=false) {
  let project = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
  let goal;
  if (y===false) {
    goal = JSON.parse(localStorage.getItem(`${InCharge}-goal-${parseInt(Current_goal.replace('_',''))-1}`));
  } else {
    for (let G of project.archived_goals) {
      if (G.name === y.id) {
        goal= G;
        document.getElementById('Main').innerHTML = `
        <div class="g-parent">
          <div class="child-viewer" id="child-viewer">
          </div>
        </div>`
      }
    }
  }
  if (  document.getElementById('update_empty') && y===false) {
    document.getElementById('update_empty').innerHTML = ""

  }
  if (!goal && y === false) {
    document.getElementById('error-no-goal').style.visibility = 'visible';
    return;
  }
  if (y===false) {
    ShowUpOPT()
  }
  let Time = parseInt(goal.duration);
  let Start = new Date(goal.started_on);
  let Ends = new Date(Start.getTime()+86400000*Time);
  Start.setHours(0,0,0,0);
  Ends.setHours(0,0,0,0);



  let Today = new Date();
  Today.setHours(0,0,0,0);
  let td = new Date();
  td.setHours(0,0,0,0);
  let ClockSet = false;
  for (let i = 0; i < Time; i++) {
    let d =Start.getTime() + 86400000*i;
    d = new Date(d);
    d.setHours(0,0,0,0)
    if (
      ClockSet != true && d.getDate() === Today.getDate() && 
      d.getMonth() === Today.getMonth() && 
      d.getFullYear() === Today.getFullYear() 
      )  {
        Today = i;
        ClockSet = true;
      }
  }

  let MaxWords = parseInt(goal.amount_of_words);
  let Words = goal.words;
  // Amount of words missing to finish the goal:
  let NeededWords = MaxWords - Words;
  console.log(NeededWords + " words")

  // How much day till the end of the goal:
  let TimeUntil = TimeLapse(goal);
  console.log(TimeUntil)

  // How much words for today:
  let WordsForToday = Math.round(NeededWords/TimeUntil);

  let WordsWritten = [];
  let StrikedBefore = 0;
  let StrikeCount = 0;

  for (let [key,value] of Object.entries(goal.updates)) {
      WordsWritten.push(parseInt(value));
      if (key-1!=StrikedBefore) {
        StrikeCount=0;
      }
      StrikeCount++;
      StrikedBefore=key;
  }
  
  if(!WordsWritten[goal.duration-TimeUntil]) {
    WordsWritten[goal.duration-TimeUntil]=0;
  }

  

  let ProgressToday = Math.round((WordsWritten[goal.duration-TimeUntil]*100)/WordsForToday);
  let ProgressOverall = Math.round((Words*100)/MaxWords);




  if (y===false) document.getElementById('openContainer').style.display="flex";

  if (goal.finished && y==false) {
    let project = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    if (!project.archived_goals) {
      project.archived_goals = [];
    }
    goal.finished_on = new Date();
    goal.finished_on.setHours(0,0,0,0)
    project.archived_goals.push(goal);
    localStorage.removeItem(`${InCharge}-goal-${parseInt(Current_goal.replace('_',''))-1}`);
    localStorage.setItem(`Project : ${InCharge}`,JSON.stringify(project));
  }
  document.getElementById('child-viewer').innerHTML=`
    <div class="c-v-c">
      <div class="c-v-c-t">
        ${goal.name} - <i>${InCharge}</i>
      </div>
      <div class="finishedgoal" style="display:${goal.finished?"inline":"none"}">
        <div class="finishedcongratulation">
            <div class="finishedtitle">
                Congratulations, ${JSON.parse(localStorage.getItem('user')).name}!<br>
                You did it! You wrote ${goal.words} words in ${goal.duration} days!<br>
                <p>
                  What an advancement. What will you do next?<br>
                  Publish what you write? Start new objectives?<br>
                  We hope the best for you!
                </p><br>
                <div class="textareafeedback" id="${goal.name}" oninput="ChangeGoalFeedback(this)">
                  <textarea id="feedbackarea" placeholder="My experience during this goal">${goal.feedback?goal.feedback:""}</textarea>
                </div>
            </div>
            <div class="finisheddesc">
                This goal is officialy finished. It is archived in your project 
                files, and you will not be able to update it anymore. It will be stopped,
                and won't be reseted.
            </div>
        </div>
        <div class="firework"></div>
        <div class="firework"></div>
        <div class="firework"></div>
        <div class="firework"></div>
        <div class="firework"></div>
        <div class="firework"></div>
        <img src="Images & Icons/party.png">

      </div>
      <div class="contain_infos">
      <div class="c-v-c-mt">
        Progress
      </div>
        <div class="c-v-content-stats" id="c-v-content-stats">
          <div class="c-v-c-s">
            <div class="c-v-c-s-t">
              <span class="material-symbols-outlined">
              calendar_today
              </span>
              Today progress
            </div>
            <div class="bar" id="todaybar">
              <div class="bar-hover" id="bartoday"></div>
              <div class="contentinfostats" id="contentinfostatstoday">
                ${goal.finished?"":(ProgressToday > 100 ? "100%+":ProgressToday+"%")}
              </div>
              <div class="contentinfostatshidden" id="contentinfostatshiddentoday">
              ${goal.finished?"":(WordsWritten[goal.duration-TimeUntil]+" / "+WordsForToday + "words")} 
              </div>
            </div>

          </div>
          <div class="c-v-c-s">
              <div class="c-v-c-s-t">
              <span class="material-symbols-outlined">
              clock_loader_60
              </span>
              Overall progress
            </div>
            <div class="bar" id="wholebar">
              <div class="bar-hover" id="barwhole"></div>
              <div class="contentinfostats" id="contentinfoswhole">
              ${ProgressOverall > 100 ? "100%+":ProgressOverall+"%"}
              </div>
              <div class="contentinfostatshidden" id="contentinfoswholehidden">
                ${Words} / ${MaxWords} words
              </div>
            </div>
          </div>
          <div class="c-v-c-s">
              <div class="c-v-c-s-t">
                <span class="material-symbols-outlined">
                speed
                </span>
                Strike
              </div>
              <div class="strikeDays">
                Your strike is ${StrikeCount} day${StrikeCount>1?"s":""} long
              </div>
              <div class="strikeBallContent">
                <div class="strikeBall" id="strikeBall1"></div>
                <div class="strikeBall" id="strikeBall2"></div>
                <div class="strikeBall" id="strikeBall3"></div>
                <div class="strikeBall" id="strikeBall4"></div>
                <div class="strikeBall" id="strikeBall5"></div>
                <div class="strikeBall" id="strikeBall6"></div>
                <div class="strikeBall" id="strikeBall7"></div>
                <div class="strikebar"></div>
              </div>
          </div>
        </div>
      </div>
      <div class="content-infos">
        <div class="c-v-c-mt">
          Informations
        </div>
          <div class="content-infos-infos">
              <div class="content-desc">
              <span class="material-symbols-outlined">
              description
              </span>
              ${goal.details}
            </div>
            <div class="content-stats">
              <span class="material-symbols-outlined">
              percent
              </span>
              Objective : ${MaxWords} words
            </div>
            <div class="content-stats">
              <span class="material-symbols-outlined">
              timer
              </span>
              Ends in ${TimeUntil} days (${
                Ends.getDate()>9?Ends.getDate():"0"+Ends.getDate()
              }/${
                Ends.getMonth()+1>9?Ends.getMonth()+1:"0"+(Ends.getMonth()+1)
              }/${Ends.getFullYear()})
            </div>
          </div>
          <div id="buttonpjjump">
            Delete & change status in ${InCharge}
          </div>
      </div>
      <div class="content-info-updates" id="content-info-updates">
        <div class="c-v-c-mt">
          Updates
        </div>
      </div>
    </div>
  `;  
  if (StrikeCount>7) StrikeCount=7;
  let Content = document.getElementById('c-v-content-stats');
  if(y===false) {
    document.getElementById('bartoday').style.width = (Content.offsetWidth*ProgressToday)/100+"px";
    document.getElementById('barwhole').style.width = (Content.offsetWidth*ProgressOverall)/100+"px";
    for (let i = 1; i < StrikeCount+1; i++) {
      document.getElementById(`strikeBall${i}`).style.backgroundColor="FFC55C"
    }
  }

  for (let [key,value] of Object.entries(goal.updates)) {
      document.getElementById('content-info-updates').innerHTML+=`
        <div class="update">
          <div class="updateday">
            Day ${parseInt(key)+1}
          </div>
          <div class="updatecount">
            ${value}
          </div>
          <div class="updatedel" id="${key}" onclick="DelUpdate(this)" style="visibility:${goal.finished?"hidden":"visible"}">
            <span class="material-symbols-outlined" style="cursor:pointer">
            delete
            </span>
          </div>
        </div>
      `;
  }
  if (y!=false) {
    document.getElementById('child-viewer').style.visibility = "visible";
    document.getElementById('child-viewer').style.position = "relative";

  }
}

function DelUpdate(el) {
  let goal = JSON.parse(localStorage.getItem(`${InCharge}-goal-${parseInt(Current_goal.replace('_',''))-1}`));
    goal.words-=goal.updates[parseInt(el.id)]
    delete goal.updates[parseInt(el.id)]
    console.log(goal)
    localStorage.setItem(`${InCharge}-goal-${parseInt(Current_goal.replace('_',''))-1}`,JSON.stringify(goal))
    OpenStats();
    return;
}
