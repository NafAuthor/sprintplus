
const abc = (() => {
    const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
    return caps.concat(caps.map(letter => letter.toLowerCase()));
  })();
let nb = [1,2,3,4,5,6,7,8,9]
// Palette script //

let palette_active = false;

// Change visibilies & visual stuff of the palette
function PLACT(c) {
    let P = document.getElementById('bs-pl');
    let Box = document.getElementById('palette-charge');
    let HB = document.getElementById('hexplace');

    if (palette_active) {
        P.innerHTML = "close";
        Box.style.visibility  = "visible";
    } else {
        P.innerHTML = "palette"
        Box.style.visibility = "hidden";
        HB.style.border="none";
    }

    palette_active = !palette_active


}


function PalAP() {

}
// Check for a correct hex code
function PalAP() {
    let B = document.getElementById('hexplace').value.split();
    let HB = document.getElementById('hexplace');
    for (let b of B) {
        if (
            b.toLowerCase() in abc == false || 
            parseInt(b) in nb == false || 
            B[0] !== "#") {
            HB.style.border = "1px solid red";
            return;
        }
    }
    PLACT();
}