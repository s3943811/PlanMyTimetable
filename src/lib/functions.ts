function getTimes(): Array<string> {
    let times = [];
    let time = new Date();
    time.setHours(0,0,0,0);
    while(time.getDate() === new Date().getDate()) {
        times.push(new Date(time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true}));
        time.setMinutes(time.getMinutes() + 30);
    }
    return times;
}

export {getTimes}