
function OpenAll() {
    document.getElementById('menu').style.display="flex";
    Menu();
}

function ClosePFPAdd() {
    document.getElementById('addPFP').style.display="none";
}



function SavePFP() {
    let user = JSON.parse(localStorage.getItem('user'));
        let link = document.getElementById('pfplink').value;
        console.log(isValidUrl(link))
            if (isValidUrl(link)) {
                user.pfp = link;
                user.pfptype = "link";
            }
            document.getElementById('addPFP').style.display="none";
            localStorage.setItem('user',JSON.stringify(user))
    OpenInfos()
}

function PFPADD() {
    document.getElementById('addPFP').style.display="flex";
}

function OpenInfos() {
    document.getElementById('menu').style.display="none";
    let user = JSON.parse(localStorage.getItem('user'));
    var usable;
    usable = user.pfp;

    document.getElementById('Main').innerHTML= `
        <div class="AcountContainer">
            <div class="ifo-m-t">
            <div class="ifo-m-t-home" onclick="OpenAll()">
                <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30"><path d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm-60 60V456l320-240 320 240v480H530V686H430v250H160Zm320-353Z"/></svg>
                Home
                </div>
        <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
        ${user.name}'s Account
        </div>
        <div class="ifo-m">
            <div class="whole-header-ch"></div>
            <div class="sp-ttl" id="spt-ttl">
            <div class="param-header">

            </div>
            <div class="param-title">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 575q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160 896v-94q0-38 19-65t49-41q67-30 128.5-45T480 636q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800 764 800 802v94H160Zm60-60h520v-34q0-16-9.5-30.5T707 750q-64-31-117-42.5T480 696q-57 0-111 11.5T252 750q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570 425q0-39-25.5-64.5T480 335q-39 0-64.5 25.5T390 425q0 39 25.5 64.5T480 515Zm0-90Zm0 411Z"/></svg>
            
                Your account
            </div>
            </div>
            <div class="param-info-wh">
                Manage your personnal informations right here.
            </div>
            <div class="MainContainInfos">
            <div class="InfosContainer">
                <div class="InfosContains">
                    <div class="ActiveContain" id="ActiveContain">
                        <div class="VisualContain">
                            <div class="AccountContainer" id="Username" onclick="OpenUserContainer(this)">
                                Username
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30" fill="white"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
                            </div>
                            <div class="AccountCoutainerDivider"></div>
                            <div class="AccountContainer" id="BioPublicy" onclick="OpenUserContainer(this)">
                                Bio & Interests
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30" fill="white"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
                            </div>
                            <div class="AccountCoutainerDivider"></div>
                            <div class="AccountContainer" id="Publicy" onclick="OpenUserContainer(this)">
                                Publicy
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30" fill="white"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
                            </div>
                            <div class="AccountCoutainerDivider"></div>
                            <div class="AccountContainer" id="Partnership" onclick="OpenUserContainer(this)">
                                Partnership
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30" fill="white"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
                            </div>
                            <div class="AccountCoutainerDivider"></div>
                        </div>
                        <div class="SecurityContain">
                            <div class="AccountContainer" id="Security" onclick="OpenUserContainer(this)">
                                <svg xmlns="http://www.w3.org/2000/svg" style="position:relative;" fill="white" height="20" viewBox="0 96 960 960" width="20"><path d="M220 976q-24.75 0-42.375-17.625T160 916V482q0-24.75 17.625-42.375T220 422h70v-96q0-78.85 55.606-134.425Q401.212 136 480.106 136T614.5 191.575Q670 247.15 670 326v96h70q24.75 0 42.375 17.625T800 482v434q0 24.75-17.625 42.375T740 976H220Zm0-60h520V482H220v434Zm260.168-140Q512 776 534.5 753.969T557 701q0-30-22.668-54.5t-54.5-24.5Q448 622 425.5 646.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350 422h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426 196 388 233.917 350 271.833 350 326v96ZM220 916V482v434Z"/></svg>
                                    Security
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30" fill="white"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
                            </div>
                            <div class="AccountContainer" id="Enhanced" onclick="OpenUserContainer(this)">
                            <img src="Images & Icons/Sprint+ blank.png">
                            Sprint+ Enhanced
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30" fill="white"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
                        </div>
                        </div>
                    </div>
                    <div class="ProfileViewContain">
                        <div class="sprintenhanced" id="sprintenhanced"style="display:${user.display?(user.display["Enhanced"] === true ? "flex":"none"):"none"}">
                            <div class="sprintenhancedanimationcontainer">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>

                            <img src="Images & Icons/Sprint+ blank.png">
                            <p>
                                Sprint+ Enhanced User
                            </p>
                        </div>
                        <div class="userandpfp">
                            <div class="pfp">
                                <div class="imgContain">
                                    <img src='${user.pfp?usable:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Farchive.org%2Fdownload%2Ftwitter-default-pfp%2Fe.png&f=1&nofb=1&ipt=7c5905c2af6ef7d31d8877461a800f63ff8ad64cbe8cf49a6f0a922f29141a26&ipo=images"}'>
                                </div>
                                <div class="imgadd" onclick="PFPADD()">
                                <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" fill="white"width="25"><path d="M180 936q-24.75 0-42.375-17.625T120 876V276q0-24.75 17.625-42.375T180 216h409v60H180v600h600V468h60v408q0 24.75-17.625 42.375T780 936H180Zm520-498v-81h-81v-60h81v-81h60v81h81v60h-81v81h-60ZM240 774h480L576 582 449 749l-94-124-115 149Zm-60-498v600-600Z"/></svg>

                                </div>
                            </div>
                            <div class="namepronum">
                                <div class="name" id="name">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" fill="white" width="30"><path d="M480 976q-83 0-156-31.5T197 859q-54-54-85.5-127T80 576q0-83 31.5-156T197 293q54-54 127-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576v53q0 56-39.5 94.5T744 762q-36 0-68-17.5T627 695q-26 34-65 50.5T480 762q-78 0-132.5-54T293 576q0-78 54.5-133T480 388q78 0 132.5 55T667 576v53q0 31 22.5 52t54.5 21q31 0 53.5-21t22.5-52v-53q0-142-99-241t-241-99q-142 0-241 99t-99 241q0 142 99 241t241 99h214v60H480Zm0-274q53 0 90-36.5t37-89.5q0-54-37-91t-90-37q-53 0-90 37t-37 91q0 53 37 89.5t90 36.5Z"/></svg>
                                </div>
                                <div class="pronum" id="pronun">
                                    He/Him
                                </div>
                            </div>
                        </div>
                        <div class="aboutinterestsbio">
                            <div class="AIcontainer">
                                <div class="AIT">
                                    About
                                </div>
                                <div class="AITC" id="AITC">
                                </div>
                            </div>
                            <div class="AIcontainer" id="interests">
                                <div class="AIT">
                                    Interests
                                </div>
                                <div class="AI_interest" id="AI_interest">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="moreContainer">
                <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 96 960 960" width="15" fill="white"><path d="M453 776h60V536h-60v240Zm26.982-314q14.018 0 23.518-9.2T513 430q0-14.45-9.482-24.225-9.483-9.775-23.5-9.775-14.018 0-23.518 9.775T447 430q0 13.6 9.482 22.8 9.483 9.2 23.5 9.2Zm.284 514q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
    
                Learn more about your account
            </div>
        </div>

            <div class="sp-ttl">
            <div class="param-header">

            </div>
            <div class="param-title">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M368 976V438q-95-20-152.5-85.5T158 200h60q0 78 60.5 131T426 384h100q38 0 56 6.5t46 30.5l184 172-43 43-185-174v514h-60V721h-96v255h-60Zm108.08-654q-30.08 0-51.58-21.42-21.5-21.421-21.5-51.5 0-30.08 21.42-51.58 21.421-21.5 51.5-21.5 30.08 0 51.58 21.42 21.5 21.421 21.5 51.5 0 30.08-21.42 51.58-21.421 21.5-51.5 21.5Z"/></svg>

                You & Sprint+
            </div>
            </div>
            <div class="param-info-wh">
                Discover more about Sprint+, see how your datas are used, and provide help to your favourite application.
            </div>
            <div class="ifo-bx" id="sprintplus">
                <div class="ifo-bx-t">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20" fill="white"><path d="M649.826 593.217q-47.956-42.717-91.188-83.3-43.231-40.583-75.728-79.091-32.498-38.507-51.824-74.789-19.325-36.282-19.325-70.357 0-53.394 36.415-89.711t89.992-36.317q29.419 0 58.831 16.031 29.412 16.031 52.827 43.056 23.416-27.025 52.827-43.056 29.412-16.031 58.832-16.031 53.576 0 89.991 36.317t36.415 89.747q0 34.096-19.304 70.298-19.305 36.203-51.837 74.746-32.532 38.544-75.982 79.345t-90.942 83.112Zm0-90.413q65.522-59.522 119.044-118.01 53.521-58.488 53.521-99.184 0-26.599-16.956-43.648-16.956-17.049-43.851-17.049-16.519 0-32.78 8-16.26 8-33.021 29.522l-45.957 56.434-46.196-56.434q-16.521-21.403-32.902-29.462-16.38-8.06-32.776-8.06-26.935 0-43.813 17.052-16.878 17.052-16.878 43.713 0 40.322 53.522 98.963 53.521 58.641 119.043 118.163Zm-85.5 499.326-308.13-88.282v56.043H32.826v-405h315.457l255.956 96.479q28.435 10.478 48.011 34.293 19.576 23.815 19.576 67.728h108.5q44.132 0 73.816 29.163 29.684 29.163 29.684 81.837v30.305l-319.5 97.434Zm-466-97.739h91.13v-274h-91.13v274Zm462 30 256-78q-6.239-19-15.174-26-8.935-7-20.861-7H573.087q-29.283 0-55.381-4-26.097-4-48.141-10.761l-81.239-25.239 22-58 72.044 23.761q25.956 8.239 48.372 11.239 22.415 3 71.584 3 0-12-4.5-23.5t-15.5-16.5l-245-93h-81.13v214.718l304.13 89.282Zm-370.87-167Zm412.87-4Zm-412.87 4Zm66.74 0Zm393.63-403.913Z"/></svg>


                Our objectives
                </div>
                <div class="ifo-bx-d">
                    <p style="font-weight:bold;color:white;">About us</p>
                    Sprint+ is a personnal project imagined, developped, designed, and managed by Naflouille.<br>
                    This project came to live thanks to the passion of litteratry. We want to make the best place for writers 
                    to develop their projects and their creativity. We want to link writers together in a clear and listening 
                    application.<br>
                    Any suggestion is always welcomed. <br><br>
                    <p style="font-weight:bold;color:white;">Our projects</p>
                    We are planning to develop a server-side for Sprint+, so we could allow you to publish your stories and read
                    more original content.<br>
                    We are also planning to deploy Sprint+ Enhanced, a premium version of Sprint+ for you to enhance even more 
                    your creativity, and to unlock much more stuff. <br><br>
                    <p style="font-weight:bold;color:white;">Our ethic</p>
                    You want to be perfectly clear about what we do with your datas, and what we do in general.<br>
                    We aim to become a respected society, who shares values of inclusion and progress - in its limits. We want 
                    people to feel welcomed, and to enjoy free services without stealing their datas or come into their 
                    privacy. We are looking for transparency.<br><br>
                    <p style="font-weight:bold;color:white;">Our needs</p>
                    Sprint+ is seeking for visibility. We are looking for advertisement, featuring, and money ; because we need
                    money.<br>
                    We will not try to make you purchase something or donate money. We want you to take a decision freely.<br>So, if 
                    you like our application, you can consider donating or helping it, but it is not an obligation.<br><br>
                    <p style="font-weight:bold;color:white;">Recruitments</p>
                    We are looking for backend developers.

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
                    <p style="font-weight:bold;color:white;">How your datas are used</p>
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
                    You are responsible of the way you modify your datas.<br>
                    Any questions about our policy is to be asked in our Discord server.

                    <br><br>
                    <p style="font-weight:bold;color:white;">How your datas will possibly be used</p>
                    Please first note that you will be warned of any change in our data policy. We want the best for our website,
                    and work for the best ethic possible.<br>
                    Once Sprint+ 2.0 is released, your datas will be all merged to online servers, for us to 
                    link content and people together. All your projects and progresses will also be merged. You will be able to control
                    all your datas. Only the informations you chose will be publicly displayed.<br>
                    Merging all the datas will allow us to create a good-looking, functionnal, and user-friendly writing application
                    for people to be linked together. <br>
                    Any questions about our policy is to be asked in our Discord server.
                </div>
            </div>
            <div class="sp-ttl">
            <div class="param-header">

            </div>
            <div class="param-title">
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M440 936v-60h340V572q0-58-25-111.5T688 366q-42-41-96-65.5T480 276q-58 0-112 24.5T272 366q-42 41-67 94.5T180 572v244h-20q-33 0-56.5-23.5T80 736v-80q0-23 11-40.5t29-28.5l3-53q9-73 41.5-132t81-100q48.5-41 109-63.5T480 216q66 0 126.5 22.5t108.5 64q48 41.5 80.5 100T837 533l3 52q18 9 29 26.5t11 38.5v92q0 22-11 39t-29 26v69q0 24.75-17.625 42.375T780 936H440Zm-80-290q-12 0-21-9t-9-21.5q0-12.5 9-21t21.5-8.5q12.5 0 21 8.625T390 616q0 12-8.625 21T360 646Zm240 0q-12 0-21-9t-9-21.5q0-12.5 9-21t21.5-8.5q12.5 0 21 8.625T630 616q0 12-8.625 21T600 646Zm-359-52q-4-59 16.5-107t55-81.5Q347 372 392 354t90-18q91 0 153 57.5T711 537q-94-1-165.5-50.5T435 358q-16 81-67.5 143.5T241 594Z"/></svg>
                Help
            </div>
            </div>
            <div class="param-info-wh">
                If you want to suggest anything, report
                any bug, or request something related to 
                Sprint+, click on the buttons below.<br>
                Sprint+ discord server is also a 
                writing community.
            </div>
            <div class="ifo-bt-c">
                <div class="ifo-bt">
                    <div class="ifo-bt-b">
                        <button onclick="window.open('https://www.instagram.com/sprintplus_app/')">
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
                <div class="ifo-bt">
                    <div class="ifo-bt-b">
                        <button onclick="window.open('logs.html')">
                            Informations
                        </button>
                    </div>
                </div>
            </div>


        </div>
    </div>
    <div class="addPFP" id="addPFP" style="display:none">
    <svg xmlns="http://www.w3.org/2000/svg"  onclick="ClosePFPAdd()"height="20" viewBox="0 96 960 960" width="20" fill="white"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>

    <p>
    Please enter a link to your profile picture
    </p>
    <div class="pfpcontainer">
        <input type="text" id="pfplink">

        <button onclick="SavePFP()">
            Save
        </button>
    </div>
</div>
    `;
    document.getElementById('name').innerHTML = user.name;
    document.getElementById('AITC').innerHTML = user.bio;
    document.getElementById('pronun').innerHTML = user.pronun;
    ShowUserTag()

}
function ShowUserTag() {
    document.getElementById('AI_interest').innerHTML="";
    let user = JSON.parse(localStorage.getItem('user'));
    if (user.tags) {
        for (let i of user.tags) {
            document.getElementById('AI_interest').innerHTML+=`
            <div class="TagUser">
                <svg onclick="DelTag(this)" id="${i}" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 96 960 960" width="15" fill="white"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
                ${i}
            </div>
            `;
        }
    }
}

function DelTag(el) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user.tags) {
        for (let i of user.tags) {
            if (i==el.id) {
                user.tags.splice(user.tags.indexOf(i),1);
            }
        }
    }
    localStorage.setItem('user',JSON.stringify(user));
    ShowUserTag();
}

function LearnMoreSPEnhanced() {
    localStorage.setItem('helpItem',"premium");
    window.open('help.html')
}

function GoBackBoard() {
    document.getElementById('ActiveContain').innerHTML = `
    <div class="VisualContain">
        <div class="AccountContainer" id="Username" onclick="OpenUserContainer(this)">
            Username
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30" fill="white"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
        </div>
        <div class="AccountCoutainerDivider"></div>
        <div class="AccountContainer" id="BioPublicy" onclick="OpenUserContainer(this)">
            Bio & Interests
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30" fill="white"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
        </div>
        <div class="AccountCoutainerDivider"></div>
        <div class="AccountContainer" id="Publicy" onclick="OpenUserContainer(this)">
        Publicy
        <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30" fill="white"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
    </div>
        <div class="AccountCoutainerDivider"></div>
        <div class="AccountContainer" id="Partnership" onclick="OpenUserContainer(this)">
            Partnership
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30" fill="white"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
        </div>
        <div class="AccountCoutainerDivider"></div>
    </div>
    <div class="SecurityContain">
        <div class="AccountContainer" id="Security" onclick="OpenUserContainer(this)">
            <svg xmlns="http://www.w3.org/2000/svg" style="position:relative;" fill="white" height="20" viewBox="0 96 960 960" width="20"><path d="M220 976q-24.75 0-42.375-17.625T160 916V482q0-24.75 17.625-42.375T220 422h70v-96q0-78.85 55.606-134.425Q401.212 136 480.106 136T614.5 191.575Q670 247.15 670 326v96h70q24.75 0 42.375 17.625T800 482v434q0 24.75-17.625 42.375T740 976H220Zm0-60h520V482H220v434Zm260.168-140Q512 776 534.5 753.969T557 701q0-30-22.668-54.5t-54.5-24.5Q448 622 425.5 646.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350 422h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426 196 388 233.917 350 271.833 350 326v96ZM220 916V482v434Z"/></svg>
                Security
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30" fill="white"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
        </div>
        <div class="AccountContainer" id="Enhanced" onclick="OpenUserContainer(this)">
        <img src="Images & Icons/Sprint+ blank.png">
        Sprint+ Enhanced
        <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30" fill="white"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
    </div>
    </div>
    `;
}

function ChangeBio(el) {
    if (el.value.length <= 220) {
        document.getElementById("CharCount").innerHTML = el.value.length+'/220';
        document.getElementById('AITC').innerHTML=el.value;
        let user = JSON.parse(localStorage.getItem('user'));
        user.bio = el.value;
        localStorage.setItem('user',JSON.stringify(user))
    }
}

function CheckTag(el) {
    let value = el.value;
    let TAGS = [
        "Philosophy","History","Litteratry","Poetry","Romance","Horror","Thriller","Fiction","Dystopia","Utopia","Sci-Fi","Anticipation",
        "Drama","Realistic","Young Adult","Fan Fiction","Dark Romance","Fantasy"
    ];
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user.tags) {
        user.tags = [];
    }
    document.getElementById('TagsContainer').innerHTML="";
    for (let i of TAGS) {
        if (i.toLowerCase().includes(value.toLowerCase()) && user.tags.includes(i) != true && el.value.length>=1) {
            document.getElementById('TagsContainer').innerHTML+=`
                <div class="Tag"  id="${i}" onclick="AddTag(this)">
                    <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 96 960 960" width="15" fill="white"><path d="m250 896 43-170H140l15-60h153l45-180H180l15-60h173l42-170h59l-42 170h181l42-170h59l-42 170h153l-15 60H652l-45 180h173l-15 60H592l-42 170h-60l43-170H352l-42 170h-60Zm117-230h181l45-180H412l-45 180Z"/></svg>
                    ${i}
                </div>
            `;
        }
    }
}

function ChangeUserName(el) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (el.value.length>=3 && el.value.length<=20) {
        user.name = el.value;
        localStorage.setItem('user',JSON.stringify(user));
        document.getElementById('name').innerHTML=el.value;
        return;
    }
} 
function ChangePronun(el) {
    let user = JSON.parse(localStorage.getItem('user'));
        user.pronun = el.value;
        localStorage.setItem('user',JSON.stringify(user));
        document.getElementById('pronun').innerHTML=el.value;
}

function ChangePassword() {
    let one = document.getElementById('p1').value;
    let two = document.getElementById('p2').value;
    let user = JSON.parse(localStorage.getItem('user'));
    if (one === user.password && two.length >=9) {
        user.password=one;
        user.password=two;
        localStorage.setItem('user',JSON.stringify(user));
        OpenInfos()
    }
}

function AddTag(el) {
    let name = el.id;
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user.tags) {
        user.tags = [];
    }
    document.getElementById('AI_interest').innerHTML+=`
        <div class="TagUser">
            <svg onclick="DelTag(this)" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 96 960 960" width="15" fill="white"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
            ${name}
        </div>
    `;
    user.tags.push(name);
    localStorage.setItem('user',JSON.stringify(user));
    CheckTag({value:document.getElementById('SeachTags').value})
}

function OpenUserContainer(el){
    let name = el.id;
    let user = JSON.parse(localStorage.getItem('user'));
    let description;
    let content;
    let additionnal_content;
    if (!user.display) {
        user.display = {
            "Enhanced":false,
            "Projects":{},
            "Characters":{},
            "Plots":{}
        }
    }
    if (el.id === "Username") {
        description = "Your username is publicy displayed on every Sprint+ produced content. Everyone can see it. It must be 3 characters long minimum, 20 maximum, and it must follow our guidelines."
        content = user.name;
        additionnal_content = `
        <div class="ParameterInput">
            <input type="text" value="${content}" oninput="ChangeUserName(this)">
            <input type="text" placeholder="Enter your pronouns" oninput="ChangePronun(this)">
        </div>
        `;
    } else if (el.id === "BioPublicy") {
        name = "Bio & Interests"
        description = "Your bio is what you show of you to others. Do not reveal personnal informations. Follow our guidelines.<br>Tags are displayed to everyone and shows your interests in writing, and reading."
        content = user.bio ? user.bio : `Hi! I'm ${user.name}. Nice to meet you.`;
        additionnal_content = `
            <div class="ParameterInput">
                <textarea type="text" oninput="ChangeBio(this)" maxlength = "220"placeholder="Describe yourself!">${content}</textarea>
                <div id="CharCount">

                </div>
            </div>
            <div class="TagsInput">
                <div class="TagsInputContain">
                    <input type="text" id="SeachTags" placeholder="Search for tags..." oninput="CheckTag(this)">
                    <div id="TagsContainer">

                    </div>
                </div>
            </div>
        `;
    } else if (el.id === "Enhanced") {
        name = "Sprint+ Enhanced";
        description = "Sprint+ Enhanced is the premium version of Sprint+. For more information, check our support server.";
        additionnal_content = `
            <div class="SpriPlusBuy">
                <button>
                    <img src="Images & Icons/Sprint+ blank.png">
                    Buy Sprint+ Enhanced
                    <div class="divmove">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>

                    </div>
                </button>
            </div>
        `;
    } else if (el.id === "Security") {
        name = "Change password";
        description = "Change your password right here. Nine characters minimum. Make sure it is secure. Account deletation & password lost feature are not working yet.";
        additionnal_content = `
            <div class="PasswordInput">
                <input type="password" placeholder="Enter your password" id="p1">
                <input type="password" placeholder="Enter your new password" id="p2">
                <button onclick="ChangePassword()">
                    Confirm my password change
                </button>
            </div>
            <div class="ActInput">
                <div class="ifo-bt-b"  id="security">
                    <button onclick="Download()">
                    <span class="material-symbols-outlined">
                    download
                    </span>
                        Download your datas
                    </button>
                </div>
                <div class="ifo-bt-b" id="security">
                    <button onclick="Merge()">
                    <span class="material-symbols-outlined">
                    upload
                    </span>
                        Merge datas
                    </button>
                </div>
            </div>
        `;
    } else if (el.id === "Partnership") {
        name = "Sprint+ partnerships";
        description = "Sprint+ Parternship is a way for you to promote your content trough our application in exchange of a personnalized Sprint+ app on your page of creation. Instagram account, Discord server, or more: Sprint+ is seeking for publicity.<br>Contact our team manager on <b>Discord</b> for more informations.";
        additionnal_content=""
    } else if (el.id === "Publicy") {
        name = "User Publicy";
        description = "Choose what information you want Sprint+ users to see of you. Interests and bio are automatically displayed, and you choose to put there what you want. You cannot remove the display of these elements.<br>You can however choose which projects you want people to see, if you want people to follow your objectives, or if you want people to interact with your characters and stories plots.";
        additionnal_content=`
            <div class="DisplayChoose">
                <div class="DC">
                    <div class="DisplayName">
                        Sprint+ Enhanced<br>
                        <p>Choose if you want people to see if you own Sprint+ enhanced</p>
                    </div>
                    <div class="DisplayContent">
                        <button id="displayenhanced">
                            ${user.display["Enhanced"] ? "Hide":"Display"}
                        </button>
                    </div>
                </div>
                <div class="DC">
                    <div class="DisplayName">
                        Projects<br>
                        <p>Choose if you want people to see your projects, and what parts of it.</p>
                    </div>
                    <div class="DisplayContent">
                        <div id="PJSelect">
                            
                        </div>
                        <div id="PJChoseParam">
                        </div>
                    </div>
                </div>
            </div>
        `;
        
    }

    document.getElementById('ActiveContain').innerHTML = `
        <div class="ParameterGoBack" id="ParameterGoBack" onclick="GoBackBoard()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="15" viewBox="0 96 960 960" width="15"><path d="M561 816 320 575l241-241 43 43-198 198 198 198-43 43Z"/></svg>
            Back to menu
        </div>
        <div class="ParameterContainer" id="ParameterContainer">
            <div class="ParameterName">
                    ${name}
            </div>
            <div class="ParameterDescription">
                ${description}
            </div>
            ${additionnal_content}
        </div>
    `;
    document.getElementById('ActiveContain').style.height = "100%"
    const Animate = [
        {
        transform: "translateX(-100px)",
        },
        {
        transform: "translateX(0px)",
        }
    ];
    const AnimateTiming = {
        duration: 250,
        iterations: 1,
    };
    document.getElementById(`ParameterGoBack`).animate(Animate,AnimateTiming);
    document.getElementById(`ParameterContainer`).animate(Animate,AnimateTiming);
        if(el.id==="Publicy") {
            document.getElementById('displayenhanced').onclick = function() {
                user.display["Enhanced"] = !user.display["Enhanced"];
                localStorage.setItem('user',JSON.stringify(user));
                document.getElementById('displayenhanced').innerHTML = `${user.display["Enhanced"] ? "Hide":"Display"}`;
                document.getElementById('sprintenhanced').style.display = user.display["Enhanced"] === true ? "flex":"none"
            }
            let items = {...localStorage};
            for (let [k,v] of Object.entries(items)) {
                if (k.includes('Project')) {
                        let V = JSON.parse(v);
                        let status;
                        if (user.display["Projects"][V.name]) {
                            status = user.display["Projects"][V.name].displayproject;
                        } else {
                            status = false;
                        }
                        document.getElementById('PJSelect').innerHTML+=`
                            <div class="pjshow" id="${V.name}" onclick="OpenPublicyParam(this)">
                                ${status===true?`
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480.118 726Q551 726 600.5 676.382q49.5-49.617 49.5-120.5Q650 485 600.382 435.5q-49.617-49.5-120.5-49.5Q409 386 359.5 435.618q-49.5 49.617-49.5 120.5Q310 627 359.618 676.5q49.617 49.5 120.5 49.5Zm-.353-58Q433 668 400.5 635.265q-32.5-32.736-32.5-79.5Q368 509 400.735 476.5q32.736-32.5 79.5-32.5Q527 444 559.5 476.735q32.5 32.736 32.5 79.5Q592 603 559.265 635.5q-32.736 32.5-79.5 32.5ZM480 856q-146 0-264-83T40 556q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601 796 702.5 730.5 804 665 857 556q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359 316 257.5 381.5 156 447 102 556q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z"/></svg>
        
                                `:`
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m629 637-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650 556q0 22-5.5 43.5T629 637Zm129 129-40-40q49-36 85.5-80.5T857 556q-50-111-150-175.5T490 316q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485 256q143 0 261.5 81.5T920 556q-26 64-67 117t-95 93Zm58 226L648 827q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40 556q20-52 55.5-101.5T182 360L56 234l42-43 757 757-39 44ZM223 402q-37 27-71.5 71T102 556q51 111 153.5 175.5T488 796q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z"/></svg>
                                `}
                                ${V.name}
                            </div>
                        `;
                }
            }
        }
}

function OpenPublicyParam(el) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user.display) {
        user.display = {
            "Enhanced":false,
            "Projects":{},
            "Characters":{},
            "Plots":{}
        }
    }
    if (!user.display["Projects"][el.id]) {
        user.display["Projects"][el.id] = {
            displayproject : false,
            displaycover : false,
            displaydesc : false,
            displaylinked : false,
        }
    }
    let pj = user.display["Projects"][el.id];
    document.getElementById('PJChoseParam').innerHTML = `
        <div class="PJCP">
                Display project<br>
                <p>You must display the project in order to choose display settings.</p>
            <button id="ChangePJPublicy">
                    ${pj.displayproject===false?`
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480.118 726Q551 726 600.5 676.382q49.5-49.617 49.5-120.5Q650 485 600.382 435.5q-49.617-49.5-120.5-49.5Q409 386 359.5 435.618q-49.5 49.617-49.5 120.5Q310 627 359.618 676.5q49.617 49.5 120.5 49.5Zm-.353-58Q433 668 400.5 635.265q-32.5-32.736-32.5-79.5Q368 509 400.735 476.5q32.736-32.5 79.5-32.5Q527 444 559.5 476.735q32.5 32.736 32.5 79.5Q592 603 559.265 635.5q-32.736 32.5-79.5 32.5ZM480 856q-146 0-264-83T40 556q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601 796 702.5 730.5 804 665 857 556q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359 316 257.5 381.5 156 447 102 556q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z"/></svg>

                `:`
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m629 637-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650 556q0 22-5.5 43.5T629 637Zm129 129-40-40q49-36 85.5-80.5T857 556q-50-111-150-175.5T490 316q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485 256q143 0 261.5 81.5T920 556q-26 64-67 117t-95 93Zm58 226L648 827q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40 556q20-52 55.5-101.5T182 360L56 234l42-43 757 757-39 44ZM223 402q-37 27-71.5 71T102 556q51 111 153.5 175.5T488 796q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z"/></svg>
                `}
                ${pj.displayproject===false?"Display":"Hide"} ${el.id}
            
            </button>
        </div>
        <div id="DisplaySettings" style="display:${pj.displayproject===false?"none":"flex"}">
            <div class="PJCPB">
                <p>
                    ${
                        pj.displaycover===true?`
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480.118 726Q551 726 600.5 676.382q49.5-49.617 49.5-120.5Q650 485 600.382 435.5q-49.617-49.5-120.5-49.5Q409 386 359.5 435.618q-49.5 49.617-49.5 120.5Q310 627 359.618 676.5q49.617 49.5 120.5 49.5Zm-.353-58Q433 668 400.5 635.265q-32.5-32.736-32.5-79.5Q368 509 400.735 476.5q32.736-32.5 79.5-32.5Q527 444 559.5 476.735q32.5 32.736 32.5 79.5Q592 603 559.265 635.5q-32.736 32.5-79.5 32.5ZM480 856q-146 0-264-83T40 556q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601 796 702.5 730.5 804 665 857 556q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359 316 257.5 381.5 156 447 102 556q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z"/></svg>
                        `:`
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m629 637-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650 556q0 22-5.5 43.5T629 637Zm129 129-40-40q49-36 85.5-80.5T857 556q-50-111-150-175.5T490 316q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485 256q143 0 261.5 81.5T920 556q-26 64-67 117t-95 93Zm58 226L648 827q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40 556q20-52 55.5-101.5T182 360L56 234l42-43 757 757-39 44ZM223 402q-37 27-71.5 71T102 556q51 111 153.5 175.5T488 796q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z"/></svg>
                        `}
                    Cover
                </p>
                <button id="cover">
                     ${pj.displaycover===false?`
                        Display
                     `:`Hide`}
                </button>
            </div>
            <div class="PJCPB">
            <p>
                ${
                    pj.displaydesc===true?`
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480.118 726Q551 726 600.5 676.382q49.5-49.617 49.5-120.5Q650 485 600.382 435.5q-49.617-49.5-120.5-49.5Q409 386 359.5 435.618q-49.5 49.617-49.5 120.5Q310 627 359.618 676.5q49.617 49.5 120.5 49.5Zm-.353-58Q433 668 400.5 635.265q-32.5-32.736-32.5-79.5Q368 509 400.735 476.5q32.736-32.5 79.5-32.5Q527 444 559.5 476.735q32.5 32.736 32.5 79.5Q592 603 559.265 635.5q-32.736 32.5-79.5 32.5ZM480 856q-146 0-264-83T40 556q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601 796 702.5 730.5 804 665 857 556q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359 316 257.5 381.5 156 447 102 556q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z"/></svg>
                    `:`
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m629 637-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650 556q0 22-5.5 43.5T629 637Zm129 129-40-40q49-36 85.5-80.5T857 556q-50-111-150-175.5T490 316q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485 256q143 0 261.5 81.5T920 556q-26 64-67 117t-95 93Zm58 226L648 827q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40 556q20-52 55.5-101.5T182 360L56 234l42-43 757 757-39 44ZM223 402q-37 27-71.5 71T102 556q51 111 153.5 175.5T488 796q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z"/></svg>
                    `}
                Description
            </p>
                <button id="description">
                    ${pj.displaydesc===false?`
                        Display
                    `:`Hide`}
                </button>
            </div>
            <div class="PJCPB">
                <p>
                    ${
                        pj.displaylinked===true?`
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480.118 726Q551 726 600.5 676.382q49.5-49.617 49.5-120.5Q650 485 600.382 435.5q-49.617-49.5-120.5-49.5Q409 386 359.5 435.618q-49.5 49.617-49.5 120.5Q310 627 359.618 676.5q49.617 49.5 120.5 49.5Zm-.353-58Q433 668 400.5 635.265q-32.5-32.736-32.5-79.5Q368 509 400.735 476.5q32.736-32.5 79.5-32.5Q527 444 559.5 476.735q32.5 32.736 32.5 79.5Q592 603 559.265 635.5q-32.736 32.5-79.5 32.5ZM480 856q-146 0-264-83T40 556q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601 796 702.5 730.5 804 665 857 556q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359 316 257.5 381.5 156 447 102 556q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z"/></svg>
                        `:`
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m629 637-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650 556q0 22-5.5 43.5T629 637Zm129 129-40-40q49-36 85.5-80.5T857 556q-50-111-150-175.5T490 316q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485 256q143 0 261.5 81.5T920 556q-26 64-67 117t-95 93Zm58 226L648 827q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40 556q20-52 55.5-101.5T182 360L56 234l42-43 757 757-39 44ZM223 402q-37 27-71.5 71T102 556q51 111 153.5 175.5T488 796q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z"/></svg>
                        `}
                    Linked content
                </p>
                <button id="linked">
                    ${pj.displaylinked===false?`
                        Display
                    `:`Hide`}
                </button>
            </div>
        </div>
    `;
    let TC = ["cover","description","linked"];
    for (let i of TC) {
        document.getElementById(i).onclick = function() {
            if (i=="cover") {
                pj.displaycover = !pj.displaycover;
            } else if (i==="description") {
                pj.displaydesc = !pj.displaydesc;
            } else if (i==="linked") {
                pj.displaylinked = !pj.displaylinked;
            }
            user.display["Projects"][el.id] = pj;
            localStorage.setItem('user',JSON.stringify(user));    
            OpenPublicyParam({id:el.id});
        }
    }

    document.getElementById('ChangePJPublicy').onclick = function() {
        pj.displayproject = !pj.displayproject;
        user.display["Projects"][el.id] = pj;
        localStorage.setItem('user',JSON.stringify(user));
        document.getElementById('DisplaySettings').style.display=pj.displayproject===true?"flex":"none";

        OpenPublicyParam({id:el.id});
    }
}

