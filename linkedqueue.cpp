#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    
    Node(int val) : data(val), next(nullptr) {}
};


class LinkedListStack {
private:
    Node* top; 
    
public:
    LinkedListStack() : top(nullptr) {}
    
   
    bool isEmpty() {
        return top == nullptr;
    }
    
    
    void push(int value) {
        Node* newNode = new Node(value);
        newNode->next = top;
        top = newNode;
        cout << value << " pushed to stack\n";
    }
    
   
    int pop() {
        if (isEmpty()) {
            cout << "Stack is empty\n";
            return -1;
        }
        Node* temp = top;
        int value = temp->data;
        top = top->next;
        delete temp;
        cout << value << " popped from stack\n";
        return value;
    }
    
    
    int peek() {
        if (isEmpty()) {
            cout << "Stack is empty\n";
            return -1;
        }
        return top->data;
    }
    

    void display() {
        if (isEmpty()) {
            cout << "Stack is empty\n";
            return;
        }
        
        Node* current = top;
        cout << "Stack elements (top to bottom): ";
        while (current != nullptr) {
            cout << current->data << " ";
            current = current->next;
        }
        cout << endl;
    }
    

    ~LinkedListStack() {
        while (!isEmpty()) {
            pop();
        }
    }
};

int main() {
    LinkedListStack stack;
    
    
    stack.push(10);
    stack.push(20);
    stack.push(30);
    stack.push(40);
    
    
    stack.display();
    
   
    stack.pop();
    stack.pop();
    
    
    stack.display();
    
    
    cout << "Top element is: " << stack.peek() << endl;
    
    return 0;
}