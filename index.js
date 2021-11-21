var LoginTimes = 0;
var LoginErrorCode = 0;

$(document).ready(function() {
		var list = LoginError.split(":");
		if (list.length == 2)
		{
			LoginTimes = list[0];
			LoginErrorCode = list[1];
		}
				
		SetErrInfo(0, "");		
		$('#login_button').click(function() {
			SubmitForm(0);			
		});
		
		$('#login_cancel_button').click(function() {
			onCancel();		
		});
		
		$('#Language').change(function() {
			ChangeLanguage();
		});
		
		LoadFrame();			
	});
var inittime = 0;
var initcount = 0;
var strCookie = document.cookie;
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
	c1 = str.charCodeAt(i++) & 0xff;
	if(i == len)
	{
	    out += base64EncodeChars.charAt(c1 >> 2);
	    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
	    out += "==";
	    break;
	}
	c2 = str.charCodeAt(i++);
	if(i == len)
	{
	    out += base64EncodeChars.charAt(c1 >> 2);
	    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
	    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
	    out += "=";
	    break;
	}
	c3 = str.charCodeAt(i++);
	out += base64EncodeChars.charAt(c1 >> 2);
	out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
	out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
	out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
	/* c1 */
	do {
	    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c1 == -1);
	if(c1 == -1)
	    break;

	/* c2 */
	do {
	    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c2 == -1);
	if(c2 == -1)
	    break;

	out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

	/* c3 */
	do {
	    c3 = str.charCodeAt(i++) & 0xff;
	    if(c3 == 61)
		return out;
	    c3 = base64DecodeChars[c3];
	} while(i < len && c3 == -1);
	if(c3 == -1)
	    break;

	out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

	/* c4 */
	do {
	    c4 = str.charCodeAt(i++) & 0xff;
	    if(c4 == 61)
		return out;
	    c4 = base64DecodeChars[c4];
	} while(i < len && c4 == -1);
	if(c4 == -1)
	    break;
	out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

function SubmitForm(type)
{
	var username = $("#txt_Username").val(); 

    var password = $("#txt_Password").val(); 
  
    if ((username == null) || (password == null) ||
	   (password.trim() == "") || (username.trim() == ""))
    {       
        SetErrInfo(1, login_hint_err1); 
        if (type)
            return false;
        else
            return;
    }

	var date = new Date();
	date.setTime(date.getTime()+(365*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	var lantype = getSelectVal('Language');
	var cookie = "Language="+lantype+ expires + "; path=/";
	document.cookie = cookie;
	
	var form = new WebSubmitForm();
	form.setAction('/index/login.cgi');
	form.addParameter('Username', username);
	form.addParameter('Password', MyRSAEncryptB64(password));
	form.submit();
	$("#login_button").unbind("click");
	$("#login_cancel_button").unbind("click");
	disableAllButtons();
	if (type)
		return true;
}

function LoadFrame()
{
    $("#txt_Username").focus();
	if ((LoginErrorCode > 0)
            && (LoginErrorCode < gPubErrStrArray.length)
            && (LoginErrorCode != 3)
            && (LoginErrorCode != '0'))
    {
    	SetErrInfo(1, gPubErrStrArray[LoginErrorCode]);
    }
}

function onCancel()
{
	$("#txt_Username").attr('value','');
	$("#txt_Password").attr('value','');
	$("#txt_Username").focus();
}

function onHandleKeyDown(e)
{
    var key = 0;

    if (window.event)
		key = window.event.keyCode;
    else if (e)
		key = e.which ;

	if (key == 13)
	{
		return SubmitForm(1);
	}
	return true;
}

function ChangeLanguage()
{
	var date = new Date();
	date.setTime(date.getTime()+(365*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	var lantype = getSelectVal('Language');
	var cookie = "Language="+lantype + expires + "; path=/";
	document.cookie = cookie;
	window.location.reload();
}

function SetErrInfo(type, str)
{
    var extraStr = '';
    var innerHTML= '';
	var imgHtml = '';
    if (type > 0)
    {
        extraStr = str + ' ';
        if (0 == LoginTimes)
        {
            $("#erroinfoId").html(str);
            return;
        }
    }

    if(Cookieflag == 1)
    {
		$("#erroinfoId").html(login_hint_err2);
    }
    else if (Cookieflag == 2)
    {
		$("#erroinfoId").html(login_hint_err3);
    }
    else if (LoginTimes == 0)
    {
		$("#erroinfoId").html(login_hint_err4);
    }
    else if (LoginTimes == 1)
    {	
		$("#erroinfoId").html(extraStr+login_hint_err8);
    }
    else if (LoginTimes == 2)
    {
        $("#erroinfoId").html(extraStr+login_hint_err9);
    }
    else if (LoginTimes >= 3)
    {
		 $("#erroinfoId").html(extraStr+login_hint_err10);
    }
}

document.onkeypress = onHandleKeyDown;
