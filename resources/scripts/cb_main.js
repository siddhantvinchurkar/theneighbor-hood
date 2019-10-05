window.onload = function () {

	// Set footer date
	$('#footerYear').html(new this.Date().getFullYear());

	// Initialize materialize components
	$('.parallax').parallax();
}