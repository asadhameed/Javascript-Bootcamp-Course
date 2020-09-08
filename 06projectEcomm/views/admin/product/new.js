
// const layout = require('../layout');
// const {getError}= require('../../helpers')
// module.exports = ({errors})=>{

//     return layout({
//         content:`
//             <form method="POST" enctype="multipart/form-data">
//                 <div>
//                     <input name="title" placeholder="Product Name" />
//                     ${getError(errors, 'title')}
//                 </div>
//                 <div>
//                     <input name="price" placeholder="Product price" />
//                     ${getError(errors, 'price')}
//                 </div>
//                 <div>
//                     <input type="file" name="image" />
//                 </div>
//                 <div>
//                     <button> Submit </button>
//                 </div>
//             </form>
          
//         `
//     });

// }


const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
  return layout({
    content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Create a Product</h1>

          <form method="POST" enctype="multipart/form-data">
            <div class="field">
              <label class="label">Title</label>
              <input class="input" placeholder="Title" name="title">
              <p class="help is-danger">${getError(errors, 'title')}</p>
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input class="input" placeholder="Price" name="price">
              <p class="help is-danger">${getError(errors, 'price')}</p>
            </div>
            
            <div class="field">
              <label class="label">Image</label>            
              <input type="file" name="image" />
            </div>
            <br />
            <button class="button is-primary">Create</button>
          </form>
        </div>
      </div>
    `
  });
};
