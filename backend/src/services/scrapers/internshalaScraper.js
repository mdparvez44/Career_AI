import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeInternshalaJobs = async () => {
    try {

        const url =
            "https://internshala.com/jobs/";

        const { data } = await axios.get(url);

        const $ = cheerio.load(data);

        let jobs = [];

        $(".individual_internship").each((index, element) => {

            const title = $(element)
                .find(".job-title-href")
                .text()
                .trim();

            const company = $(element)
                .find(".company-name")
                .text()
                .trim();

            const location = $(element)
                .find(".locations a")
                .text()
                .trim();

            const apply_link =
                "https://internshala.com" +
                $(element)
                    .find(".job-title-href")
                    .attr("href");

            jobs.push({
                title,
                company,
                location,
                skills: [],
                apply_link,
                source: "Internshala",
            });
        });

        return jobs;

    } catch (error) {
        console.log(error);
        return [];
    }
};