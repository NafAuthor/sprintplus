let goal = {
    name : "Ecrire",
    amount_of_words: "9000",
    details: "Ecrire",
    duration: 15,
    name: "Ecrire",
    started: true,
    started_on: "2023-04-12T22:00:00.000Z",
    sync: true,
    updates: {},
    updatescount: 0,
    words: 0,
}

function TimeLapse(goal) {
    let today = new Date();
    today.setHours(0,0,0,0);
    let start = new Date(goal.started_on);
    start.setHours(0,0,0,0)
    let end = new Date();
    end.setDate(start.getDate() + goal.duration);

    let timelapse = end.getDate()-today.getDate()

    return timelapse; // Amount of days including « today » and « end » before the actual end of the goal
}

function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

function CheckEnd(goal) {
    if (goal.words >= goal.amount_of_words) {
        return true;
    }
    if (dateDiffInDays(new Date(goal.started_on), new Date())<0) {
        return true;
    }

}


function UpdateWords(goal, words) {
    let today = new Date();
    let start = new Date(goal.started_on);

    let day = dateDiffInDays(start,today);
    
    if (!goal.updates) goal.updates={};
    if (!goal.updates[day]) {
        goal.updates[day]=0;
    }
    goal.updates[day]+=words;
    goal.updatescount++;
    goal.words+=words;

    let ifEnd = CheckEnd(goal);

    if (ifEnd) {
        return [true, goal];
    } else {
        return [false,goal];
    }
    
}
UpdateWords(goal,20);
UpdateWords(goal,50);
UpdateWords(goal,1500);
let W = UpdateWords(goal,98000);

console.log(TimeLapse(goal) + " days until the end of the objective");


