const render = require("../../render")

const assert = require('assert')
it('Test for index.html', async () => {
    const dom = await render('/sampleweb/index.html');
    const { document } = dom.window;
    const input = document.querySelector('input');
    assert(input)

})

it('Show message with a valid email', async () => {
    const dom = await render('/sampleweb/index.html');
    const { document } = dom.window;
    const input = document.querySelector('input');
    input.value = "my@mail.com";
    document.querySelector('form')
        .dispatchEvent(new dom.window.Event('submit'));
    h1 = document.querySelector('h1');

    assert(h1.innerHTML, 'This is valid email!')
    //assert(input)

})


it('Show message with a invalid email', async () => {
    const dom = await render('/sampleweb/index.html');
    const { document } = dom.window;
    const input = document.querySelector('input');
    input.value = "my.com";
    document.querySelector('form')
        .dispatchEvent(new dom.window.Event('submit'));
    h1 = document.querySelector('h1');
    assert(h1.innerHTML, 'invalid email')
    //assert(input)

})