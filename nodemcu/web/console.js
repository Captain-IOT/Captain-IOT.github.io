function req(uri,id){
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
	    if (this.readyState==4 && this.status==200){
			var json = JSON.parse(this.responseText);
			var span = document.getElementById(id+'_RESP');
			span.innerText = json.response;
		   	span.style.transition = '0s opacity';
		   	span.style.opacity = '1';
		   	span.style.transition = '3s opacity';		
			window.setTimeout(fadeout, 6000);
			var widget = document.getElementById(id);
			if (widget instanceof HTMLButtonElement){
				if (json.value=='1')
					widget.className='buttonTrue';
				else
					widget.className='buttonFalse';
			}
			else if (widget instanceof HTMLInputElement){
				widget.value=json.value;
			}
			else if (widget instanceof HTMLSelectElement){
				widget.value=json.value;
			}
		}
	}
  	xhttp.open("GET",uri,true);
  	xhttp.send();	
}
function fadeout(){
	Array.from(document.getElementsByClassName('fadeout')).forEach(function(item) {
	   item.style.opacity = '0';
//	   item.innerText = '';
//	   item.className.replace('fadeout','');
	});
}
function onText(event,uri,id){
	if (event.keyCode == 13){
		var txt = document.getElementById(id);
		req(uri+'?value='+txt.value,id);
		return false;
	}
}