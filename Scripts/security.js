function TriggerSecurity(el) {
    document.getElementById('Main').innerHTML=""
    let id = el.id;
    console.log(el)
    let pj = JSON.parse(localStorage.getItem(`Project : ${id}`));

    let p = "";
    let Np = "";
    if (password === pj.password) {
        p = password;
    } else {
        p = pj.password;
    }


    if (prompt('Make sure you know what you do. Please enter your password:') === p) {
        if (confirm('Do you want to create a new password?')) {
            let Np = prompt('Please enter your new password:');
            if (prompt('Confirm your password:') == Np) {
                if (confirm('Do you want to proceed the change of your password?')) {
                    pj.password=Np;
                    localStorage.setItem(`Project : ${id}`,JSON.stringify(pj))
                    alert('Your password project has been modified.');
                }
            }
        }
    } else {
        alert('Wrong password. Change canceled.')
    }
    OpenFolder({id:`pj-open-${id}`})
}