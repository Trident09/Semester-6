#include<iostream>

void generate_sets(std::string str){
    std::string prefix[] = {"", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"};
    std::string suffix[] = {"", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"};
    for(int i = 0; i < 10; i++){
        for(int j = 0; j < 10; j++){
            std::string res = prefix[i] + str + suffix[j];
            if(res.length() == 5)
                std::cout << res << std::endl;
        }
    }
}

int main(){
    generate_sets("222");
    return 0;
}