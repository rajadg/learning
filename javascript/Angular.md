
# Angular 7

## Getting Started
### Installation

Angular 7 can be installed using npm:
> npm install -g @angular/cli

The @angular/cli module is the command line module which is capable of creating and updating an angular 7 project. It is recommended to install the @angular/cli globally, but we can also install it locally in the project folder if required. When we install the angular cli as global, we can access the angular cli using the command `ng`. There are multiple options that the `ng` command supports. We can find them using `ng -h`.

#### Detailed Steps
1. Install **nodejs**, which will also ensure **npm** is available as well. (url: https://nodejs.org/en/download/)
2. Install angular cli globally with following command in terminal:
>    **npm install -g @angular/cli**
3. Once **angular cli** is installed, we have the angular functionality available in our PC.
4. We need an IDE. There are many IDEs like Atom, Brackets, VS Code, Visual Studio Pro, Ecilpse, etc. Installing **VS Code** is recommended as it is suitable for all kind of developers and also widely used on all desktop platforms (url: https://code.visualstudio.com/Download)
5. Typescript is required for angular, but it should be available as part of angular projects. To install typescript explicitly in the PC, use the following command in terminal:
> **npm install -g typescript**
6. Now we have the following items installed and ready to stard development of Angular JS:
   1. NodeJS
   2. Angular 7 or later
   3. VS Code IDE
   4. typescript


#### Summary
With the following 2 steps we are ready to go:
```bash
npm install -g typescript
npm install -g @angular/cli
```

---

### Creating a new project

#### Quick Steps

The `@angular/cli` is used to create a new angular project and run it:
```bash
ng new myApp
cd myApp
ng serve
```
#### Detailed Description
The `ng new` command is to create a new empty angular application. The command `ng serve` is used to host the angular app in a local static webserver. The default url where the angular app will be available is http://localhost:4200/

The process of creating a new angular project will take sometime as the project creation requires retrieving a lot of libraries. The node_modules folder will be created which will contain around *30,000 files* with a total size of *270 Mb*. Depending on the speed of internet connection, the project creation time will vary (*time taken to download all 270 Mb from internet*)

__Note__: If there is a slow connection, it is better to explore npm library cache options like '*artifactory*', '*sonatype nexus*', *npm local cache*, etc. These products can cache the libraries downloaded from internet. So after first time creating the angular project, all required libraries will be cached. Future attempts at creating new project, adding new functionality, etc will take lesser duration.

### Running the application

We can simply run the application using the following command line:
> ng serve

This will launch a web server in the background that will host the angular application in port 4200. We can open the application in a browser using the url: http://localhost:4200/

There is a much better way to run the application during development, which uses the following command line:
> ng serve -o --watch

This command will start the angular app in backgroud, then open the url (http://localhost:4200/) in the system's default browser (_the argument **-o** will do this_). Also whenever any changes are saved in the code, the code will recompile because of the **--watch** option.

# Components and Routing
We will look at how to generate components and also how to route to these components

---
## Generation

A component can be created using the angular CLI. Run the following command in the terminal:
> ng generate component \<component-name>

or the short form of it:
> ng g c \<component-name>

We can also try to add tests and specs for the component with options **-it** and **-is** like this:
> ng g c \<component-name> -it -is

To generate a component by name album-list we can run the following command in terminal:
> ng g c album-list -it -is

The above command will create the following files:
- album-list/album-list.component.ts
  - This file contains the typescript code for the component (`class AlbumListComponent`). 
- album-list/album-list.component.spec.ts
  - The file contains the tests for the component album-list.

The HTML, css for this component are present inline like this:
```typescript
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-album-list',
  template: `<p> album-list works! </p>`,
  styles: []
})
export class AlbumListComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
}
```
### Description
1. The **AlbumListComponent** contains the typescript code that will be later compiled to javascript and runs in the browser.
2. The `@Component` is a typescript decorator. This decorator specifies the meatadata about the **AlbumListComponent** class:
   1. The **selector** is name of the html tag we will use in the parent component to include this component like: ```<app-album-list></app-album-list>```
   2. The **template** specifies the inline HTML template. The HTML tags are specified inside the backquote string \`\` which is introduced in **ES6** that supports multiline text.
   3. The **styles** is an array of css styles used by the HTML part of this component.

### Enhancments
If we have a lot of styles and html tags for this components then we can create dedicated html and css for this components as follows:
- album-list/album-list.component.html
- album-list/album-list.component.css

After this update the album-list.component.ts file as follows:
```typescript
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
```
There are two changes:
- Replaced the `template` parameter with `templateUrl` parameter and the value is the actual html file path './album-list.component.html'.
- Replaced the `styles` parameter with `styleUrls` parameter and the value is the actual html file path './album-list.component.css'.

If we do not use the `-it` and `-is` options in `ng g c` command then the dedicated template file and style sheet will be created. (-it and -is means inline template and inline style)

Alternatively we can update the `schematics` element in the angular.json file in the root folder of the application as follows:
```json
"schematics": {
    "@schematics/angular:component": {
        "inlineTemplate": false,
        "inlineStyle": false
    }
}
```
After the above update any component we create will have a dedicate html template file and css file.

### HTML Template
- **default option**: (`templateUrl: './app-component.html'`)
    - This puts the template Html in a separate file.
- **inline option**: This can be done when creating a component using `-it` switch in command line. The inline html template looks like this in the component.ts file:
    ```typescript
    template: `<div>Inline Template</div>`
    ``` 
    - It is better to use the ES7 backquote (``) for strings inside the html inline template. This syntax allows us to use html template with multiple lines inside the typescript code easily.

### Styles
- **default option**: (`styleUrl: './app-component.css'`)
    - This puts the css styles in a separate file.
- **inline option**: This can be done when creating a component using `-is` switch in command line. The inline css style looks like this in the component.ts file:
    ```typescript
    styles: (styles: [`div {color: red}`, `span {color: green}`])
    ``` 
    - The styles are embedded inside teh component.ts file.
    - The styles is a array of strings.
    - Use the ES7 backquote (``) for inline styles with multiple lines.

### Interpolation
* Declare a variable in the component class (e.g: `title`).
* Use the variable in the html template using the notation `{{ }}`. 
Example:
```html
<div>Welcome to {{title}} </div>
```
* The component class must inherit from the OnInit. The OnInit is declared in teh (`@angular/core` module)
* We can have expressions in interpolation. Example: `{{2+2}}` in the html will be displayed as `4` in the UI.
* Any javascript expression can be used inside the notation `{{}}`
* The expression inside `{{}}` will translate to a value of function call. But it cannot be used assign a value to a variable.
* All expressions (inside template HTML) are scoped inside the component class only. But code inside the Component class can easily access the global variables.
* In case we want to access some global variable inside the template HTML we need to create a proxy inside the component class to access the global. This proxy will be a member of component class, so accessible within HTML template.


---
## Using a Component
There are two ways a component can be added to a parent component:
1. Directly embedding the html selector tag into the parent component. An example for this is the app.component created by default in the angular application.
2. Creating a route that can embed more than one component in the parent component.

---
### Adding a child component
#### TODO
Explanation of how to add a child component

### Routing
Routes are used to embedd multiple components in a parent and then switch between each based on the url requested.
#### TODO
Explanation of how to setup routes

---

## App vs Module vs Component
* An app can have multiple modules
* A module can have multiple components
* A component is similar to a controller in angulars 1.x.
* A component implements a UI fragment. It could be a html tag or an attribute or a class.
---

## Parts of 