import { chromium } from "playwright";

export const scrapeLinkedinJobs = async () => {

    const browser = await chromium.launch({
        headless: true,
    });

    const page = await browser.newPage();

    try {

        await page.goto(
            "https://www.linkedin.com/jobs/search/?keywords=software%20engineer",
            { waitUntil: "networkidle" }
        );

        await page.waitForTimeout(5000);

        const jobs = await page.evaluate(() => {

            let data = [];

            const cards =
                document.querySelectorAll(".base-card");

            cards.forEach((card) => {

                const title =
                    card.querySelector("h3")
                        ?.innerText || "";

                const company =
                    card.querySelector("h4")
                        ?.innerText || "";

                const location =
                    card.querySelector(".job-search-card__location")
                        ?.innerText || "";

                const apply_link =
                    card.querySelector("a")
                        ?.href || "";

                data.push({
                    title,
                    company,
                    location,
                    skills: [],
                    apply_link,
                    source: "LinkedIn",
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