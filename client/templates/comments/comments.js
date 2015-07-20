Template.commentBox.onRendered(function () {
  var currContext = Template.parentData(1);
  var id = currContext.account._id || currContext.contact._id;
  this.subscribe('comments', {parentId: id});
});

Template.commentBox.events({
  "submit [data-action=addComment]": function (event, template) {
    event.preventDefault();
    var currContext = Template.parentData(1);
    var id = currContext.account._id || currContext.contact._id;
    var comment = template.$("[data-item=commentBox]").val();
    Comments.insert({parentId: id, content: comment});
  }
});

Template.commentBox.helpers({
  comments: function () {
    return Comments.find({}, {sort: {createdAt: -1}});
  },
  displayDate: function (date) {
    return moment(date).format("MM/DD/YYYY");
  }
});