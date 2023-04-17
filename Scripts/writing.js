let chapterincharge;



function ClearSpan() {
    document.getElementById('editcontent').innerHTML="";
}

window.onbeforeunload = confirmExit;
function confirmExit(){
    if (document.getElementById('savebubble') && document.getElementById('savebubble').style.visibility=="visible") {
        return "You have unsaved changes. Please make sure to save your content before leaving.";
    }
}

function OpenWriting(el) {
    InCharge;
    chapterincharge=false;

    document.getElementById('Main').innerHTML = `
        <div class="writingcontent">
            <div class="writingselect">
                <div id="clicktodevelop">
                    Click to develop
                </div>
                <div class="writingselectinfos">
                    <p>Select a project</p>
                    <div id="writingselect">

                    </div>
                </div>
                <div id="writingselectsep"></div>
                <div class="writingchapterinfos">
                    <p>Select a chapter</p>
                    <div id="writingselectchap">

                    </div>
                </div>
                <div id="writingselectsep"></div>
                <div class="writing_ressources">
                    <p>Writer ressources</p>
                    <button onclick="CreateNewChapter()">
                        <span class="material-symbols-outlined">
                        bookmark
                        </span>
                        New chapter
                    </button>
                    <button>
                        <span class="material-symbols-outlined">
                        emoji_people
                        </span>
                        Characters
                    </button>
                    <button>
                        <span class="material-symbols-outlined">
                        timeline
                        </span>
                        Conducting line
                    </button>
                </div>
            </div>
            <div id="writingdisplayer">

            </div>
        </div>
    `;
    let items = {...localStorage};
    PJs=[]
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
    for (let p of PJs) {
        document.getElementById('writingselect').innerHTML+=`
            <div class="pj-select-writing" id="${p.name}" onclick="SetPJ(this)">
                <span style="font-size:10px;"class="material-symbols-outlined" >
                ${p.star?"star":(p.backed?"hide_source":"blur_on")}
                </span>
                ${p.name}
            </div>
        `;
    }
}
function SetPJ(el) {
    InCharge = el.id;
    let p = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    let i = document.getElementsByClassName('pj-select-writing');
    for (let p of i) {
        p.style.backgroundColor=document.documentElement.style.getPropertyValue('--main-clear');
    }
    document.getElementById(el.id).style.backgroundColor="rgba(255,255,255,0.1)";

        if (p.chapters) {
            for (let [n,v] of Object.entries(p.chapters)) {
                if (v!=null) {
                    document.getElementById('writingselectchap').innerHTML+=`
                    <div class="goal-select-writing" id="${n}" onclick="GetChapter(this)">
                        <div class="namecontent">
                            ${n} - ${v.name}
                        </div>
                        <span class="material-symbols-outlined" style="color:${v.finished?"green":"red"}">
                        inventory
                        </span>
                    </div>
            `;
                }
        }
    }
}


function CreateNewChapter() {
    chapterincharge=false;
    NewChapter()
}

function GetChapter(el) {
    let nb = parseInt(el.id);
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    if (!pj.chapters) {
        pj.chapters={};

    }
    pj.chapters[nb].number=nb;
    chapterincharge=pj.chapters[nb];
    NewChapter()
}

function NewChapter() {
    if (InCharge) {
        let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
        let chaptersnb =  1;
        if (pj.chapters) {
            let size = Object.keys(pj.chapters).length;
            function Calc() {
                for (let i = 1 ; i < size+2; i++) {
                    console.log(i)
                    if (pj.chapters[i] === null || pj.chapters[i] === undefined) {
                        chaptersnb=i;
                        return;
                    }
                }
            }
            Calc()
        } else {
            chaptersnb=1;
        }
        document.getElementById('writingdisplayer').innerHTML = `
            <div class="chaptermv">
                <div class="chapternew">
                    <div class="infovocal">
                        <span class="material-symbols-outlined">
                        info
                        </span>
                        You can use your speech-to-text keyboard feature to write
                    </div>
                    <div class="numberinput">
                        <input readonly type="text" onchange="CheckInt(this)" min="1" value="${!chapterincharge?chaptersnb:chapterincharge.number}" id="newchapternb" placeholder="x">
                        <div class="plusless">
                            <span class="material-symbols-outlined" onclick="MoreInt()">
                            add
                            </span>
                            <span class="material-symbols-outlined" onclick="LessInt()">
                            remove
                            </span>
                        </div>
                        </div>
                    <input type="text" onchange="Save()" value="${!chapterincharge?"New chapter":chapterincharge.name}" id="newchaptername" placeholder="Chapter name">
                    <div class="chapternewopendesc" id="chapternewopendesc" onclick="OpenDesc()">
                        <span class="material-symbols-outlined">
                            description
                        </span>
                        View description
                    </div>
                    <div class="chapterdescription" id="newchapterdesc">
                        <textarea onchange="Save()" placeholder="Chapter description" id="newchapterdescvalue">${chapterincharge?chapterincharge.desc:""}</textarea>
                    </div>
                    <div class="itemact">
                        <span class="material-symbols-outlined" onclick="Save()" style="position:relative;">
                            save
                            <div class="savebubble" id="savebubble" style="visibility:hidden">
                                <span class="material-symbols-outlined">
                                priority_high
                                </span>
                            </div>
                        </span>
                        <span class="material-symbols-outlined" onclick="StatusDone()" style="color:${chapterincharge?(chapterincharge.finished ? "green":"red"):"red"}" >
                            inventory
                        </span>
                        <div class="removeChapter">
                            <span class="material-symbols-outlined" id="removechapter">
                                delete
                                <input type="text" placeholder="Project password" onchange="CheckPassword(this)">
                            </span>
                        </div>
                    </div>
                </div>
                <div class="chaptermvv">
                    <span class="material-symbols-outlined" onclick="AddSpaceBar()"">
                        space_bar
                    </span>
                    <span class="material-symbols-outlined" onclick="Bold()">
                        format_bold
                    </span>
                    <span class="material-symbols-outlined" onclick="Italic()">
                        format_italic
                    </span>
                    <span class="material-symbols-outlined" onclick="UnderLine()">
                    format_underlined
                    </span>
                    <span class="material-symbols-outlined" onclick="StyleText()" id="FormAlign">${document.getElementById('styletextalign') ? "format_align_"+document.getElementById('styletextalign').style.textAlign:"format_align_left"}</span>
                        <span class="material-symbols-outlined" onclick="RemoveContent()" >
                            remove
                        </span>
                        <input type="color" id="textcolor" value="#000000" oninput="ChangeTextBoxColor(this)">
                        <span class="material-symbols-outlined" onclick="Before()">
                        navigate_before
                        </span>
                </div>
            </div>
            <div id="editcontent" contentEditable="true" oninput="BubbleVisible()"></div>
            <div class="autosave" id="autosave" style="opacity:0">
                <span class="material-symbols-outlined">
                save
                </span>
                Saved
            </div>
        `;

        document.getElementById('newchapterdesc').style.visibility="hidden";
        if (chapterincharge) {
            document.getElementById('editcontent').innerHTML = chapterincharge.content;
            let i = document.getElementsByClassName('goal-select-writing');
            for (let p of i) {
                p.style.backgroundColor=document.documentElement.style.getPropertyValue('--main-clear');
            }
            document.getElementById(chapterincharge.number).style.backgroundColor="rgba(255,255,255,0.2)";
        }
    } else {
        alert('No pj selected')
    }

}
function MoreInt() {
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    let nb = parseInt(document.getElementById('newchapternb').value)+1;
    function Calc() {
        if (pj.chapters[nb]!=null) {
            nb++;
            Calc(nb)
        }
    }
    if (pj.chapters) {
        Calc(nb);
    }
    document.getElementById('newchapternb').value = nb;


}

function LessInt() {
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    let nb = parseInt(document.getElementById('newchapternb').value)-1;


    function Calc() {
        if (pj.chapters[nb]!=null && nb>=1) {
            nb--;
            Calc(nb)
        }
    }
    if (pj.chapters) {
        Calc(nb);
    }
    document.getElementById('newchapternb').value = nb;
    if (nb<1) {
        for (let i = 1; i<  Object.keys(pj.chapters).length+2; i++) {
            console.log(i)
         if (pj.chapters[i] === null || pj.chapters[i]===undefined) {
            document.getElementById('newchapternb').value = i;
            console.log(i)
            return;
         }
        }
    }
}


function BubbleVisible() {
    console.log('modif')
    document.getElementById('savebubble').style.visibility='visible';
}

function Save() {
    console.log('Saving content (Save())')
    if (CheckInt(document.getElementById('newchapternb')) === true) {
        AutoSave();
    }
}

function CheckInt(el) {
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    let value = parseInt(el.value)
    if (!pj.chapters) {
        pj.chapters = {};
    }
    if (pj.chapters[value]!=null && pj.chapters[value].number != chapterincharge.number) {
        el.style.border="1px solid red";
        el.style.borderStyle="none none solid none"
        el.style.borderRadius="5px 5px 0px 0px";
        console.log('Checkint : false')
        return false;
    } else {
        el.style.border="none";
        console.log('Checkint : true')
        return true;
    }
}

function StatusDone() {
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    if (!pj.chapters[chapterincharge.number].finished ) {
        pj.chapters[chapterincharge.number].finished  = false;
    }
    pj.chapters[chapterincharge.number].finished  = !pj.chapters[chapterincharge.number].finished ;
    localStorage.setItem(`Project : ${InCharge}`, JSON.stringify(pj));
    if (pj) {
        document.getElementById('writingselectchap').innerHTML = "";
        SetPJ({id:InCharge});
        if (chapterincharge) {
            GetChapter({id:chapterincharge.number})
        }
    }

}

function CheckPassword(el) {
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    if (el.value == pj.password) {
        delete pj.chapters[chapterincharge.number];

        document.getElementById('writingdisplayer').innerHTML="";
        localStorage.setItem(`Project : ${InCharge}`, JSON.stringify(pj));
        if (pj) {
            SetPJ({id:InCharge});
        }
    }
}

function AutoSave() {
    document.getElementById('savebubble').style.visibility="hidden";
    let name = document.getElementById('newchaptername').value;
    let nb = parseInt(document.getElementById('newchapternb').value);
    let desc = document.getElementById('newchapterdescvalue').value;
    let content = document.getElementById('editcontent').innerHTML;

    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    if (!pj.chapters) {
        pj.chapters = {};
    }

    let Chapter = {
        name : name,
        number : nb,
        desc : desc,
        content : content,
        finished : chapterincharge.finished
    }
    delete pj.chapters[chapterincharge.number];
    console.log(Chapter)
    pj.chapters[nb] = Chapter;
    chapterincharge = Chapter;
    localStorage.setItem(`Project : ${InCharge}`,JSON.stringify(pj))

    if (pj) {
        document.getElementById('writingselectchap').innerHTML="";
        SetPJ({id:InCharge});
        if (chapterincharge) {
            GetChapter({id:nb})
        }
    }
    document.getElementById('autosave').style.opacity = "1";
    setTimeout(()=> {
        document.getElementById('autosave').style.opacity = "0";
    },1500);

}


function RemoveContent() {
    const text = window.getSelection().toString();
    if(text.length>0) {
        window.getSelection().deleteFromDocument();
    }
}
function ChangeTextBoxColor() {
    UserLOGS.before = document.getElementById('editcontent').innerHTML;
    color = document.getElementById("textcolor").value;
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, color);
    document.getElementById('savebubble').style.visibility="visible";
}



function OpenDesc() {
    let i = document.getElementById('chapternewopendesc');
    let v = document.getElementById('newchapterdesc');
    if (i.innerHTML.includes('View')) {
        document.getElementById('chapternewopendesc').innerHTML = `
            <span class="material-symbols-outlined">
                description
            </span>
            Hide description
        `;
        v.style.visibility="visible";
    } else {
        i.innerHTML = `
            <span class="material-symbols-outlined">
                description
            </span>
            View description
        `;
        v.style.visibility="hidden";
    }

}
function performAction(command) {
    document.execCommand(command, false, null);
    document.getElementById('editcontent').focus();
  }
function StyleText() {
    UserLOGS.before = document.getElementById('editcontent').innerHTML;
    let editbox = document.getElementById('editcontent');
    if (!document.getElementById('styletextalign')) {
        let inner = editbox.innerHTML;
        editbox.innerHTML = `
        <div id="styletextalign" style="text-align:left;padding:0px;">
            ${inner}
        </div>
        `
    }
    let items = ["format_align_left","format_align_right","format_align_center","format_align_justify"]
    let i = document.getElementById('styletextalign');
    let a;
    for (let e = 0 ; e< items.length;e++) {
        console.log(items[e].replace('format_align_',''), i.style.textAlign)
        if (items[e].replace('format_align_','') === i.style.textAlign) {
            console.log(items[e] + " is okay")
            if (e!=3) {
                a = items[e+1];
            } else {
                a = items[0];
            }
            console.log('Item is ' + a.replace('format_align_',''))
        }
    }
    document.getElementById('FormAlign').innerHTML = a;
    document.getElementById('styletextalign').style.textAlign = `${a.replace('format_align_','')}`;
    console.log(document.getElementById('styletextalign').style.textAlign)
    document.getElementById('styletextalign').focus();
    Save()

}
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
function replaceSelectedText(replacementText) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(replacementText));
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = replacementText;
    }
    Save()

}
function AddSpaceBar() {
    UserLOGS.before = document.getElementById('editcontent').innerHTML;
    zzz="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    document.execCommand('insertHTML', false, bar.outerHTML);
    Save()
}

let UserLOGS = {
    before: "",
}
function Before() {
    document.getElementById('editcontent').innerHTML = UserLOGS.before;
}

function Italic() {
    UserLOGS.before = document.getElementById('editcontent').innerHTML;
    performAction("italic")
    Save()
}

function UnderLine() {
    UserLOGS.before = document.getElementById('editcontent').innerHTML;
    performAction("underline")
    Save()
}
function Bold() {
    UserLOGS.before = document.getElementById('editcontent').innerHTML;
    performAction("bold");
    Save()

}

