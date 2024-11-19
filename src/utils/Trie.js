class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.phoneNumber = '';
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(name, phoneNumber) {
    const lowerCaseName = name.toLowerCase(); // Store name in lowercase
    let node = this.root;
    for (let char of lowerCaseName) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
    node.phoneNumber = phoneNumber; // Store phone number in the node
  }

  searchSuggestions(prefix) {
    const lowerCasePrefix = prefix.toLowerCase(); // Convert prefix to lowercase
    const suggestions = [];
    let node = this.root;

    // Navigate to the end of the prefix in the Trie
    for (let char of lowerCasePrefix) {
      if (!node.children[char]) {
        return suggestions; // No suggestions if the prefix doesn't exist
      }
      node = node.children[char];
    }

    this.findAllWords(node, lowerCasePrefix, suggestions);
    return suggestions;
  }

  // This method checks if the query can match the name with missing letters
  static isMatch(query, name) {
    let j = 0; // Pointer for the name
    for (let char of query) {
      j = name.indexOf(char, j);
      if (j === -1) return false; // Character not found
      j++; // Move to the next character in the name
    }
    return true;
  }

  findAllWords(node, prefix, suggestions) {
    if (node.isEndOfWord) {
      suggestions.push({ name: prefix, phoneNumber: node.phoneNumber });
    }
    for (let char in node.children) {
      this.findAllWords(node.children[char], prefix + char, suggestions);
    }
  }

  // Added method to get suggestions based on fuzzy matching
  fuzzySearch(query, contacts) {
    const results = [];
    const lowerCaseQuery = query.toLowerCase();
    contacts.forEach(contact => {
      if (Trie.isMatch(lowerCaseQuery, contact.name.toLowerCase())) {
        results.push(contact);
      }
    });
    return results;
  }
}

export default Trie;
