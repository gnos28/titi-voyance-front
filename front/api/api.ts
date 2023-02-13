import axios from "axios";

let fromBackUrl =
  process.env.NEXT_PUBLIC_BACKEND_SSR_URL || "http://titivoyance-back-1:5000";
let fromFrontUrl = "https://titiphe.com";

if (process.env.NEXT_PUBLIC_BACKEND_URL !== undefined)
  fromFrontUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const withCredentials = fromFrontUrl.includes("localhost") ? false : true;
if (!fromFrontUrl.includes("http")) fromFrontUrl = "http://" + fromFrontUrl;

console.log("fromFrontUrl", fromFrontUrl);

export const api = {
  ssr: axios.create({
    baseURL: `${fromBackUrl}/api`,
    // withCredentials,
  }),

  csr: axios.create({
    baseURL: `${fromFrontUrl}/api`,
    // withCredentials,
  }),
};
