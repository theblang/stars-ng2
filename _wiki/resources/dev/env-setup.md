# env setup

# Contract Setup

## Install truffle

1.  Install Python 2.x and add it to PATH
    *   Note: truffle will not install with Python 3.x
    *   Note: On Windows you may get errors about node-gyp. If so try installing [this package](https://github.com/felixrieseberg/windows-build-tools) and / or going to Microsoft Visual Studio, starting a new Visual C++ project, and choosing `Install Visual C++ 2015 Tools for Windows Desktop`.
2.  `npm install -g truffle`

## Install testrpc (local dev blockchain)

npm install -g ethereumjs-testrpc

#Startup

1.  testrpc (starts local blockchain)
2.  truffle migrate (deploys contract to blockchain)
3.  npm run build
4.  truffle serve

# Webapp Setup (WIP)

1.  Checkout project
2.  Install angular-cli globally: `npm i angular-cli -g`
3.  Install project dependencies: `npm i`