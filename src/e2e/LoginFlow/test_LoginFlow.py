from ...core.config import SANOMADEFAULT_USERNAME_EMAIL, SANOMADEFAULT_PASSWORD, WHITELABEL_STAGING
from ...pages.Pages import Pages
from ...tests.BaseTest import BaseTest

"""
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
"""

email_activated = "checksan1+verified@gmail.com"
whitelabel_activated = "checksan11@gmail.com"
whitelabel_activated_new = "checksan1+08072016@gmail.com"
whitelabel_unactivated = "checksan1+0907201601@gmail.com"
email_unactivated = "checksan13@gmail.com"
error_message = ""
error_message_be = ""


class TestLoginFlow(BaseTest):
    def test_MyAccountButton(self, driver, url, status_item):
        pages = Pages(driver)
        sanoma_default = pages.navigateTo().select_sanomadefault_login_page()
        sanoma_default.open_page(url)
        assert sanoma_default.get_sanoma_account_button(), "Sanoma account button is not visible"
        assert sanoma_default.get_sanoma_account_button_image() == "https://account.sanomaservices.nl/staging/img/no-avatar-white.png", "Sanoma account button image is not visible"
        if driver.instance.name == u'MicrosoftEdge':
            assert sanoma_default.get_my_account_button_username() == "Mijn account\n", "Sanoma button username is not Mijn account"
        else:
            assert sanoma_default.get_my_account_button_username() == "Mijn account", "Sanoma button username is not Mijn account"

    def test_LoginFlow(self, driver, url, status_item):
        pages = Pages(driver)
        sanoma_default = pages.navigateTo().select_sanomadefault_login_page()
        sanoma_default.open_page(url)
        sanoma_default.login_as_user(SANOMADEFAULT_USERNAME_EMAIL, SANOMADEFAULT_PASSWORD)
        assert sanoma_default.get_my_account_button_username_after_correct_login() == "TestVoorname", "My account button username is not shown"
        if driver.instance.name == u'MicrosoftEdge':
            sanoma_default.click_account_button_ie()
            sanoma_default.open_screen('profile_update')
        else:
            sanoma_default.click_account_button('profile')
        assert sanoma_default.is_gender_select(), "Gender is not selected"
        sanoma_default.user_logout()

    def test_change_email_into_existing(self, driver, url, status_item):
        pages = Pages(driver)
        sanoma_default = pages.navigateTo().select_sanomadefault_login_page()
        sanoma_default.open_page(url)
        sanoma_default.login_as_user(SANOMADEFAULT_USERNAME_EMAIL, SANOMADEFAULT_PASSWORD)
        assert sanoma_default.get_my_account_button_username() == "TestVoorname", "My account button username is not shown"
        if driver.instance.name == u'MicrosoftEdge':
            sanoma_default.click_account_button_ie()
            sanoma_default.open_screen('profile_update')
        else:
            sanoma_default.click_account_button('profile')
            sanoma_default.open_tab("Mijn gegevens")
        if 'be' in url:
            sanoma_default.set_password("checksan1+09092016@gmail.com")  # for belgium sites use current e-mail
            assert sanoma_default.get_error_message('be') == error_message_be, "Email should not be changed"
        else:
            sanoma_default.set_password(email_activated)
            assert sanoma_default.get_error_message('nl') == error_message, "Email should not be changed"

    def test_change_email_into_unexisting(self, driver, status_item):
        pages = Pages(driver)
        sanoma_default = pages.navigateTo().select_sanomadefault_login_page()
        sanoma_default.open_page(WHITELABEL_STAGING)
        sanoma_default.login_as_user(whitelabel_activated, SANOMADEFAULT_PASSWORD)
        assert sanoma_default.get_my_account_button_username() == "test test", "My account button username is not shown"
        if driver.instance.name == u'MicrosoftEdge':
            sanoma_default.click_account_button_ie()
            sanoma_default.open_screen('profile_update')
        else:
            sanoma_default.click_account_button('profile')
            sanoma_default.open_tab("Mijn gegevens")
        sanoma_default.set_password(email_unactivated)
        assert sanoma_default.get_pending_message(), "Email should not be changed"
        sanoma_default.user_logout()

    """
    SANL-1282 As SA I want to make sure the logo's are loaded in my account
    """
    def test_logo_in_my_account(self, driver, url, status_item):
        pages = Pages(driver)
        sanoma_default = pages.navigateTo().select_sanomadefault_login_page()
        sanoma_default.open_page(url)
        sanoma_default.execute_script("return Sanoma.account.UI.showScreen('profile');")
        assert sanoma_default.find_text_on_page("kunnen niet worden ingeladen...") is False, "Logo's are not displayed"
