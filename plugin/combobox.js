/*
Author: Satya Rohit A

Copyright 2014. All rights reserved.
*/

!function(root){
	'use strict';

	var ComboBox = function(elem_id, dataStore){

		this.dataStore = dataStore || [];

		var self = this;

		//if dataStore is an api
		if((typeof dataStore === 'string') && /.+:\/\/.+/.test(dataStore)){
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange=function()
			{
			  if (xhr.readyState==4 && xhr.status==200)
			    {
			    	//need to get array of strings as response
			    	if(typeof xhr.responseText === 'string'){
			    		self.dataStore = xhr.responseText.replace(/'/g,'');
			    		self.dataStore = self.dataStore.slice(1,self.dataStore.length-1);
			    		self.dataStore = self.dataStore.split(',');
			    		console.log(self.dataStore);
			    	}
			    	else
			    		dataStore = xhr.responseText;
			    }
			}
			xhr.open("GET",dataStore,true);
			xhr.send();
		}
		
		var elm = document.getElementById(elem_id);

		if(elm && !elm.parentNode.classList.contains('c-box')){//if element exists and has not already been initialized with combobox

			switch(elm.type){
				case 'text'://textbox
					this.initTextInput(elm);
					break;
				case 'select-one'://selectbox
					this.initSelectBoxInput(elm);
					break;
			}

		}

	}

	ComboBox.prototype.generateComboBox = function(elm, inp){

		var combo_box = document.createDocumentFragment(),
			dropdown = document.createElement('ul');

		dropdown.className = 'c-box-dropdown';
		dropdown.style.width = elm.offsetWidth + 'px';
		dropdown.style.top = elm.offsetHeight + 'px';

		var self = this;
		
		inp.addEventListener('input', function(e){
			
			if(e.target.value != ''){
				var list = document.createDocumentFragment();
				for(var i=0;i<self.dataStore.length;i++){
					if(e.target.value.toLowerCase() === (self.dataStore[i].substring(0, e.target.value.length)).toLowerCase()){
						var li = document.createElement('li');
						li.innerHTML = self.dataStore[i];
						list.appendChild(li);
					}
				}
				dropdown.innerHTML = '';
				dropdown.appendChild(list);
			}
			else{
				dropdown.innerHTML = '';
			}

		}, false);

		dropdown.addEventListener('click', function(e){
			if(e.target.nodeName === 'LI'){

				inp.value = e.target.innerHTML;
				dropdown.innerHTML = '';

			}
		},false);

		combo_box.appendChild(document.createElement('span'));
		var temp = combo_box.querySelector('span');
		temp.appendChild(inp);
		temp.appendChild(dropdown);
		temp.className = 'c-box';
		
		temp.addEventListener('click', this.clickEvent, false);

		elm.id = 'temp';
		elm.parentNode.insertBefore(combo_box, elm.nextSibling);
		elm.remove();

	}

	ComboBox.prototype.initTextInput = function(elm){

		var clone_node = elm.cloneNode();
		this.generateComboBox(elm, clone_node);

	}

	ComboBox.prototype.initSelectBoxInput = function(elm){

		var options = elm.children;
		if(options.length >0){  //add options to datastore
			for(var i=0;i<options.length;i++){
				this.dataStore.push(options[i].innerHTML);
			}
		}
		
		var inp = document.createElement('input');
		inp.id = elm.id;
		inp.style.width = elm.offsetWidth + 'px';
		this.generateComboBox(elm, inp);
		
		var sp = document.createElement('span');
		sp.className = 'carat';
		var self = this;
		sp.addEventListener('click', function(e){
			var list = document.createDocumentFragment();
			for(var i=0;i<self.dataStore.length;i++){
				var li = document.createElement('li');
				li.innerHTML = self.dataStore[i];
				list.appendChild(li);
			}

			(document.querySelector('#' + inp.id + ' ~ ul')).innerHTML = '';
			(document.querySelector('#' + inp.id + ' ~ ul')).appendChild(list);
		}, false);

		(document.querySelector('#' + inp.id)).placeholder = 'Enter..';
		document.querySelector('#' + inp.id + ' ~ ul').parentNode.insertBefore(sp, document.querySelector('#' + inp.id + ' ~ ul'));

	}

	root.ComboBox = ComboBox;

}(this);
