
# Typescript #

## What is Typescript? ##
An enhancement to Javascript by adding strong typechecking and also new features to javascript.


## Why Typescript?
- Bring future javascript features available to javascript developers now itself
- Make it easy for C#, Java developers to work with javascript

## How it works?
The typescript code does not execute standalone. Instead it is compiled (transpiled) to javascript and run as javascript. The transpiler is provided by Microsoft.

    Typescript --[compile]--> Javascript --> Execution

_Note: All javascript code is valid typescript code._

## Usage

#### Installation
Download and install from https:///www.typescriptlang.org/
or simply do
```npm install -g typescript```
The above commmand will install the typescript compiler (tsc.exe) and a few other binaries.

#### Creating new typescript project
We can use the following command to create a new typescript project:
```tsc --init```
- Initializes a new typescript project in current folder
- Does not create a new folder
- By initializing a file called `tsconfig.json` is created.
- To update typescript project settings we can just update entries in the tsconfig.json file

#### Manual compilation
We can manually compile a typescript (.ts) file to a javascript (.js) file using the following command:
```tsc --out <js-file-name> <typescript-file-name>```
- For more information on the tsc tool, try the command `tsc --help`.
- We can also run `tsc -w` which runs the tsc in watch mode in background. As soon as a typescript file in the current project is saved, tsc automatically compiles it to a javascript file. _(Which files to compile and where to place the javascript output are defined in the tsconfig.json file)_
- Simply running `tsc` will compile all .ts files in the current folder as .js files

#### TSLint
*TSLint* is the default linter for typescript
- Installation: `npm install -g tslint` or `yarn global add tslint`
- Initialization: To initialize linting in a typescript project try the command `tslint --init` or `npx tslint --init`. This will create a `tslint.json` file which stores the linting config for typescript in current project.
- We can use a custom linting config (rules) from publicly available configurations. For example we can use 'tslint-config-airbnb` as follows:
```npm install tslint-config-airbnb```


