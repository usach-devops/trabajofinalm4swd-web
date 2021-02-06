/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 98.89583333333333, "KoPercent": 1.1041666666666667};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7977083333333334, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/favicon.ico-10"], "isController": false}, {"data": [0.47333333333333333, 500, 1500, "/static/css/2.150d169a.chunk.css-5"], "isController": false}, {"data": [1.0, 500, 1500, "/logo192.png-9"], "isController": false}, {"data": [1.0, 500, 1500, "/success.txt-11"], "isController": false}, {"data": [1.0, 500, 1500, "/static/js/main.38f92ae1.chunk.js-7"], "isController": false}, {"data": [1.0, 500, 1500, "/success.txt-12"], "isController": false}, {"data": [1.0, 500, 1500, "/success.txt-13"], "isController": false}, {"data": [0.20666666666666667, 500, 1500, "/rest/msdxc/dxc?ahorro=44000000&sueldo=1500000-14"], "isController": false}, {"data": [0.5, 500, 1500, "/static/js/2.6914ed45.chunk.js-8"], "isController": false}, {"data": [0.9683333333333334, 500, 1500, "/success.txt-2"], "isController": false}, {"data": [0.74, 500, 1500, "/-1"], "isController": false}, {"data": [0.995, 500, 1500, "/success.txt-4"], "isController": false}, {"data": [1.0, 500, 1500, "/static/css/main.b329986d.chunk.css-6"], "isController": false}, {"data": [0.9983333333333333, 500, 1500, "/success.txt-3"], "isController": false}, {"data": [0.016666666666666666, 500, 1500, "/rest/msdxc/dxc-15"], "isController": false}, {"data": [0.865, 500, 1500, "HTTP Request"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 4800, 53, 1.1041666666666667, 1990.3697916666663, 8, 31852, 130.0, 5667.700000000002, 15290.0, 25608.909999999996, 71.60011336684616, 1391.707975022002, 22.257683027789792], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/favicon.ico-10", 300, 0, 0.0, 129.55333333333334, 124, 369, 127.0, 134.0, 141.95, 160.99, 26.364355391510678, 106.10108258634327, 7.929903770102821], "isController": false}, {"data": ["/static/css/2.150d169a.chunk.css-5", 300, 0, 0.0, 1140.1800000000005, 870, 1678, 1069.5, 1433.9, 1507.0, 1652.6700000000003, 34.466911764705884, 4910.9627218807445, 11.174819048713234], "isController": false}, {"data": ["/logo192.png-9", 300, 0, 0.0, 129.85333333333332, 125, 175, 127.0, 135.90000000000003, 148.0, 169.96000000000004, 28.46029788445119, 155.53108101698132, 8.560323973057585], "isController": false}, {"data": ["/success.txt-11", 300, 0, 0.0, 15.090000000000002, 9, 84, 13.0, 20.900000000000034, 26.94999999999999, 57.92000000000007, 27.93036030164789, 5.985752606833628, 8.700961851782889], "isController": false}, {"data": ["/static/js/main.38f92ae1.chunk.js-7", 300, 0, 0.0, 157.42666666666665, 125, 490, 130.0, 239.0, 356.4499999999999, 450.7500000000002, 39.42181340341656, 141.05617608409986, 12.242320959264125], "isController": false}, {"data": ["/success.txt-12", 300, 0, 0.0, 13.589999999999998, 8, 98, 11.0, 19.0, 25.0, 73.80000000000018, 26.210029704700332, 5.617068735802901, 8.29301721125284], "isController": false}, {"data": ["/success.txt-13", 300, 0, 0.0, 14.920000000000014, 8, 108, 12.0, 20.0, 31.0, 76.91000000000008, 26.997840172786177, 5.785904315154788, 8.542285367170626], "isController": false}, {"data": ["/rest/msdxc/dxc?ahorro=44000000&sueldo=1500000-14", 300, 53, 17.666666666666668, 11030.12, 248, 21041, 15271.5, 21030.0, 21036.0, 21039.0, 10.220768601798856, 8.43293259403107, 3.714477505791769], "isController": false}, {"data": ["/static/js/2.6914ed45.chunk.js-8", 300, 0, 0.0, 958.6133333333337, 751, 1418, 950.0, 1030.8000000000002, 1092.8999999999996, 1367.8700000000001, 28.368794326241133, 4177.526595744681, 8.726728723404255], "isController": false}, {"data": ["/success.txt-2", 300, 0, 0.0, 205.15666666666672, 14, 561, 143.0, 481.0, 513.95, 545.0, 51.51098901098901, 11.039314689217033, 16.046880365728022], "isController": false}, {"data": ["/-1", 300, 0, 0.0, 473.65000000000015, 134, 683, 531.0, 640.0, 651.0, 668.99, 66.06474344857962, 117.1616934595904, 22.90330461352125], "isController": false}, {"data": ["/success.txt-4", 300, 0, 0.0, 65.09999999999995, 8, 517, 16.0, 267.90000000000003, 369.39999999999986, 500.8900000000001, 41.079008626591815, 8.803638059701493, 12.997655073257565], "isController": false}, {"data": ["/static/css/main.b329986d.chunk.css-6", 300, 0, 0.0, 141.88333333333318, 124, 475, 128.0, 144.0, 246.24999999999983, 458.83000000000015, 34.562211981566826, 21.39886952764977, 11.306973646313365], "isController": false}, {"data": ["/success.txt-3", 300, 0, 0.0, 32.17666666666667, 9, 549, 13.5, 31.900000000000034, 171.29999999999984, 453.17000000000075, 41.3564929693962, 8.863105700303281, 13.085452853598015], "isController": false}, {"data": ["/rest/msdxc/dxc-15", 300, 0, 0.0, 16851.056666666675, 257, 31852, 19174.0, 26510.800000000007, 27829.499999999996, 31044.610000000004, 5.55926173004225, 2.1607286802312653, 2.1607286802312653], "isController": false}, {"data": ["HTTP Request", 300, 0, 0.0, 487.5466666666668, 308, 798, 440.5, 680.0, 720.95, 770.98, 90.63444108761328, 298.63340256797585, 10.444203172205437], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 192.81.214.49:8085 [/192.81.214.49] failed: Connection timed out: connect", 53, 100.0, 1.1041666666666667], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 4800, 53, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 192.81.214.49:8085 [/192.81.214.49] failed: Connection timed out: connect", 53, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/rest/msdxc/dxc?ahorro=44000000&sueldo=1500000-14", 300, 53, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 192.81.214.49:8085 [/192.81.214.49] failed: Connection timed out: connect", 53, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
