
# Multiple Angular versions in same PC
We can run different angular applications each using its own version of angular in the same PC. There is more than one way to do it. We will use `npx` library for our purpose.

## About npx
There are many 3rd party command line utilities that developed in nodejs, so they are distributed as node libraries. We install them using npm. Angular CLI falls in this category.
To use a command line utiltiy we install the libray using following syntax:
> npm i -g [utility-name]@[version]

#### Examples
```bash
# install angular cli version 6.1.0
npm i -g @angular-cli@6.1.0
# install apidoc tool latest version
npm i -g apidoc
# install json2csv utility for conversion of json to csv format
npm install -g json2csv
```

The above command will install the uitlity (specific version) globally, so we can run the utility in the terminal window easily.
### Limitation
There is a limitation with this global installation: We can only use one version of the library at a time. If we want to use a older version or newer version of the utility, we have to uninstall the current version and then install the target version. This is a time consuming process. If we need to switch between versions frequently it is a challenging process.

### Solution
The `npx` library helps us solve this problem. We can install a different version of the utility in the local `node_modules` folder and then use this version instead of global version.
To do this first install `npx`:
> npm i -g npx

After install we can run the local version of utility with following syntax:
> npx [utility] [args]

example:
>npx ng new proj1
>npx ng serve

In the above example, the angular-cli installed in the local `node_mdoules` folder will be used instead of the version install globally.
