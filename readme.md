# parseCommonUrl.js

`Copyright 2018, owtotwo <owtotwo@163.com>`

This is a JS script for parsing a **common** url. 

Specially, it can get the ROOT DOMAIN (Site Name and Top Level Domain) from common urls.


## Lightweight Version

For the urls which include second-level domains(i.e. co.uk), it will only deal with those with common suffixes. 

That is, the first label of TLD has no hyphen '-' and its length is less than 6.

i.e. 

> `www.MySiteName.modena.it` and `www.MySiteName.monza-brianza.it` will give you the TLD `it`.

> But `www.MySiteName.monza.it` with TLD `monza.it` will have a correct result.

For the urls whose the labels number of TLD is greater than 2 such as 3LD, 4LD or 5LD will not be recognized. 

i.e.

> `www.MySiteName.kira.aichi.jp` can not be parsed correctly.


## License

[**LGPLv3**](https://www.gnu.org/licenses/lgpl-3.0.html)