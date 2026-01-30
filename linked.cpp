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
    queue.enqueue(50);
    
    
    queue.display();
    
    queue.dequeue(); 
    queue.dequeue();
    queue.dequeue();
    
    
    queue.display();
    
    queue.enqueue(80);
    queue.enqueue(90);
    queue.dequeue();
    
    queue.display();
    cout << "Front element is: " << queue.peek() << endl;
    
    return 0;
}