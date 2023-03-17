let ChargedTask;

function ShowUpToDo() {
    document.getElementById('Main').innerHTML = `
        <div class="td-m-c">
            <div class="td-p-c">
                <div class="td-p-c-slct-p">
                    <div class="td-p-c-t">
                    <span class="material-symbols-outlined">
                        bookmark
                        </span>
                        Select a project
                    </div>
                    <div class="td-p-c-slct-p-i">
                        <select id="td-p-c-slct-p-i" onchange="ChangeTasks()">
                        </select>
                    </div>
                </div>
                <div class="td-p-c-s-t">
                    <div class="td-p-c-t">
                        <span class="material-symbols-outlined">
                        sort
                        </span>
                        Sort tasks
                    </div>
                    <div class="td-p-c-slct-p-i">
                        <select id="td-p-c-slct-p-s" onchange='ChangeSort()'>
                            <option>All</option>
                            <option>Today</option>
                            <option>Tomorrow</option>
                            <option>Later</option>
                        </select>
                    </div>
                </div>
                <div class="td-p-c-add-t">
                    <button onclick="openNewTask()">
                    <span class="material-symbols-outlined">
                    add
                    </span>
                    New task
                    </button>
                </div>
                <div class="td-p-c-add-t">
                    <button onclick="window.open('taskslogs.html')">
                    <span class="material-symbols-outlined">
                    open_in_new
                    </span>
                    Your logs
                    </button>
                </div>
            </div>
            <div class="td-content" id="td-content">
                <div class="td-c-title-separator" >
                    <div class="td-c-t-s" id="undoneseparator"></div>
                    <div class="td-c-t-t" id="undonetext">
                        Undone tasks
                    </div>
                </div>
                <div class="td-c-td-c" id="undonetasks">
                </div>
                <div class="td-c-title-separator">
                    <div class="td-c-t-s"></div>
                    <div class="td-c-t-t">
                        Tasks for tomorrow
                    </div>
                </div>
                <div class="td-c-td-c" id="tomorrowtasks">

                </div>
                <div class="td-c-title-separator">
                    <div class="td-c-t-s"></div>
                    <div class="td-c-t-t">
                        Tasks for later
                    </div>
                </div>
                <div class="td-c-td-c" id="latertasks">
                    
                </div>
                <div class="alertAcceptedTask" id="AAT">
                    <div class="alertAcceptedTaskContent">
                        You did it! Your task is done.
                    </div>
                    <div class="alertAcceptedTaskCancel"  onclick="cancelTaskAcceptation()">
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    document.getElementById('AAT').style.visibility = "hidden";
    let v = 0;
    let items = {... localStorage};
    for (let [n,k] of Object.entries(items)) {
        if (n.includes('Project')) {
            let K = JSON.parse(k);
            document.getElementById('td-p-c-slct-p-i').innerHTML+=`
                <option>
                    ${K.name}
                </option>
            `;
            if (v===0) {
                document.getElementById('td-p-c-slct-p-i').value = K.name;
                document.getElementById('td-p-c-slct-p-i').options[0].selected = true;
                document.getElementById('td-p-c-slct-p-i').onchange;
                inCharge = K.name;
                ChangeTasks()
                v=1;
            }
        }
    }
}

function ChangeTasks() {
    inCharge = document.getElementById('td-p-c-slct-p-i').value;
    let K = JSON.parse(localStorage.getItem(`Project : ${inCharge}`));
    if (K.tasks) {
        for (let i = 0; i <  K.tasks.length; i++) {
            let task = K.tasks[i]
            if (task.validated != true) {
                let today = new Date();
                today.setHours(0);
                today.setMinutes(0);
                today.setSeconds(0);
                today.setMilliseconds(0);
                today = today.getTime();
                let tomorrow = new Date(today)
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(0,0,0,0);
                tomorrow = tomorrow.getTime()

                let todo = `
                <div class="todo-all-contain" id="${task.name}all">
                    <div class="todo">
                        <div class="todo-check" id="${task.name}v" onclick="ValidateTask(this)">
                            <span class="material-symbols-outlined">
                            check_box_outline_blank
                            </span>
                        </div>
                        <div class="todo-name">
                            ${task.name}
                        </div>
                        <div class="todo-more" onclick="MoreContent(this)"id="${task.name}">
                            <span class="material-symbols-outlined">
                            more_vert
                            </span>
                        </div>
                        <div class="todo-more-content" id="${task.name}m">
                            <div class="todo-more-content-p" onclick="DelTask(this)"id="${task.name}">
                                <span class="material-symbols-outlined">
                                delete
                                </span>
                            </div>
                            <div class="todo-more-content-p" onclick="ShowDesc(this)"id="${task.name}">
                                <span class="material-symbols-outlined">
                                description
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="tododesc" id="${task.name}desc">

                    </div>
                </div>
                `
                if (today > task.for ||today === task.for) {
                    document.getElementById('undonetasks').innerHTML+=todo;
                } else if (tomorrow === task.for) {
                    document.getElementById('tomorrowtasks').innerHTML+=todo;
                } else {
                    document.getElementById('latertasks').innerHTML+=todo;

                }
            }
        }
    }
}  



function Create(opt) {
    let items = {... localStorage};
    for (let [n,k] of Object.entries(items)) {
        if (n.includes('Project')) {
            let K = JSON.parse(k);
            document.getElementById('td-p-c-slct-p-i').innerHTML+=`
                <option>
                    ${K.name}
                </option>
            `;
            if (K.tasks) {
                for (let i = 0; i <  K.tasks.length; i++) {
                    let task = K.tasks[i]
                    if (task.validated != true) {
                        let today = new Date();
                        today.setHours(0);
                        today.setMinutes(0);
                        today.setSeconds(0);
                        today.setMilliseconds(0);
                        today = today.getTime();
                        let tomorrow = new Date(today)
                        tomorrow.setDate(tomorrow.getDate() + 1)
                        tomorrow.setHours(0,0,0,0);
                        tomorrow = tomorrow.getTime()
    
                        let todo = `
                        <div class="todo-all-contain" id="${task.name}all">
                            <div class="todo">
                                <div class="todo-check" id="${task.name}v" onclick="ValidateTask(this)">
                                    <span class="material-symbols-outlined">
                                    check_box_outline_blank
                                    </span>
                                </div>
                                <div class="todo-name">
                                    ${task.name}
                                </div>
                                <div class="todo-more" onclick="MoreContent(this)"id="${task.name}">
                                    <span class="material-symbols-outlined">
                                    more_vert
                                    </span>
                                </div>
                                <div class="todo-more-content" id="${task.name}m">
                                    <div class="todo-more-content-p" onclick="DelTask(this)"id="${task.name}">
                                        <span class="material-symbols-outlined">
                                        delete
                                        </span>
                                    </div>
                                    <div class="todo-more-content-p" onclick="ShowDesc(this)"id="${task.name}">
                                        <span class="material-symbols-outlined">
                                        description
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="tododesc" id="${task.name}desc">
    
                            </div>
                        </div>
                        `
                        if (task.for === today && opt==="Today") {
                            document.getElementById('td-content').innerHTML+=todo;
                        }
                        else if (tomorrow === task.for && opt==="Tomorrow") {
                            document.getElementById('td-content').innerHTML+=todo;
                        } else  if (opt==="Later" && tomorrow != task.for && task.for != today){
                            document.getElementById('td-content').innerHTML+=todo;    
                        }
                    }
                }
            }
            if (v===0) {
                document.getElementById('td-p-c-slct-p-i').value = K.name;
                document.getElementById('td-p-c-slct-p-i').onchange();
                inCharge = K.name;
                v=1;
            }
        }
    }
}

function ChangeSort() {
    let value = document.getElementById('td-p-c-slct-p-s').value;
    if (value === "All") {
        console.log('SORTING')
        ShowUpToDo();
    } else if (value == "Today" || value == "Tomorrow" || value === "Later") {
        document.getElementById('td-content').innerHTML=`
        <div class="td-c-title-separator">
        <div class="td-c-t-s"></div>
        <div class="td-c-t-t">
            Tasks for ${value.toLowerCase()}
        </div>
        </div>
        `;
        Create(value);
    }
}

function cancelTaskAcceptation() {
    let pj = JSON.parse(localStorage.getItem(`Project : ${inCharge}`));
    if (pj.tasks) {
        for (let i = 0; i < pj.tasks.length; i++) {
            if (pj.tasks[i].name === ChargedTask) {
                console.log('TASK VALIDATING...')
                pj.tasks[i].validated = false;
                ChargedTask = pj.tasks[i].name;
                document.getElementById('AAT').style.visibility = "hidden";
            }
        }
    }
    localStorage.setItem(`Project : ${inCharge}`,JSON.stringify(pj));
    ShowUpToDo()
}

function ValidateTask(el) {
    let id = el.id;
    let pj = JSON.parse(localStorage.getItem(`Project : ${inCharge}`));
    if (pj.tasks) {
        for (let i = 0; i < pj.tasks.length; i++) {
            if (pj.tasks[i].name+"v" === id) {
                console.log('TASK VALIDATING...')
                pj.tasks[i].validated = true;
                ChargedTask = pj.tasks[i].name;
                document.getElementById('AAT').style.visibility = "visible";
                console.log(document.getElementById('AAT').style.visibility)
            }
        }
    }
    localStorage.setItem(`Project : ${inCharge}`,JSON.stringify(pj));
    ShowUpToDo()
    setTimeout(() => {
        document.getElementById('AAT').style.visibility = "hidden";
        console.log('HIDDEN')
    },1000*10);
}

function ShowDesc(el) {
    let id = el.id;
    console.log("SHOWING DESC", id)
    let pj = JSON.parse(localStorage.getItem(`Project : ${inCharge}`));
    let viewDesc;
    if (document.getElementById(id+"desc").style.position ==="relative") {
        viewDesc = true;
    } else {
        viewDesc = false;
    }
    console.log(viewDesc ? "Description is visible" : "Description is hidden")
    let item = document.getElementsByClassName('tododesc');
    for (var i = 0; i < item.length; i++ ) {
        item[i].innerHTML="";
        item[i].style.position = "absolute";
        item[i].style.visibility="hidden"
    }
    console.log('HIDDEN')
    for (let i = 0; i < pj.tasks.length; i++) {
        if (pj.tasks[i].name === id) {
            MoreContent({id:el.id})
            let d = new Date(pj.tasks[i].for);
            d.setHours(0,0,0,0);
            document.getElementById(id+"desc").innerHTML = pj.tasks[i].desc;
            document.getElementById(id+"desc").innerHTML+=`
                <div class="descTime">
                    <span class="material-symbols-outlined">
                    flag
                    </span>
                    ${d.getDate()<9?"0"+d.getDate():d.getDate()}/${d.getMonth()+1<9?"0"+(d.getMonth()+1):d.getMonth()+1}/${d.getFullYear()}
                </div>
            `;
            if (viewDesc) {
                document.getElementById(id+"desc").style.visibility="hidden";
                document.getElementById(id+"desc").style.position= "absolute";
                console.log('hidden')
            } else {
                document.getElementById(id+"desc").style.visibility="visible";
                document.getElementById(id+"desc").style.position= "relative";            
            }

        }
    }
}

function openNewTask() {
    document.getElementById('td-content').innerHTML = `
        <div class="tdn-form">
            <div class="tdn-f-t">
                Create a new task
            </div>
            <div class="td-n-p">
                <div class="td-n-p-t">
                    <span class="material-symbols-outlined">
                    task
                    </span>
                    Task name (100ch.)
                </div>
                <input type="text" maxlength="100" id="taskname">
            </div>
            <div class="td-n-p">
                <div class="td-n-p-t">
                    <span class="material-symbols-outlined">
                    description
                    </span>
                    Task description (500ch.)
                </div>
                <textarea  maxlength="500 "style="width:90%;height:100px" id="taskdesc"></textarea>
            </div>
            <div class="td-n-p">
                <div class="td-n-p-t">
                <span class="material-symbols-outlined">
                event
                </span>
                    Task date
                </div>
                <input type="date" id="date">
            </div>
            <div class="td-n-p">
                <div class="td-n-p-t">
                <span class="material-symbols-outlined">
                task_alt
                </span>
                    Repeat the task
                </div>
                <div class="choice">
                    <div  class="choicecheck">
                        <span  id="repeat1" onclick="changecheck(this)" class="material-symbols-outlined">
                        check_box_outline_blank
                        </span>
                        Yes
                    </div>
                    <div class="choicecheck">
                        <span  id="repeat2" onclick="changecheck(this)" class="material-symbols-outlined">
                        check_box
                        </span>
                        No
                    </div>
                </div>
            </div>
                <div class="td-n-p">
                    <div class="td-n-p-t">
                        <span class="material-symbols-outlined">
                        notifications
                        </span>
                        Alert a day before
                    </div>
                    <div class="choice">
                        <div  class="choicecheck">
                            <span id="alert1" onclick="changecheck(this)" class="material-symbols-outlined">
                            check_box
                            </span>
                            Yes
                        </div>
                        <div  class="choicecheck">
                            <span id="alert2" onclick="changecheck(this)" class="material-symbols-outlined">
                            check_box_outline_blank
                            </span>
                            No
                        </div>
                    </div>
                </div>
                <div class="td-n-p">
                    <div class="td-n-p-t">
                        <span class="material-symbols-outlined">
                        delete
                        </span>
                        Delete if undone
                    </div>
                    <div class="choice">
                        <div class="choicecheck">
                            <span id="delete1" onclick="changecheck(this)" class="material-symbols-outlined">
                            check_box
                            </span>
                            Yes
                        </div>
                        <div  class="choicecheck">
                            <span id="delete2" onclick="changecheck(this)" class="material-symbols-outlined">
                            check_box_outline_blank
                            </span>
                            No
                        </div>
                    </div>
                </div>
                <button class="validate_button" onclick="CreateTask()">
                Create
                </button>
                <div id="alertMessageTask">
                    Error: missing task name, or incorrect date.
                </div>
            </div>
        </div>
    `;
    document.getElementById('date').valueAsDate = new Date()

}



/// NE PAS OUBLIER DE METTRE TOUS LES PROJETS ET LE SELECT DES PROJETS
let NewTaskParams = [
    false, // Reapeat task
    true, // Alert a day before
    true // Delete if undone
]

function CreateTask() {
    let name = document.getElementById('taskname');
    let desc = document.getElementById('taskdesc');
    let date = document.getElementById('date');
    let dfor = new Date(date.value);

    let d = new Date();
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    dfor.setHours(0);
    dfor.setMinutes(0);
    dfor.setSeconds(0);
    dfor.setMilliseconds(0);

    d = d.getTime()
    dfor = dfor.getTime()
    if (name.value && dfor >= d) {
        let task = {
            for : dfor,
            repeat : NewTaskParams[0],
            alert : NewTaskParams[1],
            delete : NewTaskParams[2],
            name : name.value,
            desc : desc.value,
            validated : false
        };
        let pj = JSON.parse(localStorage.getItem(`Project : ${inCharge}`));
        console.log(pj)
        if (pj) {
            if (!pj.tasks) {
                pj.tasks = [];
            }
            pj.tasks.push(task);
            localStorage.setItem(`Project : ${inCharge}`, JSON.stringify(pj));
            ShowUpToDo();

        } else {
            document.getElementById('alertMessageTask').innerHTML = "Unexisting project.";
            document.getElementById('alertMessageTask').style.visibility = "visible";
        }
    } else {
        document.getElementById('alertMessageTask').innerHTML = " Missing task name, or incorrect date.";
        document.getElementById('alertMessageTask').style.visibility = "visible";
    }
}


function changecheck(el) {
    let ot;
    console.log(el.id)
    if (el.id.includes("delete")) {
        if (el.id.includes('1')) {
            ot = el.id.replace('1','2');
        } else {
            ot = el.id.replace('2','1');
        }
        NewTaskParams[0]=!NewTaskParams[0];
    }
     if (el.id.includes("alert")) {
        if (el.id.includes('1')) {
            ot = el.id.replace('1','2');
        } else {
            ot = el.id.replace('2','1');
        }
        NewTaskParams[1]=!NewTaskParams[1];
    }
    if (el.id.includes("repeat")) {
        if (el.id.includes('1')) {
            ot = el.id.replace('1','2');
        } else {
            ot = el.id.replace('2','1');
        }
        NewTaskParams[2]=!NewTaskParams[2];
    }
    if (el.innerHTML == "check_box_outline_blank") {
        el.innerHTML = "check_box";
        document.getElementById(ot).innerHTML = "check_box_outline_blank";
    } 
    else {
        el.innerHTML="check_box_outline_blank";
        document.getElementById(ot).innerHTML = "check_box";
    }
}


function DelTask(el) {
    let id = el.id;
    if (document.getElementById(id+"all")) {
        document.getElementById(id+"all").remove();
        let pj = JSON.parse(localStorage.getItem(`Project : ${inCharge}`));
        if (pj.tasks) {
            for (let i = 0; i < pj.tasks.length;i++) {
                if (pj.tasks[i].name === id) {
                    pj.tasks.splice(i,1);
                    console.log(pj)
                    localStorage.setItem(`Project : ${inCharge}`, JSON.stringify(pj));
                    ShowUpToDo();
                }
            }
        }
    }
}

function MoreContent(el) {
    let id = el.id;
    console.log("FDSFDSFDSF")
    document.getElementById(el.id+"m").style.visibility= `
        ${document.getElementById(el.id+"m").style.visibility==="visible" ? "hidden" : "visible"}
    `;
}