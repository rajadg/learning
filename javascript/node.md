# Node Confiuration and Usage

This documentation explains nodejs configuration and usage:
- Installing NodeJS
- Executing Javascript
- Installing Javascript libraries
  - Alternate options
- Creating New Projects
- Working with existing projects

## Installation
The nodejs can be downloaded and installed from URL https://nodejs.org/en/. This installs the node interpreter and npm package manager both.

## Usage
### Execute Javascript
We can use the **`node`** interpreter to execute any javascript code with following command:
 **``` node <javascript-file> ```**

Example:
>    node myscript.js

### Install a Library
We can use the **`npm`** package manager to install any javascript library.
Syntax:
**```npm install <package-name>```** to install a package in current folder / project.
or 
**```npm install -g <package-name>```** to install a package for the whole system which requires the **`-g`** switch

The npm is installed by defaul along with node. So no need to install it separately. To know the version of npm simply use following command:
**`npm -v`**

To remove a package we can use the following command syntax:
**`npm uninstall <package-name>`**
To remove a package globally we can use the **`-g`** switch:
**`npm unistall -g <package-name>`**

To know more about npm options try help:
**`npm -h`**

#### Alternatives
The **yarn** package manager can be use in place of npm, but this needs to be installed manually as it is not distributed as part of node. We need to download the installer and install (from url: https://yarnpkg.com/en/)

#### More info
* When we install a package locally (without `-g` option) the package is only available to the local project (or current folder). Other projects cannot use the library.
* Installing a library (package) locally is recommended. Because this way different projects in the same PC can use different versions of the same library (package).
* Some packages like **mocha**, **nyc**, **http-server**, **nodemon**, **branch-diff**, **yarn**, **ndb**, **eslint**, **now**, **tldr**, **typescript**, **create-react-app**, **npx**, **@angular/cli** are generally run as commands in command prompt / terminal. Such packages are commonly used by all projects (and version is irrelevant). So we can install them globally using *`-g`* option so it is available to all projects in the PC.

### New Project Creation

We can initialize a new nodejs project by the following command:
**```npm init```**
* The above command will take us through some steps like configuring name, description, author, github url, license type, etc and then initialize the nodejs project. 
* The project settings are stored in the package.json file. So this must by part of active source code. We can also new dependencies (external js library/package) in the dependencies section in package.json file.
* The folder for the project should be created manually before running the `npm init` command as this command does not create a new folder.

### Existing project

If we clone an existing project from github (or svn) then only the source code will be replicated. To install the libraries we need the following command:
**```npm install```**

This will install all the packages listed in the package.json file locally.
*__Note__: The external javascript libraries (packages) are not stored in github as they occupy a lot of space. Instead the external libraries are listed under dependencies section in package.json file. Hence the need for`npm install` after locally cloning the source code*






