
const {test,expect} = require('@playwright/test');
test.use({ launchOptions: { slowMo: 10} });
const authFile = 'playwright/.auth/user.json';

import * as OTPAuth from "otpauth";


test.only('Multi Sales Order Confirmation',async ({browser,page})=>

{ 
    let totp = new OTPAuth.TOTP({
         issuer: "Google",
         label: "MyTOTP",
         algorithm: "SHA1",
         digits: 6,
         period: 30,
         secret: process.env.ODOO_SECRET //gkwzqx5y5ru5xz36s3gq73vaa7nrrbdd
       });
   const AccountUserName = page.locator('#identifierId');
   const AccountPasswordValue = page.locator("input[type='password']");
   const OdooUserName = page.locator('#login');
   const OdooPasswordValue = page.locator("[type='password']");
  //const context = await browser.newContext();
  //const page = await context.newPage ();
   await page.goto("https://erp-staging.everphone.app/web/login");
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
   await page.waitForURL('https://erp-staging.everphone.app/web/login');
   await OdooUserName.fill(process.env.ODOO_EMAIL);
   await OdooPasswordValue.fill(process.env.ODOO_PASSWORD);
   await page.locator("text='Log in'").click();
   //await page.locator("a[id='result_app_4'] img[class='o_app_icon rounded']").dblclick();
   await page.locator("text='Sales'").dblclick();
   console.log(await page.locator("text='Sales'").textContent());
   await page.locator(".btn.btn-primary.o_list_button_add").click({ force: true });
   console.log (await page.locator("text='Customer'").textContent());
   //await page.locator("div[class ='o_field_many2one_selection'] input[id='partner_id']").click();
   await page.locator("#partner_id").pressSequentially("hiti",{delay:1000});
   const dropdown = page.locator(".o-autocomplete--dropdown-menu.dropdown-menu.ui-widget.ui-autocomplete.show");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("li[class='o-autocomplete--dropdown-item ui-menu-item']").count();
   await page.waitForTimeout(3000);
   for(let i =0;i<optionsCount; ++i)
   {
    const text = await dropdown.locator("li[class='o-autocomplete--dropdown-item ui-menu-item']").nth(i).textContent();
     if(text === "[P00027655] Hitisy GmbH" )
  {
      await dropdown.locator("li[class='o-autocomplete--dropdown-item ui-menu-item']").nth(i).dblclick({ force: true });
      break;
      }
     
    }
    await page.locator(".o_form_sheet_bg").click();
    //console.log (await page.locator("div[name='name']").textContent());/ code for print return label for new device
   //  await page.locator("#print_return_label").click();
   //  console.log(await page.locator("#print_return_label").isChecked());
   //  await expect(page.locator("#print_return_label")).toBeChecked();

   console.log (await page.locator("text='Order type'").textContent());
   //await page.locator("div[class ='o_field_many2one_selection'] input[id='partner_id']").click();
   await page.locator("#order_type_id").pressSequentially("new",{delay:100});
   const orderDropdown = page.locator(".o-autocomplete--dropdown-menu.dropdown-menu.ui-widget.ui-autocomplete.show");
   await orderDropdown.waitFor();
   const orderOptionsCount = await orderDropdown.locator("li[class='o-autocomplete--dropdown-item ui-menu-item']").count();
   await page.waitForTimeout(3000);
   for(let i =0;i<orderOptionsCount; ++i)
   {
    const text = await orderDropdown.locator("li[class='o-autocomplete--dropdown-item ui-menu-item']").nth(i).textContent();
     if(text === "new-device" )
  {
       await orderDropdown.locator("li[class='o-autocomplete--dropdown-item ui-menu-item']").nth(i).dblclick({ force: true });
       break;
      }
    }
   
    await page.locator(".o_form_sheet_bg").click();

    await page.locator("tbody tr a:nth-child(1)").click();
   
    await page.getByRole('row', { name: ' 0.00 € Delete row' }).locator('input[type="text"]').first().fill('116257');
   
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

    await page.locator("text='Add a product'").click();

    await page.locator("div[name='product_id'] input[type='text']").pressSequentially("117802",{delay:1000});

    await page.locator(".dropdown-item.ui-menu-item-wrapper.text-truncate").dblclick({ force: true });

    await page.locator("text='Confirm'").click();

    await page.waitForTimeout(6000);

   console.log (await page.locator("div[class='o_field_widget o_readonly_modifier o_required_modifier o_field_char'] span").textContent());

   await page.locator("button[name='action_view_delivery']").click({ force: true });

     await page.waitForTimeout(6000);

     await page.locator("(//td[@name='partner_ref'])[1]").click({ force: true });

   //await page.getByRole('cell', { name: 'BER4/PICK/' }).click();

   //await page.locator("tbody tr:nth-child(1) td:nth-child(4)").click({ force: true });

   await page.waitForTimeout(6000);

   await page.locator("(//button[@name='action_open_stock_availability_wizard'])[1]").click({ force: true });

   await page.waitForTimeout(3000);

   await page.locator("(//td[@name='ordered_qty'][normalize-space()='0.00'])[1]").click({ force: true });

   //await page.waitForTimeout(3000);

   await page.locator("input[inputmode='decimal']").fill('1');

   await page.getByRole('button', { name: 'Reserve', exact: true }).click();

   await page.waitForTimeout(3000);

   await page.locator("(//button[@name='action_open_stock_availability_wizard'])[2]").click({ force: true });

   await page.waitForTimeout(3000);

   await page.locator("(//td[@name='ordered_qty'][normalize-space()='0.00'])[1]").click({ force: true });

   await page.waitForTimeout(3000);

   await page.locator("input[inputmode='decimal']").fill('1');

   await page.getByRole('button', { name: 'Reserve', exact: true }).click();

   await page.waitForTimeout(3000);

   await page.getByRole('button', { name: 'Validate', exact: true }).click();

   await page.waitForTimeout(6000);

   await page.locator("button[name='action_view_related_delivery']").click({ force: true });

   await page.waitForTimeout(6000);

   await page.locator("(//i[@class='fa fa-fw o_button_icon fa-list'])[1]").click({ force: true });

   await page.locator("(//td[@name='qty_done'][normalize-space()='0.00'])[1]").click({ force: true });

   await page.locator("input[inputmode='decimal']").fill('1');

   await page.getByRole('button', { name: 'Confirm', exact: true }).click();

   await page.waitForTimeout(3000);

   await page.locator("(//i[@class='fa fa-fw o_button_icon fa-list'])[2]").click({ force: true });

   await page.locator("(//td[@name='qty_done'][normalize-space()='0.00'])[1]").click({ force: true });

   await page.locator("input[inputmode='decimal']").fill('1');

   await page.getByRole('button', { name: 'Confirm', exact: true }).click();

   await page.waitForTimeout(3000);

   await page.getByRole('button', { name: 'Validate', exact: true }).click();

   await page.waitForTimeout(10000);

   console.log (await page.locator("button[aria-label='Current state']").textContent());

   await page.waitForTimeout(6000);

    // await page.pause();
   
   
});




