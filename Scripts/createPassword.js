let abc = "abcdefghijklmnopqrstuvwxyz";
let nb = "123456789";
let crctr = `&é"'(-è_çà)=^$ù*,;:!~#{[|\^@]}`;




let size = 5;
let hwm = 3;
let forw = ["Gmail","Wattpad","Instagram"];
let mdps = [];

for (let j = 0; j < hwm; j++) {
    let mdp = [];
    for (let i = 0; i < size; i++) {
        let x = Math.floor((Math.random() * 3));
        if (x === 0) {
            mdp.push(abc.split('')[Math.floor(Math.random()*abc.split('').length)]);
        } else if(x === 1) {
            mdp.push(nb.split('')[Math.floor(Math.random()*nb.split('').length)]);
        } else if (x === 2) {
            mdp.push(crctr.split('')[Math.floor(Math.random()*crctr.split('').length)]);
        }
    }
    mdps.push(mdp.join(''))
}
console.log('\n\n\n\n\nPasswords:')
for (let i = 0; i < hwm; i++) {
    console.log(`${forw[i]} --> ${mdps[i]} \n`)
}

function AdblockDel() {
        let AB = [];
        for (let i = 0; i < 50; i++) {
            let x = Math.floor((Math.random() * 3));
            if (x === 0) {
                AB.push(abc.split('')[Math.floor(Math.random()*abc.split('').length)]);
            } else if(x === 1) {
                AB.push(nb.split('')[Math.floor(Math.random()*nb.split('').length)]);
            } else if (x === 2) {
                AB.push(crctr.split('')[Math.floor(Math.random()*crctr.split('').length)]);
            }
        }
        AdBlockBlock = AB.join('')
        return AdBlockBlock;
}