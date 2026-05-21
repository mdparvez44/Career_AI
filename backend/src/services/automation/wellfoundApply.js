import { chromium } from "playwright";

export const applyWellfoundJob = async ({
    email,
    password,
    resumePath,
    jobUrl,
}) => {

    const browser = await chromium.launch({
        headless: false,
    });

    const page = await browser.newPage();

    try {

        await page.goto(
            "https://wellfound.com/login"
        );

        await page.fill(
            'input[type="email"]',
            email
        );

        await page.fill(
            'input[type="password"]',
            password
        );

        await page.click(
            'button[type="submit"]'
        );

        await page.waitForTimeout(5000);

        await page.goto(jobUrl);

        await page.waitForTimeout(5000);

        const applyButton =
            await page.$("button");

        if (applyButton) {
            await applyButton.click();
        }

        const fileInput =
            await page.$(
                'input[type="file"]'
            );

        if (fileInput) {
            await fileInput.setInputFiles(
                resumePath
            );
        }

        await page.waitForTimeout(2000);

        await page.click(
            'button[type="submit"]'
        );

        await page.waitForTimeout(5000);

        await browser.close();

        return { success: true };

    } catch (error) {

        await browser.close();

        return {
            success: false,
            error: error.message,
        };
    }
};