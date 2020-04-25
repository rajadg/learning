
- [Routing](#routing)
  - [Wild Card Routes](#wild-card-routes)
  - [Route Parameters](#route-parameters)
    - [1. Defining Route with Parameters](#1-defining-route-with-parameters)
    - [2. Implementation of Component with Route Parameter](#2-implementation-of-component-with-route-parameter)
    - [3. Pass the parameter to route when redirecting to the route](#3-pass-the-parameter-to-route-when-redirecting-to-the-route)
    - [4. Implementation of Component with Route Parameter (dynamic)](#4-implementation-of-component-with-route-parameter-dynamic)
  - [Passing optional parameters](#passing-optional-parameters)
  - [Relative routes](#relative-routes)
  - [Child Routes](#child-routes)


# Routing

To create a project with routing option try the following commandline:
>ng new my-project --routing

To configure a route in existing project manually:
* Add the tag `<base href="/">` in the `./src/index.html` file. This is required if the project does not have routing support yet.
* Create a new file `app-routing.module.ts` which is the routing module for the application (class name `AppRoutingModule` decorated by `NgModule`).
* Import the `AppRoutingModule` in the app.module.ts file and also add it to the declarations in the `Imports` section of the AppModule.
* Add the routes in the `routes` array (type: `Routes`) in the `app-routing.module.ts` file. This array is a global variable outside the `AppRoutingModule` class.
    * Each routing entry is an object like this: ```{path: 'search`, component: `SearchComponent`}```. The `search` specifies the relative path in the Url and the `SearchComponent` is the actual component that will be loaded when url contains the `search` (example: `http://localhost:4200/search`).
* Pass the routes as a parameter (`RouterModule.forRoot(routes)`) as imports in the AppRoutingModule decorator.
* Add the `router-outlet` tag in the app.component.html file like this: ```<router-outlet></router-outlet>```
* To link to the new route from a web page, use the `a` tag with `routerLink` attribute (instead of href attribute). Example: `<a routerLink='./search' routerLinkActive='active'>Search</a>` where `routerLink='./search'` specifies the relative url of the component, and the `routerLinkActive='active'` is used to change the style of anchor when the active url is `./search`, the `active` is a css class.

**Example of RoutingModule (routing Module)**

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Comp01Component } from './comp01/comp01.component';
import { Comp02Component } from './comp02/comp02.component';

const routes: Routes = [
  {path: 'comp01', component: Comp01Component},
  {path: 'comp02', component: Comp02Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
**Example of HTML template (app component)**

```html
<div style="text-align:center">
  <h1>Welcome to {{ title }}!</h1>
</div>
<a routerLink='./comp01' routerLinkActive='active'>First Component</a>
<a routerLink='./comp02' routerLinkActive='active'>Second Component</a>
<br/>
<router-outlet></router-outlet>
```

**Example of CSS file (app component)**

```css
a.active {
    background-color:#dfdfff;
    border: solid 1px lightblue;
};
```

## Wild Card Routes

We can also have wild card routes to handle all remaining routes not explicitly handled by available routes like this:
> {path: '**', component: NotFoundComponent},

The above entry should be the last route in the list of routes because the `**` will match with all given paths in url. So if we insert in first then other routes will never work. So always use wildcard routes as the last.
```typescript
const routes: Routes = [
  {path: 'comp01', component: Comp01Component},
  {path: 'comp02', component: Comp02Component},
  {path: '**', component: NotFoundComponent},
];
```

But for empty route also the above routing configuraiton will display NotFoundComponent. In order to handle empty path we can redirectTo option in routes. redirectTo option as the name suggests allows to redirect from one path to an existing route. Example:
```typescript
const routes: Routes = [
  {path: '', redirectTo: '/comp01', pathMatch: 'full'},
  {path: 'comp01', component: Comp01Component},
  {path: 'comp02', component: Comp02Component},
  {path: '**', component: NotFoundComponent},
];
```

Here whenever we type the base url "http://localhost:4200" the browser will automatically redirect to "http://localhost:4200/comp01" due to the redirecting route configured for empty path.

## Route Parameters
We can pass parameters in the route so that the component for the route can receive these parameters. The caller component can pass the parameters in the path, and once the target component is loaded based on the path/route, it retrieve the parameters passed by the caller. To implement thiswe have three steps:
- Define the route with path containing parameter (the path of route contains the parameter prefixed with a `:`)
- Implement the Component that can receive the parameter
- Pass the parameter to route when redirecting to the route (Use the `Router` component to call the route with parameter)

### 1. Defining Route with Parameters
The route can be created like this (refer the route definition for `BookComponent`):
```typescript
const routes: Routes = [
  {path: 'book/:isbn', component: BookComponent},
  {path: '**', component: NotFoundComponent},
];
```
Here the `:isbn` denotes that the route will receive a parameter with name `isbn`. The path of the route here is `book`. The above code is the route definition in the `RoutingModule`.

### 2. Implementation of Component with Route Parameter
We can retrieve the parameter passed to the route by using `ActivatedRoute` service.
```typescript
...
import { ActivatedRoute } from '@angular/router';
...
export class BookComponent implements OnInit {
  bookIsbn: string;
  constructor(private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.bookIsbn = this.activatedRoute.snapshot.paramMap.get('isbn');
  }
}
```
* The ActivatedRoute is a service, so it should be injected in the constructor of the calling component.
* The `activatedRoute.snapshot.paramMap.get` method should be called to retrieve the parameter passed to the route. The argument passed to the `get` method is the same as the parameter name defined in the routing module.
* **Caution**: This approach has a limitation. Since a snapshot of the activated route is used, navigating from the component to same component with parameters  (like moving between pages in pagniation) does not work properly. The value of the parameter will remain same even after we reload with a different value for parameter. An alternate is provided in point 4 below.

### 3. Pass the parameter to route when redirecting to the route
To Router.navigate method can be called from the typescript to navigate to the target route. An extra arugment is what it takes to send the parameter when going to the route.
```typescript
...
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  template: ` <p> Found book {{bookIsbn}} </p> `,
  styles: []
})
export class AppComponent {
  ...
  protected textIsbn: string;
  constructor(private router: Router) { }
  findBook() {
    this.router.navigate(['/book', this.textIsbn]);
  }
}
```
* The Router is a service, so it should be injected in the constructor of the calling component.
* The nagivate method takes an array as argument. The first itemin the array is the path of the route, while the second item in array is the parameter value we wish to pass to the new (target) component.
* As the `textIsbn` parameter is bound to the view we can bind the value to view using interpolation. The line ```  template: ` <p> Found book {{bookIsbn}} </p> `,``` in the above example.

### 4. Implementation of Component with Route Parameter (dynamic)
We can retrieve the parameter passed to the route by using `ActivatedRoute` service by subscribing to the `paramMap` observable:

```typescript
...
import { ActivatedRoute } from '@angular/router';
...
export class BookComponent implements OnInit {
  bookIsbn: string;
  constructor(private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) => {
      this.bookIsbn = paramMap.get('isbn');
    });
  }
}
```
* The ActivatedRoute is a service, so it should be injected in the constructor of the calling component.
* The `activatedRoute.paramMap.subscribe` will be fired every time the page loads with a new value for the parameter. The `paramMap` argument on the callback methods is always the latest parameter map; so we can call `paramMap.get` method to retrieve latest value for our route parameter.

## Passing optional parameters
If the route does not specify the parameter in the path, then we can still pass a parameter to the target component.
```typescript
// STEP 1: [app-routing.module.ts file] route entry in the routing module
const routes: Routes = [
  {path: 'book', component: BookComponent},
  {path: '**', component: NotFoundComponent},
];

// STEP 2: [index.component.ts file] Calling route with optional parameter
this.router.navigate(['/book', {name: 'introducing angular'}]);

// STEP 3: [book.component.ts file] recieving the parameter
ngOnInit() {
    this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) => {
      this.bookName = paramMap.get('name');
    });
  }
```
In the above example, the user will be navigating from the index component to the book component:
* The route (in routing module) for the book component does not define any parameter. The path for this route is simply `/book`.
* The index component navigates to book component with a route paramter. The route parameter is an object with name value pairs inside. So we can pass one or more optional parameters here.
* The book component simply fetches the value of parameter `name` inside the callback method for `ActivatedRoute.paramMap` observable.
* When the navigation happens, the application navigates from index component to the url: `http://localhost:4200/book;name=introducing+angular`. Note that the optional parameter is appended to the end of the url after a semicolon `;`.
* Each optional parameter (name-value pair in the object passed to `router.navigate` method) will be appended after one semicolon `;` in the URL. If we pass multiple params the url will be appended with something like: `http://localhost:4200/book;author=any;year=2020;subject=angular`

## Relative routes
The navigate to a path relative to the current path, use the `relateiveTo` option in the `router.navigate` method like this:
```typescript
// Declarations
import { Router, ActivatedRoute } from '@angular/router';
// Constructor
constructor(private router: Router, private route: ActivatedRoute ) {  }
// Navigation
this.router.navigate([{year: 2020}], {relativeTo: this.route});
```
In the above example, if the current component's route path is `/book`, then navigation will ensure the route is navigating to same component by means of the `{relativeTo: this.route}` parameter.


## Child Routes
The child routes can be added as children attribute inside an existing route like this:
```typescript
import { BookComponent } from './books/book/book.component';
import { AuthorComponent } from './books/author/author.component';
import { PublisherComponent } from './books/publisher/publisher.component';
// Define routes
const routes: Routes = [
  {
    path: 'book/:isbn', component: BookComponent,
    children: [
      { path: 'author', component: AuthorComponent },
      { path: 'publisher', component: PublisherComponent }
    ]
  },
  { path: '**', component: NotFoundComponent },
];
```
* Add the children to the exising route as shown in example above.
* Add the `<router-outlet></router-outlet>` to the HTML template of the parent component (in this example: BookComponent).
* If the components in child route are inside a sub-module (e.g: `./books/books.module.ts`), the `router-outlet` tag may not work. In order to make it work, import the RouterModule ( in `@angular/router`) in the sub-module (e.g: `./books/books.module.ts`) and add the RouterModule in the `imports` section.
* Navigation from parent component (`BookComponent`). To navigate from parent component use the relativeUrl syntax: `this.router.navigate(['publisher'], {relativeTo: this.activatedRoute});`. This will trigger navigation from `http://localhost:4200/book/<isbn>` to the new route `http://localhost:4200/books/<isbn>/publisher` which is the child route.