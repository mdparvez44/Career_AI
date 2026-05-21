import { chromium } from "playwright";

export const applyLinkedinJob = async ({
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
            "https://www.linkedin.com/login"
        );

        await page.fill("#username", email);

        await page.fill("#password", password);

        await page.click(
            'button[type="submit"]'
        );

        await page.waitForTimeout(5000);

        await page.goto(jobUrl);

        await page.waitForTimeout(5000);

        // EASY APPLY ONLY
        const easyApply =
            await page.$(
                '.jobs-apply-button'
            );

        if (!easyApply) {

            return {
                success: false,
                error:
                    "Easy Apply not available",
            };
        }

        await easyApply.click();

        await page.waitForTimeout(3000);

        const fileInput =
            await page.$(
                'input[type="file"]'
            );

        if (fileInput) {
            await fileInput.setInputFiles(
                resumePath
            );
        }

        await page.waitForTimeout(3000);

        const submitButton =
            await page.$(
                'button[aria-label="Submit application"]'
            );

        if (submitButton) {
            await submitButton.click();
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