import type { NextPage } from "next";

import { Exchange, Header } from "components";

const Home: NextPage = () => (
  <>
    <Header />
    <Exchange />
  </>
);

export default Home;
