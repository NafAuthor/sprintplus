let Project_form = `
<div class="whole-pj-form">
<div class="pj-form">

  <div class="title" id="form-intro-title">
    Create a new project
  </div>
  <div class="new-pj-contain-el">
  <div id="mandatory">
  Mandatory
  </div>
  <div id="mandatorybar">

  </div>
    <div class="p-n" id="p-bx">
      <div class="p-n-t"id="form-title" >
        <span class="material-symbols-outlined">
          history_edu
          </span>
        Give your project a name
      </div>
      <input type="text" id="name" autocomplete="off" placeholder="Enter a name">
    </div>
    <div class="p-d"id="p-bx">
      <div class="p-d-t"id="form-title">
        <span class="material-symbols-outlined">
          info
          </span>
        What is it about?
      </div>
      <textarea id="about" placeholder="Describe your project!"></textarea>
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
  </div>
  <div class="new-pj-contain-sep"></div>
  <div class="new-pj-contain-el">
  <div id="optionnal">
  Optionnal
  </div>
  <div id="optionnalbar">

  </div>
  <div class="p-d-i"id="p-bx">
    <div class="p-d-i-t" id="form-title">
      <span class="material-symbols-outlined">
        edit_note
        </span>
      Add a link to your project
    </div>
    <input type="text" id="more" autocomplete="off" placeholder="Enter a link to any type of content">
  </div>
  <div class="p-d-p"id="p-bx">
    <div class="p-d-p-t" id="form-title">
      <span class="material-symbols-outlined">
        edit_note
        </span>
      Add a cover (link, A4)
      <div class="howtoaddLink" onclick="OpenCoverHelp()">
      How to add a cover
      </div>
    </div>
    <input type="text" id="cover" autocomplete="off" placeholder="Enter a link to an image">
  </div>
  </div>
  <div class="infomdp">
    <span class="material-symbols-outlined">
    info
    </span>
    Your project password is your account password. The security section of your project will 
    provide you a place to change it if you wish to.
  </div>
  <div class="n-p-s">
    <button type="button" onclick="CreateProject()">
      Create
    </button>
  </div>
</div>
`


let update = `
<div class="Progress">
<div class="pj">
  <div class="prg-title">
    What project did you work on ?
  </div>
  <div class="prg-box">
    <select name="prg-box" id="prg-box">
      <option value="Nous, moi et le monde">Nous, moi et le monde</option>
      <option value="Sprint+">Sprint+</option>
  </select>
  </div>
</div>
<div class="sprt">
  <div class="separator">
  </div>
</div>
<div class="feel">
  <div class="prg-title">
    How do you feel now?
  </div>
  <div class="feel-box">
    <div class="feel-e">
      <span class="material-symbols-outlined">
        sentiment_satisfied
        </span>
    </div>
    <div class="feel-e">
      <span class="material-symbols-outlined">
        add_reaction
        </span>
    </div>
    <div class="feel-e">
      <span class="material-symbols-outlined">
        sentiment_dissatisfied
        </span>
    </div>
  </div>
</div>
<div class="sprt">
  <div class="separator">
  </div>
</div>
<div class="add">
  <div class="prg-title">
    Any notes you might want to keep in mind for the next time you come here:
  </div>
  <textarea></textarea>
</div>
<div class="prg-box-updt">
    <b>
      <span class="material-symbols-outlined"> cloud_sync </span>
    </b>
    <h2>Update your work</h2>
  </div>
</div>
`


let goal_container = `
<div class="goals-container">
<div class="g-b">
  <button>
    <span class="material-symbols-outlined">
      add
    </span>
    Create a new goal
  </button>
  <button>
    <span class="material-symbols-outlined">
      cancel
    </span>
    Ignore this option
  </button>
</div>
<div class="g-b-new">
  <div class="g-b-n-t">
    <div class="g-b-n-t-t">
      <div class="ifo">
        <span class="material-symbols-outlined">
          history_edu
          </span>
          Goal name
      </div>
      <input>
    </div>
    <div class="g-b-n-t-t">
      <div class="ifo">
        <span class="material-symbols-outlined">
          timer
          </span>
          Duration
      </div>
      <input type="number" id = "goal-duration">
      <div class="g-b-n-t-t">
        <div class="ifo">
          <span class="material-symbols-outlined">
            flag
            </span>
            Goal
        </div>
        <textarea id="goal-details"></textarea>
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

      <button>
        <span class="material-symbols-outlined">
          offline_pin
          </span>
      </button>
    </div>
  </div>
</div>
</div>
`

let Goal = `
<div class="g-b-new" id="g-b-new">
  <div class="g-b-n-t">
    <div class="g-b-n-t-t">
      <div class="ifo">
        <span class="material-symbols-outlined">
          history_edu
          </span>
          Goal name
      </div>
      <input id ="goal-name" maxlength="20"></input>
    </div>
    <div class="g-b-n-t-t">
      <div class="ifo">
        <span class="material-symbols-outlined">
          timer
          </span>
          Duration
      </div>
      <input type="number" id = "goal-duration"max="999">
      <div class="g-b-n-t-t">
        <div class="ifo">
          <span class="material-symbols-outlined">
            flag
            </span>
            Goal
        </div>
        <textarea id="goal-details" maxlength="50"></textarea>
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

      <button onclick="Goal_Save();">
        <span class="material-symbols-outlined">
          offline_pin
          </span>
        Save
      </button>
    </div>
  </div>
</div>
`

let all_contain = `
<div class="menuContainer">
<img src="Images & Icons/Sprint+ blank.png">
<div class="MC-i" onclick="Menu()">
    <div class="MC-i-t">
        <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" width="25"><path d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm-60 60V456l320-240 320 240v480H530V686H430v250H160Zm320-353Z"/></svg>
        <p>Home</p>
    </div>
    <div class="MC-i-d">
        Home page
    </div>
</div>  
<div class="MC-i" onclick="ProjectShowUp()">
    <div class="MC-i-t">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M141 896q-24 0-42-18.5T81 836V316q0-23 18-41.5t42-18.5h280l60 60h340q23 0 41.5 18.5T881 376v460q0 23-18.5 41.5T821 896H141Zm0-580v520h680V376H456l-60-60H141Zm0 0v520-520Z"/></svg>
        <p>Projects</p>
    </div>
    <div class="MC-i-d">
        Manage your projects
    </div>
</div>  
<div class="MC-i" onclick="OpenEditor()">
    <div class="MC-i-t">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M200 936V271q0-24 18-42t42-18h440q24 0 42 18t18 42v665L480 816 200 936Zm60-91 220-93 220 93V271H260v574Zm0-574h440-440Z"/></svg>
        <p>Write</p>
    </div>
    <div class="MC-i-d">
        Write your stories
    </div>
</div>  
<div class="MC-i">
    <div class="MC-i-t">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M368 976V438q-95-20-152.5-85.5T158 200h60q0 78 60.5 131T426 384h100q38 0 56 6.5t46 30.5l184 172-43 43-185-174v514h-60V721h-96v255h-60Zm108.08-654q-30.08 0-51.58-21.42-21.5-21.421-21.5-51.5 0-30.08 21.42-51.58 21.421-21.5 51.5-21.5 30.08 0 51.58 21.42 21.5 21.421 21.5 51.5 0 30.08-21.42 51.58-21.421 21.5-51.5 21.5Z"/></svg>
        <p>Editor</p>
    </div>
    <div class="MC-i-d">
        Manage your characters
    </div>
</div>  

<div class="MC-i">
    <div class="MC-i-t">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 976q-27 0-47.5-13T406 927h-14q-24 0-42-18t-18-42V724q-66-43-104-110t-38-148q0-121 84.5-205.5T480 176q121 0 205.5 84.5T770 466q0 81-38 148T628 724v143q0 24-18 42t-42 18h-14q-6 23-26.5 36T480 976Zm-88-109h176v-44H392v44Zm0-84h176v-40H392v40Zm-9-100h74V546l-92-92 31-31 84 84 84-84 31 31-92 92v137h74q60-28 96.5-87T710 466q0-97-66.5-163.5T480 236q-97 0-163.5 66.5T250 466q0 71 36.5 130t96.5 87Zm97-176Zm0-48Z"/></svg>
        <p>Ploting</p>
    </div>
    <div class="MC-i-d">
        Plot your stories
    </div>
</div>   

<div class="MC-i" onclick="GoalsShowUp()">
    <div class="MC-i-t">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M160 896V576h140v320H160Zm250 0V256h140v640H410Zm250 0V456h140v440H660Z"/></svg>
        <p>Progress</p>
    </div>
    <div class="MC-i-d">
        Manage your progress
    </div>
</div>  
<div class="MC-i" onclick="ShowUpToDo()">
    <div class="MC-i-t">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m434 801 229-229-39-39-190 190-103-103-39 39 142 142ZM220 976q-24 0-42-18t-18-42V236q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554V236H220v680h520V422H551ZM220 236v186-186 680-680Z"/></svg>
        <p>To-Do</p>
    </div>
    <div class="MC-i-d">
        Work time!
    </div>
</div>  
<div class="MC-i" onclick="OpenInfos()">
    <div class="MC-i-t">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M222 801q63-44 125-67.5T480 710q71 0 133.5 23.5T739 801q44-54 62.5-109T820 576q0-145-97.5-242.5T480 236q-145 0-242.5 97.5T140 576q0 61 19 116t63 109Zm257.814-195Q422 606 382.5 566.314q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314 566.5q-39.686 39.5-97.5 39.5Zm.654 370Q398 976 325 944.5q-73-31.5-127.5-86t-86-127.266Q80 658.468 80 575.734T111.5 420.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5 207.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5 731q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480 916q55 0 107.5-16T691 844q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480 916Zm0-370q34 0 55.5-21.5T557 469q0-34-21.5-55.5T480 392q-34 0-55.5 21.5T403 469q0 34 21.5 55.5T480 546Zm0-77Zm0 374Z"/></svg>
        <p>Account</p>
    </div>
    <div class="MC-i-d">
        Spooky place :O
    </div>
</div>  
</div>
`;


let featured = `
<div class="featured">
                <div class="ft-t">
                  Sprint+ Support Server
                </div>
                <div class="ft-d">
                  Looking for suggestions? Want to report bugs?<br>
                  Join Sprint+ Discord server to stay tuned about exciting news!
                </div>
                <button onclick="window.open('https://discord.gg/72tACSk8Jd')">
                  Join this discord server
                </button>
              </div>
`;


let Main = `
<div class="main-more-content">
<div class="utilities">
  <div class="m-m-i">
    <div class="f-t">
      <span class="material-symbols-outlined">
        feed
        </span>
        <p style="margin:unset">What's going on?</p>
        <div class="f-t-center">
        <span class="material-symbols-outlined" onclick="OpenNotifCenter()">
        open_in_new
        </span>
      </div>
    </div>
    <div class="m-m-td" id="m-m-td">
    </div>

  </div>
  <div class="more">
  <div class="mor-t">
    <span class="material-symbols-outlined">
      auto_awesome
      </span>
    <p style="margin:unset">Your favorite stories</p>
    <div class="learnmorefavsto" onclick="learnmorefavsto()">
      Learn more
    </div>
  </div>
  <div class="mor-st" id="mor-st">
    
  </div>
</div>
</div>

</div>
`;
/*

<div class="featuring">
<div class="f-t">
  <span class="material-symbols-outlined">
    groups
    </span>
  Sprint+ is featuring...
</div>
<div class="f-f">
<div class="featured">
<div class="ft-t">
  Sprint+ Support Server
</div>
<div class="ft-d">
  Looking for suggestions? Want to report bugs?<br>
  Join Sprint+ Discord server to stay tuned about exciting news!
</div>
<button onclick="window.open('https://discord.gg/72tACSk8Jd')">
  Join this discord server
</button>
</div>
  <div class="f-more">
    <div class="f-m-d">
      Looking for a feat?
    </div>
    <button id="contactteam" onclick="window.open('https://www.instagram.com/sprintplus_app/',target='_blank')">
      Contact our team
    </button>
  </div>
</div>
*/

function learnmorefavsto() {
    localStorage.setItem('helpItem', "feat");
    window.open('help.html')
}

let goaled = false;



function OpenWelcome() {
    document.getElementById('p-p-title').innerHTML = "Welcome to Sprint+!"
    document.getElementById('Main').innerHTML = `
    <div class="welcome-f">
      <div class="w-t">
      Welcome, dear writer!
      </div>
      <div class="w-info">
        You are about to register yourself into Sprint+.<br><br>
        First, you must know that this website is a project made
        by a private person.<br>
        None of your datas are used by us or any other person.
        All your datas are stored in your browser, and are 
        known only by you and your browser.<br><br>We do not sell,
        use, lookup, save, or see any of your datas.<br<br>In
        this way, all the passwords you will set will have a 
        minimal amount of security: anyone with a bit of coding 
        experience will be able to find your passwords. However,
        keep in mind that this doesn't change anything to the point
        of the website, and will not affect in any way your use of 
        Sprint+, because no one would steal your progress.
        <br><br>
        Sprint+ and our team are not responsible of any corruption
        due to a tricky modification of your datas on your side. 
        You are responsible of the way you modify your datas.
        <br><br>
        For more informations, click on the button at the right (top) of the main menu page.
        <br><br>
        Now, please, complete some informations about you, so we 
        can setup your whole session.<br><br><br>
        <div class="q">
        <div class="q-q">
          <div class="q-t">
            What is your name?
          </div>
          <input autocomplete="off" type="text" id="name" style="background-color:rgba(31, 48, 92, 0.7)">
        </div>
        <div class="q-q">
          <div class="q-t" >
            Enter a secure password (6 characters min.)
          </div>
          <input autocomplete="off" type="text"id="password" style="background-color:rgba(31, 48, 92, 0.7)">
        </div>
        </div>
      </div>
      <button id="go" onclick="GoFor()">
        Create a session
        <span class="material-symbols-outlined">
        login
        </span>
      </button>
    </div>
  `;
}



let ManagementContent = `
<div class="g-c-s-m-c">
<div id="error-no-goal">Error: no goal selected</div>
<div class="g-c-s-m-c-t">
Goal management
</div>
<button onclick="EditGoal()">
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
      <button onclick="DelGoalStats()" class="DelToActualize">
      <span style="color:#EA3C12"class="material-symbols-outlined">
            delete
            </span>
          <p>Delete the goal</p>
      </button>
`;