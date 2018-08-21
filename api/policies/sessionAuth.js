module.exports = function(req, res, next) {
	req.isLogin = req.session && !!req.session.profile;
	res.locals.isLogin = req.isLogin;

	if (!req.isLogin && (req.cookies.UPRO_NP || req.cookies.UPRO_WB || req.cookies.UPRO_Q)) {
		var path = req.url;
		res.redirect('/user/autologin/?path=' +  encodeURIComponent(path));
	} else {
		next();
	}

};
