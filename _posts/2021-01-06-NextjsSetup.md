---
title: 'Next.js+Tailwind CSSのセットアップ'
description: 'Next.jsでSSGブログを作るための下準備'
date: '2021-01-06'
modified_date: '2021-01-06'
image: /assets/images/posts/mahmudul-hasan-shaon-gGUscjr7eEw-unsplash.jpg
---
![](@@baseUrl@@/assets/images/posts/mahmudul-hasan-shaon-gGUscjr7eEw-unsplash.jpg)
# Next.js+Typescript+Tailwind CSS+Eslint+Prettier+Jest のセットアップ
上記プロジェクトをセットアップしたので雑なメモ、現時点で多分最新？`Jest`部分は自信なし。初心者には優しくない内容。  
完成形は[Github](https://github.com/panp2000/nextjs-typescript-tailwindcss-eslint-prettier-jest-template)に。  
それぞれのバージョンは`Next.js`10.0.4、`Tailwind CSS`2.0.2、`Eslint`7.17.0、`Prettier`2.2.1、`Jest`26.6.3

# `next.js` `typescript`のインストール

~~~bash
yarn create next-app sai-kachi-blog
cd sai-kachi-blog
touch tsconfig.json
yarn dev
yarn add --dev typescript @types/react @types/node
mkdir src
mv pages styles src
yarn dev
~~~

- 起動を確認してブラウザで`http://localhost:3000`を開いて動作確認後`CTRL+C`で`yarn`を止める
- `public`内のファイルを削除
- `src/pages`以下の`.js`ファイルの拡張子を`.tsx`に変える
- `src/pages/api`ディレクトリを削除
-  `src/pages/_app.tsx`を修正

~~~typescript
import '../styles/globals.css';
import { AppProps } from 'next/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
}

export default MyApp;
~~~

* `src/pages/index.tsx`を修正

~~~typescript
const Home: React.FC = () => {
  return <div>Hello, world!</div>;
};

export default Home;
~~~

* `yarn dev`でブラウザで`http://localhost:3000`にアクセスし`Hello, world!`が表示されるのを確認、`CTRL+C`で止めるのを忘れない
# `Tailwind CSS`のインストール

~~~bash
yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
yarn tailwindcss init -p
~~~

* `tailwind.config.js`と`postcss.config.js`が作成されるので、`tailwind.config.js`を修正する

~~~javascript
module.exports = {
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
~~~

* `VSCode`で`CSS`編集中`@tailwind`部分に赤線が出ないよう`stylelint-config-recommended`をインストール(`VSCode`には`Tailwind CSS IntelliSense`と`stylelint`拡張機能をインストーしておく)

~~~bash
yarn add -D stylelint-config-recommended
~~~

* `stylelint.config.js`を作成

~~~javascript
module.exports = {
  extends: ['stylelint-config-recommended'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'tailwind'],
      },
    ],
    'block-no-empty': null,
    'unit-whitelist': ['em', 'rem', 's'],
  },
}
~~~

* `.vscode/settings.json`を作成

~~~json
{
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  "stylelint.enable": true,
  "tailwindCSS.includeLanguages": {
    "typescriptreact": "html"
  },
  "tailwindCSS.emmetCompletions": true,
  "editor.quickSuggestions": {
    "strings": true
  }
}
~~~

* この後`VSCode`を再起動すると`Tailwind CSS`の補完が効くようになっている
* `src/styles/globals.css`を修正

~~~css
@tailwind base;
@tailwind components;
@tailwind utilities;
~~~

* `src/pages/index.tsx`を修正して`Tailwind CSS`の表示を確認する

~~~typescript
const Home: React.FC = () => {
  return <h1 className="text-purple-600">Hello, world!</h1>;
};

export default Home;
~~~

* `JSX`構文に赤線が出るので`.eslintrc.json`を修正

~~~json
  "rules": {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  }
~~~

* `Hello, world!`が紫色になるか確認する

# `ESLint` `pritteier`のインストール
* `eslint`をインストールして初期設定する

~~~bash
yarn add -D eslint
yarn eslint --init

✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JSON
The config that you've selected requires the following dependencies:

eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
✔ Would you like to install them now with npm? · No / No

yarn -D eslint-plugin-react@latest, @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest eslint-plugin-react-hooks@latest eslint-plugin-jsx-a11y@latest
~~~

* 最後のインストール中にどのバージョンをインストールするか聞かれるので、最新の安定版を選択する
* `prettier`をインストール

~~~bash
yarn add -D prettier
~~~

* `.prettierrc`を作成

~~~json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "quoteProps": "preserve"
}
~~~

* `eslint-config-prettier`をインストール

~~~bash
yarn add -D eslint-config-prettier
~~~

* `.eslintrc.json`を修正

~~~json
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
~~~

* インポート順を整列するモジュールもインストールする

~~~bash
yarn add -D eslint-plugin-import
~~~

* `.eslintrc.json`に2行追加

~~~json
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/warnings", // 追加
    "plugin:import/typescript", // 追加
    "prettier",
    "prettier/@typescript-eslint"
  ],
  ...
  "plugins": ["react", "@typescript-eslint", "import"],
  "rules": {
    "import/order": [
      "warn",
      {
        "alphabetize": { "order": "asc" },
        "newlines-between": "always"
      }
    ]
  }
~~~

# Jestインストール
* 必要なモジュールをインストール

~~~bash
yarn add -D jest babel-jest @testing-library/jest-dom @testing-library/react @types/jest
~~~

* `.babelrc`を作成する

~~~json
{
  "presets": ["next/babel"]
}
~~~

* `jest.config.js`を作成

~~~javascript
module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  moduleDirectories: ['node_modules', 'src'],
};
~~~

* `package.json`に`lint`やテスト用のスクリプトを追加

~~~json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "type-check": "tsc --pretty --noEmit", // 追加
    "lint": "eslint ./src --ext ts --ext tsx", // 追加
    "test": "jest", // 追加
    "test-all": "yarn lint && yarn type-check && yarn test" // 追加
  },
~~~

* テスト用ユーティリティーファイル`test/testUtils.ts`を追加する

~~~typescript
import { RenderOptions, RenderResult, render } from '@testing-library/react';

const customRender = (
  ui: React.ReactElement,
  options: RenderOptions = {},
): RenderResult => render(ui, { ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
~~~

* テストファイル`test/pages/index.test.tsx`を追加する

~~~typescript
import Home from '../../src/pages/index';
import { render } from '../testUtils';

describe('Index page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home />, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
~~~

* テストを実行

~~~bash
yarn test-all
~~~
