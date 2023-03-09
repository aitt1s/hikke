import type { NextApiRequest, NextApiResponse } from "next";
import currency from "currency.js";
import fetch from "node-fetch";
import { load } from "cheerio";

async function scrapeData(url: string) {
  try {
    const pattern = /asunnot.oikotie.fi/;
    const validUrl = pattern.test(encodeURI(url));

    if (!validUrl) {
      return {};
    }

    const result = [];

    const response = await fetch(url);
    const body = await response.text();

    let $ = load(body);
    const rows = $(".info-table__row");

    rows.each((_i, row) => {
      const whiteList = [
        "Asuinpinta-ala",
        "Velaton hinta",
        "Myyntihinta",
        "Velkaosuus",
        "Hoitovastike",
        "Rahoitusvastike",
      ];

      $(row).text();

      const title = $(row).find(".info-table__title").text();

      if (whiteList.includes(title)) {
        const value = $(row).find(".info-table__value").text();
        result.push({ title, value });
      }
    });

    const data = {};

    for (const row of result) {
      const parsed = parseString(row.value);
      const replaced = parsed.replace(",", ".");
      const valid = currency(replaced).value;

      data[keyMapper[row.title]] = valid;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const pattern = /asunnot.oikotie.fi/;
    const validUrl = pattern.test(encodeURI(req.query.url as string));

    if (!validUrl) {
      res.status(403).json("forbidden url");
      return;
    }

    const data = await scrapeData(req.query.url as string);

    res.status(200).json(data);
  } catch (error) {
    res.status(400);
  }
}

const characterWhiteList = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  ",",
];

const keyMapper = {
  "Asuinpinta-ala": "size",
  "Velaton hinta": "netSellingPrice",
  Myyntihinta: "purchasePrice",
  Velkaosuus: "solFinance.amount",
  Hoitovastike: "maintenanceFee",
  Rahoitusvastike: "chargeForFinancialCosts",
};

function parseString(string: string): string {
  const splittedString: string[] = string.split("");

  const validChars = splittedString.reduce(
    (acc: string[], character: string) => {
      if (characterWhiteList.includes(character)) {
        return [...acc, character];
      } else {
        return acc;
      }
    },
    []
  );

  return validChars.join("");
}
