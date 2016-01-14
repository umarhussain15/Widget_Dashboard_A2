var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
    prop,
    el = document.createElement('div');

for (var i = 0, l = props.length; i < l; i++) {
    if (typeof el.style[props[i]] !== "undefined") {
        prop = props[i];
        break;
    }
}

function startClock() {
    var angle = 360 / 60,
        date = new Date(),
        hour = date.getHours() % 12,
        minute = date.getMinutes(),
        second = date.getSeconds(),
        hourAngle = (360 / 12) * hour + (360 / (12 * 60)) * minute;
    
    if (prop) {
        document.getElementById('minute').style[prop] = 'rotate(' + angle * minute + 'deg)';
        document.getElementById('second').style[prop] = 'rotate(' + angle * second + 'deg)';
        document.getElementById('hour').style[prop] = 'rotate(' + hourAngle + 'deg)';
    }
    setTimeout(startClock, 1000);
}function startTime() {
    var date = new Date();
    var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
//  minutes = minutes < 10 ? '0'+minutes : minutes;
    var h = hours
    var m = date.getMinutes();
    var s = date.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    h + ":" + m + ":" + s;
    document.getElementById('ap').innerHTML=ampm+"<br/>";
    var t = setTimeout(startTime, 1000);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}