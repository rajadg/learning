# Angular
Official Documentation: https://angular.io/docs
- [Angular](#angular)
- [Basics](#basics)
  - [Starting Angular](#starting-angular)
    - [Steps](#steps)
  - [Angular Project Structure](#angular-project-structure)
    - [app folder](#app-folder)
      - [app-component](#app-component)
      - [other application files](#other-application-files)
    - [assets foler](#assets-foler)
    - [environment folder](#environment-folder)
    - [angular.json](#angularjson)
    - [tsconfig.json](#tsconfigjson)

# Basics
## Starting Angular
To start working with angular project we must install the angular cli. This angular cli is later used to create a new angular project or add more module/component/service/etc to an existing angular project. Once the angular cli is installed (globally using npm), we can use this to create a new project, add components, build/run the project.
### Steps 
1. Install angular/cli using the following command:

   >npm install -g @angular/cli

   * The above command installs angular cli latest version. For angular 7 development, use `@angular/cli@7.3.9`
2. Create a new Project:
   >ng new myproj
    
   * The above command if run first time on a PC will take a few minutes to download all the angular related libraries from internet. Second time onwards the time taken will be less.
3. Once the project is created we can run the project using the following command:
   >ng serve
   
   * This will now start the angular application and serve in port 4200. We can access the angular application using url http://localhost:4200
    _Note: By default a new project will have tutorial 'tour or heroes', but we can modify the project easily to have the UI we need._

4. Add components to angular app for new UI:
    >ng generate component mycomp

    * This will generate a component (a UI component with typescript file, HTML template, CSS style) of name 'mycomp'. We can also use a short form for the above command: *`ng g c mycomp`* which is easy to type in the commandline.

5. We can also build the angular project so that it can be deployed on a server. To do this use the following command:
   >ng build

6. We can also run the angular in watch mode so that changes are immediately auto-compiled and rendered in the webpage:
   >ng serve -o --watch

## Angular Project Structure
### app folder
All the active code for an angular application will be inside the sub-folder `./src/app`. 
#### app-component
The app component is the main component in the application and all other components are generally placed inside the app component.
   * The `./src/app/app.component.html` file contains the HTML template for the app  component.
   * The `./src/app/app.component.ts` file contains the typescript code for this component.
   * The `./src/app/app.component.css` file contains the styles used by the HTML template.
   * The  `./src/app/app.component.spec.ts` file contains the unit tests for this component.

_Note: It is possible to change the opening component of the application to something other than app component. Simply replace the `app-root` tag in the `./src/index.html` with the tag of the desired component to acheive this._

#### other application files
* The  `./src/app/app.module.ts` file contains the module class for the whole application.
* The  `./src/app/app-routing.module.ts` file contains the routing configuration to other components inside the angular application.

### assets foler
The `./src/assets` folder is used to house the localized resource files (translated UI strings) and images. It can also contain any other media required the application that is small enough to be deployed along with angular application.

### environment folder
The same angular application can be hosted in different environments (e.g: Development, Testing, Production, etc). To do this we can create one configuration file per enviroment inside this `./src/environment` folder. Example for development we can create environment.dev.ts, for production we can use environment.prod.ts, etc.
According to the build/run configuration done in the angular.json file appropriate environment file will be loaded at build time.

### angular.json
This file contains the angular project configuration. All the build settings for angular are configured in this file.

### tsconfig.json
This file contains the typescript configuration as the angular application runs on typescript. We can configure the ECMA version, typescript rules, etc in this file.


## Components
A component controls a part (or patch) of the screen which is called the view. A component consists of a HTML Template (visible in UI), a class which contains the client side script (logic) and a style sheet. A whole Web page of the angular App can be made of one component or it could be comprised of multiple components based on what is required for the Web application.
### Component Structure
![Component Structure](./images/component-databinding.png)
* `Template <>` - This is the HTML template which uses the Angular Template syntax
* `Commponent {}` - This is the typescript class that controls the component
* `Metadata` - This is @ directive in the component's typescript class which links the HTML Template and Stylesheet to the typescript class

### Creation
To add new component we can use angular cli. The following command will create a new component by name `test`:
>ng generate component test

#### Genearted Files
The generated component will have 4 files:
* `test.component.ts` - The typescript class for this component
* `test.component.spec.ts` - The unit test class for this component
* `test.component.html` - The HTML template for this component
* `test.component.css` - The style sheet for this component.

The stylesheet will be initially empty, whereas the HTML template will have a simple placemark HTML tag. This should be replaced with the desired HTML content to be rendered in the UI.
The `test.component.spec.ts` is an auto-generated unit test file, and we can write our unit tests inside this file to test our component.
The `test.component.ts` is the auto-generated component typescript class. Add the logic for this component inside this file. A newly created component class looks like this:
```typescript
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  constructor() { }
  ngOnInit() {  }
}
```
#### Using a Component
The `@Component` directive is the metadata part of this component that links the class `TestComponent` with the HTML template and stylesheet. It also defines a selector `app-test` for this component. This enables us to use this component inside another component (in the HTML template) like this: 
```HTML
<test-component></test-component>
```
We can also create the component with a very short command line: 
>ng g c test

Here the `generate` is cut short as `g` and the `component` is cutshort as `c`. This short commandline is meant to simplify the component creation command line and also reduces chances of typing errors.

### Inline Template
A small component limited HTML/CSS content can be defined with iniline definitions like this:
```typescript
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-para',
  template: `<p> test paragraph </p>`,
  styles: []
})
export class ParaComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}
```
Note that to define inline HTML and css we are using `template` instead of `templateUrl` and `styles` instead of `styleUrls` in the metadata.
### Three ways to specify a Selector
- The above component can be included in another component as a HTML like tag. 
- If we need to use a component as a css class, the selector directive should be like `.app-para`.
- If we need to use the component like an attribute, the selector directive should be like `[app-para]`.

## Interpolation
Interpolation means rendering the value of a property from the typescript class in the HTML side. For example, if we have a property `name` in the typescript class we can display the value of the name in the HTML by using the syntax: `{{name}}`. If we type `Welcome {{name}}` in HTML and define the value of `name` as `Guest`, then the browser will display this HTML as `Welcom Guest`.
```typescript
import { Component, OnInit } from '@angular/core';
@Component({
  selector: '[app-welcome]',
  template: 'Welcome {{name}}',
  styles: []
})
export class WelcomeComponent implements OnInit {
  private name = 'Guest';
  constructor() { }
  ngOnInit() {  }
}
```
The above component will be displayed in the browser as:
> Welcome Guest


If we change the vlaue of `name` property dynamically, immediately the contents displayed in the browser will change to reflect the new value of the name.

The content inside the `{{` `}}` pair is treated as a javascript expression and will be evaluated before being rendered in the browser. Which means if we use `{{name.toUpperCase()}}` in the HTML then the text displayed in the browser will be like this:
> Welcome GUEST

We can also use any arithmetic expression, method call, etc inside the `{{` `}}` pair; the content will be evaluated as a javascript expression and the browser will display the result of the evaluated expression. We can use `{{2+2}}` in HTML template and it will be displayed as `4` in the browser.

#### Interpolation Limits
* We can only use an expression within a `{{` `}}` pair. But a javascript assignment statement like `{{a=2+2}}` is not allowed.
* The expression inside the `{{` `}}` pair cannot make use of global javascript variables like `window`. For example, if we try `{{window.location.href}}` this will raise an error, instead of displaying the current URL value. If we need to use global javascript variables with interpolation, we need to first assign the value of global variable to a property in the component's typescript class. Then we can use this property in the HTML template using inerpolation.

## Property Binding
Property binding is similar to interpolation where the change in the value of property in the typescript class will reflect in the the HTML that is rendered in the browser. The interpolation has limited scope and cannot affect the DOM. But property binding can affect the DOM when the value of the property changes inside the typescript class.
There are two ways to do property binding:
-  **Enclosing inside `[]`** - We can simply enclose the property inside `[]` like this: `<img [height]='imageHeight'>...` and then declare the property `imageHeight` in the typescript class as `class ImageComponent { ... private imageHeight = 200; ...`.
- **Prefixing with `bind-`** - Prefixing the attribute name with `bind-`ensures the attribute is bound to typescript property. HTML: `<img bind-height='imageHeight' ...>` and typescript class:  `class ImageComponent { ... private imageHeight = 200; ...`.

Either way, the data travels in only one way: The data can be changed inside the typescript class, it will be reflected in the HTML in browser. Any changes to the attribute in the DOM in the browser will not reflect back in the typescript class property. Refer the direction of property binding in the `Component Strucuture` picture above.

### Class Binding
Class binding is like property binding, but can be done in three different ways:
1. **Simple Binding** - Binds one or more CSS Classes to HTML element. Bind the class attribute using basic property binding => `[class]="propName"` where propName is the property from typescript class that can change at run time.
2. **Binding by Condition** - Binds single class to HTML element based on condition. Bind the class attribute based on condition => `[class.cssName]="condition"` where `condition` is a javascript expression, and `cssName` is a valid css class name from style sheet.
3. **ngClass Binding** - Binds one or more CSS Classes to HTML element. Bind using ngClass attribute to a map of flags => `[ngClass]="mapName"` where mapName is the property from typescript class which is map of flags(true/false value). Name of each flag is same as css class name from style sheet.

#### 1. Simple Binding
We can bind the class attribute to the property like property binding. To have this type of class binding to an element in the HTML we should use the syntax `[class]="propName"`, where the `propName` is the name of property in typescript class. The value of this property can be set to any valid CSS class name.
##### Example
###### CSS
```css
.errMsg {color: red;}
.infoMsg {color: black;}
.successMsg {color: green;}
```
###### HTML
```HTML
<div [class]='activeStyle'>This is target message</div>
```
##### Typescript
```typescript
class MyComponent {
    private activeStyle = 'infoMsg';
    onError() {
        this.activeStyle = 'errMsg';
    }
    onSuccess() {
        this.activeStyle = 'successMsg';
    }
}
```
#### 2. Binding based on Condition
We can bind the class attribute to a specific class and enable it based on a condition. To have this type of class binding to an element in the HTML we should use the syntax ` [class.cssName]="condition"`, where the cssName is the name of the css class (from CSS file) and the condition is a typescript expression that will evaluate to true/false at runtime. When (at some point during user interaction) if the condition evaluates to try, the css class (cssName) will be applied. When the condition evaluates to false, the css class will be removed from the HTML element.
##### Example
**CSS** ```.errMsg {color: red;}```

**HTML** ```<div [class.errMsg]='hasError'>This is the status message</div>```

**Typescript**
```typescript
class MyComponent {
    private hasError = false;
    onError() {
        this.hasError = true;
    }
    onSuccess() {
        this.hasError = false;
    }
}
```
In the above example, the binding condition in HTML template uses the property `hasError` only (as any property evaluates as an expression). If required in place of `hasError` (in HTML template) we can use an expression in the HTML template.

#### 3. Binding with `ngClass` directive
We can bind multiple CSS classes to a HTML element based on conditions by using the `ngClass` attribute. This will enable us to even have different combinations of styles at run time based on the state of the application at run time. To have this type of class binding to an element in the HTML we should use the syntax `[ngClass]="classMap"`, where the `classMap` is the property in the typescript. This classMap is an object and each member of this object is a valid CSS class name. The value of this member is either true or false based if the specific CSS class is required or not.
##### Example
##### Example
###### CSS
```css
.errMsg {color: red;}
.largeMsg {font-size: large;}
.italicsMsg {font-style: italic;}
.underlinedMsg {text-decoration: underline;}
```
###### HTML
```HTML
<div [ngClass]='activeStyle'>This is target message</div>
```
**Typescript**
```typescript
class MyComponent {
        private activeStyle = {
        errMsg: false,
        largeMsg: false, 
        italicMsg: false,
        underlinedMsg: false,                  
    };
    false;
    onError() {
        this.activeStyle.errMsg = true;
    }
    onSuccess() {
        this.activeStyle.errMsg = false;
    }
    onHighlight() {
        this.activeStyle.largeMsg = true;
    }
}
```
In the above example, the `activeStyle` is an object and each member is the name of a valid CSS class in style sheet. If make any of this member true, then the specific CSS class will be applied to the HTML element.


### Style Binding
Style binding is like class binding and can be done in three different ways:
1. **Simple Binding** - Binds style attribute to typescript property, and the typescript property should hold the raw styles. Bind the style attribute using basic property binding => `[style]="styleData"` where styleData is the property from typescript class that can change at run time. The value of style data can be something like: `color: green; border: solid 1px black;`
2. **Binding by expression** - Binds single style in HTML element based on expression. Bind the style attribute based on expression => `[style.styleProp]="expression"` where `expression` is a javascript expression / typescript property, the `styleProp` is a valid css style like color, font, etc. Only one style property is allowed. The `expression` should evaluate to valid value for the style. For example if we use `[style.color]="colorValue"` in HTML template, then the typescript property `colorValue` can have only a valid color value like red, green, #ff00ff, etc.
3. **ngStyle Binding** - Binds one or more css styles to the HTML element. Bind using ngStyle attribute to a map of flags => `[ngStyle]="styleMap"` where `styleMap` is the property from typescript class which is map of styles. A style can be color, font, etc and the value can be valid value for that style.

#### 1. Simple Binding Example
##### HTML
```HTML
<div [style]='activeStyle'>This is target message</div>
```
##### Typescript
```typescript
class MyComponent {
    private activeStyle = 'color: black;';
    onError() {
        this.activeStyle = 'color: red;';
    }
    onSuccess() {
        this.activeStyle = 'color: green;';
    }
}
```

#### 2. Binding based on expression Example
##### HTML
```HTML
<div [style.color]='activeColor'>This is the status message</div>
```

##### Typescript
```typescript
class MyComponent {
    private activeColor = 'black';
    onError() {
        this.activeColor = 'red';
    }
    onSuccess() {
        this.activeColor = 'green';
    }
}
```

#### 3. Binding with `ngStyle` directive Example

##### HTML
```HTML
<div [ngStyle]='myStyle'>This is target message</div>
```
##### Typescript
```typescript
class MyComponent {
    private myStyle = {
        color: 'black',
        fontSize: 'normal', 
        textDecoration: 'none',                  
    };
    onError() {
        this.myStyle.color = 'red';
        this.myStyle.textDecoration = 'underline';
    }
    onSuccess() {
        this.myStyle.color = 'green';
    }
    onHighlight() {
        this.myStyle.fontSize = 'large';
    }
}
```


