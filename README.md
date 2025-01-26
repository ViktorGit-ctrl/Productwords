# Productwords

This project is a Node.js script that uses [Puppeteer](https://github.com/puppeteer/puppeteer) to extract product reviews from Amazon and perform word frequency analysis on those reviews.

## Features

- Extract reviews for an Amazon product.
- Save the reviews to a text file.
- Analyze the most frequent words in the reviews.

## Prerequisites

- Node.js
- `cookies.txt` file containing your Amazon cookies, formatted as follows:  
  ```
  session-id=xxxxxxxxx; session-id-time=xxxxxxxxx; i18n-prefs=xxxxxxxxx; csm-hit=xxxxxxxxx; ubid-acbfr=xxxxxxxxx; session-token=xxxxxxxxx;...
  ```

## Installation

Dependencies:  
```bash
npm install puppeteer
 ```

## Usage

Run `scrapReviews.js`  
and after `wordsCounter.js`
