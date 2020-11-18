let Teg = function(tag){
    this.tag = tag;
    this.name = tag;
    this.attributes = [];
    this.childs = [];
    this.text = '';
};

function parseFromString(html){
    let stack = [],
    cursor = 0,
    map = {};
    
    let tag = html.slice(html.indexOf('<', cursor), html.indexOf(">", cursor) + 1).trim();
    cursor = html.indexOf(">", cursor) + 1;
    
    let curr = new Teg(tag.slice(1, tag.indexOf(' ') + 1? tag.indexOf(' '):tag.length));
    if(tag.substring(tag.indexOf('>', cursor), tag.indexOf('<', cursor)).trim().length != 0){
        curr.text = tag.substring(tag.indexOf('>', cursor), tag.indexOf('<', cursor)).trim();
    }
    curr.attributes = getAttrs(tag.slice(tag.indexOf(" ") + 1));

    map[curr.tag] = 0;
    stack.push(curr);
    
    // commented code for debugging
    // let x=0;
    do {
        // console.log(x++);
        // console.log('cursor = '+cursor);

        if(html.indexOf('</'+curr.tag, cursor) == html.indexOf('<', cursor)){
            
            cursor = html.indexOf(`</${curr.tag}>`, cursor);
            // console.log(cursor);
            // console.log(html.slice(cursor));
            cursor = html.indexOf('>', cursor) + 1;
            // console.log(cursor);
            // console.log(html.slice(cursor));
            
            if(stack.length > 1){
                stack[stack.length-2].childs.push(stack.pop());
                curr = stack[stack.length - 1];
            }else{
                curr = stack.pop();
            }

        }else{
            
            tag = html.slice(html.indexOf('<', cursor), html.indexOf(">", cursor) + 1).trim();
            // console.log(html.indexOf('<', cursor) + "\n" + (html.indexOf(">", cursor) + 1));
            // console.log('Tag='+tag);
            // console.log(html[cursor]);
            // console.log(getAttrs(tag.slice(tag.indexOf(" ") + 1)));
            // console.log(html.slice(cursor));
            cursor = html.indexOf(">", cursor) + 1;
            
            curr = new Teg(tag.slice(1, tag.indexOf(' ') + 1? tag.indexOf(' '):tag.length));
            curr.attributes = getAttrs(tag.slice(tag.indexOf(" ") + 1));
            
            curr.text = html.substring(cursor, html.indexOf('</', cursor)).trim();

            map[curr.tag] = map.hasOwnProperty(curr.tag)?map[curr.tag] + 1:0;
            if(map[curr.tag] > 0){
                curr.name += map[curr.tag];
            }

            stack.push(curr);
        }
    } while (stack.length);

    // console.log(curr);  

    return curr;
}

function getAttrs(str) {
    let attrs = [];
    let arr = str.split("=");
    let name = val = '';
    for(let x = 0;x < arr.length; x++){
        if (arr[x].indexOf('"') == -1){
            name = arr[x].trim();
        }else if (arr[x].indexOf('" ') !== -1){
            val = arr[x].split('" ')[0].trim();
            val = val.slice(val.indexOf('"') + 1).trim();

            attrs[name] = val;

            arr[x] = arr[x].split('" ')[1].trim();
            x--;
        }else{
            val = arr[x].slice(arr[x].indexOf('"') + 1, arr[x].lastIndexOf('"'));
            attrs[name] = val;
        }
    };

    return attrs;
}