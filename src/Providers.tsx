import { Provider } from "react-redux";

import ThemeContextProvider from "contexts/ThemeContext";
import store from "state";
import { Web3Provider } from "web3";

const Providers: React.FC = ({ children }) => {
  return (
    <Web3Provider>
      <Provider store={store}>
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </Provider>
    </Web3Provider>
  );
};

export default Providers;
