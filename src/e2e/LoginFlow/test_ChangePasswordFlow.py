from ...pages.Pages import Pages
from ...tests.BaseTest import BaseTest
from ...core.config import SANOMADEFAULT_USERNAME_CHECK_PASS, SANOMADEFAULT_PASSWORD

"""
----------
Test Scenario:
----------
Preconditions:
For the test we should have access to the My Account page on staging environment:
User account with email: check_password@sanoma.com and password: 123123qa created

Steps:
1. Open {$url}
2. Click on My Account button
3. In login popup window click on Login tab
4. Please fill the fields with with parameters:
    - E-mailadres: checksanomapassrecfunc@gmail.com
    - Wachtwoord = 123123qa
5. Press the button INLOGGEN
6. Open "Change password" section
7. Please fill the fields:
    - Password = 123123qa
    - newPassword = 123123123qa
    - passwordRetype = 123123123qa
8. Press "Opslaan" button
9. Logout and try to login with a new password:
    - E-mailadres: check_password@sanoma.com
    - Wachtwoord = 123123123qa

Expected Result:
----------------
User can login with a new password

[FAIL]
 -  user can't login with a new password
"""


class TestChangePasswordFlow(BaseTest):

    SANOMADEFAULT_NEW_PASSWORD = "123123123qa"

    def test_ChangePasswordFlow(self, driver, url, status_item):
        pages = Pages(driver)
        sanoma_default = pages.navigateTo().select_sanomadefault_login_page()
        sanoma_default.open_page(url)
        sanoma_default.login_as_user(SANOMADEFAULT_USERNAME_CHECK_PASS, SANOMADEFAULT_PASSWORD)
        sanoma_default.change_profile_data_password(SANOMADEFAULT_PASSWORD,
                                                    TestChangePasswordFlow.SANOMADEFAULT_NEW_PASSWORD)
        sanoma_default.click_logout()
        sanoma_default.login_as_user(SANOMADEFAULT_USERNAME_CHECK_PASS, TestChangePasswordFlow.SANOMADEFAULT_NEW_PASSWORD)
        assert sanoma_default.get_my_account_button_username() == "change change", "New password doesn't apply"
        sanoma_default.change_profile_data_password(TestChangePasswordFlow.SANOMADEFAULT_NEW_PASSWORD,
                                                    SANOMADEFAULT_PASSWORD)
        sanoma_default.click_logout()
