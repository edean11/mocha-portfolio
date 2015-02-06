/* jshint mocha: true, expr: true, strict: false, undef: false */

describe('test suite', function () {
  it('should assert true', function () {
    true.should.be.true;
    false.should.be.false;
  });
});

describe('hello', function () {
  it('should return world', function () {
    hello().should.equal('world');
  });
});

describe('DOM', function () {
  describe('table', function () {
    beforeEach(function () {
      $('tbody').empty();
    });

    describe('refreshStockPrices', function () {
      it('should edit each stock in the table with a new price', function () {
        var stocks = [
                       { Symbol: 'AAPL', LastPrice: 12.45 },
                       { Symbol: 'MSFT', LastPrice: 23.56 }
                     ],
            $tbody = $('tbody'),
            $trs;

        $tbody.append('<tr><td>Apple Inc</td><td>AAPL</td><td>12.34</td><td>12.34</td></tr>');
        $tbody.append('<tr><td>Microsoft Corp</td><td>MSFT</td><td>23.45</td><td>23.45</td></tr>');
        $trs = $('tr');

        refreshStockPrices(stocks);

        $($($trs[0]).find('td')[3]).text().should.equal('12.45');
        $($($trs[1]).find('td')[3]).text().should.equal('23.56');
      });
    });

    describe('addStockToTable', function () {
      it('should add a row table', function () {
        var stock = { Name: 'SuperCorp', Symbol: 'SCRP', LastPrice: 12.34 };
        $('tr').length.should.equal(0);
        addStockToTable(stock);
        $('tr').length.should.equal(1);
      });
      it('should use stock data in the appended row', function () {
        var stock = { Name: 'SuperCorp', Symbol: 'SCRP', LastPrice: 12.34 },
            $row  = addStockToTable(stock),
            $tds  = $row.find('td');

        $tds.length.should.equal(4);
        $($tds[0]).text().should.equal('SuperCorp');
        $($tds[1]).text().should.equal('SCRP');
        $($tds[2]).text().should.equal('12.34');
        $($tds[3]).text().should.equal('12.34');
      });
    });
  });
});

describe('ASYNC', function () {
  describe('getStock', function () {
    it('should return a stock object', function (done) {
      getStock('AAPL', function (stock) {
        stock.Name.should.equal('Apple Inc');
        done();
      });
    });
    it('should return another stock object', function (done) {
      getStock('MSFT', function (stock) {
        stock.Name.should.equal('Microsoft Corp');
        done();
      });
    });
  });

  describe('getMultipleStocks', function () {
    it('should return mulitple stock objects', function (done) {
      getMultipleStocks(['AAPL', 'MSFT'], function (stocks) {
        stocks.length.should.equal(2);
        stocks[0].Name.should.equal('Apple Inc');
        stocks[1].Name.should.equal('Microsoft Corp');
        done();
      });
    });
  });
});
