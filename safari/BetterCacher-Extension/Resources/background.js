if (window.location.hostname === "www.geocaching.com") {
    
var sanitizeHTML = function (str) {
return str.replace(/[^\w. ]/gi, function (c) {
    return '&#' + c.charCodeAt(0) + ';';
});
};
    
var gccode = document.getElementById("ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode").innerHTML;
    
if (!gccode == "") {
$('#ctl00_ContentBody_CacheInformationTable').after('<div id="BCloading" class="CacheInformationTable"><div class="DownloadLinks"><dl><dd><center><img src="https://bettercacher.org/loading.gif" style="width: 20px; padding-top: 5px;"></center></dd></dl></div></div>');
}
    
setTimeout(function() {
if (!gccode == "") {
var json = (function () {
    var json = null;
    $.ajax({
        'type' : 'POST',
        'async': true,
        'global': false,
        'url': "https://api.bettercacher.org/V2/" + gccode,
        'encode': true,
        'dataType': "json",
        'success': function (data) {
            json = data;
            show(json);
        }
    });
    })();
function show(json) {
var lang = $('[data-testid=language-selector]').text();
    
if (lang == "Sprache wählen") {
    var notlisted = 'Dieser Geocache ist noch nicht auf BetterCacher gelistet. Ist dieser Geocache besonders?';
    var listed = 'Dieser Geocache ist auf BetterCacher gelistet. Geocache auf BetterCacher ansehen:';
    var vorschlagen = 'Vorschlagen';
} else if (lang == "Kies je taal") {
    var notlisted = 'Deze geocache staat nog niet op BetterCacher. Is deze geocache speciaal?';
    var listed = 'Deze geocache staat op BetterCacher. Bekijk Geocache op BetterCacher:';
    var vorschlagen = 'suggereren';
} else if (lang == "Wybierz język") {
    var notlisted = 'Ta skrzynka nie jest jeszcze wymieniona w BetterCacher. Czy ta skrzynka jest wyjątkowa?';
    var listed = 'Ta pamięć podręczna znajduje się na liście BetterCacher. Obejrzyj Geocache na BetterCacher:';
    var vorschlagen = 'sugerować';
} else {
    var notlisted = 'This geocache is not yet listed on BetterCacher. Is this geocache special?';
    var listed = 'This geocache is listed on BetterCacher. View Geocache on BetterCacher:';
    var vorschlagen = 'suggest';
}
    
    $( "#BCloading" ).remove();
    if(json.geocaches[0].error == "true") {
    $('#ctl00_ContentBody_CacheInformationTable').after('<div id="ctl00_ContentBody_CacheInformationTable" class="CacheInformationTable"><div class="DownloadLinks"><dl><dd><p><img src="https://bettercacher.org/img/logo.png" style="height: 30px; vertical-align: -7px; padding-right: 10px;"><span style="font-size: 18px; font-weight: 900;">BetterCacher</span></p><p>' + notlisted + '</p><div style="height: 40px;"><a href="https://bettercacher.org/redirecting?link=suggest" target="_blank" style="width: 100px; float:left;" id="ctl00_ContentBody_GeoNav_logButton" class="btn btn-primary">' + vorschlagen + '</a></div></dd></dl></div></div>');
    } else {
    var content = '<div id="ctl00_ContentBody_CacheInformationTable" class="CacheInformationTable"><div class="DownloadLinks"><dl><dd><p><img src="https://bettercacher.org/img/logo.png" style="height: 30px; vertical-align: -7px; padding-right: 10px;"><span style="font-size: 18px; font-weight: 900;">BetterCacher</span></p><p>' + listed + '</p><div style="height: 40px; margin-bottom: 25px;"><a href="https://bettercacher.org/redirecting?link=geocache/' + sanitizeHTML(json.geocaches[0].gccode) + '" target="_blank" style="width: 100px; float: left;" id="ctl00_ContentBody_GeoNav_logButton" class="btn btn-primary">Ansehen</a></div><hr><p><label for="cacheNoteText" class="h4">BetterCacher Logs:</label></p>';
    for (var i = 0; i < json.geocaches[0].logs.length; i++) {
        content += '<p><b>' + sanitizeHTML(json.geocaches[0].logs[i].user) + '</b><br>' + sanitizeHTML(json.geocaches[0].logs[i].text) + '</p>';
    }
    content += '</dd></dl></div></div>';
    }
    var BCElement = $("#ctl00_ContentBody_CacheInformationTable");
    BCElement.after(content);
}
}
}, 1500);
}
