export const isValid = (data) => {
    if (typeof data !== "string" || data.trim().length === 0) return false;
    if (typeof data === "undefined" || data === null) return false;
    return true;
  };


export const validString = (input) => {
    return /^[a-zA-Z\s]+$/.test(input)
}

export const validateEmail = (email) => {
    return email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
};


export const isValidReqBody = (value) => {
    return Object.keys(value).length > 0
}

export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
};


export const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberString = phoneNumber.toString();
    const cleanPhoneNumber = phoneNumberString.replace(/\D/g, '');
    return /^(?:\+?\d{1,3}[-\s]?)?\d{10}$/.test(cleanPhoneNumber);
  };
  