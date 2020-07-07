var bcrypt = require('bcryptjs'),
    User   = require('../../models/user');
module.exports = {
    GetSignUpPage: (req , res) => {
        var messages = req.flash('error');
        res.render('pages/users/signup' , {
            messages: messages
        });
    },
    PostSignUpPage: (req, res) => {
        const { username, email, password, repassword } = req.body;
        let errors = [];
        if (!username || !email || !password || !repassword) {
          errors.push({ msg: 'Please enter all fields' });
        }
        if (password != repassword) {
          errors.push({ msg: 'Passwords do not match' });
        }
        if (password.length < 6) {
          errors.push({ msg: 'Password must be at least 6 characters' });
        }
        if (errors.length > 0) {
          res.render('pages/users/signup', {
            errors, username, email, password, repassword
          });
        } else {
          User.findOne({
            $or: [{
              username: username,
              email: email,
              password: password
            }]
          }).then(user => {
            if (user) {
              errors.push({ msg: 'Email or username or password already exists' });
              res.render('pages/users/signup', {
                  errors, username, email, password, repassword
              });
            }else {
              const newUser = new User({ username, email, password });
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) {
                    errors.push({ msg: err.msg });
                  }
                  newUser.password = hash;
                  newUser.save().then(user => {
                      req.flash('success_msg',
                                'You are now registered successfully');
                      res.redirect('/');
                  }).catch(err => console.log(err));
                });
              });
            }
          });
        }
    }
}