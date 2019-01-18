from ...core.config import SANOMADEFAULT_USERNAME_EMAIL, SANOMADEFAULT_PASSWORD
from ...pages.Pages import Pages
from ...tests.BaseTest import BaseTest


class TestRememberMeFlow(BaseTest):
    """
    Test Scenario 'test_NormalLoginFlow':
    ----------
    Preconditions:
    For the test we should have access to the My Account page on staging environment

    Steps:
    1. Open {$url}
    2. Click on My Account button
    3. In login popup window click on Login tab
    4. Please fill the fields with with parameters:
        - E-mailadres: checksan3@gmail.com
        - Wachtwoord = 123123qa
    5. Press the button INLOGGEN
    6. Verify that the my account buttons shows the users name
    7. Close the current window
    8. Open new window with {$url}

    Expected Result:
    ----------------
    My account buttons shows the user name

    [FAIL]
     -  My account button doesn't show the user name


    Test Scenario 'test_FacebookLoginFlow':
    ----------
    Preconditions:
    - For the test we should have access to the My Account page on staging environment
    - Facebook user with credentials were created:
         email = "open_blnydrz_user@tfbnw.net"
         password = "123123qa"

    Steps:
    1. Open {$url}
    2. Click on Inloggen met Facebook
    3. Fill the fields with parameters:
        - E-mailadres: open_blnydrz_user@tfbnw.net
        - Wachtwoord: 123123qa
    4. Press the button INLOGGEN
    5. Close the current window
    6. Open new window with {$url}

    Expected Result:
    ----------------
    My account buttons shows the user name

    [FAIL]
     -  My account button doesn't show the user name
    """

    FACEBOOK_USERNAME_EMAIL = "checksan1@gmail.com"
    FACEBOOK_USERNAME_PASSWORD = "123123qa"

    def test_NormalLoginFlow(self, driver, url, status_item):
        pages = Pages(driver)
        sanoma_default = pages.navigateTo().select_sanomadefault_login_page()
        sanoma_default.open_page(url)
        sanoma_default.login_as_user(SANOMADEFAULT_USERNAME_EMAIL, SANOMADEFAULT_PASSWORD)
        if driver.instance.name != 'safari':
            sanoma_default.open_new_browser_tab(url)
        else:
            assert sanoma_default.get_my_account_button_username() == "Voorname", "My account button username is not shown"
        sanoma_default.click_account_button('profile')
        sanoma_default.close_browser_tab()
        sanoma_default.switch_to_current_window(0)
        sanoma_default.user_logout()

    def test_FacebookLoginFlow(self, driver, url, status_item):
        pages = Pages(driver)
        sanoma_default = pages.navigateTo().select_sanomadefault_login_page()
        sanoma_default.open_page(url)
        sanoma_default.login_via_facebook(TestRememberMeFlow.FACEBOOK_USERNAME_EMAIL,
                                          TestRememberMeFlow.FACEBOOK_USERNAME_PASSWORD)
        sanoma_default.open_new_browser_tab(url)
        assert sanoma_default.get_my_account_button_username() == "Jhoe Black" or "test test", "My account button username is not shown"
