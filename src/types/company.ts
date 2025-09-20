/*
"id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
*/

interface GeoLocation {
  lat: number;
  lng: number;
}

interface AddressType {
  street: string;
  suite: string;
  city: string;
  zip: string;
  geo: GeoLocation;
}

interface CompanyType {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface ContactType {
  id: number;
  username: string;
  email: string;
  address: AddressType;
  phone: string;
  website: string;
  company: CompanyType;
}

export type { ContactType };
