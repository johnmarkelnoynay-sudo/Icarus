// Icarus - Binary Calculator
// A C++ console application for performing binary arithmetic operations
// Author: Sir John Markel Noynay
// Course: BSIT

#include <iostream>
#include <string>
#include <algorithm>
#include <stdexcept>
#include <sstream>

using namespace std;

// Converts a decimal integer to a binary string
string decimalToBinary(long long decimal) {
    if (decimal == 0) return "0";
    
    string binary = "";
    bool isNegative = decimal < 0;
    decimal = abs(decimal);
    
    while (decimal > 0) {
        binary = (decimal % 2 == 0 ? "0" : "1") + binary;
        decimal /= 2;
    }
    
    return isNegative ? "-" + binary : binary;
}

// Converts a binary string to a decimal long long
long long binaryToDecimal(const string& binary) {
    if (binary.empty()) {
        throw invalid_argument("Binary string is empty");
    }
    
    bool isNegative = false;
    string binStr = binary;
    
    if (binStr[0] == '-') {
        isNegative = true;
        binStr = binStr.substr(1);
    }
    
    long long decimal = 0;
    int length = binStr.length();
    
    for (int i = 0; i < length; i++) {
        if (binStr[i] != '0' && binStr[i] != '1') {
            throw invalid_argument("Invalid binary digit: " + string(1, binStr[i]));
        }
        decimal = decimal * 2 + (binStr[i] - '0');
    }
    
    return isNegative ? -decimal : decimal;
}

// Validates that a string contains only binary digits (0 and 1)
bool isValidBinary(const string& str) {
    if (str.empty()) return false;
    
    for (char c : str) {
        if (c != '0' && c != '1') {
            return false;
        }
    }
    return true;
}

// Adds two binary strings
string addBinary(const string& a, const string& b) {
    long long decA = binaryToDecimal(a);
    long long decB = binaryToDecimal(b);
    return decimalToBinary(decA + decB);
}

// Subtracts two binary strings
string subtractBinary(const string& a, const string& b) {
    long long decA = binaryToDecimal(a);
    long long decB = binaryToDecimal(b);
    return decimalToBinary(decA - decB);
}

// Multiplies two binary strings
string multiplyBinary(const string& a, const string& b) {
    long long decA = binaryToDecimal(a);
    long long decB = binaryToDecimal(b);
    return decimalToBinary(decA * decB);
}

// Divides two binary strings
string divideBinary(const string& a, const string& b) {
    long long decA = binaryToDecimal(a);
    long long decB = binaryToDecimal(b);
    
    if (decB == 0) {
        throw invalid_argument("Division by zero is not allowed");
    }
    
    return decimalToBinary(decA / decB);
}

// Displays the main menu
void displayMenu() {
    cout << "\n";
    cout << "========================================" << endl;
    cout << "           Icarus Binary Calculator     " << endl;
    cout << "========================================" << endl;
    cout << "1. Addition (+)" << endl;
    cout << "2. Subtraction (-)" << endl;
    cout << "3. Multiplication (*)" << endl;
    cout << "4. Division (/)" << endl;
    cout << "5. Exit" << endl;
    cout << "========================================" << endl;
    cout << "Enter your choice: ";
}

int main() {
    string binary1, binary2;
    int choice;
    bool running = true;
    
    cout << "Welcome to Icarus - Binary Calculator!" << endl;
    cout << "Perform arithmetic operations on binary numbers." << endl;
    
    while (running) {
        displayMenu();
        cin >> choice;
        
        // Clear input buffer
        cin.ignore();
        
        if (choice < 1 || choice > 5) {
            cout << "\nInvalid option. Please try again." << endl;
            continue;
        }
        
        if (choice == 5) {
            cout << "\nThank you for using Icarus Binary Calculator. Goodbye!" << endl;
            running = false;
            continue;
        }
        
        cout << "\nEnter first binary number: ";
        getline(cin, binary1);
        
        cout << "Enter second binary number: ";
        getline(cin, binary2);
        
        // Validate inputs
        if (!isValidBinary(binary1)) {
            cout << "\nError: First input is not a valid binary number." << endl;
            continue;
        }
        
        if (!isValidBinary(binary2)) {
            cout << "\nError: Second input is not a valid binary number." << endl;
            continue;
        }
        
        try {
            string result;
            char operation;
            
            switch (choice) {
                case 1:
                    result = addBinary(binary1, binary2);
                    operation = '+';
                    break;
                case 2:
                    result = subtractBinary(binary1, binary2);
                    operation = '-';
                    break;
                case 3:
                    result = multiplyBinary(binary1, binary2);
                    operation = '*';
                    break;
                case 4:
                    result = divideBinary(binary1, binary2);
                    operation = '/';
                    break;
            }
            
            cout << "\n----------------------------------------" << endl;
            cout << "Result:" << endl;
            cout << "  " << binary1 << " " << operation << " " << binary2 << " = " << result << endl;
            cout << "----------------------------------------" << endl;
            
        } catch (const exception& e) {
            cout << "\nError: " << e.what() << endl;
        }
    }
    
    return 0;
}