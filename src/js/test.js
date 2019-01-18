import { Selector } from 'testcafe';

fixture `Getting Started`
    // .page `../index.html`;
    // .page `http://devexpress.github.io/testcafe/example`;
    .page `https://www.nu.nl/`;

test('My first test', async t => {
    await t
        .typeText('html', 'John Smith')
        // .click('#submit-button')
        // .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});
