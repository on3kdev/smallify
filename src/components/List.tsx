import React, { FC, useEffect, useState } from "react";
import Input from "./Input";
import styles from "./List.module.css";

interface Links {
  _id: number;
  uid: string;
  url: string;
  __v: number;
}

const List: FC = () => {
  const [linkList, setLinkList] = useState<Links[]>();

  useEffect(() => {
    const fetchLinks = async () => {
      const linksPromise = await fetch("http://localhost:9001/api/links");

      if (linksPromise.status !== 200) return;

      const links = await linksPromise.json();

      setLinkList(links);
    };

    fetchLinks();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>Already Smallified Links</h2>
      {linkList && (
        <div className={styles["links-container"]}>
          {linkList.map((link, key) => (
            <Input
              value={link.url}
              key={key}
              marginBottom={true}
              onPaste={() =>
                navigator.clipboard.writeText(
                  `http://localhost:9000/redirect/${link.uid}`
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
