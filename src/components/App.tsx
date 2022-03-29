import React, { FC, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import styles from "./App.module.css";
import Home from "./Home";
import NoMatch from "./NoMatch";
import Redirect from "./Redirect";
import Result from "./Result";

export interface Error {
  visible: boolean;
  message: string | undefined;
}

const App: FC = () => {
  const [url, setUrl] = useState<string>();
  const [value, setValue] = useState<string>();
  const [error, setError] = useState<Error>({
    visible: false,
    message: undefined,
  });
  const navigate = useNavigate();

  const clearFull = () => {
    setError({
      visible: false,
      message: undefined,
    });
    setValue(undefined);
    navigate("/");
  };

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <Home
                value={value}
                error={error}
                setError={setError}
                setValue={setValue}
                setUrl={setUrl}
              />
            }
          />
          <Route
            path="result"
            element={<Result url={url} value={value} clearFull={clearFull} />}
          />
          <Route path="redirect/:id" element={<Redirect />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
