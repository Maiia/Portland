from ...tests.BaseTest import BaseTest
from ...core.config import SANOMADEFAULT_USERNAME_EMAIL, SANOMADEFAULT_PASSWORD
from ...pages.Pages import Pages

"""
----------
Test Scenario:
----------
Steps:
1. Open {$url}
2. Click on My Account button
3. Open "Veelgestelde vragen"

Expected Result:
----------------
{% trans tag is not present in FAQ


[FAIL]
 -  {% trans is present on the page
"""


class TestFaq(BaseTest):

    def test_faq_section(self, driver, url, status_item):
        pages = Pages(driver)
        sanoma_default = pages.navigateTo().select_sanomadefault_login_page()
        sanoma_default.open_page(url)
        sanoma_default.login_as_user(SANOMADEFAULT_USERNAME_EMAIL, SANOMADEFAULT_PASSWORD)
        assert sanoma_default.get_my_account_button_username() == "Voorname", "My account button username is not shown"
        assert sanoma_default.is_tag_present("//*[contains(.,'{% trans')]") is not True, "Tag {% trans is visible"
        sanoma_default.user_logout()
