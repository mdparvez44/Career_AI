import { chromium } from "playwright";

export const applyWorkIndiaJob = async ({
    resumePath,
    jobUrl,
}) => {

    const browser = await chromium.launch({
        headless: false,
    });

    const page = await browser.newPage();

    try {

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

        await page.waitForTimeout(3000);

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