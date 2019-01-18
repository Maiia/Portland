/**
----------
Test Scenario "test_MyAccountButton"
----------
Preconditions:
For the test we should have access to the My Account page on staging environment:

Steps:
1. Open {$url}
2. Check that My Account button displays on the page

Expected Result:
----------------
All elements should be present on the page

[FAIL]
 -  elements are not visible

----------
Test Scenario "test_LoginFlow":
----------
Preconditions:
For the test we should have access to the My Account page on staging environment:

Steps:
1. Open {$url}
2. Check that get_my_account_button_username() == Voorname
2. Click on My Account button
3. In login popup window click on Login tab
4. Please fill the fields with with parameters:
    - E-mailadres: denys.poloka@sanoma.com
    - Wachtwoord = 123123qa
5. Press the button INLOGGEN
6. Verify that the my account buttons shows the users name

Expected Result:
----------------
All elements should be present on the page

[FAIL]
 -  elements are not visible

----------
Test Scenario "test_change_email_into_existing":
----------
Preconditions:
For the test we should create a user with activated/unactivated e-mails:
 - sanomadefault (checksan1+verified@gmail.com)
 - whitelabel (checksan1+unferified@gmail.com)
 - password: 123123qa

Steps:
1. Login with credentials (checksan1@gmail.com)
2. Go to 'Mijn gegevens' tab
3. Change email into "checksan1+verified@gmail.com" (existing account - activated)
4. Assume: error message "Het ingevoerde e-mailadres is al in gebruik" is displayed
5. Change email into email0 (existing account - not activated)
6. Assume: error message "Het ingevoerde e-mailadres is al in gebruik" is displayed

Expected Result:
----------------
Error message "Het ingevoerde e-mailadres is al in gebruik" is displayed

[FAIL]
Error message "Het ingevoerde e-mailadres is al in gebruik" is not displayed
**/

import { Selector } from 'testcafe';
import config from './config';
import { openFunnelLoginScreen, openRegularLoginScreen, loginFromLoginScreen, changeEmail } from './login';

config.sites.forEach(site => {
    fixture`${site.name}`.page`${site.url}`;

    const mijnBtn = Selector(site.buttons.selectors.MIJNACCOUNT);
    const mijnBtnLogged = Selector(site.buttons.selectors.MIJNACCOUNT_LOGGED);


    const profileDetailsScreen = Selector(site.screens.selectors.PROFILE_DETAILS);

    const userCredentials = {
        email: config.DEFAULT_USER_EMAIL,
        password: config.DEFAULT_USER_PASSWORD
    };

    const emeilExistingData = {
        email: config.DEFAULT_USER_EMAIL_VERIFIED,
        selector: Selector(site.errors.selectors.EMAIL_USED),
        message: site.errors.text.EMAIL_USED
    };

    const emeilUnexistingData = {
        email: config.UNEXISTING_USER_EMAIL,
        selector: Selector(site.forms.messages.selectors.EMAIL_PENDING),
        message: site.forms.messages.text.EMAIL_PENDING
    };

/*    test('My account button exists', async t => {
        await t
            .expect(mijnBtn.exists)
            .ok("Funnel Button doesn't exists")
            .expect(mijnBtn.textContent)
            .contains(
                site.buttons.text.MIJNACCOUNT,
                `Funnel Sanoma button doesn't contains ${site.buttons.text.MIJNACCOUNT}`
            );
    });*/

/*    test('User log in into SA', async t => {
        if (site.funnelFirst) {
            await openFunnelLoginScreen(t, site);
        } else {
            await openRegularLoginScreen(t, site);
        }
        await loginFromLoginScreen(t, site, userCredentials);
    });*/

/*    test('Funnel Change email into existing', async t => {

        if (site.funnelFirst) {
            const mijnAccountMenu = Selector(site.buttons.selectors.MIJNACCOUNT_MENU);

            // Login into account
            await openFunnelLoginScreen(t, site);
            await loginFromLoginScreen(t, site, userCredentials);

            // Change email into existing
            await t
                .click(mijnBtnLogged)
                .click(mijnAccountMenu)
                .expect(profileDetailsScreen.exists)
                .ok("Funnel Profile details screen wasn't opened");

        } else {
            const mijnAccountLogged = Selector(site.buttons.selectors.MIJNACCOUNT_LOGGED);

            // Login into account
            await openRegularLoginScreen(t, site);
            await loginFromLoginScreen(t, site, userCredentials);

            // Change email into existing
            await t
                .click(mijnAccountLogged)
                .expect(profileDetailsScreen.exists)
                .ok("Profile details screen wasn't opened");
        }

        await changeEmail(t, site, emeilExistingData);
    });*/

/*    test('Funnel Change email into unexisting', async t => {

        if (site.funnelFirst) {
            const mijnAccountMenu = Selector(site.buttons.selectors.MIJNACCOUNT_MENU);

            await openFunnelLoginScreen(t, site, userCredentials);

            await t
                .click(mijnBtnLogged)
                .click(mijnAccountMenu)
                .expect(profileDetailsScreen.exists)
                .ok("Funnel Profile details screen wasn't opened");

        } else {
            const mijnAccountLogged = Selector(site.buttons.selectors.MIJNACCOUNT_LOGGED);

            await openRegularLoginScreen(t, site, userCredentials);

            await t
                .click(mijnAccountLogged)
                .expect(profileDetailsScreen.exists)
                .ok("Profile details screen wasn't opened");
        }

        await loginFromLoginScreen(t, site, userCredentials);
        await changeEmail(t, site, emeilUnexistingData);
    });*/



test('Facebook login flow', async t => {
    const cookiesbarScreen = Selector(config.general.screens.selectors.cookiebar);
    const acceptCookieButton = Selector(config.general.buttons.selectors.acceptCookie);
    const facebookLoginButton = Selector(config.general.buttons.selectors.facebookLogin);

    await t
        .expect(cookiesbarScreen.visible).ok()
        .click(acceptCookieButton)
        .expect(cookiesbarScreen.exists).notOk("Cookies bar wasn't closed");

    if (site.funnelFirst) {
        await openFunnelLoginScreen(t, site);
    } else {
        await openRegularLoginScreen(t, site);
    }

    await t
        .expect(facebookLoginButton.exists).ok("Facebook button doesn't exist");


});


});
