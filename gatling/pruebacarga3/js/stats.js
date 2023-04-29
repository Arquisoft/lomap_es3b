var stats = {
    type: "GROUP",
name: "All Requests",
path: "",
pathFormatted: "group_missing-name-b06d1",
stats: {
    "name": "All Requests",
    "numberOfRequests": {
        "total": "6600",
        "ok": "4316",
        "ko": "2284"
    },
    "minResponseTime": {
        "total": "45",
        "ok": "45",
        "ko": "48143"
    },
    "maxResponseTime": {
        "total": "60026",
        "ok": "47293",
        "ko": "60026"
    },
    "meanResponseTime": {
        "total": "17868",
        "ok": "418",
        "ko": "50842"
    },
    "standardDeviation": {
        "total": "24064",
        "ok": "1329",
        "ko": "2700"
    },
    "percentiles1": {
        "total": "268",
        "ok": "76",
        "ko": "50050"
    },
    "percentiles2": {
        "total": "50043",
        "ok": "230",
        "ko": "50060"
    },
    "percentiles3": {
        "total": "50067",
        "ok": "2228",
        "ko": "60007"
    },
    "percentiles4": {
        "total": "60011",
        "ok": "3682",
        "ko": "60014"
    },
    "group1": {
    "name": "t < 800 ms",
    "htmlName": "t < 800 ms",
    "count": 3693,
    "percentage": 56
},
    "group2": {
    "name": "800 ms <= t < 1200 ms",
    "htmlName": "t >= 800 ms <br> t < 1200 ms",
    "count": 180,
    "percentage": 3
},
    "group3": {
    "name": "t >= 1200 ms",
    "htmlName": "t >= 1200 ms",
    "count": 443,
    "percentage": 7
},
    "group4": {
    "name": "failed",
    "htmlName": "failed",
    "count": 2284,
    "percentage": 35
},
    "meanNumberOfRequestsPerSecond": {
        "total": "35.87",
        "ok": "23.457",
        "ko": "12.413"
    }
},
contents: {
"req_request-0-684d2": {
        type: "REQUEST",
        name: "request_0",
path: "request_0",
pathFormatted: "req_request-0-684d2",
stats: {
    "name": "request_0",
    "numberOfRequests": {
        "total": "3300",
        "ok": "3300",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "45",
        "ok": "45",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "1801",
        "ok": "1801",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "136",
        "ok": "136",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "259",
        "ok": "259",
        "ko": "-"
    },
    "percentiles1": {
        "total": "69",
        "ok": "69",
        "ko": "-"
    },
    "percentiles2": {
        "total": "82",
        "ok": "83",
        "ko": "-"
    },
    "percentiles3": {
        "total": "600",
        "ok": "600",
        "ko": "-"
    },
    "percentiles4": {
        "total": "1388",
        "ok": "1388",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "htmlName": "t < 800 ms",
    "count": 3158,
    "percentage": 96
},
    "group2": {
    "name": "800 ms <= t < 1200 ms",
    "htmlName": "t >= 800 ms <br> t < 1200 ms",
    "count": 50,
    "percentage": 2
},
    "group3": {
    "name": "t >= 1200 ms",
    "htmlName": "t >= 1200 ms",
    "count": 92,
    "percentage": 3
},
    "group4": {
    "name": "failed",
    "htmlName": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "17.935",
        "ok": "17.935",
        "ko": "-"
    }
}
    },"req_request-2-93baf": {
        type: "REQUEST",
        name: "request_2",
path: "request_2",
pathFormatted: "req_request-2-93baf",
stats: {
    "name": "request_2",
    "numberOfRequests": {
        "total": "3300",
        "ok": "1016",
        "ko": "2284"
    },
    "minResponseTime": {
        "total": "114",
        "ok": "114",
        "ko": "48143"
    },
    "maxResponseTime": {
        "total": "60026",
        "ok": "47293",
        "ko": "60026"
    },
    "meanResponseTime": {
        "total": "35600",
        "ok": "1335",
        "ko": "50842"
    },
    "standardDeviation": {
        "total": "23005",
        "ok": "2486",
        "ko": "2700"
    },
    "percentiles1": {
        "total": "50043",
        "ok": "711",
        "ko": "50050"
    },
    "percentiles2": {
        "total": "50055",
        "ok": "2049",
        "ko": "50060"
    },
    "percentiles3": {
        "total": "60002",
        "ok": "3248",
        "ko": "60007"
    },
    "percentiles4": {
        "total": "60013",
        "ok": "6414",
        "ko": "60014"
    },
    "group1": {
    "name": "t < 800 ms",
    "htmlName": "t < 800 ms",
    "count": 535,
    "percentage": 16
},
    "group2": {
    "name": "800 ms <= t < 1200 ms",
    "htmlName": "t >= 800 ms <br> t < 1200 ms",
    "count": 130,
    "percentage": 4
},
    "group3": {
    "name": "t >= 1200 ms",
    "htmlName": "t >= 1200 ms",
    "count": 351,
    "percentage": 11
},
    "group4": {
    "name": "failed",
    "htmlName": "failed",
    "count": 2284,
    "percentage": 69
},
    "meanNumberOfRequestsPerSecond": {
        "total": "17.935",
        "ok": "5.522",
        "ko": "12.413"
    }
}
    }
}

}

function fillStats(stat){
    $("#numberOfRequests").append(stat.numberOfRequests.total);
    $("#numberOfRequestsOK").append(stat.numberOfRequests.ok);
    $("#numberOfRequestsKO").append(stat.numberOfRequests.ko);

    $("#minResponseTime").append(stat.minResponseTime.total);
    $("#minResponseTimeOK").append(stat.minResponseTime.ok);
    $("#minResponseTimeKO").append(stat.minResponseTime.ko);

    $("#maxResponseTime").append(stat.maxResponseTime.total);
    $("#maxResponseTimeOK").append(stat.maxResponseTime.ok);
    $("#maxResponseTimeKO").append(stat.maxResponseTime.ko);

    $("#meanResponseTime").append(stat.meanResponseTime.total);
    $("#meanResponseTimeOK").append(stat.meanResponseTime.ok);
    $("#meanResponseTimeKO").append(stat.meanResponseTime.ko);

    $("#standardDeviation").append(stat.standardDeviation.total);
    $("#standardDeviationOK").append(stat.standardDeviation.ok);
    $("#standardDeviationKO").append(stat.standardDeviation.ko);

    $("#percentiles1").append(stat.percentiles1.total);
    $("#percentiles1OK").append(stat.percentiles1.ok);
    $("#percentiles1KO").append(stat.percentiles1.ko);

    $("#percentiles2").append(stat.percentiles2.total);
    $("#percentiles2OK").append(stat.percentiles2.ok);
    $("#percentiles2KO").append(stat.percentiles2.ko);

    $("#percentiles3").append(stat.percentiles3.total);
    $("#percentiles3OK").append(stat.percentiles3.ok);
    $("#percentiles3KO").append(stat.percentiles3.ko);

    $("#percentiles4").append(stat.percentiles4.total);
    $("#percentiles4OK").append(stat.percentiles4.ok);
    $("#percentiles4KO").append(stat.percentiles4.ko);

    $("#meanNumberOfRequestsPerSecond").append(stat.meanNumberOfRequestsPerSecond.total);
    $("#meanNumberOfRequestsPerSecondOK").append(stat.meanNumberOfRequestsPerSecond.ok);
    $("#meanNumberOfRequestsPerSecondKO").append(stat.meanNumberOfRequestsPerSecond.ko);
}
