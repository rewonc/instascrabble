var Scrabbler = function(dictionaryPath){

  this.dictPath = dictionaryPath;
  this.scrabbleDict = sortedLookupPrefixTree();
  // add all words to dict
  var self = this;
  $.get(this.dictPath, function(data){
    var words = data.split("\n");
    _.each(words, function(val){
      self.scrabbleDict.insert(val);
    });
  });

  return this;
}

// take a string of chars and return a list of
// all scrabble words that can be formed with those chars
Scrabbler.prototype.findWords = function(string){
  var words = [];
  var self = this;
  var set = this.powerset(string.split(''));
  _.each(set, function (val) {
    var word = val.join('');
    var result = self.scrabbleDict.getWords(word);
    if (result) {
      words = words.concat(result);
    }
  });

  return _.uniq(words);
}

Scrabbler.prototype.powerset = P;

// Powerset implementation by binarymax
// https://gist.github.com/binarymax/985690
function P(o,w,e,r,s,E,t){for(r=[s=1<<(E=o.length)];s;)for(w=s.toString(2),e=t=w.length,r[--s]=[];e;)~-w[--e]||r[s].push(o[e+E-t]);return r}
