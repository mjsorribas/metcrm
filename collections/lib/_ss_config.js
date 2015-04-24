SimpleSchema.RegEx.Phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

SimpleSchema.messages({
  regEx: [
    {exp: SimpleSchema.RegEx.Phone, msg: "[label] must be a valid phone number"}
  ]
});