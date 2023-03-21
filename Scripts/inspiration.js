function OpenInspiration() {
    BoardCharge="";
    console.log('EEEE')
    document.getElementById('Main').innerHTML = `
    <div class="insp">
    <div class="insp-i">
      <div class="c-p">
        <div class="c-p-t">
        <span class="material-symbols-outlined">
        bookmark_add
        </span>
        <p>Choose a project</p>
        </div>
        <div class="c-p-c">
          <select id="c-p-c" onchange="Board.OnProject()">
          </select>
        </div>
      </div>
      <div class="insp-i-m">
        <div class="i-t" onclick="whts_f()">
          <span id="insp-i-m-t" class="material-symbols-outlined"> expand_more </span> <p>Where to search</p>
        </div>
        <div class="i-b" id="i-b"></div>
      </div>
      <div class="insp-add">
        <div class="inspt-add-t" onclick="inspadd()">
          <span id="inspt-add-t" class="material-symbols-outlined"> expand_more </span> Add content
        </div>
      <div class="inspt-add-b" id="inspt-add-b"></div>
      </div>
      <div class="insp-i-i">
        <div class="insp-i-i-t" onclick="wts_m()">
          <span id="insp-i-i-t" class="material-symbols-outlined"> expand_more </span> <p>What to search</p>
        </div>
        <div class="insp-i-i-m" id="insp-i-i-m"></div>
      </div>
    </div>
    <div class="insp-c" id="insp-c">
    
    </div>

    `;
    let v = 0;
    let items = {... localStorage};
    for (let [n,k] of Object.entries(items)) {
        let K = JSON.parse(k);
        if (n.includes('Project')) {
            document.getElementById('c-p-c').innerHTML+=`
                <option>
                    ${K.name}
                </option>
            `;
            if ( v===0 ){
                document.getElementById('c-p-c').value =  K.name;
                document.getElementById('c-p-c').onchange();
                v = 1;
            }
        }
    }
}


let BoardCharge;
let BoardSP = false;
let Board = {
    remove:function(el) {
        if (document.getElementById(`DIVADBS${el.id}`)) {
            document.getElementById(`DIVADBS${el.id}`).remove();
            console.log(el.id)
            for (let i = 0 ; i < BoardCharge.inspi.length; i++) {
                console.log(BoardCharge.inspi[i].cnt)
                if (BoardCharge.inspi[i].cnt === el.id) {
                    console.log(i)
                    BoardCharge.inspi.splice(i,1);
                    localStorage.setItem(`Project : ${BoardCharge.name}`,JSON.stringify(BoardCharge))
                }
            }
        }
    },
    ClearAlert:function() {
        if (BoardSP) {
            if (document.getElementById('alert-img')) {
                document.getElementById('alert-img').innerHTML="";
            }
            if ( document.getElementById('alert-link')) {
                document.getElementById('alert-link').innerHTML="";
    
            }
            if (document.getElementById('alert-quote')) {
                document.getElementById('alert-quote').innerHTML="";
    
            }
        } 

    },
    OnProject:function() {
        var e = document.getElementById("c-p-c");
        var text = e.options[e.selectedIndex].text;
        let pj = JSON.parse(localStorage.getItem(`Project : ${text}`));
        console.log(text)
        
        BoardCharge = pj;
        if (!pj.inspi) {
            pj.inspi = [];
        } else {
            for (let i = 0; i < pj.inspi.length; i++) {
                console.log(pj.inspi[i])
                if (pj.inspi[i].id === "img") {
                    Board.ImagePlus(pj.inspi[i])
                } else if (pj.inspi[i].id=="quote") {
                    Board.QuotePlus(pj.inspi[i])
                } else if (pj.inspi[i].id=="link") {
                    Board.LinkPlus(pj.inspi[i])
                    console.log("f>SF")

                }
            }
        }
    },
    ImagePlus:function(i) {
        let content;
        if (i) {
            content = i.cnt;
        } else {
            content = document.getElementById('insp-img-add').value; 
        }
        Board.ClearAlert()

        if (isValidUrl(content) && !document.getElementById(`DIVADBS${content}`)&& BoardCharge) {
            const getMeta = (url, cb) => {
                const img = new Image();
                img.onload = () => cb(null, img);
                img.onerror = (err) => cb(err);
                img.src = url;
              };
              
              console.log(content)
              getMeta(content, (err, img) => {
                    let w, h;
                    w = img.naturalWidth;
                    h = img.naturalHeight;
                    if (w>250) {
                        w=(w*15)/100;
                    }
                    if (h>150) {
                        h=(h*15)/100;
                    }
   
                    let IMG = document.createElement('img');
                    IMG.src=content;
                    IMG.style.maxWidth = `100%`;

                    let container = document.createElement('div');
                    container.className="d-c-i-p"
                    container.style.width = `230px`;
                    container.style.position="relative";
                    container.id=`DIVADBS${content}`;

                    let container_options = document.createElement('div');
                    
                    container_options.id="opt-dc"

                    container_options.innerHTML = `
                        <span onclick="Board.remove(this)" class="material-symbols-outlined" style="cursor:pointer;font-size:20px;border-radius:50%;" id="${content}">
                        remove
                        </span>
                    `;
                    container.appendChild(IMG);
                    container.appendChild(container_options);



                    document.getElementById('insp-c').appendChild(container);
                    if (BoardSP) {
                        document.getElementById('insp-img-add').value = "";
                    }

                    if (BoardCharge && !i) {
                        BoardCharge.inspi.push(
                            {id:"img",cnt:content}
                        )
                        localStorage.setItem(`Project : ${BoardCharge.name}`,JSON.stringify(BoardCharge))
                    }

                });
        } else {
            document.getElementById('alert-img').innerHTML="<b>Error</b>: wrong link, duality, or no project.";
        }
    },QuotePlus:function(i) {
        let content;
        if (i) {
            content = i.cnt;
        } else {
            content = document.getElementById('insp-quote-add').value; 
        }
        Board.ClearAlert()

        if (!document.getElementById(`DIVADBS${content}`) && content.split('').length>0 && BoardCharge) {
                console.log(content)
                let container = document.createElement('div');
                container.className="d-c-i-q"

                container.style.position="relative";
                container.style.textAlign="justify";
                container.style.display="flex";
                container.style.flexDirection="row";
                container.style.alignItems="center";
                container.style.gap="15px";
                container.style.width = `230px`;

                container.id=`DIVADBS${content}`;

                let container_options = document.createElement('div');
                container_options.id="opt-dc"
                container_options.innerHTML = `
                    <span onclick="Board.remove(this)" class="material-symbols-outlined" style="cursor:pointer;font-size:20px;border-radius:50%;" id="${content}">
                    remove
                    </span>
                `;

                let container_content = document.createElement('div');
                container_content.innerHTML = `
                    <p style="width:100%">${content}</p>
                `;
                container_content.style = `
                    display:flex;
                    align-items:center;
                    width: 90%;
                    font-size:12px;
                    flex-direction:row;
                    gap:10px;
                `;

                container.appendChild(container_options);
                container.appendChild(container_content)


                document.getElementById('insp-c').appendChild(container);


                    if (BoardSP) {
                        document.getElementById('insp-quote-add').value = "";
                    }
                if (BoardCharge && !i) {
                    BoardCharge.inspi.push(
                        {id:"quote",cnt:content}
                    )
                    localStorage.setItem(`Project : ${BoardCharge.name}`,JSON.stringify(BoardCharge));
                    console.log(BoardCharge)
                }
                    //document.getElementById('insp-c').appendChild(container);

        } else {
            document.getElementById('alert-quote').innerHTML="<b>Error</b>: no text, duality, or no project.";
            document.getElementById('insp-quote-add').value = "";
        }
        
    },
    LinkPlus:function(i) {
        console.log("f>SF")

        let content;
        if (i) {
            content = i.cnt;
        } else {
            content = document.getElementById('insp-link-add').value; 
        }
        Board.ClearAlert()
        if (!document.getElementById(`DIVADBS${content}`) && isValidUrl(content) && BoardCharge ) {
                console.log(content)
                let container = document.createElement('div');
                container.className="d-c-i-q";

                container.style.position="relative";
                container.style.textAlign="justify";
                container.style.display="flex";
                container.style.flexDirection="row";
                container.style.alignItems="center";
                container.style.gap="15px";
                container.style.width = `230px`;

                container.id=`DIVADBS${content}`;

                let container_options = document.createElement('div');
                container_options.id="opt-dc"
                container_options.innerHTML = `
                    <span onclick="Board.remove(this)" class="material-symbols-outlined" style="cursor:pointer;font-size:20px;border-radius:50%;" id="${content}">
                    remove
                    </span>
                `;

                let container_content = document.createElement('div');
                container_content.innerHTML = `
                    <div class="newlink">
                        <div class="op-newlink">
                            <span class="material-symbols-outlined" id="op-newlink">
                                link
                            </span>
                            <a href="${content}" target="_blank">
                                Open in a new page
                            </a>
                        </div>
                        <textarea type="text" readonly=true placeholder="${content}"></textarea>
                    </div>
                `;
                container_content.style = `
                    display:flex;
                    align-items:center;
                    width: 90%;
                    font-size:12px;
                    flex-direction:row;
                    gap:10px;
                `;

                container.appendChild(container_options);
                container.appendChild(container_content)


                document.getElementById('insp-c').appendChild(container);

                if (BoardSP) {
                    document.getElementById('insp-link-add').value = "";
                }
            
                if (BoardCharge && !i) {
                    BoardCharge.inspi.push(
                        {id:"link",cnt:content}
                    )
                    localStorage.setItem(`Project : ${BoardCharge.name}`,JSON.stringify(BoardCharge));
                    //document.getElementById('insp-c').appendChild(container);
                    }
        } else {
            document.getElementById('alert-link').innerHTML="<b>Error</b>: wrong link, duality, or no project.";
            document.getElementById('insp-link-add').value = "";

        }
    }
}

// AJOUTER TEXT + MUSIQUE































let wts, whts, added = false;
let wtshtml = `
Free your mind and jump into your world. <br>
Explore the web in search of what defines your story.
Search what makes you feel good for writing.
`;
let whsthtml = `
<button onclick="window.open('https://www.pinterest.fr/')">
        <img src="https://cdn-icons-png.flaticon.com/512/4096/4096172.png">
        <p>Pinterest</p>

    </button>
    <button onclick="window.open('https://www.artbreeder.com/')">
        <img src="https://pbs.twimg.com/profile_images/1555739625347436544/uurp1PEG_400x400.jpg">
        <p>Artbreeder</p>

    </button>
    <button onclick="window.open('https://www.wattpad.com/')">
        <img src="https://cdn-icons-png.flaticon.com/512/3291/3291661.png">
        <p>Wattpad</p>

    </button>
    <button onclick="window.open('https://www.servicescape.com/writing-prompt-generator')">
        <img src="https://www.servicescape.com/img/fav/og.png">
        <p>ServiceScape</p>

    </button>
    <button onclick="window.open('https://images.google.com/')">
        <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png">
        <p>Google images</p>

    </button>
    <button onclick="window.open('https://www.canva.com/')">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Canva_icon_2021.svg/2048px-Canva_icon_2021.svg.png">
        <p>Canva</p>

    </button>
`;
let addedhtml = `
    <div class="inspt-add-i" id="inspt-add-b-c">
    <input type="text" placeholder="Image link" id="insp-img-add" autocomplete="off">
        <button onclick="Board.ImagePlus()">
        <span class="material-symbols-outlined"> add </span></button>
    </div>
    <div id="alert-img"></div>
    <div class="inspt-add-q"id="inspt-add-b-c">
    <input type="text" placeholder="Text (250 cr.)" id="insp-quote-add" maxlength='250' autocomplete="off">
        <button onclick="Board.QuotePlus()">
        <span class="material-symbols-outlined"> add </span></button>
    </div>
    <div id="alert-quote"></div>
    <div class="inspt-add-l"id="inspt-add-b-c">
    <input type="text" placeholder="Link"  id="insp-link-add" autocomplete="off">
        <button  onclick="Board.LinkPlus()">
        <span class="material-symbols-outlined"> add </span></button>
    </div>
    <div id="alert-link"></div>
`;

let whts_f = function() {
    if (wts) {
        wts_m()
    }
    if (added) {
        inspadd()
    }
    document.getElementById('insp-i-m-t').innerHTML = `
        ${whts ? "expand_more" : "expand_less"}
    `;
    document.getElementById('i-b').innerHTML = `
        ${whts ? "" : whsthtml}
    `
    whts = !whts;
}

let inspadd =  function() {
    if (wts) {
        wts_m()
    }
    if (whts) {
        whts_f()
    }
    document.getElementById('inspt-add-t').innerHTML = `
        ${added ? "expand_more" : "expand_less"}
    `;
    document.getElementById('inspt-add-b').innerHTML = `
        ${added ? "" : addedhtml}
    `
    added = !added;
    BoardSP = !BoardSP;
}

let wts_m = function() {
    if (added) {
        inspadd()
    }
    if (whts) {
        whts_f()
    }
    document.getElementById('insp-i-i-t').innerHTML = `
        ${wts ? "expand_more" : "expand_less"}
    `;
    document.getElementById('insp-i-i-m').innerHTML = `
        ${wts ? "" : wtshtml}
    `
    wts = !wts;
}