from collections import Counter

from ...core.config import SANOMADEFAULT_PASSWORD, SANOMADEFAULT_USERNAME_EMAIL_1, SANOMADEFAULT_GATEKEEPER
from ...pages.Pages import Pages
from ...tests.BaseTest import BaseTest

"""
----------
Test Scenario:
----------
Preconditions:
For the test we should have access to the My Account page on staging environment:

Steps:
1. Open {$url}
2. Click on My Account button
3. In login popup window click on Login tab
4. Please fill the fields with with parameters:
    - E-mailadres: denys.poloka@sanoma.com
    - Wachtwoord = 123123qa
5. Press the button INLOGGEN
6. Open "Mijn gegevens"
7 Change fields:
    e-mail ="den.poloka@sanoma.com"
    Voornaam = "Voornaam_u"
    Achternaam = "Achternaam_u"
8. Click "Opslaan" button
9. Logout
10.Login with e-mail "den.poloka@sanoma.com"

Expected Result:
----------------
User can login with a new e-mail
"Voornaam" and "Achternaam" will be changed


[FAIL]
 -  User can't login and "Voornaam" and "Achternaam" are not changed
"""


class TestChangeMyProfileFlow(BaseTest):

    def test_ChangeMyProfile(self, driver, status_item, url=SANOMADEFAULT_GATEKEEPER):
        pages = Pages(driver)
        sanoma_default = pages.navigateTo().select_sanomadefault_login_page()
        sanoma_default.open_page(url)
        sanoma_default.login_as_user(SANOMADEFAULT_USERNAME_EMAIL_1, SANOMADEFAULT_PASSWORD)
        sanoma_default.change_profile_data('den.poloka@sanoma.com', 'FirstNameUpdated', 'LastNameUpdated',
                                           'f', '30', 'Maart', '2000',
                                           '6741XL', '32', '1', '', '', '0123456789')
        sanoma_default.submit_set_in_changes()
        assert sanoma_default.get_username() == "FirstNameUpdated LastNameUpdated", "Username has not been changed"
        sanoma_default.click_logout()
        assert sanoma_default.get_my_account_button_username() == "Mijn account", "My account username is shown"
        sanoma_default.login_as_user("den.poloka@sanoma.com", SANOMADEFAULT_PASSWORD)
        user_data = ('den.poloka@sanoma.com', 'FirstNameUpdated', 'LastNameUpdated', 'f', 30, 3, 2000,
                     '1012 AZ', 1, 1, 'Muiderstraat new', 'Eindhoven', '0123456789' )
        assert (Counter(list(sanoma_default.get_user_parameters())), Counter(list(user_data))), "User data coudn't updated"
        sanoma_default.change_profile_data(SANOMADEFAULT_USERNAME_EMAIL_1, 'Voornam', 'Achternaam',
                                        'm', '10', 'Juni', '1978',
                                        '6741XL', '32', '1', '', '', '0206701947')
        sanoma_default.submit_set_in_changes()
        assert sanoma_default.get_my_account_button_username() == "Voornam"
        sanoma_default.click_logout()
