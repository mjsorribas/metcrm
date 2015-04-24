currencyFormat = '$0,0.00';
sessionId = Meteor.default_connection._lastSessionId;


Meteor.subscribe('pdfs');

//Meteor.autosubscribe(function () {
//  PdfsCollection.find().observe({
//    added: function (item) {
//      console.log(item.pdf);
//      var blob = new Blob([item.pdf], {type: 'application/pdf'});
//      saveAs(blob, 'test.pdf');
//      PdfsCollection.remove({_id: item._id});
//    }
//  });
//});