import { chromium } from "playwright";

export const scrapeWellfoundJobs = async () => {

    const browser = await chromium.launch({
        headless: true,
    });

    const page = await browser.newPage();

    try {

        await page.goto(
            "https://wellfound.com/jobs",
            { waitUntil: "networkidle" }
        );

        await page.waitForTimeout(5000);

        const jobs = await page.evaluate(() => {

            let data = [];

            const jobCards =
                document.querySelectorAll("div[data-test='StartupResult']");

            jobCards.forEach((job) => {

                const title =
                    job.querySelector("h2")
                        ?.innerText || "";

                const company =
                    job.querySelector("h3")
                        ?.innerText || "";

                const location =
                    job.querySelector(".location")
                        ?.innerText || "";

                const apply_link =
                    job.querySelector("a")
                        ?.href || "";

                data.push({
                    title,
                    company,
                    location,
                    skills: [],
                    apply_link,
                    source: "Wellfound",
                });
            });

            return data;
        });

        await browser.close();

        return jobs;

    } catch (error) {

        await browser.close();

        console.log(error);

        return [];
    }
};