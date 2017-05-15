# env setup

# Contract Env

## Install truffle

1. Install Python 2.x and add it to PATH
    - Note: truffle will not install on Python 3.x
    - If on Windows also install [this package](https://github.com/felixrieseberg/windows-build-tools): `npm install windows-build-tools -g`
2. npm install -g truffle

## Install testrpc (local dev blockchain)

npm install -g ethereumjs-testrpc

#Startup

1. testrpc (starts local blockchain)
1. truffle migrate (deploys contract to blockchain)
1. npm run build
1. truffle serve

# Webapp Env (WIP)

1. Checkout project
2. Install angular-cli globally: `npm i angular-cli -g`
3. Install project dependencies: `npm i`
