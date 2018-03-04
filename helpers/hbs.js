module.exports={
    truncate:function(str, length) {
                  return (str.length < length) ? str : str.substring(0, length).replace(/\w{3}$/gi, '...');
                 },

    stripTags:  function (text){

        return text.replace(/<(?:.|\n)*?>/gm, '');
    }           
}