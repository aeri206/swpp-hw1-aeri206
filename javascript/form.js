const item = {
  email : `characters@characters.domain (characters other than @ or whitespace followed by an @ sign, followed by more characters (not '@', '.', or whitespace: co.kr is not allowed in this case), and then a ".". After the ".", you can only write 2 to 3 letters from a to z).`,
  password: `Must contain at least one number and one uppercase and one lowercase letter, and at least 8 or more characters`,
  password_confirmation: `Must match password`,
  phone_number: ` nnn-nnnn-nnnn: three numbers, then "-", followed by four numbers and a "-", then four numbers.`,
  fname: `Start with a capital letter, followed by one or more lowercase letters. Should only contain alphabets (A-Z, a-z)`,
  lname: `Start with a capital letter, followed by one or more lowercase letters. Should only contain alphabets (A-Z, a-z)`,
  age: `Must be a number between 0 and 200 (inclusive).`,
  birth_month: `Must be one of "January", "February", ..., "December"`,
  birth_day: `Must be a number of one or two digits.`,
  birth_year: `Must be a number between 1800 and 2018 (inclusive).`
};

const MONTH = ["January", "February","March", "April","May","June","July","August","September","October","November","December"];
class Form {
    constructor(
      email,
      password,
      password_confirmation,
      phone_number,
      fname,
      lname,
      age,
      birth_month,
      birth_day,
      birth_year) {
        this.email = email;
        this.password = password;
        this.password_confirmation = password_confirmation;
        this.phone_number = phone_number;
        this.fname = fname;
        this.lname = lname;
        this.age = age;
        this.birth_month = birth_month;
        this.birth_day = birth_day;
        this.birth_year = birth_year;
      }
    // TODO: You may fill in functions in the class.

  }

  (() => {
    Object.keys(item).forEach(id => {
      const replace_id = id.replace("_","-");
      document.querySelector(`label#${replace_id}-label`).title = item[id];
    })
  })();

  var but = document.createElement('button');
  but.innerHTML = "Check";
  but.onclick = function() {
      const input_value = {};
      Object.keys(item).forEach(id => {
        const replace_id =  id.replace("_","-");
        input_value[id]= document.forms["form"][replace_id].value;
      });
      // TODO: Fill in the rest of the function. Use the Form class defined above

      var form;

      let alertMessage = test(input_value);
      // TODO: Fill the alert message according to the validation result by following the form in README.md.
      alert(alertMessage);


      // Hint: you can use the RegExp class for matching a string with the `test` method.

      // Hint: you can set contents of elements by finding it with `document.getElementById`, and fixing the `innerHTML`.
      // Hint: modify 'title' attribute of each label to display your message
      // Hint: Ask Google to do things you don't know yet! There should be others who have already done what you are to encounter.
  };
  document.body.appendChild(but);


  const ERROR = {
    email: email => {
      const splitMail = email.split("@");
      if (splitMail.length !== 2) return true;
      const user_name = splitMail[0]
      if (user_name.includes(" ") || user_name.replace(/\s/gi, "").length === 0) return true;
      const domain = splitMail[1];
      const splitDomain = domain.split(".");
      if (splitDomain.length !== 2) return true;
      if (splitDomain[0].includes(" ") || splitDomain[0].replace(/\s/gi, "").length === 0) return true;
      return (!/^[a-z]{2,3}$/.test(splitDomain[1]));
    },
    pwd: pwd => {
      if (pwd.length < 8) return true;
      const ok = /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd);
      return !ok;
    },
    pwd_confirm: (pwd, pwd_confirm) => pwd !== pwd_confirm,
    phone: phone => {
      const regPhone = new RegExp("^[0-9]{3}-[0-9]{4}-[0-9]{4}$");
      return (!regPhone.test(phone));
    },
    name: name => {
      const regName = new RegExp("^[A-Z][a-z]+$");
      return (!regName.test(name));
    },
    age: age => (age < 0 || age > 200 || isNaN(parseInt(age))),
    b_month: month => !MONTH.includes(month),
    b_day: day => {
      const regDay = new RegExp("^[0-9]{1,2}$");
      return (!regDay.test(day));
    },
    b_year: year => (year < 1800 || year > 2018)
  };

  const toggleLabel = (id, ok) => {
    if (ok) document.querySelector(`label#${id}-label`).innerText = "X";
    else document.querySelector(`label#${id}-label`).innerText = "";
  };

  const test = (input) => {
    let msg = "";

    if (ERROR.email(input.email)) {
      msg = msg.concat("Email\n");
      toggleLabel("email", true);
    }
    else toggleLabel("email", false);

    if (ERROR.pwd(input.password)) {
      msg = msg.concat("Password\n");
      toggleLabel("password", true);
    } 
    else toggleLabel("password", false);

    if (ERROR.pwd_confirm(input.password, input.password_confirmation)) {
        msg = msg.concat("Password Confirmation\n");
        toggleLabel("password-confirmation", true);
    }
    else toggleLabel("password-confirmation", false);

    if (ERROR.phone(input.phone_number)) {
        msg = msg.concat("Phone number\n");
        toggleLabel("phone-number", true);
    }
    else toggleLabel("phone-number", false);

    if (ERROR.name(input.fname)) {
        msg = msg.concat("First name\n");
        toggleLabel("fname", true);
    }
    else toggleLabel("fname", false);

    if (ERROR.name(input.lname)) {
        msg = msg.concat("Last name\n");
        toggleLabel("lname", true);
    }
    else toggleLabel("lname", false);

    if (ERROR.age(input.age)) {
        msg = msg.concat("Age\n");
        toggleLabel("age", true);
    }
    else toggleLabel("age", false);

    if (ERROR.b_month(input.birth_month)) {
        msg = msg.concat("Month\n");
        toggleLabel("birth-month", true);
    }
    else toggleLabel("birth-month", false);

    if (ERROR.b_day(input.birth_day)) {
        msg = msg.concat("Day\n");
        toggleLabel("birth-day", true);
    }
    else toggleLabel("birth-day", false);

    if (ERROR.b_year(input.birth_year)) {
        msg = msg.concat("Year\n");
        toggleLabel("birth-year", true);
    }
    else toggleLabel("birth-year", false);

    if (msg.length === 0) return "Successfully Submitted!";
    else return ("You must correct:\n\n".concat(msg));
  };