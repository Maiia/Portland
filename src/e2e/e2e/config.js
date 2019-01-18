export default {
    DEFAULT_USER_EMAIL: 'denys.poloka@sanoma.com',
    DEFAULT_USER_PASSWORD: '123123qa',
    DEFAULT_USER_EMAIL_VERIFIED: 'romandatsyuk@gmail.com',
    UNEXISTING_USER_EMAIL: 'test.test@gmail.com',

    general: {
        screens: {
            selectors: {
                cookiebar: "#cookiebar_wrapper",
            }
        },
        buttons: {
            selectors: {
                acceptCookie: "#cookiebar_wrapper .accept-button",
                facebookLogin: "button[aria-label='Facebook']"
            }
        }
    },
    sites: [
        {
            name: 'nu.nl',
            url: 'https://nu.nl',
            funnelFirst: true,
            screens: {
                selectors: {
                    FUNNEL_REGISTER: '#sa-funnel-register',
                    FUNNEL_LOGIN: '#sa-funnel-login',
                    UPDATE_PROFILE: '#gigya-update-profile-screen',
                    PROFILE_DETAILS: '#gigya-profile-details-screen',
                    // screens.selectors.PROFILE_DETAILS

                },
                text: {

                },
            },
            buttons: {
                selectors: {
                    MIJNACCOUNT: '.btn.account',
                    MIJNACCOUNT_LOGGED: '.btn.account .firstname',
                    MIJNACCOUNT_MENU: '.btn.account .dropdown > li:first-child > a',
                    PROFILE_DETAILS: '#gigya-profile-details-screen .my-account-menu > ul > li:nth-child(3) > a',
                    FUNNEL_LOGIN: '#sa-funnel-login .btn__ir__submit',
                    FUNNEL_REGISTER__LOGIN: '#sa-funnel-register .login-link a',
                    // buttons.selectors.FUNNEL_REGISTER__LOGIN
                },
                text: {
                    MIJNACCOUNT: 'Mijn NU.nl',
                    MIJNACCOUNT_LOGGED: 'Den',
                    // buttons.text.MIJNACCOUNT_LOGGED

                }
            },
            links: {
                selectors: {
                    FUNNEL_REGISTER__LOGIN: '#sa-funnel-register .login-link a',
                    // links.selectors.FUNNEL_PASSWORD
                }
            },
            forms: {
                inputs: {
                    FUNNEL_EMAIL: '#sa-funnel-login input[type="email"]',
                    FUNNEL_PASSWORD: '#sa-funnel-login input[type="password"]',
                    PROFILE_DETAILS_EMAIL: '#gigya-update-profile-screen input[name="email"]',
                    // forms.inputs.PROFILE_DETAILS_EMAIL

                },
                messages: {
                    selectors: {
                        EMAIL_PENDING: 'span[data-template-condition="data.email_pending"]'
                    },
                    text: {
                        EMAIL_PENDING: 'Let op, we gebruiken nu nog jouw oude e-mailadres. Bevestig je nieuwe e-mailadres'
                    }
                }
            },
            errors: {
                text: {
                    EMAIL_USED: 'Deze e-mail wordt gebruikt door een ander account',
                },
                selectors: {
                    EMAIL_USED: '.sa-email-no-unique',
                }
                // errors.selectors.EMAIL_USED

            },
        },
        {
            name: 'fashionchick.nl',
            url: 'https://www.fashionchick.nl/',
            funnelFirst: false,
            screens: {
                selectors: {
                    REGISTER: '#gigya-register-screen',
                    LOGIN: '#gigya-login-screen',
                    UPDATE_PROFILE: '#gigya-update-profile-screen',
                    PROFILE_DETAILS: '#gigya-profile-details-screen',
                    // screens.selectors.REGISTER

                },
                text: {

                },
            },
            buttons: {
                selectors: {
                    MIJNACCOUNT: '.sanoma-account-button .sanoma-account-button__name',
                    MIJNACCOUNT_LOGGED: '.sanoma-account-button.login .sanoma-account-button__name',
                    // MIJNACCOUNT_MENU: '.btn.account .dropdown > li:first-child > a',
                    PROFILE_DETAILS: '#gigya-profile-details-screen .my-account-menu > ul > li:nth-child(3) > a',
                    LOGIN: '#gigya-login-screen .btn__ir__submit',
                    FUNNEL_REGISTER__LOGIN: '#sa-funnel-register .login-link a',
                    // buttons.selectors.FUNNEL_REGISTER__LOGIN
                },
                text: {
                    MIJNACCOUNT: 'Mijn account',
                    MIJNACCOUNT_LOGGED: 'Den',
                    // buttons.text.MIJNACCOUNT_LOGGED

                }
            },
            links: {
                selectors: {
                    FUNNEL_REGISTER__LOGIN: '#sa-funnel-register .login-link a',
                    // FUNNEL_EMAIL: '#sa-funnel-login input[type="email"]',
                    // FUNNEL_PASSWORD: '#sa-funnel-login input[type="password"]',
                    // links.selectors.FUNNEL_PASSWORD
                }
            },
            forms: {
                LOGIN_FORM: '.gigya-login-form',
                inputs: {
                    EMAIL: '#gigya-login-screen input[type="email"]',
                    PASSWORD: '#gigya-login-screen input[type="password"]',
                    PROFILE_DETAILS_EMAIL: '#gigya-update-profile-screen input[name="email"]',
                    // forms.inputs.PROFILE_DETAILS_EMAIL

                },
                messages: {
                    selectors: {
                        EMAIL_PENDING: 'span[data-template-condition="data.email_pending"]'
                    },
                    text: {
                        EMAIL_PENDING: 'Let op, we gebruiken nu nog jouw oude e-mailadres. Bevestig je nieuwe e-mailadres'
                    }
                }
            },
            errors: {
                text: {
                    EMAIL_USED: 'Deze e-mail wordt gebruikt door een ander account',
                },
                selectors: {
                    EMAIL_USED: '.sa-email-no-unique',
                }
                // errors.selectors.EMAIL_USED

            }
        }
    ]
};
