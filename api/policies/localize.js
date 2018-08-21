module.exports = function(req, res, next) {
	var locale = req.getLocale();

	req.setLocale(req, locale);
	next();
};