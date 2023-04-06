
let ADS = {
    "Sprint+": {
        state : 10
        /*
            For the content above:
                - 0 is state 0: minimal view.
                - 2 is state 2: maximal view & partnership view.
                - 3 is state 3: prior view.
        */,
        name : "Sprint+ enhanced", // Ad name
        slog:"Enhance your creativity",
        description : "Enhance your creativity: boost your content, improve your Sprint+ experience, customize your settings even more!",
        linking:"https://discord.gg/72tACSk8Jd",
        logo : "Images & Icons/Sprint+ logo background.png",
        color:"#1a2950",
        jointext:"More"
    }
};
var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};
let TEMPO = 15;
function EvaluateS() {
    let Ad = randomProperty(ADS);
    document.getElementById("ad").innerHTML = `
        <div class="${AdblockDel()}" style="width:100%">
        <div> 
        <div style="border-radius:5px;position:relative;overflow-y:auto;min-height:150px;
        width:100%;height:80%;display:flex;flex-direction:column;gap:10px;" > 
            <div style="display:flex;flex-direction:column;gap:5px;"> <div style="width:100%;text-align:center;">${Ad.name}</div>
            <div style="width:100%;text-align:center;font-size:13px;font-style:italic;"> ${Ad.slog}</div></div>
            <div style="overflow-y:auto;width:95%;height:fit-content;max-height:50%;font-size:13px;overflow-x:hidden;padding-left:5px;padding-right:5px;"> ${Ad.description}</div>
            <div class="addjoin" > 
            <button style="width:100%;object-fit: contain;display:flex;
            flex-direction:row;gap:10px;justify-content:center;align-items:center;cursor:pointer;" onclick="window.open('${Ad.linking}')"> 
            <img src="${Ad.logo}" style="width:fit-content;height:100%;"> <p>${Ad.jointext}</p></button> </div>
            </div>
        </div>
        <div class="myAdd">
            <button onclick="window.open('https://discord.gg/72tACSk8Jd')">
                Get my own ad
            </button>
        </div>
        <div class="ADTT">
            The following content has been promoted
            thanks to Sprint+ Enhanced or 
            partnerships.
        </div>
    `;
}

function ReEvaluateAd() {
    EvaluateS()
    setInterval(()=>{
        EvaluateS()
    },TEMPO*1000)
}

setTimeout(() => {
    ReEvaluateAd()
}, 20);