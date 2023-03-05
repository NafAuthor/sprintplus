let Project_form = `
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
      <option name="EP">Editing project</option>
      <option name="CP">Coding project</option>
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
      Add some informations...
    </div>
    <textarea id="more"></textarea>
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