#include <iostream>
#include <vector>
#include <string>

using namespace std;

const int MOD = 1000000007;
const int MAX_LIMIT = 1000000;

// Function to generate all primes up to MAX_LIMIT using the Sieve of Eratosthenes
vector<bool> sievePrimes() {
    vector<bool> is_prime(MAX_LIMIT + 1, true);
    is_prime[0] = is_prime[1] = false;

    for (int i = 2; i * i <= MAX_LIMIT; i++) {
        if (is_prime[i]) {
            for (int j = i * i; j <= MAX_LIMIT; j += i) {
                is_prime[j] = false;
            }
        }
    }
    return is_prime;
}

// Function to count the number of ways to split the string into prime numbers
int countPrimeStrings(const string &s) {
    int n = s.size();
    vector<bool> is_prime = sievePrimes();
    
    // dp[i] will store the number of ways to split the string s[0:i] into primes
    vector<int> dp(n + 1, 0);
    dp[0] = 1;  // base case: 1 way to split an empty string

    // Iterate over each position in the string
    for (int i = 1; i <= n; ++i) {
        // Check all possible substrings ending at position i
        for (int len = 1; len <= 6 && i - len >= 0; ++len) {
            string substr = s.substr(i - len, len);
            
            // Skip substrings that start with leading zeros
            if (substr[0] == '0') continue;

            // Convert substring to integer
            int num = stoi(substr);
            
            // Check if the number is prime
            if (num <= MAX_LIMIT && is_prime[num]) {
                dp[i] = (dp[i] + dp[i - len]) % MOD;
            }
        }
    }

    return dp[n];
}

int main() {
    string s;
    cout << "Enter the number string: ";
    cin >> s;

    int result = countPrimeStrings(s);
    cout << "Number of ways to split the string into primes: " << result << endl;

    return 0;
}
