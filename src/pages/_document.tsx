import React from 'react';

import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <div className="content-center">
            <Main />
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
