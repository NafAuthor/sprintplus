let Project_form = `
<div class="whole-pj-form">
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
    <input type="text" id="name" autocomplete="off">
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
    <input type="date" id="end" >
  </div>
  <div class="p-d-i"id="p-bx">
    <div class="p-d-i-t" id="form-title">
      <span class="material-symbols-outlined">
        edit_note
        </span>
      Add a link to your project
    </div>
    <input type="text" id="more" autocomplete="off">
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
    <input type="text" id="cover" autocomplete="off">
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
<div class="all-c-p"  onclick="Menu()">
<span class="material-symbols-outlined">
  home
</span>
<div class="all-c-p-d">
  Home
</div>
</div>
<div class="all-c-p"  onclick="GoalsShowUp()">
  <span class="material-symbols-outlined">
    monitoring
  </span>
  <div class="all-c-p-d">
    Progress
  </div>
</div>
<div class="all-c-p" onclick="ProjectShowUp()">
<span class="material-symbols-outlined">
  folder
  </span>
<div class="all-c-p-d">
  Projects
</div>
</div>
<div class="all-c-p" onclick="ShowUpToDo()">
<span class="material-symbols-outlined" >
  pending_actions
  </span>
<div class="all-c-p-d">
  To-Do
</div>
</div>
<div class="all-c-p" onclick="OpenInspiration()">
<span class="material-symbols-outlined">
  tips_and_updates
  </span>
<div class="all-c-p-d">
  Inspiration
</div>
</div>
<div class="all-c-p">
<span class="material-symbols-outlined">
  edit_note
  </span>
<div class="all-c-p-d">
  Writing
</div>
</div>
<div class="all-c-p">
<span class="material-symbols-outlined">
  auto_stories
  </span>
<div class="all-c-p-d">
  Characters
</div>
</div>
<div class="all-c-p" onclick="OpenNotifCenter()" id="notifclass">
<span class="material-symbols-outlined">
  notifications
  </span>
<div class="notifnb" id="notifnb">
  9+
</div>
<div class="all-c-p-d">
  Notifications
</div>
</div>
<div class="all-c-p" onclick="OpenInfos()">
<span class="material-symbols-outlined">
  manage_accounts
  </span>
  <div class="all-c-p-d">
    Account
  </div>
</div>`;


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
    
  </div>
  <div class="m-m-i">
    <div class="f-t">
      <span class="material-symbols-outlined">
        feed
        </span>
      What's going on?
      <div class="f-t-center">
        <span class="material-symbols-outlined" onclick="OpenNotifCenter()">
        open_in_new
        </span>
      </div>
    </div>
    <div class="m-m-td" id="m-m-td">
    </div>

  </div>
</div>
<div class="more">
  <div class="mor-t" title="Want your story to be there? Contact our team.">
    <span class="material-symbols-outlined">
      auto_awesome
      </span>
    Our favorite stories
  </div>
  <div class="mor-st">
    <div class="st" >
      <div class="st-l">
        FR
      </div>
      <div class="st-t" id="NousEtLeMonde">
        Nous, et le monde
      </div>
      <div class="st-o">
        <span id="Nous Et Le Monde" class="material-symbols-outlined"onclick="openLink(this,'https://www.wattpad.com/1320458753-nous-et-le-monde-chapitre-1')">
          open_in_new
          </span>
          <span id="Naf Auteur" class="material-symbols-outlined" onclick="openLink(this,'https://www.wattpad.com/user/NafAuteur')" >
            face
            </span>
      </div>
    </div>
  </div>
</div>
</div>
`;

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