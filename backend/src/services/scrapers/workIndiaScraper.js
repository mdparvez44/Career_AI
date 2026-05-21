import { chromium } from "playwright";

export const scrapeWorkIndiaJobs = async () => {

    const browser = await chromium.launch({
        headless: true,
    });

    const page = await browser.newPage();

    try {

        await page.goto(
            "https://www.workindia.in/jobs/",
            { waitUntil: "networkidle" }
        );

        await page.waitForTimeout(5000);

        const jobs = await page.evaluate(() => {

            let data = [];

            const cards =
                document.querySelectorAll(".jobCard");

            cards.forEach((card) => {

                const title =
                    card.querySelector("h2")
                        ?.innerText || "";

                const company =
                    card.querySelector(".jobCardCompanyName")
                        ?.innerText || "";

                const location =
                    card.querySelector(".jobCardLocation")
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
                    source: "WorkIndia",
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