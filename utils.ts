export function timeStringToSeconds(timeString: string) {
    let seconds = +timeString.slice(-2) || 0;
    timeString = timeString.slice(0, -2);
    let minutes = +timeString.slice(-2) || 0;
    timeString = timeString.slice(0, -2);
    const hours = +timeString.slice(-2) || 0;

    minutes += hours * 60;
    seconds += minutes * 60;

    return seconds;
}

export function secondsToTimeDisplayString(seconds: number) {
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;
    const hours = Math.floor(minutes / 60);
    minutes %= 60;

    const hoursString = hours ? hours + ":" : "";
    const minutesString = hours || minutes ? ("00" + minutes).slice(-2) + ":" : "";
    const secondsString = minutesString.length ? ("00" + seconds).slice(-2) : seconds + "";

    return hoursString + minutesString + secondsString;
}