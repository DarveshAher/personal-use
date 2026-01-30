#include <iostream>
#include <queue>
#include <vector>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Custom comparator for priority queue (min-heap)
struct Compare {
    bool operator()(ListNode* a, ListNode* b) {
        return a->val > b->val;
    }
};

ListNode* mergeKLists(vector<ListNode*>& lists) {
    priority_queue<ListNode*, vector<ListNode*>, Compare> pq;

    // Add head of each list to the priority queue
    for (auto l : lists) {
        if (l) pq.push(l);
    }

    ListNode* dummy = new ListNode(0);
    ListNode* tail = dummy;

    while (!pq.empty()) {
        ListNode* minNode = pq.top();
        pq.pop();

        tail->next = minNode;
        tail = tail->next;

        if (minNode->next)
            pq.push(minNode->next);
    }

    return dummy->next;
}

int main() {
    int k;
    cout << "Enter number of linked lists: ";
    cin >> k;

    vector<ListNode*> lists(k);

    for (int i = 0; i < k; ++i) {
        int size;
        cout << "Enter size of list " << i + 1 << ": ";
        cin >> size;
        ListNode* head = nullptr;
        ListNode* tail = nullptr;

        cout << "Enter elements in sorted order:\n";
        for (int j = 0; j < size; ++j) {
            int val;
            cin >> val;
            ListNode* newNode = new ListNode(val);
            if (!head) {
                head = tail = newNode;
            } else {
                tail->next = newNode;
                tail = tail->next;
            }
        }
        lists[i] = head;
    }

    ListNode* result = mergeKLists(lists);

    cout << "Merged sorted list:\n";
    while (result) {
        cout << result->val << " ";
        result = result->next;
    }
    cout << endl;

    return 0;
}
