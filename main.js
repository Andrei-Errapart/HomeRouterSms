var __jsver__ = 'V200R001C1143SP051';
var g_firstmenu = 'Admin_0';
var g_secondmenu = 'Admin_0_0';
var g_thirdmenu = 'Admin_0_0_0';
var g_oMenuTree = null;
var g_curUserType = '0';
var sptUserType = '0';
var sysUserType = '1';
var g_disableMenu = false;

var FEATURE_UI_WAITING = null;
// constant variable
var G_MonitoringStatus = null;
var G_StationStatus = null;
var G_CheckNewsStatus = null;
var MACRO_SHOW_POPUP = 1;

//Status please see statuapi.h STATUS_VALUE
//keep consist with STATUS_VALUE in the backgroud
var WIFI_ON = 2;
var WIFI_TRANS = 3;
var WIFI_OFF = 4;
var NO_SIM = 14;
var SIM_NORMAL = 15;
var SIM_PIN_LOCKED = 16;
var SIM_ERROR = 17;
var SIG_OFF = 18;
var SIG_ONE = 19;
var SIG_TWO = 20;
var SIG_THREE = 21;
var SIG_FOUR = 22;
var SIG_FIVE = 23;
var NO_CONNECT = 24;
var CONNECTING = 25;
var CONNECTED = 26;
var MODE_OFF = 27;
var MODE_2G = 28;
var MODE_3G = 29;
var MODE_4G = 30;
var ROAM_HOME = 31;
var ROAM_ROAMING = 32;
var ROAM_FORBID = 33;
var BATTERY_LVL0 = 40;
var BATTERY_LVL1 = 41;
var BATTERY_LVL2 = 42;
var BATTERY_LVL3 = 43;
var BATTERY_LVL4 = 44;
var NO_BATTERY = 45;
var BATTERY_EMPTY = 46;
var BATTERY_CHARGE = 47;
var SMS_EMPTY = 48;
var SMS_NEW = 49;
var SMS_FULL = 50;
var SMS_READED = 58;

var SIM_PUK_LOCKED = 54;
var SIMLOCK_LOCKED = 56;
var NO_SERVICE = 57;
var WAN_ERR_CODE = 0;

var AJAX_HEADER = "../";
var AJAX_TAIL = "";

var AJAX_TIMEOUT = 30000;

var outTime = 300000;
var LOGIN_STATES_SUCCEED = "0";
var LOGIN_STATES_FAIL = "-1";
var LOGIN_STATES_REPEAT = "-2";
var status_tip_position = {corner: {tooltip: "topRight",target: "bottomLeft" }};

// If remove when show confirm dialog
var DIALOG_UNREMOVE = 0;

//support language
languageArray = [
                 	{
						value: 'en_us',//default language
						display : 'English'
                 	},
					{
						value: 'ru',
						display : 'Русский'
                 	},
					{
						value: 'lt-lt',
						display : 'Lietuvių'
                 	},
					{
						value: 'lv-lv',
						display : 'Latviešu'
                 	},
					{
						value: 'et-ee',
						display : 'Eesti'
						
                 	}					
                 ];

langcssarray = ['lv-lv','lt-lt','fr-fr','pt-pt','da','de-de','sv-se','fi','ru','ar','pt-br','es-es','et-ee','es-ar'];

// Device type
var g_updateFinish = true;
var gStatusTimer = null;

function HidePageLink(getUrl, hideValue, pageName)
{
    this.getUrl = getUrl;
    this.value = hideValue;
    this.pageName = pageName;
}

var HidePageLinkArr = [
    new HidePageLink('/html/ntwkall/simlock_hide.asp', 2, 'sim_lock.asp')
];

function statusUILight(statusType, statusValue, statusPic, statusTip)
{
   this.statusType = statusType;
   this.statusValue = statusValue;
   this.statusPic = statusPic;
   this.statusTip = statusTip;
}

function status()
{
    this.WifiStatus = null;
    this.WifiStatusChg = true;
    this.SimStatus = null;
    this.SimStatusChg = true;
    this.SigStatus = null;
    this.SigStatusChg =true;
    this.ConnectStatus = null;
    this.ConnectStatusChg = true;
	this.ConnectStatus6 = null;
    this.ConnectStatus6Chg = true;
	this.ConnectStatus4 = null;
    this.ConnectStatus4Chg = true;
    this.ModeStatus = null;
    this.ModeStatusChg = true;
    this.RoamStatus = null;
    this.RoamStatusChg = true;
    this.BatteryStatus = null;
    this.BatteryStatusChg = true;
    this.smsStatusArray = null;
    this.SmsStatus = null;
    this.smsStatusArrayChg = true;
    this.WanErrCode = null;


    this.setWifiStatus = function (value){
	if(this.WifiStatus == value)
	{
		this.WifiStatusChg = false;
	}
	else
	{
		this.WifiStatusChg = true;
		this.WifiStatus = value;
	}

    };
    this.setSimStatus = function (value){
    	if(this.SimStatus != value)
	{
		this.SimStatusChg = true;
		this.SimStatus = value;
	}
	else
	{
		this.SimStatusChg = false;
	}
    };
    this.setSigStatus = function (value){
       if(this.SigStatus != value)
	{
		this.SigStatusChg = true;
		this.SigStatus = value;
	}
	else
	{
		this.SigStatusChg = false;
	}
    };
    this.setConnectStatus = function (value){
	if(this.ConnectStatus != value)
	{
		this.ConnectStatusChg = true;
		this.ConnectStatus = value;
	}
	else
	{
		this.ConnectStatusChg = false;
	}
    };
	this.setConnectStatus6 = function (value){
	if(this.ConnectStatus6 != value)
	{
		this.ConnectStatus6Chg = true;
		this.ConnectStatus6 = value;
	}
	else
	{
		this.ConnectStatus6Chg = false;
	}
    };
	this.setConnectStatus4 = function (value){
	if(this.ConnectStatus4 != value)
	{
		this.ConnectStatus4Chg = true;
		this.ConnectStatus4 = value;
	}
	else
	{
		this.ConnectStatus4Chg = false;
	}
    };
    this.setModeStatus = function (value){
	if(this.ModeStatus == value)
	{
		this.ModeStatusChg = false;
		return;
	}
	this.ModeStatusChg = true;
        this.ModeStatus = value;
        var modeStatusLight = this.searchPicAndTip(value);

        if (null == modeStatusLight)
        {
            return;
        }

        for(var i = 0; i < STATUS_TYPE_VALUE_SHOW.length; i ++)
        {
            var statusLight = STATUS_TYPE_VALUE_SHOW[i];

            if ((statusLight.statusValue == SIG_ONE) ||
                (statusLight.statusValue == SIG_TWO) ||
                (statusLight.statusValue == SIG_THREE) ||
                (statusLight.statusValue == SIG_FOUR) ||
                (statusLight.statusValue == SIG_FIVE))
            {
                statusLight.statusTip = modeStatusLight.statusTip;
            }
        }

    };
    this.setRoamStatus = function (value){
	if(this.RoamStatus != value)
	{
		this.RoamStatusChg = true;
		this.RoamStatus = value;
	}
	else
	{
		this.RoamStatusChg = false;
	}
    };
    this.setBatteryStatus = function (value){
	if(this.BatteryStatus != value)
	{
		this.BatteryStatusChg = true;
		this.BatteryStatus = value;
	}
	else
	{
		this.BatteryStatusChg = false;
	}
    };
    this.setSmsStatus = function (value)
    {
	if(this.smsStatusArray == value)
	{
		this.smsStatusArrayChg = false;
		return;
	}
	this.smsStatusArrayChg = true;
	this.smsStatusArray = value;
	var smsStatusArray = value.split(",");
        this.SmsStatus = smsStatusArray[0];
        var smsStatusLight = this.searchPicAndTip(this.SmsStatus);

        if (null == smsStatusLight)
        {
            return;
        }
        smsStatusLight.statusTip = smsStatusArray[1];
    };

    this.setWanErrCode = function (value){
       this.WanErrCode = value;
    };

    this.searchPicAndTip = function(value) {
        for(var i = 0; i < STATUS_TYPE_VALUE_SHOW.length; i ++) {
            var statusLight = STATUS_TYPE_VALUE_SHOW[i];

            if(statusLight.statusValue == value) {
                return statusLight;
            }
        }
        return null;
    };

    this.showPicAndTip = function(value, isInit,chg) {
	if(chg == false)
	{
		return;
	}
        var statusLight = this.searchPicAndTip(value);

        if(null == statusLight) {
            return;
        }

        if("" == statusLight.statusPic) {
            $("#" + statusLight.statusType).css({
					"display" : "none"
			});

            return;
        }
        $("#" + statusLight.statusType).css({
                "display" : "block"
        });

        $("#" + statusLight.statusType).css(
        {
            "background-image" : "url("+ statusLight.statusPic + ")"
        });

		if(isInit || null == $(".qtip-" + statusLight.statusType).find(".qtip-content").html())
		{
		    $("#tooltip_" + statusLight.statusType + "").qtip({
				content : "<b>" + statusLight.statusTip + "</b>",
				position : status_tip_position,
				style: {
					name: statusLight.statusType
				}
			});
		}
		else
		{
			$(".qtip-" + statusLight.statusType).find(".qtip-content").html("<b>" + statusLight.statusTip + "</b>");
		}
    };

    this.showAllStatus = function(isInit) {
        this.showPicAndTip(this.WifiStatus, isInit,this.WifiStatusChg);
        this.showPicAndTip(this.SimStatus, isInit,this.SimStatusChg);
        this.showPicAndTip(this.SigStatus, isInit,this.SigStatusChg);
        this.showPicAndTip(this.ConnectStatus, isInit,this.ConnectStatusChg);
        this.showPicAndTip(this.ModeStatus, isInit,this.ModeStatusChg);
        this.showPicAndTip(this.RoamStatus, isInit,this.RoamStatusChg);
        this.showPicAndTip(this.BatteryStatus, isInit,this.BatteryStatusChg);
        this.showPicAndTip(this.SmsStatus, isInit,this.smsStatusArrayChg);
    };
}

// Get which broswer in using
var userAgent = navigator.userAgent.toLowerCase();

// Figure out what browser is being used
jQuery.browser = {
	version : (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [ 0, '0' ])[1],
	safari : /webkit/.test(userAgent),
	opera : /opera/.test(userAgent),
	msie : (/msie/.test(userAgent)) && !(/opera/.test(userAgent)),
	mozilla : /mozilla/.test(userAgent)
			&& !/(compatible|webkit)/.test(userAgent),
	ipad : /ipad/.test(userAgent),
	itouch : /itouch/.test(userAgent)
};

if ($.browser.msie && ($.browser.version == "6.0")) {
	try {
		document.execCommand("BackgroundImageCache", false, true);
	} catch (e) {
	}
}

/* ------------------------ Language ----------------------------------- */
var LANGUAGE_DATA = {
	current_language : "en_us",
	supportted_languages : new Array()
};

// Language position sequence
var Language_right_left = false;

// Init tooltip direction following language kind
var tooltip_position = 'rightMiddle';
var target_position = 'leftMiddle';

// load lang file
function tryLoadLangFile() {
	var langFile = "/lang/lang_" + LANGUAGE_DATA.current_language + ".res?ver="+__jsver__;;
	if ($.browser.mozilla) {
		try {
			// netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
		} catch (exception) {
			log.error(exception);
		}
	}
	$.ajax({
		async : false,
		// cache: false,
		type : "GET",
		timeout : "3000",
		url : langFile,
		dataType : "script",
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			try {
				log.error("MAIN : tryLoadLangFile error.");
				log.error("MAIN : XMLHttpRequest.readyState = "
						+ XMLHttpRequest.readyState);
				log.error("MAIN : XMLHttpRequest.status = "
						+ XMLHttpRequest.status);
				log.error("MAIN : textStatus" + textStatus);
				log.error("MAIN : errorThrown" + errorThrown);
			} catch (exception) {
				log.error(exception);
			}
		},
		success : function(data) {
			log.debug("MAIN : loadLangFile() success.");
		}
	});
}

function loadLangFile() {
	tryLoadLangFile();
}

// document.write
function dw(text) {
	document.write(text);
}

// get user saved lang
function getLang(key) {
	//key = false;
	if (key) {
		LANGUAGE_DATA.current_language = newCookie(key);
		if(false == isValidLanguage(LANGUAGE_DATA.current_language))
		{
			LANGUAGE_DATA.current_language = null;
		}
		LANGUAGE_DATA.current_language = LANGUAGE_DATA.current_language == null ? languageArray[0].value
				: LANGUAGE_DATA.current_language;
		loadLangFile();
	} else {
		/*
		 * getAjaxData('api/language/current-language', function($xml){ var ret =
		 * xml2object($xml); LANGUAGE_DATA.current_language = ';
		 * LANGUAGE_DATA.current_language =
		 * LANGUAGE_DATA.current_language==""?'en_us':LANGUAGE_DATA.current_language.replace(/-/,"_");
		 * loadLangFile(); }, { sync : true } );
		 */
	}
	// Get language direction
	if (LANGUAGE_DATA.current_language == "ar") {
		var link = $("link").get(0);
		$(link).attr("href", "/css/main_ar.css?ver="+__version__);
		Language_right_left = true;
	} else {
		Language_right_left = false;
	}
	if(needspecialcss(LANGUAGE_DATA.current_language))
	{
		$("link").after('<link rel="stylesheet" type="text/css" href="/css/'+LANGUAGE_DATA.current_language+'.css?ver=' + __version__ + '" />\n');
	}
	
	swapTooltipPosition(Language_right_left);
	//
}

function needspecialcss(lang)
{
	for(var index = 0 ; index < langcssarray.length; index ++)
	{
		if(lang == langcssarray[index])
		{
			return true;
		}
	}
	return false;
}

var log = log4javascript.getNullLogger();
var _logEnable = getQueryStringByName("log");
if (_logEnable == "debug") {
	log.setLevel(log4javascript.Level.DEBUG);
} else if (_logEnable == "trace") {
	log.setLevel(log4javascript.Level.TRACE);
}
log.debug("MAIN : entered " + window.location.href);
// jquery cookie
function newCookie(name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires
				&& (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime()
						+ (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires
			// attribute,
			// max-age is not
			// supported by IE
		}
		var path = options.path ? '; path=' + options.path : '';
		var domain = options.domain ? '; domain=' + options.domain : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [ name, '=', encodeURIComponent(value), expires,
				path, domain, secure ].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for ( var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie
							.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}

};

function initLightArray()
{
	STATUS_TYPE_VALUE_SHOW = [
    new statusUILight("wifi_gif",      WIFI_ON        ,       "/res/station_3.gif"         , gVarWifiOn          ),
    new statusUILight("wifi_gif",      WIFI_TRANS        ,       "/res/station_3.gif"      , gVarWifiOn          ),
    new statusUILight("wifi_gif",      WIFI_OFF       ,       "/res/station_0.gif"         , gVarWifiOff         ),
    new statusUILight("sim_gif",       NO_SIM         ,       "/res/no_card.gif"           , sim_status_no_card  ),
    new statusUILight("sim_gif",       SIM_NORMAL     ,       "/res/sim_enable.gif"        , sim_status_normal   ),
    new statusUILight("sim_gif",       SIM_PIN_LOCKED ,       "/res/sim_lock.gif"          , sim_status_pin_locked ),
    new statusUILight("sim_gif",       SIM_PUK_LOCKED ,       "/res/sim_lock.gif"          , sim_status_puk_locked ),
    new statusUILight("sim_gif",       SIM_ERROR      ,       "/res/sim_err.gif"           , sim_status_invalid_card ),
    new statusUILight("sim_gif",       SIMLOCK_LOCKED ,       "/res/sim_lock.gif"          , sim_status_simlocked ),
    new statusUILight("signal_gif",    SIG_OFF        ,       "/res/signal_0.gif"          , gVarNoSig           ),
    new statusUILight("signal_gif",    SIG_ONE        ,       "/res/signal_1.gif"          , ""            ),
    new statusUILight("signal_gif",    SIG_TWO        ,       "/res/signal_2.gif"          , ""            ),
    new statusUILight("signal_gif",    SIG_THREE      ,       "/res/signal_3.gif"          , ""            ),
    new statusUILight("signal_gif",    SIG_FOUR       ,       "/res/signal_4.gif"          , ""            ),
    new statusUILight("signal_gif",    SIG_FIVE       ,       "/res/signal_5.gif"          , ""            ),
    new statusUILight("connect_gif",   NO_CONNECT     ,       "/res/wan_902.gif"           , connect_status_disconnected ),
    new statusUILight("connect_gif",   NO_SERVICE     ,       "/res/wan_902.gif"           , connect_status_noservice ),
    new statusUILight("connect_gif",   CONNECTING     ,       "/res/point_searching.gif"   , connect_status_connecting ),
    new statusUILight("connect_gif",   CONNECTED      ,       "/res/wan_901.gif"           , connect_status_connected ),
    new statusUILight("mode_gif",      MODE_OFF       ,       ""                             , ""                ),
    new statusUILight("mode_gif",      MODE_2G        ,       ""                             , wan_netmode_gsm ),
    new statusUILight("mode_gif",      MODE_3G        ,       ""                             , wan_netmode_wcdma ),
    new statusUILight("mode_gif",      MODE_4G        ,       ""                             , wan_netmode_lte ),
    new statusUILight("roam_gif",      ROAM_HOME      ,       ""                             , ""                ),
    new statusUILight("roam_gif",      ROAM_ROAMING   ,       "/res/roaming_1.gif"         , gVarRoaming         ),
    new statusUILight("roam_gif",      ROAM_FORBID    ,       "/res/roam_forbit.gif"         , gVarRoamingForbid   ),
    new statusUILight("battery_gif",   BATTERY_LVL0   ,       "/res/battery_level_0.gif"   , gVarBatteryLVL4     ),
    new statusUILight("battery_gif",   BATTERY_LVL1   ,       "/res/battery_level_1.gif"   , gVarBatteryLVL0     ),
    new statusUILight("battery_gif",   BATTERY_LVL2   ,       "/res/battery_level_2.gif"   , gVarBatteryLVL1     ),
    new statusUILight("battery_gif",   BATTERY_LVL3   ,       "/res/battery_level_3.gif"   , gVarBatteryLVL2     ),
    new statusUILight("battery_gif",   BATTERY_LVL4   ,       "/res/battery_level_4.gif"   , gVarBatteryLVL3     ),
    new statusUILight("battery_gif",   NO_BATTERY     ,       "/res/battery_no.gif"       , gVarNOBattery       ),
    new statusUILight("battery_gif",   BATTERY_EMPTY  ,       "/res/battery_low.gif"   , gVarBatteryEmpty    ),
    new statusUILight("battery_gif",   BATTERY_CHARGE ,       "/res/battery_elect.gif"     , gVarBatteryCharge   ),
    new statusUILight("sms_gif",       SMS_EMPTY      ,       "/res/sms_empty.gif"   ,      sms_status_empty    ),
    new statusUILight("sms_gif",       SMS_NEW        ,       "/res/sms_new.gif"    , sms_status_new          ),
    new statusUILight("sms_gif",       SMS_FULL       ,       "/res/sms_full.gif"          , sms_status_full         ),
    new statusUILight("sms_gif",       SMS_READED     ,       "/res/sms_readed.gif", "")
];
}

// new log object for debug page
function getQueryStringByName(item) {
	var svalue = location.search.match(new RegExp("[\?\&]" + item
			+ "=([^\&]*)(\&?)", "i"));
	return svalue ? svalue[1] : svalue;
}

function swapTooltipPosition(languageDirection) {
	if (languageDirection) {
		tooltip_position = 'topcenter';
		target_position = 'bottomleft';
		status_tip_position = {corner: {tooltip: "topLeft",target: "bottomCenter" }};
	} else {
		tooltip_position = 'topleft';//'topleft';
		target_position = 'bottomCenter';//rightbottom
		status_tip_position = {corner: {tooltip: "topRight",target: "bottomLeft" }};
	}
}

// Display Title


function isIndexPage()
{
	var currentPage = getCurrentPageName();
	if(currentPage != ''
		&& currentPage != 'index.asp'
		&& currentPage != '') {

		return false;
	}

	return true;
}

getLang("Language"); // load language decive
loadMessageJs();
initLightArray();

function loadMessageJs(){
	
	var langFile = "/js/lib/jquery.messager.js?ver="+__jsver__;
	if(Language_right_left)
	{
		langFile = "/js/lib/jquery.messager_ar.js?ver="+__jsver__;
	}
		
	$.ajax({
		async : true,
		// cache: false,
		type : "GET",
		timeout : "3000",
		url : langFile,
		dataType : "script",
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			try {
				log.error("MAIN : tryLoadLangFile error.");
				log.error("MAIN : XMLHttpRequest.readyState = "
						+ XMLHttpRequest.readyState);
				log.error("MAIN : XMLHttpRequest.status = "
						+ XMLHttpRequest.status);
				log.error("MAIN : textStatus" + textStatus);
				log.error("MAIN : errorThrown" + errorThrown);
			} catch (exception) {
				log.error(exception);
			}
		},
		success : function(data) {
			log.debug("MAIN : loadMessageJs() success.");
		}
	});
}


function isPushPage()
{
		var currentPage = getCurrentPageName();
		if(currentPage=='pushdetail.asp')
		{
			return true;
		}
		return false;
}

function fixinput()
{
	if(!isIndexPage())
	{
		$("input:text").css({"width":"150px"});
		$("input:password").css({"width":"150px"});
	}
	$("input:checkbox").css({"height":"15px","vertical-align":"middle"});
	$("input:radio").css({"height":"15px","vertical-align":"middle"});
}
/**
 * *************************************************************************After
 * loaded (common)***********
 */
$(document)
		.ready(
				function() {
					// hide right mouse click menu
					// document.oncontextmenu=new Function("return false");
					if(isPushPage())
					{
						return;
					}

                    if(!isIndexPage())
                    {
                        initHidePageLink();
                    }
					// load header,
					document.title = common_label_product_name;
					if (navigator.userAgent.indexOf("MSIE 6.") > -1) {
						$(".content_item").addClass("clearfix");
						fixinput();
					}
					$("#header").load(
							"/header.asp",
							function() {
                                 if(!isIndexPage()) {
                                  initMenu();
								  initLanguage("language_sel");
								  $("#logout_span").text(menu_label_logout);
                                }
								else
								{
									$("#main_menu").hide();
									$("#help_span").hide();
									$(".language").hide();
									initLanguage("Language");
								}

								//$("#hilink_main_menu").hide();

								if(typeof isIndex != 'undefined') {
									var expires = "; expires="+ (new Date()).toGMTString();
									var cookie = "Language=" + 'en' + expires + "; path=/";
									document.cookie = cookie;
									$('#main_menu li:gt(0)').hide();
								}

								$("#help_span").text(menu_label_help);

                                getGlobalStatus();
								initialHeartBeatAndNotify();
							});

					// Load footer
					$("#footer").load(
							"/footer.asp img, span",
							function() {
								if(LANGUAGE_DATA.current_language == 'zh_cn')
								{
									$("#footer span").html(
											"&nbsp;&nbsp;" + gVarRight +"&nbsp;&nbsp;" +'<img src="/res/split_line1.gif" >'+"&nbsp;&nbsp;"+'<a href="http://consumer.huawei.com/cn/privacy-policy/index.htm">'+gVarPrivacyPolicy+ '</a>');	
								}
								else
								{
									$("#footer span").html(
											"&nbsp;&nbsp;" + gVarRight +"&nbsp;&nbsp;" +'<img src="/res/split_line1.gif" >'+"&nbsp;&nbsp;"+'<a href="http://consumer.huawei.com/en/privacy-policy/index.htm">'+gVarPrivacyPolicy+ '</a>');									
								}
							});
					/*表格奇偶行背景色*/
					setTableBgColor();
				});
function setTableBgColor(){
	$(".table_list tr:even").addClass("even_tr");
	$(".table_list tr:odd").addClass("odd_tr");
}
function reloadLeftMenu() {
	var currentPageName = getCurrentPageName();
	var menuId = getMenuIdByPageName(currentPageName);
	if(null == menuId)
	{
		currentPageName = getParentPageInMap(currentPageName);
		menuId = getMenuIdByPageName(currentPageName);
	}
	var topParentId = getTopParentID(menuId);
	var parentId = menuId.substring(0,menuId.lastIndexOf("_"));
	var topParentMenuItem = g_oMenuTree.getMenuById(topParentId);
	var parentMenuItem = g_oMenuTree.getMenuById(parentId);
	var thirdMenuItem = g_oMenuTree.getMenuById(menuId);
	makeLeftMenuHTML(thirdMenuItem, topParentMenuItem);
	clickMenu('menu_settings');
	highlightCurrentMenu(thirdMenuItem,parentMenuItem);
	$("#" + topParentId).addClass("active");
}

function getTopParentID(menuID)
{
	var menu=eval(menuID);
	var ret=menuID;
	if(menu.level == 4)
	{
		ret=ret.substring(0, ret.lastIndexOf("_"));
	}
	return (ret.substring(0, ret.lastIndexOf("_")));

}

function makeLeftMenuHTML(thirdMenuItem, parentMenuItem)
{
	var child;
	var thirdHTML = '<div id="settings_menu" class="menu_settings"><ul>';

	for (var i = 0; i < parentMenuItem.nChildCount; i++) {
      child = parentMenuItem.children[i];
      if (child.visibility == false) {
          continue;
      }

	  if(0 == child.nChildCount)
	  {
		thirdHTML = thirdHTML + '<li class="nosub" id="'+child.id+'">';
		thirdHTML = thirdHTML + '<a href="'+ eval(child.id).link + '" target="_top">' +eval(child.text) +'</a></li>';
      }
	  else
	  {
		thirdHTML = thirdHTML + '<li class="sub" id="'+child.id+'">';
		thirdHTML = thirdHTML + '<span">'+eval(child.text)+'</span>';
		thirdHTML = thirdHTML + '<ul>';
		for(var j = 0; j< child.nChildCount;j++)
		{
			var sumItem = child.children[j];
			if (sumItem.visibility == false)
			{
				continue;
			}
			thirdHTML = thirdHTML + '<li id="'+sumItem.id+'"><a href="'+ eval(sumItem.id).link + '" target="_top">' +eval(child.text) +'</a></li>';
		}
		thirdHTML = thirdHTML + '</ul>';
		thirdHTML = thirdHTML + '</li>';
		}

	  }

   thirdHTML = thirdHTML + '</ul></div>';
   document.getElementById('settings_menu').innerHTML = thirdHTML;
}

function highlightCurrentMenu(currentMenu,parentMenuItem) {
     if( (0 == currentMenu.nChildCount) && (currentMenu.level == 3)) {
        $('#' + currentMenu.id).addClass('nosubclick');
    }
    else {
        $('#' + parentMenuItem.id).addClass('click');
        $('#' + currentMenu.id).addClass('subClick');
    }
}


/**
 * **************************************************Use Function
 * (end)*************************************
 */
/** *********Function for create button************ */
function create_buttonHTML(content, button_id, buttonClassName) {
    var button = '';

    if (buttonClassName != "" && buttonClassName != " "
			&& buttonClassName != null)
		button = "<span class='button_wrapper " + buttonClassName + "' id='"
				+ button_id + "'>";
	else
		button = "<span class='button_wrapper' id='" + button_id + "'>";

	button += "<span class='button_left'>" + "<span class='button_right'>"
			+ "<span class='button_center'>" + content
			+ "</span></span></span></span>";
    return button;
}

/*
function create_button(content, button_id, buttonClassName) {

	document.write(create_buttonHTML(content, button_id, buttonClassName));
}
*/

/***********Function for create button*************/
function create_button_spec(content,button_id,buttonClassName)
{
	  button = "<span class='"+buttonClassName+"' id='" + button_id + "'>"+content+'</span>';;
	 document.write(button);
}


function create_button(content, button_id, buttonClassName) {
    if (buttonClassName != '' && buttonClassName != ' ' && buttonClassName != null) {
        button = "<span class='button_wrapper " + buttonClassName + "' id='" + button_id + "'>";
    }
    else {
        button = "<span class='button_wrapper' id='" + button_id + "'>";
    }
    button += "<span class='button_left'>" + "<span class='button_right'>" + "<span class='button_center'>" + content + '</span></span></span></span>';
    document.write(button);
}


function create_option_button(content, button_id, buttonClassName) {
	if (buttonClassName != "" && buttonClassName != " "
			&& buttonClassName != null)
		button = "<span class='button_wrapper " + buttonClassName + "' id='"
				+ button_id + "'>";
	else
		button = "<span class='button_wrapper' id='" + button_id + "'>";

	button = "<span class='button_wrapper' id='" + button_id[0] + "'>";

	button += "<span class='button_left'>"
			+ "<span class='button_right_noApply'>"
			+ "<span class='button_center_noApply'>" + "<span >" + content[0]
			+ "</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class='button_center'>"
			+ content[1] + "</span>" + "</span></span></span>";

	document.write(button);
}
function create_button_html(content, button_id, buttonClassName) {
	if (buttonClassName != "" && buttonClassName != " "
			&& buttonClassName != null)
		button = "<span class='button_wrapper " + buttonClassName + "' id='"
				+ button_id + "'>";
	else
		button = "<span class='button_wrapper' id='" + button_id + "'>";

	button += "<span class='button_left'>" + "<span class='button_right'>"
			+ "<span class='button_center'>" + content
			+ "</span></span></span></span>";
	return button;
}

function isButtonEnable(button_id) {
	var disable = true;
	var $button = $("#" + button_id);
	if ($button) {
		if ($button.children()) {
			disable = $button.hasClass("disable_btn");
			// enable = $button.children().hasClass("button_left");
		}
	}
	return !disable;
}

// show info dialog
var QTIP_AUTO_HIDE_DELAY = 3000;
// function for show jquery qtip
function showQtip(showTarget, content, delay) {
	var $showTarget = $("#" + showTarget);
	if ($showTarget) {
		$showTarget.qtip({
			content :{
				text:content
			},
			position : {
				corner : {
					tooltip : tooltip_position,
					target : target_position
				}
			},
			show : {
				when : false,
				ready : true
			},

			style: {border: {
					width: '1',
					radius: '2',
					color: '#666666'
				 },
					'font-weight':'bold',
					'color':'white',
					'background-color':'#4A708B'
			}
		});
		if (delay) {
			setTimeout(function() {
				$showTarget.qtip("destroy");
			}, delay);
		}
		/*else {
			setTimeout(function() {
				$showTarget.qtip("destroy");
			}, QTIP_AUTO_HIDE_DELAY);
		}
		*/
	}
	$showTarget.focus();
}

var g_currentStatus = new status();
function lightPanelStatus(xml, isInit)
{
    var strXml = xml;
    var wifi = strXml.getElementsByTagName("WIFI")[0].firstChild.data;
    var sim = strXml.getElementsByTagName("SIM")[0].firstChild.data;
    var sig = strXml.getElementsByTagName("SIG")[0].firstChild.data;
    var mode = strXml.getElementsByTagName("Mode")[0].firstChild.data;
    var roam = strXml.getElementsByTagName("Roam")[0].firstChild.data;
    var battery = strXml.getElementsByTagName("Battery")[0].firstChild.data;
    var sms = strXml.getElementsByTagName("SMS")[0].firstChild.data;
    var connect = strXml.getElementsByTagName("Connect")[0].firstChild.data;
	var connect6 = strXml.getElementsByTagName("Connect6")[0].firstChild.data;
	var connect4 = strXml.getElementsByTagName("Connect4")[0].firstChild.data;
    var wanErrCode = strXml.getElementsByTagName("WanErrCode")[0].firstChild.data;


    g_currentStatus.setWifiStatus(wifi);
    g_currentStatus.setSimStatus(sim);
    g_currentStatus.setSigStatus(sig);
    g_currentStatus.setConnectStatus(connect);
	g_currentStatus.setConnectStatus6(connect6);
	g_currentStatus.setConnectStatus4(connect4);
    g_currentStatus.setModeStatus(mode);
    g_currentStatus.setRoamStatus(roam);
    g_currentStatus.setBatteryStatus(battery);
    g_currentStatus.setSmsStatus(sms);
    g_currentStatus.setWanErrCode(wanErrCode);
    g_currentStatus.showAllStatus(isInit);
    showWanPage(g_currentStatus);
}


function refreshlight()
{
	if (xmlledhttp.readyState == 4)
	{
		if (xmlledhttp.status == 200)
		{
			var ret = xmlledhttp.responseXML;
			if(ret) {
				try
				{
					lightPanelStatus(ret, isInit);		
					setTimeout(getPanelData,3000);					
				} catch (e) {}
			}
		}
	}
}

var isInit=true;
var xmlledhttp = null;
function getPanelData()
{
    if(!enableRefresh)
    {
        return;
    }

    if(!g_updateFinish)
    {
        return;
    }
	xmlledhttp = CreateXMLHttp();
    xmlledhttp.onreadystatechange = refreshlight;	
    xmlledhttp.open('post','/index/getStatusByAjax.cgi?rid=' + Math.floor(Math.random() * 1000), true);
    xmlledhttp.send(null);
}
function getGlobalStatus() {
    getPanelData();
	isInit = false;
}

function showWanPage(currentStatus)
{
    var pageName = getCurrentPageName();

    if('wan_settings.asp' == pageName)
    {
        StatusChanged(currentStatus);
    }

    if('overview.asp' == pageName)
    {
        showSigAndConStatus(currentStatus);
    }

	if('sim_lock.asp' == pageName)
    {
        SIMLOCK_showSimStatus(currentStatus.SimStatus);
    }
}


function setHideMenuItem(pageName)
{
    var menuId = getMenuIdByPageName(currentPageName);

}


/** ***********Get and save data (end)************* */
// Drop down select
function drop_down_select(touchElement, _select) {
	touchElement.focus(function() {
		$(this).attr("readonly", "readonly");
	});

	// select show
	touchElement.click(function() {
		_select.slideToggle(100, function() {
			if ($.browser.msie && ($.browser.version == "6.0")
					&& _select.children("li,span").size() == 0) {
				_select.css({
					height : "1px"
				});
			}

			if ($(this).attr("id") == "select_country") {
				$(this).css({
					display : "block",
					"overflow-y" : "scroll"
				});
			}
		});
		_select.css({
			"z-index" : "3"
		});
	});
	// select hide
	_select.children().click(function() {
		var optionIndex = _select.children().index(this);
		touchElement.val(_select.children().eq(optionIndex).text());
		_select.slideUp(100);
		return false;
	});
	// for auto hide
	var elementId = touchElement.attr("id");
	$(document).click(function(event) {
		if ($(event.target).attr("id") != elementId) {
			_select.slideUp(100);
		}
	});
}

// new Drop down select
function drop_down_select_ex(touchElement, _select, _selectOptions, changeFun) {
	// bind select options for _select
	if (_selectOptions) {
		_createDropDownListItem(_selectOptions, _select);
	}
	touchElement.attr("readonly", "readonly").click(function() {
		this.blur();
	});

	// select show
	touchElement.click(function() {
		_select.slideToggle(100, function() {
			if ($.browser.msie && ($.browser.version == "6.0")
					&& _select.children("li,span").size() == 0) {
				_select.css({
					height : "1px"
				});
			}

			if ($(this).attr("id") == "select_country") {
				$(this).css({
					display : "block",
					"overflow-y" : "scroll"
				});
			}
		});
		_select.css({
			"z-index" : "3"
		});
	});
	// select hide
	_select.children().click(
			function(event) {
				var optionIndex = _select.children().index(this);
				// initialize global variable for DropDownList value
				if (_selectOptions) {
					if (isNaN(_selectOptions[optionIndex][0])) {
						eval(touchElement.attr("id") + "_innerValue" + "='"
								+ _selectOptions[optionIndex][0] + "'");
					} else {
						eval(touchElement.attr("id") + "_innerValue" + "="
								+ _selectOptions[optionIndex][0] + ";");
					}
				}
				var selectCurrentValue = touchElement.val();
				touchElement.val(_select.children().eq(optionIndex).text());
				// execute change function
				if (selectCurrentValue != touchElement.val()) {
					if (typeof (changeFun) == "function") {
						changeFun();
					}
				}
				_select.slideUp(100);
			});
	// for auto hide
	var elementId = touchElement.attr("id");
	$(document).click(function(event) {
		if ($(event.target).attr("id") != elementId) {
			_select.slideUp(100);
		}
	});
}

// internal used by drop_down_select
function _createDropDownListItem(itemObject, insertNode) {
	var itemHtml = "";
	if (itemObject && $.isArray(itemObject)) {
		$(itemObject).each(
				function(i) {
					itemHtml += "<li><a href='javascript:void(0);'>"
							+ itemObject[i][1] + "</a></li>\n";
				});
		insertNode.append(itemHtml);
	}
}

function initDropDownListValue(sId, itemObject, defaultVal) {
	if (sId) {
		setDropDownListValue(sId, defaultVal);
	}
	var returnVal = "";
	if (itemObject && $.isArray(itemObject)) {
		$(itemObject).each(function(i) {
			if (itemObject[i][0] == defaultVal) {
				returnVal = itemObject[i][1];
			}
		});
	}
	return returnVal;
}

// function for get dropdownlist value
function getDropDownListValue(sId) {
	return eval(sId + "_innerValue");
}

// function for set dropdownlist value
function setDropDownListValue(sId, sValue) {
	if (isNaN(sValue)) {
		return eval(sId + "_innerValue" + "='" + sValue + "';");
	} else {
		return eval(sId + "_innerValue" + "=" + sValue + ";");
	}
}

function dropDownListText2Value(optionsArray, text) {
	var returnVal = "";
	if (optionsArray && $.isArray(optionsArray)) {
		$(optionsArray).each(function(i) {
			if (optionsArray[i][1] == text) {
				returnVal = optionsArray[i][0];
			}
		});
	}
	return returnVal;
}


/** ******************Function formatFloat******************** */
function formatFloat(src, pos) {
	return parseInt(src * Math.pow(10, pos)) / Math.pow(10, pos);
}

/**
 * ***********************Function for current connection time in connection
 * page*****************************
 */
function getCurrentTime(time) {
	var final_time = "";
	var times = parseInt(time);
	var days = parseInt((times / 3600) / 24);
	final_time += (days > 0) ? days + " " + dialup_label_days : "";
	times = times - days * 3600 * 24;
	var hours = parseInt(times / 3600);
	final_time += (hours > 0) ? hours + " " + dialup_label_hours : "";
	times = times - hours * 3600;
	var minutes = parseInt(times / 60);
	final_time += (minutes > 0) ? minutes + " " + dialup_label_minutes : "";
	if (final_time.length == 0) {
		final_time = minutes + " " + dialup_label_minutes;
	}
	return final_time;
}

function getCurrentTimeArray(time) {
	var times_array = new Array();
	var times = parseInt(time);
	var days = parseInt((times / 3600) / 24);
	times_array.push(days);
	times = times - days * 3600 * 24;
	var hours = parseInt(times / 3600);
	times_array.push(hours);
	times = times - hours * 3600;
	var minutes = parseInt(times / 60);
	times_array.push(minutes);
	var secondes = times - minutes * 60;
	times_array.push(secondes);
	return times_array;
}

/**
 * **************************************************Function list
 * (end)***********************************
 */

function clickMenu(menu) {
	var getEls = $("." + menu + " li ");

	$.each(getEls, function(i) {
		$(this).click(function() {
			if ($(this).hasClass("sub") && $(this).hasClass("click")) {
				$(this).removeClass("click");
			} else if ($(this).hasClass("nosub")) {
				return true;
			} else {
				$(getEls).removeClass("click");
				$(this).addClass("click");
			}
		});
		$(this).mouseover(function() {
			$(this).addClass("menu_hover");
		});
		$(this).mouseout(function() {
			$(this).removeClass("menu_hover");
		});
	});
}



// return true if the AJAX response from server is <response>OK</response>
// obj: object came from $xml
function isAjaxReturnOK(obj) {
	var ret = false;
	if (obj) {
		if (typeof (obj.response) == "string") {
			if (obj.response.toLowerCase() == "ok") {
				ret = true;
			}
		}
	}
	return ret;
}

// refresh current page
function refresh() {
	window.location.reload();
}

// goto page without history
function gotoPageWithoutHistory(url) {
	log.debug("MAIN : gotoPageWithoutHistory(" + url + ")");
	window.location.replace(url);
}

// goto page with history
function gotoPageWithHistory(url) {
	log.debug("MAIN : gotoPageWithHistory(" + url + ")");
	window.location.href = url;
}

function showErrorUnderTextbox(idOfTextbox, errormsg) {
	var errorLabel = "<div class='error_message'><label>" + errormsg
			+ "</label><div>";
	$("#" + idOfTextbox).parent().append(errorLabel);
}

function clearAllErrorLabel() {
	$(".error_message").remove();
}

var enableRefresh=true;

function initialHeartBeatAndNotify() {
	if(enableRefresh && (!isIndexPage()))
	{
		RssirefreshSub();
		setTimeout(RssirefreshSub, 8000);
	}
	setTimeout(NotifyInfoGet,2000)
	return;
}

var event_proc_page=
[
	"/html/management/firmwarecontent.asp",
	"/html/ntwkall/wan_settings.asp",
]

function notifyJumpPage(notifyId)
{
	var form = new WebSubmitForm();
	form.setAction('notifyJumpPage.cgi?eventId='+notifyId+'&jumpPage='+event_proc_page[notifyId]+'&RequestFile=/html/management/maintenance.asp');
    form.submit();
}



function showDialogByResponse(eventStatus)
{
	var event_msg_list=
				[notify_msg_httpupg,
				 notify_msg_roam,
				];
	var event_num = 2;
	var status_list=eventStatus.split(":");
	if(status_list.length < event_num)
	{
		return ;
	}
	/*
	var upg = status_list[0];
	var roam = status_list[1];
	var losscov = status_list[2];
	var simrestricted = status_list[3];
	var connupdown = status_list[4];
	var restart = status_list[5];
	*/
	var i=0;
	var showMsg=false;
	var content ='';
	var height=28;
	for(i=0;i<event_num;i++)
	{
		if(status_list[i] == 1)
		{
			content+=event_msg_list[i] + ' ' + notify_label_process.replace(/EVENT_INDEX/g, i);
			showMsg=true;
			height+=45;
		}
	}
	if(true == showMsg)
	{
		$.messager.lays(250,height);
		$.messager.show(notify_lable_tip,content,0);
	}
}

function NotifyInfoGet()
{
	var xmlhttp = CreateXMLHttp();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4)
		{
			if (xmlhttp.status == 200)
			{
				showDialogByResponse(xmlhttp.responseText);
			}
		}
	}
	xmlhttp.open('post','/html/ajaxref/getEventStatus.cgi', true);
	xmlhttp.send(null);
}

function disableRefresh()
{
	enableRefresh=false;
}


var USER_MANUAL_PATH = "usermanual";
var USER_MANUAL_FILE_NAME = "web_content_concept_1.html";
var g_user_manual_url = "";
function getUserManualUrl() {
	var helpUrl = document.getElementById("help_url");
	var current_language = LANGUAGE_DATA.current_language;
	var supportedManualLang = [ "zh_cn", "en_us" ];
	// if($.inArray(current_language, supportedManualLang) > -1)
	{
		current_language = current_language.replace('_', '-');
		g_user_manual_url = "../" + USER_MANUAL_PATH + "/" + current_language
				+ "/" + USER_MANUAL_PATH + "/" + USER_MANUAL_FILE_NAME;

		if (typeof helpUrl != "undefined" && typeof helpUrl != null) {
			helpUrl.href = g_user_manual_url;
		}
	}
}

function refreshUrl(url) {
	window.location.href = url;
}




function initMenu()
{
    if (g_curUserType == 0)
    {
        menuTree = new MenuTree('Admin',3);
    }
    else if (g_curUserType == 1)
    {

        if(top.g_firstmenu.indexOf('Admin') != -1)
        {
            refreshMenu("User_0","User_0_0","User_0_0_0")
        }
        menuTree = new MenuTree('User',3);
    }
    else if(top.g_curUserType == 2)
    {
        g_firstmenu = "Webp_0";
        g_secondmenu = "Webp_0_0";
        g_thirdmenu = "Webp_0_0_0";
        refreshMenu(g_firstmenu, g_secondmenu, g_thirdmenu)
        menuTree = new MenuTree('Webp',3);
    }

    g_oMenuTree = menuTree;
    menuTree.init(g_disableMenu);

    menuTree.makeHTML();
	if(hasLeftMenu())
	{
		reloadLeftMenu();
	}

}


function hasLeftMenu()
{
	if($(".content").children().first().is(".main_left"))
	{
		return true;
	}
	return false;
}

function getMenuIndex(fileName)
{
	if (g_curUserType == 0)
	{
		for (var i = 0; i < AdminMenuName.length; i++)
		{
			if( fileName == AdminMenuName[i])
			{
				return i;
			}
		}
	}
	else if (g_curUserType == 1)
	{
		for (var i = 0; i < UserMenuName.length; i++)
		{
			if( fileName == UserMenuName[i])
			{
				return i;
			}
		}
    }
	else if (g_curUserType == 2)
	{
		for (var i = 0; i < WebpMenuName.length; i++)
		{
			if( fileName == WebpMenuName[i])
			{
				return i;
			}
		}
    }
	else
	{
	    return -1;
	}
}

function getMenuIdByPageName(pageName)
{
    var temp = getMenuIndex(pageName);
	if(g_curUserType == 0)
	{
	    var menuThr = AdminMenuId[temp];
	}
	else if(g_curUserType == 1)
	{
		var menuThr = UserMenuId[temp];
	}
	else if(g_curUserType == 2)
	{
		var menuThr = WebpMenuId[temp];
	}

	return menuThr;
}

function getCurrentPageName()
{
    var current_href = window.location.href;
	var end = current_href.length;
	if(current_href.indexOf("?")>-1)
	{
		end = current_href.indexOf("?");
	}
	current_href = current_href.substring(0,end);
   	if(current_href.indexOf("#")>-1)
	{
		end = current_href.lastIndexOf("#");
	}
	current_href = current_href.substring(current_href.lastIndexOf("/") + 1 , end);
    return current_href;
}

function setDisableMenu(value) {
    g_disableMenu = value;
}

function pageParentMap(currentPage, parentPage) {
    this.currentPage = currentPage;
    this.parentPage = parentPage;
}


var pageParentMapList = new Array(new pageParentMap('dhcpinfo.asp','dhcp.asp'),
                                  new pageParentMap('macipbind.asp','dhcp.asp'),
                                  new pageParentMap('wlaninfo.asp','wlan.asp'),
                                  new pageParentMap('wlanwpsinfo.asp','wlanwps.asp'),
                                  new pageParentMap('wlanacllist.asp','wlanrestrict.asp'),
								  new pageParentMap('pubinfo.asp','maintenance.asp'),
                                  new pageParentMap('wlanmacinfo.asp','wlanrestrict.asp'),
                                  new pageParentMap('firmware.asp','firmwarecontent.asp'),
                                  new pageParentMap('apnmng.asp','wan_settings.asp')
                                  );


function getParentPageInMap(currentPage) {
    for(var i = 0; i < pageParentMapList.length; i ++) {

        if(currentPage == pageParentMapList[i].currentPage) {
            return pageParentMapList[i].parentPage;
        }
    }

    return null;
}

function RssirefreshSub(){
	var hearbeatfile = "/html/main/refresh.asp";
	$.ajax({
		async : true,
		type : "GET",
		timeout : "3000",
		url : hearbeatfile,
		dataType : "html",
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			try {
				setTimeout("RssirefreshSub()", 8000);
				log.error("MAIN : textStatus" + textStatus);
			} catch (exception) {
				log.error(exception);
			}
		},
		success : function(data) {
				if(enableRefresh &&(!isIndexPage())&&(data.indexOf('E5172.Refresh.Time.Out') == -1))
				{
					window.location.replace("/");
				}
				setTimeout("RssirefreshSub()", 8000);
		}
	});
}


function setPageCookie(currentPage) {
    CookieUtil.set('curentPageName', currentPage);
}

function getPageCookie() {
    return CookieUtil.get('curentPageName');
}

var CookieUtil = {
	set: function (name, value, expires) {
		if (typeof encodeURIComponent == "undefined")
		{
			var cookieText = name + "=" + value;
		}
		else
		{
			var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
		}

		if (expires) {
			cookieText += "; expires= " + expires;
		}

		document.cookie = cookieText;
	},

	get: function(name){
		var value = document.cookie.match ( '(^|;) ?' + name + '=([^;]*)(;|$)' );
	    if (value)
	    {
	    	if (typeof decodeURIComponent == "undefined")
	    	{
	    		return value[2];
	    	}
	       	return decodeURIComponent(value[2]);
	    }
	    else
	    {
	       	return "";
	    }
	},

	unset: function(name){
	    var cval=this.get(name);
	    if(cval!=null)
	    {
	    	var exp = new Date();
	    	exp.setTime(exp.getTime() - 1);
			document.cookie= name + "="+cval+ ";expires="+exp.toUTCString();
	    }
	}
};

function clickLogout(){
    if(!confirm(menu_hint_logout))
    {
        return;
    }
    logoutcommit();
}

function logoutcommit()
{
    var form = new WebSubmitForm();
    form.setAction('/index/logout.cgi');
    form.submit();
}

function disableMenu()
{
	$("a").each(function(){
		$(this).click(function() {
			return false;
		});
	});
	$("#settings_menu").addClass("disableMenu");
	$("#main_menu").addClass("disable_main_menu");
	$(".help").addClass("cursor_default");
	$("#help_url").removeAttr("onclick").unbind("click");
	$get("language_sel").disabled=true;
}

function enableMenu()
{
	$("a").each(function(){
		$(this).unbind( "click" );

	});
	$("#settings_menu").removeClass("disableMenu");
	$(".help").removeClass("cursor_default");
	$("#main_menu").removeClass("disable_main_menu");	
	$("#help_url").bind("click",getHelp);
	$get("language_sel").disabled=false;
}


function changeSelLanguage()
{
	var date = new Date();
	date.setTime(date.getTime()+(365*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	var lantype = getSelectVal('language_sel');
	cookie = "Language="+lantype + expires + "; path=/";
	document.cookie = cookie;
	window.location.reload();
}

function initLanguage(langSelId)
{
	var optionStr='';
	var lang = newCookie('Language');
	for(var index = 0 ; index < languageArray.length; index ++)
	{
	if(true == isValidLanguage(lang) && lang == languageArray[index].value)
	{
		optionStr+='<option value="'+ languageArray[index].value +'" selected=true>'+ languageArray[index].display +		'</option>';
	}
	else
	{
		if('ar' == LANGUAGE_DATA.current_language)
		{
			optionStr+='<option value="'+ languageArray[index].value +'">'+ (typeof languageArray[index].ar_display == "undefined" ? languageArray[index].display : languageArray[index].ar_display) +'</option>';
		}
		else
		{
			optionStr+='<option value="'+ languageArray[index].value +'">'+ languageArray[index].display +'</option>';
		}
	}
	}
	$("#"+langSelId).append(optionStr);
}

function isValidLanguage(lang)
{
	for(var index = 0 ; index < languageArray.length; index ++)
	{
		if(lang == languageArray[index].value)
		{
			return true;
		}
	}
	return false;
}

function button_enable(button_id, enable) {
    var parent = $('#' + button_id);

    if (enable == '1') {
        parent.removeClass('disable_btn');

    }
    else if (enable == '0') {
        parent.addClass('disable_btn');

    }
}

function initHidePageLink()
{
    for(var i = 0; i < HidePageLinkArr.length; i ++)
    {
        setHidePageData(i);
    }
}

function setHideMenuItem(i, value)
{
    var menuId = getMenuIdByPageName(HidePageLinkArr[i].pageName);

    if((value == HidePageLinkArr[i].value)
        && (null != menuId)
    )
    {
        eval(menuId).visibility = false;
    }
}

function setHidePageData(i)
{
    if(('' == HidePageLinkArr[i].getUrl) || (null == HidePageLinkArr[i].getUrl)){
        return;
    }

	$.ajax({
		async : false,
		type : "GET",
		timeout : "3000",
		url : HidePageLinkArr[i].getUrl,
		dataType : "html",
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			try {
				//setTimeout("RssirefreshSub()", 8000);
				log.error("MAIN : textStatus" + textStatus);
			} catch (exception) {
				log.error(exception);
			}
		},
		success : function(data) {
				setHideMenuItem(i,data);
		}
	});
}

function getHelp()
{
	LANGUAGE_DATA.current_language = newCookie("Language");
	if(false == isValidLanguage(LANGUAGE_DATA.current_language))
	{
		LANGUAGE_DATA.current_language = null;
	}
	LANGUAGE_DATA.current_language = LANGUAGE_DATA.current_language == null ? languageArray[0].value
			: LANGUAGE_DATA.current_language.replace(/-/, "_");
	
	window.location.replace('/onlinehelp/help_'+LANGUAGE_DATA.current_language+'.pdf');
}



/*---------------------------------*/

AdminMenuName = new Array('overview.asp','systeminfo.asp','firmwarecontent.asp','wan_settings.asp','apnmng.asp','pin.asp','wanmtu.asp','sim_lock.asp','dhcp.asp','staticroute.asp','dynamicroute.asp','wlan.asp','wlanrestrict.asp','wlanwps.asp','wlanprofile.asp','wlanadvance.asp','wlanwds.asp','firewall.asp','macfilter.asp','urlfilter.asp','ipfilter.asp','acl.asp','alg.asp','portmapping.asp','upnp.asp','dmz.asp','ddns.asp','message.asp','messagesettings.asp','maintenance.asp','account.asp','sntp.asp','diagnose.asp','logcfg.asp','notify.asp');
AdminMenuId = new Array('Admin_0_0_0','Admin_0_0_1','Admin_0_0_2','Admin_0_1_0','Admin_0_1_1','Admin_0_1_2','Admin_0_1_3','Admin_0_1_4','Admin_0_2_0','Admin_0_2_1','Admin_0_2_2','Admin_0_3_0','Admin_0_3_1','Admin_0_3_2','Admin_0_3_3','Admin_0_3_4','Admin_0_3_5','Admin_0_4_0','Admin_0_4_1','Admin_0_4_2','Admin_0_4_3','Admin_0_4_4','Admin_0_4_5','Admin_0_4_6','Admin_0_4_7','Admin_0_4_8','Admin_0_5_0','Admin_0_5_1','Admin_0_5_2','Admin_0_6_0','Admin_0_6_1','Admin_0_6_2','Admin_0_6_3','Admin_0_6_4','Admin_0_6_5');
UserMenuName = new Array('overview.asp','systeminfo.asp');
UserMenuId = new Array('User_0_0_0','User_0_0_1');
WebpMenuName = new Array('deviceinfo.asp','tr069.asp','reset.asp','cfgfile.asp','firmware.asp','mcast.asp','webpaccount.asp','webppage.asp','findpasswd.asp','wizard.asp','help_content.html');
WebpMenuId = new Array('Webp_0_0_0','Webp_0_1_0','Webp_0_2_0','Webp_0_2_1','Webp_0_2_2','Webp_0_2_3','Webp_0_3_0','Webp_0_3_1','Webp_0_4_0','Webp_1_0_0','Webp_2_0_0');