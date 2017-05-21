(function ($) {
    // no se sobreescribe el namespace, si ya existe
    $.Default = $.Default || {};
    $.Default.init = function()
    {
        console.log("Main functions load!");
    }
    $.Default.disabled = function()
    {
        toastr.warning("This function isn't avaliable", 'Warning', {timeOut: 5000})
    }
    $.Default.checkSites = function()
    {
        $('tbody tr').each(function(){
            let id = $(this).children().eq(0).text();
            //$('tbody').append('<tr><td class="text-center">'+ item.id +'</td><td>'+item.url+'</td><td class="text-center"><i class="fa fa-refresh fa-spin fa-lg fa-fw"></i></td><td class="text-center"><i class="fa fa-refresh fa-spin fa-lg fa-fw"></i></td><td class="text-center"><i class="fa fa-refresh fa-spin fa-lg fa-fw"></i></td><td class="text-center"><i class="fa fa-refresh fa-spin fa-lg fa-fw"></i></td><td class="text-center"></td></tr>')
            $(this).children().slice(2,6).html('<i class="fa fa-refresh fa-spin fa-lg fa-fw"></i>');
            $.get('./request/site/'+id).done((data) => {
                console.log(data);
                if (data.status == 'error') {
                    let c = parseInt($('#countSitesError').text());
                    $('#countSitesError').html(c + 1);
                    $(this).children().eq(2).html('<i class="fa fa-times-circle-o text-danger" title="Error request"></i>');
                }else {
                    if (data.info.length < 1) {
                        let c = parseInt($('#countDataError').text());
                        $('#countDataError').html(c + 1);
                        $(this).children().eq(2).html('<i class="fa fa-exclamation-triangle text-warning" title="No data capture"></i>');
                    }else{
                        $(this).children().eq(2).html('<i class="fa fa-check-circle-o text-success" title="Success"></i>');
                    }
                }
                $(this).children().eq(3).html(data.date);
                $(this).children().eq(4).html(data.queryTime + 'ms');
                $(this).children().eq(5).html(data.info.join());
            }).fail(() => {
                let c = parseInt($('#countSitesError').text());
                $('#countSitesError').html(c + 1);
                $(this).children().eq(1).css('text-decoration','line-through');
                $(this).children().slice(2,6).html('<i class="fa fa-times-circle-o text-danger"></i>');
            });
        });
    }
})(jQuery);
