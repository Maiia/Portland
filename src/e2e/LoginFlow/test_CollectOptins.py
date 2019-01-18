from test.functional.core.config import WHITELABEL_STAGING, SANOMADEFAULT_GATEKEEPER_URL
from test.functional.pages.Pages import Pages
from test.functional.tests.BaseTest import BaseTest

"""
Test Scenario "test_CheckedDataTermsOptin":
----------
Preconditions:
    - For the test we should have access to the My Account page on staging environment:
        Whirelabel: {$url} = https://gatekeeper-staging.sanomaservices.nl/preview/whitelabel/?selected_environment=staging
        Sanomadefault: {$url} = https://gatekeeper-staging.sanomaservices.nl/preview/sanomadefault/?selected_environment=staging
    - My Account button should be present on the page

Steps:
1. Open {$url}
2. Click on "My Account button"
3. Login
4. Execute js script "Sanoma.account.UI.showScreen('collect_optins')"
5. Unchecked parameter 'data.terms'
6. Logout and login again
7. Execute js script "Sanoma.account.UI.showScreen('collect_optins')"

Test Environment:
----------
- Staging
- Browserstack

Expected Result:
----------------
3rd party option is unchecked

[FAIL]
 -  3rd party option is checked


Test Scenario "test_CheckedNewsletterOptin":
----------
Preconditions:
    - For the test we should have access to the My Account page on staging environment:
        Whitelabel: {$url} = https://gatekeeper.staging.sanomaservices.nl/preview/whitelabel/?selected_environment=staging
        Sanomadefault: {$url} = https://gatekeeper.staging.sanomaservices.nl/preview/sanomadefault/?selected_environment=staging
    - My Account button should be present on the page

Steps:
1. Open {$url}
2. Click on "My Account button"
3. Login
4. Execute js script "Sanoma.account.UI.showScreen('collect_optins')"
5. Checked parameter 'data.subscribe_newsletter'
6. Logout and login again
7. Execute js script "Sanoma.account.UI.showScreen('collect_optins')"

Test Environment:
----------
- Staging
- Browserstack

Expected Result:
----------------
Newsletter option is checked

[FAIL]
 -  Newsletter option is unchecked
"""


class TestCollectOptIns(BaseTest):
    TEST_EMAIL = "checksan5@gmail.com"
    TEST_PASSWORD = "123123qa"

    def test_CheckedDataTermsOptin(self, driver, url, status_item):
        pages = Pages(driver)
        sanoma_default = pages.navigateTo().select_sanomadefault_login_page()
        sanoma_default.open_page(url)
        sanoma_default.login_as_user(TestCollectOptIns.TEST_EMAIL, TestCollectOptIns.TEST_PASSWORD)
        assert sanoma_default.get_my_account_button_username() == "test test", "My account button username is not shown"
        sanoma_default.open_optins_screen()
        sanoma_default.check_data_subscribe_optin(False)
        assert sanoma_default.get_my_account_button_username(), "My account button username is not shown"
        sanoma_default.click_account_button('profile')
        sanoma_default.user_logout()
        sanoma_default.login_as_user(TestCollectOptIns.TEST_EMAIL, TestCollectOptIns.TEST_PASSWORD)
        assert sanoma_default.get_my_account_button_username() == "test test", "My account button username is not shown"
        sanoma_default.open_optins_screen()
        assert sanoma_default.get_data_subscribe_optin() is False, "3rd party option is selected"
        sanoma_default.check_data_subscribe_optin(True)
        sanoma_default.click_account_button('profile')
        sanoma_default.user_logout()
        sanoma_default.login_as_user(TestCollectOptIns.TEST_EMAIL, TestCollectOptIns.TEST_PASSWORD)
        assert sanoma_default.get_my_account_button_username() == "test test", "My account button username is not shown"
        sanoma_default.open_optins_screen()
        assert sanoma_default.get_data_subscribe_optin() is True, "3rd party option is not selected"
        sanoma_default.check_data_subscribe_optin(False)
        sanoma_default.click_account_button('profile')
        sanoma_default.user_logout()

    def test_CheckedNewsletterOptin(self, driver, status_item):
        pages = Pages(driver)
        sanoma_default = pages.navigateTo().select_sanomadefault_login_page()
        sanoma_default.open_page(SANOMADEFAULT_GATEKEEPER_URL + "whitelabel/")
        sanoma_default.login_as_user(TestCollectOptIns.TEST_EMAIL, TestCollectOptIns.TEST_PASSWORD)
        assert sanoma_default.get_my_account_button_username() == "test test", "My account button username is not shown"
        sanoma_default.open_optins_screen()
        sanoma_default.check_newsletter_optin(True)
        assert sanoma_default.get_my_account_button_username(), "My account button username is not shown"
        sanoma_default.click_account_button('profile')
        sanoma_default.user_logout()
        sanoma_default.login_as_user(TestCollectOptIns.TEST_EMAIL, TestCollectOptIns.TEST_PASSWORD)
        assert sanoma_default.get_my_account_button_username() == "test test", "My account button username is not shown"
        sanoma_default.open_optins_screen()
        assert sanoma_default.get_newsletter_optin() is True, "Newsletter opt-ins is not selected"
