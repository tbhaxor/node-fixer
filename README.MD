# Node Fixer

Node Fixer is an unofficial API Client for [Fixer](https://fixer.io). Fixer is a simple and lightweight API for
current and historical foreign exchange (forex) rates.

To get an API, you need to subscribe to atlest $10 plan &rArr; https://fixer.io/product

## Features

- Lightweight
- Fast
- Nodejs and Browser Integration
- Typescript support
- API Calls to
  - Available currency symbols
  - Currency conversion (both latest and historic)
  - Timeseries of past 365 days
  - Fluctuations in the rate change of past 365 days

## Installation

**Nodejs**

```sh
# yarn
yarn add @tbhaxor/fixer

# Npm
npm i @tbhaxor/fixer
```

**CDN**

```html
<script src="https://cdn.jsdelivr.net/npm/@tbhaxor/fixer@1.0.0/dist/bundle/fixer.min.js"></script>
```

## Usage

```js
// es6
import Fixer from '@tbhaxor/fixer';

// commonjs
const { default: Fixer } = require('@tbhaxor/fixer');

const fixer = new Fixer('API KEY HERE');

(async () => {
  const conversion = await fixer.convert(1, 'USD', 'INR');
  console.log(conversion.result); // 72.46
})();
```

## API

All the callable methods are listed here

### Symbols

Return all available currencies

**Usage**

```js
(async () => {
  await fixer.symbols();
})();
```

<details><summary><b>Parameters</b></summary>

N/A

</details>

<details><summary><b>Response</b></summary>

|  Name   |  Type  | Description                                                                           |
| :-----: | :----: | :------------------------------------------------------------------------------------ |
| symbols | object | All supported currencies with their respective three-letter currency codes and names. |

</details>
<br>

## Latest Rates

Real-time exchange rate data updated every 60 minutes, every 10 minutes or every 60 seconds.

**Usage**

```js
(async () => {
  await fixer.symbols('USD', ['INR', 'RSD', 'JPY']);
})();
```

<details><summary><b>Parameters</b></summary>

|  Name   |   Type   | Description                                                                                       |
| :-----: | :------: | :------------------------------------------------------------------------------------------------ |
|  base   |  string  | (Optional) Enter the three-letter currency code of your preferred base currency. (default: `USD`) |
| symbols | string[] | (Optional) Enter a list of currency codes to limit output currencies. (default: `[]`)             |

</details>

<details><summary><b>Response</b></summary>

|   Name    |  Type  | Description                                                            |
| :-------: | :----: | :--------------------------------------------------------------------- |
| timestamp | number | Exact date and time (UNIX time stamp) the given rates were collected.  |
|   base    | string | Three-letter currency code of the base currency used for this request. |
|  symbols  | object | Exchange rate data for the currencies you have requested.              |

</details>
<br>

### Conversion

Retrieve information about how currencies fluctuate on a day-to-day basis.

**Note:** Maximum allowed timeframe is **`365`** days.

**Usage**

```js
(async () => {
  await fixer.convert(1, 'USD', 'INR');
})();
```

<details><summary><b>Parameters</b></summary>

|  Name   |   Type   | Description                                                                                  |
| :-----: | :------: | :------------------------------------------------------------------------------------------- |
| ammount |  number  | The amount to be converted.                                                                  |
|  base   |  string  | Three-letter currency code of the currency you would like to convert from.                   |
| target  | string[] | Three-letter currency code of the currency you would like to convert to.                     |
|  date   |  string  | (Optional) Specify a date (format `YYYY-MM-DD`) to use historical rates for this conversion. |

</details>

<details><summary><b>Response</b></summary>

|      Name      |  Type   | Description                                                                 |
| :------------: | :-----: | :-------------------------------------------------------------------------- |
|     query      | object  | Source requested                                                            |
|   query.from   | string  | Three-letter currency code of the currency converted from.                  |
|    query.to    | string  | Three-letter currency code of the currency converted to.                    |
|  query.amount  | number  | Amount that is converted.                                                   |
|      info      | object  | Metadata                                                                    |
| info.timestamp | number  | Exact date and time (UNIX time stamp) the given exchange rare was collected |
|   info.rate    | number  | Exchange rate used for your conversion.                                     |
|   historical   | boolean | Returns `true` if historical rates are used for this conversion.            |
|     result     | number  | Converted money. Use this to charge users                                   |

</details>
<br>

### Fluctuation

Retrieve information about how currencies fluctuate on a day-to-day basis.

**Note:** Maximum allowed timeframe is **`365`** days.

**Usage**

```js
(async () => {
  await fixer.fluctuation('2019-12-02', '2020-01-02', 'USD', ['INR', 'JPY']);
})();
```

<details><summary><b>Parameters</b></summary>

|  Name   |   Type   | Description                                                                   |
| :-----: | :------: | :---------------------------------------------------------------------------- |
|  start  |  string  | The start date (format `YYYY-MM-DD`) of your preferred fluctuation timeframe. |
|   end   |  string  | The end date (format `YYYY-MM-DD`) of your preferred fluctuation timeframe.   |
|  base   |  string  | Three-letter currency code of your preferred base currency. (default: `USD`)  |
| symbols | string[] | List of currency codes to limit output currencies. (default: `[]`)            |

</details>

<details><summary><b>Response</b></summary>

|              Name               |  Type   | Description                                                                         |
| :-----------------------------: | :-----: | :---------------------------------------------------------------------------------- |
|           fluctuation           | boolean | Returned `true` if a request to the fluctuation endpoint is made.                   |
|           start_date            | boolean | The start date of your time frame.                                                  |
|            end_date             | boolean | The end date of your time frame.                                                    |
|              base               | string  | Three-letter currency code of the base currency used for this request.              |
|              rates              | object  | Exchange rate data for the currencies you have requested.                           |
| rates.&lt;SYMBOL&gt;.start_rate | number  | Exchange collected on your start date.                                              |
|  rates.&lt;SYMBOL&gt;.end_rate  | number  | Exchange collected on your end date.                                                |
|   rates.&lt;SYMBOL&gt;.change   | number  | Change (decimal number) of the given currency rate between your start and end date. |
| rates.&lt;SYMBOL&gt;.change_pct | number  | Percentage change of the given currency rate between your start and end date.       |

</details>
<br>

### Timeseries

Query the API for daily historical rates between two dates of your choice, with a maximum time frame of 365 days.

**Usage**

```js
(async () => {
  await fixer.timeseries('2019-12-02', '2020-01-02', 'USD', ['INR', 'JPY']);
})();
```

<details><summary><b>Parameters</b></summary>

|  Name   |   Type   | Description                                                                   |
| :-----: | :------: | :---------------------------------------------------------------------------- |
|  start  |  string  | The start date (format `YYYY-MM-DD`) of your preferred fluctuation timeframe. |
|   end   |  string  | The end date (format `YYYY-MM-DD`) of your preferred fluctuation timeframe.   |
|  base   |  string  | Three-letter currency code of your preferred base currency. (default: `USD`)  |
| symbols | string[] | List of currency codes to limit output currencies. (default: `[]`)            |

</details>

<details><summary><b>Response</b></summary>

|    Name    |        Type        | Description                                                            |
| :--------: | :----------------: | :--------------------------------------------------------------------- |
| timeseries |      boolean       | Returned `true` if a request to the timeseries endpoint is made.       |
| start_date |      boolean       | The start date of your time frame.                                     |
|  end_date  |      boolean       | The end date of your time frame.                                       |
|    base    |       string       | Three-letter currency code of the base currency used for this request. |
|   rates    | "object of object" | Exchange rate data for the currencies you have requested.              |

</details>

<br>

### Error Handling

The generic response contains `success` key of boolean type. If there is any error, you will get `error` field with `success = false`

Error schema

| Name |  Type  | Description                            |
| :--: | :----: | :------------------------------------- |
| code | number | Numeric error code                     |
| type | string | Type of error (for developers)         |
| info | string | Human readable message (for end users) |

## Contribution

Feel free to contribute to this project. I have convered almost all the feature this service provides, I would be interesting to see what you can do with it

Possible scope of contribution

1. Documentation
2. Issues
3. Performance
4. Removing `axios` dependencies and using creating own http mini utility compatible with nodejs and browser

## Licence

Node Fixer is licensed under [MIT License](https://github.com/tbhaxor/node-fixer/blob/main/LICENSE)

## Contact the Author

Follow the links to reach me

- Email: tbhaxor@gmail.com
- Twitter: [@tbhaxor](https://twitter.com/tbhaxor)
- GitHub: [@tbhaxor](https://github.com/tbhaxor)
- LinkedIn: [@gurkirat--singh](https://www.linkedin.com/in/gurkirat--singh)
- Instagram: [@\_tbhaxor\_](https://instagram.com/_tbhaxor_)
