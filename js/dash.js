var app = angular.module("myApp", []);

var dgl;
app.controller("init", function ($scope, $http) {
    $http.get('http://api.wunderground.com/api/cd672ed8411e6361/geolookup/conditions/forecast/q/Pakistan/Islamabad.json')
        .success(function (response) {
            localStorage.setItem("query", JSON.stringify(response));
            //            window.console.log(localStorage.getItem("query"));
        });
    $scope.curr = [];
    $scope.weather = {};
    $scope.today = new Date();
    $scope.showcalendar = false;
    $scope.showclock = false;
    $scope.showweather = false;
    $scope.showdash = true;
    $scope.selected = [];
    $scope.date = new Date();
    $scope.firstDay = new Date($scope.date.getFullYear(), $scope.date.getMonth(), 1);
    $scope.lastDay = new Date($scope.date.getFullYear(), $scope.date.getMonth() + 1, 0);
    $scope.nextme = new Date($scope.date.getFullYear(), $scope.date.getMonth() + 1, 1);
    window.console.log($scope.firstDay + " vs " + $scope.lastDay + " vs next m" + $scope.nextme);

    $scope.update = function () {
        $scope.curr = [];
        $scope.selected = [];
        var weeks = 0;
        var stdn = $scope.firstDay.getDay();
        var lastme = new Date($scope.date.getFullYear(), $scope.date.getMonth(), 0);
        $scope.war = [];
        $scope.days = [];
        $scope.war[weeks] = weeks;
        $scope.days[weeks] = [];
        $scope.curr[weeks] = [];
        //        window.console.log("<<<<<<<<<< last me" + lastme ,$scope.war,$scope.days);
        //days[weeks][stdn] = firstDay.getDate();
        //alert(stdn + "  " + $scope.firstDay);
        var i, lop;
        if (stdn == 1) {
            lop = 0;
        }
        if (stdn == 0) {
            lop = 6;
        } else {
            lop = stdn - 1;
        }
        lastme.setDate(lastme.getDate() - lop + 1);
        // storing last month days
        for (i = 0; i < lop; i = i + 1) {
            // alert(days[weeks][i]);
            $scope.days[weeks][i] = lastme.getDate();
            $scope.curr[weeks][lastme.getDate()] = false;
            lastme.setDate(lastme.getDate() + 1);

        }
        // checking if we still have space in fisrt row
        for (i; i <= 6; i = i + 1) {
            // alert(days[weeks][i]);
            $scope.days[weeks][i] = $scope.firstDay.getDate();
            $scope.curr[weeks][$scope.firstDay.getDate()] = true;
            $scope.firstDay.setDate($scope.firstDay.getDate() + 1);
        }


        weeks++;
        //firstDay.setDate(firstDay.getDate() + 1);


        while ($scope.firstDay.getDate() != $scope.lastDay.getDate()) {
            $scope.war[weeks] = weeks;
            $scope.days[weeks] = [];
            $scope.curr[weeks] = [];
            for (i = 0; i <= 6; i++) {
                if ($scope.firstDay.getDate() == $scope.lastDay.getDate())
                    break;
                $scope.days[weeks][i] = $scope.firstDay.getDate();
                $scope.curr[weeks][$scope.firstDay.getDate()] = true;
                $scope.firstDay.setDate($scope.firstDay.getDate() + 1);
            }
            window.console.log($scope.firstDay);
            window.console.log($scope.war);
            weeks++;
        }

        weeks--;

        //        alert($scope.days[weeks].length);
        //if row is full and we have still the last date to store then
        // create new row and add remaining elements
        if ($scope.days[weeks].length == 7) {
            weeks++;
            var tt = 0;
            $scope.war[weeks] = weeks;
            $scope.days[weeks] = [];
            $scope.curr[weeks] = [];
            $scope.days[weeks][tt] = $scope.lastDay.getDate();
            $scope.curr[weeks][$scope.lastDay.getDate()] = true;
            for (i = tt + 1; i <= 6; i = i + 1) {
                // alert(days[weeks][i]);
                $scope.days[weeks][i] = $scope.nextme.getDate();
                $scope.curr[weeks][$scope.nextme.getDate()] = false;
                $scope.nextme.setDate($scope.nextme.getDate() + 1);
            }
        }
        // if row is not full just add last date and fill row with new month dates
        else {
            var tt = $scope.days[weeks].length;
            $scope.days[weeks][tt] = $scope.lastDay.getDate();
            $scope.curr[weeks][$scope.lastDay.getDate()] = true;
            var nextme = new Date($scope.date.getFullYear(), $scope.date.getMonth() + 1, 1);
            for (j = tt + 1; j < 7; j++) {
                $scope.days[weeks][j] = $scope.nextme.getDate();
                $scope.curr[weeks][$scope.nextme.getDate()] = false;
                $scope.nextme.setDate($scope.nextme.getDate() + 1);
            }

        }
        //        window.console.log($scope.curr);
    }
    $scope.next = function () {
        var now = $scope.firstDay;
        var nxt;
        if (now.getMonth() == 11) {
            $scope.date = new Date(now.getFullYear() + 1, 0, 1);
        } else {
            $scope.date = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        }
        //        window.console.log(">>>>>>>>>>" + $scope.date);
        $scope.firstDay = new Date($scope.date.getFullYear(), $scope.date.getMonth(), 1);
        $scope.lastDay = new Date($scope.date.getFullYear(), $scope.date.getMonth() + 1, 0);
        $scope.nextme = new Date($scope.date.getFullYear(), $scope.date.getMonth() + 1, 1);

        //        window.console.log($scope.firstDay + " vs " + $scope.lastDay + " vs next m" + $scope.nextme);
        $scope.update();
    }
    $scope.prev = function () {
        var now = $scope.firstDay;
        var nxt;
        if (now.getMonth() == 0) {
            $scope.date = new Date(now.getFullYear() - 1, 11, 1);
        } else {
            $scope.date = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        }
        //        window.console.log(">>>>>>>>>>" + $scope.date);
        $scope.firstDay = new Date($scope.date.getFullYear(), $scope.date.getMonth(), 1);
        $scope.lastDay = new Date($scope.date.getFullYear(), $scope.date.getMonth() + 1, 0);
        $scope.nextme = new Date($scope.date.getFullYear(), $scope.date.getMonth() + 1, 1);

        //        window.console.log($scope.firstDay + " vs " + $scope.lastDay + " vs next m" + $scope.nextme);
        $scope.update();
    }
    $scope.setMaster = function (day, week) {

        $scope.selected = [day, week];

    }
    $scope.isSelected = function (day, week) {
        var tem = [day, week];
        return ($scope.selected.length == tem.length) && $scope.selected.every(function (element, index) {
            return element === tem[index];
        });
    }
    $scope.isToday = function (day, week) {
        var d = new Date();

        var y = ($scope.date.getFullYear() === d.getFullYear());
        var c = ((1 | d.getDate() / 7) === week) && day === d.getDate();
        var m = ($scope.date.getMonth() === d.getMonth());
                window.console.log(c , y,(1 | d.getDate() / 7),week,day,d.getDate());
        return c && y && m;
    }
    $scope.isOther = function (day, week) {
        if ($scope.war[0] == week) {
            if (day == $scope.firstDay.getDate) {}

        } else if ($scope.war[$scope.war.length - 1] == week) {

        }
    }
    $scope.showClock = function () {
        startClock();
        $scope.showcalendar = false;
        $scope.showclock = true;
        $scope.showweather = false;
        $scope.showdash = false;
    };
    $scope.showCalendar = function () {
        $scope.showcalendar = true;
        $scope.showclock = false;
        $scope.showweather = false;
        $scope.showdash = false;
        $scope.date = new Date();
        $scope.firstDay = new Date($scope.date.getFullYear(), $scope.date.getMonth(), 1);
        $scope.lastDay = new Date($scope.date.getFullYear(), $scope.date.getMonth() + 1, 0);
        $scope.nextme = new Date($scope.date.getFullYear(), $scope.date.getMonth() + 1, 1);
        $scope.update();
    };
    $scope.showWeather = function () {
        $scope.showcalendar = false;
        $scope.showclock = false;
        $scope.showweather = true;
        $scope.showdash = false;
    };
    $scope.showDash = function () {
        $scope.showcalendar = false;
        $scope.showclock = false;
        $scope.showweather = false;
        $scope.showdash = true;


        //        startTime();
    };
    startTime();
});
app.controller("myCtrl", function ($scope) {
    //    var date = new Date();
    //    $scope.date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    //    dgl = new Date();

});
app.controller("zone", function ($scope) {
    var cd = new Date();
    cd = cd.toString();
    $scope.zone = cd.slice(cd.indexOf("GMT"), cd.length);
    //    dgl = new Date();

});
app.controller("weather", function ($scope) {
    var js = JSON.parse(localStorage.getItem("query"));
    var jsco = js.current_observation;

    $scope.weather.location = jsco.display_location.full;
    var d = new Date(jsco.local_time_rfc822);
    $scope.weather.date = d;
    $scope.weather.lastcheck = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    $scope.weather.icon = jsco.icon_url;
    $scope.weather.ctemp = jsco.temp_c + "℃";
    $scope.weather.weather = jsco.weather;
    $scope.weather.high = js.forecast.simpleforecast.forecastday[0].high.celsius + "℃";
    $scope.weather.low = js.forecast.simpleforecast.forecastday[0].low.celsius + "℃";


});
app.controller("forecast", function ($scope) {
    $scope.forecast = {};
    var js = JSON.parse(localStorage.getItem("query"));
    var jsco = js.forecast.simpleforecast.forecastday;
    for (var i = 1; i < jsco.length; i++) {
        var fd = {};
        fd.high = jsco[i].high.celsius + "℃";
        fd.low = jsco[i].low.celsius + "℃";
        fd.day = jsco[i].date.weekday_short + ',' + jsco[i].date.day + ' ' + jsco[i].date.monthname_short;
        fd.weather = jsco[i].conditions;
        fd.icon = jsco[i].icon_url;
        $scope.forecast[i - 1] = fd;
    }


    //     window.console.log("weather city", $scope.forecast);

});
app.controller("detail", function ($scope) {
    //    var date = new Date();
    //    $scope.date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    //    dgl = new Date();
    var js = JSON.parse(localStorage.getItem("query"));
    var jsco = js.current_observation;
    $scope.details = {};
    var fd = {
        name: "Current Temprature",
        value: $scope.weather.ctemp
    };
    //    angular.extend($scope.details,fd);
    $scope.details[0] = fd;
    fd = {
        name: "High",
        value: $scope.weather.high
    }
    $scope.details[1] = fd;
    fd = {
        name: "Low",
        value: $scope.weather.low
    }
    $scope.details[2] = fd;
    fd = {
        name: "Condition",
        value: $scope.weather.weather
    }
    $scope.details[3] = fd;
    fd = {
        name: "Relative Humidity",
        value: jsco.relative_humidity
    }
    $scope.details[4] = fd;
    fd = {
        name: "Dew Point",
        value: jsco.dewpoint_c+ "℃"
    }
    $scope.details[5] = fd;
    fd = {
        name: "Wind",
        value: jsco.wind_string
    }
    $scope.details[6] = fd;
    fd = {
        name: "Visibility",
        value: jsco.visibility_km+" km"
    }
    $scope.details[7] = fd;
    window.console.log($scope.details);


});
Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}