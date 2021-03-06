exports.signupFieldsValid = (data) => {
    let errors = [];

    if (data) {
       
        if (!data.username) {
            errors.push('Missing username field');
        }
        if (!data.email) {
            errors.push('Missing email field');
        }
        
        if (!data.password) {
            errors.push('Missing password field');
        }
        if (!data.re_password) {
            errors.push('Missing confirm password field');
        }
        

        if (errors.length) {
            return { success: false, msg: 'Fields are missing', data: data, errors: errors.join(',')};
        } else {
            return { success: true, msg: 'Fields are valid', data: data, errors: errors.join(',')};
        }
    } else {
        return res.status(400).send({ success: false, msg: 'Fields are missing', data: data, errors: 'Fields are missing'});
    }
};