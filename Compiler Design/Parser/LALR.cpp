#include <iostream>
#include <vector>
#include <map>
#include <set>
#include <algorithm>
#include <sstream>
#include <queue>
#include <iomanip>

using namespace std;

struct Rule {
    char left;
    string right;
    Rule(char l, string r) : left(l), right(r) {}
};

struct Item {
    int ruleIndex;
    int dotPosition;
    set<char> lookahead;
    
    Item(int ri, int dp, set<char> la) : ruleIndex(ri), dotPosition(dp), lookahead(la) {}
    
    bool operator<(const Item& other) const {
        if (ruleIndex != other.ruleIndex) return ruleIndex < other.ruleIndex;
        if (dotPosition != other.dotPosition) return dotPosition < other.dotPosition;
        return lookahead < other.lookahead;
    }

    bool operator==(const Item& other) const {
        return ruleIndex == other.ruleIndex &&
               dotPosition == other.dotPosition &&
               lookahead == other.lookahead;
    }
};

class LRParser {
private:
    vector<Rule> grammar;
    set<char> nonTerminals;
    set<char> terminals;
    map<char, set<char>> first;
    vector<set<Item>> states;
    map<pair<int, char>, pair<string, int>> parsingTable;

    void computeFirst() {
        for (char c : terminals) {
            first[c].insert(c);
        }

        bool changed = true;
        while (changed) {
            changed = false;
            for (const Rule& rule : grammar) {
                char left = rule.left;
                string right = rule.right;
                set<char>& firstSet = first[left];
                size_t oldSize = firstSet.size();

                if (right == "e") {
                    firstSet.insert('e');
                } else {
                    for (char symbol : right) {
                        set<char>& symbolFirst = first[symbol];
                        firstSet.insert(symbolFirst.begin(), symbolFirst.end());
                        if (symbolFirst.find('e') == symbolFirst.end()) {
                            break;
                        }
                    }
                }

                if (firstSet.size() > oldSize) {
                    changed = true;
                }
            }
        }
    }

    set<char> computeFirst(const string& s) {
        set<char> result;
        for (char c : s) {
            set<char>& symbolFirst = first[c];
            result.insert(symbolFirst.begin(), symbolFirst.end());
            if (symbolFirst.find('e') == symbolFirst.end()) {
                break;
            }
        }
        return result;
    }

    set<Item> closure(const set<Item>& items) {
        set<Item> result = items;
        bool changed = true;
        while (changed) {
            changed = false;
            set<Item> newItems;
            for (const Item& item : result) {
                if (item.dotPosition < grammar[item.ruleIndex].right.length()) {
                    char nextSymbol = grammar[item.ruleIndex].right[item.dotPosition];
                    if (nonTerminals.find(nextSymbol) != nonTerminals.end()) {
                        string beta = grammar[item.ruleIndex].right.substr(item.dotPosition + 1);
                        set<char> firstBeta = computeFirst(beta);
                        if (firstBeta.empty()) firstBeta = item.lookahead;
                        for (size_t i = 0; i < grammar.size(); ++i) {
                            if (grammar[i].left == nextSymbol) {
                                Item newItem(i, 0, firstBeta);
                                if (result.find(newItem) == result.end()) {
                                    newItems.insert(newItem);
                                    changed = true;
                                }
                            }
                        }
                    }
                }
            }
            result.insert(newItems.begin(), newItems.end());
        }
        return result;
    }

    set<Item> goTo(const set<Item>& items, char symbol) {
        set<Item> result;
        for (const Item& item : items) {
            if (item.dotPosition < grammar[item.ruleIndex].right.length() &&
                grammar[item.ruleIndex].right[item.dotPosition] == symbol) {
                result.insert(Item(item.ruleIndex, item.dotPosition + 1, item.lookahead));
            }
        }
        return closure(result);
    }

    void constructStates() {
        set<Item> initialItem = closure({Item(0, 0, {'$'})});
        states.push_back(initialItem);
        
        queue<int> stateQueue;
        stateQueue.push(0);
        
        while (!stateQueue.empty()) {
            int currentState = stateQueue.front();
            stateQueue.pop();
            
            set<char> symbols;
            for (const Item& item : states[currentState]) {
                if (item.dotPosition < grammar[item.ruleIndex].right.length()) {
                    symbols.insert(grammar[item.ruleIndex].right[item.dotPosition]);
                }
            }
            
            for (char symbol : symbols) {
                set<Item> newState = goTo(states[currentState], symbol);
                if (!newState.empty()) {
                    auto it = find(states.begin(), states.end(), newState);
                    if (it == states.end()) {
                        states.push_back(newState);
                        stateQueue.push(states.size() - 1);
                        parsingTable[{currentState, symbol}] = {"s" + to_string(states.size() - 1), states.size() - 1};
                    } else {
                        int nextState = distance(states.begin(), it);
                        parsingTable[{currentState, symbol}] = {"s" + to_string(nextState), nextState};
                    }
                }
            }
            
            for (const Item& item : states[currentState]) {
                if (item.dotPosition == grammar[item.ruleIndex].right.length()) {
                    for (char lookahead : item.lookahead) {
                        if (item.ruleIndex == 0 && lookahead == '$') {
                            parsingTable[{currentState, lookahead}] = {"acc", -1};
                        } else {
                            parsingTable[{currentState, lookahead}] = {"r" + to_string(item.ruleIndex), -1};
                        }
                    }
                }
            }
        }
    }

public:
    LRParser(const vector<Rule>& g) : grammar(g) {
        grammar.insert(grammar.begin(), Rule('S', string(1, grammar[0].left)));
        for (const Rule& rule : grammar) {
            nonTerminals.insert(rule.left);
            for (char c : rule.right) {
                if (c != 'e' && !isupper(c)) {
                    terminals.insert(c);
                }
            }
        }
        terminals.insert('$');

        computeFirst();
        constructStates();
    }

    void printAugmentedGrammar() {
        cout << "Augmented Grammar:\n";
        for (size_t i = 0; i < grammar.size(); ++i) {
            cout << i << ". " << grammar[i].left << " -> " << grammar[i].right << "\n";
        }
        cout << "\n";
    }

    void printStates() {
        cout << "States:\n";
        for (size_t i = 0; i < states.size(); ++i) {
            cout << "I" << i << ":\n";
            for (const Item& item : states[i]) {
                cout << "    " << grammar[item.ruleIndex].left << " -> ";
                for (size_t j = 0; j < grammar[item.ruleIndex].right.length(); ++j) {
                    if (j == item.dotPosition) cout << ".";
                    cout << grammar[item.ruleIndex].right[j];
                }
                if (item.dotPosition == grammar[item.ruleIndex].right.length()) cout << ".";
                cout << ", {";
                for (auto it = item.lookahead.begin(); it != item.lookahead.end(); ++it) {
                    if (it != item.lookahead.begin()) cout << ", ";
                    cout << *it;
                }
                cout << "}\n";
            }
            cout << "\n";
        }
    }

    void printParsingTable() {
        cout << "Parsing Table:\n";
        cout << setw(4) << "";
        for (char t : terminals) {
            cout << setw(10) << t;
        }
        for (char nt : nonTerminals) {
            cout << setw(10) << nt;
        }
        cout << "\n";

        for (size_t i = 0; i < states.size(); ++i) {
            cout << setw(4) << i;
            for (char t : terminals) {
                auto it = parsingTable.find({i, t});
                if (it != parsingTable.end()) {
                    cout << setw(10) << it->second.first;
                } else {
                    cout << setw(10) << "";
                }
            }
            for (char nt : nonTerminals) {
                auto it = parsingTable.find({i, nt});
                if (it != parsingTable.end()) {
                    cout << setw(10) << it->second.second;
                } else {
                    cout << setw(10) << "";
                }
            }
            cout << "\n";
        }
    }
};

int main() {
    vector<Rule> grammar;
    string input;
    cout << "Enter grammar rules (one per line, format: X->abc, use 'e' for epsilon):\n";
    cout << "Enter an empty line to finish input.\n";
    while (getline(cin, input) && !input.empty()) {
        if (input.length() < 4 || input[1] != '-' || input[2] != '>') {
            cout << "Invalid input format. Please use the format X->abc\n";
            continue;
        }
        grammar.push_back(Rule(input[0], input.substr(3)));
    }

    LRParser parser(grammar);
    parser.printAugmentedGrammar();
    parser.printStates();
    parser.printParsingTable();

    return 0;
}