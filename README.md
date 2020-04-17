# COVID-19 Radar

Covid-19 Radar is a responsive web-app, soon to be PWA that visualises COVID-19 cases around the world.

The application is built using the [Ionic framework](https://ionicframework.com/) with [Angular](https://angular.io/)

## Building and Running Locally

### Install dependencies

* [npm](https://www.npmjs.com)
  * It comes installed withof [Node.js](https://nodejs.org)
* [Ionic](https://ionicframework.com/)
  * Usually via npm by running
    * `npm install -g @ionic/cli`

### Build and Run the App

Build it with

```bash
npm install
```

Run it with 

```bash
ionic serve
```

Open the browser at [http://localhost:8100](http://localhost:8100)

## Build for Release

```bash
ionic build
```

The built website will be under the `www` directory.

In case of errors, try running:

```bash
npx npm-force-resolutions
npm install
ionic build
```

## Dependencies & Credits

* [Ionic](https://ionicframework.com/)
* [Lodash](https://lodash.com/)
* Flags from [https://github.com/hjnilsson/country-flags](https://github.com/hjnilsson/country-flags)
* Covid-19 data from [https://pomber.github.io/covid19/timeseries.json](https://pomber.github.io/covid19/timeseries.json)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)