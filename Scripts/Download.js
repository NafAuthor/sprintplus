let password = JSON.parse(localStorage.getItem('user')).password;

function DownloadItem() {
    Pannel_Status=false;
    const link = document.createElement("a");
    let items = {...localStorage};
    let content={};
    let stats = [0,0]
    for (let [key,value] of Object.entries(items)) {
        if (key.includes('Project') || key.includes('goal') || key.includes('user')) {
            value = JSON.parse(value);
            if (key.includes("Project")) {
                stats[0]++;
            } else if (key.includes("goal")) {
                stats[1]++;
            }
            content[`${key}`] = value;
        }
    }
    let informations = `
        Welcome. You requested a download of your Sprint+ datas.
        We found in your localstorage ${stats[0]} project(s) and ${stats[1]} goal(s). If this is incorrect, please try to download your datas again.
        \n
        To merge your datas on a new session (digital tool), follow the instructions:\n
        - Copy the string below, without removing any characters\n
        - On your new digital tool, click "Merge" (bottom-right of the screen)\n
        - Paste the content in the prompt box at the top of your screen\n
        \n
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        ${JSON.stringify(content)}
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            `;
    const file = new Blob([informations], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "DATAS - Sprint+";
    link.click();
    URL.revokeObjectURL(link.href);
}



function Download() {
    document.getElementById('Main').innerHTML = `
        <div class="AlertBox">
            <div class="ab-title">
                Download your datas
            </div>
            <div class="ab-infos">
                To download your datas, please put in the field below at least 
                one password from your projects.<br>
                You will find in your datas file all the useful informations
                about datas merging.
            </div>
            <div class="pj-p" >
            <input type="text" id="dwps"autocomplete="off">
            </div>
            <button onclick="DownloadConfirm()">
            Confirm the download

            </button>
        </div>
    `;

}
function DownloadConfirm() {
    let items = {...localStorage};
    for (let [i,a] of Object.entries(items)) {
        console.log(i)
        if (i.includes('Project') && document.getElementById('dwps').value == JSON.parse(a).password) {
            document.getElementById('Main').innerHTML = `
                    <div class="AlertBox">
                        <div class="ab-title">
                            Downloading datas...
                        </div>
                        <div class="ab-infos">
                            Password check is successful. Watch out for the download. 
                        </div>
                        <button onclick="Menu()">
                        Go back to home page
                        </button>
                    </div>
                `;
            DownloadItem();
            return;
        }
    }
    document.getElementById('Main').innerHTML = `
    <div class="AlertBox">
        <div class="ab-title">
            Unable to download datas
        </div>
        <div class="ab-infos">
            No password identical to the one you typed has been found.<br>
            Low level of security canceled datas download. 
        </div>
        <button onclick="Download()">
            Try again
        </button>
    </div>
`;
}




function Merge() {
    Pannel_Status=false;
    document.getElementById('Main').innerHTML = `
        <div class="AlertBox">
            <div class="ab-title">
                Welcome to the merge box
            </div>
            <div class="ab-infos">
                You must be careful.<br>
                Once new datas are merged, all the currently stored datas are deleted, 
                which means all the projects, goals, progresses, notes, tasks, and 
                saved contents will definitely be deleted from this digital tool.<br>
                It is highly recommended to download all your datas before merging new 
                datas, in case of merging issue, or not to lose everything you've done.<br>
                All your passwords will be asked. 
            </div>
            <button onclick="DataMergingPasswords()">
                I understand, and wish to proceed
            </button>
        </div>
    `;
    /*
    if (confirm("Warning: merging new datas will delete your current datas.\nDo you want to proceed?")) {
        Prompt(false);

    }*/
}

function DataMergingPasswords() {
    document.getElementById('Main').innerHTML = `
    <div class="AlertBox">
        <div class="ab-title">
            Passwords check
        </div>
        <div class="ab-infos" id="ab-infos">
            Enter all of your passwords below. If any of these is wrong,
            the operation will be canceled. 
        </div>

        <button onclick="DataConfirm()">
            Confirm datas merging
        </button>
    </div>
    `;
    let items = {...localStorage};
    for (let [key,value] of Object.entries(items)) {
        if (key.includes("Project")) {
            document.getElementById('ab-infos').innerHTML+=`
                <div class="ab-pj" >
                    <div class="pj-name">
                        ${JSON.parse(value).name}
                    </div>
                    <div class="pj-p" >
                        <input type="text" id="${JSON.parse(value).name}"autocomplete="off">
                    </div>
                </div>
            `;
        } else if (key==="user") {
            document.getElementById('ab-infos').innerHTML+=`
                <div class="ab-pj" >
                    <div class="pj-name">
                        Session password:
                    </div>
                    <div class="pj-p" >
                        <input type="text" id="user"autocomplete="off">
                    </div>
                </div>
            `;
        }
    }
}

function DataConfirm() {
    let items = {...localStorage};
    for (let [key,value] of Object.entries(items)) {
        if (key.includes("Project") && document.getElementById(JSON.parse(value).name) ||key === "user") {
            console.log(key)
            if ((key!="user" && document.getElementById(JSON.parse(value).name).value != JSON.parse(value).password) || (key === "user" && document.getElementById("user").value != JSON.parse(value).password )) {
                document.getElementById('Main').innerHTML = `
                <div class="AlertBox">
                    <div class="ab-title">
                        Merging canceled
                    </div>
                    <div class="ab-infos" id="ab-infos">
                        One of your passwords was incorrect. <br>
                        The merging operation has been canceled due to a
                        low level of confidence.
                    </div>
                    <button onclick="Menu()">
                        Go back to home page
                    </button>
                </div>
                `;
                return;
            } 
        }   
    }
    document.getElementById('Main').innerHTML = `
    <div class="AlertBox">
        <div class="ab-title">
            Merged datas
        </div>
        <div class="ab-infos" id="ab-infos">
            Typed passwords are confirmed. <br>
            The merging operation is about to start.
            Please put in the area below the download string you copied 
            from your other session.<br>
            The string must be a valid one, otherwise the action will be 
            canceled and could corrupt your datas. 
            
        </div>
        <div class="pj-p">
        <input type="text" id="datas"autocomplete="off">
        </div>
        <button onclick="DataMerge()">
            Merge my datas
        </button>
        
    </div>
    `;
}

function DataMerge() {
    if (document.getElementById('datas').value) {
        let item = document.getElementById('datas').value;
        localStorage.clear();
        for (let [i,a] of Object.entries(JSON.parse(item))) {
            localStorage.setItem(i,JSON.stringify(a));
        }
        document.getElementById('Main').innerHTML = `
        <div class="AlertBox">
            <div class="ab-title">
                Merging done
            </div>
            <div class="ab-infos" id="ab-infos">
                The merging operation was a success!<br>
                Your session now has new projects and goals to work on. <br>
                To prevent corruption, it is highly recommended to download your datas. 
            </div>
        </div>
        `;
    }
}

