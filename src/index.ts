import axios, { AxiosInstance } from 'axios';
import { Conversion, Fluctuation, LatestRates, Symbols, TimeSeries } from './types';

export default class Fixer {
  private readonly client: AxiosInstance;

  constructor(api_key: string) {
    this.client = axios.create({ baseURL: 'https://data.fixer.io/api', params: { access_key: api_key } });
  }

  /**
   * Return all available currencies
   * @returns {Promise<Symbols>}
   */
  public symbols(): Promise<Symbols> {
    return new Promise<Symbols>((resolve, reject) => {
      this.client
        .get<Symbols>('symbols')
        .then((r) => resolve(r.data))
        .catch(reject);
    });
  }

  /**
   * Real-time exchange rate data updated every 60 minutes, every 10 minutes or every 60 seconds.
   * @param {string} base Enter the three-letter currency code of your preferred base currency. (default: `USD`)
   * @param {string[]} symbols Enter a list of currency codes to limit output currencies. (default: `[]`)
   * @returns {Promise<LatestRates>}
   */
  public latestRates(base = 'USD', symbols: string[] = []): Promise<LatestRates> {
    return new Promise<LatestRates>((resolve, reject) => {
      this.client
        .get<LatestRates>('latest', { params: { base, symbols: symbols.join(',') } })
        .then((r) => resolve(r.data))
        .catch(reject);
    });
  }

  /**
   * Convert one currency to another
   * @param {number} amount The amount to be converted.
   * @param {string} base Three-letter currency code of the currency you would like to convert from.
   * @param {string} target Three-letter currency code of the currency you would like to convert to.
   * @param {string} date (Optional) Specify a date (format `YYYY-MM-DD`) to use historical rates for this conversion.
   * @returns {Promise<Conversion>}
   */
  public convert(amount: number, base: string, target: string, date?: string): Promise<Conversion> {
    return new Promise<Conversion>((resolve, reject) => {
      const params: { [key: string]: any } = { amount, from: base, to: target };
      if (typeof date == 'string') params.date = date;
      this.client
        .get<Conversion>('convert', { params })
        .then((r) => resolve(r.data))
        .catch(reject);
    });
  }

  /**
   * Retrieve information about how currencies fluctuate on a day-to-day basis.
   *
   * **Note:** Maximum allowed timeframe is **`365`** days.
   *
   * @param {string} start The start date of your preferred fluctuation timeframe.
   * @param {string} end The end date of your preferred fluctuation timeframe.
   * @param {string} base Three-letter currency code of your preferred base currency. (default: `USD`)
   * @param {string[]} symbols List of currency codes to limit output currencies. (default: `[]`)
   * @returns {Promise<Fluctuation>}
   */
  public fluctuation(start: string, end: string, base = 'USD', symbols: string[] = []): Promise<Fluctuation> {
    return new Promise<Fluctuation>((resolve, reject) => {
      this.client
        .get<Fluctuation>('fluctuation', {
          params: { start_date: start, end_date: end, base, symbols: symbols.join() },
        })
        .then((r) => resolve(r.data))
        .catch(reject);
    });
  }

  /**
   * Query the API for daily historical rates between two dates of your choice, with a maximum time frame of 365 days.
   *
   * @param {string} start The start date of your preferred fluctuation timeframe.
   * @param {string} end The end date of your preferred fluctuation timeframe.
   * @param {string} base Three-letter currency code of your preferred base currency. (default: `USD`)
   * @param {string[]} symbols List of currency codes to limit output currencies. (default: `[]`)
   * @returns {Promise<Fluctuation>}
   */
  public timeseries(start: string, end: string, base = 'USD', symbols: string[] = []): Promise<TimeSeries> {
    return new Promise<TimeSeries>((resolve, reject) => {
      this.client
        .get<TimeSeries>('timeseries', {
          params: { start_date: start, end_date: end, base, symbols: symbols.join(',') },
        })
        .then((r) => resolve(r.data))
        .catch(resolve);
    });
  }
}
