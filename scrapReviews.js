const puppeteer = require('puppeteer')
const fs = require('fs')

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getCookie(filePath) {
    const rawCookie = await fs.promises.readFile(filePath, 'utf-8')
    const cookies = rawCookie
        .trim()
        .split(';')
        .map(cookie => {
            const [name, ...value] = cookie.trim().split('=')
            return {
                name: name.trim(),
                value: value.join('=').trim(),
                domain: '.amazon.fr',
                path: '/',
                sameParty: false,
                expires: -1,
                httpOnly: false,
                secure: true,
                sourceScheme: 'Secure',
            }
        })

    return cookies
}

async function scrapeAmazonReviews(productUrl, cookie) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await browser.setCookie(...cookie)
    const productUrl1 = await productUrl.split('/')
    let pageNumber = 1

    const reviews = []
    let newReviews = true
    while (newReviews) {
        await wait(1000)
        let review_page = `https://www.amazon.fr/${productUrl1[3]}/product-reviews/${productUrl1[5]}/ref=cm_cr_arp_d_paging_btm_next_${pageNumber}?reviewerType=all_reviews&pageNumber=${pageNumber}`
        await page.goto(review_page)
        const pageReviews = await page.$$eval('.review', reviews => {
            return reviews.map(review => {
                const body = review.querySelector('.review-text-content span')?.textContent.trim()
                return body;
            })
        })
        reviews.push(...pageReviews)

        if (pageReviews.length == 0){
            newReviews = false}
        else {
            pageNumber++
        }
    }
    await browser.close()
    return reviews;
}

async function main(){
    cookies = await getCookie("./cookies.txt")
    const reviews = await scrapeAmazonReviews("https://www.amazon.fr/Apple-iPhone-15-128-Go/dp/B0CHXFCYCR", cookies) 
    await fs.promises.writeFile('reviews.txt', reviews.join('\n'))
}

main()