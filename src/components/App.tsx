import React, { FC, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./App.module.css";
import Header from "./Header";
import Result from "./Result";
import Search from "./Search";

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

const App: FC = () => {
  const [isResult, setIsResult] = useState(false);
  const [value, setValue] = useState<string>();
  const [url, setUrl] = useState<string>();
  const [error, setError] = useState<Error>({
    visible: false,
    message: undefined,
  });

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

  const onSubmit = () => {
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

    setIsResult(true);
    setUrl(undefined);
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
        <Search
          value={value}
          error={error.visible}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          setValue={setValue}
        />
      ) : (
        <Result url={url} clearFull={clearFull} setIsResult={setIsResult} />
      )}
    </div>
  );
};

export default App;
