var Diner = function(id, name){
	this.id = id;
	this.name = name;
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

	function _createHTML(id, name, d) {
		var dinerWrap = document.getElementById('diners')
		var div = document.createElement('div');
		div.innerHTML = id+' '+name;

		var input = document.createElement('input');
		input.setAttribute('type', 'text');

		var price = document.createElement('input');
		price.setAttribute('type', 'number');

		var button = document.createElement('button');
		button.innerHTML = 'Add dish';
		button.addEventListener('click', function(){
			console.log(input.value);
			d.addDish(input.value, price.value);
		})

		dinerWrap.appendChild(div);
		dinerWrap.appendChild(input);
		dinerWrap.appendChild(price);
		dinerWrap.appendChild(button);

	}

	function _createDiner(name) {
		_id++;
		var d = new Diner(_id, name);
		_createHTML(_id, name, d);
		_diners.push(d);
	}

	function _addDish(dishName, price) {
		
	}


	return {
		createDiner: function(name) {
			_createDiner(name);
		},
		getDiners: function(){
			return _diners;
		}

	}
})();