const moment = require('moment');


module.exports = {
    truncate: function (str, length) {
        return (str.length < length) ? str : str.substring(0, length).replace(/\w{3}$/gi, '...');
    },

    stripTags: function (text) {

        return text.replace(/<(?:.|\n)*?>/gm, '');
    },

    formatDate: function (date, format) {

        return moment(date).format(format);
    },
    select: function (selected, options) {
        return options.fn(this).replace(
            new RegExp(' value=\"' + selected + '\"'),
            '$& selected="selected"');
    },

    editIcon : function(storyUser,loggedUser,storyId,floating=true)
    {
       if(storyUser==loggedUser){

        if(floating){

            return `<a href="/stories/edit/${storyId}" title="Edit story" class="btn-medium btn-floating red"><i class="fa fa-pencil"></i></a>`;
        }else{

            return `<a  href="/stories/edit/${storyId}" title="Edit story" ><i class="fa fa-pencil"></i></a>`;
        }
           
       }else{
           return ;
       }

    }
}