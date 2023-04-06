let abc = "abcdefghijklmnopqrstuvwxyz";
let nb = "123456789";
let crctr = `&é"'(-è_çà)=^$ù*,;:!~#{[|\^@]}`;




let size = 5;
let hwm = 3;
let forw = ["Gmail","Wattpad","Instagram"];
let mdps = [];

function MDPs(lgt) {
    let mdp = [];
        for (let i = 0; i < lgt; i++) {
            let x = Math.floor((Math.random() * 3));
            if (x === 0) {
                mdp.push(abc.split('')[Math.floor(Math.random()*abc.split('').length)]);
            } else if(x === 1) {
                mdp.push(nb.split('')[Math.floor(Math.random()*nb.split('').length)]);
            }
        }
    return mdp.join('')
}




function CreatePj(n,lgt) {
    let PJs = [];
    for (let i = 0; i < n; i++) {
        PJs.push({
            name: MDPs(lgt),
            duration: Math.floor(Math.random()*20),
            details: MDPs(50),
            amount_of_words: Math.floor(Math.random()*2000),
            words: 0,
            started: true,
            updates: {}
        })
    }
    return PJs
}
let Pjs = CreatePj(2,10);
for (let i of Pjs) {
    localStorage.setItem(`Project : ${i.name}`, JSON.stringify(i))
}