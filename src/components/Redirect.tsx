import React, { FC, useEffect } from "react";
import { useParams } from "react-router";
import Loading from "./Loading";
import styles from "./Redirect.module.css";

const Redirect: FC = () => {
  const { id } = useParams();

  useEffect(() => {
    const fetchLink = async () => {
      const linkPromise = await fetch(`http://localhost:9001/api/links/${id}`);

      if (linkPromise.status !== 200) return;

      const link = await linkPromise.json();

      if (!link) return;

      setTimeout(() => (location.href = link[0].url), 1250);
    };

    fetchLink();
  }, [id]);

  return (
    <div className={styles.container}>
      <Loading />
    </div>
  );
};

export default Redirect;
