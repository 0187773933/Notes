let GLOBAL_EQUATION_WRAPPERS = [];

const MetricUnits = [
	{
		id: 1,
		value: "yotta",
		label: "yotta",
		symbol: "Y",
		base_10: 24,
	},
	{
		id: 2,
		value: "zetta",
		label: "zetta",
		symbol: "Z",
		base_10: 21,
	},
	{
		id: 3,
		value: "exa",
		label: "exa",
		symbol: "E",
		base_10: 18,
	},
	{
		id: 4,
		value: "peta",
		label: "peta",
		symbol: "P",
		base_10: 15,
	},
	{
		id: 5,
		value: "tera",
		label: "tera",
		symbol: "T",
		base_10: 12,
	},
	{
		id: 6,
		value: "giga",
		label: "giga",
		symbol: "G",
		base_10: 9,
	},
	{
		id: 7,
		value: "mega",
		label: "mega",
		symbol: "M",
		base_10: 6,
	},
	{
		id: 8,
		value: "kilo",
		label: "kilo",
		symbol: "k",
		base_10: 3,
	},
	{
		id: 9,
		value: "hecto",
		label: "hecto",
		symbol: "h",
		base_10: 2,
	},
	{
		id: 10,
		value: "deca",
		label: "deca",
		symbol: "da",
		base_10: 1,
	},
	{
		id: 11,
		value: "one",
		label: "",
		symbol: "1",
		base_10: 0,
	},
	{
		id: 12,
		value: "deci",
		label: "deci",
		symbol: "d",
		base_10: -1,
	},
	{
		id: 13,
		value: "centi",
		label: "centi",
		symbol: "c",
		base_10: -2,
	},
	{
		id: 14,
		value: "milli",
		label: "milli",
		symbol: "m",
		base_10: -3,
	},
	{
		id: 15,
		value: "micro",
		label: "micro",
		symbol: "µ",
		base_10: -6,
	},
	{
		id: 16,
		value: "nano",
		label: "nano",
		symbol: "n",
		base_10: -9,
	},
	{
		id: 17,
		value: "pico",
		label: "pico",
		symbol: "p",
		base_10: -12,
	},
	{
		id: 18,
		value: "femto",
		label: "femto",
		symbol: "f",
		base_10: -15,
	},
	{
		id: 19,
		value: "atto",
		label: "atto",
		symbol: "a",
		base_10: -18,
	},
	{
		id: 20,
		value: "zepto",
		label: "zepto",
		symbol: "z",
		base_10: -21,
	},
	{
		id: 21,
		value: "yocto",
		label: "yocto",
		symbol: "y",
		base_10: -24,
	}
];

function _get_id_from_value_name( value_name ) {
	for ( let i = 0; i < MetricUnits.length; ++i ) {
		if (MetricUnits[i].value === value_name ) {
			return i;
		}
	}
	return false
}
function _get_id_from_base_10( base_10 ) {
	for (let i = 0; i < MetricUnits.length; ++i) {
		if ( MetricUnits[i].base_10 === base_10 ) {
			return i;
		}
	}
	return false
}
function _add_metric_units_dropdown_to_element_id( element_id , default_label="micro" , on_change_function ) {
	let select = document.createElement( "select" );
	select.id = `${element_id}-metric-selector`;
	select.onchange = on_change_function;
	select.default_index = _get_id_from_value_name( default_label );
	for ( let i = 0; i < MetricUnits.length; ++i ) {
		if (i === select.default_index ) {
			select.innerHTML += `<option selected="selected" value="${MetricUnits[i]["id"]}">${MetricUnits[i]["label"]} (${MetricUnits[i]["symbol"]}) (${MetricUnits[i]["base_10"]})</option>`;
		} else {
			select.innerHTML += `<option value="${MetricUnits[i]["id"]}">${MetricUnits[i]["label"]} (${MetricUnits[i]["symbol"]}) (${MetricUnits[i]["base_10"]})</option>`;
		}
	}
	document.getElementById( element_id ).appendChild( select );
}

	// const metric_unit_ids = [
	// 	[ "eq-cfvr-voltage-units" , "milli" , render_equation_current_from_voltage_and_resistance ] ,
	// 	[ "eq-cfvr-resistance-units" , "one" , render_equation_current_from_voltage_and_resistance ] ,
	// 	[ "eq-cfmpicip-membrane-potential-units" , "milli" , render_equation_current_from_membrane_potential_ion_conductance_equalibrium_potential ] ,
	// 	[ "eq-cfmpicip-conductance-units" , "micro" , render_equation_current_from_membrane_potential_ion_conductance_equalibrium_potential ] ,
	// 	[ "eq-cfmpicip-equalibrium-potential-units" , "milli" , render_equation_current_from_membrane_potential_ion_conductance_equalibrium_potential ] ,
	// ];
function MetricUnitsSetupPageCommon( build_list ) {
	for ( let i = 0; i < build_list.length; ++i ) {
		_add_metric_units_dropdown_to_element_id(build_list[i][0], build_list[i][1], build_list[ i ][ 2 ] );
	}
}

function MetricUnitsSetupInputs( equations ) {
	for ( const equation_id in equations ) {
		for ( const operator in equations[equation_id].operators ) {

			// 1.) Setup Input Units
			let input_select = document.createElement("select");
			input_select.id = equations[equation_id].operators[operator].input.units.metric_selector_element_id
			input_select.onchange = equations[equation_id].render;
			input_select.default_index = _get_id_from_base_10( equations[equation_id].operators[operator].input.units.default_base10 );
			for (let i = 0; i < MetricUnits.length; ++i) {
				if (i === input_select.default_index) {
					input_select.innerHTML += `<option selected="selected" value="${MetricUnits[i]["id"]}">${MetricUnits[i]["label"]} (${MetricUnits[i]["symbol"]}) (${MetricUnits[i]["base_10"]})</option>`;
				} else {
					input_select.innerHTML += `<option value="${MetricUnits[i]["id"]}">${MetricUnits[i]["label"]} (${MetricUnits[i]["symbol"]}) (${MetricUnits[i]["base_10"]})</option>`;
				}
			}
			document.getElementById(equations[equation_id].operators[operator].input.units.element_id).appendChild(input_select);

			// 2.) Setup Desired Output Units
			let output_select = document.createElement("select");
			output_select.id = equations[equation_id].operators[operator].output.units.metric_selector_element_id
			output_select.onchange = equations[equation_id].render;
			output_select.default_index = _get_id_from_base_10(equations[equation_id].operators[operator].output.units.default_base10);
			for (let i = 0; i < MetricUnits.length; ++i) {
				if (i === output_select.default_index) {
					output_select.innerHTML += `<option selected="selected" value="${MetricUnits[i]["id"]}">${MetricUnits[i]["label"]} (${MetricUnits[i]["symbol"]}) (${MetricUnits[i]["base_10"]})</option>`;
				} else {
					output_select.innerHTML += `<option value="${MetricUnits[i]["id"]}">${MetricUnits[i]["label"]} (${MetricUnits[i]["symbol"]}) (${MetricUnits[i]["base_10"]})</option>`;
				}
			}
			document.getElementById(equations[equation_id].operators[operator].output.units.element_id).appendChild(output_select);

		}
	}
}

class ABCEquationWrapper {
	constructor ( options ) {
		if ( !renderMathInElement ) { alert( "we can't find katex.renderMathInElement()" ); return; }
		this.options = options;
		this.build();
		this.calculate();
	}
	build() {
		console.log("inside build()");

		// 1.) Build Display Latex Template String Placeholder Element
		// 2.) Build Display Pilot/Simple Template String Placeholder Element

		// 3.) Build HTML Input/Output Table


		// 4.) Parse Defined Operator HTML and Add to Input/Ouput Table as Text Input Fields with Metric Unit Selectors
		this.operator_elements = [ ...this.options.element.querySelectorAll("div.operator") ];
		this.operators = {};
		if (!this.operator_elements ) { return "no operators"; }
		for (let i = 0; i < this.operator_elements.length; ++i ) {

			console.log(this.operator_elements[i]);
			// a.) Parse Operator Attributes
			let operator_name = this.operator_elements[i].getAttribute("name");

			// b.) Parse Input and Output Fields
			let input = this.operator_elements[i].querySelector( "div.input" );
			if ( !input ) { return "no input on operator"; }
			let output = this.operator_elements[i].querySelector( "div.output" );
			if ( !output ) {
				output = document.createElement( "div" );
				output.className = "output";
				output.setAttribute( "default_base10" , input.getAttribute( "default_base10" ) );
				this.operator_elements[i].appendChild( output );
			}
			let input_units_name = input.getAttribute("unit_name");
			let input_default_value = parseFloat( input.getAttribute("default_value") );
			let input_default_base10 = parseInt( input.getAttribute("default_base10") );
			let output_default_base10 = parseInt( output.getAttribute("default_base10") );


			this.operators[operator_name] = {
				"input": {
					"element_id": "",
					"default_value": 0.0,
					"current_value": 0.0,
					"units": {
						"element_id": "",
						"metric_selector_element_id": "",
						"default_base10": -3,
						"current_base10": 0,
						"current_label": ""
					}
				},
				"output": {
					"units": {
						"element_id": "",
						"metric_selector_element_id": "",
						"default_base10": -3,
						"current_base10": 0,
						"current_label": "",
						"conversion_latex_string": ""
					},
					"adjusted_value": 0.0
				}
			}
			console.log(input_units_name, input_default_value, input_default_base10, output_default_base10);

			// c.) Add to Input/Ouput Table

		}

		// 5.) Build Live Latex Template String Placeholder Element
		// 6.) Build Live Pilot/Simple Template String Placeholder Element

	}
	calculate () {
		console.log("inside calculate()");
		// ElementID + CalculationFunction
		eval("CurrentExample1CalculationFunction").call( this );
	}
	render() {

	}
}

function ABCEquationsHookDIVS() {
	console.log("ABCEquationsHookDIVS()");
	let equations = document.querySelectorAll("div.abc-equation");
	for ( let i = 0; i < equations.length; ++i ) {
		let wrapper = new ABCEquationWrapper({
			element: equations[i] ,
		});
		GLOBAL_EQUATION_WRAPPERS.push( wrapper );
	}
}

//let operators = JSON.parse( equations[i].querySelector("script.abc-operators-json").childNodes[0].data );

// ( () => {
// 	console.log( "here in mus.js" );
// 	let equations = document.querySelectorAll( "div.abc-equation" );
// 	for ( let i = 0; i < equations.length; ++i ) {
// 		console.log( equations[i].name );
// 	}
// })();