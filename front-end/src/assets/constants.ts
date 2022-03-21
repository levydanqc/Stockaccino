export abstract class Constants {
  static readonly BASE_URL: string = 'https://stockaccino.danlevy.ca/api/';
  static readonly USER_URL: string = this.BASE_URL + 'users/';
  static readonly YAHOO_URL: string = this.BASE_URL + 'yahoo/';
  static readonly AUTOCOMPLETE_URL: string = this.YAHOO_URL + 'autocomplete/';
}