import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const apislice = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce.routemisr.com",
  }),
  endpoints: (builder) => {},
});
