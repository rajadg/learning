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
