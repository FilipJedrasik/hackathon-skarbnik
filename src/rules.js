//import Vue from 'vue'

const capitalPolishWord = /^[A-Z][a-z,ąćęóźśłżń]+$/;
const capitalPolishLastname = /^[A-Z][a-z,ąćęóźśłżń-]+$/;

// Vue.mixin({
//   data: () => ({
//     notEmptyRules: [
//       v => !!v || 'To pole jest wymagane'
//     ],
//     classnameRules:[
//       v => v && v.length >= 3 || "Za krótka nazwa klasy",
//       v => v && /\d[A-Z]+\d$/.test(v) || "Błędna nazwa klasy"
//     ],
//     nameRules: [
//       v => !!v || 'Imię i nazwisko jest wymagane',
//       v => (v && v.length >= 5) || 'Imię i nazwisko musi mieć conajmniej 7 znaków',
//       v => {
//         if(v !== null){
//           const parts = v.split(' ');
//           if(parts.length !== 2){
//             return 'Błędna forma';
//           }
//
//           if(!capitalPolishWord.test(parts[0]) || !capitalPolishLastname.test(parts[1])){
//             return 'Błędna forma';
//           }
//
//           return true;
//         } else {
//           return 'Imię i nazwisko jest wymagane';
//         }
//       }
//     ],
//     loginRules: [
//       v => !!v || 'Login jest wymagany',
//       v => (v && v.length >= 5) || 'Login musi mieć conajmniej 5 znaków'
//     ],
//     passwordRules: [
//       v => !!v || 'Hasło jest wymagane',
//       v => (v && v.length >= 8) || 'Hasło musi mieć conajmniej 8 znaków',
//       v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || 'Hasło musi być silniejsze!'
//     ],
//     emailRules: [
//       v => !!v || 'E-mail jest wymagany',
//       v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail musi być poprawny'
//     ]
//   })
// });

export default {
  notEmptyRules: [
    v => !!v || 'To pole jest wymagane'
  ],
  classnameRules:[
    v => v && v.length >= 3 || "Za krótka nazwa klasy",
    v => v && /\d[A-Z]+\d$/.test(v) || "Błędna nazwa klasy"
  ],
  nameRules: [
    v => !!v || 'Imię i nazwisko jest wymagane',
    v => (v && v.length >= 5) || 'Imię i nazwisko musi mieć conajmniej 5 znaków',
    v => {
      if(v !== null){
        const parts = v.split(' ');
        if(parts.length !== 2){
          return 'Błędna forma';
        }

        if(!capitalPolishWord.test(parts[0]) || !capitalPolishLastname.test(parts[1])){
          return 'Błędna forma';
        }

        return true;
      } else {
        return 'Imię i nazwisko jest wymagane';
      }
    }
  ],
  loginRules: [
    v => !!v || 'Login jest wymagany',
    v => (v && v.length >= 5) || 'Login musi mieć conajmniej 5 znaków'
  ],
  passwordRules: [
    v => !!v || 'Hasło jest wymagane',
    v => (v && v.length >= 8) || 'Hasło musi mieć conajmniej 8 znaków',
    v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || 'Hasło musi być silniejsze!'
  ],
  emailRules: [
    v => !!v || 'E-mail jest wymagany',
    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail musi być poprawny'
  ]
};