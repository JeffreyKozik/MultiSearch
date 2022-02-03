// https://stackoverflow.com/questions/49546645/clicking-buttons-on-a-website-with-a-chrome-extension
function search(){
    let input = "";
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        tabs.forEach(
            function(tab){
                if (tab.url.search("irslogics") != -1){
                    tab_url = tab.url;
                    new_tab_url = "";
                    start = 0;
                    slashes_count = 0;
                    for (var i = 0; i < tab_url.length; i++){
                        if (tab_url.charAt(i) == "/"){
                            slashes_count++;
                            if (slashes_count == 2){
                                start = i;
                            }
                        }
                        if (tab_url.charAt(i) == "."){
                            new_tab_url = tab_url.slice(start + 1, i);
                            break;
                        }
                    }
                    console.log(tab_url);
                    input = document.getElementById("search_input").value;
                    // chrome.storage.sync.set({"input": input}, function(){
                    //     console.log(input);
                    // });
                    chrome.tabs.update(tab.id, {selected: true});
                    // https://stackoverflow.com/questions/22286495/change-active-window-chrome-tabs
                    // https://www.w3schools.com/js/js_htmldom_html.asp
                    chrome.tabs.executeScript(tab.id, {code: 'search_value = "' + input + '";document.getElementById("txtSearch").value = search_value;document.getElementById("btnSearch").click();document.getElementsByTagName("title")[0].innerHTML = "' + new_tab_url + '";'});
                }
            }
        );
    });
}
function find_tabs(){
    // input = "";
    // chrome.storage.sync.get(["input"], function(result){
    //     input = result;
    // });
    // console.log(input);
    input = document.getElementById("search_input").value;
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        tabs.forEach(
            function(tab){
                if (tab.url.search("irslogics") != -1){
                    chrome.tabs.executeScript(tab.id, {code: 'console.log(document.getElementById("iframeRuntime")); if((document.getElementById("iframeRuntime").contentWindow.document.getElementById("searchGrid").innerHTML.match(/' + input + '/g) || []).length >= 2){document.getElementsByTagName("title")[0].innerHTML = "FOUND";}'});
                }
            }
        );
    });
}
document.getElementById("submit_button").addEventListener('click', search);
document.getElementById("find_tabs").addEventListener('click', find_tabs);
