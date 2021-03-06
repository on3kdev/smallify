import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";
import { ErrorType } from "../types/types";
import { validateUrl } from "../utils";
import Header from "./Header";
import styles from "./Home.module.css";
import LinkInput from "./LinkInput";
import List from "./List";

interface Props {
  value: string | undefined;
  error: ErrorType;
  setValue: (value: string | undefined) => void;
  setError: (value: ErrorType) => void;
  setUrl: (value: string | undefined) => void;
}

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

const Home: FC<Props> = ({ value, error, setValue, setError, setUrl }) => {
  const navigate = useNavigate();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleError = (message: string) => {
    setError({ visible: true, message: message });
    setTimeout(() => setError({ ...error, visible: false }), 2000);
  };

  const onSubmit = async () => {
    if (!value?.length) return handleError("No URL set");
    if (!validateUrl(value)) return handleError("URL is not valid");

    const uuid = uuidv4();

    setUrl(`http://localhost:9000/redirect/${uuid}`);

    const isError = await setNewItemtoDb(
      JSON.stringify({
        uid: uuid,
        url: value,
      })
    );

    isError ? handleError("Something went wrong") : navigate("/result");
  };

  return (
    <>
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
      <Header isResult={false} value={value} />
      <LinkInput
        value={value}
        error={error.visible}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        setValue={setValue}
      />
      <List />
    </>
  );
};

export default Home;
