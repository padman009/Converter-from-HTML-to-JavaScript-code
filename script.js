document.getElementById("convertbtn").addEventListener("click", parser);

function parser(){    
    let html = document.getElementById('html_code')
    js = document.getElementById('js_code');
    
    if(html.value == '') return;

    let mainContainer = parseFromString(html.value);
    let jsCode = writeJS(mainContainer);
    js.value = jsCode;
}