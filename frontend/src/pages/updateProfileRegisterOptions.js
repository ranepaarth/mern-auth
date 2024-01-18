const updateProfileRegisterOptions = {
  name: {
    required: "Enter your name",
    pattern: {
      value: /[a-zA-Z]/g,
      message: "Your name must be letters(uppercase or lowercase) only",
    },
  },
  email: {
    required: "Enter an Email address",
    pattern: {
      value: /^[a-z0-9.]+$/,
      message: "Avoid using uppercase letters or symbols.",
    },
  },
  password: {
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z!@#$%^&*()\-_=+{}[\];:'"<>,.?/|\\0-9`~]{8,}$/,
      message:
        "Only use letters(lowercase and uppercase), numbers and common punctuation characters",
    },
  },
};

export default updateProfileRegisterOptions;
