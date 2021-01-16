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
  },
];

function _get_id_from_value_name(value_name) {
  for (let i = 0; i < MetricUnits.length; ++i) {
	if (MetricUnits[i].value === value_name) {
	  return i;
	}
  }
  return false;
}
function _get_id_from_base_10(base_10) {
  for (let i = 0; i < MetricUnits.length; ++i) {
	if (MetricUnits[i].base_10 === base_10) {
	  return i;
	}
  }
  return false;
}

// https://github.com/ben-ng/convert-units
// https://github.com/gentooboontoo/js-quantities
// https://www.contentful.com/blog/2017/04/04/es6-modules-support-lands-in-browsers-is-it-time-to-rethink-bundling/

// https://github.com/ben-ng/convert-units
// https://github.com/gentooboontoo/js-quantities
// https://github.com/nosferatoy/units-converter
// https://github.com/GhostWrench/pqm
// https://github.com/alanhussey/unit-system


// https://github.com/gentooboontoo/js-quantities
//let volt = Qty("1 volt")
// volt._units: "Volts"
//let t = Qty("1 Siemens")
//let t = Qty("1 microSiemens")
//t.to("yottaSiemens")

// let t_mol = Qty("1/mol"); // or qty.inverse();
// let gas_constant = Qty("joules/kelvin");
// gas_constant = gas_constant.mul(t_mol );
// gas_constant = gas_constant.mul("8.314");
// let gas_constant = Qty("8.314J/degK*mol")
// console.log( gas_constant );
// console.log( gas_constant.numerator );
// console.log( gas_constant.denominator );

function _build_metric_unit_selector_html_string( equations_global_index , base10 , class_name ) {
	let html_string = `<select onchange="GLOBAL_EQUATION_WRAPPERS[ ${equations_global_index} ].metricUnitsUpdate(this)" class="${class_name}">`;
	let default_index = _get_id_from_base_10( base10 );
	for ( let i = 0; i < MetricUnits.length; ++i ) {
		if ( i === default_index ) {
			html_string += `<option selected="selected" value="${MetricUnits[i]["id"]}">${MetricUnits[i]["label"]} (${MetricUnits[i]["symbol"]}) (${MetricUnits[i]["base_10"]})</option>`;
		} else {
			html_string += `<option value="${MetricUnits[i]["id"]}">${MetricUnits[i]["label"]} (${MetricUnits[i]["symbol"]}) (${MetricUnits[i]["base_10"]})</option>`;
		}
	}
	html_string += "</select>"
	return html_string;
}

class ABCEquationWrapper {
	constructor( options ) {
		console.log( "constructor()" );
		if ( !renderMathInElement ) { alert( "we can't find katex.renderMathInElement()" ); return; }
		this.options = options;
		this.build();
		this.calculate();
		this.render();
	}
	build() {
		console.log( "build()" );

		// 0.)
		this.operator_elements = [ ...this.options.element.querySelectorAll( "div.operator" ) ];
		let our_position_in_global_equations = GLOBAL_EQUATION_WRAPPERS.length;

		// TO ADD
		// Options Table or some options area where you select to display "show pilot string" , "show inputs" , "show slider" , "show text input" , "calculate different outputBase10 scale" , "show final value"
		// THen we just need to build pilot strings, and I think its ready
		// no copy and paste ...
		// we have to clean up both current equations

		// 1.) Start Building HTML Input/Output Table HTML String
		this.io_table_element = document.createElement( "table" );
		let io_table_html_string = "<tr><th>Name</th><th>Input Value</th><th>Input Base10</th><th>Unit Name</th><th>Output Base10</th><th>Final Value</th></tr>";

		// 2.) Parse Defined Operator HTML and Add to Input/Ouput Table as Text Input Fields with Metric Unit Selectors
		this.operator_elements = [ ...this.options.element.querySelectorAll( "div.operator" ) ];
		if ( !this.operator_elements ) { return "no operators"; }
		this.operators = [];
		for ( let i = 0; i < this.operator_elements.length; ++i ) {
			// console.log( this.operator_elements[ i ] );

			// a.) Parse Operator Attributes
			let operator_name = this.operator_elements[ i ].getAttribute( "name" );

			// b.) Parse Input and Output Fields
			let input_element = this.operator_elements[ i ].querySelector( "div.input" );
			if ( !input_element ) { return "no input on operator"; }
			let output_element = this.operator_elements[ i ].querySelector( "div.output" );
			if ( !output_element ) {
				output_element = document.createElement( "div" );
				output_element.className = "output";
				output_element.setAttribute( "default_base10" , input_element.getAttribute( "default_base10" ) );
				this.operator_elements[ i ].appendChild( output_element );
			}
			let input_units_name = input_element.getAttribute( "unit_name" );
			let input_default_value = parseFloat( input_element.getAttribute( "default_value" ) );
			let input_default_base10 = parseInt( input_element.getAttribute( "default_base10" ) );
			let input_slider_min = parseFloat( input_element.getAttribute( "slider_min" ) );
			let input_slider_max = parseFloat( input_element.getAttribute( "slider_max" ) );
			let input_slider_step = parseFloat( input_element.getAttribute( "slider_step" ) );
			let output_default_base10 = parseInt( input_element.getAttribute( "default_base10" ) );

			// console.log(
			// 	input_units_name ,
			// 	input_default_value ,
			// 	input_default_base10 ,
			// 	output_default_base10
			// );

			// c.) Build Input and Output Metric Selector Elements
			let input_metric_selector_html_string = _build_metric_unit_selector_html_string( our_position_in_global_equations , input_default_base10 , "input" );
			let output_metric_selector_html_string = _build_metric_unit_selector_html_string( our_position_in_global_equations , output_default_base10 , "output" );

			// d.) Add to Input/Ouput Table
			io_table_html_string += `<tr><td>${operator_name}</td>`;
			io_table_html_string += `<td><input onchange="GLOBAL_EQUATION_WRAPPERS[ ${our_position_in_global_equations} ].textInputUpdate(this)" class="text_input" style="width: 70px;" type="text" placeholder="${input_default_value}"></input>`;
			io_table_html_string += `<input onchange="GLOBAL_EQUATION_WRAPPERS[ ${our_position_in_global_equations} ].sliderInputUpdate(this)" class="range_slider" type="range" min="${input_slider_min}" max="${input_slider_max}" step="${input_slider_step}" defaultValue="${input_default_value}"></td>`;
			io_table_html_string += `<td class="metric-units">${input_metric_selector_html_string}</td>`;
			io_table_html_string += `<td>${input_units_name}</td>`;
			io_table_html_string += `<td class="metric-units">${output_metric_selector_html_string}</td>`;
			io_table_html_string += `<td><p class="adjusted-value"></p></td></tr>`;
			this.io_table_element.innerHTML = io_table_html_string;

		}

		this.options.element.appendChild( this.io_table_element );

		// 3.) Build Live Latex Template String Placeholder Element
		this.result_katex_element = document.createElement( "p" );
		this.options.element.appendChild( this.result_katex_element );

		// 4.) Build Live Pilot/Simple Template String Placeholder Element
		this.result_string_element = document.createElement( "p" );
		this.options.element.appendChild( this.result_string_element );

		// 5.) Force Update Range Slider ???
		let range_slider = this.options.element.querySelector( "input.range_slider" );
		// console.log( range_slider );
		range_slider.value = range_slider.getAttribute( "defaultValue" );
		range_slider.step = range_slider.getAttribute( "step" );

		//this.options.element.insertBefore( this.io_table_element , this.options.element.children[ this.options.element.children.length - 3 ] );

	}
	calculate() {
		console.log( "calculate()" );
		// Update The Global Equation Objects State to Match Inputs
		// All we did in sliderInputUpdate() and textInputUpdate() was sync all updates across similar inputs
		for ( let i = 0; i < this.operator_elements.length; ++i ) {

			// Capture Current State of Operator
			let operator_name = this.operator_elements[i].getAttribute( "name" )
			let input_value = this.options.element.querySelectorAll( "input.text_input" )[ i ].value || this.operator_elements[i].querySelector( "div.input" ).getAttribute( "default_value" );
			let input_units = MetricUnits[ this.options.element.querySelectorAll( "select.input" )[ i ].selectedIndex ];
			let input_unit_name = this.operator_elements[i].querySelector( "div.input" ).getAttribute( "unit_name" );
			let output_units = MetricUnits[ this.options.element.querySelectorAll( "select.output" )[ i ].selectedIndex ];
			let adjusted_value = input_value;
			let adjustment_latex_string = "";
			let adjustment_string = "";
			if ( input_units.base_10 !== output_units.base_10 ) {
				console.log( "Ouput Base10 is Different than Input Base10" );
				adjusted_value = ( ( input_value * ( 1 * 10**( input_units.base_10 - output_units.base_10 ) ) ) );
				adjustment_latex_string = String.raw` * \left(\ 1 * 10^{\left(\ \left(\ ${input_units.base_10}\ \right) - \left(\ ${output_units.base_10}\ \right) \ \right)}\ \right)`;
				adjustment_string = ` * ( 1 * 10^( ( ${input_units.base_10} ) - ( ${output_units.base_10} ) ) )`;
			}
			let final_latex_string = String.raw`${input_value}${adjustment_latex_string}\ ${output_units.label}\ ${input_unit_name}`;
			let final_string = `${input_value}${adjustment_string} ${output_units.label} ${input_unit_name}`;
			this.options.element.querySelectorAll( "p.adjusted-value" )[ i ].innerText = adjusted_value;
			this[ operator_name ] = {
				input: {
					value: input_value ,
					units: input_units ,
					unit_name: input_unit_name ,
				} ,
				output: {
					units: output_units ,
					adjusted_value: adjusted_value ,
					adjustment_latex_string: adjustment_latex_string ,
					adjustment_string: adjustment_string ,
					final_latex_string: final_latex_string ,
					final_string: final_string ,
				}
			};
		}
		let function_name = `${this.options.element.id}CalculationFunction`;
		console.log( `Calling: ${function_name}()` );
		eval( function_name ).call( this );
	}
	render() {
		console.log( "render()" );
		// console.log( this.result );
		// console.log( this.equation_live_string_latex );
		// console.log( this.equation_live_string );
		this.result_katex_element.innerText = this.equation_live_string_latex;
		this.result_string_element.innerHTML = `<center>${this.equation_live_string}</center>`;
		renderMathInElement( this.result_katex_element , { strict: "ignore" } );
	}
	metricUnitsUpdate( select ) {
		console.log( select );
		this.update();
	}
	textInputUpdate( input ) {
		// console.log( input.value );
		// Update Slider Value
		input.nextSibling.value = input.value;
		this.update();
	}
	sliderInputUpdate( slider ) {
		// console.log( slider.value );
		// Update Text Input Value
		slider.previousSibling.value = slider.value;
		this.update();
	}
	update() {
		console.log( "update()" );
		this.calculate();
		this.render();
	}
}

function ABCEquationsHookDIVS() {
	console.log( "ABCEquationsHookDIVS()" );
	let equations = document.querySelectorAll( "div.abc-equation" );
	for ( let i = 0; i < equations.length; ++i ) {
		let wrapper = new ABCEquationWrapper({
			element: equations[i] ,
		});
		GLOBAL_EQUATION_WRAPPERS.push( wrapper );
	}
}
