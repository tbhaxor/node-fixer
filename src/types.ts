export type Generic = {
  /** Returns `true` or `false` depending on whether or not your API request has succeeded. */
  success: boolean;
  /** Error descritpion */
  error?: {
    /** Numeric error code */
    code: number;
    /** Error type */
    type: string;
    /** Human readable message */
    info: string;
  };
};

export type Symbols = Generic &
  Partial<{
    /** All supported currencies with their respective three-letter currency codes and names. */
    symbols: { [key: string]: string };
  }>;

export type LatestRates = Generic &
  Partial<{
    /** Exact date and time (UNIX time stamp) the given rates were collected. */
    timestamp: number;
    /** Three-letter currency code of the base currency used for this request. */
    base: string;
    /** exchange rate data for the currencies you have requested. */
    rates: { [key: string]: string };
  }>;

export type Conversion = Generic &
  Partial<{
    /** Source requested */
    query: {
      /** Three-letter currency code of the currency converted from. */
      from: string;
      /** Three-letter currency code of the currency converted to. */
      to: string;
      /** Amount that is converted. */
      amount: number;
    };
    /** Metadata */
    info: {
      /** Exact date and time (UNIX time stamp) the given exchange rare was collected */
      timestamp: number;
      /** Exchange rate used for your conversion. */
      rate: number;
    };
    /** Returns `true` if historical rates are used for this conversion. */
    historical: boolean;
    /** Converted money. Use this to charge users */
    result: number;
  }>;

export type Fluctuation = Generic &
  Partial<{
    /** Returned `true` if a request to the fluctuation endpoint is made. */
    fluctuation: boolean;
    /** The start date of your time frame. */
    start_date: string;
    /** The end date of your time frame. */
    end_date: string;
    /** Three-letter currency code of the base currency used for this request. */
    base: string;
    /** Exchange rate data for the currencies you have requested. */
    rates: {
      [key: string]: {
        /** Exchange collected on your start date. */
        start_rate: number;
        /** Exchange collected on your end date. */
        end_rate: number;
        /** Change (decimal number) of the given currency rate between your start and end date. */
        change: number;
        /** percentage change of the given currency rate between your start and end date. */
        change_pct: number;
      };
    };
  }>;

export type TimeSeries = Generic &
  Partial<{
    /** Returns `true` if a request to the timeseries endpoint is made. */
    timeseries: boolean;
    /** The start date of your time frame. */
    start_date: string;
    /** The end date of your time frame. */
    end_date: string;
    /** Three-letter currency code of the base currency used for this request. */
    base: string;
    /** Exchange rate data for the currencies you have requested. */
    rates: { [key: string]: { [key: string]: number } };
  }>;
