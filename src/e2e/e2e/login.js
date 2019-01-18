import { Selector } from 'testcafe';
import config from './config';

export async function openFunnelLoginScreen(t, site) {
    const mijnBtn = Selector(site.buttons.selectors.MIJNACCOUNT);

    const funnelRegisterScreen = Selector(site.screens.selectors.FUNNEL_REGISTER);
    const funnelLoginScreen = Selector(site.screens.selectors.FUNNEL_LOGIN);
    const funnelRegisterScreenLoginLink = Selector(site.links.selectors.FUNNEL_REGISTER__LOGIN);

    await mijnBtn.with({ visibilityCheck: true })();
    console.log('aaa', funnelRegisterScreen);
    await t
        .wait(5000)
        // .expect(mijnBtn.visible).ok()
        // .expect(mijnBtn.exists)
        .click(mijnBtn)
        .expect(funnelRegisterScreen.exists)
        .ok("Funnel register screen wasn't opened")
        .click(funnelRegisterScreenLoginLink)
        .expect(funnelLoginScreen.exists)
        .ok("Funnel login screen wasn't opened")
}

export async function openRegularLoginScreen(t, site) {
    const loginScreen = Selector(site.screens.selectors.LOGIN);
    const mijnBtn = Selector(site.buttons.selectors.MIJNACCOUNT);

    await t
        .expect(mijnBtn.visible).ok()
        .click(mijnBtn)
        .expect(loginScreen.exists)
        .ok("Login screen wasn't opened")
}

export async function loginFromLoginScreen(t, site, userCredantials) {
    const inputEmail = site.funnelFirst ? Selector(site.forms.inputs.FUNNEL_EMAIL) : Selector(site.forms.inputs.EMAIL);
    const inputPassword = site.funnelFirst ? Selector(site.forms.inputs.FUNNEL_PASSWORD) : Selector(site.forms.inputs.PASSWORD);
    const loginButton = site.funnelFirst ? Selector(site.buttons.selectors.FUNNEL_LOGIN) : Selector(site.buttons.selectors.LOGIN);
    const mijnBtnLogged = Selector(site.buttons.selectors.MIJNACCOUNT_LOGGED);

    await t
        .typeText(inputEmail, userCredantials.email)
        .typeText(inputPassword, userCredantials.password)
        .click(loginButton);

    if (site.funnelFirst) {

        await t
            .expect(mijnBtnLogged.textContent)
            .contains(
                site.buttons.text.MIJNACCOUNT_LOGGED,
                `Sanoma regularLogin button doesn't contain ${site.buttons.text.MIJNACCOUNT_LOGGED} contains ${mijnBtnLogged.textContent}`
            )
    } else {

        await t
            .expect(mijnBtnLogged.textContent)
            .contains(
                site.buttons.text.MIJNACCOUNT_LOGGED,
                `Sanoma regularLogin button doesn't contain ${site.buttons.text.MIJNACCOUNT_LOGGED} contains ${mijnBtnLogged.textContent}`
            );
    }
}


export async function changeEmail(t, site, emeilData) {

    const profileDetailsButton = Selector(site.buttons.selectors.PROFILE_DETAILS);
    const profileProfileUpdateScreen = Selector(
        site.screens.selectors.UPDATE_PROFILE
    );
    const inputProfileEmail = Selector(
        site.forms.inputs.PROFILE_DETAILS_EMAIL
    );

    await t
        .click(profileDetailsButton)
        .expect(profileProfileUpdateScreen.exists)
        .ok('Profile update screen wasn`t opened')
        .typeText(
            inputProfileEmail,
            emeilData.email,
            { replace: true }
        )
        .expect(emeilData.selector.textContent)
        .contains(
            emeilData.message,
            `Funnel Error ${emeilData.message} isn\'t visible`
        );
}
