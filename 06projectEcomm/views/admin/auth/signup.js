// const layout = require('../layout');
// const { get } = require('../../../router/admin/auth');
// const {getError}=require('../../helpers')

// module.exports = ({ req,errors }) => {
//     return layout({
//         content: ` 
//         <div>
    
//         user id is ${ req.session.userID} <form method="POST">
//         <div>
//             <input name="email" placeholder="email" />
//             ${getError(errors,'email')}
//         </div>
//         <div>
//             <input name="password" placeholder="password" />
//             ${getError(errors,'password')}
//         </div>
//         <div>
//             <input name="passwordConfirmation" placeholder="Password confirmation" />
//             ${getError(errors,'passwordConfirmation')}
//         </div>
//         <button>Submit</button>
//     </form>
//     </div>`
//     });
// }

const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ req, errors }) => {
  return layout({
    content: `
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <form method="POST">
              <h1 class="title">Sign Up</h1>
              <div class="field">
                <label class="label">Email</label>
                <input required class="input" placeholder="Email" name="email" />
                <p class="help is-danger">${getError(errors, 'email')}</p>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <input required class="input" placeholder="Password" name="password" type="password" />
                <p class="help is-danger">${getError(errors, 'password')}</p>
              </div>
              <div class="field">
                <label class="label">Password Confirmation</label>
                <input required class="input" placeholder="Password Confirmation" name="passwordConfirmation" type="password" />
                <p class="help is-danger">${getError(
                  errors,
                  'passwordConfirmation'
                )}</p>
              </div>
              <button class="button is-primary">Submit</button>
            </form>
            <a href="/signin">Have an account? Sign In</a>
          </div>
        </div>
      </div>
    `
  });
};
