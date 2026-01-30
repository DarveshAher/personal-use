#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedListQueue {
private:
    Node* front;
    Node* rear;
    
public:
    LinkedListQueue() : front(nullptr), rear(nullptr) {}
    
    bool isEmpty() {
        return front == nullptr;
    }
    
    void enqueue(int value) {
        Node* newNode = new Node(value);
        if (isEmpty()) {
            front = rear = newNode;
        } else {
            rear->next = newNode;
            rear = newNode;
        }
        cout << value << " enqueued to queue\n";
    }
    
    int dequeue() {
        if (isEmpty()) {
            cout << "Queue is empty\n";
            return -1;
        }
        Node* temp = front;
        int value = temp->data;
        front = front->next;
        
        if (front == nullptr) {
            rear = nullptr;
        }
        
        delete temp;
        cout << value << " dequeued from queue\n";
        return value;
    }
    
    int peek() {
        if (isEmpty()) {
            cout << "Queue is empty\n";
            return -1;
        }
        return front->data;
    }
    
    
    void checkAndPrintElements() {
        if (isEmpty()) {
            cout << "Queue is empty - no elements to print\n";
            return;
        }
        
        Node* current = front;
        int position = 1;
        cout << "\nQueue Elements (front to rear):\n";
        cout << "-----------------------------\n";
        
        while (current != nullptr) {
            cout << "Position " << position++ << ": " << current->data << endl;
            current = current->next;
        }
        cout << "-----------------------------\n";
        cout << "Total elements in queue: " << (position-1) << "\n\n";
    }
    
    
    void display() {
        if (isEmpty()) {
            cout << "Queue is empty\n";
            return;
        }
        
        Node* current = front;
        cout << "Queue elements: ";
        while (current != nullptr) {
            cout << current->data << " ";
            current = current->next;
        }
        cout << endl;
    }
    
    ~LinkedListQueue() {
        while (!isEmpty()) {
            dequeue();
        }
    }
};

int main() {
    LinkedListQueue queue;
    
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);
    queue.enqueue(40);
    
    
    queue.checkAndPrintElements();
    
    queue.dequeue();
    queue.dequeue();
    
    queue.checkAndPrintElements();
    
    queue.enqueue(50);
    queue.enqueue(60);
    
    queue.checkAndPrintElements();
    
    return 0;
}