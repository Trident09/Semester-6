class Grammar:
    def __init__(self, terminals, nonterminals, productions, start_symbol):
        self.terminals = terminals
        self.nonterminals = nonterminals
        self.productions = productions
        self.start_symbol = start_symbol

    def get_productions(self, nonterminal):
        return [prod for prod in self.productions if prod[0] == nonterminal]


class Item:
    def __init__(self, production, dot_position, lookahead):
        self.production = (
            production[0],
            tuple(production[1]),
        )  # Convert list to tuple for hashing
        self.dot_position = dot_position
        self.lookahead = lookahead

    def __eq__(self, other):
        return (
            self.production == other.production
            and self.dot_position == other.dot_position
            and self.lookahead == other.lookahead
        )

    def __hash__(self):
        return hash((self.production, self.dot_position, self.lookahead))

    def __repr__(self):
        return f"{self.production[0]} -> {' '.join(self.production[1][:self.dot_position])} . {' '.join(self.production[1][self.dot_position:])}, {self.lookahead}"


def first(symbol, grammar, first_cache):
    if symbol in first_cache:
        return first_cache[symbol]

    first_set = set()
    if symbol in grammar.terminals:
        first_set.add(symbol)
    else:
        for prod in grammar.get_productions(symbol):
            if prod[1][0] in grammar.terminals:
                first_set.add(prod[1][0])
            else:
                for sym in prod[1]:
                    first_set.update(first(sym, grammar, first_cache))
                    if "ε" not in first_cache[sym]:
                        break
                else:
                    first_set.add("ε")

    first_cache[symbol] = first_set
    return first_set


def follow(nonterminal, grammar, first_cache, follow_cache):
    if nonterminal in follow_cache:
        return follow_cache[nonterminal]

    follow_set = set()
    if nonterminal == grammar.start_symbol:
        follow_set.add("$")

    for prod in grammar.productions:
        for idx, sym in enumerate(prod[1]):
            if sym == nonterminal:
                if idx + 1 < len(prod[1]):
                    next_symbol = prod[1][idx + 1]
                    follow_set.update(first(next_symbol, grammar, first_cache) - {"ε"})
                    if "ε" in first_cache[next_symbol]:
                        follow_set.update(
                            follow(prod[0], grammar, first_cache, follow_cache)
                        )
                else:
                    if prod[0] != nonterminal:
                        follow_set.update(
                            follow(prod[0], grammar, first_cache, follow_cache)
                        )

    follow_cache[nonterminal] = follow_set
    return follow_set


def closure(items, grammar, first_cache):
    closure_set = set(items)
    while True:
        new_items = set(closure_set)
        for item in closure_set:
            if item.dot_position < len(item.production[1]):
                symbol = item.production[1][item.dot_position]
                if symbol in grammar.nonterminals:
                    for prod in grammar.get_productions(symbol):
                        lookaheads = set()
                        for sym in item.production[1][item.dot_position + 1 :]:
                            lookaheads.update(first(sym, grammar, first_cache))
                            if "ε" not in first_cache[sym]:
                                break
                        else:
                            lookaheads.update({item.lookahead})
                        for lookahead in lookaheads:
                            new_items.add(Item(prod, 0, lookahead))
        if new_items == closure_set:
            break
        closure_set = new_items
    return closure_set


def goto(items, symbol, grammar, first_cache):
    goto_set = set()
    for item in items:
        if (
            item.dot_position < len(item.production[1])
            and item.production[1][item.dot_position] == symbol
        ):
            goto_set.add(Item(item.production, item.dot_position + 1, item.lookahead))
    return closure(goto_set, grammar, first_cache)


def items(grammar):
    first_cache = {}
    follow_cache = {}
    start_item = Item((grammar.start_symbol, [grammar.productions[0][0]]), 0, "$")
    states = [closure({start_item}, grammar, first_cache)]
    transitions = {}
    state_to_id = {frozenset(states[0]): 0}

    while True:
        new_states = list(states)
        for state in states:
            for symbol in grammar.terminals + grammar.nonterminals:
                new_state = goto(state, symbol, grammar, first_cache)
                if new_state:
                    frozen_new_state = frozenset(new_state)
                    if frozen_new_state not in state_to_id:
                        state_to_id[frozen_new_state] = len(new_states)
                        new_states.append(new_state)
                    transitions[(state_to_id[frozenset(state)], symbol)] = state_to_id[
                        frozen_new_state
                    ]
        if new_states == states:
            break
        states = new_states
    return states, transitions, state_to_id


def build_parsing_table(grammar):
    states, transitions, state_to_id = items(grammar)
    action = {}
    goto_table = {}
    follow_cache = {}
    first_cache = {}

    for i, state in enumerate(states):
        for item in state:
            if item.dot_position == len(item.production[1]):
                if item.production[0] == grammar.start_symbol:
                    action[(i, "$")] = ("accept",)
                else:
                    for follow_symbol in follow(
                        item.production[0], grammar, first_cache, follow_cache
                    ):
                        action[(i, follow_symbol)] = ("reduce", item.production)
            elif item.production[1][item.dot_position] in grammar.terminals:
                symbol = item.production[1][item.dot_position]
                if (i, symbol) in transitions:
                    next_state = transitions[(i, symbol)]
                    action[(i, symbol)] = ("shift", next_state)
            else:
                symbol = item.production[1][item.dot_position]
                if (i, symbol) in transitions:
                    next_state = transitions[(i, symbol)]
                    goto_table[(i, symbol)] = next_state

    return action, goto_table, states, transitions


def print_dfa(states, transitions):
    print("DFA States and Transitions:")
    for i, state in enumerate(states):
        print(f"State {i}:")
        for item in state:
            print(f"  {item}")
        print()
    print("Transitions:")
    for (state, symbol), next_state in transitions.items():
        print(f"  State {state} --{symbol}--> State {next_state}")
    print()


def print_parsing_table(action, goto_table, grammar):
    print("Action Table:")
    for key in sorted(action.keys()):
        print(f"{key}: {action[key]}")
    print("\nGoto Table:")
    for key in sorted(goto_table.keys()):
        print(f"{key}: {goto_table[key]}")


if __name__ == "__main__":
    terminals = ["a", "b", "$"]
    nonterminals = ["S", "A"]
    productions = [("S", ["A", "A"]), ("A", ["a", "A"]), ("A", ["b"])]
    start_symbol = "S"

    grammar = Grammar(terminals, nonterminals, productions, start_symbol)
    action, goto_table, states, transitions = build_parsing_table(grammar)
    print_dfa(states, transitions)
    print_parsing_table(action, goto_table, grammar)
