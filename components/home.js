import styles from "./home.module.css";
import Link from "next/link";

function HomeSection() {
  return (
    <div className={styles.container}>
      <h1>Get Started</h1>
      <p className="">
        Learn about The Graph, a decentralized protocol for indexing and
        querying data from blockchains.
      </p>
      <ul className={styles.grid_container}>
        <li className={styles.grid}>
          <Link className={styles.card} href="/external">
            <div className={styles.inner}>
              <h3>External Documentation</h3>
              <small>Learn more about the external documentation</small>
            </div>
          </Link>
        </li>
        <li className={styles.grid}>
          <Link href="/internal" className={styles.card}>
            <div className={styles.inner}>
              <h3>Internal Documentation</h3>
              <small>Jump in and start with the internal documentation</small>
            </div>
          </Link>
        </li>
        <li className={styles.grid}>
          <Link href="/faq" className={styles.card}>
            <div className={styles.inner}>
              <h3>Developer FAQs</h3>
              <small>Frequently asked questions</small>
            </div>
          </Link>
        </li>
        <li className={styles.grid}>
          <Link href="/blogs" className={styles.card}>
            <div className={styles.inner}>
              <h3>Query from an Application</h3>
              <small>Learn to query from an application</small>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HomeSection;
