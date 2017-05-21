var sites = [
                {
                    id : 1,
                    url: 'https://www.icefrance.fr/en',
                    getData : function($){
                        var res=[];
                        $('#simply-scroll-products_ice-block_home ul').children().map(function(ele){
                            var txt = $(this).text().split('=')[1];
                            txt = txt.split('(')[0];
                            res.push(txt.trim());
                        })
                        return res;
                    }
                },
                {
                    id : 2,
                    url: 'http://www.bancopiano.com.ar/Cotizaciones/Default',
                    getData: function($){
                        var res=[];
                        $tr = $('.tabla-cotizaciones').find('img[title="USD"]').parent().parent();
                        res.push($tr.children().eq(1).text() + ' USD');
                        $tr = $('.tabla-cotizaciones').find('img[title="EUR"]').parent().parent();
                        res.push($tr.children().eq(1).text() + ' EUR');
                        return res;
                    }
                },
                {
                    id : 3,
                    url: 'http://www.fvaccaro.com/coti_mini.asp',
                    getData: function($){
                        var res=[],
                            $dol = $( "th:contains('Dolares')" ).parent(),
                            $eur = $( "th:contains('Euros')" ).parent();
                        res.push($dol.children().eq(2).text() + ' USD');
                        res.push($eur.children().eq(2).text() + ' EUR');
                        return res;
                    }
                },
                {
                    id : 4,
                    url: 'http://www.noExiste111.com/',
                    getData: function($){return [];}
                },
                {
                    id : 5,
                    url: 'http://www.bancopiano.com.ar/Sucursales/',
                    getData: function($){return [];}
                }
        ];
module.exports = {
  Sites: sites
}
