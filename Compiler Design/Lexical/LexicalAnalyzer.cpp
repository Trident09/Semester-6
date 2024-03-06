#include <iostream>
#include <string>
#include <vector>
#include <regex>
#include <unordered_set>
#include <algorithm>

using namespace std;

vector<string> analyzeTokens(string code, unordered_set<string>& usedTokens, vector<string>& identifiers, vector<string>& operators, vector<string>& punctuators) {
    vector<string> tokens;

    regex idPattern(R"(\b[a-zA-Z_][a-zA-Z0-9_]*\b)");
    regex opPattern(R"(\+|\-|\*|\/)");
    regex punctPattern(R"(\(|\))");
    regex pattern(R"([a-zA-Z_][a-zA-Z0-9_]*|\d+|\+|\-|\*|\/|\(|\))");

    sregex_iterator it(code.begin(), code.end(), pattern);
    sregex_iterator end;

    for (; it != end; ++it) {
        string token = it->str();
        tokens.push_back(token);
        usedTokens.insert(token);

        if (regex_match(token, idPattern)) {
            identifiers.push_back(token);
        } else if (regex_match(token, opPattern)) {
            operators.push_back(token);
        } else if (regex_match(token, punctPattern)) {
            punctuators.push_back(token);
        }
    }
    return tokens;
}
int main() {

    string code;
    cout << "Enter the code to analyze: ";
    getline(cin, code);
    unordered_set<string> usedTokens;
    vector<string> identifiers;
    vector<string> operators;
    vector<string> punctuators;

    vector<string> tokens = analyzeTokens(code, usedTokens, identifiers, operators, punctuators);

    cout << "\nTotal number of tokens: " << tokens.size() << endl;

    cout << "Used tokens: ";
    for (const string& token : usedTokens) {
        cout << token << " ";
    }
    
    cout << "\nIdentifiers: ";
    for (const string& identifier : identifiers) {
        cout << identifier << " ";
    }
    
    cout << "\nOperators: ";
    for (const string& op : operators) {
        cout << op << " ";
    }
    
    cout << "\nPunctuators: ";
    for (const string& punctuator : punctuators) {
        cout << punctuator << " ";
    }

    return 0;
}