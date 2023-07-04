import { StoreProvider } from "@/store/index";
import type { AppProps } from "next/app";
import Layout from "../components/layout";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <StoreProvider initialValue={{}}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </StoreProvider>
    );
};

export default MyApp;
