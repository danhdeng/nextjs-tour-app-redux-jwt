# react-tour-app-redux-jwt

---

Sever Setup

# dependencies package

pnpm install bcryptjs cors express jsonwebtoken mongoose morgan

# development dependencies package

pnpm install nodemon --save-dev

# install the typescript

pnpm install --save-dev typescript

# create a tsconfig.json with several options

npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true

---

Client Setup

# use pnpm to create nextjs app with typescript template

pnpm create next-app -- --ts

# install eslint

pnpm install eslint --save-dev

# configure eslint

npx eslint --init

###############################################################
eslint config settings
λ pnpm eslint --init
You can also run this command directly using 'npm init @eslint/config'.
Need to install the following packages:
@eslint/create-config
Ok to proceed? (y) y
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm
√ Which framework does your project use? · react
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ How would you like to define a style for your project? · guide
√ Which style guide do you want to follow? · google
√ What format do you want your config file to be in? · JavaScript
Checking peerDependencies of eslint-config-google@latest
The config that you've selected requires the following dependencies:

eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest eslint-config-google@latest eslint@>=5.16.0 @typescript-eslint/parser@latest
#############################################################################

# update .eslintrc.js to avoid the errors related to react

```json
settings: {
    react: {
      version: 'latest',
    },
  },
```

# install prettier

pnpm install prettier --save-dev

# install eslint-config-prettier

pnpm install eslint-config-prettier --save-dev

# update extends section with prettier in .eslintrc.js

extends: ['plugin:react/recommended', 'google', 'prettier']

```json

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "next", "google", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {},
  settings: {
    react: {
      version: "detect",
    },
  },
};


```

# create prettier configuration files

touch .prettierrc

# add the following rules to the prettier config file

```json
{
  "endOfLine": "lf",
  "printWidth": 80,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

# create .eslintrcignore .prettierignore to ignore eslint and prettier rules

touch .eslintrcignore .prettierignore

# added following setting to the .eslintrcignore .prettierignore

.next
next-env.d.ts
node_modules
yarn.lock
package-lock.json
public

# use prettier to format all files inside the project

prettier --write .

# setup the vscode settings for the projects

mkdir .vscode
touch settings.json

# add the following settings to the settings.json file

```json
{
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.format": true
  }
}
```

# install Husky to setup pre-commit hooks to verify the following validations

1. Prettier (No Warming)
2. Eslint (No Warming)
3. typescript (No Compile Error)
4. Next.js Build (No Build Error)

# install Husky

pnpm install husky --save-dev
