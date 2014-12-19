var sortedLookupPrefixTree = function (string, accumulator) {

  var head, rest,
      node = {};

  node.children = {};
  node.words = [];
  if (string === undefined) {
    node.value = "";
    rest = "";
  } else {
    node.value = string[0];
    rest = string.slice(1);
  }

  node.insert = __prefixTreeInsert;
  node.check = __prefixTreeCheck;
  node.getWords = __prefixTreeGetWords;

  if (rest.length > 0) {
    node.insert(rest, accumulator);
  }

  return node;
};

function __prefixTreeInsert (string, orig) {
  var head, rest, sorted;

  if (orig === undefined) {
    sorted = string.split('').sort().join('');
    head = sorted[0]; 
    rest = sorted.slice(1);
    orig = string;
  } else {
    sorted = string;
    head = string[0];
    rest = string.slice(1);
  }
  if (this.children[head] === undefined) {
    this.children[head] = sortedLookupPrefixTree(sorted, orig);
    if (rest.length === 0){
      this.children[head].words.push(orig);
      return true;
    }
  } else {
    if (rest.length === 0){
      this.children[head].words.push(orig);
      return true;
    }
    this.children[head].insert(rest, orig);
  }
}

function __prefixTreeCheck (string, prev) {
  var head, rest, sorted;

  if (prev === undefined) {
    sorted = string.split('').sort().join('');
    head = sorted[0]; 
    rest = sorted.slice(1);
  } else {
    head = string[0]; 
    rest = string.slice(1);
  }
  if (this.children[head] === undefined) {
    return false;
  }
  if (rest.length > 0) {
    return this.children[head].check(rest);
  }
  return true;
}

function __prefixTreeGetWords (string, prev) {
  var head, rest, sorted;

  if (prev === undefined) {
    sorted = string.split('').sort().join('');
    head = sorted[0]; 
    rest = sorted.slice(1);
  } else {
    head = string[0]; 
    rest = string.slice(1);
  }
  if (this.children[head] === undefined) {
    return false;
  } 
  if (rest.length > 0) {
    return this.children[head].getWords(rest, true);
  }
  return this.children[head].words;
}


/*
test in console

var trie = sortedLookupPrefixTree();

trie.insert("overprotecting");
trie.insert("overprotective");
trie.insert("overprotects");
trie.insert("overqualified");
trie.insert("overran");
trie.insert("overrate");
trie.insert("overrated");
trie.insert("overrates");

console.log(trie.getWord("ov"));
console.log(trie.getWord("overp"));
console.log(trie.getWord("overr"));
console.log(trie.getWord("overqu"));
console.log(trie.getWord("overra"));
console.log(trie.getWord("overrat"));
console.log(trie.getWord("overran"));
*/
