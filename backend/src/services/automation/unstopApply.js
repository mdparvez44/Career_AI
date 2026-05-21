import { chromium } from "playwright";

export const applyUnstopJob = async ({
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
            "https://unstop.com/auth/login"
        );

        await page.fill(
            'input[type="email"]',
            email
        );

        await page.fill(
            'input[type="password"]',
            password
        );

        await page.click("button");

        await page.waitForTimeout(5000);

        await page.goto(jobUrl);

        await page.waitForTimeout(5000);

        const applyBtn =
            await page.$("button");

        if (applyBtn) {
            await applyBtn.click();
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