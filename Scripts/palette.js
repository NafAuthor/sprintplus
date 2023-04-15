function ResetCustom() {
    ChangeColor({value:""},"white");
    ChangeDarkVariant({value:""},'#19284d');
    ChangeLightVariant({value:""},'#1d2d55');
    ChangeBackground({value:""},'Images & Icons/Sprint+ logo blank.png');
    changeWidth({value:""},5)

}

function DarkMode() {
    ChangeColor({value:""},"white");
    ChangeDarkVariant({value:""},'#000000');
    ChangeLightVariant({value:""},'#1c1c1c');
}
function LightMode() {
    ChangeColor({value:""},"black");
    ChangeDarkVariant({value:""},'#000000');
    ChangeLightVariant({value:""},'#1c1c1c');
    ChangeBackground({value:""},'');
}

function ChangeColor(element=null,item) {

   let value = element.value;
    if (item) {
        value = item;
    }
    document.body.style.color=value;
    
    let user = JSON.parse(localStorage.getItem('user'));
    user.colorcustom = value;
    localStorage.setItem('user',JSON.stringify(user));
}

/*
:root {
    --main-blue-dark: #19284d;
    --main-clear:#1d2d55;
    --main-background-color: #19284d;
  }
*/
function ChangeDarkVariant(element,item) {
    let value = element.value;
    if (item) {
        value = item;
    }
    document.documentElement.style.setProperty('--main-blue-dark', value);
    let user = JSON.parse(localStorage.getItem('user'));
    user.darkvariant = value;
    localStorage.setItem('user',JSON.stringify(user));

}
function ChangeLightVariant(element,item) {
    let value = element.value;
    if (item) {
        value = item;
    }
    document.documentElement.style.setProperty('--main-clear', value);
    let user = JSON.parse(localStorage.getItem('user'));
    user.lightvariant = value;
    localStorage.setItem('user',JSON.stringify(user));

}
function changeWidth(element,item) {
    let value = element.value;
    if (item) {
        value = item;
    }
    document.getElementById('custombackground').style=`
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    margin:auto;
    width:${value}%;
    opacity:0.5;
    z-index:0;
    `;
    document.getElementById('widthsize').innerHTML = value+"% of the screen";
    let user = JSON.parse(localStorage.getItem('user'));
    user.backgroundwidth = value;
    localStorage.setItem('user',JSON.stringify(user));
}

function ChangeBackground(element,item) {
    let value = element.value;
    if (item) {
        value = item;
    }
    document.getElementById('custombackground').src = value;
    document.getElementById('custombackground').style=`
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        margin:auto;
        width:50%;
        opacity:0.5;
        z-index:0;
    `;
    let user = JSON.parse(localStorage.getItem('user'));
    user.background = value;
    localStorage.setItem('user',JSON.stringify(user));

}

let showContainer = false;

function OpenContainer() {
    showContainer=!showContainer;
    document.getElementById('customize_container').style.display=showContainer?"flex":"none";
}
