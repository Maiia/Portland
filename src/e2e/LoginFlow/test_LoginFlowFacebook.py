from ...pages.Pages import Pages
from ...tests.BaseTest import BaseTest

"""
Test Scenario:
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
5. Press the button INLOGGEN
6. Verify that the my account buttons shows the users name Open User

Expected Result:
----------------
User is able to login with Facebook credentials

[FAIL]
 -  User can't login
"""


class TestFacebookLoginFlow(BaseTest):
    FACEBOOK_USERNAME_EMAIL = "open_blnydrz_user@tfbnw.net"
    FACEBOOK_USERNAME__NEW_EMAIL = "linda_rhveyef_changberg@tfbnw.net"
    FACEBOOK_USERNAME_PASSWORD = "123123qa"

    def test_FacebookLoginFlow(self, driver, url, status_item):
        pages = Pages(driver)
        sanoma_default = pages.navigateTo().select_sanomadefault_login_page()
        sanoma_default.open_page(url)
        sanoma_default.login_via_facebook(TestFacebookLoginFlow.FACEBOOK_USERNAME_EMAIL, TestFacebookLoginFlow.FACEBOOK_USERNAME_PASSWORD)
        assert sanoma_default.get_my_account_button_username() == "Open User", "My account button username is not shown"
        sanoma_default.click_account_button('profile')
        sanoma_default.user_logout()

    def test_FacebookAccountCompletionScreen(self, driver, url, status_item):
        pages = Pages(driver)
        sanoma_default = pages.navigateTo().select_sanomadefault_login_page()
        sanoma_default.open_page(url)
        sanoma_default.open_completion_screen(TestFacebookLoginFlow.FACEBOOK_USERNAME__NEW_EMAIL, TestFacebookLoginFlow.FACEBOOK_USERNAME_PASSWORD)
        assert sanoma_default.get_lastname() == 'Changberg', "Can't get user lastname"
        assert sanoma_default.get_gender('f') == 'f', "Can't get user gender"
