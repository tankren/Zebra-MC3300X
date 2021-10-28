var ekbversionintentsupported=false;
function ekbversion()
	{
		try{
			var version=metaReceiver.getEKBVersion();
			var array=version.split(".");
			var MajorVersion=array[0];
			var MinorVersion=array[1];
			if(MajorVersion>2)
			{
				ekbversionintentsupported=true;
			}else if(MajorVersion==2){
				if(MinorVersion>=2)
					ekbversionintentsupported=true;
			}
		}catch(ex)
		{
			console.log(ex);
		}
	}
	
ekbversion();

function addFocusEventListner()
{
	//here adding a event (focus/blur) listner for all valid input elements
	var x=document.getElementsByTagName('input');
	for(var k=0;k<x.length;k++)
	{
		if(x[k].type=='text' || x[k].type=='number' || x[k].type=='password' || x[k].type=='tel' || x[k].type=='search' || x[k].type=='email' || x[k].type=='url')
		{
			if(x[k].readOnly==false)
			{
				x[k].addEventListener('focus',onFocusEvent,false);
				x[k].addEventListener('blur',OnBlurEvent,false);
				x[k].addEventListener('touchstart',OnTouchStartEvent,false);
			}
			
		}
	}
	x=document.getElementsByTagName('textarea');
	for(var k=0;k<x.length;k++)
	{
		if(x[k].readOnly==false)
		{
			x[k].addEventListener('focus',onFocusEvent,false);
			x[k].addEventListener('blur',OnBlurEvent,false);
			x[k].addEventListener('touchstart',OnTouchStartEvent,false);
		}
	}
}

function initSapKeyBoard()
{
	if( keyboardVisibility.toLowerCase() === "ondemand")
	{
	
		if( null != onHardwareKeyPress && onHardwareKeyPress === "1" && null !=hardwareKeyValue  &&  hardwareKeyValue !== "" ) 
		{
			//let us register for a keydowncallback if config.xml has keyboardVisibility and onHardwareKeyPress are set
			if(hardwareKeyValue === "103" )
			{
				//special case for 103 as it is the trigger key
				EB.KeyCapture.captureTrigger(keyCallbackTrigger);
			}
			else
			{
				//for normal keys
				EB.KeyCapture.captureKey(false, hardwareKeyValue, keyCallback);
				console.log("KEY" data.keyValue.toString() "IS PRESSED");
			}
		}
		if(onFocus === "1")
		{		
			addFocusEventListner();
		}
	}
	
	if (keyboardVisibility!=null &&  (keyboardVisibility.toLowerCase() === "alwayson")) 
	{
		//for alwayson scenario, blindly show the keyboard
		showKeyBoard();
    }
	else
	{
		//hide keyboard on navigation
		hideKeyBoard();
	}
}
 


function onFocusEvent()
{
	if (keyboardVisibility!=null &&  (keyboardVisibility.toLowerCase() === "ondemand")) 
	{
			if (onFocus != null && onFocus === "1")
			{
				//we show keyboard on focus if onFocus value is set to 1 with keyboardVisibility as ondemand
				showKeyBoard();				
			}
							
							
	}
}
function OnBlurEvent()
{ 
if (keyboardVisibility!=null &&  (keyboardVisibility.toLowerCase() === "ondemand")) 
	{
		if (onFocus != null && onFocus === "1")
		{
			//we hide keyboard on lossing focus if onFocus value is set to 1 with keyboardVisibility as ondemand
			hideKeyBoard();
			
			
		}
	}
}
//Use Touch event to show keyboard on touch of focused Input Field/TextArea 
function OnTouchStartEvent(event){
	if (keyboardVisibility!=null &&  (keyboardVisibility.toLowerCase() === "ondemand")) 
	{
		if (onFocus != null && onFocus === "1")
		{
			//we show keyboard on focus if onFocus value is set to 1 with keyboardVisibility as ondemand
			showKeyBoard();				
		}				
	}
}
function showKeyBoard()
{

	if("false" == isDeviceWT6000)
	{
		showRegularKeyBoard();
		metaReceiver.resizeWebviewOnButtonbarShown();//must call to do webview redraw on keyboard popup
	}
	else
	{
		showWT6000KeyBoard();
	}
	keyboardStatus =true;
	
	
}
function hideKeyBoard()
{
	if("false" == isDeviceWT6000)
	{
		hideRegularKeyBoard();
		metaReceiver.restoreWebviewOnButtonbarHidden();//must call to do webview redraw on keyboard hide
	}
	else
	{
		hideWT6000KeyBoard();
	}

    keyboardStatus = false;	
	
	
}
	
	var parameters = function (intentType, permission, action, categories, appName, targetClass, uri, mimeType, data) {
    var result = {};
    if (permission != "") result.permission = permission;
    if (intentType != "") result.intentType = intentType;
    if (action != "") result.action = action;
    if (categories != "") result.categories = categories;
    if (appName != "") result.appName = appName;
    if (targetClass != "") result.targetClass = targetClass;
    if (uri != "") result.uri = uri;
    if (mimeType != "") result.mimeType = mimeType;
    if (data != "") result.data = data;
    return result;
	};

	function intentReceived() 
	{
		
	}
function showRegularKeyBoard()
{
	//show default layout of regular keyboard as numeric
	if( KeyboardType.toLowerCase() == "buttonbar")
	{
		buttonBarLayout.enabled= "numericlayout";
	}
	else if(KeyboardType.toLowerCase() == "enterprisekeyboard")
	{
		if(ekbversionintentsupported)
		{
			console.log("Inside showRegularKeyBoard EKB version > 2.2"); 
			
			/*var bool = new Boolean(true);
			var data= {'ENABLE' : bool};
			var params = new parameters(EB.Intent.BROADCAST, "", "com.symbol.ekb.api.ACTION_UPDATE", "", "", "", "", "", data);
			EB.Intent.send(params, intentReceived);
			
			var data1= {'CURRENT_LAYOUT_GROUP' : "EKBCustomLayouts", 'CURRENT_LAYOUT_NAME':"numericlayout"};
			var params = new parameters(EB.Intent.BROADCAST, "", "com.symbol.ekb.api.ACTION_UPDATE", "", "", "", "", "", data1);
            EB.Intent.send(params, intentReceived);         
			*/
	        EB.Sip.resetToDefault();
		sleep(160);
             setTimeout(function() {var intentDataForSetLayout= {'CURRENT_LAYOUT_GROUP' : 'EKBCustomLayouts', 'CURRENT_LAYOUT_NAME':'numericlayout'};var params = new parameters(EB.Intent.BROADCAST, '', 'com.symbol.ekb.api.ACTION_UPDATE', '', '', '', '', '', intentDataForSetLayout);EB.Intent.send(params, intentReceived);
			} , 10) ;
			setTimeout(function() {var  bool= new Boolean(true); var data= {'SHOW':bool};var params = new parameters(EB.Intent.BROADCAST, '', 'com.symbol.ekb.api.ACTION_UPDATE', '', '', '', '', '', data);EB.Intent.send(params, intentReceived);
			},10);
	
		
		}else{
			console.log("Showing Buttonbar layout as this ekb version doesn't support intent API's"); 
			buttonBarLayout.enabled= "numericlayout";
		}
	}
	else
	{
		console.log("Keyboard Type is neither Buttonbar nor EnterpriseKeyboard");
	}
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function hideRegularKeyBoard()
{
	if( KeyboardType.toLowerCase() == "buttonbar")
	{
			//hide regular sap keyboard
			buttonBarLayout.disabled= "numericlayout";  
			buttonBarLayout.disabled= "qwertylayout"; 
			buttonBarLayout.disabled= "functionkeylayout"; 
			buttonBarLayout.disabled= "specialsymbollayout"; 
			buttonBarLayout.disabled= "qwertycapslayout";
	}else if(KeyboardType.toLowerCase() == "enterprisekeyboard")
	{
		if(ekbversionintentsupported)
		{
			var bool = new Boolean(false);
			setTimeout(function() { var data= {'SHOW':bool};var params = new parameters(EB.Intent.BROADCAST, '', 'com.symbol.ekb.api.ACTION_UPDATE', '', '', '', '', '', data);EB.Intent.send(params, intentReceived);},20);
		}else{
			buttonBarLayout.disabled= "numericlayout";  
			buttonBarLayout.disabled= "qwertylayout"; 
			buttonBarLayout.disabled= "functionkeylayout"; 
			buttonBarLayout.disabled= "specialsymbollayout"; 
			buttonBarLayout.disabled= "qwertycapslayout";
		}
	}
	else{
		console.log("Keyboard Type is neither Buttonbar nor EnterpriseKeyboard");
	}
}

function showWT6000KeyBoard()
{
	//show default layout of WT6000 keyboard as numeric
	
	if( KeyboardType.toLowerCase() == "buttonbar")
	{
		buttonBarLayout.enabled= "numericlayoutwt6000";
	}
	else if(KeyboardType.toLowerCase() == "enterprisekeyboard")
	{
		
		if(ekbversionintentsupported)
		{
			console.log("EKB version > 2.2"); 
			
			/*var bool = new Boolean(true);
			var data= {'ENABLE' : bool};
			var params = new parameters(EB.Intent.BROADCAST, "", "com.symbol.ekb.api.ACTION_UPDATE", "", "", "", "", "", data);
			EB.Intent.send(params, intentReceived);
				
			var data1= {'CURRENT_LAYOUT_GROUP' : "EKBCustomLayouts", 'CURRENT_LAYOUT_NAME':"numericlayoutwt6000"};
			var params = new parameters(EB.Intent.BROADCAST, "", "com.symbol.ekb.api.ACTION_UPDATE", "", "", "", "", "", data1);
			EB.Intent.send(params, intentReceived);*/
	        EB.Sip.resetToDefault();
            setTimeout(function() {var intentDataForSetLayout= {'CURRENT_LAYOUT_GROUP' : 'EKBCustomLayouts_wt6000', 'CURRENT_LAYOUT_NAME':'numericlayoutwt6000'};var params = new parameters(EB.Intent.BROADCAST, '', 'com.symbol.ekb.api.ACTION_UPDATE', '', '', '', '', '', intentDataForSetLayout);EB.Intent.send(params, intentReceived);
			} , 10) ;
			setTimeout(function() {var  bool= new Boolean(true); var data= {'SHOW':bool};var params = new parameters(EB.Intent.BROADCAST, '', 'com.symbol.ekb.api.ACTION_UPDATE', '', '', '', '', '', data);EB.Intent.send(params, intentReceived);
			},10);
		}else{
			console.log("Showing Buttonbar layout as this ekb version doesn't support intent API's"); 
			buttonBarLayout.enabled= "numericlayoutwt6000";
		}
	}
	else{
		console.log("Keyboard Type is neither Buttonbar nor EnterpriseKeyboard");
	}
}
function hideWT6000KeyBoard()
{
	//hide WT600 sap keyboard
	if( KeyboardType.toLowerCase() == "buttonbar")
	{
		buttonBarLayout.disabled= "numericlayoutwt6000";  
		buttonBarLayout.disabled= "qwertylayoutwt6000"; 
		buttonBarLayout.disabled= "functionkeylayoutwt6000"; 
		buttonBarLayout.disabled= "specialsymbollayoutwt6000"; 
		buttonBarLayout.disabled= "qwertycapslayoutwt6000"; 
	}
	else if(KeyboardType.toLowerCase() == "enterprisekeyboard")
	{
		if(ekbversionintentsupported)
		{
			var  bool= new Boolean(false);
			setTimeout(function() { var data= {'SHOW':bool};var params = new parameters(EB.Intent.BROADCAST, '', 'com.symbol.ekb.api.ACTION_UPDATE', '', '', '', '', '', data);EB.Intent.send(params, intentReceived);},20);
		}else{
			buttonBarLayout.disabled= "numericlayoutwt6000";  
			buttonBarLayout.disabled= "qwertylayoutwt6000"; 
			buttonBarLayout.disabled= "functionkeylayoutwt6000"; 
			buttonBarLayout.disabled= "specialsymbollayoutwt6000"; 
			buttonBarLayout.disabled= "qwertycapslayoutwt6000"; 
		}
	}
	else{
		console.log("Keyboard Type is neither Buttonbar nor EnterpriseKeyboard");
	}
}

function keyCallbackTrigger(data)
{
	//handler for keycallback
	if(data.triggerFlag.toString() === hardwareKeyValue)
	{

		if(true == keyboardStatus)
		{
			hideKeyBoard();
		}
		else
		{
			showKeyBoard();
		}
	}

}
function keyCallback(data)
{
	//handler for keycallback
	if(data.keyValue.toString() === hardwareKeyValue)
	{

		if(true == keyboardStatus)
		{
			hideKeyBoard();
		}
		else
		{
			showKeyBoard();
		}
	}

}

