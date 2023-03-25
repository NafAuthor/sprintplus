function OpenInfos() {
    document.getElementById('Main').innerHTML= `
        <div class="ifo-m">
            <div class="ifo-m-t">
            <span class="material-symbols-outlined">
            construction
            </span>
                Parameters
            </div>
            <div class="sp-ttl" id="spt-ttl">
            <div class="param-header">

            </div>
            <div class="param-title">
                <span class="material-symbols-outlined">
                person
                </span>
                Your account
            </div>

            </div>
            <div class="ifo-m-c">
                <div class="ifo-m-c-un">
                    <div class="ifo-m-c-un-t">
                    User name
                    </div>
                    <div class="ifo-m-c-u">
                        <textarea  readonly='true' id="username"></textarea>
                        <button onclick="EditName()">
                        <span id="editusername" class="material-symbols-outlined">
                        edit
                        </span>
                        </button>
                    </div>
                </div>
                <div class="ifo-m-c-ps">
                    <div class="ifo-m-c-ps-t">
                    Password
                    </div>
                    <div class="ifo-m-c-p">
                        <textarea readonly='true' id="userpassword"></textarea>
                        <button onclick="EditPassword()" >
                        <span class="material-symbols-outlined" id="password">
                        edit
                        </span>
                        </button>
                    </div>
                </div>
                <div class="ifo-m-c-ps">
                    <div class="ifo-m-c-ps-t">
                    E-Mail
                    </div>
                    <div class="ifo-m-c-p">
                        <textarea readonly='true' id="useremail"></textarea>
                        <button onclick="EditEMAIL()">
                        <span class="material-symbols-outlined">
                        edit
                        </span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="sp-ttl">
            <div class="param-header">

            </div>
            <div class="param-title">
                <span class="material-symbols-outlined">
                emoji_people
                </span>
                You & Sprint+
            </div>
            </div>

            <div class="ifo-bx" id="premium">
                <div class="ifo-bx-t">
                <span style="color:yellow" class="material-symbols-outlined">
                workspace_premium
                </span>
                Sprint+ enhanced
                </div>
                <div class="ifo-bx-d">
                    <b>Sprint+ enhanced</b> is a premium
                    version of the Sprint+ website.<br>
                    Nothing about has been set up, 
                    and it is not possible to unlock
                    it. More about this feature is coming 
                    for the 2.0 update.<br>As a price idea,
                    <b>Sprint+ enhanced</b> should cost 
                    up to 5€.
                </div>
            </div>
            <div class="ifo-bx"id="feat">
                <div class="ifo-bx-t">
                <span style="color:aqua" class="material-symbols-outlined">
                group_work
                </span>
                Featuring
                </div>
                <div class="ifo-bx-d">
                    Featuring is the best Sprint+ v.1.0.0 way
                    to share your stories & social medias content
                    on Sprint+.<br>
                    Contact <a href="https://www.instagram.com/naf_author">
                    our team leader
                    </a> to discuss about a feat. 
                    <br> Featuring are free, but are not 
                    necessary always easy to get. The 
                    visibility of your content must be 
                    wide enough for the website to develop
                    its attractivity. 
                </div>
            </div>
            <div class="ifo-bx" id="datas">
                <div class="ifo-bx-t">
                <span style="color:green" class="material-symbols-outlined">
                database
                </span>
                Datas
                </div>
                <div class="ifo-bx-d">
                None of your datas are used by us or any other person.
                All your datas are stored in your browser, and are 
                known only by you and your browser.<br>We do not sell,
                use, lookup, save, or see any of your datas.<brIn
                this way, all the passwords you will set will have a 
                minimal amount of security: anyone with a bit of coding 
                experience will be able to find your passwords. However,
                keep in mind that this doesn't change anything to the point
                of the website, and will not affect in any way your use of 
                Sprint+, because no one would steal your progress.
                <br>
                Sprint+ and our team are not responsible of any corruption
                due to a tricky modification of your datas on your side. 
                You are responsible of the way you modify your datas.
                </div>
            </div>

            <div class="sp-ttl">
            <div class="param-header">

            </div>
            <div class="param-title">
                <span class="material-symbols-outlined">
                support_agent
                </span>
                Help
            </div>
            </div>
            <div class="ifo-bt-c">
                <div class="ifo-bt">
                    <div class="ifo-bt-b">
                        <button onclick="window.open('https://www.instagram.com/naf_author')">
                        Contact our <b>team manager</b> for any
                        questions
                        </button>
                    </div>
                </div>
                <div class="ifo-bt">
                    <div class="ifo-bt-b">
                        <button onclick="window.open('https://discord.gg/72tACSk8Jd')">
                        Discord support
                        </button>
                    </div>
                </div>
            </div>
            <div class="sp-ttl">
            <div class="param-header">

            </div>
            <div class="param-title">
                <span class="material-symbols-outlined">
                security
                </span>
                Security
            </div>
        </div>
        <div class="ifo-bt-c">
        <div class="ifo-bt">
            <div class="ifo-bt-b"  id="security">
                <button onclick="Download()">
                <span class="material-symbols-outlined">
                download
                </span>
                    Download your datas
                </button>
            </div>
        </div>
        <div class="ifo-bt">
            <div class="ifo-bt-b" id="security">
                <button onclick="Merge()">
                <span class="material-symbols-outlined">
                upload
                </span>
                    Merge datas
                </button>
            </div>
        </div>
    </div>
        </div>

    `;
    let user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('username').value = user.name;
    document.getElementById('userpassword').value = user.password;
    document.getElementById('useremail').value = user.email;

}/*
let Activated = false;
let USERNAME = "";
function EditName() {
    let span = document.getElementById('editusername');
    let txtarea = document.getElementById('username');
    Activated=false;
    if (!Activated) {
        span.innerHTML = "save";
        txtarea.readOnly  = false;
        txtarea.placeholder  = txtarea.value;
        txtarea.value=""
        txtarea.focus();
    
        
        span.onclick = function() {
            let user = JSON.parse(localStorage.getItem('user'));
            user.name = txtarea.value;
            localStorage.setItem('user',JSON.stringify(user));
            USERNAME = user.name;
            span.onclick=EditName()
            console.log('RELOAD');
            OpenInfos();

        }   
        Activated = true;
    } else {
        span.innerHTML = "edit";
        txtarea.readOnly  = true;
        txtarea.value = USERNAME;
        Name="";
        Activated=false;
    }
} 

function EditPassword() {
    let span = document.getElementById('password');
    let txtarea = document.getElementById('userpassword');
    Activated=false;
    if (!Activated) {
        span.innerHTML = "save";
        txtarea.readOnly  = false;
        txtarea.placeholder  = txtarea.value;
        txtarea.value=""
        txtarea.focus();
    
        
        span.onclick = function() {
            let user = JSON.parse(localStorage.getItem('user'));
            user.password = txtarea.value;
            localStorage.setItem('user',JSON.stringify(user));
            USERNAME = user.password;
            span.onclick=EditName()
            console.log('RELOAD');
            OpenInfos();

        }   
        Activated = true;
    } else {
        span.innerHTML = "edit";
        txtarea.readOnly  = true;
        txtarea.value = USERNAME;
        Name="";
        Activated=false;
    }
}*/


/*

                <div class="ifo-m-c-em">
                <div class="ifo-m-c-em-t">
                Email adress
                </div>
                <div class="ifo-m-c-e">
                    <textarea readonly='true' id="useremail"></textarea>
                    <button>
                    <span  class="material-symbols-outlined">
                    edit
                    </span>
                    </button>
                </div>
            </div>
*/