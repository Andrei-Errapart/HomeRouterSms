var __version__ = 'V200R001C1143SP051';
function loadJs(path)
{
    if(path == null || path == undefined || path == "")
    {
        return;
    }
    document.write('<script type="text/javascript" src="' + path + '?ver=' + __version__ + '"></script>\n');
}

function loadCss(path)
{
    if(path == null || path == undefined || path == "")
    {
        return;
    }
    document.write('<link rel="stylesheet" type="text/css" href="' + path + '?ver=' + __version__ + '" />\n');   
}

function loadRes(path)
{
    if(path == null || path == undefined || path == "")
    {
        return;
    }
    document.write('<script type="text/javascript" src="' + path + '?ver=' + __version__ + '"></script>\n');
}

function loadFile(path)
{
    re = /\.(.*)$/;
    if(re.test(path))
    {
        if(RegExp.$1.toLowerCase() == 'js')
        {
            loadJs(path);
        }
        else if(RegExp.$1.toLowerCase() == 'res')
        {
            loadRes(path);
        }
        else if(RegExp.$1.toLowerCase() == 'css')
        {
            loadCss(path);
        }
    }
}