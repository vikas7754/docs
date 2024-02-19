import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import Image from "next/image";

const config: DocsThemeConfig = {
  logo: <Image src="/logo.png" alt="logo" width={50} height={50} />,
  faviconGlyph: "⭐️",
  project: {
    link: "https://github.com/shuding/nextra-docs-template",
  },
  docsRepositoryBase: "https://github.com/shuding/nextra-docs-template",

  editLink: {
    text: "",
  },
  feedback: {
    content: "",
    labels: "",
    useLink: () => "",
  },

  footer: {
    text: (
      <div style={{ textAlign: "center", width: "100%" }}>
        Nextra Documentation
      </div>
    ),
  },
  head: () => {
    return (
      <>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </>
    );
  },
};

export default config;
