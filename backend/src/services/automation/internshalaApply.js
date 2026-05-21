import { chromium } from "playwright";

export const applyInternshalaJob = async ({
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

        // LOGIN
        await page.goto(
            "https://internshala.com/login"
        );

        await page.fill(
            'input[name="email"]',
            email
        );

        await page.fill(
            'input[name="password"]',
            password
        );

        await page.click(
            'button[type="submit"]'
        );

        await page.waitForTimeout(5000);

        // OPEN JOB PAGE
        await page.goto(jobUrl);

        await page.waitForTimeout(3000);

        // APPLY BUTTON
        await page.click(
            'button#easy_apply_button'
        );

        await page.waitForTimeout(3000);

        // RESUME UPLOAD
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

        // FINAL APPLY
        await page.click(
            'button[type="submit"]'
        );

        await page.waitForTimeout(5000);

        await browser.close();

        return {
            success: true,
        };

    } catch (error) {

        console.log(error);

        await browser.close();

        return {
            success: false,
            error: error.message,
        };
    }
};