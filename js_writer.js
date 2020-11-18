
function writeJS(main) {
    let stack = [], curr = main, code = last = '';

    stack.push(curr);

    while(stack.length){
        curr = stack[stack.length - 1];

        if(!code.includes(`let ${curr.name} = document.createElement('${curr.tag}');`)){
            curr.childs.reverse();

            code += `let ${curr.name} = document.createElement('${curr.tag}');\n`;
            for(let x in curr.attributes){
                code += (x == 'class' && curr.attributes[x].split(' ').length == 1)?`${curr.name}.classList.add('${curr.attributes[x]}');\n`: `${curr.name}.setAttribute('${x}', '${curr.attributes[x]}');\n`;
            }
            if(curr.text.length > 0){
                code += `${curr.name}.innerText = '${curr.text}';\n`;
            }

            code+='\n';
        }

        if(!curr.childs.length){
            if(stack.length > 1){
                last += `${stack[stack.length - 2].name}.appendChild(${curr.name});\n`;
                stack.pop();
            }else{
                curr = stack.pop();
                break;
            }
        }else{
            stack.push(curr.childs.pop());
        }
    }

    code += last;

    return code;
}