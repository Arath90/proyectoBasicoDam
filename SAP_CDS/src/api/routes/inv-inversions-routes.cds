using { inv as INV } from '../models/inv-inversions';

@impl: 'src/api/controllers/inv-inversions-controller.js'

service InvService @(path:'/api/inv') {

  entity PricesHistory as projection on INV.priceshistory;
  entity Strategies    as projection on INV.strategies;

  @Core.Description: 'get-all-prices-history'
  function getall() returns array of PricesHistory;  
}
