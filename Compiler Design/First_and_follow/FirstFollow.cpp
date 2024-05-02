#include <iostream>
#include <string>
#include <map>
#include <set>
#include <vector>
// #include <bits/stdc++.h>
using namespace std;

map< char, set<char> > first;
map< char, set<char> > follow;
map< char, vector<string> > prod;

void computeFirst(char c){
    for (auto s : prod[c]) {
        if (isupper(s[0])) {
            computeFirst(s[0]);
            first[c].insert(first[s[0]].begin(), first[s[0]].end());
        } else {
            first[c].insert(s[0]);
        }
    }
}

void computeFollow(char c){
    for (auto pr : prod) {
        for (auto s : pr.second) {
            size_t pos = s.find(c);
            if (pos != string::npos) {
                if (pos + 1 == s.size()) {
                    if (c != pr.first) {
                        computeFollow(pr.first);
                        follow[c].insert(follow[pr.first].begin(), follow[pr.first].end());
                    }
                } else if (isupper(s[pos + 1])) {
                    follow[c].insert(first[s[pos + 1]].begin(), first[s[pos + 1]].end());
                } else {
                    follow[c].insert(s[pos + 1]);
                }
            }
        }
    }
}

int main() {
    int n;
    cout << "Enter the number of rules: ";
    cin >> n;
    cout << "Enter the productions:\n";
    char start;
    for (int i = 0; i < n; ++i) {
        char left;
        string right;
        cin >> left >> right;
        if (i == 0)
            start = left;
        prod[left].push_back(right);
    }
    for (auto p : prod) {
        computeFirst(p.first);
    }
    follow[start].insert('$');
    for (auto p : prod) {
        computeFollow(p.first);
    }
    for (auto p : first) {
        cout << "First(" << p.first << ") = { ";
        for (auto c : p.second) {
            cout << c << ", ";
        }
        cout << "}\n";
    }
    for (auto p : follow) {
        cout << "Follow(" << p.first << ") = { ";
        for (auto c : p.second) {
            cout << c << ", ";
        }
        cout << "}\n";
    }
    return 0;
}