import cron from "node-cron";
import { createTransport } from "nodemailer";
import { readFileSync, writeFileSync } from "fs";
import { ShippingOptions } from "./index.d";
import axios from "axios";
import dotenv from "dotenv";
import { DateTime } from "luxon";

dotenv.config();

const MARKET_JSON = "src/data/market.json";

function getShippingOptions(item_id: string): Promise<ShippingOptions> {
  return axios
    .get(
      `https://api.mercadolibre.com/items/${item_id}/shipping_options?zip_code=${process.env.ZIP_CODE}`
    )
    .then((res) => res.data);
}

async function sendEmail(subject: string, text: string) {
  const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject,
    text,
  });
}

async function verifyShippingPrice(item_id: string) {
  const data = await getShippingOptions(item_id);

  const market = JSON.parse(readFileSync(MARKET_JSON, "utf8"));

  const shipping = data.options[0].cost;
  const oldShipping = market[item_id] || 0;

  if (oldShipping !== shipping) {
    market[item_id] = shipping;

    await sendEmail(
      "Mercado Livre - preço de frete alterado",
      `O preço de frete do item ${item_id} foi alterado de ${oldShipping} para ${shipping}`
    );

    writeFileSync(MARKET_JSON, JSON.stringify(market));
  }
}
const teste = async () => {
  console.log(
    `Running cron at ${DateTime.local()
      .setZone("America/Sao_Paulo")
      .toFormat("dd/MM/yyyy HH:mm:ss")}`
  );

  const items = String(process.env.ITEMS_IDS).split(",");

  for (const item_id of items) {
    await verifyShippingPrice(item_id);
  }
};

teste();
