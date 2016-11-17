
var app = require('angular').module('theatreApp');
app.controller('MainController', require('./mainController'));
app.controller('MovieController', require('./movieController'));
app.controller('MappingController', require('./mappingController'));
app.controller('SeatsController', require('./SeatsController'));
app.controller('BookingController', require('./BookingController'));
app.controller('ConfirmController', require('./ConfirmController'));
app.controller('PaymentController', require('./PaymentController'));
app.controller('FeedbackController', require('./FeedbackController'));
//app.controller('LoginController', require('./LoginController'));
app.controller('LoginController', require('./loginController'));
app.controller('LogoutController', require('./logoutController'));
app.controller('RegisterController', require('./registerController'));
