import React, { useEffect } from "react";
import Router from "next/router";

const classes = {
  root: {
    textAlign: "center",
    padding: "100px 0",
  },
};

const Error = ({ statusCode }) => {
  const title = statusCode === 404 ? "404" : "Error";

  return (
    <>
      <div className={classes.root}>
        <h1>{title}</h1>
        <p>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </p>
      </div>
    </>
  );
};

Error.getInitialProps = ({ res, req, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  if (statusCode === 404) {
    if (req.url.match(/\/$/)) {
      const withoutTrailingSlash = req.url.substr(0, req.url.length - 1);
      if (res) {
        res.writeHead(303, {
          Location: withoutTrailingSlash,
        });
        res.end();
      } else {
        Router.push(withoutTrailingSlash);
      }
    }
  }

  return { statusCode };
};

export default Error;
