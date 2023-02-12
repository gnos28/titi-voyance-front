import axios from "axios";

const { NEXT_PUBLIC_BACKEND_URL, NEXT_PUBLIC_BACKEND_SSR_URL } = process.env;

let fromBackUrl =
  NEXT_PUBLIC_BACKEND_SSR_URL || "http://titivoyance-back-1:5000";
let fromFrontUrl = "http://localhost:5000";

if (NEXT_PUBLIC_BACKEND_URL !== undefined)
  fromFrontUrl = NEXT_PUBLIC_BACKEND_URL;

const withCredentials = fromFrontUrl.includes("localhost") ? false : true;
if (!fromFrontUrl.includes("http")) fromFrontUrl = "http://" + fromFrontUrl;

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
