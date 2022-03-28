import React, { FC, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";
import styles from "./App.module.css";
import Header from "./Header";
import LinkInput from "./LinkInput";
import List from "./List";
import Result from "./Result";

interface Error {
  visible: boolean;
  message: string | undefined;
}

const validateUrl = (url: string) => {
  const res = url.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );

  return res !== null;
};

const setNewItemtoDb = async (body: string) => {
  const linksPromise = await fetch("http://localhost:9001/api/links", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body,
  });

  return linksPromise.status !== 200;
};

const App: FC = () => {
  const [isResult, setIsResult] = useState(false);
  const [value, setValue] = useState<string>();
  const [url, setUrl] = useState<string>();
  const [error, setError] = useState<Error>({
    visible: false,
    message: undefined,
  });

  useEffect(() => {
    const path = window.location.pathname;

    if (path.length < 5) return;
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearError = () => {
    setTimeout(() => setError({ ...error, visible: false }), 2000);
  };

  const clearFull = () => {
    setError({
      visible: false,
      message: undefined,
    });
    setValue(undefined);
    setIsResult(false);
  };

  const onSubmit = async () => {
    if (!value?.length) {
      setError({ visible: true, message: "No URL set" });
      clearError();
      return;
    }

    const isValid = validateUrl(value);

    if (!isValid) {
      setError({ visible: true, message: "URL is not valid" });
      clearError();
      return;
    }

    const uuid = uuidv4();

    setUrl(`http://localhost:9000/${uuid}`);

    const fetchBody = JSON.stringify({
      uid: uuid,
      url: value,
    });

    const isError = await setNewItemtoDb(fetchBody);

    if (isError) {
      setError({ visible: true, message: "Something went wrong" });
      clearError();
      return;
    }
    setIsResult(true);
  };

  return (
    <div className={styles.app}>
      <CSSTransition
        in={error.visible}
        timeout={300}
        classNames={{
          enterActive: styles["error-active"],
          enterDone: styles["error-active"],
          exitActive: styles["error-done"],
          exitDone: styles["error-done"],
        }}
      >
        <div className={styles.error}>
          <p>{error.message}</p>
        </div>
      </CSSTransition>
      <Header isResult={isResult} setIsResult={setIsResult} value={value} />
      {!isResult ? (
        <>
          <LinkInput
            value={value}
            error={error.visible}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            setValue={setValue}
          />
          <List />
        </>
      ) : (
        <Result url={url} clearFull={clearFull} setIsResult={setIsResult} />
      )}
    </div>
  );
};

export default App;
