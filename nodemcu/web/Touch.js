
function send(id,value){
	console.log(id+"/"+value);

	fetch(id+"/"+value)
		.then(response => response.json())
		.then(data => set(data.value));
}

function set(id,value){
	if (value==null)
		return;
	
	var div = document.getElementById(id);
	if (div.classList.contains('TFTSwitch')){
//		div.innerText = value;
		div.className = value ? "TFT TFTSwitch selected" : "TFT TFTSwitch";
	} else if (div.classList.contains('TFTText')){
		var eDiv = div.getElementsByTagName('div')[0];
		eDiv.innerText = value;
	} else if (div.classList.contains("TFTCombo")){
		var divs = div.getElementsByTagName('div');
		for (var d=0;d<divs.length;d++){
			if (divs[d].innerText==value)
				divs[d].className = "selected";
			else
				divs[d].className = "";
		}
	}
}

function linkInput(uri,label){
	var root = document.getElementById("root");	
	var div = document.createElement("div");
	div.className = "TFT";
	var a = document.createElement("a");
	a.href = uri;
	a.innerText = label;
	div.appendChild(a);
	root.append(div);
}

function textInput(id,label,value,editable){
	var root = document.getElementById("root");	
	var div = document.createElement("div");
	div.className = "TFT TFTText";
	div.id = id;
	var span = document.createElement("span");
	span.innerText = label;
	div.appendChild(span);
	var eDiv = document.createElement("div");
	eDiv.innerText = value;
	if (editable==null || editable!=false){
		eDiv.contentEditable = true;
		eDiv.addEventListener('input', function() {
			if (this.outerText.indexOf("\n")>-1){
				this.textContent = this.textContent.trim();
				this.blur();
				send(this.parentNode.id,this.textContent);
			}
		});	
	} else
		div.className = "TFT TFTText static";
	div.appendChild(eDiv);
	root.appendChild(div);
}

function comboInput(id,label,value,options,editable){
	var root = document.getElementById("root");
	
	var div = document.createElement("div");
	if (editable==null || editable!=false)
		div.className = "TFT TFTCombo";
	else
		div.className = "TFT TFTCombo static";
	div.id = id;
	var span = document.createElement("span");
	span.innerText = label;
	div.appendChild(span);
	for (var o=0;o<options.length;o++){
		var opDiv = document.createElement("div");
		opDiv.innerText = options[o];
		if (editable==null || editable!=false){		
			opDiv.addEventListener('click',function(){
				send(div.id,this.innerText);
			});
		}
		if (options[o]==value)
			opDiv.className="selected";
		div.appendChild(opDiv);
	}
	root.appendChild(div);
}

function pushInput(id,label,height) {
	var root = document.getElementById("root");
	
	var div = document.createElement("div");
	div.className = "TFT TFTSwitch";
	div.id = id;			
	div.addEventListener('click',function(){
		send(div.id,this.innerText);
	});
	div.style.height = height+"%";
	var span = document.createElement("span");
	span.innerText = label;
	div.appendChild(span);
	root.appendChild(div);
}

function checkBoxInput(id,label,value) {
	var root = document.getElementById("root");
	
	var div = document.createElement("div");
	div.className = value ? "TFT TFTSwitch selected" : "TFT TFTSwitch";
	div.id = id;			
	div.addEventListener('click',function(){
		send(div.id,!this.classList.contains("selected"));
	});
	var span = document.createElement("span");
	span.innerText = label;
	div.appendChild(span);
	root.appendChild(div);
}	

function webText(text){
	var root = document.getElementById("root");
	
	var div = document.createElement("div");
	div.className = "TFT";
	div.innerHTML = text.replaceAll("\n","<br/>");
	root.appendChild(div);
}
