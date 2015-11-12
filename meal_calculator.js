var Diner = function(id, name){
	this.id = id;
	this.name = name;
	this.sumElement;
	this.taxElement;
	this.tipElement;
	this.dishes = [];
}

Diner.prototype.addDish = function(dishName, price){
	var dish = {
		name: dishName,
		price: price
	}

	this.dishes.push(dish);
}


var App = (function(){
	var _id = 0;
	var _diners = [];

	function _validationInput() {
		var arg = Array.prototype.slice.call(arguments);
		console.log(arguments.length);

		for(var i = 0; i < arg.length; i++){
			if(arg[i] === "") {
				return false;
			}
		}

		return true;

	}

	function _createHTML(id, name, d) {
		var dinerWrap = document.getElementById('diners')
		var div = document.createElement('div');
		div.className = 'diner small-12 medium-6 large-3 columns';
		div.innerHTML = '<h2>'+id+' '+name+'</h2>';

		var input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('placeholder', 'dish name');
		input.className = 'large-6 columns';

		var price = document.createElement('input');
		price.setAttribute('type', 'number');
		price.setAttribute('placeholder', 'price');
		price.className = 'large-6 columns';

		var table = document.createElement('table');

		var button = document.createElement('button');
		button.innerHTML = 'Add dish';
		button.addEventListener('click', function(){
			//console.log(input.value);
			if(_validationInput(input.value, price.value)){
				d.addDish(input.value, price.value);
				dishHTML(input.value, price.value, table);
				updateSum(d);

				price.value = '';
				input.value = '';
			}
		})

		var sum = document.createElement('div');
		var tax = document.createElement('div');
		var tip = document.createElement('div');

		d.sumElement = sum;
		d.taxElement = tax;
		d.tipElement = tip;

		tax.innerHTML = "tax 0.00 $";
		tax.className = 'tax';

		tip.innerHTML = "tip 0.00 $";
		tip.className = 'tip';
		
		sum.innerHTML = "0.00 $";
		sum.className = 'sum';

		dinerWrap.appendChild(div);
		div.appendChild(input);
		div.appendChild(price);
		div.appendChild(button);
		div.appendChild(table);
		div.appendChild(tax);
		div.appendChild(tip);
		div.appendChild(sum);
	}

	function updateSum(obj) {
		var len = obj.dishes.length;
		var sum = 0;

		for(var i = 0; i< len; i++){
			console.log(obj.dishes[i]);
			var parsePrice = parseFloat(obj.dishes[i].price);
			sum += parsePrice;
		}

		var tax = _validationInput(document.getElementById('tax').value) ? document.getElementById('tax').value : 'none';
		var tip = _validationInput(document.getElementById('tip').value) ? document.getElementById('tip').value : 'none';
		
		var afterTax = (parseFloat(tax)/100)*sum;
		var afterTip = (afterTax+sum)*(parseFloat(tip)/100);

		obj.taxElement.innerHTML = 'tax ('+tax+'%) '+afterTax.toFixed(2);
		obj.tipElement.innerHTML = 'tip ('+tip+'%) '+afterTip.toFixed(2);
		obj.sumElement.innerHTML = (afterTax + afterTip + sum).toFixed(2);
	}

	function dishHTML(name, price, tableWrapper){
		var tr = document.createElement('tr');

		var n = document.createElement('td');
		n.innerHTML = name;

		var p = document.createElement('td');
		var priceParsed = parseFloat(price);
		console.log();
		p.innerHTML = priceParsed.toFixed(2) + ' $';

		tr.appendChild(n);
		tr.appendChild(p);
		tableWrapper.appendChild(tr);
	}

	function _createDiner(name) {
		_id++;
		var d = new Diner(_id, name);
		_createHTML(_id, name, d);
		_diners.push(d);
	}


	return {
		createDiner: function(name) {
			_createDiner(name);
		},
		getDiners: function(){
			return _diners;
		},
		validate: function(){
			return _validationInput.apply(this, arguments);
		},
		updateSum: function(){
			var diners = _diners;

			console.log(diners);
			
			for(var i = 0; i < diners.length; i++) {
				updateSum(diners[i]);
			}
		}

	}
})();




document.addEventListener("DOMContentLoaded", function(event) {
  var diner = document.getElementById('diner-button');
  var tax = document.getElementById('tax');
  var tip = document.getElementById('tip');

  tax.addEventListener('keyup', App.updateSum, false);
  tip.addEventListener('keyup', App.updateSum, false);

  diner.addEventListener('click', function(){
  	var dinerName = document.getElementById('diner_name').value;

  	
  	if(App.validate(dinerName)){
  		App.createDiner(dinerName.toUpperCase());
  		document.getElementById('diner_name').value = '';
  	}

  })
});