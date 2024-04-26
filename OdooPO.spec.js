const {test,expect} = require('@playwright/test');
test.use({ launchOptions: { slowMo: 10} });
const authFile = 'playwright/.auth/user.json';

import * as OTPAuth from "otpauth";


test.only('Purchase Order Confirmation',async ({browser,page})=>

{ 
    let totp = new OTPAuth.TOTP({
         issuer: "Google",
         label: "MyTOTP",
         algorithm: "SHA1",
         digits: 6,
         period: 30,
         secret: process.env.ODOO_SECRET 
       });
   const AccountUserName = page.locator('#identifierId');
   const AccountPasswordValue = page.locator("input[type='password']");
   const OdooUserName = page.locator('#login');
   const OdooPasswordValue = page.locator("[type='password']");
   const ImeiValue="530494491887059";
  //const context = await browser.newContext();
  //const page = await context.newPage ();
   await page.goto("i");
   console.log(await page.title());
   await expect(page).toHaveTitle("Sign in - Google Accounts");
   await AccountUserName.fill(process.env.ODOO_EMAIL);
   await page.locator("text='Next'").click();
   await AccountPasswordValue.fill(process.env.GOOGLE_PASSWORD);
   await page.locator("text='Next'").click();
   await page.getByRole('button', { name: 'Try another way' }).click();
   await page.getByRole('link', { name: 'Get a verification code from' }).click();
   let token = totp.generate();
   await page.getByLabel('Enter code').fill(token);
   await page.locator("text='Next'").click();
   await page.waitForURL('');
   await OdooUserName.fill(process.env.ODOO_EMAIL);
   await OdooPasswordValue.fill(process.env.ODOO_PASSWORD);
   await page.locator("text='Log in'").click();
   await page.locator("text='Purchase'").dblclick();
  // await page.locator("a[id='result_app_3'] img[class='o_app_icon rounded']").dblclick();
   console.log(await page.locator("text='Purchase'").textContent());
   await page.locator(".btn.btn-primary.o_list_button_add").click({ force: true });
   console.log (await page.locator("text='Vendor'").textContent());

   await page.locator("#partner_id").pressSequentially("hiti",{delay:100});
   const dropdown = page.locator(".o-autocomplete--dropdown-menu.dropdown-menu.ui-widget.ui-autocomplete.show");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("li[class='o-autocomplete--dropdown-item ui-menu-item']").count();
   await page.waitForTimeout(3000);
   for(let i =0;i<optionsCount; ++i)
   {
    const text = await dropdown.locator("li[class='o-autocomplete--dropdown-item ui-menu-item']").nth(i).textContent();
     if(text === "Hitisy GmbH" )
  {
      await dropdown.locator("li[class='o-autocomplete--dropdown-item ui-menu-item']").nth(i).dblclick({ force: true });
      break;
      }
     
    }
    await page.locator(".o_form_sheet_bg").click();

    await page.locator("tbody tr a:nth-child(1)").click();
    await page.locator("div[name='product_id'] input[type='text']").fill('116257');
   
    await page.locator(".dropdown-item.ui-menu-item-wrapper.text-truncate").click({ force: true });
  
    await page.locator("div[name='dep_customer'] input[type='text']").pressSequentially("T-D",{delay:1000});

    const depDropdown = page.locator(".o-autocomplete--dropdown-menu.dropdown-menu.ui-widget.ui-autocomplete.show");
    await depDropdown.waitFor();
    const DepOptionsCount = await depDropdown.locator("li").count();

    await page.waitForTimeout(3000);

    for(let i =0;i<DepOptionsCount; ++i)
    {
     const text = await depDropdown.locator("li").nth(i).textContent();
    if(text.includes("T-DEP"))
   {
       await depDropdown.locator("li").nth(i).click({ force: true });
        break;
       }
     }
    //await page.locator(".o_form_sheet_bg").click();

    await page.waitForTimeout(10000);

    await page.getByRole('button', { name: 'Confirm Order', exact: true }).dblclick();

     await page.waitForTimeout(1000);
  
    await page.locator("(//button[@class='btn oe_stat_button btn-light flex-shrink-0 mb-0 py-0 border-0 border-start border-bottom rounded-0 text-start text-nowrap text-capitalize'])[1]").click({ force: true });

    console.log (await page.locator("div[class='o_field_widget o_readonly_modifier o_required_modifier o_field_char'] span").textContent());

    await page.locator("button[name='action_show_details']").click({ force: true });

    await page.locator("tbody tr:nth-child(1) td:nth-child(1) a:nth-child(1)").click();

    await page.locator("div[name='imei'] input[class='o_input']").fill(ImeiValue);

    await page.waitForTimeout(3000);

    await page.getByRole('button', { name: 'Confirm', exact: true }).click();

    await page.waitForTimeout(3000);

    await page.getByRole('button', { name: 'Validate', exact: true }).click();

    await page.waitForTimeout(3000);

    await page.locator("button[name='action_view_related_delivery']").click();

    await page.waitForTimeout(3000);

    await page.getByRole('button', { name: 'Validate', exact: true }).click();

    await page.waitForTimeout(3000);


});

