using {inv as myph} from '../models/inv-priceshistory';

@impl: 'src/api/controllers/inv-priceshistory-controller.js'

service PricesHistoryRoute @(path:'/api/inv/priceshistory'){

    entity priceshistory as projection on myph.priceshistory;

    @Core.Description: 'get-all-prices-history'

    @path :'getall'

    function getall()

    returns array of priceshistory;
    
}