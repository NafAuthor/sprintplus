
let chapterincharge;




window.onbeforeunload = confirmExit;
function confirmExit(){
    if (document.getElementById('savebubble') && document.getElementById('savebubble').style.visibility=="visible") {
        return "You have unsaved changes. Please make sure to save your content before leaving.";
    }
}


function OpenEditor() {
    document.getElementById('Main').innerHTML = `
        <div class="PJContainer">
            <div class="PJContainerDesc">
                Select a project to get started
                <p>
                    Double click on your project to open the editor
                </p>
            </div>
            <div id="PJContain">

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
            if(!pj.chapters) {
                pj.chapters = {};
            }
        }
    }
    PJs.sort(function(a,b){
      return b.star- a.star
    });
    PJs.sort(function(a,b){
      return a.backed- b.backed
    });
    for (let pj of PJs) {
        let chapterlength = 0;
        for (let [k,v] of Object.entries(pj.chapters)) {
            if (v != null && v != undefined) {
                chapterlength++;
            }
        }
        document.getElementById('PJContain').innerHTML+=`
            <div class="pjwriting" id="${pj.name}" onclick="OpenWriting(this)">
                <img src="${pj.cover?pj.cover:"Images & Icons/Sprint+ logo blank.png"}">
                <div class="pjwritinginfoscontainer">
                    <div class="pjwritingname">
                        ${pj.name}
                    </div>
                    <div class="pjwritinchapters">
                        ${chapterlength} chapter${chapterlength>1?"s":""}
                    </div>
                </div>
                ${pj.star?`
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20" fill="yellow"><path d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg>
                `:""}
            </div>
        `;
    }
}



function OpenWriting(el) {
    InCharge = el.id;
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    chapterincharge=false;
    if (!pj.chapters) {
        pj.chapters={};
    }

    document.getElementById('Main').innerHTML = `
        <div class="ChapterContainer">
            <div class="ChapterContainerBack">
                <svg  id="writinghoverable" onclick="OpenAll()" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm-60 60V456l320-240 320 240v480H530V686H430v250H160Zm320-353Z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
                <p id="writinghoverable" onclick="OpenEditor()">Writing</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
                <p>${InCharge}</p>

            </div>
            <div class="ChapterContainDesc">
                <p>Select a chapter or</p>
                <div class="NewChapterButton" onclick="CreateNewChapter()">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20" fill="white"><path d="M220.001 905.998v-616.15q0-23.231 17.039-40.462 17.038-17.231 40.654-17.231h404.612q23.616 0 40.654 17.231 17.039 17.231 17.039 40.462v616.15L480 794.46 220.001 905.998Z"/></svg>
                        Create a new chapter
                    </button>
                </div>
            </div>
            <div id="ChapterContain">

            </div>
        </div>
    `;
    let Chapters=[]
    for (let [key, value] of Object.entries(pj.chapters)) {
        if (value != null && value !=undefined) {
            Chapters.push(value)
        }
    }
    Chapters.sort(function(a,b){
      return b.number- a.number
    });
    for (let ch of Chapters) {
        document.getElementById('ChapterContain').innerHTML+=`
            <div class="chapterwriting" id="${ch.number}" onclick="GetChapter(this)">
                <div class="chapterwritingcontent">
                    <div class="chname">
                        <div class="chapternb">
                            ${ch.number} -
                        </div>
                       <p>${ch.name}</p>
                    </div>
                    <div class="chdesc">
                        ${ch.desc}
                    </div>
                </div>
                ${ch.finished?`
                <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" width="25" fill="green"><path d="m435.154 782.152 214.383-213.998-29.768-29.769-184.615 185-98.769-98.769L307.001 654l128.153 128.152Zm-197.46 173.847q-23.529 0-40.611-17.082-17.082-17.082-17.082-40.611V253.694q0-23.529 17.082-40.611 17.082-17.082 40.611-17.082h347.537l194.768 194.768v507.537q0 23.529-17.082 40.611-17.082 17.082-40.611 17.082H237.694ZM562.539 411.23V241.385H237.694q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v644.612q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846h484.612q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463V411.23H562.539ZM225.385 241.385V411.23 241.385v669.23V241.385Z"/></svg>
                `:""}
            </div>
        `;
    }
}
function SetPJ() {
    var event = new MouseEvent('dblclick', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
    OpenEditor();
    document.getElementById(InCharge).dispatchEvent(event);
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

function NewChapter(el) {
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
        document.getElementById('Main').innerHTML = `
        <div class="editorcontainer">
            <div class="ChapterContainerBack">
                <svg  id="writinghoverable" onclick="OpenAll()" xmlns="http://www.w3.org/2000/svg" fill="white" height="20" viewBox="0 96 960 960" width="20"><path d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm-60 60V456l320-240 320 240v480H530V686H430v250H160Zm320-353Z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
                <p id="writinghoverable" onclick="OpenEditor()">Writing</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
                <p id="writinghoverable" onclick="SetPJ()" >${InCharge}</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
                <p>${chapterincharge.name}</p>
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
            </div>
            <div class="chaptermv">
                <div class="chapternew">
                    <div class="infovocal">
                        <span class="material-symbols-outlined">
                        info
                        </span>
                        You can use your speech-to-text keyboard feature to write
                    </div>
                    <input type="text" onchange="Save(false)" value="${!chapterincharge?"New chapter":chapterincharge.name}" id="newchaptername" placeholder="Chapter name">
                    <div class="chapternewopendesc" id="chapternewopendesc" onclick="OpenDesc()">
                        Description
                    </div>

                    <div class="chapterdescription" id="newchapterdesc">
                        <textarea onchange="Save(false)" placeholder="Chapter description" id="newchapterdescvalue">${chapterincharge?chapterincharge.desc:""}</textarea>
                    </div>
                    <button onclick="Save(false)" style="position:relative;">
                        Save
                        <div class="savebubble" id="savebubble" style="visibility:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M479.911 936Q451 936 430.5 915.411q-20.5-20.588-20.5-49.5Q410 837 430.589 816.5q20.588-20.5 49.5-20.5Q509 796 529.5 816.589q20.5 20.588 20.5 49.5Q550 895 529.411 915.5q-20.588 20.5-49.5 20.5ZM410 696V216h140v480H410Z"/></svg>


                        </div>
                    </button>
                    <button onclick="StatusDone()"  >
                        Mark as ${chapterincharge.finished?"unfinished":"finished"}
                    </button>
                    <div class="removeChapter">
                        <input type="text" placeholder="Project password" onchange="CheckPassword(this)">
                    </div>
                </div>
                <div class="chaptermvv">
                    <span class="material-symbols-outlined" onclick="AddSpaceBar()"">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M180.001 675.999V456h45.384v174.615h509.23V456h45.384v219.999H180.001Z"/></svg>
                    </span>
                    <span class="material-symbols-outlined" onclick="Bold()">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M295.771 840.999V311.001h199.536q61.769 0 106.423 39.692 44.653 39.692 44.653 98.692 0 35.692-20.038 67.115-20.039 31.423-56.193 47.654v4.461q44.154 12.846 69.116 48.462 24.961 35.615 24.961 77.923 0 61.076-47.307 103.537-47.307 42.462-114.23 42.462H295.771ZM356 787.693h142.461q39.923 0 72.347-26.731 32.423-26.731 32.423-70.501 0-42.769-32.231-69.5t-72.154-26.731H356v193.463Zm0-244.308h135.23q38.077 0 67.039-25.307 28.962-25.308 28.962-64.539 0-38.462-28.769-64.462-28.77-26.001-67.232-26.001H356v180.309Z"/></svg>
                    </span>
                    <span class="material-symbols-outlined" onclick="Italic()">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M233.231 841.614v-57.69h133.616L510.463 363H358.386v-57.691h351.536V363H573.999L430.768 783.924h154v57.69H233.231Z"/></svg>
                    </span>
                    <span class="material-symbols-outlined" onclick="UnderLine()">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M213.847 886.382v-45.383h532.306v45.383H213.847ZM480 757.152q-92.307 0-145.153-53.499-52.846-53.5-52.846-145.422V232.54h59.537v324.921q0 65.693 36.692 104.462 36.693 38.77 101.77 38.77t101.77-38.77q36.692-38.769 36.692-104.462V232.54h59.537v325.691q0 91.922-52.846 145.422Q572.307 757.152 480 757.152Z"/></svg>
                    </span>
                    <span class="material-symbols-outlined" onclick="StyleText()" id="FormAlign">${document.getElementById('styletextalign') ? "format_align_"+document.getElementById('styletextalign').style.textAlign:"format_align_left"}</span>
                    <span class="material-symbols-outlined" onclick="RemoveContent()" >
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M278.309 915.999q-23.596 0-40.644-17.048-17.048-17.049-17.048-40.645V314.078h-40.616v-45.384h171.076v-28.077h257.846v28.077h171.076v45.384h-40.616v544.228q0 23.529-17.081 40.611-17.082 17.082-40.611 17.082H278.309ZM694 314.078H266v544.228q0 5.385 3.654 8.847 3.655 3.462 8.655 3.462h403.382q4.616 0 8.462-3.846 3.847-3.847 3.847-8.463V314.078ZM381.232 786.154h45.383V397.539h-45.383v388.615Zm152.153 0h45.383V397.539h-45.383v388.615ZM266 314.078V870.615 314.078Z"/></svg>
                    </span>
                    <input type="color" id="textcolor" oninput="ChangeTextBoxColor(this)">
                </div>
            </div>
            <div id="editcontent" contentEditable="true" oninput="BubbleVisible()"></div>
            <div class="autosave" id="autosave" style="opacity:0">
                <span class="material-symbols-outlined">
                save
                </span>
                Saved
            </div>
        </div>
        `;

        document.getElementById('newchapterdesc').style.visibility="hidden";
        document.getElementById("editcontent").innerHTML = chapterincharge.content;
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
    Save(false)

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
    Save(false)

}


function BubbleVisible() {
    console.log('modif')
    document.getElementById('savebubble').style.visibility='visible';
}

function Save(d) {
    console.log('Saving content (Save())')
    if (CheckInt(document.getElementById('newchapternb')) === true) {
        AutoSave(d);
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
        SetPJ();
        if (chapterincharge) {
            GetChapter({id:chapterincharge.number})
        }
    }

}

function CheckPassword(el) {
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    if (el.value == pj.password) {
        delete pj.chapters[chapterincharge.number];

        localStorage.setItem(`Project : ${InCharge}`, JSON.stringify(pj));
        if (pj) {
            SetPJ();
        }
    }
}

function AutoSave(doNew) {
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

    if (pj && doNew === true) {
        SetPJ();
        if (chapterincharge) {
            GetChapter({id:nb})
        }
    }

    
}


function RemoveContent() {
    const text = window.getSelection().toString();
    if(text.length>0) {
        window.getSelection().deleteFromDocument();
    }
}
function ChangeTextBoxColor(el) {
    UserLOGS.before = document.getElementById('editcontent').innerHTML;
    let color = el.value;
    console.log(color)
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, color);
    document.getElementById('savebubble').style.visibility="visible";
}



function OpenDesc() {
    let v = document.getElementById('newchapterdesc');
        v.style.visibility=v.style.visibility==="hidden"?"visible":"hidden";



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
    Save(false)

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
    Save(false)

}
function AddSpaceBar() {
    UserLOGS.before = document.getElementById('editcontent').innerHTML;
    zzz="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    document.execCommand('insertHTML', false, bar.outerHTML);
    Save(false)
}

let UserLOGS = {
    before: "",
}


function Italic() {
    UserLOGS.before = document.getElementById('editcontent').innerHTML;
    performAction("italic")
    Save(false)
}

function UnderLine() {
    UserLOGS.before = document.getElementById('editcontent').innerHTML;
    performAction("underline")
    Save(false)
}
function Bold() {
    UserLOGS.before = document.getElementById('editcontent').innerHTML;
    performAction("bold");
    Save(false)

}

