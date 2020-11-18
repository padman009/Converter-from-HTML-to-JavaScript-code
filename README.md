# It's simple converter from HTML to JS

## Example

### HTML - Code

    <div class="container">
        <label for="html_code" class="col-form-label">HTMl - Code:</label>
        <textarea class="form-control" id="html_code" rows="30"></textarea>
    </div>

### And it's JS result code

    let div = document.createElement('div');
    div.classList.add('container');

    let label = document.createElement('label');
    label.setAttribute('for', 'html_code');
    label.classList.add('col-form-label');
    label.innerText = 'HTMl - Code:';

    let textarea = document.createElement('textarea');
    textarea.classList.add('form-control');
    textarea.setAttribute('id', 'html_code');
    textarea.setAttribute('rows', '30');

    div.appendChild(label);
    div.appendChild(textarea);
