//universal function to update the battery percentage and color based on any input type that calls the function
function updateBattery(input) {
	let battery = document.querySelector("my-battery");
	battery.setAttribute("value", input.value);

	//changing the sliders value to match the battery value changed with the buttons
	let slider = document.querySelector('input[type="range"]');
	slider.value = input.value;

	//setting the color of the battery based on input value
	input.value < 26
		? battery.setAttribute("color", "red")
		: input.value < 60
		? battery.setAttribute("color", "orange")
		: input.value < 80
		? battery.setAttribute("color", "yellow")
		: battery.setAttribute("color", "green");
}
