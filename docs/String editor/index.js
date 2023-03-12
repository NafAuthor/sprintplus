function AddText() {
    let new_text = document.createElement("div");
    new_text.id = "text";
    new_text.style = `
        width: 150px;
        height: 100px;
        border: 2px dotted purple;
        cursor:pointer;
    `;
    new_text.ondrag = function() {
        console.log('e')
    }
    document.getElementById('content').appendChild(new_text);

}