const puppeteer = require("puppeteer");
const readline = require("readline");
const play = require("play-sound")();
const axios = require("axios");

let webAppUrlClose =
  "https://script.google.com/macros/s/AKfycbyQAnbNOwZY_8tVSrjpsl6UhDqYTzDyVxN-QpL0uuWWbopNhq_bQ2x5woskXvm-ZZsPuQ/exec";
let webAppUrlOpen =
  "https://script.google.com/macros/s/AKfycbxcPmW1WeAqFT7CyJLnX_xzFMKxlMD9uuCeOWf2nqxbFHXxlV71NZebRc_ErZcsnfne/exec";
let webAppUrlCallForHelp =
  "https://script.google.com/macros/s/AKfycbx1oULbk_OSPmGjLxz-roF6_jkjt15WK0_JAtp65_q35aLnJThCKL4p6wdjoZDETL_N5w/exec";

let counter = 0;
let currentPage = 0;

const startAutomation = async () => {
  const browserURL = "http://localhost:9222"; // URL of the remote debugging interface
  const browser = await puppeteer.connect({ browserURL });
  const targets = await browser.targets();
  const pages = targets.filter((target) => target.type() === "page");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const page = await pages[currentPage].page();
  try {
    await page.waitForSelector('select#office option[value="1"]');
    const selectElement = await page.$("#office");
    if (selectElement) {
      // Use the select method to interact with the select element
      await selectElement.select("1"); // Index 1 corresponds to the second option
    } else {
      console.log("office not found");
      startAllOverAgain();
    }
    const waitForOptionValue = async () => {
      await page.waitForSelector('select#officetype option[value="1"]');
    };
    await waitForOptionValue();
    const selectElement2 = await page.$("#officetype");
    await page.evaluate(
      () => new Promise((resolve) => setTimeout(resolve, 2000))
    );
    if (selectElement2) {
      // Use the select method to interact with the select element
      await selectElement2.select("1"); // Index 1 corresponds to the second option
    } else {
      console.log("office type not found");
      startAllOverAgain();
    }
    const totalPerson = await page.$("#totalPerson");
    await page.evaluate(
      () => new Promise((resolve) => setTimeout(resolve, 2000))
    );
    if (totalPerson) {
      // Use the select method to interact with the select element
      await totalPerson.select("1"); // Index 1 corresponds to the second option
    } else {
      console.log("totalPerson not found");
      startAllOverAgain();
    }
    await page.evaluate(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );
    const atm = await page.$("#atm");
    if (atm) {
      await atm.click();
      console.log("atm button selected");
    } else {
      console.log("atm button element not found");
      startAllOverAgain();
    }
    await page.evaluate(
      () => new Promise((resolve) => setTimeout(resolve, 2000))
    );

    const selector = "#popupDatepicker2";
    await page.waitForSelector(selector);

    // Evaluate JavaScript to remove the readonly attribute and type something
    await page.evaluate((selector) => {
      const inputElement = document.querySelector(selector);
      if (inputElement) {
        inputElement.removeAttribute("readonly"); // Remove the readonly attribute
        inputElement.value = "1402/04/29"; // Set the desired value
      } else {
        console.log("Input element not found.");
        startAllOverAgain();
      }
    }, selector);
    const checkCardListBtnDiv = await page.$("#checkCardListBtnDiv");
    if (checkCardListBtnDiv) {
      await checkCardListBtnDiv.click();
      console.log("checkCardListBtnDiv button selected");
    } else {
      console.log("checkCardListBtnDiv button element not found");
      startAllOverAgain();
    }
    const bankpayment = 'input[type="radio"][name="bankpayment"]';
    await page.waitForSelector(bankpayment);

    // Find the radio input element by its selector
    const radioElement = await page.$(bankpayment);

    if (radioElement) {
      // Click on the radio input element to select it
      await radioElement.click();

      console.log("Selected radio input element:", radioElement);
    } else {
      console.log("Element not found.");
      startAllOverAgain();
    }
    await page.evaluate(
      () => new Promise((resolve) => setTimeout(resolve, 2000))
    );
    const btnAppCountNext = await page.$("#btnAppCountNext");
    if (btnAppCountNext) {
      await btnAppCountNext.click();
      console.log("btnAppCountNext button selected");
    } else {
      console.log("btnAppCountNext button element not found");
      startAllOverAgain();
    }
    const btnAppPersonalNext = await page.$("#btnAppPersonalNext");
    if (btnAppPersonalNext) {
      await btnAppPersonalNext.click();
      console.log("btnAppPersonalNext button selected");
    } else {
      console.log("btnAppPersonalNext button element not found");
      startAllOverAgain();
    }
    await page.evaluate(
      () => new Promise((resolve) => setTimeout(resolve, 2000))
    );
    const btnAppPreviewNext = await page.$("#btnAppPreviewNext");
    if (btnAppPreviewNext) {
      await btnAppPreviewNext.click();
      console.log("btnAppPreviewNext button selected");
    } else {
      console.log("btnAppPreviewNext button element not found");
      startAllOverAgain();
    }
    const inputSelector = "#datepicker input.calendarinput";
    await page.waitForSelector(inputSelector);

    // Find the <input> element inside the <div> by its class and click it
    const inputElement = await page.$(inputSelector);

    if (inputElement) {
      // Click on the <input> element
      await inputElement.click();

      console.log("Clicked on the input element:", inputElement);
    } else {
      console.log("Input element not found.");
    }
    const nonDisabledTdClasses = await page.evaluate(() => {
      const datepickerDiv = document.querySelector(
        ".datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-bottom"
      );
      if (datepickerDiv) {
        const tdElements = datepickerDiv.querySelectorAll("td");
        const nonDisabledClasses = Array.from(tdElements)
          .filter(
            (td) =>
              !td.className.includes("disabled") && td.className.trim() !== ""
          )
          .map((td) => td.className);
        return nonDisabledClasses;
      }
      return [];
    });
    counter = counter + 1;
    console.log(counter);
    if (nonDisabledTdClasses.length === 0) {
      console.log("Array is empty, reloading the page...");
      axios
        .get(webAppUrlClose)
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error.response.data);
        });
      await page.reload();
      await page.evaluate(
        () => new Promise((resolve) => setTimeout(resolve, 20000))
      );
      startAutomation();
    } else {
      play.play("alert.mp3", (err) => {
        if (err) {
          console.error("Error playing sound:", err);
        }
      });
      axios
        .get(webAppUrlOpen)
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error.response.data);
        });
      console.log(
        "Classes of non-disabled non-empty <td> elements:",
        nonDisabledNonEmptyTdClasses
      );
    }

    rl.close();
  } catch (error) {
    console.error("Error during automation:", error.message);
    await page.goto("https://it-ir-appointment.visametric.com/en");
    await page.evaluate(
      () => new Promise((resolve) => setTimeout(resolve, 2000))
    );
    startAllOverAgain();
  }
};

const startAllOverAgain = async () => {
  const browserURL = "http://localhost:9222"; // URL of the remote debugging interface
  const browser = await puppeteer.connect({ browserURL });
  const targets = await browser.targets();
  const pages = targets.filter((target) => target.type() === "page");
  const page = await pages[currentPage].page();
  try {
    await page.waitForSelector("#nationalWorkingBtn");
    const nationalWorkingBtn = await page.$("#nationalWorkingBtn");
    if (nationalWorkingBtn) {
      await nationalWorkingBtn.click();
      console.log("nationalWorkingBtn button selected");
    } else {
      console.log("nationalWorkingBtn button element not found");
    }
    const okRadio = 'input[type="radio"][name="resultCheck"]';
    await page.waitForSelector(okRadio);

    // Find the radio input element by its selector
    const okRadioElement = await page.$(okRadio);

    if (okRadioElement) {
      // Click on the radio input element to select it
      await okRadioElement.click();

      console.log("Selected radio input element:", okRadioElement);
    } else {
      console.log("Element not found.");
    }
    await page.evaluate(
      () => new Promise((resolve) => setTimeout(resolve, 2000))
    );
    const iranRadio = 'input[type="radio"][id="result3"]';
    await page.waitForSelector(iranRadio);

    // Find the radio input element by its selector
    const iranRadioElement = await page.$(iranRadio);

    if (iranRadioElement) {
      // Click on the radio input element to select it
      await iranRadioElement.click();

      console.log("Selected radio input element:", iranRadioElement);
    } else {
      console.log("Element not found.");
    }
    const btnSubmit = await page.$("#btnSubmit");
    if (btnSubmit) {
      await btnSubmit.click();
      console.log("btnSubmit button selected");
    } else {
      console.log("btnSubmit button element not found");
    }
    () => new Promise((resolve) => setTimeout(resolve, 20000));

    startAutomation();
  } catch {
    axios
      .get(webAppUrlCallForHelp)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
    // const newPage = await browser.newPage();

    // // Navigate the new tab to a different URL
    // await newPage.goto("https://it-ir-appointment.visametric.com/en");
    // currentPage = currentPage + 1;
    // () => new Promise((resolve) => setTimeout(resolve, 10000));
    // startAllOverAgain();
  }
};

startAutomation();
