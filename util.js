var time;
/*adjust data type*/
function isTelNumber(number)
{
    var patrn=/^[+]{0,1}[0-9,*,#]{1,32}$/;
    if (!patrn.exec(number))
    {
      return false;
    }

    return true;
}


function isNumber(number)
{
    var patrn=/^[0-9]{1,32}$/;
    if(!patrn.exec(number))
    {
        return false;
    }
    return true;
}

function isInternalNumber(number)
{
    var patrn=/^[0-9,*,#]{1,32}$/;
    if (!patrn.exec(number))
    {
      return false;
    }
    return true;
}

function isFunctionalCode(number)
{
    var funCode = new Array("09","*91#","#91#","*92#","#92#");
    var len = funCode.length;
    var i = 0;
    for(i = 0; i < len; i++)
    {
        if(number == funCode[i])
        {
            return false;
        }
    }
    return true;
}
function isAuthUserName(name)
{
    var patrn=/["]{1,128}/;
    if (!patrn.exec(name))
    {
        return true;
    }
    return false;
}

function isDigitMap(digitmap)
{
    var patrn=/^[A-D,a-d,0-9,\*,#,X,x,\|,T,t,\.,\-,\],\[]{1,128}$/;
    if(!patrn.exec(digitmap))
    {
        return false;
    }
    return true;
}

function isValidAscii(val)
{
    for ( var i = 0 ; i < val.length ; i++ )
    {
        var ch = val.charAt(i);
        if ( ch < ' ' || ch > '~' )
        {
            return ch;
        }
    }
    return '';
}

function isValidCfgStr(cfgName, val, len)
{
    if (isValidAscii(val) != '')
    {
        //alert(cfgName + ' has invalid character "' + isValidAscii(val) + '".')
        return false;
    }
   if (val.length > len)
   {
       //alert(cfgName + ' cannot exceed ' + len  + ' characters.');
       return false;
   }
   return true;
}

function isHexaDigit(digit) {
   var hexVals = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                           "A", "B", "C", "D", "E", "F", "a", "b", "c", "d", "e", "f");
   var len = hexVals.length;
   var i = 0;
   var ret = false;

   for ( i = 0; i < len; i++ ) {
      if ( digit == hexVals[i] ) {
        break;
      }
   }

   if ( i < len )
      ret = true;

   return ret;
}

function isSafeStringExc(compareStr, UnsafeStr)
{
    for (var i = 0; i < compareStr.length; i++)
    {
        var c = compareStr.charAt(i);
        if (isValidAscii(c) != '')
        {
             return false;
        }
        else
        {
            if (UnsafeStr.indexOf(c) > -1)
            {
                return false;
            }
        }
    }
    return true;
}

function isSafeStringIn(compareStr, UnsafeStr)
{
    for (var i = 0; i < compareStr.length; i++)
    {
        var c = compareStr.charAt(i);
        if (isValidAscii(c) != '')
        {
             return false;
        }
        else
        {
            if (UnsafeStr.indexOf(c) == -1)
            {
                return false;
            }
        }
    }
    return true;
}

// Check if a name valid
function isValidName(name)
{
   //return isSafeStringExc(name,'!"~<>;{}|%*\\^[]`+$,=\'#&: \t');
   return isSafeStringExc(name,'\\');
}

//a valid string do not contain '"' and each char is validAscII
function isValidString(name)
{
    if (isValidAscii(name) == '')
    {
        return true;
    }
    else
    {
        return false;
    }
}

function isInteger(value)
{
    if (/^(\+|-)?\d+$/.test(value))
    {
       return true;
    }
    else
    {
        return false;
    }
}

function isPlusInteger(value)
{
    if (isInteger(value) && parseInt(value, 10) >= 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function isPlusInterRange(vaule,start,end)
{
    if (false == isPlusInteger(vaule))
    {
        return false;
    }
    else
    {
        if(vaule < start || vaule > end)
        {
            return false;
        }
    }

    return true;
}

function isFloat(value)
{
    if (/^(\+|-)?\d+($|\.\d+$)/.test(value))
    {
       return true;
    }
    else
    {
       return false;
    }
}

function isValidCfgInteger(cfgName, val, start, end)
{
       if (isInteger(val) == false)
       {
           //alert(cfgName + ' is invalid, it must be digist.');
           return false;
       }
       var temp = parseInt(val, 10);
       if (temp < start || temp > end)
       {
           //alert(cfgName + ' must be greater than ' + start.toString()
                // + ' and less than ' + end.toString() + '.');
           return false;
       }
    return true;
}

/*adjust the data of network format*/
function isValidIpAddress(address) {
   var i = 0;

    if ( address == '0.0.0.0' ||
            address == '255.255.255.255' )
    {
        return false;
    }

    var addrParts = address.split('.');
    if ( addrParts.length != 4 )
    {
        return false;
    }
   for (i = 0; i < 4; i++) {
      if (isNaN(addrParts[i]) || addrParts[i] ==""
          || addrParts[i].charAt(0) == '+' ||  addrParts[i].charAt(0) == '-'
          || (addrParts[i].charAt(0) == '0' && addrParts[i].length > 1))
        {
            return false;
        }
      if (addrParts[i].length > 3 || addrParts[i].length < 1)
      {
          return false;
      }
      if (!isInteger(addrParts[i]) || addrParts[i] < 0)
      {
          return false;
      }
      num = parseInt(addrParts[i], 10);
      if (i == 0 && num == 0)
      {
          return false;
      }
        if ( num < 0 || num > 255 )
        {
            return false;
        }
   }
   return true;
}

function isValidMaskAddress(address) {
   var i = 0;

   if ( address == '0.0.0.0' )
   {
       return false;
   }

   var addrParts = address.split('.');
    if ( addrParts.length != 4 )
    {
        return false;
    }
   for (i = 0; i < 4; i++) {
      if (isNaN(addrParts[i]) || addrParts[i] ==""
          || addrParts[i].charAt(0) == '+' ||  addrParts[i].charAt(0) == '-'
          || (addrParts[i].charAt(0) == '0' && addrParts[i].length > 1))
         return false;
      if (addrParts[i].length > 3 || addrParts[i].length < 1)
      {
          return false;
      }
      if (!isInteger(addrParts[i]) || addrParts[i] < 0)
      {
          return false;
      }
      num = parseInt(addrParts[i], 10);
      if (i == 0 && num == 0)
      {
          return false;
      }
        if ( num < 0 || num > 255 )
        {
            return false;
        }
   }
   return true;
}

function isBroadcastIp(ipAddress, subnetMask)
{
     var maskLenNum = 0;
     tmpMask = subnetMask.split('.');
     tmpIp = ipAddress.split('.');

     if((parseInt(tmpIp[0], 10) > 223) || ( 127 == parseInt(tmpIp[0], 10)))
     {
         return true;
     }

     for(maskLenNum = 0; maskLenNum < 4; maskLenNum++)
     {
         if(parseInt(tmpMask[maskLenNum], 10) < 255)
            break;
     }

     tmpNum0 = parseInt(tmpIp[maskLenNum], 10);
     tmpNum1 = 255 - parseInt(tmpMask[maskLenNum], 10);
     tmpNum2 = tmpNum0 & tmpNum1;
     if((tmpNum2 != 0) && (tmpNum2 != tmpNum1))
     {
         return false;
     }

     if(maskLenNum == 3)//subnet mask last not is 255: 255.255.255.xxx
     {
         return true;
     }
     else if(maskLenNum == 2)//255.255.xxx.xxx
     {
         if(((tmpIp[3] == 0)&&(tmpNum2 == 0))||
             ((tmpIp[3] == 255)&&(tmpNum2 == tmpNum1)))
         {
             return true;
         }
     }
     else if(maskLenNum == 1)//255.xxx.xxx.xxx
     {
         if(((tmpNum2 == 0)&&(tmpIp[3] == 0)&&(tmpIp[2] == 0)) ||
             ((tmpNum2 == tmpNum1)&&(tmpIp[3] == 255)&&(tmpIp[2] == 255)))
         {
             return true;
         }
     }
     else if(maskLenNum == 0)//xxx.xxx.xxx.xxx
     {
         if(((tmpNum2 == 0)&&(tmpIp[3] == 0)&&(tmpIp[2] == 0)&&(tmpIp[1] == 0)) ||
             ((tmpNum2 == tmpNum1)&&(tmpIp[3] == 255)&&(tmpIp[2] == 255) &&(tmpIp[1] == 255)))
         {
             return true;
         }
     }

     return false;

}

function isHostIpAddress(Ip, Mask)
{
    var addr = ipAddress2DecNum(Ip);
    var mask = ipAddress2DecNum(Mask);
    if ((0 == (addr & (~mask))) || ((~mask) == (addr & (~mask))) )
    {
        return false;
    }
    return true;
}

function isAbcIpAddress(address)
{
    if (isValidIpAddress(address) == false)
    {
        return false;
    }

    var addrParts = address.split('.');
    var num = 0;

    num = parseInt(addrParts[0], 10);
    if (num < 1 || num >= 224 || num == 127)
    {
        return false;
    }
    num = parseInt(addrParts[3], 10);
    if (num == 255)
    {
        return false;
    }

    return true;
}

function isHostIpWithSubnetMask(address, subnet)
{
    if (isAbcIpAddress(address) == false)
    {
        return false;
    }

    if (isValidSubnetMask(subnet) == false)
    {
        return false;
    }

    var addr = ipAddress2DecNum(address);

    var mask = ipAddress2DecNum(subnet);

    /* net section Ip */
    if (0 == (addr & (~mask)))
    {
        return false;
    }

    /* broadcast Ip */
    if (isBroadcastIp(address,subnet) == true)
    {
       return false;
    }

    return true;
}

function isDeIpAddress(address)
{
    if (isValidIpAddress(address) == false)
    {
        return false;
    }

    var num = 0;
    var addrParts = address.split('.');
    if (addrParts.length != 4)
    {
        return false;
    }

    if (!isInteger(addrParts[0]) || addrParts[0] < 0 )
    {
        return false;
    }
    num = parseInt(addrParts[0], 10);
    if (!(num >= 224 && num <= 247))
    {
        return false;
    }

    for (var i = 1; i <= 3; i++)
    {
        if (!isInteger(addrParts[i]) || addrParts[i] < 0)
        {
            return false;
        }
        num = parseInt(addrParts[i], 10);
        if (!(num >= 0 && num <= 255))
        {
            return false;
        }
    }

    return true;
}

function isBroadcastIpAddress(address)
{
    if (isValidIpAddress(address) == false)
    {
        return false;
    }

    var addrParts = address.split('.');
    if (addrParts[3] == '255')
    {
        return true;
    }
    return false;
}

function isLoopIpAddress(address)
{
    if (isValidIpAddress(address) == false)
    {
        return false;
    }

    var addrParts = address.split('.');
    if (addrParts[0] == '127')
    {
        return true;
    }
    return false;
}

function ParseIpv6Array(str)
{
    var Num;
    var i,j;
    var finalAddrArray = new Array();
    var falseAddrArray = new Array();

    var addrArray = str.split(':');
    Num = addrArray.length;
    if (Num > 8)
    {
        return falseAddrArray;
    }

    for (i = 0; i < Num; i++)
    {
        if ((addrArray[i].length > 4)
            || (addrArray[i].length < 1))
        {
            return falseAddrArray;
        }
        for (j = 0; j < addrArray[i].length; j++)
        {
            if ((addrArray[i].charAt(j) < '0')
                || (addrArray[i].charAt(j) > 'f')
                || ((addrArray[i].charAt(j) > '9') &&
                (addrArray[i].charAt(j) < 'a')))
            {
                return falseAddrArray;
            }
        }

        finalAddrArray[i] = '';
        for (j = 0; j < (4 - addrArray[i].length); j++)
        {
            finalAddrArray[i] += '0';
        }
        finalAddrArray[i] += addrArray[i];
    }

    return finalAddrArray;
}

function getFullIpv6Address(address)
{
    var c = '';
    var i = 0, j = 0, k = 0, n = 0;
    var startAddress = new Array();
    var endAddress = new Array();
    var finalAddress = '';
    var startNum = 0;
    var endNum = 0;
    var lowerAddress;
    var totalNum = 0;

    lowerAddress = address.toLowerCase();

    var addrParts = lowerAddress.split('::');
    if (addrParts.length == 2)
    {
        if (addrParts[0] != '')
        {
            startAddress = ParseIpv6Array(addrParts[0]);
            if (startAddress.length == 0)
            {
                return '';
            }
        }
        if (addrParts[1] != '')
        {
            endAddress = ParseIpv6Array(addrParts[1]);
            if (endAddress.length == 0)
            {
               return '';
            }
        }

        if (startAddress.length +  endAddress.length >= 8)
        {
            return '';
        }
    }
    else if (addrParts.length == 1)
    {
        startAddress = ParseIpv6Array(addrParts[0]);
        if (startAddress.length != 8)
        {
            return '';
        }
    }
    else
    {
        return '';
    }

    for (i = 0; i < startAddress.length; i++)
    {
        finalAddress += startAddress[i];
        if (i != 7)
        {
            finalAddress += ':';
        }
    }
    for (; i < 8 - endAddress.length; i++)
    {
        finalAddress += '0000';
        if (i != 7)
        {
            finalAddress += ':';
        }
    }
    for (; i < 8; i++)
    {
        finalAddress += endAddress[i - (8 - endAddress.length)];
        if (i != 7)
        {
            finalAddress += ':';
        }
    }

    return finalAddress;

}

function isIpv6Address(address)
{
    if (getFullIpv6Address(address) == '')
    {
        return false;
    }

    return true;
}

function isUnicastIpv6Address(address)
{
    var tempAddress = getFullIpv6Address(address);

    if ((tempAddress == '')
        || (tempAddress == '0000:0000:0000:0000:0000:0000:0000:0000')
        || (tempAddress == '0000:0000:0000:0000:0000:0000:0000:0001')
        || (tempAddress.substring(0, 2) == 'ff'))
    {
        return false;
    }

    return true;
}

function isGlobalIpv6Address(address)
{
    var tempAddress = getFullIpv6Address(address);

    if ((tempAddress == '')
        || (tempAddress == '0000:0000:0000:0000:0000:0000:0000:0000')
        || (tempAddress == '0000:0000:0000:0000:0000:0000:0000:0001')
        || (tempAddress.substring(0, 3) == 'fe8')
        || (tempAddress.substring(0, 3) == 'fe9')
        || (tempAddress.substring(0, 3) == 'fea')
        || (tempAddress.substring(0, 3) == 'feb')
        || (tempAddress.substring(0, 2) == 'ff'))
    {
        return false;
    }

    return true;
}

function isStartLessthanEndForIpv6Addr(start, end)
{
    var i = 0;
    var startIP = getFullIpv6Address(start);
    var endIP = getFullIpv6Address(end);
    if ((startIP != '') && (endIP != ''))
    {
        var arrayStart = startIP.split(':');
        var arrayEnd = endIP.split(':');
        for (i = 0; i < 8; i++)
        {
            if (parseInt(arrayStart[i], 16) > parseInt(arrayEnd[i], 16) )
            {
                return false;
            }
            else if(parseInt(arrayStart[i], 16) < parseInt(arrayEnd[i], 16) )
            {
                return true;
            }
        }
    }
    return true;
}

function parseHex(hexStr, base)
{
    var i = 0;
    x = 0;

    for (i = 0; i < hexStr.length; i++)
    {
        if (('0' <= hexStr.charAt(i)) && ('9' >= hexStr.charAt(i)))
        {
            x = x * base + (hexStr.charAt(i) - '0');
        }
        else if ((16 == base) && ('a' <=hexStr.charAt(i)) && ('f' >=hexStr.charAt(i)))
        {
            x = x * base + (hexStr.charAt(i) - 'a');
        }
        else if ((16 == base) && ('A' <= hexStr.charAt(i)) && ('F' >= hexStr.charAt(i)))
        {
            x = x * base + (hexStr.charAt(i) - 'A');
        }
        else
        {
            //alert("error format...please check the format of the [" + hexStr +']');
            return (-1);
        }
    }
    return x;
}



function CompareTwoAddress(addr1, plen1, addr2, plen2)
{
    var x = 0;
    var j = 0;
    var i = 0;

    var addr1Tmp = getFullIpv6Address(addr1);
    var addr2Tmp = getFullIpv6Address(addr2);

    if ((addr1Tmp == '') || (addr2Tmp == ''))
    {
        return false;
    }


    var addr1Comp = addr1Tmp.split(':');
    var addr2Comp = addr2Tmp.split(':');

    //alert('addr1: ' + addr1Comp + ' plen1: ' + plen1
    //    + ' addr2: ' + addr2Comp + ' plen2: ' + plen2);

    if (plen1 != plen2)
    {
        return false;
    }

    x = (plen1 / 16);

    for (i = 0; i < 8; i++)
    {
        if ((i <= x) && ((i + 1) >= x))
        {
            x = i;
            break;
        }
    }


    for (i = 0; i < x; i++)
    {
        if (addr1Comp[i] != addr2Comp[i])
        {
            return false;
        }
    }

    j = plen1 % 16;
    if (0 == j)
    {
        return true;
    }

    //alert('addr ' + x + ' ' + addr1Comp[x] + ' ' + addr2Comp[x] + ' j ' + j);


    x1 = parseHex(addr1Comp[x], 16);
    x2 = parseHex(addr2Comp[x], 16);

    if ((x1 ^ x2) >= (1 << (16 - j)))
    {
        return false;
    }

    return true;
}


function getLeftMostZeroBitPos(num)
{
   var i = 0;
   var numArr = [128, 64, 32, 16, 8, 4, 2, 1];

   for ( i = 0; i < numArr.length; i++ ) {
      if ( (num & numArr[i]) == 0 ) {
        return i;
      }
    }
   return numArr.length;
}
function getRightMostOneBitPos(num) {
   var i = 0;
   var numArr = [1, 2, 4, 8, 16, 32, 64, 128];

   for ( i = 0; i < numArr.length; i++ ) {
      if ( ((num & numArr[i]) >> i) == 1 ) {
        return (numArr.length - i - 1);
      }

    }

   return -1;
}
function isValidSubnetMask(mask) {
   var i = 0, num = 0;
   var zeroBitPos = 0, oneBitPos = 0;
   var zeroBitExisted = false;

   if ( mask == '0.0.0.0' ) {
        return false;
   }


   var maskParts = mask.split('.');
   if ( maskParts.length != 4 ) {
     return false;
   }

   for (i = 0; i < 4; i++) {

      if ( isNaN(maskParts[i]) == true || maskParts[i] == ""
          || maskParts[i].charAt(0) == '+' ||  maskParts[i].charAt(0) == '-'
          || (maskParts[i].charAt(0) == '0'
            && maskParts[i].length > 1)) {
         return false;
      }

      if (!isInteger(maskParts[i]) || maskParts[i] < 0) {
          return false;
      }
      num = parseInt(maskParts[i],10);
      if ( num < 0 || num > 255 ) {
         return false;
      }
      if ( zeroBitExisted == true && num != 0 )
      {
        return false;
      }

      zeroBitPos = getLeftMostZeroBitPos(num);
      oneBitPos = getRightMostOneBitPos(num);
      if ( zeroBitPos < oneBitPos ) {
        return false;
      }

      if ( zeroBitPos < 8 ) {
         zeroBitExisted = true;
      }

   }

   return true;
}

function isValidPort(port)
{
   if (!isInteger(port) || port < 1 || port > 65535)
   {
       return false;
   }

   return true;
}


function isValidPortPair(StartPort,EndPort)
{
   if (!isValidPort(StartPort) || !isValidPort(EndPort))
   {
       return false;
   }

   if (parseInt(StartPort,10) > parseInt(EndPort,10) )
   {
        return false;
    }

   return true;
}

function isValidMacAddress(address)
{
   var c = '';
   var i = 0, j = 0;

   if ( address.toLowerCase() == 'ff:ff:ff:ff:ff:ff' )
   {
       return false;
   }

   addrParts = address.split(':');
   if ( addrParts.length != 6 ) return false;

   for (i = 0; i < 6; i++) {
      if ( addrParts[i] == '' )
         return false;

      if ( addrParts[i].length != 2)
      {
        return false;
      }

      if ( addrParts[i].length != 2)
      {
         return false;
      }

      for ( j = 0; j < addrParts[i].length; j++ ) {
         c = addrParts[i].toLowerCase().charAt(j);
         if ( (c >= '0' && c <= '9') ||
              (c >= 'a' && c <= 'f') )
            continue;
         else
            return false;
      }
   }

   return true;
}

function isNtwkSgmtIpAddress(address)
{
    if (isValidIpAddress(address) == false)
    {
        return false;
    }

    var addrParts = address.split('.');
    if (addrParts[3] == '0')
    {
        return true;
    }
    return false;
}

function isSameSubNet(Ip1, Mask1, Ip2, Mask2)
{
   var count = 0;
   //debug('isSameSubNet');
   lan1a = Ip1.split('.');
   lan1m = Mask1.split('.');
   lan2a = Ip2.split('.');
   lan2m = Mask2.split('.');

   for (i = 0; i < 4; i++)
   {
      l1a_n = parseInt(lan1a[i],10);
      l1m_n = parseInt(lan1m[i],10);
      l2a_n = parseInt(lan2a[i],10);
      l2m_n = parseInt(lan2m[i],10);
      if ((l1a_n & l1m_n) == (l2a_n & l2m_n)) {
          count++;
      }
   }
   if (count == 4) {
       return true;
   } else{
       return false;
   }
}


function ipAddress2DecNum(address)
{
    if (isValidIpAddress(address) == false)
    {
        return -1;
    }
    var addrParts = address.split('.');
    var num = 0;
    for (i = 0; i < 4; i++) {
        num += parseInt(addrParts[i], 10) * Math.pow(256, 3 - i);
    }
    return num;
}

function isBlankCtrVal(val)
{
    if( val == '')
    {
        return false;
    }
    else
    {
        return true;
    }
}
//web Element
/*get element by name or id*/
function getElById(sId)
{
    return getElement(sId);
}

function getElementById(sId)
{
    if (document.getElementById)
    {
        return document.getElementById(sId);
    }
    else if (document.all)
    {
        // old IE
        return document.all(sId);
    }
    else if (document.layers)
    {
        // Netscape 4
        return document.layers[sId];
    }
    else
    {
        return null;
    }
}

/*getElByName*/
function getElementByName(sId)
{    // standard
    if (document.getElementsByName)
    {
        var element = document.getElementsByName(sId);

        if (element.length == 0)
        {
            return null;
        }
        else if (element.length == 1)
        {
            return     element[0];
        }

        return element;
    }
}

function getElement(sId)
{
     var ele = getElementByName(sId);
     if (ele == null)
     {
         return getElementById(sId);
     }
     return ele;
}

function getOptionIndex(sId,sValue)
{
    var selObj = getElement(sId);
    if (selObj == null)
    {
        return -1;
    }

    for (i = 0; i < selObj.length; i++)
    {
        if (selObj.options[i].value == sValue)
        {
            return i;
        }
    }

    return -1;
}

/*----------------getLength-----------------*/
function getValue(sId)
{
    var item;
    if (null == (item = getElement(sId)))
    {
        debug(sId + " is not existed" );
        return -1;
    }

    return item.value;
}
function getValueDft(sId)
{
    var type;
    if (-1 == (type = getType(sId)))
    {
        return -1;
    }
    else if (type == 'text' || type == 'TEXT')
    {
        return getValue(sId);
    }
    else if (type == 'radio' || type == 'RADIO')
    {
        return getRadioVal(sId);
    }
    else if (type == 'checkbox' || type == 'CHECKBOX')
    {
        return getCheckVal(sId);
    }
    else
    {
        return getValue(sId);
    }

}
function getType(sId)
{
    var item;
    if (null == (item = getElement(sId)))
    {
        debug(sId + "is not existed");
        return -1;
    }
    if (item.length > 1)
    {
        return item[0].type;
    }

    return item.type;

}
/* Web page manipulation functions */
function setDisplay (sId, sh)
{
    var status;
    if (sh > 0)
    {
        $("#"+sId).show();
    }
    else
    {
         $("#"+sId).hide();
    }
}

function setVisible(sId, sh)
{
    var status;
    if (sh > 0)
    {
        status = "visible";
    }
    else
    {
        status = "hidden";
    }

    getElement(sId).style.visibility = status;
}

function setSelect(sId, sValue)
{
    var item;
    if (null == (item = getElement(sId)))
    {
        debug(sId + " is not existed" );
        return false;
    }

    for (var i = 0; i < item.options.length; i++)
    {
        if (item.options[i].value == sValue)
        {

            item.options[i].selected =true;
            return true;
        }
    }

    debug("the option which value is " + sValue + " is not existed in " + sId);
    return false;
}

function setText (sId, sValue)
{
    var item;
    if (null == (item = getElement(sId)))
    {
        debug(sId + " is not existed" );
        return false;
    }

    item.value = sValue;
    return true;
}


function setCheck(sId, value)
{
    var item;
    if (null == (item = getElement(sId)))
    {
        debug(sId + " is not existed" );
        return false;
    }

    if ( value == '1' )
    {
       item.checked = true;
    }
    else
    {
       item.checked = false;
    }

    return true;
}

function setRadio(sId, sValue)
{
    var item;
    if (null == (item = getElement(sId)))
    {
        debug(sId + " is not existed" );
        return false;
    }

    for (i=0; i<item.length; i++)
    {
        if (item[i].value == sValue)
        {
            item[i].checked = true;
            return true;
        }
    }

    debug("the option which value is " + sValue + " is not existed in " + sId);
    return false;
}

function setRadioEx(sId, sValue)
{
    var item=document.getElementsByName(sId);
    if (null == item)
    {
        debug(sId + " is not existed" );
        return false;
    }

    for (i=0; i<item.length; i++)
    {
        if (item[i].value == sValue)
        {
            item[i].checked = true;
            return true;
        }
    }

    debug("the option which value is " + sValue + " is not existed in " + sId);
    return false;
}

function setValueDft(sId, sValue)
{
    var type;
    if (-1 == (type = getType(sId)))
    {
        return -1;
    }
    else if (type == 'text' || type == 'TEXT')
    {
        setText (sId, sValue);
        return 0;
    }
    else if (type == 'radio' || type == 'RADIO')
    {
        setRadio(sId, sValue);
        return 0;
    }
    else if (type == 'checkbox' || type == 'CHECKBOX')
    {
        setCheck(sId, sValue);
        return 0;
    }
    else
    {
        setSelect(sId, sValue);
        return 0;
    }
}
function setDisable(sId, flag)
{
    var item;
    if (null == (item = getElement(sId)))
    {
        debug(sId + " is not existed" );
        return false;
    }

    if ( flag == 1 || flag == '1' )
    {
         item.disabled = true;
    }
    else
    {
         item.disabled = false;
    }

    return true;
}

function getCheckVal(sId)
{
    var item;
    if (null == (item = getElement(sId)))
    {
        debug(sId + " is not existed" );
        return -1;
    }
    if (item.checked == true)
    {
        return 1;
    }

    else
    {
        return 0;
    }
}

function getRadioVal(sId)
{
    var item;
    if (null == (item = getElement(sId)))
    {
        debug(sId + " is not existed" );
        return -1;
    }
//    debug(item.children[0])

    for (i = 0; i < item.length; i++)
    {
        if (item[i].checked == true)
        {
           return item[i].value;
        }
    }

    return -1;
}

function getRadioValEx(sId)
{
    var item=document.getElementsByName(sId);
    if (null == item)
    {
        debug(sId + " is not existed" );
        return -1;
    }

    for (i = 0; i < item.length; i++)
    {
        if (item[i].checked == true)
        {
           return item[i].value;
        }
    }

    return -1;
}

function getSelectVal(sId)
{
   return getValue(sId);
}




/*-----select------*/
function addOption(sId,OptionName,OptionValue,OptionText)
{
    var Param = document.createElement("option");
    Param.setAttribute('name',OptionName);
    Param.setAttribute('value',OptionValue);
    Param.innerHTML = OptionText;

    var selItem;
    if ((selItem = getElement(sId)) != null)
    {
        selItem.appendChild(Param);
        return Param;
    }
    else
    {
        debug(sId + " is not existed" );
        return null;
    }
}

function removeOption(sId,sValue)
{
    var selItem;
    if ((selItem = getElement(sId)) != null)
    {
        var index = getOptionIndex(sId,sValue);
        if (index >= 0)
        {

            selItem.removeChild(selItem.options[index]);
            return true;
        }
        else
        {
            debug("the option which value is " + sValue + " is not existed" );
            return false;
        }
    }

    debug(sId + " is not existed" );
    return false;
}

function removeAllOption(sId)
{
    var selItem;
    if ((selItem = getElement(sId)) != null)
    {
        selItem.length = 0;
        return true;
    }

    debug(sId + " is not existed" );
    return false;
}

function MakeCheckBoxValue(srcForm)
{
    var Inputs = srcForm.getElementsByTagName("input");
    for (var i = 0; i < Inputs.length; i++)
    {
        if (Inputs[i].type == "checkbox")
        {
            var CheckBox = getElement(Inputs[i].name);
//debug(Inputs[i].name)
            if (CheckBox.checked == true)
            {
                CheckBox.value = 1;
            }
            else
            {
                CheckBox.value = 0;
            }
        }
        else if (Inputs[i].type == "radio")
        {
            var radio = getElement(Inputs[i].name);
            for (k = 0; k < radio.length; k++)
            {
                if (radio[k].checked == false)
                {
                    radio[k].disabled = true;
                }
            }
        }
    }
}

function enableAllInput()
{
	$("input").removeAttr("disabled");
	$("select").removeAttr("disabled");
}


function diableAllInput()
{
	$("input").attr("disabled","disable");
	$("select").attr("disabled","disable");
}

function disableAllButtons()
{
	$(".button_wrapper").addClass("disable_btn");
	$(".button_wrapper").unbind("click");
	diableAllInput();
}


function Submit(type)
{
    ClearErro();
    var temp = CheckForm(type);
    if ( false != temp)
    {
        var Form = new WebSubmitForm();
        AddSubmitParam(Form,type);		
        Form.submit();
		disableAllButtons();
    }
}

function setLineCancelHighLight() {
	if (previousTR != null) {
		var idStr = previousTR.id;
		if (idStr.indexOf('null') >= 0) {
			previousTR.style.display = "none";
		}

		previousTR.style.backgroundColor = '#f4f4f4';
		for ( var i = 0; i < previousTR.cells.length; i++) {
			previousTR.cells[i].style.color = '#000000';
		}
	}
}

var previousTR = null;
function setLineHighLight(objTR) {
	var i = 0;

	if (previousTR != null) {
		var idStr = previousTR.id;
		if (idStr.indexOf('null') >= 0) {
			previousTR.style.display = "none";
		}
		previousTR.style.backgroundColor = '#f4f4f4';
		for (i = 0; i < previousTR.cells.length; i++) {
			previousTR.cells[i].style.color = '#000000';
		}
	}

	objTR.style.backgroundColor = '#A7A7A7';

	var idTRStr = objTR.id;

	if (idTRStr.indexOf('null') >= 0) {
		objTR.style.display = "";
	}

	for (i = 0; i < objTR.cells.length; i++) {
		objTR.cells[i].style.color = '#000000';
	}
	previousTR = objTR;
}

function clickAdd(tabTitle) {
	var tab = document.getElementById(tabTitle).getElementsByTagName('table');

	var row, col;
	var rowLen = tab[0].rows.length;
	var firstRow = tab[0].rows[0];
	var lastRow = tab[0].rows[rowLen - 1];

	var temp = 'record_null' + '_' + tabTitle;

	if (lastRow.id == temp) {
		selectLine(temp);
		return;
	}

	row = tab[0].insertRow(rowLen);

	var appName = navigator.appName;
	if (appName == 'Microsoft Internet Explorer') {
		g_browserVersion = 1; /* IE */
		row.className = 'trTabContent';
		row.id = temp;
		// row.attachEvent("onclick", function(){selectLine(temp);});
	} else {
		g_browserVersion = 2; /* firefox */
		row.setAttribute('class', 'trTabContent');
		row.setAttribute('id', temp);
		// row.setAttribute('onclick','selectLine(this.id);');
	}

	for ( var i = 0; i < firstRow.cells.length; i++) {
		col = row.insertCell(i);
		col.innerHTML = '----';
	}
	selectLine(temp);
}


function selectLine(id) {
	var objTR = getElement(id);

	if (objTR != null) {
		setLineHighLight(objTR);
		var temp = objTR.id.split('_')[1];
		var tempid = id.split('_')[0];
		if (temp == 'null') {
			setControl(-1);
		} else {
			var index = parseInt(temp, 10);
			setControl(index, tempid);

			ClearErro();
		}
	}
	return false;
}


/////////////////////////////////////////////////////
// Load / submit functions
function WebSubmitForm(sFormName, DomainNamePrefix) {
    /*-----------------------internal method------------------------*/
    this.setPrefix = function(Prefix) {
        if (Prefix == null) {
            this.DomainNamePrefix = '.';
        } else {
            this.DomainNamePrefix = Prefix + '.';
        }
    };

    this.getDomainName = function(sName){
        if (this.DomainNamePrefix == '.') {
            return sName;
        } else {
            return this.DomainNamePrefix + sName;
        }
    };

    this.getNewSubmitForm = function() {
        var submitForm = document.createElement("FORM");
        document.body.appendChild(submitForm);
        submitForm.method = "POST";
        return submitForm;
    };

    this.createNewFormElement = function (elementName, elementValue){
        var newElement = document.createElement('INPUT');
        newElement.setAttribute('name',elementName);
        newElement.setAttribute('value',elementValue);
        newElement.setAttribute('type','hidden');
        return newElement;
    };

    /*---------------------------external method----------------------------*/
    this.addForm = function(sFormName,DomainNamePrefix){
        this.setPrefix(DomainNamePrefix);
        var srcForm = getElement(sFormName);
        if (srcForm != null && srcForm.length > 0 && this.oForm != null
                && srcForm.style.display != 'none') {
            MakeCheckBoxValue(srcForm);

            for(i=0; i < srcForm.elements.length; i++) {
                var type = srcForm.elements[i].type;
                if (type != 'button' && srcForm.elements[i].disabled == false) {
                    var ele = null;
                    if (this.DomainNamePrefix != '.') {
                        ele = this.createNewFormElement(this.DomainNamePrefix
                                + srcForm.elements[i].name,
                                srcForm.elements[i].value);
                        this.oForm.appendChild(ele);
                    } else {
                        ele = this.createNewFormElement(srcForm.elements[i].name,
                                srcForm.elements[i].value
                        );
                        this.oForm.appendChild(ele);
                    }
                }
            }
        } else {
            this.status = false;
        }

        this.DomainNamePrefix = '.';
    };

    this.addDiv = function(sDivName,pre) {
        var prefix = pre;
        // this.setPrefix(DomainNamePrefix);
        if (prefix == null) {
            prefix = '';
        } else {
            prefix += '.';
        }

        var srcDiv = getElement(sDivName);
        if (srcDiv == null) {
            debug(sDivName + ' is not existed!');
            return;
        }
        if (srcDiv.style.display == 'none') {
            return;
        }
        // debug(srcDiv)
        var eleSelect = srcDiv.getElementsByTagName("select");
        if (eleSelect != null) {
            for (k = 0; k < eleSelect.length; k++) {
                if (eleSelect[k].disabled == false) {
                    this.addParameter(prefix+eleSelect[k].name,eleSelect[k].value);
                }
            }
        }

        MakeCheckBoxValue(srcDiv);
        var eleInput = srcDiv.getElementsByTagName("input");
        if (eleInput != null) {
            for (k = 0; k < eleInput.length; k++) {
                if (eleInput[k].type != 'button' && eleInput[k].disabled == false) {
                    this.addParameter(Prefix+eleInput[k].name,eleInput[k].value);
                }
            }
        }
    };

    this.addParameter = function(sName, sValue){

        var DomainName = this.getDomainName(sName);

        for(i=0; i < this.oForm.elements.length; i++) {
            if(this.oForm.elements[i].name == DomainName) {
                this.oForm.elements[i].value = sValue;
                this.oForm.elements[i].disabled = false;
                return;
            }
        }

        if(i == this.oForm.elements.length)
        {
            var ele = this.createNewFormElement(DomainName,sValue);
            this.oForm.appendChild(ele);
			ele.value = sValue;
        }
    };

    this.delParameter = function(sName){
        var item;
        var DomainName = this.getDomainName(sName);
        len = this.oForm.elements.length;
        for(i=0; i < len; i++)
        {
            if (this.oForm.elements[i].name == DomainName)
            {
                item = this.oForm.elements[i];
                item.parentNode.removeChild(item);
                return;
            }
        }

    };



    this.disableElement = function(sName){
        var DomainName = this.getDomainName(sName);
        for(i=0; i < this.oForm.elements.length; i++) {
            if(this.oForm.elements[i].name == DomainName) {
                this.oForm.elements[i].disabled = true;
                return;
            }
        }
    };

    this.usingPrefix = function(Prefix) {
        this.DomainNamePrefix = Prefix + '.';
    };

    this.endPrefix = function() {
        this.DomainNamePrefix = '.';
    };

    this.setMethod = function(sMethod) {
        if(sMethod.toUpperCase() == "GET") {
            this.oForm.method = "GET";
        } else {
            this.oForm.method = "POST";
        }
    };

    this.setAction = function(sUrl) {
        this.oForm.action = sUrl;
        var findlog =  sUrl.indexOf('login');
        if(findlog == -1) {
            var pose = sUrl.indexOf('RequestFile=');
            var tempUrl = '/';
            if (-1 != pose) {
                pose += 12;
                tempUrl = sUrl.substr(pose);
            }

            top.previousPage = tempUrl;
        }
    };

    this.setTarget = function(sTarget) {
        this.oForm.target = sTarget;
    };

    this.submit = function(sURL, sMethod) {
        if( sURL != null && sURL != "" ) {
            this.setAction(sURL);
        }
        if( sMethod != null && sMethod != "" ) {
            this.setMethod(sMethod);
        }

        if (this.status == true) {
            this.oForm.submit();
        }
    };

    this.status = true;


    /*--------------------------------excute by internal-------------------------*/
    this.setPrefix(DomainNamePrefix);
    this.oForm = this.getNewSubmitForm();
    if (sFormName != null && sFormName != '')
    {
        this.addForm(sFormName,this.DomainNamePrefix);
        //this.DomainNamePrefix = '.';
    }
}

////////////////////////////////////////////////////
function FinishLoad()
{
//    debug("FinishLoad");
}

function AddErrInfo(errDes, id){

    showErrorUnderTextbox(id, errDes);
    $("#"+id).focus();
}

function ClearErro() {
    clearAllErrorLabel();
}

function DoUnload()
{/*
    if (typeof(event) != 'undefined' && event != null)
    {
        if (event.clientY < 0||event.altKey)
        {//debug(2)
            //top.location.replace("/logout.cgi");
        }
    }
    */
}

function DoLogout()
{
    //document.cookie = 'Cookie=default;path=/';
}


function CreateXMLHttp()
{
     var xmlhttp = null;
     var aVersions = ["MSXML2.XMLHttp.5.0","MSXML2.XMLHttp.4.0","MSXML2.XMLHttp.3.0",
                      "MSXML2.XMLHttp","Microsoft.XMLHttp"];

     if(window.XMLHttpRequest)
     {
         try
         {
             xmlhttp = new XMLHttpRequest();
         }
         catch (e)
         {
         }
     }
     else
     {
         if(window.ActiveXObject)//IE6、IE5
         {
             for (var i=0; i<5; i++)
             {
                  try
                  {
                       xmlhttp = new ActiveXObject(aVersions[i]);
                       return xmlhttp;
                  }
                  catch (e)
                  {
                  }
             }
          }
     }


     return xmlhttp;
}


function AjaxGetStatus(SendMethod, SendUrl, SendContent)
{
    uxmlhttp = CreateXMLHttp();
    uxmlhttp.onreadystatechange = StateChange;
    uxmlhttp.open(SendMethod, SendUrl, true);
    if (SendContent == 'null' || SendContent == 'undefined')
    {
        uxmlhttp.send(null);
    }
    else
    {
        uxmlhttp.send(SendContent);
    }
}

/////////////////////////////////////
function AssociateParam(dest,src,name)
{
   var DestObj = eval(dest);
   var SrcObj = eval(src);
   var NameArray = name.split('|');

   for (j = 0; j < DestObj.length; j++)
   {
      if (DestObj[j] == null)
         break;
      for (i = 0; i < SrcObj.length; i++)
      {
        if (SrcObj[i] == null)
            break;
        if (DestObj[j].key.indexOf(SrcObj[i].key) > -1)
        {
            try
            {
                eval(dest + '[' + j + ']' + '.' + 'Relating' + '='
                     + src + '[' + i + ']');
            }
            catch (e)
            {
            }
             for (k = 0; k < NameArray.length; k++)
            {
                 if (NameArray[k] == '')
                 {
                     continue;
                 }

                 try
                 {
                     eval(dest + '[' + j + ']' + '.' + NameArray[k] + '='
                       + src + '[' + i + ']' + '.' + NameArray[k]);
                 }
                 catch (e)
                 {
                 }
            }
            break;
         }
      }
   }

}

function toBreakWord(val,lineLength)
{
   var content = '';
   var index = 0;
   var len = val.length;

   while (len > lineLength)
   {
      content += val.substr(index,lineLength) + '<br>';
      len -= lineLength;
      index += lineLength;
   }
   content += val.substr(index);

   return content;
}

function getBoolValue(param)
{
    var value = parseInt(param,10);
    if (isNaN(value) == true )
    {
       var LowerParam = param.toLowerCase();
       if (LowerParam == 'enable')
       {
          return 1;
       }
       else
       {
          return 0;
       }
    }
    else
    {
       return value;
    }
}

function debug(info)
{
    //alert(info);
}

function getDisplayText(val,lineLength)
{
   if (lineLength == null)
      lineLength = 20;
   var content = '';
   var index = 0;
   var len = val.length;

   while (len > lineLength)
   {
      content += val.substr(index,lineLength) + '\n';
      len -= lineLength;
      index += lineLength;
   }
   content += val.substr(index);

       return content;
}

function isIpFormat(str)
{
    var addrParts = str.split('.');
    if (addrParts.length != 4 )
        return false;

    for(var i=0;i<addrParts.length;i++)
    {
        if (isPlusInteger(addrParts[i]) == false)
        {
            return false;
        }
    }

    return true;
}

function isValidDomain(str,maxLength)
{
var arr = new Array(
'.com','.net','.org','.biz','.coop','.info','.museum','.name',
'.pro','.edu','.gov','.int','.mil','.ac','.ad','.ae','.af','.ag',
'.ai','.al','.am','.an','.ao','.aq','.ar','.as','.at','.au','.aw',
'.az','.ba','.bb','.bd','.be','.bf','.bg','.bh','.bi','.bj','.bm',
'.bn','.bo','.br','.bs','.bt','.bv','.bw','.by','.bz','.ca','.cc',
'.cd','.cf','.cg','.ch','.ci','.ck','.cl','.cm','.cn','.co','.cr',
'.cu','.cv','.cx','.cy','.cz','.de','.dj','.dk','.dm','.do','.dz',
'.ec','.ee','.eg','.eh','.er','.es','.et','.eu','.fi','.fj','.fk','.fm',
'.fo','.fr','.ga','.gd','.ge','.gf','.gg','.gh','.gi','.gl','.gm',
'.gn','.gp','.gq','.gr','.gs','.gt','.gu','.gv','.gy','.hk','.hm',
'.hn','.hr','.ht','.hu','.id','.ie','.il','.im','.in','.io','.iq',
'.ir','.is','.it','.je','.jm','.jo','.jp','.ke','.kg','.kh','.ki',
'.km','.kn','.kp','.kr','.kw','.ky','.kz','.la','.lb','.lc','.li',
'.lk','.lr','.ls','.lt','.lu','.lv','.ly','.ma','.mc','.md','.mg',
'.mh','.mk','.ml','.mm','.mn','.mo','.mp','.mq','.mr','.ms','.mt',
'.mu','.mv','.mw','.mx','.my','.mz','.na','.nc','.ne','.nf','.ng',
'.ni','.nl','.no','.np','.nr','.nu','.nz','.om','.pa','.pe','.pf',
'.pg','.ph','.pk','.pl','.pm','.pn','.pr','.ps','.pt','.pw','.py',
'.qa','.re','.ro','.rw','.ru','.sa','.sb','.sc','.sd','.se','.sg',
'.sh','.si','.sj','.sk','.sl','.sm','.sn','.so','.sr','.st','.sv',
'.sy','.sz','.tc','.td','.tf','.tg','.th','.tj','.tk','.tm','.tn',
'.to','.tp','.tr','.tt','.tv','.tw','.tz','.ua','.ug','.uk','.um',
'.us','.uy','.uz','.va','.vc','.ve','.vg','.vi','.vn','.vu','.ws',
'.wf','.ye','.yt','.yu','.za','.zm','.zw');

var mai = str;
var val = true;

var dot = mai.lastIndexOf(".");
var dname = mai.substring(0,dot);
var ext = mai.substring(dot,mai.length);
//alert(ext);
if (mai.length == 0)
{
    return true;
}
if (mai.length > maxLength)
    return false;

if(dot>0 && dot<253)
{
    for(var i=0; i<arr.length; i++)
    {
      if(ext == arr[i])
      {
         val = true;
        break;
      }
      else
      {
         val = false;
      }
    }
    if(val == false)
    {
           //alert("Your domain extension "+ext+" is not correct");
         return false;
    }
    else
    {
        for(var j=0; j<dname.length; j++)
        {
          var dh = dname.charAt(j);
          var hh = dh.charCodeAt(0);
          if((hh > 47 && hh<58) || (hh > 64 && hh<91) || (hh > 96 && hh<123) || hh==45 || hh==46)
          {
             if((j==0 || j==dname.length-1) && hh == 45)
               {
                    //alert("Domain name should not begin are end with '-'");
                  return false;
              }
          }
        else    {
               //alert("Your domain name should not have special characters");
             return false;
          }
        }
    }
}
else
{
 //alert("Your Domain name is too short/long");
 return false;
}
return true;
}

function $get(id) {
    return document.getElementById(id);
}

function isValidIPDomain(ipStr,maxLength)
{
    if (isIpFormat(ipStr))
    {
        if (isAbcIpAddress(ipStr) == false)
        {
            return false;
        }
    }
    else
    {
        if(isValidDomain(ipStr,maxLength) == false)
        {
            return false;
        }
    }
    return true;
}

function showLoginMenu()
{
   //index=-1;
   if (typeof(top.logofrm.getElement) == 'undefined')
   {
       setTimeout("showLoginMenu()",100);
   }
   else
   {

     top.logofrm.getElement('setwizard').style.color = '#000000';
     top.logofrm.getElement('sethelp').style.color = '#000000';

   }
}

/*start of add by p00134244 for web capture*/
function restart()
{
    location.replace("/");
}

function timer_refresh()
{
    uxmlhttp = CreateXMLHttp();
    uxmlhttp.onreadystatechange = function () {
          if (uxmlhttp.readyState == 4)
        {
            if (uxmlhttp.status == 200)
            {
                var ret = uxmlhttp.responseText;
                if ("1" == ret)
                {
                    restart();
                }
            }
            setTimeout("timer_refresh()", 5000);
        }
    };
    var _str = "/html/ajaxref/refRes.cgi";
    uxmlhttp.open("POST", _str, true);
    uxmlhttp.send(null);
}

function start_refresh()
{
    setTimeout("timer_refresh()", 5000);
}
/*end of add by p00134244 for web capture*/


function showTableMenu(menuName,ThirdMenu,type)
{
   if (typeof(top.tabfrm.makeBackTable) == 'undefined')
   {
       setTimeout("showTableMenu()",100);
   }
   else
   {
       top.tabfrm.makeBackTable(menuName,ThirdMenu,type);
   }
}
function isNeedLogOut()
{

    if (time == 1)
    {

        top.location.replace('/html/index.asp');
    }

    else if(time == 2)
    {
        top.contentfrm.location.replace('/html/msgerrcode.asp');
    }

}

function loadFrameHook()
{
    isNeedLogOut();
}

function isNull(v)
{
    if(v === null)
    {
        return true;
    }

    if(v === undefined)
    {
        return true;
    }

    return false;
}

function ChangeHtmlToBlank(SrcStr)
{
    var DestStr = '';
    var re = /&nbsp;/g;
    DestStr = SrcStr.replace(re, ' ');
    return DestStr;
}

function ChangeBlankToHtml(SrcStr)
{
    var DestStr = '';
    var ulLength = SrcStr.length;
    var re = /\s/g;
    DestStr = SrcStr.replace(re, '&nbsp;');
    return DestStr;
}

function isValidLastByteZeroIp(StartIp)
{
    addrParts1 = StartIp.split(".");
    if ( ( 0 == addrParts1[3] ) )
    {
        return false;
    }
    return true;
}

function isSameSubnetAddrs(Ip1, Ip2, mask) {
    addrParts1 = Ip1.split(".");
    addrParts2 = Ip2.split(".");
    maskParts = mask.split(".");
    for(i=0; i<4; i++) {
        if(((Number(addrParts1[i]))&(Number(maskParts[i])))
        != ((Number(addrParts2[i]))&(Number(maskParts[i])))) {
            return false;
        }
    }
    return true;
}

String.prototype.trim = function()
{
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

String.prototype.ltrim = function()
{
    return this.replace(/(^\s*)/g, "");
};

String.prototype.rtrim = function()
{
    return this.replace(/(\s*$)/g, "");
};
function getStartIpAddr(lanIp, subMask) {
    var ipAddrParts = lanIp.split(".");
    var maskAddrParts = subMask.split(".");
    var startAddParts = new Array(4);

    var netAddrParts = new Array(4);
    var broadIpAddr = '11111110';
    var startIp = '';

    for(var i = 0; i < 4; i++) {

        netAddrParts[i] = parseInt(ipAddrParts[i],10) & parseInt(maskAddrParts[i],10);
        if(i == 3) {
            netAddrParts[i] = netAddrParts[i] + 1;
        }

        if(i != 0 ) {
            startIp = startIp + "." + netAddrParts[i];
        } else {
            startIp = netAddrParts[i];
        }
    }
    return startIp;
}

function getEndIpAddr(lanIp, subMask) {
    var ipAddrParts = lanIp.split(".");
    var maskAddrParts = subMask.split(".");
    var startAddParts = new Array(4);

    var netAddrParts = new Array(4);
    var broadIpAddr = '254';
    var endIp = '';

    for(var i = 0; i < 4; i++) {

        netAddrParts[i] = parseInt(ipAddrParts[i],10) & parseInt(maskAddrParts[i],10);
        if(i == 3) {
            if(0 == parseInt(maskAddrParts[i],10)) {
                  netAddrParts[i] = broadIpAddr;
            } else {
                netAddrParts[i] = 254 - parseInt(maskAddrParts[i],10) + netAddrParts[i];
            }
        }

        if(i != 0 ) {
            endIp = endIp + "." + netAddrParts[i];
        } else {
            endIp = netAddrParts[i];
        }
    }
    return endIp;
}

function CheckPrefix(Prefix,type)
{
	/* The prefix must be a complete IPv6 address */
	var IpAddress1 = Prefix.split(':');
	var IpAddress3 = Prefix;

	if ( 1 == type && '' == IpAddress3)
	{
	    return true;
	}

	/* BEGIN: Added by z67728, 2009/12/7   PN:AU4D02305 ????IPv6?????? */
	if ( true != isUnicastIpv6Address(IpAddress3) )
	{
	    return false;
	}
	/* END:   Added by z67728, 2009/12/7 */

	switch ( type )
	{
	    case 0 :
			if ( 15 == parseInt(IpAddress1[0].substring(0, 1),16) )
			{
			    switch ( parseInt(IpAddress1[0].substring(1, 2),16) )
			    {
			        case 15 :
						/* Multicast */
			        //case 12 :
						/* Unique Local Unicast */
						return false;
			        case 14 :
						/* if fec0 is valid ,change to 8 <= parseInt(IpAddress1[0].substring(2, 3),16) < 12 */
			            if ( 8 <= parseInt(IpAddress1[0].substring(2, 3),16) && 12 > parseInt(IpAddress1[0].substring(2, 3),16) )
			            {
			                /* Link Local Unicast */
							return false;
			            }
			            break;
			        default:
						break;
			    }
			}
            //var tempAddress = IpAddress1[0].toLowerCase();
            if ('fd' == IpAddress1[0].substring(0, 2))
            {
                return false;
            }
			//else if ( 0 == parseInt(IpAddress1[0].substring(0, 1),16) && 0 == parseInt(IpAddress1[0].substring(1, 2),16) )
			//{
			//    return false;
			//}
	        break;
	    case 1 :
	        if ( 15 == parseInt(IpAddress1[0].substring(0, 1),16) )
			{
			    switch ( parseInt(IpAddress1[0].substring(1, 2),16) )
			    {
			        case 15 :
						/* Multicast */
						return false;
			        default:
						break;
			    }
			}
			//else if ( 0 == parseInt(IpAddress1[0].substring(0, 1),16) && 0 == parseInt(IpAddress1[0].substring(1, 2),16) )
			//{
			//    return false;
			//}
	        break;
	    default:
			return false;
	}

	return true;
}

function CheckLength(Length)
{
	var TemLen = parseInt(Length);

	if ( true == isNaN(TemLen) || TemLen > 64 || TemLen < 16)
	{
	    return false;
	}

	return true;
}

function CheckHex(Hex)
{
	var TemHex  = Hex;
	var Loopj   = 0;
	var Tempi   = 0;
	var Tempj   = 1;
	var section = 0;
	var num     = 0;

	for ( Loopj = 0 ; Loopj < TemHex.length ; Loopj++ )
	{
	    section = TemHex.substring(Tempi, Tempj);
		//alert("section = " + section);
		num = parseInt(section,16);
		if ( true == isNaN(num) )
		{
		    //alert("num = " + section);
			return false;
		}

		Tempi++;
		Tempj++;
	}

	return true;
}

/* ??time??????? :
1 : T1 ??
2 : T2 ??
3 : T2 < T1 */
function CheckTime(Time1,Time2)
{
	var TemTime1 = Time1;
	var TemTime2 = Time2;

	if ( TemTime1.length > 10 || '' == TemTime1 )
	{
		//alert("TemTime1.length = " + TemTime1.length);
		return 1;
	}

	if ( TemTime2.length > 10 || '' == TemTime2 )
	{
		//alert("TemTime2.length = " + TemTime2.length);
		return 2;
	}

	/* ? ? ?: AU4D02279     ???:z67728,   ??:2009/12/2
	   ????: ??DHCPv6?RADVD?lifttime?????,???????*/
	if ( true != isPlusInteger(TemTime1))
	{
	    return 1;
	}

	if ( true != isPlusInteger(TemTime2))
	{
	    return 2;
	}

	TemTime1 = parseInt(Time1);
	TemTime2 = parseInt(Time2);

	if ( TemTime1 > 4294967295 || TemTime1 < 60 )
	{
	    return 1;
	}

	if ( TemTime2 > 4294967295 || TemTime2 < 60 )
	{
	    return 2;
	}

	if ( TemTime2 < TemTime1 )
	{
		//alert("TemTime1 = " + TemTime1);
		//alert("TemTime2 = " + TemTime2);
	    return 3;
	}

	return true;
}

function changeInnerHTML(domId, htmlStr) {
    if(domId) {
        var domEl = document.getElementById(domId);
        if(domEl) {
            if(htmlStr) {
                domEl.innerHTML = htmlStr;
            } else {
                domEl.innerHTML = "&nbsp;";
            }
            return true;
        }
    }
    return false;
}
var xmlhttputiljs = null;
function checkHttpUpgSts()
{
    xmlhttputiljs = null;
    xmlhttputiljs = CreateXMLHttp();
    xmlhttputiljs.onreadystatechange = showUpgDiag;
    xmlhttputiljs.open('post','/index/getupgsts.cgi?rid=' + Math.floor(Math.random() * 1000), true);
    xmlhttputiljs.send(null);
}
function showUpgDiag()
{
    if (xmlhttputiljs.readyState == 4)
    {
        if (xmlhttputiljs.status == 200)
        {
            var res = xmlhttputiljs.responseText;
            if(res != null) {
                res = res.trim();
            }
            var re = /^\s*(\d+)\s*$/;
            if(!re.test(res))
            {
                return;
            }
            res = parseInt(RegExp.$1, 10);

            var UPG_STATE_CHECK = 0;
            var UPG_STATE_CHECK_SUCC = 1;
            var UPG_STATE_CHECK_TR069_BUSY = 2;
            var UPG_STATE_CHECK_VOIP_BUSY = 3;
            var UPG_STATE_UPLOAD = 4;
            var UPG_STATE_UPLOAD_FAIL = 5;
            var UPG_STATE_DOWN = 6;
            var UPG_STATE_DOWN_FAIL = 7;
            var UPG_STATE_UPGRADE_TAR = 8;
            var UPG_STATE_UPGRADE_TAR_FAIL = 9;
            var UPG_STATE_UPGRADE_VOIP_BUSY = 10;
            var UPG_STATE_UPGRADE_SMALL = 11;
            var UPG_STATE_UPGRADE_SMALL_FAIL = 12;
            var UPG_STATE_UPGRADE_MODEM = 13;
            var UPG_STATE_UPGRADE_MODEM_NEW_FAIL = 14;
            var UPG_STATE_UPGRADE_MODEM_BACK0_FAIL = 15;
            var UPG_STATE_UPGRADE_MODEM_BACK2_FAIL = 16;
            var UPG_STATE_UPGRADE_MODEM_BACK_SUC = 17;
            var UPG_STATE_UPGRADE_ROUTER = 18;
            var UPG_STATE_UPGRADE_ROUTER_FAIL = 19;
            var UPG_STATE_UPGRADE_ROUTER_SUC = 20;

            if(res == UPG_STATE_CHECK_SUCC) {
                if (top.curUserType != 0) {
                    return;
                }
                var obj = {};
                obj.title = gVarPubNotification;
                obj.call = true;
                obj.onclick ="doUpgrade();";
                obj.content = gvarPubUpgradeMsg;
                obj.btnText = gVarPubUpdateBtn;
                addWarningMsg(obj);
                var re_ie6 = /MSIE/;
                if(re_ie6.test(navigator.userAgent))
                {
                    window.onresize = function () {
                        var div = document.getElementById("id_warningDiv");
                        if(div)
                        {
                            divHeight = parseInt(div.offsetHeight,10);
                            divWidth = parseInt(div.offsetWidth,10);
                            docWidth = document.body.clientWidth;
                            docHeight = document.body.clientHeight;
                            div.style.top = docHeight - divHeight + parseInt(document.body.scrollTop,10);
                            div.style.left = docWidth - divWidth + parseInt(document.body.scrollLeft,10);
                        }
                    };

                    window.onscroll = function () {
                        var div = document.getElementById("id_warningDiv");
                        if(div)
                        {
                            divHeight = parseInt(div.offsetHeight,10);
                            divWidth = parseInt(div.offsetWidth,10);
                            docWidth = document.body.clientWidth;
                            docHeight = document.body.clientHeight;
                            div.style.top = docHeight - divHeight + parseInt(document.body.scrollTop,10);
                            div.style.left = docWidth - divWidth + parseInt(document.body.scrollLeft,10);
                        }
                    };
                }
            }
            else if(res == UPG_STATE_UPLOAD
                    || res ==  UPG_STATE_DOWN )
            {
                //jumpToUpradePage();
                var forjslint = 0;
            }
            else if(//res == UPG_STATE_UPLOAD
                    //|| res ==  UPG_STATE_UPLOAD_FAIL
                    //|| res ==  UPG_STATE_DOWN
                    //|| res ==  UPG_STATE_DOWN_FAIL
                    //|| res ==  UPG_STATE_UPGRADE_SMALL
                    res ==  UPG_STATE_UPGRADE_SMALL
                    //|| res ==  UPG_STATE_UPGRADE_SMALL_FAIL
                    || res ==  UPG_STATE_UPGRADE_TAR
                    || res ==  UPG_STATE_UPGRADE_MODEM
                    || res ==  UPG_STATE_UPGRADE_MODEM_NEW_FAIL
                    || res ==  UPG_STATE_UPGRADE_ROUTER
                    )
            {
                jumpToUpradePage();
            }
        }
    }
}

function doUpgrade()
{
    if(!confirm(gVarConfirm1))
    {
        return;
    }
    xmlhttp = null;
    xmlhttp = CreateXMLHttp();
    xmlhttp.onreadystatechange = function(){};
    xmlhttp.open('POST','httpupg.cgi?RequestFile=/html/management/firmware.asp', true);
    xmlhttp.send("x.UpdateURL=&x.UpdatePort=&x.CheckNewVer=upgImage");
    var btn = $('id_btnWarning');
    if(btn) {
        btn.disabled = true;
    }
    setTimeout(jumpToUpradePage, 3000);
}

function jumpToUpradePage()
{
    try
    {
        top.frames["contentfrm"].location.replace("/html/management/firmware.asp");
    }
    catch(e)
    {
        var forjslint = 0;
    }
}

function __init()
{
    addEnvents();
    startRefresh();
    checkHttpUpgSts();
    top.previousPage = location.pathname;
    //var aspName = getAspFileName();
    //if(!isNull(aspName))
    //{
    //    reselectMenu(aspName);
    //}

}
function getAspFileName()
{
    var re = /\/(.*?.asp)/;
    if(re.test(location.pathname))
    {
        return RegExp.$1;
    }
    else
    {
        return null;
    }
}
function blankToNbsp(s)
{

    return (isNull(s) || ("" + s).trim() == "") ? "&nbsp;" : s;

}

//将格式化为yyyyMMdd的日期格式更改为 May 12,2012的格式
function getAmericanDate(dateStr)
{
	if (isNull(dateStr)||dateStr.trim()=="")
	{
		return "";
	}
	var year=dateStr.substr(0,4);
	var month=dateStr.substr(4,2);
	var day=dateStr.substr(6,2)*1;//去掉前置0
	month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][month-1];
	return month+" "+day+" "+year;

}
/*---------------------------------*/

function getClientInfo()
{
    var OSName = "";
    var OSVersion = "";
    var browserName = "";
    var browserVersion = "";

    //get browser information
    var userAgent = navigator.userAgent;

    if(/Chrome\/(.+?) /.test(userAgent))
    {
        browserName = "Chrome";
        browserVersion = RegExp.$1;
    }
    else if(/Opera.*Version\/(.+?)$/.test(userAgent))
    {
        browserName = "Opera";
        browserVersion = RegExp.$1;
    }
    else if(/Version\/(.+?) Safari/.test(userAgent))
    {
        browserName = "Safari";
        browserVersion = RegExp.$1;
    }

    else if(/Firefox\/(.+?)$/.test(userAgent))
    {
        browserName = "Firefox";
        browserVersion = RegExp.$1;
    }
    else if(/MSIE (.+?);/.test(userAgent))
    {
        browserName = "MSIE";
        browserVersion = RegExp.$1;
    }


    //get os infomation
    if(/Windows (.+?)[;|\)]/.test(userAgent))
    {
        OSName = "Windows";
        OSVersion = RegExp.$1;
    }
    else if(/Mac (.+?)[;|\)]/.test(userAgent))
    {
        OSName = "Mac";
        OSVersion = RegExp.$1;
    }
    else if(/Linux (.+?)[;|\)]/.test(userAgent))
    {
        OSName = "Linux";
        OSVersion = RegExp.$1;
    }


    return {"OSName" : OSName, "OSVersion" : OSVersion, "browserName" : browserName, "browserVersion" : browserVersion};
}

function blankToNbsp(s)
{

    return (isNull(s) || ("" + s).trim() == "") ? "&nbsp;" : s;

}

function isValidWPAPskKey(val) {
    var ret = false;
    var len = val.length;
    var maxSize = 64;
    var minSize = 8;
    var i;

    if ( len >= minSize && len < maxSize )
    {
        if(isASCIIData(val) == false)
        {
           ret = false;
        }
        else
        {
           ret = true;
        }
    }
    else if ( len == maxSize )
    {
        for ( i = 0; i < maxSize; i++ )
        {    if ( isHexaDigit(val.charAt(i)) == false )
            {
                break;
            }

        }

         if ( i == maxSize )
         {
            ret = true;
         }
    }
    else
    {
        ret = false;
    }

    return ret;
}


function isASCIIData(str)
{
  if(str == null)
    {
        return true;
    }
    var i=0;
    var char_i;
    var num_char_i;
    for(i=0; i < str.length; i++)
    {
        char_i = str.charAt(i);
        num_char_i = char_i.charCodeAt();
        if (num_char_i > 127)
        {
            return false;
        }
    }
    return true;

}

function getIp6Url(str)
{
	var index=str.indexOf("/");
	if(index >= 0 )
	{
		return str.substring(0,index);
	}
	return str;
}

function getformat()
{
	var timeformat=" hh:mm:ss";
	var dateformat="yyyy-MM-dd";
	var cl=LANGUAGE_DATA.current_language;
	if("en_us"==cl)
	{
		dateformat="M/d/yyyy";
	}
	if("ar"==cl)
	{
		dateformat="d/M/yyyy";
	}
	if("de-de"==cl || "no"==cl || "pt-br"==cl||"ru"==cl)
	{
		dateformat="dd.MM.yyyy";
	}
	if("es-ar"==cl || "es-es"==cl||"fr-fr"==cl||"da"==cl||"pt-pt"==cl)
	{
		dateformat="dd/MM/yyyy";
	}
	if("fi"==cl)
	{
		dateformat="d.M.yyyy";
	}
	if("zh_cn"==cl)
	{
		dateformat="yyyy-M-d";
	}
	return dateformat+timeformat;
}

function getlocalDate(datestr)
{
	var dateFormat=getformat();
	datestr=datestr.replace(/\//g," ");
	datestr=datestr.replace(/\./g,"/");
	datestr=datestr.replace(/-/g,"/");
	var date=new Date(datestr);
	return date2str(date,dateFormat);
}
function date2str(x,y) {
	var z = {M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()};
	y = y.replace(/(M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-2)});
	return y.replace(/(y+)/g,function(v) {return x.getFullYear().toString().slice(-v.length)});
}
