let chapterincharge;


function OpenWriting(el) {
    InCharge;
    chapterincharge=false;

    document.getElementById('Main').innerHTML = `
        <div class="writingcontent">
            <div class="writingselect">
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
        console.log(p)
        document.getElementById('writingselect').innerHTML+=`
            <div class="pj-select-writing" id="${p.name}" onclick="SetPJ(this)">
                <span style="font-size:10px;"class="material-symbols-outlined">
                ${p.star?"star":(p.backed?"hide_source":"blur_on")}
                </span>
                ${p.name}
            </div>
        `;
    }
}
function SetPJ(el) {
    document.getElementById('writingselectchap').innerHTML=`
    <button onclick="CreateNewChapter()">
        Create a new chapter
    </button>
    `;
    InCharge = el.id;
    let p = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    let i = document.getElementsByClassName('pj-select-writing');
    for (let p of i) {
        p.style.backgroundColor="#1d2d55";
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

setTimeout(() => {
    OpenWriting();
}, 20);

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
    console.log(chapterincharge);
    NewChapter()
}

function NewChapter() {
    if (InCharge) {
        let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
        let chaptersnb =  0;
        if (pj.chapters) {
            let size = Object.keys(pj.chapters).length;
            function Calc() {
                for (let i = 1 ; i < size+1; i++) {
                    if (pj.chapters[i] === null) {
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
                    <input type="text" onchange="Save()" value="${!chapterincharge?"New chapter":chapterincharge.name}" id="newchaptername" placeholder="Chapter name">
                    <input type="number" onchange="CheckInt(this)" min="1" value="${!chapterincharge?chaptersnb:chapterincharge.number}" id="newchapternb" placeholder="x">
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
                        <span class="material-symbols-outlined" onclick="Save()">
                            save
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
                    <span class="material-symbols-outlined" onclick="StyleText()" id="FormAlign">format_align_left</span>
                    <span class="material-symbols-outlined" onclick="RemoveFont()">
                        edit_off
                    </span>
                        <span class="material-symbols-outlined" onclick="RemoveContent()" >
                            remove
                        </span>
                        <input type="color" id="textcolor" value="#ffffff" onchange="ChangeColor()">
                </div>
            </div>
            <div id="editcontent" contentEditable="true" onchange="Save()"></div>
            <div class="autosave" id="autosave">
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
                p.style.backgroundColor="#1d2d55";
            }
            document.getElementById(chapterincharge.number).style.backgroundColor="rgba(255,255,255,0.1)";
        }
    } else {
        alert('No pj selected')
    }

}

function Save() {
    CheckInt(document.getElementById('newchapternb'));

}

function CheckInt(el) {
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    if (pj.chapters[el.value]!=null && pj.chapters[el.value].name != chapterincharge.name) {
        el.style.border="1px solid red";
        el.style.borderStyle="none none solid none"
        el.style.borderRadius="5px 5px 0px 0px"
    } else {
        AutoSave()
        el.style.border="none";
    }
}

function StatusDone() {
    console.log(chapterincharge)
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    if (!pj.chapters[chapterincharge.number].finished ) {
        pj.chapters[chapterincharge.number].finished  = false;
    }
    pj.chapters[chapterincharge.number].finished  = !pj.chapters[chapterincharge.number].finished ;
    localStorage.setItem(`Project : ${InCharge}`, JSON.stringify(pj));
    if (pj) {
        SetPJ({id:InCharge});
        if (chapterincharge) {
            GetChapter({id:chapterincharge.number})
        }
    }

}

function CheckPassword(el) {
    let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    console.log(chapterincharge)
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
    let name = document.getElementById('newchaptername').value;
    let nb = document.getElementById('newchapternb').value;
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
    
    pj.chapters[nb] = Chapter;
    localStorage.setItem(`Project : ${InCharge}`,JSON.stringify(pj))


    document.getElementById('autosave').style.visibility = "visible";

    if (pj) {
        SetPJ({id:InCharge});
        if (chapterincharge) {
            GetChapter({id:chapterincharge.number})
        }
    }
    setTimeout(()=> {
        document.getElementById('autosave').style.visibility = "hidden";
    },500);
}


function RemoveContent() {
    const text = window.getSelection().toString();
    if(text.length>0) {
        window.getSelection().deleteFromDocument();
    }
}
function ChangeColor() {
    const text = window.getSelection().toString();
    if(text.length>0) {
        var btn = document.createElement('span');
        btn.innerHTML = text;
        btn.style.color = document.getElementById("textcolor").value;
        document.addEventListener('keydown', (e) => {
            if (e.code === "Space") {
                console.log("space")
                var btn = document.createElement('span');
                btn.innerHTML = "&#8203;";
                btn.style.color="#ffffff";
                document.execCommand('insertHTML', false, btn.outerHTML);

            }

        });
        document.execCommand('insertHTML', false, btn.outerHTML);
    }
    Save()
}

/*

dfsfds​ dsfsd​​ fdsfdsfdsf
-​​ hey
-tu​​ va​​s​​ bien?
-​​ oui.
*/

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
        console.log(i.innerHTML)
    } else {
        i.innerHTML = `
            <span class="material-symbols-outlined">
                description
            </span>
            View description
        `;
        v.style.visibility="hidden";
    }

    ///<input type="text" placeholder="Chapter description" id="newchapterdesc" placeholder="Chapter description">

}

function StyleText() {
    const text = window.getSelection().toString();
    let items = ["format_align_left","format_align_right","format_align_center","format_align_justify"]
    if(text.length>0) {
        var btn = document.createElement('span');
        btn.innerHTML = text;
        let i = document.getElementById('FormAlign');
        let a;
        for (let e = 0 ; e< items.length;e++) {
            console.log(i.innerHTML, items[e])
            if (items[e] === i.innerHTML) {
                if (e!=items.length-1) {
                    a = items[e+1];
                } else {
                    a = items[0];
                }
            }
        }
        i.innerHTML = a;
        btn.style.textAlign=a.replace("format_align","")
        document.execCommand('insertHTML', false, btn.outerHTML);
    }
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
    var bar = document.createElement('span');
    bar.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    document.execCommand('insertHTML', false, bar.outerHTML);
}
function RemoveFont() {
    const text = window.getSelection().toString();
    if(text.length>0) {
        var btn = document.createElement('span');
        btn.innerHTML = text;
        btn.style.fontWeight = 'normal';
        btn.style.fontStyle = 'normal';
        btn.style.padding="0px !important";
        btn.style.color="white !important";
        document.execCommand('insertHTML', false, btn.outerHTML);
    }
    Save()

}



function Italic() {
    const text = window.getSelection().toString();
    if(text.length>0) {
        var btn = document.createElement('span');
        btn.innerHTML = text;
        btn.style.fontStyle = 'italic';
        document.addEventListener('keydown', (e) => {
            if (e.code === "Space") {
                var btn = document.createElement('span');
                btn.innerHTML = "&nbsp;";
                btn.style.fontWeight = 'normal';
                btn.style.fontStyle = 'normal';
                document.execCommand('insertHTML', false, btn.outerHTML);
            }
        })
        document.execCommand('insertHTML', false, btn.outerHTML);
    }
    Save()
    
}
function Bold() {
    const text = window.getSelection().toString();
    if(text.length>0) {
        var btn = document.createElement('span');
        btn.innerHTML = text;
        btn.style.fontWeight = 'bold';
        document.addEventListener('keydown', (e) => {
            if (e.code === "Space") {
                console.log("Space")
                var btn = document.createElement('span');
                btn.innerHTML = "&#8203;";
                btn.style.fontWeight = 'normal';
                btn.style.fontStyle = 'normal';
                btn.style.color="white";
                document.execCommand('insertHTML', false, btn.outerHTML);

            }

        });
        document.execCommand('insertHTML', false, btn.outerHTML);
    }
    Save()

}