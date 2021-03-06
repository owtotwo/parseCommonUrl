// parseCommonUrl.js
// 
// Copyright 2018, owtotwo <owtotwo@163.com> https://github.com/owtotwo/
// License LGPLv3 (https://www.gnu.org/licenses/lgpl-3.0.html)
// All Rights Reserved.
// 
// This is a JS script for parsing a common url. 
// Specially, it can get the REGISTRABLE DOMAIN (Site Name and Top Level Domain) from common urls.
//
// For the urls which include second-level domains(i.e. co.uk), it will only deal 
//     with those with common suffixes. 
//     (the first word has no hyphen '-' and its length is less than 6)
// For the urls which include domain whose level is higher than second level such
//     as 3LD, 4LD or 5LD will not be recognized.
// 
// global variables: module, requirejs, seajs, window. (Not allowed to assign a new value)


//////////////////////////////////////////////////////////////////////////////////////
//                             Embed as a code snippet
//     If you just want to **Embed** it as a function into your codes, you could simply 
//   remove the comment symbols (//) in the front of the following two lines, and then
//   copy and paste the code into your codes as a code snippet.
//
// /* Copyright 2018, owtotwo, https://github.com/owtotwo/parseCommonUrl.js */
// if (typeof parseCommonUrl === 'undefined') var parseCommonUrl = 
(function() {
    'use strict';

    // On the basis of https://publicsuffix.org/list/public_suffix_list.dat
    const public_suffix_list_subset = "ac com edu gov net mil org|ad nom|ae co net org sch ac gov mil|aero caa cargo club crew dgca fuel group media pilot press res show union works|af gov com org net edu|ag com org net co nom|ai off com net org|al com edu gov mil net org|ao ed gv og co pb it|ar com edu gob gov int mil net org tur|arpa e164 ip6 iris uri urn|as gov|at ac co gv or|au com net org edu gov asn id info conf oz act nsw nt qld sa tas vic wa|aw com|az com net int gov org edu info pp mil name pro biz|ba com edu gov mil net org|bb biz co com edu gov info net org store tv|bd *|be ac|bf gov|bg a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9|bh com edu net org gov|bi co com edu or org|bj asso gouv|bm com edu gov net org|bn *|bo com edu gov gob int org net mil tv|br abc adm adv agr aju am arq art ato b belem bhz bio blog bmd bsb cim cng cnt com coop cri def ecn eco edu emp eng esp etc eti far feira flog fm fnd fot fst g12 ggf gov gru imb ind inf jab jampa jdf jor jus leg lel mat med mil mp mus natal net not ntr odo org poa ppg pro psc psi pvh qsl radio rec rio sampa sjc slg slz srv taxi teo the tmp trd tur tv udi vet vix vlog wiki zlg|bs com net org edu gov|bt com edu gov net org|bw co org|by gov mil com of|bz com net org edu gov|ca ab bc mb nb nf nl ns nt nu on pe qc sk yk gc|cd gov|ci org or com co edu ed ac net go asso int md gouv|ck *|cl gov gob co mil|cm co com gov net|cn ac com edu gov net org mil ah bj cq fj gd gs gz gx ha hb he hi hl hn jl js jx ln nm nx qh sc sd sh sn sx tj xj xz yn zj hk mo tw|co arts com edu firm gov info int mil net nom org rec web|cr ac co ed fi go or sa|cu com edu org net gov inf|cw com edu net org|cx gov|cy ac biz com gov ltd name net org press pro tm|dm com net org edu gov|do art com edu gob gov mil net org sld web|dz com org net gov edu asso pol art|ec com info net fin k12 med pro org edu gov gob mil|ee edu gov riik lib med com pri aip org fie|eg com edu eun gov mil name net org sci|er *|es com nom org gob edu|et com gov org edu biz name info net|fi aland|fj *|fk *|fr com asso nom prd tm cci gouv greta port|ge com edu gov org mil net pvt|gg co net org|gh com edu gov org mil|gi com ltd gov mod edu org|gl co com edu net org|gn ac com edu gov org net|gp com net mobi edu org asso|gr com edu net org gov|gt com edu gob ind mil net org|gu *|gy co com edu gov net org|hk com edu gov idv net org|hn com edu org net mil gob|hr iz from name com|ht com shop firm info adult net pro org med art coop pol asso edu rel gouv perso|hu co info org priv sport tm 2000 agrar bolt city film forum games hotel lakas media news sex shop suli szex video|id ac biz co desa go mil my net or sch web|ie gov|il ac co gov idf k12 muni net org|im ac co com net org tt tv|in co firm net org gen ind nic ac edu res gov mil|int eu|io com|iq gov edu mil com org net|ir ac co gov id net org sch|is net com edu gov org int|it gov edu abr bas cal cam emr fvg laz lazio lig lom mar mol pmn pug sar sic taa tos umb vao vda ven ag al an ao aosta aoste ap aq ar asti at av ba bari bg bi bl bn bo bozen br bs bt bz ca cb ce ch ci cl cn co como cr cs ct cuneo cz en enna fc fe fermo fg fi fm fr ge genoa go gr im is kr lc le lecce lecco li lo lodi lt lu lucca mb mc me mi milan mn mo monza ms mt na no nu nuoro og or ot pa padua parma pavia pc pd pe pg pi pisa pn po pr prato pt pu pv pz ra rc re rg ri rieti rm rn ro roma rome sa si siena so sp sr ss sv ta te terni tn to tp tr ts turin tv ud udine va vb vc ve vi vr vs vt vv|je co net org|jm *|jo com org net edu sch gov mil name|jp ac ad co ed go gr lg ne or aichi akita chiba ehime fukui gifu gunma hyogo iwate kochi kyoto mie nara oita osaka saga shiga tokyo|ke *|kg org net com edu gov mil|kh *|ki edu biz net org gov info com|km org nom gov prd tm edu mil ass com coop asso gouv|kn net org edu gov|kp com edu gov org rep tra|kr ac co es go hs kg mil ms ne or pe re sc busan daegu jeju seoul ulsan|kw *|ky edu gov com org net|kz org edu net gov mil com|la int net info edu gov per com org|lb com edu gov net org|lc com net co org edu gov|lk gov sch net int com org edu ngo soc web ltd assn grp hotel ac|lr com edu gov org net|ls co org|lt gov|lv com edu gov org mil id net asn conf|ly com net gov plc edu sch med org id|ma co net gov org ac press|mc tm asso|me co net org edu ac gov its priv|mg org nom gov prd tm edu mil com co|mk com org net edu gov inf name|ml com edu gouv gov net org|mm *|mn gov edu org|mo com net org edu gov|mr gov|ms com edu gov net org|mt com edu net org|mu com net org gov ac co or|museum air amber and art arts axis bahn bale basel baths bern bible bill bonn bus can clock coal cody cyber cymru dali ddr depot dolls essex farm field film force frog glas glass gorge graz house iraq iron jfk juif kids koeln kunst labor lans linz mad manx media mill moma money music naval neues north nrw nyc nyny omaha otago paleo paris plaza press pubol roma salem satx shell silk ski skole space spy stadt state steam tank tcm texas time touch town tree trust uhren ulm usa utah uvic wales war york youth|mv aero biz com coop edu gov info int mil name net org pro|mw ac biz co com coop edu gov int net org|mx com org gob edu net|my com net org gov edu mil name|mz ac adv co edu gov mil net org|na info pro name or dr us mx ca in cc tv ws mobi co com org|nc asso nom|nf com net per rec web arts firm info other store|ng com edu gov i mil mobi name net org sch|ni ac biz co com edu gob in info int mil net nom org web|nl bv|no fhs vgs priv mil stat dep herad aa ah bu fm hl hm mr nl nt of ol oslo rl sf st tm tr va vf arna bryne floro al alta amli amot andoy ardal asker askim askoy asnes aukra aure balat bardu berg bjugn bodo bokn bykle barum bomlo dovre dyroy donna eid etne fedje fet fjell flora fla frei frogn frana froya fusa forde giske gol gran grane grong grue gulen halsa hamar haram hemne hitra hobol hof hol hole hurum ha galsa klepp klabu kvam leka lesja lier lom loppa lund luroy ivgu loten masoy meloy modum molde moss nesna raisa naroy odda orsta osen oyer radoy rana rauma rissa risor roan rygge rodoy roros rost rade salat sauda sel selbu selje skaun ski skien skjak smola snasa sola stord stryn sula sund sveio sogne somna sorum tana time tinn tjome tokke tolga romsa trana tydal ulvik vadso valle vang vardo vefsn vega vik vikna volda voss varoy vagan vaga|np *|nr biz info gov edu org net com|nz ac co cri geek gen govt iwi kiwi maori mil net org|om co com edu gov med net org pro|pa ac gob com org sld edu net ing abo med nom|pe edu gob nom mil org com net|pf com org edu|pg *|ph com net org gov edu ngo mil i|pk com net edu org fam biz web gov gob gok gon gop gos info|pl com net org aid agro atm auto biz edu gmina gsm info mail media mil nom pc priv rel sex shop sklep sos targi tm gov bytom czest elk ilawa jgora kepno konin kutno lapy lomza lubin lukow naklo nysa olawa opole pila pisz radom sanok sejny slask tgory turek tychy ustka waw wlocl zagan zarow zgora|pn gov co org edu net|pr com net org gov edu isla pro biz info name est prof ac|pro aaa aca acct bar cpa eng jur law med recht|ps edu gov sec plo com org net|pt net gov org edu int publ com nome|pw co ne or ed go belau|py com coop edu gov mil net org|qa com edu gov mil name net org sch|re asso com nom|ro arts com firm info nom nt org rec store tm www|rs ac co edu gov in org|ru ac edu gov int mil test|rw gov net edu ac com co int mil gouv|sa com net org gov med pub edu sch|sb com edu gov net org|sc com gov net org edu|sd com net org edu med tv gov info|se a ac b bd brand c d e f fh fhsk fhv g h i k l m n o org p parti pp press r s t tm u w x y z|sg com net org gov edu per|sh com net gov org mil|sl com net edu gov org|sn art com edu gouv org perso univ|so com net org|st co com edu gov mil net org store|sv com edu gob org red|sx gov|sy edu gov net mil com org|sz co ac org|th ac co go in mi net or|tj ac biz co com edu go gov int mil name net nic org test web|tl gov|tm com co org net nom gov mil edu|tn com ens fin gov ind intl nat net org info perso rnrt rns rnu turen|to com gov net org edu mil|tr com info biz net org web gen tv av dr bbs name tel gov bel pol mil k12 edu kep nc|tt co com org net biz info pro int coop jobs mobi aero name gov edu|tw edu gov mil com net org idv game ebiz club|tz ac co go hotel info me mil mobi ne or sc tv|ua com edu gov in net org ck cn cr cv dn dp if kh kiev km kr krym ks kv kyiv lg lt lutsk lv lviv mk od odesa pl rivne rovno rv sb sm sumy te uz vn volyn yalta zp zt|ug co or ac sc go ne com org|uk ac co gov ltd me net nhs org plc|us dni fed isa kids nsn ak al ar as az ca co ct dc de fl ga gu hi ia id il in ks ky la ma md me mi mn mo ms mt nc nd ne nh nj nm nv ny oh ok or pa pr ri sc sd tn tx ut vi vt va wa wi wv wy|uy com edu gub mil net org|uz co com net org|vc com net org gov mil edu|ve arts co com e12 edu firm gob gov info int mil net org rec store tec web|vi co com k12 net org|vn com net org edu gov int ac biz info name pro|vu com edu net org|ws com net org gov edu|ye *|za ac agric alt co edu gov law mil net ngo nis nom org tm web|zm ac biz co com edu gov info mil net org sch|zw ac co gov mil org";

    // Reference: https://tools.ietf.org/html/rfc1808#section-2.2
    // Format: [[scheme:]//[userinfo@]host[:1080]/[dir/file][?query]][#fragment]
    const urlRegex = /^(?:(?<scheme>[\w.+-]+):)?\/\/(?:(?<userInfo>[^\s:/?#[\]@]+)@)?(?<host>(?<ipv4>(?:\d{1,3}\.){3}\d{1,3})|(?<domain>[^\s:/?#[\]@]+))(?::(?<port>\d{1,5}))?(?<path>\/(?:[^\s/?#]+(?:\/[^\s/?#]*)*)?)(?:\?(?<query>[^\s?#]*))?(?:#(?<fragment>[^\s?#]*))?$/;
    // Format: [[scheme:][/][dir/file][?query]][#fragment]
    const urlShortRegex = /^(?:(?<scheme>[\w.+-]+):)?(?<path>\/?(?:[^\s/?#]+(?:\/[^\s/?#]*)*)?)(?:\?(?<query>[^\s?#]*))?(?:#(?<fragment>[^\s?#]*))?$/;

    // make a map
    const suffix_map = new Map(public_suffix_list_subset.split('|').map(v => [v.split(' ', 1)[0], v.split(' ').slice(1)]));

    // Return undefined if url is incorrect.
    function parseCommonUrl(url) {

        // normalization
        const normalizeUrl = url.trim().toLowerCase();

        const regexResult = normalizeUrl.match(urlRegex) || normalizeUrl.match(urlShortRegex);
        
        if (regexResult === null) return undefined;

        // parse url, host: domain / ipv4 (i.e. a.b.example.co.uk / 127.0.0.1)
        const { scheme, userInfo, host, ipv4, domain, port, path, query, fragment } = regexResult.groups;

        let subDomain, siteName, publicSuffix, registrableDomain;

        if (domain !== undefined) {
            const domainParts = domain.split('.');
            const lastLabel = domainParts[domainParts.length - 1]; // maybe Generic Top-Level Domain (gTLD)
            const secondLastLabel = domainParts[domainParts.length - 2]; // maybe Second Level Domain (SLD) or Undefined

            [ subDomain, siteName, publicSuffix ] = 
                suffix_map.has(lastLabel) && 
                    (suffix_map.get(lastLabel).includes(secondLastLabel) || suffix_map.get(lastLabel).includes('*')) ?
                // i.e. www.example.co.uk => [ www, example, co.uk ]
                [ domainParts.slice(0, -3).join('.'), domainParts[domainParts.length - 3], domainParts.slice(-2).join('.') ] :
                // i.e. www.example.com     => [ www, example, com ]
                //      poster.blog.sysu.at => [ poster.blog, sysu, at ]
                [ domainParts.slice(0, -2).join('.'), domainParts[domainParts.length - 2], domainParts.slice(-1).join('.') ];

            registrableDomain = siteName ? [ siteName, publicSuffix ].join('.') : undefined;
        }

        return { 
            scheme: scheme, protocol: scheme, userInfo: userInfo, host: host, ipv4: ipv4, domain: domain, 
            subDomain: subDomain, siteName: siteName, publicSuffix: publicSuffix, TLD: publicSuffix,
            registrableDomain: registrableDomain, rootDomain: registrableDomain, port: port, path: path, 
            query: query, fragment: fragment 
        };
    }

    // CommonJS (ES6 Module)
    if (typeof module !== 'undefined') {
        module.exports = parseCommonUrl;
    }

    // AMD (requirejs)
    if (typeof requirejs !== 'undefined') {
        define(function() { return parseCommonUrl; });
    }

    // CMD (seajs)
    if (typeof seajs !== 'undefined') {
        define(function(_require, _exports, module) { module.exports = parseCommonUrl; });
    }

    // Browser
    if (typeof window !== 'undefined') {
        window.parseCommonUrl = window.parseCommonUrl || parseCommonUrl;
    }

    return parseCommonUrl;
})();
