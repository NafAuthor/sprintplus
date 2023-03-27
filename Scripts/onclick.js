let USERTOLINK = "";
let USERLINK = "";

function openLink(el,link) {
    window.open('warn.html');
    let Link = {
        link : link,
        user: el.id
    }
    if (!localStorage.getItem('tolink')) {
        localStorage.setItem('tolink',{});
    }
    localStorage.setItem('tolink',JSON.stringify(Link))
}