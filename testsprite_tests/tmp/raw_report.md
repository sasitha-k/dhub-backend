
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** dhub-backend
- **Date:** 2026-03-23
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 View booking list and open a booking detail from the list
- **Test Code:** [TC001_View_booking_list_and_open_a_booking_detail_from_the_list.py](./TC001_View_booking_list_and_open_a_booking_detail_from_the_list.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Booking list contains no records; expected at least one booking to open the detail page.
- Unable to open a booking detail because there are no booking rows present in the booking table for the selected date.
- The test could not complete the 'open booking detail' step due to absence of bookings on the selected date.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6cce492-c379-4b82-a9c4-1ba6a0a1b528/ffd0cf93-ccac-4689-9997-8af40f726d41
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 Booking list loads after login and shows key list UI elements
- **Test Code:** [TC002_Booking_list_loads_after_login_and_shows_key_list_UI_elements.py](./TC002_Booking_list_loads_after_login_and_shows_key_list_UI_elements.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6cce492-c379-4b82-a9c4-1ba6a0a1b528/fd259a2f-cb53-4b7e-b170-6813583d5e9b
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 Filter bookings to a date with no results and verify empty state
- **Test Code:** [TC004_Filter_bookings_to_a_date_with_no_results_and_verify_empty_state.py](./TC004_Filter_bookings_to_a_date_with_no_results_and_verify_empty_state.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6cce492-c379-4b82-a9c4-1ba6a0a1b528/448b4ca7-c18d-47c7-8066-99c1f1654f0c
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Create booking validation: submit empty form shows required field errors
- **Test Code:** [TC006_Create_booking_validation_submit_empty_form_shows_required_field_errors.py](./TC006_Create_booking_validation_submit_empty_form_shows_required_field_errors.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Validation message 'Required' not displayed after submitting empty Create New Booking form.
- Submit operation showed a 'Saving...' indicator but no validation errors became visible in the modal.
- Extracted visible text content of the Create New Booking modal did not contain the word 'Required' or any inline validation message.
- No inline 'Required' messages were found after scrolling the modal to top and bottom and searching the modal.
- The form contains required-marked fields (Date, Time, Pickup Location, etc.) but no visible validation feedback was provided after submission.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6cce492-c379-4b82-a9c4-1ba6a0a1b528/eda94c72-c262-43b4-a8b5-2c4b9d56b5bc
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 Start then complete a booking from booking details
- **Test Code:** [TC008_Start_then_complete_a_booking_from_booking_details.py](./TC008_Start_then_complete_a_booking_from_booking_details.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- No booking rows present in the bookings table; it displays 'No records available'.
- No 'Start booking' control is available for any booking, preventing the start action from being performed.
- Cannot verify the 'Started' status because there is no booking to open or act upon.
- The required precondition (existing bookings) is missing, blocking the operator workflow.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6cce492-c379-4b82-a9c4-1ba6a0a1b528/57123f85-13bc-4703-ac1b-8de4cbf45256
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 Complete a started booking from booking details
- **Test Code:** [TC009_Complete_a_started_booking_from_booking_details.py](./TC009_Complete_a_started_booking_from_booking_details.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- No booking records displayed on the /booking page; the table shows 'No records available'.
- Booking row not present, so it is not possible to click a booking to start the booking flow.
- 'Start booking' and 'Complete booking' actions cannot be verified because there is no booking to act on.
- A 'Create Day Time Booking' button is present but creating a booking was not part of the test steps, so the required workflow cannot be executed.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6cce492-c379-4b82-a9c4-1ba6a0a1b528/de1f71f6-4696-4ef2-b472-e2bd721d10d5
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 Create a credit booking successfully and see success toast
- **Test Code:** [TC010_Create_a_credit_booking_successfully_and_see_success_toast.py](./TC010_Create_a_credit_booking_successfully_and_see_success_toast.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Submit button clicked twice but no persistent 'Success' notification was observed after either submission (only transient 'Saving...' state).
- 'Success' text not found on the page or in notifications after closing the booking dialog.
- The credit booking form lacks a separate 'payment' input field required by the test (no payment field present).
- Unable to confirm booking completion because the UI did not display a success confirmation after valid interaction attempts.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6cce492-c379-4b82-a9c4-1ba6a0a1b528/e1e0fb1f-2911-40bf-982f-97a29c8b3bf9
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012 Credit booking form rejects invalid fee and shows validation errors
- **Test Code:** [TC012_Credit_booking_form_rejects_invalid_fee_and_shows_validation_errors.py](./TC012_Credit_booking_form_rejects_invalid_fee_and_shows_validation_errors.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6cce492-c379-4b82-a9c4-1ba6a0a1b528/fdad1f32-f941-4bfc-812b-23e16aec4fbf
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014 Customers directory loads with summary cards and customer table
- **Test Code:** [TC014_Customers_directory_loads_with_summary_cards_and_customer_table.py](./TC014_Customers_directory_loads_with_summary_cards_and_customer_table.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6cce492-c379-4b82-a9c4-1ba6a0a1b528/cff6ee00-2e3f-4e2a-8c5b-af9faf18f737
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015 Filter customers using search on Customers page
- **Test Code:** [TC015_Filter_customers_using_search_on_Customers_page.py](./TC015_Filter_customers_using_search_on_Customers_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6cce492-c379-4b82-a9c4-1ba6a0a1b528/52fb8cbb-6a67-4143-bbf6-63c71f310daa
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC016 Open Create customer modal from Customers page
- **Test Code:** [TC016_Open_Create_customer_modal_from_Customers_page.py](./TC016_Open_Create_customer_modal_from_Customers_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6cce492-c379-4b82-a9c4-1ba6a0a1b528/bf0ff606-35fc-4121-976e-54ec8e41c9f5
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC018 Create a customer with required fields and return to list
- **Test Code:** [TC018_Create_a_customer_with_required_fields_and_return_to_list.py](./TC018_Create_a_customer_with_required_fields_and_return_to_list.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Submit button (index 9260) was not clicked; form submission was not attempted.
- Required form fields Mobile Number (index 9243), Address (index 9245), and Password (index 9249) are empty, preventing a successful create-customer submission.
- Creation success and return to the customers directory were not verified because no submission occurred.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6cce492-c379-4b82-a9c4-1ba6a0a1b528/5523dc20-cffc-4f26-b6d9-8c8e58ebbf60
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC019 Create customer with invalid email shows validation and stays in modal
- **Test Code:** [TC019_Create_customer_with_invalid_email_shows_validation_and_stays_in_modal.py](./TC019_Create_customer_with_invalid_email_shows_validation_and_stays_in_modal.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6cce492-c379-4b82-a9c4-1ba6a0a1b528/5064abe4-386c-4722-9643-353e991d5181
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC020 Submitting create form with invalid email shows error and does not create customer
- **Test Code:** [TC020_Submitting_create_form_with_invalid_email_shows_error_and_does_not_create_customer.py](./TC020_Submitting_create_form_with_invalid_email_shows_error_and_does_not_create_customer.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6cce492-c379-4b82-a9c4-1ba6a0a1b528/a956365b-6181-4edb-af35-ec4b782d84fd
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC021 Settle a valid amount from a customer balance and see updated balance
- **Test Code:** [TC021_Settle_a_valid_amount_from_a_customer_balance_and_see_updated_balance.py](./TC021_Settle_a_valid_amount_from_a_customer_balance_and_see_updated_balance.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Balances navigation did not reach /customer-balances; current URL is http://localhost:3000/customers.
- Customers page contains no interactive elements (browser detected 0 interactive elements), preventing opening a customer record or interacting with balance controls.
- No customers exist on the Customers page ('No customers found.' displayed), so there is no customer balance to open.
- Required UI controls to perform a settlement (customer row actions, settle button, confirmation UI) are not present or not detectable, so settlement verification cannot be performed.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/a6cce492-c379-4b82-a9c4-1ba6a0a1b528/07d8bfcd-f2f9-4c78-902f-36c4f9dd687e
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **53.33** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---