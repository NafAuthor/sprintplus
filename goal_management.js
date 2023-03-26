
let Current_goal="_3";
let GoalItem = "";
let Goal_name = "";

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
      goal.words = parseInt(goal.words) + parseInt(document.getElementById('g-c-s-u-p').value);
      
      console.log(document.getElementById('g-c-s-u-p').value + " is value entered")
      console.log(goal.words + " is now value total")

      
      
      Current_goal = `_${GoalItem+1}`;
      let Start = new Date(goal.started_on);  
      let Time = parseInt(goal.duration)
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
      console.log('TODAY IS ' + Today)
      console.log('Time is ' + Time + " and today is" + TD)
      if (!goal.updates[TD]) {
        goal.updates[TD]=0;
      }
      goal.updates[TD] += parseInt(number);
      localStorage.setItem(`${pj.name}-goal-${parseInt(GoalItem)}`,JSON.stringify(goal))
  
  
      document.getElementById('g-c-s-u-p').value = "";
  
      OpenStats()
    }

}

function ShowUpOPT() {
  let s = document.getElementById('g-child-selector');
  let c = document.getElementById('child-viewer');
  if (s.style.visibility ==="visible") {
    s.style.visibility ="hidden";
    s.style.position="absolute";
    c.style.visibility="visible";
    c.style.position="relative";
  } else {
    c.style.visibility ="hidden";
    c.style.position="absolute";
    s.style.visibility="visible";
    s.style.position="relative";
  }
}
function GoalsShowUp() {
  Pannel_Status=false;


    document.getElementById('Main').innerHTML = `
    <div class="g-parent">
    <div class="openContainer">
    <span class="material-symbols-outlined" onclick="ShowUpOPT()">
    settings
    </span>
    </div>
    <div class="g-child-selector" id="g-child-selector">
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
              <option></option>
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
      </div>
      <div class="g-c-s-updt">
      <div class="g-c-s-updt-t">
        Goal update
      </div>
        <div class="g-c-s-u-inbox">
          <div class="g-c-s-u-p">
            <input placeholder="Words written" type="number" id="g-c-s-u-p">
          </div>
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
      <div class="g-c-s-management">
          <div class="g-c-s-m-c">
          <div id="error-no-goal">Error: no goal selected</div>
          <div class="g-c-s-m-c-t">
          Goal management
        </div>
        <button onclick="DelGoalStats()" class="DelToActualize">
        <span class="material-symbols-outlined">
                delete
                </span>
              <p>Delete the goal</p>
            </button>
            <button>
            <span class="material-symbols-outlined">
                edit
                </span>
                <p>Edit the goal</p>
                </button>
                <button onclick="StopGoal()">
                <span class="material-symbols-outlined">
                block
                </span>
                <p>Stop the goal</p>
                </button>
              <button onclick="OpenStats()">
              <span class="material-symbols-outlined">
              analytics
              </span>
              <p>Goal statistics</p>
            </button>
            <button onclick="DrawCurve()">
              <span class="material-symbols-outlined" >
              monitoring
              </span>
              <p>Goal progress</p>
            </button>
            <button onclick="DownloadCanvas()">
              <span class="material-symbols-outlined">
                chart_data
                </span>
                <p>Download board</p>
                </button>
          </div>
      </div>
    </div>
    <div class="huge-separator"></div>
    <div class="child-viewer" id="child-viewer">
    </div>
  </div>
    `;//rgba(26,41,80,0.3)


    let v = 0;
    const items = { ...localStorage };
    console.log(items)
    for (let item of Object.values(items)) {
        let i = JSON.parse(item);
        if (i.type) {
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
    console.log('UNSETID' + document.getElementsByClassName('DelToActualize').id)
      localStorage.removeItem(document.getElementsByClassName('DelToActualize').id);
      GoalsShowUp();
      document.getElementsByClassName('DelToActualize').id = '';

  } else {
    document.getElementById('error-no-goal').style.visibility = 'visible';

  }
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
    if (Current_goal!=el.id) {
        document.getElementById(el.id).style.borderColor = "rgba(160, 160, 160, 0.14)";
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
    console.log(`Project : ${text}`)
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
                    ${g.name}
                </div>
            `;
        } else {
            document.getElementById('g-c').innerHTML+=`
                <div id="_${i+1}" onclick="OpenFolder({id:'pj-open-${pj.name}'})">
                <span class="material-symbols-outlined" >
                    empty_dashboard
                    </span>
                    Manage goals
                </div>
            `;
        }
    } 
}
function u() {
    alert('AAAAAAAAAAAA')
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
    let daysUntil = goal.duration;
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






function OpenStats() {
  let goal = JSON.parse(localStorage.getItem(`${InCharge}-goal-${parseInt(Current_goal.replace('_',''))-1}`));
  if (  document.getElementById('update_empty')) {
    document.getElementById('update_empty').innerHTML = ""

  }
  if (!goal) {
    document.getElementById('error-no-goal').style.visibility = 'visible';
    return;
  }
  ShowUpOPT()

  /*
amount_of_words: "30000"
details: "Plus sur le drive nafauthor@gmail.com"
duration: "90"name: "Ecriture"
started: true
started_on: 1677925986433
updates
words: 2500
*/
  let Time = parseInt(goal.duration);
  let Start = new Date(goal.started_on);
  let Ends = new Date(Start.getTime()+86400000*Time);
  let WhatDayToday = new Date();

  WhatDayToday.setHours(0,0,0,0);
  Start.setHours(0,0,0,0);
  Ends.setHours(0,0,0,0);



  let Today = new Date();
  Today.setHours(0,0,0,0)
  console.log('Starting day is ' + Start);
  let ClockSet = false;
  for (let i = 0; i < Time; i++) {
    let d =Start.getTime() + 86400000*i;
    d = new Date(d);
    console.log(`${d.getDate()}/${d.getMonth()+1}`)
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
  console.log(new Date(Today) + " is today")

  let MaxWords = parseInt(goal.amount_of_words);
  let Words = goal.words;
  let NeededWords = MaxWords - Words;
  let TimeUntil = Time - Today - 1 ;

  console.log(TimeUntil + " days until the end")

  let WordsForToday = Math.round(NeededWords/TimeUntil);

  console.log('In need of ' + WordsForToday + " for today")

  let WordsWritten = [];
  let StrikedBefore = 0;
  let StrikeCount = 0;

  for (let [key,value] of Object.entries(goal.updates)) {
      WordsWritten.push(value);
      if (key-1!=StrikedBefore) {
        StrikeCount=0;
      }
      StrikeCount++;
      StrikedBefore=key;
  }
  
  console.log(WordsWritten)
  console.log(Time-TimeUntil)
  if(!WordsWritten[Time-TimeUntil-1]) {
    WordsWritten[Time-TimeUntil-1]=0;
  }

  

  let ProgressToday = Math.round((WordsWritten[Time-TimeUntil-1]*100)/WordsForToday);
  let ProgressOverall = Math.round((Words*100)/MaxWords);


  console.log(ProgressToday + " ==> amount of words made today")
  console.log(ProgressOverall + " ==> amount of words made overall")


  document.getElementById('child-viewer').innerHTML=`
    <div class="c-v-c">
      <div class="contain_infos">
      <div class="c-v-c-t">
        ${goal.name}
      </div>
        <div class="c-v-content-stats" id="c-v-content-stats">
          <div class="c-v-c-s">
            <div class="c-v-c-s-t">
              <span class="material-symbols-outlined">
              calendar_today
              </span>
              Todays progress
            </div>
            <div class="bar" id="todaybar">
              <div class="bar-hover" id="bartoday"></div>
              <div class="contentinfostats" id="contentinfostatstoday">
                ${ProgressToday > 100 ? "100%+":ProgressToday+"%"}
              </div>
              <div class="contentinfostatshidden" id="contentinfostatshiddentoday">
              ${WordsWritten[Today]+" / "+WordsForToday} words
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
          <div class="content-info-updates" id="content-info-updates">

          </div>
      </div>
    </div>
  `;  
  if (StrikeCount>7) StrikeCount=7;
  let Content = document.getElementById('c-v-content-stats');
  document.getElementById('bartoday').style.width = (Content.offsetWidth*ProgressToday)/100+"px";
  document.getElementById('barwhole').style.width = (Content.offsetWidth*ProgressOverall)/100+"px";
  for (let i = 1; i < StrikeCount+1; i++) {
    document.getElementById(`strikeBall${i}`).style.backgroundColor="FFC55C"
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
          <div class="updatedel" id="${key}" onclick="DelUpdate(this)">
            <span class="material-symbols-outlined" style="cursor:pointer">
            delete
            </span>
          </div>
        </div>
      `;
  }
}

function DelUpdate(el) {
  let goal = JSON.parse(localStorage.getItem(`${InCharge}-goal-${parseInt(Current_goal.replace('_',''))-1}`));
    console.log('e')
    goal.words-=goal.updates[parseInt(el.id)]
    delete goal.updates[parseInt(el.id)]
    console.log(goal)
    localStorage.setItem(`${InCharge}-goal-${parseInt(Current_goal.replace('_',''))-1}`,JSON.stringify(goal))
    OpenStats();
    return;
}

/*var ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  

  ctx.fillStyle = "#2c3f70";
  ctx.fill();
  ctx.roundRect(30, 30, 200, 200, [20, 20, 20, 20]);


  ctx.fill();
  ctx.roundRect(30, 250, 200, 200, [20, 20, 20, 20]);

  ctx.roundRect(280, 30, 670, 165, [20, 20, 20, 20]);
  ctx.fill();    
  ctx.roundRect(700, 250, 250, 165, [20, 20, 20, 20]);
  ctx.fill();    

  ctx.roundRect(275, 395, 400, 50, [20, 20, 20, 20]);
  ctx.fill();   

  ctx.roundRect(275, 230, 400, 140, [20, 20, 20, 20]);
  ctx.fill(); 

  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.roundRect(280+70/2, 145, 600, 10, [80, 80, 80, 80]);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();

  for (let i = 0 ; i < 7; i++) {
    ctx.beginPath();
    ctx.arc(350+i*88, 150, 6, 0, 7);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.fillStyle = "rgba(255, 183, 0, 1)";
    if (s!=0) {
      if (i<strike) {
        ctx.style = "green";
      }
    }
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "white";

    ctx.font = "15px serif";
    ctx.fillText(`Day ${i+1}`, 332.5+i*88,174)
  }
  


  ctx.fillStyle = "white";
  ctx.font = "25px serif";
  ctx.fillText(`${total_strike} days striked`, total_strike>9?545:555,92.5)


  ctx.font = "25px serif";
  let g = Math.round((done_today*100)/For_Today);
  if (isNaN(g) || g == null) {
    g = 0;
  }
  ctx.fillText(`${g > 100 ? "100%+":g+"%"}`, g>100?95:g>10?110:115, 140);

  let t = Math.round((c_words*100)/MaxWords);
  ctx.fillText(`${t > 100 ? "100%+":t+"%"}`, t>100?95:t>10?110:115, 360);


  ctx.font = "20px serif";
  ctx.fillText("Your progress today", 50, 55);
  ctx.fillText("Your progress overall", 45, 280);

  ctx.font = "30px serif";
  ctx.fillText(`Viewing: ${goal.name}`, 300, 430);
  ctx.font = "25px serif";
  ctx.fillText(`Overall details`, 412.5, 257.5);

  ctx.font = "15px serif";
  ctx.fillText(`${goal.duration-diffDays} days left (${Math.round(100-((goal.duration-diffDays)/goal.duration)*100)}% done)`, 325, 292.5);
  ctx.fillText(`${parseInt(goal.amount_of_words)-goal.words} words left (${Math.round(((goal.words)/parseInt(goal.amount_of_words))*100)}% done)`, 325, 330-7.5);
  ctx.fillText(`You striked ${ts} days (${Math.round((strike/ts)*100)}% better than now)`, 325, 360-7.5);


  ctx.font = '25px Material Icons';
  ctx.fillText('timelapse',290,300);
  ctx.fillText('inventory_2',290,330);
  ctx.fillText('list_alt',290,360);


  ctx.font = '25px Material Icons';
  ctx.fillText('timelapse',710,290);
  ctx.fillText('inventory_2',710,325);
  ctx.stroke()

  ctx.font = "20px serif";
  ctx.fillText(`${goal.duration} days long`,745,285);
  ctx.fillText(`${MaxWords} words to write`,745,320);
  ctx.stroke()

  let details = [[],[]];
  if (goal.details.length > 25 ) {
    let d = goal.details.split('');
    for (let i = 0; i < goal.details.length ; i++) {
      if (i < 25) {
        details[0].push(d[i]);
      } else{
        details[1].push(d[i]);
      }
    }
  } else {
    details[0]=goal.details.split('');
  }


  ctx.beginPath();
  ctx.arc(130, 130, 50, 0, 7);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#24335a';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(130, 350, 50, 0, 7);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#24335a';
  ctx.stroke();


  ctx.beginPath();
  ctx.arc(130, 130, 50, 0, (((done_today*100)/For_Today)*6.28)/100);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255, 183, 0, 1)';
  ctx.stroke();

  console.log(c_words, MaxWords)
  ctx.beginPath();
  ctx.arc(130, 350, 50, 0, (((c_words*100)/MaxWords)*6.28)/100);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255, 183, 0, 1)';
  ctx.stroke();

  ctx.font = "15px serif";

  ctx.fillStyle = '#CDE';
  ctx.fillText(`Sprint+ Generated`,10, 490);
  ctx.fillText(`A tool made by https://www.instagram.com/naf_author/`,625, 490);


*/