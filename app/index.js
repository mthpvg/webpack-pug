require('./main.css');

var $ = require('jquery');

$('body').append('<div>Webpack Jade Jquery</div>')

var component = require('./component');

document.body.appendChild(component());
