import { Page } from "./Page/Page";
import { AppStateProvider } from "./state/AppStateContext";
import { createPage } from "./utils/createPage";

import "./App.css";

const initialState = createPage();

function App() {
  return (
    <AppStateProvider initialState={initialState}>
      <Page />
    </AppStateProvider>
  );
}

export default App;
