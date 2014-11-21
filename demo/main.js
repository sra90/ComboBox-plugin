
var search = new ComboBox('search', ['practo','doc','Practo doctors', 'doctor', 'patient', 'Patients']);
var username = new ComboBox('username', ['rohit', 'sagar', 'abhishek', 'rohit_satya']);
var gender = new ComboBox('gender', ['Other']);

//var search = new ComboBox('search', "http://localhost:3000/api");

var thanks = function(event){

	event.preventDefault();

	alert('Hope you enjoyed the ComboBox demo.');

}
