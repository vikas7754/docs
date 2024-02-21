// pages/_error.js
import React from "react";

const ErrorPage = ({ statusCode }) => {
  const title = statusCode === 404 ? "404 - Page Not Found" : "Error";

  return (
    <div>
      <h1>{title}</h1>
      {statusCode ? (
        <p>{`An error ${statusCode} occurred on server`}</p>
      ) : (
        <p>An error occurred on client</p>
      )}
    </div>
  );
};

export async function getStaticProps({ res, err }) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { props: { statusCode } };
}

export default ErrorPage;
