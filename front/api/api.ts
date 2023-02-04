import axios from "axios";

let fromBackUrl = "http://placement-back-1:5000";
let fromFrontUrl = "http://localhost:5000";

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
