ComboBox-plugin
===============

To use the combobox plugin just include the 'combobox.js' and 'combobox.css' files in your html. Once this is done, whenever you want to use the combobox to convert your text input or select box into a combobox just create a new combobox object and pass the parameters as mentioned below.

var cbox = new ComboBox('elem_id', data)

elem_id is mandatory and is the id of your input element or select box.

data is optional and can have two types of values:
1. Array of strings like, ['rohit', 'sagar', 'abhishek']
2. An api url like, http://mytestserver:3000/api/users
   The api must return an array of strings that can be used.
