function loadFileContent2Element(element, filePath) {
    $.get(filePath, function (content) {
        var text = compileMarkdown(content);
        element.html(text);
    });
}

function compileMarkdown(data) {
    var converter = new showdown.Converter();
    var html = converter.makeHtml(data);
    return html;
}