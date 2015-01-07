var Scrabbler = function(dictionaryPath, callback){
 
  var scrabbleDict = sortedLookupPrefixTree();
  // add all words to dict
  $.get(dictionaryPath, function(data){
    var words = data.split("\n");
    _.each(words, function(val){
      scrabbleDict.insert(val);
    });
    callback();
  });


  return {dict: scrabbleDict, find: __findWords};
}

// take a string of chars and return a list of
// all scrabble words that can be formed with those chars
function __findWords (string) {
  var words = [];
  var self = this;
  var set = __P(string.split(''));
  _.each(set, function (val) {
    var word = val.join('');
    var result = self.dict.getWords(word);
    if (result) {
      words = words.concat(result);
    }
  });

  return _.uniq(words).reverse();
}

// Powerset implementation by binarymax
// https://gist.github.com/binarymax/985690
function __P(o,w,e,r,s,E,t){for(r=[s=1<<(E=o.length)];s;)for(w=s.toString(2),e=t=w.length,r[--s]=[];e;)~-w[--e]||r[s].push(o[e+E-t]);return r}
