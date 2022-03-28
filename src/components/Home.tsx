import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";
import { Error } from "./App";
import Header from "./Header";
import styles from "./Home.module.css";
import LinkInput from "./LinkInput";
import List from "./List";

interface Props {
  value: string | undefined;
  error: Error;
  setValue: (value: string | undefined) => void;
  setError: (value: Error) => void;
  setUrl: (value: string | undefined) => void;
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

const Home: FC<Props> = ({ value, error, setValue, setError, setUrl }) => {
  const navigate = useNavigate();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearError = () => {
    setTimeout(() => setError({ ...error, visible: false }), 2000);
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

    setUrl(`http://localhost:9000/redirect/${uuid}`);

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

    navigate("/result");
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
