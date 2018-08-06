# parseCommonUrl.js

`Copyright 2018, owtotwo <owtotwo@163.com>`

This is a JS script for parsing a **common** url. 

Specially, it can get the REGISTRABLE DOMAIN (Site Name and Top Level Domain) from common urls.


## Lightweight Version

For the urls which include second-level domains(i.e. co.uk), it will only deal with those with common suffixes. 

That is, the first label of TLD has no hyphen '-' and its length is less than 6.

[**TLD (Top Level Domain)**](https://blog.linkody.com/what-is-a-tld)

Or say the registered or registrable domain, which is the public suffix plus one additional label.

For example:

> `www.MySiteName.modena.it` and `www.MySiteName.monza-brianza.it` will give you the TLD `it`.

> But `www.MySiteName.monza.it` with TLD `monza.it` will have a correct result.

For the urls whose the labels number of TLD is greater than 2 such as 3LD, 4LD or 5LD will not be recognized. 

For example:

> `www.MySiteName.kira.aichi.jp` can not be parsed correctly.


## Usage

API: **parseCommonUrl**
- **Type**: Function
- **Arguments**: 
  + `url` (string) : The [url](https://en.wikipedia.org/wiki/URL) which you want to parse.
- **Return Value**: An Object with properties as certain parts of url as below. Or `undefined` if the argument url is incorrect. Note that all the properties are lowercase whatever url input includes lowercase or uppercase. If any part is NOT in url, the corresponding property is `undefined`.
  + **scheme**: A non-empty scheme component followed by a `colon (:)`, consisting of a sequence of characters beginning with a `letter` and followed by any combination of `letters`, `digits`, `plus (+)`, `period (.)`, or `hyphen (-)`. Although schemes are case-insensitive, the canonical form is lowercase and documents that specify schemes must do so with lowercase letters. Examples of popular schemes include `http`, `https`, `ftp`, `mailto`, `file`, `data`, and `irc`.
  + **protocol**: Ditto, always equal to scheme.
  + **userInfo**: An optional userinfo subcomponent that may consist of a user name, followed by an `at symbol (@)`. Use of the format `username:password` in the userinfo subcomponent is *deprecated* for security reasons. 
  + **host**: A non-empty host subcomponent, consisting of a registered name (including but not limited to a hostname) or IPv4. *Not support IPv6 now.*
  + **domain**: [Concept Domain](https://url.spec.whatwg.org/#concept-domain) is the host. If this property is not undefined, it will be equal to `host` and the property `ipv4` is undefined.
  + **ipv4**: [Concept IPv4](https://url.spec.whatwg.org/#concept-ipv4) is the IP address as a host. If this property is not undefined, it will be equal to `host` and the property `domain` is undefined.
  + **subDomain**: The domain before the siteName. (i.e. `www` for `www.google.com`)
  + **siteName**: The name of website. (i.e. `google` for `www.google.com`)
  + **publicSuffix**: [Public Suffix](https://url.spec.whatwg.org/#host-public-suffix) or [TLD(Top Level Domain)](https://blog.linkody.com/what-is-a-tld), the part after the siteName. (i.e. `com.cn` for `www.google.com.cn`)
  + **TLD**: Ditto, always equal to publicSuffix.
  + **registrableDomain**: [Registrable Domain](https://url.spec.whatwg.org/#host-registrable-domain) or [Root Domain](https://www.quora.com/What-is-a-root-domain), the siteName plus the TLD. That is, `subDomain + rootDomain = domain`. *We can check if it is the same site between two websites.*
  + **rootDomain**: Ditto, always equal to registrableDomain.
  + **port**: An optional port subcomponent preceded by a `colon (:)`.
  + **path**: A path component, consisting of a sequence of path segments separated by a slash (/). A path is always defined for a URI, though the defined path may be empty (zero length). A segment may also be empty, resulting in two consecutive slashes (//) in the path componenXt. 
  + **query**: An optional query component preceded by a question `mark (?)`, containing a [query string](https://en.wikipedia.org/wiki/Query_string) of non-hierarchical data. 
  + **fragment**: An optional fragment component preceded by an `hash (#)`. The fragment contains a [fragment identifier](https://en.wikipedia.org/wiki/Fragment_identifier) providing direction to a secondary resource, such as a section heading in an article identified by the remainder of the URI. 

*You use it to check if it is the same website between two urls as below.*

``` javascript
// ... Embed the code or require it to get the function `parseCommonUrl`

// Note: Return `null` if one of the urls is in incorrect format.
function isSameSite(urlA, urlB) {
    // Reference: https://url.spec.whatwg.org/#host-same-site
    const [ a, b ] = [ parseCommonUrl(urlA), parseCommonUrl(urlB) ];
    if (!a || !b) return null;
    const [ dmA, dmB ] = [ a.domain, b.domain ];
    const [ ipA, ipB ] = [ a.ipv4, b.ipv4 ];
    const [ rdA, rdB ] = [ a.registrableDomain, b.registrableDomain ];
    return (dmA === dmB && dmA !== undefined) || 
           (ipA === ipB && ipA !== undefined) || 
           (rdA === rdB && rdA !== undefined);
}
```

### Browser
``` html
<!-- It will add a function 'parseCommonUrl' as a property of window if not existed. -->
<script src="parseCommonUrl.js"></script>
<!-- Or use the compressed version:
<script src="parseCommonUrl.min.js"></script> 
-->
<script>
    // Site Name is google
    alert("Site Name is " + parseCommonUrl("https://www.google.co.jp/ncr").siteName);
</script>
```

### CommonJS
``` javascript
// Or let parseCommonUrl = require('./parseCommonUrl.min.js');
let parseCommonUrl = require('./parseCommonUrl.js');
// Top Level Domain is co.jp
console.log("Top Level Domain is " + parseCommonUrl("https://www.google.co.jp/ncr").TLD);
```

### AMD
``` html
<script src="https://cdn.bootcss.com/require.js/2.3.5/require.min.js"></script>
<script>
    // Or you can require a compressed version parseCommonUrl.min.js with configuration of requirejs.
    // Like { reuseMinJsFilesWhenFound: true }.
    // https://github.com/requirejs/requirejs/issues/1374
    require(['parseCommonUrl'], function(parseCommonUrl) {
        // Path is /ncr
        alert("Path is " + parseCommonUrl("https://www.google.co.jp/ncr").path);
    });
</script>
```

### CMD
``` html
<script src="https://cdn.bootcss.com/seajs/3.0.2/sea.js"></script>
<script>
    // Or seajs.use(['./parseCommonUrl.min.js'], function(parseCommonUrl) {...});
    seajs.use(['./parseCommonUrl.js'], function(parseCommonUrl){
        // SubDomain is www
        alert("SubDomain is " + parseCommonUrl("https://www.google.co.jp/ncr").subDomain);
    });
</script>
```


## Compression

Compressed Version: `parseCommonUrl.min.js`, about 10kb.

By [UglifyJS2](https://github.com/mishoo/UglifyJS2) and [babel-minify](https://github.com/babel/minify).


## Benchmark

``` javascript
// dependency: npm install benchmark
let Benchmark = require('benchmark');
let parseCommonUrl = require('./parseCommonUrl.js');

Benchmark('parseCommonUrl', function() {
        parseCommonUrl("https://owtotwo@sysu.at:1080/path/subpath?query#fragment");
    }).on('cycle', function(event) {
        console.log(String(event.target));
    })
    .run({ 'async': true });
```

**Old Result: parseCommonUrl x 696,244 ops/sec ±1.73% (87 runs sampled)**

**New Result: parseCommonUrl x 903,301 ops/sec ±0.80% (85 runs sampled)**

Benchmark by [Benchmark.js](https://benchmarkjs.com/) .


## License

[**LGPLv3**](https://www.gnu.org/licenses/lgpl-3.0.html)
